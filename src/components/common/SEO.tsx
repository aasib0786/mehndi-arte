import React from 'react';
import { Helmet } from 'react-helmet-async';
import { brandConfig } from '@/lib/config';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  ogImage = '/images/kashish-profile.jpg',
  ogType = 'website',
  noIndex = false,
}) => {
  const siteUrl = 'https://kashishmehndi.com';
  const fullTitle = title
    ? `${title} | ${brandConfig.brandName}`
    : `${brandConfig.brandName} | Bridal Mehndi, Makeup & Parlour Studio`;
  const metaDescription =
    description ||
    `${brandConfig.tagline} by Master Artist ${brandConfig.artistName}. Offering 100% organic Sojat henna, HD & Airbrush bridal makeup, and studio salon rituals across ${brandConfig.city}.`;

  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const fullOgImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Complete BeautySalon + LocalBusiness Schema.org JSON-LD (Step 9 Requirement 2)
  const beautySalonSchema = {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'LocalBusiness', 'HairSalon'],
    '@id': `${siteUrl}/#beautysalon`,
    name: brandConfig.brandName,
    legalName: brandConfig.brandName,
    alternateName: `${brandConfig.artistName} Mehndi & Makeup Studio`,
    description: metaDescription,
    url: siteUrl,
    telephone: `+${brandConfig.whatsAppNumber}`,
    priceRange: '₹500 - ₹75,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Net Banking',
    image: [
      fullOgImageUrl,
      `${siteUrl}/images/hero-1.webp`,
      `${siteUrl}/images/hero-makeup.webp`,
    ],
    logo: `${siteUrl}/favicon.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Studio 04, Heritage Arcade, M-Block Market, Greater Kailash I',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi NCR',
      postalCode: '110048',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5529,
      longitude: 77.2415,
    },
    hasMap: brandConfig.googleMapsUrl,
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'New Delhi' },
      { '@type': 'AdministrativeArea', name: 'South Delhi' },
      { '@type': 'AdministrativeArea', name: 'Greater Kailash' },
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Greater Noida' },
      { '@type': 'City', name: 'Faridabad' },
      { '@type': 'City', name: 'Ghaziabad' },
      { '@type': 'State', name: 'Delhi NCR' },
    ],
    sameAs: [
      brandConfig.instagramUrl,
      brandConfig.googleMapsUrl,
    ],
    founder: {
      '@type': 'Person',
      name: brandConfig.artistName,
      jobTitle: 'Master Mehndi Artist & Makeup Director',
      image: fullOgImageUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '280',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bespoke Bridal Mehndi & Organic Henna Art',
          description:
            'Architectural Marwari, royal couple portraiture, Arabic, and contemporary henna with 100% certified organic Rajasthani Sojat leaf.',
          serviceType: 'Mehndi / Henna Art',
          provider: { '@id': `${siteUrl}/#beautysalon` },
        },
        priceRange: '₹8,500 - ₹38,999',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Luxury Bridal Makeup, Hairstyling & Draping',
          description:
            'High-Definition and Temptu Airbrush bridal makeup using authentic Dior Backstage, MAC, and Huda Beauty, including couture hair styling and saree/dupatta draping.',
          serviceType: 'Bridal Makeup',
          provider: { '@id': `${siteUrl}/#beautysalon` },
        },
        priceRange: '₹3,500 - ₹32,000',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Beauty Parlour & Salon Rituals',
          description:
            'O3+ Radiance facials, Italian Rica waxing, Kérastase hair spa, luxury rose milk manicure/pedicure, and bespoke 7-day pre-bridal skin and hair regimens at our Greater Kailash I studio.',
          serviceType: 'Beauty Parlour / Salon',
          provider: { '@id': `${siteUrl}/#beautysalon` },
        },
        priceRange: '₹200 - ₹24,999',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'All-Inclusive Bridal Combos (Mehndi + Makeup + Pre-Bridal)',
          description:
            'Complete coordinated wedding week concierge package integrating salon care, doorstep bridal henna, and on-venue HD/Airbrush makeup.',
          serviceType: 'Bridal Combo',
          provider: { '@id': `${siteUrl}/#beautysalon` },
        },
        priceRange: '₹30,999 - ₹74,999',
        priceCurrency: 'INR',
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook / WhatsApp Preview */}
      <meta property="og:site_name" content={brandConfig.brandName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* Structured Data: BeautySalon + LocalBusiness JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(beautySalonSchema)}
      </script>
    </Helmet>
  );
};
