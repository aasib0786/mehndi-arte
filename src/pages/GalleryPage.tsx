import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { brandConfig } from '@/lib/config';
import { galleryCategories, galleryItems } from '@/data/gallery';
import { MandalaMotif, FloralVineMotif } from '@/components/motifs';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Curated Archive | {brandConfig.brandName}</title>
        <meta
          name="description"
          content="Explore our bespoke bridal mehndi portfolio featuring royal palatial architecture, negative space botanicals, and heirloom portraiture."
        />
      </Helmet>

      <section className="pt-20 pb-16 px-6 lg:px-12 text-center max-w-5xl mx-auto space-y-6">
        <div className="flex justify-center text-gold/40">
          <MandalaMotif size={72} />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-medium">
          The Photographic Archive
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-henna">
          Heirloom Works &amp; Bridal Chronicles
        </h1>
        <p className="max-w-2xl mx-auto text-charcoal-muted text-sm sm:text-base font-light">
          A visual retrospective of real brides, intricate jharokha symmetry, and deep mahogany stains across Indian and international wedding celebrations.
        </p>
        <div className="gold-divider max-w-xs mx-auto pt-4" />
      </section>

      {/* Filter Tabs */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? 'bg-henna text-ivory border-henna shadow-fine'
                  : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid (Editorial Asymmetric Layout) */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="editorial-card p-6 flex flex-col justify-between group hover:border-gold transition-all duration-300"
            >
              <div className="aspect-[4/5] bg-ivory-warm/60 border border-gold/20 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                {/* Stylized placeholder watermark */}
                <div className="text-gold/20 transform group-hover:scale-110 transition-transform duration-700">
                  <MandalaMotif size={120} />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-ivory/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-serif text-lg text-henna mb-1">{item.stainTone}</span>
                  <p className="text-xs text-charcoal-muted max-w-xs">{item.storyNote}</p>
                </div>
              </div>

              <div className="pt-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-gold-dark uppercase tracking-wider">
                  <span>{item.categoryLabel}</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="font-serif text-xl text-henna leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-soft">
                  {item.brideName} · {item.venueOrCity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-20 text-gold/50">
          <FloralVineMotif size={160} />
        </div>
      </section>
    </>
  );
};

