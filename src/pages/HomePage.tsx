import React from 'react';
import { Helmet } from 'react-helmet-async';
import { brandConfig } from '@/lib/config';
import { HeroSection } from '@/sections/HeroSection';
import { TrustStrip } from '@/sections/TrustStrip';
import { ServicesSection } from '@/sections/ServicesSection';
import { PackagesSection } from '@/sections/PackagesSection';
import { AboutSection } from '@/sections/AboutSection';
import { ContactSection } from '@/sections/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{brandConfig.brandName} | Bespoke Bridal Henna Couture</title>
        <meta
          name="description"
          content={`${brandConfig.tagline} by Master Artist ${brandConfig.artistName}. Serving ${brandConfig.city} and worldwide destination weddings.`}
        />
      </Helmet>

      {/* 1. Hero: Word-by-word reveal, layered parallax collage, magnetic CTA, rotating mandala */}
      <HeroSection />

      {/* 2. Trust Strip: Animated count-up metrics for experience, brides, organic henna, doorstep service */}
      <TrustStrip />

      {/* 3. Services: 8 categories, editorial staggered/alternating layout with dynamic hover image reveal */}
      <ServicesSection />

      {/* 4. Bridal Packages: 3 tiers (Classic, Royal 'Most Loved', Luxury), detailed coverage breakdown */}
      <PackagesSection />

      {/* 5. About the Artist: Asymmetric layout, polaroid collage, cultural Hindi touches (Shagun, Rang), self-drawing paisley */}
      <AboutSection />

      {/* 6. Contact & Date Reservation: Pre-selected service/package context reflection & WhatsApp dispatch */}
      <ContactSection />
    </>
  );
};
