'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import styles from './ProductShowcase.module.css';

export function ProductShowcase() {
  const activeProducts = products.filter(p => p.status === 'active');
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Implementing scroll-linked reveal animation via Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = sectionRef.current?.querySelectorAll(`.${styles.productItem}`);
    elements?.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.products} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Technology you can put to work today.</h2>
        </div>

        <div className={styles.list}>
          {activeProducts.map((product, index) => {
            const primaryLink = product.marketplaceLinks.find(
              m => m.isActive && m.availability === 'in_stock'
            );
            
            return (
              <article 
                key={product.id} 
                className={styles.productItem}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className={styles.visualPanel}>
                  {product.images?.[0] && product.images[0] !== '/brand/product-placeholder.png' ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name} 
                      fill 
                      className={styles.image} 
                    />
                  ) : (
                    <div className={styles.placeholderVisual}>
                      <span className={styles.placeholderCategory}>RO Membrane</span>
                      <div className={styles.placeholderGPD}>
                        <span className={styles.gpdNum}>{product.specs.gpd}</span>
                        <span className={styles.gpdUnit}>GPD</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.contentPanel}>
                  <div className={styles.meta}>
                    <span className={styles.model}>{product.model}</span>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.desc}>{product.shortDescription}</p>
                  </div>

                  <div className={styles.specs}>
                    <div className={styles.spec}>
                      <span className={styles.specVal}>{product.specs.saltRejectionPercent}%</span>
                      <span className={styles.specLbl}>Salt Rejection</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specVal}>{product.specs.maxTDS} ppm</span>
                      <span className={styles.specLbl}>Max Feed TDS</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specVal}>{product.specs.warrantyPeriod}</span>
                      <span className={styles.specLbl}>Warranty</span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <Link href={`/products/${product.slug}`} className={styles.ctaPrimary}>
                      View Product <ArrowRight size={14} />
                    </Link>
                    {primaryLink && (
                      <a href={primaryLink.url} className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
                        {primaryLink.ctaLabel}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
