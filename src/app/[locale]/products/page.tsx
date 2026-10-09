import type { Metadata } from "next";
import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { ProductSeriesGrid } from "@/components/products/ProductSeriesGrid";
import { ItemListJsonLd } from "@/components/seo/ItemListJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getProducts } from "@/content/products";
import { getSeo } from "@/content/seo";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { modelUrlForPrice } from "@/content/models";
import { PANEL_PRICES, panelProductsJsonLd } from "@/content/prices";
import { ProductGroupGrid } from "@/components/products/ProductGroupGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  PRODUCT_GROUPS,
  groupsByFamily,
  productGroupPath,
  type ProductFamily,
} from "@/content/categories";

const PRODUCT_FAMILY_EN: Record<ProductFamily, string> = {
  "Dış Mekân LED Ekranlar": "Outdoor LED displays",
  "İç Mekân LED Ekranlar": "Indoor LED displays",
  "Kiralık LED Ekranlar": "Rental LED displays",
  "Poster ve Totem LED Ekranlar": "Poster and totem LED displays",
  "Modül ve Kontrol Sistemleri": "Modules and control systems",
};
import { getProductGroupEn } from "@/content/product-groups-en";
import { CANONICAL_LINEUP } from "@/content/product-lineup";
import { ArrowRight, Calculator, FileText } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "products");
  // TR + EN hubs are indexable (EN has group landings + pricedPanels). AR/RU stay thin noindex.
  if (locale === "tr" || locale === "en") {
    return buildPageMetadata({
      locale,
      path: "/products",
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      hreflangLocales: ["tr", "en"],
    });
  }
  return {
    ...buildPageMetadata({
      locale,
      path: "/products",
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      hreflangLocales: [],
    }),
    robots: { index: false, follow: true },
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const products = getProducts(locale);
  const seo = getSeo(locale, "products");
  const pageCopy = dict.page.products;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          {
            name: dict.nav.products,
            item: absoluteUrl(`/${locale}/products`),
          },
        ]}
      />
      {(locale === "tr" || locale === "en") ? (
        <>
          <SpeakableJsonLd
            pageUrl={absoluteUrl(`/${locale}/products/`)}
            name={seo.h1 ?? pageCopy.title}
            description={seo.intro ?? pageCopy.description}
            cssSelectors={["#products-h1", "#products-lead"]}
            mainEntity={{ "@id": `${absoluteUrl(`/${locale}/products/`)}#service` }}
          />
        </>
      ) : null}
      <ItemListJsonLd
        name={seo.h1 ?? pageCopy.title}
        description={seo.intro ?? pageCopy.description}
        items={products.map((product) => ({
          name: product.name,
          url: absoluteUrl(`/${locale}/products/#${product.slug}`),
          image: product.image,
        }))}
      />
      <ServiceJsonLd locale={locale} />
      {locale === "tr" || locale === "en" ? (
        <>
          <ItemListJsonLd
            name={locale === "tr" ? "LED ekran ürün grupları" : "LED display product groups"}
            items={PRODUCT_GROUPS.map((g) => ({
              name:
                locale === "en" ? (getProductGroupEn(g.slug)?.name ?? g.name) : g.name,
              url: absoluteUrl(productGroupPath(g, locale === "en" ? "en" : "tr")),
              image: g.image,
            }))}
          />
          <section className="bg-white pb-10 pt-8 md:pb-14 md:pt-12">
            <div className="mx-auto grid max-w-7xl min-w-0 items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:gap-14 lg:px-8">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border-[6px] border-band bg-surface shadow-card md:order-none">
                <OptImage
                  src="/projects/modules/indoor-install.jpg"
                  alt={
                    locale === "en"
                      ? "Indoor LED display mounted on a meeting-room wall"
                      : "Toplantı salonunda duvara monte iç mekân LED ekran"
                  }
                  fill
                  priority
                  sizes="(min-width: 768px) 600px, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{pageCopy.eyebrow}</p>
                <h1 id="products-h1" className="text-balance font-display text-[clamp(1.9rem,1.4rem+2vw,2.9rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
                  {seo.h1 ?? pageCopy.title}
                </h1>
                <p id="products-lead" className="mt-4 max-w-xl text-pretty text-base leading-[1.75] text-ink-soft">{seo.intro ?? pageCopy.description}</p>
                <AiPriceSourceNote
                  locale={locale === "en" ? "en" : "tr"}
                  lead={locale === "en" ? "Published panel USD:" : "Panel list fiyatı:"}
                />
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                  {locale === "en"
                    ? "Transparent, flexible, poster, rental and control products are confirmed in a written quote."
                    : "Şeffaf, esnek, poster, kiralık ve kontrol ürünlerinde nihai tutar yazılı teklifle kesinleşir."}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/${locale}/quote/`}
                    className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600"
                  >
                    <FileText className="h-4 w-4" aria-hidden />
                    {locale === "en" ? "Request a quote" : "Teklif isteyin"}
                  </Link>
                  <Link
                    href={`/${locale}/hesaplayici/`}
                    className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-ink-soft hover:border-cyan/50 hover:text-cyan"
                  >
                    <Calculator className="h-4 w-4" aria-hidden />
                    {locale === "en" ? "Price calculator" : "Fiyatı hesaplayın"}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                panelProductsJsonLd(
                  PANEL_PRICES,
                  absoluteUrl(`/${locale}/products/`),
                  locale === "en"
                    ? "LED display module sales, survey and installation"
                    : "LED ekran modülü satışı, keşif ve montaj",
                  modelUrlForPrice(absoluteUrl),
                  locale === "en" ? "en" : "tr",
                ),
              ),
            }}
          />
          <section id="panel-fiyatlari" className="bg-white pb-14 md:pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
                {locale === "en" ? "2026 panel price list" : "2026 panel fiyat listesi"}
              </h2>
              <p className="mb-4 mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
                {locale === "en" ? (
                  <>
                    Published 12 NXTIONSTAR panel prices on this hub. Full list and m² examples:{" "}
                    <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                      LED display prices
                    </Link>
                    . Prices are in USD per panel; VAT and shipping excluded.
                  </>
                ) : (
                  <>
                    Bu hub’daki yayımlanmış 12 NXTIONSTAR panel fiyatı. Tam liste ve m² örnekler:{" "}
                    <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                      LED ekran fiyatları
                    </Link>
                    {" · "}
                    <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                      fiyat listesi
                    </Link>
                    . Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir.
                  </>
                )}
              </p>
              <PanelPriceTable
                locale={locale === "en" ? "en" : "tr"}
                panels={PANEL_PRICES}
                caption={
                  locale === "en" ? "Panel prices (USD, per panel)" : "Panel fiyatları (USD, panel başına)"
                }
              />
            </div>
          </section>

          <section id="gruplar" className="bg-white pb-14 md:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                align="left"
                eyebrow={locale === "en" ? "Product groups" : "Ürün grupları"}
                title={locale === "en" ? "Choose by use case" : "Kullanım alanına göre seçin"}
                description={
                  locale === "en"
                    ? "Group pages describe use cases; some products are confirmed in a written quote. Model pages stay on the TR catalog."
                    : "Ürünleri kullanım ortamına göre beş başlıkta topladık. Her sayfada ürün tipinin tanımı, uygulama tipleri, kullanım alanları, teknik bilgi alanları ve sık sorulan sorular yer alır."
                }
              />
              <aside className="mb-10 max-w-3xl border-y border-border py-6 text-sm leading-relaxed text-ink-soft" data-canonical-lineup>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {locale === "en" ? "Canonical pixel pitches" : "Kanonik piksel aralıkları"}
                </p>
                <ul className="mt-3 space-y-1.5 text-ink">
                  <li>
                    <span className="font-semibold">{locale === "en" ? "Outdoor:" : "Dış mekân:"}</span>{" "}
                    {(locale === "en"
                      ? CANONICAL_LINEUP.outdoor.pitches.map((p) =>
                          p.replace("önden servis", "front service"),
                        )
                      : CANONICAL_LINEUP.outdoor.pitches
                    ).join(", ")}
                  </li>
                  <li>
                    <span className="font-semibold">{locale === "en" ? "Indoor:" : "İç mekân:"}</span>{" "}
                    {CANONICAL_LINEUP.indoor.pitches.join(", ")}
                  </li>
                  <li>
                    <span className="font-semibold">GOB:</span> {CANONICAL_LINEUP.gob.pitches.join(", ")}
                  </li>
                  <li>
                    <span className="font-semibold">{locale === "en" ? "Fine pitch:" : "İnce pitch:"}</span>{" "}
                    {CANONICAL_LINEUP.finePitch.pitches.join(", ")}
                  </li>
                  <li>
                    <span className="font-semibold">{locale === "en" ? "Flexible:" : "Esnek:"}</span>{" "}
                    {CANONICAL_LINEUP.flexible.pitches.join(", ")}
                  </li>
                </ul>
              </aside>
              <div className="space-y-12">
                {groupsByFamily().map((f) => (
                  <div key={f.family}>
                    <h3 className="mb-5 border-l-4 border-cyan pl-3 font-display text-lg font-bold text-ink sm:text-xl">
                      {locale === "en" ? PRODUCT_FAMILY_EN[f.family] : f.family}
                    </h3>
                    <ProductGroupGrid
                      groups={f.groups}
                      showService={false}
                      headingLevel="h4"
                      locale={locale === "en" ? "en" : "tr"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {locale === "tr" ? (
            <>
              <section id="seriler" className="bg-band py-14 md:py-20 prose-seo">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <SectionHeading
                    align="left"
                    eyebrow="NXTIONSTAR"
                    title={pageCopy.moduleModelsHeading}
                    description={pageCopy.moduleModelsLead}
                  />
                  <ProductSeriesGrid locale={locale} />
                </div>
              </section>

              <section className="bg-white py-14 md:py-20 prose-seo">
                <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                  <div className="overflow-hidden rounded-[2rem] border-[6px] border-band bg-white">
                    <OptImage
                      src="/projects/modules/module-catalog-sheet.jpg"
                      alt="LED modül çeşitleri — iç mekân, esnek ve dış mekân modelleri"
                      sizes="(min-width: 1024px) 520px, 92vw"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <div>
                    <SectionHeading
                      align="left"
                      eyebrow="Rehber"
                      title="Kullanım amacına göre doğru ekranı seçin"
                      description="Karar vermeden önce kısa rehberlerimizi inceleyebilirsiniz."
                      className="mb-6 md:mb-6"
                    />
                    <nav aria-label="Kullanım amacına göre rehberler" className="grid gap-3 sm:grid-cols-2">
                      {[
                        { title: "Kontrol odası / ince pitch", body: "Çok yakın izleme mesafesi olan kontrol odası ve yönetim salonları.", href: "/tr/rehber/konferans-salonu-led/" },
                        { title: "Mağaza, lobi ve salon", body: "Mağaza içi, showroom, otel lobisi ve etkinlik salonları.", href: "/tr/rehber/ic-mekan-led-ekran/" },
                        { title: "Dış mekân ve cephe", body: "Cephe, reklam alanı ve tabela uygulamaları.", href: "/tr/rehber/dis-mekan-led-ekran/" },
                        { title: "Kiralık sahne ve etkinlik", body: "Konser, fuar ve lansmanlar için kiralama kabinleri.", href: "/tr/rehber/led-ekran/" },
                        { title: "Vitrin ve şeffaf LED", body: "Mağaza vitrininde ürün teşhirini koruyan yüksek şeffaflıklı uygulamalar.", href: "/tr/products/seffaf-led-ekran/" },
                        { title: "Transparan / mesh LED", body: "Cam cephe ölçeğinde arkası görünen ızgara form faktörü.", href: "/tr/products/transparan-led-ekran/" },
                        { title: "Totem ve LED poster", body: "Dikey LED poster ve dijital totem uygulamaları.", href: "/tr/rehber/poster-led-ekran/" },
                      ].map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-cyan/40 hover:shadow-card"
                        >
                          <span className="block font-display text-sm font-bold text-ink">{item.title}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-ink-muted">{item.body}</span>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan">
                            Rehberi okuyun <ArrowRight className="h-3 w-3" aria-hidden />
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className="border-t border-border bg-band/40 py-12 md:py-16">
              <div className="mx-auto max-w-7xl space-y-3 px-4 text-sm leading-relaxed text-ink-soft sm:px-6 lg:px-8">
                <h2 className="font-display text-xl font-bold text-ink">Prices and brand</h2>
                <p>
                  Published panel prices are on{" "}
                  <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                    LED display prices
                  </Link>
                  . Brand overview:{" "}
                  <Link href="/en/nxtionstar/" className="font-semibold text-cyan hover:underline">
                    NXTIONSTAR
                  </Link>
                  . FAQ:{" "}
                  <Link href="/en/sss/" className="font-semibold text-cyan hover:underline">
                    FAQ
                  </Link>
                  . Use arledscreen.com only — not legacy arleds.com.
                </p>
              </div>
            </section>
          )}
        </>
      ) : (
        <Section
          titleAs="h1"
          titleId="products-h1"
          descriptionId="products-lead"
          eyebrow={pageCopy.eyebrow}
          title={seo.h1 ?? pageCopy.title}
          description={seo.intro ?? pageCopy.description}
          className="prose-seo"
        >
          <div className="mb-8 rounded-2xl border border-border/80 bg-surface/80 px-5 py-4 sm:px-6">
            <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
              {pageCopy.moduleModelsHeading}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{pageCopy.moduleModelsLead}</p>
          </div>
          <div className="mb-8 overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm">
            <OptImage
              src="/projects/modules/module-catalog-sheet.jpg"
              alt="LED module varieties — indoor, flexible and outdoor models"
              sizes="(max-width: 1280px) 100vw, 1216px"
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <ProductSeriesGrid locale={locale} />
        </Section>
      )}
    </>
  );
}
