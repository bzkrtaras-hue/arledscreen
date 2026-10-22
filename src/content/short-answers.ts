/**
 * GEO paket 2 — answer-first "Kısa cevap / Short answer" blocks for the top
 * commercial pages. Every number is derived from PANEL_PRICES / CALC_EXTRAS
 * (owner-approved list) or from facts already published on the site:
 * delivery 3–21 days preparation + 1–14 days shipping, payment in all
 * currencies + installments, CE certified, shipping to Europe, Middle East
 * and the Balkans. Rental is 50 USD/m² per day, VAT included (Aras, 22.10.2026)
 * (15 Oct 2026), so no rental price is stated here. Do not add facts that
 * are not confirmed.
 */
import { PANEL_PRICES, PANELS_PER_M2, fmtUsd, type PanelPrice } from "@/content/prices";

/** Visible "Son güncelleme" date for the GEO blocks (ISO). */
export const GEO_REVIEWED = "2026-10-15";

type L = "tr" | "en";
const usd = (n: number, l: L) =>
  l === "en" ? n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : fmtUsd(n);
const int = (n: number, l: L) => Math.round(n).toLocaleString(l === "en" ? "en-US" : "tr-TR");

function range(ps: PanelPrice[]) {
  const vals = ps.map((p) => p.usd);
  const m2 = ps.filter((p) => !p.moduleMm).map((p) => p.usd * PANELS_PER_M2);
  return { lo: Math.min(...vals), hi: Math.max(...vals), m2lo: Math.min(...m2), m2hi: Math.max(...m2) };
}
const IC = PANEL_PRICES.filter((p) => p.use === "ic");
const DIS = PANEL_PRICES.filter((p) => p.use === "dis");
const GOB = PANEL_PRICES.filter((p) => p.surface === "GOB");
const STD_IC = IC.filter((p) => !p.surface);
const pitches = (ps: PanelPrice[]) => {
  const s = [...new Set(ps.map((p) => p.pitchMm))].sort((a, b) => a - b);
  return `P${s[0]} – P${s[s.length - 1]}`;
};

