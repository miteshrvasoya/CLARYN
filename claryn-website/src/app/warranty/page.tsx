import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, AlertTriangle, ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Warranty Information | CLARYN Products',
  description: 'Understand CLARYN\'s 12-month product warranty — coverage, eligibility, exclusions, and how to make a claim.',
};

export default function WarrantyPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Warranty</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>CLARYN Product Warranty</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>We stand behind every CLARYN product. Here&apos;s what your warranty covers and how to make a claim.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {/* Callout */}
          <div className="callout callout--info" style={{ marginBottom: 'var(--space-10)' }}>
            <ShieldCheck size={20} className="callout__icon" style={{ color: 'var(--color-blue)' }} />
            <div className="callout__content">
              <p className="callout__title">12-Month Manufacturer Warranty</p>
              <p className="callout__body">All CLARYN products carry a 12-month manufacturer warranty from the date of purchase. Register your product to activate and simplify any future claims.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-5)' }}>What Is Covered</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {['Manufacturing defects in materials or workmanship','Premature performance degradation not caused by improper use','Failure to meet published performance specifications under normal operating conditions','Structural defects in the membrane housing or construction'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: 4 }} aria-hidden />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-5)' }}>What Is Not Covered</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {['Normal wear and performance decline over the membrane\'s service life','Damage from improper installation, modification, or misuse','Degradation due to chemical exposure beyond rated operating conditions','Damage from neglected pre-filter maintenance (clogged sediment/carbon filters)','Products purchased from unauthorised sellers','Physical damage from mishandling or improper storage'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>
                    <AlertTriangle size={16} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 4 }} aria-hidden />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={{ marginBottom: 'var(--space-5)' }}>Eligibility Requirements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {['Product must be purchased from an authorised CLARYN channel (Amazon, Flipkart, or authorised dealers)','Warranty claim must be submitted within the 12-month warranty period from date of purchase','Proof of purchase (invoice, marketplace order confirmation) must be provided','Product must have been used within stated operating conditions (TDS, pressure, temperature)'].map(item => (
                <div key={item} style={{ padding: 'var(--space-4)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-blue)', color: 'var(--color-gray-700)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={{ marginBottom: 'var(--space-5)' }}>How to Make a Warranty Claim</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                ['1. Register Your Product', 'If not already done, register at claryn.in/register-product. This significantly speeds up the claims process.'],
                ['2. Check Troubleshooting Guides', 'Review our FAQ and installation guides — many common issues can be resolved without a formal claim.'],
                ['3. Submit a Warranty Claim', 'Visit claryn.in/warranty/claim and complete the online form with your product details, issue description, and photos/video.'],
                ['4. Claim Review', 'Our team reviews your claim within 2–3 business days and will contact you to discuss the resolution.'],
                ['5. Resolution', 'Approved claims are resolved by replacement, repair, or credit — as appropriate to the specific case. Our team will communicate the exact process.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-5)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 'var(--radius-full)', background: 'var(--color-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-sm)', fontWeight: 700 }}>{title[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-1)' }}>{title}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--color-blue-50)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center', border: '1px solid var(--color-blue-200)' }}>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Ready to Make a Claim?</h3>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)' }}>Submit your warranty claim online — our team will respond within 2–3 business days.</p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/warranty/claim" className="btn btn--primary">Submit a Claim <ArrowRight size={16} aria-hidden /></Link>
              <Link href="/register-product" className="btn btn--outline">Register Product</Link>
            </div>
          </div>

          <div className="callout callout--warning" style={{ marginTop: 'var(--space-8)' }}>
            <AlertTriangle size={18} className="callout__icon" style={{ color: 'var(--color-warning)' }} />
            <div className="callout__content">
              <p className="callout__title">Placeholder Warranty Terms</p>
              <p className="callout__body">The above represents general warranty information. Final, legally-binding warranty terms specific to each product will be published here and provided at time of purchase. These terms are subject to finalization by Udarta Watertech Private Limited.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
