export type ParlourCategory =
  | "facial-cleanup"
  | "waxing"
  | "threading"
  | "hair"
  | "hand-feet"
  | "bleach-dtan"
  | "pre-bridal";

export interface ParlourMenuItem {
  id: string;
  category: ParlourCategory;
  categoryTitle: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  tag?: string;
  isPopular?: boolean;
}

export const parlourCategories: { id: ParlourCategory; label: string; description: string }[] = [
  {
    id: "facial-cleanup",
    label: "Facials & Cleanup",
    description: "Clinical skin brightening, deep pore cleansing, and herbal hydration therapies.",
  },
  {
    id: "waxing",
    label: "Waxing (Rica / Honey)",
    description: "Gentle Italian liposoluble Rica and natural honey wax for silky, smooth skin.",
  },
  {
    id: "threading",
    label: "Threading & Facial Hair",
    description: "Precision eyebrow mapping, threading, and gentle facial hair grooming.",
  },
  {
    id: "hair",
    label: "Hair Rituals & Spa",
    description: "Kérastase deep conditioning, protein masques, styling, and scalp therapy.",
  },
  {
    id: "hand-feet",
    label: "Hands & Feet Bliss",
    description: "Rose & milk soaks, cuticle sculpting, dead-cell filing, and reflexology massage.",
  },
  {
    id: "bleach-dtan",
    label: "Bleach & Marine D-Tan",
    description: "Instant tan-reversal and skin tone evening with botanical active ingredients.",
  },
  {
    id: "pre-bridal",
    label: "Pre-Bridal Curations",
    description: "Multi-session intensive head-to-toe beautification rituals for the bride-to-be.",
  },
];

