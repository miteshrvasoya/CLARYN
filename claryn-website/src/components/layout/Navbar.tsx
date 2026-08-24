'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import styles from './Navbar.module.css';

type NavChild = { label: string; href: string; tag?: string };
type NavItem  = { label: string; href: string; children?: readonly NavChild[] };

export function Navbar() {
  const pathname                     = usePathname();
  const [scrolled,   setScrolled]    = useState(false);
  const [menuOpen,   setMenuOpen]    = useState(false);
  const [activeMenu, setActiveMenu]  = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]  = useState<string | null>(null);
  const innerRef                     = useRef<HTMLDivElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* Body lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Close on route change */
  useEffect(() => {
    setMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  /* Click outside closes desktop dropdown */
  const handleOutside = useCallback((e: MouseEvent) => {
    if (innerRef.current && !innerRef.current.contains(e.target as Node))
      setActiveMenu(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [handleOutside]);

  /* Escape key */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveMenu(null); setMenuOpen(false); }
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  const navItems = siteConfig.nav.main as unknown as NavItem[];
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.navbarSolid : styles.navbarTop}`}
        role="banner"
      >
        <div className={styles.inner} ref={innerRef}>

          {/* ── LOGO ───────────────────────────────────────────────────── */}
          <Link href="/" className={styles.logo} aria-label="CLARYN — Home">
            <div className={styles.logoMark} aria-hidden>
              <div className={styles.logoMarkInner} />
            </div>
            <div>
              <span className={styles.logoWordmark}>CLARYN</span>
              <span className={styles.logoTagline}>Clear Water. Clearer Life.</span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ────────────────────────────────────────────── */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navItems.map(item => {
              const hasMenu = !!item.children?.length;
              const open    = activeMenu === item.label;
              const active  = isActive(item.href);

              return (
                <div key={item.label} className={styles.navGroup}>
                  {hasMenu ? (
                    <button
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''} ${open ? styles.navLinkOpen : ''}`}
                      onClick={() => setActiveMenu(open ? null : item.label)}
                      aria-expanded={open}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={`${styles.navChevron} ${open ? styles.navChevronOpen : ''}`}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {active && <span className={styles.activeBar} aria-hidden />}

                  {hasMenu && (
                    <div
                      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}
                      role="menu"
                    >
                      <div className={styles.dropdownArrow} aria-hidden />
                      <div className={styles.dropdownLinks}>
                        {item.children!.map((child, i) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`${styles.dropdownLink} ${isActive(child.href) ? styles.dropdownLinkActive : ''}`}
                            role="menuitem"
                            tabIndex={open ? 0 : -1}
                            style={{ animationDelay: `${i * 28}ms` }}
                            onClick={() => setActiveMenu(null)}
                          >
                            <span>{child.label}</span>
                            {child.tag && (
                              <span className={`${styles.tag} ${child.tag === 'Live' ? styles.tagLive : styles.tagSoon}`}>
                                {child.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── ACTIONS ────────────────────────────────────────────────── */}
          <div className={styles.actions}>
            {/* Plain text link — not a button */}
            <Link href="/register-product" className={styles.actionText}>
              Register Product
            </Link>
            {/* Single primary CTA */}
            <Link href="/find-your-solution" className={styles.actionCTA}>
              Find My Solution
              <ArrowRight size={13} aria-hidden />
            </Link>
          </div>

          {/* ── HAMBURGER ──────────────────────────────────────────────── */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </header>

      {/* ── BACKDROP ─────────────────────────────────────────────────────── */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      {/* ── MOBILE DRAWER ────────────────────────────────────────────────── */}
      <nav
        id="mobile-nav"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <div className={styles.logoMark} aria-hidden><div className={styles.logoMarkInner} /></div>
            <span className={styles.logoWordmark}>CLARYN</span>
          </Link>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <span className={styles.closeBar} />
            <span className={styles.closeBar} />
          </button>
        </div>

        {/* Links */}
        <div className={styles.drawerLinks}>
          {navItems.map((item, idx) => {
            const open   = mobileOpen === item.label;
            const active = isActive(item.href);

            return (
              <div key={item.label} className={styles.drawerItem}
                style={{ animationDelay: menuOpen ? `${50 + idx * 55}ms` : '0ms' }}>
                {item.children?.length ? (
                  <>
                    <button
                      className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ''}`}
                      onClick={() => setMobileOpen(open ? null : item.label)}
                      aria-expanded={open}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={`${styles.drawerChevron} ${open ? styles.drawerChevronOpen : ''}`}
                        aria-hidden
                      />
                    </button>
                    <div className={`${styles.drawerSub} ${open ? styles.drawerSubOpen : ''}`}>
                      <div>
                        {item.children.map(child => (
                          <Link key={child.href} href={child.href}
                            className={styles.drawerSubLink}
                            onClick={() => setMenuOpen(false)}>
                            {child.label}
                            {child.tag && (
                              <span className={`${styles.tag} ${child.tag === 'Live' ? styles.tagLive : styles.tagSoon}`}>
                                {child.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href}
                    className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ''}`}
                    onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile CTAs */}
        <div className={styles.drawerActions}>
          <Link href="/register-product" className={styles.mobileRegister} onClick={() => setMenuOpen(false)}>
            Register Product
          </Link>
          <Link href="/find-your-solution" className="btn btn--primary" onClick={() => setMenuOpen(false)}>
            Find My Solution <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </nav>
    </>
  );
}
