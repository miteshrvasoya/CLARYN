'use client';
import { useState } from 'react';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './WaterSourceStory.module.css';

type WaterSource = 'borewell' | 'municipal' | 'other' | null;

export function WaterSourceStory() {
  const [activeSource, setActiveSource] = useState<WaterSource>(null);

  return (
    <section id="source" className={styles.section}>
      <div className={styles.imageContainer}>
        <Image
          src={homepageAssets.waterSource}
          alt="Your Water Has a Story"
          fill
          className={styles.bgImage}
        />
        {/* Overlays for different sources */}
        <div className={`${styles.overlay} ${activeSource === 'borewell' ? styles.active : ''}`} />
        <div className={`${styles.overlayMunicipal} ${activeSource === 'municipal' ? styles.active : ''}`} />
      </div>

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>YOUR WATER<br/>HAS A STORY.</h2>
          <p className={styles.subtext}>
            Before understanding treatment, start with where your water comes from.
          </p>
        </div>
        
        <div className={styles.controls}>
          <button 
            className={`${styles.sourceBtn} ${activeSource === 'borewell' ? styles.activeBtn : ''}`}
            onMouseEnter={() => setActiveSource('borewell')}
            onMouseLeave={() => setActiveSource(null)}
          >
            Borewell
          </button>
          <button 
            className={`${styles.sourceBtn} ${activeSource === 'municipal' ? styles.activeBtn : ''}`}
            onMouseEnter={() => setActiveSource('municipal')}
            onMouseLeave={() => setActiveSource(null)}
          >
            Municipal
          </button>
          <button 
            className={`${styles.sourceBtn} ${activeSource === 'other' ? styles.activeBtn : ''}`}
            onMouseEnter={() => setActiveSource('other')}
            onMouseLeave={() => setActiveSource(null)}
          >
            Other / Not Sure
          </button>
        </div>
      </div>
    </section>
  );
}
