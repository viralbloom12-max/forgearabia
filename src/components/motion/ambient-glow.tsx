import { cn } from "@/lib/utils";

/**
 * Soft, slowly drifting brand-colored orbs. Pure CSS motion (float-slow) so it
 * stays subtle and cheap. Decorative only, hidden from assistive tech.
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -top-24 left-1/4 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-electric/20 blur-[120px] animate-float-slow" />
      <div className="absolute -top-10 right-1/4 h-[22rem] w-[22rem] translate-x-1/3 rounded-full bg-neon/15 blur-[120px] animate-float-slow [animation-delay:-3s]" />
    </div>
  );
}
