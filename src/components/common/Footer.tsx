import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { MandalaMotif, FloralVineMotif } from '@/components/motifs';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-ivory/90 relative overflow-hidden border-t border-gold/30">
      {/* Background ornamental motif watermark */}
      <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none text-gold">
        <MandalaMotif size={360} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12 relative z-10">
        {/* Top decorative vine */}
        <div className="flex justify-center mb-16 text-gold/60">
          <FloralVineMotif size={180} />
        </div>

        {/* Asymmetric editorial columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight">
              {brandConfig.brandName}
            </h3>
            <p className="font-vibes text-2xl text-gold-light">
              By Master Artist {brandConfig.artistName}
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-md">
              {brandConfig.subtagline}
            </p>
            <div className="pt-2 text-xs uppercase tracking-[0.18em] text-gold-light/90">
              {brandConfig.city} &amp; Destination Celebrations
            </div>
          </div>

          {/* Curated Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li>
                <Link to="/" className="editorial-link hover:text-ivory">
                  Atelier Overview
                </Link>
              </li>
              <li>
                <Link to="/services/bridal-mehndi" className="editorial-link hover:text-ivory">
                  Bridal Mehndi Couture
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="editorial-link hover:text-ivory">
                  Curated Archive
                </Link>
              </li>
              <li>
                <Link to="/thank-you" className="editorial-link hover:text-ivory">
                  Booking Confirmation Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Purity Assurance Column */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-6">
              Bespoke Inquiries
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed">
              {brandConfig.bookingNotice}
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold hover:text-ivory transition-colors group"
              >
                <span>WhatsApp Concierge</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div>
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wider text-ivory/60 hover:text-gold transition-colors"
              >
                Instagram: {brandConfig.instagramHandle}
              </a>
            </div>
            <div className="p-4 bg-charcoal-muted/30 border border-gold/15 text-xs text-ivory/60 leading-normal">
              <span className="text-gold font-serif block text-sm mb-1">
                Purity Guarantee
              </span>
              {brandConfig.organicHennaGuarantee}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-4">
          <p>© {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px] text-gold/70">
            Hand-Crafted Fine Art Henna Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

