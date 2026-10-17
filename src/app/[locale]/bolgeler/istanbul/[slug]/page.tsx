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
  ISTANBUL_DISTRICTS,
  getIstanbulDistrict,
  istanbulDistrictPath,
} from "@/content/istanbul-districts";
import {
  BRAND_SUBJECT_REFS,
  localBusinessRef,
  nxtionstarBrandRef,
} from "@/content/prices";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";

export const dynamicParams = false;

export function generateStaticParams() {
  return ISTANBUL_DISTRICTS.flatMap((d) => [
    { locale: "tr", slug: d.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const district = getIstanbulDistrict(slug);
  if (!district || locale !== "tr") return {};
  return buildTrOnlyMetadata({
    path: `/bolgeler/istanbul/${district.slug}`,
    title: district.title,
    description: district.description,
  });
}

export default async function IstanbulDistrictPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const district = getIstanbulDistrict(slug);
  if (!district || locale !== "tr") notFound();

  const faqs = [
    {
      question: `${district.name} içinde LED ekran montajı yapıyor musunuz?`,
      answer: `Evet. ${district.intro}`,
    },
    {
      question: `${district.name} LED ekran fiyatı ne kadar?`,
      answer:
        "Sabit m² fiyatı yoktur. 12 panel modelinin USD fiyatı sitede yayımlanır. Kiralık LED için m² başına günlük 50 USD (KDV ve nakliye hariç). Nihai tutar keşif ve yazılı teklifle kesinleşir.",
    },
  ];

  const pageUrl = absoluteUrl(istanbulDistrictPath(district.slug));
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${district.name} LED ekran satışı, montajı ve teknik servis`,
    serviceType: "LED ekran sistemleri",
    description: district.description,
    brand: nxtionstarBrandRef(),
    provider: localBusinessRef(),
    areaServed: {
      "@type": "AdministrativeArea",
      name: district.name,
    },
    url: pageUrl,
    isRelatedTo: BRAND_SUBJECT_REFS,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Hizmet bölgesi", item: absoluteUrl("/tr/bolgeler/") },
          { name: "İstanbul", item: absoluteUrl("/tr/bolgeler/istanbul/") },
          { name: district.name, item: pageUrl },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={district.h1}
        description={district.description}
        cssSelectors={["#district-h1", "#district-lead"]}
        mainEntity={{ "@id": `${pageUrl}#service` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {district.name} · İstanbul
          </p>
          <h1
            id="district-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {district.h1}
          </h1>
          <p id="district-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {district.intro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tr/quote/"
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              {district.name} için teklif iste
            </Link>
            <a
              href={CONTACT_PHONE_HREF}
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              Ara: {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Tamamlanan projeler"
        title={`${district.name} projelerimiz`}
        className="bg-surface/60 prose-seo"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-ink-muted">
                <th className="py-2 pr-3 font-semibold">Tarih</th>
                <th className="py-2 pr-3 font-semibold">Proje</th>
                <th className="py-2 font-semibold">Ölçü / P</th>
              </tr>
            </thead>
            <tbody>
              {district.projects.map((p) => (
                <tr key={`${p.date}-${p.label}`} className="border-b border-border/70">
                  <td className="py-2.5 pr-3 text-ink-soft">{p.date}</td>
                  <td className="py-2.5 pr-3 font-medium text-ink">{p.label}</td>
                  <td className="py-2.5 text-ink-soft">{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="İlgili" title="Sonraki adımlar" className="prose-seo">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li>
            <Link
              href="/tr/bolgeler/istanbul/"
              className="glass-card block rounded-2xl p-5 transition hover:border-cyan/40"
            >
              <h2 className="font-display text-base font-bold text-ink">İstanbul hizmet bölgesi</h2>
            </Link>
          </li>
          <li>
            <Link
              href="/tr/led-ekran-fiyatlari/"
              className="glass-card block rounded-2xl p-5 transition hover:border-cyan/40"
            >
              <h2 className="font-display text-base font-bold text-ink">LED ekran fiyatları</h2>
            </Link>
          </li>
        </ul>
        <AiPriceSourceNote className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted" />
      </Section>

      <Section eyebrow="SSS" title={`${district.name} LED ekran soruları`} className="border-t border-border prose-seo">
        <HomeFaq faqs={faqs} />
      </Section>
    </>
  );
}
