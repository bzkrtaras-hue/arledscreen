import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, ChevronRight, FileText } from "lucide-react";
import { getProductGroup, productGroupPath } from "@/content/categories";
import {
  LED_MODELS,
  SPEC_LABELS,
  SPEC_ORDER,
  getModel,
  modelPath,
  modelPrice,
  modelsForGroup,
  type LedModel,
  type ModelKind,
} from "@/content/models";
import { CALC_EXTRAS, fmtUsd, panelM2, panelModule } from "@/content/prices";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { absoluteUrl, SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ locale: string; slug: string; model: string }>;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return LED_MODELS.map((m) => ({ locale: "tr", slug: m.group, model: m.slug }));
}

const KIND_LABEL: Record<ModelKind, string> = {
  ic: "iç mekân",
  dis: "dış mekân",
  gob: "GOB kaplamalı iç mekân",
  esnek: "esnek (bükülebilir)",
  kontrol: "LED kontrol",
};

const USES: Record<ModelKind, { title: string; body: string }[]> = {
  ic: [
    { title: "Mağaza ve showroom", body: "Ürün tanıtımı, kampanya ve marka içerikleri." },
    { title: "Kafe ve restoran", body: "Menü, maç yayını ve etkinlik duyuruları." },
    { title: "Toplantı salonu", body: "Sunum ve video konferans için tek parça ekran." },
    { title: "Lobi ve karşılama", body: "Kurumsal girişlerde bilgilendirme ve yönlendirme." },
  ],
  gob: [
    { title: "Kontrol ve izleme odası", body: "Kamera, harita ve veri ekranlarının birlikte izlenmesi." },
    { title: "Stüdyo", body: "Yayın ve çekim alanlarında yakın plan görüntü." },
    { title: "Toplantı ve konferans", body: "Yakın mesafeden okunan sunum ve video içerikleri." },
    { title: "Yoğun kullanılan alanlar", body: "Dokunma ve darbe riskinin yüksek olduğu iç mekânlar." },
  ],
  dis: [
    { title: "Cephe ve reklam alanı", body: "Bina cephesinde ve yol kenarında reklam yayını." },
    { title: "Totem ve pano", body: "Mağaza girişi, akaryakıt istasyonu ve otopark tabelaları." },
    { title: "Belediye ve meydan", body: "Duyuru, etkinlik ve kamu bilgilendirme ekranları." },
    { title: "Etkinlik ve sahne", body: "Açık hava konser, festival ve lansmanlar." },
  ],
  esnek: [
    { title: "Kolon kaplama", body: "Lobi ve AVM'lerde kolonları dijital yüzeye dönüştürme." },
    { title: "Kavisli duvar", body: "Showroom ve karşılama alanlarında akıcı formlar." },
    { title: "Silindir ve kemer", body: "Mimari projelere özel düz olmayan yüzeyler." },
    { title: "Sahne dekoru", body: "Etkinlik ve stüdyolarda yaratıcı tasarımlar." },
  ],
  kontrol: [
    { title: "Yeni ekran kurulumu", body: "Modül + kontrol + yazılımın birlikte planlanması." },
    { title: "Kart / işlemci yenileme", body: "Arızalı veya kapasitesi yetmeyen kontrolün değişimi." },
    { title: "Uzaktan içerik", body: "Wi‑Fi, ağ veya bulut ile merkezi yayın yönetimi." },
    { title: "Sahne ve senkron yayın", body: "HDMI/SDI kaynaklı düşük gecikmeli gösterim." },
  ],
};

