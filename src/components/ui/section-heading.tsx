"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/** Centred (or left) section heading — optional liquid-glass plate + soft entrance. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
  id,
  glass = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
  /** Homepage: frost plate so title + subcopy stay readable and intentional. */
  glass?: boolean;
}) {
  const header = (
    <header
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        glass && "liquid-glass-heading px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7",
        !glass && "mb-8 md:mb-10",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className="text-balance font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] font-bold tracking-[-0.025em] text-ink"
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-3 text-pretty text-base leading-[1.65] text-ink-soft",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );

  if (!glass) return header;

  return (
    <FadeIn dir="up" duration={0.8} amount={0.35} className="mb-8 md:mb-10">
      {header}
    </FadeIn>
  );
}
