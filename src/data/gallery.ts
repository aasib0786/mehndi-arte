export interface GalleryItem {
  id: string;
  title: string;
  category: "bridal" | "feet" | "minimal" | "sangeet" | "portraits";
  categoryLabel: string;
  brideName: string;
  venueOrCity: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  stainTone: string;
  year: string;
  storyNote: string;
}

export const galleryCategories = [
  { id: "all", label: "Complete Archive" },
  { id: "bridal", label: "Royal Bridal" },
  { id: "portraits", label: "Custom Portraits & Baraat" },
  { id: "feet", label: "Feet & Payal Artistry" },
  { id: "minimal", label: "Contemporary & Negative Space" },
  { id: "sangeet", label: "Sangeet & Entourage" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "The Jodhpur Jharokha Bridal Palms",
    category: "bridal",
    categoryLabel: "Royal Bridal",
    brideName: "Meera & Siddharth",
    venueOrCity: "Umaid Bhawan, Jodhpur",
    image: "/images/gallery-1.jpg",
    aspectRatio: "portrait",
    stainTone: "Deep Mahogany",
    year: "2026",
    storyNote: "Hand-penciled archways mirroring the palace courtyard, completed over seven uninterrupted hours.",
  },
  {
    id: "gal-2",
    title: "Sacred Peacocks & Fluted Domes",
    category: "portraits",
    categoryLabel: "Custom Portraits",
    brideName: "Ananya & Rohan",
    venueOrCity: "The Leela Palace, New Delhi",
    image: "/images/gallery-2.jpg",
    aspectRatio: "square",
    stainTone: "Rich Espresso Henna",
    year: "2026",
    storyNote: "Featuring micro-etched bride & groom silhouettes hidden within interlocking floral jaal.",
  },
  {
    id: "gal-3",
    title: "Floating Lotus Feet & Regal Payal",
    category: "feet",
    categoryLabel: "Feet & Payal Artistry",
    brideName: "Rhea & Kabir",
    venueOrCity: "Taj Lake Palace, Udaipur",
    image: "/images/gallery-3.jpg",
    aspectRatio: "portrait",
    stainTone: "Warm Chestnut to Deep Brown",
    year: "2025",
    storyNote: "Symmetrical mandala centerpieces with fine ankle chains resembling gold filigree anklets.",
  },
  {
    id: "gal-4",
    title: "Lace Glove Negative Space Illusion",
    category: "minimal",
    categoryLabel: "Contemporary & Negative Space",
    brideName: "Natasha & Armaan",
    venueOrCity: "Aerocity, New Delhi",
    image: "/images/gallery-4.jpg",
    aspectRatio: "landscape",
    stainTone: "Red Mahogany",
    year: "2026",
    storyNote: "Deliberate breathability allowing skin tones to frame crisp botanical leaf veins.",
  },
  {
    id: "gal-5",
    title: "The Baraat Procession Forearm Sleeve",
    category: "portraits",
    categoryLabel: "Custom Portraits",
    brideName: "Devika & Arjun",
    venueOrCity: "ITC Grand Bharat, Gurugram",
    image: "/images/gallery-5.jpg",
    aspectRatio: "portrait",
    stainTone: "Dark Cherry Henna",
    year: "2025",
    storyNote: "Elephants with royal hawdahs, shehnai players, and royal standard banners along the bride's right arm.",
  },
  {
    id: "gal-6",
    title: "Sangeet Palm Mandalas for the Sisterhood",
    category: "sangeet",
    categoryLabel: "Sangeet & Entourage",
    brideName: "The Kapoor Entourage",
    venueOrCity: "Chattarpur Farms, Delhi",
    image: "/images/gallery-6.jpg",
    aspectRatio: "square",
    stainTone: "Golden Brown to Maroon",
    year: "2026",
    storyNote: "Speedy 15-minute couture cuffs designed for dancing, dining, and celebratory ring displays.",
  },
  {
    id: "gal-7",
    title: "Botanical Finger Tracery & Solitaire Frame",
    category: "minimal",
    categoryLabel: "Contemporary & Negative Space",
    brideName: "Ishita & Varun",
    venueOrCity: "Oberoi Sukhvilas, Chandigarh",
    image: "/images/gallery-7.jpg",
    aspectRatio: "portrait",
    stainTone: "Deep Mahogany",
    year: "2025",
    storyNote: "Fine 0.3mm cone stroke lines that draw every eye toward the heirloom diamond band.",
  },
  {
    id: "gal-8",
    title: "Midnight Mandala Bridal Dorsal",
    category: "bridal",
    categoryLabel: "Royal Bridal",
    brideName: "Pooja & Sameer",
    venueOrCity: "Fairmont, Jaipur",
    image: "/images/gallery-8.jpg",
    aspectRatio: "portrait",
    stainTone: "Deep Maroon-Burgundy",
    year: "2026",
    storyNote: "Concentric sacred geometry layered with blooming jasmine tendrils wrapping around wrist bones.",
  },
];

