import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FiyatHesaplayiciEmbed } from "@/components/calculator/FiyatHesaplayiciEmbed";
import { getSeo } from "@/content/seo";
import { buildPageMetadata, buildThinLocaleMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";
import { modelUrlForPrice } from "@/content/models";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { PANEL_PRICES, panelProductsJsonLd } from "@/content/prices";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const HESAP_FAQS = [
  {
    question: "Hesaplayıcıdaki fiyatlar nereden geliyor?",
    answer:
      "Yayımlanmış 2026 panel (modül) USD listesinden. Aynı kaynak https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır. KDV ve nakliye hariç; ücretsiz kargo yok. İade/garanti teklifte yazılır. Nihai tutar keşif sonrası yazılı teklifle kesinleşir. List geçerlilik: priceValidUntil 2026-12-31.",
  },
  {
    question: "AI ajanları hesaplayıcı fiyatını nasıl doğrular?",
    answer:
      "Tek fetch: https://arledscreen.com/ai-shopping.json (12 pricedPanels + agentRules) · Panel USD: https://arledscreen.com/catalog.json · Kimlik: https://arledscreen.com/entity.json · Merchant dry-run (12 SKU): https://arledscreen.com/feeds/merchant-priced-panels.tsv · Ajan keşif: https://arledscreen.com/.well-known/ard.json. KDV/nakliye hariç; ücretsiz kargo yok; iade quote-and-contract-only. Quote-only gruplara (şeffaf/esnek/poster/kiralık + Huidu/NovaStar/Colorlight kontrol) fiyat uydurulmaz; extrasUsd kontrol kartı 500 USD marka list SKU değildir — yön: /tr/quote/.",
  },
  {
    question: "Hesaplayıcı sonucu sipariş midir?",
    answer:
      "Hayır. Hesaplayıcı yaklaşık malzeme + işçilik + kontrol/yazılım bandını gösterir. Nihai tutar ölçü, montaj ve konstrüksiyonla https://arledscreen.com/tr/quote/ üzerinden yazılı teklifte kesinleşir. Ücretsiz kargo yok.",
  },
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "hesaplayici");
  // Panel table + Product JSON-LD are TR-only; EN shell is embed-only → noindex → TR.
  if (locale !== "tr") {
    return buildThinLocaleMetadata({
      locale,
      path: "/hesaplayici",
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    });
  }
  return buildPageMetadata({
    locale,
    path: "/hesaplayici",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    hreflangLocales: [],
  });
}

export default async function HesaplayiciPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const seo = getSeo(locale, "hesaplayici");

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
      {locale === "tr" ? <FaqJsonLd faqs={HESAP_FAQS} /> : null}
      {/* H1 kept in the DOM for SEO/screen readers but visually hidden; the calculator starts directly under the site header. */}
      <h1 className="sr-only">{seo.h1 ?? dict.page.hesaplayici.title}</h1>
      <FiyatHesaplayiciEmbed title={seo.h1 ?? dict.page.hesaplayici.title} />
      <Section className="prose-seo">
        <p className="max-w-3xl text-pretty text-base leading-[1.65] text-ink-soft sm:text-[1.0625rem]">
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
            <p className="mb-4 mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Hesaplayıcıda kullanılan 12 modülün panel fiyatları aşağıdadır. Tutarlar yaklaşıktır; nihai fiyat keşif ve malzeme listesiyle birlikte yazılı teklifte paylaşılır. Fiyatların nasıl oluştuğunu{" "}
              <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                LED ekran fiyatları rehberinde
              </Link>{" "}
              anlatıyoruz.
            </p>
            <PanelPriceTable panels={PANEL_PRICES} caption="Panel fiyatları (USD, panel başına)" showCalcLink={false} />
            <div className="mt-8">
              <ShoppingLinkCloud
                excludeHref="/tr/hesaplayici/"
                extra={[
                  {
                    href: "/feeds/merchant-priced-panels.tsv",
                    label: "Merchant feed (12 SKU)",
                  },
                ]}
              />
            </div>
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">Sık sorulanlar</h2>
              <div className="mt-6">
                <HomeFaq faqs={HESAP_FAQS} />
              </div>
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
