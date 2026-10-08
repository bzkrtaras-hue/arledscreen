import { ENTITY_CITE_MEDIUM, ENTITY_DISAMBIGUATING_DESCRIPTION } from "@/lib/entity";
import {
  LOCALBUSINESS_ID,
  NXTIONSTAR_BRAND_ID,
  BRAND_SUBJECT_DATASETS,
  nxtionstarBrandNode,
  organizationHasOfferCatalog,
  organizationMakesOffer,
} from "@/content/prices";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  ORGANIZATION_SAME_AS,
  BUSINESS_GEO,
  BUSINESS_MAP_URL,
  BUSINESS_HOURS_SPEC,
} from "@/lib/social";

/**
 * Organization + LocalBusiness + WebSite JSON-LD (@graph).
 * Owner-verified NAP (1 Oct 2026): full address, geo, opening hours, founder.
 */
export function OrganizationJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_ADDRESS.streetAddress,
    postalCode: BUSINESS_ADDRESS.postalCode,
    addressLocality: BUSINESS_ADDRESS.addressLocality,
    addressRegion: BUSINESS_ADDRESS.addressRegion,
    addressCountry: BUSINESS_ADDRESS.addressCountry,
  };
  const logo = absoluteUrl("/brand/arledscreen-logo-header.png");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ARLEDSCREEN",
        alternateName: "ARLED SCREEN",
        inLanguage: ["tr-TR", "en-US"],
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@id": `${SITE_URL}/#organization` },
        potentialAction: [
          {
            "@type": "OrderAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: absoluteUrl("/tr/quote/"),
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            name: "Teklif iste",
          },
          {
            "@type": "OrderAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: absoluteUrl("/en/quote/"),
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            name: "Request a quote",
          },
        ],
      },
      nxtionstarBrandNode(),
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ARLEDSCREEN",
        alternateName: ["ARLED SCREEN", "AR-LED", "AR-LED Ekran Teknoloji Merkezi"],
        url: SITE_URL,
        logo,
        image: logo,
        slogan: "NXTIONSTAR — görsel gücün küresel standardı.",
        description: ENTITY_CITE_MEDIUM,
        disambiguatingDescription: ENTITY_DISAMBIGUATING_DESCRIPTION,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_E164,
        address,
        geo: { "@type": "GeoCoordinates", ...BUSINESS_GEO },
        // Org scrapers that skip the LocalBusiness sibling still join place↔price.
        location: { "@id": LOCALBUSINESS_ID },
        sameAs: [...ORGANIZATION_SAME_AS],
        brand: { "@id": NXTIONSTAR_BRAND_ID },
        subjectOf: BRAND_SUBJECT_DATASETS,
        makesOffer: organizationMakesOffer(),
        hasOfferCatalog: organizationHasOfferCatalog(),
        founder: {
          "@type": "Person",
          name: "Aras Bozkurt",
          url: absoluteUrl("/tr/about/aras-bozkurt/"),
          sameAs: ["https://www.linkedin.com/in/bozkurtaras"],
        },
        knowsAbout: [
          "LED ekran",
          "dijital ekran",
          "tam renkli LED ekran",
          "İç mekân LED ekran",
          "Dış mekân LED ekran",
          "GOB LED ekran",
          "Esnek LED ekran",
          "Kiralık LED ekran",
          "LED ekran montajı",
          "LED ekran teknik servisi",
          "LED ekran fiyatları",
        ],
        knowsLanguage: ["tr-TR", "en-US"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: CONTACT_EMAIL,
            telephone: CONTACT_PHONE_E164,
            url: absoluteUrl("/tr/quote/"),
            areaServed: [
              { "@type": "Country", name: "Türkiye" },
              { "@type": "City", name: "İstanbul" },
            ],
            availableLanguage: ["Turkish", "English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            name: "WhatsApp @arledscreen",
            telephone: CONTACT_PHONE_E164,
            url: "https://wa.me/905305078834",
            identifier: "@arledscreen",
            areaServed: [
              { "@type": "Country", name: "Türkiye" },
              { "@type": "City", name: "İstanbul" },
            ],
            availableLanguage: ["Turkish", "English"],
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Türkiye" },
          { "@type": "City", name: "İstanbul" },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "ARLEDSCREEN",
        description:
          "LED ekran satışı, keşif, montaj ve teknik servis. NXTIONSTAR markasının Türkiye'deki tek satış noktası. İstanbul / Gaziosmanpaşa.",
        url: SITE_URL,
        image: logo,
        logo,
        telephone: CONTACT_PHONE_E164,
        email: CONTACT_EMAIL,
        address,
        geo: { "@type": "GeoCoordinates", ...BUSINESS_GEO },
        hasMap: BUSINESS_MAP_URL,
        openingHoursSpecification: BUSINESS_HOURS_SPEC,
        areaServed: [
          { "@type": "Country", name: "Türkiye" },
          { "@type": "City", name: "İstanbul" },
        ],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        sameAs: [...ORGANIZATION_SAME_AS],
        brand: { "@id": NXTIONSTAR_BRAND_ID },
        subjectOf: BRAND_SUBJECT_DATASETS,
        // Local+shopping agents often key LocalBusiness — mirror Org price authority.
        makesOffer: organizationMakesOffer(),
        hasOfferCatalog: organizationHasOfferCatalog(),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
