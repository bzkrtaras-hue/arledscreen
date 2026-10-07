import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { HomeFaq } from "@/components/home/HomeFaq";
import type { CommercialGuideEn } from "@/content/commercial-guides-en";
import { getFaqs } from "@/content/faqs";
import { BRAND_SUBJECT_DATASETS, pricedPanelsDatasetJsonLd } from "@/content/prices";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export function CommercialGuideEnLanding({ guide }: { guide: CommercialGuideEn }) {
  const url = absoluteUrl(`/en/rehber/${guide.slug}/`);
  const enFaqs = getFaqs("en");
  const brand = enFaqs.find((f) => f.question.includes("NationStar"));
  const domain = enFaqs.find((f) => f.question.includes("arleds.com"));
  const faqs = [
    ...guide.faqs,
    ...(brand && !guide.faqs.some((f) => f.question.includes("NationStar")) ? [brand] : []),
    ...(domain && !guide.faqs.some((f) => f.question.includes("arleds.com")) ? [domain] : []),
  ];
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: guide.h1,
    name: guide.title,
    description: guide.description,
    inLanguage: "en",
    url,
    mainEntityOfPage: url,
    dateModified: "2026-10-07",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isRelatedTo: BRAND_SUBJECT_DATASETS,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: absoluteUrl("/en/") },
          { name: "Guides", item: absoluteUrl("/en/rehber/") },
          { name: guide.h1, item: url },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={guide.h1}
        description={guide.description}
        cssSelectors={["#article-h1", "#article-lead"]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />
      <article className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-muted">
            <Link href="/en/" className="hover:text-cyan">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/en/rehber/" className="hover:text-cyan">
              Guides
            </Link>
          </nav>
          <h1
            id="article-h1"
            className="mt-3 text-balance font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink"
          >
            {guide.h1}
          </h1>
          <p id="article-lead" className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            {guide.lead}
          </p>
          <AiPriceSourceNote locale="en" className="mt-3 text-xs leading-relaxed text-ink-muted" />

          {guide.sections.map((s) => (
            <section key={s.h2} className="mt-10">
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{s.h2}</h2>
              <p className="mt-3 leading-[1.75] text-ink-soft">{s.body}</p>
            </section>
          ))}

          <div className="mt-10 rounded-card bg-band p-6">
            <p className="font-display text-lg font-bold text-ink">Get a written quote</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Share size, location and use case — we confirm pitch and scope after survey.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/en/quote/"
                className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
              >
                Request a quote
              </Link>
              <Link
                href="/en/hesaplayici/"
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink-soft hover:text-cyan"
              >
                Price calculator
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Related</p>
            <ul className="mt-2 space-y-1.5">
              {guide.related.map((o) => (
                <li key={o.href}>
                  <Link href={o.href} className="font-semibold text-cyan hover:underline">
                    {o.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/tr/rehber/${guide.slug}/`} className="font-semibold text-cyan hover:underline">
                  Turkish full article
                </Link>
              </li>
            </ul>
          </div>

          {faqs.length ? (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="font-display text-xl font-bold text-ink">FAQ</h2>
              <div className="mt-6">
                <HomeFaq faqs={faqs} />
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
