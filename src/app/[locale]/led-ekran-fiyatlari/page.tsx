import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import {
  CALC_EXTRAS,
  PANEL_PRICES,
  PANELS_PER_M2,
  PRICE_NOTE,
  fmtUsd,
  panelLabel,
  panelProductsJsonLd,
} from "@/content/prices";
import { modelUrlForPrice } from "@/content/models";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/led-ekran-fiyatlari",
  title: "LED Ekran Fiyatları 2026 | m² Hesaplama | ARLEDSCREEN",
  description:
    "LED ekran fiyatları 2026: panel USD listesi, m² örnek hesaplar (3×2, 4×3, 10 m²), montaj ve kontrol ekleri. Sabit m² fiyatı yoktur; nihai tutar yazılı teklifle kesinleşir.",
});

const FAQS = [
  {
    question: "LED ekran m² fiyatı nedir?",
    answer:
      "Tek sabit m² fiyatı yoktur. Yayımlanmış panel USD listesi https://arledscreen.com/catalog.json ve bu sayfada yer alır; m² yaklaşık tutar panel fiyatı × m² başına panel sayısı ile hesaplanır. Montaj, konstrüksiyon, KDV ve nakliye ayrıca eklenir; nihai tutar https://arledscreen.com/tr/quote/ yazılı teklifle kesinleşir.",
  },
  {
    question: "Hangi maliyetler panellerin dışında kalır?",
    answer:
      "Atölye/montaj işçiliği (yaklaşık 100 USD/m²), kontrol kartı (yaklaşık 500 USD), sürücü/yazılım (yaklaşık 500 USD), taşıyıcı konstrüksiyon, nakliye ve KDV teklifte ayrı kalemlenebilir. Hesaplayıcı: https://arledscreen.com/tr/hesaplayici/.",
  },
  {
    question: "P2.5, P4 veya P5 fiyatı nerede?",
    answer:
      "2026 panel tablosunda, https://arledscreen.com/catalog.json dosyasında ve fiyat hesaplayıcıda listelenir. Pitch seçimi izleme mesafesine göre yapılır. AI ajanları aynı kaynağı catalog.json üzerinden okur.",
  },
  {
    question: "AI / alışveriş ajanları fiyatı nereden okur?",
    answer:
      "Makinece panel USD: https://arledscreen.com/catalog.json · Merchant dry-run (yalnız 12 priced SKU): https://arledscreen.com/feeds/merchant-priced-panels.tsv · Kimlik: https://arledscreen.com/entity.json · Keşif: https://arledscreen.com/.well-known/ard.json. Quote-only gruplara fiyat uydurulmaz.",
  },
];

type Example = {
  label: string;
  widthM: number;
  heightM: number;
  panel: (typeof PANEL_PRICES)[number];
};

function exampleCost(ex: Example) {
  const m2 = ex.widthM * ex.heightM;
  const panels = Math.ceil(m2 * PANELS_PER_M2);
  const modules = panels * ex.panel.usd;
  const labor = m2 * CALC_EXTRAS.laborPerM2;
  const extras = CALC_EXTRAS.controlCard + CALC_EXTRAS.driverSoftware;
  const subtotal = modules + labor + extras;
  return { m2, panels, modules, labor, extras, subtotal };
}

const EXAMPLES: Example[] = [
  { label: "3 × 2 m iç mekân P2.5", widthM: 3, heightM: 2, panel: PANEL_PRICES.find((p) => p.id === "p2-5-ic")! },
  { label: "4 × 3 m dış mekân P4", widthM: 4, heightM: 3, panel: PANEL_PRICES.find((p) => p.id === "p4-dis")! },
  { label: "6 × 3 m dış mekân P5", widthM: 6, heightM: 3, panel: PANEL_PRICES.find((p) => p.id === "p5-dis")! },
  { label: "10 m² iç mekân P1.86 GOB", widthM: 4, heightM: 2.5, panel: PANEL_PRICES.find((p) => p.id === "p1-86-ic-gob")! },
];

