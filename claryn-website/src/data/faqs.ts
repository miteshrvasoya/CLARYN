import type { FAQ } from '@/types';

export const faqCategories = [
  'Products',
  'Water Quality',
  'Installation',
  'Maintenance',
  'Warranty',
  'Purchasing',
  'Technical',
];

export const faqs: FAQ[] = [
  // ── Products ──
  {
    id: 'faq-membrane-life',
    category: 'Products',
    displayOrder: 1,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'How long does a CLARYN RO membrane last?',
    answer: 'A CLARYN RO membrane typically lasts 12–24 months under normal residential use, depending on your source water quality, daily consumption, and pre-filter maintenance. In areas with very high TDS (above 1500 ppm) or high iron content, the membrane may need replacement closer to 12 months. Regularly replacing your sediment and carbon pre-filters every 3–6 months significantly extends membrane life.',
  },
  {
    id: 'faq-compatibility',
    category: 'Products',
    displayOrder: 2,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'Which RO systems are CLARYN membranes compatible with?',
    answer: 'CLARYN membranes use the industry-standard 1.8" x 12" (for 75 GPD) form factor and are compatible with virtually all major Indian RO brands including Kent, Aquaguard, Pureit, Livpure, HUL, and most generic RO systems. Always verify your system\'s membrane size and GPD rating before purchasing. If unsure, contact us — we\'ll help you confirm compatibility.',
  },
  {
    id: 'faq-tds-after',
    category: 'Products',
    displayOrder: 3,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'What TDS should I expect from my purified water?',
    answer: 'The exact output TDS depends on your source water TDS and the membrane\'s current salt rejection rate. As a guide: if your source water is 500 ppm, a healthy membrane at 98% rejection will produce water around 10 ppm. At 1000 ppm source, output will be approximately 20 ppm. The WHO guideline for drinking water TDS is below 500 ppm; many experts recommend below 150–200 ppm for RO output. Note: extremely low TDS (below 50 ppm) is sometimes a concern — consult a water specialist for your specific situation.',
  },
  {
    id: 'faq-75-vs-100',
    category: 'Products',
    displayOrder: 4,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'Should I choose the 75 GPD or 100 GPD membrane?',
    answer: '75 GPD is suitable for most households of up to 4–5 people with normal daily water consumption and TDS up to 1500 ppm. Choose 100 GPD if you have 6+ family members, very high daily water demand, or very high source water TDS (above 1500 ppm), as the higher capacity ensures adequate throughput. When in doubt, the 100 GPD is rarely a wrong choice for residential use.',
  },

  // ── Water Quality ──
  {
    id: 'faq-what-is-tds',
    category: 'Water Quality',
    displayOrder: 1,
    relatedProductIds: [],
    question: 'What is TDS and why does it matter?',
    answer: 'TDS (Total Dissolved Solids) measures the total concentration of dissolved substances in water — including minerals, salts, metals, and organic matter — expressed in parts per million (ppm) or milligrams per litre (mg/L). High TDS can affect taste, smell, and — depending on what the dissolved solids are — may include harmful contaminants. An RO membrane is specifically designed to reduce TDS. You can measure your water\'s TDS at home with an inexpensive TDS meter.',
  },
  {
    id: 'faq-hard-water',
    category: 'Water Quality',
    displayOrder: 2,
    relatedProductIds: [],
    question: 'What is hard water and is it harmful?',
    answer: 'Hard water contains elevated levels of dissolved calcium and magnesium. While hard water is generally not harmful to health, it causes scale buildup in appliances, affects cooking and taste, and can damage RO systems over time if pre-treatment is not adequate. An RO membrane significantly reduces hardness. If your area has extremely hard water (above 600 ppm calcium carbonate), a water softener installed before the RO may be recommended.',
  },
  {
    id: 'faq-borewell-water',
    category: 'Water Quality',
    displayOrder: 3,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'Can CLARYN membranes handle borewell water?',
    answer: 'Yes. CLARYN membranes are rated for source water TDS up to 2000 ppm, which covers most Indian borewell water conditions. However, borewell water with very high iron or sediment content requires effective pre-filtration (sediment and carbon filters) before the membrane — otherwise pre-filter clogging and premature membrane fouling are likely. Always check your source water TDS before choosing a membrane.',
  },

  // ── Installation ──
  {
    id: 'faq-installation',
    category: 'Installation',
    displayOrder: 1,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'Can I install a CLARYN membrane myself?',
    answer: 'Yes — membrane replacement is generally a DIY-friendly task. You typically only need to shut off the feed water, depressurize the housing, remove the old membrane, insert the new one (ensuring correct orientation), reassemble, and flush the system for 15–20 minutes. Our step-by-step installation guide walks you through every step with photos. If you\'re not comfortable, a local water technician can complete it in 15–30 minutes.',
  },
  {
    id: 'faq-install-tools',
    category: 'Installation',
    displayOrder: 2,
    relatedProductIds: [],
    question: 'What tools do I need to install the membrane?',
    answer: 'Most membrane replacements require minimal tools: a membrane housing wrench (usually supplied with your RO system), a bucket or towel, and clean hands. You do not need any special plumbing equipment. Refer to our installation guide for the full tool list specific to your membrane model.',
  },

  // ── Maintenance ──
  {
    id: 'faq-replacement-freq',
    category: 'Maintenance',
    displayOrder: 1,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'How do I know when my membrane needs replacing?',
    answer: 'Key indicators include: (1) TDS rejection drops significantly — use a TDS meter before and after the membrane; if rejection falls below 90%, replacement is recommended. (2) Purified water flow becomes noticeably slower despite clean pre-filters. (3) The membrane has been in service 12–24 months. (4) Water tastes or smells different despite clean filters. Testing your output TDS regularly with a TDS meter is the most reliable method.',
  },
  {
    id: 'faq-pre-filter',
    category: 'Maintenance',
    displayOrder: 2,
    relatedProductIds: [],
    question: 'Why are pre-filters important for membrane life?',
    answer: 'Sediment and activated carbon pre-filters protect your membrane from physical particles and chlorine, respectively. A clogged sediment filter restricts flow, raising pressure and stress on the membrane. Chlorine and chloramines in municipal water chemically degrade TFC membranes. Replacing pre-filters every 3–6 months (depending on water quality) is one of the most important things you can do to extend membrane life.',
  },

  // ── Warranty ──
  {
    id: 'faq-warranty-claim',
    category: 'Warranty',
    displayOrder: 1,
    relatedProductIds: [],
    question: 'How do I make a warranty claim?',
    answer: 'Visit claryn.in/warranty/claim and fill in the online form. You\'ll need: your name, contact details, purchase date and platform, product model, and a description of the issue (photos/video helpful). Our team reviews claims within 2–3 business days. Registering your product at claryn.in/register-product speeds up the process significantly.',
  },

  // ── Purchasing ──
  {
    id: 'faq-where-to-buy',
    category: 'Purchasing',
    displayOrder: 1,
    relatedProductIds: ['claryn-100-gpd-2500tds', 'claryn-100-gpd-5layer'],
    question: 'Where can I buy CLARYN products?',
    answer: 'CLARYN products are available on Amazon India and Flipkart. Visit the product page for direct links to each marketplace. We do not currently sell directly through this website — all purchases are completed on the marketplace of your choice. Only purchase from the official CLARYN brand store to ensure genuine products and warranty coverage.',
  },
];

export function getFAQsForProduct(productId: string): FAQ[] {
  const product = { faqIds: [] as string[] };
  // Dynamically find product faq IDs — import products separately to avoid circular deps
  return faqs.filter((f) => f.relatedProductIds.includes(productId));
}

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter((f) => f.category === category).sort((a, b) => a.displayOrder - b.displayOrder);
}
