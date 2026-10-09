import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import { MaterialPriceTable } from "@/components/pricing/MaterialPriceTable";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { PANEL_AVG_RATIO } from "@/content/prices";
import {
  MATERIALS_LIST_DATE,
  MATERIALS_PRICE_NOTE,
  MATERIAL_CATEGORIES,
  MATERIAL_MODELS,
  categoryPath,
  getMaterialCategory,
  getMaterialItem,
  itemPrice,
  materialModelPath,
  materialOffer,
  materialSections,
} from "@/content/materials";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { absoluteUrl, SITE_URL } from "@/lib/site";

type Params = { locale: string; slug: string };

export const dynamicParams = false;
export function generateStaticParams() {
  return MATERIAL_CATEGORIES.map((c) => ({ locale: "tr", slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getMaterialCategory(slug);
  if (locale !== "tr" || !c) return {};
  return buildTrOnlyMetadata({ path: `/malzemeler/${c.slug}/`, title: c.title, description: c.description });
}

const ratioTr = (n: number) => n.toFixed(4).replace(".", ",");

export default async function MaterialCategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const c = getMaterialCategory(slug);
  if (locale !== "tr" || !c) notFound();
  const url = absoluteUrl(categoryPath(c.slug));
  const sections = materialSections(c.slug);
  const models = MATERIAL_MODELS.filter((m) => m.category === c.slug);
  const panel = c.slug === "led-paneller";
  const wa = whatsappHref(c.whatsapp);

  // OfferCatalog (no top-level Product → no Merchant-listing image requirement on table rows).
  const catalogLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${url}#catalog`,
    name: c.h1,
    url,
    isPartOf: { "@id": `${absoluteUrl("/tr/malzemeler/")}#collection` },
    subjectOf: { "@type": "Dataset", "@id": `${SITE_URL}/materials.json`, url: `${SITE_URL}/materials.json` },
    itemListElement: sections.flatMap((s) =>
      s.items.flatMap((it): Record<string, unknown>[] => {
        const p = itemPrice(it);
        const rowUrl = `${url}#${it.id}`;
        const desc = [s.title, it.spec].filter(Boolean).join(" · ");
        const unit = s.kind === "panel" ? "panel" : "adet";
        if (s.kind === "cnc") {
          return [
            materialOffer(rowUrl, it.usd!, { sku: `${it.id}-tek`, name: `${it.name} tek yüzlü`, description: desc }),
            materialOffer(rowUrl, it.usd2!, { sku: `${it.id}-cift`, name: `${it.name} çift yüzlü`, description: desc }),
          ];
        }
        if (!p) {
          return [{ "@type": "Offer", itemOffered: { "@type": "Product", name: it.name, description: `${desc}. Fiyat teklif ile verilir.` } }];
        }
        return [materialOffer(rowUrl, p.usd, { sku: it.id, name: it.name, brand: it.brand, description: desc, unit })];
      }),
    ),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "LED ekran malzemeleri", item: absoluteUrl("/tr/malzemeler/") },
          { name: c.name, item: url },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} pageUrl={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogLd) }} />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
            <Link href="/tr/" className="hover:text-cyan">Ana Sayfa</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/tr/malzemeler/" className="hover:text-cyan">Malzemeler</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-ink-soft" aria-current="page">{c.name}</span>
          </nav>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">LED ekran malzemeleri · {MATERIALS_LIST_DATE}</p>
          <h1
            id="malzeme-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {c.h1}
          </h1>
          {c.intro.map((p, i) => (
            <p key={i} id={i === 0 ? "malzeme-lead" : undefined} className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {panel ? "Panel başına fiyatlar USD, KDV ve nakliye hariçtir; kura göre değişebilir. Nihai tutar yazılı teklifle kesinleşir." : MATERIALS_PRICE_NOTE}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp&apos;tan fiyat sorun
            </a>
            <Link
              href="/tr/quote/?tip=servis"
              className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Yazılı teklif iste
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
          {sections.map((s, i) => (
            <MaterialPriceTable key={s.title} section={s} id={`bolum-${i + 1}`} />
          ))}
          {panel ? (
            <p className="max-w-3xl text-[13px] leading-relaxed text-ink-muted">
              Aynı piksel aralığında site fiyatı olan varyantlar (P2.5 GOB, P1.86, P1.86 GOB esnek, P3.07 45° kesik) o fiyatla
              listelenir. Diğer paneller, yayımlanmış panellerin eski liste fiyatına oranının ortalamasıyla hesaplanmıştır: iç mekân ×
              {ratioTr(PANEL_AVG_RATIO.ic)}, dış mekân ve tek renk ×{ratioTr(PANEL_AVG_RATIO.dis)}. Yayımlanmış 12 panel için{" "}
              <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">LED ekran fiyatları</Link> sayfasına bakın.
            </p>
          ) : null}
        </div>
      </section>

      {models.length ? (
        <section className="border-t border-border bg-band/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Model sayfaları</h2>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {models.map((m) => (
                <Link key={m.slug} href={materialModelPath(m)} className="font-semibold text-cyan hover:underline">
                  {getMaterialItem(m.itemId)?.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Sık sorulanlar</h2>
          <div className="mt-6">
            <HomeFaq faqs={c.faqs} />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {MATERIAL_CATEGORIES.filter((x) => x.slug !== c.slug).map((x) => (
              <Link key={x.slug} href={categoryPath(x.slug)} className="font-semibold text-cyan hover:underline">
                {x.name}
              </Link>
            ))}
            <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">Fiyat hesaplayıcı</Link>
          </div>
        </div>
      </section>
    </>
  );
}
