/**
 * Arabic pages that carry full, reviewed Arabic copy and are allowed in the index
 * (self canonical, index/follow, reciprocal hreflang ar/tr/en/x-default, sitemap).
 * Every other /ar/* and /ru/* page stays noindex (layout default). The AR price page stays noindex.
 */
export const AR_INDEXABLE_GUIDE_SLUGS = [
  "lcd-ekran",
  "kiosk-ekran",
  "konferans-salonu-led",
  "cami-led-ekran",
  "led-ekran-ariza-belirtileri",
  "led-ekran-ihracat",
] as const;

/** Paths after locale (trailing slash) — used by sitemap and metadata. */
export const AR_INDEXABLE_PATHS = [
  "/about/",
  ...AR_INDEXABLE_GUIDE_SLUGS.map((s) => `/rehber/${s}/`),
] as const;

export function isArIndexableGuide(slug: string): boolean {
  return (AR_INDEXABLE_GUIDE_SLUGS as readonly string[]).includes(slug);
}

export const AR_INDEX_ROBOTS = { index: true, follow: true } as const;
