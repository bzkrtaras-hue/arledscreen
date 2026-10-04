interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
}

/** schema.org HowTo for process pages (keşif → montaj). */
export function HowToJsonLd({ name, description, steps }: HowToJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
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
