import type { Metadata } from "next";
import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { TrustFacts } from "@/components/home/TrustFacts";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";
import { ENTITY_CITE_MEDIUM, ENTITY_DISAMBIGUATION } from "@/lib/entity";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { getSeo } from "@/content/seo";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const about = dict.about;
  const seo = getSeo(locale, "about");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          { name: dict.nav.about, item: absoluteUrl(`/${locale}/about`) },
        ]}
      />
      {(locale === "tr" || locale === "en") ? (
        <>
          <SpeakableJsonLd
            pageUrl={absoluteUrl(`/${locale}/about/`)}
            name={seo.h1 ?? about.title}
            description={seo.description}
            cssSelectors={["#about-h1", "#about-cite"]}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(pricedPanelsDatasetJsonLd(absoluteUrl(`/${locale}/about/`))),
            }}
          />
        </>
      ) : null}
      <Section
        titleAs="h1"
        titleId="about-h1"
        eyebrow={about.eyebrow}
        title={seo.h1 ?? about.title}
        description={dict.brand.slogan}
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
            <p className="text-base font-semibold leading-snug text-cyan sm:text-lg">
              {dict.brand.slogan}
            </p>
            <p id="about-cite" className="text-sm leading-relaxed text-ink-muted sm:text-base">
              {locale === "tr" ? ENTITY_CITE_MEDIUM : (seo.intro ?? about.description)}
            </p>
            <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
              {about.body}
            </p>
            {locale !== "tr" ? (
              <AiPriceSourceNote locale={locale === "en" ? "en" : "tr"} className="mt-3 text-sm leading-relaxed text-ink-muted" />
            ) : null}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-xl border border-border bg-surface/60 px-3 py-4 text-center"
                >
                  <p className="break-words font-display text-sm font-bold text-cyan sm:text-base">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-tight text-ink-muted sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      {locale === "tr" ? (
        <>
          <Section
            eyebrow="Kimlik"
            title="Doğrulanabilir firma özeti"
            className="border-t border-border prose-seo"
          >
            <blockquote className="max-w-3xl rounded-2xl border border-border bg-band/40 p-5 text-base leading-relaxed text-ink">
              {ENTITY_CITE_MEDIUM}
            </blockquote>
            <ul className="mt-5 max-w-3xl space-y-2 text-sm text-ink-soft">
              {ENTITY_DISAMBIGUATION.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li>
                <Link href="/tr/about/aras-bozkurt/" className="font-semibold text-cyan hover:underline">
                  Kurucu: Aras Bozkurt
                </Link>
              </li>
              <li>
                <Link href="/tr/nxtionstar/" className="font-semibold text-cyan hover:underline">
                  NXTIONSTAR
                </Link>
              </li>
              <li>
                <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
                  Projeler
                </Link>
              </li>
              <li>
                <Link href="/tr/bolgeler/" className="font-semibold text-cyan hover:underline">
                  Hizmet bölgesi
                </Link>
              </li>
              <li>
                <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                  Fiyatlar
                </Link>
              </li>
              <li>
                <a href="/llms.txt" className="font-semibold text-cyan hover:underline">
                  llms.txt
                </a>
              </li>
              <li>
                <a href="https://arledscreen.com/entity.json" className="font-semibold text-cyan hover:underline">
                  entity.json
                </a>
              </li>
              <li>
                <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
                  ai-shopping.json
                </a>
              </li>
              <li>
                <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
                  geo-baseline.json
                </a>
              </li>
            </ul>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Yayımlanmış 12 panel USD:{" "}
              <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
                ai-shopping.json
              </a>{" "}
              <code className="text-xs">pricedPanels</code>,{" "}
              <a href="https://arledscreen.com/catalog.json" className="font-semibold text-cyan hover:underline">
                catalog.json
              </a>
              ,{" "}
              <a href="https://arledscreen.com/feeds/merchant-priced-panels.tsv" className="font-semibold text-cyan hover:underline">
                merchant TSV
              </a>{" "}
              (ör. P1.25 GOB 95.88 USD). Teknik GEO baseline:{" "}
              <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
                geo-baseline.json
              </a>
              . KDV/nakliye hariç; ücretsiz kargo yok. Cite: entity.json.
            </p>
          </Section>
          <Section eyebrow="Neden ARLEDSCREEN?" title="Doğrulanabilir bilgiler" className="bg-surface/60 prose-seo">
            <TrustFacts />
          </Section>
          <Section eyebrow="Çalışma süreci" title="Projeleri nasıl yürütüyoruz?" className="prose-seo">
            <ProcessSteps />
          </Section>
          <Section eyebrow="İletişim" title="Bize ulaşın" className="border-t border-border prose-seo">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl p-5 glass-card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">Merkez</p>
                <p className="mt-2 font-display font-bold text-ink">Gaziosmanpaşa / İstanbul</p>
              </div>
              <a href={CONTACT_PHONE_HREF} className="rounded-2xl p-5 hover:border-cyan/50 glass-card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">Telefon / WhatsApp</p>
                <p className="mt-2 font-display font-bold text-cyan">{CONTACT_PHONE_DISPLAY}</p>
              </a>
              <a href={CONTACT_EMAIL_HREF} className="rounded-2xl p-5 hover:border-cyan/50 glass-card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">E-posta</p>
                <p className="mt-2 break-all font-display font-bold text-cyan">{CONTACT_EMAIL}</p>
              </a>
            </div>
            <p className="mt-6">
              <Link href="/tr/quote/" className="btn-soft inline-flex min-h-12 items-center bg-cyan px-6 text-white hover:bg-cyan-600">
                Teklif isteyin
              </Link>
            </p>
          </Section>
        </>
      ) : null}
    </>
  );
}
