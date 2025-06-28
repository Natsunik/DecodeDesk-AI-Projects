import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// Hook for conditional animation props
export function useAnimationProps(defaultProps: any, reducedProps: any = {}) {
  const prefersReducedMotion = useReducedMotion();
  
  return prefersReducedMotion ? { ...defaultProps, ...reducedProps } : defaultProps;
}

// Hook for performance-aware animations
export function usePerformantAnimation() {
  const [isHighPerformance, setIsHighPerformance] = useState(true);
  
  useEffect(() => {
    // Check for performance indicators
    const checkPerformance = () => {
      // Check if device has limited resources
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData
      );
      
      // Check for low-end device indicators
      const isLowEndDevice = navigator.hardwareConcurrency <= 2;
      
      setIsHighPerformance(!isSlowConnection && !isLowEndDevice);
    };
    
    checkPerformance();
  }, []);
  
  return isHighPerformance;
}