import Link from "next/link";
import { CalendarDays, MapPin, Ruler } from "lucide-react";
import { getCaseStudies } from "@/content/trust";
import { OptImage } from "@/components/ui/opt-image";

/** Case-study cards from the owner's reference sheet — only recorded fields are shown. */
export function CaseStudies({ limit = 6, showAllLink = true }: { limit?: number; showAllLink?: boolean }) {
  const cases = getCaseStudies().slice(0, limit);
  return (
    <div>
      <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <li key={c.refId} className="flex flex-col overflow-hidden rounded-2xl glass-card">
            {c.image ? (
              <div className="relative aspect-[16/9] bg-surface">
                <OptImage src={c.image.src} alt={c.image.alt} fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">{c.sector}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">{c.title}</h3>
              <dl className="mt-4 grid gap-2 text-sm text-ink-soft">
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
              <div className="mt-4 flex flex-wrap gap-2">
                {c.pitch ? <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">{c.pitch}</span> : null}
                {c.environment ? <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink-soft">{c.environment}</span> : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showAllLink ? (
        <div className="mt-8 flex justify-center">
          <Link href="/tr/projelerimiz/" className="btn-soft inline-flex min-h-11 items-center border border-cyan/50 bg-white px-5 text-sm text-cyan hover:bg-cyan-50">
            Tüm proje kayıtlarını görün
          </Link>
        </div>
      ) : null}
    </div>
  );
}
