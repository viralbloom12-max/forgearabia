import { cn } from "@/lib/utils";

/**
 * Standard vertical rhythm wrapper for homepage and landing-page sections.
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-28", className)}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
