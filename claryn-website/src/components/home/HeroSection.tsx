'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

/* ─── Water source data ───────────────────────────────────────────────────── */
const SOURCES = [
  {
    id:      'borewell',
    label:   'Borewell',
    sub:     'Groundwater / Tubewell',
    context: 'Groundwater typically carries higher TDS and dissolved minerals — hardness, fluoride, and iron levels that vary by region and depth. A simple TDS test is the starting point.',
    tds:     '500–2000+ ppm',
    tdsNote: 'TDS typically elevated',
    tint:    'silt',   /* Silt Clay tint — earthy, unfiltered */
  },
  {
    id:      'municipal',
    label:   'Municipal',
    sub:     'Corporation / Piped Supply',
    context: 'Municipal water is treated but quality varies by city, season, and the age of the pipe infrastructure between the plant and your tap. Treatment alone doesn\'t guarantee what arrives.',
    tds:     '150–600 ppm',
    tdsNote: 'TDS variable by city',
    tint:    'aqua',   /* Clear Aqua tint — closer to treated */
  },
  {
    id:      'other',
    label:   'Not Sure',
    sub:     'Tanker / Mixed / Unknown',
    context: 'Start with a test. A basic TDS meter gives you a reading in 30 seconds and is the first data point toward understanding your water — and choosing the right solution.',
    tds:     'Unknown',
    tdsNote: 'Test your water first',
    tint:    'neutral',
  },
] as const;

type SourceId = typeof SOURCES[number]['id'];

/* ─── Clarity Column layer data ───────────────────────────────────────────── */
type FilterLayer = {
  id:      string;
  label:   string;
  spec:    string;
  role:    string;
  shade:   'sediment' | 'carbon' | 'membrane' | 'mineral';
  height:  number;
  primary?: boolean;
};

