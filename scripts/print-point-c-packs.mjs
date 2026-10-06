#!/usr/bin/env node
/**
 * Print / validate Point C paste packs from public/entity-profiles.json (local) or LIVE URL.
 * Usage:
 *   node scripts/print-point-c-packs.mjs
 *   node scripts/print-point-c-packs.mjs --live
 *   node scripts/print-point-c-packs.mjs --check   (cite/URL dry-run; no paste)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const live = process.argv.includes("--live");
const checkOnly = process.argv.includes("--check");
const writeBundle = process.argv.includes("--write");
const ORDER = [
  "gbpDescription",
  "linkedinAbout",
  "instagramBio",
  "facebookAbout",
  "directoryShort",
  "directoryLong",
  "youtubeAbout",
  "appleBusinessConnect",
  "bingPlaces",
  "yandexBusiness",
  "wikidataReadiness",
  "crunchbaseDraft",
  "googleMerchantReadiness",
];

async function load() {
  if (live) {
    const res = await fetch("https://arledscreen.com/entity-profiles.json", {
      headers: { "user-agent": "ARLEDSCREEN-point-c-packs/1.0" },
    });
    if (!res.ok) throw new Error(`LIVE HTTP ${res.status}`);
    return res.json();
  }
  const p = path.join(root, "public/entity-profiles.json");
  if (!fs.existsSync(p)) throw new Error("missing public/entity-profiles.json — run npm run entity");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function validate(doc) {
  const errors = [];
  const packs = doc.packs || {};
  const entityPath = path.join(root, "public/entity.json");
  if (!fs.existsSync(entityPath) && !live) {
    errors.push("missing public/entity.json for cite check");
  }
  let citeMedium = "";
  let telephone = "";
  if (fs.existsSync(entityPath)) {
    const entity = JSON.parse(fs.readFileSync(entityPath, "utf8"));
    citeMedium = entity.citeMedium || "";
    telephone = String(entity.telephone || "");
  }

  for (const key of ORDER) {
    if (!packs[key] || String(packs[key]).length < 20) {
      errors.push(`packs.${key} missing/short`);
    }
  }
  if (citeMedium && packs.gbpDescription !== citeMedium) {
    errors.push("packs.gbpDescription must equal entity.citeMedium");
  }
  if (citeMedium && packs.facebookAbout !== citeMedium) {
    errors.push("packs.facebookAbout must equal entity.citeMedium");
  }
  const linkedin = String(packs.linkedinAbout || "");
  for (const needle of ["entity.json", "ai-shopping.json", "Gaziosmanpaşa", "NXTIONSTAR"]) {
    if (!linkedin.includes(needle)) {
      errors.push(`linkedinAbout missing ${needle}`);
    }
  }
  if (telephone && !linkedin.includes("530") && !linkedin.includes(telephone.replace("+", ""))) {
    errors.push("linkedinAbout missing telephone");
  }
  if (!doc.sameAsReadiness?.live || !Array.isArray(doc.sameAsReadiness.blockedUntil301)) {
    errors.push("sameAsReadiness.live / blockedUntil301 required");
  }
  if ((doc.sameAsReadiness?.blockedUntil301 || []).length !== 0) {
    errors.push("sameAsReadiness.blockedUntil301 must be empty (arleds.com is not our site)");
  }
  const readinessNotes = JSON.stringify(doc.sameAsReadiness?.notes || []);
  if (!/arleds\.com/i.test(readinessNotes) || !/bizim site değil|not our site|kanonik.*arledscreen/i.test(readinessNotes)) {
    errors.push("sameAsReadiness.notes must state arleds.com is not our site; canonical arledscreen.com");
  }
  if (!doc.canonicalUrls?.aiShoppingJson?.includes("/ai-shopping.json")) {
    errors.push("canonicalUrls.aiShoppingJson missing");
  }
  if (!doc.canonicalUrls?.entityJson?.includes("/entity.json")) {
    errors.push("canonicalUrls.entityJson missing");
  }
  // Day 67: Point C packs must carry kontrol/extrasUsd honesty (Owner paste → third-party corpus)
  const medium = String(citeMedium || packs.gbpDescription || "");
  if (!/quote-only/i.test(medium) || !/extrasUsd/i.test(medium) || !/Huidu/i.test(medium)) {
    errors.push("citeMedium/gbpDescription must include quote-only + extrasUsd + Huidu honesty");
  }
  const readiness = JSON.stringify(doc.sameAsReadiness || {});
  if (!/extrasUsd|quote-only|kontrol/i.test(readiness)) {
    errors.push("sameAsReadiness.notes must mention kontrol/extrasUsd quote-only honesty");
  }
  return errors;
}


async function writePasteBundle(doc) {
  const packs = doc.packs || {};
  const utc = new Date().toISOString().slice(0, 16).replace("T", " ");
  const order = [
    "gbpDescription",
    "linkedinAbout",
    "instagramBio",
    "facebookAbout",
    "directoryShort",
    "directoryLong",
    "youtubeAbout",
    "appleBusinessConnect",
    "bingPlaces",
    "yandexBusiness",
  ];
  let promptsN = "?";
  try {
    const ai = JSON.parse(fs.readFileSync(path.join(root, "public/ai-shopping.json"), "utf8"));
    promptsN = String((ai.blindTestPrompts || []).length);
  } catch {}
  const lines = [];
  lines.push("# Point C — canlı yapıştırma paketi (üretim)");
  lines.push("");
  lines.push("Kaynak: https://arledscreen.com/entity-profiles.json  ");
  lines.push(`Çekim (UTC): ${utc}  `);
  lines.push("Spam blog / 81-il / uydurma rating-fiyat yok. NAP birebir.  ");
  lines.push(`PR #55 ready · canlı prompts=${promptsN}. Merge paste için zorunlu değil.`);
  lines.push("");
  lines.push("**Sahip Drive Doc (kopyala-yapıştır):** https://docs.google.com/document/d/1JCU3RoL-ZJeOBHl73LRPrxRijDKD4FYdUscBKGOY1jc/edit");
  lines.push("");
  lines.push("## Sıra (P0)");
  lines.push("1. Google Business Profile ← `gbpDescription`");
  lines.push("2. LinkedIn Company About ← `linkedinAbout`");
  lines.push("3. Instagram bio ← `instagramBio`");
  lines.push("4. Facebook About ← `facebookAbout`");
  lines.push("5. Dizin short/long ← `directoryShort` / `directoryLong`");
  lines.push("6. Bing Places ← `bingPlaces` (NAP birebir)");
  lines.push("7. (İsteğe) YouTube / Apple / Yandex");
  lines.push("");
  lines.push("## Kanıt (paste sonrası — uydurma yok)");
  lines.push("Her kanal için ekran görüntüsü veya public URL kaydı (Drive Doc / PR yorumu):");
  lines.push("- [ ] GBP — About güncellendi");
  lines.push("- [ ] LinkedIn — Company About güncellendi");
  lines.push("- [ ] Instagram — bio güncellendi");
  lines.push("- [ ] Facebook — About güncellendi");
  lines.push("- [ ] Bing Places — NAP + web doğrulandı");
  lines.push("");
  lines.push("Skor: yapıştırma sonrası `docs/ai-shopping-blind-test-scores.md` Tur 1a (/60).");
  for (const key of order) {
    lines.push("");
    lines.push(`## ${key}`);
    lines.push("");
    lines.push("```");
    lines.push(String(packs[key] || "").trim());
    lines.push("```");
  }
  lines.push("");
  lines.push("## sameAsReadiness (özet)");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(doc.sameAsReadiness || {}, null, 2));
  lines.push("```");
  lines.push("");
  const out = path.join(root, "docs/point-c-paste-bundle.md");
  fs.writeFileSync(out, `${lines.join("\n")}\n`);
  console.log(`point-c-packs --write: wrote ${out}`);
}


const doc = await load();

if (checkOnly) {
  const errors = validate(doc);
  if (errors.length) {
    console.error(`point-c-packs --check: FAIL (${errors.length})`);
    for (const e of errors) console.error(" -", e);
    process.exit(1);
  }
  console.log(
    `point-c-packs --check: OK — packs=${ORDER.length} sameAsReadiness + ai-shopping cite (${live ? "LIVE" : "local"})`,
  );
  process.exit(0);
}

if (writeBundle) {
  const errors = validate(doc);
  if (errors.length) {
    console.error(`point-c-packs --write: FAIL check (${errors.length})`);
    for (const e of errors) console.error(" -", e);
    process.exit(1);
  }
  await writePasteBundle(doc);
  process.exit(0);
}

const packs = doc.packs || {};
console.log(`Point C packs (${live ? "LIVE" : "local"}) — ${doc.url || "entity-profiles.json"}`);
console.log("=".repeat(72));
for (const key of ORDER) {
  const text = packs[key];
  if (!text) {
    console.log(`\n## ${key}\n(missing)\n`);
    continue;
  }
  console.log(`\n## ${key}\n`);
  console.log(text);
  console.log("\n" + "-".repeat(72));
}
if (doc.sameAsReadiness) {
  console.log("\n## sameAsReadiness\n");
  console.log(JSON.stringify(doc.sameAsReadiness, null, 2));
}
