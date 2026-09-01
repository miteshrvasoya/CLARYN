import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { faqs } from '@/data/faqs';
import { ChevronRight, ShieldCheck, ExternalLink, Download, CheckCircle } from 'lucide-react';
import { ProductGallery } from '@/components/products/ProductGallery';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.id);
  const productFAQs = faqs.filter(f => product.faqIds.includes(f.id)).slice(0, 4);
  const activeMarketplaces = product.marketplaceLinks
    .filter(m => m.isActive && m.availability === 'in_stock')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const amazonLink = activeMarketplaces.find(m => m.marketplaceName === 'Amazon India');

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: 'CLARYN' },
    model: product.model,
    sku: product.model,
    offers: activeMarketplaces.map(m => ({
      '@type': 'Offer',
      seller: { '@type': 'Organization', name: m.marketplaceName },
      url: m.url,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
    })),
  };

  // Condense key specs (only non-null, most important)
  const keySpecs = [
    { label: 'GPD', value: `${product.specs.gpd ?? '—'}` },
    { label: 'Layers', value: `${product.specs.membraneLayers ?? '—'}` },
    { label: 'Rejection', value: `${product.specs.saltRejectionPercent ?? '—'}%` },
    { label: 'Max TDS', value: `${product.specs.maxTDS ?? '—'} ppm` },
  ];

  // Feature highlights — short, chip-style
  const highlights = product.benefits.slice(0, 6).map(b => {
    // Just use the first clause before the dash
    return b.split('—')[0].split(' — ')[0].trim();
  });

  // Care / usage tips from applications
  const careTips = [
    'Install membrane in the correct direction inside a compatible housing.',
    'Flush the membrane as recommended before regular use.',
    'Use sediment and carbon pre-filters to protect the membrane.',
    'Check inlet water pressure and pre-filter condition regularly.',
  ];

  // Full spec table rows
  const allSpecs = [
    ['Brand', 'CLARYN'],
    ['Model Number', product.model],
    ['Capacity', product.specs.gpd ? `${product.specs.gpd} GPD` : null],
    ['Membrane Layers', product.specs.membraneLayers ? `${product.specs.membraneLayers} Layer` : null],
    ['Salt Rejection', product.specs.saltRejectionPercent ? `Up to ${product.specs.saltRejectionPercent}%` : null],
    ['Material', product.specs.membraneMaterial ?? null],
    ['Max Feed Water TDS', product.specs.maxTDS ? `Up to ${product.specs.maxTDS} ppm` : null],
    ['Dimensions', product.specs.dimensions ?? null],
    ['Weight', product.specs.weight ?? null],
    ['Warranty', product.specs.warrantyPeriod ?? '12 months'],
  ].filter(([, v]) => v !== null) as [string, string][];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className={styles.page}>

        {/* ── Hero: Gallery + Info ──────────────────────────────────────── */}
        <div className="container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} className={styles.breadcrumbSep} aria-hidden />
            <Link href="/products">Products</Link>
            <ChevronRight size={13} className={styles.breadcrumbSep} aria-hidden />
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>

          <div className={styles.pdpGrid}>
            {/* Gallery */}
            <div className={styles.galleryWrapper}>
              <ProductGallery
                images={product.images}
                productName={product.name}
                badge={amazonLink?.badge}
              />
            </div>

            {/* Product Info */}
            <div className={styles.infoCol}>
              {/* Eyebrow */}
              <div className={styles.productEyebrow}>
                <span className={styles.productBrand}>CLARYN</span>
                <span className={styles.productModel}>{product.model}</span>
              </div>

              {/* Title */}
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.productBlurb}>{product.shortDescription}</p>

              {/* Key Metrics */}
              <div className={styles.metricsRow}>
                {keySpecs.map(({ label, value }) => (
                  <div key={label} className={styles.metricItem}>
                    <span className={styles.metricValue}>{value}</span>
                    <span className={styles.metricLabel}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Buy Section */}
              <div className={styles.buySection}>
                <p className={styles.buySectionTitle}>Where to Buy</p>
                <div className={styles.platformList}>
                  {activeMarketplaces.map(m => (
                    <a
                      key={m.id}
                      href={m.url}
                      className={`${styles.platformCard} ${m.marketplaceName === 'Amazon India' ? styles.platformCardAmazon : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.ctaLabel} — opens in new tab`}
                    >
                      <div className={styles.platformInfo}>
                        <p className={styles.platformName}>{m.marketplaceName}</p>
                        <p className={styles.platformCta}>
                          {m.ctaLabel}
                          <ExternalLink size={14} aria-hidden />
                        </p>
                      </div>
                      <ChevronRight size={18} style={{ color: '#CBD5E1', flexShrink: 0 }} />
                    </a>
                  ))}
                </div>

                {/* Warranty Strip */}
                <div className={styles.warrantyStrip}>
                  <ShieldCheck size={16} className={styles.warrantyIcon} aria-hidden />
                  <span>12-month manufacturer warranty · Register product after purchase to activate</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className={styles.features}>
                {highlights.map((h, i) => (
                  <div key={i} className={styles.featureChip}>
                    <span className={styles.featureChipDot} aria-hidden />
                    {h}
                  </div>
                ))}
              </div>

              {/* Compatibility */}
              {(product.specs.compatibility ?? []).length > 0 && (
                <div className={styles.compatSection}>
                  <p className={styles.compatTitle}>Compatible With</p>
                  <div className={styles.compatTags}>
                    {(product.specs.compatibility ?? []).map(c => (
                      <span key={c} className={styles.compatTag}>{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Full Specs ────────────────────────────────────────────────── */}
        <div className={styles.specsSection}>
          <div className="container">
            <p className={styles.sectionEyebrow}>Technical Data</p>
            <h2 className={styles.sectionTitle}>Specifications</h2>
            <div className={styles.specsGrid}>
              {allSpecs.map(([label, value]) => (
                <div key={label} className={styles.specRow}>
                  <span className={styles.specLabel}>{label}</span>
                  <span className={styles.specValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Care & Usage ──────────────────────────────────────────────── */}
        <div className={styles.careSection}>
          <div className="container">
            <p className={styles.sectionEyebrow}>Usage Guide</p>
            <h2 className={styles.sectionTitle}>Installation & Care</h2>
            <div className={styles.careGrid}>
              {careTips.map((tip, i) => (
                <div key={i} className={styles.careCard}>
                  <p className={styles.careCardNum}>0{i + 1}</p>
                  <p className={styles.careCardText}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQs ─────────────────────────────────────────────────────── */}
        {productFAQs.length > 0 && (
          <div className={styles.faqSection}>
            <div className="container">
              <p className={styles.sectionEyebrow}>Common Questions</p>
              <h2 className={styles.sectionTitle}>FAQs</h2>
              <div className={styles.faqList}>
                {productFAQs.map(faq => (
                  <div key={faq.id} className={styles.faqItem}>
                    <h3 className={styles.faqQ}>{faq.question}</h3>
                    <p className={styles.faqA}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Footer CTA ───────────────────────────────────────────────── */}
        <div className={styles.footerCta}>
          <div className="container">
            <h2 className={styles.footerCtaTitle}>Improve Your RO Performance</h2>
            <p className={styles.footerCtaDesc}>
              {product.name} — engineered for India&apos;s water. Replace your membrane today.
            </p>
            <div className={styles.footerCtaActions}>
              {amazonLink && (
                <a
                  href={amazonLink.url}
                  className={styles.amazonCta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} aria-hidden />
                  Buy on Amazon.in
                </a>
              )}
              <Link href="/register-product" className={styles.registerCta}>
                Register Your Product
              </Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              Performance claims such as TDS handling and salt rejection are subject to suitable operating conditions and regular purifier maintenance.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