const FILTER_LAYERS: FilterLayer[] = [
  {
    id:      'sediment',
    label:   'Sediment',
    spec:    '5µm Pre-Filter',
    role:    'Traps sand, silt, rust, particulate matter.',
    shade:   'sediment',
    height:  18,
  },
  {
    id:      'carbon',
    label:   'Carbon',
    spec:    'Activated Block',
    role:    'Removes chlorine, taste, odour.',
    shade:   'carbon',
    height:  18,
  },
  {
    id:      'membrane',
    label:   'RO Membrane',
    spec:    'CLARYN 5-Layer TFC',
    role:    'Rejects dissolved salts, metals, contaminants.',
    shade:   'membrane',
    height:  26,
    primary: true,
  },
  {
    id:      'mineral',
    label:   'Post-Mineral',
    spec:    'Remineralisation Stage',
    role:    'Restores beneficial minerals to purified water.',
    shade:   'mineral',
    height:  18,
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const [source,  setSource]  = useState<SourceId | null>(null);
  const [visible, setVisible] = useState(false);

  /* Trigger entry animation after mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const active = SOURCES.find(s => s.id === source) ?? null;

  return (
    <section
      className={`${styles.hero} ${visible ? styles.heroVisible : ''}`}
      aria-label="CLARYN — Better Water Starts With Understanding It"
    >
      <div className={styles.heroGrid}>

        {/* ── LEFT COLUMN ───────────────────────────────────────────────── */}
        <div className={styles.heroLeft}>

          {/* Eyebrow — Plex Mono, not a badge */}
          <p className={styles.eyebrow} aria-label="Water quality metrics">
            TDS<span className={styles.eyebrowSep}>·</span>pH<span className={styles.eyebrowSep}>·</span>HARDNESS
            <span className={styles.eyebrowDash}>—</span>
            <span className={styles.eyebrowMsg}>MEASURED, NOT GUESSED</span>
          </p>

          {/* Headline — Fraunces display serif, blur-to-sharp on load */}
          <h1 className={`${styles.headline} ${visible ? styles.headlineResolved : ''}`}>
            Better water<br />
            starts with<br />
            <em className={styles.headlineEm}>understanding it.</em>
          </h1>

          <p className={styles.bodyText}>
            CLARYN helps you know what your water actually contains — and
            choose the right filtration for your home, your source, and your region.
          </p>

          {/* Water source picker */}
          <div className={styles.sourcePicker}>
            <p className={styles.sourcePickerLabel}>
              WHAT&apos;S YOUR WATER SOURCE?
            </p>
            <div className={styles.sourceBtns} role="group" aria-label="Select your water source">
              {SOURCES.map(s => (
                <button
                  key={s.id}
                  className={`${styles.sourceBtn} ${styles[`sourceBtn--${s.tint}`]} ${source === s.id ? styles.sourceBtnActive : ''}`}
                  aria-pressed={source === s.id}
                  onClick={() => setSource(source === s.id ? null : s.id)}
                >
                  <span className={styles.sourceBtnLabel}>{s.label}</span>
                  <span className={styles.sourceBtnSub}>{s.sub}</span>
                </button>
              ))}
            </div>

            {/* Context reveal */}
            <div
              className={`${styles.sourceContext} ${active ? styles.sourceContextOpen : ''}`}
              role="status"
              aria-live="polite"
            >
              {active && (
                <>
                  <p className={styles.sourceContextTDS}>
                    {active.tds}
                    <span className={styles.sourceContextTDSNote}>{active.tdsNote}</span>
                  </p>
                  <p className={styles.sourceContextText}>{active.context}</p>
                </>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link href="/find-your-solution" className={styles.ctaPrimary} id="hero-cta-primary">
              <span className={styles.ctaPrimaryFill} aria-hidden />
              <span className={styles.ctaPrimaryContent}>
                Find My Water Solution
                <ArrowRight size={16} aria-hidden />
              </span>
            </Link>
            <Link href="/products" className={styles.ctaGhost}>
              Explore CLARYN <ArrowRight size={13} aria-hidden />
            </Link>
          </div>

          {/* Pillars strip */}
          <div className={styles.pillars} aria-label="CLARYN capability areas">
            {[
              'Water Technology',
              'Product Engineering',
              'Installation Support',
              'Water Knowledge',
            ].map((p, i) => (
              <span key={p} className={styles.pillar}>
                {i > 0 && <span className={styles.pillarDivider} aria-hidden>·</span>}
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: CLARITY COLUMN ──────────────────────────────── */}
        <div className={styles.heroRight} aria-hidden>
          <ClarityColumn activeSource={active} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CLARITY COLUMN — The signature visual
   CSS glass cylinder illustrating the actual filtration process
   ═══════════════════════════════════════════════════════════════════════════ */
function ClarityColumn({
  activeSource,
}: {
  activeSource: typeof SOURCES[number] | null;
}) {
  const particleCount = 8;

  return (
    <figure className={styles.clarityFigure}>
      <figcaption className={styles.clarityCaption}>
        CLARYN Filtration Process — Illustrated
      </figcaption>

      {/* Output label (top) */}
      <div className={styles.clarityOutput}>
        <div className={styles.clarityOutputReadout}>
          <span className={styles.clarityOutputVal}>≤ 50</span>
          <span className={styles.clarityOutputUnit}>ppm TDS</span>
        </div>
        <span className={styles.clarityOutputLabel}>PURIFIED OUTPUT</span>
      </div>

      {/* The cylinder */}
      <div className={styles.clarityTube}>

        {/* Input water — turbid bottom */}
        <div className={styles.clarityInputWater}>
          {activeSource && (
            <span className={styles.clarityInputLabel}>
              {activeSource.tds}
            </span>
          )}
          {/* Animated sediment particles */}
          <div className={styles.particles} aria-hidden>
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className={styles.particle}
                style={{
                  left:             `${10 + (i * 7.5) % 80}%`,
                  animationDelay:   `${(i * 0.4) % 3.2}s`,
                  animationDuration:`${2 + (i * 0.3) % 1.5}s`,
                  width:            `${2 + (i % 3)}px`,
                  height:           `${2 + (i % 3)}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Filter layers — bottom to top (DOM order top-to-bottom so we reverse visual) */}
        <div className={styles.clarityLayers}>
          {[...FILTER_LAYERS].reverse().map(layer => (
            <div
              key={layer.id}
              className={`${styles.clarityLayer} ${styles[`clarityLayer--${layer.shade}`]} ${layer.primary ? styles.clarityLayerPrimary : ''}`}
              style={{ flex: layer.height }}
            >
              {/* Scan line to suggest membrane texture */}
              {layer.primary && (
                <div className={styles.clarityLayerScan} aria-hidden />
              )}

              {/* Right-hand label */}
              <div className={styles.clarityLayerAnnotation}>
                <div className={styles.clarityLayerTick} />
                <div className={styles.clarityLayerLabel}>
                  <span className={styles.clarityLayerName}>{layer.label}</span>
                  <span className={styles.clarityLayerSpec}>{layer.spec}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rising water particles (purification) */}
        <div className={styles.risingParticles} aria-hidden>
          {[...Array(particleCount)].map((_, i) => (
            <span
              key={i}
              className={styles.risingParticle}
              style={{
                left:             `${15 + (i * 11.5) % 70}%`,
                animationDelay:   `${(i * 0.55) % 4}s`,
                animationDuration:`${3.5 + (i * 0.25) % 2}s`,
              }}
            />
          ))}
        </div>

        {/* Glass highlight (left edge) */}
        <div className={styles.clarityGlassHighlight} aria-hidden />
        {/* Glass edge shadow (right) */}
        <div className={styles.clarityGlassEdge} aria-hidden />
      </div>

      {/* Input label (bottom) */}
      <div className={styles.clarityInputRow}>
        <div className={styles.clarityInputReadout}>
          {activeSource ? (
            <>
              <span className={styles.clarityInputVal}>{activeSource.tds}</span>
              <span className={styles.clarityInputUnit}>FEED WATER</span>
            </>
          ) : (
            <>
              <span className={styles.clarityInputVal}>Turbid</span>
              <span className={styles.clarityInputUnit}>FEED WATER · High TDS</span>
            </>
          )}
        </div>
      </div>

      {/* Role text */}
      <p className={styles.clarityNote}>
        Filtration layer data from CLARYN membrane technical specification.
      </p>
    </figure>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL CLARITY INDICATOR
   Fixed thin column on the right edge — exported for use in page layout
   ═══════════════════════════════════════════════════════════════════════════ */
export function ScrollClarityIndicator() {
  const [pct, setPct] = useState(0);
  const rafRef        = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={styles.scrollIndicator}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={styles.scrollIndicatorFill}
        style={{ height: `${pct}%` }}
      />
      <div className={styles.scrollIndicatorGlass} aria-hidden />
    </div>
  );
}
