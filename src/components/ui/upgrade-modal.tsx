import React from 'react';
import { X, Crown, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
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
            className="relative bg-gray-900/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-xl w-full max-w-2xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">
                Upgrade to DecodeDesk Pro
              </h2>
              
              <p className="text-white/90 text-lg">
                Unlock unlimited translations and premium features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Free Plan */}
              <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
                  <div className="text-3xl font-bold text-white">$0</div>
                  <p className="text-white/70 text-sm">Current plan</p>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white/80 text-sm">5 translations per week</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white/80 text-sm">Basic decode modes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white/80 text-sm">Example phrases</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-white/60 text-sm line-through">Word generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-white/60 text-sm line-through">Cross-cultural translation</span>
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    RECOMMENDED
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
                  <div className="text-3xl font-bold text-white">$5<span className="text-lg text-white/70">/month</span></div>
                  <p className="text-white/70 text-sm">Billed monthly</p>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white text-sm font-medium">Unlimited translations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white text-sm">All decode modes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white text-sm">Word generation engine</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white text-sm">Cross-cultural translation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-white text-sm">Priority support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 text-white border-gray-500/60 hover:bg-gray-700/60"
              >
                Maybe Later
              </Button>
              <Button
                onClick={onUpgrade}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>

            <p className="text-center text-xs text-white/60 mt-4">
              Cancel anytime. No hidden fees. 30-day money-back guarantee.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}