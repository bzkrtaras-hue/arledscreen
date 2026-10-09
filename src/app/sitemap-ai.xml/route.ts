import { absoluteUrl } from "@/lib/site";
import { AI_SITEMAP_PATHS } from "@/content/sitemap-ai-paths";
import { gitLastmod } from "@/lib/git-lastmod";

export const dynamic = "force-static";

/**
 * /sitemap-ai.xml — AI/GEO discovery sitemap (machine-readable feeds + noindex invent
 * bridges). Referenced from robots.txt next to /sitemap.xml. Search-engine sitemap
 * (/sitemap.xml) stays HTML-only and indexable-only.
 */
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET(): Response {
  // AI artefacts are regenerated from these sources on every build.
  const lastmod = gitLastmod([
    "src/content/prices.ts",
    "src/content/sitemap-ai-paths.ts",
    "scripts/postbuild-ai.mjs",
    "public/llms.txt",
    "public/entity.json",
    "public/ai-shopping.json",
  ]).toISOString();
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    AI_SITEMAP_PATHS.map(
      (p) =>
        `<url>\n<loc>${esc(absoluteUrl(p))}</loc>\n<lastmod>${lastmod}</lastmod>\n<changefreq>weekly</changefreq>\n<priority>0.55</priority>\n</url>\n`,
    ).join("") +
    "</urlset>\n";
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
