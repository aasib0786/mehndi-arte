import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mehndiPackages, makeupPackages, comboPackages, PackageItem } from '@/data/packages';
import { brandConfig } from '@/lib/config';
import { openWhatsAppEnquiry } from '@/lib/bookingService';
import { useBooking } from '@/context/BookingContext';
import { useReducedMotion } from '@/lib/useReducedMotion';
import {
  MandalaMotif,
  FloralVineMotif,
  LotusFloretMotif,
  OrnateCornerFlourish,
  JharokhaArchMotif,
  MehndiConeMotif,
  MakeupBrushMotif,
  BrushStrokeFlourish,
} from '@/components/motifs';

export const PackagesSection: React.FC = () => {
  const { selectAndScrollToBooking, selectedItem } = useBooking();
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'mehndi' | 'makeup' | 'combo'>('mehndi');

  const currentPackages: PackageItem[] =
    activeTab === 'mehndi'
      ? mehndiPackages
      : activeTab === 'makeup'
      ? makeupPackages
      : comboPackages;

  return (
    <section
      id="packages"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F9F4EB] paper-grain relative overflow-hidden border-b border-gold/20"
    >
      {/* Background Watermark Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/5 pointer-events-none">
        <MandalaMotif size={640} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Editorial Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>Bespoke Bridal Trousseaux · Vol. 2026</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                Curated Bridal <br className="hidden sm:inline" />
                <span className="italic font-light">Mehndi &amp; Makeup</span> Trousseaux
              </h2>
              <BrushStrokeFlourish width={200} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-xl">
              From pure organic Sojat henna to MAC and Huda Beauty airbrush makeup, choose individual atelier commission or save with our Shagun Bridal Combos.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-2 text-left lg:text-right">
            <div className="flex items-center gap-2 text-gold">
              <LotusFloretMotif size={32} />
              <span className="font-vibes text-2xl sm:text-3xl text-henna">
                Shagun ka Asli Rang
              </span>
            </div>
            <p className="text-xs text-charcoal-soft font-light max-w-xs leading-relaxed">
              Every commission includes our unhurried bridal guarantee: <strong className="text-charcoal font-medium">only one bride accepted per calendar date</strong>.
            </p>
          </div>
        </div>

        {/* Package Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center lg:justify-start">
          <button
            onClick={() => setActiveTab('mehndi')}
            className={`w-full sm:w-auto px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] transition-all duration-300 border flex items-center justify-center gap-2 ${
              activeTab === 'mehndi'
                ? 'bg-henna text-ivory border-gold shadow-fine'
                : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
            }`}
          >
            <MehndiConeMotif size={16} />
            <span>Bridal Mehndi Packages (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('makeup')}
            className={`w-full sm:w-auto px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] transition-all duration-300 border flex items-center justify-center gap-2 ${
              activeTab === 'makeup'
                ? 'bg-henna text-ivory border-gold shadow-fine'
                : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
            }`}
          >
            <MakeupBrushMotif size={16} />
            <span>Bridal Makeup Packages (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('combo')}
            className={`w-full sm:w-auto px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] transition-all duration-300 border flex items-center justify-center gap-2 ${
              activeTab === 'combo'
                ? 'bg-henna text-ivory border-gold shadow-fine'
                : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
            }`}
          >
            <span>✦</span>
            <span>Bridal Combos &bull; Mehndi + Makeup (3)</span>
          </button>
        </div>

        {/* 3 Packages Editorial Folio Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch"
          >
            {currentPackages.map((pkg, index) => {
              const isMiddle = pkg.isPopular;
              const isSelected = selectedItem?.id === pkg.id;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : index * 0.15,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className={`editorial-card flex flex-col justify-between relative transition-all duration-300 ${
                    isMiddle
                      ? 'border-2 border-gold shadow-gold bg-[#FFFDF9] p-6 sm:p-10 lg:-translate-y-3 z-20 double-hairline-gold'
                      : 'border border-gold/35 hover:border-gold/60 p-6 sm:p-9 bg-[#FDFBF7] z-10'
                  } ${isSelected ? 'ring-2 ring-henna ring-offset-4 ring-offset-[#F9F4EB]' : ''}`}
                >
                  {/* Handcrafted Corner Flourishes on the Middle Card */}
                  {isMiddle && (
                    <>
                      <div className="absolute top-2 left-2 text-gold/40 pointer-events-none">
                        <OrnateCornerFlourish size={28} />
                      </div>
                      <div className="absolute top-2 right-2 text-gold/40 pointer-events-none rotate-90">
                        <OrnateCornerFlourish size={28} />
                      </div>
                      <div className="absolute bottom-2 left-2 text-gold/40 pointer-events-none -rotate-90">
                        <OrnateCornerFlourish size={28} />
                      </div>
                      <div className="absolute bottom-2 right-2 text-gold/40 pointer-events-none rotate-180">
                        <OrnateCornerFlourish size={28} />
                      </div>

                      {/* Watermark Jharokha Arch behind the middle card */}
                      <div className="absolute top-8 right-6 text-gold/8 pointer-events-none">
                        <JharokhaArchMotif size={100} />
                      </div>
                    </>
                  )}

                  {/* Highlighted Ribbon for Middle Package or Combo Best Value */}
                  {isMiddle ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-6 py-1 bg-henna text-ivory text-[10px] uppercase tracking-[0.24em] font-medium border border-gold shadow-md flex items-center gap-2 whitespace-nowrap">
                      <span className="text-gold text-xs">✦</span>
                      <span>
                        {activeTab === 'combo'
                          ? 'Imperial Combo · Save ₹6,000'
                          : 'Most Loved Bridal Trousseau'}
                      </span>
                      <span className="text-gold text-xs">✦</span>
                    </div>
                  ) : activeTab === 'combo' && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-ivory text-henna text-[9px] uppercase tracking-wider font-semibold border border-gold/50 shadow-sm">
                      {index === 0 ? 'Save ₹2,000' : 'Save ₹12,500 · Trousseau'}
                    </div>
                  )}

                  {/* Top Section: Title & Price */}
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-gold/20 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium">
                          Folio № {index + 1}
                        </span>
                        <span className="font-serif text-xs text-charcoal-soft italic">
                          {pkg.tier} Edition
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-henna mt-1 font-medium">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-charcoal-muted font-light mt-1.5 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Price Banner with Small-Caps Luxury Investment Styling */}
                    <div className="py-3.5 px-4 bg-[#F7F1E6]/80 border border-gold/30 flex items-baseline justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-charcoal-soft block font-medium">
                          Commission Investment
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-3xl sm:text-4xl text-henna font-medium">
                            {pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="line-through text-xs text-charcoal-soft">
                              {pkg.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-wider text-charcoal-soft block">
                          Retainer Date Lock
                        </span>
                        <span className="text-xs text-mehndi font-medium">
                          {pkg.deposit}
                        </span>
                      </div>
                    </div>

                    {/* Core Coverage Specifications */}
                    <div className="space-y-3 pt-1">
                      {pkg.coverage?.hands && (
                        <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                          <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                            Palm &amp; Arm Coverage
                          </span>
                          <span className="font-light">{pkg.coverage.hands}</span>
                        </div>
                      )}

                      {pkg.coverage?.feet && (
                        <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                          <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                            Feet &amp; Payal Silhouette
                          </span>
                          <span className="font-light">{pkg.coverage.feet}</span>
                        </div>
                      )}

                      {pkg.coverage?.faceAndHair && (
                        <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                          <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                            Makeup &amp; Hair Artistry
                          </span>
                          <span className="font-light">{pkg.coverage.faceAndHair}</span>
                        </div>
                      )}

                      {pkg.coverage?.figureWork && (
                        <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                          <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                            Story &amp; Portrait Figure Work
                          </span>
                          <span className="font-light">{pkg.coverage.figureWork}</span>
                        </div>
                      )}

                      {pkg.coverage?.preBridal && (
                        <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                          <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                            Pre-Bridal Parlour Care
                          </span>
                          <span className="font-light">{pkg.coverage.preBridal}</span>
                        </div>
                      )}

                      {pkg.familyMembersIncluded && (
                        <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                          <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                            Family / Guest Inclusions
                          </span>
                          <span className="font-light">{pkg.familyMembersIncluded}</span>
                        </div>
                      )}

                      <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                        <span className="text-charcoal block text-[10px] uppercase tracking-wider font-medium mb-0.5">
                          Trial / Skin Consultation
                        </span>
                        <span className="font-light text-mehndi font-medium">
                          {pkg.freeTrial}
                        </span>
                      </div>
                    </div>

                    {/* Inclusions List */}
                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal font-medium block mb-3">
                        Atelier Ritual Inclusions:
                      </span>
                      <ul className="space-y-2 text-xs text-charcoal-muted font-light">
                        {pkg.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-gold text-xs leading-none mt-1">✦</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTA Buttons */}
                  <div className="pt-8 mt-8 border-t border-gold/20 space-y-2.5 relative z-10">
                    <button
                      onClick={() =>
                        selectAndScrollToBooking({
                          type: 'package',
                          id: pkg.id,
                          title: pkg.name,
                          price: pkg.price,
                          tagline: pkg.tagline,
                        })
                      }
                      className={`w-full py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-medium ${
                        isMiddle
                          ? 'bg-henna text-ivory border border-gold hover:bg-henna-dark shadow-gold'
                          : 'bg-transparent text-charcoal border border-gold/50 hover:bg-henna hover:text-ivory hover:border-henna'
                      }`}
                    >
                      {isSelected ? '✓ Trousseau Selected' : `Reserve ${pkg.name}`}
                    </button>

                    <button
                      onClick={() =>
                        openWhatsAppEnquiry(
                          `Hi ${brandConfig.artistName}, I want to enquire about booking the "${pkg.name}" (${pkg.price}).`
                        )
                      }
                      className="w-full py-2.5 bg-mehndi/10 text-mehndi text-xs uppercase tracking-[0.16em] border border-mehndi/30 hover:bg-mehndi hover:text-ivory transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <span>Enquire on WhatsApp</span>
                      <span>↗</span>
                    </button>

                    <div className="text-center pt-1">
                      <span className="text-[10px] text-charcoal-soft tracking-wider uppercase">
                        Dedicated Session: {pkg.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-16 text-gold/50">
          <FloralVineMotif size={180} />
        </div>
      </div>
    </section>
  );
};
