import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { knowledgeArticles } from '@/data/knowledge-articles';
import {
  ArrowRight, ArrowUpRight, ChevronRight,
  Droplets, ShieldCheck, Zap, CheckCircle, Award,
  FlaskConical, Cpu, Building2, BookOpen, Clock,
  Wrench, Phone, Star
} from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'CLARYN — Better Water Starts With Understanding It | Water Solutions & Technology',
  description: 'CLARYN by Udarta Watertech — India\'s modern water technology company. Premium RO membranes, water purification systems, installation support, and water knowledge for homes and businesses.',
  alternates: { canonical: '/' },
};

const activeProducts = products.filter(p => p.status === 'active');
const featuredArticles = knowledgeArticles.filter(a => a.isPublished).slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ══ 2. WATER AWARENESS ═══════════════════════════════════════════════ */}
      <section className={styles.awareness} id="water-awareness">
        <div className={styles.awarenessContainer}>
          <div className={styles.awarenessLeft}>
            <span className={styles.sectionLabel}>The Reality</span>
            <h2 className={styles.awarenessHeading}>
              The water coming into your home isn&apos;t always what you think it is.
            </h2>
            <p className={styles.awarenessBody}>
              Water quality varies by source, location, infrastructure, and season.
              Understanding the water you actually have is the first step toward
              choosing the right solution for your home.
            </p>
            <Link href="/learn" className={styles.awarenessLink}>
              Explore Water Knowledge <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>

          <div className={styles.awarenessStats}>
            {[
              { n: '600M+', d: 'Indians lack access to safe drinking water close to home', src: 'NITI Aayog' },
              { n: '70%',   d: 'of India\'s water sources carry contamination', src: 'CPCB' },
              { n: '200M+', d: 'people drink groundwater with harmful dissolved content', src: 'WHO / CGWB' },
              { n: '1000+', d: 'ppm TDS commonly found in Indian borewell water', src: 'CGWB' },
            ].map(({ n, d, src }) => (
              <div key={n} className={styles.awarenessStat}>
                <span className={styles.awarenessStatNum}>{n}</span>
                <p className={styles.awarenessStatDesc}>{d}</p>
                <p className={styles.awarenessStatSrc}>{src}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. WATER SOURCE EXPLORER ══════════════════════════════════════════ */}
      <section className={styles.sourceExplorer}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Your Water Source</span>
            <h2 className={styles.sectionTitle}>Water is not the same everywhere.</h2>
            <p className={styles.sectionSubtitle}>
              Where your water comes from determines what it contains — and what you need to do about it.
            </p>
          </div>

          <div className={styles.sourceCards}>
            {[
              {
                id: 'borewell',
                name: 'Borewell',
                sub: 'Groundwater / Tubewell',
                desc: 'Groundwater typically carries higher TDS, dissolved minerals, and hardness that varies by geology and depth. High fluoride, arsenic, and iron are common in certain regions.',
                facts: ['Often high TDS (500–2000+ ppm)', 'Regional mineral variation', 'Seasonal quality changes', 'Hardness common'],
                cta: 'Understand borewell water',
                href: '/learn/tds-hard-water/what-is-tds-in-water',
                accent: '#0077C8',
              },
              {
                id: 'municipal',
                name: 'Municipal',
                sub: 'Corporation / Piped Supply',
                desc: 'Municipal water passes through treatment plants, but quality varies significantly by city, infrastructure age, and proximity to the source. Pipe condition often affects what reaches your tap.',
                facts: ['Treatment quality varies by city', 'Chlorine & disinfection byproducts', 'Pipe infrastructure affects quality', 'Seasonal variation possible'],
                cta: 'Understand municipal water',
                href: '/learn/tds-hard-water/what-is-tds-in-water',
                accent: '#00B4A6',
              },
              {
                id: 'other',
                name: 'Other / Unknown',
                sub: 'Tanker / Mixed / Unsure',
                desc: 'Tanker water, mixed sources, or unknown supply? The best first step is to test your water. A TDS meter gives you an immediate baseline reading.',
                facts: ['Testing is always the first step', 'TDS meter gives quick baseline', 'Source matters for solution choice', 'CLARYN can help you understand'],
                cta: 'Start with a water test',
                href: '/learn/tds-hard-water/what-is-tds-in-water',
                accent: '#7AC943',
              },
            ].map(source => (
              <div key={source.id} className={styles.sourceCard}>
                <div className={styles.sourceCardTop} style={{ '--accent': source.accent } as React.CSSProperties}>
                  {/* Decorative technical visual */}
                  <div className={styles.sourceCardVisual}>
                    <div className={styles.sourceCardOrb} />
                    <span className={styles.sourceCardName}>{source.name}</span>
                    <span className={styles.sourceCardSub}>{source.sub}</span>
                  </div>
                </div>
                <div className={styles.sourceCardBody}>
                  <p className={styles.sourceCardDesc}>{source.desc}</p>
                  <ul className={styles.sourceCardFacts}>
                    {source.facts.map(f => (
                      <li key={f} className={styles.sourceCardFact}>
                        <span className={styles.sourceCardFactDot} style={{ background: source.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={source.href} className={styles.sourceCardCTA} style={{ color: source.accent }}>
                    {source.cta} <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. WATER JOURNEY ══════════════════════════════════════════════════ */}
      <section className={styles.journey}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>One Brand. The Whole Journey.</span>
            <h2 className={styles.sectionTitle}>Water doesn&apos;t stop at filtration.</h2>
            <p className={styles.sectionSubtitle}>
              CLARYN is building a connected ecosystem around water — from understanding your water quality
              to choosing the right technology, maintaining it, and getting ongoing support.
            </p>
          </div>

          <div className={styles.journeyTrack}>
            {[
              {
                num: '01',
                stage: 'Understand',
                heading: 'Know Your Water',
                desc: 'Water quality testing, TDS education, source analysis, and knowledge resources to help you make informed decisions.',
                links: [{ label: 'Water Knowledge Hub', href: '/learn' }, { label: 'What is TDS?', href: '/learn/tds-hard-water/what-is-tds-in-water' }],
                status: 'Live',
                icon: FlaskConical,
              },
              {
                num: '02',
                stage: 'Choose',
                heading: 'Find the Right Solution',
                desc: 'RO membranes, filtration systems, booster pumps, and water purifiers — matched to your water type and needs.',
                links: [{ label: 'Browse Products', href: '/products' }, { label: 'Solution Finder', href: '/find-your-solution' }],
                status: 'Membranes Live',
                icon: Droplets,
              },
              {
                num: '03',
                stage: 'Install',
                heading: 'Get It Working',
                desc: 'Step-by-step installation guides, setup instructions, compatibility checks, and troubleshooting — built for India.',
                links: [{ label: 'Installation Guides', href: '/installation' }],
                status: 'Live',
                icon: Wrench,
              },
              {
                num: '04',
                stage: 'Maintain',
                heading: 'Keep It Performing',
                desc: 'Product registration, warranty support, maintenance schedules, and a support team that actually responds.',
                links: [{ label: 'Register Product', href: '/register-product' }, { label: 'Warranty', href: '/warranty' }],
                status: 'Live',
                icon: ShieldCheck,
              },
              {
                num: '05',
                stage: 'Evolve',
                heading: 'Smarter Water',
                desc: 'IoT monitoring, smart purifiers, data-driven maintenance alerts, and connected water management — the CLARYN future.',
                links: [{ label: 'Coming Soon', href: '#' }],
                status: 'Coming Soon',
                icon: Cpu,
              },
            ].map((step, i) => (
              <div key={step.num} className={`${styles.journeyStep} ${step.status === 'Coming Soon' ? styles.journeyStepSoon : ''}`}>
                {/* Connector line */}
                {i < 4 && <div className={styles.journeyConnector} aria-hidden />}

                <div className={styles.journeyStepTop}>
                  <div className={styles.journeyStepIcon}>
                    <step.icon size={18} aria-hidden />
                  </div>
                  <div className={styles.journeyStepMeta}>
                    <span className={styles.journeyStepNum}>{step.num}</span>
                    <span className={`badge ${step.status === 'Live' || step.status === 'Membranes Live' ? 'badge--live' : 'badge--coming'}`}>
                      {step.status}
                    </span>
                  </div>
                </div>

                <h3 className={styles.journeyStepStage}>{step.stage}</h3>
                <p className={styles.journeyStepHeading}>{step.heading}</p>
                <p className={styles.journeyStepDesc}>{step.desc}</p>

                <div className={styles.journeyStepLinks}>
                  {step.links.map(link => (
                    <Link key={link.label} href={link.href} className={styles.journeyStepLink}>
                      {link.label} <ChevronRight size={12} aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. FEATURED PRODUCTS ══════════════════════════════════════════════ */}
      <section className={styles.products}>
        <div className="container">
          <div className={styles.productsHeader}>
            <div>
              <span className={styles.sectionLabel}>Technology You Can Use Today</span>
              <h2 className={styles.sectionTitle}>CLARYN Products</h2>
              <p className={styles.sectionSubtitle}>
                Our first products — precision-engineered RO membranes for Indian water conditions,
                with more solutions being developed across the CLARYN ecosystem.
              </p>
            </div>
            <Link href="/products" className="btn btn--outline">
              All Products <ArrowRight size={15} aria-hidden />
            </Link>
          </div>

          <div className={styles.productCards}>
            {activeProducts.map(product => {
              const primaryLink = product.marketplaceLinks.find(m => m.isActive && m.availability === 'in_stock');
              return (
                <article key={product.id} className={styles.productCard}>
                  {/* Visual area */}
                  <div className={styles.productCardVisual}>
                    <div className={styles.productCardVisualInner}>
                      <span className={styles.productCardCategory}>RO Membrane</span>
                      <div className={styles.productCardStat}>
                        <span className={styles.productCardStatNum}>{product.specs.gpd}</span>
                        <span className={styles.productCardStatUnit}>GPD</span>
                      </div>
                      <div className={styles.productCardVisualMeta}>
                        <span>{product.specs.membraneLayers}-Layer TFC</span>
                        <span>•</span>
                        <span>{product.specs.membraneMaterial?.split(' ')[0]}</span>
                      </div>
                    </div>
                    {/* Decorative lines */}
                    <div className={styles.productCardLines} aria-hidden>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={styles.productCardLine}
                          style={{ top: `${18 + i * 16}%`, animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                    <span className="badge badge--live" style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)' }}>
                      In Stock
                    </span>
                  </div>

                  {/* Content */}
                  <div className={styles.productCardContent}>
                    <div>
                      <p className={styles.productCardModel}>{product.model}</p>
                      <h3 className={styles.productCardName}>{product.name}</h3>
                      <p className={styles.productCardDesc}>{product.shortDescription}</p>
                    </div>

                    {/* Tech specs */}
                    <div className={styles.productCardSpecs}>
                      {[
                        { val: `${product.specs.saltRejectionPercent}%`, lbl: 'Salt Rejection', verified: true },
                        { val: `${product.specs.maxTDS} ppm`, lbl: 'Max Feed TDS', verified: true },
                        { val: product.specs.warrantyPeriod, lbl: 'Warranty', verified: true },
                        { val: product.specs.operatingPressure ?? 'To be confirmed', lbl: 'Pressure', verified: !!product.specs.operatingPressure },
                      ].map(({ val, lbl, verified }) => (
                        <div key={lbl} className={styles.productCardSpec}>
                          <span className={`${styles.productCardSpecVal} ${!verified ? styles.productCardSpecUnverified : ''}`}>{val}</span>
                          <span className={styles.productCardSpecLbl}>{lbl}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.productCardActions}>
                      <Link href={`/products/${product.slug}`} className="btn btn--primary">
                        View Product
                      </Link>
                      {primaryLink && (
                        <a href={primaryLink.url} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                          {primaryLink.ctaLabel} <ArrowUpRight size={13} aria-hidden />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 6. ENGINEERING STORY (dark) ════════════════════════════════════════ */}
      <section className={styles.engineering}>
        <div className="container">
          <div className={styles.engineeringLayout}>
            <div className={styles.engineeringText}>
              <span className={styles.sectionLabelLight}>The Technology</span>
              <h2 className={styles.engineeringHeading}>Behind every drop is engineering.</h2>
              <p className={styles.engineeringDesc}>
                A CLARYN RO membrane isn&apos;t simply a filter. It is a precision-engineered
                component — built in multiple bonded layers — each contributing to consistent,
                high-performance water purification.
              </p>
              <p className={styles.engineeringDesc}>
                Our 5-layer Thin Film Composite (TFC) Polyamide construction delivers
                verified salt rejection performance across the full range of Indian water conditions.
              </p>
              <Link href="/products" className={styles.engineeringCTA}>
                Explore our technology <ArrowRight size={15} aria-hidden />
              </Link>
            </div>

            {/* CSS Membrane cross-section */}
            <div className={styles.membraneDiagram} aria-label="5-layer RO membrane cross-section diagram">
              <div className={styles.membraneDiagramLabel}>5-Layer TFC Membrane — Cross Section</div>
              <div className={styles.membraneFlow} aria-hidden>
                <div className={styles.membraneFlowArrow}>
                  <Droplets size={14} />
                  <span>Feed Water</span>
                </div>
                <div className={styles.membraneFlowArrow} style={{ marginTop: 'auto' }}>
                  <Droplets size={14} />
                  <span>Purified Output</span>
                </div>
              </div>
              <div className={styles.membraneLayers}>
                {[
                  { num: '01', name: 'Polyester Non-Woven Support', role: 'Mechanical substrate providing structural base and dimensional stability.', color: '#1a3a5c' },
                  { num: '02', name: 'Microporous Polysulfone', role: 'Intermediate support layer enabling precise pore structure control.', color: '#1e4d7a' },
                  { num: '03', name: 'Ultra-Thin Polyamide Film', role: 'Active rejection layer — responsible for salt and contaminant removal.', color: '#0077C8', highlight: true },
                  { num: '04', name: 'Protective Coating', role: 'Guards the active layer from physical damage and chlorine exposure.', color: '#1e4d7a' },
                  { num: '05', name: 'Flow-Control Backing', role: 'Manages permeate flow direction and membrane integrity.', color: '#1a3a5c' },
                ].map(layer => (
                  <div key={layer.num} className={`${styles.membraneLayer} ${layer.highlight ? styles.membraneLayerActive : ''}`}
                    style={{ '--layer-color': layer.color } as React.CSSProperties}>
                    <div className={styles.membraneLayerBar} />
                    <div className={styles.membraneLayerInfo}>
                      <span className={styles.membraneLayerNum}>{layer.num}</span>
                      <div>
                        <p className={styles.membraneLayerName}>{layer.name}</p>
                        <p className={styles.membraneLayerRole}>{layer.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.membraneDiagramNote}>
                Diagram is representative. Layer specifications are confirmed from product technical data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. KNOWLEDGE HUB ══════════════════════════════════════════════════ */}
      <section className={styles.knowledge}>
        <div className="container">
          <div className={styles.knowledgeHeader}>
            <div>
              <span className={styles.sectionLabel}>Water Knowledge</span>
              <h2 className={styles.sectionTitleLeft}>Understand<br />Your Water.</h2>
              <p className={styles.sectionSubtitleLeft}>
                Good water decisions start with good information. Evidence-based guides
                written for real Indian water conditions.
              </p>
            </div>
            <Link href="/learn" className="btn btn--outline">
              All Articles <ArrowRight size={15} aria-hidden />
            </Link>
          </div>

          {featuredArticles.length > 0 && (
            <div className={styles.knowledgeGrid}>
              {/* Featured large article */}
              <Link href={`/learn/${featuredArticles[0].category}/${featuredArticles[0].slug}`}
                className={styles.knowledgeFeatured}>
                <div className={styles.knowledgeFeaturedVisual}>
                  <div className={styles.knowledgeFeaturedTag}>
                    {featuredArticles[0].category.replace(/-/g, ' ')}
                  </div>
                </div>
                <div className={styles.knowledgeFeaturedContent}>
                  <div className={styles.knowledgeMeta}>
                    <span className={styles.knowledgeCategory}>{featuredArticles[0].category.replace(/-/g, ' ')}</span>
                    <span className={styles.knowledgeReadTime}><Clock size={11} aria-hidden />{featuredArticles[0].readTimeMinutes} min read</span>
                  </div>
                  <h3 className={styles.knowledgeFeaturedTitle}>{featuredArticles[0].title}</h3>
                  <p className={styles.knowledgeFeaturedSummary}>{featuredArticles[0].summary}</p>
                  <span className={styles.knowledgeReadMore}>
                    <BookOpen size={13} aria-hidden /> Read Article <ArrowRight size={13} aria-hidden />
                  </span>
                </div>
              </Link>

              {/* Secondary articles */}
              <div className={styles.knowledgeSidebar}>
                {featuredArticles.slice(1).map(article => (
                  <Link key={article.id}
                    href={`/learn/${article.category}/${article.slug}`}
                    className={styles.knowledgeCard}>
                    <div className={styles.knowledgeMeta}>
                      <span className={styles.knowledgeCategory}>{article.category.replace(/-/g, ' ')}</span>
                      <span className={styles.knowledgeReadTime}><Clock size={11} aria-hidden />{article.readTimeMinutes} min</span>
                    </div>
                    <h3 className={styles.knowledgeCardTitle}>{article.title}</h3>
                    <p className={styles.knowledgeCardSummary}>{article.summary}</p>
                    <span className={styles.knowledgeReadMore}>Read <ArrowRight size={12} aria-hidden /></span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ 8. SOLUTION FINDER ═══════════════════════════════════════════════ */}
      <section className={styles.solutionFinder}>
        <div className="container">
          <div className={styles.solutionFinderLayout}>
            <div className={styles.solutionFinderText}>
              <span className={styles.sectionLabel}>Personalised Guidance</span>
              <h2 className={styles.sectionTitleLeft}>Not sure what your water needs?</h2>
              <p className={styles.sectionSubtitleLeft}>
                Answer a few simple questions and we&apos;ll help you explore the right
                CLARYN solution — without any pressure to buy.
              </p>
              <p className={styles.solutionFinderDisclaimer}>
                This is an initial guide based on your inputs. Always confirm with an appropriate water test
                before making technical decisions.
              </p>
            </div>

            <div className={styles.solutionFinderCard}>
              {[
                {
                  q: '01', question: 'What\'s your water source?',
                  opts: ['Borewell / Groundwater', 'Municipal / Tap', 'Not Sure'],
                },
                {
                  q: '02', question: 'Do you know your TDS level?',
                  opts: ['Yes — it\'s high (>500 ppm)', 'Yes — it\'s moderate', 'No — I haven\'t tested'],
                },
                {
                  q: '03', question: 'What are you trying to solve?',
                  opts: ['Overall water quality', 'Membrane replacement', 'Hard / salty water', 'Not sure yet'],
                },
              ].map(({ q, question, opts }) => (
                <div key={q} className={styles.solutionQ}>
                  <p className={styles.solutionQNum}>{q}</p>
                  <p className={styles.solutionQText}>{question}</p>
                  <div className={styles.solutionQOpts}>
                    {opts.map(opt => (
                      <span key={opt} className={styles.solutionQOpt}>{opt}</span>
                    ))}
                  </div>
                </div>
              ))}

              <Link href="/find-your-solution" className={styles.solutionCTA}>
                Find My Water Solution
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. SUPPORT ECOSYSTEM ════════════════════════════════════════════ */}
      <section className={styles.support}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>After the Purchase</span>
            <h2 className={styles.sectionTitle}>We&apos;re here after the purchase, too.</h2>
            <p className={styles.sectionSubtitle}>
              CLARYN doesn&apos;t disappear when the order ships. Installation, warranty, support, and maintenance guidance — all included.
            </p>
          </div>

          <div className={styles.supportCards}>
            {[
              { icon: Wrench,      title: 'Install',     desc: 'Step-by-step installation guides with photos and compatibility checks for every major Indian RO brand.', href: '/installation',    cta: 'View Guides' },
              { icon: Star,        title: 'Register',    desc: 'Register your CLARYN product to activate your warranty, receive maintenance reminders, and keep product records.', href: '/register-product', cta: 'Register Now' },
              { icon: ShieldCheck, title: 'Warranty',    desc: '12-month manufacturer warranty on all CLARYN products. Understand your coverage and initiate a claim online.', href: '/warranty',        cta: 'View Warranty' },
              { icon: Phone,       title: 'Support',     desc: 'Troubleshooting, water quality Q&A, and a support team that actually responds to real product questions.', href: '/support',         cta: 'Get Support' },
            ].map(({ icon: Icon, title, desc, href, cta }) => (
              <Link key={title} href={href} className={styles.supportCard}>
                <div className={styles.supportCardIcon}><Icon size={22} aria-hidden /></div>
                <h3 className={styles.supportCardTitle}>{title}</h3>
                <p className={styles.supportCardDesc}>{desc}</p>
                <span className={styles.supportCardCTA}>{cta} <ChevronRight size={13} aria-hidden /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. BRAND STORY ════════════════════════════════════════════════════ */}
      <section className={styles.brand}>
        <div className="container">
          <div className={styles.brandLayout}>
            <div className={styles.brandLeft}>
              <div className={styles.brandCard}>
                <p className={styles.brandCardEyebrow}>A brand by</p>
                <p className={styles.brandCardName}>Udarta Watertech</p>
                <p className={styles.brandCardSub}>Private Limited</p>
                <div className={styles.brandCardDivider} />
                <p className={styles.brandCardMission}>
                  &ldquo;If it improves water, it belongs to CLARYN.&rdquo;
                </p>
                <div className={styles.brandCardLinks}>
                  <Link href="/about" className="btn btn--outline btn--sm">Our Story</Link>
                  <Link href="/company" className="btn btn--ghost btn--sm">The Company</Link>
                </div>
              </div>
            </div>

            <div className={styles.brandRight}>
              <span className={styles.sectionLabel}>Our Purpose</span>
              <h2 className={styles.brandHeading}>Building a better relationship with water.</h2>
              <p className={styles.brandDesc}>
                Millions of Indian families drink water that passes through an aging or
                neglected purifier every day — and don&apos;t know it&apos;s not working as it should.
                CLARYN was built to change that.
              </p>
              <p className={styles.brandDesc}>
                Our ambition is simple: make water technology more understandable, more
                accessible, and more useful. Not just a product — a complete relationship
                with the water you use.
              </p>

              {/* Brand journey visual */}
              <div className={styles.brandJourney}>
                {['Products', 'Technology', 'Knowledge', 'Service', 'Smarter Water'].map((step, i, arr) => (
                  <div key={step} className={styles.brandJourneyItem}>
                    <span className={styles.brandJourneyStep}>{step}</span>
                    {i < arr.length - 1 && (
                      <ChevronRight size={14} className={styles.brandJourneyArrow} aria-hidden />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11. FUTURE TECHNOLOGY ════════════════════════════════════════════ */}
      <section className={styles.future}>
        <div className="container">
          <div className={styles.futureLayout}>
            <div className={styles.futureText}>
              <span className={styles.sectionLabelLight}>What&apos;s Coming</span>
              <h2 className={styles.futureHeading}>The future of water is getting smarter.</h2>
              <p className={styles.futureDesc}>
                CLARYN is building toward a connected water ecosystem — where products,
                sensors, and software work together to help you understand and manage
                your water automatically.
              </p>
              <span className={styles.futureBadge}>Future CLARYN Technologies</span>
            </div>

            <div className={styles.futureCards}>
              {[
                { icon: Cpu,        title: 'Smart Monitoring',    desc: 'Real-time TDS and flow monitoring for connected purifiers.', badge: 'Coming Soon' },
                { icon: FlaskConical,title: 'Water Testing Kits', desc: 'Simple at-home water quality testing for TDS, hardness, pH, and more.', badge: 'Coming Soon' },
                { icon: Building2,  title: 'Commercial Systems',  desc: 'Larger-scale RO and filtration solutions for offices and small businesses.', badge: 'Coming Soon' },
                { icon: Zap,        title: 'Booster Pumps',       desc: 'Pressure management solutions for consistent RO performance.', badge: 'Coming Soon' },
              ].map(({ icon: Icon, title, desc, badge }) => (
                <div key={title} className={styles.futureCard}>
                  <div className={styles.futureCardIcon}><Icon size={18} aria-hidden /></div>
                  <div className={styles.futureCardContent}>
                    <p className={styles.futureCardTitle}>{title}</p>
                    <p className={styles.futureCardDesc}>{desc}</p>
                  </div>
                  <span className={styles.futureCardBadge}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 12. FINAL CTA ════════════════════════════════════════════════════ */}
      <section className={styles.finalCTA}>
        <div className="container">
          <div className={styles.finalCTAInner}>
            <div className={styles.finalCTAText}>
              <h2 className={styles.finalCTAHeading}>Start with your water.</h2>
              <p className={styles.finalCTADesc}>
                Whether you&apos;re looking for a product, trying to understand your water quality,
                or need support for an existing system — CLARYN is here to help.
              </p>
            </div>
            <div className={styles.finalCTAActions}>
              <Link href="/find-your-solution" className="btn btn--primary btn--lg">
                Find My Water Solution <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/products" className="btn btn--outline-white btn--lg">
                Explore Products
              </Link>
              <Link href="/contact" className={styles.finalCTATertiary}>
                Talk to CLARYN <ChevronRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.finalCTAGlow1} aria-hidden />
        <div className={styles.finalCTAGlow2} aria-hidden />
      </section>
    </>
  );
}
