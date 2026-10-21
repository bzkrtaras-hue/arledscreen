import type { Metadata } from "next";
import { buyHref, buyLabel } from "@/lib/buy-cta";
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
import { AR_INDEX_ROBOTS, isArIndexableGuide } from "@/lib/ar-indexable";
import { SEO_GUIDE_I18N } from "@/content/seo-guides-i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { BRAND_SUBJECT_REFS } from "@/content/prices";
import { OptImage } from "@/components/ui/opt-image";
import { ShortAnswer } from "@/components/geo/ShortAnswer";
import { ExportFacts } from "@/components/geo/ExportFacts";
import { shortAnswer } from "@/content/short-answers";
import { guideShortAnswer } from "@/content/guide-short-answers";
import { GUIDE_AUTHOR, guideDates } from "@/lib/guide-jsonld";
import { getGuideImage, getGuideTable } from "@/content/seo-guide-media";
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
  // Reviewed Arabic guides: self canonical + index on /ar/, reciprocal ar/tr/en hreflang on all three.
  const arIndexable = isArIndexableGuide(slug);
  const meta = buildPageMetadata({
    locale,
    path: `/rehber/${slug}`,
    // Other ar/ru guide pages mirror EN text: canonical → EN, hreflang only tr/en (noindex via layout).
    canonicalLocale:
      (locale === "ar" && !arIndexable) || locale === "ru" ? "en" : undefined,
    hreflangLocales: arIndexable ? ["ar", "tr", "en"] : ["tr", "en"],
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
  });
  return locale === "ar" && arIndexable ? { ...meta, robots: AR_INDEX_ROBOTS } : meta;
}

export default async function SeoGuidePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw) || !isSeoGuideSlug(slug)) notFound();
  const locale = raw as Locale;
  const guide = getSeoGuide(locale, slug as SeoGuideSlug);
  const hub = getSeoGuideHub(locale);
  const dict = getDictionary(locale);
  const pageUrl = absoluteUrl(`/${locale}/rehber/${guide.slug}/`);
  const image = getGuideImage(guide.slug, locale);
  const table = getGuideTable(guide.slug, locale);
  // GEO paket 3: visible "Kısa cevap" + "Son güncelleme" on TR/EN guides (export guide keeps its paket 2 block).
  const shortText =
    locale === "tr" || locale === "en"
      ? slug === "led-ekran-ihracat"
        ? shortAnswer("led-ekran-ihracat", locale)
        : guideShortAnswer(slug, locale)
      : null;
  const dates = guideDates(slug, Boolean(shortText));

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
          cssSelectors={shortText ? ["#guide-h1", "#kisa-cevap", "#guide-lead"] : ["#guide-h1", "#guide-lead"]}
          mainEntity={{ "@id": `${pageUrl}#article` }}
          {...(shortText ? { dateModified: dates.dateModified } : {})}
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
            datePublished: dates.datePublished,
            dateModified: dates.dateModified,
            author: GUIDE_AUTHOR,
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
          {shortText && (locale === "tr" || locale === "en") ? (
            slug === "led-ekran-ihracat" ? (
              <>
                <ShortAnswer text={shortText} locale={locale} className="" reviewed={dates.dateModified} />
                <ExportFacts locale={locale} />
              </>
            ) : (
              <ShortAnswer text={shortText} locale={locale} className="" reviewed={dates.dateModified} />
            )
          ) : null}
          {image ? (
            <div className="relative aspect-[16/10] max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface">
              <OptImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          ) : null}
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

          {table ? (
            <div className="max-w-3xl overflow-x-auto rounded-2xl glass-card">
              <table className="w-full min-w-[640px] text-left text-sm [overflow-wrap:normal] [word-break:normal]">
                <caption className="px-4 pt-4 text-left font-display text-base font-bold text-ink sm:px-5">
                  {table.caption}
                </caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {table.headers.map((h) => (
                      <th key={h} scope="col" className="whitespace-nowrap px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((r, i) => (
                    <tr key={r[0]} className={i % 2 ? "bg-band/60" : ""}>
                      <th scope="row" className="px-4 py-2.5 font-semibold text-ink">
                        {r[0]}
                      </th>
                      {r.slice(1).map((c, j) => (
                        <td
                          key={j}
                          className={`px-4 py-2.5 text-ink-soft${j === r.length - 2 ? " whitespace-nowrap" : ""}`}
                        >
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

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
              {guide.relatedSlugs
                .filter((rel) => locale !== "ar" || Boolean(SEO_GUIDE_I18N.ar[rel]))
                .map((rel) => {
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
              {(locale === "tr" || locale === "en") && guide.links
                ? guide.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-medium text-cyan hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))
                : null}
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
              ) : locale === "ar" ? (
                <>
                  أسعار 12 طرازًا من ألواح LED منشورة بالدولار الأمريكي (مثل P1.25 GOB بسعر 95.88 دولارًا للوح) في{" "}
                  <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                    قائمة الأسعار
                  </Link>
                  . الأسعار لا تشمل ضريبة القيمة المضافة ولا الشحن، ولا يوجد شحن مجاني.
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
                <Link href={buyHref(locale)}>{buyLabel(locale)}</Link>
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
