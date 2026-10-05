import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OptImage } from "@/components/ui/opt-image";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import {
  PROJECT_CASE_STUDIES,
  getProjectCaseStudy,
  projectCasePath,
} from "@/content/case-studies";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS_LINES,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_CASE_STUDIES.map((c) => ({ locale: "tr", slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "tr") return {};
  const c = getProjectCaseStudy(slug);
  if (!c) return {};
  return buildTrOnlyMetadata({
    path: `/projelerimiz/${c.slug}`,
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "tr") notFound();
  const c = getProjectCaseStudy(slug);
  if (!c) notFound();

  const url = absoluteUrl(projectCasePath(c.slug));
  const imageUrls = c.images.map((img) =>
    absoluteUrl(img.src.startsWith("/blog/") ? img.src.replace("/blog/", "/opt/blog/") : img.src),
  );
  const creativeWork = {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "Article"],
    "@id": `${url}#case`,
    headline: c.h1,
    name: c.h1,
    abstract: c.citeOneLiner,
    description: c.metaDescription,
    text: c.citeOneLiner,
    inLanguage: "tr",
    dateCreated: c.date,
    datePublished: c.date,
    about: [
      { "@type": "Thing", name: "LED ekran kurulumu" },
      ...(c.location
        ? [{ "@type": "Place", name: c.location, ...(c.provinceName ? { address: { "@type": "PostalAddress", addressLocality: c.provinceName, addressCountry: "TR" } } : {}) }]
        : []),
    ],
    provider: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    brand: { "@type": "Brand", name: "NXTIONSTAR" },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: url,
    url,
    ...(imageUrls.length ? { image: imageUrls } : {}),
    keywords: ["ARLEDSCREEN", "NXTIONSTAR", "LED ekran", c.sector, c.location].filter(Boolean).join(", "),
  };

  const rows: { label: string; value: string }[] = [
    { label: "Kayıt", value: c.companyLabel },
    { label: "Tarih", value: c.date },
    { label: "Konum", value: c.location },
    { label: "Kapsam", value: c.detail },
    { label: "Sektör", value: c.sector },
  ];
  if (c.pitch) rows.push({ label: "Piksel aralığı", value: c.pitch });
  if (c.environment) rows.push({ label: "Ortam", value: c.environment });
  if (c.areaM2) rows.push({ label: "Yaklaşık alan", value: `${c.areaM2} m²` });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Projeler", item: absoluteUrl("/tr/projelerimiz/") },
          { name: c.companyLabel, item: url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Case study · Yayımlanmış kayıt
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.7rem,1.2rem+1.8vw,2.5rem)] font-extrabold tracking-[-0.03em] text-ink">
            {c.h1}
          </h1>
          <blockquote className="mt-5 max-w-3xl rounded-2xl border border-border bg-white/80 p-5 text-base leading-relaxed text-ink">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">Atıf için kısa metin</p>
            <p className="mt-2">{c.citeOneLiner}</p>
          </blockquote>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Bu sayfa ARLEDSCREEN referans listesindeki yayımlanmış alanlardan üretilir.
            Kontrol sistemi, garanti yılı, müşteri yorumu veya süre gibi sitede yazmayan
            bilgiler eklenmez.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tr/quote/"
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              Benzer proje için teklif
            </Link>
            <Link
              href="/tr/projelerimiz/"
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              Tüm projeler
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Proje özeti</h2>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[8rem_1fr] gap-3 py-3 text-sm sm:grid-cols-[10rem_1fr]">
                  <dt className="font-semibold text-ink-muted">{r.label}</dt>
                  <dd className="text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              {c.companyLabel} kaydı {c.date} tarihinde yayımlanmıştır. Kapsam: {c.detail}
              {c.location ? `; konum: ${c.location}` : ""}.
              {c.pitch ? ` Kayıtta geçen piksel aralığı: ${c.pitch}.` : ""}
              {c.environment ? ` Ortam: ${c.environment}.` : ""}
              {c.areaM2 ? ` Yaklaşık alan: ${c.areaM2} m².` : ""} Sektör etiketi: {c.sector}.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Teknik çözüm, montaj yöntemi ve kontrol sistemi proje keşfine göre yazılı
              teklifte netleşir. Aşağıdaki bağlantılar aynı kullanım / ürün ailesine gider.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {c.relatedProductHref ? (
                <li>
                  <Link href={c.relatedProductHref} className="font-semibold text-cyan hover:underline">
                    {c.relatedProductLabel}
                  </Link>
                </li>
              ) : null}
              {c.relatedUseHref ? (
                <li>
                  <Link href={c.relatedUseHref} className="font-semibold text-cyan hover:underline">
                    {c.relatedUseLabel}
                  </Link>
                </li>
              ) : null}
              {c.provinceSlug ? (
                <li>
                  <Link
                    href={`/tr/bolgeler/${c.provinceSlug}/`}
                    className="font-semibold text-cyan hover:underline"
                  >
                    {c.provinceName} LED ekran
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                  LED ekran fiyatları
                </Link>
              </li>
              <li>
                <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">
                  Fiyat hesaplayıcı
                </Link>
              </li>
            </ul>
            <ShoppingLinkCloud
              excludeHref={`/tr/projelerimiz/${c.slug}/`}
              title="Case study · fiyat ve kimlik (uydurma paket yok)"
              extra={[
                { href: "/tr/projelerimiz/", label: "Tüm projeler" },
                { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
              ]}
            />
          </div>
          <aside className="rounded-2xl border border-border bg-band/40 p-5 text-sm text-ink-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Servis</p>
            <p className="mt-3 font-semibold text-ink">ARLEDSCREEN</p>
            {BUSINESS_ADDRESS_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-3">
              <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
          </aside>
        </div>
      </section>

      {c.images.length ? (
        <section className="border-t border-border bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink">Görseller</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.images.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-xl bg-band">
                  <div className="relative aspect-[16/10]">
                    <OptImage src={img.src} alt={img.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-ink-muted">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-border py-8" data-case-photo-gap="true">
          <div className="mx-auto max-w-7xl px-4 text-sm text-ink-muted sm:px-6 lg:px-8">
            Bu kayıt için henüz eşleşen proje fotoğrafı bağlı değil (uydurma görsel eklenmez). Genel galeri:{" "}
            <Link href="/tr/galeri/" className="font-semibold text-cyan hover:underline">
              /tr/galeri/
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <Link
            href="/tr/quote/"
            className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
          >
            Teklif Al
          </Link>
          <Link
            href="/tr/hesaplayici/"
            className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
          >
            Fiyat hesapla
          </Link>
        </div>
      </section>
    </>
  );
}
