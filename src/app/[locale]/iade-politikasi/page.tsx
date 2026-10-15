import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import {
  BUSINESS_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";

/**
 * Return / cancellation / delivery policy — DRAFT.
 *
 * Confirmed wording comes from the owner's own Shopify store policy
 * (arledscreen.myshopify.com/policies/refund-policy, shipping-policy) and from
 * facts already published on this site (delivery 3–21 + 1–14 days, regions,
 * payment, CE, 2-year warranty). Anything the owner has not confirmed is
 * `null` below and renders as a visible [ONAY BEKLİYOR] marker; while any
 * value is null the page is `noindex` and must not be published.
 */
const PENDING = {
  /** Cancellation before production: refunded share and refund time. */
  cancelBeforeProduction: null as string | null,
  /** After production starts: which share of the paid amount is refunded. */
  cancelAfterProduction: null as string | null,
  /** Return / exchange window after delivery (days). */
  returnWindow: null as string | null,
  /** Condition rules for accepted returns (packaging, unused, etc.). */
  returnCondition: null as string | null,
  /** Who pays return shipping. */
  returnShipping: null as string | null,
  /** Report window for damaged / missing items on delivery. */
  damageReportWindow: null as string | null,
  /** Refund payment method and time. */
  refundMethod: null as string | null,
};
const hasPending = Object.values(PENDING).some((v) => v === null);

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
  const en = raw === "en";
  const meta = buildPageMetadata({
    locale: raw as Locale,
    path: "/iade-politikasi/",
    title: en
      ? "Returns, Cancellation & Delivery | ARLEDSCREEN"
      : "İade, İptal ve Teslimat Koşulları | ARLEDSCREEN",
    description: en
      ? "ARLEDSCREEN LED display systems are made to order. How cancellation, returns and exchanges, delivery and warranty work."
      : "ARLEDSCREEN LED ekran sistemleri özel üretimdir. İptal, iade ve değişim, teslimat ve garanti koşulları.",
    hreflangLocales: ["tr", "en"],
  });
  return hasPending ? { ...meta, robots: { index: false, follow: false } } : meta;
}

function Pending({ en, label }: { en: boolean; label: string }) {
  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-[13px] font-semibold text-amber-900">
      [{en ? "AWAITING APPROVAL" : "ONAY BEKLİYOR"}: {label}]
    </mark>
  );
}

