import React from 'react';
import { testimonials } from '@/data/testimonials';
import {
  LotusFloretMotif,
  OrnateCornerFlourish,
  BrushStrokeFlourish,
} from '@/components/motifs';

export const TestimonialsSection: React.FC = () => {
  // Duplicate list to achieve seamless infinite marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF5ED] paper-grain relative overflow-hidden border-b border-gold/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>Letters from our Brides · Real Experiences</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                Words from our <br className="hidden sm:inline" />
                <span className="italic font-light">Cherished</span> Brides
              </h2>
              <BrushStrokeFlourish width={180} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-xl">
              Authentic gratitude from brides, sisters, and families celebrating their weddings across Delhi NCR, royal Rajasthan palaces, and destination suites worldwide.
            </p>
          </div>

          {/* Right Column: Google Rating Certified Badge Placeholder */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end items-end">
            <div className="p-4 sm:p-5 bg-white border border-gold/45 shadow-fine relative group hover:border-gold transition-colors double-hairline-gold">
              <div className="absolute top-1.5 left-1.5 text-gold/30 pointer-events-none">
                <OrnateCornerFlourish size={20} />
              </div>

              <div className="flex items-center gap-4">
                {/* Google "G" Icon */}
                <div className="w-9 h-9 flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-2xl text-charcoal font-semibold leading-none">
                      4.9
                    </span>
                    <span className="text-xs text-charcoal-muted">/ 5.0</span>
                    <div className="flex text-gold text-xs ml-1">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-charcoal-soft block mt-1 font-medium">
                    Google Reviews · 280+ Verified Brides
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Auto-Playing Marquee of Vintage Congratulatory Postcards */}
      <div className="mt-12 overflow-hidden relative group">
        {/* Soft edge blur masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#FAF5ED] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#FAF5ED] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee py-4 space-x-6 sm:space-x-8 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => {
            const isAlt = index % 2 === 1;

            return (
              <div
                key={`${item.id}-${index}`}
                className={`w-[290px] min-[400px]:w-[350px] sm:w-[460px] flex-shrink-0 p-5 sm:p-8 relative border transition-all duration-300 flex flex-col justify-between ${
                  isAlt
                    ? 'bg-[#FFFDF9] border-gold/45 shadow-fine hover:shadow-editorial hover:border-gold'
                    : 'bg-[#F6EFE3] border-gold/35 shadow-fine hover:shadow-editorial hover:border-gold'
                }`}
              >
                {/* Handcrafted Corner Bracket */}
                <div className="absolute top-2 left-2 text-gold/30 pointer-events-none">
                  <OrnateCornerFlourish size={22} />
                </div>

                {/* Postmark Stamp Seal Graphic (Top Right) */}
                <div className="absolute top-3 right-5 pointer-events-none select-none text-gold/35">
                  <div className="w-14 h-14 rounded-full border border-dashed border-gold/40 flex flex-col items-center justify-center text-[7px] font-mono uppercase text-center leading-tight rotate-12">
                    <span>DELHI G.P.O.</span>
                    <span className="text-gold font-bold">★ 2026 ★</span>
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Rating Stars & Service Tag */}
                  <div className="flex items-center justify-between border-b border-gold/20 pb-3 pr-16">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-gold text-sm tracking-widest">
                        {'★'.repeat(item.rating)}
                      </div>
                      <span className="text-[10px] text-charcoal-muted font-mono">
                        (5.0)
                      </span>
                    </div>

                    {/* Distinct Service Tag (Mehndi / Makeup / Parlour / Combo) */}
                    <span
                      className={`text-[9px] uppercase tracking-wider font-medium px-2.5 py-0.5 border ${
                        item.serviceCategory === 'mehndi'
                          ? 'bg-mehndi/10 text-mehndi border-mehndi/30'
                          : item.serviceCategory === 'makeup'
                          ? 'bg-henna/10 text-henna border-henna/30'
                          : item.serviceCategory === 'parlour'
                          ? 'bg-[#8C6524]/10 text-gold-dark border-gold/30'
                          : 'bg-gold/15 text-charcoal border-gold'
                      }`}
                    >
                      {item.serviceTag}
                    </span>
                  </div>

                  {/* Occasion Label */}
                  <div className="text-[10px] uppercase tracking-widest text-gold-dark font-medium">
                    ✦ {item.occasion}
                  </div>

                  {/* Short Review */}
                  <p className="font-serif italic text-sm sm:text-base text-charcoal leading-relaxed font-normal">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author & City Signoff */}
                <div className="pt-6 mt-6 border-t border-gold/20 flex items-center justify-between relative z-10">
                  <div>
                    <h4 className="font-serif text-base text-henna font-medium leading-tight">
                      {item.brideName}
                    </h4>
                    <span className="text-[11px] text-charcoal-soft font-light block mt-0.5">
                      {item.venue} · {item.city}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">
                      {item.packageTaken}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gold-dark font-mono">
                      {item.weddingDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-12 text-gold/40">
        <LotusFloretMotif size={32} />
      </div>
    </section>
  );
};
