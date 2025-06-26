import React, { useState } from 'react';
import { PricingEnhanced } from './pricing-enhanced';
import { AuthModal } from './auth-modal';
import { BoltBadge } from './bolt-badge';
import { Footer } from './footer';
import { TestimonialsSection } from './testimonials-section';

interface PricingPageProps {
  onLogin?: () => void;
  onUpgrade?: () => void;
}

export function PricingPage({ onLogin, onUpgrade }: PricingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleContactSales = () => {
    window.open('mailto:sales@decodedesk.com?subject=Enterprise%20Plan%20Inquiry', '_blank');
  };

  const handleUpgradeClick = () => {
    // For Pro and Teams plans, redirect to payment/upgrade workflow
    onUpgrade?.();
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    onLogin?.();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Bolt.new Badge - Fixed Position */}
      <BoltBadge />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      
      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                <span className="font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DecodeDesk</h1>
                <p className="text-sm text-gray-300">Pricing Plans</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={onLogin}
                className="h-10 rounded-full border border-gray-600 px-6 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Back to Home
              </button>
              <button 
                onClick={handleGetStarted}
                className="h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10">
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
                "Basic analytics",
                "✗ No new corporate/GenZ word creation",
                "✗ No GenZ to Corporate/Corporate to GenZ translations"
              ],
              description: "Perfect for getting started",
              buttonText: "Start Free",
              isPopular: false,
              onClick: handleGetStarted
            },
            {
              name: "PRO",
              price: "10",
              yearlyPrice: "8",
              period: "month",
              features: [
                "✓ Inter-translation",
                "✓ New word creation",
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
              onClick: handleUpgradeClick
            },
            {
              name: "TEAM/ENTERPRISE",
              price: "99",
              yearlyPrice: "89",
              period: "month",
              features: [
                "✓ Unlimited translations",
                "✓ 60 new word creations",
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
              onClick: handleContactSales
            },
          ]}
          title="Choose Your Plan"
          description="Start free and upgrade as you grow. No hidden fees."
          onGetStarted={handleGetStarted}
          onContactSales={handleContactSales}
        />
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}