export default async function IadePolitikasiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/iade-politikasi/`);
  const mail = (
    <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
      {CONTACT_EMAIL}
    </a>
  );
  const val = (v: string | null, labelTr: string, labelEn: string) =>
    v ?? <Pending en={en} label={en ? labelEn || labelTr : labelTr} />;

  const h2 = "font-display text-lg font-bold text-ink";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "Returns & delivery" : "İade ve teslimat", item: pageUrl },
        ]}
      />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={en ? "Returns, cancellation and delivery" : "İade, iptal ve teslimat koşulları"}
        description={
          en
            ? "ARLEDSCREEN LED displays are made to order; cancellation, returns and delivery terms."
            : "ARLEDSCREEN LED ekranlar özel üretimdir; iptal, iade ve teslimat koşulları."
        }
        cssSelectors={["#iade-h1", "#iade-lead"]}
        mainEntity={{ "@id": `${SITE_URL}/#organization` }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={en ? "Breadcrumb" : "Sayfa yolu"} className="text-[13px] text-ink-muted">
            <Link href={`${base}/`} className="inline-flex min-h-11 items-center hover:text-cyan">
              {en ? "Home" : "Ana Sayfa"}
            </Link>{" "}
            / <span className="text-ink-soft">{en ? "Returns & delivery" : "İade ve teslimat"}</span>
          </nav>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {en ? "Terms" : "Koşullar"}
          </p>
          <h1
            id="iade-h1"
            className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink"
          >
            {en ? "Returns, cancellation and delivery" : "İade, iptal ve teslimat koşulları"}
          </h1>
          <p id="iade-lead" className="mt-3 leading-relaxed text-ink-soft">
            {en
              ? "ARLEDSCREEN LED display systems are made to order. Returns and exchanges follow the written agreement made after the site survey. Cancellation requests must be sent in writing, and the terms depend on whether production has started."
              : "ARLEDSCREEN LED ekran sistemleri özel üretimdir. İade ve değişim, keşif sonrası yapılan yazılı anlaşmaya tabidir. İptal talepleri yazılı iletilir; koşullar üretimin başlayıp başlamadığına göre değişir."}
          </p>

          {hasPending ? (
            <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              {en
                ? "DRAFT — preview only. Marked fields still need the owner's approval; this page is noindex and must not be published until every marker is resolved."
                : "TASLAK — yalnızca önizleme. İşaretli alanlar Aras Bozkurt'un onayını bekliyor; bu sayfa noindex'tir ve tüm işaretler çözülmeden yayınlanmamalıdır."}
            </p>
          ) : null}

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <section>
              <h2 className={h2}>{en ? "Made-to-order products" : "Özel üretim ürünler"}</h2>
              <p className="mt-2">
                {en
                  ? "Panels and systems are produced to the size, pixel pitch and specification agreed in the written quote. Panels are available from stock; the final price, quantity and delivery date are confirmed in the written quote."
                  : "Paneller ve sistemler, yazılı teklifte anlaşılan ölçü, piksel aralığı ve teknik şartnameye göre hazırlanır. Paneller stoktan temin edilebilir; kesin fiyat, adet ve teslim tarihi yazılı teklifte netleşir."}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Cancellation before production" : "Üretim başlamadan önce iptal"}</h2>
              <p className="mt-2">
                {en ? (
                  <>
                    Send the cancellation request in writing to {mail} before production starts.{" "}
                    {val(
                      PENDING.cancelBeforeProduction,
                      "refund share and time for cancellation before production",
                      "refund share and time for cancellation before production",
                    )}
                  </>
                ) : (
                  <>
                    İptal talebinizi üretim başlamadan önce {mail} adresine yazılı olarak iletin.{" "}
                    {val(
                      PENDING.cancelBeforeProduction,
                      "üretim öncesi iptalde iade edilecek tutar ve süre",
                      "",
                    )}
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Cancellation after production starts" : "Üretim başladıktan sonra iptal"}</h2>
              <p className="mt-2">
                {en ? (
                  <>
                    If a cancellation is accepted after production has started, part of the amount paid
                    may be refunded.{" "}
                    {val(PENDING.cancelAfterProduction, "refunded share after production starts", "")}
                  </>
                ) : (
                  <>
                    Üretim başladıktan sonraki iptallerde ödenen tutarın bir kısmı iade edilebilir.{" "}
                    {val(PENDING.cancelAfterProduction, "üretim başladıktan sonra iade edilecek pay", "")}
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Returns and exchanges" : "İade ve değişim"}</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  {en
                    ? "Returns and exchanges are handled under the written agreement made after the site survey."
                    : "İade ve değişim, keşif sonrası yapılan yazılı anlaşma kapsamında yürütülür."}
                </li>
                <li>
                  {en ? "Return / exchange window: " : "İade / değişim süresi: "}
                  {val(PENDING.returnWindow, "kaç gün", "number of days")}
                </li>
                <li>
                  {en ? "Condition of returned goods: " : "İade edilen ürünün durumu: "}
                  {val(PENDING.returnCondition, "ambalaj ve kullanım koşulları", "packaging and usage conditions")}
                </li>
                <li>
                  {en ? "Return shipping cost: " : "İade nakliye bedeli: "}
                  {val(PENDING.returnShipping, "kim öder", "who pays")}
                </li>
                <li>
                  {en ? "Refund method and time: " : "İade yöntemi ve süresi: "}
                  {val(PENDING.refundMethod, "ödeme yöntemi ve gün", "payment method and days")}
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>{en ? "Damaged or missing items" : "Hasarlı veya eksik teslimat"}</h2>
              <p className="mt-2">
                {en ? "Report damage or missing items to " : "Hasar veya eksik ürünü "}
                {mail}
                {en ? " within " : " adresine "}
                {val(PENDING.damageReportWindow, "bildirim süresi", "reporting period")}
                {en ? " of delivery, with photos." : " içinde fotoğrafla bildirin."}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Warranty and service" : "Garanti ve servis"}</h2>
              <p className="mt-2">
                {en
                  ? "ARLEDSCREEN products carry a 2-year warranty and 5 years of free technical service. Products are CE certified."
                  : "ARLEDSCREEN ürünleri 2 yıl garanti ve 5 yıl ücretsiz teknik servis ile sunulur. Ürünler CE sertifikalıdır."}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Delivery" : "Teslimat"}</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  {en
                    ? "Delivery time: 3–21 days of preparation plus 1–14 days of shipping. The date for your project is stated in the written quote."
                    : "Teslim süresi: 3–21 gün hazırlık + 1–14 gün nakliye. Projeniz için tarih yazılı teklifte belirtilir."}
                </li>
                <li>
                  {en
                    ? "We ship to Europe, the Middle East and the Balkans."
                    : "Avrupa, Orta Doğu ve Balkanlar'a gönderim yapıyoruz."}
                </li>
                <li>
                  {en
                    ? "Shipping and installation are not included in the panel price; they are quoted separately."
                    : "Nakliye ve montaj panel fiyatına dahil değildir; ayrıca tekliflendirilir."}
                </li>
                <li>
                  {en
                    ? "Payment is accepted in TL, USD, EUR and other currencies; instalments are available. The payment plan is stated in the written quote."
                    : "Ödeme TL, USD, EUR ve diğer para birimlerinde kabul edilir; taksitli ödeme yapılabilir. Ödeme planı yazılı teklifte belirtilir."}
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>{en ? "Contact" : "İletişim"}</h2>
              <p className="mt-2">
                ARLEDSCREEN
                <br />
                {BUSINESS_ADDRESS_LINES[0]}
                <br />
                {BUSINESS_ADDRESS_LINES[1]}
                <br />
                {en ? "Phone" : "Telefon"}:{" "}
                <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan hover:underline">
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <br />
                {en ? "Email" : "E-posta"}: {mail}
              </p>
            </section>
          </div>

          <p className="mt-10">
            <Link
              href={`${base}/quote/`}
              className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              {en ? "Request a quote" : "Teklif iste"}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
