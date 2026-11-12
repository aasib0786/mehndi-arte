export type PackageCategory = "mehndi" | "makeup" | "combo";

export interface PackageItem {
  id: string;
  name: string;
  category: PackageCategory;
  tier: "Classic" | "Royal" | "Luxury" | "Combo";
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  price: string;
  originalPrice?: string;
  deposit: string;
  duration: string;
  coverage?: {
    hands?: string;
    feet?: string;
    figureWork?: string;
    faceAndHair?: string;
    preBridal?: string;
  };
  familyMembersIncluded?: string;
  freeTrial: string;
  inclusions: string[];
  idealFor: string;
}

// -----------------------------------------------------------------------------
// 1. BRIDAL MEHNDI PACKAGES
// -----------------------------------------------------------------------------
export const mehndiPackages: PackageItem[] = [
  {
    id: "classic-bridal-mehndi",
    name: "Classic Bridal Mehndi",
    category: "mehndi",
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
    id: "royal-bridal-mehndi",
    name: "Royal Bridal Mehndi",
    category: "mehndi",
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
      figureWork: "Full Baraat procession, bridal doli, customized couple portraits & vows script",
    },
    familyMembersIncluded: "4 Close family members (full palms front & back)",
    freeTrial: "Full trial session with custom sketch preview & oxidation review",
    inclusions: [
      "Elbow-length arms with architectural jharokhas & couple portraits",
      "Mid-calf feet coverage with floating lotus silhouettes & anklet bands",
      "Custom proposal skyline or personalized love-story motifs",
      "Dedicated senior artist team for rapid family application",
      "Artisan clove balm, wrapping rolls, and 24-hr post-application support",
    ],
    idealFor: "The discerning bride desiring palatial storytelling and dedicated entourage pampering.",
  },
  {
    id: "luxury-heirloom-mehndi",
    name: "Luxury Heirloom Mehndi",
    category: "mehndi",
    tier: "Luxury",
    tagline: "The pinnacle of haute henna couture: limitless architectural intricacy and destination travel",
    price: "₹38,999",
    deposit: "25% to secure wedding date",
    duration: "Unhurried Multi-Session",
    isPopular: false,
    coverage: {
      hands: "Full arms past elbows up to upper biceps (palms & dorsal)",
      feet: "Feet extending high up to knee curve with palace arch jaal",
      figureWork: "Photorealistic portraits, sacred Vedic mantras, temple architecture & skylines",
    },
    familyMembersIncluded: "8 Family members (complete hands front & back)",
    freeTrial: "Private bespoke motif consultation & master artist trial in suite",
    inclusions: [
      "Unlimited creative consultation and hand-drafted paper sketches",
      "Full upper arm and knee-length feet couture execution",
      "Complete VIP henna bar for 8 VIP guests during the celebration",
      "Luxury aftercare chest with roasted cloves, artisan herbal balm & silk wrap",
      "Guaranteed single bride priority for the entire calendar date",
    ],
    idealFor: "Grand royal weddings, palace destinations, and brides who view henna as high art.",
  },
];

