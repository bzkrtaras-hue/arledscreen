import { BLOG_POSTS } from "@/content/blog";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SEO_GUIDE_SLUGS } from "@/content/seo-guides";
import { INSTALL_GUIDE_SLUGS } from "@/content/install-guides";
import { PRODUCT_GROUPS } from "@/content/categories";
import { LED_MODELS, modelPath } from "@/content/models";
import { SERVICE_REGIONS } from "@/content/service-regions";
import { COMMERCIAL_EN_SLUGS, COMMERCIAL_PAGES } from "@/content/commercial-pages";
import { PROJECT_CASE_STUDIES } from "@/content/case-studies";
import { lastmodForUrl } from "@/lib/sitemap-lastmod";

export const dynamic = "force-static";

/**
 * Sitemap lists only indexable, self-canonical HTML URLs (no noindex bridges,
 * no machine files — those live in /sitemap-ai.xml, see src/content/sitemap-ai-paths.ts).
 * lastmod = git last-commit date of the page's route + content files (fallback: build date).
 * - TR: full site (products, models, bölgeler, blog, rehber…)
 * - EN: pages with real EN copy (home, about, hesaplayici, quote, yapay-zeka, rehber)
 * - Thin /en/products hub, /ar/* and /ru/* are omitted (no false language pairs).
 */

const TR_CORE: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/yapay-zeka/", priority: 0.95, changeFrequency: "weekly" },
  { path: "/rehber/", priority: 0.85, changeFrequency: "weekly" },
  { path: "/products/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hesaplayici/", priority: 0.75, changeFrequency: "weekly" },
  { path: "/quote/", priority: 0.8, changeFrequency: "weekly" },
];

/** EN routes that have dedicated English text (not a thin shell). */
const EN_CORE: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
}[] = [
  { path: "/", priority: 0.9, changeFrequency: "daily" },
  { path: "/yapay-zeka/", priority: 0.85, changeFrequency: "weekly" },
  { path: "/products/", priority: 0.88, changeFrequency: "weekly" },
  { path: "/rehber/", priority: 0.75, changeFrequency: "weekly" },
  { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/hesaplayici/", priority: 0.65, changeFrequency: "weekly" },
  { path: "/quote/", priority: 0.7, changeFrequency: "weekly" },
];

function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of TR_CORE) {
    const path = withTrailingSlash(route.path);
    entries.push({
      url: absoluteUrl(`/tr${path === "/" ? "/" : path}`),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }
  for (const slug of SEO_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/tr/rehber/${slug}/`),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }
  for (const slug of INSTALL_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/tr/rehber/${slug}/`),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const route of EN_CORE) {
    const path = withTrailingSlash(route.path);
    entries.push({
      url: absoluteUrl(`/en${path === "/" ? "/" : path}`),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }
  for (const slug of SEO_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/en/rehber/${slug}/`),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const slug of INSTALL_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/en/rehber/${slug}/`),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const g of PRODUCT_GROUPS) {
    entries.push({
      url: absoluteUrl(`/tr/products/${g.slug}/`),
      changeFrequency: "weekly",
      priority: 0.85,
    });
    // EN lean landings for AI inventable /en/products/<slug>/ paths (models stay TR-only).
    entries.push({
      url: absoluteUrl(`/en/products/${g.slug}/`),
      changeFrequency: "weekly",
      priority: 0.82,
    });
  }
  for (const m of LED_MODELS) {
    entries.push({
      url: absoluteUrl(modelPath(m)),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const page of COMMERCIAL_PAGES) {
    entries.push({
      url: absoluteUrl(`/tr/${page.slug}/`),
      changeFrequency: "weekly",
      priority: page.cluster === "intent" ? 0.95 : page.cluster === "use" ? 0.88 : 0.86,
    });
  }
  for (const c of PROJECT_CASE_STUDIES) {
    entries.push({
      url: absoluteUrl(`/tr/projelerimiz/${c.slug}/`),
      changeFrequency: "monthly",
      priority: 0.72,
    });
  }
  for (const path of [
    "/hizmetler/",
    "/bolgeler/",
    "/projelerimiz/",
    "/galeri/",
    "/about/aras-bozkurt/",
    "/rehber/piksel-araligi-secimi/",
    "/rehber/led-tabela-mi-led-ekran-mi/",
    "/rehber/kiralik-mi-satin-alma/",
    "/rehber/gob-vs-smd/",
  ]) {
    entries.push({
      url: absoluteUrl(`/tr${path}`),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }
  // EN hubs AI agents invent from TR path shapes (services / regions / founder / projects).
  for (const path of [
    "/hizmetler/",
    "/bolgeler/",
    "/about/aras-bozkurt/",
    "/projelerimiz/",
    "/galeri/",
    "/blog/",
    "/gizlilik/",
  ] as const) {
    entries.push({
      url: absoluteUrl(`/en${path}`),
      changeFrequency: "monthly",
      priority: path.includes("about")
        ? 0.8
        : path.includes("blog") || path.includes("gizlilik")
          ? 0.4
          : path.includes("projeler")
            ? 0.86
            : 0.85,
    });
  }
  // TR privacy (EN twin emitted above with /gizlilik/).
  entries.push({
    url: absoluteUrl("/tr/gizlilik/"),
    changeFrequency: "yearly",
    priority: 0.35,
  });
  // EN lean commercial guides (AI agents invent these TR rehber paths under /en/).
  for (const path of [
    "/rehber/piksel-araligi-secimi/",
    "/rehber/led-tabela-mi-led-ekran-mi/",
    "/rehber/kiralik-mi-satin-alma/",
    "/rehber/gob-vs-smd/",
  ] as const) {
    entries.push({
      url: absoluteUrl(`/en${path}`),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  // Brand + intent + price + FAQ hubs: TR + EN (EN agents previously hit 404 on these paths).
  // /tr/led-ekran/ is also emitted via COMMERCIAL_PAGES — skip duplicate TR entry here.
  for (const locale of ["tr", "en"] as const) {
    for (const path of ["/nxtionstar/", "/led-ekran-fiyatlari/", "/sss/"] as const) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
          changeFrequency: "weekly",
        priority: path.includes("fiyat") ? 0.92 : path.includes("sss") ? 0.88 : 0.9,
      });
    }
  }
  entries.push({
    url: absoluteUrl("/en/led-ekran/"),
    changeFrequency: "weekly",
    priority: 0.95,
  });
  // Remaining commercial EN hubs (intent + high-invent use/pitch) — agents previously 404'd.
  for (const slug of COMMERCIAL_EN_SLUGS) {
    entries.push({
      url: absoluteUrl(`/en/${slug}/`),
      changeFrequency: "weekly",
      priority: 0.93,
    });
  }
  // Blog kept as secondary trust content — not the commercial SEO cluster.
  entries.push({
    url: absoluteUrl("/tr/blog/"),
    changeFrequency: "monthly",
    priority: 0.45,
  });
  for (const p of BLOG_POSTS) {
    entries.push({
      url: absoluteUrl(`/tr/blog/${p.slug}/`),
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }
  for (const region of SERVICE_REGIONS) {
    entries.push({
      url: absoluteUrl(`/tr/bolgeler/${region.slug}/`),
      changeFrequency: "monthly",
      priority: region.isHq ? 0.9 : 0.75,
    });
  }

  return entries.map((e) => ({ ...e, lastModified: lastmodForUrl(e.url) }));
}
