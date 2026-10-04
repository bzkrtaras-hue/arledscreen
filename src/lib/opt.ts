import manifest from "@/content/image-manifest.json";

type ManifestEntry = { w: number; h: number; widths: number[] };
const MANIFEST = manifest as Record<string, ManifestEntry>;

/** Path of the pre-generated WebP variant closest to (and not below, if possible) `width`. */
export function optSrc(src: string, width = 480): string {
  const entry = MANIFEST[src];
  if (!entry) return src;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  const pick = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  return `/opt${base}-${pick}.webp`;
}

/** Full srcset string for a manifest image (or undefined if not optimised). */
export function optSrcSet(src: string): string | undefined {
  const entry = MANIFEST[src];
  if (!entry) return undefined;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  return entry.widths.map((w) => `/opt${base}-${w}.webp ${w}w`).join(", ");
}
