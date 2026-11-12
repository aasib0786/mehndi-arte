import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandConfig } from '@/lib/config';
import { SEO } from '@/components/common/SEO';
import {
  galleryFilterTabs,
  galleryItems,
  GalleryItem,
  ServiceLine,
} from '@/data/gallery';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import { LightboxModal } from '@/components/gallery/LightboxModal';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';
import { MandalaMotif, FloralVineMotif, LotusFloretMotif } from '@/components/motifs';

export const GalleryPage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedMainTab, setSelectedMainTab] = useState<'all' | ServiceLine>('all');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Active main tab configuration
  const currentMainTabConfig = useMemo(() => {
    return galleryFilterTabs.find((tab) => tab.id === selectedMainTab) || galleryFilterTabs[0];
  }, [selectedMainTab]);

  // Handler for main tab change: reset sub-filter to 'all'
  const handleMainTabChange = (tabId: 'all' | ServiceLine) => {
    setSelectedMainTab(tabId);
    setSelectedSubFilter('all');
  };

  // Filter items based on main service tab and subcategory
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item: GalleryItem) => {
      // Main Category Match
      if (selectedMainTab !== 'all' && item.serviceCategory !== selectedMainTab) {
        return false;
      }
      // Sub-Filter Match
      if (selectedSubFilter !== 'all' && item.subCategory !== selectedSubFilter) {
        return false;
      }
      return true;
    });
  }, [selectedMainTab, selectedSubFilter]);

  // Counts for main tabs
  const counts = useMemo(() => {
    return {
      all: galleryItems.length,
      mehndi: galleryItems.filter((i) => i.serviceCategory === 'mehndi').length,
      makeup: galleryItems.filter((i) => i.serviceCategory === 'makeup').length,
      parlour: galleryItems.filter((i) => i.serviceCategory === 'parlour').length,
    };
  }, []);

  return (
    <>
      <SEO
        title="Bridal Mehndi & Makeup Portfolio in Delhi NCR | Photo Archive"
        description={`Explore 30+ bespoke bridal mehndi designs, HD & airbrush bridal makeup looks, and studio salon transformations by ${brandConfig.brandName} across ${brandConfig.city}.`}
        canonicalPath="/gallery"
        ogImage="/images/gallery-bridal-1.webp"
      />

      {/* Page Header */}
      <section className="pt-24 sm:pt-32 pb-14 px-6 lg:px-12 text-center max-w-5xl mx-auto space-y-6">
        <div className="flex justify-center text-gold/50">
          <MandalaMotif size={68} />
        </div>

        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
          <span>✦</span>
          <span>The Atelier Photographic Archive</span>
          <span>✦</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-henna leading-tight font-normal">
          Stories Told in Henna, <br className="hidden sm:inline" />
          <span className="italic font-light">Glamour &amp; Radiant Glow</span>
        </h1>

        <p className="max-w-2xl mx-auto text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
          From micro-line bridal jharokhas and 48-hour mahogany stains to Temptu airbrush bridal glam and indulgent parlour spa treatments, browse our real client retrospective across {brandConfig.city} and global destination weddings.
        </p>

        <div className="gold-divider max-w-xs mx-auto pt-2" />
      </section>

      {/* Main Tabs Navigation Bar (Sticky) */}
      <section className="sticky top-16 sm:top-20 z-30 bg-ivory/95 backdrop-blur-md border-y border-gold/20 shadow-fine py-2 sm:py-3 px-3 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-2 sm:space-y-3">
          {/* Main 4 Tabs: All | Mehndi | Makeup | Parlour */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-3">
            {galleryFilterTabs.map((tab) => {
              const isSelected = selectedMainTab === tab.id;
              const count = counts[tab.id as keyof typeof counts];

              return (
                <button
                  key={tab.id}
                  onClick={() => handleMainTabChange(tab.id)}
                  className={`relative px-3 sm:px-6 py-1.5 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-medium transition-colors duration-300 ${
                    isSelected ? 'text-ivory' : 'text-charcoal-muted hover:text-henna'
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* Framer Motion Active Tab Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="mainGalleryTabIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-henna border border-gold shadow-sm z-0"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <span>{tab.label}</span>
                    <span
                      className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full font-mono ${
                        isSelected
                          ? 'bg-gold/20 text-gold-light border border-gold/40'
                          : 'bg-ivory-warm text-charcoal-soft border border-gold/20'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-Filters Pill Selector (Animated on Tab Switch) */}
          {currentMainTabConfig.subFilters.length > 1 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMainTab}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 pt-1 border-t border-gold/15"
              >
                <span className="text-[10px] uppercase tracking-widest text-charcoal-soft font-mono mr-1 hidden sm:inline">
                  Filter by discipline:
                </span>
                {currentMainTabConfig.subFilters.map((sub) => {
                  const isSubSelected = selectedSubFilter === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubFilter(sub.id)}
                      className={`relative px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-[0.14em] font-medium transition-all duration-200 border ${
                        isSubSelected
                          ? 'bg-gold text-charcoal font-semibold border-gold-dark shadow-sm'
                          : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
                      }`}
                    >
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Masonry Gallery Grid with Smooth Layout Animations */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto py-16 sm:py-24">
        {/* Results Info Counter */}
        <div className="flex items-center justify-between pb-6 text-xs text-charcoal-soft border-b border-gold/15 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-medium text-henna font-serif text-sm">
              Displaying {filteredItems.length} Archive Pieces
            </span>
            <span>·</span>
            <span className="text-gold-dark uppercase tracking-wider text-[10px]">
              {selectedMainTab === 'all'
                ? 'All Studio Disciplines'
                : selectedMainTab.toUpperCase()}
            </span>
          </div>

          {(selectedMainTab !== 'all' || selectedSubFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedMainTab('all');
                setSelectedSubFilter('all');
              }}
              className="text-[11px] uppercase tracking-wider text-henna underline hover:text-gold-dark transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dynamic Asymmetric Masonry */}
        <motion.div
          layout={!prefersReducedMotion}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!prefersReducedMotion}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => setActiveLightboxIndex(index)}
                className="break-inside-avoid editorial-card p-3.5 sm:p-4 ornate-corners group cursor-pointer hover:border-gold transition-all duration-300 shadow-fine hover:shadow-editorial"
              >
                <div className="relative overflow-hidden bg-ivory">
                  <EditorialImage
                    src={item.image}
                    placeholder={item.placeholder}
                    alt={item.altText || item.title}
                    fallbackTitle={item.title}
                    fallbackSubtitle={item.categoryLabel}
                    aspectRatio={
                      item.aspectRatio === 'landscape'
                        ? '4/3'
                        : item.aspectRatio === 'square'
                        ? '1/1'
                        : '4/5'
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-ivory">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-gold-light">
                      <span className="px-2 py-0.5 bg-gold/20 border border-gold/40">
                        {item.categoryLabel}
                      </span>
                      <span>{item.year}</span>
                    </div>

                    <div className="space-y-1 text-center">
                      <span className="font-serif text-lg text-ivory block leading-snug">
                        {item.title}
                      </span>
                      <span className="font-vibes text-sm text-gold block">
                        {item.stainTone}
                      </span>
                      <span className="text-[11px] text-ivory/60 block font-light">
                        {item.brideName} · {item.venueOrCity}
                      </span>
                    </div>

                    <div className="text-[10px] text-center text-ivory/60 tracking-wider uppercase border-t border-gold/30 pt-2 flex items-center justify-center gap-1">
                      <span>Click to View Full Size</span>
                      <span className="text-gold">✦</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card label */}
                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <h3 className="font-serif text-base text-henna font-medium truncate pr-2">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-gold-dark flex-shrink-0">
                      {item.subCategoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-soft font-light flex items-center justify-between">
                    <span className="truncate pr-2">{item.venueOrCity}</span>
                    <span className="text-gold text-[10px] flex-shrink-0">
                      {item.stainTone}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <MandalaMotif size={56} className="mx-auto text-gold/40" />
            <h3 className="font-serif text-2xl text-henna">No Portfolio Pieces Found</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto font-light">
              We could not find items matching the selected sub-filter. Click below to view the entire atelier archive.
            </p>
            <button
              onClick={() => {
                setSelectedMainTab('all');
                setSelectedSubFilter('all');
              }}
              className="px-6 py-2.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300"
            >
              View All Archive Designs
            </button>
          </div>
        )}

        {/* Section Divider */}
        <div className="flex justify-center my-20 text-gold/50">
          <FloralVineMotif size={160} />
        </div>

        {/* Three-Way Before/After Transformation Showcase */}
        <div className="max-w-4xl mx-auto pt-4 pb-12 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
              <LotusFloretMotif size={16} />
              <span>Real Transformations · Zero Artificial Filters</span>
              <LotusFloretMotif size={16} />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-henna">
              Before &amp; After Studio Retrospective
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
              Compare fresh organic henna paste to 48-hour dark mahogany stains, bare skin prep to sculpted royal bridal glam, and natural texture to silk keratin waves.
            </p>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />
    </>
  );
};
