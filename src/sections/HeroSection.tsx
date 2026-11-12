import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import { MagneticButton } from '@/components/common/MagneticButton';
import {
  MandalaMotif,
  PaisleyMotif,
  BrushStrokeFlourish,
  AtelierSealMotif,
} from '@/components/motifs';

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const headlineWords = ['Henna,', 'Glam', '&', 'Glow'];

  const scrollToBooking = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-gold/20">
      {/* Background Watermark Elements: Slowly rotating mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/15 pointer-events-none z-0">
        <MandalaMotif
          size={580}
          className={prefersReducedMotion ? '' : 'animate-spin-slow'}
        />
      </div>

      {/* Decorative Watermark Hindi Calligraphy */}
      <div className="absolute top-16 left-6 lg:left-12 font-serif text-6xl sm:text-8xl lg:text-9xl text-gold/[0.04] pointer-events-none select-none z-0 tracking-widest">
        सोलह श्रृंगार
      </div>
      <div className="absolute bottom-8 right-6 lg:right-16 font-serif text-6xl sm:text-8xl lg:text-9xl text-henna/[0.04] pointer-events-none select-none z-0 tracking-widest">
        हस्तकला
      </div>

      <div className="absolute -bottom-16 -left-16 text-henna/10 pointer-events-none">
        <PaisleyMotif size={260} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Asymmetric Couture Typography, Subline & CTAs */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          {/* Live Atelier Status Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-gold/40 bg-ivory-light/90 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-henna shadow-fine"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span>Bridal Diary 2026 Open</span>
            <span className="text-gold font-serif">✦</span>
            <span className="text-charcoal-soft font-light hidden sm:inline">1 Bride Per Date</span>
          </motion.div>

          {/* Word-by-Word Split Text Reveal: "Henna, Glam & Glow" */}
          <div className="overflow-hidden space-y-2">
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl text-henna font-normal tracking-tight leading-[1.06] break-words">
              {headlineWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden mr-3 sm:mr-4 last:mr-0"
                >
                  <motion.span
                    className={`inline-block ${
                      word === 'Glow'
                        ? 'font-vibes text-gold text-5xl min-[400px]:text-6xl sm:text-7xl xl:text-8xl font-normal relative'
                        : word === 'Glam'
                        ? 'italic font-light text-henna'
                        : ''
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

            {/* Handcrafted Brush Stroke Accent beneath the Title */}
            <div className="flex justify-center lg:justify-start pt-1">
              <BrushStrokeFlourish width={210} height={14} color="#B8893A" />
            </div>
          </div>

          {/* Subline with Editorial Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="space-y-3 max-w-xl mx-auto lg:mx-0"
          >
            <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
              Bespoke ceremonial mehndi, signature HD bridal makeup, and restorative beauty parlour rituals in{' '}
              <strong className="font-medium text-charcoal">{brandConfig.city}</strong>. Handcrafted with 100% organic Sojat henna, international cosmetics, and dedicated individual artistry.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium flex items-center justify-center lg:justify-start gap-2">
              <span>✦</span>
              <span>Doorstep Henna &amp; Makeup Across NCR</span>
              <span>•</span>
              <span>Private GK-1 Salon Studio</span>
            </p>
          </motion.div>

          {/* Two CTAs: Magnetic "Book Your Date" & "View Our Work" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
          >
            {/* Magnetic Button: Book Your Date */}
            <MagneticButton onClick={scrollToBooking} strength={0.25} className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-gold group flex items-center justify-center gap-2.5 touch-manipulation cursor-pointer"
                aria-label="Book your wedding date"
              >
                <span>Reserve Your Date</span>
                <span className="text-gold text-sm group-hover:translate-x-1 transition-transform">
                  ✦
                </span>
              </button>
            </MagneticButton>

            {/* Secondary CTA: View Our Work */}
            <Link
              to="/gallery"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.22em] border border-gold/40 hover:border-gold hover:text-henna transition-all duration-300 editorial-link flex items-center justify-center touch-manipulation"
            >
              Explore Portfolio
            </Link>
          </motion.div>

          {/* Signature Footnote */}
          <div className="pt-2 text-xs text-charcoal-soft/80 flex items-center justify-center lg:justify-start gap-2 flex-wrap">
            <span className="text-gold">✦</span>
            <span>{brandConfig.stats.experienceYears}+ Years of Atelier Mastery</span>
            <span className="text-gold">&bull;</span>
            <span>{brandConfig.stats.happyBrides.toLocaleString()}+ Brides Adorned</span>
            <span className="text-gold">&bull;</span>
            <span>Organic Sojat Certified</span>
          </div>
        </div>

        {/* Right Column: Layered Editorial Plate Collage with Arch Matting and Seal */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]">
          {/* Collage Container */}
          <div className="relative w-full max-w-lg mx-auto h-[500px] sm:h-[560px]">
            {/* Plate 1: Main Bridal Mehndi Hands (Left, Arch Top, Tilted -2.5deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2.5 }}
              animate={{ opacity: 1, y: 0, rotate: -2.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.025, rotate: -1.5, zIndex: 35 }}
              className="absolute left-1 sm:left-4 top-6 sm:top-8 w-36 min-[400px]:w-44 sm:w-64 z-10 shadow-editorial transition-all duration-300"
            >
              <div className="bg-ivory-light p-2.5 sm:p-3 pb-3 sm:pb-4 border border-gold/45 ornate-corners double-hairline-gold">
                {/* Arch-shaped inner image matting */}
                <div className="relative overflow-hidden arch-frame-top border border-gold/30">
                  <EditorialImage
                    src="/images/hero-1.webp"
                    placeholder="/images/hero-1-blur.webp"
                    alt="Ceremonial bridal mehndi hands with architectural jharokha patterns in 100% organic Sojat henna by Master Artist Kashish in Delhi NCR"
                    fallbackTitle="Ceremonial Henna Hands"
                    fallbackSubtitle="Palatial Architecture Jaal"
                    aspectRatio="4/5"
                    className="hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Museum plate caption */}
                <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] text-charcoal border-t border-gold/20 mt-2">
                  <div className="text-left">
                    <span className="font-serif font-medium text-henna block leading-none">
                      Royal Sojat Jaal
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gold-dark font-sans">
                      Plate № 01 · 48h Stain
                    </span>
                  </div>
                  <span className="font-serif italic text-xs text-charcoal-muted">Sojat</span>
                </div>
              </div>
            </motion.div>

            {/* Overlapping Heirloom Atelier Seal Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="absolute left-36 sm:left-56 top-24 sm:top-28 z-30 pointer-events-none drop-shadow-md hidden sm:block"
            >
              <AtelierSealMotif size={84} sealColor="#B8893A" textColor="#5A1E1B" />
            </motion.div>

            {/* Plate 2: Bridal Makeup Look (Right, elevated, tilted +2deg) */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              whileHover={{ scale: 1.025, rotate: 1, zIndex: 35 }}
              className="absolute right-1 sm:right-4 top-2 sm:top-4 w-32 min-[400px]:w-40 sm:w-56 z-20 shadow-editorial transition-all duration-300"
            >
              <div className="bg-ivory-light p-2.5 sm:p-3 pb-3 sm:pb-4 border border-gold/45 ornate-corners double-hairline-gold">
                <div className="relative overflow-hidden border border-gold/25">
                  <EditorialImage
                    src="/images/hero-2.webp"
                    placeholder="/images/hero-2-blur.webp"
                    alt="Haute bridal makeup look with HD glowing skin, champagne eyeshadow and couture draping by Kashish Studio in Delhi NCR"
                    fallbackTitle="Bridal Glam Look"
                    fallbackSubtitle="MAC &amp; Huda Beauty HD"
                    aspectRatio="4/5"
                    className="hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] text-charcoal border-t border-gold/20 mt-2">
                  <div className="text-left">
                    <span className="font-serif font-medium text-henna block leading-none">
                      Solah Shringar Glam
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gold-dark font-sans">
                      Plate № 02 · HD Finish
                    </span>
                  </div>
                  <span className="font-serif italic text-xs text-charcoal-muted">MAC</span>
                </div>
              </div>
            </motion.div>

            {/* Plate 3: Salon & Studio Parlour (Lower Center, tilted -1deg) */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.025, rotate: 0, zIndex: 35 }}
              className="absolute left-6 min-[400px]:left-8 sm:left-24 bottom-2 sm:bottom-4 w-32 min-[400px]:w-36 sm:w-56 z-25 shadow-editorial transition-all duration-300"
            >
              <div className="bg-ivory-light p-2 sm:p-3 pb-2.5 sm:pb-3.5 border border-gold/45 ornate-corners double-hairline-gold">
                <div className="relative overflow-hidden border border-gold/25">
                  <EditorialImage
                    src="/images/hero-3.webp"
                    placeholder="/images/hero-3-blur.webp"
                    alt="Luxury beauty parlour and bridal salon sanctuary at Greater Kailash I, South Delhi offering pre-bridal facials and hair spa"
                    fallbackTitle="Studio Parlour Sanctuary"
                    fallbackSubtitle="Botanical Skin Care &amp; Spa"
                    aspectRatio="1/1"
                    className="hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="pt-2 px-1 flex items-center justify-between text-[10px] text-charcoal border-t border-gold/20 mt-1.5">
                  <div className="text-left">
                    <span className="font-serif font-medium text-henna block leading-none">
                      GK-1 Salon Sanctuary
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gold-dark font-sans">
                      Plate № 03 · Pre-Bridal
                    </span>
                  </div>
                  <span className="font-serif italic text-xs text-charcoal-muted">GK-I</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
