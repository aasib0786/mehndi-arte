export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  duration: string;
  startingPrice: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  signatureMotifs: string[];
  recommendedTiming: string;
  imageUrl: string;
}

export const services: ServiceItem[] = [
  {
    id: "bridal-couture",
    slug: "bridal-mehndi",
    title: "Royal Heritage Bridal",
    subtitle: "Custom architectural storytelling, jharokha portraits, and heirloom patterns",
    tag: "Signature Masterpiece",
    duration: "5 – 8 hours",
    startingPrice: "₹14,999",
    shortDescription: "An elaborate, deeply detailed bridal commission spanning full arms and feet, meticulously drawn with micro-fine lines and personalized motifs.",
    longDescription: "Our flagship bridal experience weaves the bride and groom's personal narrative into centuries-old Mughal and Rajasthani symmetry. Every panel is drafted by hand: bridal jharokhas, groom procession (baraat) silhouettes, divine lotus ponders, sacred peacocks, and customized monogram calligraphy. Executed exclusively with freshly mixed organic Sojat henna paste to ensure a rich, dark mahogany stain.",
    features: [
      "Full hands up to elbows (palms & dorsal) and feet up to mid-calf",
      "Personalized bride & groom portraits, couple hashtags, and wedding dates",
      "Bespoke symmetrical layout customized to bride's lehenga silhouettes",
      "Pre-ceremony bridal henna color test & consultation included",
      "Complimentary organic aftercare balm and essential oil seal",
    ],
    signatureMotifs: ["Royal Jharokhas", "Baraat Procession", "Sacred Lotus Mandala", "Bespoke Monogram"],
    recommendedTiming: "48 hours prior to the wedding vows (Pheras / Nikah) for peak stain maturity",
    imageUrl: "/images/service-bridal.webp",
  },
  {
    id: "roka-engagement",
    slug: "engagement-mehndi",
    title: "Engagement & Roka",
    subtitle: "Delicate wrist jewelry patterns, palm centers, and celebratory finesse",
    tag: "Intimate Occasion",
    duration: "2 – 3 hours",
    startingPrice: "₹5,499",
    shortDescription: "Balanced, graceful designs tailored specifically to spotlight your engagement ring and ring-exchange photography.",
    longDescription: "Designed with close-up hand and ring photography in mind. Focuses on the dorsal side of the hand with fluid trailing vines, lace cuffs, and subtle palm mandalas that leave the ring finger tastefully framed.",
    features: [
      "Both hands (front and back) up to mid-wrist",
      "Photogenic ring-finger negative frame",
      "Speedy dry formula with organic cajeput essential oil blend",
      "Includes complimentary clove stain-activation sachet",
    ],
    signatureMotifs: ["Ring Frame Lace", "Petal Mandalas", "Linear Cuffs", "Micro Florals"],
    recommendedTiming: "24 – 36 hours prior to ring exchange ceremony",
    imageUrl: "/images/service-engagement.webp",
  },
  {
    id: "sangeet-haldi-guests",
    slug: "sangeet-haldi-guests",
    title: "Sangeet & Haldi Guests",
    subtitle: "Luxury fast-paced artistry for bridesmaids, mothers, and esteemed guests",
    tag: "Celebration Entourage",
    duration: "4 – 6 hours (Per Event)",
    startingPrice: "₹11,999",
    shortDescription: "Dedicated artist station delivering high-end, rapid yet refined palm and wrist designs for your close circle and wedding attendees.",
    longDescription: "Elevate your Mehndi and Sangeet celebrations with an interactive henna bar staffed by our master team. Guests choose from curated lookbooks featuring contemporary Arabic cuffs, delicate mandalas, and elegant half-hand compositions.",
    features: [
      "Accommodates 15 to 40 guests with immaculate precision",
      "Curated physical lookbook for instant guest inspiration",
      "Only 100% natural, fresh organic henna used for all attendees",
      "Includes aftercare lemon-sugar mist station for guests",
    ],
    signatureMotifs: ["Palm Mandalas", "Floral Bel", "Wrist Cuffs", "Geometric Finger Rings"],
    recommendedTiming: "During the daytime Mehndi or evening Sangeet soirée",
    imageUrl: "/images/service-sangeet.webp",
  },
  {
    id: "arabic-couture",
    slug: "arabic-mehndi",
    title: "Contemporary Arabic",
    subtitle: "Bold flowing floral bel, distinct negative space, and modern wrist cuffs",
    tag: "Bold & Fluid",
    duration: "1.5 – 2.5 hours",
    startingPrice: "₹3,499",
    shortDescription: "Signature sweeping vines, high-contrast petal shading, and expansive skin breathing room.",
    longDescription: "Arabic henna is defined by its architectural confidence. Rather than dense, microscopic fills, this style uses thick outlines contrasted against delicate diagonal shading, leaving generous negative space that makes hands appear elongated and regal.",
    features: [
      "Sweeping diagonal palm and backhand composition",
      "High-contrast shading with natural brown gradations",
      "Quick drying, ideal for cocktail events and modern attire",
    ],
    signatureMotifs: ["Gulf Roses", "Trailing Bel Vines", "Shaded Petals", "Curved Leaf Clusters"],
    recommendedTiming: "24 – 48 hours prior to occasion",
    imageUrl: "/images/service-arabic.webp",
  },
  {
    id: "indo-arabic-fusion",
    slug: "indo-arabic-mehndi",
    title: "Indo-Arabic Fusion",
    subtitle: "Intricate Indian jaal work merged harmoniously with fluid Arabic floral contours",
    tag: "Royal Fusion",
    duration: "2.5 – 3.5 hours",
    startingPrice: "₹4,999",
    shortDescription: "The best of both worlds: dense Indian grid geometry paired with dramatic Arabic floral focal points.",
    longDescription: "A sophisticated harmony of two grand traditions. The core panels feature classic Indian micro-checks and peacock motifs, surrounded by bold, flowing Arabic leafy arches that frame the wrist and fingers.",
    features: [
      "Both sides of hands up to lower forearm",
      "Fine check jaal, lotus buds, and bold outline contrast",
      "Highly photogenic under ambient banquet lighting",
    ],
    signatureMotifs: ["Interlocking Jaal", "Gulf Leaves", "Peacock Medallions", "Shaded Florals"],
    recommendedTiming: "36 – 48 hours prior to celebration",
    imageUrl: "/images/service-indo-arabic.webp",
  },
  {
    id: "baby-shower-maternity",
    slug: "baby-shower-mehndi",
    title: "Baby Shower & Maternity",
    subtitle: "Therapeutic lavender-infused soothing henna for Godh Bharai ceremonies",
    tag: "Sacred Blessing",
    duration: "2 – 3 hours",
    startingPrice: "₹5,999",
    shortDescription: "Gentle organic henna crafted specially for expectant mothers, featuring cradle and floral blessing motifs.",
    longDescription: "Celebrate the sacred milestone of motherhood with a calming, therapeutic session. We formulate a specialized paste using only cooling organic lavender and chamomile essential oils, avoiding strong terpenes.",
    features: [
      "Hands, feet, or graceful belly mandala blessing art",
      "Specially formulated mild organic paste safe for expectant mothers",
      "Serene, unhurried pacing with relaxing seating adjustments",
    ],
    signatureMotifs: ["Mother-Child Silhouette", "Lotus Bloom", "Cradle Vines", "Sunburst Mandala"],
    recommendedTiming: "1 – 2 days prior to the Godh Bharai / Baby Shower gathering",
    imageUrl: "/images/service-babyshower.webp",
  },
  {
    id: "festive-occasions",
    slug: "festive-mehndi",
    title: "Festive (Karwa Chauth / Teej)",
    subtitle: "Celebratory seasonal adornment for Karwa Chauth, Haryali Teej, Eid, and Diwali",
    tag: "Festive Splendor",
    duration: "1 – 2 hours",
    startingPrice: "₹2,499",
    shortDescription: "Vibrant traditional palm mandalas and delicate dorsal vines for auspicious festive evenings.",
    longDescription: "Welcome the festive seasons with authentic ceremonial stains. Whether observing the Karwa Chauth moon or celebrating Haryali Teej swings, our fast-drying artisan henna ensures rich dark color for your festive puja photography.",
    features: [
      "Both hands (palms & backs) with festive motifs",
      "Moon and sieve silhouettes, sacred marigold motifs",
      "Home visit slots and festival atelier pop-up bookings",
    ],
    signatureMotifs: ["Karwa Moon Silhouette", "Teej Swings", "Diya & Lotus", "Mandala Palms"],
    recommendedTiming: "1 day prior to festival day",
    imageUrl: "/images/service-festive.webp",
  },
  {
    id: "kids-little-maidens",
    slug: "kids-mehndi",
    title: "Kids & Little Maidens",
    subtitle: "Quick-drying mini mandalas, playful butterflies, and 100% gentle organic paste",
    tag: "Gentle & Playful",
    duration: "15 – 30 minutes",
    startingPrice: "₹999",
    shortDescription: "Sweet, fast, and child-safe organic henna designs crafted for restless little hands.",
    longDescription: "Designed for young girls and flower maidens who want to participate in the wedding joy without having to sit still for hours. Completely free of harsh chemicals, utilizing pure organic henna that washes off gently.",
    features: [
      "Cute 5-to-10 minute rapid application per hand",
      "Playful motifs: butterflies, blooming florets, fairy stars, mini mandalas",
      "Zero chemical stinging, 100% food-grade organic ingredients",
    ],
    signatureMotifs: ["Fluttering Butterflies", "Mini Sunflower", "Starry Vines", "Tiny Finger Cuffs"],
    recommendedTiming: "Day of the function or preceding evening",
    imageUrl: "/images/service-kids.webp",
  },
];
