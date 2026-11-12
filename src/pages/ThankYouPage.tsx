import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { brandConfig } from '@/lib/config';
import { SEO } from '@/components/common/SEO';
import { trackPageView, trackWhatsAppClick } from '@/lib/tracking';
import { MandalaMotif, PaisleyMotif, FloralVineMotif } from '@/components/motifs';

interface ThankYouState {
  name?: string;
  mobile?: string;
  occasion?: string;
  date?: string;
  location?: string;
  pkg?: string;
}

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state as ThankYouState) || {};

  const clientName = state.name ? state.name.trim() : 'Esteemed Bride';
  const celebrationText = state.occasion || 'Bridal Mehndi';
  const dateText = state.date ? `for ${new Date(state.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}` : '';

  const followUpWhatsAppText = `Hello ${brandConfig.artistName}, I just submitted a booking inquiry on your website${state.name ? ` under the name ${state.name}` : ''}${state.date ? ` for date ${state.date}` : ''}.`;
  const directWhatsAppUrl = `https://wa.me/${brandConfig.whatsAppNumber}?text=${encodeURIComponent(followUpWhatsAppText)}`;

  // Fire PageView specifically for /thank-you (usable as URL conversion destination in Meta & Google Ads)
  useEffect(() => {
    trackPageView('/thank-you');
  }, []);

  return (
    <>
      <SEO
        title="Commission Inquiry Received"
        description={`Thank you for requesting your bridal mehndi commission with ${brandConfig.brandName}. We will be in touch shortly to confirm date availability.`}
        canonicalPath="/thank-you"
        noIndex={true}
      />

      <section className="min-h-[85vh] flex items-center justify-center px-6 py-20 relative overflow-hidden bg-ivory paper-grain">
        {/* Animated Rotating Background Mandala Motif */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/15 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          >
            <MandalaMotif size={650} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="editorial-card max-w-2xl w-full p-8 sm:p-14 ornate-corners text-center space-y-8 relative z-10 bg-ivory-light/95 border border-gold/40 shadow-soft"
        >
          {/* Top Paisley Motif */}
          <div className="flex justify-center text-gold">
            <PaisleyMotif size={56} />
          </div>

          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-medium block">
              Doorstep Commission Reserved
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl text-henna leading-tight font-normal">
              With Gratitude, {clientName}
            </h1>

            <p className="font-vibes text-2xl sm:text-3xl text-gold-dark">
              We will contact you shortly
            </p>
          </div>

          <div className="flex justify-center text-gold/50">
            <FloralVineMotif size={160} />
          </div>

          {/* Lead Confirmation Summary Box */}
          <div className="p-5 bg-white/80 border border-gold/25 text-left text-xs text-charcoal space-y-2 ornate-corners">
            <div className="flex items-center justify-between border-b border-gold/15 pb-2">
              <span className="uppercase tracking-wider text-[10px] text-charcoal-muted">Ceremony:</span>
              <span className="font-medium text-henna">{celebrationText} {dateText}</span>
            </div>
            {state.location && (
              <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                <span className="uppercase tracking-wider text-[10px] text-charcoal-muted">Location:</span>
                <span className="font-medium text-charcoal">{state.location}</span>
              </div>
            )}
            {state.pkg && (
              <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                <span className="uppercase tracking-wider text-[10px] text-charcoal-muted">Package:</span>
                <span className="font-medium text-charcoal">{state.pkg}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <span className="uppercase tracking-wider text-[10px] text-charcoal-muted">Direct Artist:</span>
              <span className="font-serif italic text-henna text-sm">{brandConfig.artistName} (Priority Queue)</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed space-y-3">
            <p>
              Your booking request has been securely dispatched to our atelier and WhatsApp concierge.
              Master Artist <strong className="text-charcoal font-medium">{brandConfig.artistName}</strong> personally reviews wedding schedules to guarantee dedicated single-bride attention.
            </p>
            <p className="text-mehndi text-xs font-medium">
              Expect a personalized message or call within 2–4 business hours to lock in your date deposit and discuss custom motifs.
            </p>
          </div>

          <div className="gold-divider max-w-xs mx-auto" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Thank You Page WhatsApp Concierge')}
              className="w-full sm:w-auto px-8 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine flex items-center justify-center gap-2 group"
            >
              <span>Connect on WhatsApp</span>
              <span className="text-gold transform group-hover:translate-x-1 transition-transform">↗</span>
            </a>

            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.2em] border border-gold/40 hover:border-gold hover:text-henna transition-all duration-300"
            >
              Return to Atelier
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};
