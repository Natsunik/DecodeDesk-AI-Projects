import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { HeroSection } from './hero-section-dark';
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

interface EnhancedLandingPageProps {
  onNavigate?: (page: 'landing' | 'dashboard' | 'pricing' | 'contact') => void;
}

export function EnhancedLandingPage({ onNavigate }: EnhancedLandingPageProps) {
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

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Bolt.new Badge - Fixed Position */}
      <BoltBadge />
      
      {/* Navigation */}
      <AnimatedSection variant="fadeInUp" delay={0.2}>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                <span className="font-bold">🧠</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">DecodeDesk</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden md:flex items-center space-x-6"
            >
              <StaggeredContainer staggerDelay={0.1} className="flex items-center space-x-6">
                {['Features', 'About', 'Pricing'].map((item, index) => (
                  <StaggeredItem key={item} index={index}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </StaggeredItem>
                ))}
                <StaggeredItem index={3}>
                  <button
                    onClick={() => onNavigate?.('contact')}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Contact us
                  </button>
                </StaggeredItem>
              </StaggeredContainer>
              
              <motion.div 
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center space-x-3"
              >
                <AnimatedButton
                  onClick={handleLogin}
                  variant="secondary"
                  className="h-10 rounded-full border border-gray-600 px-6 text-sm font-medium text-white hover:bg-white/10"
                >
                  Login
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleGetStarted}
                  variant="primary"
                  className="h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 text-sm font-medium text-white"
                >
                  Get Started
                </AnimatedButton>
              </motion.div>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="md:hidden"
            >
              <AnimatedButton
                onClick={handleGetStarted}
                variant="primary"
                className="h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 text-sm font-medium text-white"
              >
                Get Started
              </AnimatedButton>
            </motion.div>
          </div>
        </nav>
      </AnimatedSection>

      {/* Hero Section */}
      <AnimatedSection delay={0.3}>
        <HeroSection 
          onCtaClick={scrollToDemo}
          className="text-white"
          title="Bridge Corporate & GenZ Communication!"
          subtitle={{
            regular: "DecodeDesk: AI-Powered Translation & Word Creation for ",
            gradient: "Every Generation"
          }}
          description="Decode corporate/GenZ speak, translate GenZ slang, create viral new words, and bridge communication gaps between generations with our AI-powered platform."
          gridOptions={{
            angle: 65,
            opacity: 0.3,
            cellSize: 50,
            lightLineColor: "#4a4a4a",
            darkLineColor: "#2a2a2a",
          }}
        />
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection delay={0.1} className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedHeading level={2} delay={0.2} className="text-4xl font-bold text-white mb-4 text-center">
            Corporate & GenZ Communication Hub
          </AnimatedHeading>
          
          <AnimatedSection variant="fadeInUp" delay={0.4} className="text-center mb-16">
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Decode corporate jargon, translate GenZ slang, create viral words, and bridge generational communication gaps
            </p>
          </AnimatedSection>

          <StaggeredContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "📝", title: "Decode Corporate Speak", desc: "Transform corporate jargon into honest, plain English that everyone understands" },
              { icon: "✨", title: "Generate New Words", desc: "Create viral corporate buzzwords and authentic GenZ slang with AI-generated meanings" },
              { icon: "🔄", title: "Cross-Cultural Translation", desc: "Seamlessly translate between GenZ slang and corporate speak for perfect communication" },
              { icon: "🚀", title: "Share & Go Viral", desc: "Create shareable content, build your word collection, and go viral on social media" }
            ].map((item, index) => (
              <StaggeredItem key={index} index={index}>
                <AnimatedCard className="text-center p-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6"
                  >
                    <span className="text-2xl">{item.icon}</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* Demo Section */}
      <AnimatedSection id="demo" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <TranslationForm 
              onTranslationComplete={handleTranslationComplete}
              onUpgrade={() => setShowPricingPopup(true)}
              onLogin={handleLogin}
              onQuotaExhausted={() => setShowQuotaModal(true)}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Analytics Preview */}
      <AnimatedSection className="py-12 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div key={refreshAnalytics} className="max-w-4xl mx-auto">
            <Analytics />
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection id="features" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedHeading level={2} delay={0.2} className="text-4xl font-bold text-white mb-4 text-center">
            Why DecodeDesk is the Ultimate Communication Bridge
          </AnimatedHeading>
          
          <AnimatedSection variant="fadeInUp" delay={0.4} className="text-center mb-16">
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Bridge corporate and GenZ communication with powerful AI features designed for every generation.
            </p>
          </AnimatedSection>

          <StaggeredContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "✨", title: "Word Generation Engine", desc: "Generate viral corporate buzzwords and authentic GenZ slang with AI-powered creativity and real-world meanings." },
              { icon: "🔄", title: "Cross-Cultural Bridge", desc: "Break down generational barriers by translating between corporate speak and GenZ slang effortlessly." },
              { icon: "📊", title: "Analytics Dashboard", desc: "Monitor translation trends, track viral word creations, and analyze communication patterns across generations." },
              { icon: "📋", title: "Easy Sharing", desc: "Share translations instantly across platforms. Perfect for social media, team communication, and viral content." },
              { icon: "🎯", title: "Viral Content Creation", desc: "Create viral-ready content for TikTok, Instagram, and LinkedIn with original word creations that resonate." },
              { icon: "🔒", title: "Privacy First", desc: "Your creative content stays secure. We protect your word creations and never share your translations." }
            ].map((feature, index) => (
              <StaggeredItem key={index} index={index}>
                <AnimatedCard className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/30 hover:border-purple-500/50 transition-colors duration-300">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed">{feature.desc}</p>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection id="pricing">
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
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>

      {/* Support Us */}
      <AnimatedSection className="py-12 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-500 text-2xl"
              >
                ❤️
              </motion.span>
              <h3 className="text-2xl font-bold text-white">Love DecodeDesk?</h3>
            </div>
            
            <p className="text-lg text-white/80 mb-8">
              Help keep us free—buy us a coffee or upgrade for more features!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                onClick={handleSupport}
                variant="secondary"
                className="flex items-center justify-center gap-2 border border-purple-500/60 text-white hover:bg-purple-600/30 px-6 py-3 rounded-lg"
              >
                <span>☕</span>
                Support DecodeDesk
              </AnimatedButton>
              <AnimatedButton 
                onClick={handleGetStarted}
                variant="primary"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg"
              >
                Upgrade to Pro
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedHeading level={2} delay={0.2} className="text-4xl font-bold text-white mb-4 text-center">
            Frequently Asked Questions
          </AnimatedHeading>
          
          <AnimatedSection variant="fadeInUp" delay={0.4} className="text-center mb-16">
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Everything you need to know about DecodeDesk
            </p>
          </AnimatedSection>

          <StaggeredContainer staggerDelay={0.1} className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Is my data safe?", a: "Yes! We use enterprise-grade security and never store your personal messages. All translations are processed securely and deleted after processing." },
              { q: "How is 'translation' done?", a: "We use advanced AI (DeepSeek) to understand corporate jargon and translate it into honest, plain English while maintaining the original meaning." },
              { q: "Do you store my messages?", a: "We only store anonymous usage statistics to improve our service. Your actual messages are never saved or shared." },
              { q: "How do I upgrade?", a: "Click any 'Upgrade' button to access our Pro plan with unlimited translations and advanced features for just $5/month." },
              { q: "How do team plans work?", a: "Team plans include up to 30 users, shared analytics dashboard, admin controls, and priority support for $49/month." }
            ].map((faq, index) => (
              <StaggeredItem key={index} index={index}>
                <AnimatedCard className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg hover:border-purple-500/50 transition-colors duration-300">
                  <div className="px-6 py-4">
                    <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                    <p className="text-white/90">{faq.a}</p>
                  </div>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading level={2} delay={0.2} className="text-4xl font-bold mb-4 text-white">
            Ready to Bridge Every Generation?
          </AnimatedHeading>
          
          <AnimatedSection variant="fadeInUp" delay={0.4}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals and creators using DecodeDesk to communicate across generations and create viral content.
            </p>
          </AnimatedSection>
          
          <StaggeredContainer staggerDelay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <StaggeredItem index={0}>
              <AnimatedButton
                onClick={handleGetStarted}
                variant="primary"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg"
              >
                Get Started Free
              </AnimatedButton>
            </StaggeredItem>
            <StaggeredItem index={1}>
              <AnimatedButton
                onClick={handleLogin}
                variant="secondary"
                className="border border-purple-500/60 text-white hover:bg-purple-600/30 px-8 py-3 rounded-lg"
              >
                Login
              </AnimatedButton>
            </StaggeredItem>
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-black border-t border-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <StaggeredContainer staggerDelay={0.1} className="grid md:grid-cols-4 gap-8">
              <StaggeredItem index={0}>
                <div className="flex items-center mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black mr-2">
                    <span className="font-bold">🧠</span>
                  </div>
                  <span className="text-xl font-bold">DecodeDesk</span>
                </div>
                <p className="text-gray-400">
                  AI-powered communication bridge for corporate teams and GenZ creators. Translate, create, and go viral.
                </p>
              </StaggeredItem>
              
              {[
                { title: "Product", items: ["Features", "Pricing", "Examples", "API"] },
                { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
                { title: "Support", items: ["Help Center", "Privacy", "Terms", "Security"] }
              ].map((section, index) => (
                <StaggeredItem key={section.title} index={index + 1}>
                  <h3 className="font-semibold mb-4">{section.title}</h3>
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
            
            <AnimatedSection variant="fadeInUp" delay={0.6} className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
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
      </AnimatedSection>

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