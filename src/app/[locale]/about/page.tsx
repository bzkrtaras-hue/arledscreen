import type { Metadata } from "next";
import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { TrustFacts } from "@/components/home/TrustFacts";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { getSeo } from "@/content/seo";
import { getAboutContent } from "@/content/about";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "about");
  return buildPageMetadata({
    locale,
    path: "/about",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const seo = getSeo(locale, "about");
  const content = getAboutContent(locale);
  const tr = locale === "tr";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          { name: dict.nav.about, item: absoluteUrl(`/${locale}/about`) },
        ]}
      />

      {/* Intro */}
      <Section
        titleAs="h1"
        eyebrow={content.eyebrow}
        title={content.h1}
        description={content.lead}
        className="min-w-0 prose-seo"
      >
        <div className="grid min-w-0 max-w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-2xl border border-border bg-surface">
            <OptImage
              src="/projects/billboard-arled.jpg"
              alt={dict.projects.shots.billboardArled}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0 space-y-5">
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-ink-soft sm:text-base sm:leading-[1.75]">
                {p}
              </p>
            ))}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {dict.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-xl border border-border bg-surface/60 px-3 py-4 text-center"
                >
                  <p className="break-words font-display text-sm font-bold text-cyan sm:text-base">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-tight text-ink-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section
        eyebrow={tr ? "Proje süreci" : "Project process"}
        title={content.process.title}
        description={content.process.lead}
        className="bg-surface/60 prose-seo"
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.steps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl p-5 glass-card">
              <span className="font-display text-sm font-extrabold text-cyan" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Products */}
      <Section
        eyebrow={tr ? "Çözümler" : "Solutions"}
        title={content.products.title}
        description={content.products.lead}
        className="prose-seo"
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {content.products.lines.map((line) => (
            <li key={line.title} className="rounded-2xl p-6 glass-card">
              <h3 className="font-display text-lg font-bold text-ink">{line.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-[15px]">{line.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Network */}
      <Section
        eyebrow={tr ? "Hizmet ağı" : "Service network"}
        title={content.network.title}
        className="bg-surface/60 prose-seo"
      >
        <p className="max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base sm:leading-[1.75]">
          {content.network.body}
        </p>
      </Section>

      {/* Values table */}
      <Section
        eyebrow={tr ? "İlkeler" : "Principles"}
        title={content.values.title}
        className="prose-seo"
      >
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-band text-xs uppercase tracking-wide text-ink">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  {tr ? "Kurumsal ilke" : "Principle"}
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  {tr ? "Operasyonel karşılığı" : "How we deliver"}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.values.rows.map((row, i) => (
                <tr key={row.principle} className={i % 2 ? "bg-band/50" : ""}>
                  <th scope="row" className="px-5 py-4 align-top font-display font-bold text-ink">
                    {row.principle}
                  </th>
                  <td className="px-5 py-4 align-top text-ink-soft">{row.practice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Mission / Vision */}
      <Section
        eyebrow={tr ? "Yönümüz" : "Direction"}
        title={content.missionVision.title}
        className="bg-surface/60 prose-seo"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl p-6 glass-card">
            <h3 className="font-display text-lg font-bold text-cyan">{content.missionVision.missionLabel}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[15px] sm:leading-[1.7]">
              {content.missionVision.mission}
            </p>
          </article>
          <article className="rounded-2xl p-6 glass-card">
            <h3 className="font-display text-lg font-bold text-cyan">{content.missionVision.visionLabel}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[15px] sm:leading-[1.7]">
              {content.missionVision.vision}
            </p>
          </article>
        </div>
      </Section>

      {tr ? (
        <>
          <Section eyebrow="Neden ARLEDSCREEN?" title="Doğrulanabilir bilgiler" className="prose-seo">
            <TrustFacts />
          </Section>
          <Section eyebrow="İletişim" title="Bize ulaşın" className="border-t border-border prose-seo">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl p-5 glass-card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">Merkez</p>
                <p className="mt-2 font-display font-bold text-ink">Gaziosmanpaşa / İstanbul</p>
              </div>
              <a href={CONTACT_PHONE_HREF} className="rounded-2xl p-5 hover:border-cyan/50 glass-card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Telefon / WhatsApp
                </p>
                <p className="mt-2 font-display font-bold text-cyan">{CONTACT_PHONE_DISPLAY}</p>
              </a>
              <a href={CONTACT_EMAIL_HREF} className="rounded-2xl p-5 hover:border-cyan/50 glass-card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">E-posta</p>
                <p className="mt-2 break-all font-display font-bold text-cyan">{CONTACT_EMAIL}</p>
              </a>
            </div>
            <p className="mt-6">
              <Link
                href="/tr/quote/"
                className="btn-soft inline-flex min-h-12 items-center bg-cyan px-6 text-white hover:bg-cyan-600"
              >
                Teklif isteyin
              </Link>
            </p>
          </Section>
        </>
      ) : (
        <Section
          eyebrow="Contact"
          title="Get in touch"
          className="border-t border-border prose-seo"
        >
          <p className="mb-6 max-w-2xl text-sm text-ink-muted sm:text-base">
            {seo.intro}
          </p>
          <Link
            href={`/${locale}/quote/`}
            className="btn-soft inline-flex min-h-12 items-center bg-cyan px-6 text-white hover:bg-cyan-600"
          >
            {dict.about.cta}
          </Link>
        </Section>
      )}
    </>
  );
}
