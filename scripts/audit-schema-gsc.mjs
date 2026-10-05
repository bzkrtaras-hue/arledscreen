/**
 * GSC invalid-schema regression guard.
 *
 * Cross-cutting JSON-LD checks that historically produce Search Console
 * “Invalid object” / Merchant “Missing field” warnings. Complements
 * audit-product-offers / audit-faq / audit-entity (does not replace them).
 *
 * Fails on:
 * - Unparseable application/ld+json
 * - AggregateRating or Review (we never publish ratings/reviews)
 * - Offer without price + priceCurrency
 * - AggregateOffer without lowPrice + highPrice + priceCurrency
 * - Product.offers present but incomplete / empty
 * - FAQPage Question without acceptedAnswer.text
 * - BreadcrumbList ListItem missing position or name
 *
 * Run after build: node scripts/audit-schema-gsc.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(root, "out");
const errors = [];

if (!fs.existsSync(outRoot)) {
  console.error("Missing out/ — run npm run build first");
  process.exit(1);
}

function walk(node, visit) {
  if (node == null) return;
  if (Array.isArray(node)) {
    for (const item of node) walk(item, visit);
    return;
  }
  if (typeof node !== "object") return;
  visit(node);
  for (const value of Object.values(node)) walk(value, visit);
}

function typesOf(node) {
  const t = node["@type"];
  if (!t) return [];
  return Array.isArray(t) ? t : [t];
}

function hasPrice(value) {
  if (value == null || value === "") return false;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "string") return /^\d+(\.\d+)?$/.test(value.trim());
  return false;
}

function relFrom(file) {
  return path.relative(outRoot, file).replace(/\\/g, "/");
}

/** @type {string[]} */
const htmlFiles = [];
function collectHtml(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) collectHtml(full);
    else if (ent.name.endsWith(".html")) htmlFiles.push(full);
  }
}
collectHtml(outRoot);

let pages = 0;
let blocks = 0;
let offers = 0;
let aggregateOffers = 0;
let products = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("application/ld+json")) continue;
  pages += 1;
  const rel = relFrom(file);

  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    blocks += 1;
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${rel}: unparseable JSON-LD (${e instanceof Error ? e.message : "parse error"})`);
      continue;
    }

    walk(data, (node) => {
      const types = typesOf(node);

      if (types.includes("AggregateRating") || types.includes("Review")) {
        errors.push(`${rel}: forbidden @type ${types.join(",")}`);
      }

      if (types.includes("Offer")) {
        offers += 1;
        if (!hasPrice(node.price)) {
          errors.push(`${rel}: Offer missing/invalid price (GSC Merchant)`);
        }
        if (!node.priceCurrency || typeof node.priceCurrency !== "string") {
          errors.push(`${rel}: Offer missing priceCurrency`);
        }
      }

      if (types.includes("AggregateOffer")) {
        aggregateOffers += 1;
        if (!hasPrice(node.lowPrice) || !hasPrice(node.highPrice)) {
          errors.push(`${rel}: AggregateOffer missing lowPrice/highPrice`);
        }
        if (!node.priceCurrency) {
          errors.push(`${rel}: AggregateOffer missing priceCurrency`);
        }
      }

      if (types.includes("Product")) {
        products += 1;
        if ("offers" in node) {
          const o = node.offers;
          if (o == null || (typeof o === "object" && !Array.isArray(o) && Object.keys(o).length === 0)) {
            errors.push(`${rel}: Product.offers empty — omit offers when quote-only`);
          } else if (typeof o === "object" && !Array.isArray(o)) {
            const ot = typesOf(o);
            if (ot.includes("Offer") && !hasPrice(o.price)) {
              errors.push(`${rel}: Product Offer without price`);
            }
            if (ot.includes("AggregateOffer") && (!hasPrice(o.lowPrice) || !hasPrice(o.highPrice))) {
              errors.push(`${rel}: Product AggregateOffer incomplete`);
            }
          }
        }
      }

      if (types.includes("FAQPage")) {
        const ents = node.mainEntity;
        if (!Array.isArray(ents) || ents.length === 0) {
          errors.push(`${rel}: FAQPage mainEntity empty`);
        } else {
          for (const q of ents) {
            const ans = q?.acceptedAnswer?.text;
            if (!ans || String(ans).trim().length < 10) {
              errors.push(`${rel}: FAQ Question missing acceptedAnswer.text`);
            }
          }
        }
      }

      if (types.includes("BreadcrumbList")) {
        const ents = node.itemListElement;
        if (!Array.isArray(ents) || ents.length === 0) {
          errors.push(`${rel}: BreadcrumbList empty`);
        } else {
          for (const item of ents) {
            if (item?.position == null) errors.push(`${rel}: Breadcrumb ListItem missing position`);
            if (!item?.name) errors.push(`${rel}: Breadcrumb ListItem missing name`);
          }
        }
      }
    });
  }
}

if (errors.length) {
  console.error(`audit-schema-gsc: FAIL (${errors.length} issue(s))`);
  for (const e of errors.slice(0, 50)) console.error(" -", e);
  if (errors.length > 50) console.error(` … +${errors.length - 50} more`);
  process.exit(1);
}

console.log(
  `audit-schema-gsc: OK — pages=${pages} blocks=${blocks} products=${products} offers=${offers} aggregateOffers=${aggregateOffers}`,
);
