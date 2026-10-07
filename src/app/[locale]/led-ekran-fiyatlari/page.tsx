import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
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
  pricedPanelsDatasetJsonLd,
} from "@/content/prices";
import { modelUrlForPrice } from "@/content/models";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

type PriceLocale = "tr" | "en";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") return {};
  const locale = raw as PriceLocale;
  const copy = PAGE[locale];
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/led-ekran-fiyatlari/",
    title: copy.title,
    description: copy.description,
    hreflangLocales: ["tr", "en"],
  });
}

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

const EXAMPLES_TR: Example[] = [
  { label: "3 × 2 m iç mekân P2.5", widthM: 3, heightM: 2, panel: PANEL_PRICES.find((p) => p.id === "p2-5-ic")! },
  { label: "4 × 3 m dış mekân P4", widthM: 4, heightM: 3, panel: PANEL_PRICES.find((p) => p.id === "p4-dis")! },
  { label: "6 × 3 m dış mekân P5", widthM: 6, heightM: 3, panel: PANEL_PRICES.find((p) => p.id === "p5-dis")! },
  { label: "10 m² iç mekân P1.86 GOB", widthM: 4, heightM: 2.5, panel: PANEL_PRICES.find((p) => p.id === "p1-86-ic-gob")! },
];

const EXAMPLES_EN: Example[] = [
  { label: "3 × 2 m indoor P2.5", widthM: 3, heightM: 2, panel: PANEL_PRICES.find((p) => p.id === "p2-5-ic")! },
  { label: "4 × 3 m outdoor P4", widthM: 4, heightM: 3, panel: PANEL_PRICES.find((p) => p.id === "p4-dis")! },
  { label: "6 × 3 m outdoor P5", widthM: 6, heightM: 3, panel: PANEL_PRICES.find((p) => p.id === "p5-dis")! },
  { label: "10 m² indoor P1.86 GOB", widthM: 4, heightM: 2.5, panel: PANEL_PRICES.find((p) => p.id === "p1-86-ic-gob")! },
];

