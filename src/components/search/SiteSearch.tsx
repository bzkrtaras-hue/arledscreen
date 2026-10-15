"use client";

import { useEffect, useMemo, useState } from "react";

type Doc = { u: string; t: string; d: string; x: string };

/** Turkish-aware normalisation: lower-case, strip diacritics (ı→i, ş→s …). */
function norm(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.,×x ]+/g, " ");
}

/**
 * Static, self-hosted site search. The index (/search-index-<lang>.json) is generated
 * at build time from out/ by scripts/postbuild-search-index.mjs — no third-party
 * scripts, no WASM, CSP 'self' only.
 */
export function SiteSearch({ locale }: { locale: "tr" | "en" }) {
  const tr = locale === "tr";
  const [docs, setDocs] = useState<(Doc & { n: string; nt: string })[] | null>(null);
  const [err, setErr] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
    fetch(`/search-index-${locale}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: Doc[]) => setDocs(d.map((x) => ({ ...x, nt: norm(x.t), n: norm(`${x.t} ${x.d} ${x.x}`) }))))
      .catch(() => setErr(true));
  }, [locale]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (q.trim()) url.searchParams.set("q", q.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [q]);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
    if (!docs || !terms.length) return [];
    const out: { doc: Doc; score: number }[] = [];
    for (const doc of docs) {
      let score = 0;
      for (const t of terms) {
        if (!doc.n.includes(t)) {
          score = 0;
          break;
        }
        score += doc.nt.includes(t) ? 5 : 1;
      }
      if (score) out.push({ doc, score });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 30);
  }, [docs, q]);

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex gap-2">
        <label htmlFor="site-search-q" className="sr-only">
          {tr ? "Aranacak kelime" : "Search term"}
        </label>
        <input
          id="site-search-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tr ? "Örn. P2.5, dış mekân, kiosk, fiyat" : "e.g. P2.5, outdoor, kiosk, price"}
          autoComplete="off"
          className="min-h-12 w-full min-w-0 rounded-xl border border-border bg-white px-4 text-base text-ink focus:border-cyan focus:outline-none"
        />
      </form>
      <p className="mt-3 text-sm text-ink-muted" aria-live="polite">
        {err
          ? tr
            ? "Arama dizini yüklenemedi."
            : "Search index could not be loaded."
          : !docs
            ? tr
              ? "Yükleniyor…"
              : "Loading…"
            : q.trim()
              ? tr
                ? `${results.length} sonuç`
                : `${results.length} results`
              : ""}
      </p>
      <ul className="mt-4 grid gap-3">
        {results.map(({ doc }) => (
          <li key={doc.u}>
            <a href={doc.u} className="block rounded-xl border border-border bg-white p-4 transition hover:border-cyan">
              <span className="block font-semibold text-ink">{doc.t}</span>
              {doc.d ? <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{doc.d}</span> : null}
              <span className="mt-1 block text-xs text-cyan">{doc.u}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
