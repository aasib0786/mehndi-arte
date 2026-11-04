import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { MandalaMotif, PaisleyMotif } from '@/components/motifs';

export const ThankYouPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Inquiry Received | {brandConfig.brandName}</title>
        <meta
          name="description"
          content={`Thank you for contacting ${brandConfig.brandName}. We will be in touch shortly to confirm date availability.`}
        />
      </Helmet>

      <section className="min-h-[75vh] flex items-center justify-center px-6 py-24">
        <div className="editorial-card max-w-2xl w-full p-10 sm:p-14 ornate-corners text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 text-gold/10 pointer-events-none">
            <MandalaMotif size={180} />
          </div>

          <div className="flex justify-center text-gold">
            <PaisleyMotif size={64} />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
              Commission Inquiry Received
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-henna">
              With Gratitude &amp; Grace
            </h1>
            <p className="font-vibes text-2xl text-gold-dark">
              We have received your celebration details
            </p>
          </div>

          <div className="gold-divider" />

          <div className="text-sm text-charcoal-muted font-light leading-relaxed space-y-4">
            <p>
              Thank you for considering <strong className="text-charcoal font-medium">{brandConfig.brandName}</strong> for your upcoming milestone.
              Master Artist <strong className="text-charcoal font-medium">{brandConfig.artistName}</strong> reviews every commission personally.
            </p>
            <p className="text-xs text-mehndi">
              Our atelier will connect with you within 12 hours via WhatsApp or phone to confirm availability and discuss initial design concepts.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppBookingLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-henna text-ivory text-xs uppercase tracking-[0.18em] border border-gold/40 hover:bg-henna-dark transition-all duration-300"
            >
              Direct WhatsApp Concierge
            </a>
            <Link
              to="/"
              className="w-full sm:w-auto px-7 py-3 bg-transparent text-charcoal text-xs uppercase tracking-[0.18em] border border-gold/30 hover:border-gold hover:text-henna transition-all duration-300"
            >
              Return to Atelier
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

