import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import {
  BrushStrokeFlourish,
  AtelierSealMotif,
  OrnateCornerFlourish,
} from '@/components/motifs';

export const AboutSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll through the About section to draw the Paisley SVG
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 25%'],
  });

  const pathLength = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    [prefersReducedMotion ? 1 : 0, 1]
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Left Column: 3-Photo Album Collage with Gold Photo Corners & Seal */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[540px] sm:min-h-[600px]">
          {/* Polaroid 1: Artist Applying Mehndi (Tilted -3.5deg, top left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -3.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3.5 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, rotate: -1.5, zIndex: 35 }}
            className="absolute left-0 sm:left-2 top-0 sm:top-2 w-40 min-[400px]:w-48 sm:w-60 bg-white p-2.5 sm:p-3 pb-4 sm:pb-5 shadow-editorial border border-gold/35 transition-all duration-300 z-10"
          >
            {/* Handcrafted Photo Mounting Corners */}
            <div className="absolute top-1 left-1 text-gold/50 pointer-events-none">
              <OrnateCornerFlourish size={16} />
            </div>
            <div className="absolute top-1 right-1 text-gold/50 pointer-events-none rotate-90">
              <OrnateCornerFlourish size={16} />
            </div>

            <div className="relative overflow-hidden border border-gold/20">
              <EditorialImage
                src="/images/about-mehndi.webp"
                alt="Master Artist Kashish applying bespoke bridal mehndi in Delhi NCR using 100% organic Sojat henna"
                fallbackTitle="The Mehndi Ceremony"
                fallbackSubtitle="Sacred Shagun Tradition"
                aspectRatio="4/5"
              />
            </div>
            <div className="pt-2 text-center">
              <span className="font-vibes text-lg text-henna block">
                The Sacred Shagun
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold-dark font-sans">
                Fine-Line Ceremonial Henna
              </span>
            </div>
          </motion.div>

          {/* Polaroid 2: Bridal Makeup Session (Tilted +3deg, top right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, rotate: 1.5, zIndex: 35 }}
            className="absolute right-0 sm:right-2 top-8 sm:top-12 w-36 min-[400px]:w-44 sm:w-56 bg-white p-2.5 sm:p-3 pb-4 sm:pb-5 shadow-editorial border border-gold/35 transition-all duration-300 z-20"
          >
            <div className="absolute top-1 left-1 text-gold/50 pointer-events-none">
              <OrnateCornerFlourish size={16} />
            </div>
            <div className="absolute top-1 right-1 text-gold/50 pointer-events-none rotate-90">
              <OrnateCornerFlourish size={16} />
            </div>

            <div className="relative overflow-hidden border border-gold/20">
              <EditorialImage
                src="/images/about-makeup.webp"
                alt="Bridal makeup and hair styling session with premium MAC, Dior and Huda Beauty cosmetics by Kashish Studio"
                fallbackTitle="Solah Shringar Makeup"
                fallbackSubtitle="MAC &amp; Huda Beauty Artistry"
                aspectRatio="4/5"
              />
            </div>
            <div className="pt-2 text-center">
              <span className="font-vibes text-lg text-gold-dark block">
                Solah Shringar
              </span>
              <span className="text-[9px] uppercase tracking-widest text-charcoal-soft font-sans">
                Radiant Bridal Poise
              </span>
            </div>
          </motion.div>

          {/* Polaroid 3: The GK-1 Studio Parlour (Tilted -1deg, bottom center overlapping) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 35 }}
            className="absolute left-4 min-[400px]:left-6 sm:left-16 bottom-0 sm:bottom-2 w-44 min-[400px]:w-52 sm:w-64 bg-white p-2.5 sm:p-3 pb-4 sm:pb-5 shadow-editorial border border-gold/40 transition-all duration-300 z-30"
          >
            <div className="absolute top-1 left-1 text-gold/50 pointer-events-none">
              <OrnateCornerFlourish size={16} />
            </div>
            <div className="absolute top-1 right-1 text-gold/50 pointer-events-none rotate-90">
              <OrnateCornerFlourish size={16} />
            </div>

            <div className="relative overflow-hidden border border-gold/20">
              <EditorialImage
                src="/images/about-studio.webp"
                alt="Studio 04 Greater Kailash I bridal salon sanctuary in South Delhi for luxury pre-bridal skin and hair treatments"
                fallbackTitle="The Flagship Studio"
                fallbackSubtitle="Greater Kailash I, New Delhi"
                aspectRatio="16/11"
              />
            </div>
            <div className="pt-2 text-center">
              <span className="font-serif text-sm font-medium text-henna block">
                Greater Kailash I Studio
              </span>
              <span className="text-[9px] uppercase tracking-widest text-charcoal-soft font-sans">
                Private Parlour Sanctuary
              </span>
            </div>
          </motion.div>

          {/* Overlapping Gold Atelier Wax Seal */}
          <div className="absolute -bottom-4 right-4 sm:right-10 z-40 drop-shadow-md pointer-events-none hidden sm:block">
            <AtelierSealMotif size={90} sealColor="#B8893A" textColor="#5A1E1B" />
          </div>
        </div>

        {/* Right Column: Story Copy with Illuminated Drop-Cap & Handwritten Signature */}
        <div className="lg:col-span-7 space-y-8 relative">
          {/* Self-Drawing Paisley Line-Art */}
          <div className="absolute -top-12 -right-8 w-44 sm:w-56 h-52 sm:h-64 pointer-events-none opacity-25 text-gold z-0">
            <svg
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <motion.path
                d="M50 110 C20 110 10 82 10 58 C10 32 30 18 52 10 C62 6 78 8 84 18 C88 25 86 36 78 40 C70 44 60 38 64 28 C66 22 62 18 56 20 C42 24 24 38 24 60 C24 80 34 98 52 98 C68 98 84 84 84 66 C84 54 78 48 76 44"
                stroke="#B8893A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength }}
              />
              <motion.path
                d="M48 90 C32 90 26 74 26 58 C26 42 36 32 46 26 C48 34 52 38 56 38 C60 38 66 32 64 24 C56 26 48 32 44 40 C38 48 38 64 48 76 C54 82 62 80 66 74"
                stroke="#5A1E1B"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength }}
              />
              <motion.circle
                cx="48"
                cy="62"
                r="4.5"
                stroke="#B8893A"
                strokeWidth="1.2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
              <span>✦</span>
              <span>The Atelier Story &bull; Founder's Note</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl text-henna leading-[1.12]">
                Where Sacred <span className="font-vibes text-gold text-4xl sm:text-6xl">Shagun</span> Meets Modern Bridal Poise
              </h2>
              <BrushStrokeFlourish width={180} height={12} color="#B8893A" />
            </div>

            {/* Illuminated Prose */}
            <div className="space-y-4 text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
              <p className="illuminated-dropcap">
                In our culture, the ceremonial ritual of mehndi is never merely an appointment; it is the auspicious invocation of{' '}
                <strong className="text-henna font-medium italic">Shagun</strong>—a quiet hour where anticipation transforms into art, laughter fills the courtyard, and timeless blessings are inscribed upon the skin.
              </p>
              <p>
                My artistic journey began beside elder matriarchs who gently ground harvested Lawsonia inermis leaves on stone slabs, filling the courtyard with the sweet, earthy aroma of rain on fertile soil. Tradition tells us that the darker the{' '}
                <strong className="text-henna font-medium italic">Rang</strong> (the deeper the mahogany oxidation), the deeper the love, warmth, and prosperity that envelops the bride's new journey.
              </p>
              <p>
                At <strong className="text-charcoal font-medium">{brandConfig.brandName}</strong>, we revere this sacred heritage. Every cone is hand-rolled from triple-sifted organic henna leaves harvested straight from Sojat, Rajasthan, blended solely with pure eucalyptus, tea tree, and cajeput essential oils—free from synthetic chemicals, black dyes, or PPD.
              </p>
            </div>

            {/* Editorial Pull-Quote Block */}
            <div className="p-6 bg-[#F5EFE4]/80 border-l-4 border-gold border-y border-r border-gold/25 relative ornate-corners my-6">
              <span className="font-serif italic text-base sm:text-lg text-henna leading-relaxed block">
                "Whether it is the auspicious quietude of doorstep bridal henna at your venue or complete Solah Shringar rituals at our GK-1 studio, every bride is treated as our sole, cherished canvas."
              </span>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium">
                  {brandConfig.artistName} · Master Henna &amp; Makeup Artist
                </span>
                <span className="text-gold text-xs">✦</span>
              </div>
            </div>

            {/* Artist Signature & Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-gold/20">
              <div className="flex items-center gap-4">
                <div className="space-y-0.5">
                  <div className="font-vibes text-3xl sm:text-4xl text-henna leading-none">
                    {brandConfig.artistName}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal-soft font-sans block">
                    Founder &amp; Creative Director
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
                >
                  <span>Consult with {brandConfig.artistName}</span>
                  <span className="text-gold">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
