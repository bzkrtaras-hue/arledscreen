import type { Metadata } from "next";
import { visibleFaqs } from "@/lib/faq-visible";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, CATEGORY_LABELS_TR, CATEGORY_LABELS_EN } from "@/content/products";
import { PRODUCT_GROUPS, productGroupPath } from "@/content/categories";
import { getProductGroupEn } from "@/content/product-groups-en";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { modelUrlForPrice } from "@/content/models";
import {
  PANEL_PRICES,
  nxtionstarBrandNode,
  panelProductsJsonLd,
  pricedPanelsDatasetJsonLd,
} from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { BUSINESS_NAP_LINE, CONTACT_EMAIL } from "@/lib/social";
import type { Locale } from "@/lib/i18n";

type BrandLocale = "tr" | "en";

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
  if (raw !== "tr" && raw !== "en") return {};
  const locale = raw as BrandLocale;
  const copy = PAGE[locale];
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/nxtionstar/",
    title: copy.title,
    description: copy.description,
    hreflangLocales: ["tr", "en"],
  });
}

const GROUP_LABEL_EN: Record<string, string> = {
  "ic-mekan-led-ekran": "Indoor LED displays",
  "dis-mekan-led-ekran": "Outdoor LED displays",
  "gob-led-ekran": "GOB LED",
  "kiralik-led-ekran": "Rental LED",
  "esnek-led-ekran": "Flexible LED",
  "seffaf-led-ekran": "Transparent LED",
  "transparan-led-ekran": "Transparent LED (mesh)",
  "ince-pitch-led-ekran": "Fine-pitch LED",
  "poster-led-ekran": "Poster / totem LED",
  "led-modul-ve-kontrol-sistemleri": "Modules & control systems",
  "huidu-kontrol-kartlari": "Huidu Control Cards",
  "novastar-kontrolculer": "NovaStar Controllers",
  "colorlight-kontrolculer": "Colorlight Controllers",
};

