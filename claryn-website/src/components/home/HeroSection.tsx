'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('quality');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Immersive Background Glows */}
      <div className={styles.backgroundEffects}>
        <div className={styles.glowPrimary} />
        <div className={styles.glowSecondary} />
      </div>

      <div className={styles.heroInner}>
        
        {/* Left: Typography & CTA */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <div className={styles.badgePulse} />
            Next-Gen Water Intelligence
          </div>
          
          <h1 className={styles.heroTitle}>
            Better Water Starts With <span className={styles.textGradient}>Understanding It.</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Water quality is different everywhere. Explore the science behind purification, understand your water profile, and discover solutions engineered for absolute purity.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/find-your-solution" className={styles.btnPrimary}>
              Find Your Solution <ArrowRight size={18} />
            </Link>
            <Link href="/learn" className={styles.btnSecondary}>
              <PlayCircle size={18} /> How it Works
            </Link>
          </div>
        </div>

        {/* Right: Stunning Visual */}
        <div className={styles.heroVisual}>
          <div className={styles.glassPanel}>
            <Image 
              src={homepageAssets.heroWater} 
              alt="Water Intelligence Visualization" 
              fill
              className={styles.visualImage}
              priority
            />
          </div>
          
          {/* Subtle floating metrics card to add a technical/premium feel */}
          <div className={styles.metricsCard}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>0.0001µ</span>
              <span className={styles.metricLabel}>Filtration</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>99.9%</span>
              <span className={styles.metricLabel}>Purity</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Prompt */}
      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Explore Quality</span>
      </button>
    </section>
  );
}
