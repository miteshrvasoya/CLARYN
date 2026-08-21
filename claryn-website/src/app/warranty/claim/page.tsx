'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { products } from '@/data/products';

export default function WarrantyClaimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/warranty/claim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error ?? 'Submission failed'); }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  }

  if (submitted) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--navbar-height)' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <CheckCircle size={64} style={{ color: 'var(--color-success)', margin: '0 auto var(--space-6)' }} />
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Claim Submitted</h1>
        <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>We&apos;ve received your warranty claim and will review it within 2–3 business days. You&apos;ll receive an update by email.</p>
        <Link href="/" className="btn btn--primary">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            <Link href="/warranty" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Warranty</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Submit a Claim</span>
          </nav>
          <h1 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-4)' }}>Submit a Warranty Claim</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-lg)', lineHeight: 1.7, maxWidth: 600 }}>Fill in the details below. Our team reviews all claims within 2–3 business days.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          {error && <div className="callout callout--warning" style={{ marginBottom: 'var(--space-6)' }}>
            <AlertTriangle size={18} className="callout__icon" style={{ color: 'var(--color-warning)' }} />
            <div className="callout__content"><p className="callout__body">{error}</p></div>
          </div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }} noValidate>
            <fieldset style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
              <legend style={{ fontWeight: 700, color: 'var(--color-navy)', padding: '0 var(--space-2)' }}>Contact Details</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="claim-name">Full Name</label><input id="claim-name" name="name" type="text" className="form-input" required /></div>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="claim-email">Email</label><input id="claim-email" name="email" type="email" className="form-input" required /></div>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}><label className="form-label form-label--required" htmlFor="claim-phone">Mobile Number</label><input id="claim-phone" name="phone" type="tel" className="form-input" required /></div>
            </fieldset>

            <fieldset style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
              <legend style={{ fontWeight: 700, color: 'var(--color-navy)', padding: '0 var(--space-2)' }}>Product & Purchase</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="claim-product">Product</label>
                  <select id="claim-product" name="productId" className="form-select" required defaultValue=""><option value="" disabled>Select product…</option>{products.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
                </div>
                <div className="form-group"><label className="form-label" htmlFor="claim-serial">Serial Number</label><input id="claim-serial" name="serialNumber" type="text" className="form-input" placeholder="If available" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="claim-purchase-date">Purchase Date</label><input id="claim-purchase-date" name="purchaseDate" type="date" className="form-input" required /></div>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="claim-platform">Purchase Platform</label>
                  <select id="claim-platform" name="purchasePlatform" className="form-select" required defaultValue=""><option value="" disabled>Select…</option>{['Amazon','Flipkart','Authorized Dealer','Other'].map(p=><option key={p}>{p}</option>)}</select>
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}><label className="form-label" htmlFor="claim-orderid">Order ID / Invoice Number</label><input id="claim-orderid" name="orderId" type="text" className="form-input" placeholder="Helps us verify your purchase faster" /></div>
            </fieldset>

            <fieldset style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
              <legend style={{ fontWeight: 700, color: 'var(--color-navy)', padding: '0 var(--space-2)' }}>Issue Description</legend>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label form-label--required" htmlFor="claim-issue">Describe the Issue</label>
                <textarea id="claim-issue" name="issueDescription" className="form-textarea" required placeholder="Describe what's wrong — e.g. low flow, TDS not reducing, visible damage..." style={{ minHeight: 140 }} />
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label" htmlFor="claim-tds-before">Source Water TDS (if known)</label>
                <input id="claim-tds-before" name="sourceTDS" type="number" className="form-input" placeholder="e.g. 500" />
                <span className="form-hint">Measured with a TDS meter before the RO</span>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label" htmlFor="claim-tds-after">Purified Water TDS (if known)</label>
                <input id="claim-tds-after" name="purifiedTDS" type="number" className="form-input" placeholder="e.g. 250" />
              </div>
            </fieldset>

            <button type="submit" className="btn btn--primary btn--lg" disabled={loading} style={{ alignSelf: 'flex-start' }}>
              {loading ? 'Submitting…' : <>Submit Claim <ArrowRight size={18} aria-hidden /></>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
