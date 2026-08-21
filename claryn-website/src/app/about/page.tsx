import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CLARYN | Water Solutions & Water Technology Brand',
  description: 'Learn about CLARYN — India\'s modern water solutions and water technology brand by Udarta Watertech. Our mission, vision, and commitment to water quality.',
};

export default function AboutPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>About Us</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>About CLARYN</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>A water solutions and water technology brand with a simple mission: improve people&apos;s lives through better water.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', marginBottom: 'var(--space-16)', alignItems: 'center' }}>
            <div>
              <span className="text-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>Why We Exist</span>
              <h2 style={{ marginBottom: 'var(--space-5)' }}>Water Is One of Life&apos;s Most Essential Needs. Most People Don&apos;t Think About It Until Something Goes Wrong.</h2>
              <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                Millions of Indian families use RO purifiers every day — and most don&apos;t know if their membranes are still performing as they should. Low-quality replacement parts, confusing specifications, and an industry built on confusion rather than trust: that&apos;s what CLARYN set out to change.
              </p>
              <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.8 }}>
                CLARYN is a water solutions and water technology brand — not a single-product company. Our first products are RO membranes, but our roadmap extends across RO systems, filtration, water testing, smart water technology, and beyond. Guiding principle: <strong>if it improves water, it belongs to CLARYN.</strong>
              </p>
            </div>
            <div style={{ background: 'var(--color-gray-50)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(3rem,6vw,4.5rem)', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-secondary)', lineHeight: 1 }}>CLARYN</p>
              <p style={{ color: 'var(--color-gray-500)', fontStyle: 'italic', marginTop: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>Clear Water. Clearer Life.</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>A brand by<br /><strong style={{ color: 'var(--color-navy)' }}>Udarta Watertech Private Limited</strong></p>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-16)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
              {[
                { label: 'Mission', text: 'Improve people\'s lives by providing reliable, innovative, and accessible water solutions.' },
                { label: 'Vision',  text: 'Build CLARYN into a highly trusted water solutions and water technology brand originating from India, eventually serving broader markets.' },
              ].map(({ label, text }) => (
                <div key={label} style={{ padding: 'var(--space-8)', background: 'var(--color-navy)', borderRadius: 'var(--radius-xl)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-blue-300)', marginBottom: 'var(--space-3)' }}>{label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: 'var(--text-lg)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Our Quality Commitments</h2>
            <div className="grid-2">
              {['Transparent, accurate product specifications — we never fabricate specs','No unsupported health claims — we rely on evidence-based water science','Premium 5-layer TFC Polyamide membrane construction','Universal compatibility — designed to work with existing RO systems','12-month manufacturer warranty on every product','Real product support — not just a marketplace listing'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                  <CheckCircle size={18} style={{ color: 'var(--color-teal)', flexShrink: 0, marginTop: 2 }} aria-hidden />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--color-blue-50)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', textAlign: 'center', border: '1px solid var(--color-blue-200)' }}>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Part of Udarta Watertech</h3>
            <p style={{ color: 'var(--color-gray-700)', maxWidth: 540, margin: '0 auto var(--space-6)', lineHeight: 1.7 }}>CLARYN is the consumer brand of Udarta Watertech Private Limited — a water technology company built with a long-term vision for Indian water solutions.</p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/company" className="btn btn--primary">About Udarta Watertech</Link>
              <Link href="/products" className="btn btn--outline">Our Products <ArrowRight size={16} aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
