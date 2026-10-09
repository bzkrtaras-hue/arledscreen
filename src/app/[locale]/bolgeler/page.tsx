import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { HomeFaq } from "@/components/home/HomeFaq";
import {
  SERVICE_REGIONS,
  serviceRegionPath,
  serviceRegionsHubSummary,
} from "@/content/service-regions";
import { getFaqs } from "@/content/faqs";
import {
  BRAND_SUBJECT_REFS,
  localBusinessRef,
  nxtionstarBrandRef,
} from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

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
      path: "/bolgeler/",
      title: "LED Display Service Regions | Turkey Provinces | ARLEDSCREEN",
      description:
        "ARLEDSCREEN LED survey, install and service regions. HQ Gaziosmanpaşa, Istanbul; project lists for provinces where we have completed work.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/bolgeler/",
    title: "LED Ekran Hizmet Bölgesi: Türkiye İlleri | ARLEDSCREEN",
    description:
      "ARLEDSCREEN LED ekran keşif, montaj ve teknik servis hizmet bölgesi. İstanbul Gaziosmanpaşa merkez; Tem 2025–Tem 2026 kayıtlı iller ve proje örnekleri.",
    hreflangLocales: ["tr", "en"],
  });
}

const FAQS_TR = [
  {
    question: "Hangi şehirlerde LED ekran kurulumu yapıyorsunuz?",
    answer:
      "Merkezimiz İstanbul Gaziosmanpaşa'dadır. Hizmetimiz Türkiye geneli; Tem 2025 – Tem 2026 arasında 13 ilde ve Almanya ile Azerbaycan'da proje tamamladık. Diğer iller için de keşif talebi alıyoruz.",
  },
  {
    question: "İstanbul dışına keşif için geliyor musunuz?",
    answer:
      "Evet. Ölçü, konum ve kullanım amacını paylaştığınızda keşif ve montaj planını projenize göre hazırlarız. Mesafe ve saha koşulları teklifte yazılır.",
  },
  {
    question: "Şehir sayfalarındaki proje sayıları neyi gösterir?",
    answer:
      "O ilde tamamladığımız ve sitede yayımladığımız projelerin sayısını gösterir. Her il sayfasında o ildeki proje konumları ve örnek projeler listelenir.",
  },
];

const FAQS_EN = [
  {
    question: "Which cities do you install LED displays in?",
    answer:
      "HQ is Gaziosmanpaşa, Istanbul. Service is planned Turkey-wide; published completed-work lists cover recorded provinces (Jul 2025 – Jul 2026: 13 provinces plus Germany and Azerbaijan). No doorway page for provinces without a published record.",
  },
  {
    question: "Do you survey outside Istanbul?",
    answer:
      "Yes. Share size, location and use case — we plan survey and install for the project. Distance and site conditions appear in the written quote.",
  },
  {
    question: "What do project counts on city pages mean?",
    answer:
      "They are derived only from published reference records on this site. Each province page lists locations and sample records for that province — no page is generated without a record.",
  },
];

