export interface PackageItem {
  id: string;
  name: string;
  tier: "Classic" | "Royal" | "Luxury";
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  price: string;
  deposit: string;
  duration: string;
  coverage: {
    hands: string;
    feet: string;
    figureWork: string;
  };
  familyMembersIncluded: string;
  freeTrial: string;
  inclusions: string[];
  idealFor: string;
}

export const packages: PackageItem[] = [
  {
    id: "classic-bridal-package",
    name: "Classic Bridal Package",
    tier: "Classic",
    tagline: "Timeless traditional elegance with balanced symmetry and rich mahogany stains",
    price: "₹14,999",
    deposit: "25% to secure wedding date",
    duration: "4 – 5 hours",
    isPopular: false,
    coverage: {
      hands: "Hands up to lower forearm (palms & dorsal)",
      feet: "Feet up to ankle cuffs",
      figureWork: "Intricate floral jaal, hidden couple initials, sacred peacocks & lotus medallions",
    },
    familyMembersIncluded: "2 Immediate family members (Mother of Bride & Sister — palms only)",
    freeTrial: "Pre-wedding color stain test & skin sensitivity patch included",
    inclusions: [
      "Both hands up to lower forearm with classic Marwari symmetry",
      "Feet patterned gracefully to ankle line",
      "Groom initials creatively woven into lace jaal",
      "Freshly prepared 100% organic Sojat henna cones",
      "Complimentary clove oil stain-enhancing kit",
    ],
    idealFor: "Brides seeking graceful, unhurried traditional coverage with timeless appeal.",
  },
  {
    id: "royal-bridal-package",
    name: "Royal Bridal Package",
    tier: "Royal",
    tagline: "Our most celebrated commission with custom portraits, Baraat storytelling, and entourage care",
    badge: "Most Loved",
    price: "₹24,999",
    deposit: "25% to secure wedding date",
    duration: "6 – 7 hours",
    isPopular: true,
    coverage: {
      hands: "Full arms extending to elbows (palms & dorsal)",
      feet: "Feet extending up to mid-calf with regal payal lace",
      figureWork: "Customized Bride & Groom portraits, Baraat procession with royal elephants, wedding date & hashtag calligraphy",
    },
    familyMembersIncluded: "4 Immediate family members (Mother of Bride, Mother of Groom + 2 Sisters/Bridesmaids)",
    freeTrial: "Complimentary 1-hour pre-wedding design trial & custom motif consultation",
    inclusions: [
      "Full arm coverage up to elbows with bespoke narrative storytelling",
      "Elaborate feet coverage extending up to mid-calf",
      "Personalized bride & groom portraits, couple hashtags, and wedding date",
      "Henna styling for 4 immediate family members included",
      "Luxury bridal aftercare hamper: organic sealant balm, breathable wraps, eucalyptus drops",
      "Direct artist travel within Delhi NCR included",
    ],
    idealFor: "Grand wedding celebrations, palatial venues, and brides who consider henna an indelible art piece.",
  },
  {
    id: "luxury-grandeur-package",
    name: "Luxury Grandeur Package",
    tier: "Luxury",
    tagline: "The pinnacle of bespoke royal bridal couture with upper arm sleeves and complete wedding party coverage",
    price: "₹38,999",
    deposit: "25% to secure wedding date",
    duration: "7 – 9 hours",
    isPopular: false,
    coverage: {
      hands: "Full arms beyond elbows to upper arm sleeves",
      feet: "Full feet extending to knee-length bridal cuffs",
      figureWork: "Complete 360° architectural storytelling (temple jharokhas, groom arrival, love story milestones, Radha-Krishna motifs)",
    },
    familyMembersIncluded: "8 Family members (Mothers, Sisters, Grandmothers) + 1 dedicated assistant artist included",
    freeTrial: "Bespoke in-person design consultation & complete palm trial + physical lookbook preview",
    inclusions: [
      "Maximum couture coverage: upper arms sleeves and full knee-length feet",
      "Complex micro-line architectural detailing mirroring bride's royal lehenga",
      "Dedicated senior assistant artist to attend family while master artist attends the bride",
      "Full coverage for 8 cherished family members",
      "Artisan gift hamper with 10 pure organic Sojat cones for wedding entourage touch-ups",
      "Flexible timing & destination wedding ready",
    ],
    idealFor: "Destination weddings, royal heritage venues, and brides desiring an uncompromised couture heirloom.",
  },
];
