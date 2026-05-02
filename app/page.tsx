'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import JourneyForm from '@/components/JourneyForm';
import ItineraryResult from '@/components/ItineraryResult';
import RefinementActions from '@/components/RefinementActions';
import LoroCharacter from '@/components/LoroCharacter';
import { Itinerary, JourneyFormData } from '@/types/itinerary';

type AppState = 'home' | 'form' | 'loading' | 'result' | 'error';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('home');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [formData, setFormData] = useState<JourneyFormData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleStart = () => {
    setAppState('form');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateItinerary = async (data: JourneyFormData, refinement?: string) => {
    setAppState('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, refinement }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary. The magic faded.');
      }

      const resultData = await response.json();
      
      if (resultData.error) {
        throw new Error(resultData.error);
      }

      setItinerary(resultData as Itinerary);
      setAppState('result');
    } catch (err: any) {
      setErrorMsg(err.message || 'Loro lost the trail for a moment. Please try again.');
      setAppState('error');
    }
  };

  const handleFormSubmit = (data: JourneyFormData) => {
    setFormData(data);
    generateItinerary(data);
  };

  const handleRefine = (instruction: string) => {
    if (formData) {
      generateItinerary(formData, instruction);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <AnimatePresence mode="wait">
        
        {appState === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center"
          >
            <Hero onStart={handleStart} />
          </motion.div>
        )}

        {appState === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <JourneyForm onSubmit={handleFormSubmit} isLoading={false} />
          </motion.div>
        )}

        {appState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center min-h-[60vh]"
          >
            <LoroCharacter size="lg" state="loading" />
            <motion.h2 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl font-bold text-brand-navy mt-8"
            >
              Loro is reading the map of your journey...
            </motion.h2>
            <p className="text-brand-navy/60 mt-2">Crafting the perfect story for you.</p>
          </motion.div>
        )}

        {appState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <LoroCharacter size="lg" state="error" />
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-2">Oops!</h2>
            <p className="text-brand-navy/70 mb-8 max-w-md">{errorMsg}</p>
            <button
              onClick={() => appState === 'error' && formData ? generateItinerary(formData) : setAppState('form')}
              className="px-8 py-3 bg-brand-navy text-brand-cream rounded-full font-bold hover:bg-brand-emerald transition-all"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {appState === 'result' && itinerary && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <ItineraryResult itinerary={itinerary} />
            <div className="pb-24">
              <RefinementActions onRefine={handleRefine} isLoading={false} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
