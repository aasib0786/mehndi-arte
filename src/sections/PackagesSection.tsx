import React from 'react';
import { motion } from 'framer-motion';
import { packages } from '@/data/packages';
import { useBooking } from '@/context/BookingContext';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { MandalaMotif, FloralVineMotif } from '@/components/motifs';

export const PackagesSection: React.FC = () => {
  const { selectAndScrollToBooking, selectedItem } = useBooking();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="packages"
      className="py-24 sm:py-32 px-6 lg:px-12 bg-ivory-light/50 paper-grain relative overflow-hidden border-b border-gold/20"
    >
      {/* Background Watermark Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/5 pointer-events-none">
        <MandalaMotif size={580} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
            <span>✦</span>
            <span>Bridal Investment Tiers</span>
            <span>✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-tight font-normal">
            Bespoke Bridal Collections
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            Every bridal package includes 100% fresh organic Sojat henna paste prepared in-house, personalized design consultations, and unhurried craftsmanship.
          </p>

          <div className="gold-divider max-w-xs mx-auto pt-2" />
        </div>

        {/* 3 Packages Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch">
          {packages.map((pkg, index) => {
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
                    ? 'border-2 border-gold shadow-gold bg-ivory-light sm:p-10 p-8 lg:-translate-y-2'
                    : 'border border-gold/30 hover:border-gold/60 p-8 sm:p-9 bg-ivory'
                } ${isSelected ? 'ring-2 ring-henna ring-offset-2' : ''}`}
              >
                {/* Highlighted Ribbon for Middle Package */}
                {isMiddle && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 bg-henna text-ivory text-[10px] uppercase tracking-[0.25em] font-medium border border-gold shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-gold">✦</span>
                    <span>Most Loved</span>
                    <span className="text-gold">✦</span>
                  </div>
                )}

                {/* Top Section: Title & Price */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium block">
                      Tier {index + 1} · {pkg.tier}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-henna mt-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-charcoal-soft font-light mt-1.5 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price Banner */}
                  <div className="pt-2 pb-5 border-y border-gold/20 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-soft block">
                        Investment
                      </span>
                      <span className="font-serif text-3xl sm:text-4xl text-henna font-medium">
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-[11px] text-mehndi font-medium">
                      {pkg.deposit}
                    </span>
                  </div>

                  {/* Core Coverage Specifications */}
                  <div className="space-y-3 pt-1">
                    <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                      <strong className="text-charcoal block text-[11px] uppercase tracking-wider mb-0.5">
                        Hands Coverage
                      </strong>
                      <span className="font-light">{pkg.coverage.hands}</span>
                    </div>

                    <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                      <strong className="text-charcoal block text-[11px] uppercase tracking-wider mb-0.5">
                        Feet Coverage
                      </strong>
                      <span className="font-light">{pkg.coverage.feet}</span>
                    </div>

                    <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                      <strong className="text-charcoal block text-[11px] uppercase tracking-wider mb-0.5">
                        Figure &amp; Story Work
                      </strong>
                      <span className="font-light">{pkg.coverage.figureWork}</span>
                    </div>

                    <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                      <strong className="text-charcoal block text-[11px] uppercase tracking-wider mb-0.5">
                        Family Members Included
                      </strong>
                      <span className="font-light">{pkg.familyMembersIncluded}</span>
                    </div>

                    <div className="text-xs text-charcoal-muted border-b border-gold/15 pb-2.5">
                      <strong className="text-charcoal block text-[11px] uppercase tracking-wider mb-0.5">
                        Free Trial / Patch Test
                      </strong>
                      <span className="font-light text-mehndi font-medium">{pkg.freeTrial}</span>
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-charcoal font-medium block mb-3">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-2.5 text-xs text-charcoal-muted font-light">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="text-gold text-sm leading-none mt-0.5">✦</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8 mt-8 border-t border-gold/20">
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
                        ? 'bg-henna text-ivory border border-gold hover:bg-henna-dark shadow-fine'
                        : 'bg-transparent text-charcoal border border-gold/50 hover:bg-henna hover:text-ivory hover:border-henna'
                    }`}
                  >
                    {isSelected ? '✓ Package Selected' : `Select ${pkg.tier} Package`}
                  </button>
                  <div className="text-center mt-2.5">
                    <span className="text-[10px] text-charcoal-soft tracking-wider uppercase">
                      Est. Duration: {pkg.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-20 text-gold/60">
          <FloralVineMotif size={160} />
        </div>
      </div>
    </section>
  );
};

