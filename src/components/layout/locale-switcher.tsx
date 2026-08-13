"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Toggles between English and Arabic while preserving the current path.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next = locale === "en" ? "ar" : "en";
  const label = locale === "en" ? "العربية" : "English";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(() => router.replace(pathname, { locale: next }))
      }
      aria-label={`Switch language to ${label}`}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-full border border-silver/15 bg-white/[0.03] px-4 text-sm font-medium text-silver transition-colors hover:border-neon/40 hover:text-white",
        className,
      )}
    >
      <span className={next === "ar" ? "font-arabic" : "font-sans"}>
        {label}
      </span>
    </button>
  );
}
