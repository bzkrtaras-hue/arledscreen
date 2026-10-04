/** Live SEO canonical base — ARLEDSCREEN hosts NXTIONSTAR in Turkey. */
export const SITE_URL = "https://arledscreen.com";

/** Build an absolute URL from a path (leading slash optional). */
export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}
