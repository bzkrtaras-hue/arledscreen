import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Calculator, CalendarDays, Check, ChevronRight, FileText, MapPin } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import {
  CALC_EXTRAS,
  BRAND_SUBJECT_DATASETS,
  PRICE_VALID_UNTIL,
  fmtM2,
  fmtUsd,
  nxtionstarBrandRef,
  panelProductsJsonLd,
  pricedPanelsDatasetJsonLd,
  pricesForGroup,
  type PanelPrice,
} from "@/content/prices";
import { modelPath, modelsForGroup, modelUrlForPrice, SPEC_LABELS, type SpecKey } from "@/content/models";
import { OptImage } from "@/components/ui/opt-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/FadeIn";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { ProductGroupGrid } from "@/components/products/ProductGroupGrid";
import {
  PRODUCT_GROUPS,
  getProductGroup,
  productGroupPath,
  relatedReferences,
} from "@/content/categories";
import { getProductGroupEn, PRODUCT_GROUP_EN_SLUGS } from "@/content/product-groups-en";
import { ProductGroupEnLanding } from "@/components/products/ProductGroupEnLanding";
import { displayCompany } from "@/content/trust";
import { buildPageMetadata, buildTrOnlyMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const g of PRODUCT_GROUPS) {
    params.push({ locale: "tr", slug: g.slug });
    if (PRODUCT_GROUP_EN_SLUGS.includes(g.slug)) {
      params.push({ locale: "en", slug: g.slug });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const g = getProductGroup(slug);
  if (!g) return {};
  if (raw === "en") {
    const en = getProductGroupEn(slug);
    if (!en) return {};
    return buildPageMetadata({
      locale: "en" as Locale,
      path: `/products/${g.slug}/`,
      title: en.title,
      description: en.description,
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw === "tr" && PRODUCT_GROUP_EN_SLUGS.includes(slug)) {
    return buildPageMetadata({
      locale: "tr" as Locale,
      path: `/products/${g.slug}/`,
      title: g.title,
      description: g.description,
      hreflangLocales: ["tr", "en"],
    });
  }
  return buildTrOnlyMetadata({ path: `/products/${g.slug}`, title: g.title, description: g.description });
}

const priceLabel = (p: PanelPrice) => `${p.pitch}${p.surface ? ` ${p.surface}` : ""}${p.frontService ? " önden servis" : ""}`;

/** Direct, quotable answer built only from the published 2026 panel price list. */
function priceAnswer(name: string, prices: PanelPrice[]): { question: string; answer: string } | null {
  if (!prices.length) return null;
  const lo = prices.reduce((a, b) => (b.usd < a.usd ? b : a));
  const hi = prices.reduce((a, b) => (b.usd > a.usd ? b : a));
  return {
    question: `${name} fiyatı ne kadar?`,
    answer:
      `2026 fiyat listemizde NXTIONSTAR ${name} panelleri, panel başına ${fmtUsd(lo.usd)} USD (${priceLabel(lo)}) ile ${fmtUsd(hi.usd)} USD (${priceLabel(hi)}) arasındadır; KDV ve nakliye hariçtir; ücretsiz kargo yoktur. ` +
      `Makinece kaynak: ai-shopping.json pricedPanels, catalog.json ve feeds/merchant-priced-panels.tsv. ` +
      (lo.moduleMm || hi.moduleMm
        ? ""
        : `1 m² yaklaşık 19,53 panel ettiği için yalnızca modül bedeli m² başına yaklaşık ${fmtM2(lo.usd)} – ${fmtM2(hi.usd)} USD olur. `) +
      `Toplam maliyete atölye işçiliği (${CALC_EXTRAS.laborPerM2} USD/m²), kontrol kartı (${CALC_EXTRAS.controlCard} USD) ve sürücü + yazılım (${CALC_EXTRAS.driverSoftware} USD) eklenir; nihai fiyat keşif sonrası yazılı teklifle kesinleşir.`,
  };
}

export default async function ProductGroupPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (locale !== "tr" && locale !== "en") notFound();
  const g = getProductGroup(slug);
  if (!g) notFound();
  if (locale === "en") {
    const en = getProductGroupEn(slug);
    if (!en) notFound();
    return <ProductGroupEnLanding group={g} en={en} />;
  }

  const url = absoluteUrl(productGroupPath(g));
  const refs = relatedReferences(g, 4);
  const others = [
    ...PRODUCT_GROUPS.filter((x) => x.slug !== g.slug && x.family === g.family),
    ...PRODUCT_GROUPS.filter((x) => x.family !== g.family),
  ].slice(0, 3);
  const quoteHref = `/tr/quote/?tip=${g.projectType}`;
  const prices = pricesForGroup(g.slug);
  const models = modelsForGroup(g.slug);
  const quickPrice = priceAnswer(g.name, prices);
  const isControlGroup = models.some((m) => m.kind === "kontrol") || Boolean(g.brandName);
  const COMPARE_KEYS: SpecKey[] = isControlGroup
    ? ["ledType", "loadCapacity", "ethernetPorts", "videoInputs", "media", "software", "power", "control"]
    : ["pitch", "moduleSize", "matrix", "pixels", "density", "ledType", "protection", "service", "voltage", "brightness", "refresh", "scan", "power", "viewingAngle", "current", "viewDistance"];
  // Keep a column only when at least half of the models have a value (never a column of dashes).
  const compareCols = COMPARE_KEYS.filter((c) => models.filter((m) => m.specs[c]).length * 2 >= models.length);

  const tabs = [
    { href: "#secenekler", label: models.length ? "Modeller" : "Fiyat teklifi" },
    ...(models.length ? [{ href: "#teknik", label: "Karşılaştırma" }] : []),
    ...(g.techGallery?.length ? [{ href: "#teknoloji", label: "Teknoloji" }] : []),
    { href: "#kullanim", label: "Kullanım alanları" },
    ...(refs.length ? [{ href: "#projeler", label: "Projeler" }] : []),
    { href: "#sss", label: "SSS" },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: g.h1,
    serviceType: g.name,
    description: g.description,
    url,
    image: absoluteUrl(g.image),
    provider: { "@id": `${SITE_URL}/#organization` },
    brand:
      (g.brandName ?? "NXTIONSTAR") === "NXTIONSTAR"
        ? nxtionstarBrandRef()
        : { "@type": "Brand", name: g.brandName },
    areaServed: { "@type": "Country", name: "Türkiye" },
    isRelatedTo: BRAND_SUBJECT_DATASETS,
    ...(prices.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: Math.min(...prices.map((x) => x.usd)).toFixed(2),
            highPrice: Math.max(...prices.map((x) => x.usd)).toFixed(2),
            offerCount: prices.length,
            priceValidUntil: PRICE_VALID_UNTIL,
            description:
              "Panel (modül) başına USD fiyat aralığı; KDV ve nakliye hariç. Ücretsiz kargo yok; nakliye yazılı teklifle.",
            seller: { "@id": `${SITE_URL}/#organization` },
          },
        }
      : {}),
  };
  const productsLd = prices.length ? panelProductsJsonLd(prices, url, undefined, modelUrlForPrice(absoluteUrl)) : null;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Ürünler", item: absoluteUrl("/tr/products/") },
          { name: g.name, item: url },
        ]}
      />
      <FaqJsonLd faqs={quickPrice ? [quickPrice, ...g.faqs] : g.faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={g.h1}
        description={g.description}
        cssSelectors={["#pg-h1", "#pg-lead"]}
      />
      {/* Always emit Dataset — quote-only groups still point AI shoppers at pricedPanels. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {productsLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsLd) }} />
      ) : null}

      {/* Intro: framed photo left, breadcrumb + H1 + section tabs right */}
      <section className="bg-white pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="mx-auto grid max-w-7xl min-w-0 items-start gap-8 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
          <div className="md:sticky md:top-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-[6px] border-band bg-surface shadow-card">
              <OptImage
                src={g.image}
                alt={g.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 42vw, 92vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink shadow-sm">
                {g.tag}
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <nav aria-label="Sayfa konumu">
              <ol className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
                <li>
                  <Link href="/tr/" className="hover:text-cyan">Ana Sayfa</Link>
                </li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
                <li>
                  <Link href="/tr/products/" className="hover:text-cyan">Ürünler</Link>
                </li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
                <li aria-current="page" className="font-semibold text-ink-soft">{g.name}</li>
              </ol>
            </nav>
            <h1 id="pg-h1" className="mt-3 text-balance font-display text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
              {g.h1}
              <span className="sr-only">: </span>
              <span id="pg-lead" className="mt-2 block text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] font-semibold leading-snug tracking-[-0.01em] text-cyan">
                {g.lead}
              </span>
            </h1>
            <nav aria-label="Sayfa bölümleri" className="mt-5 flex flex-wrap gap-2">
              {tabs.map((t, i) => (
                <a
                  key={t.href}
                  href={t.href}
                  className={
                    i === 0
                      ? "inline-flex min-h-10 items-center rounded-xl bg-cyan px-3.5 text-[13.5px] font-semibold text-white shadow-pill hover:bg-cyan-600"
                      : "inline-flex min-h-10 items-center rounded-xl bg-band px-3.5 text-[13.5px] font-semibold text-ink-soft hover:bg-cyan-50 hover:text-cyan-700"
                  }
                >
                  {t.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 space-y-4 text-base leading-[1.75] text-ink-soft">
              {g.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {g.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 rounded-2xl bg-band px-4 py-3 text-[14.5px] font-medium text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
            {g.types.length ? (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Uygulama tipleri</p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {g.types.map((t) => (
                    <li key={t} className="rounded-full border border-border bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappHref(g.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan sorun
              </a>
              <Link
                href={quoteHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600"
              >
                <FileText className="h-4 w-4" aria-hidden />
                Teklif isteyin
              </Link>
              <Link
                href="/tr/hesaplayici/"
                className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-ink-soft hover:border-cyan/50 hover:text-cyan"
              >
                <Calculator className="h-4 w-4" aria-hidden />
                Fiyatı hesaplayın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Options / pricing */}
      <section id="secenekler" className="scroll-mt-28 bg-band py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {models.length ? (
            <>
              <SectionHeading
                align="left"
                eyebrow={isControlGroup ? `${g.brandName ?? "Kontrol"} modelleri` : "NXTIONSTAR modelleri"}
                title={`${g.name} — öne çıkan modeller`}
                description={
                  isControlGroup
                    ? "Özellikler üretici föylerinden alınmıştır. İlk bakışta yükleme kapasitesi, portlar ve yazılımı karşılaştırın; detay için modele tıklayın."
                    : "Her modelin teknik özelliklerini, görsellerini ve fiyat bilgisini kendi sayfasında bulabilirsiniz. Bir model seçerek detaylara ulaşın."
                }
              />
              <ul
                className={
                  isControlGroup
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
                }
              >
                {models.map((m, i) => (
                  <FadeIn as="li" key={m.group + m.slug} delay={i * 0.05}>
                    <Link
                      href={modelPath(m)}
                      className={
                        isControlGroup
                          ? "group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:ring-2 hover:ring-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan glass-card"
                          : "group flex h-full min-h-28 flex-col items-center justify-center rounded-2xl px-3 py-5 text-center transition hover:-translate-y-0.5 hover:ring-2 hover:ring-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan glass-card"
                      }
                    >
                      {isControlGroup ? (
                        <>
                          <div className="relative aspect-[16/10] w-full bg-surface">
                            <OptImage
                              src={m.image}
                              alt={m.imageAlt}
                              fill
                              sizes="(max-width: 1024px) 50vw, 33vw"
                              className="object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col px-4 py-4 text-left">
                            <span className="font-display text-lg font-extrabold text-cyan">{m.chip}</span>
                            <span className="mt-1 text-sm font-semibold text-ink">{m.name}</span>
                            {m.specs.loadCapacity ? (
                              <span className="mt-2 text-[13px] leading-snug text-ink-muted">
                                {m.specs.loadCapacity.value}
                              </span>
                            ) : null}
                            <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-ink-soft group-hover:text-cyan">
                              Teknik özellikler <ArrowRight className="h-3 w-3" aria-hidden />
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="font-display text-xl font-extrabold text-cyan">{m.chip}</span>
                          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                            {m.kind === "dis" ? "Dış mekân" : m.kind === "esnek" ? "Esnek" : m.kind === "gob" ? "GOB" : "İç mekân"}
                          </span>
                          <span className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-semibold text-ink-soft group-hover:text-cyan">
                            Teknik özellikler <ArrowRight className="h-3 w-3" aria-hidden />
                          </span>
                        </>
                      )}
                    </Link>
                  </FadeIn>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                {isControlGroup ? (
                  <Link
                    href={quoteHref}
                    className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600"
                  >
                    <FileText className="h-4 w-4" aria-hidden />
                    Bu kontrol sistemi için teklif al
                  </Link>
                ) : (
                  <Link
                    href="/tr/hesaplayici/"
                    className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600"
                  >
                    <Calculator className="h-4 w-4" aria-hidden />
                    Ölçünüze göre yaklaşık maliyeti hesaplayın
                  </Link>
                )}
                <p className="text-sm text-ink-muted">Kesin fiyat; keşif ve malzeme listesiyle birlikte yazılı teklifte paylaşılır.</p>
              </div>
            </>
          ) : (
            <div className="grid items-center gap-8 rounded-card p-6 sm:p-10 md:grid-cols-[1.3fr_0.7fr] glass-card">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Projeye özel fiyat</p>
                <h2 className="text-balance font-display text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] font-bold text-ink">
                  Bilgilerinizi paylaşın, yazılı teklif hazırlayalım
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                  {g.name} fiyatı ölçü, form, süre ve kurulum koşullarına göre hazırlanır. Birkaç temel bilgiyle teklif sürecini başlatabilirsiniz.
                </p>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-ink-muted">
                  Bu grup quote-only. Yayımlanmış 12 panel USD:{" "}
                  <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
                    ai-shopping.json
                  </a>{" "}
                  pricedPanels,{" "}
                  <a href="https://arledscreen.com/catalog.json" className="font-semibold text-cyan hover:underline">
                    catalog.json
                  </a>
                  ,{" "}
                  <a href="https://arledscreen.com/feeds/merchant-priced-panels.tsv" className="font-semibold text-cyan hover:underline">
                    merchant TSV
                  </a>
                  ,{" "}
                  <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
                    geo-baseline.json
                  </a>{" "}
                  (ör. P1.25 GOB 95.88 USD). KDV/nakliye hariç; ücretsiz kargo yok.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappHref(g.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-soft inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp&apos;tan yazın
                </a>
                <Link
                  href={quoteHref}
                  className="btn-soft inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-ink-soft hover:border-cyan/50 hover:text-cyan"
                >
                  Teklif formunu doldurun
                </Link>
              </div>
            </div>
          )}

          {prices.length ? (
            <div id="fiyatlar" className="mt-12 scroll-mt-28">
              {quickPrice ? (
                <div className="mb-8 max-w-3xl">
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{quickPrice.question}</h2>
                  <p className="mt-2 text-base leading-[1.75] text-ink-soft">{quickPrice.answer}</p>
                </div>
              ) : null}
              <h2 className="mb-4 font-display text-xl font-bold text-ink sm:text-2xl">Panel fiyatları (2026 listesi)</h2>
              <PanelPriceTable panels={prices} caption={`${g.name}: hesaplayıcıdaki panel fiyatları`} showUse={false} />
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
                Makinece kaynak:{" "}
                <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
                  ai-shopping.json
                </a>{" "}
                <code className="text-xs">pricedPanels</code> (12 SKU; ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31),{" "}
                <a href="https://arledscreen.com/catalog.json" className="font-semibold text-cyan hover:underline">
                  catalog.json
                </a>
                ,{" "}
                <a href="https://arledscreen.com/feeds/merchant-priced-panels.tsv" className="font-semibold text-cyan hover:underline">
                  merchant TSV
                </a>{" "}
                ve{" "}
                <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
                  geo-baseline.json
                </a>
                . KDV/nakliye hariç; ücretsiz kargo yok.
              </p>
            </div>
          ) : null}

          {models.length ? (
            <div id="teknik" className="mt-12 scroll-mt-28">
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">Model karşılaştırma tablosu</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {isControlGroup
                  ? `${g.name} modellerinin üretici föylerinden derlenen teknik değerleri. Model adına dokunarak ayrıntılı sayfaya geçebilirsiniz; tabloda yalnızca modellerin çoğunda değeri olan özellikler yer alır.`
                  : `${g.name} grubundaki NXTIONSTAR modüllerinin teknik değerleri. Model adına dokunarak ayrıntılı sayfaya geçebilirsiniz; tabloda yalnızca modellerin çoğunda doğrulanmış değeri olan özellikler yer alır; tüm değerler model sayfalarında listelenir.`}
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl glass-card">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-band text-xs uppercase tracking-wide text-ink">
                    <tr>
                      <th scope="col" className="px-4 py-3">Model</th>
                      {compareCols.map((c) => (
                        <th key={c} scope="col" className="px-4 py-3">{SPEC_LABELS[c]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((m, i) => (
                      <tr key={m.group + m.slug} className={i % 2 ? "bg-band/60" : ""}>
                        <th scope="row" className="px-4 py-2 font-semibold">
                          <Link href={modelPath(m)} className="inline-flex min-h-11 items-center text-cyan hover:underline">
                            {m.chip}
                          </Link>
                        </th>
                        {compareCols.map((c) => (
                          <td key={c} className="px-4 py-2 text-ink-soft">{m.specs[c]?.value ?? "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

        </div>
      </section>

      {g.techGallery?.length ? (
        <section id="teknoloji" className="scroll-mt-28 border-t border-border bg-white py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              align="left"
              eyebrow={g.techGalleryEyebrow ?? "Yüzey teknolojisi"}
              title={g.techGalleryTitle ?? "SMD, COB ve GOB karşılaştırması"}
              description={
                g.techGalleryDescription ??
                "İnce pitch LED ekranlarda yüzey seçimi görüntü kalitesi kadar dayanıklılığı da belirler. GOB (Glue on Board) koruyucu kaplama; COB çip-on-board; SMD klasik paket yapısıdır."
              }
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.techGallery.map((shot) => (
                <li key={shot.src}>
                  <figure className="overflow-hidden rounded-2xl border border-border bg-band">
                    <div className="relative aspect-[16/11] bg-white">
                      <OptImage
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="object-contain p-2"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm font-semibold text-ink">
                      {shot.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            {g.slug === "ince-pitch-led-ekran" ? (
              <p className="mt-8 text-center">
                <Link
                  href="/tr/products/gob-led-ekran/"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-cyan hover:underline"
                >
                  GOB LED Ekran grubuna geçin <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Use cases */}
      <section id="kullanim" className="scroll-mt-28 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Kullanım alanları" title={`${g.name} nerelerde kullanılır?`} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.uses.map((u, i) => (
              <FadeIn as="li" key={u.title} delay={i * 0.12} className="rounded-3xl bg-band p-6 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full font-display text-[15px] font-bold text-cyan-700 glass-card">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{u.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{u.body}</p>
              </FadeIn>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href={g.guide.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-cyan hover:underline">
              <BookOpen className="h-4 w-4" aria-hidden />
              {g.guide.label}
            </Link>
          </p>
        </div>
      </section>

      {refs.length ? (
        <section id="projeler" className="scroll-mt-28 border-t border-border bg-white py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Proje kayıtları"
              title="Bu gruptan tamamlanan projeler"
              description="Bilgiler proje kayıtlarında yer aldığı şekliyle verilmiştir."
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {refs.map((r) => (
                <li key={r.id} className="flex flex-col gap-2 rounded-2xl p-5 glass-card">
                  <h3 className="font-display text-base font-bold text-ink">{displayCompany(r)}</h3>
                  <p className="text-sm text-ink-soft">{r.detail}</p>
                  <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden />{r.location}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden />{r.date}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link href="/tr/projelerimiz/#liste" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-cyan hover:underline">
                Tüm proje kayıtları <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <section id="sss" className="scroll-mt-28 bg-band py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Sık sorulan sorular" title={`${g.name} hakkında sorular`} />
          <HomeFaq faqs={g.faqs} />
        </div>
      </section>

      <section className="bg-white py-14 md:py-16" aria-labelledby="diger-gruplar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="diger-gruplar" className="mb-6 font-display text-2xl font-bold text-ink">
            Diğer ürün grupları
          </h2>
          <ProductGroupGrid groups={others} showService={false} />
        </div>
      </section>

      <HomeCtaBand locale="tr" />
    </>
  );
}
