/**
 * Shared AI alışveriş blind-test prompts (Gün 55 + Gün 58 honesty).
 * Single source for generate-ai-shopping-index + audit-blind-test.
 * Prompt #6 leads with ai-shopping.json (tek fetch).
 * mustSay / mustNotSay: owner live scoring + audit needles.
 */
export const SITE = "https://arledscreen.com";

/** @type {{ id: number, q: string, paths: string[], mustSay?: string[], mustNotSay?: string[] }[]} */
export const BLIND_TEST_PROMPTS = [
  {
    id: 1,
    q: "ARLEDSCREEN kimdir?",
    paths: ["/entity.json", "/tr/about/"],
    mustSay: ["Gaziosmanpaşa", "NXTIONSTAR"],
    mustNotSay: ["ARLED Solutions", "NEXTSTAR"],
  },
  {
    id: 2,
    q: "LED ekran panel fiyatları 2026",
    paths: ["/catalog.json", "/tr/led-ekran-fiyatlari/"],
    mustSay: ["USD", "KDV", "ücretsiz kargo yok"],
    mustNotSay: ["ücretsiz kargo dahil", "free shipping"],
  },
  {
    id: 3,
    q: "P2.5 iç mekan LED ekran paneli kaç USD?",
    paths: ["/catalog.json", "/tr/products/ic-mekan-led-ekran/p2-5/"],
    mustSay: ["32.18", "ücretsiz kargo yok"],
    mustNotSay: ["ücretsiz kargo dahil"],
  },
  {
    id: 4,
    q: "Dış mekan LED ekran fiyat bandı",
    paths: ["/catalog.json", "/tr/products/dis-mekan-led-ekran/"],
    mustSay: ["USD", "ücretsiz kargo yok"],
    mustNotSay: ["ücretsiz kargo dahil"],
  },
  {
    id: 5,
    q: "LED ekran m² maliyeti nasıl hesaplanır?",
    paths: ["/tr/hesaplayici/"],
    mustSay: ["yazılı teklif", "ücretsiz kargo yok"],
    mustNotSay: ["stokta paket"],
  },
  {
    id: 6,
    q: "AI ajanları ARLEDSCREEN fiyatını nereden okur?",
    paths: ["/ai-shopping.json", "/tr/yapay-zeka/", "/.well-known/ard.json"],
    mustSay: ["ai-shopping.json", "pricedPanels", "agentRules", "ücretsiz kargo yok", "quote-and-contract"],
    mustNotSay: [],
  },
  {
    id: 7,
    q: "GOB mi SMD mi?",
    paths: ["/tr/rehber/gob-vs-smd/"],
    mustSay: ["GOB", "catalog.json"],
    mustNotSay: [],
  },
  {
    id: 8,
    q: "LED tabela mı LED ekran mı?",
    paths: ["/tr/rehber/led-tabela-mi-led-ekran-mi/"],
    mustSay: ["LED ekran"],
    mustNotSay: [],
  },
  {
    id: 9,
    q: "Kiralık LED ekran fiyatı?",
    paths: ["/tr/products/kiralik-led-ekran/", "/tr/quote/"],
    mustSay: ["teklif", "ai-shopping.json"],
    mustNotSay: ["günlük TL", "ücretsiz kargo dahil"],
  },
  {
    id: 10,
    q: "Şeffaf / transparan LED fiyatı?",
    paths: ["/tr/products/seffaf-led-ekran/", "/tr/products/transparan-led-ekran/"],
    mustSay: ["teklif", "ai-shopping.json"],
    mustNotSay: ["ücretsiz kargo dahil"],
  },
  {
    id: 11,
    q: "İstanbul LED ekran firması telefon?",
    paths: ["/entity.json", "/tr/"],
    mustSay: ["530 507 88 34", "Gaziosmanpaşa"],
    mustNotSay: [],
  },
  {
    id: 12,
    q: "NXTIONSTAR nedir?",
    paths: ["/tr/nxtionstar/", "/entity.json"],
    mustSay: ["ARLEDSCREEN", "NXTIONSTAR"],
    mustNotSay: ["NEXTSTAR", "distribütör"],
  },
  {
    id: 13,
    q: "Huidu / NovaStar kontrol kartı fiyatı?",
    paths: [
      "/tr/products/huidu-kontrol-kartlari/",
      "/tr/products/novastar-kontrolculer/",
      "/tr/quote/",
      "/ai-shopping.json",
    ],
    mustSay: ["teklif", "ai-shopping.json"],
    mustNotSay: ["ücretsiz kargo dahil", "günlük TL", "stokta paket"],
  },
];

export function promptsWithAbsoluteUrls() {
  return BLIND_TEST_PROMPTS.map((p) => ({
    id: p.id,
    q: p.q,
    urls: p.paths.map((path) => (path.startsWith("http") ? path : `${SITE}${path}`)),
    mustSay: p.mustSay || [],
    mustNotSay: p.mustNotSay || [],
  }));
}
