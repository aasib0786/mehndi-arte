import React from 'react';
import { motion } from 'framer-motion';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import {
  LotusFloretMotif,
  OrnateCornerFlourish,
  BrushStrokeFlourish,
} from '@/components/motifs';

interface ReelItem {
  id: string;
  frameNumber: string;
  title: string;
  views: string;
  image: string;
  placeholder: string;
  tag: string;
  category: string;
}

const reelThumbnails: ReelItem[] = [
  {
    id: "reel-1",
    frameNumber: "FILM № 01",
    title: "The 48-Hour Bridal Oxidation Reveal",
    views: "128K Views",
    image: "/images/reel-1.webp",
    placeholder: "/images/reel-1-blur.webp",
    tag: "Oxidation Reveal",
    category: "Mehndi Science",
  },
  {
    id: "reel-2",
    frameNumber: "FILM № 02",
    title: "Architectural Jharokha Palm Symmetry",
    views: "84K Views",
    image: "/images/reel-2.webp",
    placeholder: "/images/reel-2-blur.webp",
    tag: "Royal Symmetry",
    category: "Bespoke Art",
  },
  {
    id: "reel-3",
    frameNumber: "FILM № 03",
    title: "Peeling Day-1 Paste with Organic Clove Balm",
    views: "215K Views",
    image: "/images/reel-3.webp",
    placeholder: "/images/reel-3-blur.webp",
    tag: "Aftercare Ritual",
    category: "Stain Care",
  },
  {
    id: "reel-4",
    frameNumber: "FILM № 04",
    title: "Full Baraat Procession Forearm Sleeve",
    views: "96K Views",
    image: "/images/reel-4.webp",
    placeholder: "/images/reel-4-blur.webp",
    tag: "Baraat Jaal",
    category: "Bridal Story",
  },
  {
    id: "reel-5",
    frameNumber: "FILM № 05",
    title: "Airy Negative Space Floral Glove Illusion",
    views: "64K Views",
    image: "/images/reel-5.webp",
    placeholder: "/images/reel-5-blur.webp",
    tag: "Negative Space",
    category: "Modern Arabic",
  },
  {
    id: "reel-6",
    frameNumber: "FILM № 06",
    title: "Behind the Cones: Sojat Herbal Mixing",
    views: "142K Views",
    image: "/images/reel-6.webp",
    placeholder: "/images/reel-6-blur.webp",
    tag: "100% Organic",
    category: "Purity Check",
  },
];

export const InstagramSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-ivory paper-grain relative overflow-hidden border-b border-gold/20 select-none">
      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Editorial Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-ivory-light border border-gold/40 text-[10px] uppercase tracking-[0.24em] text-henna shadow-fine">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Live from the Atelier</span>
              <span className="text-gold">✦</span>
              <span>Daily Visual Journal</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                Behind the Cones <br className="hidden sm:inline" />
                <span className="italic font-light">&amp; Real Bridal</span> Stories
              </h2>
              <BrushStrokeFlourish width={190} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-xl">
              Witness authentic 48-hour color maturity, live doorstep session glimpses, and hand-sifted organic henna mixing videos directly on our Instagram journal.
            </p>
          </div>

          {/* Right Column: Instagram Profile Badge Card */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-3">
            <a
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 p-4 bg-ivory-light border border-gold/45 hover:border-gold hover:shadow-editorial transition-all duration-300 group double-hairline-gold"
            >
              <div className="w-12 h-12 rounded-full border border-gold p-0.5 overflow-hidden flex-shrink-0">
                <img
                  src={brandConfig.profilePic || '/images/kashish-profile.webp'}
                  alt={brandConfig.artistName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-base text-henna font-medium">
                    {brandConfig.instagramHandle}
                  </span>
                  <span className="text-gold text-xs">✓</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-charcoal-soft block">
                  Follow for daily bridal reels ↗
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Staggered Lookbook Film Strip (Alternating Y-offset on desktop to break boxy grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-start">
          {reelThumbnails.map((reel, index) => {
            const isOffset = index % 2 === 1;

            return (
              <motion.a
                key={reel.id}
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                }}
                className={`group block bg-[#FAF5ED] p-2.5 sm:p-3 border border-gold/35 hover:border-gold hover:shadow-editorial transition-all duration-300 relative flex flex-col justify-between ${
                  isOffset ? 'lg:translate-y-4' : 'lg:-translate-y-2'
                }`}
              >
                {/* Corner Flourish */}
                <div className="absolute top-1.5 left-1.5 text-gold/30 pointer-events-none">
                  <OrnateCornerFlourish size={16} />
                </div>

                {/* Film Frame Header */}
                <div className="pb-1.5 px-0.5 flex items-center justify-between text-[8px] uppercase tracking-widest text-gold-dark font-mono">
                  <span>{reel.frameNumber}</span>
                  <span className="text-henna">REC ●</span>
                </div>

                {/* Reel Video Thumbnail Container (Aspect 9:16) */}
                <div className="relative aspect-[9/16] overflow-hidden border border-gold/30 bg-ivory">
                  <EditorialImage
                    src={reel.image}
                    placeholder={reel.placeholder}
                    alt={`${reel.title} - Instagram Reel by Kashish Mehndi & Makeup Studio (@mehendi_artist_76548)`}
                    fallbackTitle={reel.title}
                    fallbackSubtitle={reel.tag}
                    aspectRatio="9/16"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Video Play Badge & Views */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-black/35 flex flex-col justify-between p-2.5 sm:p-3">
                    <div className="flex justify-between items-center">
                      <span className="px-1.5 py-0.5 bg-black/60 text-ivory text-[8px] sm:text-[9px] uppercase tracking-[0.16em] backdrop-blur-sm border border-gold/30">
                        {reel.views}
                      </span>
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-henna/90 text-gold border border-gold/40 flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                        ▶
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider text-gold-light block font-medium">
                        {reel.category}
                      </span>
                      <h3 className="font-serif text-xs sm:text-sm text-ivory font-normal leading-snug line-clamp-2">
                        {reel.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Reel Card Footer */}
                <div className="pt-2 px-0.5 flex items-center justify-between text-[10px] text-charcoal-soft font-sans">
                  <span className="text-gold-dark font-medium">#{reel.tag}</span>
                  <span className="text-henna group-hover:text-gold transition-colors font-medium">Watch ↗</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer Note with Lotus */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/20 text-xs text-charcoal-muted">
          <div className="flex items-center gap-2">
            <LotusFloretMotif size={24} />
            <span>Updated weekly from real ongoing wedding dates across {brandConfig.city} and palace destinations</span>
          </div>
          <a
            href={brandConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-henna font-medium uppercase tracking-[0.18em] text-[11px] hover:text-gold transition-colors inline-flex items-center gap-1.5"
          >
            <span>Explore All Videos on Instagram ({brandConfig.instagramHandle})</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
