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
import { applyOwnerGateCrossJoin } from "./owner-gate-cross-join.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const profilesPath = path.join(repoRoot, "public/entity-profiles.json");
const progressPath = path.join(repoRoot, "docs/geo/observations/point-c-progress.json");

/**
 * Synthetic step after NAP packs — arleds.com 301 clipboard.
 * Key kept as hostinger301 for progress ack compatibility; text is dual-path
 * (DNSEnable Domain Redirect first; Hostinger only if NS is Hostinger).
 */
export const HOSTINGER_STEP = "hostinger301";

const ARLEDS_TARGET = "https://arledscreen.com/tr/";

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
export const DNSENABLE_SUPPORT_TO = "destek@isimtescil.net";

/** Live Gmail draft for Hostinger 301 (owner must Send). Refresh if draft is recreated. */
export const HOSTINGER_GMAIL_DRAFT_URL =
  "https://mail.google.com/mail/?authuser=bzkrtaras@gmail.com#all?compose=thread-f:1878419649952913826%2Bmsg-a:r-5878982215178809685";

/** Live Gmail draft for Isimtescil/DNSEnable 301 (owner must Send). Refresh if draft is recreated. */
export const DNSENABLE_GMAIL_DRAFT_URL =
  "https://mail.google.com/mail/?authuser=bzkrtaras@gmail.com#all?compose=thread-f:1878479803134731083%2Bmsg-a:r6666223908344510229";

/** Where to paste each Point C pack (owner friction — pack text is already ready). */
export const POINT_C_PASTE_WHERE = {
  directoryLong: "Directories / Bing Places / Apple Business Connect → About / description",
  gbpDescription: "Google Business Profile → Edit profile → About",
  instagramName: "https://www.instagram.com/arledscreen → Edit profile → Name",
  instagramBio: "https://www.instagram.com/arledscreen → Edit profile → Bio",
  facebookAbout: "https://www.facebook.com/arledscreenn → About / Page info",
  linkedinAbout: "https://www.linkedin.com/company/arleds → About",
  bingPlaces: "Bing Places for Business → Business description",
  appleBusinessConnect: "Apple Business Connect → Location → Description",
  youtubeAbout: "YouTube Studio → Customize channel → Basic info / Description",
  yandexBusiness: "Yandex Business → Organization → Description",
  [HOSTINGER_STEP]: "Isimtescil/DNSEnable Domain Redirect first (live NS) · Hostinger only if verify mode=hostinger_*",
};

/** Isimtescil / DNSEnable customer panel (Domain Redirect when NS is dnsenable.com). */
export const DNSENABLE_PANEL_URL = "https://www.isimtescil.net/";

/**
 * Owner open URLs for point-c:next / geo:next — remove “which tab?” friction.
 * One primary destination per pack (no invented citations).
 */
export const POINT_C_OPEN_URLS = {
  directoryLong: "https://www.bingplaces.com/",
  gbpDescription: "https://business.google.com/",
  instagramName: "https://www.instagram.com/arledscreen/",
  instagramBio: "https://www.instagram.com/arledscreen/",
  facebookAbout: "https://www.facebook.com/arledscreenn",
  linkedinAbout: "https://www.linkedin.com/company/arleds/",
  bingPlaces: "https://www.bingplaces.com/",
  appleBusinessConnect: "https://businessconnect.apple.com/",
  youtubeAbout: "https://studio.youtube.com/",
  yandexBusiness: "https://business.yandex.com/",
  // Primary = registrar panel (Domain Redirect); Gmail draft is OpenAlt.
  [HOSTINGER_STEP]: DNSENABLE_PANEL_URL,
};

/**
 * Secondary open tabs when Where: names more than one destination
 * (e.g. directoryLong Bing+Apple; arleds 301 panel + Gmail draft).
 */
export const POINT_C_OPEN_ALTS = {
  directoryLong: "https://businessconnect.apple.com/",
  [HOSTINGER_STEP]: DNSENABLE_GMAIL_DRAFT_URL,
};

export function pointCOpenUrl(packKey) {
  return POINT_C_OPEN_URLS[packKey] || "";
}

export function pointCOpenAltUrl(packKey) {
  return POINT_C_OPEN_ALTS[packKey] || "";
}

