import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Wrench, Phone, FileText, HelpCircle, ClipboardList, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Center | CLARYN',
  description: 'CLARYN Support Center — installation guides, warranty, product registration, FAQ, and contact. We\'re here after the purchase too.',
};

const supportItems = [
  { icon: Wrench,       title: 'Installation Center', desc: 'Step-by-step installation guides for all CLARYN products.', href: '/installation', cta: 'View Guides' },
  { icon: ShieldCheck,  title: 'Warranty',             desc: 'Understand your coverage, check eligibility, and submit a claim.', href: '/warranty', cta: 'Warranty Info' },
  { icon: ClipboardList,title: 'Register Product',     desc: 'Activate your warranty and set up maintenance reminders.', href: '/register-product', cta: 'Register Now' },
  { icon: HelpCircle,   title: 'FAQ',                  desc: 'Answers to the most common questions about CLARYN products.', href: '/faq', cta: 'Browse FAQs' },
  { icon: BookOpen,     title: 'Knowledge Hub',         desc: 'Evidence-based water quality education articles.', href: '/learn', cta: 'Start Learning' },
  { icon: FileText,     title: 'Resources & Downloads', desc: 'Datasheets, manuals, and water quality guides.', href: '/resources', cta: 'View Resources' },
  { icon: Phone,        title: 'Contact Us',            desc: 'Reach our support team for product or water quality queries.', href: '/contact', cta: 'Get in Touch' },
];

export default function SupportPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--color-blue-300)' }}>Support Center</span>
          <h1 style={{ color: 'var(--color-white)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>How Can We Help?</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>Installation support, warranty help, product guides, and a team that answers — because we&apos;re a brand, not just a listing.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
            {supportItems.map(({ icon: Icon, title, desc, href, cta }) => (
              <Link key={title} href={href} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', textDecoration: 'none', color: 'inherit', background: 'var(--color-white)', transition: 'all var(--transition-base)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--color-blue-50)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} aria-hidden />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', lineHeight: 1.7 }}>{desc}</p>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-blue)' }}>
                  {cta} <ChevronRight size={14} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
