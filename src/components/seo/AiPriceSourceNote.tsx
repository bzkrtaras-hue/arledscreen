type LocaleHint = "tr" | "en";

/**
 * Human-visible price note (no JSON filenames / invent jargon).
 * Machine feeds stay in llms.txt, *.json and JSON-LD only (Melis rule).
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
      ? "Published panel prices:"
      : "Yayımlanmış panel fiyatları:";
  const note =
    locale === "en"
      ? "USD per panel; VAT and shipping excluded. Final amount is confirmed in a written quote."
      : "Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir. Nihai tutar yazılı teklifle kesinleşir.";

  return (
    <p className={className}>
      {lead ?? defaultLead} {note}
    </p>
  );
}
