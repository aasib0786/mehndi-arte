import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { services } from '@/data/services';
import { makeupPackages } from '@/data/packages';
import { galleryItems } from '@/data/gallery';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { useBooking } from '@/context/BookingContext';
import { openWhatsAppEnquiry } from '@/lib/bookingService';
import { EditorialImage } from '@/components/common/EditorialImage';
import { BookingForm } from '@/components/booking/BookingForm';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';
import {
  MakeupBrushMotif,
  FloralVineMotif,
  BrushStrokeFlourish,
  OrnateCornerFlourish,
} from '@/components/motifs';

export const MakeupPage: React.FC = () => {
  const { selectAndScrollToBooking } = useBooking();
  const formRef = useRef<HTMLDivElement>(null);

  const makeupServices = services.filter((s) => s.category === 'makeup');
  const makeupGallery = galleryItems.filter((item) => item.serviceCategory === 'makeup').slice(0, 6);
  const makeupTestimonials = testimonials.filter(
    (t) => t.serviceCategory === 'makeup' || t.serviceCategory === 'combo'
  );
  const makeupFaqs = faqs.filter((f) => f.category === 'makeup');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Bridal Makeup Artist in Delhi NCR | HD & Airbrush Artistry"
        description={`Award-winning bridal makeup artist in ${brandConfig.city}. Signature HD & Temptu Airbrush makeup with Dior, MAC & Huda Beauty. Includes couture hairstyling & saree/dupatta draping.`}
        canonicalPath="/makeup"
        ogImage="/images/hero-makeup.webp"
      />

      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-24">
        {/* 1. Page Hero: 2-Column Split with Real Bridal Showcase Plate (Trendz Salon / Megha J Goyal Inspiration) */}
        <section className="pt-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines, Trust & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold-dark font-medium px-4 py-1.5 border border-gold/30 bg-ivory-light">
                <MakeupBrushMotif size={20} className="text-gold" />
                <span>High-Definition Beauty Atelier &bull; Vol. 2026</span>
                <span>✦</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-henna font-normal leading-[1.08]">
                  Radiant Bridal <span className="font-vibes text-gold text-5xl sm:text-7xl md:text-8xl">Glamour</span>
                </h1>
                <div className="flex justify-center lg:justify-start pt-1">
                  <BrushStrokeFlourish width={200} height={12} color="#B8893A" />
                </div>
              </div>

              <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Micro-fine contouring, radiant second-skin finish, and tear-resistant bridal perfection. Crafted exclusively with international prestige cosmetics: MAC, Huda Beauty, Dior Backstage, Charlotte Tilbury, and Temptu Airbrush.
              </p>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {[
                  { label: 'Brides Glammed', value: `${brandConfig.stats.makeupEvents}+` },
                  { label: 'Wear Longevity', value: '24 Hours' },
                  { label: 'Verified Rating', value: '★ 4.9' },
                  { label: 'Zero Cake Filter', value: '100% Skin' },
                ].map((stat, i) => (
                  <div key={i} className="p-3 bg-white/90 border border-gold/30 text-center ornate-corners">
                    <span className="font-serif text-lg sm:text-xl text-henna font-medium block">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-soft font-light">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    selectAndScrollToBooking({
                      type: 'service',
                      id: 'hd-bridal-makeup',
                      title: 'Signature HD Bridal Makeup',
                      price: '₹15,000',
                      tagline: 'Flawless camera-ready skin with couture hair & draping',
                      category: 'makeup',
                    });
                    scrollToForm();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
                >
                  Reserve Makeup Date ✦
                </button>

                <a
                  href={getWhatsAppBookingLink('Bridal Makeup Consultation')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.2em] border border-gold/50 hover:border-gold hover:text-henna transition-all duration-300 text-center"
                >
                  Consult on WhatsApp ↗
                </a>
              </div>

              {/* Prestige Brands Marquee Bar */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-charcoal-soft font-light flex-wrap">
                <span className="text-gold">✦</span>
                <span>Charlotte Tilbury</span>
                <span className="text-gold">&bull;</span>
                <span>Dior Backstage</span>
                <span className="text-gold">&bull;</span>
                <span>MAC Cosmetics</span>
                <span className="text-gold">&bull;</span>
                <span>Huda Beauty</span>
                <span className="text-gold">&bull;</span>
                <span>Temptu Airbrush</span>
              </div>
            </div>

            {/* Right Column: High-Impact Real Bridal Plate (Trendz Salon / Megha J Goyal Inspiration) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full max-w-md bg-ivory-light p-3 sm:p-4 border border-gold/45 shadow-editorial ornate-corners double-hairline-gold relative">
                <div className="absolute top-2 left-2 text-gold/40 pointer-events-none">
                  <OrnateCornerFlourish size={24} />
                </div>
                <div className="absolute top-2 right-2 text-gold/40 pointer-events-none rotate-90">
                  <OrnateCornerFlourish size={24} />
                </div>

                <div className="relative aspect-[4/5] overflow-hidden arch-frame-top border border-gold/30">
                  <EditorialImage
                    src="/images/gallery-makeup-bridal-1.webp"
                    alt="Royal Heritage Traditional Red Bridal Makeup by Kashish Studio"
                    fallbackTitle="Signature HD Bridal Glam"
                    fallbackSubtitle="Royal Red Lehenga Bride"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 bg-ivory/95 backdrop-blur-md text-henna text-[10px] uppercase tracking-wider font-semibold border border-gold/50 shadow-sm flex items-center gap-1.5">
                      <span className="text-gold">★</span>
                      <span>{brandConfig.stats.makeupEvents}+ Real Brides</span>
                    </span>
                    <span className="px-2.5 py-1 bg-henna/95 backdrop-blur-md text-ivory text-[10px] uppercase tracking-wider font-medium border border-gold shadow-sm">
                      Dior &amp; MAC HD
                    </span>
                  </div>

                  {/* Bottom Plate Caption */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-ivory flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-light block font-light">
                        Signature Bridal Look № 01
                      </span>
                      <span className="font-serif text-base text-ivory font-medium">
                        Royal Traditional Red Lehenga Bride
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-gold-light border border-gold/40 px-2 py-0.5 bg-black/50">
                      100% Unfiltered
                    </span>
                  </div>
                </div>

                {/* Museum Base Caption */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs text-charcoal-soft border-t border-gold/20 mt-2">
                  <span className="font-serif italic text-henna">Doorstep Hotel Suite &bull; {brandConfig.city}</span>
                  <button
                    onClick={() =>
                      openWhatsAppEnquiry(
                        `Hi ${brandConfig.artistName}, I saw your Royal Red Lehenga Bridal look on your website and want to check availability for my wedding.`
                      )
                    }
                    className="text-[10px] uppercase tracking-wider text-mehndi font-medium hover:underline flex items-center gap-1"
                  >
                    <span>Book This Look</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Before & After Real Transformation Slider (Proof of Zero-Filter Artistry) */}
        <section className="space-y-6 pt-4 border-t border-gold/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.26em] text-gold-dark font-medium block">
              Second-Skin Radiance Proof
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-henna font-normal">
              Bare Skin to Couture Bridal Glow
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
              Drag the interactive slider to view the seamless transition from cleansed skin prep to weightless, 24-hr transfer-proof HD perfection without caking.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider defaultCategory="makeup" />
          </div>
        </section>

        {/* 3. All 8 Makeup Services */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gold/25 pb-4 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
                08 Signature Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-henna mt-1">
                Bridal &amp; Occasion Makeup Services
              </h2>
            </div>
            <p className="text-xs text-charcoal-muted max-w-sm sm:text-right font-light">
              Mobile vanity lighting setup at your hotel suite or home across {brandConfig.city}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {makeupServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="editorial-card p-4 sm:p-5 ornate-corners bg-ivory-light flex flex-col justify-between border border-gold/30 hover:border-gold hover:shadow-editorial transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/5] overflow-hidden border border-gold/25 -mx-1 -mt-1">
                    <EditorialImage
                      src={service.imageUrl}
                      alt={service.title}
                      fallbackTitle={service.title}
                      fallbackSubtitle={service.tag}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-ivory/90 text-[9px] uppercase tracking-wider text-henna font-medium border border-gold/30">
                      {service.tag}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-[9px] uppercase tracking-wider text-ivory font-mono">
                      {service.duration}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-henna leading-snug pt-1 font-medium">
                    {service.title}
                  </h3>

                  <p className="text-xs text-charcoal-muted leading-relaxed font-light line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-charcoal-soft block">
                      Starts at
                    </span>
                    <span className="font-serif text-base text-henna font-medium">
                      {service.startingPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        selectAndScrollToBooking({
                          type: 'service',
                          id: service.id,
                          title: service.title,
                          price: service.startingPrice,
                          tagline: service.subtitle,
                          category: 'makeup',
                        });
                        scrollToForm();
                      }}
                      className="px-3 py-1.5 bg-henna text-ivory text-[10px] uppercase tracking-[0.16em] border border-gold hover:bg-henna-dark transition-all duration-200"
                    >
                      Enquire
                    </button>
                    <button
                      onClick={() =>
                        openWhatsAppEnquiry(
                          `Hi ${brandConfig.artistName}, I want to enquire about "${service.title}" (${service.startingPrice}) for my wedding event.`
                        )
                      }
                      className="px-2 py-1.5 bg-mehndi/10 text-mehndi text-[10px] uppercase tracking-wider border border-mehndi/30 hover:bg-mehndi hover:text-ivory transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      WA ↗
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. The 3 Bridal Makeup Packages */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
              Bridal Makeup Tiers
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-henna">
              Curated Bridal Makeup Collections
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light">
              Every collection includes couture bridal hairstyling, premium eyelashes, and double dupatta draping.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {makeupPackages.map((pkg, idx) => {
              const isMiddle = pkg.isPopular;

              return (
                <div
                  key={pkg.id}
                  className={`editorial-card flex flex-col justify-between relative p-6 sm:p-8 transition-all duration-300 ${
                    isMiddle
                      ? 'border-2 border-gold shadow-gold bg-[#FFFDF9] lg:-translate-y-2'
                      : 'border border-gold/30 bg-[#FDFBF7]'
                  }`}
                >
                  {isMiddle && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-0.5 bg-henna text-ivory text-[9px] uppercase tracking-[0.24em] font-medium border border-gold shadow-md">
                      ✦ Most Loved Bridal Makeup ✦
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="border-b border-gold/20 pb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium">
                        Tier {idx + 1} &bull; {pkg.tier}
                      </span>
                      <h3 className="font-serif text-2xl text-henna mt-1 font-medium">{pkg.name}</h3>
                      <p className="text-xs text-charcoal-muted font-light mt-1">{pkg.tagline}</p>
                    </div>

                    <div className="py-2.5 px-3.5 bg-ivory border border-gold/20 flex items-baseline justify-between">
                      <span className="font-serif text-3xl text-henna font-medium">{pkg.price}</span>
                      <span className="text-xs text-mehndi">{pkg.deposit}</span>
                    </div>

                    <div className="space-y-2 text-xs text-charcoal-muted font-light border-b border-gold/15 pb-4">
                      {pkg.coverage?.faceAndHair && (
                        <div>
                          <strong className="text-charcoal font-medium">Artistry:</strong> {pkg.coverage.faceAndHair}
                        </div>
                      )}
                      {pkg.familyMembersIncluded && (
                        <div>
                          <strong className="text-charcoal font-medium">Family:</strong> {pkg.familyMembersIncluded}
                        </div>
                      )}
                      <div className="text-mehndi font-medium">
                        ✦ {pkg.freeTrial}
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-xs text-charcoal-muted font-light">
                      {pkg.inclusions.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gold text-xs leading-none mt-0.5">✦</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gold/20 space-y-2">
                    <button
                      onClick={() => {
                        selectAndScrollToBooking({
                          type: 'package',
                          id: pkg.id,
                          title: pkg.name,
                          price: pkg.price,
                          tagline: pkg.tagline,
                          category: 'makeup',
                        });
                        scrollToForm();
                      }}
                      className="w-full py-3 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-200"
                    >
                      Reserve {pkg.name}
                    </button>
                    <button
                      onClick={() =>
                        openWhatsAppEnquiry(
                          `Hi ${brandConfig.artistName}, I want to enquire about the "${pkg.name}" (${pkg.price}).`
                        )
                      }
                      className="w-full py-2 bg-mehndi/10 text-mehndi text-xs uppercase tracking-wider border border-mehndi/30 hover:bg-mehndi hover:text-ivory transition-all duration-200 text-center block"
                    >
                      Enquire on WhatsApp ↗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Filtered Makeup Gallery Preview */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-gold/25 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
                Photographic Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-henna mt-1">
                Real Brides &amp; HD Finishes
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-[0.18em] text-henna hover:text-gold transition-colors font-medium"
            >
              Full Archive (24) ↗
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {makeupGallery.map((item) => (
              <div
                key={item.id}
                className="editorial-card overflow-hidden group border border-gold/30 bg-ivory-light"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <EditorialImage
                    src={item.image}
                    alt={item.altText}
                    fallbackTitle={item.title}
                    fallbackSubtitle={item.categoryLabel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-ivory text-xs">
                      <span className="font-serif text-base block font-medium">{item.title}</span>
                      <span className="text-[10px] text-gold-light">{item.venueOrCity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Filtered Testimonials & FAQs */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
              Bride Reflections
            </span>
            <h2 className="font-serif text-3xl text-henna">
              What Our Brides Say
            </h2>

            <div className="space-y-4">
              {makeupTestimonials.slice(0, 2).map((test) => (
                <div
                  key={test.id}
                  className="editorial-card p-6 bg-[#FAF5ED] border border-gold/30 space-y-3"
                >
                  <div className="flex items-center gap-1 text-gold text-xs">
                    {'★'.repeat(test.rating)}
                  </div>
                  <p className="font-serif italic text-base text-charcoal leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div className="text-xs text-charcoal-muted pt-2 border-t border-gold/15 flex items-center justify-between">
                    <span className="font-medium text-henna">{test.brideName}</span>
                    <span className="text-[11px] text-gold-dark">{test.venue}, {test.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
              Answers &amp; Guidelines
            </span>
            <h2 className="font-serif text-3xl text-henna">
              Makeup FAQs
            </h2>

            <div className="divide-y divide-gold/20 border-y border-gold/20">
              {makeupFaqs.map((faq) => (
                <div key={faq.id} className="py-4 space-y-2">
                  <h3 className="font-serif text-lg text-henna font-medium">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Embedded Booking Form Pre-Selected to Makeup */}
        <section ref={formRef} id="booking" className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex justify-center text-gold">
              <FloralVineMotif size={140} />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-henna">
              Book Your Bridal Makeup Consultation
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light">
              We bring full studio vanity lighting to your suite or home.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <BookingForm defaultServiceType="makeup" />
          </div>
        </section>
      </div>
    </>
  );
};
