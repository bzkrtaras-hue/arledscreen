/**
 * Inventable short EN product-group slugs under /en/products/<alias>/.
 * CF 404.html beats _redirects — these must be real noindex HTML bridges.
 */
export type EnProductGroupBridge = {
  slug: string;
  target: string;
  title: string;
  h1: string;
  description: string;
  cta: string;
};

export const EN_PRODUCT_GROUP_BRIDGES: EnProductGroupBridge[] = [
  {
    slug: "gob",
    target: "/en/products/gob-led-ekran/",
    title: "GOB LED | ARLEDSCREEN",
    h1: "GOB LED display",
    description: "EN GOB hub is /en/products/gob-led-ekran/. Bridge from inventable /en/products/gob/.",
    cta: "Open GOB LED",
  },
  {
    slug: "indoor",
    target: "/en/products/ic-mekan-led-ekran/",
    title: "Indoor LED | ARLEDSCREEN",
    h1: "Indoor LED display",
    description: "EN indoor hub is /en/products/ic-mekan-led-ekran/. Bridge from inventable /en/products/indoor/.",
    cta: "Open indoor LED",
  },
  {
    slug: "outdoor",
    target: "/en/products/dis-mekan-led-ekran/",
    title: "Outdoor LED | ARLEDSCREEN",
    h1: "Outdoor LED display",
    description: "EN outdoor hub is /en/products/dis-mekan-led-ekran/. Bridge from inventable /en/products/outdoor/.",
    cta: "Open outdoor LED",
  },
  {
    slug: "fine-pitch",
    target: "/en/products/ince-pitch-led-ekran/",
    title: "Fine-Pitch LED | ARLEDSCREEN",
    h1: "Fine-pitch LED display",
    description:
      "EN fine-pitch hub is /en/products/ince-pitch-led-ekran/. Bridge from inventable /en/products/fine-pitch/.",
    cta: "Open fine-pitch LED",
  },
];

export const EN_PRODUCT_GROUP_BRIDGE_SLUGS = EN_PRODUCT_GROUP_BRIDGES.map((b) => b.slug);

export function getEnProductGroupBridge(slug: string): EnProductGroupBridge | undefined {
  return EN_PRODUCT_GROUP_BRIDGES.find((b) => b.slug === slug);
}

export function isEnProductGroupBridgeSlug(slug: string): boolean {
  return EN_PRODUCT_GROUP_BRIDGE_SLUGS.includes(slug);
}
