import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { YiyistarGallery } from "@/components/projects/YiyistarGallery";
import { QuoteSplit } from "@/components/home/QuoteSplit";
import { getFaqs } from "@/content/faqs";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

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
  if (raw === "en") {
    return buildPageMetadata({
      locale: "en" as Locale,
      path: "/galeri/",
      title: "LED Display Gallery | Indoor, Outdoor, Curved | ARLEDSCREEN",
      description:
        "LED install gallery: indoor, outdoor, curved and cinema applications. Field photos by category — ARLEDSCREEN / NXTIONSTAR, Istanbul.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/galeri/",
    title: "LED Ekran Galeri | ARLEDSCREEN",
    description:
      "İç mekân, dış mekân, kavisli ve sinema LED ekran uygulama galerisi. Kategorilere göre düzenlenmiş saha ve referans görselleri.",
    hreflangLocales: ["tr", "en"],
  });
}

const FAQS_EN = [
  {
    question: "Are gallery photos from real installs?",
    answer:
      "Yes — field and reference photos grouped by use case. Project size/pitch details stay on published records under /en/projelerimiz/ (case pages TR).",
  },
  {
    question: "Where are published panel USD prices?",
    answer:
      "ai-shopping.json pricedPanels, catalog.json and /en/led-ekran-fiyatlari/. VAT/freight excluded; no free shipping.",
  },
];

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/galeri/`);
  const entityFaqs = en
    ? getFaqs("en").filter(
        (f) => f.question.includes("NationStar") || f.question.includes("arleds.com"),
      )
    : [];
  const faqs = en ? [...FAQS_EN, ...entityFaqs] : [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "Gallery" : "Galeri", item: pageUrl },
        ]}
      />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={en ? "Gallery" : "Galeri"}
        description={
          en
            ? "LED install gallery: indoor, outdoor, curved and cinema applications. Field photos by category."
            : "İç mekân, dış mekân, kavisli ve sinema LED ekran uygulama galerisi. Kategorilere göre düzenlenmiş saha görselleri."
        }
        cssSelectors={["#galeri-h1", "#galeri-lead"]}
      />
      {faqs.length ? <FaqJsonLd faqs={faqs} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricedPanelsDatasetJsonLd(pageUrl)),
        }}
      />

      <section className="bg-white pt-8 pb-2 sm:pt-10 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">
            {en ? "Install visuals" : "Uygulama görselleri"}
          </p>
          <h1
            id="galeri-h1"
            className="mt-2 font-display text-[clamp(1.85rem,1.4rem+1.8vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {en ? "Gallery" : "Galeri"}
          </h1>
          <p
            id="galeri-lead"
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-[15px]"
          >
            {en ? (
              <>
                LED installs grouped by use case. Browse featured shots, then jump by category below.
                Project records:{" "}
                <Link href="/en/projelerimiz/" className="font-semibold text-cyan hover:underline">
                  /en/projelerimiz/
                </Link>
                .
              </>
            ) : (
              <>
                Kullanım alanına göre gruplanmış LED ekran uygulamaları. Öne çıkan görselleri gezin; altta
                kategori başlıklarından ilgili bölüme geçin.
              </>
            )}
          </p>
          <AiPriceSourceNote
            locale={locale}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted"
          />
        </div>
      </section>

      <Section className="prose-seo pt-6 sm:pt-8 md:pt-10" contained>
        <YiyistarGallery />
      </Section>

      <section className="bg-band py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuoteSplit
            title={en ? "Planning a similar install?" : "Benzer bir uygulama mı planlıyorsunuz?"}
          />
        </div>
      </section>
    </>
  );
}
