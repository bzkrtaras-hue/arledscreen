import { exportFacts } from "@/content/short-answers";

/** "At a glance" facts table for the export guide (GEO paket 2). Existing tokens only. */
export function ExportFacts({ locale }: { locale: "tr" | "en" }) {
  return (
    <div className="max-w-3xl overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <caption className="pb-2 text-left font-display text-lg font-bold text-ink">
          {locale === "tr" ? "Yurt dışı siparişte bir bakışta" : "Export orders at a glance"}
        </caption>
        <tbody>
          {exportFacts(locale).map((r) => (
            <tr key={r.k} className="border-b border-border/70">
              <th scope="row" className="py-2 pr-4 align-top font-semibold text-ink">{r.k}</th>
              <td className="py-2 text-ink-soft">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
