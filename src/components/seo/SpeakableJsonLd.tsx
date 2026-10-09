import { BRAND_SUBJECT_REFS } from "@/content/prices";
import { SITE_URL } from "@/lib/site";

interface SpeakableJsonLdProps {
  pageUrl: string;
  name: string;
  description: string;
  /** CSS selectors for speakable blocks (must exist in the page DOM). */
  cssSelectors: string[];
  /** Optional page→Product forward join (priced PDPs). */
  mainEntity?: { "@id": string };
}

/**
 * WebPage + SpeakableSpecification for GEO / voice / AI answer extraction.
 * Selectors must match real element ids/classes on the page — do not invent.
 */
export function SpeakableJsonLd({
  pageUrl,
  name,
  description,
  cssSelectors,
  mainEntity,
}: SpeakableJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    ...(mainEntity ? { mainEntity } : {}),
    isBasedOn: BRAND_SUBJECT_REFS,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
