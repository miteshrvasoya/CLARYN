import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { knowledgeArticles } from '@/data/knowledge-articles';
import { ChevronRight, Clock, BookOpen } from 'lucide-react';

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateStaticParams() {
  return knowledgeArticles.filter(a => a.isPublished).map(a => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = knowledgeArticles.find(a => a.slug === slug && a.isPublished);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.summary,
    openGraph: { title: article.title, description: article.summary, type: 'article' },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug, category } = await params;
  const article = knowledgeArticles.find(a => a.slug === slug && a.isPublished);
  if (!article) notFound();

  const related = knowledgeArticles.filter(a => a.isPublished && a.id !== article.id && a.category === category).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: { '@type': 'Organization', name: 'CLARYN' },
    publisher: { '@type': 'Organization', name: 'Udarta Watertech Private Limited' },
    datePublished: article.publishedAt,
  };

  // Simple markdown-like rendering
  const renderContent = (md: string) => {
    return md.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
      if (line.startsWith('- ')) return <ul key={i} style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-2)' }}><li>{line.slice(2)}</li></ul>;
      if (line.startsWith('| ') && line.includes('|')) {
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (cells.every(c => c.match(/^[-:]+$/))) return null;
        return (
          <div key={i} style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
              <tbody>
                <tr>{cells.map((c, j) => <td key={j} style={{ padding: 'var(--space-2) var(--space-4)', border: '1px solid var(--color-gray-200)', color: 'var(--color-gray-700)' }}>{c.replace(/\*\*(.*?)\*\*/g,'$1')}</td>)}</tr>
              </tbody>
            </table>
          </div>
        );
      }
      if (!line.trim()) return <br key={i} />;
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
    }).filter(Boolean);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 2.5rem)', paddingBottom: '2.5rem' }}>
        <div className="container container--narrow">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <div className="breadcrumb__item"><Link href="/" className="breadcrumb__link" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link><ChevronRight size={14} className="breadcrumb__separator" /></div>
            <div className="breadcrumb__item"><Link href="/learn" className="breadcrumb__link" style={{ color: 'rgba(255,255,255,0.5)' }}>Learn</Link><ChevronRight size={14} className="breadcrumb__separator" /></div>
            <div className="breadcrumb__item"><span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-sm)' }}>{article.category.replace(/-/g,' ')}</span></div>
          </nav>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-teal)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 'var(--space-3)' }}>
            <BookOpen size={12} aria-hidden />{article.category.replace(/-/g,' ')}
          </span>
          <h1 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-4)' }}>{article.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} aria-hidden />{article.readTimeMinutes} min read</span>
            {article.publishedAt && <span>Published {new Date(article.publishedAt).toLocaleDateString('en-IN',{ year: 'numeric', month: 'long', day: 'numeric' })}</span>}
          </div>
        </div>
      </div>

      <div className="container container--narrow" style={{ paddingBlock: 'var(--space-12)' }}>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-gray-700)', lineHeight: 1.8, marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-8)', borderBottom: '1px solid var(--color-gray-200)', fontStyle: 'italic' }}>{article.summary}</p>

        <div className="article-body">
          {renderContent(article.content)}
        </div>

        <div style={{ marginTop: 'var(--space-12)', padding: 'var(--space-6)', background: 'var(--color-blue-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-blue-200)' }}>
          <h3 style={{ color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>Ready to Take Action?</h3>
          <p style={{ color: 'var(--color-gray-700)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>Browse CLARYN products or use our solution finder to get a personalised recommendation for your water situation.</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn--primary btn--sm">View Products</Link>
            <Link href="/find-your-solution" className="btn btn--outline btn--sm">Find My Solution</Link>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-gray-200)' }}>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Related Articles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {related.map(a => (
                <Link key={a.id} href={`/learn/${a.category}/${a.slug}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-4)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', color: 'inherit', transition: 'all var(--transition-base)' }}>
                  <BookOpen size={18} style={{ color: 'var(--color-blue)', flexShrink: 0, marginTop: 2 }} aria-hidden />
                  <div>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-navy)', marginBottom: 'var(--space-1)' }}>{a.title}</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{a.readTimeMinutes} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
