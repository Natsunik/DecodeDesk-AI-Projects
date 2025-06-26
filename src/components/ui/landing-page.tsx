import React, { useState } from 'react';
import { HeroSection } from './hero-section-dark';
import { Features } from './features';
import { Pricing } from './pricing';
import { HowItWorks } from './how-it-works';
import { Testimonials } from './testimonials';
import { FAQ } from './faq';
import { SupportUs } from './support-us';
import { AuthModal } from './auth-modal';
import { PricingEnhanced } from './pricing-enhanced';
import { PricingPopup } from './pricing-popup';
import { QuotaExhaustedModal } from './quota-exhausted-modal';
import { TestimonialsSection } from './testimonials-section';
import { TranslationForm } from '../TranslationForm';
import { Analytics } from '../Analytics';
import { UpgradeModal } from './upgrade-modal';

interface LandingPageProps {
  onNavigate?: (page: 'landing' | 'dashboard' | 'pricing' | 'contact') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [refreshAnalytics, setRefreshAnalytics] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
    // Here you would integrate with your payment processor
    // For now, just show the auth modal to sign up
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
    // User will be redirected to dashboard automatically via App.tsx
    setShowAuthModal(false);
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
              <span className="font-bold">🧠</span>
            </div>
            <span className="ml-2 text-xl font-bold text-white">DecodeDesk</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={() => onNavigate?.('contact')}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contact us
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLogin}
                className="h-10 rounded-full border border-gray-600 px-6 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={handleGetStarted}
                className="h-10 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={handleGetStarted}
              className="h-10 rounded-full bg-white px-4 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* How It Works Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Corporate & GenZ Communication Hub
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Decode corporate jargon, translate GenZ slang, create viral words, and bridge generational communication gaps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Decode Corporate Speak</h3>
              <p className="text-white/80 text-sm">Transform corporate jargon into honest, plain English that everyone understands</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Generate New Words</h3>
              <p className="text-white/80 text-sm">Create viral corporate buzzwords and authentic GenZ slang with AI-generated meanings</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Cross-Cultural Translation</h3>
              <p className="text-white/80 text-sm">Seamlessly translate between GenZ slang and corporate speak for perfect communication</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Share & Go Viral</h3>
              <p className="text-white/80 text-sm">Create shareable content, build your word collection, and go viral on social media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-black relative">
        {/* Background with purple gradient */}
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
      </section>

      {/* Analytics Preview */}
      <section className="py-12 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div key={refreshAnalytics} className="max-w-4xl mx-auto">
            <Analytics />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div id="features">
        <section className="py-20 bg-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why DecodeDesk is the Ultimate Communication Bridge
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Bridge corporate and GenZ communication with powerful AI features designed for every generation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Word Generation Engine</h3>
                <p className="text-white/80 leading-relaxed">Generate viral corporate buzzwords and authentic GenZ slang with AI-powered creativity and real-world meanings.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Cross-Cultural Bridge</h3>
                <p className="text-white/80 leading-relaxed">Break down generational barriers by translating between corporate speak and GenZ slang effortlessly.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Analytics Dashboard</h3>
                <p className="text-white/80 leading-relaxed">Monitor translation trends, track viral word creations, and analyze communication patterns across generations.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Easy Sharing</h3>
                <p className="text-white/80 leading-relaxed">Share translations instantly across platforms. Perfect for social media, team communication, and viral content.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Viral Content Creation</h3>
                <p className="text-white/80 leading-relaxed">Create viral-ready content for TikTok, Instagram, and LinkedIn with original word creations that resonate.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Privacy First</h3>
                <p className="text-white/80 leading-relaxed">Your creative content stays secure. We protect your word creations and never share your translations.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Pricing Section */}
      <div id="pricing">
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
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Support Us */}
      <section className="py-12 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-red-500 text-2xl">❤️</span>
              <h3 className="text-2xl font-bold text-white">Love DecodeDesk?</h3>
            </div>
            
            <p className="text-lg text-white/80 mb-8">
              Help keep us free—buy us a coffee or upgrade for more features!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSupport}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-purple-500/60 text-white rounded-lg font-medium hover:bg-purple-600/30 transition-colors"
              >
                <span>☕</span>
                Support DecodeDesk
              </button>
              <button 
                onClick={handleGetStarted}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Everything you need to know about DecodeDesk
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg">
              <div className="px-6 py-4">
                <h4 className="font-semibold text-white mb-2">Is my data safe?</h4>
                <p className="text-white/90">Yes! We use enterprise-grade security and never store your personal messages. All translations are processed securely and deleted after processing.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg">
              <div className="px-6 py-4">
                <h4 className="font-semibold text-white mb-2">How is 'translation' done?</h4>
                <p className="text-white/90">We use advanced AI (DeepSeek) to understand corporate jargon and translate it into honest, plain English while maintaining the original meaning.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg">
              <div className="px-6 py-4">
                <h4 className="font-semibold text-white mb-2">Do you store my messages?</h4>
                <p className="text-white/90">We only store anonymous usage statistics to improve our service. Your actual messages are never saved or shared.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg">
              <div className="px-6 py-4">
                <h4 className="font-semibold text-white mb-2">How do I upgrade?</h4>
                <p className="text-white/90">Click any 'Upgrade' button to access our Pro plan with unlimited translations and advanced features for just $5/month.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg">
              <div className="px-6 py-4">
                <h4 className="font-semibold text-white mb-2">How do team plans work?</h4>
                <p className="text-white/90">Team plans include up to 30 users, shared analytics dashboard, admin controls, and priority support for $49/month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to Bridge Every Generation?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals and creators using DecodeDesk to communicate across generations and create viral content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Get Started Free
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-3 border border-purple-500/60 text-white rounded-lg font-medium hover:bg-purple-600/30 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black mr-2">
                  <span className="font-bold">🧠</span>
                </div>
                <span className="text-xl font-bold">DecodeDesk</span>
              </div>
              <p className="text-gray-400">
                AI-powered communication bridge for corporate teams and GenZ creators. Translate, create, and go viral.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#examples" className="hover:text-white">Examples</a></li>
                <li><a href="#api" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('contact')}
                    className="hover:text-white"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#help" className="hover:text-white">Help Center</a></li>
                <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms</a></li>
                <li><a href="#security" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-white/70">Made with ❤️ by DecodeDesk | <a href="#privacy" className="hover:text-white">Privacy Policy</a> | <button onClick={() => onNavigate?.('contact')} className="hover:text-white">Contact</button> | <a href="#twitter" className="hover:text-white">Twitter/X</a> | <a href="#github" className="hover:text-white">GitHub</a></p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Pricing Popup */}
      <PricingPopup
        isOpen={showPricingPopup}
        onClose={() => setShowPricingPopup(false)}
        onGetStarted={handleGetStartedFromPopup}
        onUpgrade={handleUpgrade}
        onContactSales={handleContactSales}
      />
      
      {/* Quota Exhausted Modal */}
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
      
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgradeConfirm}
      />
    </div>
  );
}