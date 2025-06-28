import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation, useReducedMotion } from '../../hooks/use-scroll-animation';

// Animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Reusable animated components
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({ 
  children, 
  className = '', 
  variant = 'fadeInUp',
  delay = 0,
  threshold = 0.1
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold, once: true });
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn
  };

  const selectedVariant = variants[variant];

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 0.2
}: StaggeredContainerProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, once: true });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ 
  children, 
  className = '',
  index = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  index?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerItem}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for different use cases
export function AnimatedCard({ 
  children, 
  className = '',
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2, once: true });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] 
        }
      } : {}}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ 
  children, 
  className = '',
  onClick,
  variant = 'primary',
  ...props
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  [key: string]: any;
}) {
  const prefersReducedMotion = useReducedMotion();

  const buttonVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: prefersReducedMotion ? 1 : 1.02,
      boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedHeading({ 
  children, 
  className = '',
  level = 1,
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  delay?: number;
}) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3, once: true });
  const prefersReducedMotion = useReducedMotion();

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  if (prefersReducedMotion) {
    return (
      <HeadingTag ref={ref} className={className}>
        {children}
      </HeadingTag>
    );
  }

  return (
    <motion.div ref={ref}>
      <HeadingTag
        className={className}
        style={{ display: 'inline-block' }}
      >
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }
          } : {}}
          style={{ display: 'inline-block' }}
        >
          {children}
        </motion.span>
      </HeadingTag>
    </motion.div>
  );
}