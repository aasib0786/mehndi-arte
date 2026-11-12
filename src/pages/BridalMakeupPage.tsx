import React from 'react';
import { brandConfig } from '@/lib/config';
import { makeupPackages } from '@/data/packages';
import { testimonials } from '@/data/testimonials';
import { galleryItems } from '@/data/gallery';
import { AdLandingTemplate } from '@/components/landing/AdLandingTemplate';
import { MakeupBrushMotif } from '@/components/motifs';

export const BridalMakeupPage: React.FC = () => {
  const makeupTestimonials = testimonials
    .filter((t) => t.serviceCategory === 'makeup')
    .slice(0, 3);

  const makeupGallery = galleryItems
    .filter((item) => item.serviceCategory === 'makeup')
    .slice(0, 5);

  return (
    <AdLandingTemplate
      serviceType="Makeup"
      categoryKey="makeup"
      seo={{
        title: 'Luxury Bridal Makeup | HD & Airbrush Artistry Delhi NCR',
        description: `Book Master Artist ${brandConfig.artistName} for luxury bridal makeup in ${brandConfig.city}. MAC, Huda Beauty, Dior & Temptu Airbrush. 24-hr waterproof wear, hairstyling & draping included. Free Bridal Trial offer.`,
        canonicalPath: '/services/bridal-makeup',
        ogImage: '/images/hero-makeup.webp',
      }}
      offerBanner={{
        badge: 'Special Bridal Offer',
        headline: 'Complimentary Bridal Makeup & Hair Trial with Confirmed Booking',
        subline: 'Prestige International Cosmetics & Luxury Touch-Up Kit Included',
      }}
      hero={{
        badgeText: 'Couture Bridal Beauty & Hair',
        badgeIcon: <MakeupBrushMotif size={20} className="text-gold" />,
        titleLine1: 'Flawless Camera-Ready',
        titleHighlight: 'Bridal Makeup Artistry',
        titleLine2: 'at Your Venue',
        description: `Every bride deserves weightless, transfer-proof radiance that looks breathtaking under 4K lenses and lasts through happy tears, laughter, and pheras. Executed with Dior Backstage, Charlotte Tilbury, MAC, Huda Beauty, and Temptu Airbrush technology.`,
        heroImage: '/images/gallery-makeup-bridal-1.webp',
        heroImageAlt: 'Royal Heritage Red Lehenga Bride in Flawless HD Makeup by Kashish Studio',
        heroImageCaption: 'Royal Red Lehenga Bride &bull; Flawless HD Skin',
        heroImageBadge: 'Dior & MAC HD Luxury',
        offerHighlightBox: {
          icon: '✨',
          title: 'Free Bridal Makeup & Hair Trial Included',
          description:
            'Book your wedding date today to receive a complete in-person look consultation, skin tone matching, and hair sculpting preview to ensure absolute perfection.',
          checklist: [
            '100% Authentic Prestige Brands (Dior, MAC, Huda Beauty, Kryolan)',
            '24-Hour Transfer-Proof, Sweat-Proof & Tear-Proof Wear',
            'Complimentary Mink Lashes, Hair Styling & Double Dupatta Draping',
            'Full Vanity Ring Light & Equipment Brought to Your Bridal Suite',
          ],
        },
        trustPills: [
          { label: 'Brides Glammed', value: `${brandConfig.stats.makeupEvents}+` },
          { label: 'Wear Longevity', value: '24 Hours' },
          { label: 'International Brands', value: '100% Authentic' },
          { label: 'Airbrush & HD', value: '4K Ready' },
        ],
      }}
      showBeforeAfterSlider={true}
      beforeAfterCategory="makeup"
      galleryImages={makeupGallery}
      testimonials={makeupTestimonials}
      packages={makeupPackages}
      personalCommitment={{
        quote:
          'Bridal makeup is never about masking who you are; it is about illuminating your innate grace with weightless, camera-ready perfection.',
        subline: `On-venue luxury service across Delhi NCR (South Delhi, Gurgaon, Noida) and destination wedding venues nationwide. Dedicated single-bride focus per calendar day.`,
      }}
      stickyBarOfferText="Free Trial Makeup Included"
      defaultWhatsAppMessage={`Hi ${brandConfig.artistName}, I saw your Bridal Makeup ad and would like to check wedding date availability and claim the Complimentary Trial offer.`}
    />
  );
};

export default BridalMakeupPage;
