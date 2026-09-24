'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { homepageAssets } from '@/config/homepageAssets';
import styles from './KnowledgeSection.module.css';

const ARTICLES = [
  { id: '01', title: 'What is TDS?', subtitle: 'The foundation of water testing and what it means for your health.' },
  { id: '02', title: 'Hard Water vs Soft Water', subtitle: 'Understanding the difference and the impact on your appliances.' },
  { id: '03', title: 'How RO Works', subtitle: 'The mechanics of reverse osmosis at the microscopic level.' }
];

export function KnowledgeSection() {
  return (
    <section className={styles.knowledge}>
      <div className={styles.inner}>
        
        {/* Left Column: Topics */}
        <div className={styles.topicsColumn}>
          <div className={styles.header}>
            <h2 className={styles.headline}>WATER,<br/>LOOK CLOSER.</h2>
            <p className={styles.subhead}>Delve into the science of water quality, filtration, and what matters for your home.</p>
          </div>

          <div className={styles.cardContainer}>
            {ARTICLES.map((article) => (
              <Link key={article.id} href="/learn" className={styles.card}>
                <span className={styles.articleNum}>{article.id}</span>
                <div className={styles.cardContent}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleSub}>{article.subtitle}</p>
                </div>
                <div className={styles.cardArrow}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
          
          <div className={styles.footerCTA}>
            <Link href="/learn" className={styles.btnSecondary}>
              Explore Knowledge Base <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className={styles.visualColumn}>
          <div className={styles.imageWrapper}>
            <Image 
              src={homepageAssets.knowledge}
              alt="Water, Look Closer."
              fill
              className={styles.image}
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
