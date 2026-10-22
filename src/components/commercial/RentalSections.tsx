import Link from "next/link";

/** /tr/led-ekran-kiralama/ — Desk brief 2026-10-22. Facts: Aras onayı (50 USD/m²/gün, KDV + kurulum + nakliye dahil, depozito yok). */
export const RENTAL_PRICE_USD = 50;

export function RentalAnswer() {
  return (
    <div id="kisa-cevap" className="mt-5 max-w-3xl rounded-2xl border border-cyan/30 bg-white p-5 text-base leading-relaxed text-ink">
      <p>
        ARLEDSCREEN, İstanbul&apos;da sahne, fuar ve etkinlikler için kiralık LED ekran sunar. Kiralama bedeli 50 USD/m²/gün&apos;dür;
        KDV, kurulum ve nakliye bu fiyata dahildir. Haftalık ve aylık kiralamalar da aynı günlük m² fiyatı üzerinden hesaplanır ve
        depozito alınmaz. Kurulum takvimi ve teslim zamanı etkinliğinize göre planlanır ve yazılı teklifte belirtilir.
      </p>
    </div>
  );
}

const h2 = "font-display text-xl font-bold text-ink md:text-2xl";
const link = "font-semibold text-cyan hover:underline";

export function RentalPriceSection() {
  const rows: [string, string][] = [
    ["Günlük", "50 USD/m²"],
    ["Haftalık", "50 USD × m² × gün sayısı"],
    ["Aylık", "50 USD × m² × gün sayısı"],
    ["Depozito", "Yok"],
    ["Dahil olanlar", "KDV, kurulum ve nakliye"],
  ];
  return (
    <section id="kiralik-fiyat" className="border-t border-border bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={h2}>Kiralık LED ekran fiyatları (İstanbul)</h2>
        <div className="mt-6 max-w-3xl overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="py-2 pr-3 font-semibold">Süre</th>
                <th className="py-2 font-semibold">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-border/70">
                  <th scope="row" className="py-3 pr-3 text-left align-top font-medium text-ink">{r[0]}</th>
                  <td className="py-3 text-ink-soft">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 max-w-3xl space-y-3 text-base leading-relaxed text-ink-soft">
          <p>Örneğin 12 m² ekran, 3 gün: 12 × 3 × 50 = 1.800 USD. KDV, kurulum ve nakliye bu tutara dahildir.</p>
          <p>Ödemeyi TL, USD, EUR ve diğer para birimleriyle yapabilirsiniz; taksitli ödeme de mümkündür.</p>
          <p>
            Nihai tutar yazılı teklifle kesinleşir.{" "}
            <Link href="/tr/hesaplayici/" className={link}>Ekran ölçünüzü hesaplayın</Link> ya da{" "}
            <Link href="/tr/rehber/kiralik-mi-satin-alma/" className={link}>kiralık mı, satın alma mı</Link> karşılaştırmasına bakın.
          </p>
        </div>
      </div>
    </section>
  );
}

export function RentalEventsSection() {
  return (
    <section className="border-t border-border bg-band/30 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={h2}>İstanbul&apos;da hangi etkinlikler için?</h2>
        <ul className="mt-5 grid max-w-3xl gap-2 text-ink sm:grid-cols-2">
          {["Sahne ve konser", "Fuar standı", "Lansman", "Kurumsal toplantı", "Düğün ve salon etkinlikleri"].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">
          İstanbul&apos;un tüm ilçelerinde proje yapıyoruz. İç ve dış mekân için kiralık kabin seçeneği vardır; ekranın izlenme
          mesafesine göre{" "}
          <Link href="/tr/rehber/piksel-araligi-secimi/" className={link}>piksel aralığı seçimi</Link> rehberine bakabilirsiniz.{" "}
          <Link href="/tr/bolgeler/istanbul/" className={link}>İstanbul&apos;daki projelerimiz</Link> ·{" "}
          <Link href="/tr/products/kiralik-led-ekran/" className={link}>kiralık LED ekran kabinleri</Link>
        </p>
      </div>
    </section>
  );
}

export function RentalProcessSection() {
  const steps = [
    <>Ölçü, tarih ve mekânı <Link href="/tr/quote/" className={link}>teklif formundan</Link> ya da e-postayla iletin.</>,
    <>Yazılı teklif: m², gün sayısı, kurulum ve söküm takvimi, teslim zamanı.</>,
    <>Kurulum ve devreye alma ARLEDSCREEN teknik ekibince yapılır.</>,
    <>Etkinlik sonrası söküm.</>,
  ];
  return (
    <section className="border-t border-border bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={h2}>Kiralama süreci: 4 adım</h2>
        <ol className="mt-5 max-w-3xl space-y-3 text-base leading-relaxed text-ink-soft">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan text-sm font-bold text-white">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5">
          <Link href="/tr/quote/" className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600">
            Kiralama teklifi al
          </Link>
        </p>
      </div>
    </section>
  );
}

export function RentalWhySection() {
  return (
    <section className="border-t border-border bg-band/30 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={h2}>Neden ARLEDSCREEN?</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
          ARLEDSCREEN, İstanbul merkezli LED ekran üreticisidir; satış, montaj ve teknik servisi de kendisi yapar.
        </p>
        <ul className="mt-4 max-w-3xl space-y-2 text-ink">
          {[
            "15 yıllık sektör deneyimi ve 1000'den fazla proje",
            "Kendi LED ekran markası: NXTIONSTAR",
            "CE belgeli ürünler",
            "Merkez: Gaziosmanpaşa / İstanbul",
            "Avrupa, Orta Doğu ve Balkanlar'a sevkiyat",
            "Taksitli ödeme",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
