import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  contained?: boolean;
  /** Render the title as the page H1 (for top-of-page sections). */
  titleAs?: "h1" | "h2";
  /** Soft liquid-glass plate around the section heading block. */
  glassHeading?: boolean;
  children?: ReactNode;
}

export function Section({
  className,
  eyebrow,
  title,
  description,
  contained = true,
  titleAs = "h2",
  glassHeading = false,
  children,
  ...props
}: SectionProps) {
  const TitleTag = titleAs;
  return (
    <section
      className={cn("relative py-12 sm:py-16 md:py-24", className)}
      {...props}
    >
      <div
        className={cn(
          contained && "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        )}
      >
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-8 max-w-3xl md:mb-12",
              glassHeading &&
                "liquid-glass-heading px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7 transition-[box-shadow,transform] duration-500 ease-out",
            )}
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-cyan sm:text-xs sm:tracking-[0.14em]">
                {eyebrow}
              </p>
            )}
            {title && (
              <TitleTag className="max-w-2xl text-balance font-display text-[clamp(1.5rem,1.15rem+1.6vw,2.35rem)] font-bold tracking-[-0.025em] text-ink">
                {title}
              </TitleTag>
            )}
            {description && (
              <p className="mt-3 max-w-2xl text-pretty text-base leading-[1.65] text-ink-soft sm:mt-4 sm:text-[1.0625rem]">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
