'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './ScrollStory.module.css';

const STAGES = [
  {
    id:     'source',
    num:    '01',
    label:  'Source',
    title:  'Where water begins.',
    water:  { r: 130, g: 100, b: 60, a: 0.65 },   /* Earthy, turbid */
  },
  {
    id:     'prefilter',
    num:    '02',
    label:  'Pre-Filtration',
    title:  'Sediment removed.',
    water:  { r: 80, g: 130, b: 180, a: 0.5 },    /* Partially clearer */
  },
  {
    id:     'carbon',
    num:    '03',
    label:  'Carbon Stage',
    title:  'Taste. Odour. Chlorine.',
    water:  { r: 30, g: 110, b: 190, a: 0.4 },    /* Cleaner blue */
  },
  {
    id:     'ro',
    num:    '04',
    label:  'RO Membrane',
    title:  'Dissolved salts — rejected.',
    water:  { r: 0, g: 160, b: 200, a: 0.28 },    /* Clear cyan */
  },
  {
    id:     'output',
    num:    '05',
    label:  'Post-Filtration',
    title:  'Water, understood.',
    water:  { r: 0, g: 180, b: 166, a: 0.18 },    /* Near-clear teal */
  },
] as const;

type StageId = typeof STAGES[number]['id'];

export function ScrollStory() {
  const [activeStage, setActiveStage] = useState<StageId>('source');
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs  = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stageRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              setActiveStage(STAGES[i].id);
            }
          });
        },
        { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const active = STAGES.find(s => s.id === activeStage) ?? STAGES[0];
  const { r, g, b, a } = active.water;

  return (
    <section className={styles.scrollStory} ref={sectionRef} aria-label="Filtration journey">
      {/* ── Sticky visual ─────────────────────────────────────────────────── */}
      <div className={styles.sticky}>
        {/* Water visualization */}
        <div
          className={styles.waterViz}
          style={{
            background: `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(${r},${g},${b},${a}) 0%, rgba(${r},${g},${b},0) 100%)`,
            transition: 'background 0.8s ease',
          }}
          aria-hidden
        />
        {/* Active stage label */}
        <div className={styles.stickyLabel} aria-live="polite">
          <span className={styles.stickyNum}>{active.num}</span>
          <span className={styles.stickyStage}>{active.label}</span>
        </div>
        {/* Water clarity bar */}
        <div className={styles.clarityTrack} aria-hidden>
          <div
            className={styles.clarityFill}
            style={{
              width: `${(STAGES.findIndex(s => s.id === activeStage) / (STAGES.length - 1)) * 100}%`,
              background: `rgba(${r},${g},${b},0.7)`,
              transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1), background 0.8s ease',
            }}
          />
        </div>
      </div>

      {/* ── Scroll stages ─────────────────────────────────────────────────── */}
      <div className={styles.stages}>
        <div className={styles.stagesIntro}>
          <p className={styles.stagesEyebrow}>The Process</p>
          <h2 className={styles.stagesHeading}>Every water source is different.</h2>
          <p className={styles.stagesSubhead}>
            The right treatment follows the water.
          </p>
        </div>

        {STAGES.map((stage, i) => (
          <div
            key={stage.id}
            className={`${styles.stage} ${activeStage === stage.id ? styles.stageActive : ''}`}
            ref={el => { stageRefs.current[i] = el; }}
          >
            <div className={styles.stageInner}>
              <span className={styles.stageNum}>{stage.num}</span>
              <div className={styles.stageContent}>
                <span className={styles.stageName}>{stage.label}</span>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
