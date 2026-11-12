import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { EditorialImage } from '@/components/common/EditorialImage';
import { LotusFloretMotif, OrnateCornerFlourish, BrushStrokeFlourish } from '@/components/motifs';

gsap.registerPlugin(ScrollTrigger);

interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  placeholder: string;
  highlight: string;
}

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Consultation & Trial",
    subtitle: "Understanding your bridal vision",
    description: "An intimate video or atelier session discussing your bridal lehenga silhouette, jewelry neckline, bespoke love-story motifs, and a complimentary organic Sojat skin test with foundation matching.",
    image: "/images/journey-1.webp",
    placeholder: "/images/journey-1-blur.webp",
    highlight: "Complimentary Skin & Color Test",
  },
  {
    number: "02",
    title: "Pre-Bridal Glow (parlour sessions)",
    subtitle: "The 7-to-14 day studio sanctuary countdown",
    description: "Customized skincare prep at our GK-1 atelier: O3+ illumination facials, gentle RICA Brazilian waxing, rose-milk mani-pedi, and organic ozone hair spas to ensure your skin is luminous and primed.",
    image: "/images/journey-2.webp",
    placeholder: "/images/journey-2-blur.webp",
    highlight: "Studio Atelier Sessions",
  },
  {
    number: "03",
    title: "Mehndi Day",
    subtitle: "Serene, unhurried doorstep artistry",
    description: "Master Artist Kashish arrives at your doorstep or suite with freshly mixed Rajasthani Sojat cones. An unhurried, peaceful session featuring custom groom portraits, baraat jaal, and zero chemical dyes.",
    image: "/images/journey-3.webp",
    placeholder: "/images/journey-3-blur.webp",
    highlight: "1 Bride Per Calendar Day",
  },
  {
    number: "04",
    title: "Wedding Day Makeup & Hair",
    subtitle: "Camera-ready couture radiance",
    description: "Flawless HD or Temptu Airbrush application with 18-hour sweat resistance, luxury mink eyelashes, architectural floral gajra buns or Hollywood waves, and precision double-dupatta draping.",
    image: "/images/journey-4.webp",
    placeholder: "/images/journey-4-blur.webp",
    highlight: "18-Hour Sweat-Proof Stay",
  },
  {
    number: "05",
    title: "Aftercare & Stain Maturation",
    subtitle: "The 48-hour natural oxidation ritual",
    description: "Therapeutic clove oil balm application, breathable cotton wrapping tips, and smoke therapy guidelines ensuring your henna matures into a breathtaking deep cherry-mahogany for your pheras.",
    image: "/images/journey-5.webp",
    placeholder: "/images/journey-5-blur.webp",
    highlight: "48-Hour Mahogany Peak",
  },
];

