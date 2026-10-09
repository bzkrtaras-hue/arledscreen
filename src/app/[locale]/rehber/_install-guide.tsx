import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { OptImage } from "@/components/ui/opt-image";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HowToJsonLd } from "@/components/seo/HowToJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { getSeoGuideHub } from "@/content/seo-guides";
import {
  INSTALL_GUIDE_LABELS,
  getInstallGuide,
  type InstallGuideSlug,
} from "@/content/install-guides";

/**
 * LED ekran kurulum rehberleri (TR + EN). Same visual building blocks as rehber/[slug]
 * (Section, GlassPanel, cyan CTA box); no new CSS. ar/ru are not generated (TR/EN only).
 */
export function installGuideStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function installGuideMetadata(
  slug: InstallGuideSlug,
  params: Promise<{ locale: string }>,
): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") return {};
  const guide = getInstallGuide(locale, slug);
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/rehber/${slug}/`,
    hreflangLocales: ["tr", "en"],
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
  });
}

export async function InstallGuidePage({
  slug,
  params,
}: {
  slug: InstallGuideSlug;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as Locale;
  const tr = raw === "tr";
  const guide = getInstallGuide(locale, slug);
  const labels = INSTALL_GUIDE_LABELS[raw];
  const hub = getSeoGuideHub(locale);
  const dict = getDictionary(locale);
  const pageUrl = absoluteUrl(`/${raw}/rehber/${slug}/`);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${raw}`) },
          { name: hub.eyebrow, item: absoluteUrl(`/${raw}/rehber`) },
          { name: guide.cardLabel, item: pageUrl },
        ]}
      />
      <FaqJsonLd faqs={guide.faqs} pageUrl={pageUrl} />
      <HowToJsonLd name={guide.h1} description={guide.description} steps={guide.quickSteps} />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={guide.h1}
        description={guide.description}
        cssSelectors={["#guide-h1", "#guide-lead"]}
        mainEntity={{ "@id": `${pageUrl}#article` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${pageUrl}#article`,
            headline: guide.h1,
            description: guide.description,
            inLanguage: tr ? "tr-TR" : "en-US",
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: pageUrl,
            image: absoluteUrl(guide.image.src),
            keywords: guide.keywords.join(", "),
            citation: guide.sources.map((s) => s.url),
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
          <div
            className={`relative aspect-[16/10] max-w-3xl overflow-hidden rounded-2xl border border-border ${
              guide.image.fit === "contain" ? "bg-white" : "bg-surface"
            }`}
          >
            <OptImage
              src={guide.image.src}
              alt={guide.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className={guide.image.fit === "contain" ? "object-contain p-6" : "object-cover"}
            />
          </div>

          <GlassPanel className="max-w-3xl p-6">
            <h2 className="font-display text-lg font-bold text-ink">{labels.quickSteps}</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
              {guide.quickSteps.map((s) => (
                <li key={s.name}>
                  <span className="font-semibold text-ink">{s.name}:</span> {s.text}
                </li>
              ))}
            </ol>
          </GlassPanel>

          {guide.sections.map((s) => (
            <article key={s.h2} className="max-w-3xl">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
                {s.h2}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-3 text-base leading-[1.7] text-ink-soft">
                  {p}
                </p>
              ))}
              {s.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-[1.7] text-ink-soft">
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 48)}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {s.steps ? (
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-[1.7] text-ink-soft">
                  {s.steps.map((b) => (
                    <li key={b.slice(0, 48)}>{b}</li>
                  ))}
                </ol>
              ) : null}
            </article>
          ))}

          <article className="max-w-3xl">
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              {labels.mistakes}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-[1.7] text-ink-soft">
              {guide.mistakes.map((m) => (
                <li key={m.slice(0, 48)}>{m}</li>
              ))}
            </ul>
          </article>

          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              {labels.faq}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {guide.faqs.map((f) => (
                <GlassPanel key={f.question} className="p-5">
                  <h3 className="font-display text-base font-semibold text-ink">{f.question}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{f.answer}</p>
                </GlassPanel>
              ))}
            </div>
          </div>

          <GlassPanel className="max-w-3xl p-6">
            <h2 className="font-display text-lg font-bold text-ink">{labels.related}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {guide.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-medium text-cyan hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${raw}/rehber`} className="font-medium text-cyan hover:underline">
                  {hub.allGuidesLabel}
                </Link>
              </li>
            </ul>
          </GlassPanel>

          <div className="rounded-2xl border border-cyan/25 bg-cyan/5 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">{guide.cta.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">{guide.cta.body}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/${raw}/quote`}>{dict.nav.quote}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${raw}/led-ekran-servis/`}>{labels.service}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/${raw}/led-ekran-montaj/`}>{labels.install}</Link>
              </Button>
            </div>
          </div>

          <section className="max-w-3xl border-t border-border pt-6" aria-labelledby="kaynaklar">
            <h2 id="kaynaklar" className="font-display text-lg font-bold text-ink">
              {labels.sources}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{labels.sourcesNote}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="break-words text-cyan hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>
    </>
  );
}
