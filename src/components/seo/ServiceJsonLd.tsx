import { localBusinessRef, nxtionstarBrandRef } from "@/content/prices";
import { SERVICE_REGIONS } from "@/content/service-regions";
import { absoluteUrl } from "@/lib/site";

/** Single Service entity for the verified offering (sales, installation, service). */
export function ServiceJsonLd({ locale = "tr" }: { locale?: string }) {
  const en = locale === "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/${locale}/hizmetler/`)}#service`,
    name: en
      ? "LED display sales, installation and technical service"
      : "LED ekran satışı, montajı ve teknik servis",
    serviceType: en ? "LED display systems" : "LED ekran sistemleri",
    description: en
      ? "Indoor and outdoor LED selection, survey, install, commissioning and technical service. NXTIONSTAR products."
      : "İç ve dış mekân LED ekran seçimi, keşif, montaj, devreye alma ve teknik servis. NXTIONSTAR ürünleri.",
    brand: nxtionstarBrandRef(),
    provider: localBusinessRef(),
    areaServed: [
      { "@type": "Country", name: en ? "Turkey" : "Türkiye" },
      ...SERVICE_REGIONS.map((r) => ({
        "@type": "AdministrativeArea",
        name: r.name,
      })),
    ],
    url: absoluteUrl(`/${locale}/hizmetler/`),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