// -----------------------------------------------------------------------------
// 2. BRIDAL MAKEUP PACKAGES
// -----------------------------------------------------------------------------
export const makeupPackages: PackageItem[] = [
  {
    id: "classic-hd-bridal-makeup",
    name: "HD Bridal Elegance",
    category: "makeup",
    tier: "Classic",
    tagline: "High-definition camera-ready skin, bespoke eye glam, luxury hair & draping",
    price: "₹18,000",
    deposit: "25% to secure wedding date",
    duration: "3 – 3.5 hours",
    isPopular: false,
    coverage: {
      faceAndHair: "Full HD face, neck, and décolletage makeup with 16-hr transfer-proof lock",
    },
    familyMembersIncluded: "1 Complimentary Mother of the Bride party hair blow-dry",
    freeTrial: "Pre-wedding makeup consultation & skin analysis included",
    inclusions: [
      "High-Definition foundation with MAC, NARS & Huda Beauty",
      "Custom strip lashes and eye contouring",
      "Regal bridal hair bun or textured Hollywood waves",
      "Dupatta pleating, anchoring & jewelry setting",
      "Bridal lipstick touch-up sample kit",
    ],
    idealFor: "Brides seeking flawless high-definition coverage that looks breathtaking both in person and on 4K camera.",
  },
  {
    id: "airbrush-royale-makeup-pkg",
    name: "Airbrush Royale Bridal",
    category: "makeup",
    tier: "Royal",
    tagline: "Micro-atomized Temptu silicon airbrush, 24-hr waterproof wear, and weightless porcelain glow",
    badge: "Most Loved",
    price: "₹24,000",
    deposit: "25% to secure wedding date",
    duration: "3.5 – 4 hours",
    isPopular: true,
    coverage: {
      faceAndHair: "Full Face, Neck, Shoulders & Back Temptu Airbrush finish with body shimmer",
    },
    familyMembersIncluded: "1 Saree draping & hairstyle for Mother or Sister of the Bride",
    freeTrial: "Complimentary airbrush patch test & lipstick swatch matching",
    inclusions: [
      "Temptu Silicon Airbrush makeup (sweat-proof, tear-proof, non-cakey)",
      "High-fashion couture eye styling with glitter/pigments",
      "Advanced hair sculpture with floral styling accessories",
      "Double dupatta draping and heavy lehenga can-can setup",
      "Luxury bridal emergency touch-up box with setting spray & blotting paper",
    ],
    idealFor: "Summer weddings, outdoor destination mandaps, and brides who demand zero touch-ups all night.",
  },
  {
    id: "ultra-hd-luxury-makeup-pkg",
    name: "Ultra-HD Imperial Bridal",
    category: "makeup",
    tier: "Luxury",
    tagline: "Dior & Charlotte Tilbury prestige curation, international contouring, and 2 artist entourage",
    price: "₹34,000",
    deposit: "25% to secure wedding date",
    duration: "Full Dedicated Day Care",
    isPopular: false,
    coverage: {
      faceAndHair: "Prestige skin prep, sheet mask infusion, ultra-HD face & body glow contouring",
    },
    familyMembersIncluded: "2 Full Party Makeups (Hair, Makeup & Draping for Mom & Sister)",
    freeTrial: "Private in-suite full face trial session before wedding week",
    inclusions: [
      "Prestige cosmetics: Charlotte Tilbury, Dior Backstage, Tom Ford & NARS",
      "Luxury 20-min pre-makeup cryo-globe face de-puffing massage",
      "Bespoke red carpet hairstyling with real or preserved floral styling",
      "Second look change: Rapid hairstyle & lip color change for reception",
      "Lead artist stays through photo session until Baraat arrival",
    ],
    idealFor: "Grand palace weddings, high-society receptions, and brides seeking couture perfection without compromise.",
  },
];

