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
 * Return / cancellation / delivery policy.
 *
 * Owner decisions (Aras Bozkurt, 15 Oct 2026): return/exchange window = 14 days from
 * delivery; all other points follow Turkish consumer / commercial law practice
 * (Law 6502 Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği
 * md. 9, 12, 13, 15(1)(b); TTK for B2B). Delivery facts come from the site
 * (3–21 + 1–14 days, regions, payment, CE, 2-year warranty).
 * Machine-readable twin: MerchantReturnPolicy in ai-shopping.json / catalog.json
 * (FiniteReturnWindow, 14 days) — keep in sync (scripts/validate-ai-feeds.mjs checks it).
 * No placeholders remain, so the page is indexable and listed in the sitemap.
 */
const RETURN_WINDOW_DAYS = 14;
const POLICY_UPDATED = { tr: "15 Ekim 2026", en: "15 October 2026" };

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
      ? "14-day return and exchange for standard stock products, written cancellation for made-to-order LED displays, delivery and warranty terms."
      : "Stoktan standart ürünlerde 14 gün iade ve değişim, özel üretim LED ekranlarda yazılı iptal, teslimat ve garanti koşulları.",
    hreflangLocales: ["tr", "en"],
  });
  return meta;
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
            ? "14-day return and exchange for standard stock products; cancellation, delivery and warranty terms."
            : "Stoktan standart ürünlerde 14 gün iade ve değişim; iptal, teslimat ve garanti koşulları."
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
              ? `Standard products from stock can be returned or exchanged within ${RETURN_WINDOW_DAYS} days of delivery. Products made to a customer's own specification are made to order: they are cancelled in writing, and the terms depend on whether production has started. Individual consumers and business customers are treated according to the legal framework below.`
              : `Stoktan satılan standart ürünlerde teslimattan itibaren ${RETURN_WINDOW_DAYS} gün içinde iade veya değişim yapılır. Müşterinin talebine göre özel üretilen ürünlerde iptal yazılı yapılır; koşullar üretimin başlayıp başlamadığına göre değişir. Bireysel tüketici ve kurumsal müşteri için uygulanan hükümler aşağıda ayrı belirtilmiştir.`}
          </p>
          <p className="mt-2 text-[13px] text-ink-muted">
            {en ? "Last updated: " : "Son güncelleme: "}
            {POLICY_UPDATED[locale]}
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <section>
              <h2 className={h2}>{en ? "Who this applies to" : "Kimler için geçerli"}</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-ink">{en ? "Individual consumers" : "Bireysel tüketici"}</strong>
                  {en
                    ? " (buying for purposes outside a trade or profession): Consumer Protection Law No. 6502 and the Distance Contracts Regulation apply. Your statutory rights are never reduced by this page."
                    : " (ticari veya mesleki amaç dışında satın alan kişi): 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uygulanır. Bu sayfa yasal haklarınızı hiçbir şekilde sınırlamaz."}
                </li>
                <li>
                  <strong className="text-ink">{en ? "Business customers" : "Kurumsal müşteri"}</strong>
                  {en
                    ? " (companies, public bodies, buyers acting for trade or profession): the statutory right of withdrawal for consumers does not apply. The terms on this page apply by contract, together with the Turkish Commercial Code. A different term in the written quote or contract prevails."
                    : " (şirket, kurum veya ticari amaçla alım yapan alıcı): tüketicilere tanınan yasal cayma hakkı uygulanmaz. Bu sayfadaki koşullar sözleşmesel olarak ve Türk Ticaret Kanunu hükümleriyle birlikte uygulanır. Yazılı teklif veya sözleşmede farklı bir hüküm varsa o geçerlidir."}
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>{en ? "Standard products from stock: 14 days" : "Stoktan standart ürünler: 14 gün"}</h2>
              <p className="mt-2">
                {en
                  ? "NXTIONSTAR panels and modules that are available from stock and are not made to a customer's own specification can be returned or exchanged within "
                  : "Stoktan temin edilen ve müşterinin özel talebine göre hazırlanmayan NXTIONSTAR panel ve modüllerde, teslimat tarihinden itibaren "}
                {RETURN_WINDOW_DAYS}
                {en ? " days of delivery." : " gün içinde iade veya değişim yapılır."}
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  {en ? "Individual consumers: " : "Bireysel tüketici: "}
                  {en
                    ? `you may withdraw from the contract without giving a reason within ${RETURN_WINDOW_DAYS} days from the day you receive the goods (Distance Contracts Regulation, Art. 9). Send the withdrawal notice in writing to `
                    : `malı teslim aldığınız günden itibaren ${RETURN_WINDOW_DAYS} gün içinde gerekçe göstermeksizin cayabilirsiniz (Mesafeli Sözleşmeler Yönetmeliği md. 9). Cayma bildirimini yazılı olarak `}
                  {mail}
                  {en
                    ? ` and send the goods back within ${RETURN_WINDOW_DAYS} days of the notice (Art. 13).`
                    : ` adresine iletin ve ürünü bildirimden itibaren ${RETURN_WINDOW_DAYS} gün içinde geri gönderin (md. 13).`}
                </li>
                <li>
                  {en ? "Business customers: " : "Kurumsal müşteri: "}
                  {en
                    ? `send a written request to ${CONTACT_EMAIL} within ${RETURN_WINDOW_DAYS} days of delivery. The return or exchange is carried out after ARLEDSCREEN confirms it in writing.`
                    : `teslimattan itibaren ${RETURN_WINDOW_DAYS} gün içinde ${CONTACT_EMAIL} adresine yazılı talep gönderin. İade veya değişim, ARLEDSCREEN'in yazılı onayından sonra yapılır.`}
                </li>
                <li>
                  {en ? "Condition of the goods: " : "Ürünün durumu: "}
                  {en
                    ? "unused, undamaged, in the original packaging and complete with accessories and documents. Individual consumers are responsible only for loss of value caused by use beyond what is needed to inspect the goods (Art. 13)."
                    : "kullanılmamış, hasarsız, orijinal ambalajında ve aksesuar ile belgeleriyle eksiksiz olmalıdır. Bireysel tüketici, yalnızca ürünü muayene etmek için gerekli kullanımı aşan kullanımdan doğan değer kaybından sorumludur (md. 13)."}
                </li>
                <li>
                  {en ? "Return shipping: " : "İade nakliyesi: "}
                  {en
                    ? "for individual consumers, if the goods are returned with the carrier named by ARLEDSCREEN, the return freight is paid by ARLEDSCREEN; if another carrier is used, freight is paid by the customer. For business customers, return freight is paid by the customer, except for damaged, wrong or incomplete goods."
                    : "bireysel tüketicide ürün ARLEDSCREEN'in bildirdiği taşıyıcı ile geri gönderilirse iade nakliye bedeli ARLEDSCREEN'e aittir; başka taşıyıcı kullanılırsa nakliye bedeli müşteriye aittir. Kurumsal müşteride iade nakliye bedeli, hasarlı, yanlış veya eksik ürün dışında müşteriye aittir."}
                </li>
                <li>
                  {en ? "Refund: " : "İade ödemesi: "}
                  {en
                    ? `all payments received (including delivery cost, where applicable, for individual consumers) are refunded by the same payment method used for the order, within ${RETURN_WINDOW_DAYS} days. For individual consumers this period starts when the goods are handed to the return carrier named by ARLEDSCREEN (Art. 12); for business customers, when the returned goods reach ARLEDSCREEN and are checked.`
                    : `tahsil edilen tüm ödemeler (bireysel tüketicide varsa teslimat masrafı dahil), siparişte kullanılan ödeme yöntemiyle ${RETURN_WINDOW_DAYS} gün içinde iade edilir. Bireysel tüketicide bu süre, ürünün ARLEDSCREEN'in bildirdiği iade taşıyıcısına teslim edildiği tarihte (md. 12); kurumsal müşteride, iade ürünün ARLEDSCREEN'e ulaşıp kontrol edildiği tarihte başlar.`}
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>{en ? "Made-to-order products" : "Özel üretim ürünler"}</h2>
              <p className="mt-2">
                {en
                  ? "Systems and panels produced to the size, pixel pitch and technical specification agreed in the written quote are made to the customer's own request. For individual consumers, the right of withdrawal does not apply to such goods (Distance Contracts Regulation, Art. 15(1)(b)), unless the written quote states otherwise. Returns and exchanges of made-to-order goods follow the written agreement made after the site survey. Final price, quantity and delivery date are confirmed in the written quote."
                  : "Yazılı teklifte anlaşılan ölçü, piksel aralığı ve teknik şartnameye göre üretilen sistem ve paneller, müşterinin talebine göre hazırlanan ürünlerdir. Bu ürünlerde, yazılı teklifte aksi belirtilmedikçe bireysel tüketicinin cayma hakkı bulunmaz (Mesafeli Sözleşmeler Yönetmeliği md. 15/1-b). Özel üretimde iade ve değişim, keşif sonrası yapılan yazılı anlaşmaya tabidir. Kesin fiyat, adet ve teslim tarihi yazılı teklifte netleşir."}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Cancellation before production" : "Üretim başlamadan önce iptal"}</h2>
              <p className="mt-2">
                {en ? (
                  <>
                    Send the cancellation request in writing to {mail}. The start of production is stated in
                    ARLEDSCREEN&apos;s written order confirmation. If the cancellation reaches us before production
                    starts, the amount paid is refunded by the same payment method within {RETURN_WINDOW_DAYS} days of
                    the date the cancellation notice reaches us.
                  </>
                ) : (
                  <>
                    İptal talebinizi {mail} adresine yazılı olarak iletin. Üretimin başlangıcı, ARLEDSCREEN&apos;in yazılı
                    sipariş onayında belirtilir. İptal bildirimi üretim başlamadan bize ulaşırsa, ödenen tutar iptal
                    bildiriminin ulaştığı tarihten itibaren {RETURN_WINDOW_DAYS} gün içinde, ödemenin yapıldığı yöntemle
                    iade edilir.
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Cancellation after production starts" : "Üretim başladıktan sonra iptal"}</h2>
              <p className="mt-2">
                {en
                  ? "A cancellation after production has started is accepted only by written agreement. In that case part of the amount paid may be refunded; the refunded share is determined in writing after deducting the production, material and preparation costs already incurred."
                  : "Üretim başladıktan sonra iptal ancak yazılı anlaşma ile kabul edilir. Bu durumda ödenen tutarın bir kısmı iade edilebilir; iade edilecek pay, o ana kadar gerçekleşen üretim, malzeme ve hazırlık giderleri düşülerek yazılı olarak belirlenir."}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Damaged, wrong or missing items" : "Hasarlı, yanlış veya eksik teslimat"}</h2>
              <p className="mt-2">
                {en ? (
                  <>
                    Please check the shipment on delivery. Report damaged, wrong or missing items in writing, with
                    photos, to {mail} within 3 days of delivery. For damaged, wrong or incomplete goods the shipping
                    cost of the return and the replacement is paid by ARLEDSCREEN. For individual consumers this
                    reporting period does not limit the statutory rights for defective goods under Law No. 6502; for
                    business customers the inspection and notice rules of the Turkish Commercial Code for commercial
                    sales also apply.
                  </>
                ) : (
                  <>
                    Lütfen teslimatı teslim anında kontrol edin. Hasarlı, yanlış veya eksik ürünü fotoğrafla birlikte,
                    teslimattan itibaren 3 gün içinde {mail} adresine yazılı olarak bildirin. Hasarlı, yanlış veya eksik
                    üründe iade ve yeniden gönderim nakliye bedeli ARLEDSCREEN&apos;e aittir. Bu bildirim süresi, bireysel
                    tüketicinin 6502 sayılı Kanun&apos;dan doğan ayıplı mal haklarını sınırlamaz; kurumsal müşteride ayrıca
                    Türk Ticaret Kanunu&apos;nun ticari satımlardaki muayene ve ihbar hükümleri uygulanır.
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className={h2}>{en ? "Warranty and service" : "Garanti ve servis"}</h2>
              <p className="mt-2">
                {en
                  ? "ARLEDSCREEN products carry a 2-year warranty and 5 years of free technical service. Products are CE certified. The statutory rights of individual consumers for defective goods remain unaffected."
                  : "ARLEDSCREEN ürünleri 2 yıl garanti ve 5 yıl ücretsiz teknik servis ile sunulur. Ürünler CE sertifikalıdır. Bireysel tüketicinin ayıplı mala ilişkin yasal hakları saklıdır."}
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
