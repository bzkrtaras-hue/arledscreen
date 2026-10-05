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
/** @type {{id:string,pitch:string,use:string,surface?:string,frontService:boolean,usd:number}[]} */
const priceRows = [];
const priceRe =
  /\{\s*id:\s*"([^"]+)",\s*pitch:\s*"([^"]+)",\s*pitchMm:\s*([\d.]+),\s*use:\s*"(ic|dis)",\s*(?:surface:\s*"GOB",\s*)?(?:frontService:\s*true,\s*)?usd:\s*([\d.]+)/g;
for (const m of pricesSrc.matchAll(priceRe)) {
  const row = {
    id: m[1],
    pitch: m[2],
    use: m[4],
    surface: /surface:\s*"GOB"/.test(m[0]) ? "GOB" : undefined,
    frontService: /frontService:\s*true/.test(m[0]),
    usd: Number(m[5]),
  };
  priceById.set(row.id, row.usd);
  priceRows.push(row);
}

/** @type {{slug:string,group:string,priceId?:string,kind?:string}[]} */
const models = [];
const blockRe = /\{\s*slug:\s*"([^"]+)",\s*group:\s*"([^"]+)"([\s\S]*?)(?=\n  \{\s*slug:|\n];)/g;
for (const m of modelsSrc.matchAll(blockRe)) {
  const priceId = m[3].match(/priceId:\s*"([^"]+)"/)?.[1];
  const kind = m[3].match(/kind:\s*"([^"]+)"/)?.[1];
  models.push({ slug: m[1], group: m[2], priceId, kind });
}

const outRoot = path.join(root, "out/tr/products");
if (!fs.existsSync(outRoot)) {
  console.error("Missing out/tr/products — run npm run build first");
  process.exit(1);
}

let pricedChecked = 0;
let quoteChecked = 0;
let kontrolChecked = 0;

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

  if (model.kind === "kontrol") {
    kontrolChecked += 1;
    if (model.priceId) {
      errors.push(`${model.group}/${model.slug}: kontrol model must not have priceId`);
    }
    if (product.offers) {
      errors.push(
        `${model.group}/${model.slug}: kontrol Product must omit offers (quote-only; GSC)`,
      );
    }
    if (!product.potentialAction) {
      errors.push(`${model.group}/${model.slug}: kontrol Product missing potentialAction (quote CTA)`);
    }
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

// Control group hubs: Service must not carry AggregateOffer; ItemList of models without nested offers.price
const CONTROL_GROUPS = [
  "huidu-kontrol-kartlari",
  "novastar-kontrolculer",
  "colorlight-kontrolculer",
  "led-modul-ve-kontrol-sistemleri",
];
for (const group of CONTROL_GROUPS) {
  const hub = path.join(outRoot, group, "index.html");
  if (!fs.existsSync(hub)) {
    if (group !== "led-modul-ve-kontrol-sistemleri") {
      errors.push(`missing control hub: ${group}`);
    }
    continue;
  }
  const hubHtml = fs.readFileSync(hub, "utf8");
  for (const m of hubHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    if (data?.["@type"] === "Service" && data.offers) {
      errors.push(`${group} hub Service must not include offers (quote-only control)`);
    }
    if (data?.["@type"] === "ItemList") {
      for (const li of data.itemListElement || []) {
        if (li?.item?.offers || li?.offers) {
          errors.push(`${group} ItemList entry must omit offers`);
        }
      }
    }
  }
}

// catalog.json must never list kontrol SKUs
const kontrolSlugs = models.filter((m) => m.kind === "kontrol").map((m) => m.slug);
const catalogPath = path.join(root, "public/catalog.json");
if (fs.existsSync(catalogPath)) {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const dataset = catalog.dataset || [];
  if (dataset.length !== priceById.size) {
    errors.push(`catalog.json has ${dataset.length} products; PANEL_PRICES has ${priceById.size}`);
  }
  for (const p of dataset) {
    const sku = p.sku;
    const urlStr = String(p.url || "");
    if (kontrolSlugs.some((s) => urlStr.includes(`/${s}/`) || String(sku).toLowerCase().includes(s))) {
      errors.push(`catalog must not include kontrol product ${sku}`);
    }
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
    if (!p.image || !String(p.image).startsWith("https://arledscreen.com/")) {
      errors.push(`catalog ${sku} missing absolute product image`);
    }
  }
} else {
  errors.push("public/catalog.json missing");
}

// Fiyat hub JSON-LD ↔ PANEL_PRICES
const hubPath = path.join(root, "out/tr/led-ekran-fiyatlari/index.html");
if (fs.existsSync(hubPath)) {
  const hubHtml = fs.readFileSync(hubPath, "utf8");
  const hubPrices = [];
  for (const m of hubHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const nodes = data?.["@graph"] ?? (Array.isArray(data) ? data : [data]);
    for (const n of nodes) {
      if (n?.["@type"] === "Product" && n.offers?.price != null) {
        hubPrices.push(Number(n.offers.price));
      }
      if (n?.["@type"] === "AggregateOffer" || n?.offers?.["@type"] === "AggregateOffer") {
        const agg = n["@type"] === "AggregateOffer" ? n : n.offers;
        const usd = [...priceById.values()];
        const lo = Math.min(...usd).toFixed(2);
        const hi = Math.max(...usd).toFixed(2);
        if (Number(agg.lowPrice).toFixed(2) !== lo || Number(agg.highPrice).toFixed(2) !== hi) {
          errors.push(
            `fiyat hub AggregateOffer ${agg.lowPrice}-${agg.highPrice} != PANEL ${lo}-${hi}`,
          );
        }
        if (Number(agg.offerCount) !== priceById.size) {
          errors.push(`fiyat hub offerCount ${agg.offerCount} != ${priceById.size}`);
        }
      }
    }
  }
  const expectedSet = [...priceById.values()].map((x) => x.toFixed(2)).sort();
  const hubSet = hubPrices.map((x) => x.toFixed(2)).sort();
  if (hubSet.length !== expectedSet.length || hubSet.join() !== expectedSet.join()) {
    errors.push(
      `fiyat hub Product prices [${hubSet.join(",")}] != PANEL_PRICES [${expectedSet.join(",")}]`,
    );
  }
} else {
  errors.push("missing out/tr/led-ekran-fiyatlari — run build first");
}

// Calculator embed indoorModules/outdoorModules ↔ PANEL_PRICES
const embedPath = path.join(root, "public/fiyat-hesap/index.html");
if (fs.existsSync(embedPath)) {
  const emb = fs.readFileSync(embedPath, "utf8");
  const indoorBlock = emb.match(/const indoorModules = \[([\s\S]*?)\];/)?.[1] ?? "";
  const outdoorBlock = emb.match(/const outdoorModules = \[([\s\S]*?)\];/)?.[1] ?? "";
  const parseMods = (block, use) =>
    [...block.matchAll(/\{\s*name:\s*"([^"]+)",\s*price:\s*([\d.]+)\s*\}/g)].map((m) => ({
      name: m[1],
      price: Number(m[2]),
      use,
    }));
  const embedMods = [...parseMods(indoorBlock, "ic"), ...parseMods(outdoorBlock, "dis")];
  if (embedMods.length !== priceRows.length) {
    errors.push(`fiyat-hesap modules ${embedMods.length} != PANEL_PRICES ${priceRows.length}`);
  }
  const used = new Set();
  for (const mod of embedMods) {
    const row = priceRows.find((p) => {
      if (p.use !== mod.use) return false;
      if (Math.abs(p.usd - mod.price) > 0.001) return false;
      const gob = Boolean(p.surface === "GOB") === /GOB/i.test(mod.name);
      const front = Boolean(p.frontService) === /ÖNDEN SERVİS|FRONT/i.test(mod.name);
      const pitchOk = mod.name.includes(p.pitch);
      return gob && front && pitchOk;
    });
    if (!row) {
      errors.push(`fiyat-hesap unmatched module ${mod.name} @ ${mod.price}`);
    } else if (used.has(row.id)) {
      errors.push(`fiyat-hesap duplicate match for ${row.id}`);
    } else {
      used.add(row.id);
    }
  }
  for (const p of priceRows) {
    if (!used.has(p.id)) errors.push(`fiyat-hesap missing PANEL ${p.id} (${p.usd})`);
  }

  // CALC_EXTRAS parity (labor/control/driver) if present in embed
  const labor = pricesSrc.match(/laborPerM2:\s*(\d+)/)?.[1];
  const control = pricesSrc.match(/controlCard:\s*(\d+)/)?.[1];
  const driver = pricesSrc.match(/driverSoftware:\s*(\d+)/)?.[1];
  for (const [label, val] of [
    ["laborPerM2", labor],
    ["controlCard", control],
    ["driverSoftware", driver],
  ]) {
    if (!val) continue;
    // embed may use different var names; require the numeric literal somewhere near cost formula
    if (!new RegExp(`[^\\d]${val}(?:\\.0+)?[^\\d]`).test(emb) && !emb.includes(val)) {
      errors.push(`fiyat-hesap missing CALC_EXTRAS ${label}=${val} literal`);
    }
  }
} else {
  errors.push("public/fiyat-hesap/index.html missing");
}

console.log(
  `Checked ${models.length} models (priced=${pricedChecked}, quote-only=${quoteChecked}, kontrol=${kontrolChecked}); catalog panels=${priceById.size}; fiyat hub + calculator parity`,
);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: Product Offer / image / catalog / fiyat-hub / calculator guards passed");
