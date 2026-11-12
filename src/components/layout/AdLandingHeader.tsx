import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '@/lib/config';
import { openWhatsAppEnquiry } from '@/lib/bookingService';

interface AdLandingHeaderProps {
  serviceType?: string;
}

export const AdLandingHeader: React.FC<AdLandingHeaderProps> = ({ serviceType = 'General' }) => {
  const getWhatsAppMessage = (): string => {
    if (serviceType.toLowerCase().includes('mehndi')) {
      return `Hi ${brandConfig.artistName}, I saw your Bridal Mehndi ad and would like to check availability and the Free Trial offer.`;
    }
    if (serviceType.toLowerCase().includes('makeup')) {
      return `Hi ${brandConfig.artistName}, I saw your Bridal Makeup ad and would like to check dates and the Complimentary Trial offer.`;
    }
    if (serviceType.toLowerCase().includes('combo')) {
      return `Hi ${brandConfig.artistName}, I saw your Bridal Combo ad (Mehndi + Makeup) and want to inquire about package savings.`;
    }
    return `Hi ${brandConfig.artistName}, I am inquiring about bridal bookings at Kashish Studio.`;
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppEnquiry(getWhatsAppMessage(), 'Ad Landing Header WhatsApp Button', serviceType);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-gold/30 py-3 px-4 sm:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity (Logo Only - No Nav Links) */}
        <Link
          to="/"
          className="group flex items-center gap-3 focus:outline-none"
          title="Return to home atelier"
        >
          <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-henna text-ivory text-sm font-serif group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <div className="font-serif text-lg sm:text-2xl text-henna leading-none tracking-tight font-medium">
              {brandConfig.artistName}
              <span className="font-serif italic font-light text-gold-dark text-sm sm:text-lg ml-1">
                Atelier
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-charcoal-muted pt-0.5">
              Mehndi &amp; Bridal Artistry &bull; {brandConfig.city}
            </div>
          </div>
        </Link>

        {/* Minimal Action: WhatsApp Direct Hotline Only */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-wider text-charcoal-soft font-medium">
              Direct Artist Hotline
            </span>
            <span className="font-serif text-xs text-henna font-semibold tracking-wide">
              {brandConfig.phoneDisplay}
            </span>
          </div>

          <a
            href={`https://wa.me/${brandConfig.whatsAppNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`}
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-henna text-ivory text-xs uppercase tracking-[0.16em] border border-gold hover:bg-henna-dark active:scale-95 transition-all duration-300 shadow-fine group"
            aria-label="Direct WhatsApp Consultation"
          >
            {/* Live WhatsApp Dot */}
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />

            {/* WhatsApp SVG Icon */}
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="text-ivory group-hover:text-gold transition-colors"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.68 8.23-8.22 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
            </svg>

            <span>Book on WhatsApp</span>
            <span className="text-gold">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
};