export const BridalJourneySection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const vinePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Enable GSAP pinned horizontal scroll on desktop when reduced motion is not requested
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop || prefersReducedMotion || !sectionRef.current || !trackRef.current) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Draw the connecting vine stroke along with horizontal scroll
          if (vinePathRef.current) {
            const length = vinePathRef.current.getTotalLength();
            vinePathRef.current.style.strokeDashoffset = `${length * (1 - self.progress)}`;
          }
        },
      },
    });

    if (vinePathRef.current) {
      const length = vinePathRef.current.getTotalLength();
      vinePathRef.current.style.strokeDasharray = `${length}`;
      vinePathRef.current.style.strokeDashoffset = `${length}`;
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-ivory paper-grain relative overflow-hidden border-b border-gold/20 select-none"
    >
      {/* Editorial Asymmetric Section Header */}
      <div className="pt-24 sm:pt-32 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/25 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold-dark font-medium">
              <span>✦</span>
              <span>The Complete Bridal Roadmap · 05 Stages</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-henna leading-[1.1] font-normal">
                The Bridal Journey <br className="hidden sm:inline" />
                <span className="italic font-light">From Consultation</span> to Vows
              </h2>
              <BrushStrokeFlourish width={200} height={12} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl">
              An unhurried heirloom experience unifying skincare prep, ceremonial mehndi artistry, and couture wedding day makeup. Designed around your peace of mind and personal timeline.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-1 text-left lg:text-right">
            <div className="flex items-center gap-2 text-gold">
              <LotusFloretMotif size={28} />
              <span className="font-vibes text-2xl text-henna">1 Bride Per Calendar Day</span>
            </div>
            <span className="text-xs text-charcoal-soft font-light">
              Undivided focus &amp; serene doorstep artistry
            </span>
          </div>
        </div>
      </div>

      {/* Desktop: GSAP Pinned Horizontal Scroll Track */}
      <div className="hidden lg:block relative pb-28 pt-8 overflow-hidden min-h-[600px]">
        {/* Connecting Animated SVG Vine Line */}
        <div className="absolute top-1/2 left-0 w-full pointer-events-none -translate-y-8 z-0">
          <svg
            className="w-full h-24 overflow-visible"
            viewBox="0 0 3200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50 Q 400 0, 800 50 T 1600 50 T 2400 50 T 3200 50"
              stroke="#B8893A"
              strokeWidth="2"
              strokeOpacity="0.15"
              fill="none"
            />
            <path
              ref={vinePathRef}
              d="M0 50 Q 400 0, 800 50 T 1600 50 T 2400 50 T 3200 50"
              stroke="#B8893A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Horizontal Moving Track */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-10 xl:gap-12 px-12 xl:px-24 relative z-10 w-max"
        >
          {journeySteps.map((step, idx) => (
            <div
              key={step.number}
              className="w-[400px] xl:w-[440px] flex-shrink-0 editorial-card p-8 bg-ivory-light flex flex-col justify-between shadow-editorial border border-gold/30 hover:border-gold transition-all duration-300 relative"
            >
              {/* Corner Flourish */}
              <div className="absolute top-2 left-2 text-gold/30 pointer-events-none">
                <OrnateCornerFlourish size={22} />
              </div>
              <div className="absolute top-2 right-2 text-gold/30 pointer-events-none rotate-90">
                <OrnateCornerFlourish size={22} />
              </div>
              <div className="space-y-6">
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <span className="font-serif text-5xl xl:text-6xl text-henna font-normal tracking-tight">
                    {step.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-mehndi font-medium px-2.5 py-1 bg-mehndi/10 border border-mehndi/20">
                    {step.highlight}
                  </span>
                </div>

                {/* Step Image */}
                <div className="relative aspect-[16/10] overflow-hidden arch-frame-top border border-gold/30">
                  <EditorialImage
                    src={step.image}
                    placeholder={step.placeholder}
                    alt={`Step ${step.number}: ${step.title} - ${step.subtitle} at Kashish Mehndi & Makeup Studio`}
                    fallbackTitle={step.title}
                    fallbackSubtitle={step.subtitle}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-henna">
                    {step.title}
                  </h3>
                  <p className="font-vibes text-lg text-gold-dark">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gold/15 flex items-center justify-between text-[11px] text-charcoal-soft">
                <span>Phase {idx + 1} of 05</span>
                <span className="text-gold">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet: Elegant Vertical Timeline */}
      <div className="lg:hidden px-4 sm:px-6 pb-24 max-w-xl mx-auto space-y-10 relative">
        {/* Continuous Left Vertical Vine Line */}
        <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-gold/20 via-gold/50 to-gold/20 pointer-events-none" />

        {journeySteps.map((step, idx) => (
          <div key={step.number} className="relative pl-8 sm:pl-12 space-y-4">
            {/* Step Node Circle */}
            <div className="absolute left-5 sm:left-8 -translate-x-1/2 top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-henna border-2 border-gold flex items-center justify-center text-ivory text-[10px] font-serif shadow-gold">
              {idx + 1}
            </div>

            <div className="editorial-card p-4 sm:p-6 ornate-corners bg-ivory-light space-y-4 border border-gold/30">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-henna font-normal">
                  {step.number}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-mehndi font-medium px-2 py-0.5 bg-mehndi/10">
                  {step.highlight}
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden border border-gold/25">
                <EditorialImage
                  src={step.image}
                  placeholder={step.placeholder}
                  alt={`Step ${step.number}: ${step.title} - ${step.subtitle} at Kashish Mehndi & Makeup Studio`}
                  fallbackTitle={step.title}
                  fallbackSubtitle={step.subtitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl text-henna">
                  {step.title}
                </h3>
                <p className="font-vibes text-base text-gold-dark">
                  {step.subtitle}
                </p>
                <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
