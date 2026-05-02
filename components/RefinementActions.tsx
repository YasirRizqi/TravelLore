import React from 'react';
import { RefreshCw, DollarSign, Heart, Map, Compass } from 'lucide-react';

interface RefinementActionsProps {
  onRefine: (instruction: string) => void;
  isLoading: boolean;
}

export default function RefinementActions({ onRefine, isLoading }: RefinementActionsProps) {
  const actions = [
    { label: 'Make it cheaper', icon: DollarSign, instruction: 'Make this itinerary cheaper while keeping the same destination, duration, and persona.' },
    { label: 'Make it more romantic', icon: Heart, instruction: 'Add more romantic touches and couple-focused activities while keeping the same destination, duration, and persona.' },
    { label: 'Make it more local', icon: Map, instruction: 'Focus more on local culture, hidden gems, and authentic experiences while keeping the same destination, duration, and persona.' },
    { label: 'Make it more adventurous', icon: Compass, instruction: 'Add more adventurous and thrilling activities while keeping the same destination, duration, and persona.' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white/60 backdrop-blur-md border border-brand-navy/10 p-8 rounded-3xl text-center shadow-lg">
      <h3 className="text-xl font-bold text-brand-navy mb-6">Want to tweak the story?</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => onRefine(action.instruction)}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-brand-cream border border-brand-navy/10 rounded-full text-brand-navy font-medium hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <action.icon size={16} />
            {action.label}
          </button>
        ))}
        <button
          onClick={() => onRefine('Regenerate the story with a slightly different twist.')}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-brand-cream rounded-full font-medium hover:bg-brand-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <RefreshCw size={16} />
          Regenerate Story
        </button>
      </div>
    </div>
  );
}
