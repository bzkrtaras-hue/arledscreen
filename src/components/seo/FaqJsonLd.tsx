import type { FaqItem } from "@/lib/schemas/cms";
import { BRAND_SUBJECT_DATASETS } from "@/content/prices";

interface FaqJsonLdProps {
  faqs: FaqItem[];
  /** Stable FAQPage @id for Speakable WebPage.mainEntity joins (e.g. SSS hubs). */
  pageUrl?: string;
}

export function FaqJsonLd({ faqs, pageUrl }: FaqJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faqpage`, url: pageUrl } : {}),
    isBasedOn: BRAND_SUBJECT_DATASETS,
    citation: BRAND_SUBJECT_DATASETS.map((d) => d.url),
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
