/** Kiralama kapsamı tablosu. Satırlar yalnızca sitede zaten yayımlı bilgilere dayanır
 * (kiralama sayfaları, kategori SSS'si, llms.txt). Fiyat ve sayı yok; kiralık fiyat yazılı teklifle. */
const ROWS = {
  tr: [
    ["Keşif ve planlama", "Ölçü ve etkinlik tarihini paylaşmanız yeterlidir. Plan, bu bilgilere göre hazırlanır."],
    ["Kurulum", "Kurulum planı etkinlik takvimine göre hazırlanır. Kurulum ayrıca tekliflendirilir."],
    ["Söküm", "Söküm planı da etkinlik takvimine göre hazırlanır. Teklife dahil kalemler yazılı olarak belirtilir."],
    ["Teknik ekip", "ARLEDSCREEN teknik ekibi montaj, devreye alma ve teknik servis hizmeti verir."],
    ["Nakliye", "Nakliye ayrıca tekliflendirilir. Ücretsiz kargo yoktur."],
    ["Fiyat", "Kiralık LED ekranda fiyat yazılı teklifle verilir."],
  ],
  en: [
    ["Survey and planning", "Sharing the size and the event date is enough. The plan is prepared from this information."],
    ["Installation", "The installation plan is prepared around the event calendar. Installation is quoted separately."],
    ["Strike (removal)", "The strike plan is also prepared around the event calendar. Items included in the quote are listed in writing."],
    ["Technical team", "The ARLEDSCREEN technical team provides installation, commissioning and technical service."],
    ["Shipping", "Shipping is quoted separately. There is no free shipping."],
    ["Price", "Rental LED display is priced by written quote."],
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
