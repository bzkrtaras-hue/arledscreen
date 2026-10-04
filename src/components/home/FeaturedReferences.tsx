import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Ruler } from "lucide-react";
import { getCaseStudies, type CaseStudy } from "@/content/trust";
import { OptImage } from "@/components/ui/opt-image";
import { FadeIn } from "@/components/motion/FadeIn";

function Meta({ c }: { c: CaseStudy }) {
  return (
    <dl className="grid gap-1.5 text-sm text-ink-soft">
      <div className="flex items-start gap-2">
        <dt className="sr-only">Kapsam</dt>
        <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
        <dd>
          {c.scope}
          {c.areaM2 ? <span className="text-ink-muted"> · yaklaşık {c.areaM2.toLocaleString("tr-TR")} m²</span> : null}
        </dd>
      </div>
      {c.location ? (
        <div className="flex items-start gap-2">
          <dt className="sr-only">Konum</dt>
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          <dd>{c.location}</dd>
        </div>
      ) : null}
      <div className="flex items-start gap-2">
        <dt className="sr-only">Tarih</dt>
        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
        <dd>{c.date}</dd>
      </div>
    </dl>
  );
}

function Tags({ c }: { c: CaseStudy }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-md border border-border bg-white px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        {c.sector}
      </span>
      {c.pitch ? (
        <span className="rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-cyan-700">{c.pitch}</span>
      ) : null}
      {c.environment ? (
        <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
          {c.environment}
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
}: {
  limit?: number;
  showAllLink?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const cases = getCaseStudies();
  const featured = cases.find((c) => c.image) ?? cases[0];
  const rest = cases.filter((c) => c !== featured).slice(0, Math.max(0, limit - 1));

  return (
    <div>
      {featured ? (
        <FadeIn className="grid overflow-hidden rounded-card bg-band md:grid-cols-2">
          {featured.image ? (
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <OptImage
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
            <Tags c={featured} />
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{featured.title}</h3>
            <Meta c={featured} />
            <Link
              href={ctaHref}
              className="btn-soft mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm text-white hover:bg-cyan-700 sm:self-start"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      ) : null}

      {rest.length ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((c, i) => (
            <FadeIn as="li" key={c.refId} delay={i * 0.1} className="flex flex-col gap-3 rounded-2xl p-5 glass-card">
              <Tags c={c} />
              <h3 className="font-display text-base font-bold text-ink">{c.title}</h3>
              <Meta c={c} />
            </FadeIn>
          ))}
        </ul>
      ) : null}

      {showAllLink ? (
        <div className="mt-8 flex justify-center">
          <Link
            href="/tr/projelerimiz/#liste"
            className="btn-soft inline-flex min-h-11 items-center rounded-full border border-cyan/50 bg-white px-5 text-sm text-cyan hover:bg-cyan-50"
          >
            Diğer projeleri görün
          </Link>
        </div>
      ) : null}
    </div>
  );
}
