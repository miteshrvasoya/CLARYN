'use client';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './FutureTechnology.module.css';

export function FutureTechnology() {
  return (
    <section className={styles.future}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Coming Soon</span>
          <h2 className={styles.headline}>The future of water is getting smarter.</h2>
          <p className={styles.description}>
            We are building connected systems to bring real-time water intelligence into your home. Continuous monitoring, predictable maintenance, and uncompromised safety.
          </p>
        </div>

        <div className={styles.visualArea}>
          <div className={styles.imageContainer}>
            <Image 
              src={homepageAssets.futureTechVisual} 
              alt="Future Smart Water Technology" 
              fill 
              className={styles.image}
            />
            {/* Abstract connected UI overlay */}
            <div className={styles.uiOverlay}>
              <div className={styles.uiDot} style={{ top: '30%', left: '40%' }}>
                <div className={styles.pulse} />
              </div>
              <div className={styles.uiDot} style={{ top: '60%', left: '70%' }}>
                <div className={styles.pulse} style={{ animationDelay: '1s' }} />
              </div>
              <div className={styles.uiLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
