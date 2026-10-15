/**
 * Homepage LCP: inline above-the-fold critical CSS, async the full Tailwind
 * bundle, and demote the heavy shared JS chunk so it does not contend with
 * the hero image. Chat widget and MailerLite stay lazyOnload (untouched).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const TARGETS = ["tr/index.html", "en/index.html"];

function escapeTw(c) {
  let out = "";
  for (const ch of c) {
    if (/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/.test(ch)) out += `\\${ch}`;
    else out += ch;
  }
  return out;
}

function collectAboveFoldClasses(html) {
  const body = html.split(/<body\b/i)[1] || html;
  const classes = new Set([
    "min-h-screen",
    "bg-bg",
    "font-sans",
    "antialiased",
    "has-mobile-cta",
    "flex",
    "flex-col",
    "flex-1",
    "fixed",
    "inset-x-0",
    "top-0",
    "z-50",
    "pointer-events-none",
    "pointer-events-auto",
    "relative",
    "pt-[7.25rem]",
    "md:pt-[8rem]",
  ]);
  const hero = body.match(
    /<section[^>]*aria-labelledby="home-h1"[\s\S]*?<\/section>/,
  );
  if (hero) {
    for (const m of hero[0].matchAll(/class="([^"]*)"/g)) {
      for (const c of m[1].split(/\s+/)) if (c) classes.add(c);
    }
  }
  const wrap = body.match(
    /class="([^"]*-mt-\[[^"]*rem\][^"]*)"/,
  );
  if (wrap) for (const c of wrap[1].split(/\s+/)) if (c) classes.add(c);
  return classes;
}

function ruleMatches(selector, escaped, alwaysRe) {
  if (alwaysRe.test(selector)) return true;
  for (const esc of escaped) {
    if (selector.includes(`.${esc}`)) return true;
  }
  return false;
}

function extractCritical(css, classes) {
  const escaped = [...classes].map(escapeTw);
  const alwaysRe =
    /^(?::root|html|body|\*)|\.font-display|\.bg-bg|\.font-sans|\.antialiased|\.liquid-glass|\.skip-link|\.has-mobile-cta/;
  const critical = [];
  const n = css.length;
  let i = 0;

  const takeBlock = (startBrace) => {
    let depth = 1;
    let t = startBrace + 1;
    while (t < n && depth) {
      if (css[t] === "{") depth++;
      else if (css[t] === "}") depth--;
      t++;
    }
    return t;
  };

  while (i < n) {
    if (css.startsWith("@media", i) || css.startsWith("@supports", i)) {
      const brace = css.indexOf("{", i);
      if (brace < 0) break;
      const end = takeBlock(brace);
      const inner = css.slice(brace + 1, end - 1);
      const kept = [];
      let k = 0;
      while (k < inner.length) {
        if (inner[k] === "@") {
          const b = inner.indexOf("{", k);
          if (b < 0) break;
          let d = 1;
          let t = b + 1;
          while (t < inner.length && d) {
            if (inner[t] === "{") d++;
            else if (inner[t] === "}") d--;
            t++;
          }
          k = t;
          continue;
        }
        const b = inner.indexOf("{", k);
        if (b < 0) break;
        const sel = inner.slice(k, b).trim();
        let d = 1;
        let t = b + 1;
        while (t < inner.length && d) {
          if (inner[t] === "{") d++;
          else if (inner[t] === "}") d--;
          t++;
        }
        const body = inner.slice(b, t);
        if (sel && ruleMatches(sel, escaped, alwaysRe)) kept.push(sel + body);
        k = t;
      }
      if (kept.length) {
        critical.push(css.slice(i, brace + 1) + kept.join("") + "}");
      }
      i = end;
      continue;
    }
    if (css[i] === "@") {
      const brace = css.indexOf("{", i);
      if (brace < 0) break;
      i = takeBlock(brace);
      continue;
    }
    const brace = css.indexOf("{", i);
    if (brace < 0) break;
    const sel = css.slice(i, brace).trim();
    const end = takeBlock(brace);
    const body = css.slice(brace, end);
    if (sel && ruleMatches(sel, escaped, alwaysRe)) critical.push(sel + body);
    i = end;
  }
  return critical.join("");
}

function findCssFiles() {
  const dir = join(OUT, "_next/static/css");
  if (!existsSync(dir)) return { fontCss: null, mainCss: null };
  const files = readdirSync(dir).filter((f) => f.endsWith(".css"));
  let fontCss = null;
  let mainCss = null;
  for (const f of files) {
    const p = join(dir, f);
    const size = readFileSync(p).length;
    const rel = `/_next/static/css/${f}`;
    if (size < 8000) fontCss = { rel, path: p, size };
    else mainCss = { rel, path: p, size };
  }
  return { fontCss, mainCss };
}

function asyncStylesheet(href) {
  // media=print avoids VeryHigh contention with the LCP image; swap to all on load.
  return (
    `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"/>` +
    `<noscript><link rel="stylesheet" href="${href}"/></noscript>`
  );
}

function processHtml(fileRel, mainCss, fontCss) {
  const path = join(OUT, fileRel);
  if (!existsSync(path)) return null;
  let html = readFileSync(path, "utf8");
  if (!html.includes('aria-labelledby="home-h1"')) {
    return { file: fileRel, skipped: "not quiet-hero home" };
  }

  const classes = collectAboveFoldClasses(html);
  const fullCss = readFileSync(mainCss.path, "utf8");
  let critical = extractCritical(fullCss, classes);
  // Tiny safety net so hero paints navy even if a utility was missed.
  critical +=
    'section[aria-labelledby="home-h1"]{position:relative;display:flex;min-height:88vh;min-height:88svh;align-items:flex-end;overflow:hidden;background:#0B1B33;color:#F2F5FA}' +
    'section[aria-labelledby="home-h1"] img{position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:50% 30%}';

  // Replace render-blocking main CSS link(s).
  const cssLinkRe =
    /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+)"[^>]*>/g;
  let replaced = 0;
  html = html.replace(cssLinkRe, (full, href) => {
    // Async both font-face and Tailwind — critical CSS + system-ui cover first paint.
    replaced++;
    return asyncStylesheet(href);
  });

  // Demote shared framework chunk (1255-*.js) — still loads, lower priority vs LCP.
  html = html.replace(
    /<script src="(\/_next\/static\/chunks\/1255-[^"]+)" async="">/g,
    '<script src="$1" async="" fetchpriority="low">',
  );

  // Inline critical CSS as early as possible after charset/viewport preloads.
  const styleTag = `<style data-href="critical-home">${critical}</style>`;
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${styleTag}</head>`);
  } else {
    html = styleTag + html;
  }

  writeFileSync(path, html);
  return {
    file: fileRel,
    criticalBytes: critical.length,
    classes: classes.size,
    cssAsync: replaced,
  };
}

const { fontCss, mainCss } = findCssFiles();
if (!mainCss) {
  console.log("postbuild-home-lcp: no main CSS found, skip");
  process.exit(0);
}

const results = [];
for (const t of TARGETS) {
  const r = processHtml(t, mainCss, fontCss);
  if (r) results.push(r);
}
console.log(
  JSON.stringify(
    { mainCss: mainCss.rel, fontCss: fontCss?.rel ?? null, results },
    null,
    2,
  ),
);
