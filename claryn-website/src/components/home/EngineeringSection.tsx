'use client';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './EngineeringSection.module.css';

export function EngineeringSection() {
  return (
    <section className={styles.engineering}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Behind every drop is engineering.</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.visualContainer}>
            <Image 
              src={homepageAssets.engineeringVisual} 
              alt="Engineering Precision" 
              fill 
              className={styles.image}
            />
            
            {/* Technical grid lines overlay */}
            <div className={styles.gridOverlay} />
            
            {/* Technical Labels */}
            <div className={styles.label} style={{ top: '20%', left: '15%' }}>
              <div className={styles.dot} />
              <div className={styles.line} style={{ width: '60px' }} />
              <span className={styles.text}>0.0001µM Precision</span>
            </div>
            
            <div className={styles.label} style={{ top: '60%', right: '15%' }}>
              <span className={styles.text}>TFC Polyamide Layer</span>
              <div className={styles.line} style={{ width: '40px' }} />
              <div className={styles.dot} />
            </div>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>Tested Before Shipping</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>TFC</span>
              <span className={styles.statLabel}>Thin Film Composite</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>NSF</span>
              <span className={styles.statLabel}>Grade Materials</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
