import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { knowledgeArticles } from '@/data/knowledge-articles';
import { siteConfig } from '@/lib/site-config';
import {
  ShieldCheck, Zap, Award, ChevronRight, ArrowRight,
  CheckCircle, BookOpen, Clock, Wrench, Phone, Star,
  Droplets, FlaskConical, Building2, Cpu, AlertTriangle
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'CLARYN — Clear Water. Clearer Life. | Water Solutions & Water Technology',
  description: 'CLARYN by Udarta Watertech — India\'s modern water solutions brand. Premium RO membranes, water purification systems, and smart water technology for homes and businesses.',
  alternates: { canonical: '/' },
};

const categories = [
  { icon: Droplets,    label: 'RO Membranes',         href: '/products?category=ro-membranes', tag: 'Live',        desc: 'High-performance TFC membranes engineered for Indian water conditions.' },
  { icon: ShieldCheck, label: 'RO Systems',            href: '/products?category=ro-systems',   tag: 'Coming Soon', desc: 'Complete residential and commercial reverse osmosis systems.' },
  { icon: FlaskConical,label: 'Water Filters',         href: '/products?category=filters',      tag: 'Coming Soon', desc: 'Pre-filters, post-filters, and specialty filter housings.' },
  { icon: Zap,         label: 'Pumps & Boosters',      href: '/products?category=pumps',        tag: 'Coming Soon', desc: 'Booster pumps and pressure management solutions.' },
  { icon: FlaskConical,label: 'Water Testing',         href: '/products?category=testing',      tag: 'Coming Soon', desc: 'Water quality testing kits, TDS meters, and monitoring solutions.' },
  { icon: Cpu,         label: 'Smart Water',           href: '/products?category=smart-water',  tag: 'Coming Soon', desc: 'IoT-enabled monitoring, smart purifiers, and automated maintenance.' },
  { icon: Building2,   label: 'Commercial & Industrial', href: '/products?category=commercial', tag: 'Coming Soon', desc: 'Water solutions for offices, restaurants, factories, and institutions.' },
];

const trustPillars = [
  { icon: ShieldCheck, title: '12-Month Warranty',       desc: 'All CLARYN products come with a full 12-month manufacturer warranty. We stand behind every membrane, every time.' },
  { icon: Zap,         title: 'Engineered for India',    desc: 'Designed for the full spectrum of Indian water conditions — from municipal supply to high-TDS borewell water.' },
  { icon: Award,       title: 'TFC Polyamide Quality',   desc: '5-layer Thin Film Composite construction delivering up to 98% salt rejection — the benchmark for modern RO membranes.' },
  { icon: CheckCircle, title: 'Universal Compatibility', desc: 'Compatible with virtually all major Indian RO brands. No proprietary lock-in — fits your existing system.' },
];

