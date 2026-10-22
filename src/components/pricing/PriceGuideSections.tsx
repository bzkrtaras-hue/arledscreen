import Link from "next/link";

/** /tr/led-ekran-fiyatlari/ m² rehberi bölümleri (Desk brief 2026-10-22). Rakamlar yalnızca yayımlı panel listesinden. */
const a = "font-semibold text-cyan hover:underline";
const h3 = "font-display text-lg font-bold text-ink";

export function TrFactors() {
  return (
    <div className="mt-6 grid max-w-5xl gap-8 text-base leading-relaxed text-ink-soft md:grid-cols-2">
      <div>
        <h3 className={h3}>Piksel aralığı (pitch)</h3>
        <p className="mt-2">
          Piksel aralığı küçüldükçe m² başına düşen LED sayısı artar, bu da modül bedelini yükseltir. Yayımlı fiyatlarda iç mekân
          P4 26,98 USD/panel (yaklaşık 527 USD/m²) iken iç mekân P1.25 GOB 95,88 USD/panel (yaklaşık 1.873 USD/m²) olur. Doğru
          aralık izleme mesafesine göre seçilir; yakından izlenen ekranda küçük, uzaktan izlenende büyük pitch yeterlidir. Ayrıntı için{" "}
          <Link href="/tr/rehber/piksel-araligi-secimi/" className={a}>piksel aralığı seçimi</Link> rehberine bakın.
        </p>
      </div>
      <div>
        <h3 className={h3}>İç / dış mekân</h3>
        <p className="mt-2">
          Dış mekân ekranı güneş altında okunabilmek için daha yüksek parlaklık, yağmur ve toza karşı dayanım gerektirir. Yayımlı
          listede dış mekân P5 29,90 USD/panel (yaklaşık 584 USD/m²), dış mekân P2.5 63,70 USD/panel (yaklaşık 1.244 USD/m²) iken iç
          mekân P2.5 32,18 USD/panel (yaklaşık 629 USD/m²) olur. Teknik değerler için{" "}
          <Link href="/tr/products/dis-mekan-led-ekran/p5/" className={a}>dış mekân P5</Link> ve{" "}
          <Link href="/tr/products/ic-mekan-led-ekran/p2-5/" className={a}>iç mekân P2.5</Link> ürün sayfalarındaki teknik föye bakın.
        </p>
      </div>
      <div>
        <h3 className={h3}>Ölçü ve toplam m²</h3>
        <p className="mt-2">
          Ekran büyüdükçe panel, işçilik ve kontrol kartı sayısı alanla birlikte artar; sürücü ve yazılım gibi sabit kalemler ise
          daha geniş alana dağılır. Örnek: 3 × 2 m iç mekân P2.5 için ara toplam yaklaşık 5.397,24 USD, 6 × 3 m dış mekân P5 için
          yaklaşık 13.824,80 USD&apos;dir. Kendi ölçünüz için{" "}
          <Link href="/tr/hesaplayici/" className={a}>fiyat hesaplayıcıyı</Link> kullanın.
        </p>
      </div>
      <div>
        <h3 className={h3}>Kontrol sistemi</h3>
        <p className="mt-2">
          Kontrol kartı kart başına yaklaşık 500 USD olarak hesaplanır; 10 m² üzerinde her başlayan 10 m² için ek kart gerekir.
          Senkron (canlı görüntü) ya da asenkron (içerik yükleyip oynatma) ihtiyacı ve marka seçimi tutarı etkiler:{" "}
          <Link href="/tr/products/colorlight-kontrolculer/" className={a}>Colorlight</Link>,{" "}
          <Link href="/tr/products/novastar-kontrolculer/" className={a}>NovaStar</Link> ve{" "}
          <Link href="/tr/products/huidu-kontrol-kartlari/" className={a}>Huidu</Link>. Model bazlı fiyat yazılı teklifle verilir.
        </p>
      </div>
      <div>
        <h3 className={h3}>Kabin ve servis tipi</h3>
        <p className="mt-2">
          Önden servisli kabin, ekranın arkasına erişim olmayan duvar montajlarında tercih edilir. Yayımlı listede{" "}
          <Link href="/tr/products/dis-mekan-led-ekran/p4-on-servis/" className={a}>dış mekân P4 önden servis</Link> 36,40 USD/paneldir.
        </p>
      </div>
      <div>
        <h3 className={h3}>GOB ve SMD</h3>
        <p className="mt-2">
          GOB modüllerde LED yüzeyi şeffaf koruyucu bir katmanla kaplanır ve fiyatı standart SMD modülden yüksektir. Farkları için{" "}
          <Link href="/tr/rehber/gob-vs-smd/" className={a}>GOB vs SMD</Link> rehberine bakın.
        </p>
      </div>
      <div>
        <h3 className={h3}>Konstrüksiyon ve montaj yüksekliği</h3>
        <p className="mt-2">
          Taşıyıcı konstrüksiyon, montaj yüksekliği ve erişim koşulları keşifte netleşir ve yazılı teklifte ayrı kalem olarak yer alır.
        </p>
      </div>
    </div>
  );
}

export function TrRentalAndIncluded() {
  return (
    <>
      <section id="kiralik-m2-fiyati" className="border-t border-border bg-band/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Kiralık LED ekran m² fiyatı</h2>
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-ink-soft">
            <p>
              Kiralık LED ekran 50 USD/m²/gün&apos;dür; KDV, kurulum ve nakliye dahildir, depozito alınmaz. Haftalık ve aylık
              kiralamalar da aynı günlük m² fiyatı üzerinden hesaplanır.
            </p>
            <p>Örneğin 10 m² ekran, 7 gün: 10 × 7 × 50 = 3.500 USD.</p>
            <p>
              <Link href="/tr/led-ekran-kiralama/" className={a}>İstanbul&apos;da LED ekran kiralama</Link> ·{" "}
              <Link href="/tr/rehber/kiralik-mi-satin-alma/" className={a}>Kiralık mı, satın alma mı?</Link>
            </p>
          </div>
        </div>
      </section>
      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Satın almada dahil olanlar</h2>
          <ul className="mt-4 max-w-3xl space-y-2 text-ink">
            {[
              "CE belgeli ürünler",
              "2 yıl garanti ve 5 yıl ücretsiz teknik servis",
              "Tüm para birimleriyle ödeme, taksit imkânı",
              "Teslim: 3–21 gün hazırlık + 1–14 gün nakliye",
              "Avrupa, Orta Doğu ve Balkanlar'a gönderim",
              "15 yıllık sektör deneyimi ve 1000'den fazla proje",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/tr/hesaplayici/" className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600">
              Fiyat hesapla
            </Link>
            <Link href="/tr/quote/" className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50">
              Yazılı teklif iste
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            <a href="mailto:arled@arledscreen.com" className={a}>arled@arledscreen.com</a> ·{" "}
            <a href="tel:+905305078834" className={a}>+90 530 507 88 34</a> ·{" "}
            <Link href="/tr/bolgeler/istanbul/" className={a}>İstanbul</Link> ·{" "}
            <Link href="/tr/p2-5-led-ekran/" className={a}>P2.5</Link> ·{" "}
            <Link href="/tr/p4-led-ekran/" className={a}>P4</Link> ·{" "}
            <Link href="/tr/p5-led-ekran/" className={a}>P5</Link> ·{" "}
            <Link href="/tr/products/gob-led-ekran/p1-25-gob/" className={a}>P1.25 GOB</Link>
          </p>
        </div>
      </section>
    </>
  );
}
