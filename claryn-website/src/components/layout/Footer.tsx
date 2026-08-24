import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Globe, Share2, Rss, Link2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

const socialLinks = [
  { label: 'Instagram', href: siteConfig.social.instagram, Icon: Share2 },
  { label: 'Facebook',  href: siteConfig.social.facebook,  Icon: Globe  },
  { label: 'YouTube',   href: siteConfig.social.youtube,   Icon: Rss    },
  { label: 'LinkedIn',  href: siteConfig.social.linkedin,  Icon: Link2  },
  { label: 'X',         href: siteConfig.social.x,         Icon: Share2 },
].filter(s => Boolean(s.href));

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink} aria-label="CLARYN Home">
              <Image
                src="/brand/logo/primary-brand-logo.png"
                alt="CLARYN — Clear Water. Clearer Life."
                width={160}
                height={52}
                className={styles.footerLogoImage}
              />
            </Link>
            <p className={styles.tagline}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.35)' }}>By Udarta Watertech Private Limited</span>
            </p>
            <p className={styles.description}>
              Innovative, reliable, and accessible water solutions for Indian homes, businesses, and industry. If it improves water, it belongs to CLARYN.
            </p>

            <div className={styles.contactInfo}>
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} className={styles.contactItem}>
                  <Mail size={14} aria-hidden /><span>{siteConfig.contact.email}</span>
                </a>
              )}
              {siteConfig.contact.phone && (
                <a href={`tel:${siteConfig.contact.phone}`} className={styles.contactItem}>
                  <Phone size={14} aria-hidden /><span>{siteConfig.contact.phone}</span>
                </a>
              )}
              {siteConfig.contact.address && (
                <span className={styles.contactItem}>
                  <MapPin size={14} aria-hidden /><span>{siteConfig.contact.address}</span>
                </span>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className={styles.socialRow}>
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={label} href={href} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`CLARYN on ${label}`}>
                    <Icon size={16} aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Products */}
          <div className={styles.linkCol}>
            <p className={styles.colTitle}>Products</p>
            <Link href="/products" className={styles.footerLink}>All Products</Link>
            <Link href="/products?category=ro-membranes" className={styles.footerLink}>RO Membranes</Link>
            <Link href="/products?category=ro-systems" className={styles.footerLink}>RO Systems</Link>
            <Link href="/products?category=filters" className={styles.footerLink}>Water Filters</Link>
            <Link href="/find-your-solution" className={styles.footerLink}>Find Your Solution</Link>
            <Link href="/register-product" className={styles.footerLink}>Register Product</Link>
          </div>

          {/* Knowledge */}
          <div className={styles.linkCol}>
            <p className={styles.colTitle}>Knowledge</p>
            <Link href="/learn" className={styles.footerLink}>Water Knowledge Hub</Link>
            <Link href="/learn?category=water-quality" className={styles.footerLink}>Water Quality</Link>
            <Link href="/learn?category=ro-technology" className={styles.footerLink}>RO Technology</Link>
            <Link href="/learn?category=tds-hard-water" className={styles.footerLink}>TDS &amp; Hard Water</Link>
            <Link href="/learn?category=maintenance" className={styles.footerLink}>Maintenance Guides</Link>
            <Link href="/blog" className={styles.footerLink}>Blog</Link>
            <Link href="/resources" className={styles.footerLink}>Resources</Link>
          </div>

          {/* Support */}
          <div className={styles.linkCol}>
            <p className={styles.colTitle}>Support</p>
            <Link href="/support" className={styles.footerLink}>Support Center</Link>
            <Link href="/faq" className={styles.footerLink}>FAQ</Link>
            <Link href="/warranty" className={styles.footerLink}>Warranty Info</Link>
            <Link href="/warranty/claim" className={styles.footerLink}>Warranty Claim</Link>
            <Link href="/installation" className={styles.footerLink}>Installation Center</Link>
            <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
          </div>

          {/* Company */}
          <div className={styles.linkCol}>
            <p className={styles.colTitle}>Company</p>
            <Link href="/about" className={styles.footerLink}>About CLARYN</Link>
            <Link href="/company" className={styles.footerLink}>Udarta Watertech</Link>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Use</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} Udarta Watertech Private Limited. All rights reserved. CLARYN™ is a registered trademark.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms"   className={styles.legalLink}>Terms of Use</Link>
            <Link href="/sitemap.xml" className={styles.legalLink}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