/** Live DNSEnable / Isimtescil Domain Redirect clipboard (primary when NS is dnsenable.com). */
export function buildDnsEnableRedirectClipboard() {
  return [
    "Isimtescil / DNSEnable → Domain Redirect (permanent 301)",
    `Open: ${DNSENABLE_PANEL_URL}`,
    `OpenAlt (Gmail draft Send): ${DNSENABLE_GMAIL_DRAFT_URL}`,
    `arleds.com + www.arleds.com → ${ARLEDS_TARGET}`,
    "Live NS often eu/tr/us.dnsenable.com — Hostinger hPanel will NOT apply until NS moves.",
    "Option B: move NS to Cloudflare → Bulk Redirect → https://arledscreen.com/tr/ (301)",
    "Verify: npm run verify:arleds-301 · docs/ops/arleds-301-hostinger.md",
    "Do NOT add arleds.com to sameAs until 301 is live.",
  ].join("\n");
}

export function buildDnsEnableEmailParts() {
  // Host-style mappings (no https://) so Gmail link-wrappers do not mangle the Send body.
  const subject = "Kalıcı 301 yönlendirme arleds.com → arledscreen.com/tr/";
  const body = [
    "Merhaba İsimtescil Destek,",
    "",
    "arleds.com alan adımız için kalıcı (301) Domain Redirect / URL yönlendirme talebi.",
    "",
    "Hedef (kalıcı 301): arledscreen.com/tr/  (scheme: https)",
    "",
    "Lütfen şu eşlemeleri uygulayın — http ve https, apex ve www için aynı hedef:",
    "  arleds.com/          →  arledscreen.com/tr/",
    "  www.arleds.com/      →  arledscreen.com/tr/",
    "",
    "DNS: eu/tr/us.dnsenable.com (canlı NS). Hostinger hPanel bu domain için geçerli değil.",
    "Telefon: +90 850 200 0 444 · Domain: arleds.com",
    "İletişim: arled@arledscreen.com",
    "Teşekkürler.",
    "Aras Bozkurt / ARLEDSCREEN",
  ].join("\n");
  return { to: DNSENABLE_SUPPORT_TO, subject, body };
}

export function buildDnsEnableEmailClipboard() {
  const { subject, body } = buildDnsEnableEmailParts();
  return `Subject: ${subject}\n\n${body}`;
}

