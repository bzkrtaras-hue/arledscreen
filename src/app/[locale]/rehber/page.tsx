import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { getSeoGuideHub, listSeoGuides } from "@/content/seo-guides";
import { listInstallGuides } from "@/content/install-guides";

interface PageProps {
  params: Promise<{ locale: string }>;
}

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
      "dijital ekran",
    ],
  });
}

export default async function SeoGuideHubPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const hub = getSeoGuideHub(locale);
  // Kurulum rehberleri (TR/EN only) are appended after the topic guides.
  const guides: { slug: string; cardLabel: string; cardTeaser: string }[] = [
    ...listSeoGuides(locale),
    ...(locale === "tr" || locale === "en" ? listInstallGuides(locale) : []),
  ];
  const dict = getDictionary(locale);
  const hubUrl = absoluteUrl(`/${locale}/rehber/`);
  const rehberLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${hubUrl}#rehber`,
    name: hub.h1,
    description: hub.description,
    url: hubUrl,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: guides.length,
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.cardLabel,
        url: absoluteUrl(`/${locale}/rehber/${g.slug}/`),
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          {
            name: hub.eyebrow,
            item: hubUrl,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rehberLd) }}
      />
      {(locale === "tr" || locale === "en") ? (
        <SpeakableJsonLd
          pageUrl={hubUrl}
          name={hub.h1}
          description={hub.description}
          cssSelectors={["#rehber-h1", "#rehber-lead"]}
          mainEntity={{ "@id": `${hubUrl}#rehber` }}
        />
      ) : null}

      <Section
        titleAs="h1"
        titleId="rehber-h1"
        descriptionId="rehber-lead"
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
              ? "Rehberleri okuduktan sonra ölçü ve ortam bilginizi paylaşın; mühendislik masası pitch ve güç özetiyle dönüş yapsın."
              : "After the guides, share dimensions and environment — engineering replies with pitch and power outline."}
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
      </Section>
    </>
  );
}
