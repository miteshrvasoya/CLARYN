import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | CLARYN',
  description: 'News, updates, and company announcements from CLARYN.',
};

export default function BlogPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Blog</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Company News & Updates</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
            The latest announcements, product releases, and news from the CLARYN team.
          </p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Coming Soon</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-8)' }}>We are currently preparing our first set of announcements. Check back soon.</p>
          <Link href="/learn" className="btn btn--primary">Visit Knowledge Hub Instead</Link>
        </div>
      </section>
    </>
  );
}
