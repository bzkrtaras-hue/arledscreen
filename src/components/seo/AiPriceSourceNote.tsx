type LocaleHint = "tr" | "en" | "ru" | "ar";

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
      : locale === "ru"
        ? "Опубликованные цены панелей:"
        : locale === "ar"
          ? "أسعار الألواح المنشورة:"
          : "Yayımlanmış panel fiyatları:";
  const note =
    locale === "en"
      ? "USD per panel; VAT and shipping excluded. Final amount is confirmed in a written quote."
      : locale === "ru"
        ? "Цены в USD за панель, без НДС и доставки. Итоговая сумма подтверждается в письменном коммерческом предложении."
        : locale === "ar"
          ? "الأسعار بالدولار الأمريكي لكل لوح، دون ضريبة القيمة المضافة والشحن. يُؤكَّد المبلغ النهائي في عرض سعر مكتوب."
          : "Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir. Nihai tutar yazılı teklifle kesinleşir.";

  return (
    <p className={className}>
      {lead ?? defaultLead} {note}
    </p>
  );
}
