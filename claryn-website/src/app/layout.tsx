import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800'],
  variable: '--font-poppins',
  display: 'swap',
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
  logo: `${siteConfig.url}/brand/logo/brand-logo.png`,
  description: siteConfig.description,
  brand: { '@type': 'Brand', name: 'CLARYN' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={poppins.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
