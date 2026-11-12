import React from 'react';
import { brandConfig } from '@/lib/config';
import { comboPackages } from '@/data/packages';
import { testimonials } from '@/data/testimonials';
import { galleryItems } from '@/data/gallery';
import { AdLandingTemplate } from '@/components/landing/AdLandingTemplate';
import { MehndiConeMotif, MakeupBrushMotif } from '@/components/motifs';

export const BridalComboPage: React.FC = () => {
  const comboTestimonials = testimonials
    .filter((t) => t.serviceCategory === 'combo' || t.serviceCategory === 'parlour')
    .slice(0, 3);

  // Curate 5 images representing the combo experience (mehndi, makeup, and parlour glow)
  const comboGallery = [
    galleryItems.find((g) => g.id === 'gal-1') || galleryItems[0],
    galleryItems.find((g) => g.id === 'gal-11') || galleryItems[1],
    galleryItems.find((g) => g.id === 'gal-3') || galleryItems[2],
    galleryItems.find((g) => g.id === 'gal-12') || galleryItems[3],
    galleryItems.find((g) => g.id === 'gal-21') || galleryItems[4],
  ];

  return (
    <AdLandingTemplate
      serviceType="Bridal Combo (Mehndi + Makeup)"
      categoryKey="combo"
      seo={{
        title: 'All-Inclusive Bridal Combos | Mehndi, Makeup & Pre-Bridal Studio Delhi NCR',
        description: `Save up to ₹12,500 with all-inclusive bridal beauty packages by Master Artist ${brandConfig.artistName}. Coordinated bridal mehndi, HD/Airbrush makeup, and studio pre-bridal pampering in ${brandConfig.city}.`,
        canonicalPath: '/services/bridal-combo',
        ogImage: '/images/hero-mehndi.webp',
      }}
      offerBanner={{
        badge: 'Special Bundle Savings',
        headline: 'Save Up to ₹12,500 with All-Inclusive Bridal Mehndi + Makeup + Pre-Bridal Combos',
        subline: 'One Coordinated Master Studio for Your Entire Wedding Week',
      }}
      hero={{
        badgeText: 'Unified Bridal Atelier Experience',
        badgeIcon: (
          <div className="flex items-center gap-1 text-gold">
            <MehndiConeMotif size={16} />
            <span className="text-xs">+</span>
            <MakeupBrushMotif size={16} />
          </div>
        ),
        titleLine1: 'One Master Studio',
        titleHighlight: 'For Your Entire Bridal',
        titleLine2: 'Week Transformation',
        description: `No uncoordinated vendors, no scheduling clashes, no aesthetic mismatches. Master Artist ${brandConfig.artistName}'s studio synchronizes your pre-bridal salon treatments, ceremonial organic henna, and wedding day HD/Airbrush makeup into one seamless, royal experience.`,
        heroImage: '/images/hero-1.webp',
        heroImageAlt: 'Unified Bridal Shagun Trousseau - Organic Henna & HD Makeup by Kashish Studio',
        heroImageCaption: 'Complete Bridal Shagun Trousseau &bull; Mehndi + Makeup',
        heroImageBadge: 'Save Up to ₹12,500',
        offerHighlightBox: {
          icon: '💎',
          title: 'All-Inclusive Bundle Privileges & Savings',
          description:
            'Book our signature combo packages to enjoy synchronized artist timelines, exclusive package discounts up to ₹12,500, and comprehensive beauty coverage from head to toe.',
          checklist: [
            'Instant Savings of ₹5,000 to ₹12,500 Over Individual Bookings',
            'Pre-Bridal Luxury Facials & Spas at our Greater Kailash I Atelier',
            'Doorstep 100% Organic Rajasthani Sojat Henna Application',
            'Full On-Venue HD or Airbrush Makeup with Hairstyling & Draping',
          ],
        },
        trustPills: [
          { label: 'Bundle Savings', value: 'Save ₹12.5k' },
          { label: 'Single Studio', value: '100% Coordinated' },
          { label: 'Bridal Week', value: '7-Day Care' },
          { label: 'Full Team', value: 'Artist + Entourage' },
        ],
      }}
      comboTimeline={[
        {
          days: 'Days -7 to -2',
          title: 'Studio Pre-Bridal Glow',
          location: 'Greater Kailash I Atelier',
          description:
            'O3+ Radiance Facials, Italian Rica Waxing, Kérastase Hair Spa, and Luxury Rose Milk Mani-Pedis.',
        },
        {
          days: 'Day -2',
          title: 'Ceremonial Bridal Mehndi',
          location: 'Doorstep at Home / Venue',
          description:
            'Bespoke architectural jharokhas, customized couple portraits, and 100% organic Sojat henna application.',
        },
        {
          days: 'Wedding Day',
          title: 'Couture Bridal Glamour',
          location: 'Your Wedding Suite',
          description:
            'HD / Temptu Airbrush Makeup, 24-hr transfer-proof wear, bespoke hair sculpting, and double dupatta draping.',
        },
      ]}
      galleryImages={comboGallery}
      testimonials={comboTestimonials}
      packages={comboPackages}
      personalCommitment={{
        quote:
          'When one artistic vision guides your skincare, your henna, and your wedding makeup, the bride looks effortlessly radiant and harmonious in every photograph.',
        subline: `Serving brides across Delhi NCR (South Delhi, Gurgaon, Noida, Faridabad) and destination wedding venues nationwide. Fully coordinated calendar management.`,
      }}
      stickyBarOfferText="Save Up to ₹12,500 on Combos"
      defaultWhatsAppMessage={`Hi ${brandConfig.artistName}, I saw your Bridal Combo ad and would like to check availability and packages to save up to ₹12,500.`}
    />
  );
};

export default BridalComboPage;