export function buildDnsEnableMailto() {
  const { to, subject, body } = buildDnsEnableEmailParts();
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildDnsEnableEml() {
  const { to, subject, body } = buildDnsEnableEmailParts();
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

/** Dual-path arleds 301 paste for geo:next / hostinger301 step. */
export function buildArleds301DualPathClipboard() {
  return [
    "=== arleds.com → arledscreen.com/tr/ 301 (provider-correct) ===",
    "",
    "--- A) DNSEnable / Isimtescil (current live NS — do this first) ---",
    buildDnsEnableRedirectClipboard(),
    "",
    "--- DNSEnable support email (select-all) ---",
    buildDnsEnableEmailClipboard(),
    "",
    `mailto: ${buildDnsEnableMailto()}`,
    `Gmail draft (Send): ${DNSENABLE_GMAIL_DRAFT_URL}`,
    "EML: npm run point-c:dnsenable-eml → docs/ops/arleds-301-dnsenable.eml",
    "",
    "--- B) Hostinger (ONLY if verify mode is hostinger_* / NS is Hostinger) ---",
    "hPanel → Domains → arleds.com → Redirects → permanent 301 entire domain.",
    "From → To (all four):",
    `http://arleds.com/ → ${ARLEDS_TARGET}`,
    `http://www.arleds.com/ → ${ARLEDS_TARGET}`,
    `https://arleds.com/ → ${ARLEDS_TARGET}`,
    `https://www.arleds.com/ → ${ARLEDS_TARGET}`,
    "",
    buildHostingerEmailClipboard(),
    "",
    `mailto: ${buildHostingerMailto()}`,
    `Gmail draft (Send): ${HOSTINGER_GMAIL_DRAFT_URL}`,
    "EML: npm run point-c:hostinger-eml → docs/ops/arleds-301-hostinger.eml",
    "Re-check: npm run verify:arleds-301 · npm run geo:status",
  ].join("\n");
}

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
    "Domain: arleds.com — use this email ONLY if NS is Hostinger.",
    "If NS is dnsenable.com (Isimtescil), use registrar Domain Redirect instead.",
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
    const where = POINT_C_PASTE_WHERE[key];
    const open = pointCOpenUrl(key);
    const openAlt = pointCOpenAltUrl(key);
    if (where) lines.push(`Where: ${where}`);
    if (open) lines.push(`Open: ${open}`);
    if (openAlt) lines.push(`OpenAlt: ${openAlt}`);
    lines.push(text == null || text === "" ? "(missing)" : String(text));
    lines.push("");
  }

  if (!only) {
    lines.push("--- DNSEnable / Isimtescil arleds.com → arledscreen.com/tr/ 301 (primary — live NS) ---");
    lines.push(`Where: ${POINT_C_PASTE_WHERE[HOSTINGER_STEP]}`);
    lines.push(`Open: ${pointCOpenUrl(HOSTINGER_STEP)}`);
    lines.push(`OpenAlt: ${pointCOpenAltUrl(HOSTINGER_STEP)}`);
    for (const row of buildDnsEnableRedirectClipboard().split("\n")) lines.push(row);
    lines.push("");
    lines.push("--- DNSEnable support email (select-all) ---");
    lines.push(buildDnsEnableEmailClipboard());
    lines.push("");
    lines.push("--- DNSEnable mailto (click / open in mail client) ---");
    lines.push(buildDnsEnableMailto());
    lines.push("EML: npm run point-c:dnsenable-eml → docs/ops/arleds-301-dnsenable.eml");
    lines.push(`Gmail draft (Send): ${DNSENABLE_GMAIL_DRAFT_URL}`);
    lines.push("");
    lines.push("--- Hostinger arleds.com → arledscreen.com/tr/ 301 (owner clipboard) ---");
    lines.push("ONLY if npm run verify:arleds-301 mode=hostinger_* (NS Hostinger). Otherwise ignore.");
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
      "Inventable aliases: /.well-known/panels.json · /.well-known/modules.json · /.well-known/sku.json · /.well-known/mpn.json · /.well-known/merchant.json · /.well-known/price.json · /.well-known/pricing.json · /.well-known/prices.json · /.well-known/offer.json · /.well-known/dataset.json · /.well-known/feed.json · /.well-known/agents.json · /.well-known/ard.json · /ai.txt · /llms.txt · /llms-full.txt · /humans.txt · /AGENTS.md · /.well-known/security.txt · /prices.json · /offer.json · /dataset.json · /feed.json",
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
      return {
        key: HOSTINGER_STEP,
        label: "arleds.com 301 (DNSEnable Domain Redirect · Hostinger only if NS Hostinger)",
        text: buildArleds301DualPathClipboard(),
        done: acked.length,
        total: sequenceKeys(en).length,
      };
    }
    const label = (en ? EN_ORDER : TR_ORDER).find(([, k]) => k === key)?.[0] || key;
    const text = packs[key];
    if (text == null || text === "") continue;
    return { key, label, text: String(text), done: acked.length, total: sequenceKeys(en).length };
  }
  return null;
}

/**
 * Paste-ready Point C next gate (Tur1a-style) for invent agents / geo-status.
 * Cite pack text only — does not invent citations.
 */
export function buildPointCNext(profiles, { en = false } = {}) {
  const step = nextStep(profiles, { en });
  if (!step) return null;
  const where = POINT_C_PASTE_WHERE[step.key] || "";
  const open = pointCOpenUrl(step.key);
  const openAlt = pointCOpenAltUrl(step.key);
  const row = {
    packKey: step.key,
    label: step.label,
    where,
    open: open || "",
    text: step.text,
    ackCommand: `npm run point-c:ack -- --pack=${step.key}`,
    progress: { acked: step.done, total: step.total },
  };
  if (openAlt) row.openAlt = openAlt;
  return row;
}

const SITE = "https://arledscreen.com";

