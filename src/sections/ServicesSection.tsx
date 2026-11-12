import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/services';
import { brandConfig } from '@/lib/config';
import { openWhatsAppEnquiry } from '@/lib/bookingService';
import { useBooking } from '@/context/BookingContext';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import {
  PaisleyMotif,
  LotusFloretMotif,
  OrnateCornerFlourish,
  BrushStrokeFlourish,
} from '@/components/motifs';

export const ServicesSection: React.FC = () => {
  const { selectAndScrollToBooking } = useBooking();
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<'mehndi' | 'makeup' | 'parlour'>('mehndi');

  const filteredServices = services.filter((s) => s.category === selectedCategory);

  // Active hovered service for the desktop floating image reveal
  const [activeHoverId, setActiveHoverId] = useState<string>(filteredServices[0]?.id || services[0].id);

  const activeService =
    filteredServices.find((s) => s.id === activeHoverId) ||
    filteredServices[0] ||
    services[0];

  const handleCategoryChange = (cat: 'mehndi' | 'makeup' | 'parlour') => {
    setSelectedCategory(cat);
    const newItems = services.filter((s) => s.category === cat);
    if (newItems.length > 0) {
      setActiveHoverId(newItems[0].id);
    }
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/20"
    >
      {/* Decorative Watermark */}
      <div className="absolute top-10 right-4 text-gold/10 pointer-events-none">
        <PaisleyMotif size={280} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 pb-8 border-b border-gold/25">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>24 Signature Disciplines &bull; 3 Atelier Wings</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                Ceremonial Mehndi, <br className="hidden sm:inline" />
                <span className="italic font-light">Haute Makeup</span> &amp; Studio Parlour
              </h2>
              <BrushStrokeFlourish width={190} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl">
              From palatial architectural henna and MAC/Huda HD bridal makeup to organic parlour skin rituals, every service is crafted for your most cherished celebration.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-1 text-left lg:text-right">
            <div className="flex items-center gap-2 text-gold">
              <LotusFloretMotif size={28} />
              <span className="font-vibes text-2xl text-henna">Artisan Precision</span>
            </div>
            <span className="text-xs text-charcoal-soft font-light">
              Doorstep Mehndi &amp; Makeup &bull; Studio Parlour in GK-1
            </span>
          </div>
        </div>

        {/* Category Filter Tabs with Animated Gold Underline */}
        <div className="flex items-center gap-4 sm:gap-8 mb-12 border-b border-gold/25 justify-center lg:justify-start overflow-x-auto pb-1">
          {[
            { id: 'mehndi', label: 'Mehndi Art (8)' },
            { id: 'makeup', label: 'Bridal & Party Makeup (8)' },
            { id: 'parlour', label: 'Studio Parlour (8)' },
          ].map((tab) => {
            const isCurrent = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id as 'mehndi' | 'makeup' | 'parlour')}
                className="relative py-3.5 px-2 text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors duration-300 font-medium whitespace-nowrap"
              >
                <span className={isCurrent ? 'text-henna font-semibold' : 'text-charcoal-muted hover:text-henna'}>
                  {tab.label}
                </span>
                {isCurrent && (
                  <motion.div
                    layoutId="servicesTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Cross-Fades on Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* Desktop Layout: Editorial Interactive List with Staggered Hover Image Reveal */}
            <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
              {/* Left Column (7 cols): The Staggered Services List */}
              <div className="col-span-7 divide-y divide-gold/20 border-y border-gold/20">
                {filteredServices.map((service, index) => {
                  const isActive = activeHoverId === service.id;

                  return (
                    <motion.div
                      key={service.id}
                      onMouseEnter={() => setActiveHoverId(service.id)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.5,
                        delay: prefersReducedMotion ? 0 : index * 0.04,
                      }}
                      className={`group py-5 px-4 transition-all duration-300 cursor-pointer ${
                        isActive ? 'bg-ivory-light/90 border-l-2 border-l-gold shadow-fine' : 'hover:bg-ivory-light/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-6">
                        {/* Index & Title */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-xs text-gold-dark font-medium">
                              #{String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-mehndi font-medium px-2 py-0.5 bg-mehndi/10">
                              {service.tag}
                            </span>
                          </div>

                          <h3 className="font-serif text-2xl text-henna group-hover:text-gold-dark transition-colors duration-300 font-medium">
                            {service.title}
                          </h3>

                          <p className="text-xs text-charcoal-muted font-light max-w-lg leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="text-right space-y-2 flex-shrink-0">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-charcoal-soft block">
                              Starts at
                            </span>
                            <span className="font-serif text-xl text-henna font-medium">
                              {service.startingPrice}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                selectAndScrollToBooking({
                                  type: 'service',
                                  id: service.id,
                                  title: service.title,
                                  price: service.startingPrice,
                                  tagline: service.subtitle,
                                  category: service.category,
                                });
                              }}
                              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-all duration-300 border ${
                                isActive
                                  ? 'bg-henna text-ivory border-gold shadow-fine'
                                  : 'bg-transparent text-charcoal-muted border-gold/40 hover:border-gold hover:text-henna'
                              }`}
                              aria-label={`Enquire about ${service.title}`}
                            >
                              Enquire
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openWhatsAppEnquiry(
                                  `Hi ${brandConfig.artistName}, I want to enquire about booking your "${service.title}" (${service.startingPrice}).`
                                );
                              }}
                              className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-mehndi border border-mehndi/40 hover:bg-mehndi hover:text-ivory transition-colors flex items-center gap-1"
                              title="Direct WhatsApp enquiry"
                            >
                              <span>WA</span>
                              <span>↗</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column (5 cols): Sticky Dynamic Hover Image Reveal Window */}
              <div className="col-span-5 sticky top-28">
                <div className="editorial-card p-6 bg-ivory-light border border-gold/45 shadow-editorial relative double-hairline-gold">
                  {/* Handcrafted Corner Flourishes */}
                  <div className="absolute top-2 left-2 text-gold/30 pointer-events-none">
                    <OrnateCornerFlourish size={24} />
                  </div>
                  <div className="absolute top-2 right-2 text-gold/30 pointer-events-none rotate-90">
                    <OrnateCornerFlourish size={24} />
                  </div>
                  <div className="absolute bottom-2 left-2 text-gold/30 pointer-events-none -rotate-90">
                    <OrnateCornerFlourish size={24} />
                  </div>
                  <div className="absolute bottom-2 right-2 text-gold/30 pointer-events-none rotate-180">
                    <OrnateCornerFlourish size={24} />
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden arch-frame-top border border-gold/30 bg-ivory">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeService.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                      >
                        <EditorialImage
                          src={activeService.imageUrl}
                          alt={activeService.title}
                          fallbackTitle={activeService.title}
                          fallbackSubtitle={activeService.tag}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Dynamic Service Caption */}
                  <div className="pt-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-charcoal-soft border-b border-gold/20 pb-2">
                      <span className="font-serif text-lg text-henna font-medium">
                        {activeService.title}
                      </span>
                      <span className="text-mehndi font-medium">
                        {activeService.duration}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                      {activeService.subtitle}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-gold/15">
                      <span className="font-serif text-2xl text-henna font-medium">
                        {activeService.startingPrice}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            selectAndScrollToBooking({
                              type: 'service',
                              id: activeService.id,
                              title: activeService.title,
                              price: activeService.startingPrice,
                              tagline: activeService.subtitle,
                              category: activeService.category,
                            })
                          }
                          className="px-4 py-2 bg-henna text-ivory text-xs uppercase tracking-[0.18em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
                        >
                          Enquire Now
                        </button>
                        <button
                          onClick={() =>
                            openWhatsAppEnquiry(
                              `Hi ${brandConfig.artistName}, I want to enquire about booking your "${activeService.title}" (${activeService.startingPrice}).`
                            )
                          }
                          className="px-3 py-2 bg-mehndi/10 text-mehndi text-xs uppercase tracking-[0.14em] border border-mehndi/30 hover:bg-mehndi hover:text-ivory transition-all duration-300 flex items-center gap-1"
                          title="Enquire on WhatsApp"
                        >
                          <span>WhatsApp</span>
                          <span>↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet Staggered Alternating Layout (Zigzag Editorial Flow) */}
            <div className="lg:hidden space-y-8">
              {filteredServices.map((service, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="editorial-card p-4 sm:p-6 ornate-corners flex flex-col sm:flex-row gap-5 sm:gap-6 items-center"
                  >
                    {/* Image Frame */}
                    <div
                      className={`w-full sm:w-44 sm:h-44 flex-shrink-0 ${
                        isReversed ? 'sm:order-2' : 'sm:order-1'
                      }`}
                    >
                      <EditorialImage
                        src={service.imageUrl}
                        alt={service.title}
                        fallbackTitle={service.title}
                        fallbackSubtitle={service.tag}
                        aspectRatio="1/1"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 space-y-3 w-full ${
                        isReversed ? 'sm:order-1' : 'sm:order-2'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-mehndi font-medium px-2 py-0.5 bg-mehndi/10">
                          {service.tag}
                        </span>
                        <span className="text-xs text-charcoal-soft font-medium">
                          {service.duration}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-henna font-medium">
                        {service.title}
                      </h3>

                      <p className="text-xs text-charcoal-muted font-light leading-relaxed">
                        {service.shortDescription}
                      </p>

                      <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-charcoal-soft block">
                            Starts at
                          </span>
                          <span className="font-serif text-xl text-henna font-medium">
                            {service.startingPrice}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              selectAndScrollToBooking({
                                type: 'service',
                                id: service.id,
                                title: service.title,
                                price: service.startingPrice,
                                tagline: service.subtitle,
                                category: service.category,
                              })
                            }
                            className="px-4 py-2 bg-henna text-ivory text-xs uppercase tracking-[0.16em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
                          >
                            Enquire
                          </button>
                          <button
                            onClick={() =>
                              openWhatsAppEnquiry(
                                `Hi ${brandConfig.artistName}, I want to enquire about booking your "${service.title}" (${service.startingPrice}).`
                              )
                            }
                            className="px-3 py-2 bg-mehndi/10 text-mehndi text-xs uppercase tracking-[0.14em] border border-mehndi/30 hover:bg-mehndi hover:text-ivory transition-all duration-300"
                          >
                            WA ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
