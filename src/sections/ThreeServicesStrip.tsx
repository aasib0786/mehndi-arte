import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import {
  MehndiConeMotif,
  MakeupBrushMotif,
  CompactMirrorMotif,
  OrnateCornerFlourish,
  BrushStrokeFlourish,
} from '@/components/motifs';

interface ServiceWing {
  id: string;
  number: string;
  hindiTag: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  path: string;
  imageUrl: string;
  placeholderUrl?: string;
  fallbackTitle: string;
  fallbackSubtitle: string;
  motif: React.ReactNode;
  startingPrice: string;
}

const serviceWings: ServiceWing[] = [
  {
    id: 'mehndi',
    number: '01',
    hindiTag: 'शगुन',
    title: 'Ceremonial Mehndi',
    subtitle: '100% Organic Sojat Henna',
    description:
      'Palatial architectural jaal, customized couple portraits, and guaranteed dark mahogany stains hand-ground from triple-sifted Sojat leaves.',
    badge: 'Doorstep & Venue Visits',
    path: '/mehndi',
    imageUrl: '/images/hero-1.webp',
    placeholderUrl: '/images/hero-1-blur.webp',
    fallbackTitle: 'Heirloom Mehndi Art',
    fallbackSubtitle: 'Organic Sojat Leaves & Essential Oils',
    motif: <MehndiConeMotif size={26} className="text-gold" />,
    startingPrice: '₹14,999',
  },
  {
    id: 'makeup',
    number: '02',
    hindiTag: 'श्रृंगार',
    title: 'Haute Bridal Makeup',
    subtitle: 'International HD & Airbrush Artistry',
    description:
      'Cosmetic perfection with MAC, Huda Beauty & Dior Backstage. Includes couture bridal hairstyling, mink eyelashes, and precision dupatta draping.',
    badge: 'Doorstep & Venue Visits',
    path: '/makeup',
    imageUrl: '/images/hero-2.webp',
    placeholderUrl: '/images/hero-2-blur.webp',
    fallbackTitle: 'Haute Bridal Makeup',
    fallbackSubtitle: 'MAC & Huda Beauty HD Finish',
    motif: <MakeupBrushMotif size={26} className="text-gold" />,
    startingPrice: '₹15,000',
  },
  {
    id: 'parlour',
    number: '03',
    hindiTag: 'सौंदर्य',
    title: 'Sanctuary Parlour',
    subtitle: 'Botanical Skin & Salon Rituals',
    description:
      'O3+ luxury bridal illumination facials, Italian Rica waxing, botanical hair spa, rose milk mani-pedi, and 7-day pre-bridal transformation packages.',
    badge: 'GK-1 Flagship Salon',
    path: '/parlour',
    imageUrl: '/images/hero-3.webp',
    placeholderUrl: '/images/hero-3-blur.webp',
    fallbackTitle: 'Studio Beauty Parlour',
    fallbackSubtitle: 'Greater Kailash I Flagship Studio',
    motif: <CompactMirrorMotif size={26} className="text-gold" />,
    startingPrice: '₹800',
  },
];

