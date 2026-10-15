#!/usr/bin/env node
/**
 * Daily content queue publisher.
 * Takes the OLDEST approved item in content-queue/*.md (sorted by file name,
 * convention: YYYY-MM-DD-NN-<slug>.md) and wires it into the live site as a
 * TR guide at /tr/rehber/<slug>/ using the existing article format
 * (src/content/articles/*.md + ARTICLE_SLUGS + ArticlePage).
 *
 * Never touches content-queue/drafts/ (Gemini drafts need human approval).
 * Idempotent: an item whose slug is already published is removed from the
 * queue without other changes. Empty queue → prints "empty" and exits 0.
 *
 * Usage: node scripts/queue-publish.mjs [--check]   (--check = validate only)
 * Writes slug/url/file to $GITHUB_OUTPUT when present.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const Q = path.join(root, "content-queue");
const ART = path.join(root, "src/content/articles");
const MD_TS = path.join(root, "src/lib/markdown.ts");
const SITEMAP = path.join(root, "src/app/sitemap.ts");
const LINKS = path.join(root, "src/content/article-links.ts");
const ROUTES = path.join(root, "src/app/[locale]/rehber");
const checkOnly = process.argv.includes("--check");

const out = (k, v) => {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
  console.log(`${k}=${v}`);
};

export function parseItem(raw) {
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(raw);
  if (!fm) throw new Error("missing front matter");
  const meta = {};
  for (const line of fm[1].split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^"|"$/g, "");
  }
  return { meta, body: raw.slice(fm[0].length) };
}

export function validate(raw, file) {
  const errs = [];
  const { meta, body } = parseItem(raw);
  const m = /^\/tr\/rehber\/([a-z0-9-]+)\/$/.exec(meta.slug ?? "");
  if (!m) errs.push("slug must look like /tr/rehber/<a-z0-9->/");
  for (const k of ["title", "meta_description", "h1", "last_reviewed"]) if (!meta[k]) errs.push(`missing ${k}`);
  if (meta.meta_description && meta.meta_description.length > 170) errs.push("meta_description > 170 chars");
  if (raw.includes("⚠️")) errs.push("contains ⚠️ (unverified claim) — remove before queueing");
  if (/^status:\s*draft/m.test(raw)) errs.push("status: draft — drafts are never published");
  for (const e of raw.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []) if (e.toLowerCase() !== "arled@arledscreen.com") errs.push(`email not allowed: ${e}`);
  if (body.trim().length < 800) errs.push("body too short (<800 chars)");
  if (errs.length) throw new Error(`${file}: ${errs.join("; ")}`);
  return m[1];
}

const queue = fs.existsSync(Q)
  ? fs.readdirSync(Q).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md").sort()
  : [];

if (checkOnly) {
  for (const f of queue) validate(fs.readFileSync(path.join(Q, f), "utf8"), f);
  console.log(`OK ${queue.length} queue item(s) valid`);
  process.exit(0);
}

if (!queue.length) { out("status", "empty"); process.exit(0); }

const file = queue[0];
const src = path.join(Q, file);
const raw = fs.readFileSync(src, "utf8");
const slug = validate(raw, file);
const url = `https://arledscreen.com/tr/rehber/${slug}/`;
const logDir = path.join(Q, "published-log");
fs.mkdirSync(logDir, { recursive: true });
const today = new Date().toISOString().slice(0, 10);

let mdTs = fs.readFileSync(MD_TS, "utf8");
const already = mdTs.includes(`"${slug}",`) || fs.existsSync(path.join(ART, `${slug}.md`)) || fs.existsSync(path.join(ROUTES, slug));
if (already) {
  fs.renameSync(src, path.join(logDir, file));
  out("status", "duplicate"); out("slug", slug); out("file", file);
  process.exit(0);
}

// 1) article markdown (existing format)
fs.writeFileSync(path.join(ART, `${slug}.md`), raw.replace(/^last_reviewed:.*$/m, `last_reviewed: ${today}`));
// 2) register slug
mdTs = mdTs.replace(/(export const ARTICLE_SLUGS = \[[\s\S]*?)(\n\] as const;)/, `$1\n  "${slug}",$2`);
if (!mdTs.includes(`"${slug}",`)) throw new Error("could not register slug in ARTICLE_SLUGS");
fs.writeFileSync(MD_TS, mdTs);
// 3) TR-only static route (same ArticlePage as the existing TR guides)
fs.mkdirSync(path.join(ROUTES, slug), { recursive: true });
fs.writeFileSync(path.join(ROUTES, slug, "page.tsx"), `// Auto-published from content-queue/${file} on ${today}
import type { Metadata } from "next";
import { ArticlePage } from "@/components/article/ArticlePage";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { getArticle } from "@/lib/markdown";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata(): Metadata {
  const a = getArticle("${slug}");
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/rehber/${slug}/",
    title: \`\${a.title} | ARLEDSCREEN\`,
    description: a.description,
    hreflangLocales: ["tr"],
  });
}
export default function Page() {
  return <ArticlePage slug="${slug}" />;
}
`);
// 4) sitemap
let sm = fs.readFileSync(SITEMAP, "utf8");
const anchor = `    "/rehber/gob-vs-smd/",\n`;
if (!sm.includes(anchor)) throw new Error("sitemap anchor not found");
sm = sm.replace(anchor, `${anchor}    "/rehber/${slug}/",\n`);
fs.writeFileSync(SITEMAP, sm);
// 5) internal link list (rehber/footer article links)
let links = fs.readFileSync(LINKS, "utf8");
const h1 = parseItem(raw).meta.h1.replace(/"/g, '\\"');
links = links.replace(/(\n\];)/, `\n  { href: "/tr/rehber/${slug}/", label: "${h1}" },$1`);
fs.writeFileSync(LINKS, links);
// 6) move queue item to log
fs.renameSync(src, path.join(logDir, file));

out("status", "published"); out("slug", slug); out("url", url); out("file", file);
