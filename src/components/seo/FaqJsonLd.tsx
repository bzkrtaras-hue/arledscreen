import type { FaqItem } from "@/lib/schemas/cms";
import { BRAND_SUBJECT_DATASETS } from "@/content/prices";

interface FaqJsonLdProps {
  faqs: FaqItem[];
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
