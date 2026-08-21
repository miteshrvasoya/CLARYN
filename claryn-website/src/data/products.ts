import type { Product } from '@/types';

// ─── CLARYN Product Data ───────────────────────────────────────────────────────
// Only real/confirmed specs are populated. Unconfirmed specs use null.
// Do NOT fabricate specifications — leave as null and they render as "To be confirmed".

export const products: Product[] = [
  {
    id:          'claryn-75-gpd-5layer',
    slug:        'claryn-75-gpd-5-layer-ro-membrane',
    name:        'CLARYN 75 GPD 5-Layer RO Membrane',
    model:       'CLR-RO-75-5L',
    category:    'ro-membranes',
    subcategory: 'residential',
    status:      'active',

    shortDescription:
      'High-performance 75 GPD Thin Film Composite RO membrane with 5-layer construction. Up to 98% salt rejection. Compatible with all standard domestic RO systems.',

    longDescription:
      'The CLARYN 75 GPD 5-Layer RO Membrane is engineered for India\'s diverse water conditions — from municipal supply to borewell water. Its Thin Film Composite (TFC) Polyamide construction delivers consistent purification performance with a rated salt rejection of up to 98%, making it suitable for feed water TDS up to 2000 ppm. The 5-layer membrane architecture provides enhanced structural integrity and longer service life compared to 3-layer alternatives.',

    images: ['/brand/product-placeholder.png'],

    specs: {
      gpd:                  75,
      membraneLayers:       5,
      maxTDS:               2000,
      saltRejectionPercent: 98,
      membraneMaterial:     'Thin Film Composite (TFC) Polyamide',
      operatingPressure:    '40–80 PSI (recommended)',
      operatingTemperature: '4°C – 45°C',
      dimensions:           null, // [SPEC TO BE CONFIRMED]
      weight:               null, // [SPEC TO BE CONFIRMED]
      flowRate:             null, // [SPEC TO BE CONFIRMED]
      compatibility:        ['All standard 75 GPD domestic RO housings', 'Aquaguard compatible', 'Kent compatible', 'Pureit compatible', 'Most Indian domestic RO brands'],
      warrantyPeriod:       '12 months',
    },

    benefits: [
      'Up to 98% salt rejection — consistent purification across varying TDS levels',
      '5-layer TFC construction for greater durability and longer membrane life',
      'Compatible with virtually all standard Indian domestic RO systems',
      'Designed for India\'s water conditions — municipal, borewell, and tanker water',
      'Reduces dissolved solids, heavy metals, fluorides, nitrates, and other contaminants',
      '12-month manufacturer warranty included',
      'Direct replacement — no tools or plumber typically needed',
    ],

    applications: [
      'Residential RO water purifiers',
      'Under-sink RO systems',
      'Counter-top RO units',
      'Small office / home office water purifiers',
      'Membrane replacement in existing RO systems',
    ],

    suitableFor: [
      'Homes with municipal (corporation) water supply',
      'Homes with borewell or tubewell water',
      'Areas with TDS up to 2000 ppm',
      'Users replacing an expired or underperforming membrane',
      'Anyone wanting to upgrade to a higher-quality membrane',
    ],

    installationGuideSlug: 'ro-membrane-installation',

    downloads: [
      { id: 'dl-75-ds', label: 'Product Datasheet', fileUrl: '/downloads/claryn-75-gpd-datasheet.pdf', type: 'datasheet' },
      { id: 'dl-75-mn', label: 'Installation Manual', fileUrl: '/downloads/claryn-membrane-installation.pdf', type: 'manual' },
    ],

    warrantyPolicyId: 'wp-standard-12m',
    faqIds:           ['faq-membrane-life', 'faq-tds-after', 'faq-compatibility', 'faq-installation', 'faq-replacement-freq'],
    relatedProductIds: ['claryn-100-gpd-5layer'],

    marketplaceLinks: [
      {
        id:              'ml-75-amazon',
        productId:       'claryn-75-gpd-5layer',
        marketplaceName: 'Amazon India',
        url:             'https://www.amazon.in/dp/[ASIN-TO-BE-PROVIDED]',
        region:          'IN',
        availability:    'in_stock',
        displayOrder:    1,
        ctaLabel:        'Buy on Amazon',
        isActive:        true,
      },
      {
        id:              'ml-75-flipkart',
        productId:       'claryn-75-gpd-5layer',
        marketplaceName: 'Flipkart',
        url:             'https://www.flipkart.com/[URL-TO-BE-PROVIDED]',
        region:          'IN',
        availability:    'in_stock',
        displayOrder:    2,
        ctaLabel:        'Buy on Flipkart',
        isActive:        true,
      },
    ],

    seoTitle:       'CLARYN 75 GPD 5-Layer RO Membrane | CLR-RO-75-5L | Buy Online India',
    seoDescription: 'Buy CLARYN 75 GPD 5-Layer TFC RO Membrane (CLR-RO-75-5L). Up to 98% salt rejection, compatible with all standard Indian RO systems. 12-month warranty. Available on Amazon & Flipkart.',
  },

  {
    id:          'claryn-100-gpd-5layer',
    slug:        'claryn-100-gpd-5-layer-ro-membrane',
    name:        'CLARYN 100 GPD 5-Layer RO Membrane',
    model:       'CLR-RO-100-5L',
    category:    'ro-membranes',
    subcategory: 'residential-high-capacity',
    status:      'active',

    shortDescription:
      'High-capacity 100 GPD 5-layer TFC RO membrane for larger households and high-demand applications. Up to 98% salt rejection. Ideal for borewell water and high-TDS conditions.',

    longDescription:
      'The CLARYN 100 GPD 5-Layer RO Membrane delivers higher daily purification output for larger families, high-consumption households, or high-TDS borewell water conditions where a standard 75 GPD membrane may not provide sufficient throughput. Built with the same 5-layer TFC Polyamide architecture as the CLARYN 75 GPD, it maintains up to 98% salt rejection while producing more purified water per day.',

    images: ['/brand/product-placeholder.png'],

    specs: {
      gpd:                  100,
      membraneLayers:       5,
      maxTDS:               2000,
      saltRejectionPercent: 98,
      membraneMaterial:     'Thin Film Composite (TFC) Polyamide',
      operatingPressure:    '40–80 PSI (recommended)',
      operatingTemperature: '4°C – 45°C',
      dimensions:           null, // [SPEC TO BE CONFIRMED]
      weight:               null, // [SPEC TO BE CONFIRMED]
      flowRate:             null, // [SPEC TO BE CONFIRMED]
      compatibility:        ['All standard 100 GPD domestic RO housings', 'Most major Indian RO brands with 100 GPD systems'],
      warrantyPeriod:       '12 months',
    },

    benefits: [
      '100 GPD output — 33% more daily purified water than a 75 GPD membrane',
      'Up to 98% salt rejection for consistent, high-quality purification',
      '5-layer TFC construction for durability and long service life',
      'Designed for high-TDS borewell water and large-family use',
      '12-month manufacturer warranty included',
      'Suitable for 6+ member households or high daily consumption',
    ],

    applications: [
      'Large family residential RO systems (6+ members)',
      'High daily water demand households',
      'Borewell or high-TDS water sources',
      'Small commercial applications',
      'Replacement for 100 GPD systems',
    ],

    suitableFor: [
      'Larger families with higher daily water consumption',
      'Borewell water with TDS above 800 ppm',
      'Homes where 75 GPD flow is insufficient',
      'Small offices and commercial kitchens',
    ],

    installationGuideSlug: 'ro-membrane-installation',

    downloads: [
      { id: 'dl-100-ds', label: 'Product Datasheet', fileUrl: '/downloads/claryn-100-gpd-datasheet.pdf', type: 'datasheet' },
      { id: 'dl-100-mn', label: 'Installation Manual', fileUrl: '/downloads/claryn-membrane-installation.pdf', type: 'manual' },
    ],

    warrantyPolicyId: 'wp-standard-12m',
    faqIds:           ['faq-membrane-life', 'faq-tds-after', 'faq-compatibility', 'faq-installation', 'faq-replacement-freq'],
    relatedProductIds: ['claryn-75-gpd-5layer'],

    marketplaceLinks: [
      {
        id:              'ml-100-amazon',
        productId:       'claryn-100-gpd-5layer',
        marketplaceName: 'Amazon India',
        url:             'https://www.amazon.in/dp/[ASIN-TO-BE-PROVIDED]',
        region:          'IN',
        availability:    'in_stock',
        displayOrder:    1,
        ctaLabel:        'Buy on Amazon',
        isActive:        true,
      },
      {
        id:              'ml-100-flipkart',
        productId:       'claryn-100-gpd-5layer',
        marketplaceName: 'Flipkart',
        url:             'https://www.flipkart.com/[URL-TO-BE-PROVIDED]',
        region:          'IN',
        availability:    'in_stock',
        displayOrder:    2,
        ctaLabel:        'Buy on Flipkart',
        isActive:        true,
      },
    ],

    seoTitle:       'CLARYN 100 GPD 5-Layer RO Membrane | CLR-RO-100-5L | High Capacity',
    seoDescription: 'Buy CLARYN 100 GPD 5-Layer TFC RO Membrane (CLR-RO-100-5L). High-capacity membrane for large families and borewell water. 98% salt rejection. 12-month warranty.',
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
