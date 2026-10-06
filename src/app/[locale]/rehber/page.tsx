import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { HomeFaq } from "@/components/home/HomeFaq";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getSeoGuideHub, listSeoGuides } from "@/content/seo-guides";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const REHBER_HUB_FAQS = [
  {
    question: "LED ekran fiyatı rehberlerden sonra nereden okunur?",
    answer:
      "Yayımlanmış panel listesi (2026 panel USD) LED ekran fiyatları sayfası ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır (KDV/nakliye hariç; ücretsiz kargo yok). Hesaplayıcı: https://arledscreen.com/tr/hesaplayici/. Nihai tutar keşif sonrası yazılı teklifle kesinleşir.",
  },
  {
    question: "Hangi rehber list fiyatı ile yazılı teklif farkını açıklar?",
    answer:
      "https://arledscreen.com/tr/rehber/kiralik-mi-satin-alma/ sayfası list fiyatı olan paneller ile şeffaf/esnek/poster/kiralık + Huidu/NovaStar/Colorlight kontrol (yazılı teklifle) ayrımını tarif eder. Kontrol kartına list USD uydurulmaz; kontrol bedeli liste fiyatı değildir.",
  },
  {
    question: "Rehberlerden sonra teklif nasıl alınır?",
    answer:
      "Ölçü, ortam ve kullanım amacını https://arledscreen.com/tr/quote/ üzerinden paylaşın. Panel bandı LED ekran fiyatları sayfasında; iade/garanti teklifte (quote-and-contract) yazılır.",
  },
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const hub = getSeoGuideHub(locale);
  return buildPageMetadata({
    locale,
    path: "/rehber",
    // ar/ru guide pages show the English text: canonical → EN, hreflang only tr/en.
    canonicalLocale: locale === "ar" || locale === "ru" ? "en" : undefined,
    hreflangLocales: ["tr", "en"],
    title: hub.title,
    description: hub.description,
    keywords: [
      "LED ekran rehberi",
      "LED display guide",
      "ARLEDSCREEN",
      "NXTIONSTAR",
      "dijital ekran"],
  });
}

export default async function SeoGuideHubPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const hub = getSeoGuideHub(locale);
  const guides = listSeoGuides(locale);
  const dict = getDictionary(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          {
            name: hub.eyebrow,
            item: absoluteUrl(`/${locale}/rehber`),
          }]}
      />
      {locale === "tr" ? <FaqJsonLd faqs={REHBER_HUB_FAQS} /> : null}

      <Section
        titleAs="h1"
        eyebrow={hub.eyebrow}
        title={hub.h1}
        description={hub.intro}
        className="min-w-0 prose-seo"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.slug} href={`/${locale}/rehber/${g.slug}`} className="group">
              <GlassPanel className="h-full p-5 transition-colors group-hover:border-cyan/40">
                <h2 className="font-display text-lg font-bold text-ink group-hover:text-cyan">
                  {g.cardLabel}
                </h2>
                <p className="mt-2 text-sm text-ink-muted">{g.cardTeaser}</p>
              </GlassPanel>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cyan/25 bg-cyan/5 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">
            {locale === "tr"
              ? "Projeniz için teklif veya ürün kataloğu"
              : "Quote or product catalogue for your project"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            {locale === "tr"
              ? "Rehberleri okuduktan sonra ölçü ve ortam bilginizi paylaşın; Gaziosmanpaşa ekibi pitch ve güç özetiyle dönüş yapsın — nihai tutar yazılı teklifle."
              : "After the guides, share dimensions and environment — Gaziosmanpaşa replies with pitch and power outline; firm price is a written quote."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${locale}/quote`}>{dict.nav.quote}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/products`}>{dict.nav.products}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={"/tr/hesaplayici/"}>
                {dict.nav.priceCalculator}
              </Link>
            </Button>
          </div>
        </div>

        {locale === "tr" ? (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink">Sık sorulanlar</h2>
            <div className="mt-6">
              <HomeFaq faqs={REHBER_HUB_FAQS} />
            </div>
            <ShoppingLinkCloud
              excludeHref="/tr/rehber/"
              title="Rehber hub · fiyat ve kimlik kaynakları"
              extra={[
                { href: "/tr/rehber/kiralik-mi-satin-alma/", label: "List vs teklif rehberi" },
                { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" }]}
            />
          </div>
        ) : null}
      </Section>
    </>
  );
}
