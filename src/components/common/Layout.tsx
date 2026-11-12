import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';
import { WhatsAppButton } from './WhatsAppButton';
import { AdLandingHeader } from '@/components/layout/AdLandingHeader';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdLandingPage = location.pathname.startsWith('/services/bridal-');

  const getServiceType = () => {
    if (location.pathname.includes('mehndi')) return 'Mehndi';
    if (location.pathname.includes('makeup')) return 'Makeup';
    if (location.pathname.includes('combo')) return 'Bridal Combo';
    return 'General';
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory paper-grain text-charcoal selection:bg-gold/20 selection:text-henna relative overflow-x-hidden">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-henna focus:text-ivory focus:border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Skip to main content
      </a>

      <CustomCursor />
      {isAdLandingPage ? (
        <AdLandingHeader serviceType={getServiceType()} />
      ) : (
        <Navbar />
      )}
      <main
        id="main-content"
        className={`flex-grow ${isAdLandingPage ? 'pt-16 sm:pt-20' : 'pt-20 sm:pt-24'}`}
      >
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
