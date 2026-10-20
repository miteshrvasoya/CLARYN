'use client';
import Link from 'next/link';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      {/* ── Full Background Image ─────────────────────────────────── */}
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src={homepageAssets.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBgImage}
        />
        {/* Layered cinematic gradients for flawless text contrast and seamless section blending */}
        <div className={styles.heroOverlay} />
      </div>

      {/* ── Foreground Content Grid ───────────────────────────────── */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            WATER, UNDERSTOOD.
          </p>

          <h1 id="hero-headline" className={styles.headline}>
            Better Water<br />
            <span className={styles.headlineAccent}>Starts With Understanding.</span>
          </h1>

          <p className={styles.supportingText}>
            Understand your water. Explore solutions designed around your needs.
          </p>

          <div className={styles.ctaGroup}>
            <Link
              href="/find-your-solution"
              className={styles.btnPrimary}
              id="hero-cta-find-solution"
            >
              Find My Water Solution
            </Link>
            <Link
              href="/register-product"
              className={styles.btnSecondary}
              id="hero-cta-register"
            >
              Register Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
