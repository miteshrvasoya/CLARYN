import type { Metadata } from 'next';
import { Public_Sans, Fraunces, IBM_Plex_Mono, Poppins, Raleway } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
/* ScrollClarityIndicator removed — new design uses section-level scroll storytelling */
import { siteConfig } from '@/lib/site-config';

// ─── CLARYN Official Brand Fonts (from Pack.png spec: Poppins / Raleway) ─────

// Primary body: Poppins — matches CLARYN wordmark style, highly legible
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
});

// Display / headings: Raleway — matches brand tagline "CLEAR WATER. CLEARER LIFE."
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Poppins', 'system-ui', 'sans-serif'],
  preload: true,
});

// Mono: IBM Plex Mono — kept for TDS readouts, spec labels, eyebrows
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['Courier New', 'monospace'],
  preload: false,
});

// ─── Legacy aliases kept for remaining pages that reference --font-primary ───
const publicSans = Poppins({   // re-export Poppins as --font-primary alias
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-primary',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
});
const fraunces = Raleway({     // re-export Raleway as --font-secondary alias
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-secondary',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
});


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline} | Water Solutions & Water Technology`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['RO membrane', 'water purifier', 'water purification', 'water solutions', 'water technology', 'CLARYN', 'Udarta Watertech', 'reverse osmosis', 'water filter India'],
  authors: [{ name: 'CLARYN by Udarta Watertech Private Limited' }],
  creator: 'CLARYN',
  publisher: 'Udarta Watertech Private Limited',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: '/brand/logo/monogram.png', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/logo/monogram.png', type: 'image/png' },
    ],
    shortcut: '/brand/logo/brand-logo-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'CLARYN — Clear Water. Clearer Life.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: '/' },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CLARYN',
  legalName: 'Udarta Watertech Private Limited',
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/logo/primary-brand-logo.png`,
  description: siteConfig.description,
  brand: { '@type': 'Brand', name: 'CLARYN' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${publicSans.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${poppins.variable} ${raleway.variable}`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <Navbar />
        {/* Scroll storytelling is now handled per-section */}
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
