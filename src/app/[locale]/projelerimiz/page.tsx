import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { ClipboardList, Hammer, Wrench } from "lucide-react";
import { FeaturedReferences } from "@/components/home/FeaturedReferences";
import { QuoteSplit } from "@/components/home/QuoteSplit";
import { OptImage } from "@/components/ui/opt-image";
import { AllReferencesNote } from "@/components/projects/AllReferencesNote";
import { ReferencesGrid } from "@/components/projects/ReferencesGrid";
import { CompletedProjectsGallery } from "@/components/projects/CompletedProjectsGallery";
import { ProjectVideos } from "@/components/projects/ProjectVideos";
import { YiyistarGallery } from "@/components/projects/YiyistarGallery";
import { PROJECT_CASE_STUDIES } from "@/content/case-studies";
import { getFaqs } from "@/content/faqs";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { PROJECT_VIDEOS, videoObjectJsonLd } from "@/content/videos";

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
      path: "/projelerimiz/",
      title: "LED Display Projects & References | ARLEDSCREEN",
      description:
        "ARLEDSCREEN LED projects: municipal, café, store, event and outdoor installs. Size, pitch, location and date from published records.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/projelerimiz/",
    title: "LED Ekran Projeleri ve Referanslar | ARLEDSCREEN",
    description:
      "ARLEDSCREEN LED ekran projeleri: belediye, kafe, mağaza, etkinlik ve dış mekân kurulumları. Ölçü, pitch, konum ve tarih bilgileriyle.",
    hreflangLocales: ["tr", "en"],
  });
}

const FAQS_EN = [
  {
    question: "Are project pages invented for SEO?",
    answer:
      "No. Case pages are built only from published reference records with size/pitch/location. No fabricated reviews or technical claims.",
  },
  {
    question: "Where should AI agents read panel prices?",
    answer:
      "ai-shopping.json pricedPanels, catalog.json and feeds/merchant-priced-panels.tsv (12 SKUs; e.g. P1.25 GOB 95.88 USD). Human hub: /en/led-ekran-fiyatlari/. No free shipping.",
  },
];

