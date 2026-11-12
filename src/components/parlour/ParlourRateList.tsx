import React, { useState, useMemo } from 'react';
import { parlourMenu, parlourCategories, ParlourCategory } from '@/data/parlourMenu';
import { useBooking } from '@/context/BookingContext';
import { openWhatsAppEnquiry } from '@/lib/bookingService';
import { brandConfig } from '@/lib/config';
import { OrnateCornerFlourish, CompactMirrorMotif } from '@/components/motifs';

interface ParlourRateListProps {
  className?: string;
  onBookClick?: () => void;
}

export const ParlourRateList: React.FC<ParlourRateListProps> = ({ className = '', onBookClick }) => {
  const { selectAndScrollToBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState<ParlourCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return parlourMenu.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Group filtered items by categoryTitle
  const groupedCategories = useMemo(() => {
    const map = new Map<string, typeof parlourMenu>();
    filteredItems.forEach((item) => {
      if (!map.has(item.categoryTitle)) {
        map.set(item.categoryTitle, []);
      }
      map.get(item.categoryTitle)!.push(item);
    });
    return Array.from(map.entries());
  }, [filteredItems]);

  const handleBook = (item: (typeof parlourMenu)[0]) => {
    selectAndScrollToBooking({
      type: 'parlour',
      id: item.id,
      title: item.name,
      price: item.price,
      tagline: item.description,
      category: 'parlour',
    });
    onBookClick?.();
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Chips & Mobile Search Bar */}
      <div className="space-y-4">
        {/* Search Input Box */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parlour services (e.g. O3+ facial, Rica, Kérastase)..."
            className="w-full px-4 py-3 pl-10 text-xs sm:text-sm bg-white/90 border border-gold/40 focus:border-henna focus:outline-none shadow-fine placeholder:text-charcoal-soft/60"
            aria-label="Search parlour services"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-soft hover:text-henna p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === 'all'
                ? 'bg-henna text-ivory border-gold shadow-fine'
                : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
            }`}
          >
            All Services ({parlourMenu.length})
          </button>
          {parlourCategories.map((cat) => {
            const count = parlourMenu.filter((i) => i.category === cat.id).length;
            const isCurrent = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 text-xs uppercase tracking-wider transition-all duration-300 border ${
                  isCurrent
                    ? 'bg-henna text-ivory border-gold shadow-fine'
                    : 'bg-ivory text-charcoal-muted border-gold/30 hover:border-gold hover:text-henna'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* The Printed Salon Menu Card */}
      <div className="editorial-card bg-[#FCF9F3] border-2 border-gold/40 shadow-editorial p-6 sm:p-12 lg:p-16 ornate-corners relative max-w-5xl mx-auto">
        {/* Handcrafted Corner Flourishes */}
        <div className="absolute top-3 left-3 text-gold/40 pointer-events-none">
          <OrnateCornerFlourish size={32} />
        </div>
        <div className="absolute top-3 right-3 text-gold/40 pointer-events-none rotate-90">
          <OrnateCornerFlourish size={32} />
        </div>
        <div className="absolute bottom-3 left-3 text-gold/40 pointer-events-none -rotate-90">
          <OrnateCornerFlourish size={32} />
        </div>
        <div className="absolute bottom-3 right-3 text-gold/40 pointer-events-none rotate-180">
          <OrnateCornerFlourish size={32} />
        </div>

        {/* Menu Card Header */}
        <div className="text-center pb-10 border-b border-gold/30 relative z-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-gold">
            <CompactMirrorMotif size={24} />
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              Studio Salon &bull; Rate Card
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-henna font-normal tracking-tight">
            Menu of Beauty Rituals
          </h2>

          <p className="font-vibes text-xl sm:text-2xl text-gold-dark mt-1">
            Greater Kailash I Atelier &bull; New Delhi
          </p>

          <p className="text-[11px] text-charcoal-soft font-light max-w-md mx-auto pt-1">
            All services executed using single-use disposable hygiene kits, Italian Rica formulations, and organic soothing lotions.
          </p>
        </div>

        {/* Rate Card Categories with Dotted Leaders */}
        {groupedCategories.length === 0 ? (
          <div className="py-16 text-center text-charcoal-muted space-y-2">
            <p className="font-serif text-xl text-henna">No services match your search.</p>
            <p className="text-xs">Try clearing the search box or selecting another category.</p>
          </div>
        ) : (
          <div className="divide-y divide-gold/25 pt-8">
            {groupedCategories.map(([categoryTitle, items]) => (
              <div key={categoryTitle} className="py-8 first:pt-2 last:pb-2 space-y-6">
                {/* Category Heading in Cormorant */}
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl sm:text-3xl text-henna font-medium tracking-wide">
                    {categoryTitle}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium">
                    {items.length} {items.length === 1 ? 'Ritual' : 'Rituals'}
                  </span>
                </div>

                {/* Items List with Dotted Leaders */}
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group p-2 -mx-2 hover:bg-gold/5 transition-colors duration-200 rounded-sm"
                    >
                      {/* Name . . . . . Price */}
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base sm:text-xl text-charcoal font-medium group-hover:text-henna transition-colors">
                            {item.name}
                          </span>
                          {item.tag && (
                            <span className="px-1.5 py-0.5 bg-henna/10 text-henna text-[9px] uppercase tracking-wider font-semibold">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        {/* Dotted Leader */}
                        <span className="flex-1 border-b border-dotted border-gold/40 mx-2 -translate-y-1 hidden sm:block" />

                        {/* Price & Action */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <span className="font-serif text-lg sm:text-xl text-henna font-semibold">
                            {item.price}
                          </span>
                          <button
                            onClick={() => handleBook(item)}
                            className="px-3 py-1 bg-transparent hover:bg-henna hover:text-ivory text-henna border border-gold text-[10px] uppercase tracking-wider transition-all duration-200"
                            aria-label={`Book ${item.name}`}
                          >
                            Book
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openWhatsAppEnquiry(
                                `Hi ${brandConfig.artistName}, I want to enquire about booking "${item.name}" (${item.price}) at your Greater Kailash I salon.`
                              );
                            }}
                            className="px-2 py-1 text-mehndi hover:bg-mehndi hover:text-ivory border border-mehndi/40 text-[10px] uppercase tracking-wider transition-all duration-200"
                            title="Enquire on WhatsApp"
                            aria-label={`Enquire about ${item.name} on WhatsApp`}
                          >
                            WA ↗
                          </button>
                        </div>
                      </div>

                      {/* Small Description & Duration below */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-charcoal-muted font-light mt-1 gap-1">
                        <span className="max-w-xl">{item.description}</span>
                        <span className="text-mehndi font-medium text-[11px] shrink-0">
                          ⏱ {item.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Card Footer Note & Book Appointment Action */}
        <div className="pt-10 mt-10 border-t border-gold/30 text-center space-y-4">
          <p className="text-xs text-charcoal-soft font-light">
            Prices are all-inclusive. Timings: <strong className="text-charcoal font-medium">{brandConfig.studioTimings}</strong>. Walk-ins subject to chair availability. Prior booking highly recommended.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                selectAndScrollToBooking({
                  type: 'parlour',
                  id: 'general-parlour-appointment',
                  title: 'Studio Beauty Parlour Appointment',
                  price: 'Select in Salon',
                  tagline: 'General private studio appointment at Greater Kailash I',
                  category: 'parlour',
                });
                onBookClick?.();
              }}
              className="px-8 py-3 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine"
            >
              Book Appointment
            </button>

            <button
              onClick={() =>
                openWhatsAppEnquiry(
                  `Hi ${brandConfig.artistName}, I want to book a parlour appointment at your Greater Kailash I studio.`
                )
              }
              className="px-6 py-3 bg-mehndi/10 text-mehndi text-xs uppercase tracking-[0.16em] border border-mehndi/30 hover:bg-mehndi hover:text-ivory transition-all duration-300 flex items-center gap-1.5"
            >
              <span>WhatsApp Concierge</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

