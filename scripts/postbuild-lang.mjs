// Static export has a single root <html lang="tr">; set the correct lang/dir per locale folder.
import fs from "node:fs";
import path from "node:path";
const map = { en: 'lang="en"', ar: 'lang="ar" dir="rtl"', ru: 'lang="ru"' };
let n = 0;
const walk = (d, attr) => {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, attr);
    else if (e.name.endsWith(".html")) {
      const s = fs.readFileSync(p, "utf8");
      const t = s.replace(/<html lang="tr"/, `<html ${attr}`);
      if (t !== s) { fs.writeFileSync(p, t); n++; }
    }
  }
};
for (const [loc, attr] of Object.entries(map)) walk(path.join("out", loc), attr);
console.log(`postbuild-lang: updated ${n} files`);

// Safety net: never ship server/config/dev artefacts in the static export.
const BLOCK = [/^\.htaccess$/, /^\.env/, /\.map$/, /^package(-lock)?\.json$/, /\.(zip|bak|orig|log)$/i, /^\.DS_Store$/];
let removed = 0;
const sweep = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) sweep(p);
    else if (BLOCK.some((r) => r.test(e.name))) { fs.rmSync(p); removed++; console.log(`postbuild: removed ${path.relative("out", p)}`); }
  }
};
if (fs.existsSync("out")) sweep("out");
console.log(`postbuild: blocked artefacts removed: ${removed}`);

// Cloudflare Pages serves static assets BEFORE _redirects / Functions.
// A root index.html (old AR-LED meta-refresh stub) caused HTTP 200 at /
// instead of absolute 301 to https://arledscreen.com/tr/. Never ship it.
// llms.txt / robots.txt / sitemap.xml / _routes.json are untouched.
const rootIndex = path.join("out", "index.html");
if (fs.existsSync(rootIndex)) {
  fs.rmSync(rootIndex);
  console.log("postbuild: removed out/index.html so apex can 301 → https://arledscreen.com/tr/");
} else {
  console.log("postbuild: out/index.html already absent (apex 301 ready)");
}
const routesJson = path.join("out", "_routes.json");
if (!fs.existsSync(routesJson)) {
  console.warn("postbuild: WARNING out/_routes.json missing — root Function may run on all paths");
} else {
  console.log("postbuild: out/_routes.json present (Function scoped to /; AI static paths excluded)");
  const routes = JSON.parse(fs.readFileSync(routesJson, "utf8"));
  const exclude = routes.exclude || [];
  for (const need of ["/entity.json", "/entity-profiles.json", "/catalog.json", "/.well-known/*", "/feeds/*"]) {
    if (!exclude.includes(need)) {
      console.warn(`postbuild: WARNING _routes.json exclude missing ${need}`);
    }
  }
}

/** AI alışveriş static artefacts must land in out/ (CF Pages static before Functions). */
const AI_STATIC = [
  "entity.json",
  "entity-profiles.json",
  "catalog.json",
  "llms.txt",
  "llms-full.txt",
  path.join(".well-known", "ard.json"),
  path.join("feeds", "merchant-priced-panels.tsv"),
  "_headers",
  "_routes.json",
];
const missingAi = [];
for (const rel of AI_STATIC) {
  if (!fs.existsSync(path.join("out", rel))) missingAi.push(rel);
}
if (missingAi.length) {
  console.error(`postbuild: FAIL missing AI static artefacts in out/: ${missingAi.join(", ")}`);
  process.exit(1);
}
const headersOut = fs.readFileSync(path.join("out", "_headers"), "utf8");
if (!/\/entity-profiles\.json[\s\S]*?Access-Control-Allow-Origin:\s*\*/.test(headersOut)) {
  console.error("postbuild: FAIL out/_headers missing entity-profiles CORS");
  process.exit(1);
}
const entityOut = JSON.parse(fs.readFileSync(path.join("out", "entity.json"), "utf8"));
if (!entityOut.entityProfilesJson?.includes("/entity-profiles.json")) {
  console.error("postbuild: FAIL out/entity.json missing entityProfilesJson");
  process.exit(1);
}
console.log("postbuild: AI static artefacts OK (entity/catalog/ard/profiles/llms/feed + CORS)");

