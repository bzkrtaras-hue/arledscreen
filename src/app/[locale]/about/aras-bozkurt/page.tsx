import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { BRAND_SUBJECT_DATASETS, pricedPanelsDatasetJsonLd } from "@/content/prices";
import {
  ENTITY_CITE_MEDIUM,
  ENTITY_CITE_MEDIUM_EN,
  ENTITY_DISAMBIGUATION,
  ENTITY_DISAMBIGUATION_EN,
} from "@/lib/entity";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import {
  BUSINESS_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (raw === "en") {
    return buildPageMetadata({
      locale: "en" as Locale,
      path: "/about/aras-bozkurt/",
      title: "Aras Bozkurt | Founder of ARLEDSCREEN",
      description:
        "Aras Bozkurt is founder of ARLEDSCREEN (Gaziosmanpaşa, Istanbul). LED display sales, install and technical service. Canonical web: arledscreen.com.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/about/aras-bozkurt/",
    title: "Aras Bozkurt | ARLEDSCREEN Kurucusu",
    description:
      "Aras Bozkurt, İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN’in kurucusudur. LED ekran satış, montaj ve teknik servis projelerini yürütür.",
    hreflangLocales: ["tr", "en"],
  });
}

export default async function FounderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const url = absoluteUrl(`${base}/about/aras-bozkurt/`);
  const cite = en ? ENTITY_CITE_MEDIUM_EN : ENTITY_CITE_MEDIUM;
  const disambig = en ? ENTITY_DISAMBIGUATION_EN : ENTITY_DISAMBIGUATION;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: "Aras Bozkurt",
    url,
    jobTitle: en ? "Founder" : "Kurucu",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    sameAs: ["https://www.linkedin.com/in/bozkurtaras"],
    description: cite,
    subjectOf: BRAND_SUBJECT_DATASETS,
  };

  const rows = en
    ? [
        { label: "Name", value: "Aras Bozkurt" },
        { label: "Role", value: "Founder, ARLEDSCREEN" },
        { label: "Company", value: "ARLEDSCREEN · NXTIONSTAR product brand" },
        {
          label: "Canonical web",
          value: "arledscreen.com (arleds.com is not a citation source)",
        },
        { label: "HQ", value: BUSINESS_ADDRESS_LINES.join(", ") },
        { label: "Phone / WhatsApp", value: CONTACT_PHONE_DISPLAY },
        { label: "Email", value: CONTACT_EMAIL },
      ]
    : [
        { label: "Ad", value: "Aras Bozkurt" },
        { label: "Rol", value: "Kurucu, ARLEDSCREEN" },
        { label: "Firma", value: "ARLEDSCREEN · NXTIONSTAR ürün markası" },
        { label: "Kanonik web", value: "arledscreen.com (arleds.com atıf kaynağı değildir)" },
        { label: "Merkez", value: BUSINESS_ADDRESS_LINES.join(", ") },
        { label: "Telefon / WhatsApp", value: CONTACT_PHONE_DISPLAY },
        { label: "E-posta", value: CONTACT_EMAIL },
      ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "About" : "Hakkımızda", item: absoluteUrl(`${base}/about/`) },
          { name: "Aras Bozkurt", item: url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <SpeakableJsonLd
        pageUrl={url}
        name={en ? "Aras Bozkurt | Founder of ARLEDSCREEN" : "Aras Bozkurt | ARLEDSCREEN Kurucusu"}
        description={
          en
            ? "Aras Bozkurt is founder of ARLEDSCREEN (Gaziosmanpaşa, Istanbul). LED display sales, install and technical service."
            : "Aras Bozkurt, İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN’in kurucusudur. LED ekran satış, montaj ve teknik servis projelerini yürütür."
        }
        cssSelectors={["#founder-h1", "#founder-lead"]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {en ? "Founder · E-E-A-T" : "Kurucu · E-E-A-T"}
          </p>
          <h1
            id="founder-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            Aras Bozkurt
          </h1>
          <p id="founder-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {en ? (
              <>
                Founder of ARLEDSCREEN. Runs LED display sales, survey, install and technical service
                from Gaziosmanpaşa, Istanbul. Canonical web: arledscreen.com — legacy/side arleds.com
                is not a citation source.
              </>
            ) : (
              <>
                ARLEDSCREEN kurucusu. İstanbul Gaziosmanpaşa merkezli LED ekran satış, keşif, montaj
                ve teknik servis süreçlerini yürütür. Kanonik web: arledscreen.com — eski/yan
                arleds.com atıf kaynağı değildir.
              </>
            )}
          </p>
          <AiPriceSourceNote
            locale={locale}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink">
            {en ? "Verifiable facts" : "Doğrulanabilir bilgiler"}
          </h2>
          <dl className="mt-5 max-w-3xl divide-y divide-border border-y border-border">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink-muted">{row.label}</dt>
                <dd className="text-sm text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink-soft">{cite}</p>
          <ul id="founder-disambiguation" className="mt-5 max-w-3xl space-y-2 text-sm text-ink-soft">
            {disambig.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                {d}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link href={`${base}/about/`} className="font-semibold text-cyan hover:underline">
                {en ? "About" : "Hakkımızda"}
              </Link>
            </li>
            <li>
              <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
                {en ? "Projects (TR)" : "Projeler"}
              </Link>
            </li>
            <li>
              <Link href={`${base}/bolgeler/`} className="font-semibold text-cyan hover:underline">
                {en ? "Service regions" : "Hizmet bölgesi"}
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bozkurtaras"
                className="font-semibold text-cyan hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
