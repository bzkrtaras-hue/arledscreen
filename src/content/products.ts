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
  kontrol: "indoor",
};

const KIND_SERIES_TR: Record<ModelKind, string> = {
  gob: "GOB iç mekân",
  ic: "İç mekân",
  dis: "Dış mekân",
  esnek: "Esnek",
  kontrol: "Kontrol sistemi",
};

const KIND_SERIES_EN: Record<ModelKind, string> = {
  gob: "GOB indoor",
  ic: "Indoor",
  dis: "Outdoor",
  esnek: "Flexible",
  kontrol: "Control system",
};

const pitchOf = (m: LedModel) => Number.parseFloat(m.chip.replace(/^P/, "").replace(",", "."));

/** EN product cards keep Turkish datasheet alts translated for visible UI. */
function enImageAlt(alt: string): string {
  return alt
    .replaceAll("iç mekân", "indoor")
    .replaceAll("İç mekân", "Indoor")
    .replaceAll("dış mekân", "outdoor")
    .replaceAll("Dış mekân", "Outdoor")
    .replaceAll("modülün ön ve arka yüzü", "module front and back")
    .replaceAll("LED modül yüzeyi", "LED module surface")
    .replaceAll("LED ekran duvarı", "LED display wall")
    .replaceAll("LED modül", "LED module")
    .replaceAll("Önden servis edilebilen", "Front-service")
    .replaceAll("Bükülmüş", "Bent")
    .replaceAll("Kavisli forma getirilmiş esnek", "Curve-formed flexible")
    .replaceAll("asenkron LED kontrol kartı", "asynchronous LED control card")
    .replaceAll("LED kontrolcü", "LED controller")
    .replaceAll("Wi-Fi kontrol kartı", "Wi-Fi control card")
    .replaceAll("all-in-one LED kontrolcü", "all-in-one LED controller")
    .replaceAll("multimedya oynatıcı ailesi", "multimedia player family")
    .replaceAll("gönderici kart", "sending card")
    .replaceAll("multimedya LED işlemci", "multimedia LED processor")
    .replaceAll("yüksek kapasiteli LED işlemci", "high-capacity LED processor")
    .replaceAll("LED video işlemci", "LED video processor")
    .replaceAll("LED gönderici kart", "LED sending card");
}

function fromModel(m: LedModel): Product {
  if (m.kind === "kontrol") {
    return {
      id: `${m.group}-${m.slug}`,
      slug: `${m.group}-${m.slug}`,
      name: m.name,
      series: m.brandName ?? KIND_SERIES_EN.kontrol,
      category: "indoor",
      shortDescription: m.note,
      description: m.note,
      specs: { pixelPitchMm: 0, technology: "SMD" },
      highlights: [],
      image: m.image,
      imageAlt: enImageAlt(m.imageAlt),
      href: modelPath(m),
      imageGradient: "from-slate-50 via-white to-cyan-50",
    };
  }
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
    imageAlt: enImageAlt(m.imageAlt),
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
    const model = LED_MODELS.find((m) => `${m.group}-${m.slug}` === p.id);
    if (!copy) return p;
    return {
      ...p,
      name: copy.name,
      series: copy.series,
      shortDescription: copy.shortDescription,
      description: copy.description,
      imageAlt: model?.imageAlt ?? p.imageAlt,
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
