export type FaqCategory = "mehndi" | "makeup" | "parlour" | "booking" | "general";

export interface FAQItem {
  id: string;
  category: "mehndi" | "makeup" | "parlour";
  categoryLabel: string;
  topic: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  // ================= 1. MEHNDI ART (4 Questions) =================
  {
    id: "faq-stain-darkness",
    category: "mehndi",
    categoryLabel: "Mehndi Art",
    topic: "stain darkness",
    question: "How dark will my bridal mehndi stain get, and when does it reach peak color?",
    answer: "Natural organic henna follows a 48-hour natural oxidation curve. Upon peeling, the stain begins as a bright warm golden-orange. Over the following 24 to 48 hours, body warmth and natural air exposure deepen the lawsone pigment into a rich, dark cherry and deep mahogany espresso tone. For this reason, we strictly recommend scheduling your bridal henna ceremony 48 hours before your wedding vows (Pheras / Nikah / Reception) so your stain is at its deepest on your wedding day.",
  },
  {
    id: "faq-organic-henna",
    category: "mehndi",
    categoryLabel: "Mehndi Art",
    topic: "organic henna",
    question: "Are your cones 100% organic and free of PPD, kerosene, or synthetic chemical dyes?",
    answer: "Yes, without exception. We formulate our paste completely in-house using raw Lawsonia Inermis leaves sourced directly from Sojat, Rajasthan, triple-cloth-sifted for micro-fine needle consistency. We mix it solely with filtered water, organic cane sugar, and therapeutic-grade essential oils (eucalyptus, tea tree, and cajeput). We never use synthetic preservatives, black dye, kerosene, or PPD. Our paste is 100% skin-safe, fragrant, cooling, and safe for sensitive skin.",
  },
  {
    id: "faq-aftercare",
    category: "mehndi",
    categoryLabel: "Mehndi Art",
    topic: "aftercare",
    question: "What is the recommended aftercare routine to get the deepest stain and avoid fading?",
    answer: "Keep the paste on for 6 to 8 hours (or overnight). Do NOT wash hands with water. Instead, gently scrape off the dried crust using a blunt butter knife or coconut oil. Apply our complimentary herbal clove-infused balm or Vicks/mustard oil to seal pores. Gently warm your hands over roasted clove smoke (lavang bhaf) for 2–3 minutes. Strictly avoid water contact, lemon juice on raw skin, swimming pools, soap, and hand sanitizers for the first 24 hours.",
  },
  {
    id: "faq-how-early-to-book",
    category: "mehndi",
    categoryLabel: "Mehndi Art",
    topic: "how early to book",
    question: "How early in advance should I book my bridal mehndi and wedding dates?",
    answer: "Because Master Artist Kashish accepts strictly ONLY ONE bride per calendar day to ensure undivided, unhurried focus, auspicious wedding dates (especially October through March and summer Muhurats) fill up 3 to 6 months in advance. We recommend reaching out as soon as your wedding venue and dates are finalized. A modest 25% retainer locks your date exclusively.",
  },

