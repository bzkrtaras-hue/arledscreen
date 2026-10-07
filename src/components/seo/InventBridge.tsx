import Link from "next/link";

/** Lean noindex inventable-path bridge (CF 404.html beats _redirects). */
export function InventBridge({
  h1,
  target,
  cta,
  note,
}: {
  h1: string;
  target: string;
  cta: string;
  note?: string;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1 className="font-display text-2xl font-bold text-ink">{h1}</h1>
      <p className="mt-3 text-ink-soft">
        Canonical hub:{" "}
        <Link href={target} className="font-semibold text-cyan hover:underline">
          {target}
        </Link>
        . Site: arledscreen.com (not arleds.com).
        {note ? <> {note}</> : null}
      </p>
      <p className="mt-6">
        <Link
          href={target}
          className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          {cta}
        </Link>
      </p>
    </main>
  );
}
