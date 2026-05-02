export interface ItineraryChapter {
  chapterTitle: string;
  time: string;
  place: string;
  activity: string;
  story: string;
  foodSuggestion: string;
  photoMoment: string;
  estimatedCost: string;
  loroTip: string;
}

export interface HiddenGem {
  place: string;
  reason: string;
  bestTimeToVisit: string;
}

export interface Itinerary {
  title: string;
  subtitle: string;
  prologue: string;
  travelPersona: string;
  estimatedTotalBudget: string;
  loroOpeningMessage: string;
  chapters: ItineraryChapter[];
  hiddenGem: HiddenGem;
  finalChecklist: string[];
  budgetTips: string[];
  loroClosingMessage: string;
}

export interface JourneyFormData {
  destination: string;
  duration: string;
  persona: string;
  mood: string;
  budget: string;
  notes: string;
}
