'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/Button/Button';

import styles from './Navbar.module.css';
import { useSession } from 'next-auth/react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface NavProps {
  userLoggedIn?: boolean;
  logout: () => Promise<void>;
}

export const Navbar = ({ userLoggedIn, logout }: NavProps) => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      {!userLoggedIn && (
        <ul className={styles.list}>
          {links.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    isActive
                      ? `${styles.link} ${styles.linkActive}`
                      : styles.link
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {!userLoggedIn && (
        <Button href="/login" variant="primary">
          Login
        </Button>
      )}
    </nav>
  );
};
