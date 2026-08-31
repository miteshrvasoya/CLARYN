import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { faqs } from '@/data/faqs';
import { ChevronRight, ShieldCheck, Download, ExternalLink, CheckCircle } from 'lucide-react';
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
  const productFAQs = faqs.filter(f => product.faqIds.includes(f.id));
  const activeMarketplaces = product.marketplaceLinks
    .filter(m => m.isActive && m.availability === 'in_stock')
    .sort((a, b) => a.displayOrder - b.displayOrder);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} aria-hidden />
            <Link href="/products">Products</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} aria-hidden />
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left: Interactive Image Gallery */}
            <div>
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Product Summary */}
            <div>
              <span className={styles.heroModel}>{product.model}</span>
              <h1 className={styles.heroTitle}>{product.name}</h1>
              <p className={styles.heroDesc}>{product.shortDescription}</p>

              <div className={styles.heroSpecsGrid}>
                {[
                  [`${product.specs.gpd}`, 'GPD'],
                  [`${product.specs.membraneLayers}`, 'Layers'],
                  [`${product.specs.saltRejectionPercent}%`, 'Rejection'],
                  [`${product.specs.maxTDS}`, 'Max TDS ppm'],
                ].map(([val, label]) => (
                  <div key={label} className={styles.heroSpecItem}>
                    <p className={styles.heroSpecValue}>{val}</p>
                    <p className={styles.heroSpecLabel}>{label}</p>
                  </div>
                ))}
              </div>

              <div className={styles.heroActions}>
                {activeMarketplaces.map(m => (
                  <a key={m.id} href={m.url} className={`btn btn--primary ${m.marketplaceName === 'Amazon India' ? styles.amazonBtn : ''}`} target="_blank" rel="noopener noreferrer">
                    {m.ctaLabel} <ExternalLink size={14} aria-hidden style={{ marginLeft: '4px' }} />
                  </a>
                ))}
                <Link href="/register-product" className="btn btn--outline-white">
                  Register Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Main Column */}
            <div className={styles.mainColumn}>
              {/* Product Description */}
              <section>
                <h2 className={styles.blockTitle}>Product Overview</h2>
                <p style={{ color: 'var(--color-gray-700)', fontSize: '1.125rem', lineHeight: 1.8 }}>
                  {product.longDescription}
                </p>
              </section>

              {/* Key Benefits */}
              <section>
                <h2 className={styles.blockTitle}>Key Benefits</h2>
                <ul className={styles.checkList}>
                  {product.benefits.map(b => (
                    <li key={b} className={styles.checkListItem}>
                      <CheckCircle size={20} className={styles.checkListItemIcon} aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Applications & Suitable For */}
              <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 className={styles.blockTitle} style={{ fontSize: '1.25rem' }}>Applications</h3>
                  <div className={styles.tagsList}>
                    {product.applications.map(a => (
                      <span key={a} className={styles.tag}>{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={styles.blockTitle} style={{ fontSize: '1.25rem' }}>Ideal For</h3>
                  <ul className={styles.checkList} style={{ gap: '0.75rem' }}>
                    {product.suitableFor.map(s => (
                      <li key={s} className={styles.checkListItem} style={{ padding: '0.75rem', fontSize: '0.9375rem', background: 'transparent' }}>
                        <CheckCircle size={18} className={styles.checkListItemIcon} aria-hidden />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Tech Specs Table */}
              <section>
                <h2 className={styles.blockTitle}>Technical Specifications</h2>
                <div className={styles.specTableWrapper}>
                  <table className={styles.specTable}>
                    <thead>
                      <tr>
                        <th>Specification</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Model', product.model],
                        ['Flow Rate (GPD)', product.specs.gpd ? `${product.specs.gpd} GPD` : 'TBC'],
                        ['Membrane Layers', product.specs.membraneLayers ? String(product.specs.membraneLayers) : 'TBC'],
                        ['Salt Rejection', product.specs.saltRejectionPercent ? `Up to ${product.specs.saltRejectionPercent}%` : 'TBC'],
                        ['Membrane Material', product.specs.membraneMaterial ?? 'TBC'],
                        ['Maximum Feed TDS', product.specs.maxTDS ? `${product.specs.maxTDS} ppm` : 'TBC'],
                        ['Operating Pressure', product.specs.operatingPressure ?? 'TBC'],
                        ['Operating Temperature', product.specs.operatingTemperature ?? 'TBC'],
                        ['Dimensions', product.specs.dimensions ?? 'TBC'],
                        ['Weight', product.specs.weight ?? 'TBC'],
                        ['Warranty', product.specs.warrantyPeriod ?? '12 months'],
                      ].map(([label, value]) => (
                        <tr key={label}>
                          <td className={styles.specTableLabel}>{label}</td>
                          <td className={styles.specTableValue}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* FAQs */}
              {productFAQs.length > 0 && (
                <section>
                  <h2 className={styles.blockTitle}>Frequently Asked Questions</h2>
                  <div className={styles.faqList}>
                    {productFAQs.map(faq => (
                      <div key={faq.id} className={styles.faqCard}>
                        <h3 className={styles.faqQuestion}>{faq.question}</h3>
                        <p className={styles.faqAnswer}>{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Downloads */}
              {product.downloads.length > 0 && (
                <section>
                  <h2 className={styles.blockTitle}>Downloads</h2>
                  <div className={styles.downloadList}>
                    {product.downloads.map(d => (
                      <a key={d.id} href={d.fileUrl} className="btn btn--outline" download>
                        <Download size={16} aria-hidden style={{ marginRight: '6px' }} /> {d.label}
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className={styles.sidebar}>
              {/* Buy CTA Card */}
              <div className={styles.purchaseCard}>
                <h3 className={styles.purchaseCardTitle}>Purchase Options</h3>
                <div className={styles.purchaseOptions}>
                  {activeMarketplaces.map(m => (
                    <a key={m.id} href={m.url} className={`btn btn--primary ${m.marketplaceName === 'Amazon India' ? styles.amazonBtn : ''}`} target="_blank" rel="noopener noreferrer">
                      {m.ctaLabel} <ExternalLink size={14} aria-hidden style={{ marginLeft: '4px' }} />
                    </a>
                  ))}
                </div>
                <div className={styles.warrantyNote}>
                  <ShieldCheck size={18} className={styles.warrantyNoteIcon} aria-hidden />
                  <p className={styles.warrantyNoteText}>
                    12-month manufacturer warranty. Register your product after purchase to activate.
                  </p>
                </div>
              </div>

              {/* Register */}
              <div className={styles.sidebarWidget}>
                <h3 className={styles.sidebarWidgetTitle}>Register Your Product</h3>
                <p className={styles.sidebarWidgetDesc}>
                  Activate your warranty and get maintenance reminders.
                </p>
                <Link href="/register-product" className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Register Now
                </Link>
              </div>

              {/* Installation */}
              {product.installationGuideSlug && (
                <div className={styles.sidebarWidget}>
                  <h3 className={styles.sidebarWidgetTitle}>Installation Guide</h3>
                  <p className={styles.sidebarWidgetDesc}>
                    Step-by-step guide with photos. Most installations take under 30 minutes.
                  </p>
                  <Link href={`/installation/${product.installationGuideSlug}`} className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>
                    View Guide
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
