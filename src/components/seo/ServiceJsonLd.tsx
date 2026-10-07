import { nxtionstarBrandRef } from "@/content/prices";
import { SERVICE_REGIONS } from "@/content/service-regions";
import { absoluteUrl, SITE_URL } from "@/lib/site";

/** Single Service entity for the verified offering (sales, installation, service). */
export function ServiceJsonLd({ locale = "tr" }: { locale?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/${locale}/hizmetler/`)}#service`,
    name: "LED ekran satışı, montajı ve teknik servis",
    serviceType: "LED ekran sistemleri",
    description:
      "İç ve dış mekân LED ekran seçimi, keşif, montaj, devreye alma ve teknik servis. NXTIONSTAR ürünleri.",
    brand: nxtionstarBrandRef(),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
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
