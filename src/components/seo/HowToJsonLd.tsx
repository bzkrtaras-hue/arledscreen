import { BRAND_SUBJECT_DATASETS, localBusinessRef } from "@/content/prices";

interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  /** When true, link HowTo to published price Datasets (calculator / fiyat). */
  citePriceDatasets?: boolean;
}

/** schema.org HowTo for process pages (keşif → montaj) or price estimation. */
export function HowToJsonLd({
  name,
  description,
  steps,
  citePriceDatasets = false,
}: HowToJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(citePriceDatasets
      ? {
          isBasedOn: BRAND_SUBJECT_DATASETS,
          citation: BRAND_SUBJECT_DATASETS.map((d) => d.url),
          // Price HowTo → Gaziosmanpaşa NAP (same place Offers availableAtOrFrom).
          provider: localBusinessRef(),
        }
      : {}),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
