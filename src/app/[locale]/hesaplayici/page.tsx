import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { HowToJsonLd } from "@/components/seo/HowToJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { FiyatHesaplayiciEmbed } from "@/components/calculator/FiyatHesaplayiciEmbed";
import { getSeo } from "@/content/seo";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";
import { modelUrlForPrice } from "@/content/models";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { PANEL_PRICES, panelProductsJsonLd } from "@/content/prices";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "hesaplayici");
  return buildPageMetadata({
    locale,
    path: "/hesaplayici",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  });
}

export default async function HesaplayiciPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const seo = getSeo(locale, "hesaplayici");
  const pageUrl = absoluteUrl(`/${locale}/hesaplayici/`);
  const howToTr = locale === "tr";
  const howToEn = locale === "en";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          {
            name: dict.nav.priceCalculator,
            item: absoluteUrl(`/${locale}/hesaplayici`),
          },
        ]}
      />
      {(howToTr || howToEn) && (
        <SpeakableJsonLd
          pageUrl={pageUrl}
          name={seo.h1 ?? dict.page.hesaplayici.title}
          description={seo.description}
          cssSelectors={["#hesap-h1", "#hesap-lead"]}
          mainEntity={{ "@id": `${pageUrl}#service` }}
        />
      )}
      {howToTr ? (
        <HowToJsonLd
          citePriceDatasets
          name="LED ekran yaklaşık fiyatı nasıl hesaplanır?"
          description="ARLEDSCREEN'in yayımladığı 12 panel fiyatı ve hesaplayıcı ile yaklaşık maliyet; KDV/nakliye hariç, ücretsiz kargo yok; nihai tutar yazılı teklifle."
          steps={[
            {
              name: "İç veya dış mekân ve piksel aralığı",
              text: "İzleme mesafesine göre iç/dış mekân ve P değeri seçin (ör. yakın izleme P1.25–P1.86 GOB; cephe için daha büyük P).",
            },
            {
              name: "Ölçüyü girin",
              text: "Ekran genişlik × yükseklik (m) bilgisiyle m² ve yaklaşık panel adedini hesaplayıcıda görün.",
            },
            {
              name: "Panel fiyat listesini inceleyin",
              text: "12 SKU ai-shopping.json pricedPanels, catalog.json ve merchant TSV ile aynıdır (ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). Teknik GEO baseline: geo-baseline.json.",
            },
            {
              name: "Ek kalemleri ayırın",
              text: "İşçilik, kontrol kartı, sürücü/yazılım, konstrüksiyon, nakliye ve KDV panel fiyatına dahil değildir; ücretsiz kargo yoktur.",
            },
            {
              name: "Yazılı teklif isteyin",
              text: "Keşif sonrası malzeme listesi ve nihai tutar yalnızca yazılı teklifte kesinleşir. Şeffaf, esnek, poster ve kontrol ürünlerinde fiyat yazılı teklifle verilir. İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir.",
            },
          ]}
        />
      ) : null}
      {howToEn ? (
        <HowToJsonLd
          citePriceDatasets
          name="How to estimate an LED wall price with ARLEDSCREEN"
          description="Use the 12 published panel prices and the calculator for planning totals. VAT and freight excluded; no free shipping; final price only in the written quote."
          steps={[
            {
              name: "Pick indoor/outdoor and pitch",
              text: "Choose use case and pixel pitch from viewing distance (e.g. fine pitch GOB for close viewing; larger pitch for façades).",
            },
            {
              name: "Enter dimensions",
              text: "Enter width × height (m) in the calculator to see approximate area and module count.",
            },
            {
              name: "See the published panel prices",
              text: "The same 12 SKUs are in ai-shopping.json pricedPanels, catalog.json and merchant TSV (e.g. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). Technical GEO baseline: geo-baseline.json.",
            },
            {
              name: "Separate extras",
              text: "Labor, control card, driver/software, structure, freight and VAT are not in the panel price; there is no free shipping.",
            },
            {
              name: "Request a written quote",
              text: "After survey, the bill of materials and final total are confirmed only in writing. Transparent, flexible, poster and control products are priced by written quote. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
            },
          ]}
        />
      ) : null}
      {/* H1 kept in the DOM for SEO/screen readers but visually hidden; the calculator starts directly under the site header. */}
      <h1 id="hesap-h1" className="sr-only">
        {seo.h1 ?? dict.page.hesaplayici.title}
      </h1>
      <FiyatHesaplayiciEmbed
        title={seo.h1 ?? dict.page.hesaplayici.title}
        locale={locale}
      />
      <Section className="prose-seo">
        <p
          id="hesap-lead"
          className="max-w-3xl text-pretty text-base leading-[1.65] text-ink-soft sm:text-[1.0625rem]"
        >
          {seo.intro ?? dict.page.hesaplayici.description}
        </p>
        {locale === "tr" ? (
          <div id="panel-fiyatlari" className="mt-10 scroll-mt-28">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  panelProductsJsonLd(PANEL_PRICES, absoluteUrl("/tr/hesaplayici/"), "LED ekran modülü satışı, keşif ve montaj", modelUrlForPrice(absoluteUrl)),
                ),
              }}
            />
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">2026 panel fiyat listesi</h2>
            <p className="mb-2 mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Hesaplayıcıda kullanılan 12 modülün panel fiyatları aşağıdadır.
            </p>
            <AiPriceSourceNote className="mb-2 max-w-3xl text-sm leading-relaxed text-ink-muted" />
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Tutarlar yaklaşıktır; nihai fiyat keşif ve malzeme listesiyle yazılı teklifte paylaşılır. Fiyatların
              nasıl oluştuğunu{" "}
              <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                LED ekran fiyatları rehberinde
              </Link>{" "}
              anlatıyoruz.
            </p>
            <PanelPriceTable panels={PANEL_PRICES} caption="Panel fiyatları (USD, panel başına)" showCalcLink={false} />
          </div>
        ) : locale === "en" ? (
          <div id="panel-prices" className="mt-10 scroll-mt-28">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  panelProductsJsonLd(
                    PANEL_PRICES,
                    absoluteUrl("/en/hesaplayici/"),
                    "LED display module sales, survey and installation",
                    modelUrlForPrice(absoluteUrl),
                    "en",
                  ),
                ),
              }}
            />
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">2026 panel price list</h2>
            <p className="mb-2 mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
              The 12 modules used by this calculator.
            </p>
            <AiPriceSourceNote
              locale="en"
              className="mb-2 max-w-3xl text-sm leading-relaxed text-ink-muted"
              lead="Source:"
            />
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Amounts are approximate; the final price is set in the written quote after survey. See the{" "}
              <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                LED display prices page
              </Link>{" "}
              for worked m² examples.
            </p>
            <PanelPriceTable
              locale="en"
              panels={PANEL_PRICES}
              caption="Panel prices (USD, per panel)"
              showCalcLink={false}
            />
          </div>
        ) : null}
      </Section>
    </>
  );
}
