import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { ArrowRight, ExternalLink } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Products — RO Membranes & Water Solutions | CLARYN',
  description: 'Browse CLARYN\'s range of premium water purification products including high-capacity RO membranes, filters, and systems. Engineered for Indian water conditions.',
};

const CATEGORIES = ['All', 'ro-membranes', 'ro-systems', 'filters', 'pumps', 'testing', 'smart-water', 'commercial'];

export default function ProductsPage() {
  const activeProducts = products.filter(p => p.status === 'active');

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.heroLabel}>Product Catalog</span>
          <h1 className={styles.heroTitle}>Water Solutions for Every Need</h1>
          <p className={styles.heroDesc}>
            Precision-engineered water purification products for Indian homes and businesses. Explore our industry-leading RO membranes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className={styles.filters}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${cat === 'All' ? styles.filterBtnActive : ''}`}
                aria-current={cat === 'All' ? 'page' : undefined}
              >
                {cat === 'All' ? 'All Products' : cat.replace(/-/g, ' ')}
              </button>
            ))}
          </div>

          {/* Live Products Grid */}
          <div className={styles.productsGrid}>
            {activeProducts.map(product => {
              const amazonLink = product.marketplaceLinks.find(m => m.marketplaceName === 'Amazon India' && m.isActive);

              return (
                <div key={product.id} className={styles.productCard}>
                  <Link href={`/products/${product.slug}`} className={styles.productVisual}>
                    <div className={styles.productVisualBig}>
                      <p className={styles.productVisualNum}>{product.specs.gpd}</p>
                      <p className={styles.productVisualUnit}>GPD</p>
                    </div>
                  </Link>

                  <div className={styles.productInfo}>
                    <p className={styles.productModel}>{product.model}</p>
                    <Link href={`/products/${product.slug}`}>
                      <h2 className={styles.productName}>{product.name}</h2>
                    </Link>
                    <p className={styles.productDesc}>{product.shortDescription}</p>

                    <div className={styles.productSpecs}>
                      <span className={styles.productSpec}>{product.specs.gpd} GPD</span>
                      <span className={styles.productSpec}>{product.specs.membraneLayers} Layer</span>
                      <span className={styles.productSpec}>{product.specs.saltRejectionPercent}% Rejection</span>
                      {product.specs.maxTDS && <span className={styles.productSpec}>{product.specs.maxTDS} ppm TDS</span>}
                    </div>

                    <div className={styles.productActions}>
                      <Link href={`/products/${product.slug}`} className={`btn btn--primary ${styles.productCtaPrimary}`}>
                        View Details
                      </Link>
                      {amazonLink && (
                        <a 
                          href={amazonLink.url} 
                          className={`btn btn--outline ${styles.productCtaSecondary}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Buy ${product.name} on Amazon`}
                        >
                          Buy <ExternalLink size={14} aria-hidden style={{ marginLeft: '4px' }} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming Soon */}
          <div className={styles.comingSoon}>
            <h3 className={styles.comingSoonTitle}>More Products Coming Soon</h3>
            <p className={styles.comingSoonDesc}>
              RO Systems, Water Filters, Pumps, Water Testing, Smart Water, and Commercial Solutions are in active development.
            </p>
            <Link href="/register-product" className="btn btn--primary">
              Register to Get Notified <ArrowRight size={16} aria-hidden style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
