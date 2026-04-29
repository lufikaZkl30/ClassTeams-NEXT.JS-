import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-on-surface-variant" aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-primary hover:text-blue-700 font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-on-surface-variant font-semibold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
