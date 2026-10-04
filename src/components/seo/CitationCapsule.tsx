import Link from "next/link";

export type CitationProof = {
  label: string;
};

export type CitationCapsuleProps = {
  /** Visible section title (H2). */
  title: string;
  /** 40–70 word quotable answer. */
  answer: string;
  proofs: CitationProof[];
  sources: { href: string; label: string }[];
  dontSay?: string[];
  className?: string;
};

/**
 * AI-quotable fact block: plain definition + published proof + source URLs.
 * No invented specs — only pass site-published facts.
 */
export function CitationCapsule({
  title,
  answer,
  proofs,
  sources,
  dontSay,
  className = "",
}: CitationCapsuleProps) {
  return (
    <aside
      className={`border-y border-border bg-band/60 py-10 md:py-12 ${className}`.trim()}
      aria-labelledby="citation-capsule-title"
      data-citation-capsule
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Alıntılanabilir özet
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
        {sources.length ? (
          <p className="mt-5 text-sm text-ink-soft">
            Kaynak:{" "}
            {sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? " · " : null}
                <Link href={s.href} className="font-semibold text-cyan underline-offset-2 hover:underline">
                  {s.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
        {dontSay?.length ? (
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            Bunu söyleme: {dontSay.join(" · ")}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
