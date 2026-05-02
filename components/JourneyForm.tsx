'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Heart, Wallet, FileText } from 'lucide-react';
import { JourneyFormData } from '@/types/itinerary';
import LoroCharacter from './LoroCharacter';

interface JourneyFormProps {
  onSubmit: (data: JourneyFormData) => void;
  isLoading: boolean;
}

export default function JourneyForm({ onSubmit, isLoading }: JourneyFormProps) {
  const [formData, setFormData] = useState<JourneyFormData>({
    destination: 'Bandung',
    duration: '1 Day',
    persona: 'Hidden Food Hunter',
    mood: 'Cozy',
    budget: 'Low',
    notes: 'I like coffee, old streets, street food, and sunset photo spots.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Loro Helper Card */}
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="sticky top-24 bg-brand-cream border border-brand-navy/10 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
            <LoroCharacter size="sm" state={isLoading ? 'loading' : 'default'} />
            <h3 className="text-xl font-bold text-brand-navy mt-4 mb-2">Loro is ready!</h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed">
              "Tell me your destination and style. I will read your travel spirit and create a journey with chapters, hidden gems, food stops, photo moments, and budget tips."
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:w-2/3 bg-white p-8 rounded-3xl shadow-lg border border-brand-navy/5">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Build Your Journey</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Destination */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-2">
                <MapPin size={16} className="text-brand-emerald" /> Destination
              </label>
              <input 
                type="text" 
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Bandung, Bali, Tokyo..."
                className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-2">
                  <Calendar size={16} className="text-brand-emerald" /> Duration
                </label>
                <select 
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all"
                >
                  <option>1 Day</option>
                  <option>2 Days</option>
                  <option>3 Days</option>
                </select>
              </div>

              {/* Budget Level */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-2">
                  <Wallet size={16} className="text-brand-emerald" /> Budget Level
                </label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Travel Persona */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-2">
                  <User size={16} className="text-brand-emerald" /> Travel Persona
                </label>
                <select 
                  name="persona"
                  value={formData.persona}
                  onChange={handleChange}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all"
                >
                  <option>Hidden Food Hunter</option>
                  <option>Cinematic Solo Traveler</option>
                  <option>Healing Weekend Wanderer</option>
                  <option>Couple Memory Maker</option>
                  <option>Local Culture Seeker</option>
                  <option>Budget Backpacker</option>
                </select>
              </div>

              {/* Mood */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-2">
                  <Heart size={16} className="text-brand-emerald" /> Mood
                </label>
                <select 
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all"
                >
                  <option>Magical</option>
                  <option>Cozy</option>
                  <option>Adventurous</option>
                  <option>Romantic</option>
                  <option>Local</option>
                  <option>Aesthetic</option>
                </select>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-2">
                <FileText size={16} className="text-brand-emerald" /> Optional Notes
              </label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="What else do you want Loro to know? e.g. I like coffee shops..."
                rows={3}
                className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all resize-none"
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2
                ${isLoading 
                  ? 'bg-brand-navy/50 text-white cursor-not-allowed' 
                  : 'bg-brand-navy text-brand-cream hover:bg-brand-emerald'}`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loro is writing...
                </>
              ) : 'Generate My Travel Story'}
            </motion.button>
            
          </form>
        </div>
      </div>
    </section>
  );
}
