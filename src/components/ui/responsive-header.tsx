import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

interface ResponsiveHeaderProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
  onNavigate?: (page: string) => void;
}

export function ResponsiveHeader({ onGetStarted, onLogin, onNavigate }: ResponsiveHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', action: () => onNavigate?.('contact') }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/20' 
            : 'bg-black/60 backdrop-blur-sm border-b border-white/10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center flex-shrink-0"
            >
              <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-white text-black">
                <span className="font-bold text-sm lg:text-base">🧠</span>
              </div>
              <span className="ml-2 lg:ml-3 text-lg lg:text-xl font-bold text-white">DecodeDesk</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden lg:flex items-center space-x-8"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <button
                      onClick={item.action}
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop CTA Buttons */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:flex items-center space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="h-10 rounded-full border border-gray-600 px-6 text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 text-sm font-medium text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-md border-l border-gray-600/50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-600/30">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                      <span className="font-bold text-sm">🧠</span>
                    </div>
                    <span className="ml-2 text-lg font-bold text-white">DecodeDesk</span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-6">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                      >
                        {item.href ? (
                          <a
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-400 transition-colors duration-300 group"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              item.action?.();
                              closeMobileMenu();
                            }}
                            className="flex items-center justify-between w-full py-3 text-lg font-medium text-white hover:text-purple-400 transition-colors duration-300 group"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-600/30 space-y-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onLogin?.();
                      closeMobileMenu();
                    }}
                    className="w-full h-12 rounded-full border border-gray-600 text-base font-medium text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onGetStarted?.();
                      closeMobileMenu();
                    }}
                    className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base font-medium text-white transition-all duration-300 shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}