export const parlourMenu: ParlourMenuItem[] = [
  // 1. Facials & Cleanup
  {
    id: "p-fac-1",
    category: "facial-cleanup",
    categoryTitle: "Facials & Cleanup",
    name: "O3+ Bridal Glow Luxury Facial",
    description: "Flagship brightening facial with whitening serum ampoule, pressure massage, and algae peel-off mask.",
    price: "₹3,499",
    duration: "75 mins",
    tag: "Most Loved",
    isPopular: true,
  },
  {
    id: "p-fac-2",
    category: "facial-cleanup",
    categoryTitle: "Facials & Cleanup",
    name: "Cheryl’s Cosmeceuticals Hydrating Facial",
    description: "Targeted moisture infusion for dry, sensitive skin to prevent makeup patchiness.",
    price: "₹2,699",
    duration: "60 mins",
  },
  {
    id: "p-fac-3",
    category: "facial-cleanup",
    categoryTitle: "Facials & Cleanup",
    name: "Lotus Herbals 24K Gold Sheen Facial",
    description: "Ayurvedic gold bhasma formulation providing instant celebratory luminosity for sangeet and festive occasions.",
    price: "₹2,199",
    duration: "60 mins",
  },
  {
    id: "p-fac-4",
    category: "facial-cleanup",
    categoryTitle: "Facials & Cleanup",
    name: "Charcoal & Tea Tree Deep Cleanup",
    description: "Ultrasonic blackhead extraction, steam, and pore-tightening clay pack for clear skin.",
    price: "₹1,299",
    duration: "45 mins",
  },

  // 2. Waxing
  {
    id: "p-wax-1",
    category: "waxing",
    categoryTitle: "Waxing (Rica / Honey)",
    name: "Full Body Rica White Chocolate Wax",
    description: "Colophony-free Italian liposoluble wax with soothing pre-wax gel and aloe after-lotion. Gentle on sensitive skin.",
    price: "₹2,899",
    duration: "75 mins",
    tag: "Bridal Essential",
    isPopular: true,
  },
  {
    id: "p-wax-2",
    category: "waxing",
    categoryTitle: "Waxing (Rica / Honey)",
    name: "Full Arms + Full Legs + Underarms (Rica)",
    description: "Complete limb hair removal with minimal irritation and skin hydration.",
    price: "₹1,499",
    duration: "45 mins",
  },
  {
    id: "p-wax-3",
    category: "waxing",
    categoryTitle: "Waxing (Rica / Honey)",
    name: "Full Arms + Full Legs (Natural Honey Wax)",
    description: "Traditional gentle honey wax for quick, smooth body hair removal.",
    price: "₹899",
    duration: "40 mins",
  },
  {
    id: "p-wax-4",
    category: "waxing",
    categoryTitle: "Waxing (Rica / Honey)",
    name: "Bikini / Brazilian Rica Wax",
    description: "Hygienic, private service using Rica Brazilian avocado bead wax designed for intimate areas.",
    price: "₹1,699",
    duration: "35 mins",
  },

  // 3. Threading & Facial Hair
  {
    id: "p-thr-1",
    category: "threading",
    categoryTitle: "Threading & Facial Hair",
    name: "Eyebrow Architecture & Shaping",
    description: "Facial contour mapping, threading, trimming, and soothing rosewater mist.",
    price: "₹100",
    duration: "15 mins",
  },
  {
    id: "p-thr-2",
    category: "threading",
    categoryTitle: "Threading & Facial Hair",
    name: "Full Face Threading (Brows, Upper Lip, Chin, Forehead)",
    description: "Complete facial grooming leaving a velvet-smooth canvas for foundation.",
    price: "₹350",
    duration: "30 mins",
    isPopular: true,
  },
  {
    id: "p-thr-3",
    category: "threading",
    categoryTitle: "Threading & Facial Hair",
    name: "Upper Lip & Chin Gentle Threading",
    description: "Fast, delicate hair removal with cooling aloe gel application.",
    price: "₹120",
    duration: "10 mins",
  },

  // 4. Hair Rituals & Spa
  {
    id: "p-hair-1",
    category: "hair",
    categoryTitle: "Hair Rituals & Spa",
    name: "Kérastase Chronologiste Luxury Spa",
    description: "Caviar-inspired revitalization for scalp and fibers, restoring mirror shine and elasticity for wedding hairstyles.",
    price: "₹2,699",
    duration: "60 mins",
    tag: "Luxury Haircare",
    isPopular: true,
  },
  {
    id: "p-hair-2",
    category: "hair",
    categoryTitle: "Hair Rituals & Spa",
    name: "L’Oréal Professionnel Mythic Oil Spa",
    description: "Argan oil hair bath, intense masque, ozone steam, and blowout finish.",
    price: "₹1,699",
    duration: "50 mins",
  },
  {
    id: "p-hair-3",
    category: "hair",
    categoryTitle: "Hair Rituals & Spa",
    name: "Keratin Smooth / Botox Gloss Treatment",
    description: "Long-term frizz reduction, cuticle alignment, and silk gloss lasting 3–4 months.",
    price: "₹4,999",
    duration: "120 mins",
  },
  {
    id: "p-hair-4",
    category: "hair",
    categoryTitle: "Hair Rituals & Spa",
    name: "Designer Haircut & Styling Blow-dry",
    description: "Personalized consultation, face-framing layer cut, shampoo, and thermal blowout.",
    price: "₹999",
    duration: "45 mins",
  },

  // 5. Hands & Feet Bliss
  {
    id: "p-mani-1",
    category: "hand-feet",
    categoryTitle: "Hands & Feet Bliss",
    name: "Rose & Raw Milk Luxury Spa Mani-Pedi Duo",
    description: "Floral foot bath, brown sugar & honey scrub, dead-skin scraping, deep butter massage, and nail buffing.",
    price: "₹1,899",
    duration: "75 mins",
    tag: "Pre-Mehndi Must",
    isPopular: true,
  },
  {
    id: "p-mani-2",
    category: "hand-feet",
    categoryTitle: "Hands & Feet Bliss",
    name: "Classic Pedicure with Sea Salt Soak",
    description: "Heel crack filing, nail trimming, cuticle grooming, and cooling mint massage.",
    price: "₹999",
    duration: "45 mins",
  },
  {
    id: "p-mani-3",
    category: "hand-feet",
    categoryTitle: "Hands & Feet Bliss",
    name: "Classic Manicure & Cuticle Care",
    description: "Gentle exfoliation, nail shaping, massage, and conditioning coat.",
    price: "₹799",
    duration: "35 mins",
  },

  // 6. Bleach & Marine D-Tan
  {
    id: "p-dtan-1",
    category: "bleach-dtan",
    categoryTitle: "Bleach & Marine D-Tan",
    name: "Sara / O3+ Marine Face & Neck D-Tan Pack",
    description: "Botanical eucalyptus and clove D-tan removing sun spots and dullness naturally.",
    price: "₹799",
    duration: "25 mins",
    isPopular: true,
  },
  {
    id: "p-dtan-2",
    category: "bleach-dtan",
    categoryTitle: "Bleach & Marine D-Tan",
    name: "Full Body Marine D-Tan Mask",
    description: "Complete body scrub and brightening clay application for an even, sun-kissed tone.",
    price: "₹2,199",
    duration: "50 mins",
  },
  {
    id: "p-dtan-3",
    category: "bleach-dtan",
    categoryTitle: "Bleach & Marine D-Tan",
    name: "Oxy Life Radiance Face Bleach",
    description: "Oxygen-infused gentle bleach blending facial hair seamlessly with skin tone.",
    price: "₹599",
    duration: "20 mins",
  },

  // 7. Pre-Bridal Curations
  {
    id: "p-pre-1",
    category: "pre-bridal",
    categoryTitle: "Pre-Bridal Curations",
    name: "3-Day Radiant Bride Express Package",
    description: "O3+ Brightening Facial, Full Body Rica Waxing, Face & Neck D-Tan, Rose Mani-Pedi, and Threading.",
    price: "₹7,999",
    duration: "Across 1–2 Studio Visits",
    tag: "Popular",
    isPopular: true,
  },
  {
    id: "p-pre-2",
    category: "pre-bridal",
    categoryTitle: "Pre-Bridal Curations",
    name: "7-Day Imperial All-Inclusive Pre-Bridal Regime",
    description: "2 Signature Facials, Full Body Polishing, Full Body Rica Waxing, Kérastase Hair Spa, Luxury Mani-Pedi, Full Body D-Tan, and Full Face Grooming.",
    price: "₹14,499",
    duration: "Spread Across 2–3 Studio Visits",
    tag: "Complete Transformation",
    isPopular: true,
  },
];

