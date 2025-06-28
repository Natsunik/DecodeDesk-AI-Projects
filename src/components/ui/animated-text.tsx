import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'slideInUp' | 'typewriter';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  once?: boolean;
}

const textVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
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
    hidden: { opacity: 0, x: -30 },
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
    hidden: { opacity: 0, x: 30 },
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
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const staggerChild = {
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

export function AnimatedText({
  children,
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  stagger = false,
  once = true
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  // Handle typewriter effect separately
  if (variant === 'typewriter') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay }}
        className={className}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: duration, delay: delay + 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  // Handle stagger effect
  if (stagger && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={staggerChild}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Regular animation
  return (
    <motion.div
      ref={ref}
      variants={textVariants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Highlight text with animation
export function AnimatedHighlight({
  children,
  className = '',
  delay = 0,
  color = 'purple'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  color?: 'purple' | 'pink' | 'blue' | 'green';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const colorClasses = {
    purple: 'bg-purple-500/20 text-purple-200',
    pink: 'bg-pink-500/20 text-pink-200',
    blue: 'bg-blue-500/20 text-blue-200',
    green: 'bg-green-500/20 text-green-200'
  };

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`px-2 py-1 rounded-md ${colorClasses[color]} ${className}`}
    >
      {children}
    </motion.span>
  );
}

// Progressive text reveal
export function ProgressiveText({
  text,
  className = '',
  delay = 0,
  charDelay = 0.03
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.3,
            delay: delay + (index * charDelay),
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}