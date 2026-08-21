'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import styles from './Navbar.module.css';

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [expanded, setExpanded]   = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navCls = `${styles.navbar} ${scrolled ? styles['navbar--solid'] : styles['navbar--transparent']}`;

  return (
    <>
      <header className={navCls} role="banner">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="CLARYN Home">
            <div>
              <span className={styles.logoText}>CLARYN</span>
              <span className={styles.logoSub}>Clear Water. Clearer Life.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Primary navigation">
            {siteConfig.nav.main.map((item) => (
              <div key={item.label} className={styles.navItem}>
                {'children' in item && item.children ? (
                  <>
                    <button className={styles.navLink} aria-expanded="false" aria-haspopup="true">
                      {item.label}
                      <ChevronDown size={14} aria-hidden />
                    </button>
                    <div className={styles.dropdown} role="menu">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className={styles.dropdownLink} role="menuitem">
                          {child.label}
                          {'tag' in child && child.tag ? (
                            <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                              background: child.tag === 'Live' ? 'rgba(22,163,74,0.12)' : 'rgba(255,138,0,0.12)',
                              color: child.tag === 'Live' ? '#16a34a' : '#d97706' }}>
                              {child.tag}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={styles.navLink}>{item.label}</Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <Link href="/register-product" className="btn btn--outline-white btn--sm">Register Product</Link>
            <Link href="/find-your-solution" className="btn btn--primary btn--sm">Find My Solution</Link>
          </div>

          {/* Mobile Toggle */}
          <button className={styles.menuBtn} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav className={`${styles.mobileMenu} ${menuOpen ? styles['mobileMenu--open'] : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {siteConfig.nav.main.map((item) => (
          <div key={item.label}>
            {'children' in item && item.children ? (
              <>
                <button
                  className={styles.mobileNavLink}
                  style={{ width: '100%', textAlign: 'left', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setExpanded(e => e === item.label ? null : item.label)}
                  aria-expanded={expanded === item.label}
                >
                  {item.label}
                  <ChevronDown size={16} style={{ transition: 'transform 200ms', transform: expanded === item.label ? 'rotate(180deg)' : 'none' }} />
                </button>
                {expanded === item.label && (
                  <div className={styles.mobileSubLinks}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            )}
          </div>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Link href="/register-product" className="btn btn--outline-white" onClick={() => setMenuOpen(false)}>Register Product</Link>
          <Link href="/find-your-solution" className="btn btn--primary" onClick={() => setMenuOpen(false)}>Find My Solution</Link>
        </div>
      </nav>
    </>
  );
}
