import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glow-electric hover:shadow-glow-neon hover:brightness-110",
  outline:
    "border border-silver/20 text-silver hover:border-neon/50 hover:text-white bg-white/[0.02]",
  ghost: "text-silver hover:text-white hover:bg-white/[0.04]",
  whatsapp:
    "bg-[#25D366] text-[#052e16] hover:brightness-105 shadow-[0_10px_30px_-12px_rgba(37,211,102,0.5)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base py-3.5",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
