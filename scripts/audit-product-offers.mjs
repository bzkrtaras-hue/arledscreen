/**
 * Guardrail for GSC Merchant / AI shopping Product JSON-LD.
 *
 * After `npm run build`, scans out/tr/products/<group>/<model>/:
 * - Models with priceId → Product must have image + offers.price (+ priceCurrency)
 * - Models without priceId → Product must have image and MUST NOT include offers
 *   (incomplete Offer without price marks Merchant listings invalid)
 *
 * Also checks public/catalog.json prices match PANEL_PRICES.
 *
 * Run: node scripts/audit-product-offers.mjs
 * Exit 1 on any violation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const pricesSrc = fs.readFileSync(path.join(root, "src/content/prices.ts"), "utf8");
const modelsSrc = fs.readFileSync(path.join(root, "src/content/models.ts"), "utf8");

const priceById = new Map();
const priceRe =
  /\{\s*id:\s*"([^"]+)",\s*pitch:\s*"([^"]+)",\s*pitchMm:\s*([\d.]+),\s*use:\s*"(ic|dis)",\s*(?:surface:\s*"GOB",\s*)?(?:frontService:\s*true,\s*)?usd:\s*([\d.]+)/g;
for (const m of pricesSrc.matchAll(priceRe)) {
  priceById.set(m[1], Number(m[5]));
}

/** @type {{slug:string,group:string,priceId?:string}[]} */
const models = [];
const blockRe = /\{\s*slug:\s*"([^"]+)",\s*group:\s*"([^"]+)"([\s\S]*?)(?=\n  \{\s*slug:|\n];)/g;
for (const m of modelsSrc.matchAll(blockRe)) {
  const priceId = m[3].match(/priceId:\s*"([^"]+)"/)?.[1];
  models.push({ slug: m[1], group: m[2], priceId });
}

const outRoot = path.join(root, "out/tr/products");
if (!fs.existsSync(outRoot)) {
  console.error("Missing out/tr/products — run npm run build first");
  process.exit(1);
}

let pricedChecked = 0;
let quoteChecked = 0;

for (const model of models) {
  const file = path.join(outRoot, model.group, model.slug, "index.html");
  if (!fs.existsSync(file)) {
    // Control / niche models may live only under their group; skip missing paths
    // only if the HTML truly was not generated.
    errors.push(`missing HTML: ${model.group}/${model.slug}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (x) => x[1],
  );
  const product = scripts
    .map((s) => {
      try {
        return JSON.parse(s);
      } catch {
        return null;
      }
    })
    .find((d) => d && d["@type"] === "Product");

  if (!product) {
    errors.push(`${model.group}/${model.slug}: no Product JSON-LD`);
    continue;
  }
  if (!product.image) {
    errors.push(`${model.group}/${model.slug}: Product.image missing`);
  }

  const expectedUsd = model.priceId ? priceById.get(model.priceId) : undefined;
  if (model.priceId && expectedUsd == null) {
    errors.push(`${model.group}/${model.slug}: priceId ${model.priceId} not in PANEL_PRICES`);
  }

  if (expectedUsd != null) {
    pricedChecked += 1;
    const offers = product.offers;
    if (!offers || typeof offers !== "object") {
      errors.push(`${model.group}/${model.slug}: priced model missing offers`);
      continue;
    }
    const price = offers.price;
    const currency = offers.priceCurrency;
    if (price == null || price === "") {
      errors.push(`${model.group}/${model.slug}: offers.price missing`);
    } else if (Number(price).toFixed(2) !== expectedUsd.toFixed(2)) {
      errors.push(
        `${model.group}/${model.slug}: offers.price ${price} != PANEL_PRICES ${expectedUsd.toFixed(2)}`,
      );
    }
    if (currency !== "USD") {
      errors.push(`${model.group}/${model.slug}: offers.priceCurrency=${currency} (expected USD)`);
    }
    const specPrice = offers.priceSpecification?.price;
    if (specPrice != null && Number(specPrice).toFixed(2) !== expectedUsd.toFixed(2)) {
      errors.push(`${model.group}/${model.slug}: priceSpecification.price mismatch`);
    }
  } else {
    quoteChecked += 1;
    if (product.offers) {
      errors.push(
        `${model.group}/${model.slug}: quote-only model must omit offers (GSC invalid without price)`,
      );
    }
  }
}

// catalog.json ↔ PANEL_PRICES
const catalogPath = path.join(root, "public/catalog.json");
if (fs.existsSync(catalogPath)) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const dataset = catalog.dataset || [];
  if (dataset.length !== priceById.size) {
    errors.push(`catalog.json has ${dataset.length} products; PANEL_PRICES has ${priceById.size}`);
  }
  for (const p of dataset) {
    const sku = p.sku;
    const expected = priceById.get(sku);
    if (expected == null) {
      errors.push(`catalog sku ${sku} not in PANEL_PRICES`);
      continue;
    }
    const got = Number(p.offers?.price);
    if (got.toFixed(2) !== expected.toFixed(2)) {
      errors.push(`catalog ${sku} price ${got} != ${expected}`);
    }
    if (!p.offers?.priceCurrency || p.offers.priceCurrency !== "USD") {
      errors.push(`catalog ${sku} missing USD currency`);
    }
    if (!p.url || !String(p.url).startsWith("https://arledscreen.com/tr/products/")) {
      errors.push(`catalog ${sku} bad product url`);
    }
  }
} else {
  errors.push("public/catalog.json missing");
}

console.log(
  `Checked ${models.length} models (priced=${pricedChecked}, quote-only=${quoteChecked}); catalog panels=${priceById.size}`,
);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: Product Offer / image / catalog guards passed");
