import React from 'react';
import { X, AlertTriangle, Crown, Calendar, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';
import { getDaysUntilReset } from '../../lib/translationLimits';

interface QuotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'guest-limit' | 'user-limit';
  onLogin: () => void;
  onUpgrade: () => void;
}

export function QuotaModal({ isOpen, onClose, type, onLogin, onUpgrade }: QuotaModalProps) {
  const daysUntilReset = getDaysUntilReset();
  
  const isGuestLimit = type === 'guest-limit';
  
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                {isGuestLimit ? (
                  <AlertTriangle className="w-8 h-8 text-white" />
                ) : (
                  <Calendar className="w-8 h-8 text-white" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                {isGuestLimit ? 'Free Translation Limit Reached' : 'Weekly Quota Reached'}
              </h2>
              
              <p className="text-white/90 leading-relaxed">
                {isGuestLimit 
                  ? "You've reached your free translation limit. Please log in to use more free translations or upgrade to Pro for unlimited access."
                  : `You've reached your weekly free limit. Upgrade to Pro to continue, or wait until your quota resets in ${daysUntilReset} day${daysUntilReset !== 1 ? 's' : ''}.`
                }
              </p>
            </div>

            <div className="space-y-3">
              {isGuestLimit && (
                <Button
                  onClick={onLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login for More Free Translations
                </Button>
              )}
              
              <Button
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro - Unlimited Access
              </Button>
              
              {!isGuestLimit && (
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">Quota Reset Information</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Your weekly free quota will reset in <span className="font-semibold text-purple-400">{daysUntilReset} day{daysUntilReset !== 1 ? 's' : ''}</span>. 
                    You can generate more translations then!
                  </p>
                </div>
              )}
            </div>

            {/* Pro Plan Benefits */}
            <div className="mt-6 pt-4 border-t border-gray-600/30">
              <h3 className="text-sm font-semibold text-white mb-3">Pro Plan Benefits:</h3>
              <ul className="text-xs text-white/80 space-y-1">
                <li>• Unlimited translations</li>
                <li>• All generation modes unlocked</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
                <li>• Early access to new features</li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}