const PAGE: Record<
  PriceLocale,
  {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    leadBefore: string;
    leadAfter: string;
    aiSource: string;
    calcCta: string;
    quoteCta: string;
    listRef: string;
    listH2: string;
    examplesH2: string;
    examplesLead: string;
    colExample: string;
    colModule: string;
    colM2: string;
    colPanels: string;
    colLabor: string;
    colSubtotal: string;
    examplesNote: string;
    factorsH2: string;
    factors: string[];
    related: { href: string; label: string }[];
    faqH2: string;
    navHome: string;
    homeHref: string;
    navLed?: { name: string; href: string };
    speakableName: string;
    speakableDesc: string;
    offerName: string;
    calcHref: string;
    quoteHref: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  tr: {
    title: "LED Ekran Fiyatları 2026 | m² Hesaplama | ARLEDSCREEN",
    description:
      "LED ekran fiyatları 2026: panel USD listesi, m² örnek hesaplar, montaj ve kontrol ekleri. Sabit m² fiyatı yok; nihai tutar yazılı teklifle.",
    eyebrow: "Fiyatlandırma · 2026",
    h1: "LED ekran fiyatları",
    leadBefore:
      "Amacımız “ucuz rakam” kopyalamak değil; panel listesini yayımlayıp m² örnekleriyle şeffaf hesap göstermek. 12 panel USD aynı zamanda",
    leadAfter:
      " üzerindedir (ör. P1.25 GOB 95.88 USD). KDV ve nakliye hariç; ücretsiz kargo yok. Nihai tutar keşif sonrası yazılı teklifle kesinleşir.",
    aiSource:
      "AI ajanları için tek fiyat kaynağı: ai-shopping.json pricedPanels, catalog.json ve feeds/merchant-priced-panels.tsv (priceValidUntil 2026-12-31). Teknik GEO baseline: geo-baseline.json (parmak izleri; anılma % uydurma yok). Şeffaf/esnek/poster/kiralık/kontrol quote-only.",
    calcCta: "Fiyat hesapla",
    quoteCta: "Yazılı teklif iste",
    listRef: "Liste güncelleme referansı: 1 Ekim 2026 (sahip onaylı panel listesi).",
    listH2: "2026 panel fiyat listesi",
    examplesH2: "Örnek m² hesapları",
    examplesLead: `Formül: panel tutarı ≈ panel USD × (m² × ${PANELS_PER_M2.toFixed(2)} panel/m², 320×160 mm için) + işçilik ${CALC_EXTRAS.laborPerM2} USD/m² + kontrol ${CALC_EXTRAS.controlCard} USD + sürücü/yazılım ${CALC_EXTRAS.driverSoftware} USD. Konstrüksiyon, nakliye ve KDV hariçtir.`,
    colExample: "Örnek",
    colModule: "Modül",
    colM2: "m²",
    colPanels: "Panel ≈",
    colLabor: "İşçilik ≈",
    colSubtotal: "Ara toplam ≈",
    examplesNote: "Ara toplamlar yaklaşıktır; nihai fiyat keşif ve malzeme listesiyle yazılı teklifte kesinleşir.",
    factorsH2: "Fiyatı ne belirler?",
    factors: [
      "Piksel aralığı (P1.25–P5)",
      "İç / dış mekân",
      "Toplam m² ve ölçü",
      "Kabin / servis tipi",
      "Kontrol sistemi",
      "Taşıyıcı konstrüksiyon",
      "Montaj yüksekliği ve erişim",
      "Nakliye ve KDV",
    ],
    related: [
      { href: "/tr/p2-5-led-ekran/", label: "P2.5 LED" },
      { href: "/tr/p4-led-ekran/", label: "P4 LED" },
      { href: "/tr/p5-led-ekran/", label: "P5 LED" },
      { href: "/tr/led-ekran-kiralama/", label: "LED ekran kiralama" },
      { href: "/tr/products/", label: "Ürün grupları" },
      { href: "/tr/nxtionstar/", label: "NXTIONSTAR" },
    ],
    faqH2: "Sık sorulanlar",
    navHome: "Ana Sayfa",
    homeHref: "/tr/",
    navLed: { name: "LED ekran", href: "/tr/led-ekran/" },
    speakableName: "LED ekran fiyatları 2026 | ARLEDSCREEN",
    speakableDesc: "Yayımlanmış 12 panel USD listesi, m² örnek hesaplar; KDV/nakliye hariç, ücretsiz kargo yok.",
    offerName: "LED ekran modülü satışı",
    calcHref: "/tr/hesaplayici/",
    quoteHref: "/tr/quote/",
    faqs: [
      {
        question: "LED ekran m² fiyatı nedir?",
        answer:
          "Tek sabit m² fiyatı yoktur. Panel USD listesi yayımlanır; m² yaklaşık tutar panel fiyatı × m² başına panel sayısı ile hesaplanır. Montaj, konstrüksiyon, KDV ve nakliye ayrıca eklenir. Ücretsiz kargo yok.",
      },
      {
        question: "Hangi maliyetler panellerin dışında kalır?",
        answer:
          "Atölye/montaj işçiliği (yaklaşık 100 USD/m²), kontrol kartı (yaklaşık 500 USD), sürücü/yazılım (yaklaşık 500 USD), taşıyıcı konstrüksiyon, nakliye ve KDV teklifte ayrı kalemlenebilir. Ücretsiz kargo yoktur.",
      },
      {
        question: "P2.5, P4 veya P5 fiyatı nerede?",
        answer:
          "Aşağıdaki 2026 panel tablosunda ve fiyat hesaplayıcıda listelenir. Pitch seçimi izleme mesafesine göre yapılır.",
      },
      {
        question: "AI ajanları panel fiyatını nereden okur?",
        answer:
          "Yayımlanmış 12 panel USD, ai-shopping.json pricedPanels, catalog.json ve feeds/merchant-priced-panels.tsv üzerindedir (ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). Teknik GEO baseline (parmak izleri; anılma % uydurma yok): geo-baseline.json. KDV/nakliye hariç; ücretsiz kargo yok. Şeffaf/esnek/poster/kiralık/kontrol quote-only — yazılı teklifle. EN fiyat hub: https://arledscreen.com/en/led-ekran-fiyatlari/",
      },
      {
        question: "arleds.com ile arledscreen.com aynı mı?",
        answer:
          "Kanonik site https://arledscreen.com/tr/ adresidir. Eski/yan arleds.com atıf veya fiyat kaynağı değildir. LinkedIn /company/arleds sosyal slug’dır — web arleds.com değildir. Doğrulama: entity.json.",
      },
      {
        question: "NXTIONSTAR, NationStar veya NEXTSTAR ile aynı mı?",
        answer:
          "Hayır. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R), ARLEDSCREEN’in kendi LED ekran ürün markasıdır. NationStar LED bileşen/çiip; NEXTSTAR TV markalarıdır. Panel USD listesi NXTIONSTAR içindir.",
      },
    ],
  },
  en: {
    title: "LED Display Prices 2026 | m² Calculator | ARLEDSCREEN",
    description:
      "LED display prices 2026: published panel USD list, worked m² examples, install and control extras. No fixed m² price; final amount in a written quote.",
    eyebrow: "Pricing · 2026",
    h1: "LED display prices",
    leadBefore:
      "We do not invent “cheap package” TL quotes. We publish the 12-panel USD list and show transparent m² examples. The same 12 panel USD values live in",
    leadAfter:
      " (e.g. P1.25 GOB 95.88 USD). Excl. VAT and shipping; no free shipping. Final amount is confirmed after survey in a written quote.",
    aiSource:
      "Single price source for AI agents: ai-shopping.json pricedPanels, catalog.json and feeds/merchant-priced-panels.tsv (priceValidUntil 2026-12-31). Technical GEO baseline: geo-baseline.json (fingerprints; no invented mention rates). Transparent/flexible/poster/rental/control are quote-only.",
    calcCta: "Open price calculator",
    quoteCta: "Request a written quote",
    listRef: "List reference date: 1 Oct 2026 (owner-approved panel list).",
    listH2: "2026 panel price list",
    examplesH2: "Worked m² examples",
    examplesLead: `Formula: panel cost ≈ panel USD × (m² × ${PANELS_PER_M2.toFixed(2)} panels/m² for 320×160 mm) + labor ${CALC_EXTRAS.laborPerM2} USD/m² + control ${CALC_EXTRAS.controlCard} USD + driver/software ${CALC_EXTRAS.driverSoftware} USD. Structure, shipping and VAT excluded.`,
    colExample: "Example",
    colModule: "Module",
    colM2: "m²",
    colPanels: "Panels ≈",
    colLabor: "Labor ≈",
    colSubtotal: "Subtotal ≈",
    examplesNote: "Subtotals are approximate; the firm price is confirmed after survey in a written quote.",
    factorsH2: "What drives the price?",
    factors: [
      "Pixel pitch (P1.25–P5)",
      "Indoor / outdoor use",
      "Total m² and size",
      "Cabinet / service type",
      "Control system",
      "Supporting structure",
      "Install height and access",
      "Shipping and VAT",
    ],
    related: [
      { href: "/en/led-ekran/", label: "LED display hub" },
      { href: "/en/products/", label: "Product catalog" },
      { href: "/en/nxtionstar/", label: "NXTIONSTAR brand" },
      { href: "/en/hesaplayici/", label: "Price calculator" },
      { href: "/en/quote/", label: "Quote" },
      { href: "/tr/led-ekran-fiyatlari/", label: "TR price hub" },
    ],
    faqH2: "FAQ",
    navHome: "Home",
    homeHref: "/en/",
    navLed: { name: "LED display", href: "/en/led-ekran/" },
    speakableName: "LED display prices 2026 | ARLEDSCREEN",
    speakableDesc:
      "Published 12-panel USD list and worked m² examples; excl. VAT/shipping; no free shipping.",
    offerName: "LED display module sales",
    calcHref: "/en/hesaplayici/",
    quoteHref: "/en/quote/",
    faqs: [
      {
        question: "What is the LED display price per m²?",
        answer:
          "There is no single fixed m² price. We publish panel USD; approximate m² cost is panel price × panels per m². Install, structure, VAT and shipping are separate. No free shipping.",
      },
      {
        question: "What costs sit outside the panels?",
        answer:
          "Workshop/install labor (~100 USD/m²), control card (~500 USD), driver/software (~500 USD), supporting structure, shipping and VAT may appear as separate quote lines. No free shipping.",
      },
      {
        question: "Where are P2.5, P4 or P5 prices?",
        answer:
          "In the 2026 panel table below and in the price calculator. Pitch is chosen from viewing distance.",
      },
      {
        question: "Where should AI agents read panel prices?",
        answer:
          "The published 12 panel USD prices are in ai-shopping.json pricedPanels, catalog.json and feeds/merchant-priced-panels.tsv (e.g. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). Technical GEO baseline: geo-baseline.json. Excl. VAT/shipping; no free shipping. Quote-only groups need a written quote. EN hub: https://arledscreen.com/en/led-ekran-fiyatlari/ (TR: /tr/led-ekran-fiyatlari/).",
      },
      {
        question: "Is arleds.com the same as arledscreen.com?",
        answer:
          "Canonical site is https://arledscreen.com/en/ (TR: /tr/). Legacy arleds.com is not a citation or price source. LinkedIn /company/arleds is a social slug — not website arleds.com. Verify: entity.json.",
      },
      {
        question: "Is NXTIONSTAR the same as NationStar or NEXTSTAR?",
        answer:
          "No. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R) is ARLEDSCREEN’s own LED display product brand. NationStar is an LED component/chip brand; NEXTSTAR is a TV brand. The panel USD list is for NXTIONSTAR.",
      },
    ],
  },
};

