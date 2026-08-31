'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import styles from './HeroSection.module.css';

/* ─── Canvas ambient particle system ─────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  life: number;
  maxLife: number;
}

function spawnParticle(W: number, H: number): Particle {
  const maxLife = 180 + Math.random() * 200;
  return {
    x:       Math.random() * W,
    y:       H + 8,
    vx:      (Math.random() - 0.5) * 0.6,
    vy:      -(0.15 + Math.random() * 0.45),
    r:       0.8 + Math.random() * 2,
    alpha:   0,
    life:    0,
    maxLife,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION — Dark cinematic brand statement. No interaction required.
   ═══════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const [phase,    setPhase]    = useState(0);   /* 0=hidden → 1=eyebrow → 2=word → 3=rest */
  const canvasRef              = useRef<HTMLCanvasElement>(null);
  const mouseRef               = useRef({ x: 0.5, y: 0.5 });
  const lerpRef                = useRef({ x: 0.5, y: 0.5 });
  const rafRef                 = useRef<number>(0);
  const particlesRef           = useRef<Particle[]>([]);

  /* Staggered reveal */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => setPhase(3), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* Canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = Math.round(W * window.devicePixelRatio);
      canvas.height = Math.round(H * window.devicePixelRatio);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Seed initial particles */
    particlesRef.current = Array.from({ length: 60 }, () => {
      const p = spawnParticle(W, H);
      p.y      = Math.random() * H;       /* scatter vertically at start */
      p.life   = Math.random() * p.maxLife;
      return p;
    });

    const draw = () => {
      const lp = lerpRef.current;
      const mp = mouseRef.current;
      lp.x += (mp.x - lp.x) * 0.035;
      lp.y += (mp.y - lp.y) * 0.035;

      ctx.clearRect(0, 0, W, H);

      /* ── Background: deep navy + blue radial glow follows mouse ── */
      const gx = W * (0.3 + lp.x * 0.4);
      const gy = H * (0.2 + lp.y * 0.5);

      /* Base fill */
      ctx.fillStyle = '#070E1A';
      ctx.fillRect(0, 0, W, H);

      /* Soft blue glow — parallax */
      const g1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.65);
      g1.addColorStop(0, 'rgba(0,100,200,0.13)');
      g1.addColorStop(0.5, 'rgba(0,60,140,0.05)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      /* Teal accent — bottom right, static */
      const g2 = ctx.createRadialGradient(W * 0.85, H * 0.8, 0, W * 0.85, H * 0.8, W * 0.45);
      g2.addColorStop(0, 'rgba(0,180,166,0.07)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      /* ── Particles — slow upward drift ── */
      const ps = particlesRef.current;
      const now = performance.now() * 0.001;

      /* Spawn */
      if (ps.length < 90 && Math.random() < 0.4) {
        ps.push(spawnParticle(W, H));
      }

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life++;
        p.x += p.vx + Math.sin(now * 0.4 + i * 0.9) * 0.08;
        p.y += p.vy;

        /* Fade in / sustain / fade out */
        const t = p.life / p.maxLife;
        if (t < 0.12)       p.alpha = t / 0.12;
        else if (t > 0.82)  p.alpha = (1 - t) / 0.18;
        else                p.alpha = 1;

        /* Two-tone: small = blue, larger = teal */
        const isBlue = p.r < 1.5;
        const col = isBlue ? `rgba(60,140,255,${p.alpha * 0.5})` : `rgba(0,180,166,${p.alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) ps.splice(i, 1);
      }

      /* ── Thin animated horizontal line — depth accent ── */
      const lineY = H * (0.68 + lp.y * 0.04);
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, 'rgba(0,119,200,0)');
      lineGrad.addColorStop(0.3, 'rgba(0,119,200,0.18)');
      lineGrad.addColorStop(0.7, 'rgba(0,180,166,0.12)');
      lineGrad.addColorStop(1, 'rgba(0,180,166,0)');
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(W, lineY);
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    };
  }, []);

  const visible = (minPhase: number) => phase >= minPhase;

  return (
    <section
      className={styles.hero}
      onMouseMove={handleMouseMove}
      aria-label="CLARYN — Water Technology"
    >
      {/* Full-canvas ambient background */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden />

      {/* Noise grain overlay */}
      <div className={styles.grain} aria-hidden />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className={styles.heroContent}>

        {/* Eyebrow */}
        <p className={`${styles.eyebrow} ${visible(1) ? styles.eyebrowVisible : ''}`} aria-hidden>
          <span className={styles.eyebrowDot} />
          Water Technology · RO Engineering
          <span className={styles.eyebrowDot} />
          Precision Filtration
        </p>

        {/* Main wordmark */}
        <h1 className={styles.wordmark} aria-label="CLARYN">
          {'CLARYN'.split('').map((ch, i) => (
            <span
              key={i}
              className={`${styles.wordmarkLetter} ${visible(2) ? styles.wordmarkLetterVisible : ''}`}
              style={{ transitionDelay: `${i * 55}ms` }}
              aria-hidden
            >
              {ch}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className={`${styles.tagline} ${visible(3) ? styles.taglineVisible : ''}`}>
          Water, understood.
        </p>

        {/* Brand statement */}
        <p className={`${styles.statement} ${visible(3) ? styles.statementVisible : ''}`} style={{ transitionDelay: '120ms' }}>
          Precision-engineered RO membranes for India's water.
          <br />Built for consistency. Designed to last.
        </p>

        {/* Product metrics strip */}
        <div className={`${styles.metrics} ${visible(3) ? styles.metricsVisible : ''}`} style={{ transitionDelay: '200ms' }} aria-label="Product specifications">
          {[
            { val: '98%',     lbl: 'Salt Rejection' },
            { val: '5-Layer', lbl: 'TFC Polyamide'  },
            { val: '75/100',  lbl: 'GPD Variants'   },
            { val: '12 Mo.',  lbl: 'Warranty'        },
          ].map(m => (
            <div key={m.lbl} className={styles.metric}>
              <span className={styles.metricVal}>{m.val}</span>
              <span className={styles.metricLbl}>{m.lbl}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className={`${styles.ctas} ${visible(3) ? styles.ctasVisible : ''}`} style={{ transitionDelay: '280ms' }}>
          <Link href="/products" className={styles.ctaPrimary} id="hero-cta-primary">
            Explore Products
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/learn" className={styles.ctaSecondary} id="hero-cta-secondary">
            Water Knowledge
          </Link>
        </div>

        {/* Company attribution */}
        <p className={`${styles.company} ${visible(3) ? styles.companyVisible : ''}`} style={{ transitionDelay: '380ms' }}>
          By Udarta Watertech
        </p>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div className={`${styles.scrollHint} ${visible(3) ? styles.scrollHintVisible : ''}`} aria-hidden>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollDot} />
        </div>
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}

/* No-op kept for layout.tsx compatibility */
export function ScrollClarityIndicator() { return null; }
