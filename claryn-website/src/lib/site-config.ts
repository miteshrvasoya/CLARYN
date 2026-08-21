// ─── CLARYN Site Configuration ────────────────────────────────────────────────
// All placeholder values are clearly marked. Replace with real values before launch.
// Never invent contact details, social URLs, or legal terms.

export const siteConfig = {
  name:        'CLARYN',
  tagline:     'Clear Water. Clearer Life.',
  description: 'CLARYN is a water solutions and water technology brand by Udarta Watertech Private Limited. Premium RO membranes, water purification systems, and smart water technology for Indian homes and businesses.',
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claryn.in',
  ogImage:     '/og-image.jpg',

  company: {
    name:         'Udarta Watertech Private Limited',
    brand:        'CLARYN',
    cin:          '[CIN TO BE PROVIDED]',
    gst:          '[GST NUMBER TO BE PROVIDED]',
  },

  // [PLACEHOLDER] Replace with real contact details before launch
  contact: {
    email:   process.env.NEXT_PUBLIC_CONTACT_EMAIL   ?? '',
    phone:   process.env.NEXT_PUBLIC_CONTACT_PHONE   ?? '',
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? '',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP       ?? '',
  },

  // [PLACEHOLDER] Replace with real social URLs before launch. Never invent these.
  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? '',
    facebook:  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK  ?? '',
    youtube:   process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE   ?? '',
    linkedin:  process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN  ?? '',
    x:         process.env.NEXT_PUBLIC_SOCIAL_X         ?? '',
  },

  nav: {
    main: [
      {
        label: 'Products',
        href:  '/products',
        children: [
          { label: 'RO Membranes',         href: '/products?category=ro-membranes',  tag: 'Live' },
          { label: 'RO Systems',           href: '/products?category=ro-systems',    tag: 'Coming Soon' },
          { label: 'Water Filters',        href: '/products?category=filters',       tag: 'Coming Soon' },
          { label: 'Pumps & Boosters',     href: '/products?category=pumps',         tag: 'Coming Soon' },
          { label: 'Water Testing',        href: '/products?category=testing',       tag: 'Coming Soon' },
          { label: 'Smart Water',          href: '/products?category=smart-water',   tag: 'Coming Soon' },
          { label: 'Commercial & Industrial', href: '/products?category=commercial', tag: 'Coming Soon' },
          { label: 'Find Your Solution',   href: '/find-your-solution' },
        ],
      },
      {
        label: 'Water Knowledge',
        href:  '/learn',
        children: [
          { label: 'Water Quality Basics', href: '/learn?category=water-quality' },
          { label: 'RO Technology',        href: '/learn?category=ro-technology' },
          { label: 'TDS & Hard Water',     href: '/learn?category=tds-hard-water' },
          { label: 'Installation & Maintenance', href: '/learn?category=maintenance' },
          { label: 'Water Safety',         href: '/learn?category=water-safety' },
          { label: 'Browse All Articles',  href: '/learn' },
        ],
      },
      {
        label: 'Installation',
        href:  '/installation',
      },
      {
        label: 'Support',
        href:  '/support',
        children: [
          { label: 'Support Center',      href: '/support' },
          { label: 'FAQ',                 href: '/faq' },
          { label: 'Warranty',            href: '/warranty' },
          { label: 'Register Product',    href: '/register-product' },
          { label: 'Contact Us',          href: '/contact' },
        ],
      },
      {
        label: 'About',
        href:  '/about',
        children: [
          { label: 'About CLARYN',       href: '/about' },
          { label: 'Udarta Watertech',   href: '/company' },
          { label: 'Blog',               href: '/blog' },
          { label: 'Resources',          href: '/resources' },
        ],
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
