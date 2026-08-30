'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import styles from './WaterDiagnostic.module.css';

/* ─── Data ────────────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4;

const STEP_SOURCES = [
  { id: 'borewell',  label: 'Borewell',  sub: 'Groundwater · Tubewell' },
  { id: 'municipal', label: 'Municipal', sub: 'Corporation · Piped' },
  { id: 'tanker',    label: 'Tanker',    sub: 'Delivered supply' },
  { id: 'mixed',     label: 'Mixed',     sub: 'Multiple sources' },
  { id: 'unsure',    label: 'Not Sure',  sub: 'We\'ll help identify' },
] as const;

const STEP_ISSUES = [
  { id: 'scale',     label: 'Scale on taps',     icon: '⬜' },
  { id: 'taste',     label: 'Bad taste',          icon: '💧' },
  { id: 'odour',     label: 'Odour',              icon: '〰️' },
  { id: 'particles', label: 'Visible particles',  icon: '◦' },
  { id: 'skin',      label: 'Dry skin / hair',    icon: '◎' },
  { id: 'none',      label: 'No obvious issue',   icon: '✓' },
  { id: 'unsure',    label: 'Not sure',            icon: '?' },
] as const;

const STEP_NEEDS = [
  { id: 'drinking',  label: 'Drinking water' },
  { id: 'kitchen',   label: 'Kitchen use' },
  { id: 'wholehome', label: 'Whole home' },
  { id: 'ro',        label: 'RO system' },
  { id: 'upgrade',   label: 'Replacement / Upgrade' },
  { id: 'unsure',    label: 'Not sure yet' },
] as const;

type SourceId = typeof STEP_SOURCES[number]['id'];
type IssueId  = typeof STEP_ISSUES[number]['id'];
type NeedId   = typeof STEP_NEEDS[number]['id'];

interface DiagnosticState {
  source:  SourceId | null;
  issues:  Set<IssueId>;
  tds:     number | null;
  tdsUnknown: boolean;
  need:    NeedId | null;
}

/* ─── TDS Visual Gauge ────────────────────────────────────────────────────── */
function TDSGauge({ tds }: { tds: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const max = 3000;
  const pct = tds !== null ? Math.min(tds / max, 1) : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width = canvas.offsetWidth * 2;
    const H = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h * 0.72;
    const r  = Math.min(w, h) * 0.42;
    const startAngle = Math.PI * 0.75;
    const endAngle   = Math.PI * 2.25;
    const trackAngle = endAngle - startAngle;

    /* Track */
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();

    /* Fill — gradient from clear blue → mineral amber */
    if (pct > 0) {
      const grad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
      grad.addColorStop(0,    '#00B4A6');
      grad.addColorStop(0.35, '#0077C8');
      grad.addColorStop(0.70, '#e08b00');
      grad.addColorStop(1,    '#cc4400');
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + trackAngle * pct);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    /* Tick marks */
    const ticks = [0, 500, 1000, 1500, 2000, 2500, 3000];
    ticks.forEach(tick => {
      const angle = startAngle + trackAngle * (tick / max);
      const ir = r - 12;
      const or = r - 6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * ir, cy + Math.sin(angle) * ir);
      ctx.lineTo(cx + Math.cos(angle) * or, cy + Math.sin(angle) * or);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    /* Centre dot */
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = pct > 0 ? '#0077C8' : 'rgba(255,255,255,0.2)';
    ctx.fill();

  }, [pct]);

  const getWaterCharacter = (t: number | null) => {
    if (t === null) return { label: 'Awaiting input', color: 'rgba(255,255,255,0.4)' };
    if (t <= 150)   return { label: 'Very low dissolved solids', color: '#00B4A6' };
    if (t <= 300)   return { label: 'Low dissolved solids', color: '#00B4A6' };
    if (t <= 500)   return { label: 'Moderate dissolved solids', color: '#0088CC' };
    if (t <= 1000)  return { label: 'Elevated dissolved solids', color: '#e08b00' };
    if (t <= 2000)  return { label: 'High dissolved solids', color: '#cc6600' };
    return                  { label: 'Very high dissolved solids', color: '#cc3300' };
  };

  const character = getWaterCharacter(tds);

  return (
    <div className={styles.gaugeWrap}>
      <canvas ref={canvasRef} className={styles.gaugeCanvas} />
      <div className={styles.gaugeCentre}>
        {tds !== null ? (
          <>
            <span className={styles.gaugeTDS}>{tds.toLocaleString()}</span>
            <span className={styles.gaugePPM}>ppm TDS</span>
          </>
        ) : (
          <span className={styles.gaugePlaceholder}>—</span>
        )}
      </div>
      <p className={styles.gaugeLabel} style={{ color: character.color }}>
        {character.label}
      </p>
      <p className={styles.gaugeDisclaimer}>
        Water profile indicator — not a safety assessment
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WATER DIAGNOSTIC COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export function WaterDiagnostic() {
  const [step, setStep] = useState<Step>(1);
  const [completed, setCompleted] = useState(false);
  const [state, setState] = useState<DiagnosticState>({
    source:     null,
    issues:     new Set(),
    tds:        null,
    tdsUnknown: false,
    need:       null,
  });
  const [tdsInput, setTdsInput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const setSource = (id: SourceId) =>
    setState(s => ({ ...s, source: id }));

  const toggleIssue = (id: IssueId) =>
    setState(s => {
      const issues = new Set(s.issues);
      if (id === 'none' || id === 'unsure') {
        return { ...s, issues: new Set([id]) };
      }
      issues.delete('none');
      issues.delete('unsure');
      if (issues.has(id)) issues.delete(id);
      else issues.add(id);
      return { ...s, issues };
    });

  const setNeed = (id: NeedId) =>
    setState(s => ({ ...s, need: id }));

  const handleTDSInput = (v: string) => {
    setTdsInput(v);
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 0) {
      setState(s => ({ ...s, tds: n, tdsUnknown: false }));
    }
  };

  const handleTDSUnknown = () => {
    setTdsInput('');
    setState(s => ({ ...s, tds: null, tdsUnknown: true }));
  };

  const canAdvance = useCallback(() => {
    if (step === 1) return !!state.source;
    if (step === 2) return state.issues.size > 0;
    if (step === 3) return state.tds !== null || state.tdsUnknown;
    if (step === 4) return !!state.need;
    return false;
  }, [step, state]);

  const advance = () => {
    if (!canAdvance()) return;
    if (step < 4) {
      setStep(s => (s + 1) as Step);
    } else {
      setCompleted(true);
    }
  };

  /* Build solution path */
  const getSolutionPath = () => {
    const tds = state.tds;
    if (state.source === 'borewell' || (tds !== null && tds > 500)) return 'Reverse Osmosis';
    if (state.source === 'municipal' && (tds === null || tds < 500)) return 'Advanced Filtration';
    return 'Water Assessment First';
  };

  const getPrimaryIssue = () => {
    if (state.issues.has('scale')) return 'Hardness / Dissolved Solids';
    if (state.issues.has('taste') || state.issues.has('odour')) return 'Chemical Presence';
    if (state.issues.has('particles')) return 'Particulate Matter';
    if (state.issues.has('skin')) return 'Mineral Imbalance';
    return 'General Filtration';
  };

  const sourceLabel = STEP_SOURCES.find(s => s.id === state.source)?.label ?? '—';
  const needLabel   = STEP_NEEDS.find(n => n.id === state.need)?.label ?? '—';

  if (completed) {
    return (
      <div className={styles.result}>
        <div className={styles.resultHeader}>
          <span className={styles.resultEyebrow}>Your CLARYN Water Profile</span>
          <h3 className={styles.resultTitle}>Here&apos;s what we understand about your water.</h3>
        </div>

        <div className={styles.resultGrid}>
          <div className={styles.resultItem}>
            <span className={styles.resultKey}>WATER SOURCE</span>
            <span className={styles.resultVal}>{sourceLabel}</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultKey}>TDS</span>
            <span className={styles.resultVal}>
              {state.tds !== null ? `${state.tds.toLocaleString()} ppm` : 'Unknown'}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultKey}>WATER CONCERN</span>
            <span className={styles.resultVal}>{getPrimaryIssue()}</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultKey}>SOLUTION PATH</span>
            <span className={`${styles.resultVal} ${styles.resultValAccent}`}>
              {getSolutionPath()}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultKey}>NEED</span>
            <span className={styles.resultVal}>{needLabel}</span>
          </div>
        </div>

        <p className={styles.resultDisclaimer}>
          This profile is based on your inputs. Always confirm with an appropriate water test before making technical decisions.
        </p>

        <div className={styles.resultCTAs}>
          <Link href="/find-your-solution" className={styles.resultCTAPrimary}>
            Explore Your Solution <ArrowRight size={15} aria-hidden />
          </Link>
          <button
            className={styles.resultCTASecondary}
            onClick={() => { setCompleted(false); setStep(1); setState({ source: null, issues: new Set(), tds: null, tdsUnknown: false, need: null }); setTdsInput(''); }}
          >
            Start again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.diagnostic} ref={containerRef}>
      {/* Progress bar */}
      <div className={styles.progressTrack} aria-hidden>
        <div
          className={styles.progressFill}
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className={styles.stepIndicator} aria-live="polite">
        <span className={styles.stepNum}>0{step}</span>
        <span className={styles.stepOf}>/ 04</span>
      </div>

      {/* Step content */}
      <div className={styles.stepContent}>
        {/* STEP 1 — Source */}
        {step === 1 && (
          <div className={styles.step} key="step1">
            <h3 className={styles.stepQuestion}>What is your water source?</h3>
            <div className={styles.stepOptions}>
              {STEP_SOURCES.map(s => (
                <button
                  key={s.id}
                  className={`${styles.optionBtn} ${state.source === s.id ? styles.optionBtnActive : ''}`}
                  onClick={() => setSource(s.id)}
                  aria-pressed={state.source === s.id}
                >
                  <span className={styles.optionLabel}>{s.label}</span>
                  <span className={styles.optionSub}>{s.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Issues */}
        {step === 2 && (
          <div className={styles.step} key="step2">
            <h3 className={styles.stepQuestion}>How does your water behave?</h3>
            <p className={styles.stepHint}>Select all that apply.</p>
            <div className={styles.stepOptions}>
              {STEP_ISSUES.map(issue => (
                <button
                  key={issue.id}
                  className={`${styles.optionBtn} ${state.issues.has(issue.id) ? styles.optionBtnActive : ''}`}
                  onClick={() => toggleIssue(issue.id)}
                  aria-pressed={state.issues.has(issue.id)}
                >
                  <span className={styles.optionLabel}>{issue.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — TDS */}
        {step === 3 && (
          <div className={styles.step} key="step3">
            <h3 className={styles.stepQuestion}>Do you know your TDS level?</h3>
            <div className={styles.tdsLayout}>
              <div className={styles.tdsInput}>
                <label htmlFor="tds-input" className={styles.tdsLabel}>Enter TDS value (ppm)</label>
                <input
                  id="tds-input"
                  type="number"
                  min={0}
                  max={9999}
                  placeholder="e.g. 850"
                  value={tdsInput}
                  onChange={e => handleTDSInput(e.target.value)}
                  className={styles.tdsField}
                  aria-describedby="tds-hint"
                />
                <p id="tds-hint" className={styles.tdsHint}>
                  Measure with a TDS meter — available for ₹150–500.
                </p>
                <button
                  className={`${styles.tdsUnknownBtn} ${state.tdsUnknown ? styles.tdsUnknownBtnActive : ''}`}
                  onClick={handleTDSUnknown}
                  type="button"
                >
                  I don&apos;t know my TDS
                </button>
              </div>
              <TDSGauge tds={state.tds} />
            </div>
          </div>
        )}

        {/* STEP 4 — Need */}
        {step === 4 && (
          <div className={styles.step} key="step4">
            <h3 className={styles.stepQuestion}>Where do you need better water?</h3>
            <div className={styles.stepOptions}>
              {STEP_NEEDS.map(n => (
                <button
                  key={n.id}
                  className={`${styles.optionBtn} ${state.need === n.id ? styles.optionBtnActive : ''}`}
                  onClick={() => setNeed(n.id)}
                  aria-pressed={state.need === n.id}
                >
                  <span className={styles.optionLabel}>{n.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className={styles.stepNav}>
        {step > 1 && (
          <button
            className={styles.stepBack}
            onClick={() => setStep(s => (s - 1) as Step)}
          >
            Back
          </button>
        )}
        <button
          className={`${styles.stepNext} ${!canAdvance() ? styles.stepNextDisabled : ''}`}
          onClick={advance}
          disabled={!canAdvance()}
        >
          {step < 4 ? 'Continue' : 'See My Water Profile'}
          <ChevronRight size={15} aria-hidden />
        </button>
      </div>
    </div>
  );
}
