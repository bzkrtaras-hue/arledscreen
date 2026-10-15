import Link from "next/link";
import { MapPin } from "lucide-react";
import { OptImage } from "@/components/ui/opt-image";
import { PROJECT_CASE_STUDIES, projectCasePath } from "@/content/case-studies";

/**
 * Real installation photos directly under the hero. Only records from the
 * published reference sheet whose photo identity is confirmed (IMAGE_BY_REF).
 * No stock imagery, no figures beyond the record itself.
 */
const PICKS: { refId: string; img: string }[] = [
  { refId: "ref-39", img: "/videos/eskisehir-sigorta-led-ekran-vitrin.jpg" },
  { refId: "ref-26", img: "/projects/unye.jpg" },
  { refId: "ref-22", img: "/opt/blog/alanya-otel-led-ekran.jpg" },
  { refId: "ref-38", img: "/videos/istanbul-drama-sanat-atolyesi-dis-mekan-led.jpg" },
];

export function InstallStrip() {
  const items = PICKS.flatMap(({ refId, img }) => {
    const c = PROJECT_CASE_STUDIES.find((x) => x.refId === refId);
    const image = c?.images.find((i) => i.src === img);
    return c && image ? [{ c, image }] : [];
  });
  if (!items.length) return null;

  return (
    <section aria-labelledby="sahadan" className="relative z-[4] bg-white pt-8 md:-mt-16 md:bg-transparent md:pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 md:mb-3">
          <h2 id="sahadan" className="font-display text-lg font-bold text-ink md:text-base md:text-white">
            Sahadan gerçek kurulumlar
          </h2>
          <Link
            href="/tr/projelerimiz/"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-cyan hover:underline md:text-white"
          >
            Tüm projeler →
          </Link>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-3 md:mt-0 md:grid-cols-4 md:gap-4">
          {items.map(({ c, image }) => (
            <li key={c.slug}>
              <Link
                href={projectCasePath(c.slug)}
                className="group block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-border transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-band">
                  <OptImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 300px, 46vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex min-h-[3.75rem] flex-col justify-center px-3 py-2.5">
                  <span className="line-clamp-2 text-[13.5px] font-bold leading-snug text-ink">{c.companyLabel}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="line-clamp-1">{c.location}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
