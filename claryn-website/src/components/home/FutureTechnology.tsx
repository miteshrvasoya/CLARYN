'use client';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './FutureTechnology.module.css';

export function FutureTechnology() {
  return (
    <section className={styles.future}>
      <div className={styles.backgroundContainer}>
        <Image 
          src={homepageAssets.future} 
          alt="Future of Water at Home" 
          fill 
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Coming Soon</span>
          <h2 className={styles.headline}>THE FUTURE OF WATER<br/>AT HOME.</h2>
          <p className={styles.description}>
            We are building connected systems to bring real-time water intelligence into your home. Continuous monitoring, predictable maintenance, and uncompromised safety.
          </p>
        </div>
      </div>
    </section>
  );
}
