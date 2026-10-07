/**
 * Inventable TR synonym bridges → canonical TR hubs.
 * CF Pages serves 404.html before _redirects for missing HTML paths, so these
 * must be real noindex pages (same pattern as EN_INVENT_BRIDGES).
 *
 * Keep this list lean: only high-intent quote/contact invents that 404'd live.
 * Do not add 81-il doorways or spam synonym farms.
 */

export type TrInventBridge = {
  slug: string;
  target: string;
  title: string;
  h1: string;
  description: string;
  cta: string;
};

export const TR_INVENT_BRIDGES: TrInventBridge[] = [
  {
    slug: "teklif",
    target: "/tr/quote/",
    title: "LED Ekran Teklif | ARLEDSCREEN",
    h1: "Teklif isteyin",
    description:
      "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/teklif/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "teklif-al",
    target: "/tr/quote/",
    title: "Teklif Al | ARLEDSCREEN",
    h1: "Teklif al",
    description:
      "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/teklif-al/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "teklif-iste",
    target: "/tr/quote/",
    title: "Teklif İste | ARLEDSCREEN",
    h1: "Teklif iste",
    description:
      "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/teklif-iste/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "fiyat-teklifi",
    target: "/tr/quote/",
    title: "Fiyat Teklifi | ARLEDSCREEN",
    h1: "Fiyat teklifi",
    description:
      "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/fiyat-teklifi/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "request-quote",
    target: "/tr/quote/",
    title: "Request Quote (TR) | ARLEDSCREEN",
    h1: "Request quote",
    description:
      "Canonical TR quote hub is /tr/quote/. Inventable bridge: /tr/request-quote/.",
    cta: "Open quote form",
  },
];

export const TR_INVENT_BRIDGE_SLUGS = TR_INVENT_BRIDGES.map((b) => b.slug);

export function getTrInventBridge(slug: string): TrInventBridge | undefined {
  return TR_INVENT_BRIDGES.find((b) => b.slug === slug);
}

export function isTrInventBridgeSlug(slug: string): boolean {
  return TR_INVENT_BRIDGE_SLUGS.includes(slug);
}