export const ThreeServicesStrip: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeHoverId, setActiveHoverId] = useState<string>('makeup');

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/25">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Asymmetric Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>The Atelier Trinity · 3 Signature Disciplines</span>
              <span>✦</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna font-normal leading-[1.1]">
              One Master Atelier, <br className="hidden sm:inline" />
              <span className="italic font-light">Three Dedicated</span> Disciplines
            </h2>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl">
              From ceremonial doorstep bridal henna and international HD makeup to our private parlour sanctuary in Greater Kailash I, every discipline is directed by single-bride devotion.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end items-end">
            <div className="text-left lg:text-right space-y-1">
              <span className="font-serif text-2xl sm:text-3xl text-gold font-light tracking-wide block">
                Triptych Collection
              </span>
              <span className="text-xs text-charcoal-soft font-light block">
                Curated for Delhi NCR &amp; Destination Weddings
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Editorial Accordion Layout (Hovered panel expands, siblings shrink) */}
        <div className="hidden lg:flex gap-6 h-[560px] items-stretch">
          {serviceWings.map((wing) => {
            const isExpanded = activeHoverId === wing.id;

            return (
              <motion.div
                key={wing.id}
                onMouseEnter={() => setActiveHoverId(wing.id)}
                layout={!prefersReducedMotion}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden rounded-none border transition-all duration-500 cursor-pointer editorial-card ${
                  isExpanded
                    ? 'flex-[2.5] border-gold shadow-gold'
                    : 'flex-1 border-gold/30 hover:border-gold/60 opacity-90'
                }`}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                  <EditorialImage
                    src={wing.imageUrl}
                    placeholder={wing.placeholderUrl}
                    alt={`${wing.title} - ${wing.subtitle} by Kashish Studio Delhi NCR`}
                    fallbackTitle={wing.fallbackTitle}
                    fallbackSubtitle={wing.fallbackSubtitle}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isExpanded ? 'scale-105' : 'scale-100 filter brightness-90'
                    }`}
                  />
                  {/* Subtle Henna Charcoal Gradient Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded
                        ? 'bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-transparent'
                        : 'bg-gradient-to-t from-charcoal/95 via-charcoal/65 to-charcoal/30'
                    }`}
                  />
                </div>

                {/* Corner Flourishes on Active Card */}
                {isExpanded && (
                  <>
                    <div className="absolute top-3 left-3 text-gold/40 pointer-events-none z-10">
                      <OrnateCornerFlourish size={24} />
                    </div>
                    <div className="absolute top-3 right-3 text-gold/40 pointer-events-none rotate-90 z-10">
                      <OrnateCornerFlourish size={24} />
                    </div>
                  </>
                )}

                {/* Top Badge & Number */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                  <span className="px-3 py-1 bg-ivory/95 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] text-henna border border-gold/40 shadow-sm font-medium">
                    {wing.badge}
                  </span>
                  <span className="font-serif text-lg text-gold-light/90 font-light drop-shadow">
                    № {wing.number}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 text-ivory flex flex-col justify-end space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-ivory/15 backdrop-blur-md rounded-full border border-gold/40 flex-shrink-0">
                      {wing.motif}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-light block font-light">
                        Starts at {wing.startingPrice}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-medium leading-tight">
                        {wing.title}
                      </h3>
                    </div>
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="space-y-4 pt-1"
                    >
                      <BrushStrokeFlourish width={140} height={10} color="#B8893A" />

                      <p className="text-xs sm:text-sm text-ivory/85 font-light leading-relaxed max-w-md">
                        {wing.description}
                      </p>

                      <div>
                        <Link
                          to={wing.path}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine group"
                        >
                          <span>Explore {wing.title}</span>
                          <span className="text-gold group-hover:translate-x-1 transition-transform">
                            ↗
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-xs text-ivory/70 font-light truncate">
                      {wing.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet Editorial Cards */}
        <div className="lg:hidden space-y-8">
          {serviceWings.map((wing, idx) => (
            <motion.div
              key={wing.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="editorial-card overflow-hidden relative border border-gold/40 shadow-editorial"
            >
              {/* Image Frame with Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <EditorialImage
                  src={wing.imageUrl}
                  placeholder={wing.placeholderUrl}
                  alt={`${wing.title} - ${wing.subtitle} by Kashish Studio Delhi NCR`}
                  fallbackTitle={wing.fallbackTitle}
                  fallbackSubtitle={wing.fallbackSubtitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                  <span className="px-2.5 py-0.5 bg-ivory/95 text-[10px] uppercase tracking-wider text-henna border border-gold/40 font-medium">
                    {wing.badge}
                  </span>
                  <span className="font-serif text-sm text-ivory bg-charcoal/60 px-2 py-0.5 border border-gold/30">
                    № {wing.number}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ivory">
                  <div className="flex items-center gap-2">
                    {wing.motif}
                    <h3 className="font-serif text-2xl text-ivory font-medium">
                      {wing.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-gold-light font-medium">
                    From {wing.startingPrice}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 bg-ivory-light space-y-3">
                <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                  {wing.description}
                </p>

                <div className="pt-2 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gold-dark font-medium">
                    {wing.subtitle}
                  </span>
                  <Link
                    to={wing.path}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-henna text-ivory text-xs uppercase tracking-wider font-medium hover:bg-henna-dark transition-colors"
                  >
                    <span>View Discipline</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
