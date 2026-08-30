'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

/* ─── Water source definitions ────────────────────────────────────────────── */
type SourceId = 'borewell' | 'municipal' | 'unsure';

interface WaterSource {
  id:          SourceId;
  label:       string;
  sub:         string;
  tds:         string;
  tdsNote:     string;
  turbidity:   number;   /* 0–1: how dense/cloudy the water canvas looks */
  mineralTone: [number, number, number]; /* RGB for particle tint */
}

const SOURCES: WaterSource[] = [
  {
    id:          'borewell',
    label:       'Borewell',
    sub:         'Groundwater · Tubewell',
    tds:         '500–2000+',
    tdsNote:     'ppm · typically elevated',
    turbidity:   0.85,
    mineralTone: [160, 120, 64],   /* earthy/mineral */
  },
  {
    id:          'municipal',
    label:       'Municipal',
    sub:         'Corporation · Piped Supply',
    tds:         '150–600',
    tdsNote:     'ppm · variable by city',
    turbidity:   0.3,
    mineralTone: [0, 180, 166],    /* treated blue-teal */
  },
  {
    id:          'unsure',
    label:       'Not Sure',
    sub:         'Tanker · Mixed · Unknown',
    tds:         'Unknown',
    tdsNote:     'Test your water first',
    turbidity:   0.55,
    mineralTone: [0, 119, 200],    /* neutral blue */
  },
];

