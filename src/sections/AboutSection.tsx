import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';

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
      className="py-24 sm:py-32 px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Left Column: Polaroid-Style Photo Collage */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[480px] sm:min-h-[540px]">
          {/* Polaroid 1: Artist at Work / Profile (Tilted -4deg) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, rotate: -2, zIndex: 30 }}
            className="absolute left-0 sm:left-4 top-2 sm:top-6 w-60 sm:w-72 bg-white p-3.5 pb-6 shadow-editorial border border-gold/30 transition-all duration-300 z-10"
          >
            <div className="relative overflow-hidden border border-gold/20">
              <EditorialImage
                src={brandConfig.profilePic || '/images/kashish-profile.jpg'}
                alt={`Master Artist ${brandConfig.artistName}`}
                fallbackTitle={brandConfig.artistName}
                fallbackSubtitle="Master Henna Couturier"
                aspectRatio="1/1"
              />
            </div>
            <div className="pt-3 text-center">
              <span className="font-vibes text-xl text-henna block">
                {brandConfig.artistName} · Master Atelier
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-dark font-sans">
                Hands that craft royal memories
              </span>
            </div>
          </motion.div>

          {/* Polaroid 2: Bridal Detail / Shagun Moment (Tilted +3deg, overlapping) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, rotate: 1, zIndex: 30 }}
            className="absolute right-0 sm:right-4 bottom-2 sm:bottom-6 w-56 sm:w-68 bg-white p-3.5 pb-6 shadow-editorial border border-gold/30 transition-all duration-300 z-20"
          >
            <div className="relative overflow-hidden border border-gold/20">
              <EditorialImage
                src="/images/about-hands.webp"
                alt="Bridal Shagun Henna Moment"
                fallbackTitle="The Sacred Shagun"
                fallbackSubtitle="Pure Sojat Oxidation"
                aspectRatio="4/5"
              />
            </div>
            <div className="pt-3 text-center">
              <span className="font-vibes text-xl text-gold-dark block">
                The Auspicious Shagun
              </span>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-soft font-sans">
                Deep Mahogany Rang
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Warm Story Copy with Hindi Cultural Nuances & Self-Drawing Paisley */}
        <div className="lg:col-span-7 space-y-8 relative">
          {/* Self-Drawing Paisley Line-Art (draws on scroll via stroke-dashoffset / pathLength) */}
          <div className="absolute -top-12 -right-8 w-44 sm:w-56 h-52 sm:h-64 pointer-events-none opacity-30 text-gold z-0">
            <svg
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Outer Paisley Outline (Controlled by scroll progress) */}
              <motion.path
                d="M50 110 C20 110 10 82 10 58 C10 32 30 18 52 10 C62 6 78 8 84 18 C88 25 86 36 78 40 C70 44 60 38 64 28 C66 22 62 18 56 20 C42 24 24 38 24 60 C24 80 34 98 52 98 C68 98 84 84 84 66 C84 54 78 48 76 44"
                stroke="#B8893A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength }}
              />

              {/* Inner Tear-drop Core */}
              <motion.path
                d="M48 90 C32 90 26 74 26 58 C26 42 36 32 46 26 C48 34 52 38 56 38 C60 38 66 32 64 24 C56 26 48 32 44 40 C38 48 38 64 48 76 C54 82 62 80 66 74"
                stroke="#5A1E1B"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength }}
              />

              {/* Internal Petal Filigree */}
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
              <span>About the Artist</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-henna leading-[1.12]">
              Where Ancient <span className="font-vibes text-gold text-4xl sm:text-6xl">Shagun</span> Meets Modern Bridal Poise
            </h2>

            <div className="gold-divider max-w-xs" />

            <div className="space-y-4 text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
              <p>
                In our culture, the ritual of mehndi is never just an appointment; it is the sacred ceremony of{' '}
                <strong className="text-henna font-medium italic">Shagun</strong>—an invocation of auspicious beginnings, laughter, and timeless blessings.
              </p>
              <p>
                As an artist, my journey began with watching the elder matriarchs gently grind Lawsonia leaves on stone slabs, filling the courtyard with the earthy perfume of rain-soaked soil. It is believed that the darker the{' '}
                <strong className="text-henna font-medium italic">Rang</strong> (the deeper the mahogany stain), the deeper the affection and joy that surrounds the bride's new journey.
              </p>
              <p>
                At <strong className="text-charcoal font-medium">{brandConfig.brandName}</strong>, we honor this sentiment with meticulous care. Every single cone is rolled by hand from triple-cloth-sifted organic henna leaves harvested straight from Sojat, Rajasthan, blended solely with pure eucalyptus, tea tree, and cajeput essential oils.
              </p>
              <p className="text-sm text-charcoal-muted/90 italic">
                "No toxic chemical pastes, no rushed shortcuts. We accept only one bridal commission per calendar day so your hands receive unhurried, serene craftsmanship."
              </p>
            </div>

            {/* Cultural Highlights Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gold/20">
              <div className="p-4 bg-ivory-light/70 border border-gold/25 ornate-corners">
                <span className="font-serif text-lg text-henna block font-medium">
                  The Sacred Rang
                </span>
                <span className="text-xs text-charcoal-soft leading-normal block mt-1">
                  Naturally oxidizes over 48 hours into rich mahogany and dark cherry tones without synthetic chemicals.
                </span>
              </div>

              <div className="p-4 bg-ivory-light/70 border border-gold/25 ornate-corners">
                <span className="font-serif text-lg text-henna block font-medium">
                  Doorstep Serenity
                </span>
                <span className="text-xs text-charcoal-soft leading-normal block mt-1">
                  Full bridal setup at your home or hotel suite across {brandConfig.city} and destination palaces.
                </span>
              </div>
            </div>

            {/* Contact Action */}
            <div className="pt-4 flex items-center gap-6">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
              >
                <span>Consult with {brandConfig.artistName}</span>
                <span className="text-gold">→</span>
              </a>

              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-charcoal-soft hover:text-henna uppercase tracking-widest editorial-link"
              >
                Follow {brandConfig.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

