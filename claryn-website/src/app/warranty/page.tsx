import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Truck,
  Check,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Warranty Policy & Claim Portal | CLARYN Products',
  description:
    'Understand CLARYN\'s standard manufacturer warranty on RO Booster Pumps for up to 6 months from the date of purchase, coverage specifications, exclusions, and claim process.',
};

export default function WarrantyPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero Section ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroGrid}>
            {/* Left: Headline & Primary CTAs */}
            <div>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/" className={styles.breadcrumbLink}>
                  Home
                </Link>
                <span className={styles.breadcrumbSep}>/</span>
                <span className={styles.breadcrumbCurrent}>Warranty Information</span>
              </nav>

              <div className={styles.badge}>
                <ShieldCheck size={14} />
                <span>Official Warranty Policy (Up to 6 Months)</span>
              </div>

              <h1 className={styles.title}>
                CLARYN Product Warranty &amp;{' '}
                <span className={styles.titleHighlight}>Claim Portal</span>
              </h1>

              <p className={styles.subtitle}>
                We stand firmly behind the precision engineering of every CLARYN RO Booster
                Pump with up to 6 months warranty coverage. Experience hassle-free protection with fast-track online
                claim settlement.
              </p>

              {/* Immediate Action Buttons right at top */}
              <div className={styles.heroActions}>
                <Link href="/warranty/claim" className={styles.btnPrimary}>
                  <span>File a Warranty Claim</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/register-product" className={styles.btnSecondary}>
                  <ShieldCheck size={18} />
                  <span>Register Your Product</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className={styles.heroTrustList}>
                <div className={styles.heroTrustItem}>
                  <CheckCircle2 size={16} className={styles.heroTrustIcon} />
                  <span>Up to 6 Months Standard Coverage</span>
                </div>
                <div className={styles.heroTrustItem}>
                  <CheckCircle2 size={16} className={styles.heroTrustIcon} />
                  <span>2–3 Business Days Turnaround</span>
                </div>
                <div className={styles.heroTrustItem}>
                  <CheckCircle2 size={16} className={styles.heroTrustIcon} />
                  <span>100% Genuine Replacement</span>
                </div>
              </div>
            </div>

            {/* Right: Fast-Track Action Card */}
            <div>
              <div className={styles.quickCard}>
                <div className={styles.quickCardHeader}>
                  <div className={styles.quickCardTitle}>
                    <Sparkles size={18} style={{ color: '#38BDF8' }} />
                    <span>Fast-Track Desk</span>
                  </div>
                  <span className={styles.quickStatusBadge}>
                    <span className={styles.statusDot} />
                    <span>Claims Active</span>
                  </span>
                </div>

                <p className={styles.quickCardBody}>
                  Experiencing high TDS, flow drop, or structural issues? Submit your details
                  online for priority technical review:
                </p>

                <div className={styles.quickStepList}>
                  <div className={styles.quickStepItem}>
                    <span className={styles.quickStepNum}>1</span>
                    <span>Keep your purchase invoice or Amazon / Flipkart order ID handy</span>
                  </div>
                  <div className={styles.quickStepItem}>
                    <span className={styles.quickStepNum}>2</span>
                    <span>Note down current raw water TDS and purified water TDS</span>
                  </div>
                  <div className={styles.quickStepItem}>
                    <span className={styles.quickStepNum}>3</span>
                    <span>Attach a quick photo of your RO membrane and purifier setup</span>
                  </div>
                </div>

                <div className={styles.quickCardBtnGroup}>
                  <Link href="/warranty/claim" className={styles.quickCardBtnPrimary}>
                    <span>Submit Claim Online</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/register-product" className={styles.quickCardBtnSecondary}>
                    <ShieldCheck size={16} />
                    <span>Register New Product First</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Key Highlights Floating Bar ───────────────────────────────── */}
      <div className="container">
        <div className={styles.highlightsBar}>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={`${styles.highlightIconWrap} ${styles.highlightIconBlue}`}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div className={styles.highlightTitle}>Up to 6-Month Warranty</div>
                <div className={styles.highlightDesc}>
                  Full protection against manufacturing defects for up to 6 months from the date of purchase on eligible products.
                </div>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={`${styles.highlightIconWrap} ${styles.highlightIconGreen}`}>
                <Clock size={22} />
              </div>
              <div>
                <div className={styles.highlightTitle}>48-Hour Assessment</div>
                <div className={styles.highlightDesc}>
                  Dedicated technical engineers review and approve claims within 2–3 business days.
                </div>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={`${styles.highlightIconWrap} ${styles.highlightIconTeal}`}>
                <Truck size={22} />
              </div>
              <div>
                <div className={styles.highlightTitle}>Doorstep Dispatch</div>
                <div className={styles.highlightDesc}>
                  Free doorstep delivery of verified replacement units across India.
                </div>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={`${styles.highlightIconWrap} ${styles.highlightIconOrange}`}>
                <HelpCircle size={22} />
              </div>
              <div>
                <div className={styles.highlightTitle}>Direct Assistance</div>
                <div className={styles.highlightDesc}>
                  Live WhatsApp and phone support for troubleshooting and installation help.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Content Container ─────────────────────────────────────── */}
      <div className={styles.sectionWrapper}>
        {/* Coverage Matrix: What Is Covered vs What Is Not Covered */}
        <section className={styles.coverageSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionCategory}>Warranty Terms</span>
            <h2 className={styles.sectionTitle}>What Is Covered vs. What Is Not</h2>
            <p className={styles.sectionDesc}>
              Clear, transparent terms with no hidden conditions. We guarantee dependable mechanical
              and electrical performance when our booster pumps are operated with compatible power adapters.
            </p>
          </div>

          <div className={styles.coverageGrid}>
            {/* What is Covered */}
            <div className={styles.coveredCard}>
              <div className={`${styles.cardTopBadge} ${styles.badgeSuccess}`}>
                <CheckCircle2 size={14} />
                <span>Full Warranty Coverage</span>
              </div>

              <h3 className={styles.coverageCardTitle}>What Is Covered</h3>
              <p className={styles.coverageCardSubtitle}>
                Eligible for free repair, replacement, or service credit within up to 6 months from the date of purchase:
              </p>

              <div className={styles.coverageList}>
                <div className={styles.coverageItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <div>
                    <div className={styles.itemHeading}>Motor &amp; Electrical Defects</div>
                    <div className={styles.itemDesc}>
                      Motor coil open circuit, failure to rotate under rated DC voltage, or internal wiring flaws.
                    </div>
                  </div>
                </div>

                <div className={styles.coverageItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <div>
                    <div className={styles.itemHeading}>Pressure Output Loss</div>
                    <div className={styles.itemDesc}>
                      Failure of pump diaphragm to generate specified working boost pressure (&gt;60–80 PSI) under normal feed.
                    </div>
                  </div>
                </div>

                <div className={styles.coverageItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <div>
                    <div className={styles.itemHeading}>Pump Head &amp; Diaphragm Leakage</div>
                    <div className={styles.itemDesc}>
                      External water leakage from pump head casing, diaphragm seal, or valve assembly under normal operating pressure.
                    </div>
                  </div>
                </div>

                <div className={styles.coverageItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <div>
                    <div className={styles.itemHeading}>Bearing &amp; Mechanical Noise</div>
                    <div className={styles.itemDesc}>
                      Abnormal grinding noise, internal bearing seizure, or excessive mechanical vibration upon installation.
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooterAction}>
                <Link href="/warranty/claim" className={styles.cardActionLink}>
                  <span>Have an issue covered above? File a Claim</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* What is Not Covered */}
            <div className={styles.notCoveredCard}>
              <div className={`${styles.cardTopBadge} ${styles.badgeWarning}`}>
                <AlertTriangle size={14} />
                <span>Exclusions &amp; Limitations</span>
              </div>

              <h3 className={styles.coverageCardTitle}>What Is Not Covered</h3>
              <p className={styles.coverageCardSubtitle}>
                Standard operational circumstances not classified as manufacturer defects:
              </p>

              <div className={styles.coverageList}>
                <div className={styles.coverageItem}>
                  <AlertTriangle size={18} className={styles.warningIcon} />
                  <div>
                    <div className={styles.itemHeading}>Consumable Filtration Media (Membranes &amp; Filters)</div>
                    <div className={styles.itemDesc}>
                      RO membranes, sediment cartridges, and carbon blocks are consumable filtration media and are not eligible for warranty claims.
                    </div>
                  </div>
                </div>

                <div className={styles.coverageItem}>
                  <AlertTriangle size={18} className={styles.warningIcon} />
                  <div>
                    <div className={styles.itemHeading}>Dry Running Without Water Supply</div>
                    <div className={styles.itemDesc}>
                      Pump operated without inlet water feed, causing diaphragm friction burn or thermal seizure.
                    </div>
                  </div>
                </div>

                <div className={styles.coverageItem}>
                  <AlertTriangle size={18} className={styles.warningIcon} />
                  <div>
                    <div className={styles.itemHeading}>Overvoltage &amp; Electrical Surges</div>
                    <div className={styles.itemDesc}>
                      Damage caused by faulty third-party power adapters (SMPS), incorrect voltage supply, or external lightning surges.
                    </div>
                  </div>
                </div>

                <div className={styles.coverageItem}>
                  <AlertTriangle size={18} className={styles.warningIcon} />
                  <div>
                    <div className={styles.itemHeading}>Tampering, Physical Impact &amp; Unofficial Sellers</div>
                    <div className={styles.itemDesc}>
                      Pump opened/repaired by third-party technicians, fractured casing, or units bought from unauthorized sellers.
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooterAction}>
                <Link href="/knowledge/faq" className={styles.cardActionLink}>
                  <span>Read our Maintenance &amp; Troubleshooting Guide</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. How to Make a Claim: 4 Steps with Action Buttons ─────────── */}
        <section className={styles.processSection}>
          <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
            <span className={styles.sectionCategory}>Simple 4-Step Process</span>
            <h2 className={styles.sectionTitle}>How to Make a Warranty Claim</h2>
            <p className={styles.sectionDesc}>
              Follow these simple steps to get your claim assessed and settled quickly.
            </p>
          </div>

          <div className={styles.processGrid}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>1</div>
                <span className={styles.stepTag}>Pre-Check</span>
              </div>
              <h3 className={styles.stepTitle}>Register Product</h3>
              <p className={styles.stepDesc}>
                If not already done, register your product online. Pre-registered membranes
                are fast-tracked for verification within 24 hours.
              </p>
              <Link href="/register-product" className={`${styles.stepBtn} ${styles.stepBtnOutline}`}>
                <span>Register Product</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Step 2 */}
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>2</div>
                <span className={styles.stepTag}>Diagnose</span>
              </div>
              <h3 className={styles.stepTitle}>Measure TDS</h3>
              <p className={styles.stepDesc}>
                Check both raw inlet tap water TDS and output pure water TDS. Also review pre-filters
                to ensure water flow isn&apos;t choked.
              </p>
              <Link href="/knowledge/faq" className={`${styles.stepBtn} ${styles.stepBtnOutline}`}>
                <span>Quick Diagnostic FAQ</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Step 3 - Highlighted */}
            <div className={`${styles.stepCard} ${styles.stepCardActive}`}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>3</div>
                <span className={styles.stepTag} style={{ background: '#0077C8', color: '#fff' }}>
                  Online Form
                </span>
              </div>
              <h3 className={styles.stepTitle}>Submit Claim</h3>
              <p className={styles.stepDesc}>
                Fill our 2-minute online form with your contact details, product model, invoice,
                and brief issue description.
              </p>
              <Link href="/warranty/claim" className={`${styles.stepBtn} ${styles.stepBtnPrimary}`}>
                <span>Launch Claim Form</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Step 4 */}
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>4</div>
                <span className={styles.stepTag}>Resolution</span>
              </div>
              <h3 className={styles.stepTitle}>Doorstep Dispatch</h3>
              <p className={styles.stepDesc}>
                Our technical team evaluates your claim within 2–3 business days. Approved
                claims receive a brand-new replacement via courier.
              </p>
              <a
                href="https://wa.me/919274841287?text=Hi%20CLARYN%2C%20I%20have%20a%20query%20about%20my%20warranty%20claim"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.stepBtn} ${styles.stepBtnOutline}`}
              >
                <MessageCircle size={15} />
                <span>Track on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 5. Eligibility Checklist ────────────────────────────────────── */}
        <section className={styles.eligibilitySection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionCategory}>Requirements</span>
            <h2 className={styles.sectionTitle}>Eligibility Checklist</h2>
            <p className={styles.sectionDesc}>
              To qualify for warranty service, please ensure your claim satisfies the following:
            </p>
          </div>

          <div className={styles.checklistGrid}>
            <div className={styles.checklistItem}>
              <div className={styles.checklistIconWrap}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className={styles.checklistTitle}>Authorized Purchase Channel</h4>
                <p className={styles.checklistText}>
                  Purchased directly from CLARYN official store, Amazon India, Flipkart, or an
                  authorized local water-solution distributor.
                </p>
              </div>
            </div>

            <div className={styles.checklistItem}>
              <div className={styles.checklistIconWrap}>
                <FileText size={20} />
              </div>
              <div>
                <h4 className={styles.checklistTitle}>Proof of Purchase</h4>
                <p className={styles.checklistText}>
                  Original GST tax invoice, retail cash memo, or electronic order receipt with a
                  clear purchase date and product description.
                </p>
              </div>
            </div>

            <div className={styles.checklistItem}>
              <div className={styles.checklistIconWrap}>
                <Clock size={20} />
              </div>
              <div>
                <h4 className={styles.checklistTitle}>Within Warranty Period (Up to 6 Months)</h4>
                <p className={styles.checklistText}>
                  The warranty claim must be initiated within up to 6 months (180 calendar days) from the invoice
                  issue date on eligible products.
                </p>
              </div>
            </div>

            <div className={styles.checklistItem}>
              <div className={styles.checklistIconWrap}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className={styles.checklistTitle}>Standard Operating Usage</h4>
                <p className={styles.checklistText}>
                  Membrane operated within specified feed water limits (TDS &le; rated capacity,
                  water pressure 60–100 PSI, ambient water temp 5&deg;C–45&deg;C).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Direct Support Channels ──────────────────────────────────── */}
        <section className={styles.supportSection}>
          <div className={styles.supportHeader}>
            <div>
              <h3 className={styles.supportTitle}>Need Immediate Technical Assistance?</h3>
              <p className={styles.supportSubtitle}>
                Our certified water specialists in Surat, Gujarat are ready to assist you.
              </p>
            </div>
            <Link href="/warranty/claim" className={styles.btnPrimary} style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
              <span>Submit Online Claim</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.supportCardsGrid}>
            <a
              href="https://wa.me/919274841287?text=Hi%20CLARYN%20Support%2C%20I%20need%20help%20with%20my%20membrane%20warranty"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportCard}
            >
              <div className={`${styles.supportCardIcon} ${styles.whatsappIcon}`}>
                <MessageCircle size={22} />
              </div>
              <div>
                <div className={styles.supportCardLabel}>WhatsApp Chat</div>
                <div className={styles.supportCardValue}>+91 92748 41287</div>
              </div>
            </a>

            <a href="tel:+919274841287" className={styles.supportCard}>
              <div className={`${styles.supportCardIcon} ${styles.phoneIcon}`}>
                <Phone size={22} />
              </div>
              <div>
                <div className={styles.supportCardLabel}>Helpline Phone</div>
                <div className={styles.supportCardValue}>+91 92748 41287</div>
              </div>
            </a>

            <a href="mailto:udartawatertech@gmail.com" className={styles.supportCard}>
              <div className={`${styles.supportCardIcon} ${styles.emailIcon}`}>
                <Mail size={22} />
              </div>
              <div>
                <div className={styles.supportCardLabel}>Support Email</div>
                <div className={styles.supportCardValue}>udartawatertech@gmail.com</div>
              </div>
            </a>
          </div>
        </section>

        {/* ── 7. Prominent Bottom CTA ─────────────────────────────────────── */}
        <div className={styles.bottomCta}>
          <h2 className={styles.bottomCtaTitle}>Ready to Resolve Your Issue?</h2>
          <p className={styles.bottomCtaText}>
            Submitting a claim takes under 2 minutes. Our dedicated warranty team will assess
            your data and coordinate a swift solution within 2–3 business days.
          </p>
          <div className={styles.bottomCtaActions}>
            <Link href="/warranty/claim" className={styles.btnPrimary}>
              <span>Submit a Warranty Claim</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/register-product" className={styles.btnSecondary}>
              <ShieldCheck size={18} />
              <span>Register Product</span>
            </Link>
          </div>
        </div>

        {/* ── 8. Legal Disclaimer ─────────────────────────────────────────── */}
        <div className={styles.legalCallout}>
          <AlertTriangle size={20} className={styles.legalIcon} />
          <div>
            <strong>Legal Warranty Policy:</strong> The above terms represent standard manufacturer
            warranty terms for CLARYN RO Booster Pumps manufactured and distributed by Udarta Watertech
            Private Limited. Consumable filtration items (RO membranes, sediment cartridges, carbon filters)
            are consumable wear items and do not carry warranty claim coverage. Proof of purchase and
            verification of operational parameters are mandatory for all warranty settlements.
          </div>
        </div>
      </div>
    </div>
  );
}
