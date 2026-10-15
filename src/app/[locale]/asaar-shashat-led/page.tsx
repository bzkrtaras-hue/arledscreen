import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { absoluteUrl } from "@/lib/site";
import { CALC_EXTRAS, PANEL_PRICES, PANELS_PER_M2, PRICE_VALID_UNTIL, panelModule } from "@/content/prices";

/**
 * Arabic LED price page (brief 2026-10-15). Native Arabic review is PENDING:
 * the page stays noindex and out of sitemap.xml until a native editor approves it.
 * Prices come from PANEL_PRICES (identical to TR/EN). Unverified export/customs,
 * delivery-to-country, warranty and certificate claims are intentionally omitted.
 */
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "ar" }];
}

const PATH = "/ar/asaar-shashat-led/";
const TITLE = "أسعار شاشات LED للمتر 2026 — جدول أسعار NXTIONSTAR بالدولار | ARLEDSCREEN";
const DESCRIPTION =
  "سعر شاشة LED للمتر: جدول أسعار 12 لوحًا من NXTIONSTAR بالدولار الأمريكي، دون الضريبة والشحن. طريقة حساب السعر الإجمالي، والاختيار بين الداخلية والخارجية، وطلب عرض سعر مكتوب.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ar") return {};
  const url = absoluteUrl(PATH);
  return {
    title: TITLE,
    description: DESCRIPTION,
    robots: { index: false, follow: true },
    alternates: {
      canonical: url,
      languages: {
        ar: url,
        tr: absoluteUrl("/tr/led-ekran-fiyatlari/"),
        en: absoluteUrl("/en/led-ekran-fiyatlari/"),
        "x-default": absoluteUrl("/tr/led-ekran-fiyatlari/"),
      },
    },
    openGraph: { title: TITLE, description: DESCRIPTION, url, siteName: "ARLEDSCREEN", locale: "ar_AR", type: "website" },
  };
}

