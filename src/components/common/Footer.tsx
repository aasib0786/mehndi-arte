import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { trackWhatsAppClick } from '@/lib/tracking';
import {
  MandalaMotif,
  FloralVineMotif,
  PaisleyMotif,
  BrushStrokeFlourish,
  AtelierSealMotif,
} from '@/components/motifs';

export const Footer: React.FC = () => {
  const googleMapsUrl = brandConfig.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    brandConfig.brandName + ' ' + brandConfig.city
  )}`;

  return (
    <footer className="bg-charcoal text-ivory/90 relative overflow-hidden border-t border-gold/40 select-none">
      {/* Background Ornamental Mandala Watermark */}
      <div className="absolute -right-28 -bottom-28 opacity-5 pointer-events-none text-gold">
        <MandalaMotif size={480} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-12 relative z-10 space-y-12 sm:space-y-16">
        {/* Top Decorative Vine */}
        <div className="flex justify-center text-gold/60">
          <FloralVineMotif size={200} />
        </div>

        {/* Big Brand Statement in Cormorant Italic with Mandala Line-Art */}
        <div className="text-center relative py-6 border-y border-gold/20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/10 pointer-events-none">
            <MandalaMotif size={260} />
          </div>

          <div className="relative z-10 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-medium block">
              The Master Atelier &amp; Studio of
            </span>
            <h2 className="font-serif italic font-light text-2xl min-[400px]:text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory tracking-tight leading-tight sm:leading-none break-words">
              {brandConfig.brandName}
            </h2>
            <div className="flex justify-center pt-1">
              <BrushStrokeFlourish width={240} height={14} color="#B8893A" />
            </div>
            <p className="font-vibes text-2xl sm:text-3xl text-gold-light mt-1">
              Bespoke Bridal Mehndi &bull; Luxury Makeup &bull; Beauty Parlour
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12">
          {/* Column 1: Brand Manifesto & Studio Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PaisleyMotif size={32} className="text-gold" />
                <span className="font-serif text-2xl text-ivory font-medium">
                  {brandConfig.brandName}
                </span>
              </div>
              <AtelierSealMotif size={56} sealColor="#B8893A" textColor="#FAF5ED" />
            </div>

            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
              {brandConfig.subtagline}
            </p>

            <div className="p-4 bg-[#2C2622] border border-gold/20 text-xs text-ivory/70 space-y-2 ornate-corners">
              <div className="flex items-center gap-2 text-gold font-serif text-sm font-medium">
                <span>✦</span>
                <span>Flagship Studio Address</span>
              </div>
              <p className="text-[11px] text-ivory/80 leading-relaxed">
                {brandConfig.studioAddress}
              </p>
              <div className="text-[10px] uppercase tracking-wider text-gold-light/90 pt-1">
                Timings: {brandConfig.studioTimings}
              </div>
              <div className="text-[10px] text-ivory/60 pt-0.5">
                {brandConfig.serviceNote}
              </div>
            </div>
          </div>

          {/* Column 2: Doorstep Service Areas & Google Maps (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-6">
              Home Visit Service Areas
            </h4>

            <ul className="space-y-2.5 text-xs text-ivory/70 font-light">
              {brandConfig.coverageAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold text-xs leading-none mt-0.5">✦</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-light hover:text-ivory transition-colors underline underline-offset-4"
              >
                <span>Studio on Google Maps</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Column 3: Navigation Links across 3 Service Lines (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-6">
              Studio Wings
            </h4>
            <ul className="space-y-3 text-xs text-ivory/70 font-light">
              <li>
                <Link to="/mehndi" className="editorial-link hover:text-ivory">
                  Mehndi Art
                </Link>
              </li>
              <li>
                <Link to="/makeup" className="editorial-link hover:text-ivory">
                  Bridal &amp; HD Makeup
                </Link>
              </li>
              <li>
                <Link to="/parlour" className="editorial-link hover:text-ivory">
                  Parlour Rate Card
                </Link>
              </li>
              <li>
                <Link to="/services/bridal-combo" className="editorial-link hover:text-ivory">
                  Bridal Combos
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="editorial-link hover:text-ivory">
                  Photo Archive
                </Link>
              </li>
              <li>
                <a href="/#contact" className="editorial-link hover:text-ivory">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Concierge Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-6">
              Concierge Desk
            </h4>

            <p className="text-xs text-ivory/70 font-light leading-relaxed">
              {brandConfig.bookingNotice}
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div>
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Footer WhatsApp Concierge')}
                  className="inline-flex items-center gap-2 text-gold hover:text-ivory uppercase tracking-[0.18em] transition-colors"
                >
                  <span>WhatsApp:</span>
                  <span className="font-sans font-medium">{brandConfig.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <a
                  href={brandConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ivory/70 hover:text-gold tracking-wider transition-colors"
                >
                  <span>Instagram:</span>
                  <span className="text-gold-light">{brandConfig.instagramHandle}</span>
                </a>
              </div>

              <div className="text-ivory/50">
                Email: {brandConfig.email}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-4 pt-2">
          <p>© {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px] text-gold/80">
            Mehndi Art &bull; HD Makeup &bull; Studio Parlour &bull; Greater Kailash I, New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
};
