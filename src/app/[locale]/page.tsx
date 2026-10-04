import { BlogTeaser } from "@/components/home/BlogTeaser";
import type { Metadata } from "next";
import Script from "next/script";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Hero } from "@/components/hero/Hero";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getFaqs } from "@/content/faqs";
import { getSeo } from "@/content/seo";
import { buildPageMetadata } from "@/lib/seo";
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
import { CitationCapsule } from "@/components/seo/CitationCapsule";
import { HOME_CITATION } from "@/content/citation-capsules";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "home");
  return buildPageMetadata({
    locale,
    path: "/",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
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

  if (!tr) {
    return (
      <>
        <FaqJsonLd faqs={faqs} />
        <Hero locale={locale} />
        <BrandBand locale={locale} />
        <Section
          eyebrow={dict.sections.products.eyebrow}
          title={dict.sections.products.title}
          description={dict.sections.products.description}
          className="min-w-0 bg-surface/30 prose-seo"
        >
          <FeaturedProducts locale={locale} />
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

      {/* 1. Full-bleed video hero (H1) → 2. four gateway tiles → 3. grey values band */}
      <Hero locale={locale} />
      <GatewayTiles />
      <ValuesBand />
      <CitationCapsule {...HOME_CITATION} />

      {/* 4. Product groups (category tiles) */}
      <section id="urunler" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ürün grupları"
            title="Kullanım alanına göre LED ekran çözümleri"
            description="Ekran seçimi, kullanım amacı ve izleme mesafesiyle başlar. Size en yakın grubu seçin; seçenekleri, kullanım alanlarını ve ilgili projeleri inceleyin."
          />
          <ProductGroupGrid />
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
