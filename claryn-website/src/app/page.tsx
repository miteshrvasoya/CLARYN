import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// New Homepage Components
import { HeroSection } from '@/components/home/HeroSection';
import { WaterQualityStory } from '@/components/home/WaterQualityStory';
import { ROScrollStory } from '@/components/home/ROScrollStory';
import { EngineeringSection } from '@/components/home/EngineeringSection';
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
      <div id="hero">
        <HeroSection />
      </div>

      {/* 02 QUALITY */}
      <div id="quality">
        <WaterQualityStory />
      </div>

      {/* 03 RO */}
      <div id="ro">
        <ROScrollStory />
      </div>

      {/* 04 TECHNOLOGY */}
      <div id="technology">
        <EngineeringSection />
      </div>

      {/* 05 SOLUTIONS */}
      <div id="solutions">
        <ProductShowcase />
        <SolutionFinder />
      </div>

      {/* 06 KNOWLEDGE */}
      <div id="knowledge">
        <KnowledgeSection />
        <InstallationSupport />
        <FutureTechnology />
        
        {/* FINAL CTA SECTION */}
        <section className={styles.finalCTA} aria-labelledby="cta-heading">
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
    </div>
  );
}
