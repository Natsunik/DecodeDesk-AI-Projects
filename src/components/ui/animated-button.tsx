import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  floatingEffect?: boolean;
}

const buttonVariants = {
  primary: {
    rest: { 
      scale: 1,
      background: "linear-gradient(to right, #9333ea, #ec4899)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.02,
      background: "linear-gradient(to right, #7c3aed, #db2777)",
      boxShadow: "0 10px 15px -3px rgba(147, 51, 234, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  secondary: {
    rest: { 
      scale: 1,
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      borderColor: "rgba(147, 51, 234, 0.6)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(147, 51, 234, 0.3)",
      borderColor: "rgba(147, 51, 234, 0.8)",
      boxShadow: "0 10px 15px -3px rgba(147, 51, 234, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  outline: {
    rest: { 
      scale: 1,
      backgroundColor: "transparent",
      borderColor: "rgba(147, 51, 234, 0.6)",
      boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      borderColor: "rgba(147, 51, 234, 0.8)",
      boxShadow: "0 8px 12px -2px rgba(147, 51, 234, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  ghost: {
    rest: { 
      scale: 1,
      backgroundColor: "transparent",
      boxShadow: "none"
    },
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  floatingEffect = false,
  ...props
}: AnimatedButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border';
  
  const variantClasses = {
    primary: 'text-white focus:ring-purple-500 border-transparent',
    secondary: 'text-white focus:ring-purple-500 border-purple-500/60',
    outline: 'text-white focus:ring-purple-500 border-purple-500/60',
    ghost: 'text-white focus:ring-purple-500 border-transparent'
  };

  return (
    <motion.button
      variants={buttonVariants[variant]}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      animate={floatingEffect && !disabled ? floatingAnimation : "rest"}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      style={{
        // Ensure CSS variables work with Framer Motion
        background: variant === 'primary' ? undefined : 'var(--bg-color)',
        borderColor: variant === 'primary' ? undefined : 'var(--border-color)'
      }}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
        />
      )}
      {children}
    </motion.button>
  );
}