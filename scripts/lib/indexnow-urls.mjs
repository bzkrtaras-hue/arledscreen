/**
 * IndexNow URL list (Gün 46 + 56).
 * Shared by indexnow-ping + audit-indexnow.
 */
export const SITE = "https://arledscreen.com";

/** Post-merge Bing/IndexNow ping targets — keep in sync with agent cite surfaces. */
export const INDEXNOW_URLS = [
  `${SITE}/ai-shopping.json`,
  `${SITE}/entity.json`,
  `${SITE}/entity-profiles.json`,
  `${SITE}/catalog.json`,
  `${SITE}/.well-known/ard.json`,
  `${SITE}/.well-known/ai-catalog.json`,
  `${SITE}/llms.txt`,
  `${SITE}/llms-full.txt`,
  `${SITE}/feeds/merchant-priced-panels.tsv`,
  `${SITE}/sitemap.xml`,
  `${SITE}/tr/`,
  `${SITE}/tr/led-ekran-fiyatlari/`,
  `${SITE}/tr/hesaplayici/`,
  `${SITE}/tr/yapay-zeka/`,
  `${SITE}/tr/about/`,
  `${SITE}/tr/quote/`,
  `${SITE}/tr/products/`,
  `${SITE}/tr/products/esnek-led-ekran/`,
  `${SITE}/tr/products/kiralik-led-ekran/`,
  `${SITE}/tr/products/poster-led-ekran/`,
  `${SITE}/tr/products/seffaf-led-ekran/`,
  `${SITE}/tr/products/transparan-led-ekran/`,
  `${SITE}/tr/products/huidu-kontrol-kartlari/`,
  `${SITE}/tr/products/novastar-kontrolculer/`,
  `${SITE}/tr/products/colorlight-kontrolculer/`,
  `${SITE}/tr/products/led-modul-ve-kontrol-sistemleri/`,
  `${SITE}/tr/led-ekran-ureticisi/`,
  `${SITE}/tr/hizmetler/`,
  `${SITE}/tr/sss/`,
  `${SITE}/tr/nxtionstar/`,
  `${SITE}/tr/blog/`,
  `${SITE}/tr/rehber/`,
  `${SITE}/tr/rehber/led-ekran/`,
  `${SITE}/tr/rehber/gob-vs-smd/`,
  `${SITE}/tr/rehber/kiralik-mi-satin-alma/`,
  `${SITE}/tr/p2-5-led-ekran/`,
];

/** Must-have hubs for audit (subset of INDEXNOW_URLS). */
export const INDEXNOW_REQUIRED = [
  "/ai-shopping.json",
  "/entity.json",
  "/entity-profiles.json",
  "/catalog.json",
  "/.well-known/ard.json",
  "/.well-known/ai-catalog.json",
  "/llms.txt",
  "/feeds/merchant-priced-panels.tsv",
  "/tr/yapay-zeka/",
  "/tr/led-ekran-fiyatlari/",
  "/tr/products/huidu-kontrol-kartlari/",
  "/tr/products/esnek-led-ekran/",
  "/tr/products/kiralik-led-ekran/",
  "/tr/products/poster-led-ekran/",
  "/tr/hizmetler/",
  "/tr/sss/",
  "/tr/nxtionstar/",
  "/tr/blog/",
  "/tr/rehber/",
];
