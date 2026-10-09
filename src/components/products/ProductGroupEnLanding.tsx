import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { PanelPriceTable } from "@/components/pricing/PanelPriceTable";
import { HomeFaq } from "@/components/home/HomeFaq";
import { OptImage } from "@/components/ui/opt-image";
import type { ProductGroup } from "@/content/categories";
import type { ProductGroupEn } from "@/content/product-groups-en";
import { getFaqs } from "@/content/faqs";
import { modelUrlForPrice } from "@/content/models";
import {
  BRAND_SUBJECT_REFS,
  PRICE_VALID_UNTIL,
  localBusinessRef,
  nxtionstarBrandRef,
  panelProductsJsonLd,
  pricedPanelOfferRefs,
  pricesForGroup,
} from "@/content/prices";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export function ProductGroupEnLanding({
  group,
  en,
}: {
  group: ProductGroup;
  en: ProductGroupEn;
}) {
  const url = absoluteUrl(`/en/products/${group.slug}/`);
  const prices = pricesForGroup(group.slug);
  const enFaqs = getFaqs("en");
  const brand = enFaqs.find((f) => f.question.includes("NationStar"));
  const domain = enFaqs.find((f) => f.question.includes("arleds.com"));
  const faqs = [
    ...en.faqs,
    ...(brand ? [brand] : []),
    ...(domain ? [domain] : []),
  ];
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: en.h1,
    serviceType: en.name,
    description: en.description,
    url,
    image: absoluteUrl(group.image),
    provider: localBusinessRef(),
    brand:
      (group.brandName ?? "NXTIONSTAR") === "NXTIONSTAR"
        ? nxtionstarBrandRef()
        : { "@type": "Brand", name: group.brandName },
    areaServed: { "@type": "Country", name: "Turkey" },
    isRelatedTo: BRAND_SUBJECT_REFS,
    // AggregateOffer lives here — avoid second #service from panelProductsJsonLd.
    ...(prices.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            "@id": `${url}#priced-panels-aggregate`,
            priceCurrency: "USD",
            lowPrice: Math.min(...prices.map((x) => x.usd)).toFixed(2),
            highPrice: Math.max(...prices.map((x) => x.usd)).toFixed(2),
            offerCount: prices.length,
            priceValidUntil: PRICE_VALID_UNTIL,
            url: `${SITE_URL}/ai-shopping.json`,
            sameAs: [`${SITE_URL}/#priced-panels-aggregate`],
            description:
              "Per-panel USD price band; excl. VAT/shipping. No free shipping; freight in written quote.",
            seller: { "@id": `${SITE_URL}/#organization` },
            availableAtOrFrom: localBusinessRef(),
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              valueAddedTaxIncluded: false,
            },
            offers: pricedPanelOfferRefs(prices),
          },
        }
      : {}),
  };
  // Products only — Service AggregateOffer lives in serviceLd (TR group parity).
  const productsLd =
    prices.length > 0
      ? panelProductsJsonLd(prices, url, undefined, modelUrlForPrice(absoluteUrl), "en")
      : null;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: absoluteUrl("/en/") },
          { name: "Products", item: absoluteUrl("/en/products/") },
          { name: en.name, item: url },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={en.h1}
        description={en.description}
        cssSelectors={["#pg-h1", "#pg-lead"]}
        mainEntity={{ "@id": `${url}#service` }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {productsLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsLd) }} />
      ) : null}

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-band">
            <OptImage
              src={group.image}
              alt={en.imageAlt}
              fill
              priority
              sizes="(min-width:1024px) 480px, 92vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{en.tag}</p>
            <h1
              id="pg-h1"
              className="mt-3 max-w-2xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
            >
              {en.h1}
            </h1>
            <p id="pg-lead" className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
              {en.lead}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/en/quote/?tip=${group.projectType}`}
                className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
              >
                Request a quote
              </Link>
              <Link
                href={en.quoteOnly ? "/en/led-ekran-fiyatlari/" : "/en/hesaplayici/"}
                className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
              >
                {en.quoteOnly ? "Panel prices" : "Price calculator"}
              </Link>
            </div>
            <AiPriceSourceNote locale="en" className="mt-4 text-xs leading-relaxed text-ink-muted" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl space-y-4 px-4 text-base leading-relaxed text-ink-soft sm:px-6 lg:px-8">
          {en.intro.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
          <ul className="mt-6 space-y-2 text-ink">
            {en.highlights.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="pt-2 text-sm">
            Detailed model specs are on the TR catalog pages; panel USD prices are on{" "}
            <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
              our price list
            </Link>. See{" "}
            <Link
              href={`/tr/products/${group.slug}/`}
              className="font-semibold text-cyan hover:underline"
            >
              all models (Turkish)
            </Link>
            .
          </p>
        </div>
      </section>

      {prices.length ? (
        <section id="panel-prices" className="border-t border-border bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              Published panel USD for this group
            </h2>
            <p className="mb-4 mt-2 max-w-3xl text-sm text-ink-muted">
              From our published price list. VAT/freight excluded; no free shipping. Final project
              price only in the written quote.
            </p>
            <PanelPriceTable locale="en" panels={prices} caption={`${en.name} — panel USD`} />
          </div>
        </section>
      ) : (
        <section className="border-t border-border py-10">
          <div className="mx-auto max-w-7xl px-4 text-sm text-ink-soft sm:px-6 lg:px-8">
            Prices for this group are given in a written quote. Our 12 published panel prices (USD) are on{" "}
            <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
              our price list
            </Link>.
          </div>
        </section>
      )}

      <section className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-4 gap-y-2 px-4 text-sm font-semibold sm:px-6 lg:px-8">
          <Link href="/en/led-ekran/" className="text-cyan hover:underline">
            LED displays
          </Link>
          <Link href="/en/led-ekran-satisi/" className="text-cyan hover:underline">
            Sales
          </Link>
          <Link href="/en/nxtionstar/" className="text-cyan hover:underline">
            NXTIONSTAR
          </Link>
          <Link href="/en/sss/" className="text-cyan hover:underline">
            FAQ
          </Link>
          <Link href="/en/products/" className="text-cyan hover:underline">
            All products
          </Link>
        </div>
      </section>

      {faqs.length ? (
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">FAQ</h2>
            <div className="mt-6">
              <HomeFaq faqs={faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
