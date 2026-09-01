import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { knowledgeArticles } from '@/data/knowledge-articles';
import { HeroSection } from '@/components/home/HeroSection';
import { WaterDiagnostic } from '@/components/home/WaterDiagnostic';
import { ScrollStory } from '@/components/home/ScrollStory';
import { MembraneVisual } from '@/components/home/MembraneVisual';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'CLARYN — Water, understood | Water Technology & Filtration Solutions',
  description: 'CLARYN by Udarta Watertech — a precision water technology brand. Premium RO membranes, water filtration systems, and water knowledge for modern Indian homes.',
  alternates: { canonical: '/' },
};

const activeProducts     = products.filter(p => p.status === 'active');
const featuredArticles   = knowledgeArticles.filter(a => a.isPublished).slice(0, 3);

const KNOWLEDGE_ITEMS = [
  {
    num:   '01',
    topic: 'TDS',
    title: 'What does your TDS actually tell you?',
    href:  '/learn/tds-hard-water/what-is-tds-in-water',
  },
  {
    num:   '02',
    topic: 'Hardness',
    title: 'Why hard water behaves differently.',
    href:  '/learn/tds-hard-water/what-is-hard-water-and-how-to-treat-it',
  },
  {
    num:   '03',
    topic: 'RO Membranes',
    title: 'Inside the layer that matters.',
    href:  '/learn/ro-technology/how-reverse-osmosis-works',
  },
];

const ENGINEERING_PRINCIPLES = [
  { word: 'PRECISION',    sub: 'Engineered to specification.' },
  { word: 'CONSISTENCY',  sub: 'Performance across all water types.' },
  { word: 'SERVICE',      sub: 'Support that continues after purchase.' },
  { word: 'DESIGN',       sub: 'Built to last. Designed to work.' },
];

const SUPPORT_OPTIONS = [
  { id: 'installation', label: 'Installation',    desc: 'Step-by-step guides for every major Indian RO brand.', href: '/installation' },
  { id: 'product',      label: 'Product',         desc: 'Technical specs, compatibility, and product information.', href: '/products' },
  { id: 'replacement',  label: 'Replacement',     desc: 'When and how to replace your RO membrane.', href: '/learn/maintenance' },
  { id: 'quality',      label: 'Water Quality',   desc: 'Understanding TDS, hardness, and your water profile.', href: '/learn' },
  { id: 'general',      label: 'General Support', desc: 'Warranty, registration, and any other questions.', href: '/support' },
];

