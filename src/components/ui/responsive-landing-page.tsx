import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveHeader } from './responsive-header';
import { ResponsiveHero } from './responsive-hero';
import { BoltBadge } from './bolt-badge';
import { AuthModal } from './auth-modal';
import { PricingEnhanced } from './pricing-enhanced';
import { PricingPopup } from './pricing-popup';
import { QuotaExhaustedModal } from './quota-exhausted-modal';
import { TestimonialsSection } from './testimonials-section';
import { TranslationForm } from '../TranslationForm';
import { Analytics } from '../Analytics';
import { UpgradeModal } from './upgrade-modal';
import { 
  AnimatedSection, 
  StaggeredContainer, 
  StaggeredItem, 
  AnimatedCard, 
  AnimatedButton, 
  AnimatedHeading 
} from './animated-elements';

interface ResponsiveLandingPageProps {
  onNavigate?: (page: 'landing' | 'dashboard' | 'pricing' | 'contact') => void;
}

export function ResponsiveLandingPage({ onNavigate }: ResponsiveLandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [refreshAnalytics, setRefreshAnalytics] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setShowPricingPopup(true);
  };
  
  const handleGetStartedFromPopup = () => {
    setShowPricingPopup(false);
    setAuthMode('signup');
    setShowAuthModal(true);
  };
  
  const handleUpgrade = () => {
    setShowPricingPopup(false);
    setShowUpgradeModal(true);
  };
  
  const handleUpgradeConfirm = () => {
    setShowUpgradeModal(false);
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleTranslationComplete = () => {
    setRefreshAnalytics(prev => prev + 1);
  };
  
  const handleSupport = () => {
    window.open('https://buymeacoffee.com/decodedesk', '_blank');
  };
  
  const handleContactSales = () => {
    setShowPricingPopup(false);
    window.open('mailto:sales@decodedesk.com?subject=Enterprise%20Plan%20Inquiry', '_blank');
  };
  
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {/* Bolt.new Badge - Fixed Position */}
      <BoltBadge />
      
      {/* Responsive Header */}
      <ResponsiveHeader 
        onGetStarted={handleGetStarted}
        onLogin={handleLogin}
        onNavigate={onNavigate}
      />

      {/* Responsive Hero Section */}
      <ResponsiveHero 
        onGetStarted={handleGetStarted}
      />

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12 lg:mb-20">
            <AnimatedHeading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Corporate & GenZ Communication Hub
            </AnimatedHeading>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Decode corporate jargon, translate GenZ slang, create viral words, and bridge generational communication gaps
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              { icon: "📝", title: "Decode Corporate Speak", desc: "Transform corporate jargon into honest, plain English that everyone understands" },
              { icon: "✨", title: "Generate New Words", desc: "Create viral corporate buzzwords and authentic GenZ slang with AI-generated meanings" },
              { icon: "🔄", title: "Cross-Cultural Translation", desc: "Seamlessly translate between GenZ slang and corporate speak for perfect communication" },
              { icon: "🚀", title: "Share & Go Viral", desc: "Create shareable content, build your word collection, and go viral on social media" }
            ].map((item, index) => (
              <StaggeredItem key={index}>
                <AnimatedCard className="text-center p-6 lg:p-8 h-full bg-gray-900/50 backdrop-blur-sm border border-gray-600/30 rounded-xl hover:border-purple-500/50 transition-all duration-300">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6"
                  >
                    <span className="text-2xl lg:text-3xl">{item.icon}</span>
                  </motion.div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/80 text-sm lg:text-base leading-relaxed">{item.desc}</p>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 lg:py-24 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <TranslationForm 
              onTranslationComplete={handleTranslationComplete}
              onUpgrade={() => setShowPricingPopup(true)}
              onLogin={handleLogin}
              onQuotaExhausted={() => setShowQuotaModal(true)}
            />
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-12 lg:py-16 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div key={refreshAnalytics} className="max-w-5xl mx-auto">
            <Analytics />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12 lg:mb-20">
            <AnimatedHeading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Why DecodeDesk is the Ultimate Communication Bridge
            </AnimatedHeading>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Bridge corporate and GenZ communication with powerful AI features designed for every generation.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: "✨", title: "Word Generation Engine", desc: "Generate viral corporate buzzwords and authentic GenZ slang with AI-powered creativity and real-world meanings." },
              { icon: "🔄", title: "Cross-Cultural Bridge", desc: "Break down generational barriers by translating between corporate speak and GenZ slang effortlessly." },
              { icon: "📊", title: "Analytics Dashboard", desc: "Monitor translation trends, track viral word creations, and analyze communication patterns across generations." },
              { icon: "📋", title: "Easy Sharing", desc: "Share translations instantly across platforms. Perfect for social media, team communication, and viral content." },
              { icon: "🎯", title: "Viral Content Creation", desc: "Create viral-ready content for TikTok, Instagram, and LinkedIn with original word creations that resonate." },
              { icon: "🔒", title: "Privacy First", desc: "Your creative content stays secure. We protect your word creations and never share your translations." }
            ].map((feature, index) => (
              <StaggeredItem key={index}>
                <AnimatedCard className="text-center p-6 lg:p-8 h-full rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6"
                  >
                    <span className="text-2xl lg:text-3xl">{feature.icon}</span>
                  </motion.div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-sm lg:text-base leading-relaxed">{feature.desc}</p>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
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
              buttonText: "Get Started",
              isPopular: true,
            },
            {
              name: "TEAM/ENTERPRISE",
              price: "99",
              yearlyPrice: "89",
              period: "month",
              features: [
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
            },
          ]}
          title="DecodeDesk Pricing"
          description="Start free and upgrade as you grow. No hidden fees."
          onGetStarted={handleGetStarted}
          onContactSales={handleContactSales}
        />
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Support Us */}
      <section className="py-12 lg:py-16 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-500 text-2xl"
              >
                ❤️
              </motion.span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">Love DecodeDesk?</h3>
            </div>
            
            <p className="text-lg lg:text-xl text-white/80 mb-8">
              Help keep us free—buy us a coffee or upgrade for more features!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                onClick={handleSupport}
                className="flex items-center justify-center gap-2 border border-purple-500/60 text-white hover:bg-purple-600/30 px-6 py-3 rounded-lg transition-all duration-300"
              >
                <span>☕</span>
                Support DecodeDesk
              </AnimatedButton>
              <AnimatedButton 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                Upgrade to Pro
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12 lg:mb-20">
            <AnimatedHeading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Frequently Asked Questions
            </AnimatedHeading>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about DecodeDesk
            </p>
          </AnimatedSection>

          <StaggeredContainer className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "Is my data safe?", a: "Yes! We use enterprise-grade security and never store your personal messages. All translations are processed securely and deleted after processing." },
              { q: "How is 'translation' done?", a: "We use advanced AI (DeepSeek) to understand corporate jargon and translate it into honest, plain English while maintaining the original meaning." },
              { q: "Do you store my messages?", a: "We only store anonymous usage statistics to improve our service. Your actual messages are never saved or shared." },
              { q: "How do I upgrade?", a: "Click any 'Upgrade' button to access our Pro plan with unlimited translations and advanced features for just $10/month." },
              { q: "How do team plans work?", a: "Team plans include up to 30 users, shared analytics dashboard, admin controls, and priority support for $99/month." }
            ].map((faq, index) => (
              <StaggeredItem key={index}>
                <AnimatedCard className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg hover:border-purple-500/50 transition-all duration-300">
                  <div className="px-6 py-4 lg:px-8 lg:py-6">
                    <h4 className="font-semibold text-white mb-2 text-lg">{faq.q}</h4>
                    <p className="text-white/90 leading-relaxed">{faq.a}</p>
                  </div>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <AnimatedHeading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-white">
              Ready to Bridge Every Generation?
            </AnimatedHeading>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of professionals and creators using DecodeDesk to communicate across generations and create viral content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <AnimatedButton
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 lg:px-10 lg:py-4 rounded-lg text-base lg:text-lg font-medium transition-all duration-300"
              >
                Get Started Free
              </AnimatedButton>
              <AnimatedButton
                onClick={handleLogin}
                className="border border-purple-500/60 text-white hover:bg-purple-600/30 px-8 py-3 lg:px-10 lg:py-4 rounded-lg text-base lg:text-lg font-medium transition-all duration-300"
              >
                Login
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <StaggeredItem>
              <div className="flex items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black mr-2">
                  <span className="font-bold">🧠</span>
                </div>
                <span className="text-xl font-bold">DecodeDesk</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                AI-powered communication bridge for corporate teams and GenZ creators. Translate, create, and go viral.
              </p>
            </StaggeredItem>
            
            {[
              { title: "Product", items: ["Features", "Pricing", "Examples", "API"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
              { title: "Support", items: ["Help Center", "Privacy", "Terms", "Security"] }
            ].map((section, index) => (
              <StaggeredItem key={section.title}>
                <h3 className="font-semibold mb-4 text-lg">{section.title}</h3>
                <ul className="space-y-2 text-white/70">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
          
          <AnimatedSection className="border-t border-gray-800 mt-8 lg:mt-12 pt-8 text-center text-gray-400">
            <p className="text-white/70">
              Made with ❤️ by DecodeDesk | 
              <a href="#privacy" className="hover:text-white ml-1 transition-colors duration-300">Privacy Policy</a> | 
              <button onClick={() => onNavigate?.('contact')} className="hover:text-white ml-1 transition-colors duration-300">Contact</button> | 
              <a href="#twitter" className="hover:text-white ml-1 transition-colors duration-300">Twitter/X</a> | 
              <a href="#github" className="hover:text-white ml-1 transition-colors duration-300">GitHub</a>
            </p>
          </AnimatedSection>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
            onModeChange={setAuthMode}
            onSuccess={handleAuthSuccess}
          />
        )}
        
        {showPricingPopup && (
          <PricingPopup
            isOpen={showPricingPopup}
            onClose={() => setShowPricingPopup(false)}
            onGetStarted={handleGetStartedFromPopup}
            onUpgrade={handleUpgrade}
            onContactSales={handleContactSales}
          />
        )}
        
        {showQuotaModal && (
          <QuotaExhaustedModal
            isOpen={showQuotaModal}
            onClose={() => setShowQuotaModal(false)}
            onLogin={() => {
              setShowQuotaModal(false);
              handleLogin();
            }}
            onUpgrade={() => {
              setShowQuotaModal(false);
              handleUpgrade();
            }}
            isLoggedIn={false}
          />
        )}
        
        {showUpgradeModal && (
          <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
            onUpgrade={handleUpgradeConfirm}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}