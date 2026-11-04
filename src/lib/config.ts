export interface BrandConfig {
  brandName: string;
  artistName: string;
  profilePic?: string;
  tagline: string;
  subtagline: string;
  city: string;
  serviceNote: string;
  coverageAreas: string[];
  whatsAppNumber: string; // international digits without +
  phoneDisplay: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  stats: {
    experienceYears: number;
    happyBrides: number;
    destinationWeddings: number;
    organicPurity: string;
  };
  bookingNotice: string;
  organicHennaGuarantee: string;
}

export const brandConfig: BrandConfig = {
  brandName: "Kashish Mehndi Art",
  artistName: "Kashish",
  profilePic: "/images/kashish-profile.jpg",
  tagline: "Fine Art Henna Couture for the Discerning Bride",
  subtagline: "Bespoke bridal heirlooms created with pure triple-sifted Sojat henna, hand-blended eucalyptus and tea tree extracts.",
  city: "Delhi NCR",
  serviceNote: "Home visit service across Delhi NCR & available for destination weddings worldwide.",
  coverageAreas: [
    "South Delhi",
    "Central Delhi",
    "Gurugram (DLF & Golf Course Road)",
    "Noida & Greater Noida",
    "Faridabad",
    "Destination Weddings (Udaipur, Jaipur, Goa, Dubai)",
  ],
  whatsAppNumber: "919876543210",
  phoneDisplay: "+91 98765 43210",
  instagramUrl: "https://www.instagram.com/mehendi_artist_76548/",
  instagramHandle: "@mehendi_artist_76548",
  email: "concierge@kashishmehndi.com",
  stats: {
    experienceYears: 8,
    happyBrides: 1250,
    destinationWeddings: 85,
    organicPurity: "100% Organic",
  },
  bookingNotice: "Currently accepting bespoke bridal bookings for the 2026/2027 wedding seasons. Limited to one bridal commission per calendar day.",
  organicHennaGuarantee: "Guaranteed chemical-free, freshly prepared small batches with deep mahogany stain longevity.",
};

export function getWhatsAppBookingLink(serviceOrPackage?: string): string {
  const base = `https://wa.me/${brandConfig.whatsAppNumber}`;
  const text = serviceOrPackage
    ? `Hello ${brandConfig.artistName}, I am inquiring about booking "${serviceOrPackage}" for an upcoming celebration.`
    : `Hello ${brandConfig.artistName}, I would like to check availability and inquire about bespoke bridal mehndi packages.`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

