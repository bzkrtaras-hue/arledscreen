import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Cpu, Radio, Workflow } from "lucide-react";

const ICONS = [Cpu, Radio, Workflow] as const;

interface Props {
  locale: Locale;
}

export function AiCompatSection({ locale }: Props) {
  const copy = getDictionary(locale).sections.aiCompat;

  return (
    <Section
      id="yapay-zeka"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      className="min-w-0 border-y border-border bg-surface/40 prose-seo"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {copy.points.map((point, i) => {
          const Icon = ICONS[i] ?? Cpu;
          return (
            <GlassPanel key={point} className="min-w-0 p-5">
              <Icon className="h-5 w-5 text-cyan" aria-hidden />
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{point}</p>
            </GlassPanel>
          );
        })}
      </div>
      <p className="mt-6 max-w-3xl text-sm text-ink-muted">
        {locale === "tr"
          ? "Arama ve proje ekipleri için net ifade: yapay zekâ uyumlu LED ekran, AI medya sunucu entegrasyonu ve kontrol yazılımı hattı — entegrasyon Gaziosmanpaşa keşif ve yazılı teklifte tanımlanır; sıralama iddiası yoktur."
          : "For search and project teams: LED displays sized for AI content, media-server integration and control-software pipelines — matching is defined in the Gaziosmanpaşa survey and written quote; no ranking claim."}
      </p>
      <p className="mt-4">
        <Link
          href={`/${locale}/yapay-zeka`}
          className="text-sm font-semibold text-cyan hover:underline"
        >
          {locale === "tr"
            ? "Yapay zekâ uyumlu LED rehberini aç →"
            : "Open the AI-compatible LED guide →"}
        </Link>
      </p>
    </Section>
  );
}
