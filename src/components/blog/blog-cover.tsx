import { cn } from "@/lib/utils";

/**
 * Branded gradient cover for a blog post. Avoids stock photography: a subtle,
 * deterministic brand-colored panel with the category label and grid texture.
 */
const GRADIENTS = [
  "from-electric/25 via-navy-900 to-neon/15",
  "from-neon/20 via-navy-900 to-electric/20",
  "from-electric/20 via-navy-950 to-navy-900",
];

function pick(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export function BlogCover({
  category,
  seed,
  className,
}: {
  category: string;
  seed: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br",
        pick(seed),
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,206,216,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,206,216,0.14) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <span className="absolute bottom-4 start-5 inline-flex items-center rounded-full border border-white/15 bg-navy-950/50 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
        {category}
      </span>
    </div>
  );
}