export default function HomePage() {
  return (
    <>
      {/* ══ 1. HERO ════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ══ 2. DIAGNOSTIC INTRO ════════════════════════════════════════════ */}
      <section className={styles.diagIntro} id="understand-your-water">
        <div className={styles.diagIntroInner}>
          <p className={styles.diagIntroEyebrow}>Water Diagnostic</p>
          <h2 className={styles.diagIntroHeading}>What&apos;s in your water?</h2>
          <p className={styles.diagIntroSub}>
            Answer four questions. Get your CLARYN water profile.
          </p>
        </div>
        <div className={styles.diagIntroWave} aria-hidden />
      </section>

      {/* ══ 3. INTERACTIVE WATER DIAGNOSTIC ═══════════════════════════════ */}
      <section className={styles.diagnosticSection} aria-label="Interactive water diagnostic">
        <div className={styles.diagnosticInner}>
          <WaterDiagnostic />
        </div>
      </section>

      {/* ══ 4. WATER SOURCE STORYTELLING ══════════════════════════════════ */}
      <section className={styles.sources} aria-labelledby="sources-heading">
        <div className={styles.sourcesInner}>
          <div className={styles.sourcesHeader}>
            <p className={styles.sourcesEyebrow}>Your Source</p>
            <h2 id="sources-heading" className={styles.sourcesHeading}>
              Water is not the same everywhere.
            </h2>
          </div>

          <div className={styles.sourcesGrid}>
            {[
              {
                id:    'borewell',
                name:  'Borewell',
                sub:   'Groundwater · Tubewell',
                tds:   '500–2000+ ppm',
                facts: ['Higher TDS typical', 'Hardness common', 'Regional variation', 'Seasonal quality shifts'],
                href:  '/learn/tds-hard-water/what-is-tds-in-water',
                cta:   'Understand borewell water',
                accent: '#7a5b30',
              },
              {
                id:    'municipal',
                name:  'Municipal',
                sub:   'Corporation · Piped Supply',
                tds:   '150–600 ppm',
                facts: ['Treatment quality varies', 'Chlorine presence', 'Pipe age matters', 'City-to-city variation'],
                href:  '/learn/tds-hard-water/what-is-tds-in-water',
                cta:   'Understand municipal water',
                accent: '#005585',
              },
              {
                id:    'other',
                name:  'Other / Unknown',
                sub:   'Tanker · Mixed · Unsure',
                tds:   'Unknown',
                facts: ['Start with a TDS test', 'Source affects treatment', 'CLARYN can help', 'Simple to measure'],
                href:  '/learn/tds-hard-water/what-is-tds-in-water',
                cta:   'Start with a water test',
                accent: '#1a5c7a',
              },
            ].map(source => (
              <article key={source.id} className={styles.sourceCard}>
                <div
                  className={styles.sourceCardAccent}
                  style={{ background: source.accent }}
                />
                <div className={styles.sourceCardBody}>
                  <div className={styles.sourceCardHeader}>
                    <h3 className={styles.sourceCardName}>{source.name}</h3>
                    <span className={styles.sourceCardSub}>{source.sub}</span>
                  </div>
                  <div className={styles.sourceCardTDS}>
                    <span className={styles.sourceCardTDSNum}>{source.tds}</span>
                    <span className={styles.sourceCardTDSUnit}>typical TDS</span>
                  </div>
                  <ul className={styles.sourceCardFacts}>
                    {source.facts.map(f => (
                      <li key={f} className={styles.sourceCardFact}>
                        <span className={styles.sourceCardFactDot} style={{ background: source.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={source.href} className={styles.sourceCardCTA}>
                    {source.cta} <ArrowRight size={13} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. SCROLL STORY — FILTRATION JOURNEY ══════════════════════════ */}
      <ScrollStory />

      {/* ══ 6. MEMBRANE VISUALIZATION ════════════════════════════════════ */}
      <MembraneVisual />

      {/* ══ 7. PRODUCT SHOWCASE ══════════════════════════════════════════ */}
      <section className={styles.products} aria-labelledby="products-heading">
        <div className={styles.productsInner}>
          <div className={styles.productsHeader}>
            <p className={styles.productsEyebrow}>Products</p>
            <h2 id="products-heading" className={styles.productsHeading}>
              Find what fits your water.
            </h2>
          </div>

          <div className={styles.productsList}>
            {activeProducts.map(product => {
              const primaryLink = product.marketplaceLinks.find(
                m => m.isActive && m.availability === 'in_stock'
              );
              return (
                <article key={product.id} className={styles.productItem}>
                  {/* Visual panel */}
                  <div className={styles.productVisual}>
                    {product.images?.[0] && product.images[0] !== '/brand/product-placeholder.png' ? (
                      <div className={styles.productImageWrapper}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.images[0]} alt={product.name} className={styles.productImage} />
                      </div>
                    ) : (
                      <>
                        <div className={styles.productVisualInner}>
                          <span className={styles.productCategory}>RO Membrane</span>
                          <div className={styles.productGPD}>
                            <span className={styles.productGPDNum}>{product.specs.gpd}</span>
                            <span className={styles.productGPDUnit}>GPD</span>
                          </div>
                          <span className={styles.productLayers}>{product.specs.membraneLayers}-Layer TFC Polyamide</span>
                        </div>
                        {/* Animated flow lines */}
                        <div className={styles.productLines} aria-hidden>
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className={styles.productLine}
                              style={{ top: `${16 + i * 13}%`, animationDelay: `${i * 0.22}s` }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content panel */}
                  <div className={styles.productContent}>
                    <div className={styles.productMeta}>
                      <span className={styles.productModel}>{product.model}</span>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productDesc}>{product.shortDescription}</p>
                    </div>

                    <div className={styles.productSpecs}>
                      <div className={styles.productSpec}>
                        <span className={styles.productSpecVal}>{product.specs.saltRejectionPercent}%</span>
                        <span className={styles.productSpecLbl}>Salt Rejection</span>
                      </div>
                      <div className={styles.productSpec}>
                        <span className={styles.productSpecVal}>{product.specs.maxTDS} ppm</span>
                        <span className={styles.productSpecLbl}>Max Feed TDS</span>
                      </div>
                      <div className={styles.productSpec}>
                        <span className={styles.productSpecVal}>{product.specs.warrantyPeriod}</span>
                        <span className={styles.productSpecLbl}>Warranty</span>
                      </div>
                    </div>

                    <div className={styles.productActions}>
                      <Link href={`/products/${product.slug}`} className={styles.productCTA}>
                        View Product <ArrowRight size={14} aria-hidden />
                      </Link>
                      {primaryLink && (
                        <a
                          href={primaryLink.url}
                          className={styles.productCTASecondary}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {primaryLink.ctaLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.productsFooter}>
            <Link href="/products" className={styles.productsViewAll}>
              All Products <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 8. WATER KNOWLEDGE (EDITORIAL) ══════════════════════════════ */}
      <section className={styles.knowledge} aria-labelledby="knowledge-heading">
        <div className={styles.knowledgeInner}>
          <div className={styles.knowledgeHeader}>
            <p className={styles.knowledgeEyebrow}>Water Knowledge</p>
            <h2 id="knowledge-heading" className={styles.knowledgeHeading}>
              See water differently.
            </h2>
          </div>

          <div className={styles.knowledgeGrid}>
            {KNOWLEDGE_ITEMS.map(item => (
              <Link key={item.num} href={item.href} className={styles.knowledgeCard}>
                <span className={styles.knowledgeCardNum}>{item.num}</span>
                <div className={styles.knowledgeCardContent}>
                  <span className={styles.knowledgeCardTopic}>{item.topic}</span>
                  <h3 className={styles.knowledgeCardTitle}>{item.title}</h3>
                </div>
                <span className={styles.knowledgeCardArrow}>
                  <ArrowRight size={18} aria-hidden />
                </span>
              </Link>
            ))}
          </div>

          <Link href="/learn" className={styles.knowledgeAll}>
            Browse all water knowledge <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      {/* ══ 9. ENGINEERING PRINCIPLES ═════════════════════════════════════ */}
      <section className={styles.engineering} aria-labelledby="engineering-heading">
        <div className={styles.engineeringInner}>
          <p className={styles.engineeringEyebrow}>Philosophy</p>
          <h2 id="engineering-heading" className={styles.engineeringHeading}>
            Built around the details.
          </h2>

          <div className={styles.engineeringList}>
            {ENGINEERING_PRINCIPLES.map((p, i) => (
              <div
                key={p.word}
                className={styles.engineeringItem}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className={styles.engineeringWord}>{p.word}</span>
                <span className={styles.engineeringSub}>{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. SUPPORT ═══════════════════════════════════════════════════ */}
      <section className={styles.support} aria-labelledby="support-heading">
        <div className={styles.supportInner}>
          <p className={styles.supportEyebrow}>Support</p>
          <h2 id="support-heading" className={styles.supportHeading}>
            Something not clear?
          </h2>

          <div className={styles.supportList}>
            {SUPPORT_OPTIONS.map(opt => (
              <Link key={opt.id} href={opt.href} className={styles.supportItem}>
                <div className={styles.supportItemContent}>
                  <span className={styles.supportItemLabel}>{opt.label}</span>
                  <span className={styles.supportItemDesc}>{opt.desc}</span>
                </div>
                <span className={styles.supportItemArrow}>
                  <ArrowRight size={16} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. FINAL CTA ════════════════════════════════════════════════ */}
      <section className={styles.finalCTA} aria-labelledby="cta-heading">
        <div className={styles.finalCTAInner}>
          <p className={styles.finalCTAEyebrow}>CLARYN</p>
          <h2 id="cta-heading" className={styles.finalCTAHeading}>
            Start with<br />your water.
          </h2>
          <p className={styles.finalCTATagline}>Water, understood.</p>
          <Link href="/find-your-solution" className={styles.finalCTABtn} id="final-cta">
            Find Your Water Solution
            <ArrowRight size={16} aria-hidden />
          </Link>
          <p className={styles.finalCTACompany}>By Udarta Watertech Private Limited</p>
        </div>
        {/* Ambient glow */}
        <div className={styles.finalCTAGlow} aria-hidden />
      </section>
    </>
  );
}
