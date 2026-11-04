import React from 'react';
import { Helmet } from 'react-helmet-async';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { services } from '@/data/services';
import { packages } from '@/data/packages';
import {
  PaisleyMotif,
  MandalaMotif,
  FloralVineMotif,
  MehndiConeMotif,
} from '@/components/motifs';

export const BridalMehndiPage: React.FC = () => {
  const bridalService = services.find((s) => s.slug === 'bridal-mehndi') || services[0];

  return (
    <>
      <Helmet>
        <title>Bridal Mehndi Couture | {brandConfig.brandName}</title>
        <meta
          name="description"
          content={`Custom bridal mehndi artistry in ${brandConfig.city}. Architectural symmetry, bespoke portraiture, and 100% organic Sojat henna.`}
        />
      </Helmet>

      {/* Hero Header */}
      <section className="pt-24 pb-16 px-6 lg:px-12 max-w-5xl mx-auto text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 text-gold/15 pointer-events-none">
          <MandalaMotif size={220} />
        </div>
        <div className="flex justify-center text-gold relative z-10">
          <PaisleyMotif size={56} />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
          Flagship Atelier Commission
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-henna leading-tight">
          {bridalService.title}
        </h1>
        <p className="max-w-2xl mx-auto text-charcoal-muted text-base sm:text-lg font-light leading-relaxed">
          {bridalService.longDescription}
        </p>
        <div className="gold-divider max-w-xs mx-auto" />
      </section>

      {/* Signature Inclusions & Features */}
      <section className="py-12 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-henna">
              What Defines Our Bridal Commission
            </h2>
            <ul className="space-y-4">
              {bridalService.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-charcoal-muted leading-relaxed">
                  <span className="text-gold text-base mt-0.5">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="p-5 border border-gold/30 bg-ivory-light/50 text-xs text-mehndi space-y-1">
              <span className="font-medium text-henna block">Recommended Ceremony Timing:</span>
              <p>{bridalService.recommendedTiming}</p>
            </div>
          </div>

          <div className="editorial-card p-10 ornate-corners text-center space-y-6">
            <MehndiConeMotif size={48} className="mx-auto text-gold" />
            <span className="font-vibes text-3xl text-gold-dark block">
              Pure Sojat Organic Henna
            </span>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every cone is rolled and filled 24 hours before your ceremony. We exclusively combine triple-sifted Rajasthani henna leaf powder with therapeutic-grade Australian eucalyptus and cajeput oils.
            </p>
            <div className="gold-divider" />
            <a
              href={getWhatsAppBookingLink(bridalService.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold/40 hover:bg-henna-dark transition-all duration-300"
            >
              Inquire for Your Date
            </a>
          </div>
        </div>
      </section>

      {/* Bridal Tiers & Packages */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-gold/20">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Investment &amp; Tiers
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-henna">
            Curated Bridal Packages
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`editorial-card p-8 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.isPopular ? 'border-gold shadow-gold bg-ivory-light' : 'hover:border-gold/60'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-8 px-3 py-1 bg-henna text-ivory text-[10px] uppercase tracking-[0.2em] border border-gold/40">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-henna">{pkg.name}</h3>
                  <p className="text-xs text-charcoal-soft mt-1">{pkg.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b border-gold/20">
                  <div className="font-serif text-3xl text-henna">{pkg.price}</div>
                  <div className="text-[11px] text-gold-dark mt-0.5">{pkg.deposit}</div>
                </div>

                <div className="space-y-1 text-xs text-charcoal-muted">
                  <div className="font-medium text-charcoal">Hands: {pkg.coverage.hands}</div>
                  <div>Feet: {pkg.coverage.feet}</div>
                  <div>Estimated Time: {pkg.duration}</div>
                </div>

                <ul className="space-y-3 pt-2 text-xs text-charcoal-muted">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold text-xs">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-gold/15">
                <a
                  href={getWhatsAppBookingLink(pkg.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 text-center text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    pkg.isPopular
                      ? 'bg-henna text-ivory border border-gold/50 hover:bg-henna-dark'
                      : 'bg-transparent text-charcoal border border-gold/40 hover:border-gold hover:text-henna'
                  }`}
                >
                  Reserve This Tier
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-20 text-gold/60">
          <FloralVineMotif size={160} />
        </div>
      </section>
    </>
  );
};
