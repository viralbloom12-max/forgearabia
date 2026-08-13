import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/navigation";

/**
 * Components mapped into rendered MDX. Internal links (starting with "/") use
 * the locale-aware next-intl Link so article links to service, location, and
 * contact pages keep the current language. External links open in a new tab.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="text-neon underline-offset-2 hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neon underline-offset-2 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },
};
