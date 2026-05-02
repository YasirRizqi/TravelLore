import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Loro, a mystical AI travel spirit and story-based travel guide for TravelLore AI. Your job is to transform ordinary travel plans into cinematic, story-driven journeys. You are magical, warm, practical, and helpful. You do not only create schedules. You create travel chapters, emotional atmosphere, local discoveries, food suggestions, photo moments, budget estimates, and a final checklist. Always match the user’s destination, duration, budget, mood, travel persona, and notes. Speak with the personality of Loro: friendly, magical, concise, and helpful.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, duration, persona, mood, budget, notes, refinement } = body;

    if (!destination || !duration || !persona || !mood || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OpenRouter API Key is missing. Please check .env.local' }, { status: 500 });
    }

    const userPrompt = `Create a story-driven travel itinerary based on this user profile:

Destination: ${destination}
Duration: ${duration}
Travel Persona: ${persona}
Mood: ${mood}
Budget Level: ${budget}
Optional Notes: ${notes || 'None'}
Refinement Instruction: ${refinement || 'None'}

Return ONLY valid JSON with this exact structure:

{
  "title": "Title of the journey",
  "subtitle": "Subtitle",
  "prologue": "A short cinematic opening.",
  "travelPersona": "${persona}",
  "estimatedTotalBudget": "e.g., $200 / Rp 1.500.000",
  "loroOpeningMessage": "Hi, I am Loro...",
  "chapters": [
    {
      "chapterTitle": "Chapter 1",
      "time": "08:00 AM",
      "place": "Name of Place",
      "activity": "What to do",
      "story": "Cinematic narration of this moment",
      "foodSuggestion": "What to eat",
      "photoMoment": "Where/how to take a photo",
      "estimatedCost": "Cost estimate",
      "loroTip": "A magical or practical tip from Loro"
    }
  ],
  "hiddenGem": {
    "place": "Name",
    "reason": "Why it's a hidden gem",
    "bestTimeToVisit": "Time"
  },
  "finalChecklist": ["Item 1", "Item 2"],
  "budgetTips": ["Tip 1", "Tip 2"],
  "loroClosingMessage": "Farewell message"
}

Rules:
- Make the itinerary feel cinematic and story-driven.
- Do not make it sound like a plain schedule.
- Divide the trip into chapters.
- Include realistic activities, local food suggestions, and photo moments.
- Include practical checklist items.
- Keep the tone magical, friendly, and useful.
- Do not include markdown code block syntax (like \`\`\`json). Just return raw JSON.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'TravelLore AI',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter API Error:', errText);
      return NextResponse.json({ error: 'Failed to communicate with AI provider.' }, { status: 500 });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '';

    // Robust JSON parsing to handle possible markdown wrappers
    content = content.trim();
    if (content.startsWith('```json')) {
      content = content.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (content.startsWith('```')) {
      content = content.replace(/^```/, '').replace(/```$/, '').trim();
    }

    try {
      const parsedJSON = JSON.parse(content);
      return NextResponse.json(parsedJSON);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw Content:', content);
      return NextResponse.json({ error: 'AI returned an invalid response format. Please try again.' }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
