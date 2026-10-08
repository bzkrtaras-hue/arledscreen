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
  console.log("postbuild: out/_routes.json present (Function scoped via include)");
}

// robots.txt served by functions/robots.txt.js (no-store, bare Host).
const robotsOut = path.join("out", "robots.txt");
if (fs.existsSync(robotsOut)) {
  fs.rmSync(robotsOut);
  console.log("postbuild: removed out/robots.txt — Functions/robots.txt.js serves live");
}
const routesLive = JSON.parse(fs.readFileSync(path.join("out", "_routes.json"), "utf8"));
const include = routesLive.include || [];
if (!include.includes("/robots.txt")) {
  console.warn("postbuild: WARNING _routes.json include missing /robots.txt");
} else {
  console.log("postbuild: robots.txt → Pages Function (include /, /robots.txt)");
}
for (const route of ["/brand", "/modules"]) {
  if (!include.includes(route)) {
    console.warn(`postbuild: WARNING _routes.json include missing ${route} (asset-dir invent Function)`);
  }
}
if (include.includes("/brand") && include.includes("/modules")) {
  console.log("postbuild: /brand+/modules → Pages Functions (asset-dir invent aliases)");
}
