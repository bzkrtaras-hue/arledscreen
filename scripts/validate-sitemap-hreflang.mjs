#!/usr/bin/env node
// GEO paket 3 validator: sitemap.xml hreflang alternates vs the built out/ folder.
// Fails (exit 1) when an alternate points at a page that is not in the build, is noindex,
// is not self-canonical, is not reciprocal, or disagrees with the page's own <link hreflang>.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const ORIGIN = "https://arledscreen.com";
const LANGS = new Set(["tr", "en", "ar", "x-default"]);
const errors = [];
const err = (m) => errors.push(m);

const xml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
if (!/xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/.test(xml)) err("sitemap.xml: xhtml namespace missing");

const entries = new Map(); // loc -> Map(lang -> href)
const dupLocs = [];
for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = /<loc>([^<]*)<\/loc>/.exec(m[1])?.[1];
  if (!loc) continue;
  const alts = new Map();
  for (const a of m[1].matchAll(/<xhtml:link\s+([^>]*?)\/?>/g)) {
    const attrs = a[1];
    const lang = /hreflang="([^"]*)"/.exec(attrs)?.[1];
    const href = /href="([^"]*)"/.exec(attrs)?.[1];
    const rel = /rel="([^"]*)"/.exec(attrs)?.[1];
    if (rel !== "alternate" || !lang || !href) { err(`${loc}: malformed xhtml:link (${attrs})`); continue; }
    if (alts.has(lang)) err(`${loc}: duplicate hreflang ${lang}`);
    alts.set(lang, href);
  }
  if (entries.has(loc)) dupLocs.push(loc);
  entries.set(loc, alts);
}

const pageCache = new Map();
function page(url) {
  if (pageCache.has(url)) return pageCache.get(url);
  let info = null;
  if (url.startsWith(ORIGIN + "/")) {
    const p = path.join(OUT, url.slice(ORIGIN.length), "index.html");
    if (fs.existsSync(p)) {
      const h = fs.readFileSync(p, "utf8");
      const canonical = /<link rel="canonical" href="([^"]*)"/.exec(h)?.[1];
      const robots = /<meta name="robots" content="([^"]*)"/.exec(h)?.[1] ?? "";
      const own = new Map();
      for (const l of h.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/g)) own.set(l[1], l[2]);
      info = { canonical, robots, own };
    }
  }
  pageCache.set(url, info);
  return info;
}

let withAlts = 0, altLinks = 0, inPageDiff = 0;
const byLang = {};
for (const [loc, alts] of entries) {
  const self = page(loc);
  if (!self) { err(`${loc}: listed in sitemap but not in the build`); continue; }
  if (!alts.size) continue;
  withAlts++;
  if (![...alts.values()].includes(loc)) err(`${loc}: alternates must include the URL itself`);
  const tr = alts.get("tr");
  if (alts.has("x-default") && alts.get("x-default") !== tr) err(`${loc}: x-default must equal the tr alternate`);
  if (tr && !alts.has("x-default")) err(`${loc}: tr alternate without x-default`);
  for (const [lang, href] of alts) {
    altLinks++;
    byLang[lang] = (byLang[lang] ?? 0) + 1;
    if (!LANGS.has(lang)) err(`${loc}: unexpected hreflang ${lang}`);
    const t = page(href);
    if (!t) { err(`${loc}: hreflang ${lang} → ${href} does not exist in the build (404)`); continue; }
    if (t.canonical !== href) err(`${loc}: hreflang ${lang} → ${href} is not self-canonical (${t.canonical})`);
    if (/noindex/i.test(t.robots)) err(`${loc}: hreflang ${lang} → ${href} is noindex`);
    if (!entries.has(href)) err(`${loc}: hreflang ${lang} → ${href} is not itself listed in the sitemap`);
    if (lang !== "x-default") {
      const back = entries.get(href);
      if (back && ![...back.entries()].some(([l, h]) => l === lang && h === href)) err(`${href}: missing self alternate ${lang}`);
      if (back && ![...back.values()].includes(loc)) err(`${href}: not reciprocal, does not list ${loc}`);
    }
  }
  // The page's own <link hreflang> must not contradict the sitemap.
  for (const [lang, href] of self.own) {
    if (alts.has(lang) && alts.get(lang) !== href) { inPageDiff++; err(`${loc}: in-page hreflang ${lang}=${href} differs from sitemap ${alts.get(lang)}`); }
  }
}
for (const d of dupLocs) err(`${d}: listed twice in sitemap.xml`);

console.log(`validate-sitemap-hreflang: ${entries.size} sitemap URLs, ${withAlts} with alternates, ${altLinks} xhtml:link, by lang ${JSON.stringify(byLang)}, in-page conflicts ${inPageDiff}`);
if (errors.length) {
  console.error(`❌ validate-sitemap-hreflang: ${errors.length} problem(s)`);
  for (const e of errors.slice(0, 40)) console.error("  - " + e);
  process.exit(1);
}
console.log("✅ validate-sitemap-hreflang: every alternate exists in out/, is indexable, self-canonical and reciprocal");
