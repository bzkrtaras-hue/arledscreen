import { ENTITY_CITE_MEDIUM, ENTITY_DISAMBIGUATING_DESCRIPTION } from "@/lib/entity";
import { NXTIONSTAR_BRAND_ID, BRAND_SUBJECT_DATASETS, nxtionstarBrandNode } from "@/content/prices";
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
        description: ENTITY_CITE_MEDIUM,
        disambiguatingDescription: ENTITY_DISAMBIGUATING_DESCRIPTION,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_E164,
        address,
        sameAs: [...ORGANIZATION_SAME_AS],
        brand: { "@id": NXTIONSTAR_BRAND_ID },
        subjectOf: BRAND_SUBJECT_DATASETS,
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
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: CONTACT_EMAIL,
            telephone: CONTACT_PHONE_E164,
            areaServed: "TR",
            availableLanguage: ["Turkish", "English"],
          },
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