export default async function BolgelerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/bolgeler/`);
  const summary = serviceRegionsHubSummary();
  const pageFaqs = en ? FAQS_EN : FAQS_TR;
  const entityFaqs = en
    ? getFaqs("en").filter(
        (f) => f.question.includes("NationStar") || f.question.includes("arleds.com"),
      )
    : [];
  const faqs = [...pageFaqs, ...entityFaqs];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "Service regions" : "Hizmet bölgesi", item: pageUrl },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: en
              ? "Turkey-wide LED display survey, install and technical service"
              : "Türkiye geneli LED ekran keşif, montaj ve teknik servis",
            serviceType: en ? "LED display systems" : "LED ekran sistemleri",
            description: en
              ? "ARLEDSCREEN LED survey, install and service regions. HQ Gaziosmanpaşa, Istanbul; project lists for provinces where we have completed work."
              : "ARLEDSCREEN LED ekran keşif, montaj ve teknik servis. İstanbul Gaziosmanpaşa merkez; proje tamamladığımız iller.",
            brand: nxtionstarBrandRef(),
            provider: localBusinessRef(),
            areaServed: { "@type": "Country", name: en ? "Turkey" : "Türkiye" },
            url: pageUrl,
            isRelatedTo: BRAND_SUBJECT_REFS,
          }),
        }}
      />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={
          en
            ? "Turkey-wide LED display survey, install and technical service"
            : "Türkiye geneli LED ekran keşif, montaj ve teknik servis"
        }
        description={
          en
            ? "ARLEDSCREEN LED survey, install and service regions. HQ Gaziosmanpaşa, Istanbul; published provinces and project samples only."
            : "ARLEDSCREEN LED ekran keşif, montaj ve teknik servis hizmet bölgesi. İstanbul Gaziosmanpaşa merkez; kayıtlı iller ve proje örnekleri."
        }
        cssSelectors={["#bolge-h1", "#bolge-lead"]}
        mainEntity={{ "@id": `${pageUrl}#service` }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {en ? "Service regions" : "Hizmet bölgesi"}
          </p>
          <h1
            id="bolge-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {en
              ? "Turkey-wide LED display survey, install and technical service"
              : "Türkiye geneli LED ekran keşif, montaj ve teknik servis"}
          </h1>
          <p id="bolge-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {en ? (
              <>
                Service is planned Turkey-wide; completed-work lists live under published provinces.
                The {summary.provinceCount} provinces below
                {summary.countries.length
                  ? ` (plus ${summary.countries.map((c) => ({ Almanya: "Germany", Azerbaycan: "Azerbaijan" })[c] ?? c).join(", ")})`
                  : ""}{" "}
                come from Jul 2025 – Jul 2026 published project records. Provinces without a record get
                no separate page. Cities without a published province
                page (e.g. Ankara or Ordu) still accept survey requests.
              </>
            ) : (
              <>
                Hizmetimiz Türkiye geneli. Aşağıdaki{" "}
                {summary.provinceCount} il
                {summary.countries.length ? ` (ayrıca ${summary.countries.join(", ")})` : ""}, Tem
                2025 – Tem 2026 arasında proje tamamladığımız yerlerdir. Ankara veya Ordu gibi burada
                listelenmeyen şehirler için de keşif talebi alıyoruz.
              </>
            )}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted">
            {en ? (
              <>
                For commercial needs see{" "}
                <Link href="/en/led-ekran/" className="font-semibold text-cyan hover:underline">
                  LED display
                </Link>
                ,{" "}
                <Link
                  href="/en/led-ekran-fiyatlari/"
                  className="font-semibold text-cyan hover:underline"
                >
                  prices
                </Link>{" "}
                and product groups. Province detail pages stay in Turkish.
              </>
            ) : (
              <>
                Ticari ihtiyaçlar için{" "}
                <Link href="/tr/led-ekran/" className="font-semibold text-cyan hover:underline">
                  LED ekran
                </Link>
                ,{" "}
                <Link
                  href="/tr/led-ekran-fiyatlari/"
                  className="font-semibold text-cyan hover:underline"
                >
                  fiyatlar
                </Link>{" "}
                ve ürün gruplarına bakın.
              </>
            )}
          </p>
          <AiPriceSourceNote
            locale={locale}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted"
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${base}/quote/`}
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              {en ? "Request survey & quote" : "Keşif ve teklif iste"}
            </Link>
            <Link
              href={`/${locale}/projelerimiz/`}
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              {en ? "All projects" : "Tüm projeler"}
            </Link>
          </div>
        </div>
      </section>

      <Section
        eyebrow={en ? "Provinces" : "İller"}
        title={en ? "Published service provinces" : "Kayıtlı hizmet illeri"}
        className="bg-surface/60 prose-seo"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_REGIONS.map((region) => (
            <li key={region.slug}>
              <Link
                href={serviceRegionPath(region.slug)}
                className="glass-card block h-full rounded-2xl p-6 transition hover:border-cyan/40"
              >
                <h2 className="font-display text-lg font-bold text-ink">{region.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {en
                    ? `${region.projectCount} published project${region.projectCount === 1 ? "" : "s"}${region.isHq ? " · HQ" : ""}`
                    : `${region.projectCount} tamamlanan proje${region.isHq ? " · merkez ofis" : ""}`}
                </p>
                <p className="mt-3 text-sm font-semibold text-cyan">
                  {en ? "Province page (TR) →" : "İl sayfasına git →"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow={en ? "FAQ" : "SSS"}
        title={en ? "Questions about regions" : "Bölge hakkında sorular"}
        className="border-t border-border prose-seo"
      >
        <HomeFaq faqs={faqs} />
      </Section>
    </>
  );
}
