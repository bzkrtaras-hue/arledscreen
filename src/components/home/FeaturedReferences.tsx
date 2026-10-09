import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Ruler } from "lucide-react";
import { enProjectLabel, getCaseStudies, type CaseStudy } from "@/content/trust";
import { PROJECT_CASE_STUDIES } from "@/content/case-studies";
import { OptImage } from "@/components/ui/opt-image";
import { FadeIn } from "@/components/motion/FadeIn";
import { formatProjectDate, formatProjectDetail } from "@/lib/dates";

function caseHref(c: CaseStudy): string {
  const match = PROJECT_CASE_STUDIES.find((x) => x.refId === c.refId);
  return match ? `/tr/projelerimiz/${match.slug}/` : "/tr/projelerimiz/#liste";
}

const SECTOR_EN: Record<string, string> = {
  "Kamu / belediye": "Public / municipal",
  "Kamu / etkinlik": "Public / event",
  "Dış mekân": "Outdoor",
  "Kafe / lounge": "Café / lounge",
  "Ticari işletme": "Commercial",
  "Tekstil / mağaza": "Textile / store",
};

const ENV_EN: Record<string, string> = {
  "Dış mekân": "Outdoor",
  "İç mekân": "Indoor",
};

function Meta({ c, locale }: { c: CaseStudy; locale: "tr" | "en" }) {
  const en = locale === "en";
  return (
    <dl className="grid gap-1.5 text-sm text-ink-soft">
      <div className="flex items-start gap-2">
        <dt className="sr-only">{en ? "Scope" : "Kapsam"}</dt>
        <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
        <dd>
          {formatProjectDetail(c.scope, locale)}
          {c.areaM2 ? (
            <span className="text-ink-muted">
              {" "}
              · {en ? "approx." : "yaklaşık"} {c.areaM2.toLocaleString(en ? "en-US" : "tr-TR")} m²
            </span>
          ) : null}
        </dd>
      </div>
      {c.location ? (
        <div className="flex items-start gap-2">
          <dt className="sr-only">{en ? "Location" : "Konum"}</dt>
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          <dd>{en ? enProjectLabel(c.location) : c.location}</dd>
        </div>
      ) : null}
      <div className="flex items-start gap-2">
        <dt className="sr-only">{en ? "Date" : "Tarih"}</dt>
        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
        <dd>{formatProjectDate(c.date, locale)}</dd>
      </div>
    </dl>
  );
}

function Tags({ c, locale }: { c: CaseStudy; locale: "tr" | "en" }) {
  const en = locale === "en";
  const sector = en ? (SECTOR_EN[c.sector] ?? c.sector) : c.sector;
  const environment =
    c.environment == null ? undefined : en ? (ENV_EN[c.environment] ?? formatProjectDetail(c.environment, "en")) : c.environment;
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-md border border-border bg-white px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        {sector}
      </span>
      {c.pitch ? (
        <span className="rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-cyan-700">{c.pitch}</span>
      ) : null}
      {environment ? (
        <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
          {environment}
        </span>
      ) : null}
    </div>
  );
}

/**
 * References: one featured project card (photo + details side by side),
 * followed by compact record cards. Only recorded fields are shown.
 */
export function FeaturedReferences({
  limit = 5,
  showAllLink = true,
  ctaHref = "/tr/projelerimiz/",
  ctaLabel = "Tüm projeleri görün",
  locale = "tr",
}: {
  limit?: number;
  showAllLink?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  locale?: "tr" | "en";
}) {
  const cases = getCaseStudies();
  const featured = cases.find((c) => c.image) ?? cases[0];
  const rest = cases.filter((c) => c !== featured).slice(0, Math.max(0, limit - 1));
  const en = locale === "en";
  const titleOf = (c: CaseStudy) => {
    if (!en) return c.title;
    return enProjectLabel(c.title);
  };

  return (
    <div>
      {featured ? (
        <FadeIn className="grid overflow-hidden rounded-card bg-band md:grid-cols-2">
          {featured.image ? (
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <OptImage
                src={featured.image.src}
                alt={
                  en
                    ? "Ünye Municipality Ordu Days LED display install"
                    : featured.image.alt
                }
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
            <Tags c={featured} locale={locale} />
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              <Link href={caseHref(featured)} className="hover:text-cyan">
                {titleOf(featured)}
              </Link>
            </h3>
            <Meta c={featured} locale={locale} />
            <Link
              href={caseHref(featured)}
              className="btn-soft mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm text-white hover:bg-cyan-700 sm:self-start"
            >
              Case study <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      ) : null}

      {rest.length ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((c, i) => (
            <FadeIn as="li" key={c.refId} delay={i * 0.1} className="flex flex-col gap-3 rounded-2xl p-5 glass-card">
              <Tags c={c} locale={locale} />
              <h3 className="font-display text-base font-bold text-ink">
                <Link href={caseHref(c)} className="hover:text-cyan">
                  {titleOf(c)}
                </Link>
              </h3>
              <Meta c={c} locale={locale} />
            </FadeIn>
          ))}
        </ul>
      ) : null}

      {showAllLink ? (
        <div className="mt-8 flex justify-center">
          <Link
            href={ctaHref}
            className="btn-soft inline-flex min-h-11 items-center rounded-full border border-cyan/50 bg-white px-5 text-sm text-cyan hover:bg-cyan-50"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
