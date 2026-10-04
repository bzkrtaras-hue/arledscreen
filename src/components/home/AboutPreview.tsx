import { OptImage } from "@/components/ui/opt-image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface AboutPreviewProps {
  locale: Locale;
}

export function AboutPreview({ locale }: AboutPreviewProps) {
  const dict = getDictionary(locale);
  const about = dict.about;

  return (
    <div className="grid min-w-0 max-w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[16/10] min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-surface">
        <OptImage
          src="/projects/lounge-football.jpg"
          alt={dict.projects.shots.loungeFootball}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cyan sm:tracking-[0.14em]">
          {about.eyebrow}
        </p>
        <h2 className="text-balance font-display text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
          {about.title}
        </h2>
        <p className="text-sm font-semibold leading-snug text-cyan sm:text-base">
          {dict.brand.slogan}
        </p>
        <p className="text-pretty text-base leading-[1.625] text-ink-muted">
          {about.description}
        </p>
        <div className="grid grid-cols-3 gap-3 pt-2">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 rounded-xl border border-border bg-surface/60 px-3 py-3 text-center"
            >
              <p className="break-words font-display text-sm font-bold text-cyan sm:text-base">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs leading-tight text-ink-muted sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <Button asChild variant="outline" className="btn-soft">
            <Link href={`/${locale}/about`}>{about.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
