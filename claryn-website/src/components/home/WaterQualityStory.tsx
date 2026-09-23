'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './WaterQualityStory.module.css';

const STAGES = [
  { id: 'water', text: 'WATER', description: 'At its source, water is rarely just H2O.' },
  { id: 'quality', text: 'QUALITY', description: 'Minerals, dissolved solids, and impurities dictate its profile.' },
  { id: 'filtration', text: 'FILTRATION', description: 'Removing what doesn’t belong without stripping what does.' },
  { id: 'purification', text: 'PURIFICATION', description: 'Engineered precision down to 0.0001 microns.' },
];

export function WaterQualityStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0 to 1 based on section scroll
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;
      
      let p = (start - current) / (start - end);
      p = Math.max(0, Math.min(1, p));
      
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => setProgress(p));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active stage based on scroll progress
  const stageIndex = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1);
  const activeStage = STAGES[stageIndex];

  return (
    <section className={styles.qualityStory} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.content}>
          <h2 className={styles.headline}>So... what&apos;s actually in your water?</h2>
          
          <div className={styles.visualArea}>
            <div className={styles.imageWrapper}>
              {/* Image scale changes based on progress */}
              <div 
                className={styles.imageScale}
                style={{ transform: `scale(${1 + (progress * 0.1)})` }}
              >
                <Image
                  src={homepageAssets.qualityWater}
                  alt="Water Quality"
                  fill
                  className={styles.image}
                  priority
                />
                
                {/* Overlay layer that changes opacity based on progress */}
                <div 
                  className={styles.overlay} 
                  style={{ opacity: 1 - progress }}
                />
              </div>
            </div>
            
            <div className={styles.storyOverlay}>
              {STAGES.map((stage, idx) => {
                const isActive = idx === stageIndex;
                const isPast = idx < stageIndex;
                return (
                  <div 
                    key={stage.id} 
                    className={`${styles.stage} ${isActive ? styles.active : ''} ${isPast ? styles.past : ''}`}
                  >
                    <h3 className={styles.stageText}>{stage.text}</h3>
                    <p className={styles.stageDesc}>{stage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
