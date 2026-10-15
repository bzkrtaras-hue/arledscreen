// Builds /search-index-tr.json and /search-index-en.json from the static export (out/).
// Self-hosted, no third-party code; consumed by src/components/search/SiteSearch.tsx.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] || "out");
const SKIP = /^(ara|search|hesaplayici-embed)(\/|$)/;
const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

for (const lang of ["tr", "en"]) {
  const root = path.join(OUT, lang);
  if (!fs.existsSync(root)) continue;
  const docs = [];
  for (const file of walk(root)) {
    const rel = path.relative(root, path.dirname(file)).split(path.sep).join("/");
    if (SKIP.test(rel)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
    const title = decode((html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "")
      .replace(/\s*[|—-]\s*ARLEDSCREEN\s*$/i, "")
      .trim();
    const desc = decode((html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [])[1] || "");
    const main = (html.match(/<main[\s\S]*?<\/main>/i) || [html])[0];
    const text = decode(
      main
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " "),
    )
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);
    if (!title) continue;
    docs.push({ u: `/${lang}/${rel ? rel + "/" : ""}`, t: title, d: desc, x: text });
  }
  docs.sort((a, b) => a.u.localeCompare(b.u));
  fs.writeFileSync(path.join(OUT, `search-index-${lang}.json`), JSON.stringify(docs));
  console.log(`✅ search-index-${lang}.json: ${docs.length} pages`);
}
