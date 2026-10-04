import type { Product, ProductCategory } from "@/types/product";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { LED_MODELS, modelPath, type LedModel, type ModelKind } from "@/content/models";

/**
 * Product cards are generated from the verified NXTIONSTAR model list
 * (src/content/models.ts), so every card matches a real model page, price and
 * datasheet value. Only pitch, use and module size are shown on cards; the
 * other technical values live on the model pages (with their source) or in the
 * datasheet shared with the quote.
 */
export const SPECS_VERIFIED = false;

export const CATEGORY_LABELS_TR: Record<Product["category"], string> = {
  "fine-pitch": "İnce pitch / GOB",
  indoor: "İç mekân",
  outdoor: "Dış mekân",
  rental: "Kiralık / sahne",
  transparent: "Vitrin / şeffaf",
  flexible: "Esnek",
};

export const CATEGORY_LABELS_EN: Record<Product["category"], string> = {
  "fine-pitch": "Fine pitch / GOB",
  indoor: "Indoor",
  outdoor: "Outdoor",
  rental: "Rental / stage",
  transparent: "Transparent",
  flexible: "Flexible",
};

const KIND_CATEGORY: Record<ModelKind, ProductCategory> = {
  gob: "fine-pitch",
  ic: "indoor",
  dis: "outdoor",
  esnek: "flexible",
};

const KIND_SERIES_TR: Record<ModelKind, string> = {
  gob: "GOB iç mekân",
  ic: "İç mekân",
  dis: "Dış mekân",
  esnek: "Esnek",
};

const KIND_SERIES_EN: Record<ModelKind, string> = {
  gob: "GOB indoor",
  ic: "Indoor",
  dis: "Outdoor",
  esnek: "Flexible",
};

const pitchOf = (m: LedModel) => Number.parseFloat(m.chip.replace(/^P/, "").replace(",", "."));

function fromModel(m: LedModel): Product {
  const pitch = pitchOf(m);
  const front = m.chip.includes("önden servis");
  const enKind = m.kind === "dis" && front ? "front-service outdoor" : KIND_SERIES_EN[m.kind];
  const moduleSize = m.specs.moduleSize?.value;
  return {
    id: `${m.group}-${m.slug}`,
    slug: `${m.group}-${m.slug}`,
    name: `NXTIONSTAR P${pitch} ${enKind} LED module`,
    series: KIND_SERIES_EN[m.kind],
    category: KIND_CATEGORY[m.kind],
    shortDescription: `P${pitch} ${enKind} LED module${moduleSize ? ` (${moduleSize})` : ""}. Datasheet and price are shared with the quote.`,
    description: `P${pitch} ${enKind} LED module${moduleSize ? ` (${moduleSize})` : ""}. Datasheet and price are shared with the quote.`,
    specs: { pixelPitchMm: pitch, technology: m.kind === "gob" ? "GOB" : "SMD" },
    highlights: [],
    image: m.image,
    imageAlt: m.imageAlt,
    href: modelPath(m),
    imageGradient: "from-cyan-50 via-white to-sky-50",
  };
}

const trCopy: Record<string, Pick<Product, "name" | "series" | "shortDescription" | "description">> =
  Object.fromEntries(
    LED_MODELS.map((m) => [
      `${m.group}-${m.slug}`,
      { name: m.name, series: KIND_SERIES_TR[m.kind], shortDescription: m.note, description: m.note },
    ]),
  );

export const products: Product[] = LED_MODELS.map(fromModel);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProducts(locale: Locale): Product[] {
  if (locale !== "tr") return products;
  return products.map((p) => {
    const copy = trCopy[p.id];
    if (!copy) return p;
    return {
      ...p,
      name: copy.name,
      series: copy.series,
      shortDescription: copy.shortDescription,
      description: copy.description,
    };
  });
}

export function getSeriesTabs(locale: Locale) {
  const t = getDictionary(locale).products.tabs;
  return [
    { id: "all", label: t.all },
    { id: "fine-pitch", label: t.cob },
    { id: "indoor", label: t.indoor },
    { id: "outdoor", label: t.outdoor },
    { id: "flexible", label: t.flexible },
  ] as const;
}