/* ─── Canvas Particle System ──────────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  life: number; maxLife: number;
  rgb: [number, number, number];
}

function createParticle(
  w: number, h: number,
  rgb: [number, number, number],
  turbidity: number,
): Particle {
  const maxLife = 80 + Math.random() * 120;
  return {
    x:       Math.random() * w,
    y:       Math.random() * h * 0.3,
    vx:      (Math.random() - 0.5) * 0.4,
    vy:      0.3 + Math.random() * 0.8 * turbidity,
    r:       1 + Math.random() * 2.5 * turbidity,
    alpha:   0,
    life:    0,
    maxLife,
    rgb,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const [activeSource, setActiveSource] = useState<SourceId | null>(null);
  const [mounted,      setMounted]      = useState(false);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: 0.5, y: 0.5 });
  const targetRef  = useRef({ x: 0.5, y: 0.5 });
  const rafRef     = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const sourceRef  = useRef<WaterSource | null>(null);

  const activeData = SOURCES.find(s => s.id === activeSource) ?? null;

  /* Update source ref when active changes */
  useEffect(() => {
    sourceRef.current = activeData;
  }, [activeData]);

  /* Mount animation */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Canvas setup & animation loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Initialise particles */
    particlesRef.current = Array.from({ length: 40 }, () =>
      createParticle(W, H, [0, 119, 200], 0.5)
    );

    const draw = () => {
      /* Smooth mouse parallax */
      const mx = mouseRef.current;
      const tx = targetRef.current;
      tx.x += (mx.x - tx.x) * 0.04;
      tx.y += (mx.y - tx.y) * 0.04;

      ctx.clearRect(0, 0, W, H);

      const source = sourceRef.current;
      const turbidity = source?.turbidity ?? 0.5;
      const rgb = source?.mineralTone ?? ([0, 119, 200] as [number,number,number]);

      /* ── Background gradient — reacts to mouse ── */
      const gx = W * 0.5 + (tx.x - 0.5) * W * 0.08;
      const gy = H * 0.5 + (tx.y - 0.5) * H * 0.08;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.7);
      const alpha = 0.04 + turbidity * 0.08;
      grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`);
      grad.addColorStop(0.5, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(244,247,250,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      /* ── Filtration column visual ── */
      const cx   = W * (0.52 + (tx.x - 0.5) * 0.03);
      const colW  = Math.min(W * 0.18, 100);
      const colH  = H * 0.75;
      const colY  = H * 0.1;
      const colX  = cx - colW / 2;

      /* Column background — glass tube */
      const tubeGrad = ctx.createLinearGradient(colX, 0, colX + colW, 0);
      tubeGrad.addColorStop(0, 'rgba(255,255,255,0.18)');
      tubeGrad.addColorStop(0.15, 'rgba(255,255,255,0.06)');
      tubeGrad.addColorStop(0.85, 'rgba(255,255,255,0.04)');
      tubeGrad.addColorStop(1, 'rgba(255,255,255,0.14)');
      ctx.beginPath();
      ctx.roundRect(colX, colY, colW, colH, 12);
      ctx.fillStyle = tubeGrad;
      ctx.fill();

      /* Column border */
      ctx.beginPath();
      ctx.roundRect(colX, colY, colW, colH, 12);
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${0.15 + turbidity * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      /* ── Filtration layer bands ── */
      const layers = [
        { y: 0, h: 0.2, color: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${0.08 + turbidity * 0.12})`, label: '' },
        { y: 0.2, h: 0.18, color: 'rgba(40,40,40,0.12)', label: '' },
        { y: 0.38, h: 0.28, color: `rgba(0,119,200,${0.12 + turbidity * 0.06})`, label: '' },
        { y: 0.66, h: 0.18, color: 'rgba(0,180,166,0.10)', label: '' },
        { y: 0.84, h: 0.16, color: 'rgba(255,255,255,0.08)', label: '' },
      ];

      layers.forEach(layer => {
        const ly = colY + colH * layer.y;
        const lh = colH * layer.h;
        ctx.beginPath();
        const bw = layer.y === 0 ? 12 : 0;
        const tw = (layer.y + layer.h >= 1) ? 12 : 0;
        ctx.roundRect(colX + 1, ly, colW - 2, lh, [bw, bw, tw, tw]);
        ctx.fillStyle = layer.color;
        ctx.fill();

        /* layer separator line */
        if (layer.y > 0) {
          ctx.beginPath();
          ctx.moveTo(colX + 4, ly);
          ctx.lineTo(colX + colW - 4, ly);
          ctx.strokeStyle = 'rgba(255,255,255,0.12)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      /* Glass edge highlight */
      ctx.beginPath();
      ctx.roundRect(colX, colY, 3, colH, 12);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fill();

      /* ── Particles — flow downward through column ── */
      const now = Date.now() * 0.001;
      const ps = particlesRef.current;

      /* Spawn new particles */
      if (ps.length < 60 && Math.random() < 0.3 + turbidity * 0.3) {
        const newP = createParticle(W, H, rgb, turbidity);
        /* Bias particles toward the column */
        if (Math.random() < 0.6) {
          newP.x = colX + Math.random() * colW;
          newP.y = colY + Math.random() * colH * 0.25;
        }
        ps.push(newP);
      }

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life++;
        p.x  += p.vx + Math.sin(now * 0.8 + i * 0.5) * 0.15;
        p.y  += p.vy;

        /* Fade in/out */
        if (p.life < 20) p.alpha = p.life / 20;
        else if (p.life > p.maxLife - 20) p.alpha = (p.maxLife - p.life) / 20;
        else p.alpha = 0.6 + turbidity * 0.3;

        /* Draw particle */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]},${p.alpha * 0.6})`;
        ctx.fill();

        /* Remove dead particles */
        if (p.life >= p.maxLife || p.y > H + 10) {
          ps.splice(i, 1);
        }
      }

      /* ── Water clarity transition glow ── */
      const outputGrad = ctx.createLinearGradient(colX, colY + colH * 0.6, colX, colY + colH);
      outputGrad.addColorStop(0, `rgba(0,119,200,0)`);
      outputGrad.addColorStop(0.5, `rgba(0,180,166,${0.06 + (1 - turbidity) * 0.06})`);
      outputGrad.addColorStop(1, `rgba(0,180,166,${0.12 + (1 - turbidity) * 0.1})`);
      ctx.beginPath();
      ctx.roundRect(colX + 1, colY + colH * 0.6, colW - 2, colH * 0.4, [0, 0, 12, 12]);
      ctx.fillStyle = outputGrad;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  /* Mouse parallax handler */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    };
  }, []);

  return (
    <section
      className={`${styles.hero} ${mounted ? styles.heroMounted : ''}`}
      onMouseMove={handleMouseMove}
      aria-label="CLARYN — Water, understood"
    >
      {/* Canvas water visualization */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        aria-hidden
      />

      {/* Content layer */}
      <div className={styles.heroInner}>

        {/* ── LEFT: Brand statement ───────────────────────────────────── */}
        <div className={styles.heroLeft}>

          <p className={styles.heroEyebrow} aria-hidden>
            Water Technology · Precision Engineering
          </p>

          <h1 className={styles.heroHeadline}>
            <span className={styles.heroWordmark}>CLARYN</span>
            <em className={styles.heroTagline}>Water, understood.</em>
          </h1>

          {/* ── Source selector ─────────────────────────────────────── */}
          <div className={styles.sourcePicker} role="group" aria-label="Select your water source">
            <p className={styles.sourcePickerLabel}>What&apos;s your water source?</p>
            <div className={styles.sourceBtns}>
              {SOURCES.map(s => (
                <button
                  key={s.id}
                  className={`${styles.sourceBtn} ${styles[`sourceBtn__${s.id}`]} ${activeSource === s.id ? styles.sourceBtnActive : ''}`}
                  onClick={() => setActiveSource(activeSource === s.id ? null : s.id)}
                  aria-pressed={activeSource === s.id}
                  id={`source-${s.id}`}
                >
                  <span className={styles.sourceBtnLabel}>{s.label}</span>
                  <span className={styles.sourceBtnSub}>{s.sub}</span>
                </button>
              ))}
            </div>

            {/* Context reveal */}
            <div
              className={`${styles.sourceContext} ${activeData ? styles.sourceContextOpen : ''}`}
              role="status"
              aria-live="polite"
            >
              {activeData && (
                <>
                  <span className={styles.sourceTDS}>
                    {activeData.tds}
                    <span className={styles.sourceTDSUnit}>{activeData.tdsNote}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* ── Single CTA ─────────────────────────────────────────── */}
          <div className={styles.heroCTAs}>
            <Link href="/find-your-solution" className={styles.heroCTA} id="hero-cta">
              <span className={styles.heroCTAText}>Find Your Water Solution</span>
              <span className={styles.heroCTAArrow} aria-hidden>
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          {/* ── Discipline strip ────────────────────────────────────── */}
          <div className={styles.heroStrip} aria-hidden>
            {['Water Technology', 'RO Engineering', 'Filtration Science', 'Precision Components'].map((label, i) => (
              <span key={label} className={styles.heroStripItem}>
                {i > 0 && <span className={styles.heroStripDot}>·</span>}
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Ambient column labels ────────────────────────────── */}
        <div className={styles.heroRight} aria-hidden>
          <div className={styles.columnLabels}>
            {[
              { label: 'Sediment', spec: '5µm Pre-Filter', top: '13%' },
              { label: 'Carbon',   spec: 'Activated Block', top: '30%' },
              { label: 'RO Membrane', spec: 'CLARYN 5-Layer TFC', top: '50%', primary: true },
              { label: 'Post-Filter', spec: 'Remineralisation', top: '71%' },
            ].map(item => (
              <div
                key={item.label}
                className={`${styles.columnLabel} ${item.primary ? styles.columnLabelPrimary : ''}`}
                style={{ top: item.top }}
              >
                <div className={styles.columnLabelTick} />
                <div className={styles.columnLabelContent}>
                  <span className={styles.columnLabelName}>{item.label}</span>
                  <span className={styles.columnLabelSpec}>{item.spec}</span>
                </div>
              </div>
            ))}

            {/* Purified output readout */}
            <div className={styles.columnOutput}>
              <span className={styles.columnOutputVal}>≤ 50</span>
              <span className={styles.columnOutputUnit}>ppm · Purified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────────────── */}
      <div className={styles.scrollHint} aria-hidden>
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}

/* ─── Scroll Clarity Indicator (kept for layout.tsx compatibility) ─────────── */
export function ScrollClarityIndicator() {
  /* Removed from global layout — returns null */
  return null;
}
