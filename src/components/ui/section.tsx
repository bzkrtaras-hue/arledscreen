import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  contained?: boolean;
  /** Render the title as the page H1 (for top-of-page sections). */
  titleAs?: "h1" | "h2";
  /** Optional DOM id on the title (e.g. SpeakableSpecification cssSelector). */
  titleId?: string;
  /** Optional DOM id on the description paragraph. */
  descriptionId?: string;
  children?: ReactNode;
}

export function Section({
  className,
  eyebrow,
  title,
  description,
  contained = true,
  titleAs = "h2",
  titleId,
  descriptionId,
  children,
  ...props
}: SectionProps) {
  const TitleTag = titleAs;
  return (
    <section
      className={cn(
        // Use pt/pb (not py) so page-level className can override one side via twMerge.
        "relative pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-24 md:pb-24",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          contained && "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        )}
      >
        {(eyebrow || title || description) && (
          <header className="mb-8 max-w-3xl md:mb-12">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-cyan sm:text-xs sm:tracking-[0.14em]">
                {eyebrow}
              </p>
            )}
            {title && (
              <TitleTag
                id={titleId}
                className="max-w-2xl text-balance font-display text-[clamp(1.5rem,1.15rem+1.6vw,2.35rem)] font-bold tracking-[-0.025em] text-ink"
              >
                {title}
              </TitleTag>
            )}
            {description && (
              <p
                id={descriptionId}
                className="mt-3 max-w-2xl text-pretty text-base leading-[1.65] text-ink-soft sm:mt-4 sm:text-[1.0625rem]"
              >
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
