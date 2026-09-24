'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('source'); // Will point to source next
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBackground}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src={homepageAssets.hero} 
            alt="Water, Understood." 
            fill
            priority
            className={styles.heroImage}
          />
        </div>
        {/* Subtle overlay for text legibility */}
        <div className={styles.overlay} />
      </div>

      <div className={styles.heroInner}>
        {/* Left: Typography & CTA */}
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            CLARYN WATER TECHNOLOGY
          </div>
          
          <h1 className={styles.heroTitle}>
            WATER,<br/>
            UNDERSTOOD.
          </h1>
          
          <p className={styles.heroSubtitle}>
            Understand your water.<br/>
            Understand your system.<br/>
            Choose with clarity.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#source" onClick={(e) => { e.preventDefault(); scrollToNext(); }} className={styles.btnPrimary}>
              EXPLORE YOUR WATER
            </Link>
            <Link href="/products" className={styles.btnSecondary}>
              EXPLORE PRODUCTS
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </button>
    </section>
  );
}
