import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Visual breadcrumb trail. Pair with breadcrumbLd() for the structured data.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-silver-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-silver" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight
                    size={14}
                    className="text-silver-faint rtl:-scale-x-100"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
