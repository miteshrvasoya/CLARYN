'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, Droplets, BookOpen, Wrench, HelpCircle, Info } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import styles from './Navbar.module.css';

/* ─── Nav icon map ─────────────────────────────────────────────────────────── */
const NAV_ICONS: Record<string, React.ElementType> = {
  Products:          Droplets,
  'Water Knowledge': BookOpen,
  Installation:      Wrench,
  Support:           HelpCircle,
  About:             Info,
};

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type NavChild = {
  label: string;
  href:  string;
  tag?:  string;
};

type NavItem = {
  label:    string;
  href:     string;
  children?: readonly NavChild[];
};

export function Navbar() {
  const pathname                          = usePathname();
  const [scrolled,    setScrolled]        = useState(false);
  const [scrollPct,   setScrollPct]       = useState(0);
  const [menuOpen,    setMenuOpen]        = useState(false);
  const [activeMenu,  setActiveMenu]      = useState<string | null>(null);
  const [mobileOpen,  setMobileOpen]      = useState<string | null>(null);
  const navRef                            = useRef<HTMLElement>(null);

  /* ── Scroll state ───────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setScrollPct(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body scroll lock while mobile menu open ────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Close menu on route change ─────────────────────────────────────── */
  useEffect(() => {
    setMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  /* ── Click-outside to close desktop dropdown ────────────────────────── */
  const handleOutside = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setActiveMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [handleOutside]);

  /* ── Keyboard: Escape closes dropdown ───────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveMenu(null); setMenuOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navItems = siteConfig.nav.main as unknown as NavItem[];
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        className={`${styles.navbar} ${scrolled ? styles.navbarSolid : styles.navbarTop}`}
        role="banner"
      >
        {/* Scroll progress bar */}
        <div
          className={styles.progressBar}
          style={{ width: `${scrollPct}%` }}
          aria-hidden
        />

        <div className={styles.inner} ref={navRef as React.RefObject<HTMLDivElement>}>

          {/* ── LOGO ─────────────────────────────────────────────────────── */}
          <Link href="/" className={styles.logo} aria-label="CLARYN — Home">
            <div className={styles.logoMark} aria-hidden>
              <div className={styles.logoMarkInner} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoWordmark}>CLARYN</span>
              <span className={styles.logoTagline}>Clear Water. Clearer Life.</span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────────────────── */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon    = NAV_ICONS[item.label];
              const active  = isActive(item.href);
              const hasMenu = !!item.children?.length;
              const open    = activeMenu === item.label;

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
                        size={13}
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

                  {/* Active underline indicator */}
                  {active && <span className={styles.navActiveLine} aria-hidden />}

                  {/* Dropdown */}
                  {hasMenu && (
                    <div
                      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}
                      role="menu"
                      aria-label={`${item.label} menu`}
                    >
                      {/* Dropdown arrow */}
                      <div className={styles.dropdownArrow} aria-hidden />

                      <div className={styles.dropdownInner}>
                        {/* Header row */}
                        <div className={styles.dropdownHeader}>
                          <div className={styles.dropdownHeaderIcon}>
                            {Icon && <Icon size={16} aria-hidden />}
                          </div>
                          <div>
                            <p className={styles.dropdownHeaderTitle}>{item.label}</p>
                          </div>
                          <Link href={item.href} className={styles.dropdownHeaderCTA} tabIndex={open ? 0 : -1}>
                            View all <ArrowRight size={12} aria-hidden />
                          </Link>
                        </div>

                        {/* Links grid */}
                        <div className={styles.dropdownLinks}>
                          {item.children!.map((child, i) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`${styles.dropdownLink} ${isActive(child.href) ? styles.dropdownLinkActive : ''}`}
                              role="menuitem"
                              tabIndex={open ? 0 : -1}
                              style={{ animationDelay: `${i * 30}ms` }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <span className={styles.dropdownLinkText}>{child.label}</span>
                              {child.tag && (
                                <span className={`${styles.dropdownTag} ${child.tag === 'Live' ? styles.dropdownTagLive : styles.dropdownTagSoon}`}>
                                  {child.tag}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── DESKTOP ACTIONS ──────────────────────────────────────────── */}
          <div className={styles.actions}>
            <Link href="/register-product" className={styles.actionRegister}>
              Register Product
            </Link>
            <Link href="/find-your-solution" className={styles.actionCTA}>
              Find My Solution
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          {/* ── HAMBURGER (mobile) ───────────────────────────────────────── */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE DRAWER
          ═══════════════════════════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      <nav
        id="mobile-nav"
        className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.drawerLogo} onClick={() => setMenuOpen(false)}>
            <span className={styles.drawerLogoMark} aria-hidden />
            <span className={styles.logoWordmark} style={{ fontSize: '1.1rem' }}>CLARYN</span>
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className={styles.drawerCloseBar} />
            <span className={styles.drawerCloseBar} />
          </button>
        </div>

        {/* Mobile links */}
        <div className={styles.drawerLinks}>
          {navItems.map((item, idx) => {
            const hasMenu   = !!item.children?.length;
            const open      = mobileOpen === item.label;
            const active    = isActive(item.href);

            return (
              <div
                key={item.label}
                className={styles.drawerItem}
                style={{ animationDelay: menuOpen ? `${50 + idx * 55}ms` : '0ms' }}
              >
                {hasMenu ? (
                  <>
                    <button
                      className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ''}`}
                      onClick={() => setMobileOpen(open ? null : item.label)}
                      aria-expanded={open}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`${styles.drawerChevron} ${open ? styles.drawerChevronOpen : ''}`}
                        aria-hidden
                      />
                    </button>

                    <div className={`${styles.drawerSub} ${open ? styles.drawerSubOpen : ''}`}>
                      {item.children!.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.drawerSubLink}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span>{child.label}</span>
                          {child.tag && (
                            <span className={`${styles.dropdownTag} ${child.tag === 'Live' ? styles.dropdownTagLive : styles.dropdownTagSoon}`}>
                              {child.tag}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile CTA buttons */}
        <div className={styles.drawerActions}>
          <Link href="/register-product" className="btn btn--outline-white" onClick={() => setMenuOpen(false)}>
            Register Product
          </Link>
          <Link href="/find-your-solution" className="btn btn--primary" onClick={() => setMenuOpen(false)}>
            Find My Solution <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </nav>
    </>
  );
}
