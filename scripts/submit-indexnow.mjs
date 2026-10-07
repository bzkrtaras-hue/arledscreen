#!/usr/bin/env node
/**
 * IndexNow ping for GEO / AI discovery surfaces (Bing + participating engines).
 * Key file: public/<key>.txt (must be live at https://arledscreen.com/<key>.txt).
 * Does not invent rankings — only requests crawl of published URLs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");
const HOST = "arledscreen.com";
const KEY = "e8e6f86598e94e95a323f807c39843ad";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/geo-baseline.json`,
  `https://${HOST}/ai-shopping.json`,
  `https://${HOST}/catalog.json`,
  `https://${HOST}/entity.json`,
  `https://${HOST}/entity-profiles.json`,
  `https://${HOST}/.well-known/ard.json`,
  `https://${HOST}/.well-known/llms.txt`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/ai.txt`,
  `https://${HOST}/feeds/merchant-priced-panels.tsv`,
  `https://${HOST}/catalog`,
  `https://${HOST}/ai-shopping`,
  `https://${HOST}/entity`,
  `https://${HOST}/geo-baseline`,
  `https://${HOST}/llms`,
  `https://${HOST}/pricing.json`,
  `https://${HOST}/products.json`,
  `https://${HOST}/en/ai-shopping.json`,
  `https://${HOST}/en/catalog.json`,
  `https://${HOST}/en/entity.json`,
  `https://${HOST}/en/geo-baseline.json`,
  `https://${HOST}/en/llms.txt`,
  `https://${HOST}/tr/`,
  `https://${HOST}/en/`,
  `https://${HOST}/tr/yapay-zeka/`,
  `https://${HOST}/en/yapay-zeka/`,
  `https://${HOST}/tr/led-ekran-fiyatlari/`,
  `https://${HOST}/en/led-ekran-fiyatlari/`,
  `https://${HOST}/tr/led-ekran/`,
  `https://${HOST}/en/led-ekran/`,
  `https://${HOST}/tr/led-ekran-satisi/`,
  `https://${HOST}/en/led-ekran-satisi/`,
  `https://${HOST}/en/led-ekran-ureticisi/`,
  `https://${HOST}/en/led-ekran-montaj/`,
  `https://${HOST}/en/led-ekran-kiralama/`,
  `https://${HOST}/en/led-ekran-servis/`,
  `https://${HOST}/en/hizmetler/`,
  `https://${HOST}/en/bolgeler/`,
  `https://${HOST}/en/projelerimiz/`,
  `https://${HOST}/en/galeri/`,
  `https://${HOST}/en/blog/`,
  `https://${HOST}/tr/gizlilik/`,
  `https://${HOST}/en/gizlilik/`,
  `https://${HOST}/en/privacy/`,
  `https://${HOST}/en/calculator/`,
  `https://${HOST}/en/faq/`,
  `https://${HOST}/en/gallery/`,
  `https://${HOST}/en/projects/`,
  `https://${HOST}/en/regions/`,
  `https://${HOST}/en/services/`,
  `https://${HOST}/en/brand/`,
  `https://${HOST}/en/teklif/`,
  `https://${HOST}/en/urunler/`,
  `https://${HOST}/en/catalog/`,
  `https://${HOST}/en/shop/`,
  `https://${HOST}/en/modules/`,
  `https://${HOST}/en/indoor-led/`,
  `https://${HOST}/en/outdoor-led/`,
  `https://${HOST}/en/gob/`,
  `https://${HOST}/en/fine-pitch/`,
  `https://${HOST}/en/request-quote/`,
  `https://${HOST}/en/price-list/`,
  `https://${HOST}/en/products/gob/`,
  `https://${HOST}/en/products/indoor/`,
  `https://${HOST}/en/products/outdoor/`,
  `https://${HOST}/en/products/gob-led-ekran/p1-25-gob/`,
  `https://${HOST}/en/kvkk/`,
  `https://${HOST}/en/bolgeler/istanbul/`,
  `https://${HOST}/en/about/aras-bozkurt/`,
  `https://${HOST}/en/contact/`,
  `https://${HOST}/en/iletisim/`,
  `https://${HOST}/en/rehber/ince-pitch-led-ekran/`,
  `https://${HOST}/en/rehber/gob-led-ekran/`,
  `https://${HOST}/en/magaza-led-ekran/`,
  `https://${HOST}/en/cephe-led-ekran/`,
  `https://${HOST}/en/avm-led-ekran/`,
  `https://${HOST}/en/otel-led-ekran/`,
  `https://${HOST}/en/sahne-led-ekran/`,
  `https://${HOST}/en/belediye-led-ekran/`,
  `https://${HOST}/en/vitrin-led-ekran/`,
  `https://${HOST}/en/restoran-led-ekran/`,
  `https://${HOST}/en/fuar-led-ekran/`,
  `https://${HOST}/en/stadyum-led-ekran/`,
  `https://${HOST}/en/totem-led-ekran/`,
  `https://${HOST}/en/p1-25-led-ekran/`,
  `https://${HOST}/en/p1-86-led-ekran/`,
  `https://${HOST}/en/p2-5-led-ekran/`,
  `https://${HOST}/en/p2-9-led-ekran/`,
  `https://${HOST}/en/p3-07-led-ekran/`,
  `https://${HOST}/en/p4-led-ekran/`,
  `https://${HOST}/en/p5-led-ekran/`,
  `https://${HOST}/tr/products/`,
  `https://${HOST}/en/products/`,
  `https://${HOST}/en/products/gob-led-ekran/`,
  `https://${HOST}/en/products/ic-mekan-led-ekran/`,
  `https://${HOST}/en/products/dis-mekan-led-ekran/`,
  `https://${HOST}/en/products/kiralik-led-ekran/`,
  `https://${HOST}/en/products/esnek-led-ekran/`,
  `https://${HOST}/en/products/seffaf-led-ekran/`,
  `https://${HOST}/en/products/transparan-led-ekran/`,
  `https://${HOST}/en/products/poster-led-ekran/`,
  `https://${HOST}/en/products/ince-pitch-led-ekran/`,
  `https://${HOST}/en/products/led-modul-ve-kontrol-sistemleri/`,
  `https://${HOST}/tr/hesaplayici/`,
  `https://${HOST}/en/hesaplayici/`,
  `https://${HOST}/tr/quote/`,
  `https://${HOST}/en/quote/`,
  `https://${HOST}/tr/nxtionstar/`,
  `https://${HOST}/en/nxtionstar/`,
  `https://${HOST}/tr/sss/`,
  `https://${HOST}/en/sss/`,
  `https://${HOST}/en/rehber/piksel-araligi-secimi/`,
  `https://${HOST}/en/rehber/gob-vs-smd/`,
  `https://${HOST}/en/rehber/kiralik-mi-satin-alma/`,
  `https://${HOST}/en/rehber/led-tabela-mi-led-ekran-mi/`,
  `https://${HOST}/tr/about/`,
  `https://${HOST}/en/about/`,
  `https://${HOST}/tr/about/aras-bozkurt/`,
  `https://${HOST}/tr/products/gob-led-ekran/p1-25-gob/`,
  `https://${HOST}/sitemap.xml`,
];

async function main() {
  const keyPath = path.join(publicDir, `${KEY}.txt`);
  if (!fs.existsSync(keyPath)) {
    console.error(`IndexNow key file missing: ${keyPath}`);
    process.exit(1);
  }
  const keyBody = fs.readFileSync(keyPath, "utf8").trim();
  if (keyBody !== KEY) {
    console.error(`IndexNow key file content mismatch (got ${keyBody})`);
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  let ok = 0;
  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const text = await res.text().catch(() => "");
    console.log(`${endpoint} → HTTP ${res.status} ${text.slice(0, 120)}`);
    // IndexNow: 200/202 accepted
    if (res.status === 200 || res.status === 202) ok += 1;
  }

  if (!ok) {
    console.error("IndexNow: no endpoint accepted the payload");
    process.exit(1);
  }
  console.log(`IndexNow: submitted ${URLS.length} URLs (${ok}/${endpoints.length} endpoints accepted)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
