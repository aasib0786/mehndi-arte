import React, { useRef, useState } from 'react';
import { brandConfig } from '@/lib/config';
import { SEO } from '@/components/common/SEO';
import { PackageItem } from '@/data/packages';
import { TestimonialItem } from '@/data/testimonials';
import { GalleryItem } from '@/data/gallery';
import { openWhatsAppEnquiry } from '@/lib/bookingService';
import { useBooking } from '@/context/BookingContext';
import { BookingForm } from '@/components/booking/BookingForm';
import { EditorialImage } from '@/components/common/EditorialImage';
import { LightboxModal } from '@/components/gallery/LightboxModal';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';
import {
  MandalaMotif,
  PaisleyMotif,
  FloralVineMotif,
  LotusFloretMotif,
} from '@/components/motifs';

export interface AdLandingTemplateProps {
  serviceType: 'Mehndi' | 'Makeup' | 'Bridal Combo (Mehndi + Makeup)';
  categoryKey: 'mehndi' | 'makeup' | 'combo';
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    ogImage?: string;
  };
  offerBanner: {
    badge: string;
    headline: string;
    subline?: string;
  };
  hero: {
    badgeText: string;
    badgeIcon: React.ReactNode;
    titleLine1: string;
    titleHighlight: string;
    titleLine2?: string;
    description: string;
    heroImage?: string;
    heroImageAlt?: string;
    heroImageCaption?: string;
    heroImageBadge?: string;
    offerHighlightBox: {
      icon?: string;
      title: string;
      description: string;
      checklist: string[];
    };
    trustPills: Array<{ label: string; value: string }>;
  };
  showBeforeAfterSlider?: boolean;
  beforeAfterCategory?: 'mehndi' | 'makeup' | 'hair';
  comboTimeline?: Array<{
    days: string;
    title: string;
    location: string;
    description: string;
  }>;
  galleryImages: GalleryItem[];
  testimonials: TestimonialItem[];
  packages: PackageItem[];
  personalCommitment: {
    quote: string;
    subline: string;
  };
  stickyBarOfferText: string;
  defaultWhatsAppMessage: string;
}

