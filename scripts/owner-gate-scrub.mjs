/**
 * Shared scrubbers that remove owner-only / internal gate references from public
 * artefacts (text, JSON, XML/RSS, TSV, _headers, _redirects). Used by
 * postbuild-ai (ai.txt / security.txt at generation time) and strip-owner-gate.
 */
import { mentionsOwnerGate, isOwnerGateKey } from "./owner-gate-pattern.mjs";

export const DROP = Symbol("drop");
const URL_KEYS = ["@id", "url", "contentUrl", "href", "urlTemplate", "target", "sameAs"];

function balance(s) {
  for (const [o, c] of [["(", ")"], ["[", "]"]]) {
    const diff = s.split(o).length - s.split(c).length;
    if (diff > 0) s = s.replace(/[\s;,·—-]+$/u, "") + c.repeat(diff);
  }
  return s;
}

/** Drop sentence / bullet segments that mention an owner gate surface. */
export function scrubProse(s) {
  if (!mentionsOwnerGate(s)) return s;
  const parts = s.split(/(\s+·\s+|;\s+|(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ[(]))/u);
  const kept = [];
  for (let i = 0; i < parts.length; i += 2) {
    const seg = parts[i];
    const sep = parts[i + 1] ?? "";
    if (mentionsOwnerGate(seg)) continue;
    kept.push(seg, sep);
  }
  let out = kept.join("").replace(/(\s+·\s+|;\s+)$/u, "").trim();
  out = balance(out);
  if (mentionsOwnerGate(out)) return "";
  return out;
}

export function isUrlish(s) {
  return !/\s/.test(s.trim()) || /^https?:\/\/\S+$/.test(s.trim());
}

export function scrubJson(v) {
  if (typeof v === "string") {
    if (!mentionsOwnerGate(v)) return v;
    if (isUrlish(v)) return DROP;
    if (v.includes("\n")) {
      const lines = v.split("\n").map((l) => (mentionsOwnerGate(l) ? scrubProse(l) : l));
      const joined = lines.filter((l, i) => !(l === "" && mentionsOwnerGate(v.split("\n")[i]))).join("\n");
      return joined.trim() ? joined : DROP;
    }
    const out = scrubProse(v);
    return out ? out : DROP;
  }
  if (Array.isArray(v)) {
    return v.map(scrubJson).filter((x) => x !== DROP);
  }
  if (v && typeof v === "object") {
    for (const k of URL_KEYS) {
      if (typeof v[k] === "string" && mentionsOwnerGate(v[k]) && isUrlish(v[k])) return DROP;
    }
    const out = {};
    for (const [k, val] of Object.entries(v)) {
      if (isOwnerGateKey(k)) continue;
      if (k === "potentialAction" && mentionsOwnerGate(JSON.stringify(val))) continue;
      const s = scrubJson(val);
      if (s === DROP) continue;
      out[k] = s;
    }
    if (Array.isArray(out.itemListElement)) {
      if ("numberOfItems" in out) out.numberOfItems = out.itemListElement.length;
      out.itemListElement.forEach((it, i) => {
        if (it && typeof it === "object" && "position" in it) it.position = i + 1;
      });
    }
    return out;
  }
  return v;
}

export function scrubTextLines(text) {
  const lines = text.split("\n");
  const out = [];
  for (let l of lines) {
    // Owner tooling labels (owner-*-open / owner-*-handle) are not public facts:
    // keep the public social profiles under neutral labels, drop the rest.
    l = l
      .replace(/^owner-(linkedin|instagram|facebook|whatsapp)-open:/, "social-$1:")
      .replace(/^owner-(\w+)-handle:/, "social-$1-handle:");
    if (/^owner-[\w-]+:/.test(l)) continue;
    if (!mentionsOwnerGate(l)) {
      out.push(l);
      continue;
    }
    const m = l.match(/^(\s*(?:[-*]\s+|#+\s+|[A-Za-z][\w .()/-]{0,40}:\s+)?)(.*)$/u);
    const prefix = m ? m[1] : "";
    const body = m ? m[2] : l;
    if (mentionsOwnerGate(prefix)) continue;
    // Pure link / URL lines go entirely.
    if (isUrlish(body) || /^\[[^\]]*\]\([^)]*\)$/.test(body.trim())) continue;
    const s = scrubProse(body);
    if (s && s.length > 15 && !/^[\s(\[\])—·;:,.-]*$/.test(s)) out.push(prefix + s);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

export function scrubXml(text) {
  // sitemap <url> blocks
  text = text.replace(/<url>(?:(?!<\/url>)[\s\S])*?<\/url>\s*/g, (b) => (mentionsOwnerGate(b) ? "" : b));
  const out = [];
  for (const l of text.split("\n")) {
    if (!mentionsOwnerGate(l)) {
      out.push(l);
      continue;
    }
    const m = l.match(/^(\s*<([\w:]+)[^>]*>)([^<]*)(<\/\2>\s*)$/);
    if (m) {
      const inner = scrubProse(m[3]);
      if (inner) out.push(m[1] + inner + m[4]);
      continue;
    }
    // self-closing / attribute-only lines (atom:link etc.) are dropped
  }
  return out.join("\n");
}

export function scrubHeaders(text) {
  const lines = text.split("\n");
  const out = [];
  let skipBlock = false;
  for (const l of lines) {
    const isPath = l.length && !/^\s/.test(l) && !l.startsWith("#");
    if (isPath) {
      skipBlock = mentionsOwnerGate(l);
      if (skipBlock) continue;
      out.push(l);
      continue;
    }
    if (skipBlock && /^\s/.test(l)) continue;
    if (skipBlock && !l.trim()) skipBlock = false;
    if (!mentionsOwnerGate(l)) {
      out.push(l);
      continue;
    }
    const hm = l.match(/^(\s*Link:\s*)(.*)$/i);
    if (hm) {
      const entries = hm[2].split(/,\s*(?=<)/).filter((e) => !mentionsOwnerGate(e));
      if (entries.length) out.push(hm[1] + entries.join(", "));
      continue;
    }
    if (l.trim().startsWith("#")) continue;
    // Any other header line naming an owner surface: drop it.
  }
  return out.join("\n");
}

export function scrubDelimited(text, sep) {
  const lines = text.split("\n");
  const header = lines[0].split(sep);
  const rows = lines.slice(1).map((l) => l.split(sep));
  const drop = new Set();
  header.forEach((h, i) => {
    if (/point_?c|tur1a|owner_?(next|gate|p0)|geo_?(next|status)/i.test(h)) drop.add(i);
    if (rows.some((r) => mentionsOwnerGate(r[i] ?? ""))) drop.add(i);
  });
  const keep = (cells) => cells.filter((_, i) => !drop.has(i)).join(sep);
  return [keep(header), ...rows.map((r) => (r.length === 1 && r[0] === "" ? "" : keep(r)))].join("\n");
}

export function scrubRedirects(text) {
  return text
    .split("\n")
    .filter((l) => !mentionsOwnerGate(l))
    .join("\n");
}

