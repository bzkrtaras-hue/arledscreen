/**
 * Case-study photo integrity audit (Gün 19).
 *
 * After build:
 * 1) Every IMAGE_BY_REF src must resolve (public original or /opt WebP)
 * 2) Inventory out/tr/projelerimiz/* : gallery present vs gap notice
 * 3) Never invent photos — gaps are owner upload work
 *
 * Run: node scripts/audit-case-study-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outProj = path.join(root, "out/tr/projelerimiz");
const errors = [];

const csSrc = fs.readFileSync(path.join(root, "src/content/case-studies.ts"), "utf8");

/** @type {{ref:string, src:string, alt:string}[]} */
const mapped = [];
for (const m of csSrc.matchAll(/"(ref-\d+)":\s*\[([\s\S]*?)\]/g)) {
  const rid = m[1];
  for (const x of m[2].matchAll(/\{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]*)"\s*\}/g)) {
    mapped.push({ ref: rid, src: x[1], alt: x[2] });
  }
}

function resolvable(src) {
  const pub = path.join(root, "public", src.replace(/^\//, ""));
  if (fs.existsSync(pub)) return true;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  const optOrig = path.join(root, "public/opt", base.replace(/^\//, "") + path.extname(src));
  if (fs.existsSync(optOrig)) return true;
  const dir = path.join(root, "public/opt", path.dirname(src).replace(/^\//, ""));
  const stem = path.basename(base);
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).some((f) => f.startsWith(`${stem}-`) && f.endsWith(".webp"));
}

for (const { ref, src, alt } of mapped) {
  if (!resolvable(src)) errors.push(`${ref}: missing asset ${src}`);
  if (!alt || alt.trim().length < 8) errors.push(`${ref}: weak alt for ${src}`);
}

if (!fs.existsSync(outProj)) {
  console.error("Missing out/tr/projelerimiz — run npm run build first");
  process.exit(1);
}

const gaps = [];
const withGallery = [];
for (const ent of fs.readdirSync(outProj, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  const file = path.join(outProj, ent.name, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const hasGallery = /<h2[^>]*>Görseller<\/h2>/i.test(html);
  const hasGapNotice =
    /data-case-photo-gap="true"/i.test(html) ||
    /henüz eşleşen[^<]{0,40}proje fotoğrafı bağlı değil/i.test(html);
  if (hasGallery) withGallery.push(ent.name);
  else if (hasGapNotice) gaps.push(ent.name);
  else errors.push(`${ent.name}: neither gallery nor gap notice`);
}

// Write machine-readable inventory for owner (docs, not public spam)
const inventoryPath = path.join(root, "docs/case-study-photo-gaps.generated.json");
fs.writeFileSync(
  inventoryPath,
  JSON.stringify(
    {
      generated: new Date().toISOString().slice(0, 10),
      withGallery: withGallery.sort(),
      gaps: gaps.sort(),
      mappedFiles: mapped.length,
      rule: "Do not invent photos; attach only identity-clear project files to IMAGE_BY_REF",
    },
    null,
    2,
  ) + "\n",
);

if (errors.length) {
  console.error(`audit-case-study-images: FAIL (${errors.length})`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-case-study-images: OK — gallery=${withGallery.length} gaps=${gaps.length} mapped_files=${mapped.length}`,
);
console.log(`Wrote ${path.relative(root, inventoryPath)}`);
