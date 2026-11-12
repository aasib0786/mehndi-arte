import React, { Suspense, lazy } from 'react';
import { SEO } from '@/components/common/SEO';
import { HeroSection } from '@/sections/HeroSection';
import { ThreeServicesStrip } from '@/sections/ThreeServicesStrip';
import { TrustStrip } from '@/sections/TrustStrip';
// Lazy-loaded heavy below-the-fold sections for peak mobile speed & 85+ Lighthouse score
const ServicesSection = lazy(() =>
  import('@/sections/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const PackagesSection = lazy(() =>
  import('@/sections/PackagesSection').then((m) => ({ default: m.PackagesSection }))
);
const BridalJourneySection = lazy(() =>
  import('@/sections/BridalJourneySection').then((m) => ({ default: m.BridalJourneySection }))
);
const GalleryPreviewSection = lazy(() =>
  import('@/sections/GalleryPreviewSection').then((m) => ({ default: m.GalleryPreviewSection }))
);
const AboutSection = lazy(() =>
  import('@/sections/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const TestimonialsSection = lazy(() =>
  import('@/sections/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const InstagramSection = lazy(() =>
  import('@/sections/InstagramSection').then((m) => ({ default: m.InstagramSection }))
);
const FaqSection = lazy(() =>
  import('@/sections/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const ContactSection = lazy(() =>
  import('@/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);

const SectionSkeleton: React.FC<{ minHeight?: string }> = ({ minHeight = 'min-h-[280px]' }) => (
  <div className={`w-full ${minHeight} flex items-center justify-center bg-transparent`}>
    <div className="w-6 h-6 rounded-full border-2 border-gold/30 border-t-henna animate-spin opacity-40" />
  </div>
);

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Bridal Mehndi & Makeup Studio in Delhi NCR"
        description="Award-winning bridal beauty studio in Delhi NCR offering handcrafted 100% organic Rajasthani Sojat henna, HD & Airbrush bridal makeup, and luxury salon rituals at Greater Kailash I."
        canonicalPath="/"
        ogImage="/images/hero-1.webp"
      />

      {/* 1. Hero: Word-by-word reveal, layered parallax collage, magnetic CTA, rotating mandala */}
      <HeroSection />

      {/* 2. Three Services Strip: Accordion expand/shrink panels on desktop, stacked on mobile */}
      <ThreeServicesStrip />

      {/* 3. Trust Strip: Animated count-up metrics for experience, brides, organic henna, makeup brands, studio */}
      <TrustStrip />

      {/* 3. Bridal Journey: GSAP pinned horizontal scroll (desktop) & vertical timeline (mobile) */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[380px]" />}>
        <BridalJourneySection />
      </Suspense>

      {/* 4. Services: 8 categories, editorial staggered/alternating layout with dynamic hover image reveal */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
        <ServicesSection />
      </Suspense>

      {/* 5. Bridal Packages: 3 tiers (Classic, Royal 'Most Loved', Luxury), detailed coverage breakdown */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
        <PackagesSection />
      </Suspense>

      {/* 6. Home Gallery Preview: Masonry layout, Before/After slider, Lightbox, 'See Full Gallery' */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[420px]" />}>
        <GalleryPreviewSection />
      </Suspense>

      {/* 7. About the Artist: Asymmetric layout, polaroid collage, cultural Hindi touches (Shagun, Rang), self-drawing paisley */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[340px]" />}>
        <AboutSection />
      </Suspense>

      {/* 8. Testimonials: Auto-playing marquee of review cards, pauses on hover, Google 4.9★ rating badge */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[300px]" />}>
        <TestimonialsSection />
      </Suspense>

      {/* 9. Instagram Section: Grid of 6 reel thumbnails linking to @mehendi_artist_76548 */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[320px]" />}>
        <InstagramSection />
      </Suspense>

      {/* 10. FAQ Accordion: Stain darkness, organic henna, booking timeline, travel, advance, aftercare */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[300px]" />}>
        <FaqSection />
      </Suspense>

      {/* 11. Contact & Date Reservation: Pre-selected service/package context reflection & WhatsApp dispatch */}
      <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
        <ContactSection />
      </Suspense>
    </>
  );
};
