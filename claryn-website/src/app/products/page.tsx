import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products — RO Membranes & Water Solutions',
  description: 'Browse CLARYN\'s range of premium water purification products including RO membranes, water filters, and systems. Engineered for Indian water conditions.',
};

const CATEGORIES = ['All','ro-membranes','ro-systems','filters','pumps','testing','smart-water','commercial'];

export default function ProductsPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Product Catalog</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Water Solutions for Every Need</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
            Precision-engineered water purification products for Indian homes and businesses. More categories launching soon.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 600, border: '1.5px solid var(--color-gray-300)', background: cat === 'All' ? 'var(--color-blue)' : 'transparent', color: cat === 'All' ? '#fff' : 'var(--color-gray-700)', cursor: 'pointer', textTransform: cat === 'All' ? 'none' : 'capitalize' }}>
                {cat === 'All' ? 'All Products' : cat.replace(/-/g,' ')}
              </button>
            ))}
          </div>

          {/* Live Products */}
          <div className="grid-2" style={{ marginBottom: 'var(--space-12)' }}>
            {products.filter(p => p.status === 'active').map(product => (
              <div key={product.id} style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--color-white)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ background: 'linear-gradient(135deg,#e0f0fb,#f9fafb)', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-secondary)', lineHeight: 1 }}>{product.specs.gpd}</p>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-blue)', fontWeight: 600 }}>GPD</p>
                  </div>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>{product.model}</p>
                  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>{product.name}</h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>{product.shortDescription}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
                    {[`${product.specs.gpd} GPD`,`${product.specs.membraneLayers} Layer`,`${product.specs.saltRejectionPercent}% Rejection`,`${product.specs.maxTDS} ppm Max TDS`].map(s => (
                      <span key={s} style={{ padding: '3px 10px', background: 'var(--color-blue-50)', color: 'var(--color-blue)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <Link href={`/products/${product.slug}`} className="btn btn--primary">View Details</Link>
                    {product.marketplaceLinks.filter(m=>m.isActive&&m.availability==='in_stock').map(m => (
                      <a key={m.id} href={m.url} className="btn btn--outline" target="_blank" rel="noopener noreferrer">{m.ctaLabel}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-2xl)', border: '1px dashed var(--color-gray-300)' }}>
            <h3 style={{ color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>More Products Coming Soon</h3>
            <p style={{ color: 'var(--color-gray-600)', maxWidth: 500, margin: '0 auto var(--space-6)' }}>RO Systems, Water Filters, Pumps, Water Testing, Smart Water, and Commercial Solutions are in development.</p>
            <Link href="/register-product" className="btn btn--primary">Register Now to Get Notified <ArrowRight size={16} aria-hidden /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
