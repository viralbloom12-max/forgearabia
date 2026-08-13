import { cn } from "@/lib/utils";

/**
 * Premium glass surface used for feature, service, and content cards.
 * Hover lift and border warm are intentionally restrained.
 */
export function Card({
  className,
  interactive = false,
  children,
}: {
  className?: string;
  interactive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 sm:p-7",
        interactive &&
          "group relative transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:shadow-glow-neon",
        className,
      )}
    >
      {children}
    </div>
  );
}
