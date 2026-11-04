import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/services';
import { useBooking } from '@/context/BookingContext';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import { PaisleyMotif } from '@/components/motifs';

export const ServicesSection: React.FC = () => {
  const { selectAndScrollToBooking } = useBooking();
  const prefersReducedMotion = useReducedMotion();

  // Active hovered service for the desktop floating image reveal
  const [activeHoverId, setActiveHoverId] = useState<string>(services[0].id);

  const activeService = services.find((s) => s.id === activeHoverId) || services[0];

  return (
    <section
      id="services"
      className="py-24 sm:py-32 px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/20"
    >
      {/* Decorative Watermark */}
      <div className="absolute top-10 right-4 text-gold/10 pointer-events-none">
        <PaisleyMotif size={280} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
            <span>✦</span>
            <span>Bespoke Offerings</span>
            <span>✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-tight font-normal">
            Ceremonial Artistry &amp; Styles
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            From intricate palatial bridal storytelling to airy contemporary negative space, each commission is executed with freshly ground Sojat organic henna and fine-art precision.
          </p>

          <div className="gold-divider max-w-xs mx-auto pt-2" />
        </div>

        {/* Desktop Layout: Editorial Interactive List with Staggered Hover Image Reveal */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols): The Staggered Services List */}
          <div className="col-span-7 divide-y divide-gold/20 border-y border-gold/20">
            {services.map((service, index) => {
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
                    delay: prefersReducedMotion ? 0 : index * 0.05,
                  }}
                  className={`group py-6 px-4 transition-all duration-300 cursor-pointer ${
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

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAndScrollToBooking({
                            type: 'service',
                            id: service.id,
                            title: service.title,
                            price: service.startingPrice,
                            tagline: service.subtitle,
                          });
                        }}
                        className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 border ${
                          isActive
                            ? 'bg-henna text-ivory border-gold shadow-fine'
                            : 'bg-transparent text-charcoal-muted border-gold/40 hover:border-gold hover:text-henna'
                        }`}
                        aria-label={`Enquire about ${service.title}`}
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column (5 cols): Sticky Dynamic Hover Image Reveal Window */}
          <div className="col-span-5 sticky top-28">
            <div className="editorial-card p-6 ornate-corners bg-ivory-light">
              <div className="relative aspect-[4/5] overflow-hidden border border-gold/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="w-full h-full"
                  >
                    <EditorialImage
                      src={activeService.imageUrl}
                      alt={activeService.title}
                      fallbackTitle={activeService.title}
                      fallbackSubtitle={activeService.tag}
                      aspectRatio="4/5"
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

                <div className="pt-2 flex items-center justify-between">
                  <span className="font-serif text-2xl text-henna font-medium">
                    {activeService.startingPrice}
                  </span>
                  <button
                    onClick={() =>
                      selectAndScrollToBooking({
                        type: 'service',
                        id: activeService.id,
                        title: activeService.title,
                        price: activeService.startingPrice,
                        tagline: activeService.subtitle,
                      })
                    }
                    className="px-6 py-2.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
                  >
                    Select &amp; Enquire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Staggered Alternating Layout (Zigzag Editorial Flow) */}
        <div className="lg:hidden space-y-10">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="editorial-card p-6 ornate-corners flex flex-col sm:flex-row gap-6 items-center"
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
                    <span className="font-serif text-xs text-gold">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-henna leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-gold/15">
                    <div>
                      <span className="text-[10px] text-charcoal-soft block uppercase tracking-wider">
                        From
                      </span>
                      <span className="font-serif text-xl text-henna font-medium">
                        {service.startingPrice}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        selectAndScrollToBooking({
                          type: 'service',
                          id: service.id,
                          title: service.title,
                          price: service.startingPrice,
                          tagline: service.subtitle,
                        })
                      }
                      className="px-5 py-2 bg-henna text-ivory text-xs uppercase tracking-[0.18em] border border-gold hover:bg-henna-dark transition-all duration-300"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