/** Spreadsheet-ready Point C sequence (owner tracking). Does not invent citations. */
export function buildPointCCsv(profiles, { en = false } = {}) {
  const packs = en ? profiles.packsEn || {} : profiles.packs || {};
  const { acked } = readProgress();
  const ackedSet = new Set(acked);
  const keys = sequenceKeys(en);
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const lines = ["packKey,label,status,where,open,openAlt,ackCommand,pasteText"];
  for (const key of keys) {
    const label =
      key === HOSTINGER_STEP
        ? "arleds.com 301 (DNSEnable Domain Redirect)"
        : (en ? EN_ORDER : TR_ORDER).find(([, k]) => k === key)?.[0] || key;
    const status = ackedSet.has(key) ? "acked" : "open";
    const where = POINT_C_PASTE_WHERE[key] || "";
    const open = pointCOpenUrl(key);
    const openAlt = pointCOpenAltUrl(key);
    const ackCmd = status === "acked" ? "" : `npm run point-c:ack -- --pack=${key}`;
    // Ensure pack exists (skip empty non-step keys).
    if (key !== HOSTINGER_STEP && (packs[key] == null || packs[key] === "")) continue;
    const pasteText =
      key === HOSTINGER_STEP ? buildArleds301DualPathClipboard() : String(packs[key] ?? "");
    lines.push(
      [key, esc(label), status, esc(where), esc(open), esc(openAlt), esc(ackCmd), esc(pasteText)].join(
        ",",
      ),
    );
  }
  return `${lines.join("\n")}\n`;
}

/**
 * Machine-readable Point C packs (+ Open tabs) for invent agents.
 * Same cite facts as point-c.txt / entity-profiles — does not invent citations.
 */
export function buildPointCJsonDoc(profiles, { en = false } = {}) {
  const packs = en ? profiles.packsEn || {} : profiles.packs || {};
  const order = en ? EN_ORDER : TR_ORDER;
  const { acked } = readProgress();
  const ackedSet = new Set(acked);
  const items = [];
  for (const [label, key] of order) {
    if (packs[key] == null || packs[key] === "") continue;
    const row = {
      packKey: key,
      label,
      status: ackedSet.has(key) ? "acked" : "open",
      where: POINT_C_PASTE_WHERE[key] || "",
      open: pointCOpenUrl(key),
      text: String(packs[key]),
      ackCommand: ackedSet.has(key) ? "" : `npm run point-c:ack -- --pack=${key}`,
    };
    const alt = pointCOpenAltUrl(key);
    if (alt) row.openAlt = alt;
    items.push(row);
  }
  {
    const key = HOSTINGER_STEP;
    const row = {
      packKey: key,
      label: "arleds.com 301 (DNSEnable Domain Redirect)",
      status: ackedSet.has(key) ? "acked" : "open",
      where: POINT_C_PASTE_WHERE[key] || "",
      open: pointCOpenUrl(key),
      text: buildArleds301DualPathClipboard(),
      ackCommand: ackedSet.has(key) ? "" : `npm run point-c:ack -- --pack=${key}`,
    };
    const alt = pointCOpenAltUrl(key);
    if (alt) row.openAlt = alt;
    items.push(row);
  }
  const jsonUrl = en ? `${SITE}/point-c-en.json` : `${SITE}/point-c.json`;
  const txtUrl = en ? `${SITE}/point-c-en.txt` : `${SITE}/point-c.txt`;
  const csvUrl = en ? `${SITE}/feeds/point-c-en.csv` : `${SITE}/feeds/point-c.csv`;
  const wkJson = en ? `${SITE}/.well-known/point-c-en.json` : `${SITE}/.well-known/point-c.json`;
  const doc = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": jsonUrl,
    name: en ? "ARLEDSCREEN Point C paste packs (EN)" : "ARLEDSCREEN Point C paste packs",
    description:
      "Owner-operated third-party citation paste packs (GBP/IG/FB/LinkedIn/Bing/Apple/YT/Yandex + arleds 301). Cite packs only — no invented ratings. Follow potentialAction HowTo when next is set. CSV twin for spreadsheets. WebSite: https://arledscreen.com/#website. Owner: live https://arledscreen.com/geo-next.txt · https://arledscreen.com/point-c.json → next + potentialAction · progress: https://arledscreen.com/point-c-progress.json → potentialAction · status: https://arledscreen.com/geo-status.json → potentialAction · npm run geo:next · spreadsheet: npm run point-c:csv · after paste: npm run geo:ack · Open: https://www.bingplaces.com/ · OpenAlt: https://businessconnect.apple.com/.",
    url: jsonUrl,
    inLanguage: en ? "en" : "tr",
    creator: { "@id": `${SITE}/#organization` },
    isBasedOn: [
      `${SITE}/entity-profiles.json`,
      txtUrl,
      `${SITE}/entity.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/point-c-progress.json`,
      `${SITE}/geo-status.json`,
      `${SITE}/#website`,
    ],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: jsonUrl,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: wkJson,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: csvUrl,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/plain",
        contentUrl: txtUrl,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/plain",
        contentUrl: `${SITE}/geo-next.txt`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/point-c-progress.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/geo-status.json`,
      },
    ],
    sameAs: [
      txtUrl,
      csvUrl,
      wkJson,
      `${SITE}/entity-profiles.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/geo-status.json`,
      `${SITE}/point-c-progress.json`,
    ],
    packs: items,
    progress: { acked: acked.length, total: sequenceKeys(en).length },
    next: buildPointCNext(profiles, { en }),
    ownerNext:
      "live: https://arledscreen.com/geo-next.txt · https://arledscreen.com/point-c.json → next + potentialAction · progress: https://arledscreen.com/point-c-progress.json → potentialAction · status: https://arledscreen.com/geo-status.json → potentialAction · npm run geo:next · spreadsheet: npm run point-c:csv · after paste: npm run geo:ack · Open: https://www.bingplaces.com/ · OpenAlt: https://businessconnect.apple.com/ · Open: https://www.isimtescil.net/ · Open: https://business.google.com/ · Open: https://chatgpt.com/",
  };
  const next = doc.next;
  if (next?.text && next?.open) {
    doc.potentialAction = {
      "@type": "HowTo",
      name: en
        ? `Point C next paste: ${next.packKey}`
        : `Point C sonraki yapıştırma: ${next.packKey}`,
      description:
        "Owner-gated third-party citation paste. Cite pack text only — do not invent ratings or mention rates.",
      url: `${SITE}/geo-next.txt`,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open destination",
          url: next.open,
          text: next.openAlt
            ? `Open: ${next.open} · OpenAlt: ${next.openAlt}`
            : `Open: ${next.open}`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste NAP / About block",
          text: next.text,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Ack progress",
          text: next.ackCommand || "npm run geo:ack",
        },
      ],
      tool: [
        { "@type": "HowToTool", name: "geo-next.txt", url: `${SITE}/geo-next.txt` },
        { "@type": "HowToTool", name: "point-c.json", url: jsonUrl },
        { "@type": "HowToTool", name: "point-c-progress.json", url: `${SITE}/point-c-progress.json` },
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
        { "@type": "HowToTool", name: "tur1a.json", url: `${SITE}/tur1a.json` },
      ],
    };
  }
  return applyOwnerGateCrossJoin(doc);
}

function printCsv(profiles, { en = false } = {}) {
  process.stdout.write(buildPointCCsv(profiles, { en }));
  const keys = sequenceKeys(en);
  const { acked } = readProgress();
  console.error(`# progress ${acked.length}/${keys.length} acked — do not invent citations`);
  console.error(`# live CSV: ${en ? `${SITE}/feeds/point-c-en.csv` : `${SITE}/feeds/point-c.csv`}`);
}

