import type { Product } from "@/types/product";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { CONTACT_PHONE_E164 } from "@/lib/social";

export interface ProductJsonLdProps {
  product: Pick<
    Product,
    | "name"
    | "description"
    | "slug"
    | "specs"
    | "shortDescription"
    | "image"
    | "series"
    | "category"
  >;
  url?: string;
  locale?: string;
}

/**
 * Catalog item structured data for NXTIONSTAR / ARLEDSCREEN.
 *
 * Uses schema.org Service (not Product) because list prices are quote-based
 * B2B — Product rich results require offers/price and were generating
 * Google Search Console "Ürün snippet'leri" invalid errors.
 */
export function ProductJsonLd({ product, url, locale = "tr" }: ProductJsonLdProps) {
  const pageUrl =
    url ?? absoluteUrl(`/${locale}/products/#${product.slug}`);
  const imageUrl = absoluteUrl(
    product.image.startsWith("/") ? product.image : `/${product.image}`,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}`,
    name: product.name,
    alternateName: product.series,
    description: product.description || product.shortDescription,
    url: pageUrl,
    image: imageUrl,
    category: product.category,
    serviceType: "LED ekran çözümü",
    brand: {
      "@type": "Brand",
      name: "NXTIONSTAR",
    },
    provider: {
      "@type": "Organization",
      name: "ARLEDSCREEN",
      url: SITE_URL,
      telephone: CONTACT_PHONE_E164,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    termsOfService: absoluteUrl(`/${locale}/quote/`),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "pixelPitch",
        value: `${product.specs.pixelPitchMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "technology",
        value: product.specs.technology,
      },
      ...(
        [
          ["brightness", product.specs.brightnessNits ? `${product.specs.brightnessNits} nits` : undefined],
          ["refreshRate", product.specs.refreshRateHz ? `${product.specs.refreshRateHz} Hz` : undefined],
          ["ipRating", product.specs.ipRating],
        ] as const
      )
        .filter(([, value]) => Boolean(value))
        .map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
