/**
 * Product-group image + alt-text guard (AI shopping / GEO).
 *
 * Checks PRODUCT_GROUPS (+ CONTROL_GROUPS via categories.ts) and LED_MODELS:
 * - image / cardImage / techGallery src files exist under public/
 * - imageAlt (and gallery alt) non-empty, ≥ 24 chars, not generic placeholders
 * - Focus groups (şeffaf / transparan / poster) must have distinct alts and
 *   ≥1 gallery or card shot when declared
 *
 * Run: node scripts/audit-product-images.mjs
 * Optional: npm run audit:images (after build, also checks out/ schema image URLs)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const categoriesSrc = fs.readFileSync(path.join(root, "src/content/categories.ts"), "utf8");
const controlSrc = fs.readFileSync(path.join(root, "src/content/control-products.ts"), "utf8");
const modelsSrc = fs.readFileSync(path.join(root, "src/content/models.ts"), "utf8");
const combined = `${categoriesSrc}\n${controlSrc}`;

const FOCUS = new Set(["seffaf-led-ekran", "transparan-led-ekran", "poster-led-ekran"]);
const BAD_ALT = /^(image|görsel|photo|led|ürün|product)$/i;

/** @type {{slug:string,image?:string,imageAlt?:string,cardImage?:string,gallery:{src:string,alt:string}[]}[]} */
const groups = [];
const groupRe =
  /\{\s*slug:\s*"([^"]+)",[\s\S]*?(?=\n  \{\s*slug:|\n];\s*\n\nexport |\n];\s*$)/g;
for (const m of combined.matchAll(groupRe)) {
  const body = m[0];
  const slug = m[1];
  const image = body.match(/\n\s*image:\s*"([^"]+)"/)?.[1];
  const imageAlt = body.match(/\n\s*imageAlt:\s*"([^"]+)"/)?.[1];
  const cardImage = body.match(/\n\s*cardImage:\s*"([^"]+)"/)?.[1];
  const gallery = [];
  for (const g of body.matchAll(/\{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)"/g)) {
    gallery.push({ src: g[1], alt: g[2] });
  }
  groups.push({ slug, image, imageAlt, cardImage, gallery });
}

function publicExists(rel) {
  if (!rel || !rel.startsWith("/")) return false;
  return fs.existsSync(path.join(root, "public", rel.replace(/^\//, "")));
}

function checkAlt(label, alt) {
  if (!alt || !alt.trim()) {
    errors.push(`${label}: missing alt`);
    return;
  }
  if (alt.trim().length < 24) {
    errors.push(`${label}: alt too short (${alt.trim().length} < 24): "${alt}"`);
  }
  if (BAD_ALT.test(alt.trim())) {
    errors.push(`${label}: generic alt "${alt}"`);
  }
}

let checked = 0;
for (const g of groups) {
  checked += 1;
  if (!g.image) {
    errors.push(`${g.slug}: missing image`);
    continue;
  }
  if (!publicExists(g.image)) errors.push(`${g.slug}: missing file ${g.image}`);
  checkAlt(`${g.slug} imageAlt`, g.imageAlt);
  if (g.cardImage) {
    if (!publicExists(g.cardImage)) errors.push(`${g.slug}: missing cardImage ${g.cardImage}`);
  }
  for (const shot of g.gallery) {
    if (!publicExists(shot.src)) errors.push(`${g.slug}: missing gallery ${shot.src}`);
    checkAlt(`${g.slug} gallery`, shot.alt);
  }
  if (FOCUS.has(g.slug)) {
    if (!g.imageAlt || !/(şeffaf|transparan|poster|totem|mesh|vitrin|film)/i.test(g.imageAlt)) {
      errors.push(`${g.slug}: focus alt should name product form (şeffaf/transparan/poster/totem/…)`);
    }
    if (g.slug === "seffaf-led-ekran") {
      if (!g.gallery.some((x) => x.src.includes("seffaf-led-film"))) {
        errors.push(`${g.slug}: expected seffaf-led-film in techGallery`);
      }
      if (!g.image.includes("seffaf-led-vitrin")) {
        errors.push(`${g.slug}: hero should be seffaf-led-vitrin`);
      }
    }
    if (g.slug === "transparan-led-ekran" && !g.image.includes("transparan-led-cephe")) {
      errors.push(`${g.slug}: hero should be transparan-led-cephe`);
    }
    if (g.slug === "poster-led-ekran") {
      if (!g.cardImage?.includes("led-poster-totems") && !g.gallery.some((x) => x.src.includes("led-poster-totems"))) {
        errors.push(`${g.slug}: expected led-poster-totems on card or gallery`);
      }
    }
  }
}

// Model images + alts
const modelRe = /\{\s*slug:\s*"([^"]+)",\s*group:\s*"([^"]+)"([\s\S]*?)(?=\n  \{\s*slug:|\n];)/g;
let modelChecked = 0;
for (const m of modelsSrc.matchAll(modelRe)) {
  modelChecked += 1;
  const slug = m[1];
  const group = m[2];
  const body = m[3];
  const image = body.match(/image:\s*"([^"]+)"/)?.[1];
  const imageAlt = body.match(/imageAlt:\s*"([^"]+)"/)?.[1];
  if (!image || !publicExists(image)) errors.push(`model ${group}/${slug}: missing ${image}`);
  checkAlt(`model ${group}/${slug}`, imageAlt);
}

// Built pages: Service/Product schema image must be absolute and non-empty (if out/ present)
const outRoot = path.join(root, "out/tr/products");
if (fs.existsSync(outRoot)) {
  for (const slug of FOCUS) {
    const file = path.join(outRoot, slug, "index.html");
    if (!fs.existsSync(file)) {
      errors.push(`built page missing: ${slug}`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    for (const sm of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      let data;
      try {
        data = JSON.parse(sm[1]);
      } catch {
        continue;
      }
      if (data?.["@type"] === "Service") {
        if (!data.image || !String(data.image).startsWith("https://arledscreen.com/")) {
          errors.push(`${slug}: Service.image not absolute canonical`);
        }
      }
    }
    if (!html.includes('alt="') || html.match(/alt=""/)) {
      warnings.push(`${slug}: check empty alt attributes`);
    }
  }
} else {
  warnings.push("out/tr/products missing — schema image URL check skipped (run after build)");
}

console.log(
  `Checked ${checked} product groups + ${modelChecked} models; focus=${[...FOCUS].join(",")}`,
);
for (const w of warnings) console.warn(`WARN: ${w}`);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: product image + alt guards passed");
