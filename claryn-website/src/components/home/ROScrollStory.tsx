'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './ROScrollStory.module.css';

const STAGES = [
  { 
    id: 'start', 
    label: 'START', 
    title: 'It starts with water entering the system.',
    does: 'Source water enters the purification engine.',
    fits: 'The beginning of the journey.'
  },
  { 
    id: 'sediment', 
    label: 'SEDIMENT', 
    title: 'Sediment Filter',
    does: 'Removes physical particulates like sand, silt, dirt, and rust.',
    fits: 'The first line of defense. Protects subsequent finer filters from clogging prematurely.'
  },
  { 
    id: 'carbon', 
    label: 'CARBON', 
    title: 'Carbon Filter',
    does: 'Adsorbs chlorine, volatile organic compounds (VOCs), and odor-causing chemicals.',
    fits: 'Crucial for protecting the RO membrane, which can be damaged by chlorine exposure.'
  },
  { 
    id: 'pump', 
    label: 'PUMP', 
    title: 'Booster Pump',
    does: 'Elevates water pressure to the optimal range required for reverse osmosis.',
    fits: 'Sits right before the membrane to ensure consistent purification regardless of inlet pressure.'
  },
  { 
    id: 'membrane', 
    label: 'RO MEMBRANE', 
    title: 'RO Membrane',
    does: 'Forces water through a 0.0001 micron semi-permeable layer, rejecting heavy metals and salts.',
    fits: 'The heart of the system where the actual purification occurs.'
  },
  { 
    id: 'postfilter', 
    label: 'POST FILTER', 
    title: 'Post Filter',
    does: 'Polishes the water to remove any residual taste or odor.',
    fits: 'The final stage before the water reaches your glass.'
  },
  { 
    id: 'tank', 
    label: 'STORAGE', 
    title: 'Storage Tank',
    does: 'Safely holds purified water in a pressurized bladder.',
    fits: 'Ensures water is immediately available without waiting.'
  },
];

export function ROScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

  const stageIndex = Math.min(
    Math.floor(progress * (STAGES.length - 0.1)), 
    STAGES.length - 1
  );

  const getComponentStyle = (stageIdx: number, isActiveRange: [number, number]) => {
    const [start, end] = isActiveRange;
    const isHighlighted = progress >= start && progress <= end;
    
    return {
      opacity: isHighlighted ? 1 : (progress > end ? 0.8 : 0.2),
      transform: `scale(${isHighlighted ? 1.05 : 1})`,
      filter: isHighlighted ? 'grayscale(0) drop-shadow(0 10px 20px rgba(0, 119, 200, 0.2))' : 'grayscale(100%)'
    };
  };

  return (
    <section className={styles.scrollStory} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.headline}>The Anatomy of Purity.</h2>
            <p className={styles.subhead}>Scroll to follow the water and explore each component.</p>
          </div>

          <div className={styles.vizArea}>
            <div className={styles.roSystem}>
              {/* Sediment Filter */}
              <div className={`${styles.component} ${styles.compSediment}`} style={getComponentStyle(1, [0.1, 0.25])}>
                <Image src={homepageAssets.roSedimentFilter} alt="Sediment Filter" fill className={styles.image} />
                <div className={styles.compLabel}>Sediment</div>
              </div>
              
              {/* Carbon Filter */}
              <div className={`${styles.component} ${styles.compCarbon}`} style={getComponentStyle(2, [0.25, 0.4])}>
                <Image src={homepageAssets.roCarbonFilter} alt="Carbon Filter" fill className={styles.image} />
                <div className={styles.compLabel}>Carbon</div>
              </div>

              {/* Pump */}
              <div className={`${styles.component} ${styles.compPump}`} style={getComponentStyle(3, [0.4, 0.55])}>
                <Image src={homepageAssets.roBoosterPump} alt="Booster Pump" fill className={styles.image} />
                <div className={styles.compLabel}>Pump</div>
              </div>

              {/* Membrane */}
              <div className={`${styles.component} ${styles.compMembrane}`} style={getComponentStyle(4, [0.55, 0.75])}>
                <Image src={homepageAssets.roMembrane} alt="RO Membrane" fill className={styles.image} />
                <div className={styles.compLabel}>RO Membrane</div>
              </div>

              {/* Post Filter */}
              <div className={`${styles.component} ${styles.compPost}`} style={getComponentStyle(5, [0.75, 0.9])}>
                <Image src={homepageAssets.roPostFilter} alt="Post Filter" fill className={styles.image} />
                <div className={styles.compLabel}>Post Filter</div>
              </div>

              {/* Tank */}
              <div className={`${styles.component} ${styles.compTank}`} style={getComponentStyle(6, [0.9, 1.0])}>
                <Image src={homepageAssets.roStorageTank} alt="Storage Tank" fill className={styles.image} />
                <div className={styles.compLabel}>Storage</div>
              </div>

              <div className={styles.waterFlowPath}>
                <div 
                  className={styles.waterFlowHead}
                  style={{
                    left: `${progress * 100}%`,
                    opacity: progress > 0.05 && progress < 0.95 ? 1 : 0
                  }}
                />
              </div>
            </div>

            <div className={styles.textArea}>
              {STAGES.map((stage, idx) => (
                <div 
                  key={stage.id} 
                  className={`${styles.textBlock} ${idx === stageIndex ? styles.activeText : ''}`}
                >
                  <span className={styles.stageIndicator}>0{idx + 1} // {stage.label}</span>
                  <h3 className={styles.stageTitle}>{stage.title}</h3>
                  
                  {idx > 0 && (
                    <div className={styles.stageDetails}>
                      <div className={styles.detailGroup}>
                        <span className={styles.detailLabel}>What it does</span>
                        <p className={styles.detailText}>{stage.does}</p>
                      </div>
                      <div className={styles.detailGroup}>
                        <span className={styles.detailLabel}>How it fits</span>
                        <p className={styles.detailText}>{stage.fits}</p>
                      </div>
                    </div>
                  )}

                  {idx === STAGES.length - 1 && (
                    <Link href="/products" className={styles.cta}>
                      Explore Systems <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
