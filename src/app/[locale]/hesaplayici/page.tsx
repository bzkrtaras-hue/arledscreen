import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
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
              <Link href="/tr/rehber/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                LED ekran fiyatları rehberinde
              </Link>{" "}
              anlatıyoruz.
            </p>
            <PanelPriceTable panels={PANEL_PRICES} caption="Panel fiyatları (USD, panel başına)" showCalcLink={false} />
          </div>
        ) : null}
      </Section>
    </>
  );
}
