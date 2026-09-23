'use client';
import Link from 'next/link';
import { ArrowRight, Wrench, ShieldCheck, HelpCircle } from 'lucide-react';
import styles from './InstallationSupport.module.css';

const SUPPORT_PATHS = [
  {
    id: 'install',
    icon: Wrench,
    title: 'INSTALL',
    description: 'Installation guides for all major RO brands.',
    href: '/installation'
  },
  {
    id: 'register',
    icon: ShieldCheck,
    title: 'REGISTER',
    description: 'Register your product for warranty support.',
    href: '/register-product'
  },
  {
    id: 'support',
    icon: HelpCircle,
    title: 'SUPPORT',
    description: 'Troubleshooting, maintenance, and help.',
    href: '/support'
  }
];

export function InstallationSupport() {
  return (
    <section className={styles.support}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.headline}>We&apos;re here after the purchase, too.</h2>
        </div>

        <div className={styles.grid}>
          {SUPPORT_PATHS.map((path) => {
            const Icon = path.icon;
            return (
              <Link key={path.id} href={path.href} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.title}>{path.title}</h3>
                <p className={styles.description}>{path.description}</p>
                <div className={styles.cta}>
                  Continue <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
