import type { Product } from '@/types';

// ─── CLARYN Product Data ───────────────────────────────────────────────────────
// Only real/confirmed specs are populated. Unconfirmed specs use null.
// Do NOT fabricate specifications — leave as null and they render as "To be confirmed".

export const products: Product[] = [
  {
    id: 'claryn-100-gpd-2500tds',
    slug: 'claryn-100-gpd-2500tds-ro-membrane',
    name: 'CLARYN 100 GPD RO Membrane (2500 TDS)',
    model: 'CLR-RO-100-15L-2500',
    category: 'ro-membranes',
    subcategory: 'residential',
    status: 'active',

    shortDescription:
      '15-Layer High-Performance Membrane for Domestic RO Water Purifiers. Helps reduce dissolved salts and impurities from input water up to 2500 TDS.',

    longDescription:
      'Bring consistent RO purification performance to your compatible water purifier with the CLARYN 100 GPD RO Membrane. Designed for domestic RO systems, it helps reduce dissolved salts and impurities from input water while supporting steady purified-water flow. Suitable for input water up to 2500 TDS, this 15-layer polyamide membrane is an effective replacement option for compatible residential RO purifiers.',

    images: [
      'https://m.media-amazon.com/images/I/51RjdlRnyPL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61LWxPC6bGL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71lQzbUbb7L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61hj+gAx+6L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71teKNi6uGL._SL1254_.jpg',
      'https://m.media-amazon.com/images/I/71dCrCv+NWL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71rfLYGgkVL._SL1254_.jpg',
    ],

    specs: {
      gpd: 100,
      membraneLayers: 15,
      maxTDS: 2500,
      saltRejectionPercent: 99,
      membraneMaterial: 'Polyamide',
      operatingPressure: '40–80 PSI (recommended)',
      operatingTemperature: '4°C – 45°C',
      dimensions: '5.5 × 5.5 × 28 cm',
      weight: '270 g',
      flowRate: null, // [SPEC TO BE CONFIRMED]
      compatibility: ['Compatible domestic and residential RO water purifiers', 'Requires 100 GPD support', 'Requires compatible membrane housing and fittings'],
      warrantyPeriod: '12 months',
    },

    benefits: [
      '100 GPD capacity: Designed to support efficient purified-water output in compatible domestic RO systems',
      'Suitable up to 2500 TDS: Built for input-water conditions up to 2500 TDS',
      '15-layer membrane design: Multi-layer construction supports effective reverse-osmosis filtration',
      'Up to 99% salt rejection: Designed to reduce dissolved salts and impurities',
      'High active membrane area: Optimised membrane surface supports steady purified-water flow',
      'Made in India: Manufactured in India with quality construction standards',
    ],

    applications: [
      'Domestic RO replacement filter for residential RO water purifiers',
    ],

    suitableFor: [
      'Input water up to 2500 TDS',
      'Regular domestic water-purifier replacement requirements',
    ],

    installationGuideSlug: 'ro-membrane-installation',

    downloads: [
      { id: 'dl-100-2500-ds', label: 'Product Datasheet', fileUrl: '/downloads/claryn-100-gpd-2500tds-datasheet.pdf', type: 'datasheet' },
      { id: 'dl-100-2500-mn', label: 'Installation Manual', fileUrl: '/downloads/claryn-membrane-installation.pdf', type: 'manual' },
    ],

    warrantyPolicyId: 'wp-standard-12m',
    faqIds: ['faq-membrane-life', 'faq-tds-after', 'faq-compatibility', 'faq-installation', 'faq-replacement-freq'],
    relatedProductIds: ['claryn-100-gpd-15layer'],

    marketplaceLinks: [
      {
        id: 'ml-100-2500-amazon',
        productId: 'claryn-100-gpd-2500tds',
        marketplaceName: 'Amazon India',
        url: 'https://www.amazon.in/dp/B0H764PFM9',
        region: 'IN',
        availability: 'in_stock',
        displayOrder: 1,
        ctaLabel: 'Buy on Amazon.in',
        isActive: true,
        badge: 'Available on Amazon',
      }
    ],

    seoTitle: 'CLARYN 100 GPD RO Membrane - Up to 2500 TDS | Buy Online India',
    seoDescription: 'Buy CLARYN 100 GPD RO Membrane for domestic purifiers. Suitable up to 2500 TDS, 15-layer polyamide construction, up to 99% salt rejection. Available on Amazon India.',
  },

  {
    id: 'claryn-100-gpd-15layer',
    slug: 'claryn-100-gpd-ro-membrane',
    name: 'CLARYN 100 GPD RO Membrane',
    model: 'UW-CLPR-25-15-100-21',
    category: 'ro-membranes',
    subcategory: 'residential-high-capacity',
    status: 'active',

    shortDescription:
      'High-Flow RO Membrane for Domestic Water Purifiers. 15-layer polyamide membrane designed for dependable purification in high-TDS water conditions up to 4000 ppm.',

    longDescription:
      'Upgrade your compatible domestic RO water purifier with the CLARYN 100 GPD RO Membrane. Designed for dependable purification in high-TDS water conditions, this 15-layer polyamide membrane helps reduce dissolved salts and impurities while supporting consistent purified-water flow. Replacing an ageing membrane can help restore purifier performance, improve flow, and support effective RO filtration.',

    images: [
      'https://m.media-amazon.com/images/I/51T7FHEffFL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71dCrCv+NWL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71dOB3eI9dL._SL1254_.jpg',
      'https://m.media-amazon.com/images/I/714uQ821dPL._SL1254_.jpg',
      'https://m.media-amazon.com/images/I/61HzajsO+DL._SL1254_.jpg',
      'https://m.media-amazon.com/images/I/71rfLYGgkVL._SL1254_.jpg',
    ],

    specs: {
      gpd: 100,
      membraneLayers: 15,
      maxTDS: 4000,
      saltRejectionPercent: 99,
      membraneMaterial: 'Polyamide',
      operatingPressure: '40–80 PSI (recommended)',
      operatingTemperature: '4°C – 45°C',
      dimensions: '5.5 x 5.5 x 28 cm',
      weight: '270 g',
      flowRate: null, // [SPEC TO BE CONFIRMED]
      compatibility: ['Suitable as a replacement membrane for most compatible domestic RO water purifiers'],
      warrantyPeriod: '12 months',
    },

    benefits: [
      '100 GPD high-flow performance for efficient purified-water output',
      'Designed for input water conditions up to 4000 ppm TDS',
      'Up to 99% salt rejection under suitable operating conditions',
      '15-layer membrane construction for consistent filtration performance',
      'Durable polyamide material for dependable membrane performance',
      'Easy replacement in compatible membrane housings',
    ],

    applications: [
      'Domestic RO water purifier membrane replacement',
      'Areas with hard or high-TDS water',
      'Improving purifier output flow after an old membrane has worn out',
      'Users seeking a 100 GPD high-flow membrane for compatible systems',
    ],

    suitableFor: [
      'Larger families with higher daily water consumption',
      'High-TDS water conditions (up to 4000 ppm)',
      'Homes where 75 GPD flow is insufficient',
    ],

    installationGuideSlug: 'ro-membrane-installation',

    downloads: [
      { id: 'dl-100-ds', label: 'Product Datasheet', fileUrl: '/downloads/claryn-100-gpd-datasheet.pdf', type: 'datasheet' },
      { id: 'dl-100-mn', label: 'Installation Manual', fileUrl: '/downloads/claryn-membrane-installation.pdf', type: 'manual' },
    ],

    warrantyPolicyId: 'wp-standard-12m',
    faqIds: ['faq-membrane-life', 'faq-tds-after', 'faq-compatibility', 'faq-installation', 'faq-replacement-freq'],
    relatedProductIds: ['claryn-100-gpd-2500tds'],

    marketplaceLinks: [
      {
        id: 'ml-100-amazon',
        productId: 'claryn-100-gpd-15layer',
        marketplaceName: 'Amazon India',
        url: 'https://www.amazon.in/dp/B0H7BHHLP2',
        region: 'IN',
        availability: 'in_stock',
        displayOrder: 1,
        ctaLabel: 'Buy on Amazon.in',
        isActive: true,
        badge: 'Available on Amazon',
      }
    ],

    seoTitle: 'CLARYN 100 GPD RO Membrane | 15-Layer | Up to 4000 ppm',
    seoDescription: 'Upgrade your compatible domestic RO water purifier with the CLARYN 100 GPD RO Membrane. 15-layer polyamide membrane for high-TDS up to 4000 ppm. Buy on Amazon.in.',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products.filter((p) => product.relatedProductIds.includes(p.id));
}
