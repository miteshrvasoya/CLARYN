'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  }

  if (submitted) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--navbar-height)' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <CheckCircle size={64} style={{ color: 'var(--color-success)', margin: '0 auto var(--space-6)' }} />
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Message Sent</h1>
        <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
        <Link href="/" className="btn btn--primary">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Contact</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Get in Touch</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>We&apos;re here to help with product questions, support, or anything water-related.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--space-12)', alignItems: 'start' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }} noValidate>
              {error && <div className="callout callout--warning"><AlertTriangle size={18} className="callout__icon" style={{ color: 'var(--color-warning)' }} /><div className="callout__content"><p className="callout__body">{error}</p></div></div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="con-name">Name</label><input id="con-name" name="name" type="text" className="form-input" required /></div>
                <div className="form-group"><label className="form-label form-label--required" htmlFor="con-email">Email</label><input id="con-email" name="email" type="email" className="form-input" required /></div>
              </div>
              <div className="form-group"><label className="form-label" htmlFor="con-phone">Phone (Optional)</label><input id="con-phone" name="phone" type="tel" className="form-input" /></div>
              <div className="form-group">
                <label className="form-label form-label--required" htmlFor="con-subject">Subject</label>
                <select id="con-subject" name="subject" className="form-select" required defaultValue="">
                  <option value="" disabled>Select a topic…</option>
                  {['Product Query','Installation Help','Warranty / Claim','Technical Support','Water Quality Question','General Enquiry','Other'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label form-label--required" htmlFor="con-message">Message</label><textarea id="con-message" name="message" className="form-textarea" required style={{ minHeight: 160 }} placeholder="Tell us how we can help…" /></div>
              <button type="submit" className="btn btn--primary btn--lg" disabled={loading} style={{ alignSelf: 'flex-start' }}>
                {loading ? 'Sending…' : <>Send Message <ArrowRight size={18} aria-hidden /></>}
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div style={{ background: 'var(--color-navy)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-7)', color: 'rgba(255,255,255,0.8)' }}>
                <h3 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-5)' }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}><Mail size={16} aria-hidden />{siteConfig.contact.email}</a>}
                  {siteConfig.contact.phone && <a href={`tel:${siteConfig.contact.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}><Phone size={16} aria-hidden />{siteConfig.contact.phone}</a>}
                  {siteConfig.contact.address && <span style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}><MapPin size={16} aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />{siteConfig.contact.address}</span>}
                  {!siteConfig.contact.email && !siteConfig.contact.phone && <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>Contact details will be published here soon. In the meantime, please use the form.</p>}
                </div>
              </div>
              <div style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Looking for Support?</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>For faster help, visit our Support Center or check the FAQ.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Link href="/support" className="btn btn--outline btn--sm" style={{ justifyContent: 'center' }}>Support Center</Link>
                  <Link href="/faq"     className="btn btn--ghost btn--sm" style={{ justifyContent: 'center' }}>Browse FAQ</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