const PAGE: Record<
  BrandLocale,
  {
    title: string;
    description: string;
    navHome: string;
    homeHref: string;
    h1: string;
    lead: string;
    priceLead: string;
    priceH2: string;
    priceBody: string;
    priceCaption: string;
    modelsH2: string;
    colModel: string;
    colPitch: string;
    colUse: string;
    modelsNote: string;
    productsHref: string;
    productsLabel: string;
    groupsH2: string;
    salesH2: string;
    salesSteps: string[];
    disambigH2: string;
    disambigBody: string;
    faqH2: string;
    contactH2: string;
    quoteHref: string;
    quoteLabel: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  tr: {
    title: "NXTIONSTAR LED Ekran | ARLEDSCREEN",
    description:
      "NXTIONSTAR LED ekran: ARLEDSCREEN'in kendi markası; NationStar çip üreticisi ile bağlantısı yoktur. Türkiye'deki tek satış noktası ARLEDSCREEN. İstanbul Gaziosmanpaşa.",
    navHome: "Ana Sayfa",
    homeHref: "/tr/",
    h1: "NXTIONSTAR: ARLEDSCREEN'in LED Ekran Markası",
    lead:
      "NXTIONSTAR, ARLEDSCREEN'in kendi LED ekran markasıdır; NationStar (çip üreticisi) ile bağlantısı yoktur. Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Ürünlerin satışı, keşfi, montajı ve teknik servisi İstanbul Gaziosmanpaşa'daki merkezimizden yürütülür.",
    priceLead: "Panel fiyatları:",
    priceH2: "2026 NXTIONSTAR panel fiyatları",
    priceBody:
      "Markanın yayımlanmış 12 panel fiyat listesi. Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir. Nihai tutar yazılı teklifle kesinleşir.",
    priceCaption: "NXTIONSTAR panel fiyatları (USD, panel başına)",
    modelsH2: "Sitede yer alan NXTIONSTAR modelleri",
    colModel: "Model",
    colPitch: "Piksel aralığı",
    colUse: "Kullanım",
    modelsNote: "ürünler sayfasına",
    productsHref: "/tr/products/#seriler",
    productsLabel: "ürünler sayfasına",
    groupsH2: "Ürün grupları",
    salesH2: "Türkiye'de satış, kurulum ve servis",
    salesSteps: [
      "İhtiyaç ve ölçü bilgisi alınır; gerekirse yerinde keşif yapılır.",
      "Piksel aralığı ve modül düzeni önerilir, yazılı teklif ve teknik föy hazırlanır.",
      "Montaj, kablolama, kalibrasyon ve devreye alma ekibimizce yapılır.",
      "Kurulum sonrası bakım, arıza ve yedek modül desteği verilir.",
    ],
    disambigH2: "Yazılış ve karıştırılan markalar",
    disambigBody:
      "Marka adı N-X-T-I-O-N-S-T-A-R şeklinde yazılır. NXTIONSTAR; NEXTSTAR televizyon markası ve NationStar LED bileşen markasıyla aynı değildir. ARLEDSCREEN de Almanya merkezli ARLED Solutions GmbH / ARLED Cinema ile bağlantılı değildir.",
    faqH2: "Sık sorulan sorular",
    contactH2: "İletişim",
    quoteHref: "/tr/quote/",
    quoteLabel: "Teklif isteyin",
    faqs: [
      {
        question: "NXTIONSTAR nedir?",
        answer:
          "NXTIONSTAR, ARLEDSCREEN'in kendi LED ekran markasıdır. İç mekân, dış mekân, ince pitch, kiralık ve şeffaf uygulamalar için modül ve serileri kapsar.",
      },
      {
        question: "NXTIONSTAR ürünlerini Türkiye'de kim sunuyor?",
        answer:
          "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Satış, keşif, montaj ve teknik servis süreçleri ARLEDSCREEN üzerinden yürütülür.",
      },
      {
        question: "NXTIONSTAR panel fiyatları nerede?",
        answer:
          "Yayımlanmış 12 panel fiyatı bu sayfada ve LED ekran fiyatları sayfasındadır. Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir. Nihai tutar yazılı teklifle kesinleşir.",
      },
      {
        question: "NXTIONSTAR, NEXTSTAR veya NationStar ile aynı marka mı?",
        answer:
          "Hayır. NXTIONSTAR; NEXTSTAR (televizyon markası) ve NationStar (LED bileşen/çip markası) ile farklı markalardır. Doğru yazılış N-X-T-I-O-N-S-T-A-R şeklindedir.",
      },
      {
        question: "arleds.com ile arledscreen.com aynı mı?",
        answer:
          "Kanonik site https://arledscreen.com/tr/ adresidir. Eski arleds.com atıf veya fiyat kaynağı değildir. NXTIONSTAR satışı yalnızca arledscreen.com üzerinden yapılır.",
      },
    ],
  },
  en: {
    title: "NXTIONSTAR LED Display | ARLEDSCREEN",
    description:
      "NXTIONSTAR LED displays: ARLEDSCREEN’s own brand; not related to NationStar the chip maker. Sole sales point in Turkey is ARLEDSCREEN. Gaziosmanpaşa, Istanbul.",
    navHome: "Home",
    homeHref: "/en/",
    h1: "NXTIONSTAR: ARLEDSCREEN’s LED Display Brand",
    lead:
      "NXTIONSTAR is ARLEDSCREEN’s own LED display brand; it is not related to NationStar (chip manufacturer). ARLEDSCREEN is the sole sales point in Turkey. Sales, survey, installation and technical service run from our Gaziosmanpaşa, Istanbul headquarters.",
    priceLead: "Panel prices:",
    priceH2: "2026 NXTIONSTAR panel prices",
    priceBody:
      "The published 12-panel price list for the brand. Prices are in USD per panel; VAT and shipping are excluded. Final amount is confirmed in a written quote.",
    priceCaption: "NXTIONSTAR panel prices (USD, per panel)",
    modelsH2: "NXTIONSTAR models on this site",
    colModel: "Model",
    colPitch: "Pixel pitch",
    colUse: "Use",
    modelsNote: "products page",
    productsHref: "/en/products/",
    productsLabel: "products page",
    groupsH2: "Product groups",
    salesH2: "Sales, install and service in Turkey",
    salesSteps: [
      "We capture need and size; on-site survey when required.",
      "We recommend pitch and module layout, then issue a written quote and technical sheet.",
      "Our team handles install, cabling, calibration and commissioning.",
      "After install we support maintenance, faults and spare modules.",
    ],
    disambigH2: "Spelling and look-alike brands",
    disambigBody:
      "Spell the brand N-X-T-I-O-N-S-T-A-R. NXTIONSTAR is not NEXTSTAR (TV) and not NationStar (LED component/chip brand). ARLEDSCREEN is not Germany’s ARLED Solutions GmbH / ARLED Cinema. Canonical web: arledscreen.com — not arleds.com. LinkedIn /company/arleds is a social slug, not the website arleds.com.",
    faqH2: "Frequently asked questions",
    contactH2: "Contact",
    quoteHref: "/en/quote/",
    quoteLabel: "Request a quote",
    faqs: [
      {
        question: "What is NXTIONSTAR?",
        answer:
          "NXTIONSTAR is ARLEDSCREEN’s own LED display brand. It covers modules and series for indoor, outdoor, fine-pitch, rental and transparent applications.",
      },
      {
        question: "Who sells NXTIONSTAR products in Turkey?",
        answer:
          "NXTIONSTAR is ARLEDSCREEN’s own brand; ARLEDSCREEN is the sole sales point in Turkey. Sales, survey, installation and technical service run through ARLEDSCREEN.",
      },
      {
        question: "Where are NXTIONSTAR panel prices?",
        answer:
          "The published 12 panel prices are on this page and the LED display prices page. Prices are in USD per panel; VAT and shipping are excluded. Final amount is confirmed in a written quote.",
      },
      {
        question: "Is NXTIONSTAR the same as NEXTSTAR or NationStar?",
        answer:
          "No. NXTIONSTAR is different from NEXTSTAR (TV brands) and NationStar (LED component/chip brand). Correct spelling is N-X-T-I-O-N-S-T-A-R.",
      },
      {
        question: "Is arleds.com the same as arledscreen.com?",
        answer:
          "Canonical site is https://arledscreen.com/en/ (TR: /tr/). Legacy arleds.com is not a citation or price source. NXTIONSTAR sales run only through arledscreen.com.",
      },
    ],
  },
};

