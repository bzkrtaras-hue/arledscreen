import { SITE_URL } from "@/lib/site";

/**
 * Quote-based Product Offer (no list price) for Google merchant-listing fields.
 * Used when panel USD is not published — price must not appear in the Offer.
 */
export function quoteBasedProductOffer(pageUrl: string) {
  return {
    "@type": "Offer",
    url: pageUrl,
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "TR",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnFees: "https://schema.org/FreeReturn",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "TRY",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "TR",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 2,
          maxValue: 7,
          unitCode: "DAY",
        },
      },
    },
    seller: { "@id": `${SITE_URL}/#organization` },
  } as const;
}
