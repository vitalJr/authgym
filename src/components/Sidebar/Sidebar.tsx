'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';

import { Button } from '@/components/Button/Button';
import { DumbbellIcon } from '@/images';

import styles from './Sidebar.module.css';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/funcionarios', label: 'Funcionários' },
  { href: '/agendamentos', label: 'Agendamentos' },
  { href: '/treinos', label: 'Treinos' },
];

interface SidebarProps {
  user: Session['user'];
  logout: () => Promise<void>;
}

export const Sidebar = ({ user, logout }: SidebarProps) => {
  const pathname = usePathname();

  const displayName = user.name ?? user.email ?? 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside className={styles.sidebar} aria-label="Sidebar navigation">
      <div>
        <div className={styles.brand}>
          <DumbbellIcon className={styles.brandIcon} aria-hidden="true" />
          <span className={styles.brandName}>AuthGym</span>
        </div>

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
      </div>

      <div className={styles.profile}>
        <Link href="/profile" className={styles.profileInfo}>
          <span className={styles.avatar} aria-hidden="true">
            {initial}
          </span>

          <div className={styles.profileText}>
            <span className={styles.profileName}>{displayName}</span>
            {user.email && (
              <span className={styles.profileEmail}>{user.email}</span>
            )}
          </div>
        </Link>

        <form action={logout}>
          <Button
            type="submit"
            variant="secondary"
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </form>
      </div>
    </aside>
  );
};
