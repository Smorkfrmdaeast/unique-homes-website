import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { CartDrawer } from './components/CartDrawer';
import { SocialBioHub } from './components/SocialBioHub';
import { AdminPortal } from './components/AdminPortal';

export type AppView = 'store' | 'bio' | 'admin';

export const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('admin')) return 'admin';
      if (hash.includes('bio')) return 'bio';
      const search = window.location.search.toLowerCase();
      if (search.includes('view=admin')) return 'admin';
      if (search.includes('view=bio')) return 'bio';
    }
    return 'store';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('admin')) {
        setCurrentView('admin');
      } else if (hash.includes('bio')) {
        setCurrentView('bio');
      } else if (hash.includes('store') || hash === '') {
        setCurrentView('store');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggleView = (view: AppView) => {
    setCurrentView(view);
    window.location.hash = view === 'store' ? '#store' : `#${view}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Hide standard navbar in full Admin Portal for focus, or allow quick back */}
      {currentView !== 'admin' && (
        <Navbar 
          currentView={currentView} 
          onToggleView={handleToggleView} 
        />
      )}

      <main>
        <div key={currentView} className="view-fade-wrapper">
          {currentView === 'admin' ? (
            <AdminPortal onBackToStore={() => handleToggleView('store')} />
          ) : currentView === 'bio' ? (
            <SocialBioHub onSwitchToStore={() => handleToggleView('store')} />
          ) : (
            <>
              <Hero onOpenBioMode={() => handleToggleView('bio')} />
              <About />
              <Products />
              <WhyChooseUs />
              <Reviews />
              <Contact />
            </>
          )}
        </div>
      </main>

      {currentView !== 'admin' && (
        <>
          <Footer onOpenAdmin={() => handleToggleView('admin')} />
          <CartDrawer />
          <WhatsAppFloat />
        </>
      )}
    </div>
  );
};

export default MainApp;
