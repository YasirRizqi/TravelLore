import React from 'react';
import { Compass, Sparkles, Map } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // dark variant for footer, light for navbar
}

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-brand-navy' : 'text-brand-cream';
  const iconColor = variant === 'light' ? 'text-brand-navy' : 'text-brand-cream';

  return (
    <div className={`flex items-center gap-2 font-sans font-bold tracking-tight ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Main Compass */}
        <Compass className={`w-8 h-8 ${iconColor}`} strokeWidth={2} />
        
        {/* Map path background/accent */}
        <Map className="w-5 h-5 text-brand-emerald absolute -bottom-1 -right-1 opacity-70" strokeWidth={2} />
        
        {/* Sparkle */}
        <Sparkles className="w-4 h-4 text-brand-gold absolute -top-1 -right-1 animate-pulse" strokeWidth={2.5} fill="currentColor" />
      </div>
      <span className={`text-xl ${textColor} flex items-center`}>
        TravelLore <span className="text-brand-emerald ml-1 font-extrabold">AI</span>
      </span>
    </div>
  );
}
