'use client';
import { useState } from 'react';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

export function ProductGallery({ images, productName, badge }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images && images.length > 0 ? images : ['/brand/product-placeholder.png'];

  return (
    <div className={styles.galleryWrapper}>
      {/* Main Image */}
      <div className={styles.mainImageFrame}>
        {badge && <span className={styles.imageBadge}>{badge}</span>}
        <img
          src={displayImages[activeIndex]}
          alt={`${productName} - View ${activeIndex + 1}`}
          className={styles.mainImage}
        />
      </div>

      {/* Thumbnails — only show if more than 1 image */}
      {displayImages.length > 1 && (
        <div className={styles.thumbRow}>
          {displayImages.map((src, idx) => (
            <button
              key={idx}
              className={`${styles.thumbBtn} ${idx === activeIndex ? styles.thumbBtnActive : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              aria-pressed={idx === activeIndex}
            >
              <img src={src} alt="" className={styles.thumbImg} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
