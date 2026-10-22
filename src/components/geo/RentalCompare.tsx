/** Rental vs purchase comparison (GEO paket 2). Rows mirror the published guide
 * /rehber/kiralik-mi-satin-alma/; no prices in this component. */
const ROWS = {
  tr: [
    ["Tipik kullanım", "Sahne, fuar, lansman", "Mağaza, cephe, salon, totem"],
    ["Maliyet modeli", "Süre + ölçü + kurulum", "Panel + montaj + kontrol"],
    ["Süreklilik", "Geçici", "Kalıcı"],
    ["Fiyat", "Yazılı teklif", "Yayımlanmış USD panel listesi + yazılı teklif"],
    ["Servis", "Etkinlik boyunca", "Kurulum sonrası teknik servis"],
  ],
  en: [
    ["Typical use", "Stage, fairs, launches", "Retail, façades, venues, totems"],
    ["Cost model", "Duration + size + installation", "Panels + installation + control"],
    ["Duration", "Temporary", "Permanent"],
    ["Price", "Written quote", "Published USD panel list + written quote"],
    ["Service", "During the event", "Technical service after installation"],
  ],
} as const;

export function RentalCompare({ locale }: { locale: "tr" | "en" }) {
  const tr = locale === "tr";
  const head = tr ? ["Ölçüt", "Kiralık LED ekran", "Satın alma"] : ["Criterion", "Rental LED display", "Purchase"];
  return (
    <section id="kiralik-karsilastirma" className="border-t border-border bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
          {tr ? "Kiralık mı, satın alma mı?" : "Rental or purchase?"}
        </h2>
        <div className="mt-6 max-w-3xl overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                {head.map((h) => (
                  <th key={h} className="py-2 pr-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS[locale].map((r) => (
                <tr key={r[0]} className="border-b border-border/70">
                  <th scope="row" className="py-3 pr-3 text-left font-medium text-ink">{r[0]}</th>
                  <td className="py-3 pr-3 text-ink-soft">{r[1]}</td>
                  <td className="py-3 text-ink-soft">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
