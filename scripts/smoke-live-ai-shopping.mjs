/**
 * Live / local AI alışveriş smoke (Gün 30 + Gün 56).
 *
 * Live (default): curl production endpoints; prints board; exit 0 always
 *   (live soft-404s are owner/deploy blockers until PR #55 merges).
 *
 * Local dry-run: validate the same mustInclude checks against out/ artefacts
 *   (pre-merge confidence — no network). Exit 1 on any fail.
 *
 * Usage:
 *   node scripts/smoke-live-ai-shopping.mjs
 *   node scripts/smoke-live-ai-shopping.mjs --local
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arledscreen.com";
const local = process.argv.includes("--local");
const outDir = path.join(root, "out");

/** Shared check table — live URLs + relative out/ paths for local mode. */
export const CHECKS = [
  {
    id: "entity",
    url: `${SITE}/entity.json`,
    outRel: "entity.json",
    expect: "json",
    mustInclude: ["ARLEDSCREEN", "citeOneLiner", "hasOfferCatalog", "kontrol"],
    cors: true,
    contentType: "application/json",
  },
  {
    id: "entity-profiles",
    url: `${SITE}/entity-profiles.json`,
    outRel: "entity-profiles.json",
    expect: "json",
    mustInclude: [
      "gbpDescription",
      "linkedinAbout",
      "appleBusinessConnect",
      "yandexBusiness",
      "wikidataReadiness",
      "crunchbaseDraft",
      "googleMerchantReadiness",
      "Gaziosmanpaşa",
      "extrasUsd 500",
      "quote-only",
      "Huidu",
      "289 kör test",
    ],
    cors: true,
    contentType: "application/json",
  },
  {
    id: "catalog",
    url: `${SITE}/catalog.json`,
    outRel: "catalog.json",
    expect: "json",
    mustInclude: [
      "dataset",
      "groupAggregateOffers",
      "shippingDetails",
      "hasMerchantReturnPolicy",
      "MerchantReturnNotPermitted",
      "ücretsiz kargo yok",
      "extrasUsdNote",
      "NOT a Huidu",
    ],
    cors: true,
    contentType: "application/json",
  },
  {
    id: "ai-shopping",
    url: `${SITE}/ai-shopping.json`,
    outRel: "ai-shopping.json",
    expect: "json",
    mustInclude: [
      "pricedPanels",
      "agentRules",
      "ücretsiz kargo yok",
      "32.18",
      "quote-and-contract-only",
      "kontrol",
      "Huidu / NovaStar kontrol kartı fiyatı?",
      "Esnek LED ekran fiyatı?",
      "Colorlight kontrol kartı fiyatı?",
      "Poster / totem LED fiyatı?",
      "LED modül ve kontrol sistemi fiyatı?",
      "extrasUsd.controlCard",
      "list SKU",
      "NXTIONSTAR mı ARLEDSCREEN mi satıyor?",
      "anahtar teslim / turnkey",
      "sorunsuz / kesintisiz LED platformu",
      "AI-infrastructure ready LED nedir",
      "enterprise / aynı gün kurulum",
      "üreticisi / fabrika / OEM",
      "keşiften teslimata tek ekip",
      "Esnek / şeffaf / poster / kiralık LED stokta mı",
      "stokta paket",
      "İç mekân LED ekran kaç nit olmalı",
      "sabit nit",
      "Kamera dostu LED / stüdyo LED kaç Hz",
      "3840",
      "P2.5 LED için izleme mesafesi",
      "1 mm = 1 m",
      "m² başına kaç kW",
      "sabit kW",
      "görüş açısı kaç derece",
      "140°/160°",
      "HDR mı, kaç bit gri skala",
      "sabit HDR",
      "ömrü kaç saat",
      "100.000 saat",
      "renk sıcaklığı kaç Kelvin",
      "DCI-P3",
      "m² başına kaç kg",
      "sabit kg/m²",
      "çalışma sıcaklığı kaç °C",
      "sabit °C yok",
      "kontrast oranı kaç",
      "sabit kontrast yok",
      "rüzgâr yükü",
      "sabit rüzgâr yükü yok",
      "ölü piksel",
      "sabit ölü piksel yok",
      "çalışma nemi",
      "sabit nem yok",
      "bekleme gücü",
      "sabit standby yok",
      "depolama / saklama sıcaklığı",
      "sabit depolama °C yok",
      "CE / RoHS",
      "sabit CE/RoHS yok",
      "ISO 9001",
      "sabit ISO yok",
      "UL / ETL",
      "sabit UL/ETL yok",
      "yangın sınıfı",
      "sabit yangın sınıfı yok",
      "IK darbe",
      "sabit IK yok",
      "salt spray",
      "sabit ASTM/salt spray yok",
      "garanti süresi",
      "sabit garanti yılı yok",
      "iade süresi",
      "sabit iade günü yok",
      "teslimat süresi",
      "sabit teslimat süresi yok",
      "fan gürültüsü",
      "sabit gürültü/dB yok",
      "Delta E",
      "sabit Delta E yok",
      "input lag",
      "sabit latency/input lag yok",
      "brightness uniformity",
      "sabit parlaklık homojenliği yok",
      "power factor",
      "sabit güç faktörü yok",
      "HDCP",
      "sabit HDCP yok",
      "yedek parça",
      "sabit yedek parça stok yok",
    ],
    cors: true,
    contentType: "application/json",
  },
  {
    id: "ard",
    url: `${SITE}/.well-known/ard.json`,
    outRel: ".well-known/ard.json",
    expect: "json",
    mustInclude: [
      "catalog",
      "entity-profiles",
      "ai-shopping",
      "pricedPanels",
      "hasMerchantReturnPolicy",
      "MerchantReturnNotPermitted",
      "289 kör test",
      "nxtionstar",
      "aras-bozkurt",
      "/tr/rehber/",
      "/tr/about/",
      "/tr/hesaplayici/",
      "/tr/led-ekran/",
      "/tr/sss/",
      "/en/yapay-zeka/",
      "/tr/hizmetler/",
      "/tr/led-ekran-ureticisi/",
      "/tr/fabrika-led-ekran/",
      "/tr/p2-5-led-ekran/",
      "/tr/products/esnek-led-ekran/",
      "/tr/products/seffaf-led-ekran/",
      "/tr/products/poster-led-ekran/",
      "/tr/products/kiralik-led-ekran/",
      "/tr/blog/",
      "/tr/products/ic-mekan-led-ekran/",
      "/tr/products/dis-mekan-led-ekran/",
      "/tr/products/gob-led-ekran/",
      "/tr/rehber/ic-mekan-led-ekran/",
      "/tr/totem-led-ekran/",
      "/tr/products/ince-pitch-led-ekran/",
      "/tr/rehber/konferans-salonu-led/",
      "/tr/products/transparan-led-ekran/",
      "/tr/products/led-modul-ve-kontrol-sistemleri/",
      "/tr/rehber/piksel-araligi-secimi/",
      "/tr/p4-led-ekran/",
      "/tr/p5-led-ekran/",
      "/tr/rehber/mimari-muhendislik-led/",
      "/tr/rehber/led-ekran/",
      "/tr/rehber/poster-led-ekran/",
      "/tr/rehber/gob-vs-smd/",
      "/tr/rehber/led-tabela-mi-led-ekran-mi/",
      "/tr/p1-25-led-ekran/",
      "/tr/p3-07-led-ekran/",
      "/tr/p1-86-led-ekran/",
      "/tr/rehber/kiralik-mi-satin-alma/",
      "/tr/p2-9-led-ekran/",
      "/tr/cephe-led-ekran/",
      "/tr/billboard-led-ekran/",
      "/tr/magaza-led-ekran/",
      "/tr/sahne-led-ekran/",
      "/tr/vitrin-led-ekran/",
      "/tr/otel-led-ekran/",
      "/tr/avm-led-ekran/",
      "/tr/fuar-led-ekran/",
      "/tr/stadyum-led-ekran/",
      "/tr/belediye-led-ekran/",
      "/tr/restoran-led-ekran/",
      "/tr/dugun-salonu-led-ekran/",
      "/tr/konferans-salonu-led-ekran/",
      "/tr/spor-salonu-led-ekran/",
      "/en/rehber/dis-mekan-led-ekran/",
      "/en/quote/",
      "/en/about/",
      "/en/rehber/ic-mekan-led-ekran/",
      "/en/rehber/led-ekran/",
      "/en/hesaplayici/",
      "/en/rehber/",
      "/en/",
      "/tr/",
      "/ar/",
      "/ru/",
      "/ar/about/",
      "/ru/about/",
      "/ar/quote/",
      "/ru/quote/",
      "/en/rehber/mimari-muhendislik-led/",
      "/en/products/",
      "/ar/hesaplayici/",
      "/ru/hesaplayici/",
      "/ar/yapay-zeka/",
      "/ru/yapay-zeka/",
      "/en/rehber/konferans-salonu-led/",
      "/en/rehber/vitrin-led-ekran/",
      "/en/rehber/poster-led-ekran/",
      "/en/rehber/kiosk-dijital-ekran/",
      "/tr/rehber/led-ekran-fiyatlari/",
      "/ar/rehber/",
      "/ru/rehber/",
      "/ar/rehber/led-ekran/",
      "/ru/rehber/led-ekran/",
      "/ar/rehber/ic-mekan-led-ekran/",
      "/ru/rehber/ic-mekan-led-ekran/",
      "/ar/rehber/dis-mekan-led-ekran/",
      "/ru/rehber/dis-mekan-led-ekran/",
      "/ar/rehber/mimari-muhendislik-led/",
      "/ar/rehber/konferans-salonu-led/",
      "/ru/rehber/konferans-salonu-led/",
      "/ru/rehber/mimari-muhendislik-led/",
      "/ar/rehber/vitrin-led-ekran/",
      "/ru/rehber/vitrin-led-ekran/",
      "/ar/rehber/poster-led-ekran/",
      "/ar/rehber/kiosk-dijital-ekran/",
      "/ru/rehber/kiosk-dijital-ekran/",
      "/ru/rehber/poster-led-ekran/",
      "/ar/products/",
      "/ru/products/",
      "/tr/products/ic-mekan-led-ekran/p2-5/",
      "/tr/products/ic-mekan-led-ekran/p3-07/",
      "/tr/products/ic-mekan-led-ekran/p4/",
      "/tr/products/dis-mekan-led-ekran/p2-5/",
      "/tr/products/dis-mekan-led-ekran/p2-9/",
      "/tr/products/dis-mekan-led-ekran/p3-07/",
      "/tr/products/dis-mekan-led-ekran/p4/",
      "/tr/products/dis-mekan-led-ekran/p4-on-servis/",
      "/tr/products/dis-mekan-led-ekran/p5/",
      "/tr/products/dis-mekan-led-ekran/p8/",
    ],
    cors: true,
    contentType: "application/json",
  },
  {
    id: "llms",
    url: `${SITE}/llms.txt`,
    outRel: "llms.txt",
    expect: "text",
    mustInclude: [
      "citeOneLiner",
      "Gaziosmanpaşa",
      "entity-profiles.json",
      "pricedPanels",
      "ücretsiz kargo yok",
      "hasMerchantReturnPolicy",
      "MerchantReturnNotPermitted",
      "Huidu",
      "kontrol",
    ],
    cors: true,
    contentType: "text/plain",
  },
  {
    id: "llms-full",
    url: `${SITE}/llms-full.txt`,
    outRel: "llms-full.txt",
    expect: "text",
    mustInclude: [
      "catalog.json",
      "entity.json",
      "entity-profiles.json",
      "pricedPanels",
      "ücretsiz kargo yok",
      "hasMerchantReturnPolicy",
      "MerchantReturnNotPermitted",
      "huidu-kontrol-kartlari",
      "kontrol",
      "ARLEDSCREEN ürün markası",
    ],
    cors: true,
    contentType: "text/plain",
  },
  {
    id: "robots",
    url: `${SITE}/robots.txt`,
    outRel: "robots.txt",
    expect: "text",
    mustInclude: ["Host: arledscreen.com", "bingbot", "YandexBot", "DuckDuckBot"],
  },
  {
    id: "merchant-feed",
    url: `${SITE}/feeds/merchant-priced-panels.tsv`,
    outRel: "feeds/merchant-priced-panels.tsv",
    expect: "text",
    mustInclude: ["p2-5-ic", "32.18 USD", "ücretsiz kargo yok", "return_policy_label", "quote_contract_only"],
    cors: true,
    contentType: "text/tab-separated-values",
  },
  {
    id: "fiyat",
    url: `${SITE}/tr/led-ekran-fiyatlari/`,
    outRel: "tr/led-ekran-fiyatlari/index.html",
    expect: "html",
    mustInclude: ["catalog.json"],
  },
  {
    id: "yapay-zeka",
    url: `${SITE}/tr/yapay-zeka/`,
    outRel: "tr/yapay-zeka/index.html",
    expect: "html",
    mustInclude: [
      "entity.json",
      "catalog.json",
      "ai-shopping.json",
      "priceValidUntil",
      "ücretsiz kargo yok",
      "Gaziosmanpaşa",
    ],
  },
  {
    id: "yapay-zeka-en",
    url: `${SITE}/en/yapay-zeka/`,
    outRel: "en/yapay-zeka/index.html",
    expect: "html",
    mustInclude: ["ai-shopping.json", "catalog.json", "Gaziosmanpaşa"],
  },
  {
    id: "about",
    url: `${SITE}/tr/about/`,
    outRel: "tr/about/index.html",
    expect: "html",
    mustInclude: ["entity.json", "catalog.json", "ai-shopping.json"],
  },
  {
    id: "home",
    url: `${SITE}/tr/`,
    outRel: "tr/index.html",
    expect: "html",
    mustInclude: [
      "Gaziosmanpaşa",
      "81 il kapısı yok",
      "quote-only",
      "ai-shopping.json",
      "yazılı teklif",
    ],
  },
  {
    id: "sitemap",
    url: `${SITE}/sitemap.xml`,
    outRel: "sitemap.xml",
    expect: "xml",
    mustInclude: ["led-ekran-fiyatlari", "catalog.json"],
  },
  {
    id: "indexnow-key",
    url: `${SITE}/e8e6f86598e94e95a323f807c39843ad.txt`,
    outRel: "e8e6f86598e94e95a323f807c39843ad.txt",
    expect: "text",
    mustInclude: ["e8e6f86598e94e95a323f807c39843ad"],
  },
  {
    id: "fiyat-hesap",
    url: `${SITE}/fiyat-hesap/`,
    outRel: "fiyat-hesap/index.html",
    expect: "html",
    mustInclude: ["list SKU", "Huidu", "Kontrol kartı"],
  },
  {
    id: "rehber-hub",
    url: `${SITE}/tr/rehber/`,
    outRel: "tr/rehber/index.html",
    expect: "html",
    mustInclude: ["catalog.json", "ai-shopping.json", "Gaziosmanpaşa"],
  },
  {
    id: "nxtionstar",
    url: `${SITE}/tr/nxtionstar/`,
    outRel: "tr/nxtionstar/index.html",
    expect: "html",
    mustInclude: [
      "ARLEDSCREEN ürün markası",
      "Gaziosmanpaşa",
      "entity.json",
      "NEXTSTAR",
      "NationStar",
    ],
  },
  {
    id: "founder",
    url: `${SITE}/tr/about/aras-bozkurt/`,
    outRel: "tr/about/aras-bozkurt/index.html",
    expect: "html",
    mustInclude: ["Gaziosmanpaşa", "entity.json", "ai-shopping.json"],
  },
];

