import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { fmtUsd } from "@/content/prices";
import {
  MATERIALS_PRICE_NOTE,
  MATERIAL_MODELS,
  categoryPath,
  getMaterialCategory,
  getMaterialItem,
  getMaterialModel,
  itemHref,
  materialModelPath,
  materialOffer,
  materialSections,
} from "@/content/materials";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { absoluteUrl } from "@/lib/site";

type Params = { locale: string; slug: string; model: string };

export const dynamicParams = false;
export function generateStaticParams() {
  return MATERIAL_MODELS.map((m) => ({ locale: "tr", slug: m.category, model: m.slug }));
}

function resolve(slug: string, model: string) {
  const m = getMaterialModel(slug, model);
  const c = getMaterialCategory(slug);
  const it = m ? getMaterialItem(m.itemId) : undefined;
  return m && c && it && typeof it.usd === "number" ? { m, c, it, usd: it.usd } : undefined;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug, model } = await params;
  const r = resolve(slug, model);
  if (locale !== "tr" || !r) return {};
  return buildTrOnlyMetadata({
    path: materialModelPath(r.m).replace(/^\/tr/, ""),
    title: `${r.it.name} Fiyatı ve Özellikleri | ARLEDSCREEN`,
    description: `${r.it.name} ${r.m.type}: ${r.it.spec}. Liste fiyatı ${fmtUsd(r.usd)} USD (KDV hariç). Kurulum ve yapılandırma ARLEDSCREEN; teklif için iletişime geçin.`,
  });
}

export default async function MaterialModelPage({ params }: { params: Promise<Params> }) {
  const { locale, slug, model } = await params;
  const r = resolve(slug, model);
  if (locale !== "tr" || !r) notFound();
  const { m, c, it, usd } = r;
  const url = absoluteUrl(materialModelPath(m));
  const section = materialSections(c.slug).find((s) => s.items.some((x) => x.id === it.id));
  const siblings = (section?.items ?? []).filter((x) => x.id !== it.id);
  const wa = whatsappHref(`Merhaba, ${it.name} için fiyat ve stok bilgisi almak istiyorum. Ekran ölçüsü / adet:`);
  const description = `${it.name}, ${m.brand} ${m.type} ürünüdür. Listedeki özellik: ${it.spec}. ${m.note}`;
  const rows = [
    { label: "Marka (üretici)", value: m.brand },
    { label: "Ürün tipi", value: m.type },
    { label: "Özellik (fiyat listesi)", value: it.spec },
    { label: "Kategori", value: c.name },
  ];

  // Top-level Offer (itemOffered Product) — no product photo yet, so no Merchant-listing Product node.
  const offerLd = {
    "@context": "https://schema.org",
    ...materialOffer(url, usd, { sku: it.id, name: it.name, brand: m.brand, description: `${m.type} · ${it.spec}` }),
    "@id": `${url}#offer`,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "LED ekran malzemeleri", item: absoluteUrl("/tr/malzemeler/") },
          { name: c.name, item: absoluteUrl(categoryPath(c.slug)) },
          { name: it.name, item: url },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />

      <section className="bg-white pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
            <Link href="/tr/" className="hover:text-cyan">Ana Sayfa</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/tr/malzemeler/" className="hover:text-cyan">Malzemeler</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href={categoryPath(c.slug)} className="hover:text-cyan">{c.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-ink-soft" aria-current="page">{it.name.replace(/^(NovaStar|Huidu) /, "")}</span>
          </nav>

          <div className="mt-6 max-w-3xl min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{m.brand} · {c.name}</p>
            <h1 id="model-h1" className="mt-2 text-balance font-display text-[clamp(1.6rem,1.1rem+2vw,2.5rem)] font-bold leading-tight text-ink">{it.name}</h1>
            <p id="model-lead" className="mt-4 text-[15.5px] leading-[1.75] text-ink-soft">{description}</p>

            <div className="mt-5 rounded-2xl border border-border bg-band/60 p-4">
              <p className="text-sm text-ink-soft">
                <span className="font-display text-2xl font-extrabold text-ink">{fmtUsd(usd)} USD</span>{" "}
                <span className="text-ink-muted">/ adet</span>
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                {MATERIALS_PRICE_NOTE} Kurulum ve yapılandırma istenirse ayrıca eklenir; ücretsiz kargo yoktur.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan sorun
              </a>
              <Link
                href="/tr/quote/?tip=servis"
                className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600"
              >
                <FileText className="h-4 w-4" aria-hidden />
                Teklif isteyin
              </Link>
            </div>

            <h2 id="teknik" className="mt-10 scroll-mt-28 font-display text-xl font-bold text-ink sm:text-2xl">Ürün bilgisi</h2>
            <dl className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
              {rows.map((row, i) => (
                <div key={row.label} className={`grid gap-1 px-4 py-3 text-sm sm:grid-cols-[230px_1fr] sm:gap-4 sm:px-5 ${i % 2 ? "bg-band/60" : ""}`}>
                  <dt className="font-semibold text-ink">{row.label}</dt>
                  <dd className="font-medium text-ink-soft">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">
              {m.brand} adı yalnızca satılan ürünün üretici adıdır. Uyumluluk; ekran ölçüsü, modül tipi ve mevcut sisteminize göre teklif öncesinde kontrol edilir.
            </p>
          </div>
        </div>
      </section>

      {siblings.length ? (
        <section className="bg-band py-14 md:py-16" aria-labelledby="ayni-grup">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="ayni-grup" className="font-display text-xl font-bold text-ink sm:text-2xl">{section?.title}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((s) => {
                const href = itemHref(s) ?? `${categoryPath(c.slug)}#${s.id}`;
                return (
                  <li key={s.id} className="rounded-2xl p-5 glass-card">
                    <Link href={href} className="font-display text-base font-bold text-ink hover:text-cyan">{s.name}</Link>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {s.spec}
                      {typeof s.usd === "number" ? ` · ${fmtUsd(s.usd)} USD` : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
            <Link href={categoryPath(c.slug)} className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cyan hover:text-cyan-700">
              {c.name} fiyat listesine dönün <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
