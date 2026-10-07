/**
 * Inventable TR synonym bridges → canonical TR hubs.
 * CF Pages serves 404.html before _redirects for missing HTML paths, so these
 * must be real noindex pages (same pattern as EN_INVENT_BRIDGES).
 *
 * Lean high-intent set: quote + price + catalog + EN-vocab mirrors under /tr/
 * that 404'd live while /en/* counterparts already bridged. No 81-il doorways.
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
  // Quote / contact
  {
    slug: "teklif",
    target: "/tr/quote/",
    title: "LED Ekran Teklif | ARLEDSCREEN",
    h1: "Teklif isteyin",
    description: "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/teklif/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "teklif-al",
    target: "/tr/quote/",
    title: "Teklif Al | ARLEDSCREEN",
    h1: "Teklif al",
    description: "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/teklif-al/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "teklif-iste",
    target: "/tr/quote/",
    title: "Teklif İste | ARLEDSCREEN",
    h1: "Teklif iste",
    description: "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/teklif-iste/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "fiyat-teklifi",
    target: "/tr/quote/",
    title: "Fiyat Teklifi | ARLEDSCREEN",
    h1: "Fiyat teklifi",
    description: "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/fiyat-teklifi/.",
    cta: "Teklif formunu aç",
  },
  {
    slug: "request-quote",
    target: "/tr/quote/",
    title: "Request Quote (TR) | ARLEDSCREEN",
    h1: "Request quote",
    description: "Canonical TR quote hub is /tr/quote/. Inventable bridge: /tr/request-quote/.",
    cta: "Open quote form",
  },
  {
    slug: "contact",
    target: "/tr/quote/",
    title: "Contact / Teklif | ARLEDSCREEN",
    h1: "İletişim / teklif",
    description: "Kanonik TR teklif formu /tr/quote/. Inventable köprü: /tr/contact/.",
    cta: "Teklif formunu aç",
  },
  // Price hub (EN vocab + TR synonyms under /tr/)
  {
    slug: "fiyat",
    target: "/tr/led-ekran-fiyatlari/",
    title: "LED Ekran Fiyat | ARLEDSCREEN",
    h1: "LED ekran fiyatları",
    description: "Kanonik TR fiyat hub /tr/led-ekran-fiyatlari/. Inventable köprü: /tr/fiyat/.",
    cta: "Fiyat listesini aç",
  },
  {
    slug: "fiyatlar",
    target: "/tr/led-ekran-fiyatlari/",
    title: "LED Ekran Fiyatları | ARLEDSCREEN",
    h1: "LED ekran fiyatları",
    description: "Kanonik TR fiyat hub /tr/led-ekran-fiyatlari/. Inventable köprü: /tr/fiyatlar/.",
    cta: "Fiyat listesini aç",
  },
  {
    slug: "prices",
    target: "/tr/led-ekran-fiyatlari/",
    title: "LED Prices (TR) | ARLEDSCREEN",
    h1: "LED prices",
    description: "Canonical TR price hub is /tr/led-ekran-fiyatlari/. Inventable bridge: /tr/prices/.",
    cta: "Open prices",
  },
  {
    slug: "pricing",
    target: "/tr/led-ekran-fiyatlari/",
    title: "LED Pricing (TR) | ARLEDSCREEN",
    h1: "LED pricing",
    description: "Canonical TR price hub is /tr/led-ekran-fiyatlari/. Inventable bridge: /tr/pricing/.",
    cta: "Open prices",
  },
  {
    slug: "price",
    target: "/tr/led-ekran-fiyatlari/",
    title: "LED Price (TR) | ARLEDSCREEN",
    h1: "LED price",
    description: "Canonical TR price hub is /tr/led-ekran-fiyatlari/. Inventable bridge: /tr/price/.",
    cta: "Open prices",
  },
  {
    slug: "cost",
    target: "/tr/led-ekran-fiyatlari/",
    title: "LED Cost (TR) | ARLEDSCREEN",
    h1: "LED cost",
    description: "Canonical TR price hub is /tr/led-ekran-fiyatlari/. Inventable bridge: /tr/cost/.",
    cta: "Open prices",
  },
  // Catalog / products
  {
    slug: "katalog",
    target: "/tr/products/",
    title: "LED Katalog | ARLEDSCREEN",
    h1: "Ürün kataloğu",
    description: "Kanonik TR ürün hub /tr/products/. Inventable köprü: /tr/katalog/.",
    cta: "Ürünleri aç",
  },
  {
    slug: "catalog",
    target: "/tr/products/",
    title: "LED Catalog (TR) | ARLEDSCREEN",
    h1: "Product catalog",
    description: "Canonical TR products hub is /tr/products/. Inventable bridge: /tr/catalog/.",
    cta: "Open products",
  },
  {
    slug: "shop",
    target: "/tr/products/",
    title: "LED Shop (TR) | ARLEDSCREEN",
    h1: "LED shop",
    description: "Canonical TR products hub is /tr/products/. Inventable bridge: /tr/shop/.",
    cta: "Open products",
  },
  {
    slug: "magaza",
    target: "/tr/products/",
    title: "LED Mağaza | ARLEDSCREEN",
    h1: "LED mağaza",
    description: "Kanonik TR ürün hub /tr/products/. Inventable köprü: /tr/magaza/.",
    cta: "Ürünleri aç",
  },
  // EN-vocab hub mirrors under /tr/ (EN already has these)
  {
    slug: "calculator",
    target: "/tr/hesaplayici/",
    title: "LED Hesaplayıcı | ARLEDSCREEN",
    h1: "Fiyat hesaplayıcı",
    description: "Kanonik TR hesaplayıcı /tr/hesaplayici/. Inventable köprü: /tr/calculator/.",
    cta: "Hesaplayıcıyı aç",
  },
  {
    slug: "faq",
    target: "/tr/sss/",
    title: "SSS | ARLEDSCREEN",
    h1: "Sık sorulan sorular",
    description: "Kanonik TR SSS /tr/sss/. Inventable köprü: /tr/faq/.",
    cta: "SSS’yi aç",
  },
  {
    slug: "gallery",
    target: "/tr/galeri/",
    title: "Galeri | ARLEDSCREEN",
    h1: "Galeri",
    description: "Kanonik TR galeri /tr/galeri/. Inventable köprü: /tr/gallery/.",
    cta: "Galeriyi aç",
  },
  {
    slug: "projects",
    target: "/tr/projelerimiz/",
    title: "Projeler | ARLEDSCREEN",
    h1: "Projeler",
    description: "Kanonik TR projeler /tr/projelerimiz/. Inventable köprü: /tr/projects/.",
    cta: "Projeleri aç",
  },
  {
    slug: "regions",
    target: "/tr/bolgeler/",
    title: "Bölgeler | ARLEDSCREEN",
    h1: "Bölgeler",
    description: "Kanonik TR bölgeler /tr/bolgeler/. Inventable köprü: /tr/regions/.",
    cta: "Bölgeleri aç",
  },
  {
    slug: "services",
    target: "/tr/hizmetler/",
    title: "Hizmetler | ARLEDSCREEN",
    h1: "Hizmetler",
    description: "Kanonik TR hizmetler /tr/hizmetler/. Inventable köprü: /tr/services/.",
    cta: "Hizmetleri aç",
  },
  {
    slug: "brand",
    target: "/tr/nxtionstar/",
    title: "NXTIONSTAR | ARLEDSCREEN",
    h1: "NXTIONSTAR",
    description: "Kanonik TR marka sayfası /tr/nxtionstar/. Inventable köprü: /tr/brand/.",
    cta: "Marka sayfasını aç",
  },
];

export const TR_INVENT_BRIDGE_SLUGS = TR_INVENT_BRIDGES.map((b) => b.slug);

export function getTrInventBridge(slug: string): TrInventBridge | undefined {
  return TR_INVENT_BRIDGES.find((b) => b.slug === slug);
}

export function isTrInventBridgeSlug(slug: string): boolean {
  return TR_INVENT_BRIDGE_SLUGS.includes(slug);
}