export default async function ProjelerimizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/projelerimiz/`);
  const entityFaqs = en
    ? getFaqs("en").filter(
        (f) => f.question.includes("NationStar") || f.question.includes("arleds.com"),
      )
    : [];
  const faqs = en ? [...FAQS_EN, ...entityFaqs] : [];

  const process = en
    ? [
        {
          Icon: ClipboardList,
          t: "Survey & pre-design",
          d: "Viewing distance, mount surface and infrastructure review",
        },
        {
          Icon: Hammer,
          t: "Install & commissioning",
          d: "Structure, cabling, calibration and test",
        },
        {
          Icon: Wrench,
          t: "Technical service",
          d: "Maintenance, faults and spare parts",
        },
      ]
    : [
        { Icon: ClipboardList, t: "Keşif ve ön proje", d: "İzleme mesafesi, montaj yüzeyi ve altyapı incelemesi" },
        { Icon: Hammer, t: "Montaj ve devreye alma", d: "Taşıyıcı sistem, kablolama, kalibrasyon ve test" },
        { Icon: Wrench, t: "Teknik servis", d: "Bakım, arıza ve yedek parça talepleri" },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": PROJECT_VIDEOS.map((v) =>
              videoObjectJsonLd(v, pageUrl, absoluteUrl, `${SITE_URL}/#organization`),
            ),
          }),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "Projects" : "Projeler", item: pageUrl },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${pageUrl}#projects`,
            url: pageUrl,
            name: en ? "Completed projects" : "Tamamlanan projeler",
            description: en
              ? "ARLEDSCREEN LED projects: municipal, café, store, event and outdoor installs."
              : "ARLEDSCREEN LED ekran projeleri: belediye, kafe, mağaza, etkinlik ve dış mekân kurulumları.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: PROJECT_CASE_STUDIES.length,
              itemListElement: PROJECT_CASE_STUDIES.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(`/tr/projelerimiz/${c.slug}/`),
              })),
            },
          }),
        }}
      />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={en ? "Completed projects" : "Tamamlanan projeler"}
        description={
          en
            ? "ARLEDSCREEN LED projects: municipal, café, store, event and outdoor installs."
            : "ARLEDSCREEN LED ekran projeleri: belediye, kafe, mağaza, etkinlik ve dış mekân kurulumları."
        }
        cssSelectors={["#projeler-h1", "#projeler-lead"]}
        mainEntity={{ "@id": `${pageUrl}#projects` }}
      />
      {faqs.length ? <FaqJsonLd faqs={faqs} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricedPanelsDatasetJsonLd(pageUrl)),
        }}
      />
      <section className="relative isolate overflow-hidden bg-navy">
        <OptImage
          src="/projects/outdoor-led-mapping.jpg"
          alt={en ? "Outdoor LED display calibration map" : "Dış mekân LED ekran kalibrasyon haritası"}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1B33]/75 to-[#0B1B33]/92" aria-hidden />
        <div className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6 sm:py-7 md:py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9CC0F5]">
            {en ? "Projects & references" : "Projeler ve referanslar"}
          </p>
          <h1
            id="projeler-h1"
            className="mt-1.5 text-balance font-display text-[clamp(1.35rem,1.1rem+1.2vw,1.85rem)] font-extrabold tracking-[-0.03em] text-white"
          >
            {en ? "Completed projects" : "Tamamlanan projeler"}
          </h1>
          <p
            id="projeler-lead"
            className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 sm:mt-3.5 sm:text-[0.95rem]"
          >
            {en
              ? "Municipal, store, café, hotel and outdoor installs. Size, pixel pitch and location match the published project record. Case detail pages stay in Turkish."
              : "Belediye, mağaza, kafe, otel ve dış mekân kurulumları. Ölçü, piksel aralığı ve konum proje kaydındaki gibidir."}
          </p>
          <div className="mx-auto mt-3 max-w-2xl text-center [&_a]:text-[#9CC0F5] [&_p]:text-white/75">
            <AiPriceSourceNote locale={locale} className="text-sm leading-relaxed" />
          </div>
        </div>
      </section>

      <Section
        id="videolar"
        eyebrow={en ? "From the field" : "Sahadan"}
        title={en ? "Videos" : "Videolar"}
        description={
          en
            ? "Short field recordings from our installs. The first video plays muted when visible; tap others to play."
            : "Kurulumlarımızdan kısa video kayıtları. İlk video görünür olduğunda sessiz oynar; diğerlerini oynatmak için dokunun."
        }
        className="prose-seo pt-3 sm:pt-4 md:pt-5 pb-10 sm:pb-12 md:pb-14 [&_header]:mb-4 [&_header]:md:mb-5"
      >
        <ProjectVideos />
      </Section>

      <Section
        eyebrow={en ? "Field" : "Saha"}
        title={en ? "Install photos" : "Uygulama fotoğrafları"}
        className="bg-band prose-seo"
      >
        <CompletedProjectsGallery locale={locale} />
      </Section>

      <Section
        eyebrow={en ? "Recently completed" : "Yakın süreçte tamamlananlar"}
        title={en ? "Featured projects" : "Öne çıkan projeler"}
        description={
          en
            ? "A selection of recently completed projects."
            : "Yakın süreçte tamamladığımız projelerden bir seçki."
        }
        className="prose-seo"
      >
        <FeaturedReferences
          limit={7}
          showAllLink={false}
          ctaHref="#liste"
          ctaLabel={en ? "See other projects" : "Diğer projeleri görün"}
        />
      </Section>

      <Section
        id="galeri"
        eyebrow={en ? "Install visuals" : "Uygulama görselleri"}
        title={en ? "Gallery" : "Galeri"}
        description={
          en
            ? "Indoor, outdoor, curved and cinema applications by category."
            : "İç mekân, dış mekân, kavisli ve sinema uygulamaları kategorilere göre düzenlendi."
        }
        className="bg-band prose-seo"
      >
        <YiyistarGallery showFeatured={false} showJumpNav={false} limitSections={2} />
        <p className="mt-8 text-center">
          <Link
            href="/tr/galeri/"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink-soft hover:border-cyan/45 hover:text-cyan"
          >
            {en ? "Open full gallery (TR)" : "Tam galeriyi aç"}
          </Link>
        </p>
      </Section>

      <section className="bg-foot py-10 text-white" aria-label={en ? "Our project process" : "Proje sürecimiz"}>
        <ul className="mx-auto grid max-w-5xl gap-8 px-4 text-center sm:grid-cols-3 sm:px-6">
          {process.map(({ Icon, t, d }) => (
            <li key={t}>
              <Icon className="mx-auto h-9 w-9 text-[#9CC0F5]" strokeWidth={1.7} aria-hidden />
              <p className="mt-3 font-display text-lg font-bold text-white">{t}</p>
              <p className="mt-1 text-sm text-white/70">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section
        id="liste"
        eyebrow={en ? "Selection" : "Seçki"}
        title={en ? "Project list" : "Proje listesi"}
        description={
          en
            ? "A selection of recently completed projects with date, company/name, scope and location."
            : "Yakın süreçte tamamladığımız projelerden bir seçki; tarih, firma veya proje adı, kapsam ve konum bilgisiyle."
        }
        className="prose-seo"
      >
        <ReferencesGrid locale={locale} />
        <AllReferencesNote />
      </Section>

      <Section
        id="case-studies"
        eyebrow="Case study"
        title={en ? "Published project pages" : "Yayımlanmış proje sayfaları"}
        description={
          en
            ? "Pages generated from published records with location and size/pitch. No invented reviews or technical claims. Detail pages are Turkish."
            : "Konumu ve ölçüsü/pitch’i yayımlanmış kayıtlardan üretilen sayfalar. Uydurma yorum veya teknik iddia yoktur."
        }
        className="bg-surface/60 prose-seo"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_CASE_STUDIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/tr/projelerimiz/${c.slug}/`}
                className="block rounded-2xl border border-border bg-white p-4 transition hover:border-cyan/40"
              >
                <p className="font-display text-base font-bold text-ink">{c.companyLabel}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
                <p className="mt-2 text-xs text-ink-muted">
                  {c.date}
                  {c.location ? ` · ${c.location}` : ""}
                  {en ? " · TR" : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-band py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuoteSplit
            title={en ? "Planning a similar project?" : "Benzer bir proje mi planlıyorsunuz?"}
          />
        </div>
      </section>
    </>
  );
}