function describe(m: LedModel): string {
  if (m.kind === "kontrol") {
    const load = m.specs.loadCapacity?.value;
    const brand = m.brandName ?? "LED";
    return `${m.name}, ${brand} üretici föyüne dayanan ${KIND_LABEL.kontrol} cihazıdır.${load ? ` Yükleme: ${load}.` : ""} ${m.note}`;
  }
  const pitch = m.specs.pitch?.value ?? m.chip;
  const size = m.specs.moduleSize?.value;
  return `${m.name}, ${pitch} piksel aralığına sahip ${KIND_LABEL[m.kind]} LED ekran modülüdür.${size ? ` ${size} ölçüsündeki modüller yan yana getirilerek istenen ekran ölçüsü oluşturulur.` : ""} ${m.note}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, model } = await params;
  const m = getModel(slug, model);
  if (!m) return {};
  const price = modelPrice(m);
  const pitch = m.specs.pitch?.value ?? m.chip;
  if (m.kind === "kontrol") {
    const load = m.specs.loadCapacity?.value;
    return buildTrOnlyMetadata({
      path: modelPath(m).replace(/^\/tr/, ""),
      title: `${m.name} – Teknik Özellikler | ARLEDSCREEN`,
      description: `${m.name}: ${load ? `${load}. ` : ""}${m.specs.software ? `Yazılım: ${m.specs.software.value}. ` : ""}Kurulum ve yapılandırma ARLEDSCREEN. Teklif için iletişime geçin.`,
    });
  }
  return buildTrOnlyMetadata({
    path: modelPath(m).replace(/^\/tr/, ""),
    title: `${m.name.replace(/ LED Modül$/, " LED Ekran Modülü")} – Teknik Özellikler${price ? " ve Fiyat" : ""} | ARLEDSCREEN`,
    description: `${m.name}: ${pitch} piksel aralığı${m.specs.moduleSize ? `, ${m.specs.moduleSize.value} modül` : ""}${m.specs.matrix ? `, ${m.specs.matrix.value}` : ""}. Teknik özellikler${price ? `, panel fiyatı (${fmtUsd(price.usd)} USD)` : ""}, kullanım alanları ve teklif.`,
  });
}

export default async function ModelPage({ params }: PageProps) {
  const { locale, slug, model } = await params;
  if (locale !== "tr") notFound();
  const m = getModel(slug, model);
  const g = getProductGroup(slug);
  if (!m || !g) notFound();

  const url = absoluteUrl(modelPath(m));
  const price = modelPrice(m);
  const related = modelsForGroup(m.group).filter((x) => !(x.group === m.group && x.slug === m.slug));
  const wa = whatsappHref(`Merhaba, ${m.name} (${m.chip}) için bilgi ve teklif almak istiyorum. Yaklaşık ekran ölçüsü ve konum:`);
  const description = describe(m);
  const specRows = SPEC_ORDER.filter((key) => m.specs[key]).map((key) => ({ key, label: SPEC_LABELS[key], spec: m.specs[key] }));

  const brandName = m.brandName ?? g.brandName ?? "NXTIONSTAR";
  // GSC Merchant listings require offers.price (or priceSpecification.price).
  // Quote-only models (P8, esnek, kontrol) have no published USD — omit Offer
  // entirely. An Offer without price marks the item invalid in Search Console.
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: m.name,
    sku: `${brandName.slice(0, 3).toUpperCase()}-${m.slug.toUpperCase()}`,
    brand: { "@type": "Brand", name: brandName },
    itemCondition: "https://schema.org/NewCondition",
    category: m.kind === "kontrol" ? `${g.name}` : `${g.name} modülü`,
    image: absoluteUrl(m.image),
    description,
    url,
    additionalProperty: specRows
      .filter((r) => r.spec)
      .map((r) => ({ "@type": "PropertyValue", name: r.label, value: r.spec!.value })),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: price.usd.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: price.usd.toFixed(2),
              priceCurrency: "USD",
              valueAddedTaxIncluded: false,
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "C62", unitText: "panel" },
            },
            seller: { "@id": `${SITE_URL}/#organization` },
          },
        }
      : {}),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Ürünler", item: absoluteUrl("/tr/products/") },
          { name: g.name, item: absoluteUrl(productGroupPath(g)) },
          { name: m.name, item: url },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      <section className="bg-white pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
            <Link href="/tr/" className="hover:text-cyan">Ana Sayfa</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/tr/products/" className="hover:text-cyan">Ürünler</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href={productGroupPath(g)} className="hover:text-cyan">{g.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-ink-soft" aria-current="page">{m.chip}</span>
          </nav>

          <div className="mt-6 grid min-w-0 items-start gap-8 md:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="min-w-0 rounded-card bg-band p-3 md:sticky md:top-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.imageAlt}
                width={777}
                height={551}
                className="h-auto w-full rounded-[1.1rem] bg-white object-contain"
                fetchPriority="high"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">NXTIONSTAR · {g.name}</p>
              <h1 className="mt-2 text-balance font-display text-[clamp(1.6rem,1.1rem+2vw,2.5rem)] font-bold leading-tight text-ink">{m.name}</h1>
              <p className="mt-4 text-[15.5px] leading-[1.75] text-ink-soft">{description}</p>

              {price ? (
                <div className="mt-5 rounded-2xl border border-border bg-band/60 p-4">
                  <p className="text-sm text-ink-soft">
                    <span className="font-display text-2xl font-extrabold text-ink">{fmtUsd(price.usd)} USD</span>{" "}
                    <span className="text-ink-muted">/ panel</span>
                    <span className="ml-2 text-ink-muted">
                      {panelM2(price)
                        ? `(≈ ${panelM2(price)} USD/m² modül bedeli)`
                        : `(${panelModule(price)} modül; m² bedeli teklifte netleşir)`}
                    </span>
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                    Hesaplayıcıdaki 2026 listesine göre yaklaşık fiyattır; KDV ve nakliye hariçtir. İşçilik ({CALC_EXTRAS.laborPerM2} USD/m²), kontrol kartı ve yazılım ayrıca eklenir. Nihai fiyat yazılı teklifle kesinleşir.
                  </p>
                </div>
              ) : (
                <p className="mt-5 rounded-2xl border border-border bg-band/60 p-4 text-sm text-ink-soft">
                  Bu model için fiyat; ölçü, adet ve kurulum koşullarına göre yazılı teklifle verilir.
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/tr/quote/?tip=${g.projectType}`}
                  className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  Teklif isteyin
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp&apos;tan sorun
                </a>
                {m.kind !== "kontrol" ? (
                  <Link
                    href="/tr/hesaplayici/"
                    className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-ink-soft hover:border-cyan/50 hover:text-cyan"
                  >
                    <Calculator className="h-4 w-4" aria-hidden />
                    Fiyatı hesaplayın
                  </Link>
                ) : null}
              </div>

              <h2 id="teknik" className="mt-10 scroll-mt-28 font-display text-xl font-bold text-ink sm:text-2xl">Teknik özellikler</h2>
              <dl className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
                {specRows.map((r, i) => (
                  <div key={r.key} className={`grid gap-1 px-4 py-3 text-sm sm:grid-cols-[230px_1fr] sm:gap-4 sm:px-5 ${i % 2 ? "bg-band/60" : ""}`}>
                    <dt className="font-semibold text-ink">{r.label}</dt>
                    <dd className={r.spec ? "font-medium text-ink-soft" : "text-ink-muted"}>{r.spec?.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">
                {m.kind === "kontrol"
                  ? "Değerler ilgili üreticinin (Huidu / NovaStar / Colorlight) yayımlanmış teknik föylerinden alınmıştır. Proje koşullarına bağlı ayrıntılar yazılı teklifte netleşir."
                  : "Değerler modül üreticisinin teknik verileri ve fiyat hesaplayıcımızdaki modül bilgisinden alınmıştır. Tabloda yer almayan değerler (parlaklık, yenileme hızı, güç vb.) seçilen kabin ve proje koşullarına göre teklifle birlikte teknik föyde paylaşılır."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-band py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">Kullanım alanları</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {USES[m.kind].map((u) => (
              <li key={u.title} className="rounded-2xl p-5 glass-card">
                <h3 className="font-display text-base font-bold text-ink">{u.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{u.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            {m.kind === "kontrol" ? (
              <>
                Modül ve diğer kontrol seçenekleri için{" "}
                <Link href="/tr/products/led-modul-ve-kontrol-sistemleri/" className="font-semibold text-cyan hover:underline">
                  LED modül ve kontrol sistemleri
                </Link>{" "}
                sayfasına göz atabilirsiniz.
              </>
            ) : (
              <>
                Piksel aralığı seçimi için{" "}
                <Link href="/tr/rehber/piksel-araligi-secimi/" className="font-semibold text-cyan hover:underline">piksel aralığı rehberimize</Link>{" "}
                ve{" "}
                <Link href={g.guide.href} className="font-semibold text-cyan hover:underline">{g.guide.label.toLocaleLowerCase("tr-TR")}</Link>{" "}
                sayfasına göz atabilirsiniz.
              </>
            )}
          </p>
        </div>
      </section>

      {related.length ? (
        <section className="bg-white py-14 md:py-16" aria-labelledby="ilgili-modeller">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="ilgili-modeller" className="font-display text-xl font-bold text-ink sm:text-2xl">İlgili modeller</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => {
                const rp = modelPrice(r);
                return (
                  <li key={r.group + r.slug}>
                    <Link
                      href={modelPath(r)}
                      className="group flex h-full flex-col rounded-2xl bg-band p-2 transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.imageAlt} width={388} height={275} loading="lazy" className="aspect-[4/3] w-full rounded-xl bg-white object-contain" />
                      <span className="px-2 pb-2 pt-3">
                        <span className="block font-display text-[15px] font-bold text-ink group-hover:text-cyan">{r.name}</span>
                        <span className="mt-1 block text-[13px] text-ink-muted">
                          {r.specs.pitch?.value ?? r.chip}
                          {rp ? ` · ${fmtUsd(rp.usd)} USD/panel` : ""}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href={productGroupPath(g)} className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cyan hover:text-cyan-700">
              {g.name} sayfasına dönün <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
