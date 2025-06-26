import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoltBadge } from './bolt-badge';
import { BarChart3, Users, Settings, CreditCard, LogOut, Brain } from 'lucide-react';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Analytics } from '../Analytics';
import { TranslationForm } from '../TranslationForm';
import { UpgradeModal } from './upgrade-modal';
import { BillingTab } from './billing-tab';
import { QuotaExhaustedModal } from './quota-exhausted-modal';
import { DashboardUpgradeModal } from './dashboard-upgrade-modal';
import { supabase } from '../../lib/supabase';
import { Footer } from './footer';
import toast from 'react-hot-toast';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

type DashboardTab = 'translate' | 'analytics' | 'leaders' | 'settings' | 'billing';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('translate');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refreshAnalytics, setRefreshAnalytics] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [showDashboardUpgrade, setShowDashboardUpgrade] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false); // Close mobile menu when tab is selected
  };

  const handleTranslationComplete = () => {
    setRefreshAnalytics(prev => prev + 1);
  };
  
  const handleUpgrade = () => {
    setShowDashboardUpgrade(true);
  };
  
  const handleUpgradeConfirm = () => {
    setShowDashboardUpgrade(false);
    // Here you would integrate with your payment processor
    toast.success('Redirecting to payment...');
  };

  const tabs = [
    { id: 'translate', label: 'Translate', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leaders', label: 'Leaders', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

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
                <p className="text-sm text-gray-300">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
        </AnimatePresence>
        
        {/* Mobile Navigation Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-600/50 z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    <span className="font-bold text-lg">🧠</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">DecodeDesk</h1>
                    <p className="text-sm text-gray-300">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as DashboardTab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg'
                          : 'text-white/90 hover:bg-purple-600/30 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as DashboardTab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg'
                          : 'text-white/90 hover:bg-purple-600/30 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 w-full">
            {activeTab === 'translate' && (
              <div className="space-y-6">
                <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-white">Corporate Speak Translator</h2>
                    <p className="text-white/90">Unlimited translations with your Pro account</p>
                  </CardHeader>
                </Card>
                {/*<TranslationForm onTranslationComplete={handleTranslationComplete} /> thi code is used for showing locking of other modes and will unlock in pro*/}
                <TranslationForm 
                  onTranslationComplete={handleTranslationComplete}
                  onUpgrade={handleUpgrade}
                  user={user}
                  onQuotaExhausted={() => setShowQuotaModal(true)}
                />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-white">Your Analytics</h2>
                    <p className="text-white/90">Track your translation usage and trends</p>
                  </CardHeader>
                </Card>
                <div key={refreshAnalytics}>
                  <Analytics />
                </div>
              </div>
            )}

            {activeTab === 'leaders' && (
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
                  <p className="text-white/90">Top users and most translated phrases</p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-white">Communication Leaderboard coming soon!</p>
                    <p className="text-sm text-white/80 mt-2">See how you rank against other creators and translators</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                  <p className="text-white/90">Manage your account preferences</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user?.user_metadata?.full_name || ''}
                        disabled
                        className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50"
                      />
                    </div>
                    <Button variant="outline" className="text-white border-purple-500/60 hover:bg-purple-600/30">
                      Update Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <BillingTab 
                user={user}
                currentPlan="free"
                onUpgrade={handleUpgrade}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer onNavigate={(page) => {
        if (page === 'contact') {
          // For logged-in users, you might want to handle this differently
          // For now, we'll just open a new window or show a contact modal
          window.open('mailto:support@decodedesk.com', '_blank');
        }
      }} />
      
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgradeConfirm}
      />
      
      {/* Quota Exhausted Modal */}
      <QuotaExhaustedModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        onLogin={() => setShowQuotaModal(false)}
        onUpgrade={() => {
          setShowQuotaModal(false);
          setShowDashboardUpgrade(true);
        }}
        isLoggedIn={true}
      />
      
      {/* Dashboard Upgrade Modal */}
      <DashboardUpgradeModal
        isOpen={showDashboardUpgrade}
        onClose={() => setShowDashboardUpgrade(false)}
        onUpgrade={handleUpgradeConfirm}
      />
    </div>
  );
}