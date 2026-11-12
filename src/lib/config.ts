export interface ParlourOfferConfig {
  enabled: boolean;
  badge?: string;
  title: string;
  subtitle: string;
  code?: string;
  terms?: string;
  buttonText?: string;
}

export interface BrandConfig {
  brandName: string;
  artistName: string;
  profilePic?: string;
  tagline: string;
  subtagline: string;
  city: string;
  serviceNote: string;
  coverageAreas: string[];
  studioAddress: string;
  studioTimings: string;
  googleMapsUrl: string;
  serviceLocations: {
    mehndi: string;
    makeup: string;
    parlour: string;
  };
  makeupBrandsUsed: string[];
  whatsAppNumber: string; // international digits without +
  phoneDisplay: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  stats: {
    experienceYears: number;
    happyBrides: number;
    destinationWeddings: number;
    makeupEvents: number;
    organicPurity: string;
  };
  bookingNotice: string;
  organicHennaGuarantee: string;
  parlourOfferBanner: ParlourOfferConfig;
}

export const brandConfig: BrandConfig = {
  brandName: "Kashish Mehndi & Makeup Studio",
  artistName: "Kashish",
  profilePic: "/images/kashish-profile.jpg",
  tagline: "Bridal Henna Couture, Signature Makeup & Luxury Parlour Studio",
  subtagline: "A unified bridal beauty atelier offering handcrafted organic Sojat henna, high-definition bridal makeup with international artistry, and bespoke salon rituals.",
  city: "Delhi NCR",
  serviceNote: "Mehndi & Makeup: Doorstep home visit or venue. Parlour services: Exclusively at our studio atelier.",
  coverageAreas: [
    "South Delhi & Central Delhi",
    "Gurugram (DLF Phase 1-5 & Golf Course Road)",
    "Noida & Greater Noida Expressway",
    "Faridabad & Ghaziabad",
    "Destination Venues (Udaipur, Jaipur, Goa, Dubai)",
  ],
  studioAddress: "Studio 04, Heritage Arcade, M-Block Market, Greater Kailash I, New Delhi - 110048",
  studioTimings: "10:00 AM – 8:00 PM (Tuesday Closed)",
  googleMapsUrl: "https://maps.google.com/?q=Kashish+Mehndi+and+Makeup+Studio+Greater+Kailash+Delhi",
  serviceLocations: {
    mehndi: "Doorstep home visit or at the celebration venue across Delhi NCR & destination suites.",
    makeup: "Doorstep home visit or at your wedding suite with full vanity lighting setup.",
    parlour: "Exclusive private appointments at our Greater Kailash I studio atelier.",
  },
  makeupBrandsUsed: [
    "MAC Cosmetics",
    "Huda Beauty",
    "Kryolan Professional",
    "NARS",
    "Bobbi Brown",
    "Anastasia Beverly Hills",
    "Dior Backstage",
    "Charlotte Tilbury",
    "Estée Lauder",
  ],
  whatsAppNumber: "919131734930",
  phoneDisplay: "+91 91317 34930",
  instagramUrl: "https://www.instagram.com/mehendi_artist_76548/",
  instagramHandle: "@mehendi_artist_76548",
  email: "concierge@kashishstudio.com",
  stats: {
    experienceYears: 10,
    happyBrides: 1800,
    destinationWeddings: 120,
    makeupEvents: 950,
    organicPurity: "100% Organic",
  },
  bookingNotice: "Currently accepting bridal and celebration dates for the 2026/2027 wedding seasons. Dedicated single bride per calendar day focus for main bridal bookings.",
  organicHennaGuarantee: "Guaranteed chemical-free, hand-ground Sojat paste with deep mahogany stain longevity.",
  parlourOfferBanner: {
    enabled: true,
    badge: "First-Time Guest Privilege",
    title: "First Visit: 20% Off All Luxury Skin, Hair & Body Rituals",
    subtitle: "Valid on prior appointments at our Greater Kailash I atelier studio.",
    code: "GLOW20",
    terms: "Applicable on services above ₹1,500. Excludes bridal packages.",
    buttonText: "Claim 20% Off",
  },
};

export function getWhatsAppBookingLink(serviceOrPackage?: string): string {
  const base = `https://wa.me/${brandConfig.whatsAppNumber}`;
  const text = serviceOrPackage
    ? `Hello ${brandConfig.artistName}, I am inquiring about booking "${serviceOrPackage}" at Kashish Mehndi & Makeup Studio.`
    : `Hello ${brandConfig.artistName}, I would like to check availability and inquire about bridal mehndi, makeup, or parlour services.`;
  return `${base}?text=${encodeURIComponent(text)}`;
}