export function reviewedLabel(l: L, iso: string = GEO_REVIEWED): string {
  const d = new Date(iso + "T12:00:00Z");
  return l === "en"
    ? `Last updated: ${d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
    : `Son güncelleme: ${d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}`;
}

const DELIVERY_TR = "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir.";
const DELIVERY_EN = "Lead time is 3–21 days preparation + 1–14 days shipping.";
const PAY_TR = "Ödemede tüm para birimleri (TL, USD, EUR vb.) kabul edilir, taksit seçeneği vardır; ürünlerimiz CE sertifikalıdır.";
const PAY_EN = "We accept payment in all currencies (EUR, USD, TL and others), installments are available, and the products are CE certified.";

export type ShortAnswerKey = "fiyat" | "ic-mekan-led-ekran" | "dis-mekan-led-ekran" | "gob-led-ekran" | "kiralik-led-ekran" | "led-ekran-ihracat";

export function shortAnswer(key: ShortAnswerKey, l: L): string {
  const ic = range(IC), dis = range(DIS), gob = range(GOB), std = range(STD_IC);
  if (l === "tr") {
    switch (key) {
      case "fiyat":
        return `2026 listemizde iç mekân LED ekran panelleri ${usd(ic.lo, l)} – ${usd(ic.hi, l)} USD, dış mekân panelleri ${usd(dis.lo, l)} – ${usd(dis.hi, l)} USD'dir (panel başına, KDV ve nakliye hariç). Yalnızca modül bedeli m² başına yaklaşık ${int(ic.m2lo, l)} – ${int(ic.m2hi, l)} USD (iç mekân) ve ${int(dis.m2lo, l)} – ${int(dis.m2hi, l)} USD (dış mekân) tutar. Kiralık LED ekranda fiyat günlük 50 USD/m², KDV dahil. ${DELIVERY_TR} ${PAY_TR}`;
      case "ic-mekan-led-ekran":
        return `İç mekân LED ekran ${pitches(IC)} piksel aralığında sunulur; panel fiyatı ${usd(ic.lo, l)} – ${usd(ic.hi, l)} USD, yalnızca modül bedeli m² başına yaklaşık ${int(ic.m2lo, l)} – ${int(ic.m2hi, l)} USD'dir (KDV ve nakliye hariç). Yakın izleme için P1.25 – P1.86 GOB, orta mesafe için P2.5 – P4 seçilir; pratik kural her 1 mm piksel aralığı için yaklaşık 1 m izleme mesafesidir. ${DELIVERY_TR}`;
      case "dis-mekan-led-ekran":
        return `Dış mekân LED ekran ${pitches(DIS)} piksel aralığında sunulur; panel fiyatı ${usd(dis.lo, l)} – ${usd(dis.hi, l)} USD, yalnızca modül bedeli m² başına yaklaşık ${int(dis.m2lo, l)} – ${int(dis.m2hi, l)} USD'dir (KDV ve nakliye hariç). Cephe ve totemde izleme mesafesine göre P2.5 – P5 seçilir; önden servisli P4 seçeneği de vardır. ${DELIVERY_TR}`;
      case "gob-led-ekran":
        return `GOB LED ekran, SMD modülün üzerine şeffaf koruyucu kaplama uygulanmış iç mekân ekranıdır; kaplama LED yüzeyini darbe, nem ve toza karşı korumaya yardımcı olur. NXTIONSTAR GOB panelleri ${pitches(GOB)} aralığında, panel başına ${usd(gob.lo, l)} – ${usd(gob.hi, l)} USD'dir; yalnızca modül bedeli m² başına yaklaşık ${int(gob.m2lo, l)} – ${int(gob.m2hi, l)} USD tutar (KDV ve nakliye hariç). Standart iç mekân SMD panelleri ise ${usd(std.lo, l)} – ${usd(std.hi, l)} USD'dir.`;
      case "led-ekran-ihracat":
        return `ARLEDSCREEN, NXTIONSTAR LED ekranları İstanbul'dan tüm Avrupa'ya, Orta Doğu'ya ve Balkanlar'a gönderir. Ürünler CE sertifikalıdır. Panel fiyatları USD'dir ve tüm dillerde aynıdır (iç mekân ${usd(ic.lo, l)} – ${usd(ic.hi, l)} USD, dış mekân ${usd(dis.lo, l)} – ${usd(dis.hi, l)} USD; panel başına, KDV ve nakliye hariç). Ödemede tüm para birimleri kabul edilir, taksit seçeneği vardır. ${DELIVERY_TR}`;
      case "kiralik-led-ekran":
        return "Kiralık LED ekran (iç ve dış mekân) için fiyat günlük 50 USD/m², KDV dahil; kurulum ve nakliye yalnızca İstanbul içinde dahildir, İstanbul dışında nakliye ayrıca planlanır. Depozito alınmaz; yurt dışına kiralama yapılmaz. Teklif için etkinlik tarihi, ekran ölçüsü ve lokasyonu paylaşmanız yeterlidir. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir; ödemede tüm para birimleri kabul edilir.";
    }
  }
  switch (key) {
    case "fiyat":
      return `In our 2026 list, indoor LED display panels cost USD ${usd(ic.lo, l)} – ${usd(ic.hi, l)} and outdoor panels USD ${usd(dis.lo, l)} – ${usd(dis.hi, l)} (per panel, excl. VAT and shipping). Module cost alone is about USD ${int(ic.m2lo, l)} – ${int(ic.m2hi, l)} per m² indoor and USD ${int(dis.m2lo, l)} – ${int(dis.m2hi, l)} per m² outdoor. Rental LED is 50 USD/m² per day, VAT included. Prices are listed in USD; ${PAY_EN.charAt(0).toLowerCase() + PAY_EN.slice(1)} ${DELIVERY_EN} We ship to Europe, the Middle East and the Balkans.`;
    case "ic-mekan-led-ekran":
      return `Indoor LED displays come in ${pitches(IC)} pixel pitch; panels cost USD ${usd(ic.lo, l)} – ${usd(ic.hi, l)}, module cost alone about USD ${int(ic.m2lo, l)} – ${int(ic.m2hi, l)} per m² (excl. VAT and shipping). Choose P1.25 – P1.86 GOB for close viewing and P2.5 – P4 for medium distance; rule of thumb: about 1 m viewing distance per 1 mm pitch. ${DELIVERY_EN}`;
    case "dis-mekan-led-ekran":
      return `Outdoor LED displays come in ${pitches(DIS)} pixel pitch; panels cost USD ${usd(dis.lo, l)} – ${usd(dis.hi, l)}, module cost alone about USD ${int(dis.m2lo, l)} – ${int(dis.m2hi, l)} per m² (excl. VAT and shipping). For façades and totems, P2.5 – P5 is chosen by viewing distance; a front-service P4 option is available. ${DELIVERY_EN}`;
    case "gob-led-ekran":
      return `A GOB LED display is an indoor SMD module with a clear protective coating that helps protect the LED surface against impact, moisture and dust. NXTIONSTAR GOB panels come in ${pitches(GOB)} at USD ${usd(gob.lo, l)} – ${usd(gob.hi, l)} per panel; module cost alone is about USD ${int(gob.m2lo, l)} – ${int(gob.m2hi, l)} per m² (excl. VAT and shipping). Standard indoor SMD panels cost USD ${usd(std.lo, l)} – ${usd(std.hi, l)}.`;
    case "led-ekran-ihracat":
      return `ARLEDSCREEN ships its own NXTIONSTAR LED screens from Istanbul to all of Europe, the Middle East and the Balkans. Products are CE certified. Panel prices are in USD and identical in every language (indoor USD ${usd(ic.lo, l)} – ${usd(ic.hi, l)}, outdoor USD ${usd(dis.lo, l)} – ${usd(dis.hi, l)} per panel, excl. VAT and shipping). We accept payment in all currencies and installments are available. ${DELIVERY_EN}`;
    case "kiralik-led-ekran":
      return "Rental LED displays (indoor and outdoor) are 50 USD/m² per day, VAT included; installation and shipping are included within Istanbul only, and outside Istanbul shipping is planned separately. No deposit; no rentals abroad. Share the event date, screen size and location to receive a quote. Lead time is 3–21 days preparation + 1–14 days shipping; we accept payment in all currencies.";
  }
}

