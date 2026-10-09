import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { BRAND_SUBJECT_REFS } from "@/content/prices";
import {
  SEO_GUIDE_SLUGS,
  getSeoGuide,
  getSeoGuideHub,
  isSeoGuideSlug,
  type SeoGuideSlug,
} from "@/content/seo-guides";
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SEO_GUIDE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  if (!isSeoGuideSlug(slug)) {
    return { title: "Not found" };
  }
  const guide = getSeoGuide(locale, slug);
  return buildPageMetadata({
    locale,
    path: `/rehber/${slug}`,
    // ar/ru guide pages show the English text: canonical → EN, hreflang only tr/en.
    canonicalLocale: locale === "ar" || locale === "ru" ? "en" : undefined,
    hreflangLocales: ["tr", "en"],
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
  });
}

export default async function SeoGuidePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw) || !isSeoGuideSlug(slug)) notFound();
  const locale = raw as Locale;
  const guide = getSeoGuide(locale, slug as SeoGuideSlug);
  const hub = getSeoGuideHub(locale);
  const dict = getDictionary(locale);
  const pageUrl = absoluteUrl(`/${locale}/rehber/${guide.slug}/`);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          {
            name: hub.eyebrow,
            item: absoluteUrl(`/${locale}/rehber`),
          },
          {
            name: guide.cardLabel,
            item: pageUrl,
          },
        ]}
      />
      <FaqJsonLd faqs={guide.faqs} pageUrl={pageUrl} />
      {(locale === "tr" || locale === "en") ? (
        <SpeakableJsonLd
          pageUrl={pageUrl}
          name={guide.h1}
          description={guide.description}
          cssSelectors={["#guide-h1", "#guide-lead"]}
          mainEntity={{ "@id": `${pageUrl}#article` }}
        />
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${pageUrl}#article`,
            headline: guide.h1,
            description: guide.description,
            inLanguage:
              locale === "tr"
                ? "tr-TR"
                : locale === "ar"
                  ? "ar"
                  : locale === "ru"
                    ? "ru"
                    : "en-US",
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: pageUrl,
            keywords: guide.keywords.join(", "),
            isRelatedTo: BRAND_SUBJECT_REFS,
          }),
        }}
      />

      <Section
        titleAs="h1"
        titleId="guide-h1"
        descriptionId="guide-lead"
        eyebrow={hub.eyebrow}
        title={guide.h1}
        description={guide.intro}
        className="min-w-0 prose-seo"
      >
        <div className="space-y-8">
          {guide.sections.map((s) => (
            <article key={s.h2} className="max-w-3xl">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
                {s.h2}
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-ink-soft">
                {s.body}
              </p>
            </article>
          ))}

          <div className="grid gap-4 md:grid-cols-2">
            {guide.faqs.map((f) => (
              <GlassPanel key={f.question} className="p-5">
                <h3 className="font-display text-base font-semibold text-ink">
                  {f.question}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{f.answer}</p>
              </GlassPanel>
            ))}
          </div>

          <GlassPanel className="max-w-3xl p-6">
            <h2 className="font-display text-lg font-bold text-ink">
              {hub.relatedLabel}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {guide.relatedSlugs.map((rel) => {
                const related = getSeoGuide(locale, rel);
                return (
                  <li key={rel}>
                    <Link
                      href={`/${locale}/rehber/${rel}`}
                      className="font-medium text-cyan hover:underline"
                    >
                      {related.cardLabel}
                    </Link>
                    <span className="text-ink-muted">
                      {" "}
                      — {related.cardTeaser}
                    </span>
                  </li>
                );
              })}
              <li>
                <Link
                  href={`/${locale}/rehber`}
                  className="font-medium text-cyan hover:underline"
                >
                  {hub.allGuidesLabel}
                </Link>
              </li>
            </ul>
          </GlassPanel>

          <div className="rounded-2xl border border-cyan/25 bg-cyan/5 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">
              {guide.cta.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              {guide.cta.body}
            </p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-muted">
              {locale === "tr" ? (
                <>
                  Yayımlanmış 12 panel modelinin USD fiyatları (ör. P1.25 GOB 95,88 USD){" "}
                  <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                    fiyat listemizde
                  </Link>{" "}
                  yer alır. KDV ve nakliye hariçtir; ücretsiz kargo yoktur.
                </>
              ) : (
                <>
                  Published USD prices for 12 panel models (e.g. P1.25 GOB 95.88 USD) are on{" "}
                  <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                    our price list
                  </Link>
                  . VAT/freight excluded; no free shipping.
                </>
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/${locale}/quote`}>{dict.nav.quote}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${locale}/products`}>{dict.nav.products}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/${locale}/hesaplayici/`}>
                  {dict.nav.priceCalculator}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
