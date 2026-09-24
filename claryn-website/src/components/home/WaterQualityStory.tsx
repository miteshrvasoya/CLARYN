'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './WaterQualityStory.module.css';

export function WaterQualityStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;
      
      let p = (start - current) / (start - end);
      p = Math.max(0, Math.min(1, p));
      
      requestAnimationFrame(() => setProgress(p));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.qualityStory} ref={containerRef}>
      <div className={styles.stickyContainer}>
        {/* Visual Right */}
        <div className={styles.visualArea}>
          <div className={styles.imageScale} style={{ transform: `scale(${1 + (progress * 0.05)})` }}>
            <Image
              src={homepageAssets.waterQuality}
              alt="What's Actually in Your Water?"
              fill
              className={styles.image}
              priority
            />
          </div>
          {/* Subtle complexity overlay revealed on scroll */}
          <div 
            className={styles.complexityOverlay} 
            style={{ opacity: progress }} 
          />
          
          {/* HTML Knowledge Labels revealed based on scroll */}
          <div className={`${styles.label} ${styles.labelTds}`} style={{ opacity: progress > 0.3 ? 1 : 0, transform: `translateY(${progress > 0.3 ? 0 : 20}px)` }}>
            <span className={styles.dot}/> TDS (Total Dissolved Solids)
          </div>
          <div className={`${styles.label} ${styles.labelHardness}`} style={{ opacity: progress > 0.6 ? 1 : 0, transform: `translateY(${progress > 0.6 ? 0 : 20}px)` }}>
            <span className={styles.dot}/> Hardness Minerals
          </div>
        </div>

        {/* Typography Left */}
        <div className={styles.textArea}>
          <h2 className={styles.headline}>WHAT’S ACTUALLY<br/>IN YOUR WATER?</h2>
          <p className={styles.subhead}>
            Clear water can still contain characteristics you cannot understand just by looking at it.
          </p>
        </div>
      </div>
    </section>
  );
}
