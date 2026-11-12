import React, { useEffect, useState, useRef } from 'react';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import {
  LotusFloretMotif,
  OrnateCornerFlourish,
  HathphoolChainMotif,
} from '@/components/motifs';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
}

const CountUp: React.FC<CounterProps> = ({
  end,
  suffix = '',
  duration = 1800,
  isVisible,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState<number>(prefersReducedMotion ? end : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    if (!isVisible) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, end, duration, prefersReducedMotion]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const TrustStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const trustMetrics = [
    {
      hallmark: 'HALLMARK I',
      hindiTag: 'अनुभव',
      value: brandConfig.stats.experienceYears,
      suffix: '+',
      title: 'Years Atelier Mastery',
      subtitle: 'Bespoke fine-line symmetry & bridal couture',
    },
    {
      hallmark: 'HALLMARK II',
      hindiTag: 'विश्वास',
      value: brandConfig.stats.happyBrides,
      suffix: '+',
      title: 'Celebrated Brides',
      subtitle: 'Intimate ceremonies & grand destination weddings',
    },
    {
      hallmark: 'HALLMARK III',
      hindiTag: 'शुद्धता',
      value: 100,
      suffix: '%',
      title: 'Organic Sojat Leaves',
      subtitle: 'Zero synthetic dyes, PPD, or chemical catalysts',
    },
    {
      hallmark: 'HALLMARK IV',
      hindiTag: 'सौंदर्य',
      value: brandConfig.makeupBrandsUsed.length,
      suffix: '+ Luxury',
      title: 'Global Cosmetic Houses',
      subtitle: `${brandConfig.makeupBrandsUsed.slice(0, 3).join(', ')} & Dior Backstage`,
    },
    {
      hallmark: 'HALLMARK V',
      hindiTag: 'आतिथ्य',
      customDisplay: 'Home + Studio',
      suffix: 'Service',
      title: 'Doorstep & GK-1 Salon',
      subtitle: `Venue suites across ${brandConfig.city} & flagship parlour`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF5ED] border-y border-gold/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden select-none"
    >
      {/* Handcrafted Chain Trim at Top & Bottom */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-40">
        <HathphoolChainMotif height={12} color="#B8893A" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-40">
        <HathphoolChainMotif height={12} color="#B8893A" />
      </div>

      {/* Handcrafted Corner Flourishes */}
      <div className="absolute top-3 left-3 text-gold/35 pointer-events-none hidden sm:block">
        <OrnateCornerFlourish size={32} />
      </div>
      <div className="absolute top-3 right-3 text-gold/35 pointer-events-none rotate-90 hidden sm:block">
        <OrnateCornerFlourish size={32} />
      </div>
      <div className="absolute bottom-3 left-3 text-gold/35 pointer-events-none -rotate-90 hidden sm:block">
        <OrnateCornerFlourish size={32} />
      </div>
      <div className="absolute bottom-3 right-3 text-gold/35 pointer-events-none rotate-180 hidden sm:block">
        <OrnateCornerFlourish size={32} />
      </div>

      {/* Subtle Center Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/8 pointer-events-none">
        <LotusFloretMotif size={220} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-2">
          {trustMetrics.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center p-4 sm:p-5 relative group transition-all duration-300 hover:bg-ivory-light/60 ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Medallion Arched Outer Frame */}
              <div className="w-full max-w-[210px] pb-2 border-b border-gold/25 relative">
                {/* Hindi Cultural Watermark */}
                <span className="font-serif text-sm text-gold-dark/30 font-medium block mb-0.5 tracking-wider">
                  {item.hindiTag}
                </span>

                {/* Hallmark Roman Label */}
                <div className="inline-flex items-center gap-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.26em] text-gold-dark font-sans font-medium">
                  <span className="text-[6px]">✦</span>
                  <span>{item.hallmark}</span>
                  <span className="text-[6px]">✦</span>
                </div>
              </div>

              {/* Main Number or Display */}
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-henna font-normal tracking-tight my-2">
                {item.value !== undefined ? (
                  <CountUp
                    end={item.value}
                    suffix={item.suffix}
                    isVisible={isVisible}
                  />
                ) : (
                  <span className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-serif text-henna">
                      {item.customDisplay}
                    </span>
                    <span className="font-vibes text-gold text-lg sm:text-xl -mt-1">
                      {item.suffix}
                    </span>
                  </span>
                )}
              </div>

              {/* Title & Description with Editorial Typography */}
              <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-charcoal font-medium">
                {item.title}
              </div>
              <div className="text-[11px] text-charcoal-muted font-light mt-1 max-w-[190px] leading-relaxed">
                {item.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
