import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// New Homepage Components
import { HeroSection } from '@/components/home/HeroSection';
import { WaterSourceStory } from '@/components/home/WaterSourceStory';
import { WaterQualityStory } from '@/components/home/WaterQualityStory';
import { ROScrollStory } from '@/components/home/ROScrollStory';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { SolutionFinder } from '@/components/home/SolutionFinder';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { InstallationSupport } from '@/components/home/InstallationSupport';
import { FutureTechnology } from '@/components/home/FutureTechnology';
import { StoryProgressIndicator } from '@/components/home/StoryProgressIndicator';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'CLARYN — Better Water Starts With Understanding It.',
  description: 'Water quality is different everywhere. CLARYN helps you understand water, explore the technology behind purification, and find solutions that fit your needs.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div className="homepage-wrapper">
      <StoryProgressIndicator />
      
      {/* 01 WATER */}
      <div id="hero" className={styles.snapPoint}>
        <HeroSection />
      </div>

      {/* 02 SOURCE */}
      <div id="source" className={styles.snapPoint}>
        <WaterSourceStory />
      </div>

      {/* 03 QUALITY */}
      <div id="quality" className={styles.snapPoint}>
        <WaterQualityStory />
      </div>

      {/* 03 RO */}
      <div id="ro" className={styles.snapPoint}>
        <ROScrollStory />
      </div>

      {/* 04 SOLUTIONS - Wrapped individually to snap to each component if they are full-screen, or keep together if they form one section */}
      <div id="product-showcase">
        <ProductShowcase />
      </div>
      
      <div id="solution-finder" className={styles.snapPoint}>
        <SolutionFinder />
      </div>

      {/* 06 KNOWLEDGE - Snapping each block so they fit in viewport */}
      <div id="knowledge" className={styles.snapPoint}>
        <KnowledgeSection />
      </div>
      
      <div id="installation" className={styles.snapPoint}>
        <InstallationSupport />
      </div>
      
      <div id="future" className={styles.snapPoint}>
        <FutureTechnology />
      </div>
        
      {/* FINAL CTA SECTION */}
      <section className={`${styles.finalCTA} ${styles.snapPoint}`} aria-labelledby="cta-heading">
          <div className={styles.finalCTAInner}>
            <h2 id="cta-heading" className={styles.finalCTAHeading}>
              Start with your water.
            </h2>
            <p className={styles.finalCTATagline}>Understand it. Explore it. Find the right place to start.</p>
            <div className={styles.finalCTAActions}>
              <Link href="/find-your-solution" className={styles.finalCTABtnPrimary} id="final-cta">
                Find My Water Solution
              </Link>
              <Link href="/products" className={styles.finalCTABtnSecondary}>
                Explore Products
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
}
