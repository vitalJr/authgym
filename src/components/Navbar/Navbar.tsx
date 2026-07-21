'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/Button/Button';

import styles from './Navbar.module.css';

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

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <ul className={styles.list}>
        {links.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {userLoggedIn ? (
        <form action={logout}>
          <Button type="submit" variant="secondary">
            Logout
          </Button>
        </form>
      ) : (
        <Button href="/login" variant="primary">
          Login
        </Button>
      )}
    </nav>
  );
};
