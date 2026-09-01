'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  autoplayInterval?: number; // ms, default 4000
}

export function ProductGallery({
  images,
  productName,
  badge,
  autoplayInterval = 4000,
}: ProductGalleryProps) {
  const displayImages = images && images.length > 0 ? images : ['/brand/product-placeholder.png'];
  const count = displayImages.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused]           = useState(false);
  const [animDir, setAnimDir]         = useState<'next' | 'prev' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number, dir: 'next' | 'prev') => {
    setAnimDir(dir);
    setActiveIndex((index + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(activeIndex + 1, 'next'), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1, 'prev'), [activeIndex, goTo]);

  /* Auto-advance */
  useEffect(() => {
    if (count <= 1 || paused) return;
    timerRef.current = setTimeout(() => next(), autoplayInterval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIndex, paused, count, next, autoplayInterval]);

  /* Clear animation class after transition */
  useEffect(() => {
    if (!animDir) return;
    const t = setTimeout(() => setAnimDir(null), 350);
    return () => clearTimeout(t);
  }, [animDir, activeIndex]);

  /* Keyboard navigation */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [next, prev]);

  return (
    <div className={styles.galleryWrapper}>
      {/* ── Main Image ─────────────────────────────────────────────────── */}
      <div
        className={styles.mainFrame}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-label="Product image gallery"
      >
        {/* Image */}
        <div className={`${styles.mainImageWrap} ${animDir === 'next' ? styles.slideNext : animDir === 'prev' ? styles.slidePrev : ''}`}>
          <img
            src={displayImages[activeIndex]}
            alt={`${productName} — view ${activeIndex + 1} of ${count}`}
            className={styles.mainImage}
          />
        </div>

        {/* Badge */}
        {badge && <span className={styles.badge}>{badge}</span>}

        {/* Counter pill */}
        {count > 1 && (
          <span className={styles.counter} aria-live="polite" aria-atomic>
            {activeIndex + 1} / {count}
          </span>
        )}

        {/* Prev / Next */}
        {count > 1 && (
          <>
            <button
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`${styles.navBtn} ${styles.navBtnNext}`}
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Autoplay progress bar */}
        {count > 1 && !paused && (
          <div
            key={`${activeIndex}-${paused}`}
            className={styles.progressBar}
            style={{ animationDuration: `${autoplayInterval}ms` }}
          />
        )}
      </div>

      {/* ── Dot indicators ─────────────────────────────────────────────── */}
      {count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Gallery navigation">
          {displayImages.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View image ${i + 1}`}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => goTo(i, i > activeIndex ? 'next' : 'prev')}
            />
          ))}
        </div>
      )}

      {/* ── Thumbnails ─────────────────────────────────────────────────── */}
      {count > 1 && (
        <div className={styles.thumbRow}>
          {displayImages.map((src, i) => (
            <button
              key={i}
              className={`${styles.thumbBtn} ${i === activeIndex ? styles.thumbActive : ''}`}
              onClick={() => goTo(i, i > activeIndex ? 'next' : 'prev')}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <img src={src} alt="" className={styles.thumbImg} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
