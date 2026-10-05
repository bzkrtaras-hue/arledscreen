import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import { productGroupPath, getProductGroup } from "@/content/categories";
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

  const disMekan = getProductGroup("dis-mekan-led-ekran");

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
      ) : null}

      <Section
        eyebrow="Kayıtlı projeler"
        title={`${region.name} proje kayıtları`}
        description={`${region.projectCount} yayımlanmış kayıt. Tarih, kapsam ve konum; stok görsel yok.`}
        className="bg-surface/60 prose-seo"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-ink-muted">
                <th className="py-2 pr-3 font-semibold">Tarih</th>
                <th className="py-2 pr-3 font-semibold">Kayıt</th>
                <th className="py-2 pr-3 font-semibold">Ölçü / P</th>
                <th className="py-2 font-semibold">Konum</th>
              </tr>
            </thead>
            <tbody>
              {region.projects.map((p) => (
                <tr key={`${p.date}-${p.label}-${p.detail}`} className="border-b border-border/70">
                  <td className="py-2.5 pr-3 text-ink-soft">{p.date}</td>
                  <td className="py-2.5 pr-3 font-medium text-ink">{p.label}</td>
                  <td className="py-2.5 pr-3 text-ink-soft">{p.detail}</td>
                  <td className="py-2.5 text-ink-soft">{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
            Tüm proje listesi
          </Link>
          {disMekan ? (
            <>
              {" · "}
              <Link
                href={productGroupPath(disMekan)}
                className="font-semibold text-cyan hover:underline"
              >
                Dış mekân LED ekran
              </Link>
            </>
          ) : null}
        </p>
      </Section>

      <Section
        eyebrow="İlgili sayfalar"
        title={`${region.name} için sonraki adımlar`}
        className="prose-seo"
      >
        <ul className="grid gap-3 sm:grid-cols-3">
          <li>
            <Link
              href="/tr/rehber/led-ekran-fiyatlari/"
              className="glass-card block rounded-2xl p-5 transition hover:border-cyan/40"
            >
              <h2 className="font-display text-base font-bold text-ink">LED ekran fiyatları</h2>
              <p className="mt-2 text-sm text-ink-muted">Fiyatı neyin belirlediği — rehber.</p>
            </Link>
          </li>
          <li>
            <Link
              href="/tr/products/dis-mekan-led-ekran/"
              className="glass-card block rounded-2xl p-5 transition hover:border-cyan/40"
            >
              <h2 className="font-display text-base font-bold text-ink">Dış mekân LED ekran</h2>
              <p className="mt-2 text-sm text-ink-muted">Cephe, totem ve billboard modelleri.</p>
            </Link>
          </li>
          <li>
            <Link
              href="/tr/hesaplayici/"
              className="glass-card block rounded-2xl p-5 transition hover:border-cyan/40"
            >
              <h2 className="font-display text-base font-bold text-ink">Fiyat hesaplayıcı</h2>
              <p className="mt-2 text-sm text-ink-muted">Ölçü ve pitch ile yaklaşık maliyet.</p>
            </Link>
          </li>
        </ul>
      </Section>

      <Section eyebrow="SSS" title={`${region.name} LED ekran soruları`} className="border-t border-border prose-seo">
        <HomeFaq faqs={faqs} />
      </Section>
    </>
  );
}
