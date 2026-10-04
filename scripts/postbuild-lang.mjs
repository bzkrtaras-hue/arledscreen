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
