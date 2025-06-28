import React, { useState } from 'react';
import { EnhancedLandingPage } from './enhanced-landing-page';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

interface LandingPageProps {
  onNavigate?: (page: 'landing' | 'dashboard' | 'pricing' | 'contact') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const prefersReducedMotion = useReducedMotion();

  // Use animated version unless user prefers reduced motion
  return (
    <EnhancedLandingPage onNavigate={onNavigate} />
  );
}