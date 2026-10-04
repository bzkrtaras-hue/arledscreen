export type LedTechnology = "SMD" | "COB" | "GOB";
export type ProductCategory =
  | "fine-pitch"
  | "indoor"
  | "outdoor"
  | "rental"
  | "transparent"
  | "flexible";

export interface ProductSpecs {
  pixelPitchMm: number;
  technology: LedTechnology;
  /** Optional: only set when confirmed by the official datasheet. */
  brightnessNits?: number;
  refreshRateHz?: number;
  cabinetSizeMm?: string;
  ipRating?: string;
  lifespanHours?: number;
  viewingAngle?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  specs: ProductSpecs;
  highlights: string[];
  /** Real module / cabinet photo under /public */
  image: string;
  /** Alt text for the image (defaults to name — series) */
  imageAlt?: string;
  /** Model page this card represents */
  href?: string;
  /** Soft gradient fallback behind the photo */
  imageGradient: string;
}
