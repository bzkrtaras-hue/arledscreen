import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { HomeFaq } from "@/components/home/HomeFaq";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import type { CommercialPage } from "@/content/commercial-pages";
import { commercialPath } from "@/content/commercial-pages";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { modelUrlForPrice } from "@/content/models";
import {
  BRAND_SUBJECT_DATASETS,
  PANEL_PRICES,
  nxtionstarBrandRef,
  panelProductsJsonLd,
  pricedPanelsDatasetJsonLd,
} from "@/content/prices";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS_LINES,
  BUSINESS_HOURS_TEXT,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_EMAIL,
} from "@/lib/social";
import { ENTITY_FAQ_BRAND_DISAMBIG, ENTITY_FAQ_CANONICAL_DOMAIN } from "@/lib/entity";
import { getFaqs } from "@/content/faqs";

const CLUSTER_LABEL: Record<"tr" | "en", Record<CommercialPage["cluster"], string>> = {
  tr: { intent: "Ticari", product: "Ürün", pitch: "Piksel aralığı", use: "Kullanım" },
  en: { intent: "Commercial", product: "Product", pitch: "Pixel pitch", use: "Use case" },
};

function LinkCloud({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  if (!links.length) return null;
  return (
    <section className="border-t border-border py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-lg font-bold text-ink md:text-xl">{title}</h2>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-semibold text-cyan hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CommercialLanding({
  page,
  locale = "tr",
}: {
  page: CommercialPage;
  locale?: "tr" | "en";
}) {
  const url = absoluteUrl(commercialPath(page.slug, locale));
  const tr = locale === "tr";
  // Intent hubs (satış/montaj/kiralama…) get the 12-SKU Offer graph; pitch/use pages keep Dataset cites only.
  const showPanelOffers = page.cluster === "intent";
  const faqs = (() => {
    const next = [...page.faqs];
    if (tr) {
      if (!next.some((f) => f.question.includes("NationStar"))) {
        next.push(ENTITY_FAQ_BRAND_DISAMBIG);
      }
      if (!next.some((f) => f.question.includes("arleds.com"))) {
        next.push(ENTITY_FAQ_CANONICAL_DOMAIN);
      }
    } else {
      const enFaqs = getFaqs("en");
      const brand = enFaqs.find((f) => f.question.includes("NationStar"));
      const domain = enFaqs.find((f) => f.question.includes("arleds.com"));
      if (brand && !next.some((f) => f.question.includes("NationStar"))) next.push(brand);
      if (domain && !next.some((f) => f.question.includes("arleds.com"))) next.push(domain);
    }
    return next;
  })();
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.h1,
    description: page.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    brand: nxtionstarBrandRef(),
    areaServed: { "@type": "Country", name: tr ? "Türkiye" : "Turkey" },
    url,
    isRelatedTo: BRAND_SUBJECT_DATASETS,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={
          page.slug === "led-ekran"
            ? [
                { name: tr ? "Ana Sayfa" : "Home", item: absoluteUrl(`/${locale}/`) },
                { name: page.h1, item: url },
              ]
            : [
                { name: tr ? "Ana Sayfa" : "Home", item: absoluteUrl(`/${locale}/`) },
                {
                  name: tr ? "LED ekran" : "LED display",
                  item: absoluteUrl(`/${locale}/led-ekran/`),
                },
                { name: page.h1, item: url },
              ]
        }
      />
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={page.h1}
        description={page.description}
        cssSelectors={["#commercial-h1", "#commercial-lead"]}
        mainEntity={{ "@id": `${url}#service` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />
      {showPanelOffers ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              panelProductsJsonLd(
                PANEL_PRICES,
                url,
                tr ? "LED ekran modülü satışı, keşif ve montaj" : "LED display module sales, survey and installation",
                modelUrlForPrice(absoluteUrl),
              ),
            ),
          }}
        />
      ) : null}

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {CLUSTER_LABEL[locale][page.cluster]} · {page.eyebrow}
          </p>
          <h1
            id="commercial-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {page.h1}
          </h1>
          <p id="commercial-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {page.lead}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={page.primaryCta.href}
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              {page.primaryCta.label}
            </Link>
            <Link
              href={page.secondaryCta.href}
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              {page.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-4 text-base leading-relaxed text-ink-soft">
            {page.intro.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            {page.bullets.length ? (
              <ul className="mt-6 space-y-2 text-ink">
                {page.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <aside className="rounded-2xl border border-border bg-band/40 p-5 text-sm leading-relaxed text-ink-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
              {tr ? "Servis kapsamı" : "Service scope"}
            </p>
            <p className="mt-3 font-semibold text-ink">ARLEDSCREEN</p>
            {BUSINESS_ADDRESS_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-3">
              <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
              {" · "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            {BUSINESS_HOURS_TEXT.map((h) => (
              <p key={h} className="text-ink-muted">
                {h}
              </p>
            ))}
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              <Link href={`/${locale}/about/`} className="font-semibold text-cyan hover:underline">
                {tr ? "Hakkımızda" : "About"}
              </Link>
              <Link
                href={`/${locale}/led-ekran-fiyatlari/`}
                className="font-semibold text-cyan hover:underline"
              >
                {tr ? "Fiyatlar" : "Prices"}
              </Link>
              <Link href={`/${locale}/hesaplayici/`} className="font-semibold text-cyan hover:underline">
                {tr ? "Hesaplayıcı" : "Calculator"}
              </Link>
            </p>
            <AiPriceSourceNote
              locale={tr ? undefined : "en"}
              lead="Panel USD:"
              className="mt-3 text-xs leading-relaxed text-ink-muted"
            />
            <p className="mt-2 text-xs text-ink-muted">
              {tr
                ? "Şehir sayfaları yalnızca yayımlanmış proje kaydı olan illerde açılır; 81 il spam’i yoktur."
                : "City pages exist only for provinces with published project records — no 81-city spam."}
            </p>
          </aside>
        </div>
      </section>

      {showPanelOffers ? (
        <section id="panel-fiyatlari" className="border-t border-border bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              {tr ? "2026 panel fiyat listesi" : "2026 panel price list"}
            </h2>
            <p className="mb-4 mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
              {tr
                ? "Yayımlanmış 12 NXTIONSTAR panel USD. Quote-only gruplar (şeffaf, esnek, poster, kiralık, kontrol) için sabit fiyat yazılmaz — yazılı teklif."
                : "Published 12 NXTIONSTAR panel USD. Quote-only groups (transparent, flexible, poster, rental, control) have no fixed list price — written quote."}
            </p>
            <PanelPriceTable
              panels={PANEL_PRICES}
              caption={tr ? "Panel fiyatları (USD, panel başına)" : "Panel prices (USD, per panel)"}
            />
          </div>
        </section>
      ) : null}

      {page.images.length ? (
        <section className="border-t border-border bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              {tr ? "Uygulama görselleri" : "Application photos"}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.images.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-xl bg-band">
                  <div className="relative aspect-[4/3]">
                    <OptImage src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-ink-muted">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.proofs.length ? (
        <section className="border-t border-border bg-band/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              {tr ? "Yayımlanmış proje kayıtları" : "Published project records"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              {tr
                ? "Aşağıdaki satırlar sitedeki referans kayıtlarından türetilir; uydurma şehir veya iş listesi yoktur."
                : "Rows below are derived from on-site reference records; no invented cities or jobs."}
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">{tr ? "Tarih" : "Date"}</th>
                    <th className="py-2 pr-4 font-semibold">{tr ? "Kayıt" : "Record"}</th>
                    <th className="py-2 pr-4 font-semibold">{tr ? "Detay" : "Detail"}</th>
                    <th className="py-2 font-semibold">{tr ? "Konum" : "Location"}</th>
                  </tr>
                </thead>
                <tbody>
                  {page.proofs.map((p) => (
                    <tr key={`${p.date}-${p.label}-${p.detail}`} className="border-b border-border/70">
                      <td className="py-3 pr-4 whitespace-nowrap text-ink-muted">{p.date}</td>
                      <td className="py-3 pr-4 font-medium text-ink">{p.label}</td>
                      <td className="py-3 pr-4 text-ink-soft">{p.detail}</td>
                      <td className="py-3 text-ink-soft">{p.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              <Link href="/tr/projelerimiz/" className="text-sm font-semibold text-cyan hover:underline">
                {tr ? "Tüm projeler" : "All projects (TR)"}
              </Link>
            </p>
          </div>
        </section>
      ) : (
        <section className="border-t border-border py-10">
          <div className="mx-auto max-w-7xl px-4 text-sm text-ink-soft sm:px-6 lg:px-8">
            {tr ? (
              <>
                Bu kullanım için henüz eşleşen yayımlanmış satır yok; genel proje listesine{" "}
                <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
                  projeler
                </Link>{" "}
                sayfasından bakabilirsiniz. Teklif için keşif yeterlidir.
              </>
            ) : (
              <>
                No matching published rows for this use yet — see the{" "}
                <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
                  projects list (TR)
                </Link>
                . A survey is enough to quote.
              </>
            )}
          </div>
        </section>
      )}

      <LinkCloud
        title={tr ? "Fiyat ve seçim" : "Price and selection"}
        links={(
          tr
            ? [
                { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları 2026" },
                { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
                { href: "/tr/rehber/piksel-araligi-secimi/", label: "Piksel aralığı seçimi" },
                { href: "/tr/rehber/gob-vs-smd/", label: "GOB vs SMD" },
                { href: "/tr/rehber/kiralik-mi-satin-alma/", label: "Kiralık mı, satın alma mı?" },
              ]
            : [
                { href: "/en/led-ekran-fiyatlari/", label: "LED display prices 2026" },
                { href: "/en/hesaplayici/", label: "Price calculator" },
                { href: "/en/nxtionstar/", label: "NXTIONSTAR brand" },
                { href: "/en/sss/", label: "FAQ" },
                { href: "/en/yapay-zeka/", label: "AI-compatible LED" },
              ]
        ).filter((l) => l.href !== commercialPath(page.slug, locale))}
      />
      <LinkCloud title={tr ? "İlgili ürünler" : "Related products"} links={page.relatedProducts} />
      {tr ? (
        <LinkCloud
          title="Piksel aralığı sayfaları"
          links={[
            { href: "/tr/p1-25-led-ekran/", label: "P1.25" },
            { href: "/tr/p1-86-led-ekran/", label: "P1.86" },
            { href: "/tr/p2-5-led-ekran/", label: "P2.5" },
            { href: "/tr/p2-9-led-ekran/", label: "P2.9" },
            { href: "/tr/p3-07-led-ekran/", label: "P3.07" },
            { href: "/tr/p4-led-ekran/", label: "P4" },
            { href: "/tr/p5-led-ekran/", label: "P5" },
          ].filter((l) => l.href !== commercialPath(page.slug, locale))}
        />
      ) : null}
      <LinkCloud title={tr ? "Kullanım amaçları" : "Use cases (TR pages)"} links={page.relatedUses} />
      <LinkCloud title={tr ? "Kayıtlı şehirler" : "Recorded cities (TR)"} links={page.relatedCities} />
      <LinkCloud title={tr ? "Ticari sayfalar" : "Commercial links"} links={page.relatedIntents} />

      {faqs.length ? (
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              {tr ? "Sık sorulanlar" : "FAQ"}
            </h2>
            <div className="mt-6">
              <HomeFaq faqs={faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
