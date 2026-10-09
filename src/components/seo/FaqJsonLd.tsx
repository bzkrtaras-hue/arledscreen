import type { FaqItem } from "@/lib/schemas/cms";
import { BRAND_SUBJECT_REFS } from "@/content/prices";
import { visibleFaqs } from "@/lib/faq-visible";

interface FaqJsonLdProps {
  faqs: FaqItem[];
  /** Stable FAQPage @id for Speakable WebPage.mainEntity joins (e.g. SSS hubs). */
  pageUrl?: string;
  /**
   * Set only where the legacy-domain question ("arleds.com …") is actually rendered on the page.
   * Default: it is dropped, because FAQPage markup must match the visible FAQ list exactly.
   */
  includeDomainDisclaimer?: boolean;
}

export function FaqJsonLd({ faqs: all, pageUrl, includeDomainDisclaimer = false }: FaqJsonLdProps) {
  // FAQPage = exactly the questions shown on the page (audit 2026-10-09: 101 schema-only questions).
  const faqs = includeDomainDisclaimer ? all : visibleFaqs(all);
  if (!faqs.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faqpage`, url: pageUrl } : {}),
    isBasedOn: BRAND_SUBJECT_REFS,
    citation: BRAND_SUBJECT_REFS.map((d) => d.url),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
