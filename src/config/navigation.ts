/**
 * Primary navigation. For the launch homepage these resolve to on-page
 * anchors; as dedicated routes ship (services, about, blog) the `href`
 * values are swapped for real paths without touching the Navbar.
 */
export interface NavItem {
  /** Key into the `nav` message namespace. */
  key: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "whyUs", href: "/#why-us" },
  { key: "process", href: "/#process" },
  { key: "contact", href: "/contact" },
];
