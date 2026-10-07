import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { YiyistarGallery } from "@/components/projects/YiyistarGallery";
import { QuoteSplit } from "@/components/home/QuoteSplit";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/galeri",
  title: "LED Ekran Galeri | ARLEDSCREEN",
  description:
    "İç mekân, dış mekân, kavisli ve sinema LED ekran uygulama galerisi. Kategorilere göre düzenlenmiş saha ve referans görselleri.",
});

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Galeri", item: absoluteUrl("/tr/galeri/") },
        ]}
      />
      <SpeakableJsonLd
        pageUrl={absoluteUrl("/tr/galeri/")}
        name="Galeri"
        description="İç mekân, dış mekân, kavisli ve sinema LED ekran uygulama galerisi. Kategorilere göre düzenlenmiş saha görselleri."
        cssSelectors={["#galeri-h1", "#galeri-lead"]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricedPanelsDatasetJsonLd(absoluteUrl("/tr/galeri/"))),
        }}
      />

      <section className="bg-white pt-8 pb-2 sm:pt-10 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">
            Uygulama görselleri
          </p>
          <h1 id="galeri-h1" className="mt-2 font-display text-[clamp(1.85rem,1.4rem+1.8vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            Galeri
          </h1>
          <p id="galeri-lead" className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            Kullanım alanına göre gruplanmış LED ekran uygulamaları. Öne çıkan görselleri gezin;
            altta kategori başlıklarından ilgili bölüme geçin.
          </p>
          <AiPriceSourceNote className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted" />
        </div>
      </section>

      <Section className="prose-seo pt-6 sm:pt-8 md:pt-10" contained>
        <YiyistarGallery />
      </Section>

      <section className="bg-band py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuoteSplit title="Benzer bir uygulama mı planlıyorsunuz?" />
        </div>
      </section>
    </>
  );
}