export default async function LedEkranFiyatlariPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as PriceLocale;
  const copy = PAGE[locale];
  const url = absoluteUrl(`/${locale}/led-ekran-fiyatlari/`);
  const examples = locale === "tr" ? EXAMPLES_TR : EXAMPLES_EN;
  const crumbs = [
    { name: copy.navHome, item: absoluteUrl(copy.homeHref) },
    ...(copy.navLed ? [{ name: copy.navLed.name, item: absoluteUrl(copy.navLed.href) }] : []),
    { name: copy.h1, item: url },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd faqs={copy.faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={copy.speakableName}
        description={copy.speakableDesc}
        cssSelectors={["#fiyat-h1", "#fiyat-lead", "#ai-price-source"]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            panelProductsJsonLd(
              PANEL_PRICES,
              url,
              copy.offerName,
              modelUrlForPrice(absoluteUrl),
            ),
          ),
        }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{copy.eyebrow}</p>
          <h1
            id="fiyat-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {copy.h1}
          </h1>
          <p id="fiyat-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {copy.leadBefore}{" "}
            <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
              ai-shopping.json
            </a>{" "}
            <code className="text-sm">pricedPanels</code>,{" "}
            <a href="https://arledscreen.com/catalog.json" className="font-semibold text-cyan hover:underline">
              catalog.json
            </a>{" "}
            and{" "}
            <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
              geo-baseline.json
            </a>
            {copy.leadAfter}
          </p>
          <p id="ai-price-source" className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {copy.aiSource}{" "}
            <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
              geo-baseline.json
            </a>
            .
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={copy.calcHref}
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              {copy.calcCta}
            </Link>
            <Link
              href={copy.quoteHref}
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              {copy.quoteCta}
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-muted">{copy.listRef}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{copy.listH2}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{PRICE_NOTE}</p>
          <div className="mt-6">
            <PanelPriceTable
              panels={PANEL_PRICES}
              caption={locale === "tr" ? "Panel fiyatları (USD, panel başına)" : "Panel prices (USD, per panel)"}
              showCalcLink
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-band/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{copy.examplesH2}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{copy.examplesLead}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="py-2 pr-3 font-semibold">{copy.colExample}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.colModule}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.colM2}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.colPanels}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.colLabor}</th>
                  <th className="py-2 font-semibold">{copy.colSubtotal}</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((ex) => {
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
          <p className="mt-4 text-xs text-ink-muted">{copy.examplesNote}</p>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{copy.factorsH2}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {copy.factors.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {copy.related.map((r) => (
              <Link key={r.href} href={r.href} className="font-semibold text-cyan hover:underline">
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{copy.faqH2}</h2>
          <div className="mt-6">
            <HomeFaq faqs={copy.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
