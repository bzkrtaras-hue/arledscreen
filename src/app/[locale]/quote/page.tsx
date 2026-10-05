import { BUSINESS_ADDRESS_LINES, BUSINESS_HOURS_TEXT, BUSINESS_MAP_URL } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { ShortQuoteForm } from "@/components/quote/ShortQuoteForm";
import { WhatsAppProjectPicker } from "@/components/home/WhatsAppProjectPicker";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { HomeFaq } from "@/components/home/HomeFaq";
import { Calculator, Clock, MapPin } from "lucide-react";
import { OptImage } from "@/components/ui/opt-image";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { getSeo } from "@/content/seo";
import { buildPageMetadata, buildThinLocaleMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const QUOTE_FAQS = [
  {
    question: "Yazılı teklif ne zaman gerekir?",
    answer:
      "Nihai proje tutarı her zaman keşif sonrası yazılı teklifle kesinleşir. Yayımlanmış 12 panel için yaklaşık USD listesi https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ üzerindedir; kiralık, şeffaf, esnek, poster ve kontrol (Huidu/NovaStar/Colorlight) gruplarında list fiyatı yoktur — bu form veya WhatsApp ile teklif alınır. Hesaplayıcı extrasUsd 500 USD marka list SKU değildir.",
  },
  {
    question: "Teklif için hangi bilgiler yeterli?",
    answer:
      "Yaklaşık ölçü, iç/dış mekân, konum, kullanım amacı ve zaman planı yeterlidir. Fotoğraf veya kısa video süreci hızlandırır. Firma kimliği: https://arledscreen.com/entity.json.",
  },
  {
    question: "AI ajanları fiyatı bu formdan mı okusun?",
    answer:
      "Hayır. Ajanlar önce https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules) okumalı; panel USD için https://arledscreen.com/catalog.json (shippingDetails: nakliye hariç, ücretsiz kargo yok). Quote-only ürünlere fiyat uydurulmaz. Bu sayfa yazılı teklif kanalıdır. Keşif: https://arledscreen.com/.well-known/ard.json · Kimlik: https://arledscreen.com/entity.json.",
  },
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "quote");
  // Short quote form + NAP block are TR-primary; EN/AR/RU are thin → noindex → TR.
  if (locale !== "tr") {
    return buildThinLocaleMetadata({
      locale,
      path: "/quote",
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    });
  }
  return buildPageMetadata({
    locale,
    path: "/quote",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    hreflangLocales: [],
  });
}