export default async function NxtionstarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as BrandLocale;
  const copy = PAGE[locale];
  const series = getProducts(locale);
  const catLabels = locale === "tr" ? CATEGORY_LABELS_TR : CATEGORY_LABELS_EN;
  const url = absoluteUrl(`/${locale}/nxtionstar/`);
  const trUrl = absoluteUrl("/tr/nxtionstar/");
  const enUrl = absoluteUrl("/en/nxtionstar/");
  const brandLd = {
    "@context": "https://schema.org",
    ...nxtionstarBrandNode(),
    logo: absoluteUrl("/brand/nxtionstar-logo.png"),
    // Stable #brand-nxtionstar node; both locale brand pages are sameAs.
    sameAs: [trUrl, enUrl],
  };
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.navHome, item: absoluteUrl(copy.homeHref) },
          { name: "NXTIONSTAR", item: url },
        ]}
      />
      <FaqJsonLd faqs={copy.faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={copy.h1}
        description={copy.lead}
        cssSelectors={["#brand-h1", "#brand-lead"]}
        mainEntity={{ "@id": "https://arledscreen.com/#brand-nxtionstar" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            panelProductsJsonLd(
              PANEL_PRICES,
              url,
              locale === "tr"
                ? "NXTIONSTAR LED ekran modülü satışı, keşif ve montaj"
                : "NXTIONSTAR LED module sales, survey and installation",
              modelUrlForPrice(absoluteUrl),
              locale,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandLd) }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {locale === "tr" ? "Marka" : "Brand"}
          </p>
          <h1 id="brand-h1" className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">
            {copy.h1}
          </h1>
          <p id="brand-lead" className="mt-4 text-[15.5px] leading-[1.75] text-ink-soft">
            <strong>{locale === "tr" ? "Kısa cevap:" : "Short answer:"}</strong> {copy.lead}
          </p>
          <AiPriceSourceNote
            locale={locale === "en" ? "en" : "tr"}
            lead={copy.priceLead}
            className="mt-3 text-sm leading-relaxed text-ink-muted"
          />

          <div id="panel-fiyatlari" className="mt-10 scroll-mt-28">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{copy.priceH2}</h2>
            <p className="mb-4 mt-2 text-sm leading-relaxed text-ink-muted">{copy.priceBody}</p>
            <PanelPriceTable
              locale={locale === "en" ? "en" : "tr"}
              panels={PANEL_PRICES}
              caption={copy.priceCaption}
            />
          </div>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">{copy.modelsH2}</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
                  <th scope="col" className="px-4 py-3">{copy.colModel}</th>
                  <th scope="col" className="px-4 py-3">{copy.colPitch}</th>
                  <th scope="col" className="px-4 py-3">{copy.colUse}</th>
                </tr>
              </thead>
              <tbody>
                {series.map((p, i) => (
                  <tr key={p.id} className={i % 2 ? "bg-band/60" : ""}>
                    <th scope="row" className="px-4 py-2.5 font-semibold text-ink">
                      {p.href ? (
                        <Link href={p.href} className="hover:text-cyan hover:underline">
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </th>
                    <td className="px-4 py-2.5 text-ink-soft">P{p.specs.pixelPitchMm}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{catLabels[p.category]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            {locale === "tr" ? (
              <>
                Model ayrıntıları için{" "}
                <Link href={copy.productsHref} className="font-semibold text-cyan hover:underline">
                  {copy.productsLabel}
                </Link>{" "}
                bakabilirsiniz.
              </>
            ) : (
              <>
                For model details see the{" "}
                <Link href={copy.productsHref} className="font-semibold text-cyan hover:underline">
                  {copy.productsLabel}
                </Link>
                .
              </>
            )}
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">{copy.groupsH2}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRODUCT_GROUPS.map((g) => (
              <li key={g.slug}>
                <Link
                  href={productGroupPath(g)}
                  className="flex min-h-11 items-center rounded-xl bg-band px-4 text-[14.5px] font-semibold text-ink hover:text-cyan"
                >
                  {locale === "tr"
                    ? g.name
                    : getProductGroupEn(g.slug)?.name ?? GROUP_LABEL_EN[g.slug] ?? g.name}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">{copy.salesH2}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-ink-soft">
            {copy.salesSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">{copy.disambigH2}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{copy.disambigBody}</p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">{copy.faqH2}</h2>
          <div className="mt-3 space-y-4">
            {(locale === "tr" ? visibleFaqs(copy.faqs) : copy.faqs).map((f) => (
              <div key={f.question}>
                <h3 className="font-display text-base font-bold text-ink">{f.question}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-card bg-band p-6 text-[15px] leading-relaxed text-ink-soft">
            <p className="font-display text-lg font-bold text-ink">{copy.contactH2}</p>
            <p className="mt-1">{BUSINESS_NAP_LINE}</p>
            <p className="mt-1">
              <a href="tel:+905305078834" className="font-semibold text-cyan hover:underline">
                +90 530 507 88 34
              </a>{" "}
              ·{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              ·{" "}
              <Link href={copy.quoteHref} className="font-semibold text-cyan hover:underline">
                {copy.quoteLabel}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
