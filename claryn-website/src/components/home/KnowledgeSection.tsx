'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './KnowledgeSection.module.css';

const ARTICLES = [
  { id: '01', title: 'What is TDS?', subtitle: 'The foundation of water testing.', image: homepageAssets.heroWater },
  { id: '02', title: 'Hard Water vs Soft Water', subtitle: 'Understanding the difference.', image: homepageAssets.qualityWater },
  { id: '03', title: 'How RO Works', subtitle: 'The mechanics of reverse osmosis.', image: homepageAssets.roMembrane }
];

export function KnowledgeSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle horizontal scroll effect linked to vertical scroll
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when section is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Map scroll position to horizontal translation
        const scrollFactor = (windowHeight - rect.top) * 0.1;
        const items = scrollContainerRef.current.querySelectorAll(`.${styles.card}`);
        
        items.forEach((item, i) => {
          const el = item as HTMLElement;
          // Stagger movement based on index
          const offset = scrollFactor * (1 - (i * 0.2));
          el.style.transform = `translateX(-${offset}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.knowledge}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Understand your water.</h2>
          <Link href="/learn" className={styles.headerCTA}>
            Explore Water Knowledge <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.cardContainer} ref={scrollContainerRef}>
          {ARTICLES.map((article, idx) => (
            <Link key={article.id} href="/learn" className={`${styles.card} ${idx === 0 ? styles.featured : ''}`}>
              <div className={styles.imageContainer}>
                <Image src={article.image} alt={article.title} fill className={styles.image} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.articleNum}>{article.id}</span>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleSub}>{article.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
