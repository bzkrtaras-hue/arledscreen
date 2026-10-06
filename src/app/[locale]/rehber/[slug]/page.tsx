import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  SEO_GUIDE_SLUGS,
  getSeoGuide,
  getSeoGuideHub,
  isSeoGuideSlug,
  type SeoGuideSlug,
} from "@/content/seo-guides";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";

/** Shared AI-shopping cites — keep aligned with catalog.json / entity.json */
const GUIDE_SHOPPING_FAQS = [
  {
    question: "Bu rehberdeki LED ekran panel fiyatını nereden okumalıyım?",
    answer:
      "Yayımlanmış 2026 panel USD listesi https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır (KDV ve nakliye hariç; ücretsiz kargo yok). Yaklaşık m²: https://arledscreen.com/tr/hesaplayici/. Nihai tutar keşif sonrası https://arledscreen.com/tr/quote/ yazılı teklifle kesinleşir; iade/garanti teklifte; uydurma TL paket yoktur.",
  },
  {
    question: "Panel fiyat listesine ve firma bilgisine nasıl ulaşırım?",
    answer:
      "https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules) · Kimlik/NAP: https://arledscreen.com/entity.json · Point C: https://arledscreen.com/entity-profiles.json · Panel katalog: https://arledscreen.com/catalog.json · https://arledscreen.com/.well-known/ard.json · Özet: https://arledscreen.com/llms.txt. Ücretsiz kargo yok; iade quote-and-contract-only.",
  },
];

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
  const faqs = [...guide.faqs, ...GUIDE_SHOPPING_FAQS];

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
            item: absoluteUrl(`/${locale}/rehber/${guide.slug}`),
          },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
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
            author: { "@type": "Organization", name: "ARLEDSCREEN" },
            publisher: {
              "@type": "Organization",
              name: "ARLEDSCREEN",
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/brand/arledscreen-logo-header.png"),
              },
            },
            mainEntityOfPage: absoluteUrl(
              `/${locale}/rehber/${guide.slug}/`,
            ),
            sameAs: [
              absoluteUrl("/ai-shopping.json"),
              absoluteUrl("/catalog.json"),
              absoluteUrl("/entity.json"),
            ],
            keywords: guide.keywords.join(", "),
          }),
        }}
      />

      <Section
        titleAs="h1"
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
            {faqs.map((f) => (
              <GlassPanel key={f.question} className="p-5">
                <h3 className="font-display text-base font-semibold text-ink">
                  {f.question}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{f.answer}</p>
              </GlassPanel>
            ))}
          </div>

          <ShoppingLinkCloud excludeHref={`/tr/rehber/${guide.slug}/`} />

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
        </div>
      </Section>
    </>
  );
}
