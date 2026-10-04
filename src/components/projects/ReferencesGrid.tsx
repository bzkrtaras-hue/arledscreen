import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getReferences } from "@/content/references";
import { displayCompany } from "@/content/trust";

interface Props {
  locale: Locale;
  /** Collapse behind a <details> toggle (used on the homepage). */
  collapsible?: boolean;
}

export function ReferencesGrid({ locale, collapsible = false }: Props) {
  const dict = getDictionary(locale);
  const refs = getReferences();

  const headers =
    locale === "tr"
      ? { date: "Tarih", company: "Firma / proje", detail: "Kapsam", location: "Konum" }
      : locale === "ru"
        ? { date: "Дата", company: "Компания", detail: "Объём", location: "Город" }
        : locale === "ar"
          ? { date: "التاريخ", company: "الشركة", detail: "النطاق", location: "الموقع" }
          : { date: "Date", company: "Company / project", detail: "Scope", location: "Location" };

  const table = (
    <div className="overflow-hidden rounded-2xl glass-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">{dict.references.cardHint}</caption>
          <thead>
            <tr className="border-b border-border bg-surface/80 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              <th scope="col" className="whitespace-nowrap px-4 py-3 sm:px-5">{headers.date}</th>
              <th scope="col" className="px-4 py-3 sm:px-5">{headers.company}</th>
              <th scope="col" className="px-4 py-3 sm:px-5">{headers.detail}</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 sm:px-5">{headers.location}</th>
            </tr>
          </thead>
          <tbody>
            {refs.map((ref, i) => (
              <tr
                key={ref.id}
                className={i % 2 === 0 ? "border-b border-border/60 bg-white" : "border-b border-border/60 bg-surface/40"}
              >
                <td className="whitespace-nowrap px-4 py-3 align-top text-ink-muted sm:px-5">{ref.date}</td>
                <td className="px-4 py-3 align-top font-display text-[15px] font-semibold tracking-[-0.01em] text-ink sm:px-5">
                  {displayCompany(ref)}
                </td>
                <td className="px-4 py-3 align-top text-ink-soft sm:px-5">{ref.detail}</td>
                <td className="whitespace-nowrap px-4 py-3 align-top text-ink-muted sm:px-5">{ref.location || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border/60 px-4 py-3 text-xs text-ink-muted sm:px-5">
        {locale === "tr"
          ? "Kaynak: ARLEDSCREEN proje kayıtları. Bireysel müşteri adları gizlilik nedeniyle gösterilmemektedir."
          : "Source: ARLEDSCREEN project log. Private individuals are anonymised."}
      </p>
    </div>
  );

  if (!collapsible) return table;
  return (
    <details className="group">
      <summary className="btn-soft inline-flex min-h-11 cursor-pointer items-center border border-cyan/50 bg-white px-5 text-sm text-cyan hover:bg-cyan-50">
        {locale === "tr" ? `Tüm kayıtları göster (${refs.length})` : `Show all records (${refs.length})`}
      </summary>
      <div className="mt-4">{table}</div>
    </details>
  );
}