function printNext(profiles, { en = false } = {}) {
  const step = nextStep(profiles, { en });
  if (!step) {
    console.log("=== ARLEDSCREEN Point C next ===");
    console.log("All sequential pastes acked (packs + arleds 301 dual-path).");
    console.log("Verify: npm run verify:arleds-301 · npm run geo:status");
    console.log("Reset progress: delete docs/geo/observations/point-c-progress.json");
    return;
  }
  console.log("=== ARLEDSCREEN Point C next paste ===");
  console.log(`Step: ${step.key} · ${step.label}`);
  console.log(`Progress: ${step.done}/${step.total} acked → paste this block`);
  console.log("Locale:", en ? "EN" : "TR");
  const where = POINT_C_PASTE_WHERE[step.key];
  const open = pointCOpenUrl(step.key);
  const openAlt = pointCOpenAltUrl(step.key);
  if (where) console.log(`Where: ${where}`);
  if (open) console.log(`Open: ${open}`);
  if (openAlt) console.log(`OpenAlt: ${openAlt}`);
  console.log("");
  console.log("### Paste (select-all)");
  console.log("---");
  console.log(step.text);
  console.log("---");
  console.log("");
  if (step.key === HOSTINGER_STEP) {
    console.log("### Primary: DNSEnable Domain Redirect (live NS)");
    console.log(buildDnsEnableRedirectClipboard());
    console.log("");
    console.log("### DNSEnable mailto (primary — live NS)");
    console.log(buildDnsEnableMailto());
    console.log(`Gmail draft (Send): ${DNSENABLE_GMAIL_DRAFT_URL}`);
    console.log("EML file: npm run point-c:dnsenable-eml");
    console.log("");
    console.log("### Hostinger mailto (ONLY if NS is Hostinger)");
    console.log(buildHostingerMailto());
    console.log("EML file: npm run point-c:hostinger-eml");
    console.log("");
  }
  console.log(`After paste: npm run point-c:ack -- --pack=${step.key}`);
  console.log("Or: npm run point-c:ack");
  console.log(
    "CSV: npm run point-c:csv · Live CSV: https://arledscreen.com/feeds/point-c.csv · JSON: https://arledscreen.com/point-c.json · Full packs: npm run point-c · Live: https://arledscreen.com/point-c.txt",
  );
}

