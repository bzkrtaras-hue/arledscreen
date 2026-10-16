import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Mail } from "lucide-react";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ItemListJsonLd } from "@/components/seo/ItemListJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { ShortAnswer } from "@/components/geo/ShortAnswer";
import { ShopModuleCard, ShopSystemCard } from "@/components/shop/ShopCards";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import {
  SHOP_COUNT,
  SHOP_MODULES,
  SHOP_SYSTEMS,
  priceBand,
  priceLabel,
  type Lang,
} from "@/content/magaza";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE_DISPLAY } from "@/lib/social";
import { quoteWhatsappHref } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

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
  if (raw === "en") {
    return buildPageMetadata({
      locale: "en" as Locale,
      path: "/magaza/",
      title: "Shop: NXTIONSTAR LED Modules and Display Systems | ARLEDSCREEN",
      description:
        "NXTIONSTAR indoor and outdoor LED modules with published USD prices, plus turnkey reference display systems. Written quote and WhatsApp support from ARLEDSCREEN, Istanbul.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/magaza/",
    title: "Mağaza: NXTIONSTAR LED Modül ve Ekran Sistemleri | ARLEDSCREEN",
    description:
      "NXTIONSTAR iç ve dış mekân LED modülleri yayımlanmış USD fiyatlarıyla, anahtar teslim referans ekran sistemleriyle birlikte. Yazılı teklif ve WhatsApp desteği ARLEDSCREEN İstanbul.",
    hreflangLocales: ["tr", "en"],
  });
}

const SHORT_ANSWER = (l: Lang) => {
  const b = priceBand();
  return l === "tr"
    ? `Mağaza, NXTIONSTAR LED modüllerini ve anahtar teslim referans ekran sistemlerini tek sayfada toplar. ${SHOP_MODULES.length} modülün fiyatı panel başına ${priceLabel(b.lo, l)} – ${priceLabel(b.hi, l)} arasındadır (KDV ve nakliye hariç); ${SHOP_SYSTEMS.length} referans ekran sisteminde fiyat, mekân keşfinin ardından yazılı teklifle verilir. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir.`
    : `The shop lists NXTIONSTAR LED modules and turnkey reference display systems on one page. The ${SHOP_MODULES.length} modules are priced at ${priceLabel(b.lo, l)} – ${priceLabel(b.hi, l)} per panel (VAT and shipping excluded); the ${SHOP_SYSTEMS.length} reference display systems are priced in a written quote after a site survey. Lead time is 3–21 days preparation + 1–14 days shipping.`;
};

