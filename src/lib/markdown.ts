import fs from "node:fs";
import path from "node:path";

/** Minimal Markdown → HTML for our own trusted article drafts (headings, lists, tables, bold, links). */
export interface ArticleFaq {
  question: string;
  answer: string;
}
export interface Article {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lastReviewed: string;
  html: string;
  faqs: ArticleFaq[];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(s: string): string {
  let t = esc(s);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt: string, href: string) => {
    const ext = /^https?:/.test(href);
    return `<a href="${href}" class="font-semibold text-cyan hover:underline"${ext && !href.startsWith("https://fiyat.arledscreen.com") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${txt}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  return t;
}
const slugify = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^---\s*$/.test(l)) { out.push('<hr class="my-8 border-border" />'); i++; continue; }
    const h = /^(#{2,4})\s+(.*)$/.exec(l);
    if (h) {
      const lvl = h[1].length;
      const cls = lvl === 2 ? "mt-10 mb-3 font-display text-xl font-bold text-ink sm:text-2xl" : "mt-6 mb-2 font-display text-lg font-bold text-ink";
      out.push(`<h${lvl} id="${slugify(h[2])}" class="scroll-mt-28 ${cls}">${inline(h[2])}</h${lvl}>`);
      i++; continue;
    }
    if (/^#\s/.test(l)) { i++; continue; } // H1 rendered by the page
    if (/^\|/.test(l)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        if (!/^\|[\s:|-]+\|\s*$/.test(lines[i])) rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        i++;
      }
      const [head, ...body] = rows;
      out.push(
        `<div class="my-5 overflow-x-auto rounded-2xl border border-border bg-white"><table class="w-full min-w-[480px] text-left text-sm"><thead><tr class="border-b border-border text-xs uppercase tracking-[0.06em] text-ink-muted">${head.map((c) => `<th scope="col" class="px-4 py-3">${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r, ri) => `<tr${ri % 2 ? ' class="bg-band/60"' : ""}>${r.map((c, ci) => (ci === 0 ? `<th scope="row" class="px-4 py-2.5 font-semibold text-ink">${inline(c)}</th>` : `<td class="px-4 py-2.5 tabular-nums text-ink-soft">${inline(c)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`,
      );
      continue;
    }
    if (/^(\d+\.|-)\s/.test(l)) {
      const ordered = /^\d+\./.test(l);
      const items: string[] = [];
      while (i < lines.length && /^(\d+\.|-)\s/.test(lines[i])) { items.push(lines[i].replace(/^(\d+\.|-)\s+/, "")); i++; }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag} class="my-4 ${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-6 leading-relaxed text-ink-soft">${items.map((x) => `<li>${inline(x)}</li>`).join("")}</${tag}>`);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\||---\s*$|\d+\.\s|-\s)/.test(lines[i])) { para.push(lines[i]); i++; }
    if (para.length === 2 && /^\*\*.+\*\*$/.test(para[0].trim())) {
      out.push(`<h3 class="mt-6 mb-1.5 font-display text-base font-bold text-ink">${inline(para[0].trim().replace(/^\*\*|\*\*$/g, ""))}</h3><p class="leading-relaxed text-ink-soft">${inline(para[1])}</p>`);
    } else {
      out.push(`<p class="my-4 leading-[1.75] text-ink-soft">${inline(para.join(" "))}</p>`);
    }
  }
  return out.join("\n");
}

function faqsFrom(md: string): ArticleFaq[] {
  const m = /##\s+\d+\.\s+Sık sorulan sorular\n([\s\S]*?)(\n---|\n## |$)/.exec(md);
  if (!m) return [];
  const faqs: ArticleFaq[] = [];
  const re = /\*\*(.+?)\*\*\n(.+)/g;
  let x: RegExpExecArray | null;
  while ((x = re.exec(m[1]))) faqs.push({ question: x[1].trim(), answer: x[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "").trim() });
  return faqs;
}

const DIR = path.join(process.cwd(), "src/content/articles");
export const ARTICLE_SLUGS = [
  "led-ekran-fiyatlari",
  "piksel-araligi-secimi",
  "led-tabela-mi-led-ekran-mi",
  "kiralik-mi-satin-alma",
] as const;

export function getArticle(slug: string): Article {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(raw);
  const meta: Record<string, string> = {};
  for (const line of (fm?.[1] ?? "").split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^"|"$/g, "");
  }
  const body = fm ? raw.slice(fm[0].length) : raw;
  return {
    slug,
    title: meta.title,
    description: meta.meta_description,
    h1: meta.h1,
    lastReviewed: meta.last_reviewed ?? "2026-10-01",
    html: mdToHtml(body),
    faqs: faqsFrom(body),
  };
}
