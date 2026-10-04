import { cn } from "@/lib/utils";

/** Centred (or left) section heading with eyebrow — used by the template-style sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <header className={cn("mb-8 md:mb-10", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan sm:text-xs">{eyebrow}</p>
      ) : null}
      <Tag
        id={id}
        className="text-balance font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] font-bold tracking-[-0.025em] text-ink"
      >
        {title}
      </Tag>
      {description ? (
        <p className={cn("mt-3 text-pretty text-base leading-[1.65] text-ink-soft", align === "center" && "mx-auto max-w-2xl")}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
