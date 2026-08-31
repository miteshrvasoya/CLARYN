'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './MembraneVisual.module.css';

interface MembraneLayer {
  id: string;
  num: string;
  name: string;
  role: string;
  colorFrom: string;
  colorTo: string;
  height: number;
  primary?: boolean;
}

const LAYERS: MembraneLayer[] = [
  {
    id: 'polyester',
    num: '01',
    name: 'Polyester Non-Woven Support',
    role: 'Mechanical substrate — structural base and dimensional stability.',
    colorFrom: '#0a1520',
    colorTo: '#112030',
    height: 14,
  },
  {
    id: 'polysulfone',
    num: '02',
    name: 'Microporous Polysulfone',
    role: 'Intermediate support — precise pore structure control.',
    colorFrom: '#102840',
    colorTo: '#163450',
    height: 18,
  },
  {
    id: 'polyamide',
    num: '03',
    name: 'Ultra-Thin Polyamide Film',
    role: 'Active rejection layer — responsible for dissolved solids rejection.',
    colorFrom: '#003a7a',
    colorTo: '#0057b8',
    height: 26,
    primary: true,
  },
  {
    id: 'coating',
    num: '04',
    name: 'Protective Coating',
    role: 'Guards the active layer from physical damage.',
    colorFrom: '#102840',
    colorTo: '#163450',
    height: 18,
  },
  {
    id: 'backing',
    num: '05',
    name: 'Flow-Control Backing',
    role: 'Manages permeate flow direction and membrane integrity.',
    colorFrom: '#0a1520',
    colorTo: '#112030',
    height: 14,
  },
];

type LayerId = string;

export function MembraneVisual() {
  const [hovered, setHovered] = useState<LayerId | null>(null);
  const [exploded, setExploded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Trigger explode on scroll into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.3) setExploded(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeLayer = LAYERS.find(l => l.id === hovered) ?? null;

  /* Exploded Y offsets — layers spread apart vertically to show cross-section */
  const getOffset = (i: number) => {
    if (!exploded) return 0;
    const center = 2; // layer 03 is center
    return (i - center) * 20; // pull apart vertically
  };

  return (
    <section
      className={styles.membraneSection}
      ref={sectionRef}
      aria-label="CLARYN 5-Layer RO Membrane — Technical Visualization"
    >
      <div className={styles.membraneInner}>

        {/* ── Left text ─────────────────────────────────────────────────── */}
        <div className={styles.membraneText}>
          <span className={styles.membraneEyebrow}>Engineering</span>
          <h2 className={styles.membraneHeading}>
            Behind every drop<br />is engineering.
          </h2>
          <p className={styles.membraneDesc}>
            A CLARYN RO membrane is precision-engineered in five bonded layers.
            Each contributes to consistent, high-performance water purification.
          </p>
          <p className={styles.membraneNote}>
            Diagram is representative. Layer specifications confirmed from product technical data.
          </p>

          {/* Layer info panel */}
          <div className={`${styles.layerInfo} ${activeLayer ? styles.layerInfoVisible : ''}`}>
            {activeLayer && (
              <>
                <span className={styles.layerInfoNum}>{activeLayer.num}</span>
                <div>
                  <p className={styles.layerInfoName}>{activeLayer.name}</p>
                  <p className={styles.layerInfoRole}>{activeLayer.role}</p>
                </div>
              </>
            )}
          </div>

          <div className={styles.membraneSpec}>
            <span className={styles.membraneSpecNum}>5</span>
            <span className={styles.membraneSpecLabel}>Layer TFC Polyamide — CLARYN</span>
          </div>
        </div>

        {/* ── Right: Membrane diagram ────────────────────────────────────── */}
        <div className={styles.membraneDiagram} aria-hidden>
          <div className={styles.membraneDiagramInner}>

            {/* Water flow arrows */}
            <div className={`${styles.flowArrow} ${styles.flowArrowIn}`}>
              <div className={styles.flowLine} />
              {/* <span className={styles.flowLabel}>Feed water</span> */}
            </div>

            {/* Layers */}
            <div className={styles.layers}>
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.id}
                  className={`${styles.layer} ${layer.primary ? styles.layerPrimary : ''} ${hovered === layer.id ? styles.layerHovered : ''}`}
                  style={{
                    transform: `translateY(${getOffset(i)}px) ${hovered === layer.id ? 'scale(1.02)' : 'scale(1)'}`,
                    transition: `transform ${0.4 + i * 0.05}s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease`,
                    background: `linear-gradient(90deg, ${layer.colorFrom} 0%, ${layer.colorTo} 100%)`,
                    transitionDelay: exploded ? `${i * 0.03}s` : '0s',
                    zIndex: hovered === layer.id ? 10 : 1,
                  }}
                  onMouseEnter={() => setHovered(layer.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(layer.id)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Layer ${layer.num}: ${layer.name}`}
                >
                  {/* Inner texture lines */}
                  {layer.primary && (
                    <div className={styles.layerTexture}>
                      {[...Array(6)].map((_, ti) => (
                        <div key={ti} className={styles.layerTextureLine} style={{ top: `${15 + ti * 14}%` }} />
                      ))}
                    </div>
                  )}

                  {/* Number */}
                  <span className={styles.layerNum}>{layer.num}</span>

                  {/* Annotation on right (always visible, fades in opacity if not hovered) */}
                  <div className={styles.layerAnnotation}>
                    <span className={styles.layerAnnotationName}>{layer.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Output arrow */}
            <div className={`${styles.flowArrow} ${styles.flowArrowOut}`}>
              <div className={styles.flowLine} />
              {/* <span className={styles.flowLabel}>Purified output — ≤50 ppm</span> */}
            </div>
          </div>

          {/* Explode toggle hint */}
          <p className={styles.explodeHint}>
            {exploded ? 'Hover each layer to inspect' : 'Scroll to reveal layers'}
          </p>
        </div>
      </div>
    </section>
  );
}
