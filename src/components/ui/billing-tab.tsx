import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../Card';
import { Button } from '../Button';
import { Crown, Check, CreditCard } from 'lucide-react';
import { UpgradeModal } from './upgrade-modal';

interface BillingTabProps {
  user: any;
  currentPlan?: 'free' | 'pro' | 'team';
  onUpgrade?: () => void;
}

export function BillingTab({ user, currentPlan = 'free', onUpgrade }: BillingTabProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgradeConfirm = () => {
    setShowUpgradeModal(false);
    onUpgrade?.();
  };

  const planDetails = {
    free: {
      name: 'Free Starter Plan',
      price: '$0',
      period: 'month',
      features: [
        '5 translations per week',
        'Basic decode modes only',
        'Example phrases',
        'Copy/share features',
        'Basic analytics'
      ],
      limitations: [
        'No new word creation',
        'No cross-cultural translation',
        'Limited advanced features'
      ]
    },
    pro: {
      name: 'Pro Plan',
      price: '$10',
      period: 'month',
      features: [
        'All translation modes',
        '60 translations/20 new word creations',
        'Advanced analytics',
        'Priority support',
        'Custom integrations'
      ]
    },
    team: {
      name: 'Team/Enterprise Plan',
      price: '$99',
      period: 'month',
      features: [
        'Unlimited translations',
        'Up to 30 users',
        'Team analytics dashboard',
        'Advanced security',
        '24-hour support'
      ]
    }
  };

  const current = planDetails[currentPlan];

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Billing & Subscription</h2>
          <p className="text-white/90">Manage your subscription and payment methods</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Plan */}
            <div className={`rounded-lg p-6 border ${
              currentPlan === 'free' 
                ? 'bg-blue-500/20 border-blue-400/50' 
                : 'bg-green-500/20 border-green-400/50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Current Plan: {current.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{current.price}</span>
                    {currentPlan !== 'free' && (
                      <span className="text-white/70">/ {current.period}</span>
                    )}
                  </div>
                </div>
                {currentPlan !== 'free' && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Crown className="w-5 h-5" />
                    <span className="font-medium">Active</span>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Included Features:</h4>
                  <ul className="space-y-1">
                    {current.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {currentPlan === 'free' && current.limitations && (
                  <div>
                    <h4 className="font-medium text-white mb-2">Limitations:</h4>
                    <ul className="space-y-1">
                      {current.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-red-300">
                          <span className="w-4 h-4 text-red-500">✗</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Upgrade Options */}
            {currentPlan === 'free' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Upgrade Options</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 border border-gray-600/50 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Pro - $10/month</h5>
                    <ul className="text-sm text-white/80 space-y-1 mb-4">
                      <li>• All translation modes</li>
                      <li>• 60 translations/20 word creations</li>
                      <li>• Advanced analytics</li>
                      <li>• Priority support</li>
                    </ul>
                    <Button 
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Upgrade to Pro
                    </Button>
                  </div>
                  
                  <div className="bg-gray-800/80 border border-gray-600/50 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Team/Enterprise - $99/month</h5>
                    <ul className="text-sm text-white/80 space-y-1 mb-4">
                      <li>• Unlimited translations</li>
                      <li>• 60 new word creations per month</li>
                      <li>• Up to 30 users</li>
                      <li>• Team analytics</li>
                      <li>• Admin dashboard</li>
                      <li>• Advanced security</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      onClick={() => window.open('mailto:sales@decodedesk.com', '_blank')}
                      className="w-full text-white border-purple-500/60 hover:bg-purple-600/30"
                    >
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method (for paid plans) */}
            {currentPlan !== 'free' && (
              <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <h4 className="font-medium text-white">Payment Method</h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <span className="text-white/90">•••• •••• •••• 4242</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-white border-gray-500/60 hover:bg-gray-700/60">
                    Update
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgradeConfirm}
      />
    </div>
  );
}