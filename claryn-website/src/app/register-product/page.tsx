'use client';
import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import {
  CheckCircle, ArrowRight, AlertCircle,
  User, Package, ShieldCheck, Bell, Clock
} from 'lucide-react';
import styles from './page.module.css';

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
      const res = await fetch('/api/register-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error ?? 'Submission failed'); }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  }

  /* ── Success ───────────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successCard}>
          <div className={styles.successIconWrapper}>
            <CheckCircle size={40} aria-hidden />
          </div>
          <h1 className={styles.successTitle}>Product Registered!</h1>
          <p className={styles.successDesc}>
            Your warranty is now active. Check your email for confirmation details and maintenance reminders.
          </p>
          <div className={styles.successActions}>
            <Link href="/support" className="btn btn--primary">
              Visit Support
            </Link>
            <Link href="/" className="btn btn--outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────────────────── */
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>Product Registration</span>
            <h1 className={styles.heroTitle}>Activate Your Warranty</h1>
            <p className={styles.heroDesc}>
              Register your CLARYN product in under 2 minutes to activate your warranty, unlock support, and get maintenance reminders.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>

            {/* ── Form Column ──────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className={styles.form} noValidate>

              {/* Error */}
              {error && (
                <div className={styles.errorBanner} role="alert">
                  <AlertCircle size={20} className={styles.errorIcon} aria-hidden />
                  <span>{error}</span>
                </div>
              )}

              {/* Section 1: Your Details */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <User size={18} aria-hidden />
                  </div>
                  <div>
                    <p className={styles.formCardTitle}>Your Details</p>
                    <p className={styles.formCardSubtitle}>Contact information for warranty communication</p>
                  </div>
                </div>
                <div className={styles.formCardBody}>
                  <div className={styles.grid2}>
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor="reg-name">
                        Full Name
                      </label>
                      <input
                        id="reg-name" name="name" type="text"
                        className={styles.fieldInput}
                        required placeholder="Your full name"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor="reg-mobile">
                        Mobile Number
                      </label>
                      <input
                        id="reg-mobile" name="mobile" type="tel"
                        className={styles.fieldInput}
                        required placeholder="+91 XXXXX XXXXX"
                        pattern="[0-9+\- ]{10,15}"
                      />
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor="reg-email">
                      Email Address
                    </label>
                    <input
                      id="reg-email" name="email" type="email"
                      className={styles.fieldInput}
                      required placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Product Details */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <Package size={18} aria-hidden />
                  </div>
                  <div>
                    <p className={styles.formCardTitle}>Product Details</p>
                    <p className={styles.formCardSubtitle}>Tell us about your CLARYN product</p>
                  </div>
                </div>
                <div className={styles.formCardBody}>
                  <div className={styles.grid2}>
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor="reg-product">
                        Product
                      </label>
                      <select
                        id="reg-product" name="productId"
                        className={styles.fieldSelect}
                        required defaultValue=""
                      >
                        <option value="" disabled>Select product…</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="reg-serial">
                        Serial Number
                      </label>
                      <input
                        id="reg-serial" name="serialNumber" type="text"
                        className={styles.fieldInput}
                        placeholder="On product packaging"
                      />
                      <span className={styles.fieldHint}>If available on the product or packaging</span>
                    </div>
                  </div>
                  <div className={styles.grid2}>
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor="reg-date">
                        Purchase Date
                      </label>
                      <input
                        id="reg-date" name="purchaseDate" type="date"
                        className={styles.fieldInput}
                        required
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor="reg-platform">
                        Purchase Platform
                      </label>
                      <select
                        id="reg-platform" name="purchasePlatform"
                        className={styles.fieldSelect}
                        required defaultValue=""
                      >
                        <option value="" disabled>Select platform…</option>
                        {['Amazon', 'Flipkart', 'Authorized Dealer', 'Other'].map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="reg-orderid">
                      Order ID / Invoice Number <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <input
                      id="reg-orderid" name="orderId" type="text"
                      className={styles.fieldInput}
                      placeholder="Order ID from the marketplace"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Optional Info */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <Bell size={18} aria-hidden />
                  </div>
                  <div>
                    <p className={styles.formCardTitle}>Additional Information</p>
                    <p className={styles.formCardSubtitle}>Helps us personalise maintenance reminders for you</p>
                  </div>
                </div>
                <div className={styles.formCardBody}>
                  <div className={styles.grid2}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="reg-pincode">
                        Pincode <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <input
                        id="reg-pincode" name="pincode" type="text"
                        className={styles.fieldInput}
                        placeholder="Your area pincode"
                        pattern="[0-9]{6}"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="reg-watersource">
                        Water Source <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <select
                        id="reg-watersource" name="waterSource"
                        className={styles.fieldSelect}
                        defaultValue=""
                      >
                        <option value="">Select if known…</option>
                        {['Municipal / Corporation', 'Borewell / Tubewell', 'Tanker Water', 'Mixed / Both', 'Unknown'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="reg-notes">
                      Notes <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <textarea
                      id="reg-notes" name="notes"
                      className={styles.fieldTextarea}
                      placeholder="Any notes about your installation, water source, or questions you have…"
                    />
                  </div>
                </div>
              </div>

              {/* Consent */}
              <label className={styles.consentCard} htmlFor="reg-consent">
                <input
                  id="reg-consent"
                  type="checkbox" name="marketingConsent" value="yes"
                  className={styles.consentCheckbox}
                />
                <span className={styles.consentLabel}>
                  I agree to receive product updates, maintenance reminders, and water quality tips from CLARYN via email or SMS. You can unsubscribe at any time. (Optional)
                </span>
              </label>

              {/* Privacy note */}
              <p className={styles.privacyNote}>
                By submitting this form, you agree to CLARYN&apos;s{' '}
                <Link href="/privacy">Privacy Policy</Link>.
                We collect only the information necessary to process your product registration and provide warranty support.
              </p>

              {/* Submit */}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <><span className={styles.spinner} aria-hidden />Registering…</>
                ) : (
                  <>Register Product <ArrowRight size={18} aria-hidden /></>
                )}
              </button>
            </form>

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className={styles.sidebar}>
              {/* Why Register */}
              <div className={styles.sidebarCard}>
                <h2 className={styles.sidebarTitle}>Why Register?</h2>
                <div className={styles.benefitList}>
                  {[
                    {
                      icon: <ShieldCheck size={18} />,
                      title: '12-Month Warranty',
                      desc: 'Activate your full manufacturer warranty with a single registration.'
                    },
                    {
                      icon: <Clock size={18} />,
                      title: 'Maintenance Reminders',
                      desc: 'Get timely alerts when your membrane is due for replacement.'
                    },
                    {
                      icon: <Bell size={18} />,
                      title: 'Priority Support',
                      desc: 'Faster responses and dedicated assistance for registered users.'
                    },
                  ].map((b, i) => (
                    <div key={i} className={styles.benefitItem}>
                      <div className={styles.benefitIcon}>{b.icon}</div>
                      <div className={styles.benefitText}>
                        <strong>{b.title}</strong>
                        <p>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className={`${styles.sidebarCard} ${styles.sidebarCardDark}`}>
                <h2 className={`${styles.sidebarTitle} ${styles.sidebarTitleLight}`}>How It Works</h2>
                <div className={styles.stepList}>
                  {[
                    'Fill in your contact and product details above.',
                    'Submit the form — takes under 2 minutes.',
                    'Receive a confirmation email with your warranty details.',
                    'Get maintenance reminders before your membrane expires.',
                  ].map((step, i) => (
                    <div key={i} className={styles.stepItem}>
                      <span className={styles.stepNum}>0{i + 1}</span>
                      <p className={styles.stepText}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help link */}
              <div className={styles.sidebarCard} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Having trouble registering? Our support team is here to help.
                </p>
                <Link href="/support" className="btn btn--outline" style={{ justifyContent: 'center', width: '100%' }}>
                  Contact Support
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
