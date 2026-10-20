'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ShieldCheck, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import styles from './Navbar.module.css';

type NavChild = { label: string; href: string; tag?: string };
type NavItem = { label: string; href: string; children?: readonly NavChild[] };

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Body lock when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* Close on route change */
  useEffect(() => {
    setMenuOpen(false);
    setActiveMenu(null);
    setMobileOpen(null);
  }, [pathname]);

  /* Click outside closes desktop dropdown */
  const handleOutside = useCallback((e: MouseEvent) => {
    if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
      setActiveMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [handleOutside]);

  /* Escape key closes menus */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = siteConfig.nav.main as unknown as NavItem[];
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  // Homepage has dark hero, inner pages have light background
  const isHomePage = pathname === '/';

  const navbarThemeClass = isHomePage
    ? scrolled
      ? styles.navbarDarkSolid
      : styles.navbarDarkTop
    : scrolled
      ? styles.navbarLightSolid
      : styles.navbarLightTop;

  return (
    <>
      <header
        className={`${styles.navbar} ${navbarThemeClass}`}
        role="banner"
      >
        <div className={styles.inner} ref={innerRef}>
          {/* ── 1. LOGO (Far Left) ────────────────────────────────────── */}
          <Link href="/" className={styles.logo} aria-label="CLARYN — Clear Water. Clearer Life.">
            <Image
              src="/brand/logo/PRIMARY_BRAND_LOGO_TEXT_PNG.png"
              alt="CLARYN"
              width={132}
              height={42}
              priority
              className={styles.logoImage}
            />
          </Link>

          {/* ── 2. MAIN NAVIGATION (Middle) ───────────────────────────── */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navItems.map((item) => {
              const hasMenu = !!item.children?.length;
              const open = activeMenu === item.label;
              const active = isActive(item.href);

              return (
                <div key={item.label} className={styles.navGroup}>
                  {hasMenu ? (
                    <button
                      type="button"
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''} ${open ? styles.navLinkOpen : ''}`}
                      onClick={() => setActiveMenu(open ? null : item.label)}
                      aria-expanded={open}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={12}
                        className={`${styles.navChevron} ${open ? styles.navChevronOpen : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}

                  {hasMenu && (
                    <div
                      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}
                      role="menu"
                    >
                      <div className={styles.dropdownLinks}>
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`${styles.dropdownLink} ${isActive(child.href) ? styles.dropdownLinkActive : ''}`}
                            role="menuitem"
                            tabIndex={open ? 0 : -1}
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className={styles.dropdownLabel}>{child.label}</span>
                            {child.tag && (
                              <span
                                className={`${styles.tag} ${
                                  child.tag === 'Live' ? styles.tagLive : styles.tagSoon
                                }`}
                              >
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

          {/* ── 3. PRIMARY ACTIONS (Far Right) ────────────────────────── */}
          <div className={styles.actions}>
            <Link
              href="/register-product"
              className={styles.actionRegister}
              aria-label="Register Product"
            >
              <ShieldCheck size={14} className={styles.registerIcon} aria-hidden="true" />
              <span>Register Product</span>
            </Link>

            <Link
              href="/find-your-solution"
              className={styles.actionCTA}
              id="nav-cta-find-solution"
            >
              <span>Find My Water Solution</span>
            </Link>
          </div>

          {/* ── HAMBURGER (Mobile Toggle) ──────────────────────────────── */}
          <button
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </header>

      {/* ── BACKDROP OVERLAY ────────────────────────────────────────────── */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── MOBILE DRAWER ────────────────────────────────────────────────── */}
      <aside
        id="mobile-nav"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.drawerLogo} onClick={() => setMenuOpen(false)} aria-label="CLARYN Home">
            <Image
              src="/brand/logo/PRIMARY_BRAND_LOGO_TEXT_PNG.png"
              alt="CLARYN"
              width={118}
              height={38}
              className={styles.drawerLogoImage}
            />
          </Link>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.drawerContent}>
          <div className={styles.drawerLinks}>
            {navItems.map((item) => {
              const open = mobileOpen === item.label;
              const active = isActive(item.href);

              return (
                <div key={item.label} className={styles.drawerGroup}>
                  {item.children?.length ? (
                    <>
                      <button
                        type="button"
                        className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ''}`}
                        onClick={() => setMobileOpen(open ? null : item.label)}
                        aria-expanded={open}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={15}
                          className={`${styles.drawerChevron} ${open ? styles.drawerChevronOpen : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      <div className={`${styles.drawerSub} ${open ? styles.drawerSubOpen : ''}`}>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`${styles.drawerSubLink} ${
                              isActive(child.href) ? styles.drawerSubLinkActive : ''
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            <span>{child.label}</span>
                            {child.tag && (
                              <span
                                className={`${styles.tag} ${
                                  child.tag === 'Live' ? styles.tagLive : styles.tagSoon
                                }`}
                              >
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
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.drawerActions}>
            <Link
              href="/find-your-solution"
              className={styles.mobileCTA}
              onClick={() => setMenuOpen(false)}
            >
              Find My Water Solution
            </Link>
            <Link
              href="/register-product"
              className={styles.mobileRegister}
              onClick={() => setMenuOpen(false)}
            >
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Register Product</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
