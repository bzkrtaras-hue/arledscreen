/**
 * English path synonyms AI agents invent from TR hubs or EN vocabulary.
 * CF Pages serves 404.html before _redirects — these must be real HTML bridges.
 * All bridges are noindex; canonical hubs stay Turkish-path EN twins (/en/hesaplayici/, etc.).
 */
export type EnInventBridge = {
  slug: string;
  target: string;
  title: string;
  h1: string;
  description: string;
  cta: string;
};

export const EN_INVENT_BRIDGES: EnInventBridge[] = [
  {
    slug: "calculator",
    target: "/en/hesaplayici/",
    title: "LED Price Calculator | ARLEDSCREEN",
    h1: "LED price calculator",
    description: "EN calculator hub is /en/hesaplayici/ (12 panel USD). Bridge from inventable /en/calculator/.",
    cta: "Open calculator",
  },
  {
    slug: "price-calculator",
    target: "/en/hesaplayici/",
    title: "Price Calculator | ARLEDSCREEN",
    h1: "Price calculator",
    description: "EN calculator hub is /en/hesaplayici/. Bridge from inventable /en/price-calculator/.",
    cta: "Open calculator",
  },
  {
    slug: "faq",
    target: "/en/sss/",
    title: "FAQ | ARLEDSCREEN",
    h1: "FAQ",
    description: "EN FAQ hub is /en/sss/. Bridge from inventable /en/faq/.",
    cta: "Open FAQ",
  },
  {
    slug: "gallery",
    target: "/en/galeri/",
    title: "LED Gallery | ARLEDSCREEN",
    h1: "LED gallery",
    description: "EN gallery hub is /en/galeri/. Bridge from inventable /en/gallery/.",
    cta: "Open gallery",
  },
  {
    slug: "projects",
    target: "/en/projelerimiz/",
    title: "LED Projects | ARLEDSCREEN",
    h1: "LED projects",
    description: "EN projects hub is /en/projelerimiz/. Bridge from inventable /en/projects/.",
    cta: "Open projects",
  },
  {
    slug: "regions",
    target: "/en/bolgeler/",
    title: "Service Regions | ARLEDSCREEN",
    h1: "Service regions",
    description: "EN regions hub is /en/bolgeler/. Bridge from inventable /en/regions/.",
    cta: "Open regions",
  },
  {
    slug: "services",
    target: "/en/hizmetler/",
    title: "LED Services | ARLEDSCREEN",
    h1: "LED services",
    description: "EN services hub is /en/hizmetler/. Bridge from inventable /en/services/.",
    cta: "Open services",
  },
  {
    slug: "brand",
    target: "/en/nxtionstar/",
    title: "NXTIONSTAR Brand | ARLEDSCREEN",
    h1: "NXTIONSTAR brand",
    description: "EN brand hub is /en/nxtionstar/. Bridge from inventable /en/brand/.",
    cta: "Open brand page",
  },
  {
    slug: "fiyat",
    target: "/en/led-ekran-fiyatlari/",
    title: "LED Prices | ARLEDSCREEN",
    h1: "LED prices",
    description: "EN price hub is /en/led-ekran-fiyatlari/. Bridge from inventable /en/fiyat/.",
    cta: "Open prices",
  },
  {
    slug: "fiyatlar",
    target: "/en/led-ekran-fiyatlari/",
    title: "LED Price List | ARLEDSCREEN",
    h1: "LED price list",
    description: "EN price hub is /en/led-ekran-fiyatlari/. Bridge from inventable /en/fiyatlar/.",
    cta: "Open prices",
  },
  {
    slug: "prices",
    target: "/en/led-ekran-fiyatlari/",
    title: "LED Prices | ARLEDSCREEN",
    h1: "LED prices",
    description: "EN price hub is /en/led-ekran-fiyatlari/. Bridge from inventable /en/prices/.",
    cta: "Open prices",
  },
  {
    slug: "pricing",
    target: "/en/led-ekran-fiyatlari/",
    title: "LED Pricing | ARLEDSCREEN",
    h1: "LED pricing",
    description: "EN price hub is /en/led-ekran-fiyatlari/. Bridge from inventable /en/pricing/.",
    cta: "Open pricing",
  },
  {
    slug: "price",
    target: "/en/led-ekran-fiyatlari/",
    title: "LED Price | ARLEDSCREEN",
    h1: "LED price",
    description: "EN price hub is /en/led-ekran-fiyatlari/. Bridge from inventable /en/price/.",
    cta: "Open prices",
  },
  {
    slug: "cost",
    target: "/en/led-ekran-fiyatlari/",
    title: "LED Cost | ARLEDSCREEN",
    h1: "LED cost",
    description: "EN price hub is /en/led-ekran-fiyatlari/. Bridge from inventable /en/cost/.",
    cta: "Open prices",
  },
  {
    slug: "teklif",
    target: "/en/quote/",
    title: "Quote Request | ARLEDSCREEN",
    h1: "Quote request",
    description: "EN quote hub is /en/quote/. Bridge from inventable /en/teklif/.",
    cta: "Request a quote",
  },
  {
    slug: "urunler",
    target: "/en/products/",
    title: "LED Products | ARLEDSCREEN",
    h1: "LED products",
    description: "EN products hub is /en/products/. Bridge from inventable /en/urunler/.",
    cta: "Open products",
  },
  {
    slug: "hakkimizda",
    target: "/en/about/",
    title: "About | ARLEDSCREEN",
    h1: "About",
    description: "EN about hub is /en/about/. Bridge from inventable /en/hakkimizda/.",
    cta: "Open about",
  },
  {
    slug: "kvkk",
    target: "/en/gizlilik/",
    title: "KVKK / Privacy | ARLEDSCREEN",
    h1: "KVKK / privacy",
    description: "EN privacy notice is /en/gizlilik/. Bridge from inventable /en/kvkk/.",
    cta: "Open privacy notice",
  },
  {
    slug: "cerez-politikasi",
    target: "/en/gizlilik/",
    title: "Cookie Policy | ARLEDSCREEN",
    h1: "Cookie / privacy notice",
    description: "Privacy notice is /en/gizlilik/. Bridge from inventable /en/cerez-politikasi/.",
    cta: "Open privacy notice",
  },
  {
    slug: "cookies",
    target: "/en/gizlilik/",
    title: "Cookies | ARLEDSCREEN",
    h1: "Cookies / privacy",
    description: "Privacy notice is /en/gizlilik/. Bridge from inventable /en/cookies/.",
    cta: "Open privacy notice",
  },
  {
    slug: "terms",
    target: "/en/about/",
    title: "Terms | ARLEDSCREEN",
    h1: "Terms",
    description:
      "No separate public terms page. Project terms are in written quotes. Bridge from inventable /en/terms/ to /en/about/.",
    cta: "Open about",
  },
  {
    slug: "sartlar",
    target: "/en/about/",
    title: "Şartlar | ARLEDSCREEN",
    h1: "Şartlar / terms",
    description:
      "No separate public terms page. Project terms are in written quotes. Bridge from inventable /en/sartlar/ to /en/about/.",
    cta: "Open about",
  },
];

export const EN_INVENT_BRIDGE_SLUGS = EN_INVENT_BRIDGES.map((b) => b.slug);

export function getEnInventBridge(slug: string): EnInventBridge | undefined {
  return EN_INVENT_BRIDGES.find((b) => b.slug === slug);
}

export function isEnInventBridgeSlug(slug: string): boolean {
  return EN_INVENT_BRIDGE_SLUGS.includes(slug);
}
