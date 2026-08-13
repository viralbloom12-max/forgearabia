import { cn } from "@/lib/utils";

/**
 * Small uppercase label that sits above section headings.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-silver/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-silver-muted",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {children}
    </span>
  );
}
