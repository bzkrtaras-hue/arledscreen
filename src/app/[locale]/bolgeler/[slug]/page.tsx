import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PRODUCT_GROUPS, productGroupPath } from "@/content/categories";
import {
  SERVICE_REGIONS,
  getServiceRegion,
  serviceRegionPath,
} from "@/content/service-regions";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS_LINES,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_REGIONS.map((r) => ({ locale: "tr", slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "tr") return {};
  const region = getServiceRegion(slug);
  if (!region) return {};
  return buildTrOnlyMetadata({
    path: `/bolgeler/${region.slug}`,
    title: region.title,
    description: region.description,
  });
}

export default async function ServiceRegionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "tr") notFound();
  const region = getServiceRegion(slug);
  if (!region) notFound();

  const faqs = [
    {
      question: `${region.name} içinde LED ekran montajı yapıyor musunuz?`,
      answer: `Evet. ${region.intro}`,
    },
    {
      question: `${region.name} LED ekran fiyatı ne kadar?`,
      answer:
        "Sabit m² fiyatı yoktur. Panel USD listesi fiyat hesaplayıcıda yayımlanır; nihai tutar ölçü, piksel aralığı, iç/dış mekân ve montaj koşullarına göre keşif sonrası yazılı teklifle kesinleşir.",
    },
    {
      question: "Keşif için ne paylaşmalıyım?",
      answer:
        "Yaklaşık ölçü, montaj yeri, kullanım amacı ve izleme mesafesi yeterlidir. Fotoğraf veya kısa video süreci hızlandırır.",
    },
  ];

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(serviceRegionPath(region.slug))}#service`,
    name: `${region.name} LED ekran satışı, montajı ve teknik servis`,
    serviceType: "LED ekran sistemleri",
    description: region.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: region.name,
    },
    url: absoluteUrl(serviceRegionPath(region.slug)),
  };

  const featuredGroups = PRODUCT_GROUPS.filter((g) =>
    ["ic-mekan-led-ekran", "dis-mekan-led-ekran", "gob-led-ekran", "kiralik-led-ekran"].includes(
      g.slug,
    ),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Hizmet bölgesi", item: absoluteUrl("/tr/bolgeler/") },
          { name: region.name, item: absoluteUrl(serviceRegionPath(region.slug)) },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {region.name}
            {region.isHq ? " · Merkez" : ""}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            {region.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{region.intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tr/quote/"
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              {region.name} için teklif iste
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

      {region.isHq ? (
        <Section eyebrow="Merkez" title="İstanbul ofis adresi" className="prose-seo">
          <address className="not-italic text-base leading-relaxed text-ink-soft">
            {BUSINESS_ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4 text-sm text-ink-muted">
            Gaziosmanpaşa ve İstanbul geneli keşif, montaj ve teknik servis buradan koordine edilir.
          </p>
        </Section>
      ) : (
        <Section
          eyebrow="Süreç"
          title={`${region.name} LED ekran süreci`}
          description="İstanbul merkezli ekip; kayıtlı illerde aynı keşif → montaj → servis modeliyle çalışır."
          className="prose-seo"
        >
          <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
            <li>Ölçü, konum ve kullanım amacını teklif formundan paylaşın.</li>
            <li>Keşif ve ürün seçimi yazılı olarak netleşir; garanti kapsamı teklifte yazılır.</li>
            <li>Montaj ve devreye alma sahada tamamlanır; teknik servis aynı ekiple sürer.</li>
          </ol>
          <p className="mt-4 text-sm text-ink-muted">
            Merkez: {BUSINESS_ADDRESS_LINES[0]} · {CONTACT_PHONE_DISPLAY}
          </p>
        </Section>
      )}

      <Section
        eyebrow="Kayıtlı konumlar"
        title={`${region.name} ilçe ve proje konumları`}
        description={`${region.projectCount} kayıtlı uygulama. Yalnızca yayımlanmış referanslardaki konum adları listelenir.`}
        className="bg-surface/60 prose-seo"
      >
        <ul className="flex flex-wrap gap-2">
          {region.locations.map((loc) => (
            <li
              key={loc}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-ink-soft"
            >
              {loc}
            </li>
          ))}
        </ul>
        {region.projectLabels.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-display text-base font-bold text-ink">
              {region.name} proje kayıtları
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {region.projectLabels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
                Tüm proje listesi
              </Link>
            </p>
          </div>
        ) : null}
      </Section>

      <Section eyebrow="Ürünler" title={`${region.name} için ürün grupları`} className="prose-seo">
        <ul className="grid gap-4 sm:grid-cols-2">
          {featuredGroups.map((g) => (
            <li key={g.slug}>
              <Link
                href={productGroupPath(g)}
                className="glass-card block rounded-2xl p-5 transition hover:border-cyan/40"
              >
                <h2 className="font-display text-base font-bold text-ink">{g.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{g.short}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          Fiyat bandı için{" "}
          <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">
            hesaplayıcı
          </Link>
          ; süreç için{" "}
          <Link href="/tr/hizmetler/" className="font-semibold text-cyan hover:underline">
            hizmetler
          </Link>
          ; diğer iller için{" "}
          <Link href="/tr/bolgeler/" className="font-semibold text-cyan hover:underline">
            hizmet bölgesi
          </Link>
          .
        </p>
      </Section>

      <Section eyebrow="SSS" title={`${region.name} LED ekran soruları`} className="border-t border-border prose-seo">
        <HomeFaq faqs={faqs} />
      </Section>
    </>
  );
}