function checkLocal(c) {
  const started = Date.now();
  const file = path.join(outDir, c.outRel);
  if (!fs.existsSync(file)) {
    return {
      id: c.id,
      url: `out/${c.outRel}`,
      status: "MISSING",
      ms: Date.now() - started,
      missing: [],
      headerGaps: [],
      http: 0,
    };
  }
  const text = fs.readFileSync(file, "utf8");
  const missing = (c.mustInclude || []).filter((n) => !text.includes(n));
  return {
    id: c.id,
    url: `out/${c.outRel}`,
    status: missing.length ? "CONTENT" : "PASS",
    ms: Date.now() - started,
    missing,
    headerGaps: [],
    http: 200,
  };
}

async function checkLive(c) {
  const started = Date.now();
  try {
    const res = await fetch(c.url, {
      redirect: "follow",
      headers: { "user-agent": "ARLEDSCREEN-live-smoke/1.0" },
    });
    const text = await res.text();
    const ms = Date.now() - started;
    const ctype = res.headers.get("content-type") || "";
    const acao = res.headers.get("access-control-allow-origin") || "";
    const looksHtmlSoft404 =
      res.status === 200 &&
      /text\/html/i.test(ctype) &&
      c.expect !== "html" &&
      /<!DOCTYPE html|<html/i.test(text.slice(0, 200));
    const missing = (c.mustInclude || []).filter((n) => !text.includes(n));
    const headerGaps = [];
    if (c.cors && res.status === 200 && !looksHtmlSoft404 && acao !== "*") {
      headerGaps.push("CORS:*");
    }
    if (
      c.contentType &&
      res.status === 200 &&
      !looksHtmlSoft404 &&
      !ctype.toLowerCase().includes(c.contentType.toLowerCase())
    ) {
      headerGaps.push(`ctype:${c.contentType}`);
    }
    let status = "PASS";
    if (res.status !== 200) status = `HTTP_${res.status}`;
    else if (looksHtmlSoft404) status = "SOFT_404";
    else if (missing.length) status = "CONTENT";
    else if (headerGaps.length) status = "HEADERS";
    return {
      id: c.id,
      url: c.url,
      status,
      ms,
      missing,
      headerGaps,
      http: res.status,
    };
  } catch (e) {
    return {
      id: c.id,
      url: c.url,
      status: "ERROR",
      ms: Date.now() - started,
      missing: [],
      headerGaps: [],
      error: String(e.message || e),
    };
  }
}

