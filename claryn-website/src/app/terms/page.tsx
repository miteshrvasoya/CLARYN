import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | CLARYN by Udarta Watertech',
  description: 'Terms of Use for the CLARYN website and products.',
};

export default function TermsPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <h1 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)' }}>Terms of Use</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>Last updated: [DATE TO BE PROVIDED] · Udarta Watertech Private Limited</p>
        </div>
      </div>
      <section className="section">
        <div className="container container--narrow">
          <div className="article-body">
            <p style={{ padding: 'var(--space-4) var(--space-5)', background: 'rgba(255,138,0,0.08)', border: '1px solid rgba(255,138,0,0.25)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', marginBottom: 'var(--space-8)', lineHeight: 1.7 }}>
              <strong>Important:</strong> The following Terms of Use is a preliminary draft. Legally-reviewed, complete Terms of Use compliant with Indian law will be published here before any public launch. This draft is for structural purposes only.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website (claryn.in), you accept and agree to be bound by the terms and provisions of this agreement. This website is owned and operated by Udarta Watertech Private Limited.</p>

            <h2>2. Intellectual Property</h2>
            <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Udarta Watertech Private Limited or its content suppliers and is protected by Indian and international copyright laws. &quot;CLARYN&quot; is a registered trademark of Udarta Watertech Private Limited.</p>

            <h2>3. Product Information and Specifications</h2>
            <p>While we strive for accuracy, the information on this website regarding product specifications, performance, and compatibility is provided for general guidance. Actual performance (such as flow rate and salt rejection) may vary based on local water conditions, feed pressure, and proper maintenance. Specifications are subject to change without notice.</p>

            <h2>4. Disclaimer of Health Claims</h2>
            <p>Our products are designed to reduce dissolved solids and certain contaminants in water. However, Udarta Watertech Private Limited makes no specific health claims or medical guarantees regarding the use of our products. Users should rely on independent water testing to ensure the safety of their drinking water.</p>

            <h2>5. Purchases and Third-Party Marketplaces</h2>
            <p>CLARYN products may be available for purchase through authorized third-party marketplaces (e.g., Amazon, Flipkart). Any purchase made on these platforms is subject to the terms and conditions of that specific marketplace. Udarta Watertech Private Limited is not responsible for any transaction issues, delays, or platform-specific policies on those marketplaces.</p>

            <h2>6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, Udarta Watertech Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website or any CLARYN products.</p>

            <h2>7. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts located in [CITY TO BE PROVIDED], India.</p>

            <h2>8. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at: [EMAIL TO BE PROVIDED]</p>
          </div>
        </div>
      </section>
    </>
  );
}
