import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';
import { WhatsAppButton } from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory paper-grain text-charcoal selection:bg-gold/20 selection:text-henna relative">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow pt-20 sm:pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
