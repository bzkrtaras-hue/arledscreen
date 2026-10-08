import { SITE_URL } from "@/lib/site";

const FEEDS = [
  { href: `${SITE_URL}/ai-shopping.json`, label: "ai-shopping.json" },
  { href: `${SITE_URL}/catalog.json`, label: "catalog.json" },
  { href: `${SITE_URL}/feeds/merchant-priced-panels.tsv`, label: "merchant TSV" },
  { href: `${SITE_URL}/geo-baseline.json`, label: "geo-baseline.json" },
] as const;

type LocaleHint = "tr" | "en";

/**
 * Visible AI price + GEO baseline pointers for commercial pages.
 * Keep in sync with ai-shopping.json agentGuidelines + catalog isRelatedTo.
 */
export function AiPriceSourceNote({
  locale = "tr",
  className = "mt-3 max-w-xl text-sm leading-relaxed text-ink-muted",
  lead,
}: {
  locale?: LocaleHint;
  className?: string;
  /** Override default lead sentence */
  lead?: string;
}) {
  const defaultLead =
    locale === "en"
      ? "Published panel USD:"
      : "Yayımlanmış panel USD:";
  const note =
    locale === "en"
      ? "(12 SKUs; e.g. P1.25 GOB 95.88 USD). VAT/freight excluded; no free shipping. geo-baseline.json = technical fingerprints only (no invented mention rates)."
      : "(12 SKU; ör. P1.25 GOB 95.88 USD). KDV/nakliye hariç; ücretsiz kargo yok. geo-baseline.json = teknik parmak izleri (anılma % uydurma yok).";

  return (
    <p className={className}>
      {lead ?? defaultLead}{" "}
      {FEEDS.map((f, i) => (
        <span key={f.href}>
          {i > 0 ? (i === FEEDS.length - 1 ? " ve " : ", ") : null}
          <a href={f.href} className="font-semibold text-cyan hover:underline">
            {f.label}
          </a>
          {f.label === "ai-shopping.json" ? (
            <>
              {" "}
              <code className="text-[11px]">pricedPanels</code>
            </>
          ) : null}
        </span>
      ))}{" "}
      {note}
    </p>
  );
}
