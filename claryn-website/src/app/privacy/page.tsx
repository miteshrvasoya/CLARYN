import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | CLARYN by Udarta Watertech',
  description: 'CLARYN\'s Privacy Policy — how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <h1 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)' }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>Last updated: [DATE TO BE PROVIDED] · Udarta Watertech Private Limited</p>
        </div>
      </div>
      <section className="section">
        <div className="container container--narrow">
          <div className="article-body">
            <p style={{ padding: 'var(--space-4) var(--space-5)', background: 'rgba(255,138,0,0.08)', border: '1px solid rgba(255,138,0,0.25)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', marginBottom: 'var(--space-8)', lineHeight: 1.7 }}>
              <strong>Important:</strong> The following privacy policy is a preliminary draft. A legally-reviewed, complete Privacy Policy compliant with Indian data protection law (DPDP Act 2023) and applicable international regulations will be published here before any public launch or data collection commences. This draft is for structural purposes only.
            </p>

            <h2>1. Who We Are</h2>
            <p>This website (claryn.in) is operated by <strong>Udarta Watertech Private Limited</strong>, the owner of the CLARYN brand. References to &quot;CLARYN&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; refer to Udarta Watertech Private Limited.</p>
            <p><strong>Registered address:</strong> [ADDRESS TO BE PROVIDED]<br /><strong>Contact:</strong> [EMAIL TO BE PROVIDED]</p>

            <h2>2. What Data We Collect</h2>
            <p>We collect the following categories of personal data:</p>
            <ul>
              <li><strong>Product Registration:</strong> Name, mobile number, email address, product details, purchase information, pincode, water source (optional), and installation notes (optional).</li>
              <li><strong>Warranty Claims:</strong> Contact details, product information, purchase details, and issue description.</li>
              <li><strong>Contact Form:</strong> Name, email, phone number (optional), and message content.</li>
              <li><strong>Website Analytics:</strong> Anonymised usage data including page views, referring URLs, and device information. No personally identifiable information is collected through analytics unless you explicitly provide it.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li>Processing product registrations and activating product warranties</li>
              <li>Reviewing and responding to warranty claims and support requests</li>
              <li>Sending maintenance reminders and product updates (only where you have provided explicit, unchecked consent)</li>
              <li>Improving our products and services through analysis of aggregated, anonymised usage patterns</li>
            </ul>
            <p>We do not use your data for automated profiling, behavioural advertising, or any purpose not listed above without your explicit consent.</p>

            <h2>4. Marketing Communications</h2>
            <p>We will only send marketing communications (product updates, maintenance reminders, promotional content) where you have <strong>explicitly opted in</strong> by checking an unchecked consent checkbox. We do not pre-check marketing consent. You can withdraw consent at any time using the unsubscribe link in any communication, or by contacting us.</p>

            <h2>5. Data Sharing</h2>
            <p>We do not sell your personal data. We may share data with:</p>
            <ul>
              <li>Service providers who assist us in operating the website or processing data (subject to data processing agreements)</li>
              <li>Legal and regulatory authorities where required by applicable law</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>Product registration and warranty data is retained for the duration of the warranty period plus [PERIOD TO BE DETERMINED] years. Contact form data is retained for up to [PERIOD] months unless required for ongoing support. You may request deletion of your data at any time (subject to legal retention requirements).</p>

            <h2>7. Your Rights</h2>
            <p>Under applicable Indian data protection law (DPDP Act 2023) and where applicable, GDPR, you have the right to: access your data; correct inaccurate data; request deletion; withdraw consent; and lodge a complaint with the Data Protection Board of India. To exercise these rights, contact [EMAIL TO BE PROVIDED].</p>

            <h2>8. Cookies</h2>
            <p>[Cookie policy to be determined and added here before launch.]</p>

            <h2>9. Changes to This Policy</h2>
            <p>We may update this policy periodically. Significant changes will be communicated by updating the &quot;Last updated&quot; date at the top of this page.</p>

            <h2>10. Contact</h2>
            <p>For any privacy-related queries, contact: [EMAIL TO BE PROVIDED]</p>
          </div>
        </div>
      </section>
    </>
  );
}
