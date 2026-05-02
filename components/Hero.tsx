'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Camera, DollarSign } from 'lucide-react';
import LoroCharacter from './LoroCharacter';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const features = [
    { icon: BookOpen, title: 'Story-Based Itinerary', desc: 'Journeys written as cinematic chapters.' },
    { icon: MapPin, title: 'AI Travel Spirit Guide', desc: 'Loro learns your mood and style.' },
    { icon: Camera, title: 'Local Food & Photo Spots', desc: 'Hidden gems off the beaten path.' },
    { icon: DollarSign, title: 'Budget-Aware Route', desc: 'Experiences tailored to your wallet.' },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-brand-navy leading-tight"
          >
            Turn any city into your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-gold">
              personal adventure story.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-brand-navy/70 max-w-xl"
          >
            TravelLore AI transforms ordinary itineraries into cinematic, story-driven journeys guided by Loro, your mystical AI travel spirit.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onStart}
            className="px-8 py-4 bg-brand-navy text-brand-cream rounded-full font-bold text-lg hover:bg-brand-emerald transition-all shadow-[0_4px_14px_0_rgba(42,157,143,0.39)] hover:shadow-[0_6px_20px_rgba(42,157,143,0.23)] hover:-translate-y-1"
          >
            Start Your Journey
          </motion.button>
        </div>

        {/* Right Content - Loro Character */}
        <div className="flex-1 flex flex-col items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Loro Speech Bubble */}
            <div className="absolute -top-16 -left-12 md:-left-24 bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-brand-cream z-10 max-w-[200px]">
              <p className="text-sm text-brand-navy font-medium">
                "Hi, I'm Loro! Tell me your destination, and I'll turn it into a story worth remembering."
              </p>
              <div className="absolute bottom-[-10px] right-4 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent"></div>
            </div>

            <LoroCharacter size="lg" />
          </motion.div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 w-full">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1) }}
            className="bg-white/60 backdrop-blur-sm border border-brand-navy/5 p-6 rounded-3xl hover:shadow-xl transition-all hover:bg-white flex flex-col items-start gap-4"
          >
            <div className="p-3 bg-brand-cream rounded-2xl text-brand-emerald">
              <feature.icon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-brand-navy mb-1">{feature.title}</h3>
              <p className="text-sm text-brand-navy/60 leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* What Makes It Unique */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 max-w-4xl text-center flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-brand-navy mb-6">What Makes TravelLore Unique?</h2>
        <p className="text-brand-navy/80 text-lg leading-relaxed bg-white/40 p-8 rounded-3xl border border-white/60 shadow-sm">
          Most AI travel planners generate plain schedules. TravelLore AI turns a trip into a story. Instead of only telling users where to go, it creates a cinematic journey with chapters, mood, local food, photo moments, budget tips, and a hidden gem. Guided by Loro, a mystical AI travel spirit with a unique character identity, the experience feels personal, emotional, and memorable. TravelLore is designed for travelers who want more than an itinerary they want an adventure worth remembering.
        </p>
      </motion.div>
    </section>
  );
}
