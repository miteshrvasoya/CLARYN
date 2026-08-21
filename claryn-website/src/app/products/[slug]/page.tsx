import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { faqs } from '@/data/faqs';
import { ChevronRight, ShieldCheck, Download, ExternalLink, CheckCircle } from 'lucide-react';

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

  const related   = getRelatedProducts(product.id);
  const productFAQs = faqs.filter(f => product.faqIds.includes(f.id));
  const activeMarketplaces = product.marketplaceLinks.filter(m => m.isActive && m.availability === 'in_stock')
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

      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 2.5rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <div className="breadcrumb__item"><Link href="/" className="breadcrumb__link" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link><ChevronRight size={14} className="breadcrumb__separator" /></div>
            <div className="breadcrumb__item"><Link href="/products" className="breadcrumb__link" style={{ color: 'rgba(255,255,255,0.5)' }}>Products</Link><ChevronRight size={14} className="breadcrumb__separator" /></div>
            <div className="breadcrumb__item"><span className="breadcrumb__current" style={{ color: 'rgba(255,255,255,0.85)' }}>{product.name}</span></div>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-blue-300)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{product.model}</span>
              <h1 style={{ color: 'var(--color-white)', fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>{product.name}</h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-lg)', lineHeight: 1.7, marginBottom: 'var(--space-6)', maxWidth: 500 }}>{product.shortDescription}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-8)', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
                {[
                  [`${product.specs.gpd}`, 'GPD'],
                  [`${product.specs.membraneLayers}`, 'Layers'],
                  [`${product.specs.saltRejectionPercent}%`, 'Rejection'],
                  [`${product.specs.maxTDS}`, 'Max TDS ppm'],
                ].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 'clamp(1.25rem,2vw,1.75rem)', fontWeight: 800, color: 'var(--color-white)', fontFamily: 'var(--font-secondary)', lineHeight: 1 }}>{n}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginTop: 'var(--space-1)' }}>{l}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {activeMarketplaces.map(m => (
                  <a key={m.id} href={m.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                    {m.ctaLabel} <ExternalLink size={14} aria-hidden />
                  </a>
                ))}
                <Link href="/register-product" className="btn btn--outline-white">Register Product</Link>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', minHeight: 300 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--color-blue-300)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>CLARYN</p>
                <p style={{ fontSize: 'clamp(4rem,8vw,6rem)', fontWeight: 800, color: 'var(--color-white)', fontFamily: 'var(--font-secondary)', lineHeight: 1 }}>{product.specs.gpd}</p>
                <p style={{ color: 'var(--color-blue-300)', fontWeight: 600, marginTop: 'var(--space-2)' }}>GPD Membrane</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>Product image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: 'var(--space-16)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-12)', alignItems: 'start' }}>
          <div>
            {/* Key Benefits */}
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Key Benefits</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {product.benefits.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>
                    <CheckCircle size={18} style={{ color: 'var(--color-teal)', flexShrink: 0, marginTop: 3 }} aria-hidden />{b}
                  </li>
                ))}
              </ul>
            </section>

            {/* Applications */}
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Applications</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {product.applications.map(a => (
                  <span key={a} style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-blue-50)', color: 'var(--color-navy)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{a}</span>
                ))}
              </div>
            </section>

            {/* Suitable For */}
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Who Is This For?</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {product.suitableFor.map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>
                    <CheckCircle size={18} style={{ color: 'var(--color-blue)', flexShrink: 0, marginTop: 3 }} aria-hidden />{s}
                  </li>
                ))}
              </ul>
            </section>

            {/* Tech Specs Table */}
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Technical Specifications</h2>
              <div className="spec-table-wrapper">
                <table className="spec-table">
                  <thead><tr><th>Specification</th><th>Value</th></tr></thead>
                  <tbody>
                    {[
                      ['Model',                  product.model],
                      ['Flow Rate (GPD)',         product.specs.gpd ? `${product.specs.gpd} GPD` : 'Specification to be confirmed'],
                      ['Membrane Layers',         product.specs.membraneLayers ? String(product.specs.membraneLayers) : 'Specification to be confirmed'],
                      ['Salt Rejection',          product.specs.saltRejectionPercent ? `Up to ${product.specs.saltRejectionPercent}%` : 'Specification to be confirmed'],
                      ['Membrane Material',       product.specs.membraneMaterial ?? 'Specification to be confirmed'],
                      ['Maximum Feed TDS',        product.specs.maxTDS ? `${product.specs.maxTDS} ppm` : 'Specification to be confirmed'],
                      ['Operating Pressure',      product.specs.operatingPressure ?? 'Specification to be confirmed'],
                      ['Operating Temperature',   product.specs.operatingTemperature ?? 'Specification to be confirmed'],
                      ['Dimensions',              product.specs.dimensions ?? 'Specification to be confirmed'],
                      ['Weight',                  product.specs.weight ?? 'Specification to be confirmed'],
                      ['Warranty',                product.specs.warrantyPeriod ?? '12 months'],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="spec-table__label">{label}</td>
                        <td className="spec-table__value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Compatibility */}
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Compatibility</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {(product.specs.compatibility ?? []).map(c => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} aria-hidden />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            {productFAQs.length > 0 && (
              <section style={{ marginBottom: 'var(--space-12)' }}>
                <h2 style={{ marginBottom: 'var(--space-6)' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {productFAQs.map(faq => (
                    <div key={faq.id} style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)', padding: 'var(--space-5)' }}>
                      <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>{faq.question}</h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.8 }}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Downloads */}
            {product.downloads.length > 0 && (
              <section style={{ marginBottom: 'var(--space-12)' }}>
                <h2 style={{ marginBottom: 'var(--space-5)' }}>Downloads</h2>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  {product.downloads.map(d => (
                    <a key={d.id} href={d.fileUrl} className="btn btn--outline" download>
                      <Download size={16} aria-hidden />{d.label}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 2rem)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Buy CTA */}
            <div style={{ background: 'var(--color-navy)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', color: 'var(--color-white)' }}>
              <h3 style={{ color: 'var(--color-white)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Purchase Options</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {activeMarketplaces.map(m => (
                  <a key={m.id} href={m.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>
                    {m.ctaLabel} <ExternalLink size={14} aria-hidden />
                  </a>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-teal)', flexShrink: 0, marginTop: 2 }} aria-hidden />
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>12-month warranty. Register your product after purchase to activate.</p>
              </div>
            </div>

            {/* Register */}
            <div style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy)', marginBottom: 'var(--space-2)' }}>Register Your Product</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>Activate your warranty and get maintenance reminders.</p>
              <Link href="/register-product" className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>Register Now</Link>
            </div>

            {/* Installation */}
            {product.installationGuideSlug && (
              <div style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy)', marginBottom: 'var(--space-2)' }}>Installation Guide</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>Step-by-step guide with photos. Most installations take under 30 minutes.</p>
                <Link href={`/installation/${product.installationGuideSlug}`} className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>View Installation Guide</Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-16)', borderTop: '1px solid var(--color-gray-200)' }}>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Related Products</h2>
            <div className="grid-2">
              {related.map(rp => (
                <div key={rp.id} style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>
                  <div style={{ flexShrink: 0, width: 80, height: 80, background: 'var(--color-blue-50)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-blue)', fontFamily: 'var(--font-secondary)' }}>{rp.specs.gpd}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', marginBottom: 'var(--space-1)' }}>{rp.model}</p>
                    <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>{rp.name}</h3>
                    <Link href={`/products/${rp.slug}`} className="btn btn--outline btn--sm">View Product</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
