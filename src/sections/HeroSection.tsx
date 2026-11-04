import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import { MagneticButton } from '@/components/common/MagneticButton';
import { MandalaMotif, PaisleyMotif } from '@/components/motifs';

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const headlineWords = ['Stories', 'Told', 'in', 'Henna'];

  const scrollToBooking = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-6 lg:px-12 overflow-hidden border-b border-gold/20">
      {/* Background Watermark Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/15 pointer-events-none z-0">
        <MandalaMotif
          size={560}
          className={prefersReducedMotion ? '' : 'animate-spin-slow'}
        />
      </div>

      <div className="absolute -bottom-16 -left-16 text-henna/10 pointer-events-none">
        <PaisleyMotif size={260} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Word-by-word Headline, Subline & CTAs */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          {/* Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 px-4 py-1.5 border border-gold/40 bg-ivory-light/80 text-[11px] uppercase tracking-[0.24em] text-henna shadow-fine"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            <span>Master Atelier · {brandConfig.artistName}</span>
          </motion.div>

          {/* Word-by-Word Split Text Reveal */}
          <div className="overflow-hidden">
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl text-henna font-normal tracking-tight leading-[1.06]">
              {headlineWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden mr-3 sm:mr-4 last:mr-0"
                >
                  <motion.span
                    className={`inline-block ${
                      word === 'Henna' ? 'font-vibes text-gold text-6xl sm:text-7xl xl:text-8xl font-normal' : ''
                    }`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { y: '115%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + index * 0.12,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
          >
            Bespoke bridal &amp; celebratory henna artistry created at your doorstep in{' '}
            <strong className="font-medium text-charcoal">{brandConfig.city}</strong> and nearby areas.
            Hand-ground organic Sojat leaves, fine-line architectural symmetry, and guaranteed dark mahogany stains.
          </motion.p>

          {/* Two CTAs: Magnetic "Book Your Date" & "View Designs" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
          >
            {/* Magnetic Button */}
            <MagneticButton onClick={scrollToBooking} strength={0.25}>
              <button
                className="px-8 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-gold group flex items-center gap-2.5"
                aria-label="Book your wedding date"
              >
                <span>Book Your Date</span>
                <span className="text-gold text-sm group-hover:translate-x-1 transition-transform">
                  ✦
                </span>
              </button>
            </MagneticButton>

            {/* Secondary CTA */}
            <Link
              to="/gallery"
              className="px-8 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.22em] border border-gold/40 hover:border-gold hover:text-henna transition-all duration-300 editorial-link"
            >
              View Designs
            </Link>
          </motion.div>

          {/* Subtle Service Note */}
          <div className="pt-2 text-xs text-charcoal-soft/80 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-gold">✦</span>
            <span>Home visit service · Chemical-free Sojat henna · Single bride per day focus</span>
          </div>
        </div>

        {/* Right Column: Layered Parallax Editorial Collage */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
          {/* Collage Container with slight natural shifts */}
          <div className="relative w-full max-w-lg mx-auto h-[480px] sm:h-[540px]">
            {/* Card 1: Main Bridal Palms (Left, slightly tilted -2.5deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2.5 }}
              animate={{ opacity: 1, y: 0, rotate: -2.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, rotate: -1.5, zIndex: 30 }}
              className="absolute left-2 sm:left-4 top-8 sm:top-10 w-52 sm:w-64 z-10 shadow-editorial transition-all duration-300"
            >
              <div className="bg-ivory-light p-3 border border-gold/35 ornate-corners">
                <EditorialImage
                  src="/images/hero-1.webp"
                  alt="Royal Heritage Bridal Palms"
                  fallbackTitle="Royal Heritage Bridal"
                  fallbackSubtitle="Palatial Architecture Jaal"
                  aspectRatio="4/5"
                  className="hover:scale-105 transition-transform duration-700"
                />
                <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] text-charcoal-soft font-serif">
                  <span>Jharokha Symmetry</span>
                  <span className="text-gold font-sans text-[10px]">#01</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Negative Space & Contemporary Vines (Right, tilted +2.5deg, elevated) */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 2.5 }}
              animate={{ opacity: 1, y: 0, rotate: 2.5 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              whileHover={{ scale: 1.02, rotate: 1.5, zIndex: 30 }}
              className="absolute right-2 sm:right-4 top-2 sm:top-4 w-48 sm:w-56 z-20 shadow-editorial transition-all duration-300"
            >
              <div className="bg-ivory-light p-3 border border-gold/35 ornate-corners">
                <EditorialImage
                  src="/images/hero-2.webp"
                  alt="Contemporary Negative Space Henna"
                  fallbackTitle="Negative Space Flora"
                  fallbackSubtitle="Airy Fine-Line Lace"
                  aspectRatio="4/5"
                  className="hover:scale-105 transition-transform duration-700"
                />
                <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] text-charcoal-soft font-serif">
                  <span>Modern Botanical</span>
                  <span className="text-gold font-sans text-[10px]">#02</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Intricate Feet & Payal (Lower Center, tilted -1deg) */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.02, rotate: 0, zIndex: 30 }}
              className="absolute left-16 sm:left-24 bottom-2 sm:bottom-4 w-44 sm:w-56 z-25 shadow-editorial transition-all duration-300"
            >
              <div className="bg-ivory-light p-3 border border-gold/40 ornate-corners">
                <EditorialImage
                  src="/images/hero-3.webp"
                  alt="Floating Lotus Feet Mehndi"
                  fallbackTitle="Feet &amp; Payal Artistry"
                  fallbackSubtitle="Floating Lotus Silhouette"
                  aspectRatio="1/1"
                  className="hover:scale-105 transition-transform duration-700"
                />
                <div className="pt-2 px-1 flex items-center justify-between text-[10px] text-charcoal-soft font-serif">
                  <span>Feet Payal Detailing</span>
                  <span className="text-gold font-sans text-[10px]">#03</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

