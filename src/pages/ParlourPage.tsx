import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { trackWhatsAppClick } from '@/lib/tracking';
import { services } from '@/data/services';
import { galleryItems } from '@/data/gallery';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { useBooking } from '@/context/BookingContext';
import { openWhatsAppEnquiry } from '@/lib/bookingService';
import { EditorialImage } from '@/components/common/EditorialImage';
import { BookingForm } from '@/components/booking/BookingForm';
import { ParlourRateList } from '@/components/parlour/ParlourRateList';
import {
  CompactMirrorMotif,
  OrnateCornerFlourish,
  FloralVineMotif,
  BrushStrokeFlourish,
} from '@/components/motifs';

export const ParlourPage: React.FC = () => {
  const { selectAndScrollToBooking } = useBooking();
  const formRef = useRef<HTMLDivElement>(null);

  const parlourServices = services.filter((s) => s.category === 'parlour');
  const parlourGallery = galleryItems.filter((item) => item.serviceCategory === 'parlour').slice(0, 6);
  const parlourTestimonials = testimonials.filter(
    (t) => t.serviceCategory === 'parlour' || t.serviceCategory === 'combo'
  );
  const parlourFaqs = faqs.filter((f) => f.category === 'parlour');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Beauty Parlour in Greater Kailash I, Delhi NCR | Salon Menu & Pre-Bridal"
        description={`Exclusive beauty parlour in Greater Kailash I, South Delhi. O3+ radiance facials, Italian Rica waxing, Kérastase hair spa, luxury mani-pedis, and 7-day pre-bridal packages in ${brandConfig.city}.`}
        canonicalPath="/parlour"
        ogImage="/images/hero-salon.webp"
      />

      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-24">
        {/* Parlour Offer Banner (Driven by brandConfig.parlourOfferBanner) */}
        {brandConfig.parlourOfferBanner?.enabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-henna text-ivory p-5 sm:p-6 border border-gold/40 shadow-soft relative overflow-hidden ornate-corners"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-gold-light font-medium">
                  <span className="text-gold animate-pulse">✦</span>
                  <span>{brandConfig.parlourOfferBanner.badge}</span>
                  {brandConfig.parlourOfferBanner.code && (
                    <span className="px-2 py-0.5 bg-ivory/15 text-gold border border-gold/40 text-[9px] font-mono tracking-wider font-semibold">
                      CODE: {brandConfig.parlourOfferBanner.code}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal leading-snug">
                  {brandConfig.parlourOfferBanner.title}
                </h2>
                <p className="text-xs text-ivory/80 font-light leading-relaxed">
                  {brandConfig.parlourOfferBanner.subtitle}
                  {brandConfig.parlourOfferBanner.terms && (
                    <span className="opacity-70 block sm:inline sm:ml-1 text-[11px]">
                      ({brandConfig.parlourOfferBanner.terms})
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
                <button
                  onClick={() => {
                    selectAndScrollToBooking({
                      type: 'parlour',
                      id: 'parlour-first-visit-offer',
                      title: `First Visit Privilege (${brandConfig.parlourOfferBanner.code || '20% Off'})`,
                      price: '20% Off at Billing',
                      tagline: brandConfig.parlourOfferBanner.title,
                      category: 'parlour',
                    });
                    scrollToForm();
                  }}
                  className="px-5 py-2.5 bg-gold text-charcoal text-xs uppercase tracking-[0.18em] font-medium hover:bg-gold-light transition-all shadow-fine active:scale-95"
                >
                  {brandConfig.parlourOfferBanner.buttonText || 'Claim 20% Off'} ✦
                </button>
                <a
                  href={`https://wa.me/${brandConfig.whatsAppNumber}?text=${encodeURIComponent(
                    `Hi Kashish, I would like to book a parlour appointment at your GK-1 studio and claim the First Visit offer (${brandConfig.parlourOfferBanner.code || 'GLOW20'}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Parlour Offer Banner WA', 'Parlour')}
                  className="px-4 py-2.5 bg-transparent text-ivory text-xs uppercase tracking-[0.16em] border border-gold/50 hover:bg-ivory/10 transition-colors"
                >
                  WhatsApp Us ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* 1. Page Hero: 2-Column Split with Real Studio Sanctuary Plate (Trendz Salon Inspiration) */}
        <section className="pt-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines, Highlights & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold-dark font-medium px-4 py-1.5 border border-gold/30 bg-ivory-light">
                <CompactMirrorMotif size={20} className="text-gold" />
                <span>Studio Salon &bull; Greater Kailash I &bull; Vol. 2026</span>
                <span>✦</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-henna font-normal leading-[1.08]">
                  Sanctuary of <span className="font-vibes text-gold text-5xl sm:text-7xl md:text-8xl">Beauty</span>
                </h1>
                <div className="flex justify-center lg:justify-start pt-1">
                  <BrushStrokeFlourish width={200} height={12} color="#B8893A" />
                </div>
              </div>

              <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A serene private studio dedicated to restorative clinical facials, gentle Italian Rica waxing, botanical hair spas, and bespoke 7-day pre-bridal transformations.
              </p>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {[
                  { label: 'Studio Rating', value: '★ 4.9' },
                  { label: 'Disposables', value: '100% Sterile' },
                  { label: 'Italian Wax', value: 'Rica Only' },
                  { label: 'Hair Care', value: 'Kérastase' },
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
                      type: 'parlour',
                      id: 'general-parlour-booking',
                      title: 'Studio Salon Appointment',
                      price: 'Select in Salon',
                      tagline: 'Private beauty appointment at GK-1 atelier',
                      category: 'parlour',
                    });
                    scrollToForm();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
                >
                  Book Studio Appointment ✦
                </button>

                <a
                  href={getWhatsAppBookingLink('Parlour Appointment Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-transparent text-charcoal text-xs uppercase tracking-[0.2em] border border-gold/50 hover:border-gold hover:text-henna transition-all duration-300 text-center"
                >
                  Consult on WhatsApp ↗
                </a>
              </div>

              {/* Studio Quick Highlights */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-charcoal-soft font-light flex-wrap">
                <span className="text-gold">✦</span>
                <span>Single-Use Disposables</span>
                <span className="text-gold">&bull;</span>
                <span>Italian Rica Wax</span>
                <span className="text-gold">&bull;</span>
                <span>O3+ Professional</span>
                <span className="text-gold">&bull;</span>
                <span>Kérastase Paris</span>
                <span className="text-gold">&bull;</span>
                <span>Private Suites</span>
              </div>
            </div>

            {/* Right Column: High-Impact Real Studio Sanctuary Plate */}
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
                    src="/images/hero-3.webp"
                    alt="Luxury Beauty Parlour and Salon Sanctuary in Greater Kailash I, South Delhi"
                    fallbackTitle="Studio Salon Sanctuary"
                    fallbackSubtitle="Greater Kailash I Atelier"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 bg-ivory/95 backdrop-blur-md text-henna text-[10px] uppercase tracking-wider font-semibold border border-gold/50 shadow-sm flex items-center gap-1.5">
                      <span className="text-gold">★</span>
                      <span>4.9 (250+ Studio Reviews)</span>
                    </span>
                    <span className="px-2.5 py-1 bg-henna/95 backdrop-blur-md text-ivory text-[10px] uppercase tracking-wider font-medium border border-gold shadow-sm">
                      GK-1 Flagship
                    </span>
                  </div>

                  {/* Bottom Plate Caption */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-ivory flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-light block font-light">
                        Private Treatment Room
                      </span>
                      <span className="font-serif text-base text-ivory font-medium">
                        Botanical Facial &amp; Hair Spa Suite
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-gold-light border border-gold/40 px-2 py-0.5 bg-black/50">
                      Sterile Kits
                    </span>
                  </div>
                </div>

                {/* Museum Base Caption */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs text-charcoal-soft border-t border-gold/20 mt-2">
                  <span className="font-serif italic text-henna">{brandConfig.studioAddress.split(',')[0]} &bull; By Prior Booking</span>
                  <button
                    onClick={() =>
                      openWhatsAppEnquiry(
                        `Hi ${brandConfig.artistName}, I would like to book a parlour appointment at your Greater Kailash I studio.`
                      )
                    }
                    className="text-[10px] uppercase tracking-wider text-mehndi font-medium hover:underline flex items-center gap-1"
                  >
                    <span>Book Studio Slot</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. All 8 Parlour Disciplines Preview */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gold/25 pb-4 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
                Signature Studio Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-henna mt-1">
                Curated Salon Rituals
              </h2>
            </div>
            <p className="text-xs text-charcoal-muted max-w-sm sm:text-right font-light">
              Exclusively at our Greater Kailash I studio atelier. Prior booking advised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parlourServices.map((service, idx) => (
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
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-ivory/90 text-[9px] uppercase tracking-wider text-mehndi font-medium border border-gold/30">
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
                          type: 'parlour',
                          id: service.id,
                          title: service.title,
                          price: service.startingPrice,
                          tagline: service.subtitle,
                          category: 'parlour',
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
                          `Hi ${brandConfig.artistName}, I want to enquire about booking your "${service.title}" (${service.startingPrice}) at your GK-1 salon.`
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

        {/* 3. The Printed Salon Menu Rate Card */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
              Complete Printed Salon Card
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-henna">
              Full Parlour Rate Card
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light">
              Filter by category or search any service below to reserve your appointment.
            </p>
          </div>

          <ParlourRateList onBookClick={scrollToForm} />
        </section>

        {/* 4. 7-Day Imperial Pre-Bridal Package Highlight */}
        <section className="p-8 sm:p-12 bg-[#FAF5ED] border-2 border-gold/40 shadow-editorial relative ornate-corners max-w-5xl mx-auto">
          <div className="absolute top-3 left-3 text-gold/40 pointer-events-none">
            <OrnateCornerFlourish size={28} />
          </div>
          <div className="absolute top-3 right-3 text-gold/40 pointer-events-none rotate-90">
            <OrnateCornerFlourish size={28} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium block">
                The Master Bridal Pre-Ritual
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-henna leading-tight font-medium">
                7-Day Imperial Pre-Bridal Package
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
                Structured across two tranquil private sessions at our Greater Kailash I atelier: full-body Rica waxing, marine D-tan, body polishing, Kérastase hair spa, O3+ whitening facial, and rose milk mani-pedi.
              </p>
              <div className="flex items-center gap-4 text-xs text-mehndi font-medium pt-1">
                <span>✦ 2 Dedicated Studio Sessions</span>
                <span>✦ All Single-Use Kits</span>
                <span>✦ Glowing Wedding-Day Skin</span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 border border-gold/30 text-center space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-soft block">
                All-Inclusive Investment
              </span>
              <div className="font-serif text-3xl text-henna font-medium">
                ₹14,499
              </div>
              <span className="line-through text-xs text-charcoal-soft block">
                ₹18,500
              </span>
              <button
                onClick={() => {
                  selectAndScrollToBooking({
                    type: 'parlour',
                    id: 'pre-bridal-all-inclusive-ritual',
                    title: '7-Day Imperial Pre-Bridal Package',
                    price: '₹14,499',
                    tagline: 'Complete 2-visit bridal transformation',
                    category: 'parlour',
                  });
                  scrollToForm();
                }}
                className="w-full py-2.5 bg-henna text-ivory text-xs uppercase tracking-wider border border-gold hover:bg-henna-dark transition-all duration-200"
              >
                Reserve Pre-Bridal
              </button>
            </div>
          </div>
        </section>

        {/* 5. Filtered Parlour Gallery Preview */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-gold/25 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
                Photographic Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-henna mt-1">
                Skin Radiance &amp; Salon Moments
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
            {parlourGallery.map((item) => (
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
                      <span className="text-[10px] text-gold-light">{item.stainTone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Studio Timings, Address & Embedded Google Map */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF5ED] p-6 sm:p-10 border border-gold/30 ornate-corners">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
              Flagship Studio Location
            </span>
            <h2 className="font-serif text-3xl text-henna">
              Visit Us in Greater Kailash I
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-charcoal-muted font-light pt-2">
              <div>
                <strong className="text-charcoal block font-medium">Studio Address:</strong>
                <span>{brandConfig.studioAddress}</span>
              </div>

              <div>
                <strong className="text-charcoal block font-medium">Timings:</strong>
                <span className="text-mehndi font-medium">{brandConfig.studioTimings}</span>
              </div>

              <div>
                <strong className="text-charcoal block font-medium">Concierge Direct:</strong>
                <span>{brandConfig.phoneDisplay}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={brandConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-henna text-ivory text-xs uppercase tracking-wider border border-gold hover:bg-henna-dark transition-all duration-200"
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>

              <a
                href={getWhatsAppBookingLink('Parlour directions')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-mehndi hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 h-72 sm:h-80 w-full overflow-hidden border border-gold/40 shadow-sm relative bg-ivory">
            <iframe
              title="Kashish Mehndi & Makeup Studio GK-1 Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.66578051726!2d77.23438318218158!3d28.552809653896564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c706b47c9f%3A0xa621b1990c0b3952!2sGreater%20Kailash%201%2C%20New%20Delhi%2C%20Delhi%20110048!5e0!3m2!1sen!2sin!4v1714500000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(0.95)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* 7. Filtered Testimonials & FAQs */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
              Client Reflections
            </span>
            <h2 className="font-serif text-3xl text-henna">
              Salon &amp; Pre-Bridal Reviews
            </h2>

            <div className="space-y-4">
              {parlourTestimonials.slice(0, 2).map((test) => (
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
              Salon &amp; Pre-Bridal FAQs
            </h2>

            <div className="divide-y divide-gold/20 border-y border-gold/20">
              {parlourFaqs.map((faq) => (
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

        {/* 8. Embedded Booking Form Pre-Selected to Parlour */}
        <section ref={formRef} id="booking" className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex justify-center text-gold">
              <FloralVineMotif size={140} />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-henna">
              Reserve Your Studio Salon Appointment
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light">
              We look forward to welcoming you to our Greater Kailash I studio sanctuary.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <BookingForm defaultServiceType="parlour" />
          </div>
        </section>
      </div>
    </>
  );
};
