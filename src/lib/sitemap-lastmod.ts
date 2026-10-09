import fs from "node:fs";
import path from "node:path";
import { gitLastmod } from "@/lib/git-lastmod";
import { SITE_URL } from "@/lib/site";

/**
 * Map a sitemap URL to the source/content files that render it, so lastmod reflects
 * the last real change to that page (git commit date), not the build date.
 */
const APP = "src/app/[locale]";

/** Content modules per first path segment (locale stripped). */
const CONTENT_BY_SECTION: Record<string, string[]> = {
  "": ["src/content/seo.ts", "src/content/products.ts", "src/content/references.ts"],
  products: [
    "src/content/categories.ts",
    "src/content/models.ts",
    "src/content/prices.ts",
    "src/content/control-products.ts",
    "src/content/product-groups-en.ts",
    "src/content/en-product-group-bridges.ts",
    "src/content/product-lineup.ts",
  ],
  rehber: ["src/content/seo-guides.ts", "src/content/commercial-guides-en.ts"],
  blog: ["src/content/blog.ts"],
  bolgeler: ["src/content/service-regions.ts"],
  projelerimiz: ["src/content/case-studies.ts", "src/content/references.ts"],
  galeri: ["src/content/references.ts", "src/content/yiyistar-gallery.ts"],
  sss: ["src/content/sss.json", "src/content/faqs.ts"],
  "led-ekran-fiyatlari": ["src/content/prices.ts"],
  hesaplayici: ["src/content/prices.ts", "src/content/seo.ts"],
  about: ["src/content/seo.ts", "src/content/trust.ts"],
  quote: ["src/content/seo.ts"],
  "yapay-zeka": ["src/content/seo.ts"],
  nxtionstar: ["src/content/prices.ts"],
  malzemeler: ["src/content/materials.ts", "src/content/materials-data.ts", "src/content/prices.ts"],
};

function exists(rel: string): boolean {
  return fs.existsSync(path.join(process.cwd(), rel));
}

/** Resolve the App Router page file for a locale-stripped path (static dir first, then dynamic). */
function routeFiles(segs: string[]): string[] {
  let dir = APP;
  for (const seg of segs) {
    const staticDir = `${dir}/${seg}`;
    if (exists(staticDir)) {
      dir = staticDir;
      continue;
    }
    const dyn = ["[slug]", "[model]"].map((d) => `${dir}/${d}`).find(exists);
    if (!dyn) break;
    dir = dyn;
  }
  return [`${dir}/page.tsx`];
}

export function lastmodForUrl(url: string): Date {
  const pathname = url.replace(SITE_URL, "").replace(/^https?:\/\/[^/]+/, "");
  const segs = pathname.split("/").filter(Boolean);
  const rest = segs[0] === "tr" || segs[0] === "en" ? segs.slice(1) : segs;
  const files = new Set<string>(routeFiles(rest));
  const section = rest[0] ?? "";
  const sectionFiles = CONTENT_BY_SECTION[section];
  if (sectionFiles) sectionFiles.forEach((f) => files.add(f));
  // Commercial landings (/tr/<slug>/ rendered by [slug]/page.tsx).
  if (rest.length === 1 && !exists(`${APP}/${rest[0]}`)) {
    files.add("src/content/commercial-pages.ts");
  }
  if (section === "rehber" && rest[1]) files.add(`src/content/articles/${rest[1]}.md`);
  return gitLastmod([...files]);
}
