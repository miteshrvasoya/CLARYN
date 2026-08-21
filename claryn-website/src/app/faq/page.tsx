import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs, faqCategories } from '@/data/faqs';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Find answers to common questions about CLARYN products, RO membranes, installation, warranty, water quality, and maintenance.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Help Center</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Frequently Asked Questions</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
            Answers to common questions about CLARYN products, installation, warranty, and water quality.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {faqCategories.map(cat => {
            const catFAQs = faqs.filter(f => f.category === cat).sort((a, b) => a.displayOrder - b.displayOrder);
            if (!catFAQs.length) return null;
            return (
              <div key={cat} style={{ marginBottom: 'var(--space-12)' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-3)', borderBottom: '2px solid var(--color-blue-100)' }}>{cat}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {catFAQs.map(faq => (
                    <details key={faq.id} style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                      <summary style={{ padding: 'var(--space-5)', fontWeight: 600, color: 'var(--color-navy)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', userSelect: 'none' }}>
                        {faq.question}
                        <ChevronDown size={18} style={{ flexShrink: 0, transition: 'transform 200ms' }} aria-hidden />
                      </summary>
                      <div style={{ padding: 'var(--space-5)', paddingTop: 0, borderTop: '1px solid var(--color-gray-100)' }}>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.8 }}>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Didn&apos;t find your answer?</h3>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)' }}>Reach out to our support team — we&apos;re happy to help.</p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--primary">Contact Us</Link>
              <Link href="/support" className="btn btn--outline">Support Center</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