function writeHostingerEml() {
  const dest = path.join(repoRoot, "docs/ops/arleds-301-hostinger.eml");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buildHostingerEml());
  console.log(`Wrote ${dest}`);
  console.log(`mailto: ${buildHostingerMailto()}`);
  console.log("Open the .eml in Gmail/Outlook, or click the mailto URI.");
}

function writeDnsEnableEml() {
  const dest = path.join(repoRoot, "docs/ops/arleds-301-dnsenable.eml");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buildDnsEnableEml());
  console.log(`Wrote ${dest}`);
  console.log(`mailto: ${buildDnsEnableMailto()}`);
  console.log("Open the .eml in Gmail/Outlook, or click the mailto URI.");
}

/** Owner friction: one clipboard for DNSEnable Domain Redirect + Gmail draft Send. */
function printDnsEnableDraft() {
  console.log("=== ARLEDSCREEN arleds.com 301 — DNSEnable draft ===");
  console.log(`Where: Isimtescil / DNSEnable → Domain Redirect (permanent 301)`);
  console.log(`Open: ${DNSENABLE_PANEL_URL}`);
  console.log(`OpenAlt (Gmail draft Send): ${DNSENABLE_GMAIL_DRAFT_URL}`);
  console.log("");
  console.log("### Panel steps");
  console.log(buildDnsEnableRedirectClipboard());
  console.log("");
  console.log("### Support email (select-all)");
  console.log(buildDnsEnableEmailClipboard());
  console.log("");
  console.log(`mailto: ${buildDnsEnableMailto()}`);
  console.log(`Gmail draft (Send): ${DNSENABLE_GMAIL_DRAFT_URL}`);
  console.log("EML: npm run point-c:dnsenable-eml");
  console.log("Verify: npm run verify:arleds-301 · npm run geo:status · npm run geo:next");
  console.log(
    "HowTo: https://arledscreen.com/geo-status.json → potentialAction · https://arledscreen.com/point-c.json → potentialAction",
  );
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
  npm run point-c:csv
  npm run point-c:ack [-- --pack=directoryLong]
  npm run geo:ack          (alias of point-c:ack)
  npm run point-c:hostinger-eml
  npm run point-c:dnsenable-eml
  npm run point-c:dnsenable-draft
  npm run geo:next         (priority owner clipboard)
Does not invent citations. --help never acks progress.`);
    process.exit(0);
  }
  if (argFlag("dnsenable-draft")) {
    printDnsEnableDraft();
    process.exit(0);
  }
  if (!fs.existsSync(profilesPath)) {
    console.error("Missing public/entity-profiles.json");
    process.exit(1);
  }
  const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  const useEn = argFlag("en");
  const only = argValue("pack");
  if (argFlag("dnsenable-eml")) {
    writeDnsEnableEml();
  } else if (argFlag("eml") || argFlag("hostinger-eml")) {
    writeHostingerEml();
  } else if (argFlag("csv")) {
    printCsv(profiles, { en: useEn });
  } else if (argFlag("next")) {
    printNext(profiles, { en: useEn });
  } else if (argFlag("ack")) {
    // Refuse accidental ack when extra unknown flags present (e.g. --help already handled).
    const unknown = process.argv.slice(2).filter(
      (a) =>
        a.startsWith("-") &&
        ![
          "--ack",
          "--en",
          "--next",
          "--eml",
          "--hostinger-eml",
          "--dnsenable-eml",
          "--dnsenable-draft",
          "--help",
          "-h",
        ].includes(a) &&
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
