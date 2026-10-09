// Site audit 2026-10-09: the static 404 page inherits the root layout's
// "index, follow" robots meta next to Next's own "noindex". Keep a single
// robots meta (noindex) so crawlers get one clear signal.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const files = ["out/404.html", "out/404/index.html"].filter((f) => existsSync(f));
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const next = html.replace(/<meta name="robots" content="index, follow[^"]*"\/?>/g, "");
  if (next !== html) writeFileSync(f, next);
  const count = (next.match(/<meta name="robots"/g) || []).length;
  console.log(`✅ ${f}: ${count} robots meta (noindex)`);
}
