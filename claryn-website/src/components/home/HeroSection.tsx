'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import styles from './HeroSection.module.css';

const SOURCES = [
  {
    id: 'borewell',
    label: 'Borewell',
    detail: 'Groundwater / Tubewell',
    context: 'Borewell water typically carries higher dissolved solids, hardness, and regional mineral content. A water test is the best starting point.',
    metric: 'TDS: Often Elevated',
    color: '#0077C8',
  },
  {
    id: 'municipal',
    label: 'Municipal',
    detail: 'Corporation / Tap',
    context: 'Municipal water quality varies significantly by city, season, and pipe infrastructure. Treatment quality alone does not guarantee what reaches your tap.',
    metric: 'TDS: Variable',
    color: '#00B4A6',
  },
  {
    id: 'other',
    label: 'Not Sure',
    detail: 'Tank / Other',
    context: 'Start by understanding your water. A simple TDS meter test is the first step toward knowing what your water actually contains.',
    metric: 'TDS: Unknown',
    color: '#7AC943',
  },
] as const;

type SourceId = typeof SOURCES[number]['id'];

export function HeroSection() {
  const [active, setActive] = useState<SourceId | null>(null);
  const src = SOURCES.find(s => s.id === active) ?? null;

  return (
    <section className={styles.hero} aria-label="CLARYN — Better Water Starts With Understanding It">
      <div className={styles.heroContainer}>
        {/* ── LEFT: Headline + Interaction ── */}
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Water Solutions &amp; Technology by Udarta Watertech
          </div>

          <h1 className={styles.heroHeadline}>
            Better Water<br />
            Starts With{' '}
            <span className={styles.heroHeadlineAccent}>Understanding It.</span>
          </h1>

          <p className={styles.heroBody}>
            From water quality and filtration to products, technology, installation and support —
            CLARYN helps you make better decisions about the water you use every day.
          </p>

          {/* Interactive source picker */}
          <div className={styles.sourceModule}>
            <p className={styles.sourceLabel}>What&apos;s your water source?</p>
            <div className={styles.sourceBtnRow} role="group" aria-label="Select your water source">
              {SOURCES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActive(active === s.id ? null : s.id)}
                  aria-pressed={active === s.id}
                  className={`${styles.sourceBtn} ${active === s.id ? styles.sourceBtnActive : ''}`}
                >
                  <span className={styles.sourceBtnLabel}>{s.label}</span>
                  <span className={styles.sourceBtnDetail}>{s.detail}</span>
                </button>
              ))}
            </div>

            <div className={`${styles.sourceContext} ${src ? styles.sourceContextOpen : ''}`} role="status" aria-live="polite">
              {src && (
                <>
                  <span className={styles.sourceContextChip} style={{ color: src.color, borderColor: `${src.color}30`, background: `${src.color}10` }}>
                    {src.metric}
                  </span>
                  <p className={styles.sourceContextText}>{src.context}</p>
                </>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className={styles.heroCTAs}>
            <Link href="/find-your-solution" className="btn btn--primary btn--lg">
              Find My Water Solution
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/products" className={styles.heroSecondCTA}>
              Explore CLARYN <ChevronRight size={14} aria-hidden />
            </Link>
          </div>

          {/* Brand pillars */}
          <div className={styles.heroPillars}>
            {['Water Technology', 'Product Engineering', 'Installation Support', 'Water Knowledge'].map(p => (
              <div key={p} className={styles.heroPillar}>
                <span className={styles.heroPillarDot} />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Water Intelligence Panel ── */}
        <div className={styles.heroRight} aria-hidden>
          <WaterFlowPanel activeId={active} activeSource={src} />
        </div>
      </div>
    </section>
  );
}

/* ─── Water Intelligence Panel ──────────────────────────────────────────── */

type FlowStage = {
  num: string;
  label: string;
  detail: (id: SourceId | null) => string;
  badge: string;
};

const FLOW_STAGES: FlowStage[] = [
  {
    num: '01',
    label: 'Water Source',
    detail: id => id === 'borewell' ? 'Borewell / Groundwater' : id === 'municipal' ? 'Municipal Supply' : 'Source Pending',
    badge: 'INPUT',
  },
  {
    num: '02',
    label: 'Quality Analysis',
    detail: () => 'TDS · pH · Hardness · Dissolved Solids',
    badge: 'MEASURE',
  },
  {
    num: '03',
    label: 'Pre-Filtration',
    detail: () => 'Sediment · Carbon · Particulate Reduction',
    badge: 'STAGE 1',
  },
  {
    num: '04',
    label: 'RO Membrane',
    detail: () => '5-Layer TFC · Salt Rejection',
    badge: 'STAGE 2',
  },
  {
    num: '05',
    label: 'Purified Output',
    detail: () => 'Reduced TDS · Cleaner Water',
    badge: 'OUTPUT',
  },
];

function WaterFlowPanel({
  activeId,
  activeSource,
}: {
  activeId: SourceId | null;
  activeSource: typeof SOURCES[number] | null;
}) {
  return (
    <div className={styles.flowPanel}>
      {/* Header */}
      <div className={styles.flowPanelHeader}>
        <div>
          <p className={styles.flowPanelTitle}>CLARYN Water System</p>
          <p className={styles.flowPanelSubtitle}>Purification Intelligence Overview</p>
        </div>
        <div className={styles.flowPanelStatus}>
          <span className={`${styles.flowStatusDot} ${activeId ? styles.flowStatusDotActive : ''}`} />
          <span>{activeId ? 'Source Identified' : 'Monitoring'}</span>
        </div>
      </div>

      {/* Flow stages */}
      <div className={styles.flowStages}>
        {FLOW_STAGES.map((stage, i) => {
          const isFirst = i === 0;
          const isLast = i === FLOW_STAGES.length - 1;
          const highlighted = isFirst && !!activeId;

          return (
            <div key={stage.num} className={styles.flowStageWrapper}>
              <div className={`${styles.flowStage} ${highlighted ? styles.flowStageHighlighted : ''}`}>
                {/* Left: number */}
                <div className={`${styles.flowNum} ${highlighted ? styles.flowNumActive : ''}`}>
                  {stage.num}
                </div>

                {/* Center: info */}
                <div className={styles.flowInfo}>
                  <span className={styles.flowLabel}>{stage.label}</span>
                  <span className={styles.flowDetail}>{stage.detail(activeId)}</span>
                </div>

                {/* Right: badge */}
                <span className={`${styles.flowBadge} ${isFirst && activeId ? styles.flowBadgeActive : ''} ${isLast ? styles.flowBadgeOutput : ''}`}>
                  {isFirst && activeId ? activeSource?.metric ?? stage.badge : stage.badge}
                </span>
              </div>

              {/* Connector between stages */}
              {!isLast && (
                <div className={styles.flowConnector}>
                  <span className={styles.flowConnectorLine} />
                  <span className={styles.flowConnectorDot} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={styles.flowPanelFooter}>
        <p>Understanding water is the first step toward improving it.</p>
        <Link href="/learn/tds-hard-water/what-is-tds-in-water" className={styles.flowPanelLink}>
          Learn about water quality <ChevronRight size={12} aria-hidden />
        </Link>
      </div>

      {/* Ambient glow decorations */}
      <div className={styles.flowGlow1} aria-hidden />
      <div className={styles.flowGlow2} aria-hidden />
    </div>
  );
}
