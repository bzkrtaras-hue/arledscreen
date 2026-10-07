#!/usr/bin/env node
/**
 * Print / build copy-ready Point C paste packs from entity-profiles.json.
 * Owner friction reducer — no invented citations; cite packs only.
 *
 * Usage:
 *   npm run point-c
 *   npm run point-c:next
 *   npm run point-c:ack
 *   node scripts/print-point-c-packs.mjs [--en] [--pack=gbpDescription]
 *   node scripts/print-point-c-packs.mjs --next [--en]
 *   node scripts/print-point-c-packs.mjs --ack [--en] [--pack=directoryLong]
 *
 * Also imported by postbuild-ai.mjs to emit public/point-c.txt (+ point-c-en.txt).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const profilesPath = path.join(repoRoot, "public/entity-profiles.json");
const progressPath = path.join(repoRoot, "docs/geo/observations/point-c-progress.json");

/** Synthetic step after NAP packs — Hostinger support email clipboard. */
export const HOSTINGER_STEP = "hostinger301";

export const TR_ORDER = [
  ["NAP / directoryLong", "directoryLong"],
  ["GBP About", "gbpDescription"],
  ["Instagram Adı", "instagramName"],
  ["Instagram Bio", "instagramBio"],
  ["Facebook About", "facebookAbout"],
  ["LinkedIn About", "linkedinAbout"],
  ["Bing Places", "bingPlaces"],
  ["Apple Business Connect", "appleBusinessConnect"],
  ["YouTube About", "youtubeAbout"],
  ["Yandex Business", "yandexBusiness"],
];

export const EN_ORDER = [
  ["EN NAP / directoryLong", "directoryLong"],
  ["EN GBP About", "gbpDescription"],
  ["EN Instagram Name", "instagramName"],
  ["EN Instagram Bio", "instagramBio"],
  ["EN Facebook About", "facebookAbout"],
  ["EN LinkedIn About", "linkedinAbout"],
  ["EN Bing Places", "bingPlaces"],
  ["EN Apple Business Connect", "appleBusinessConnect"],
  ["EN YouTube About", "youtubeAbout"],
  ["EN Yandex Business", "yandexBusiness"],
];

export const HOSTINGER_SUPPORT_TO = "support@hostinger.com";

/** Live Gmail draft for Hostinger 301 (owner must Send). Refresh if draft is recreated. */
export const HOSTINGER_GMAIL_DRAFT_URL =
  "https://mail.google.com/mail/?authuser=bzkrtaras@gmail.com#all?compose=thread-f:1878419649952913826%2Bmsg-a:r-5878982215178809685";

export function buildHostingerEmailParts() {
  const subject = "Permanent 301 redirect arleds.com → https://arledscreen.com/tr/";
  const body = [
    "Hello Hostinger Support,",
    "",
    "Please set a permanent (301) redirect for the entire domain arleds.com",
    "(including www and both http/https) to:",
    "",
    "https://arledscreen.com/tr/",
    "",
    "Required mappings:",
    "http://arleds.com/ → https://arledscreen.com/tr/",
    "http://www.arleds.com/ → https://arledscreen.com/tr/",
    "https://arleds.com/ → https://arledscreen.com/tr/",
    "https://www.arleds.com/ → https://arledscreen.com/tr/",
    "",
    "Domain: arleds.com (Hostinger DNS; not on Cloudflare for this account).",
    "Thank you.",
  ].join("\n");
  return { to: HOSTINGER_SUPPORT_TO, subject, body };
}

export function buildHostingerEmailClipboard() {
  const { subject, body } = buildHostingerEmailParts();
  return `Subject: ${subject}\n\n${body}`;
}

