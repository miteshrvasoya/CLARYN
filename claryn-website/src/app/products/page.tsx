import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Products — RO Membranes & Water Solutions | CLARYN',
  description: 'Browse CLARYN\'s premium RO membranes engineered for Indian water conditions. High-TDS performance, up to 99% salt rejection, available on Amazon.in.',
};

const COMING_SOON_CATEGORIES = ['RO Systems', 'Water Filters', 'Booster Pumps', 'Water Testing', 'Smart Water'];

export default function ProductsPage() {
  const activeProducts = products.filter(p => p.status === 'active');

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} aria-hidden />
              Product Catalog
            </div>
            <h1 className={styles.heroTitle}>
              Water Solutions<br />
              for Every Home.
            </h1>
            <p className={styles.heroDesc}>
              Precision-engineered water purification products for Indian homes. Designed to handle India's diverse water conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.productsGrid}>
            {activeProducts.map(product => {
              const amazonLink = product.marketplaceLinks
                .find(m => m.marketplaceName === 'Amazon India' && m.isActive && m.availability === 'in_stock');

              return (
                <article key={product.id} className={styles.productCard}>
                  {/* Visual */}
                  <Link href={`/products/${product.slug}`} className={styles.productVisual} tabIndex={-1} aria-hidden>
                    <div className={styles.productVisualCenter}>
                      <p className={styles.productVisualNum}>{product.specs.gpd}</p>
                      <p className={styles.productVisualUnit}>GPD</p>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className={styles.productInfo}>
                    <div className={styles.productHeader}>
                      <span className={styles.productModel}>{product.model}</span>
                    </div>

                    <Link href={`/products/${product.slug}`} className={styles.productName}>
                      {product.name}
                    </Link>

                    <p className={styles.productDesc}>{product.shortDescription}</p>

                    {/* Spec Chips */}
                    <div className={styles.specChips}>
                      <span className={`${styles.specChip} ${styles.specChipHighlight}`}>{product.specs.gpd} GPD</span>
                      <span className={styles.specChip}>{product.specs.membraneLayers} Layer</span>
                      <span className={styles.specChip}>{product.specs.saltRejectionPercent}% Rejection</span>
                      {product.specs.maxTDS && (
                        <span className={styles.specChip}>{product.specs.maxTDS} ppm Max TDS</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className={styles.productActions}>
                      <Link href={`/products/${product.slug}`} className={styles.btnDetails}>
                        View Details <ChevronRight size={16} aria-hidden />
                      </Link>
                      {amazonLink && (
                        <a
                          href={amazonLink.url}
                          className={styles.btnBuy}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Buy ${product.name} on Amazon`}
                        >
                          Buy <ExternalLink size={13} aria-hidden />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Coming Soon */}
          <div className={styles.comingSoon}>
            <h2 className={styles.comingSoonTitle}>More Products Coming Soon</h2>
            <p className={styles.comingSoonDesc}>
              We're expanding our product range. More high-quality water solutions are in development.
            </p>
            <div className={styles.comingSoonCategories}>
              {COMING_SOON_CATEGORIES.map(cat => (
                <span key={cat} className={styles.comingSoonTag}>{cat}</span>
              ))}
            </div>
            <Link href="/register-product" className="btn btn--primary">
              Get Notified <ArrowRight size={16} aria-hidden style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
