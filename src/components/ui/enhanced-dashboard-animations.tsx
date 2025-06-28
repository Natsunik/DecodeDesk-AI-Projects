import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
import { 
  AnimatedSection, 
  StaggeredContainer, 
  StaggeredItem, 
  AnimatedCard, 
  AnimatedButton 
} from './animated-elements';
import toast from 'react-hot-toast';

interface EnhancedDashboardAnimationsProps {
  user: any;
  onLogout: () => void;
}

type DashboardTab = 'translate' | 'analytics' | 'leaders' | 'settings' | 'billing';

// Brand colors
const brandColors = {
  primary: '#8B5CF6',
  secondary: '#EC4899',
  accent: '#3B82F6'
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const cardRevealVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

const tabVariants = {
  inactive: { 
    scale: 1,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.7)"
  },
  active: { 
    scale: 1.02,
    background: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.secondary})`,
    color: "white",
    boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    color: "white",
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const loadingVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const microInteractionVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export function EnhancedDashboardAnimations({ user, onLogout }: EnhancedDashboardAnimationsProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('translate');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refreshAnalytics, setRefreshAnalytics] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [showDashboardUpgrade, setShowDashboardUpgrade] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    // Simulate loading and trigger animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCardsLoaded(true);
      controls.start("visible");
    }, 500);

    return () => clearTimeout(timer);
  }, [controls]);

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
    setMobileMenuOpen(false);
  };

  const handleTranslationComplete = () => {
    setRefreshAnalytics(prev => prev + 1);
  };
  
  const handleUpgrade = () => {
    setShowDashboardUpgrade(true);
  };
  
  const handleUpgradeConfirm = () => {
    setShowDashboardUpgrade(false);
    toast.success('Redirecting to payment...');
  };

  const tabs = [
    { id: 'translate', label: 'Translate', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leaders', label: 'Leaders', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  if (isLoading) {
    return (
      <motion.div
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white"
          >
            Loading Dashboard...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black"
    >
      {/* Bolt.new Badge */}
      <BoltBadge />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))]" />
      
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                <span className="font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DecodeDesk</h1>
                <p className="text-sm text-gray-300">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
              </div>
            </motion.div>
            <motion.div
              variants={microInteractionVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
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
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    <span className="font-bold text-lg">🧠</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">DecodeDesk</h1>
                    <p className="text-sm text-gray-300">Dashboard</p>
                  </div>
                </motion.div>
                
                <nav className="space-y-2">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      variants={tabVariants}
                      animate={activeTab === tab.id ? "active" : "inactive"}
                      whileHover="hover"
                      onClick={() => handleTabChange(tab.id as DashboardTab)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200"
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block lg:col-span-1"
          >
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      custom={index}
                      variants={cardRevealVariants}
                      initial="hidden"
                      animate={cardsLoaded ? "visible" : "hidden"}
                      whileHover="hover"
                      onClick={() => handleTabChange(tab.id as DashboardTab)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200"
                      style={{
                        background: activeTab === tab.id 
                          ? `linear-gradient(to right, ${brandColors.primary}, ${brandColors.secondary})`
                          : 'transparent',
                        color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.9)',
                        boxShadow: activeTab === tab.id 
                          ? '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
                          : 'none'
                      }}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </motion.button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 w-full"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'translate' && (
                <motion.div
                  key="translate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <AnimatedCard delay={0}>
                    <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                      <CardHeader>
                        <h2 className="text-2xl font-bold text-white">Corporate Speak Translator</h2>
                        <p className="text-white/90">Unlimited translations with your Pro account</p>
                      </CardHeader>
                    </Card>
                  </AnimatedCard>
                  
                  <AnimatedCard delay={0.1}>
                    <TranslationForm 
                      onTranslationComplete={handleTranslationComplete}
                      onUpgrade={handleUpgrade}
                      user={user}
                      onQuotaExhausted={() => setShowQuotaModal(true)}
                    />
                  </AnimatedCard>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <AnimatedCard delay={0}>
                    <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                      <CardHeader>
                        <h2 className="text-2xl font-bold text-white">Your Analytics</h2>
                        <p className="text-white/90">Track your translation usage and trends</p>
                      </CardHeader>
                    </Card>
                  </AnimatedCard>
                  
                  <AnimatedCard delay={0.1} key={refreshAnalytics}>
                    <Analytics />
                  </AnimatedCard>
                </motion.div>
              )}

              {activeTab === 'leaders' && (
                <motion.div
                  key="leaders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                    <CardHeader>
                      <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
                      <p className="text-white/90">Top users and most translated phrases</p>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center py-12"
                      >
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-white">Communication Leaderboard coming soon!</p>
                        <p className="text-sm text-white/80 mt-2">See how you rank against other creators and translators</p>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                    <CardHeader>
                      <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                      <p className="text-white/90">Manage your account preferences</p>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                      >
                        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                          <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                          <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50"
                          />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                          <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={user?.user_metadata?.full_name || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50"
                          />
                        </motion.div>
                        <motion.div
                          variants={microInteractionVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Button variant="outline" className="text-white border-purple-500/60 hover:bg-purple-600/30">
                            Update Profile
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <BillingTab 
                    user={user}
                    currentPlan="free"
                    onUpgrade={handleUpgrade}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer onNavigate={(page) => {
        if (page === 'contact') {
          window.open('mailto:support@decodedesk.com', '_blank');
        }
      }} />
      
      {/* Modals */}
      <AnimatePresence>
        {showUpgradeModal && (
          <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
            onUpgrade={handleUpgradeConfirm}
          />
        )}
        
        {showQuotaModal && (
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
        )}
        
        {showDashboardUpgrade && (
          <DashboardUpgradeModal
            isOpen={showDashboardUpgrade}
            onClose={() => setShowDashboardUpgrade(false)}
            onUpgrade={handleUpgradeConfirm}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}