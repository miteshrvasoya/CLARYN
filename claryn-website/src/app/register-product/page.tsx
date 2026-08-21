'use client';
import { useState } from 'react';
import { products } from '@/data/products';
import { CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterProductPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/register-product', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error ?? 'Submission failed'); }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--navbar-height)' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <CheckCircle size={64} style={{ color: 'var(--color-success)', margin: '0 auto var(--space-6)' }} />
          <h1 style={{ marginBottom: 'var(--space-4)' }}>Product Registered!</h1>
          <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>Your product has been registered and your warranty is now active. Check your email for confirmation details.</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link href="/support" className="btn btn--primary">Visit Support Center</Link>
            <Link href="/" className="btn btn--outline">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Product Registration</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Register Your CLARYN Product</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>Activate your warranty, get maintenance reminders, and access dedicated product support.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {error && (
            <div className="callout callout--warning" style={{ marginBottom: 'var(--space-6)' }}>
              <AlertTriangle size={18} className="callout__icon" style={{ color: 'var(--color-warning)' }} />
              <div className="callout__content"><p className="callout__body">{error}</p></div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }} noValidate>
            <fieldset style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
              <legend style={{ fontWeight: 700, color: 'var(--color-navy)', padding: '0 var(--space-2)', fontSize: 'var(--text-lg)' }}>Your Details</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="reg-name">Full Name</label>
                  <input id="reg-name" name="name" type="text" className="form-input" required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="reg-mobile">Mobile Number</label>
                  <input id="reg-mobile" name="mobile" type="tel" className="form-input" required placeholder="+91 XXXXX XXXXX" pattern="[0-9+\- ]{10,15}" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label form-label--required" htmlFor="reg-email">Email Address</label>
                <input id="reg-email" name="email" type="email" className="form-input" required placeholder="you@example.com" />
              </div>
            </fieldset>

            <fieldset style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
              <legend style={{ fontWeight: 700, color: 'var(--color-navy)', padding: '0 var(--space-2)', fontSize: 'var(--text-lg)' }}>Product Details</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="reg-product">Product</label>
                  <select id="reg-product" name="productId" className="form-select" required defaultValue="">
                    <option value="" disabled>Select product…</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="reg-serial">Serial Number</label>
                  <input id="reg-serial" name="serialNumber" type="text" className="form-input" placeholder="On the product packaging" />
                  <span className="form-hint">If available on the product or packaging</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="reg-date">Purchase Date</label>
                  <input id="reg-date" name="purchaseDate" type="date" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="reg-platform">Purchase Platform</label>
                  <select id="reg-platform" name="purchasePlatform" className="form-select" required defaultValue="">
                    <option value="" disabled>Select platform…</option>
                    {['Amazon','Flipkart','Authorized Dealer','Other'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label" htmlFor="reg-orderid">Order ID / Invoice Number (Optional)</label>
                <input id="reg-orderid" name="orderId" type="text" className="form-input" placeholder="Your order ID from the marketplace" />
              </div>
            </fieldset>

            <fieldset style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
              <legend style={{ fontWeight: 700, color: 'var(--color-navy)', padding: '0 var(--space-2)', fontSize: 'var(--text-lg)' }}>Optional Information</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-pincode">Pincode</label>
                  <input id="reg-pincode" name="pincode" type="text" className="form-input" placeholder="Your area pincode" pattern="[0-9]{6}" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-watersource">Water Source</label>
                  <select id="reg-watersource" name="waterSource" className="form-select" defaultValue="">
                    <option value="">Select if known…</option>
                    {['Municipal / Corporation','Borewell / Tubewell','Tanker Water','Mixed / Both','Unknown'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label" htmlFor="reg-notes">Installation Notes or Comments</label>
                <textarea id="reg-notes" name="notes" className="form-textarea" placeholder="Any notes about installation, your water source, or how you plan to use the product (optional)" />
              </div>
            </fieldset>

            {/* Marketing consent — NEVER pre-checked, always explicit */}
            <div style={{ padding: 'var(--space-5)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
              <label className="form-checkbox">
                <input type="checkbox" name="marketingConsent" value="yes" />
                <span className="form-checkbox__label">
                  I agree to receive product updates, maintenance reminders, and water quality tips from CLARYN via email or SMS. You can unsubscribe at any time. (Optional)
                </span>
              </label>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', lineHeight: 1.7 }}>
              By submitting this form, you agree to CLARYN&apos;s <Link href="/privacy" style={{ color: 'var(--color-blue)' }}>Privacy Policy</Link>. We collect only the information necessary to process your product registration and provide warranty support.
            </p>

            <button type="submit" className="btn btn--primary btn--lg" disabled={loading} style={{ alignSelf: 'flex-start' }}>
              {loading ? 'Registering…' : <>Register Product <ArrowRight size={18} aria-hidden /></>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
