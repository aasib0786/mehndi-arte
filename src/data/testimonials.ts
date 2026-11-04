export interface TestimonialItem {
  id: string;
  brideName: string;
  weddingDate: string;
  venue: string;
  city: string;
  quote: string;
  fullReview: string;
  packageTaken: string;
  rating: number;
  featured: boolean;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    brideName: "Meera Singhania",
    weddingDate: "February 2026",
    venue: "Umaid Bhawan Palace",
    city: "Jodhpur",
    quote: "The symmetry was hypnotic. Our photographer spent an hour photographing only my hands.",
    fullReview: "Aasib and his team brought a rare sense of quiet serenity to what is usually a hectic wedding week. He sat with me patiently for seven hours, crafting our love story across my forearms. The portrait of our dog tucked into the jaal was the crowning surprise. Four days later on our wedding morning, the stain was an unreal deep espresso mahogany. Truly royal artistry.",
    packageTaken: "The Heirloom Imperial",
    rating: 5,
    featured: true,
  },
  {
    id: "test-2",
    brideName: "Devika & Arjun Mehta",
    weddingDate: "December 2025",
    venue: "The Leela Palace",
    city: "New Delhi",
    quote: "Completely natural, smelled heavenly of pure tea tree and eucalyptus. Zero burning, unmatched stain.",
    fullReview: "Having sensitive skin, I was terrified of chemical cones. Aasib mixed the henna freshly in front of us from raw Sojat leaves and botanical oils. Not only was the experience soothing and cool, but the color deepened into a gorgeous burgundy that lasted well into our Maldives honeymoon. He is a master of his craft.",
    packageTaken: "The Classic Bridal",
    rating: 5,
    featured: true,
  },
  {
    id: "test-3",
    brideName: "Natasha Kapoor-Bhasin",
    weddingDate: "January 2026",
    venue: "ITC Maurya",
    city: "New Delhi",
    quote: "He listened to my vision for modern negative space when every other artist insisted on old heavy fill.",
    fullReview: "I wanted something that felt editorial, like lace gloves made of henna to match my contemporary Sabyasachi outfit. Aasib understood immediately. The precision of his fine lines (less than half a millimeter!) had all my international bridesmaids in awe.",
    packageTaken: "The Minimalist Muse",
    rating: 5,
    featured: true,
  },
  {
    id: "test-4",
    brideName: "Dr. Radhika Sharma",
    weddingDate: "November 2025",
    venue: "Grand Hyatt",
    city: "Gurugram",
    quote: "Punctual, graceful, and profoundly talented. The entire family is still raving about him.",
    fullReview: "Booking Aasib was the smoothest vendor decision of my wedding. He arrived at our farmhouse exactly on time with all his artisan tools. My mother and sisters were done swiftly with immaculate care. Worth every single rupee.",
    packageTaken: "The Heirloom Imperial",
    rating: 5,
    featured: false,
  },
];

