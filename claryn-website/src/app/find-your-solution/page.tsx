'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Droplets, AlertTriangle, CheckCircle } from 'lucide-react';
import { products } from '@/data/products';

type Step = { q: string; answers: { label: string; next: string | null; productId?: string }[] };
type Steps = Record<string, Step>;

const STEPS: Steps = {
  start: {
    q: 'What is your main water source?',
    answers: [
      { label: 'Municipal / Corporation Water', next: 'municipal-tds' },
      { label: 'Borewell / Tubewell / Groundwater', next: 'borewell-tds' },
      { label: 'Tanker Water', next: 'borewell-tds' },
      { label: 'I\'m not sure', next: 'goal' },
    ],
  },
  'municipal-tds': {
    q: 'Do you know your water\'s TDS level?',
    answers: [
      { label: 'Yes — below 500 ppm', next: 'size-municipal-low' },
      { label: 'Yes — 500–1500 ppm', next: 'size-municipal-mid' },
      { label: 'No, I don\'t know my TDS', next: 'goal' },
    ],
  },
  'borewell-tds': {
    q: 'How would you describe your water?',
    answers: [
      { label: 'Slightly hard / mildly salty', next: 'size-borewell-low' },
      { label: 'Hard or highly saline / TDS above 1000 ppm', next: 'size-borewell-high' },
      { label: 'I\'m not sure', next: 'goal' },
    ],
  },
  'size-municipal-low': {
    q: 'How many people in your household?',
    answers: [
      { label: 'Up to 5 people', next: null, productId: 'claryn-100-gpd-2500tds' },
      { label: '6 or more people', next: null, productId: 'claryn-100-gpd-5layer' },
    ],
  },
  'size-municipal-mid': {
    q: 'How many people in your household?',
    answers: [
      { label: 'Up to 5 people', next: null, productId: 'claryn-100-gpd-2500tds' },
      { label: '6 or more people', next: null, productId: 'claryn-100-gpd-5layer' },
    ],
  },
  'size-borewell-low': {
    q: 'How many people in your household?',
    answers: [
      { label: 'Up to 5 people', next: null, productId: 'claryn-100-gpd-2500tds' },
      { label: '6 or more people', next: null, productId: 'claryn-100-gpd-5layer' },
    ],
  },
  'size-borewell-high': {
    q: 'For high-TDS borewell water, the 100 GPD membrane is recommended for adequate throughput. How many people in your household?',
    answers: [
      { label: 'Any size household', next: null, productId: 'claryn-100-gpd-5layer' },
    ],
  },
  goal: {
    q: 'What is your main goal?',
    answers: [
      { label: 'Replace an existing membrane', next: null, productId: 'claryn-100-gpd-2500tds' },
      { label: 'Upgrade to a better membrane', next: null, productId: 'claryn-100-gpd-2500tds' },
      { label: 'Learn more about water quality', next: 'learn' },
    ],
  },
  learn: {
    q: 'Great! Our Knowledge Hub has guides to help you understand your water and choose the right solution.',
    answers: [
      { label: 'Take me to the Knowledge Hub', next: null, productId: undefined },
    ],
  },
};

export default function FindYourSolutionPage() {
  const [step, setStep] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const navigate = (next: string | null, productId?: string) => {
    if (!next || next === null) {
      setResult(productId ?? null);
    } else {
      setHistory(h => [...h, step]);
      setStep(next);
    }
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    if (prev) { setHistory(h => h.slice(0, -1)); setStep(prev); setResult(null); }
  };

  const restart = () => { setStep('start'); setHistory([]); setResult(null); };

  const current = STEPS[step];
  const product = result ? products.find(p => p.id === result) : null;

  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <Droplets size={40} style={{ color: 'var(--color-blue-300)', marginBottom: 'var(--space-4)' }} aria-hidden />
          <h1 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-4)' }}>Find Your Water Solution</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 560, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>Answer a few quick questions and we&apos;ll recommend the right CLARYN solution for your water and household.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          {!product ? (
            <div style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', background: 'var(--color-white)' }}>
              {history.length > 0 && (
                <button onClick={goBack} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 'var(--space-6)', fontFamily: 'inherit' }}>
                  ← Back
                </button>
              )}
              <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-1)' }}>
                {Array.from({ length: Math.max(3, history.length + 1) }).map((_, i) => (
                  <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= history.length ? 'var(--color-blue)' : 'var(--color-gray-200)', transition: 'background 300ms' }} />
                ))}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', marginBottom: 'var(--space-6)', textAlign: 'right' }}>Step {history.length + 1}</p>

              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-7)', lineHeight: 1.5 }}>{current.q}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {current.answers.map((ans) => (
                  <button key={ans.label} onClick={() => {
                    if (ans.label === 'Take me to the Knowledge Hub') { window.location.href = '/learn'; return; }
                    navigate(ans.next, ans.productId);
                  }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5)', border: '2px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)', background: 'var(--color-white)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'var(--text-base)', color: 'var(--color-navy)', fontWeight: 500, textAlign: 'left', transition: 'all var(--transition-fast)' }}>
                    <span>{ans.label}</span>
                    <ChevronRight size={18} style={{ color: 'var(--color-gray-400)', flexShrink: 0 }} aria-hidden />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', background: 'var(--color-white)' }}>
              <div style={{ background: 'var(--color-navy)', padding: 'var(--space-8)', textAlign: 'center' }}>
                <CheckCircle size={48} style={{ color: 'var(--color-teal)', margin: '0 auto var(--space-4)' }} aria-hidden />
                <h2 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-2)' }}>Our Recommendation</h2>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>Based on your answers, we recommend:</p>
              </div>
              <div style={{ padding: 'var(--space-8)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>{product.model}</p>
                <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>{product.name}</h3>
                <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{product.shortDescription}</p>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
                  {[`${product.specs.gpd} GPD`,`${product.specs.membraneLayers}-Layer TFC`,`${product.specs.saltRejectionPercent}% Rejection`,`Up to ${product.specs.maxTDS} ppm TDS`].map(s => (
                    <span key={s} style={{ padding: '3px 10px', background: 'var(--color-blue-50)', color: 'var(--color-blue)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
                  <Link href={`/products/${product.slug}`} className="btn btn--primary">View Product Details</Link>
                  {product.marketplaceLinks.filter(m=>m.isActive&&m.availability==='in_stock').map(m => (
                    <a key={m.id} href={m.url} className="btn btn--outline" target="_blank" rel="noopener noreferrer">{m.ctaLabel}</a>
                  ))}
                </div>
                <button onClick={restart} style={{ background: 'none', border: 'none', color: 'var(--color-gray-400)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'var(--text-sm)' }}>
                  ← Start over
                </button>
              </div>
            </div>
          )}

          <div className="callout callout--info" style={{ marginTop: 'var(--space-8)' }}>
            <AlertTriangle size={18} className="callout__icon" style={{ color: 'var(--color-blue)' }} />
            <div className="callout__content">
              <p className="callout__body">This tool provides a general recommendation based on common use cases. For complex water quality situations or commercial applications, we recommend contacting our support team for a more detailed assessment.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
