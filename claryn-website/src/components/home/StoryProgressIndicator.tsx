'use client';
import { useEffect, useState } from 'react';
import styles from './StoryProgressIndicator.module.css';

const SECTIONS = [
  { id: 'hero', label: '01 WATER' },
  { id: 'quality', label: '02 QUALITY' },
  { id: 'ro', label: '03 RO' },
  { id: 'technology', label: '04 TECHNOLOGY' },
  { id: 'solutions', label: '05 SOLUTIONS' },
  { id: 'knowledge', label: '06 KNOWLEDGE' }
];

export function StoryProgressIndicator() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      let current = '';
      
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id;
            break;
          }
        }
      }
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.progressIndicator} aria-label="Story Progress">
      <ul className={styles.list}>
        {SECTIONS.map((section) => (
          <li key={section.id} className={styles.item}>
            <button
              className={`${styles.button} ${activeSection === section.id ? styles.active : ''}`}
              onClick={() => scrollTo(section.id)}
              aria-current={activeSection === section.id ? 'step' : undefined}
            >
              <span className={styles.dot} />
              <span className={styles.label}>{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
