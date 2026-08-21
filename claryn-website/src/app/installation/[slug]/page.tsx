import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Wrench, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';

type Guide = {
  slug: string;
  title: string;
  productModels: string[];
  requiredTools: string[];
  estimatedTime: string;
  difficulty: string;
  steps: { title: string; desc: string; warning?: string }[];
  commonMistakes: string[];
};

const guides: Guide[] = [
  {
    slug: 'ro-membrane-installation',
    title: 'RO Membrane Installation & Replacement Guide',
    productModels: ['CLR-RO-75-5L', 'CLR-RO-100-5L'],
    requiredTools: ['Membrane housing wrench (supplied with most RO systems)', 'Clean bucket or towels', 'Clean hands / disposable gloves (recommended)'],
    estimatedTime: '15–30 minutes',
    difficulty: 'DIY Friendly',
    steps: [
      { title: 'Turn Off Water Supply', desc: 'Locate and close the feed water valve to your RO system. This is usually a valve on the cold water supply line under your sink.', warning: 'Never skip this step — attempting to open the membrane housing with water pressure can cause flooding.' },
      { title: 'Depressurize the System', desc: 'Open the RO tap/faucet and let all water drain from the system. This removes pressure from the system before you open it.' },
      { title: 'Locate the Membrane Housing', desc: 'The membrane housing is usually the largest of the filter housings — often a vertical cylinder. Check your RO system manual if unsure.' },
      { title: 'Remove the Membrane Housing Cap', desc: 'Using the membrane housing wrench, turn the housing cap counter-clockwise to loosen and remove it. Have your bucket ready.' },
      { title: 'Remove the Old Membrane', desc: 'Pull the old membrane straight out from the housing. It may require gentle but firm pulling. Note the orientation (brine seal end first, or check your system manual).' },
      { title: 'Flush the New Membrane', desc: 'Rinse the new CLARYN membrane under clean tap water for 30 seconds before insertion. Do not touch the membrane surface.' },
      { title: 'Insert the New Membrane', desc: 'Insert the new membrane in the same orientation as the old one. Push firmly until it seats fully. The brine seal (rubber seal) should face the direction water enters.' },
      { title: 'Reassemble and Pressurize', desc: 'Replace and tighten the housing cap (clockwise) with the wrench — snug but not over-tightened. Open the feed water valve.' },
      { title: 'Check for Leaks', desc: 'Inspect all connections for leaks. Let the system fill the storage tank (first fill may take 2–4 hours). Check connections again after initial fill.' },
      { title: 'Flush the New Membrane', desc: 'Discard the first 2 full tanks of water from the new membrane. This flushes any storage preservatives and brings the membrane to full performance.', warning: 'Do not use the first 2 tanks of water for drinking. Use them for watering plants or cleaning.' },
    ],
    commonMistakes: [
      'Inserting the membrane in the wrong orientation — always verify with your system manual',
      'Forgetting to flush 2 full tanks before use — results in unusual taste from membrane preservatives',
      'Over-tightening the housing cap — hand-tight plus quarter turn is usually sufficient',
      'Not replacing pre-filters — always replace sediment and carbon filters at the same time as the membrane',
      'Skipping the leak check — a small drip can cause significant damage over time',
    ],
  },
];

export async function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) return { title: 'Guide Not Found' };
  return {
    title: guide.title,
    description: `Step-by-step ${guide.title} for CLARYN products. ${guide.estimatedTime}. ${guide.difficulty}.`,
  };
}

export default async function InstallationGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();

  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 2.5rem)', paddingBottom: '2.5rem' }}>
        <div className="container">
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            <Link href="/installation" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Installation Center</Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{guide.title}</span>
          </nav>
          <span className="text-label" style={{ color: 'var(--color-blue-300)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wrench size={14} aria-hidden />Installation Guide
          </span>
          <h1 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-5)' }}>{guide.title}</h1>
          <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
            {[['Time',guide.estimatedTime],['Difficulty',guide.difficulty]].map(([k,v])=>(
              <div key={k} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{k}</p>
                <p style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: 'var(--space-12)', maxWidth: 860 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--space-10)', alignItems: 'start' }}>
          <div>
            {/* Tools */}
            <section style={{ marginBottom: 'var(--space-10)' }}>
              <h2 style={{ marginBottom: 'var(--space-5)' }}>Tools & Materials Required</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {guide.requiredTools.map(t => (
                  <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-gray-700)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-teal)', flexShrink: 0, marginTop: 2 }} aria-hidden />{t}
                  </li>
                ))}
              </ul>
            </section>

            {/* Steps */}
            <section style={{ marginBottom: 'var(--space-10)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Installation Steps</h2>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {guide.steps.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 'var(--space-5)' }}>
                    <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 'var(--radius-full)', background: 'var(--color-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--text-sm)', fontFamily: 'var(--font-secondary)' }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-2)' }}>{step.title}</h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.8 }}>{step.desc}</p>
                      {step.warning && (
                        <div className="callout callout--warning" style={{ marginTop: 'var(--space-3)' }}>
                          <AlertTriangle size={16} className="callout__icon" style={{ color: 'var(--color-warning)' }} />
                          <div className="callout__content"><p className="callout__body">{step.warning}</p></div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Common Mistakes */}
            <section>
              <h2 style={{ marginBottom: 'var(--space-5)' }}>Common Mistakes to Avoid</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {guide.commonMistakes.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 'var(--radius-md)' }}>
                    <AlertTriangle size={16} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} aria-hidden />
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.7 }}>{m}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 2rem)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ background: 'var(--color-navy)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', color: 'rgba(255,255,255,0.8)' }}>
              <h3 style={{ color: '#fff', marginBottom: 'var(--space-4)' }}>Compatible Products</h3>
              {guide.productModels.map(m => <p key={m} style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{m}</p>)}
              <Link href="/products" className="btn btn--outline-white btn--sm" style={{ marginTop: 'var(--space-4)', width: '100%', justifyContent: 'center' }}>View Products</Link>
            </div>
            <div style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Need Help?</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>If you hit an issue not covered here, contact our support team.</p>
              <Link href="/contact" className="btn btn--outline btn--sm" style={{ width: '100%', justifyContent: 'center' }}>Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
