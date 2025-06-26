import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/ui/landing-page';
import { Dashboard } from './components/ui/dashboard';
import { PricingPage } from './components/ui/pricing-page';
import { ContactPage } from './components/ui/contact-page';
import { ToastProvider } from './components/Toast';
import { migrateGuestToUser } from './lib/translationLimits';
import { supabase } from './lib/supabase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'pricing' | 'contact'>('landing');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentPage('dashboard');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('landing');
      }
      
      // Migrate guest quota when user logs in
      if (session?.user) {
        migrateGuestToUser();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Focus the input when the page loads (only for landing page)
    if (!user) {
      setTimeout(() => {
        const textarea = document.querySelector('textarea');
        textarea?.focus();
      }, 100);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <ToastProvider />
      {currentPage === 'dashboard' && user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : currentPage === 'pricing' ? (
        <PricingPage 
          onLogin={() => setCurrentPage('landing')}
          onUpgrade={() => {
            // Handle upgrade logic here
            console.log('Upgrade clicked');
          }}
        />
      ) : currentPage === 'contact' ? (
        <ContactPage 
          onBack={() => setCurrentPage('landing')}
        />
      ) : (
        <LandingPage 
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default App;