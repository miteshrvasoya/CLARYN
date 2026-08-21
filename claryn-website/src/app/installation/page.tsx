import type { Metadata } from 'next';
import Link from 'next/link';
import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Installation Center | CLARYN Product Installation Guides',
  description: 'Step-by-step installation guides for CLARYN RO membranes and water purification products. DIY-friendly guides with photos.',
};

const guides = [
  { slug: 'ro-membrane-installation', title: 'RO Membrane Installation & Replacement', summary: 'Step-by-step guide to replacing your RO membrane. Compatible with all standard domestic RO systems. Most installations take 15–30 minutes.', products: ['75 GPD Membrane', '100 GPD Membrane'], level: 'DIY Friendly' },
  { slug: 'sediment-filter-replacement', title: 'Sediment Filter Replacement', summary: 'How to replace your RO system\'s sediment pre-filter. Recommended every 3–6 months for optimal membrane protection.', products: ['All RO Systems'], level: 'DIY Friendly' },
  { slug: 'carbon-filter-replacement', title: 'Carbon Pre-Filter Replacement', summary: 'Replace your activated carbon pre-filter to remove chlorine and protect your RO membrane from chemical degradation.', products: ['All RO Systems'], level: 'DIY Friendly' },
];

export default function InstallationPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Installation Center</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Installation Guides</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>Step-by-step guides for installing and maintaining your CLARYN products. Written for DIY — no plumber usually required.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="callout callout--info" style={{ marginBottom: 'var(--space-8)' }}>
            <AlertTriangle size={18} className="callout__icon" style={{ color: 'var(--color-blue)' }} />
            <div className="callout__content">
              <p className="callout__title">Always turn off your water supply before beginning any installation.</p>
              <p className="callout__body">If you&apos;re unsure at any step, stop and contact a qualified plumber or our support team.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-12)' }}>
            {guides.map(guide => (
              <Link key={guide.slug} href={`/installation/${guide.slug}`}
                style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', padding: 'var(--space-6)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', textDecoration: 'none', color: 'inherit', background: 'var(--color-white)', transition: 'all var(--transition-base)' }}>
                <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: 'var(--radius-lg)', background: 'var(--color-blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={26} style={{ color: 'var(--color-blue)' }} aria-hidden />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <h2 style={{ fontSize: 'var(--text-lg)' }}>{guide.title}</h2>
                    <span className="badge badge--live">{guide.level}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-2)' }}>{guide.summary}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {guide.products.map(p => <span key={p} style={{ fontSize: 'var(--text-xs)', background: 'var(--color-gray-100)', color: 'var(--color-gray-700)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{p}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Need More Help?</h3>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)' }}>If a guide doesn&apos;t cover your specific situation, our support team is here to help.</p>
            <Link href="/contact" className="btn btn--primary">Contact Support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
