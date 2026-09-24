'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './ROScrollStory.module.css';

const STAGES = [
  {
    id: 'cutaway',
    heading: 'FOLLOW THE WATER.',
    copy: 'See what happens after water enters a domestic RO system.',
  },
  {
    id: 'exploded',
    heading: 'A PURIFIER\nIS A SYSTEM.',
    copy: 'Sediment / Carbon / Pump / RO Membrane / Post Filtration',
  },
  {
    id: 'membrane',
    heading: 'INSIDE THE\nRO MEMBRANE.',
    copy: 'At the heart of the process is a layered membrane structure.',
  },
  {
    id: 'separation',
    heading: 'THE SEPARATION\nMOMENT.',
    copy: 'Microscopic precision at 0.0001 microns.',
  },
  {
    id: 'glass',
    heading: 'FROM TECHNOLOGY\nTO YOUR GLASS.',
    copy: 'Clear, consistent, purified water.',
  },
];

export function ROScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Preload images logic
    const imgUrls = [
      homepageAssets.followWater.system,
      homepageAssets.followWater.exploded,
      homepageAssets.followWater.membrane,
      homepageAssets.followWater.separation,
      homepageAssets.followWater.glass
    ];
    imgUrls.forEach(url => {
      const img = new window.Image();
      img.src = url;
    });

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollDistance = rect.height - windowHeight;
      const currentScroll = -rect.top;
      
      let p = currentScroll / totalScrollDistance;
      p = Math.max(0, Math.min(1, p));
      
      requestAnimationFrame(() => setProgress(p));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stageIndex = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1);

  // Helper to determine opacity for images
  const getOpacity = (index: number) => {
    const range = 1 / STAGES.length; // 0.2
    const center = index * range + (range / 2);
    // Distance from center
    const dist = Math.abs(progress - center);
    // Fully visible within its range, crossfades out quickly
    return Math.max(0, 1 - (dist * 5));
  };

  // Helper to determine scale for images (creates forward camera movement)
  const getScale = (index: number) => {
    const range = 1 / STAGES.length;
    const start = index * range;
    const localProgress = Math.max(0, (progress - start) / range);
    return 1 + (localProgress * 0.05); // slight scale up
  };

  return (
    <section className={styles.scrollStory} ref={containerRef}>
      <div className={styles.stickyContainer}>
        
        {/* Visual Layers */}
        <div className={styles.imageSequence}>
          <div className={styles.imageLayer} style={{ opacity: getOpacity(0), transform: `scale(${getScale(0)})`, zIndex: 1 }}>
            <Image src={homepageAssets.followWater.system} alt="RO Cutaway" fill className={styles.sequenceImage} priority />
          </div>
          <div className={styles.imageLayer} style={{ opacity: getOpacity(1), transform: `scale(${getScale(1)})`, zIndex: 2 }}>
            <Image src={homepageAssets.followWater.exploded} alt="Exploded System" fill className={styles.sequenceImage} />
          </div>
          <div className={styles.imageLayer} style={{ opacity: getOpacity(2), transform: `scale(${getScale(2)})`, zIndex: 3 }}>
            <Image src={homepageAssets.followWater.membrane} alt="RO Membrane" fill className={styles.sequenceImage} />
          </div>
          <div className={styles.imageLayer} style={{ opacity: getOpacity(3), transform: `scale(${getScale(3)})`, zIndex: 4 }}>
            <Image src={homepageAssets.followWater.separation} alt="Separation" fill className={styles.sequenceImage} />
          </div>
          <div className={styles.imageLayer} style={{ opacity: getOpacity(4), transform: `scale(${getScale(4)})`, zIndex: 5 }}>
            <Image src={homepageAssets.followWater.glass} alt="Glass" fill className={styles.sequenceImage} />
          </div>
          <div className={styles.overlay} />
        </div>

        {/* Text Area */}
        <div className={styles.textArea}>
          {STAGES.map((stage, idx) => (
            <div 
              key={stage.id} 
              className={`${styles.textBlock} ${idx === stageIndex ? styles.activeText : ''}`}
            >
              <h2 className={styles.heading} style={{ whiteSpace: 'pre-line' }}>{stage.heading}</h2>
              <p className={styles.copy}>{stage.copy}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