async function main() {
  if (local && !fs.existsSync(outDir)) {
    console.error("smoke --local: missing out/ — run npm run build first");
    process.exit(1);
  }

  const results = [];
  for (const c of CHECKS) {
    results.push(local ? checkLocal(c) : await checkLive(c));
  }

  const pass = results.filter((r) => r.status === "PASS").length;
  const fail = results.length - pass;

  console.log("");
  console.log(
    local
      ? "Local AI alışveriş smoke — out/ artefacts (pre-merge)"
      : "Live AI alışveriş smoke — arledscreen.com",
  );
  console.log("=".repeat(78));
  console.log(`${"id".padEnd(14)} ${"status".padEnd(10)} ${"ms".padEnd(6)} url`);
  console.log("-".repeat(78));
  for (const r of results) {
    const parts = [];
    if (r.missing?.length) parts.push(`missing=[${r.missing.join(",")}]`);
    if (r.headerGaps?.length) parts.push(`headers=[${r.headerGaps.join(",")}]`);
    if (r.error) parts.push(r.error);
    const note = parts.length ? ` ${parts.join(" ")}` : "";
    console.log(
      `${r.id.padEnd(14)} ${r.status.padEnd(10)} ${String(r.ms).padEnd(6)} ${r.url}${note}`,
    );
  }
  console.log("-".repeat(78));
  console.log(`TOTAL ${results.length} · PASS ${pass} · BLOCKED ${fail}`);
  if (local) {
    console.log(
      fail
        ? "Local smoke FAIL — fix out/ artefacts before merge/deploy"
        : "Local smoke GREEN — artefacts satisfy mustInclude (safe to CF deploy)",
    );
    console.log("");
    process.exit(fail ? 1 : 0);
  }
  console.log(
    fail
      ? "Owner: merge PR #55 + Cloudflare Pages redeploy, then re-run npm run smoke:live"
      : "Live surface GREEN — proceed Point C + blind-test tur",
  );
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
