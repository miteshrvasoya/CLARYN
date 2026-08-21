import type { Metadata } from 'next';
import Link from 'next/link';
import { knowledgeArticles, knowledgeCategories } from '@/data/knowledge-articles';
import { BookOpen, Clock, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Knowledge Hub | Learn About Water Quality',
  description: 'Evidence-based guides on water quality, TDS, RO technology, hard water, maintenance, and more. CLARYN\'s Water Knowledge Hub — understand your water.',
};

export default function LearnPage() {
  const published = knowledgeArticles.filter(a => a.isPublished);

  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Water Knowledge Hub</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>Understand Your Water</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
            Evidence-based guides on water quality, purification technology, and maintenance — written for Indian homes and businesses.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            <button style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 600, border: '1.5px solid var(--color-blue)', background: 'var(--color-blue)', color: '#fff', cursor: 'pointer' }}>All Topics</button>
            {knowledgeCategories.map(cat => (
              <button key={cat.slug} style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 500, border: '1.5px solid var(--color-gray-300)', background: 'transparent', color: 'var(--color-gray-700)', cursor: 'pointer', textTransform: 'capitalize' }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
            {published.map((article) => (
              <Link key={article.id} href={`/learn/${article.category}/${article.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-6)', background: 'var(--color-white)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', textDecoration: 'none', color: 'inherit', transition: 'all var(--transition-base)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-teal)' }}>{article.category.replace(/-/g, ' ')}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)' }}>
                    <Clock size={12} aria-hidden />{article.readTimeMinutes} min
                  </span>
                </div>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 'var(--lh-snug)' }}>{article.title}</h2>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, flex: 1 }}>{article.summary}</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-blue)' }}>
                  <BookOpen size={14} aria-hidden />Read Article<ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: 'var(--color-navy)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-4)' }}>Don&apos;t Know Where to Start?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto var(--space-6)', lineHeight: 1.7 }}>
              Answer a few quick questions about your water source and problems — we&apos;ll point you to the right resources.
            </p>
            <Link href="/find-your-solution" className="btn btn--primary btn--lg">
              Find My Solution <ChevronRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
