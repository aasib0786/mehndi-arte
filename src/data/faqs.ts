export interface FAQItem {
  id: string;
  category: "booking" | "preparation" | "aftercare" | "destination";
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "booking",
    question: "How far in advance should I reserve my wedding date?",
    answer: "Because we take only one bespoke bridal commission per calendar day to ensure unhurried perfection, peak autumn and winter wedding dates (October through February) often book 6 to 9 months in advance. We recommend reaching out as soon as your wedding venue is finalized.",
  },
  {
    id: "faq-2",
    category: "preparation",
    question: "What ingredients are in your henna paste?",
    answer: "We formulate 100% organic artisan henna paste in-house. It contains only triple-cloth-sifted Lawsonia Inermis (henna leaves sourced straight from Sojat, Rajasthan), filtered water, organic cane sugar, and therapeutic-grade essential oils (eucalyptus, tea tree, and cajeput). Never any PPD, chemical dyes, kerosene, or synthetic preservatives.",
  },
  {
    id: "faq-3",
    category: "preparation",
    question: "When should the bridal henna ceremony take place?",
    answer: "Optimal timing is 48 hours prior to your wedding day ceremonies (Pheras / Anand Karaj / Nikah / Reception). Natural henna follows a 48-hour oxidation cycle: peeling off as bright pumpkin orange, maturing into a deep ruby red on day 2, and reaching peak dark mahogany on day 3.",
  },
  {
    id: "faq-4",
    category: "aftercare",
    question: "What aftercare regimen is required for the darkest stain?",
    answer: "We provide an artisan bridal aftercare balm with every commission. Key rules: keep the paste on for at least 6 to 8 hours (or overnight with breathable hypafix tape), gently scrape off with coconut oil instead of washing with water, keep hands dry for the first 18-24 hours, and warm your hands over gently heated clove fumes.",
  },
  {
    id: "faq-5",
    category: "destination",
    question: "Do you travel for destination weddings outside Delhi NCR?",
    answer: "Yes, we regularly travel across India (Udaipur, Jaipur, Goa, Mussoorie, Kerala) and internationally (UAE, Europe, Southeast Asia) for destination celebrations. For destination commissions, client provisions include direct return flights, local transfers, and secure hotel accommodation.",
  },
  {
    id: "faq-6",
    category: "booking",
    question: "How do we incorporate personalized elements into my bridal design?",
    answer: "During your bespoke pre-wedding design consultation (via video call or studio meeting), you can share your favorite motifs, couple monograms, portrait references, city skylines of where you first met, pet silhouettes, or significant religious verses to weave seamlessly into your heirloom composition.",
  },
];

