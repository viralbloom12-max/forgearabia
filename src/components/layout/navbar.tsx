"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-silver/10 bg-navy-900/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          <Image
            src={siteConfig.assets.logo}
            alt={siteConfig.name}
            width={160}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-silver transition-colors hover:text-white"
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <a href="#contact" className={buttonVariants({ size: "md" })}>
            {t("cta")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-silver/15 bg-white/[0.03] text-silver"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-silver/10 bg-navy-950/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[80vh]" : "max-h-0 border-t-0",
        )}
      >
        <div className="container-page flex flex-col gap-1 py-6">
          {mainNav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-silver hover:bg-white/[0.04] hover:text-white"
            >
              {t(item.key)}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={buttonVariants({ size: "lg", className: "mt-3 w-full" })}
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
