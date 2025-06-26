import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingEnhanced } from './pricing-enhanced';

interface PricingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  onUpgrade: () => void;
  onContactSales: () => void;
}

export function PricingPopup({ 
  isOpen, 
  onClose, 
  onGetStarted, 
  onUpgrade, 
  onContactSales 
}: PricingPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-black border border-gray-600/50 rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white transition-colors bg-gray-900/80 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <PricingEnhanced
                plans={[
                  {
                    name: "STARTER",
                    price: "0",
                    yearlyPrice: "0",
                    period: "month",
                    features: [
                      "3 translations as guest for corporate and GenZ/week",
                      "5 translations as logged in users/month",
                      "Fun example phrases",
                      "Copy/share features",
                      "Basic analytics"
                    ],
                    description: "Perfect for getting started",
                    buttonText: "Start Free",
                    isPopular: false,
                    onClick: onGetStarted
                  },
                  {
                    name: "PRO",
                    price: "10",
                    yearlyPrice: "8",
                    period: "month",
                    features: [
                      "All modes/features enabled",
                      "60 translations/20 new word creations",
                      "Advanced analytics",
                      "Advanced tone rewrite",
                      "48-hour support response time",
                      "Jargon analytics",
                      "Priority support",
                      "Custom integrations"
                    ],
                    description: "For professionals who need more",
                    buttonText: "Upgrade to Pro",
                    isPopular: true,
                    onClick: onUpgrade
                  },
                  {
                    name: "TEAM/ENTERPRISE",
                    price: "99",
                    yearlyPrice: "89",
                    period: "month",
                    features: [
                      "✓ Unlimited translations",
                      "✓ 60 new word creations per month",
                      "Everything in Professional",
                      "Up to 30 users",
                      "Team analytics admin dashboard",
                      "Priority support",
                      "Advanced security",
                      "24-hour support response time"
                    ],
                    description: "For teams and organizations",
                    buttonText: "Contact Sales",
                    isPopular: false,
                    onClick: onContactSales
                  },
                ]}
                title="Choose Your Plan"
                description="Start free and upgrade as you grow. No hidden fees."
                onGetStarted={onGetStarted}
                onContactSales={onContactSales}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}