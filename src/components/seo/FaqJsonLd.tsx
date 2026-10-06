import type { FaqItem } from "@/lib/schemas/cms";

interface FaqJsonLdProps {
  faqs: FaqItem[];
}

function usableFaqs(faqs: FaqItem[]): FaqItem[] {
  return faqs.filter(
    (f) =>
      typeof f?.question === "string" &&
      typeof f?.answer === "string" &&
      f.question.trim().length >= 10 &&
      f.answer.trim().length >= 40,
  );
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const items = usableFaqs(faqs);
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.trim(),
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
