/** Kiralama kapsamı tablosu. Satırlar yalnızca sitede zaten yayımlı bilgilere dayanır
 * (kiralama sayfaları, kategori SSS'si, llms.txt). Kiralık fiyat: 50 USD/m²/gün (Aras onayı 22.10.2026). */
const ROWS = {
  tr: [
    ["Keşif ve planlama", "Ölçü ve etkinlik tarihini paylaşmanız yeterlidir. Plan, bu bilgilere göre hazırlanır."],
    ["Kurulum", "Kurulum planı etkinlik takvimine göre hazırlanır. İstanbul içinde kurulum kiralama fiyatına dahildir."],
    ["Söküm", "Söküm planı da etkinlik takvimine göre hazırlanır. Teklife dahil kalemler yazılı olarak belirtilir."],
    ["Teknik ekip", "ARLEDSCREEN teknik ekibi montaj, devreye alma ve teknik servis hizmeti verir."],
    ["Nakliye", "İstanbul içinde nakliye kiralama fiyatına dahildir ve teslim bir haftadır; İstanbul dışında nakliye ayrıca planlanır."],
    ["Fiyat", "50 USD/m²/gün; KDV dahil; İstanbul içinde kurulum ve nakliye dahil, İstanbul dışında nakliye ayrıca planlanır; depozito yok. Nihai tutar yazılı teklifte."],
  ],
  en: [
    ["Survey and planning", "Sharing the size and the event date is enough. The plan is prepared from this information."],
    ["Installation", "The installation plan is prepared around the event calendar. Within Istanbul, installation is included in the rental price."],
    ["Strike (removal)", "The strike plan is also prepared around the event calendar. Items included in the quote are listed in writing."],
    ["Technical team", "The ARLEDSCREEN technical team provides installation, commissioning and technical service."],
    ["Shipping", "Within Istanbul, shipping is included and delivery takes one week; shipping outside Istanbul is planned separately."],
    ["Price", "50 USD per m² per day; VAT included; installation and shipping included within Istanbul, shipping outside Istanbul planned separately; no deposit. Final amount in the written quote."],
  ],
} as const;

export function RentalScope({ locale, id = "kiralama-kapsami" }: { locale: "tr" | "en"; id?: string }) {
  const tr = locale === "tr";
  return (
    <section id={id} className="border-t border-border bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
          {tr ? "Kiralamada kapsam" : "Rental scope"}
        </h2>
        <div className="mt-6 max-w-3xl overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="py-2 pr-3 font-semibold">{tr ? "Kalem" : "Item"}</th>
                <th className="py-2 font-semibold">{tr ? "Kapsam" : "Scope"}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS[locale].map((r) => (
                <tr key={r[0]} className="border-b border-border/70">
                  <th scope="row" className="py-3 pr-3 text-left align-top font-medium text-ink">{r[0]}</th>
                  <td className="py-3 text-ink-soft">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