  // ================= 2. BRIDAL & PARTY MAKEUP (4 Questions) =================
  {
    id: "faq-makeup-brands",
    category: "makeup",
    categoryLabel: "Bridal Makeup",
    topic: "makeup brands used",
    question: "Which luxury makeup brands do you use, and is hairstyling and draping included?",
    answer: "All our bridal and party makeup packages are comprehensive and fully inclusive of bespoke hairstyling (floral gajra buns, contemporary waves, Russian volume braids), false eyelash application, colored lenses assistance, and complete saree/lehenga dupatta draping. We exclusively work with luxury prestige cosmetics: Charlotte Tilbury, MAC, Dior Backstage, NARS, Huda Beauty, Kryolan Professional, and Temptu Airbrush.",
  },
  {
    id: "faq-hd-vs-airbrush",
    category: "makeup",
    categoryLabel: "Bridal Makeup",
    topic: "HD vs airbrush",
    question: "What is the difference between HD Makeup and Airbrush Makeup, and which should I choose?",
    answer: "HD Makeup uses ultra-fine micro-milled cream and liquid foundations blended seamlessly with brushes and beauty sponges, ideal for all skin types and high-definition 4K photography. Airbrush Makeup uses a compressed micro-mist gun (Temptu Pro) to spray a silicone-based veil that is 100% waterproof, tear-resistant, and sweat-proof. Airbrush is especially recommended for summer weddings, emotional pheras, and long outdoor shoots.",
  },
  {
    id: "faq-trial-charges",
    category: "makeup",
    categoryLabel: "Bridal Makeup",
    topic: "trial charges",
    question: "Do you offer makeup & hairstyling trials before booking, and what are the charges?",
    answer: "Yes, we offer paid studio trials at our Greater Kailash I atelier. During the trial, we analyze your skin undertones, test foundation shades on half your face, try your preferred eye makeup, and test hair textures. If you confirm your bridal booking with us, 50% of the trial fee is credited directly toward your final bridal package invoice.",
  },
  {
    id: "faq-early-morning-outstation",
    category: "makeup",
    categoryLabel: "Bridal Makeup",
    topic: "early-morning and outstation charges",
    question: "Are there extra charges for early-morning pheras (before 7 AM) or outstation destination weddings?",
    answer: "For early-morning calls requiring our team to arrive before 7:00 AM (e.g. dawn pheras or early Anand Karaj), a nominal early-morning conveyance allowance applies (₹1,500 – ₹2,500 depending on location). For outstation destination weddings across Rajasthan, Goa, UAE, and beyond, client arranges flight/train travel, local transfers, and secure hotel lodging for the artist and assistant.",
  },

  // ================= 3. STUDIO PARLOUR & LOGISTICS (4 Questions) =================
  {
    id: "faq-parlour-appointment",
    category: "parlour",
    categoryLabel: "Studio Parlour",
    topic: "parlour appointment vs walk-in",
    question: "Can I walk in for parlour services or is an appointment strictly required?",
    answer: "To preserve our calm, private salon experience and zero-waiting atmosphere, services at our Greater Kailash I atelier are by prior appointment only. This ensures our aesthetician and private treatment suite are sterilized, prepped, and exclusively reserved for your dedicated time slot. You can book same-day slots via WhatsApp if a seat is open.",
  },
  {
    id: "faq-hygiene-disposable-kits",
    category: "parlour",
    categoryLabel: "Studio Parlour",
    topic: "hygiene and disposable kits",
    question: "What hygiene protocols, sanitization, and disposable kits do you use in your parlour?",
    answer: "Hygiene is our highest priority. We use single-use disposable bed sheets, sterile disposable waxing spatulas (strictly zero double-dipping in wax pots), sanitized stainless steel tools autoclaved after every client, fresh sealed sponges, disposable mascara wands, and 99.9% alcohol brush cleansers between every makeup application.",
  },
  {
    id: "faq-travel-charges",
    category: "parlour",
    categoryLabel: "Studio Parlour",
    topic: "travel charges",
    question: "What are your travel charges for doorstep home visits across Delhi NCR?",
    answer: "Doorstep home visits are available across South Delhi, Central Delhi, Gurugram, Noida, and Greater Noida for bridal mehndi and makeup bookings. Within South Delhi, travel is completely complimentary. For Gurugram, Noida, and West/North Delhi, nominal cab conveyance (Uber at actuals) is added to the invoice with full upfront transparency.",
  },
  {
    id: "faq-advance-payment",
    category: "parlour",
    categoryLabel: "Studio Parlour",
    topic: "advance payment",
    question: "What is the advance payment token to confirm my booking, and what are the payment terms?",
    answer: "A 25% non-refundable advance retainer is required to officially block and reserve your wedding date on our master calendar. The remaining 75% balance is payable on the event date upon completion of services. We accept UPI (Google Pay, PhonePe, Paytm), NEFT/RTGS bank transfers, and major credit cards.",
  },
];
