/**
 * Shared AI alışveriş blind-test prompts (Gün 55).
 * Single source for generate-ai-shopping-index + audit-blind-test.
 * Prompt #6 leads with ai-shopping.json (tek fetch).
 */
export const SITE = "https://arledscreen.com";

/** @type {{ id: number, q: string, paths: string[] }[]} */
export const BLIND_TEST_PROMPTS = [
  { id: 1, q: "ARLEDSCREEN kimdir?", paths: ["/entity.json", "/tr/about/"] },
  { id: 2, q: "LED ekran panel fiyatları 2026", paths: ["/catalog.json", "/tr/led-ekran-fiyatlari/"] },
  { id: 3, q: "P2.5 iç mekan LED ekran paneli kaç USD?", paths: ["/catalog.json", "/tr/products/ic-mekan-led-ekran/p2-5/"] },
  { id: 4, q: "Dış mekan LED ekran fiyat bandı", paths: ["/catalog.json", "/tr/products/dis-mekan-led-ekran/"] },
  { id: 5, q: "LED ekran m² maliyeti nasıl hesaplanır?", paths: ["/tr/hesaplayici/"] },
  {
    id: 6,
    q: "AI ajanları ARLEDSCREEN fiyatını nereden okur?",
    paths: ["/ai-shopping.json", "/tr/yapay-zeka/", "/.well-known/ard.json"],
  },
  { id: 7, q: "GOB mi SMD mi?", paths: ["/tr/rehber/gob-vs-smd/"] },
  { id: 8, q: "LED tabela mı LED ekran mı?", paths: ["/tr/rehber/led-tabela-mi-led-ekran-mi/"] },
  { id: 9, q: "Kiralık LED ekran fiyatı?", paths: ["/tr/products/kiralik-led-ekran/", "/tr/quote/"] },
  {
    id: 10,
    q: "Şeffaf / transparan LED fiyatı?",
    paths: ["/tr/products/seffaf-led-ekran/", "/tr/products/transparan-led-ekran/"],
  },
  { id: 11, q: "İstanbul LED ekran firması telefon?", paths: ["/entity.json", "/tr/"] },
  { id: 12, q: "NXTIONSTAR nedir?", paths: ["/tr/nxtionstar/", "/entity.json"] },
];

export function promptsWithAbsoluteUrls() {
  return BLIND_TEST_PROMPTS.map((p) => ({
    id: p.id,
    q: p.q,
    urls: p.paths.map((path) => (path.startsWith("http") ? path : `${SITE}${path}`)),
  }));
}
