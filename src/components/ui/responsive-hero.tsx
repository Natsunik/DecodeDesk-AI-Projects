import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ResponsiveHeroProps {
  onCtaClick?: () => void;
  onGetStarted?: () => void;
}

export function ResponsiveHero({ onCtaClick, onGetStarted }: ResponsiveHeroProps) {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
    onCtaClick?.();
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center space-x-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-8 border border-white/20"
            >
              <span className="text-sm font-medium text-white">
                Cut through corporate BS with AI!
              </span>
              <ChevronRight className="h-4 w-4 text-white" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white mb-6 lg:mb-8"
            >
              <span className="block">DecodeDesk:</span>
              <span className="block">Bridge Corporate &</span>
              <span className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  GenZ Communication
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Decode corporate speak, translate GenZ slang, create viral new words, and bridge communication gaps between generations with our AI-powered platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 lg:mb-20"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToDemo}
                className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Try It Now - No Signup Required
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToDemo}
                className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-full border border-gray-600 text-white hover:bg-white/10 font-medium text-base sm:text-lg transition-all duration-300"
              >
                See Examples
              </motion.button>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative mx-auto max-w-6xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Corporate meeting with people discussing business"
                className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}