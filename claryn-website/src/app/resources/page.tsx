import type { Metadata } from 'next';
import Link from 'next/link';
import { knowledgeArticles } from '@/data/knowledge-articles';
import { ArrowRight, FileText, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources & Downloads | CLARYN',
  description: 'Download CLARYN product datasheets, installation manuals, water quality guides, and other resources.',
};

export default function ResourcesPage() {
  const articles = knowledgeArticles.filter(a => a.isPublished);
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Resources</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Resources & Downloads</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>Product documentation, guides, and water quality resources from CLARYN.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Product Documentation</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-8)' }}>
            Product datasheets and installation manuals are available on individual product pages.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-16)' }}>
            <Link href="/products/claryn-75-gpd-5-layer-ro-membrane" className="btn btn--outline">
              <FileText size={16} aria-hidden />75 GPD Membrane Downloads
            </Link>
            <Link href="/products/claryn-100-gpd-5-layer-ro-membrane" className="btn btn--outline">
              <FileText size={16} aria-hidden />100 GPD Membrane Downloads
            </Link>
          </div>

          <h2 style={{ marginBottom: 'var(--space-6)' }}>Knowledge Articles</h2>
          <div className="grid-3">
            {articles.map(a => (
              <Link key={a.id} href={`/learn/${a.category}/${a.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-5)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', textDecoration: 'none', color: 'inherit', background: 'var(--color-white)' }}>
                <BookOpen size={20} style={{ color: 'var(--color-blue)' }} aria-hidden />
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-navy)', lineHeight: 1.5 }}>{a.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', flex: 1 }}>{a.readTimeMinutes} min read</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-blue)' }}>Read <ArrowRight size={14} aria-hidden /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