const featuredArticles = knowledgeArticles.filter(a => a.isPublished).slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroBg} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Water Solutions &amp; Water Technology</span>
            <h1 className={styles.heroTitle}>
              Water That<br />
              <span className={styles.heroTitleAccent}>Works for You.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              CLARYN is India&apos;s modern water technology brand — delivering premium purification systems, membranes, and smart water solutions for homes and businesses.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products" className="btn btn--primary btn--lg">
                Explore Products <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/find-your-solution" className="btn btn--outline-white btn--lg">
                Find My Solution
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden>
            <div className={styles.heroCard}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>CLARYN Membrane</p>
                <div style={{ fontSize: 'clamp(3.5rem,6vw,5rem)', fontWeight: 800, color: 'var(--color-white)', fontFamily: 'var(--font-secondary)', lineHeight: 1 }}>98%</div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue-300)', marginTop: 'var(--space-2)' }}>Salt Rejection Rate</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
                  {[['75/100', 'GPD'], ['5-Layer', 'TFC'], ['2000', 'Max TDS']].map(([n, l]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-white)', fontFamily: 'var(--font-secondary)' }}>{n}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className={styles.trustStrip}>
          <div className={`container ${styles.trustStrip__inner}`}>
            {[
              { Icon: ShieldCheck, label: '12-Month Warranty' },
              { Icon: Award,       label: 'Up to 98% Salt Rejection' },
              { Icon: CheckCircle, label: 'Universal Compatibility' },
              { Icon: Star,        label: 'Made for Indian Water' },
            ].map(({ Icon, label }) => (
              <div key={label} className={styles.trustPill}>
                <span className={styles.trustPill__icon}><Icon size={14} aria-hidden={true} /></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WATER PROBLEM ── */}
      <section className={styles.waterProblem}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">The Reality</span>
            <h2 className="section-header__title">India Has a Water Quality Problem</h2>
            <p className="section-header__subtitle">
              Millions of Indian households drink water that looks clean but isn&apos;t. Understanding the problem is the first step to solving it.
            </p>
          </div>
          <div className={styles.problemGrid}>
            {[
              { n: '600M+', d: 'Indians lack access to safe drinking water close to home', src: 'NITI Aayog Water Management Index' },
              { n: '70%',   d: 'of India\'s water sources are contaminated by biological or chemical pollutants', src: 'Central Pollution Control Board' },
              { n: '200M+', d: 'people drink groundwater with high fluoride, arsenic, or heavy metal contamination', src: 'WHO / CGWB Reports' },
              { n: '1000+', d: 'ppm TDS found in many Indian borewell sources — far above recommended drinking levels', src: 'CGWB Groundwater Data' },
            ].map(({ n, d, src }) => (
              <div key={n} className={styles.problemStat}>
                <span className={styles.problemStat__number}>{n}</span>
                <p className={styles.problemStat__desc}>{d}</p>
                <p className={styles.problemStat__note}>Source: {src}</p>
              </div>
            ))}
          </div>
          <div className={styles.problemCTA}>
            <p>Don&apos;t know your water quality? Start with a simple TDS test.</p>
            <Link href="/learn/water-quality/what-is-tds-in-water" className="btn btn--primary">
              Learn About TDS <ChevronRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className={styles.categories}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Our Solutions</span>
            <h2 className="section-header__title">Complete Water Solutions. One Brand.</h2>
            <p className="section-header__subtitle">
              CLARYN covers the full spectrum of water improvement — from RO membranes available today, to smart water systems coming soon.
            </p>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map(({ icon: Icon, label, href, tag, desc }) => (
              <Link key={label} href={tag === 'Live' ? href : '#'} className={`${styles.categoryCard} ${tag !== 'Live' ? styles.categoryCard__soon : ''}`}
                aria-label={`${label}${tag !== 'Live' ? ' — ' + tag : ''}`} tabIndex={tag !== 'Live' ? -1 : 0}>
                <div className={styles.categoryCard__iconWrap}>
                  <Icon size={22} aria-hidden />
                </div>
                <div className={styles.categoryCard__body}>
                  <div className={styles.categoryCard__titleRow}>
                    <span className={styles.categoryCard__title}>{label}</span>
                    <span className={`badge ${tag === 'Live' ? 'badge--live' : 'badge--coming'}`}>{tag}</span>
                  </div>
                  <p className={styles.categoryCard__desc}>{desc}</p>
                </div>
                {tag === 'Live' && <ArrowRight size={16} className={styles.categoryCard__arrow} aria-hidden />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.products}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Live Products</span>
            <h2 className="section-header__title">Available Now</h2>
            <p className="section-header__subtitle">
              Our first products — precision-engineered RO membranes for Indian water conditions. Available on Amazon and Flipkart.
            </p>
          </div>
          <div className={styles.productsGrid}>
            {products.filter(p => p.status === 'active').map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productCard__img}>
                  <div style={{ background: 'linear-gradient(135deg,#e0f0fb 0%,#f9fafb 100%)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-blue)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>CLARYN</p>
                      <p style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-secondary)', lineHeight: 1 }}>{product.specs.gpd}</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue)', fontWeight: 600 }}>GPD</p>
                    </div>
                  </div>
                </div>
                <div className={styles.productCard__body}>
                  <p className={styles.productCard__model}>{product.model}</p>
                  <h3 className={styles.productCard__name}>{product.name}</h3>
                  <p className={styles.productCard__desc}>{product.shortDescription}</p>
                  <div className={styles.productCard__specs}>
                    {[
                      [`${product.specs.gpd} GPD`, 'Flow Rate'],
                      [`${product.specs.membraneLayers}-Layer`, 'Construction'],
                      [`${product.specs.saltRejectionPercent}%`, 'Salt Rejection'],
                      [`${product.specs.maxTDS} ppm`, 'Max TDS'],
                    ].map(([val, lbl]) => (
                      <div key={lbl} className={styles.productCard__spec}>
                        <span className={styles.productCard__specVal}>{val}</span>
                        <span className={styles.productCard__specLbl}>{lbl}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <Link href={`/products/${product.slug}`} className="btn btn--primary">View Product</Link>
                    {product.marketplaceLinks.filter(m => m.isActive && m.availability === 'in_stock')[0] && (
                      <a href={product.marketplaceLinks.filter(m => m.isActive && m.availability === 'in_stock')[0].url}
                        className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                        Buy Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link href="/products" className="btn btn--outline">View All Products <ArrowRight size={16} aria-hidden /></Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[['98%','Salt Rejection'],['5-Layer','Membrane Tech'],['2000 ppm','Max TDS Rated'],['12 Mo','Warranty']].map(([n, l]) => (
              <div key={l} className={styles.statItem}>
                <span className={styles.statNumber}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className={styles.trust}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Why CLARYN</span>
            <h2 className="section-header__title">Built Different. Engineered Better.</h2>
            <p className="section-header__subtitle">Every CLARYN product is designed as a technology product — not just a commodity replacement part.</p>
          </div>
          <div className={`${styles.trustGrid} grid-4`}>
            {trustPillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.trustCard}>
                <div className={styles.trustCard__icon}><Icon size={24} aria-hidden /></div>
                <h3 className={styles.trustCard__title}>{title}</h3>
                <p className={styles.trustCard__desc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE HUB ── */}
      <section className={styles.knowledge}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Water Knowledge</span>
            <h2 className="section-header__title">Understand Your Water</h2>
            <p className="section-header__subtitle">Evidence-based guides to help you make informed decisions about your water quality and purification.</p>
          </div>
          <div className={styles.articleGrid}>
            {featuredArticles.map((article) => (
              <Link key={article.id} href={`/learn/${article.category}/${article.slug}`} className={styles.articleCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
                    {article.category.replace(/-/g, ' ')}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)' }}>
                    <Clock size={12} aria-hidden />{article.readTimeMinutes} min read
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 'var(--lh-snug)', marginBottom: 'var(--space-2)' }}>{article.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 'var(--lh-relaxed)', flex: 1 }}>{article.summary}</p>
                <div className={styles.articleCard__cta}>
                  <BookOpen size={14} aria-hidden /><span>Read Article</span><ArrowRight size={14} aria-hidden />
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link href="/learn" className="btn btn--outline">Browse All Articles <ArrowRight size={16} aria-hidden /></Link>
          </div>
        </div>
      </section>

      {/* ── SUPPORT TEASER ── */}
      <section className={styles.support}>
        <div className="container">
          <div className={styles.supportGrid}>
            <div className={styles.supportText}>
              <span className="text-label">Post-Purchase Support</span>
              <h2 className={styles.supportHeading}>We&apos;re Here After the Purchase Too</h2>
              <p className={styles.supportDesc}>Installation help, maintenance guidance, warranty support, and a team that actually answers — CLARYN is a brand, not just a listing.</p>
              <ul className={styles.supportList}>
                {['Step-by-step installation guides with photos', 'Maintenance schedules and reminders', '12-month warranty on all products', 'Warranty claim support and RMA process', 'Water quality Q&A via our Knowledge Hub'].map(item => (
                  <li key={item} className={styles.supportList__item}><CheckCircle size={16} className={styles.supportList__icon} aria-hidden />{item}</li>
                ))}
              </ul>
              <div className={styles.supportActions}>
                <Link href="/support" className="btn btn--primary">Visit Support Center</Link>
                <Link href="/register-product" className="btn btn--outline">Register Your Product</Link>
              </div>
            </div>
            <div className={styles.supportCards}>
              {[
                { icon: Wrench,    title: 'Installation Center', desc: 'Step-by-step guides for membrane and filter installation.', href: '/installation', cta: 'View Guides' },
                { icon: ShieldCheck,title: 'Warranty & Claims',  desc: 'Understand your coverage and initiate a claim online.',        href: '/warranty',    cta: 'Learn More' },
                { icon: BookOpen,  title: 'Knowledge Hub',       desc: 'Evidence-based water quality education articles.',              href: '/learn',       cta: 'Start Learning' },
                { icon: Phone,     title: 'Contact Us',          desc: 'Reach our support team for product or water quality queries.',  href: '/contact',     cta: 'Get in Touch' },
              ].map(({ icon: Icon, title, desc, href, cta }) => (
                <Link key={title} href={href} className={styles.supportCard}>
                  <div className={styles.supportCard__icon}><Icon size={20} aria-hidden /></div>
                  <div>
                    <p className={styles.supportCard__title}>{title}</p>
                    <p className={styles.supportCard__desc}>{desc}</p>
                    <span className={styles.supportCard__cta}>{cta} <ChevronRight size={14} aria-hidden /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLogo}>
              <p className={styles.aboutLogoSub}>A brand by</p>
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-secondary)', letterSpacing: '0.05em' }}>Udarta Watertech</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>Private Limited</p>
              <Link href="/company" className="btn btn--outline" style={{ marginTop: 'var(--space-4)' }}>About the Company</Link>
            </div>
            <div className={styles.aboutText}>
              <h2 className={styles.aboutHeading}>Why CLARYN Exists</h2>
              <p className={styles.aboutDesc}>Millions of Indian families drink water that passes through an aging or neglected purifier every day — and don&apos;t know it&apos;s not working as it should. CLARYN was built to change that: to bring real quality, real transparency, and real support to an industry that has long been dominated by low-quality commodity products.</p>
              <p className={styles.aboutDesc}>Our mission is simple: improve people&apos;s lives by providing reliable, innovative, and accessible water solutions. If it improves water, it belongs to CLARYN.</p>
              <div className={styles.aboutActions}>
                <Link href="/about" className="btn btn--primary">Our Story</Link>
                <Link href="/learn" className="btn btn--outline">Water Knowledge Hub</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaBandInner}>
            <div>
              <h2 className={styles.ctaBand__title}>Ready to Improve Your Water?</h2>
              <p className={styles.ctaBand__sub}>Use our solution finder to get a personalised recommendation — or register your product to activate your warranty.</p>
            </div>
            <div className={styles.ctaBand__actions}>
              <Link href="/find-your-solution" className="btn btn--primary btn--lg">Find My Solution</Link>
              <Link href="/register-product" className="btn btn--outline-white btn--lg">Register Product</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
