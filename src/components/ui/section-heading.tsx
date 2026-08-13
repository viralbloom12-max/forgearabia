import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * Reusable section header: eyebrow + title + optional intro, centered by default.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-silver-muted sm:text-lg">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
