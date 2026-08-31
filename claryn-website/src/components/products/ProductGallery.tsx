'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no images, use a placeholder logic
  const displayImages = images && images.length > 0 ? images : ['/brand/product-placeholder.png'];

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image Viewer */}
      <div className={styles.mainImageWrapper}>
        {/* We can use standard <img> or Next.js <Image> if domains are configured. Using standard img for placeholder flexibility. */}
        <img 
          src={displayImages[activeIndex]} 
          alt={`${productName} - View ${activeIndex + 1}`} 
          className={styles.mainImage}
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className={styles.thumbnailList}>
          {displayImages.map((src, idx) => (
            <button
              key={idx}
              className={`${styles.thumbnailBtn} ${idx === activeIndex ? styles.thumbnailActive : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              aria-pressed={idx === activeIndex}
            >
              <img src={src} alt="" className={styles.thumbnailImg} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
