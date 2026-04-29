"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SETTINGS_NAV } from "@/lib/types";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sidebar" aria-label="Main navigation">
      {/* Brand */}
      <header className="sidebar-header">
        <h2 className="sidebar-header-title">ClassTeams</h2>
        <p className="sidebar-header-subtitle">Academic Ledger</p>
      </header>

      {/* Primary Links */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.page}>
              <Link
                href={item.href}
                className={`sidebar-nav-item${isActive(item.href) ? " active" : ""}`}
                data-page={item.page}
              >
                <span className="material-symbols-outlined sidebar-nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Footer */}
      <footer className="sidebar-footer">
        <ul className="sidebar-footer-list" role="list">
          <li>
            <Link
              href={SETTINGS_NAV.href}
              className={`sidebar-nav-item${isActive(SETTINGS_NAV.href) ? " active" : ""}`}
              data-page={SETTINGS_NAV.page}
            >
              <span className="material-symbols-outlined sidebar-nav-icon" aria-hidden="true">
                {SETTINGS_NAV.icon}
              </span>
              <span>{SETTINGS_NAV.label}</span>
            </Link>
          </li>
        </ul>
      </footer>
    </nav>
  );
}
