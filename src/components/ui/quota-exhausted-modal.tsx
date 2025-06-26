import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';

interface QuotaExhaustedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onUpgrade: () => void;
  isLoggedIn?: boolean;
}

export function QuotaExhaustedModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  onUpgrade,
  isLoggedIn = false 
}: QuotaExhaustedModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-gray-900/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-xl w-full max-w-md p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Translation Limit Reached
              </h2>
              
              <p className="text-white/90 leading-relaxed">
                {isLoggedIn 
                  ? "You've reached your weekly free limit. Upgrade to Pro for unlimited access!" 
                  : "You've used all free translations."
                }
              </p>
            </div>

            <div className="space-y-3">
              {!isLoggedIn && (
                <Button
                  onClick={onLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Login for more free translations
                </Button>
              )}
              
              <Button
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Upgrade to Pro
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}