import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Udarta Watertech Private Limited | Parent Company of CLARYN',
  description: 'Udarta Watertech Private Limited is the parent company of CLARYN. Learn about our water technology business, corporate philosophy, and long-term vision.',
};

export default function CompanyPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Corporate</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Udarta Watertech<br />Private Limited</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>The water technology company behind CLARYN.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {/* Corporate Hierarchy */}
          <div style={{ background: 'var(--color-gray-50)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Corporate Structure</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {[
                { label: 'Udarta Watertech Private Limited', sub: 'Parent Company', bg: 'var(--color-navy)', color: '#fff' },
                { label: 'CLARYN', sub: 'Consumer Brand', bg: 'var(--color-blue)', color: '#fff' },
                { label: 'Water Solutions & Technology', sub: 'Products & Services', bg: 'var(--color-blue-50)', color: 'var(--color-navy)' },
              ].map((item, i) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: 2, height: 32, background: 'var(--color-gray-300)' }} />}
                  <div style={{ background: item.bg, color: item.color, padding: 'var(--space-4) var(--space-8)', borderRadius: 'var(--radius-xl)', minWidth: 280, textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: item.color }}>{item.label}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: item.color === '#fff' ? 'rgba(255,255,255,0.65)' : 'var(--color-gray-500)', marginTop: 4 }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={{ marginBottom: 'var(--space-6)' }}>About Udarta Watertech</h2>
            <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
              Udarta Watertech Private Limited is a water technology business incorporated in India with a long-term focus on developing and distributing innovative, reliable, and accessible water solutions for residential, commercial, and industrial applications.
            </p>
            <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
              CLARYN is Udarta Watertech&apos;s primary consumer brand — designed to become a trusted, modern name in the Indian water solutions market and eventually broader markets. The company&apos;s technical and commercial activities are organized under the CLARYN brand for consumer products, with the corporate entity maintained separately for business and regulatory purposes.
            </p>
            <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.8 }}>
              <strong>CIN:</strong> [CIN TO BE PROVIDED] &nbsp;|&nbsp; <strong>GST:</strong> [GST NUMBER TO BE PROVIDED]
            </p>
          </div>

          <div style={{ background: 'var(--color-blue-50)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', border: '1px solid var(--color-blue-200)' }}>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Learn More About CLARYN</h3>
            <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--space-5)', lineHeight: 1.7 }}>CLARYN is our consumer-facing water technology brand. Visit the About CLARYN page for product information, brand values, and mission.</p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Link href="/about" className="btn btn--primary">About CLARYN</Link>
              <Link href="/products" className="btn btn--outline">Our Products</Link>
              <Link href="/contact" className="btn btn--ghost">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
