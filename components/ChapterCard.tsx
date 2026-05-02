import React from 'react';
import { Clock, MapPin, Activity, Utensils, Camera, DollarSign, Sparkles } from 'lucide-react';
import { ItineraryChapter } from '@/types/itinerary';

interface ChapterCardProps {
  chapter: ItineraryChapter;
  index: number;
}

export default function ChapterCard({ chapter, index }: ChapterCardProps) {
  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline line (desktop) */}
      <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-0.5 bg-brand-emerald/20 -ml-[1px]"></div>
      
      {/* Timeline line (mobile) */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-brand-emerald/20 ml-3"></div>

      <div className={`md:flex items-center justify-between w-full mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Timeline Dot */}
        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-brand-cream border-4 border-brand-emerald shadow flex items-center justify-center ml-0 md:-ml-3 mt-1 md:mt-0 z-10"></div>
        
        {/* Spacer for alternating layout on desktop */}
        <div className="hidden md:block w-5/12"></div>
        
        {/* Card Content */}
        <div className="w-full md:w-5/12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-navy/5 hover:shadow-md transition-shadow">
            
            <div className="flex items-center justify-between mb-4 border-b border-brand-navy/5 pb-4">
              <h3 className="font-bold text-brand-navy text-lg">{chapter.chapterTitle}</h3>
              <div className="flex items-center gap-1 text-xs font-bold text-brand-emerald bg-brand-emerald/10 px-2 py-1 rounded-full">
                <Clock size={12} /> {chapter.time}
              </div>
            </div>

            <p className="text-brand-navy/80 text-sm leading-relaxed mb-6 italic">
              "{chapter.story}"
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-brand-navy font-medium">{chapter.place}</span>
              </div>
              <div className="flex items-start gap-3">
                <Activity size={16} className="text-brand-emerald mt-0.5 flex-shrink-0" />
                <span className="text-brand-navy/80">{chapter.activity}</span>
              </div>
              {chapter.foodSuggestion && (
                <div className="flex items-start gap-3">
                  <Utensils size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span className="text-brand-navy/80"><span className="font-medium text-brand-navy">Eat:</span> {chapter.foodSuggestion}</span>
                </div>
              )}
              {chapter.photoMoment && (
                <div className="flex items-start gap-3">
                  <Camera size={16} className="text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-brand-navy/80"><span className="font-medium text-brand-navy">Photo:</span> {chapter.photoMoment}</span>
                </div>
              )}
              {chapter.estimatedCost && (
                <div className="flex items-start gap-3">
                  <DollarSign size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span className="text-brand-navy/80">{chapter.estimatedCost}</span>
                </div>
              )}
            </div>

            {chapter.loroTip && (
              <div className="mt-6 bg-brand-cream/50 p-4 rounded-2xl flex items-start gap-3 border border-brand-navy/5">
                <Sparkles size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <p className="text-xs text-brand-navy/70 leading-relaxed font-medium">
                  <strong className="text-brand-navy">Loro's Tip:</strong> {chapter.loroTip}
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
