'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
  { href: '/assignments', label: 'Assignments', icon: 'assignment', page: 'assignments' },
  { href: '/schedule', label: 'Schedule', icon: 'calendar_today', page: 'schedule' },
  { href: '/resources', label: 'Resources', icon: 'folder', page: 'resources' },
];

const footerItems = [
  { href: '/settings', label: 'Settings', icon: 'settings', page: 'settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(page: string): boolean {
    if (page === 'dashboard') return pathname === '/';
    if (page === 'assignments') return pathname.startsWith('/assignments');
    return pathname.startsWith(`/${page}`);
  }

  return (
    <nav className="sidebar">
      <header className="sidebar-header">
        <h2 className="sidebar-header-title">Navigation</h2>
        <p className="sidebar-header-subtitle">Academic Ledger</p>
      </header>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li key={item.page}>
              <Link
                href={item.href}
                className={`sidebar-nav-item${isActive(item.page) ? ' active' : ''}`}
                data-page={item.page}
              >
                <span className="material-symbols-outlined sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="sidebar-footer">
        <ul className="sidebar-footer-list">
          {footerItems.map((item) => (
            <li key={item.page}>
              <Link
                href={item.href}
                className={`sidebar-nav-item${isActive(item.page) ? ' active' : ''}`}
                data-page={item.page}
              >
                <span className="material-symbols-outlined sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </nav>
  );
}
