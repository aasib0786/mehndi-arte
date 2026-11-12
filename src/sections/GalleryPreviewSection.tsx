import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { galleryItems } from '@/data/gallery';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import { LightboxModal } from '@/components/gallery/LightboxModal';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';
import {
  FloralVineMotif,
  MandalaMotif,
  LotusFloretMotif,
  BrushStrokeFlourish,
} from '@/components/motifs';

export const GalleryPreviewSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Select 12-13 curated pieces representing all three service lines (Mehndi, Makeup, Parlour)
  const previewItems = galleryItems.filter((item) => item.featuredOnHome);

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/20">
      {/* Decorative Watermark */}
      <div className="absolute top-1/3 -left-24 text-gold/10 pointer-events-none">
        <MandalaMotif size={360} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Editorial Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>Visual Retrospective · Archive</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                Heirloom Works <br className="hidden sm:inline" />
                <span className="italic font-light">&amp; Real Bridal</span> Stories
              </h2>
              <BrushStrokeFlourish width={190} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl">
              Every bride's journey is distinct. Explore our handcrafted portfolio spanning royal Rajasthani henna symmetry, camera-ready bridal makeup, and restorative parlour skin and hair rituals.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-1 text-left lg:text-right">
            <div className="flex items-center gap-2 text-gold">
              <LotusFloretMotif size={28} />
              <span className="font-vibes text-2xl text-henna">Unedited Natural Stains</span>
            </div>
            <span className="text-xs text-charcoal-soft font-light">
              Zero chemical dyes · Certified Sojat leaves
            </span>
          </div>
        </div>

        {/* 1. Before / After Stain Maturation Spotlight */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[11px] uppercase tracking-[0.22em] text-henna font-medium">
              Stain Maturation Showcase
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
              From Fresh Application to 48-Hour Deep Mahogany
            </h3>
          </div>

          <BeforeAfterSlider />
        </div>

        {/* 2. Masonry Gallery Grid (8-12 images representing all 3 services) */}
        <div>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {previewItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : (index % 3) * 0.1,
                }}
                onClick={() => setActiveLightboxIndex(index)}
                className="break-inside-avoid editorial-card p-3 sm:p-4 ornate-corners group cursor-pointer hover:border-gold/80 transition-all duration-300 shadow-fine hover:shadow-editorial"
              >
                <div className="relative overflow-hidden bg-ivory">
                  <EditorialImage
                    src={item.image}
                    alt={item.altText || item.title}
                    placeholder={item.placeholder}
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
                  <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-ivory">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-gold-light">
                      <span>{item.categoryLabel}</span>
                      <span>{item.year}</span>
                    </div>

                    <div className="space-y-1 text-center">
                      <span className="font-serif text-lg text-ivory block leading-snug">
                        {item.title}
                      </span>
                      <span className="font-vibes text-sm text-gold block">
                        {item.stainTone}
                      </span>
                    </div>

                    <div className="text-[10px] text-center text-ivory/60 tracking-wider uppercase border-t border-gold/30 pt-2">
                      Click to Expand ✦
                    </div>
                  </div>
                </div>

                {/* Sub-card label */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs text-charcoal-soft">
                  <span className="font-serif text-sm text-henna font-medium truncate pr-2">
                    {item.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gold-dark flex-shrink-0">
                    {item.categoryLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* "See Full Gallery" Action Link */}
        <div className="text-center pt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-9 py-4 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-gold group"
          >
            <span>See Full Gallery Archive</span>
            <span className="text-gold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
          <div className="flex justify-center mt-12 text-gold/50">
            <FloralVineMotif size={160} />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={previewItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />
    </section>
  );
};

