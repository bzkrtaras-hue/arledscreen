import Link from "next/link";

export type CitationProof = {
  label: string;
};

export type CitationCapsuleProps = {
  /** Visible section title (H2). */
  title: string;
  /** Short quotable answer for visitors and AI. */
  answer: string;
  proofs: CitationProof[];
  sources: { href: string; label: string }[];
  className?: string;
};

/**
 * Public fact block: definition + published proof + human-facing source links.
 * Internal “do not claim” guidance must never appear here — keep that in docs / llms.txt only.
 */
export function CitationCapsule({
  title,
  answer,
  proofs,
  sources,
  className = "",
}: CitationCapsuleProps) {
  const publicSources = sources.filter((s) => !/llms(-full)?\.txt$/i.test(s.href));

  return (
    <aside
      className={`border-y border-border bg-band/60 py-10 md:py-12 ${className}`.trim()}
      aria-labelledby="citation-capsule-title"
      data-citation-capsule
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Kurumsal özet
        </p>
        <h2
          id="citation-capsule-title"
          className="mt-2 font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl"
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-[1.75] text-ink-soft">{answer}</p>
        {proofs.length ? (
          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink">
            {proofs.map((p) => (
              <li key={p.label} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                <span>{p.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {publicSources.length ? (
          <p className="mt-5 text-sm text-ink-soft">
            İlgili sayfalar:{" "}
            {publicSources.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? " · " : null}
                <Link href={s.href} className="font-semibold text-cyan underline-offset-2 hover:underline">
                  {s.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
