import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/data/faqs';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { trackWhatsAppClick } from '@/lib/tracking';
import {
  MandalaMotif,
  LotusFloretMotif,
  JharokhaArchMotif,
  OrnateCornerFlourish,
  BrushStrokeFlourish,
  AtelierSealMotif,
} from '@/components/motifs';

type FaqTab = 'mehndi' | 'makeup' | 'parlour';

const faqTabs: { id: FaqTab; shortLabel: string; label: string; count: number }[] = [
  { id: 'mehndi', shortLabel: 'Mehndi (4)', label: 'Mehndi Art', count: 4 },
  { id: 'makeup', shortLabel: 'Makeup (4)', label: 'Bridal & Party Makeup', count: 4 },
  { id: 'parlour', shortLabel: 'Parlour (4)', label: 'Studio Parlour & Booking', count: 4 },
];

export const FaqSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<FaqTab>('mehndi');

  // Filter FAQs according to the selected tab
  const activeFaqs = useMemo(() => {
    return faqs.filter((f) => f.category === selectedTab);
  }, [selectedTab]);

  // Default open the first question of the active tab
  const [activeFaqId, setActiveFaqId] = useState<string | null>(activeFaqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setActiveFaqId((prev) => (prev === id ? null : id));
  };

  const handleTabChange = (tab: FaqTab) => {
    setSelectedTab(tab);
    const newItems = faqs.filter((f) => f.category === tab);
    setActiveFaqId(newItems[0]?.id || null);
  };

  return (
    <section
      id="faqs"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF5EC] paper-grain relative overflow-hidden border-b border-gold/20 select-none"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 text-gold/8 pointer-events-none">
        <MandalaMotif size={440} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Editorial Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>Client Guidance · Transparent Protocols</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                Frequently Asked <br className="hidden sm:inline" />
                <span className="italic font-light">Questions &amp; Studio</span> Policies
              </h2>
              <BrushStrokeFlourish width={190} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl">
              Clear, transparent guidelines regarding our 100% natural organic Sojat formulation, stain oxidation science, luxury cosmetics brands, doorstep visits, and booking terms.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-1 text-left lg:text-right">
            <div className="flex items-center gap-2 text-gold">
              <LotusFloretMotif size={28} />
              <span className="font-vibes text-2xl text-henna">Zero Chemical Dyes</span>
            </div>
            <span className="text-xs text-charcoal-soft font-light">
              100% skin-safe Sojat henna &amp; sterile salon tools
            </span>
          </div>
        </div>

        {/* Tab Switcher: Mehndi | Makeup | Parlour */}
        <div className="flex justify-center lg:justify-start overflow-x-auto max-w-full pb-1">
          <div className="inline-flex p-1 sm:p-1.5 bg-ivory-warm border border-gold/40 shadow-sm gap-1 sm:gap-2">
            {faqTabs.map((tab) => {
              const isActive = selectedTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-3 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.18em] font-medium transition-colors duration-300 whitespace-nowrap ${
                    isActive ? 'text-ivory' : 'text-charcoal-muted hover:text-henna'
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="faqActiveTabIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-henna border border-gold shadow-fine"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono hidden sm:inline ${
                        isActive
                          ? 'bg-gold/25 text-gold-light'
                          : 'bg-ivory text-charcoal-soft'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Grid: Sticky Concierge Card (Left) + Accordion (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (5 cols): Sticky Consultation Desk & Purity Assurance */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Purity Guarantee Badge Card with Atelier Seal */}
            <div className="p-6 bg-white border border-gold/40 shadow-fine relative double-hairline-gold">
              <div className="absolute top-2 left-2 text-gold/30 pointer-events-none">
                <OrnateCornerFlourish size={24} />
              </div>

              <div className="flex items-start gap-4">
                <div className="text-gold flex-shrink-0 mt-1">
                  <AtelierSealMotif size={72} sealColor="#B8893A" textColor="#5A1E1B" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-mehndi font-medium block">
                    Zero-Chemical Assurance
                  </span>
                  <h4 className="font-serif text-lg text-henna font-medium">
                    Pure Sojat &amp; Sterile Luxury Tooling
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                    Every batch of henna paste is freshly prepared 24 hours prior to your wedding day using only filtered water, hand-sifted Rajasthan leaves, and organic essential oils. In our salon, disposable sheets and single-use spatulas ensure complete hygiene.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Help */}
            <div className="p-6 bg-[#FAF5ED] border border-gold/30 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium block">
                Have an unlisted question?
              </span>
              <p className="text-xs text-charcoal-muted font-light leading-relaxed">
                Need details for destination weddings in Rajasthan or custom family group bookings?
              </p>
              <div>
                <a
                  href={getWhatsAppBookingLink(
                    `Hi ${brandConfig.artistName}, I have a question regarding ${selectedTab} services before booking my wedding date.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('FAQ Direct WhatsApp Question')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-henna font-medium border-b border-henna pb-0.5 hover:text-gold hover:border-gold transition-colors"
                >
                  <span>Chat directly with Master Artist</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:block text-gold/20 pt-2">
              <JharokhaArchMotif size={85} />
            </div>
          </div>

          {/* Right Column (7 cols): The Accordion List with Smooth Height Animation */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {activeFaqs.map((faq, index) => {
                  const isOpen = activeFaqId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className={`editorial-card transition-all duration-300 border ${
                        isOpen
                          ? 'border-gold bg-white shadow-editorial border-l-4 border-l-henna'
                          : 'border-gold/30 bg-white/70 hover:border-gold/60'
                      }`}
                    >
                      {/* Accordion Header / Question Trigger */}
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-6 focus:outline-none"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-xs text-gold-dark font-medium">
                              Q. {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-mehndi font-medium px-2 py-0.5 bg-mehndi/10">
                              {faq.topic}
                            </span>
                          </div>

                          <h3
                            className={`font-serif text-lg sm:text-xl transition-colors duration-200 ${
                              isOpen ? 'text-henna font-medium' : 'text-charcoal'
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>

                        {/* Plus / Minus Animated Icon */}
                        <div
                          className={`w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? 'rotate-45 bg-henna text-ivory border-henna'
                              : 'bg-transparent text-gold'
                          }`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </button>

                      {/* Accordion Body with Height Animation */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-gold/15 space-y-4">
                              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                                {faq.answer}
                              </p>

                              <div className="p-3 bg-[#FAF5ED] border-l-2 border-gold text-xs text-charcoal flex items-center justify-between">
                                <span className="font-serif italic text-henna">
                                  Official Atelier Guideline · {brandConfig.artistName}
                                </span>
                                <span className="text-gold text-xs">✦</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