export default async function QuotePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const seo = getSeo(locale, "quote");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          { name: dict.nav.quote, item: absoluteUrl(`/${locale}/quote`) },
        ]}
      />
      {locale === "tr" ? <FaqJsonLd faqs={QUOTE_FAQS} /> : null}
      {locale === "tr" ? (
        <>
          {/* Rounded photo banner with centred H1 */}
          <section className="bg-white px-0 pt-0 md:px-6 md:pt-6 lg:px-8">
            <div className="relative isolate mx-auto max-w-7xl overflow-hidden bg-navy md:rounded-[2rem]">
              <OptImage
                src="/projects/neu-kutuphane.jpg"
                alt="Üniversite kütüphanesi LED sahne duvarı"
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="-z-10 object-cover opacity-45"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1B33]/90 to-[#0B1B33]/60" aria-hidden />
              <div className="mx-auto max-w-3xl px-5 py-12 text-center md:py-16">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9CC0F5]">{dict.page.quote.eyebrow}</p>
                <h1 className="mt-3 text-balance font-display text-[clamp(1.9rem,1.3rem+2.4vw,3rem)] font-extrabold tracking-[-0.03em] text-white">
                  {seo.h1 ?? dict.page.quote.title}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
                  {seo.intro ?? dict.page.quote.description}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white py-10 md:py-14 prose-seo">
            <div className="mx-auto grid max-w-7xl min-w-0 gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
              <aside className="min-w-0 space-y-6">
                <div>
                  <h2 className="border-b-2 border-border pb-2 font-display text-lg font-bold text-ink">ARLEDSCREEN · İstanbul</h2>
                  <ul className="mt-4 space-y-3 text-[15px] text-ink-soft">
                    <li>
                      <a href={CONTACT_PHONE_HREF} className="inline-flex min-h-10 items-center gap-3 hover:text-cyan">
                        <PhoneIcon className="h-5 w-5 text-cyan" />
                        <span><strong className="text-ink">Telefon:</strong> {CONTACT_PHONE_DISPLAY}</span>
                      </a>
                    </li>
                    <li>
                      <a href={GENERIC_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-3 hover:text-[#0F7A41]">
                        <WhatsAppIcon className="h-5 w-5 text-[#0F7A41]" />
                        <span><strong className="text-ink">WhatsApp:</strong> {CONTACT_PHONE_DISPLAY}</span>
                      </a>
                    </li>
                    <li>
                      <a href={CONTACT_EMAIL_HREF} className="inline-flex min-h-10 items-center gap-3 break-all hover:text-cyan">
                        <MailIcon className="h-5 w-5 shrink-0 text-cyan" />
                        <span><strong className="text-ink">E-posta:</strong> {CONTACT_EMAIL}</span>
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden />
                      <span>
                        <strong className="text-ink">Adres:</strong> {BUSINESS_ADDRESS_LINES.join(", ")}{" "}
                        <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan hover:underline">(harita)</a>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden />
                      <span><strong className="text-ink">Çalışma saatleri:</strong> {BUSINESS_HOURS_TEXT.join(" · ")}</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-band p-5">
                  <h2 className="font-display text-base font-bold text-ink">Talebinizden sonra</h2>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
                    <li>Ölçü, konum ve kullanım amacınızı inceleriz.</li>
                    <li>Gerekirse keşif için sizinle gün planlarız.</li>
                    <li>Ekran önerisi, malzeme listesi ve yazılı teklifi iletiriz.</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-border bg-white p-5">
                  <h2 className="font-display text-base font-bold text-ink">Önce yaklaşık maliyeti görmek ister misiniz?</h2>
                  <p className="mt-2 text-sm text-ink-muted">Ölçü ve piksel aralığına göre yaklaşık maliyet için hesaplayıcıyı kullanabilirsiniz.</p>
                  <Link href="/tr/hesaplayici/" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-cyan hover:underline">
                    <Calculator className="h-4 w-4" aria-hidden />
                    Fiyat hesaplayıcıyı açın
                  </Link>
                </div>
              </aside>
              <div className="min-w-0">
                <h2 className="mb-4 font-display text-2xl font-bold text-ink">Kısa teklif formu</h2>
                <ShortQuoteForm />
              </div>
            </div>
          </section>

          <section className="bg-band py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-xl font-bold text-ink">Proje türüne göre WhatsApp&apos;tan hızlı mesaj</h2>
              <p className="mb-5 mt-1 text-sm text-ink-muted">Formu doldurmak istemiyorsanız proje türünü seçin; mesaj hazır açılır.</p>
              <WhatsAppProjectPicker />
            </div>
          </section>

          <section className="border-t border-border bg-white py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Sık sorulanlar</h2>
              <div className="mt-6">
                <HomeFaq faqs={QUOTE_FAQS} />
              </div>
              <ShoppingLinkCloud
                excludeHref="/tr/quote/"
                extra={[
                  {
                    href: "/feeds/merchant-priced-panels.tsv",
                    label: "Merchant feed (12 SKU)",
                  },
                ]}
              />
            </div>
          </section>
        </>
      ) : (
      <Section
        titleAs="h1"
        eyebrow={dict.page.quote.eyebrow}
        title={seo.h1 ?? dict.page.quote.title}
        description={seo.intro ?? dict.page.quote.description}
        className="prose-seo"
      >
        {(
          <div className="grid gap-4 sm:grid-cols-3">
            <a href={CONTACT_EMAIL_HREF} className="rounded-2xl p-6 hover:border-cyan/50 glass-card">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">E-mail</p>
              <p className="mt-2 font-display font-bold text-ink">{CONTACT_EMAIL}</p>
            </a>
            <a href={GENERIC_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="rounded-2xl p-6 hover:border-cyan/50 glass-card">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">WhatsApp</p>
              <p className="mt-2 font-display font-bold text-ink">{CONTACT_PHONE_DISPLAY}</p>
            </a>
            <a href={CONTACT_PHONE_HREF} className="rounded-2xl p-6 hover:border-cyan/50 glass-card">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">Phone</p>
              <p className="mt-2 font-display font-bold text-ink">{CONTACT_PHONE_DISPLAY}</p>
            </a>
            <p className="text-sm text-ink-muted sm:col-span-3">
              Please share dimensions, indoor/outdoor use, location and timeline. ARLEDSCREEN · Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa, Istanbul, Turkey · Mon–Fri 09:00–18:00, Sat 10:00–15:00.
            </p>
          </div>
        )}
      </Section>
      )}
    </>
  );
}