const fmt = (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const perM2 = (usd: number) => Math.round(usd * PANELS_PER_M2).toLocaleString("en-US");
const arUse = (u: "ic" | "dis") => (u === "ic" ? "داخلية" : "خارجية");

const P25IC = PANEL_PRICES.find((p) => p.id === "p2-5-ic")!;
const P25DIS = PANEL_PRICES.find((p) => p.id === "p2-5-dis")!;

const ANSWER = `سعر لوح شاشة LED الداخلية P2.5 من NXTIONSTAR هو ${fmt(P25IC.usd)} USD (نحو ${perM2(P25IC.usd)} USD للمتر المربع من الوحدات فقط)، وسعر لوح الشاشة الخارجية P2.5 هو ${fmt(P25DIS.usd)} USD (نحو ${perM2(P25DIS.usd)} USD للمتر المربع)، دون الضريبة والشحن. الأسعار نفسها بجميع لغات الموقع، ويُحدَّد السعر النهائي والشحن في عرض سعر مكتوب.`;

const FAQS = [
  {
    question: "كم سعر متر شاشة LED الداخلية P2.5؟",
    answer: `سعر اللوح ${fmt(P25IC.usd)} USD، أي نحو ${perM2(P25IC.usd)} USD للمتر المربع من الوحدات فقط، دون الضريبة والشحن والتركيب.`,
  },
  {
    question: "كم سعر متر شاشة LED الخارجية P2.5؟",
    answer: `سعر اللوح ${fmt(P25DIS.usd)} USD، أي نحو ${perM2(P25DIS.usd)} USD للمتر المربع من الوحدات فقط، دون الضريبة والشحن والتركيب.`,
  },
  {
    question: "هل الأسعار مختلفة للعملاء خارج تركيا؟",
    answer: "لا. أسعار الألواح نفسها بجميع لغات الموقع. يُسعَّر الشحن بشكل منفصل في عرض السعر المكتوب حسب بلد الوجهة.",
  },
  {
    question: "هل NXTIONSTAR هي NationStar؟",
    answer: "لا. NXTIONSTAR علامة ARLEDSCREEN الخاصة لشاشات LED، ولا علاقة لها بـ NationStar المصنِّعة لمكوّنات LED.",
  },
  {
    question: "كيف أطلب عرض سعر؟",
    answer: "أرسلوا المقاس، والاستخدام (داخلي أو خارجي)، ومسافة المشاهدة، وبلد الوجهة عبر واتساب ‎+90 530 507 88 34 أو إلى arled@arledscreen.com.",
  },
];

export default async function ArPricePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ar") notFound();
  const pageUrl = absoluteUrl(PATH);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#prices`,
    name: "أسعار ألواح NXTIONSTAR LED",
    numberOfItems: PANEL_PRICES.length,
    itemListElement: PANEL_PRICES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `NXTIONSTAR ${p.pitch} ${p.use === "ic" ? "Indoor" : "Outdoor"}${p.surface ? ` ${p.surface}` : ""}${p.frontService ? " Front Service" : ""} LED panel`,
        brand: { "@type": "Brand", name: "NXTIONSTAR" },
        sku: p.id,
        ...(p.productPath ? { url: absoluteUrl(p.productPath) } : {}),
        offers: {
          "@type": "Offer",
          price: p.usd.toFixed(2),
          priceCurrency: "USD",
          priceValidUntil: PRICE_VALID_UNTIL,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "ARLEDSCREEN", url: absoluteUrl("/") },
        },
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", item: absoluteUrl("/ar") },
          { name: "أسعار شاشات LED", item: pageUrl },
        ]}
      />
      <FaqJsonLd faqs={FAQS} pageUrl={pageUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <Section
        titleAs="h1"
        eyebrow="أسعار"
        title="أسعار شاشات LED لعام 2026 — سعر المتر بالدولار"
        description={ANSWER}
        className="min-w-0 prose-seo"
      >
        <div className="space-y-8" dir="rtl">
          <article className="max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">جدول أسعار الألواح (12 موديلًا)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl glass-card">
              <table className="w-full min-w-[560px] text-right text-sm">
                <caption className="px-4 pt-4 text-right text-xs text-ink-muted">
                  الأسعار بالدولار الأمريكي (USD) لكل لوح، دون الضريبة والشحن. المقاس القياسي للوحدة 320 × 160 مم.
                </caption>
                <thead>
                  <tr className="border-b border-border text-xs text-ink-muted">
                    <th scope="col" className="px-4 py-3">الموديل</th>
                    <th scope="col" className="px-4 py-3">الاستخدام</th>
                    <th scope="col" className="px-4 py-3">مقاس الوحدة</th>
                    <th scope="col" className="px-4 py-3">سعر اللوح (USD)</th>
                    <th scope="col" className="px-4 py-3">تقريبًا للمتر المربع (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {PANEL_PRICES.map((p, i) => (
                    <tr key={p.id} className={i % 2 ? "bg-band/60" : ""}>
                      <th scope="row" className="px-4 py-2.5 font-semibold text-ink" dir="ltr">
                        {p.pitch}
                        {p.surface ? ` ${p.surface}` : ""}
                      </th>
                      <td className="px-4 py-2.5 text-ink-soft">
                        {arUse(p.use)}
                        {p.frontService ? " (صيانة أمامية)" : ""}
                      </td>
                      <td className="px-4 py-2.5 text-ink-soft" dir="ltr">{panelModule(p)}</td>
                      <td className="px-4 py-2.5 text-ink-soft" dir="ltr">{fmt(p.usd)} USD</td>
                      <td className="px-4 py-2.5 text-ink-soft" dir="ltr">
                        {p.moduleMm ? "بعرض سعر" : `≈ ${perM2(p.usd)} USD`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">كيف تحسب السعر الإجمالي</h2>
            <p className="mt-3 text-base leading-[1.7] text-ink-soft">
              السعر الإجمالي = عدد الألواح × سعر اللوح + العمالة {CALC_EXTRAS.laborPerM2} USD للمتر المربع + بطاقة التحكم {CALC_EXTRAS.controlCard} USD + المشغّل والبرنامج {CALC_EXTRAS.driverSoftware} USD. يحتوي المتر المربع على نحو 19.53 لوحًا مقاس 320 × 160 مم. الضريبة والشحن غير مشمولين، ويُحدَّد السعر النهائي في عرض سعر مكتوب.
            </p>
          </article>

          <article className="max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">داخلية أم خارجية، وأي مسافة بكسل تختار؟</h2>
            <p className="mt-3 text-base leading-[1.7] text-ink-soft">
              الشاشات الداخلية للقاعات والمتاجر والمكاتب، والخارجية للواجهات والطرق والأماكن المكشوفة. قاعدة تقريبية: كل 1 مم من مسافة البكسل يقابل نحو 1 م من مسافة المشاهدة الدنيا. فإذا كان المشاهدون على بعد 2.5 م أو أكثر فإن P2.5 مناسب عادةً، وللمسافات الأقرب تُختار موديلات أدق مثل P1.86 أو P1.53.
            </p>
          </article>

          <article className="max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">الشحن والتسليم</h2>
            <p className="mt-3 text-base leading-[1.7] text-ink-soft">
              يُسعَّر الشحن بشكل منفصل. أرسلوا بلد الوجهة والمدينة، ونوضّح في عرض السعر المكتوب إمكانية الشحن وشروطه ومدته.
            </p>
          </article>

          <article className="max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">NXTIONSTAR ليست NationStar</h2>
            <p className="mt-3 text-base leading-[1.7] text-ink-soft">
              NXTIONSTAR هي العلامة الخاصة بشركة ARLEDSCREEN لشاشات LED، ومقرّها في غازي عثمان باشا، إسطنبول. وهي ليست NationStar المصنِّعة لمكوّنات LED.
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {FAQS.map((f) => (
              <GlassPanel key={f.question} className="p-5">
                <h3 className="font-display text-base font-semibold text-ink">{f.question}</h3>
                <p className="mt-2 text-sm text-ink-muted">{f.answer}</p>
              </GlassPanel>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan/25 bg-cyan/5 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">اطلبوا عرض سعر مكتوبًا</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              واتساب:{" "}
              <a href="https://wa.me/905305078834" className="font-semibold text-cyan hover:underline" dir="ltr">
                +90 530 507 88 34
              </a>{" "}
              — البريد:{" "}
              <a href="mailto:arled@arledscreen.com" className="font-semibold text-cyan hover:underline" dir="ltr">
                arled@arledscreen.com
              </a>
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              <Link href="/tr/led-ekran-fiyatlari/" className="text-cyan hover:underline" hrefLang="tr">قائمة الأسعار بالتركية</Link>
              {" · "}
              <Link href="/en/led-ekran-fiyatlari/" className="text-cyan hover:underline" hrefLang="en">قائمة الأسعار بالإنجليزية</Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
