import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'slideInUp' | 'scaleIn';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  once?: boolean;
  threshold?: number;
  margin?: string;
}

const sectionVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: { delay: number; duration: number }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: { delay: number; duration: number }) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: { delay: number; duration: number }) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (custom: { delay: number; duration: number }) => ({
      opacity: 1,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: "easeOut"
      }
    })
  },
  slideInUp: {
    hidden: { opacity: 0, y: 100 },
    visible: (custom: { delay: number; duration: number }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: { delay: number; duration: number }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export function AnimatedSection({
  children,
  className = '',
  id,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  stagger = false,
  once = true,
  threshold = 0.1,
  margin = "-100px"
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin 
  });

  if (stagger) {
    return (
      <motion.section
        ref={ref}
        id={id}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={sectionVariants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Parallax section for advanced effects
export function ParallaxSection({
  children,
  className = '',
  id,
  offset = 50
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  offset?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{
        transform: isInView ? `translateY(0px)` : `translateY(${offset}px)`,
        transition: "transform 0.6s ease-out"
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Intersection observer based section
export function InViewSection({
  children,
  className = '',
  id,
  onInView,
  threshold = 0.5
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onInView?: () => void;
  threshold?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold });

  React.useEffect(() => {
    if (isInView && onInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}