export default async function MagazaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as Lang;
  const tr = locale === "tr";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/magaza/`);
  const indoor = SHOP_MODULES.filter((m) => m.use === "ic");
  const outdoor = SHOP_MODULES.filter((m) => m.use === "dis");

  const listItems = [
    ...SHOP_MODULES.map((m) => ({
      name: tr ? m.nameTr : m.nameEn,
      url: absoluteUrl(tr ? m.pathTr : m.pathEn),
      image: m.image,
    })),
    ...SHOP_SYSTEMS.map((s) => ({
      name: tr ? s.nameTr : s.nameEn,
      url: `${pageUrl}#${s.id}`,
    })),
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tr ? "Ana Sayfa" : "Home", item: absoluteUrl(`${base}/`) },
          { name: tr ? "Hizmetler" : "Services", item: absoluteUrl(`${base}/hizmetler/`) },
          { name: tr ? "Mağaza" : "Shop", item: pageUrl },
        ]}
      />
      <ItemListJsonLd
        name={tr ? "ARLEDSCREEN Mağaza: NXTIONSTAR LED modül ve ekran sistemleri" : "ARLEDSCREEN Shop: NXTIONSTAR LED modules and display systems"}
        description={tr ? "Mağazadaki 19 ürün: 12 LED modül ve 7 referans ekran sistemi." : "The 19 products in the shop: 12 LED modules and 7 reference display systems."}
        items={listItems}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{tr ? "Mağaza" : "Shop"}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            {tr ? "NXTIONSTAR LED modül ve ekran sistemleri" : "NXTIONSTAR LED modules and display systems"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-[1.7] text-ink-soft sm:text-[1.0625rem]">
            {tr
              ? "Mağazamızdaki tüm ürünler tek yerde: iç ve dış mekân LED modülleri, yayımlanmış USD fiyatlarıyla; anahtar teslim referans ekran sistemleri ise keşif sonrası yazılı teklifle."
              : "Everything in our shop in one place: indoor and outdoor LED modules with published USD prices, and turnkey reference display systems quoted in writing after a survey."}
          </p>
          <ShortAnswer text={SHORT_ANSWER(locale)} locale={locale} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`${base}/quote/`}
              className="btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 bg-cyan px-5 text-sm text-white hover:bg-cyan-600"
            >
              <FileText className="h-4 w-4" aria-hidden />
              {tr ? "Teklif alın" : "Get a quote"}
            </Link>
            <a
              href={quoteWhatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 border border-border bg-white px-5 text-sm text-ink-soft hover:border-cyan/50 hover:text-cyan"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Section
        id="ic-mekan-moduller"
        eyebrow={tr ? "LED modüller" : "LED modules"}
        title={tr ? "İç mekân LED modüller" : "Indoor LED modules"}
        description={
          tr
            ? "GOB korumalı ince pitch ve standart SMD seçenekleri; mağaza, lobi, showroom ve toplantı salonları için."
            : "GOB-protected fine pitch and standard SMD options for stores, lobbies, showrooms and meeting rooms."
        }
        className="prose-seo"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {indoor.map((m) => (
            <li key={m.id}>
              <ShopModuleCard item={m} locale={locale} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="dis-mekan-moduller"
        eyebrow={tr ? "LED modüller" : "LED modules"}
        title={tr ? "Dış mekân LED modüller" : "Outdoor LED modules"}
        description={
          tr
            ? "Cephe, totem ve açık alan projeleri için P2.5 – P5 aralığında, önden servis seçeneğiyle."
            : "P2.5 – P5 pitches for façade, totem and open-area projects, including a front-service option."
        }
        className="bg-surface/60 prose-seo"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outdoor.map((m) => (
            <li key={m.id}>
              <ShopModuleCard item={m} locale={locale} />
            </li>
          ))}
        </ul>
        <AiPriceSourceNote locale={locale} className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted" />
      </Section>

      <Section
        id="referans-ekran-sistemleri"
        eyebrow={tr ? "Anahtar teslim" : "Turnkey"}
        title={tr ? "Referans ekran sistemleri" : "Reference display systems"}
        description={
          tr
            ? "Modüller, kontrol sistemi ve yazılım tek elden. Kesin teklif, mekân keşfinin ardından yazılı olarak sunulur."
            : "Modules, control system and software from one source. The exact quote is provided in writing after a site survey."
        }
        className="prose-seo"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SHOP_SYSTEMS.map((s) => (
            <li key={s.id}>
              <ShopSystemCard item={s} locale={locale} />
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
          {tr ? (
            <>
              Ölçünüze göre yaklaşık maliyeti{" "}
              <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">
                fiyat hesaplayıcıda
              </Link>{" "}
              görebilirsiniz; nihai tutar yazılı teklifle kesinleşir.
            </>
          ) : (
            <>
              You can see an approximate cost for your size in the{" "}
              <Link href="/en/hesaplayici/" className="font-semibold text-cyan hover:underline">
                price calculator
              </Link>
              ; the final amount is confirmed in a written quote.
            </>
          )}
        </p>
      </Section>

      <Section
        eyebrow={tr ? "İletişim" : "Contact"}
        title={tr ? "Ürün seçimi için bize yazın" : "Write to us to choose a product"}
        description={
          tr
            ? "Ölçü, kullanım yeri ve izleme mesafenizi paylaşın; doğru modülü ve sistemi birlikte belirleyelim."
            : "Share size, location and viewing distance, and we will define the right module and system with you."
        }
        className="border-t border-border prose-seo"
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={quoteWhatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 bg-cyan px-5 text-sm text-white hover:bg-cyan-600"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={CONTACT_EMAIL_HREF}
            className="btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 border border-border bg-white px-5 text-sm text-ink-soft hover:border-cyan/50 hover:text-cyan"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          {SHOP_COUNT} {tr ? "ürün" : "products"} · {tr ? "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliye." : "Lead time 3–21 days preparation + 1–14 days shipping."}
        </p>
      </Section>
    </>
  );
}
