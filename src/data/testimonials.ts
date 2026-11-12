export type TestimonialServiceCategory = "mehndi" | "makeup" | "parlour" | "combo";

export interface TestimonialItem {
  id: string;
  brideName: string;
  occasion: string;
  serviceCategory: TestimonialServiceCategory;
  serviceTag: string;
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
    occasion: "Royal Palace Wedding",
    serviceCategory: "mehndi",
    serviceTag: "Mehndi Art",
    weddingDate: "February 2026",
    venue: "Umaid Bhawan Palace",
    city: "Jodhpur",
    quote: "The symmetry was hypnotic. Our photographer spent an hour photographing only my hands. Four days later on our wedding morning, the stain was an unreal deep espresso mahogany.",
    fullReview: "Kashish and her atelier brought a rare sense of quiet serenity to what is usually a hectic wedding week. She sat with me patiently for seven hours, crafting our love story across my forearms. The portrait of our dog tucked into the jaal was the crowning surprise. Truly royal artistry.",
    packageTaken: "Royal Bridal Mehndi",
    rating: 5,
    featured: true,
  },
  {
    id: "test-2",
    brideName: "Aanya Chawla",
    occasion: "Grand Ballroom Reception",
    serviceCategory: "makeup",
    serviceTag: "Bridal Makeup",
    weddingDate: "January 2026",
    venue: "The Oberoi",
    city: "New Delhi",
    quote: "My Airbrush makeup didn't budge through 8 hours of dancing, tears, and pheras. Absolutely flawless weightless glass-skin that felt like my own skin.",
    fullReview: "I wanted clean glass skin that felt weightless and natural, not a heavy mask. Kashish used Dior Backstage and Temptu airbrush; it felt like a second skin. My eye makeup and floral bridal bun were praised by literally every single guest. Best bridal beauty decision ever.",
    packageTaken: "Airbrush Royale Bridal Makeup",
    rating: 5,
    featured: true,
  },
  {
    id: "test-3",
    brideName: "Dr. Radhika Sharma",
    occasion: "Destination Wedding & Sangeet",
    serviceCategory: "combo",
    serviceTag: "Bridal Combo",
    weddingDate: "November 2025",
    venue: "Grand Hyatt",
    city: "Gurugram",
    quote: "Having Kashish handle both my bridal mehndi and wedding day makeup made my bridal week completely stress-free. The synergy across all events was unmatched.",
    fullReview: "Instead of dealing with multiple uncoordinated vendors, Kashish's team handled my pre-bridal salon treatments at their GK-1 studio, my mehndi at home, and my HD makeup at the venue. Everything looked cohesive, regal, and elegant.",
    packageTaken: "Imperial Royal Heritage Combo",
    rating: 5,
    featured: true,
  },
  {
    id: "test-4",
    brideName: "Devika & Arjun Mehta",
    occasion: "Heritage Marwar Wedding",
    serviceCategory: "mehndi",
    serviceTag: "Mehndi Art",
    weddingDate: "December 2025",
    venue: "The Leela Palace",
    city: "New Delhi",
    quote: "Completely natural, smelled heavenly of pure tea tree and eucalyptus. Zero burning, unmatched stain longevity that lasted well into our Maldives honeymoon.",
    fullReview: "Having sensitive skin, I was terrified of chemical cones. Kashish mixed the henna freshly in front of us from raw Sojat leaves and botanical oils. Not only was the experience soothing and cool, but the color deepened into a gorgeous burgundy espresso.",
    packageTaken: "Imperial Royal Heritage Mehndi",
    rating: 5,
    featured: true,
  },
  {
    id: "test-5",
    brideName: "Natasha Kapoor-Bhasin",
    occasion: "Cocktail & Evening Sangeet",
    serviceCategory: "makeup",
    serviceTag: "Bridal Makeup",
    weddingDate: "January 2026",
    venue: "ITC Maurya",
    city: "New Delhi",
    quote: "She listened to my vision for modern editorial glam when every other artist insisted on heavy traditional layers. Clean, radiant and Vogue-ready.",
    fullReview: "I wanted something that felt editorial, like a Vogue bridal feature to match my contemporary Sabyasachi outfit. Kashish understood immediately. Her skin prep and precision had all my international bridesmaids in awe.",
    packageTaken: "Royal Couture Velvet Glam",
    rating: 5,
    featured: true,
  },
  {
    id: "test-6",
    brideName: "Rhea Malhotra",
    occasion: "Pre-Bridal Skincare Prep",
    serviceCategory: "parlour",
    serviceTag: "Studio Parlour",
    weddingDate: "October 2025",
    venue: "GK-1 Private Studio",
    city: "New Delhi",
    quote: "The 7-Day Pre-Bridal package transformed my skin texture completely. The studio is pristine, ultra-private, and so calming.",
    fullReview: "Their private studio in GK-1 is a sanctuary. The 24K Gold facial, Rica waxing, and rose milk mani-pedi left my skin glowing like never before. My hands were perfectly prepped for my bridal mehndi the next day.",
    packageTaken: "7-Day Imperial Pre-Bridal Package",
    rating: 5,
    featured: false,
  },
  {
    id: "test-7",
    brideName: "Jasleen Kaur Sethi",
    occasion: "Anand Karaj & Pheras",
    serviceCategory: "combo",
    serviceTag: "Bridal Combo",
    weddingDate: "March 2026",
    venue: "Taj Palace Diplomatic Enclave",
    city: "New Delhi",
    quote: "From my pre-bridal hair spa to my heavy dupatta pinning and dark mehndi cones, Kashish's team treated me like family.",
    fullReview: "My chunni didn't move an inch during the entire four-hour Anand Karaj ceremony. Kashish's draping precision and calming presence kept me grounded. The henna stain was the talk of our family.",
    packageTaken: "Noor-e-Kashish Luxury Trousseau",
    rating: 5,
    featured: true,
  },
  {
    id: "test-8",
    brideName: "Pooja Singhal",
    occasion: "Bridal Hair & Nail Spa",
    serviceCategory: "parlour",
    serviceTag: "Studio Parlour",
    weddingDate: "November 2025",
    venue: "GK-1 Studio Atelier",
    city: "New Delhi",
    quote: "The honey caramel balayage and acrylic nail extensions matched my engagement solitaire ring with jaw-dropping elegance.",
    fullReview: "Kashish's parlour team gave me the smoothest balayage and mirror-shine keratin blowout. The French ombré nails with micro-crystals stayed intact throughout the entire wedding week.",
    packageTaken: "Bridal Hair & Acrylic Nail Spa",
    rating: 5,
    featured: false,
  },
];
