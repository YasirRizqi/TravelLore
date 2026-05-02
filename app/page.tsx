'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setAppState('home');
    window.scrollTo(0, 0);
  };

  const handleBackToForm = () => {
    setAppState('form');
    window.scrollTo(0, 0);
  };

  const generateItinerary = async (data: JourneyFormData, refinement?: string) => {
    setAppState('loading');
    window.scrollTo(0, 0);

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
            className="w-full relative"
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
              onClick={() => appState === 'error' && formData ? generateItinerary(formData) : handleBackToForm()}
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
            className="w-full relative flex flex-col items-center"
          >

            <ItineraryResult itinerary={itinerary} />
            
            <div className="pb-24 w-full flex flex-col items-center">
              <RefinementActions onRefine={handleRefine} isLoading={false} />
              
              <button
                onClick={handleBackToForm}
                className="mt-16 px-8 py-4 bg-brand-cream border-2 border-brand-navy text-brand-navy rounded-full font-bold hover:bg-brand-navy hover:text-brand-cream transition-all flex items-center gap-2 shadow-sm"
              >
                <ArrowLeft size={20} />
                Create Another Journey
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