/** Comparison rows for the price page (all values derived from PANEL_PRICES). */
export function comparisonRows(l: L) {
  const ic = range(STD_IC), dis = range(DIS), gob = range(GOB);
  const t = (tr: string, en: string) => (l === "tr" ? tr : en);
  return [
    { type: t("İç mekân (SMD)", "Indoor (SMD)"), pitch: pitches(STD_IC), panel: `${usd(ic.lo, l)} – ${usd(ic.hi, l)}`, m2: `≈ ${int(ic.m2lo, l)} – ${int(ic.m2hi, l)}`, use: t("Mağaza, toplantı salonu, salon", "Retail, meeting rooms, venues") },
    { type: t("İç mekân GOB", "Indoor GOB"), pitch: pitches(GOB), panel: `${usd(gob.lo, l)} – ${usd(gob.hi, l)}`, m2: `≈ ${int(gob.m2lo, l)} – ${int(gob.m2hi, l)}`, use: t("Yakın izleme, kontrol odası, temas riski olan alanlar", "Close viewing, control rooms, touch-risk areas") },
    { type: t("Dış mekân", "Outdoor"), pitch: pitches(DIS), panel: `${usd(dis.lo, l)} – ${usd(dis.hi, l)}`, m2: `≈ ${int(dis.m2lo, l)} – ${int(dis.m2hi, l)}`, use: t("Cephe, totem, vitrin, açık alan", "Façades, totems, shop windows, open air") },
    { type: t("Kiralık (iç / dış)", "Rental (indoor / outdoor)"), pitch: "—", panel: "—", m2: t("Yazılı teklif", "Written quote"), use: t("Konser, fuar, lansman, düğün", "Concerts, fairs, launches, weddings") },
  ];
}

/** "At a glance" facts for the export guide (confirmed facts only; same in TR/EN). */
export function exportFacts(l: L): { k: string; v: string }[] {
  const t = (tr: string, en: string) => (l === "tr" ? tr : en);
  return [
    { k: t("Gönderim bölgeleri", "Ships to"), v: t("Avrupa, Orta Doğu, Balkanlar", "Europe, Middle East, Balkans") },
    { k: t("Satıcı", "Seller"), v: t("ARLEDSCREEN, İstanbul (NXTIONSTAR markası)", "ARLEDSCREEN, Istanbul (NXTIONSTAR brand)") },
    { k: t("Sertifika", "Certification"), v: t("CE sertifikalı", "CE certified") },
    { k: t("Fiyat", "Prices"), v: t("USD, panel başına, KDV ve nakliye hariç; tüm dillerde aynı", "USD per panel, excl. VAT and shipping; same in every language") },
    { k: t("Ödeme", "Payment"), v: t("Tüm para birimleri; taksit seçeneği", "All currencies; installments available") },
    { k: t("Teslim süresi", "Lead time"), v: t("3–21 gün hazırlık + 1–14 gün nakliye", "3–21 days preparation + 1–14 days shipping") },
    { k: t("Teklif", "Quote"), v: t("Yazılı teklif; nakliye ayrıca", "Written quote; shipping quoted separately") },
  ];
}
