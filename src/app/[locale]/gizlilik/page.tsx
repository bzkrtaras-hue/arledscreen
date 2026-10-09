import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
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
 * Dual-locale privacy / KVKK notice — inventable /tr/gizlilik/ and /en/gizlilik/
 * were CF 404s (404.html before _redirects). Facts only; no invented legal claims.
 */
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
      path: "/gizlilik/",
      title: "Privacy & Data Notice | ARLEDSCREEN",
      description:
        "How ARLEDSCREEN handles contact and quote form data. Istanbul (Gaziosmanpaşa) LED display company — canonical site arledscreen.com (not arleds.com).",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/gizlilik/",
    title: "Gizlilik ve KVKK Bilgilendirmesi | ARLEDSCREEN",
    description:
      "ARLEDSCREEN iletişim ve teklif formu verilerinin işlenmesi hakkında bilgilendirme. İstanbul Gaziosmanpaşa — kanonik site arledscreen.com (arleds.com değil).",
    hreflangLocales: ["tr", "en"],
  });
}

export default async function GizlilikPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/gizlilik/`);
  const quoteHref = `${base}/quote/`;
  const contactHref = en ? "/en/quote/" : "/tr/quote/";


  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "Privacy" : "Gizlilik", item: pageUrl },
        ]}
      />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={en ? "Privacy notice" : "Gizlilik ve KVKK bilgilendirmesi"}
        description={
          en
            ? "How ARLEDSCREEN handles quote and contact data. Canonical site arledscreen.com."
            : "ARLEDSCREEN teklif ve iletişim verilerinin işlenmesi. Kanonik site arledscreen.com."
        }
        cssSelectors={["#gizlilik-h1", "#gizlilik-lead"]}
        mainEntity={{ "@id": `${SITE_URL}/#organization` }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={en ? "Breadcrumb" : "Sayfa yolu"} className="text-[13px] text-ink-muted">
            <Link href={`${base}/`} className="inline-flex min-h-11 items-center hover:text-cyan">
              {en ? "Home" : "Ana Sayfa"}
            </Link>{" "}
            / <span className="text-ink-soft">{en ? "Privacy" : "Gizlilik"}</span>
          </nav>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {en ? "Privacy" : "Gizlilik"}
          </p>
          <h1
            id="gizlilik-h1"
            className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink"
          >
            {en ? "Privacy notice" : "Gizlilik ve KVKK bilgilendirmesi"}
          </h1>
          <p id="gizlilik-lead" className="mt-3 leading-relaxed text-ink-soft">
            {en ? (
              <>
                ARLEDSCREEN (AR-LED Display Technology Center) processes contact and quote-request
                data to respond to LED display projects. For current prices, see our{" "}
                <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                  LED display prices
                </Link>{" "}
                page.
              </>
            ) : (
              <>
                ARLEDSCREEN (AR-LED Ekran Teknoloji Merkezi), LED ekran projeleri için iletişim ve
                teklif talebi verilerini yanıtlamak amacıyla işler. Güncel fiyatlar için{" "}
                <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                  LED ekran fiyatları
                </Link>{" "}
                sayfasına bakabilirsiniz.
              </>
            )}
          </p>
          <AiPriceSourceNote
            locale={locale}
            className="mt-3 text-sm leading-relaxed text-ink-muted"
          />

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                {en ? "Data controller" : "Veri sorumlusu"}
              </h2>
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
                {en ? "Email" : "E-posta"}:{" "}
                <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                {en ? "What we collect" : "Hangi verileri toplarız"}
              </h2>
              <p className="mt-2">
                {en
                  ? "When you use the quote or contact forms we may receive name, company, phone, email, city, project notes and any files you attach. Newsletter signup (if used) receives the email address you submit."
                  : "Teklif veya iletişim formlarını kullandığınızda ad, şirket, telefon, e-posta, şehir, proje notları ve eklediğiniz dosyalar alınabilir. Bülten kaydı (varsa) gönderdiğiniz e-posta adresini alır."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                {en ? "Why we use the data" : "Verilerin kullanım amacı"}
              </h2>
              <p className="mt-2">
                {en
                  ? "To answer survey/quote requests, schedule site visits, prepare written offers, provide install/service follow-up, and (only if you subscribe) send project or product updates. We do not sell personal data."
                  : "Keşif/teklif taleplerini yanıtlamak, saha ziyareti planlamak, yazılı teklif hazırlamak, montaj/servis takibi ve (yalnızca abone olduysanız) proje veya ürün güncellemeleri göndermek için. Kişisel verileri satmayız."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                {en ? "Retention and sharing" : "Saklama ve paylaşım"}
              </h2>
              <p className="mt-2">
                {en
                  ? "Quote correspondence is kept as long as needed for the project relationship and legal record-keeping. Hosting and form providers process data only to deliver the site and forms. We do not share your data with third parties other than the service providers needed to run arledscreen.com."
                  : "Teklif yazışmaları proje ilişkisi ve yasal kayıt ihtiyacı sürdüğü sürece saklanır. Barındırma ve form sağlayıcıları veriyi yalnızca site ve formların çalışması için işler. arledscreen.com’u işletmek için gerekli hizmet sağlayıcılar dışında üçüncü taraf paylaşımı uydurulmaz."}
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                {en ? "Your requests" : "Haklarınız / talepler"}
              </h2>
              <p className="mt-2">
                {en ? (
                  <>
                    For access, correction or deletion requests about form data, email{" "}
                    <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
                      {CONTACT_EMAIL}
                    </a>{" "}
                    or use our{" "}
                    <Link href={contactHref} className="font-semibold text-cyan hover:underline">
                      quote form
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Form verilerinize erişim, düzeltme veya silme talepleri için{" "}
                    <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
                      {CONTACT_EMAIL}
                    </a>{" "}
                    veya{" "}
                    <Link href={contactHref} className="font-semibold text-cyan hover:underline">
                      {quoteHref}
                    </Link>{" "}
                    üzerinden yazın.
                  </>
                )}
              </p>
            </section>

          </div>

          <p className="mt-10">
            <Link
              href={quoteHref}
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
