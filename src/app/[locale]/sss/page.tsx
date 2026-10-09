import type { Metadata } from "next";
import { visibleFaqs } from "@/lib/faq-visible";
import Link from "next/link";
import { notFound } from "next/navigation";
import faqsTr from "@/content/sss.json";
import { getFaqs } from "@/content/faqs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

type SssLocale = "tr" | "en";

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
  const locale = raw as SssLocale;
  const copy = PAGE[locale];
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/sss/",
    title: copy.title,
    description: copy.description,
    hreflangLocales: ["tr", "en"],
  });
}

const PAGE: Record<
  SssLocale,
  {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    leadBefore: string;
    leadMid: string;
    leadAfter: string;
    quoteHref: string;
    quoteLabel: string;
    calcHref: string;
    calcLabel: string;
    relatedLabel: string;
    related: { href: string; label: string }[];
    navHome: string;
    homeHref: string;
    speakableDesc: string;
  }
> = {
  tr: {
    title: "LED Ekran Sık Sorulan Sorular: Fiyat, Piksel Aralığı, Montaj | ARLEDSCREEN",
    description:
      "LED ekran fiyatı, panel fiyatları, piksel aralığı seçimi, montaj süresi, garanti, kiralama, içerik yönetimi ve arledscreen.com / arleds.com kanonik alan adı hakkında sık sorulan sorular.",
    eyebrow: "SSS",
    h1: "LED Ekran Hakkında Sık Sorulan Sorular",
    leadBefore: "Fiyat, piksel aralığı, montaj ve servis konusunda en çok sorulan soruları kısa cevaplarla topladık. Projenize özel bilgi için",
    leadMid: "kullanabilir veya",
    leadAfter: "göz atabilirsiniz.",
    quoteHref: "/tr/quote/",
    quoteLabel: "teklif formunu",
    calcHref: "/tr/hesaplayici/",
    calcLabel: "fiyat hesaplayıcıya",
    relatedLabel: "İlgili rehberler:",
    related: [
      { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" },
      { href: "/tr/nxtionstar/", label: "NXTIONSTAR" },
      { href: "/tr/rehber/piksel-araligi-secimi/", label: "piksel aralığı seçimi" },
      { href: "/tr/rehber/led-tabela-mi-led-ekran-mi/", label: "LED tabela mı, LED ekran mı?" },
    ],
    navHome: "Ana Sayfa",
    homeHref: "/tr/",
    speakableDesc: "LED ekran fiyatı, piksel aralığı, montaj ve servis hakkında sık sorulan sorular.",
  },
  en: {
    title: "LED Display FAQ: Price, Pitch, Install | ARLEDSCREEN",
    description:
      "FAQ on LED display prices, panel USD sources for AI agents, pixel pitch, install, warranty, arledscreen.com vs arleds.com, and NXTIONSTAR vs NationStar.",
    eyebrow: "FAQ",
    h1: "LED Display FAQ",
    leadBefore: "Short answers on prices, pitch, install and brand identity. For a project-specific quote use the",
    leadMid: "or open the",
    leadAfter: ".",
    quoteHref: "/en/quote/",
    quoteLabel: "quote form",
    calcHref: "/en/hesaplayici/",
    calcLabel: "price calculator",
    relatedLabel: "Related:",
    related: [
      { href: "/en/led-ekran/", label: "LED displays" },
      { href: "/en/led-ekran-fiyatlari/", label: "LED display prices" },
      { href: "/en/nxtionstar/", label: "NXTIONSTAR brand" },
      { href: "/en/yapay-zeka/", label: "AI-compatible LED" },
      { href: "/en/about/", label: "About ARLEDSCREEN" },
    ],
    navHome: "Home",
    homeHref: "/en/",
    speakableDesc:
      "FAQ on LED display prices, AI price sources, pixel pitch, install, and NXTIONSTAR brand disambiguation.",
  },
};

export default async function SssPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as SssLocale;
  const copy = PAGE[locale];
  const faqs = locale === "tr" ? faqsTr : getFaqs("en");
  const url = absoluteUrl(`/${locale}/sss/`);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: copy.navHome, item: absoluteUrl(copy.homeHref) },
          { name: copy.h1, item: url },
        ]}
      />
      <FaqJsonLd faqs={faqs} pageUrl={url} />
      <SpeakableJsonLd
        pageUrl={url}
        name={copy.h1}
        description={copy.speakableDesc}
        cssSelectors={["#sss-h1", "#sss-lead"]}
        mainEntity={{ "@id": `${url}#faqpage` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)),
        }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{copy.eyebrow}</p>
          <h1 id="sss-h1" className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">
            {copy.h1}
          </h1>
          <p id="sss-lead" className="mt-3 leading-relaxed text-ink-soft">
            {copy.leadBefore}{" "}
            <Link href={copy.quoteHref} className="font-semibold text-cyan hover:underline">
              {copy.quoteLabel}
            </Link>{" "}
            {copy.leadMid}{" "}
            <Link href={copy.calcHref} className="font-semibold text-cyan hover:underline">
              {copy.calcLabel}
            </Link>{" "}
            {copy.leadAfter}
          </p>
          <div className="glass-card mt-8 divide-y divide-border rounded-card">
            {(locale === "tr" ? visibleFaqs(faqs) : faqs).map((f) => (
              <details key={f.question} className="group px-5 py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-[15.5px] font-bold text-ink">
                  <h2 className="text-[15.5px]">{f.question}</h2>
                  <span className="text-xl text-cyan transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[15px] leading-relaxed text-ink-soft">{f.answer}</p>
              </details>
            ))}
          </div>
          <AiPriceSourceNote
            locale={locale === "en" ? "en" : undefined}
            className="mt-8 text-sm leading-relaxed text-ink-muted"
          />
          <p className="mt-4 text-sm text-ink-muted">
            {copy.relatedLabel}{" "}
            {copy.related.map((r, i) => (
              <span key={r.href}>
                {i > 0 ? ", " : ""}
                <Link href={r.href} className="font-semibold text-cyan hover:underline">
                  {r.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