// -----------------------------------------------------------------------------
// 3. BRIDAL COMBO PACKAGES (Mehndi + Makeup + Pre-Bridal)
// -----------------------------------------------------------------------------
export const comboPackages: PackageItem[] = [
  {
    id: "shagun-duo-combo",
    name: "The Shagun Duo Combo",
    category: "combo",
    tier: "Combo",
    tagline: "Classic Bridal Mehndi + HD Bridal Makeup: seamlessly coordinated by one master studio",
    badge: "Best Value",
    price: "₹30,999",
    originalPrice: "₹32,999",
    deposit: "25% to secure wedding date",
    duration: "Spread Across 2 Dates",
    isPopular: false,
    coverage: {
      hands: "Classic Forearm Mehndi & Ankle Feet",
      faceAndHair: "Full HD Bridal Makeup with Hair & Dupatta Draping",
      preBridal: "Rose & Milk Luxury Manicure + Pedicure at studio",
    },
    freeTrial: "Free henna patch test + makeup consultation",
    inclusions: [
      "Classic Bridal Mehndi on Day -2 (Doorstep Home Visit)",
      "Signature HD Bridal Makeup on Wedding Day (Doorstep / Venue)",
      "Complimentary Rose & Milk Manicure + Pedicure at our GK-1 studio",
      "Complete dupatta draping and jewelry setting",
      "Clove henna aftercare balm + bridal touch-up kit",
    ],
    idealFor: "Intimate and elegant weddings where you want one reliable studio handling both your henna and makeup flawlessly.",
  },
  {
    id: "royal-heritage-combo",
    name: "Royal Heritage All-Inclusive Combo",
    category: "combo",
    tier: "Combo",
    tagline: "Royal Bridal Mehndi + Airbrush Royale Makeup + 3-Day Pre-Bridal Salon Rituals",
    badge: "Most Coveted",
    price: "₹48,999",
    originalPrice: "₹54,998",
    deposit: "25% to secure wedding date",
    duration: "Full Bridal Week Concierge",
    isPopular: true,
    coverage: {
      hands: "Elbow-length Royal Mehndi with Couple Portraits & Mid-calf Feet",
      faceAndHair: "Temptu Airbrush Royale Makeup with Couture Hair & Double Draping",
      preBridal: "O3+ Radiance Facial, Full Body Rica Waxing, D-Tan & Rose Mani-Pedi",
    },
    familyMembersIncluded: "2 Family members (Mehndi palms + 1 Saree Draping)",
    freeTrial: "Full trial session for both henna oxidation & airbrush makeup",
    inclusions: [
      "Pre-Bridal Day 1 (Studio): Full Body Rica Waxing, D-Tan, and Luxury Mani-Pedi",
      "Pre-Bridal Day 2 (Studio): O3+ Bridal Glow Facial & Kérastase Hair Spa",
      "Mehndi Day (Home Visit): Royal Bridal Mehndi with portraiture & 2 family members",
      "Wedding Day (Venue): Airbrush Royale Makeup, double dupatta drape & hair sculpture",
      "All aftercare kits, lash extensions & touch-up cases included",
    ],
    idealFor: "Brides who want a complete, stress-free bridal week transformation under one master atelier.",
  },
  {
    id: "empress-imperial-combo",
    name: "Empress Imperial Masterpiece Combo",
    category: "combo",
    tier: "Combo",
    tagline: "Luxury Heirloom Mehndi + Ultra-HD Imperial Makeup + Full 7-Day Pre-Bridal Package + 4 Family Members",
    price: "₹74,999",
    originalPrice: "₹87,497",
    deposit: "25% to secure wedding date",
    duration: "Comprehensive 7-Day VIP Concierge",
    isPopular: false,
    coverage: {
      hands: "Upper-Bicep Heirloom Henna & Knee-length Feet Architecture",
      faceAndHair: "Prestige Ultra-HD Makeup with second reception look transition",
      preBridal: "Complete 7-Day Imperial Pre-Bridal Regime (2 Facials, Body Polish, Hair Spa)",
    },
    familyMembersIncluded: "4 Family members (Full Mehndi + 2 Full Party Makeups)",
    freeTrial: "Full in-suite private trial for makeup and bespoke henna sketch curation",
    inclusions: [
      "Complete 7-Day Pre-Bridal Salon Regime at our Greater Kailash atelier",
      "Upper-bicep Heirloom Bridal Henna with photorealistic couple portraits",
      "Ultra-HD Bridal Makeup with reception changeover assistance",
      "2 Complete Party Makeups for Mother & Sister of the Bride",
      "VIP henna for 4 family members",
      "VIP gift trunk with pure organic aftercare, bespoke silk robe & cosmetics",
    ],
    idealFor: "Grand destination celebrations where absolute luxury, unified aesthetic, and royal treatment are non-negotiable.",
  },
];

// Default export combining all packages
export const packages: PackageItem[] = [
  ...mehndiPackages,
  ...makeupPackages,
  ...comboPackages,
];
