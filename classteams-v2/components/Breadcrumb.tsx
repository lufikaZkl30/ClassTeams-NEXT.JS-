import Link from "next/link";

interface Crumb { label: string; href?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-on-surface-variant">/</span>}
            {c.href
              ? <Link href={c.href} className="text-primary hover:text-blue-700 font-semibold transition-colors">{c.label}</Link>
              : <span className="text-on-surface-variant font-semibold">{c.label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  );
}
