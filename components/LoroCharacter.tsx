'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';

interface LoroProps {
  state?: 'default' | 'loading' | 'error';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoroCharacter({ state = 'default', className = '', size = 'md' }: LoroProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  };

  const currentSize = sizeClasses[size];

  // Floating animation variants
  const floatingVariants = {
    default: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    loading: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    error: {
      y: [0, 5, 0],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Sparkle animation
  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
      {/* Sparkles Background (only on default/loading) */}
      {state !== 'error' && (
        <>
          <motion.div variants={sparkleVariants} animate="animate" className="absolute top-0 right-0 text-brand-gold opacity-70">
            <Sparkles size={size === 'sm' ? 16 : 24} />
          </motion.div>
          <motion.div variants={sparkleVariants} animate="animate" className="absolute bottom-4 left-0 text-brand-emerald opacity-70" style={{ animationDelay: '1s' }}>
            <Sparkles size={size === 'sm' ? 12 : 20} />
          </motion.div>
        </>
      )}

      <motion.div
        variants={floatingVariants}
        animate={state}
        className="relative flex flex-col items-center justify-center w-full h-full"
      >
        {/* Magical Aura Glow */}
        <div className={`absolute inset-0 rounded-full blur-2xl ${state === 'error' ? 'bg-brand-navy/30' : 'bg-brand-gold/20 animate-pulse'}`} />

        {/* Main Body */}
        <div className="relative w-3/4 h-3/4 bg-gradient-to-b from-brand-cream to-[#F0E6D2] rounded-full shadow-[0_0_30px_rgba(244,162,97,0.4)] flex flex-col items-center justify-center border-4 border-white/50 overflow-hidden">
          
          {/* Eyes */}
          <div className="flex gap-4 mb-2 z-10">
            {state === 'error' ? (
              <>
                <div className="w-3 h-1 bg-brand-navy rounded-full transform rotate-12" />
                <div className="w-3 h-1 bg-brand-navy rounded-full transform -rotate-12" />
              </>
            ) : (
              <>
                {/* Friendly Eyes */}
                <div className="w-3 h-4 bg-brand-navy rounded-full overflow-hidden relative">
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <div className="w-3 h-4 bg-brand-navy rounded-full overflow-hidden relative">
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </>
            )}
          </div>

          {/* Compass Mark on Chest */}
          <div className="absolute bottom-2 text-brand-emerald/40 pointer-events-none z-0">
            <Compass size={size === 'sm' ? 24 : 40} strokeWidth={1.5} />
          </div>

        </div>

        {/* Floating Scarf/Ribbon */}
        <div className="absolute top-1/2 -right-4 w-12 h-6 bg-brand-emerald/80 rounded-r-full blur-[1px] transform -rotate-12 origin-left z-[-1]"></div>
        <div className="absolute top-1/2 -right-6 w-16 h-5 bg-brand-navy/80 rounded-r-full blur-[1px] transform rotate-6 origin-left z-[-2]"></div>

        {/* Loading Map Icon / Error Icon overlay */}
        {state === 'loading' && (
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-4 right-0 bg-white p-1.5 rounded-full shadow-lg text-brand-emerald"
          >
            <Compass size={size === 'sm' ? 16 : 24} />
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
