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
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/feeds/merchant-priced-panels.tsv`,
  `https://${HOST}/tr/`,
  `https://${HOST}/en/`,
  `https://${HOST}/tr/yapay-zeka/`,
  `https://${HOST}/en/yapay-zeka/`,
  `https://${HOST}/tr/led-ekran-fiyatlari/`,
  `https://${HOST}/tr/led-ekran/`,
  `https://${HOST}/tr/led-ekran-satisi/`,
  `https://${HOST}/tr/products/`,
  `https://${HOST}/tr/hesaplayici/`,
  `https://${HOST}/en/hesaplayici/`,
  `https://${HOST}/tr/quote/`,
  `https://${HOST}/en/quote/`,
  `https://${HOST}/tr/nxtionstar/`,
  `https://${HOST}/tr/sss/`,
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