/** Click-to-compose URI for the owner's mail client. */
export function buildHostingerMailto() {
  const { to, subject, body } = buildHostingerEmailParts();
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** RFC 5322 .eml body (no multipart) for import into Gmail/Outlook. */
export function buildHostingerEml() {
  const { to, subject, body } = buildHostingerEmailParts();
  const date = new Date().toUTCString();
  return [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Date: ${date}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
    "",
  ].join("\r\n");
}

/** Build plain-text Point C paste document (no markdown fences — easy select-all). */
export function buildPointCPackText(profiles, { en = false, only = "" } = {}) {
  const packs = en ? profiles.packsEn || {} : profiles.packs || {};
  const order = en ? EN_ORDER : TR_ORDER;
  const lines = [];
  lines.push("=== ARLEDSCREEN Point C paste packs ===");
  lines.push(`Locale: ${en ? "EN (packsEn)" : "TR (packs)"}`);
  lines.push("Rules: paste once; cite + NAP only; no catalog.json / quote-only jargon in public bios.");
  lines.push(
    "Verify: https://arledscreen.com/entity.json · https://arledscreen.com/entity-profiles.json · https://arledscreen.com/#website",
  );
  lines.push("Web must be arledscreen.com (not arleds.com). Postcode 34245.");
  lines.push(
    "Live: https://arledscreen.com/point-c.txt · https://arledscreen.com/point-c-en.txt · https://arledscreen.com/entity-profiles.json · https://arledscreen.com/#website",
  );
  lines.push(
    "Single next: npm run geo:next · Sequential: npm run point-c:next · after paste: npm run geo:ack (or point-c:ack)",
  );
  lines.push("");

  const checklist = profiles.ownerP0Checklist || [];
  if (checklist.length && !only) {
    lines.push("--- Owner P0 checklist ---");
    for (const item of checklist) lines.push(`- ${item}`);
    lines.push("");
  }

  for (const [label, key] of order) {
    if (only && key !== only) continue;
    const text = packs[key];
    lines.push(`### ${label} (${key})`);
    lines.push(text == null || text === "" ? "(missing)" : String(text));
    lines.push("");
  }

  if (!only) {
    lines.push("--- Hostinger arleds.com → arledscreen.com/tr/ 301 (owner clipboard) ---");
    lines.push("hPanel → Domains → arleds.com → Redirects → permanent 301 entire domain.");
    lines.push("From → To (all four):");
    lines.push("http://arleds.com/ → https://arledscreen.com/tr/");
    lines.push("http://www.arleds.com/ → https://arledscreen.com/tr/");
    lines.push("https://arleds.com/ → https://arledscreen.com/tr/");
    lines.push("https://www.arleds.com/ → https://arledscreen.com/tr/");
    lines.push("Verify: npm run verify:arleds-301 · docs/ops/arleds-301-hostinger.md");
    lines.push("Do NOT add arleds.com to sameAs until 301 is live.");
    lines.push("");
    lines.push("--- Hostinger support email (select-all) ---");
    lines.push(buildHostingerEmailClipboard());
    lines.push("");
    lines.push("--- Hostinger mailto (click / open in mail client) ---");
    lines.push(buildHostingerMailto());
    lines.push("EML: npm run point-c:hostinger-eml → docs/ops/arleds-301-hostinger.eml");
    lines.push(`Gmail draft (Send): ${HOSTINGER_GMAIL_DRAFT_URL}`);
    lines.push("");
    lines.push("--- Machine-only (do NOT paste into GBP/IG/FB bios) ---");
    if (en) {
      lines.push("Merchant readiness: packsEn.googleMerchantReadiness (or packs.googleMerchantReadiness)");
    } else {
      lines.push("Merchant readiness: packs.googleMerchantReadiness");
    }
    lines.push("Price source: https://arledscreen.com/ai-shopping.json pricedPanels");
    lines.push(
      "Inventable aliases: /.well-known/modules.json · /.well-known/sku.json · /.well-known/price.json · /.well-known/pricing.json · /prices.json",
    );
    lines.push(`prices.rss: ${profiles?.canonicalUrls?.pricesRss || "https://arledscreen.com/feeds/prices.rss"}`);
    lines.push("Playbook: docs/offsite-entity-playbook.md");
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function readProgress() {
  if (!fs.existsSync(progressPath)) return { acked: [], updatedAt: null };
  try {
    const raw = JSON.parse(fs.readFileSync(progressPath, "utf8"));
    return { acked: Array.isArray(raw.acked) ? raw.acked.map(String) : [], updatedAt: raw.updatedAt || null };
  } catch {
    return { acked: [], updatedAt: null };
  }
}

function writeProgress(acked) {
  fs.mkdirSync(path.dirname(progressPath), { recursive: true });
  const doc = { acked: [...new Set(acked)], updatedAt: new Date().toISOString() };
  fs.writeFileSync(progressPath, `${JSON.stringify(doc, null, 2)}\n`);
  return doc;
}

function sequenceKeys(en) {
  const order = en ? EN_ORDER : TR_ORDER;
  return [...order.map(([, k]) => k), HOSTINGER_STEP];
}

function nextStep(profiles, { en = false } = {}) {
  const packs = en ? profiles.packsEn || {} : profiles.packs || {};
  const { acked } = readProgress();
  const ackedSet = new Set(acked);
  for (const key of sequenceKeys(en)) {
    if (ackedSet.has(key)) continue;
    if (key === HOSTINGER_STEP) {
      return { key: HOSTINGER_STEP, label: "Hostinger 301 support email", text: buildHostingerEmailClipboard(), done: acked.length, total: sequenceKeys(en).length };
    }
    const label = (en ? EN_ORDER : TR_ORDER).find(([, k]) => k === key)?.[0] || key;
    const text = packs[key];
    if (text == null || text === "") continue;
    return { key, label, text: String(text), done: acked.length, total: sequenceKeys(en).length };
  }
  return null;
}

function printNext(profiles, { en = false } = {}) {
  const step = nextStep(profiles, { en });
  if (!step) {
    console.log("=== ARLEDSCREEN Point C next ===");
    console.log("All sequential pastes acked (packs + Hostinger email).");
    console.log("Verify: npm run verify:arleds-301 · npm run geo:status");
    console.log("Reset progress: delete docs/geo/observations/point-c-progress.json");
    return;
  }
  console.log("=== ARLEDSCREEN Point C next paste ===");
  console.log(`Step: ${step.key} · ${step.label}`);
  console.log(`Progress: ${step.done}/${step.total} acked → paste this block`);
  console.log("Locale:", en ? "EN" : "TR");
  console.log("");
  console.log("### Paste (select-all)");
  console.log("---");
  console.log(step.text);
  console.log("---");
  console.log("");
  if (step.key === HOSTINGER_STEP) {
    console.log("### mailto (open in mail client)");
    console.log(buildHostingerMailto());
    console.log("EML file: npm run point-c:hostinger-eml");
    console.log("");
  }
  console.log(`After paste: npm run point-c:ack -- --pack=${step.key}`);
  console.log("Or: npm run point-c:ack");
  console.log("Full packs: npm run point-c · Live: https://arledscreen.com/point-c.txt");
}

function writeHostingerEml() {
  const dest = path.join(repoRoot, "docs/ops/arleds-301-hostinger.eml");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buildHostingerEml());
  console.log(`Wrote ${dest}`);
  console.log(`mailto: ${buildHostingerMailto()}`);
  console.log("Open the .eml in Gmail/Outlook, or click the mailto URI.");
}

function ackStep(profiles, { en = false, pack = "" } = {}) {
  const step = nextStep(profiles, { en });
  const key = pack || step?.key;
  if (!key) {
    console.log("Nothing to ack — sequence complete.");
    return;
  }
  if (pack && step && pack !== step.key) {
    console.warn(`Warning: --pack=${pack} but next open step is ${step.key}; recording ${pack} anyway.`);
  }
  const { acked } = readProgress();
  if (!acked.includes(key)) acked.push(key);
  writeProgress(acked);
  console.log(`Acked: ${key}`);
  console.log("Next:");
  printNext(profiles, { en });
}

function argFlag(name) {
  return process.argv.includes(`--${name}`);
}
function argValue(name) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : "";
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  if (argFlag("help") || process.argv.includes("-h")) {
    console.log(`Usage:
  npm run point-c
  npm run point-c:next
  npm run point-c:ack [-- --pack=directoryLong]
  npm run geo:ack          (alias of point-c:ack)
  npm run point-c:hostinger-eml
  npm run geo:next         (priority owner clipboard)
Does not invent citations. --help never acks progress.`);
    process.exit(0);
  }
  if (!fs.existsSync(profilesPath)) {
    console.error("Missing public/entity-profiles.json");
    process.exit(1);
  }
  const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  const useEn = argFlag("en");
  const only = argValue("pack");
  if (argFlag("eml") || argFlag("hostinger-eml")) {
    writeHostingerEml();
  } else if (argFlag("next")) {
    printNext(profiles, { en: useEn });
  } else if (argFlag("ack")) {
    // Refuse accidental ack when extra unknown flags present (e.g. --help already handled).
    const unknown = process.argv.slice(2).filter(
      (a) =>
        a.startsWith("-") &&
        !["--ack", "--en", "--next", "--eml", "--hostinger-eml", "--help", "-h"].includes(a) &&
        !a.startsWith("--pack="),
    );
    if (unknown.length) {
      console.error(`Refusing ack with unknown flags: ${unknown.join(" ")}`);
      console.error("Use: npm run point-c:ack   or   npm run point-c:ack -- --pack=directoryLong");
      process.exit(1);
    }
    ackStep(profiles, { en: useEn, pack: only });
  } else {
    process.stdout.write(buildPointCPackText(profiles, { en: useEn, only }));
  }
}