export const AdLandingTemplate: React.FC<AdLandingTemplateProps> = ({
  serviceType,
  categoryKey,
  seo,
  offerBanner,
  hero,
  showBeforeAfterSlider = false,
  beforeAfterCategory = 'makeup',
  comboTimeline,
  galleryImages,
  testimonials,
  packages,
  personalCommitment,
  stickyBarOfferText,
  defaultWhatsAppMessage,
}) => {
  const { selectAndScrollToBooking } = useBooking();
  const formRef = useRef<HTMLDivElement>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWhatsAppAction = (label: string, customMessage?: string) => {
    const text = customMessage || defaultWhatsAppMessage;
    openWhatsAppEnquiry(text, label, serviceType);
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        ogImage={seo.ogImage}
      />

      {/* 1. High-Converting Offer Banner at the very top */}
      <div className="bg-henna text-ivory py-2.5 px-4 text-center border-b border-gold/40 relative overflow-hidden select-none">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-medium flex-wrap">
          <span className="text-gold animate-pulse">✦</span>
          <span className="text-gold-light font-semibold">{offerBanner.badge}:</span>
          <span>{offerBanner.headline}</span>
          {offerBanner.subline && (
            <span className="hidden md:inline text-ivory/80 text-[11px]">
              &bull; {offerBanner.subline}
            </span>
          )}
          <span className="text-gold animate-pulse">✦</span>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Subtle Background Watermarks */}
        <div className="absolute top-20 right-0 text-gold/5 pointer-events-none">
          <MandalaMotif size={550} />
        </div>
        <div className="absolute top-[45%] -left-28 text-henna/5 pointer-events-none">
          <PaisleyMotif size={400} />
        </div>

        {/* 2. Hero Section: 2 Columns on Desktop, Early Form on Mobile */}
        <section className="pt-8 sm:pt-14 pb-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Headline, Guarantees & Social Proof */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-dark font-medium bg-ivory-light px-3.5 py-1.5 border border-gold/30">
                {hero.badgeIcon}
                <span>{hero.badgeText}</span>
                <span>✦</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.12] font-normal">
                {hero.titleLine1}{' '}
                <span className="italic font-light text-gold-dark">{hero.titleHighlight}</span>{' '}
                {hero.titleLine2}
              </h1>

              <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl">
                {hero.description}
              </p>

              {/* High-Impact Real Bridal Showcase Card (Trendz Salon / Megha J Goyal Inspiration) */}
              {hero.heroImage && (
                <div className="relative overflow-hidden border border-gold/45 shadow-editorial bg-ivory-light p-2.5 sm:p-3 ornate-corners double-hairline-gold">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                    <EditorialImage
                      src={hero.heroImage}
                      alt={hero.heroImageAlt || hero.titleHighlight}
                      fallbackTitle={hero.titleHighlight}
                      fallbackSubtitle={brandConfig.brandName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2.5 py-1 bg-ivory/95 backdrop-blur-md text-henna text-[10px] uppercase tracking-wider font-semibold border border-gold/50 shadow-sm flex items-center gap-1.5">
                        <span className="text-gold">★</span>
                        <span>4.9 Rated ({brandConfig.stats.happyBrides}+ Brides)</span>
                      </span>
                      {hero.heroImageBadge && (
                        <span className="px-2.5 py-1 bg-henna/95 backdrop-blur-md text-ivory text-[10px] uppercase tracking-wider font-medium border border-gold shadow-sm">
                          {hero.heroImageBadge}
                        </span>
                      )}
                    </div>

                    {/* Bottom Floating Caption */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-ivory flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold-light block font-light">
                          Real Bridal Transformation
                        </span>
                        <span className="font-serif text-sm sm:text-base text-ivory font-medium">
                          {hero.heroImageCaption || 'Bespoke Couture Artistry'}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-gold-light border border-gold/40 px-2 py-0.5 bg-black/50 hidden min-[400px]:inline">
                        100% Real Skin &bull; Zero Filters
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Offer Highlight Box */}
              <div className="p-5 sm:p-6 bg-ivory-light/95 border border-gold/45 ornate-corners space-y-2.5 shadow-fine">
                <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-henna font-semibold">
                  <span className="text-gold text-lg">🎁</span>
                  <span>{hero.offerHighlightBox.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                  {hero.offerHighlightBox.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-gold/20 text-xs text-mehndi font-medium">
                  {hero.offerHighlightBox.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-gold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Credentials Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {hero.trustPills.map((pill, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/80 border border-gold/30 text-center ornate-corners"
                  >
                    <div className="font-serif text-lg sm:text-xl text-henna font-medium leading-none">
                      {pill.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-charcoal-soft font-light mt-1">
                      {pill.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons for Mobile/Desktop */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-7 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark active:scale-95 transition-all duration-300 shadow-gold"
                >
                  Reserve Your Date ✦
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsAppAction('Hero Direct WhatsApp CTA')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.2em] border border-gold/50 hover:border-gold hover:text-henna transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <span className="text-gold">↗</span>
                </button>
              </div>

              {/* Optional Combo 3-Stage Timeline Preview */}
              {comboTimeline && (
                <div className="pt-4 space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-medium block">
                    Your Complete 3-Stage Bridal Journey
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {comboTimeline.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 bg-white/80 border border-gold/30 space-y-1"
                      >
                        <span className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold block">
                          {step.days}
                        </span>
                        <h4 className="font-serif text-sm text-henna font-medium">
                          {step.title}
                        </h4>
                        <div className="text-[10px] text-charcoal-muted font-light">
                          {step.location}
                        </div>
                        <p className="text-[11px] text-charcoal-soft pt-1 font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Early Booking Form (visible early on mobile directly below hero text) */}
            <div className="lg:col-span-5 w-full mt-4 lg:mt-0" ref={formRef}>
              <div className="bg-ivory-light/95 border border-gold/40 shadow-soft p-5 sm:p-7 ornate-corners">
                <div className="mb-4 pb-3 border-b border-gold/25 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium block">
                      Fast Direct Booking
                    </span>
                    <h3 className="font-serif text-lg text-henna font-medium">
                      Check Date Availability
                    </h3>
                  </div>
                  <span className="text-gold font-serif text-sm">✦</span>
                </div>
                <BookingForm defaultServiceType={categoryKey} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Special Feature: Before/After Slider Near Top (for Makeup & relevant pages) */}
        {showBeforeAfterSlider && (
          <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-[10px] uppercase tracking-[0.26em] text-gold-dark font-medium block">
                Camera-Ready Radiance Proof
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-henna font-normal">
                Bare Skin to Signature Bridal Radiance
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted font-light">
                Drag the interactive slider to view the seamless transition from natural skin to weightless, 24-hr transfer-proof bridal glow.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider defaultCategory={beforeAfterCategory} />
            </div>
          </section>
        )}

        {/* 4. Curated Gallery Strip (5-6 high-impact images) */}
        <section className="py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-gold/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
                Handcrafted Portfolio
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-henna font-normal">
                Recent Bridal Masterpieces
              </h2>
            </div>
            <p className="text-xs text-charcoal-muted max-w-md font-light">
              Tap any image to examine the architectural precision, symmetry, and camera-ready finish in high definition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {galleryImages.slice(0, 6).map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative cursor-pointer overflow-hidden border border-gold/35 shadow-fine bg-ivory-light ornate-corners double-hairline-gold flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <EditorialImage
                    src={img.image}
                    alt={img.altText}
                    aspectRatio="portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-ivory">
                    <span className="text-[10px] uppercase tracking-wider text-gold-light font-medium">
                      {img.categoryLabel} &bull; {img.year}
                    </span>
                    <span className="font-serif text-lg leading-snug">{img.title}</span>
                    <span className="text-xs text-gold-light font-vibes pt-0.5">{img.stainTone}</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-gold/40 text-[9px] uppercase tracking-wider text-ivory">
                    Tap to Zoom ✦
                  </div>
                </div>

                <div className="p-3.5 bg-ivory-light border-t border-gold/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm text-henna font-medium truncate max-w-[180px]">
                      {img.title}
                    </h3>
                    <p className="text-[10px] text-charcoal-soft font-light">
                      {img.brideName} &bull; {img.venueOrCity}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppAction(
                        'Lookbook Card WhatsApp Enquiry',
                        `Hi ${brandConfig.artistName}, I love this look: "${img.title}" (${img.brideName}). Can you do this look for my wedding date?`
                      );
                    }}
                    className="px-2.5 py-1 bg-henna text-ivory text-[10px] uppercase tracking-wider border border-gold hover:bg-henna-dark transition-colors flex items-center gap-1"
                  >
                    <span>Enquire</span>
                    <span className="text-gold">↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Social Proof: 3 Verified Testimonials */}
        <section className="py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto bg-ivory-light/60 border-y border-gold/25">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 text-gold text-xs">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-henna font-normal">
              Words From Our Esteemed Brides
            </h2>
            <p className="text-xs text-charcoal-muted font-light">
              Real brides sharing their experience with our artistry, longevity, and tranquil presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white/95 border border-gold/30 shadow-fine ornate-corners flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-gold text-xs">
                    <span>{'★'.repeat(item.rating || 5)}</span>
                    <span className="text-[9px] uppercase tracking-wider text-gold-dark font-mono font-medium">
                      {item.packageTaken}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-muted italic font-light leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                  <div>
                    <div className="font-serif text-sm text-henna font-medium">
                      {item.brideName}
                    </div>
                    <div className="text-[10px] text-charcoal-soft font-light">
                      {item.venue}, {item.city}
                    </div>
                  </div>
                  <LotusFloretMotif size={22} className="text-gold/40" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Packages Tier Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium block">
              Investment Tiers &amp; Inclusions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-henna font-normal">
              Tailored Bridal Packages
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light">
              Transparent commissions with no surprise add-ons. 25% advance secures your exclusive date on Master Artist {brandConfig.artistName}'s calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.slice(0, 3).map((pkg, idx) => {
              const isHighlighted = pkg.isPopular || idx === 1;

              return (
                <div
                  key={pkg.id || idx}
                  className={`relative p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ornate-corners ${
                    isHighlighted
                      ? 'bg-ivory-light border-2 border-gold shadow-gold md:-translate-y-2'
                      : 'bg-white/90 border border-gold/35 shadow-fine'
                  }`}
                >
                  {/* Highlight Ribbon */}
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-henna text-gold-light text-[10px] uppercase tracking-[0.2em] font-semibold border border-gold shadow-sm">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium">
                        Tier {idx + 1} &bull; {pkg.tier}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-henna font-normal mt-1">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-charcoal-muted font-light leading-relaxed mt-1">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="py-3 border-y border-gold/25 flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl text-henna font-medium">
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-xs text-charcoal-muted line-through">
                          {pkg.originalPrice}
                        </span>
                      )}
                      <span className="text-[10px] text-charcoal-soft font-light ml-auto">
                        {pkg.deposit}
                      </span>
                    </div>

                    {/* Inclusions list */}
                    <div className="space-y-2 text-xs text-charcoal-muted font-light">
                      <div className="text-[11px] uppercase tracking-wider text-charcoal font-medium pb-1">
                        Package Inclusions:
                      </div>
                      {pkg.inclusions.slice(0, 5).map((inc, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-2">
                          <span className="text-gold text-xs leading-none mt-0.5">✦</span>
                          <span className="leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Free Trial note */}
                    {pkg.freeTrial && (
                      <div className="p-2.5 bg-gold/10 border border-gold/30 text-[11px] text-henna font-medium">
                        🎁 {pkg.freeTrial}
                      </div>
                    )}
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-6 space-y-2.5 mt-4 border-t border-gold/20">
                    <button
                      type="button"
                      onClick={() => {
                        selectAndScrollToBooking({
                          type: 'package',
                          id: pkg.id,
                          title: pkg.name,
                          price: pkg.price,
                          category: categoryKey,
                          tagline: pkg.tagline,
                        });
                        scrollToForm();
                      }}
                      className={`w-full py-3 text-xs uppercase tracking-[0.18em] transition-all duration-300 font-medium active:scale-95 shadow-fine ${
                        isHighlighted
                          ? 'bg-henna text-ivory border border-gold hover:bg-henna-dark'
                          : 'bg-ivory text-henna border border-gold hover:bg-henna hover:text-ivory'
                      }`}
                    >
                      Select &amp; Reserve Date ✦
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleWhatsAppAction(
                          `Package Card WhatsApp: ${pkg.name}`,
                          `Hi ${brandConfig.artistName}, I am interested in the "${pkg.name}" (${pkg.price}) for my upcoming wedding. Can we check date availability?`
                        )
                      }
                      className="w-full py-2.5 bg-transparent text-charcoal text-[11px] uppercase tracking-[0.16em] border border-gold/40 hover:border-gold hover:text-henna transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire on WhatsApp</span>
                      <span className="text-gold">↗</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Artisan Personal Note & Final Assurance */}
        <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center text-gold">
            <FloralVineMotif size={160} />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-medium block">
            The Atelier Promise
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl text-henna font-normal leading-snug">
            "{personalCommitment.quote}"
          </h2>

          <p className="font-vibes text-2xl text-gold-dark">
            — Master Artist {brandConfig.artistName}
          </p>

          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto">
            {personalCommitment.subline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
            >
              Reserve Your Date Now
            </button>
            <button
              type="button"
              onClick={() => handleWhatsAppAction('Bottom Concierge WhatsApp')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.2em] border border-gold/40 hover:border-gold hover:text-henna transition-all duration-300"
            >
              Direct WhatsApp: {brandConfig.phoneDisplay}
            </button>
          </div>
        </section>
      </div>

      {/* 8. Lightbox Modal for Gallery Exploration */}
      <LightboxModal
        items={galleryImages}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIndex) => setActiveLightboxIndex(newIndex)}
      />

      {/* 9. High-Converting Sticky Bottom "Book on WhatsApp" Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-charcoal/95 backdrop-blur-md border-t border-gold/40 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-gold-light font-medium block">
              {stickyBarOfferText}
            </span>
          </div>
          <span className="font-serif text-xs text-ivory/90 leading-tight block">
            Limited Dates &bull; Delhi NCR &amp; Destination
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleWhatsAppAction('Mobile Sticky Bar WhatsApp Button')}
          className="min-h-[44px] px-4 py-2.5 bg-henna text-ivory text-[11px] uppercase tracking-[0.16em] border border-gold font-medium flex items-center gap-1.5 shadow-fine whitespace-nowrap active:scale-95 transition-transform touch-manipulation cursor-pointer"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className="text-ivory"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.68 8.23-8.22 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
          </svg>
          <span>Book on WhatsApp</span>
          <span className="text-gold">↗</span>
        </button>
      </div>
    </>
  );
};
