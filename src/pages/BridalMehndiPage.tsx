import React from 'react';
import { brandConfig } from '@/lib/config';
import { mehndiPackages } from '@/data/packages';
import { testimonials } from '@/data/testimonials';
import { galleryItems } from '@/data/gallery';
import { AdLandingTemplate } from '@/components/landing/AdLandingTemplate';
import { PaisleyMotif } from '@/components/motifs';

export const BridalMehndiPage: React.FC = () => {
  const mehndiTestimonials = testimonials
    .filter((t) => t.serviceCategory === 'mehndi')
    .slice(0, 3);

  const bridalGallery = galleryItems
    .filter((item) => item.serviceCategory === 'mehndi' && item.subCategory === 'bridal')
    .slice(0, 5);

  return (
    <AdLandingTemplate
      serviceType="Mehndi"
      categoryKey="mehndi"
      seo={{
        title: 'Bespoke Bridal Mehndi Couture | Doorstep Service & Free Trial',
        description: `Book Master Artist ${brandConfig.artistName} for bespoke bridal mehndi in ${brandConfig.city}. 100% Organic Sojat henna, zero chemicals, guaranteed dark mahogany stain. Free Trial Mehndi included.`,
        canonicalPath: '/services/bridal-mehndi',
        ogImage: '/images/journey-3.webp',
      }}
      offerBanner={{
        badge: 'Special Wedding Season Offer',
        headline: 'Free Trial Mehndi & Organic Patch Test with Every Bridal Booking',
        subline: 'Limited 2026/2027 Wedding Calendar Slots',
      }}
      hero={{
        badgeText: 'Bespoke Bridal Henna Couture',
        badgeIcon: <PaisleyMotif size={20} className="text-gold" />,
        titleLine1: 'Stories Told in Henna:',
        titleHighlight: 'Bespoke Bridal Artistry',
        titleLine2: 'at Your Doorstep',
        description: `Handcrafted architectural jharokhas, customized couple portraits, and sacred baraat processions. Master Artist ${brandConfig.artistName} works exclusively with 100% certified organic Rajasthani Sojat leaf to guarantee safe, breathtaking mahogany stains on your wedding day.`,
        heroImage: '/images/gallery-bridal-1.webp',
        heroImageAlt: 'Bespoke Rajasthani Heritage Bridal Mehndi Hands by Master Artist Kashish',
        heroImageCaption: 'Royal Rajasthani Heritage Jaal &bull; 48-Hour Mahogany Peak',
        heroImageBadge: '100% Sojat Certified Organic',
        offerHighlightBox: {
          icon: '🎁',
          title: 'Complimentary Bridal Trial Session Included',
          description:
            'Receive a complimentary color test and motif trial prior to your wedding day to experience the natural herbal aroma, smooth drape, and guaranteed rich oxidation on your skin.',
          checklist: [
            '100% Certified Organic Rajasthani Sojat Henna',
            'Zero PPD, Zero Chemicals & Zero Artificial Dyes',
            'Guaranteed Deep Mahogany / Espresso Oxidation',
            'Doorstep Service Across Delhi NCR & Destination Suites',
          ],
        },
        trustPills: [
          { label: 'Years Experience', value: `${brandConfig.stats.experienceYears}+` },
          { label: 'Happy Brides', value: `${brandConfig.stats.happyBrides}+` },
          { label: 'Organic Henna', value: '100% Pure' },
          { label: 'Single Bride Focus', value: '1 / Day' },
        ],
      }}
      galleryImages={bridalGallery}
      testimonials={mehndiTestimonials}
      packages={mehndiPackages}
      personalCommitment={{
        quote:
          'Your bridal mehndi is not a chore to rush through; it is the sacred, tranquil beginning of your wedding celebration.',
        subline: `Doorstep visits across ${brandConfig.city} (South Delhi, Gurgaon, Noida, Faridabad) and destination travel worldwide. Every bride receives dedicated one-on-one attention with zero rushed assistant work.`,
      }}
      stickyBarOfferText="Free Trial Mehndi Included"
      defaultWhatsAppMessage={`Hi ${brandConfig.artistName}, I saw your Bridal Mehndi ad and would like to check availability and claim the Free Trial Mehndi offer.`}
    />
  );
};

export default BridalMehndiPage;
