import React, { useEffect, useState, useRef } from 'react';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';

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
      // EaseOutCubic formula
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
          observer.disconnect(); // Fire once
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
      value: brandConfig.stats.experienceYears,
      suffix: '+',
      title: 'Years Experience',
      subtitle: 'Master fine-line henna craftsmanship',
    },
    {
      value: brandConfig.stats.happyBrides,
      suffix: '+',
      title: 'Cherished Brides',
      subtitle: 'Across India & destination weddings',
    },
    {
      value: 100,
      suffix: '%',
      title: 'Natural Organic Henna',
      subtitle: 'Pure Sojat leaves & essential oils',
    },
    {
      customDisplay: 'Doorstep',
      suffix: 'Service',
      title: 'Home Visit Service',
      subtitle: `${brandConfig.city} & destination venues`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-ivory-light border-y border-gold/25 py-12 px-6 lg:px-12 relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y-2 lg:divide-y-0 lg:divide-x divide-gold/15">
          {trustMetrics.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx > 1 ? 'pt-6 lg:pt-0' : ''
              } ${idx % 2 !== 0 && idx < 2 ? 'pt-0' : ''} px-2 lg:px-6`}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-henna font-medium tracking-tight mb-1">
                {item.value !== undefined ? (
                  <CountUp
                    end={item.value}
                    suffix={item.suffix}
                    isVisible={isVisible}
                  />
                ) : (
                  <span>
                    {item.customDisplay}{' '}
                    <span className="font-vibes text-gold text-2xl sm:text-3xl ml-1">
                      {item.suffix}
                    </span>
                  </span>
                )}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-charcoal font-medium mt-1">
                {item.title}
              </div>
              <div className="text-xs text-charcoal-soft font-light mt-1 max-w-[200px]">
                {item.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

