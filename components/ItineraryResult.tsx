import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Gem, Lightbulb, Wallet } from 'lucide-react';
import { Itinerary } from '@/types/itinerary';
import ChapterCard from './ChapterCard';
import LoroCharacter from './LoroCharacter';

interface ItineraryResultProps {
  itinerary: Itinerary;
}

export default function ItineraryResult({ itinerary }: ItineraryResultProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="text-center mb-16 relative w-full flex flex-col items-center">
        <div className="mb-8">
          <LoroCharacter size="md" />
        </div>
        
        {/* Loro Opening Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-8 py-4 rounded-3xl shadow-md border border-brand-cream inline-block max-w-2xl mb-8 relative"
        >
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-white border-r-[10px] border-r-transparent"></div>
          <p className="text-brand-navy font-medium italic">
            "{itinerary.loroOpeningMessage}"
          </p>
        </motion.div>

        <span className="bg-brand-emerald/10 text-brand-emerald font-bold px-4 py-1.5 rounded-full text-sm mb-4 inline-block">
          {itinerary.travelPersona}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 leading-tight">
          {itinerary.title}
        </h1>
        {itinerary.subtitle && (
          <h2 className="text-xl text-brand-navy/70 mb-8 max-w-2xl mx-auto">
            {itinerary.subtitle}
          </h2>
        )}
        
        <div className="bg-brand-cream border border-brand-navy/10 p-8 rounded-3xl text-left max-w-3xl w-full shadow-sm">
          <h3 className="font-bold text-brand-navy text-lg mb-3 flex items-center gap-2">
            <BookOpenIcon /> Prologue
          </h3>
          <p className="text-brand-navy/80 leading-relaxed">
            {itinerary.prologue}
          </p>
          <div className="mt-6 pt-6 border-t border-brand-navy/10 flex items-center justify-between">
            <div className="font-bold text-brand-navy flex items-center gap-2">
              <Wallet size={18} className="text-brand-emerald" /> Estimated Total Budget:
            </div>
            <div className="text-brand-gold font-bold">{itinerary.estimatedTotalBudget}</div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="w-full max-w-4xl relative mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy">The Journey Begins</h2>
        </div>
        
        <div className="relative">
          {itinerary.chapters.map((chapter, idx) => (
            <ChapterCard key={idx} chapter={chapter} index={idx} />
          ))}
        </div>
      </div>

      {/* Grid Sections: Hidden Gem, Tips, Checklist */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Hidden Gem */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-navy/5 col-span-1 md:col-span-2 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
            <Gem className="text-brand-gold" /> Hidden Gem Discovery
          </h3>
          <div className="bg-brand-cream p-4 rounded-2xl border border-brand-gold/20 mb-4">
            <strong className="text-brand-navy text-lg block mb-1">{itinerary.hiddenGem.place}</strong>
            <p className="text-brand-navy/80 text-sm">{itinerary.hiddenGem.reason}</p>
          </div>
          <div className="text-sm font-medium text-brand-navy/60">
            <strong>Best time to visit:</strong> {itinerary.hiddenGem.bestTimeToVisit}
          </div>
        </div>

        {/* Budget Tips */}
        <div className="bg-brand-navy text-brand-cream p-8 rounded-3xl shadow-lg flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="text-brand-gold" /> Budget Tips
          </h3>
          <ul className="space-y-4">
            {itinerary.budgetTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm opacity-90">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald mt-1.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Final Checklist */}
      <div className="w-full max-w-5xl bg-white p-8 rounded-3xl shadow-sm border border-brand-navy/5 mb-16">
        <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
          <CheckCircle className="text-brand-emerald" /> Final Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {itinerary.finalChecklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-brand-cream px-4 py-3 rounded-xl border border-brand-navy/5">
              <div className="w-5 h-5 rounded-full border-2 border-brand-emerald/50 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald/20" />
              </div>
              <span className="text-brand-navy font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Loro Closing Message */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl flex flex-col items-center"
      >
        <LoroCharacter size="sm" />
        <div className="bg-white px-8 py-6 rounded-3xl shadow-lg border border-brand-cream mt-6 relative">
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-white border-r-[10px] border-r-transparent"></div>
          <p className="text-brand-navy text-lg font-medium italic">
            "{itinerary.loroClosingMessage}"
          </p>
        </div>
      </motion.div>

    </div>
  );
}

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-emerald">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}
