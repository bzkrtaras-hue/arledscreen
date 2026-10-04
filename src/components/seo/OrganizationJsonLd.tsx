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
        inLanguage: "tr-TR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ARLEDSCREEN",
        alternateName: ["ARLED SCREEN", "AR-LED"],
        url: SITE_URL,
        logo,
        image: logo,
        slogan: "NXTIONSTAR — görsel gücün küresel standardı.",
        description:
          "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. İç ve dış mekân LED ekran satışı, keşif, montaj ve teknik servis hizmeti verir.",
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_E164,
        address,
        sameAs: [...ORGANIZATION_SAME_AS],
        brand: { "@type": "Brand", name: "NXTIONSTAR", url: absoluteUrl("/tr/nxtionstar/") },
        founder: { "@type": "Person", name: "Aras Bozkurt" },
        knowsAbout: ["LED ekran", "İç mekân LED ekran", "Dış mekân LED ekran", "GOB LED ekran", "Kiralık LED ekran", "LED ekran montajı", "LED ekran teknik servisi"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: CONTACT_EMAIL,
            telephone: CONTACT_PHONE_E164,
            areaServed: "TR",
            availableLanguage: ["Turkish"],
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
