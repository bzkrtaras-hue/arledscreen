import { BlogTeaser } from "@/components/home/BlogTeaser";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Hero } from "@/components/hero/Hero";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { getFaqs } from "@/content/faqs";
import { getSeo } from "@/content/seo";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { modelUrlForPrice } from "@/content/models";
import { PANEL_PRICES, panelProductsJsonLd } from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { CompletedProjectsGallery } from "@/components/projects/CompletedProjectsGallery";
import { ReferencesGrid } from "@/components/projects/ReferencesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { LearningHub } from "@/components/home/LearningHub";
import { HomeFaq } from "@/components/home/HomeFaq";
import { GatewayTiles } from "@/components/home/GatewayTiles";
import { ValuesBand } from "@/components/home/ValuesBand";
import { FeaturedReferences } from "@/components/home/FeaturedReferences";
import { AllReferencesNote } from "@/components/projects/AllReferencesNote";
import { BrandBand } from "@/components/home/BrandBand";
import { QuoteSplit } from "@/components/home/QuoteSplit";
import { ProductGroupGrid } from "@/components/products/ProductGroupGrid";
import { SectionHeading } from "@/components/ui/section-heading";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "home");
  // Only tr↔en share true home counterparts; ar/ru are thin → no hreflang.
  const hreflangLocales =
    locale === "tr" || locale === "en" ? (["tr", "en"] as Locale[]) : [];
  return buildPageMetadata({
    locale,
    path: "/",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    hreflangLocales,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const faqs = getFaqs(locale);
  const tr = locale === "tr";
  // Canlı Destek sohbet balonu (public/chat-widget.js): yalnızca TR ve EN ana sayfada, sayfa yüklendikten sonra.
  const chatWidget =
    locale === "tr" || locale === "en" ? (
      <Script src="/chat-widget.js" strategy="lazyOnload" data-locale={locale} />
    ) : null;

  const seo = getSeo(locale, "home");

  if (!tr) {
    return (
      <>
        <FaqJsonLd faqs={faqs} />
        {locale === "en" ? (
          <>
            <SpeakableJsonLd
              pageUrl={absoluteUrl("/en/")}
              name={seo.h1 ?? "ARLEDSCREEN"}
              description={seo.description}
              cssSelectors={["#home-h1", "#home-lead"]}
              mainEntity={{ "@id": `${absoluteUrl("/en/")}#service` }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  panelProductsJsonLd(
                    PANEL_PRICES,
                    absoluteUrl("/en/"),
                    "LED display module sales, survey and installation",
                    modelUrlForPrice(absoluteUrl),
                    "en",
                  ),
                ),
              }}
            />
          </>
        ) : null}
        <div className="-mt-[6.75rem] md:-mt-[7.5rem]">
          <Hero locale={locale} />
        </div>
        <BrandBand locale={locale} />
        <Section
          eyebrow={dict.sections.products.eyebrow}
          title={dict.sections.products.title}
          description={dict.sections.products.description}
          className="min-w-0 bg-surface/30 prose-seo"
        >
          <FeaturedProducts locale={locale} />
          {locale === "en" ? (
            <div id="panel-prices" className="mt-10">
              <AiPriceSourceNote locale="en" lead="Published panel USD:" className="mb-3 text-sm leading-relaxed text-ink-muted" />
              <PanelPriceTable
                locale="en"
                panels={PANEL_PRICES}
                caption="Panel prices (USD, per panel)"
              />
            </div>
          ) : null}
        </Section>
        <Section
          id="projeler"
          eyebrow={dict.sections.projects.eyebrow}
          title={dict.sections.projects.title}
          description={dict.sections.projects.description}
          className="min-w-0 prose-seo"
        >
          <CompletedProjectsGallery locale={locale} />
        </Section>
        <Section
          id="referanslar"
          eyebrow={dict.sections.references.eyebrow}
          title={dict.sections.references.title}
          description={dict.sections.references.description}
          className="min-w-0 bg-surface/30 prose-seo"
        >
          <ReferencesGrid locale={locale} />
        </Section>
        <Section className="min-w-0 border-t border-border prose-seo">
          <AboutPreview locale={locale} />
        </Section>
        <HomeCtaBand locale={locale} />
        <Section
          id="sss"
          eyebrow={dict.sections.faq.eyebrow}
          title={dict.sections.faq.title}
          className="min-w-0 border-t border-border prose-seo"
        >
          <HomeFaq faqs={faqs} />
        </Section>
        {chatWidget}
      </>
    );
  }

  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={absoluteUrl("/tr/")}
        name={seo.h1 ?? "ARLEDSCREEN LED Ekran"}
        description={seo.description}
        cssSelectors={["#home-h1", "#home-lead"]}
        mainEntity={{ "@id": `${absoluteUrl("/tr/")}#service` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            panelProductsJsonLd(
              PANEL_PRICES,
              absoluteUrl("/tr/"),
              "LED ekran modülü satışı, keşif ve montaj",
              modelUrlForPrice(absoluteUrl),
            ),
          ),
        }}
      />

      {/* 1. Full-bleed video hero under liquid-glass chrome → 2. gateway tiles → 3. values */}
      <div className="-mt-[6.75rem] md:-mt-[7.5rem]">
        <Hero locale={locale} />
      </div>
      <GatewayTiles />
      <ValuesBand />

      {/* 4. Product groups (category tiles) */}
      <section id="urunler" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ürün grupları"
            title="Kullanım alanına göre LED ekran çözümleri"
            description="Ekran seçimi, kullanım amacı ve izleme mesafesiyle başlar. Size en yakın grubu seçin; seçenekleri, kullanım alanlarını ve ilgili projeleri inceleyin."
          />
          <ProductGroupGrid mobileStrip />
          <p className="mt-8 text-sm text-ink-muted">
            Fiyat için{" "}
            <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
              LED ekran fiyatları rehberi
            </Link>
            ,{" "}
            <Link href="/tr/products/dis-mekan-led-ekran/" className="font-semibold text-cyan hover:underline">
              dış mekân LED ekran
            </Link>{" "}
            veya{" "}
            <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">
              fiyat hesaplayıcı
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 4b. Published panel USD — below hero; agents + buyers share one source */}
      <section id="panel-fiyatlari" className="border-t border-border bg-band/40 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Panel fiyatları"
            title="2026 NXTIONSTAR panel USD listesi"
            description="Yayımlanmış 12 panel. KDV/nakliye hariç; ücretsiz kargo yok. Nihai tutar keşif ve yazılı teklifle kesinleşir."
          />
          <AiPriceSourceNote lead="Not:" className="mb-4 max-w-3xl text-sm leading-relaxed text-ink-muted" />
          <PanelPriceTable panels={PANEL_PRICES} caption="Panel fiyatları (USD, panel başına)" />
        </div>
      </section>

      {/* 5. References: featured project + record cards */}
      <section id="referanslar" className="border-t border-border bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={dict.sections.references.eyebrow}
            title={dict.sections.references.title}
            description="Yakın süreçte tamamladığımız projelerden bir seçki."
          />
          <FeaturedReferences />
          <AllReferencesNote />
        </div>
      </section>

      {/* 6. Rounded brand band */}
      <BrandBand locale={locale} />

      <Section
        id="surec"
        eyebrow="Çalışma süreci"
        title="Projeniz beş adımda ilerler"
        description="Her adımda neyin yapılacağını ve sizden hangi bilginin gerektiğini baştan paylaşıyoruz."
        className="min-w-0 bg-band prose-seo"
      >
        <ProcessSteps />
      </Section>

      <Section
        id="rehber"
        eyebrow="Öğrenme merkezi"
        title="Karar vermeden önce öğrenin"
        description="Piksel aralığı, iç ve dış mekân farkları, salon ve vitrin uygulamaları hakkında sade rehberler."
        className="min-w-0 prose-seo"
      >
        <LearningHub />
      </Section>

      <Section
        id="blogdan"
        eyebrow="Blogdan"
        title="Son projeler ve paylaşımlar"
        description="Tamamladığımız LED ekran projelerinden ve kurulum süreçlerinden güncel notlar."
        className="min-w-0 bg-band prose-seo"
      >
        <BlogTeaser />
      </Section>

      {/* Split quote card (blue info panel + short form) */}
      <section id="hizli-iletisim" className="bg-band py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuoteSplit />
        </div>
      </section>

      <Section
        id="sss"
        eyebrow={dict.sections.faq.eyebrow}
        title={dict.sections.faq.title}
        className="min-w-0 prose-seo"
      >
        <HomeFaq faqs={faqs} />
      </Section>
      {chatWidget}
    </>
  );
}