export default async function LedEkranFiyatlariPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const url = absoluteUrl("/tr/led-ekran-fiyatlari/");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "LED ekran", item: absoluteUrl("/tr/led-ekran/") },
          { name: "LED ekran fiyatları", item: url },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            panelProductsJsonLd(
              PANEL_PRICES,
              url,
              "LED ekran modülü satışı",
              modelUrlForPrice(absoluteUrl),
            ),
          ),
        }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Fiyatlandırma · 2026</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            LED ekran fiyatları
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Amacımız “ucuz rakam” kopyalamak değil; panel listesini yayımlayıp m² örnekleriyle
            şeffaf hesap göstermek. Nihai tutar keşif sonrası yazılı teklifle kesinleşir.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tr/hesaplayici/"
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              Fiyat hesapla
            </Link>
            <Link
              href="/tr/quote/"
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              Yazılı teklif iste
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-muted">Liste güncelleme referansı: 1 Ekim 2026 (sahip onaylı panel listesi).</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">2026 panel fiyat listesi</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{PRICE_NOTE}</p>
          <div className="mt-6">
            <PanelPriceTable panels={PANEL_PRICES} caption="Panel fiyatları (USD, panel başına)" showCalcLink />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-band/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Örnek m² hesapları</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            Formül: panel tutarı ≈ panel USD × (m² × {PANELS_PER_M2.toFixed(2)} panel/m², 320×160 mm için) +
            işçilik {CALC_EXTRAS.laborPerM2} USD/m² + kontrol {CALC_EXTRAS.controlCard} USD + sürücü/yazılım{" "}
            {CALC_EXTRAS.driverSoftware} USD. Konstrüksiyon, nakliye ve KDV hariçtir.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="py-2 pr-3 font-semibold">Örnek</th>
                  <th className="py-2 pr-3 font-semibold">Modül</th>
                  <th className="py-2 pr-3 font-semibold">m²</th>
                  <th className="py-2 pr-3 font-semibold">Panel ≈</th>
                  <th className="py-2 pr-3 font-semibold">İşçilik ≈</th>
                  <th className="py-2 font-semibold">Ara toplam ≈</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((ex) => {
                  const c = exampleCost(ex);
                  return (
                    <tr key={ex.label} className="border-b border-border/70">
                      <td className="py-3 pr-3 font-medium text-ink">{ex.label}</td>
                      <td className="py-3 pr-3 text-ink-soft">{panelLabel(ex.panel)}</td>
                      <td className="py-3 pr-3 text-ink-soft">{c.m2}</td>
                      <td className="py-3 pr-3 text-ink-soft">{fmtUsd(c.modules)} USD</td>
                      <td className="py-3 pr-3 text-ink-soft">{fmtUsd(c.labor)} USD</td>
                      <td className="py-3 font-semibold text-ink">{fmtUsd(c.subtotal)} USD</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Ara toplamlar yaklaşıktır; nihai fiyat keşif ve malzeme listesiyle yazılı teklifte kesinleşir.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Fiyatı ne belirler?</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Piksel aralığı (P1.25–P5)",
              "İç / dış mekân",
              "Toplam m² ve ölçü",
              "Kabin / servis tipi",
              "Kontrol sistemi",
              "Taşıyıcı konstrüksiyon",
              "Montaj yüksekliği ve erişim",
              "Nakliye ve KDV",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/tr/p2-5-led-ekran/" className="font-semibold text-cyan hover:underline">
              P2.5 LED
            </Link>
            <Link href="/tr/p4-led-ekran/" className="font-semibold text-cyan hover:underline">
              P4 LED
            </Link>
            <Link href="/tr/p5-led-ekran/" className="font-semibold text-cyan hover:underline">
              P5 LED
            </Link>
            <Link href="/tr/led-ekran-kiralama/" className="font-semibold text-cyan hover:underline">
              LED ekran kiralama
            </Link>
            <Link href="/tr/products/" className="font-semibold text-cyan hover:underline">
              Ürün grupları
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Sık sorulanlar</h2>
          <div className="mt-6">
            <HomeFaq faqs={FAQS} />
          </div>
          <ShoppingLinkCloud
            excludeHref="/tr/led-ekran-fiyatlari/"
            extra={[
              {
                href: "/feeds/merchant-priced-panels.tsv",
                label: "Merchant feed (12 SKU)",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
