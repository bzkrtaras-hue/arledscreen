import { BLOG_POSTS } from "@/content/blog";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SEO_GUIDE_SLUGS } from "@/content/seo-guides";
import { PRODUCT_GROUPS } from "@/content/categories";
import { LED_MODELS, modelPath } from "@/content/models";
import { SERVICE_REGIONS } from "@/content/service-regions";
import { COMMERCIAL_PAGES } from "@/content/commercial-pages";
import { PROJECT_CASE_STUDIES } from "@/content/case-studies";

export const dynamic = "force-static";

/**
 * Sitemap lists only indexable, substantive URLs.
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
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const entries: MetadataRoute.Sitemap = [];

  for (const route of TR_CORE) {
    const path = withTrailingSlash(route.path);
    entries.push({
      url: absoluteUrl(`/tr${path === "/" ? "/" : path}`),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }
  for (const slug of SEO_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/tr/rehber/${slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const route of EN_CORE) {
    const path = withTrailingSlash(route.path);
    entries.push({
      url: absoluteUrl(`/en${path === "/" ? "/" : path}`),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }
  for (const slug of SEO_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/en/rehber/${slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const g of PRODUCT_GROUPS) {
    entries.push({
      url: absoluteUrl(`/tr/products/${g.slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }
  for (const m of LED_MODELS) {
    entries.push({
      url: absoluteUrl(modelPath(m)),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const page of COMMERCIAL_PAGES) {
    entries.push({
      url: absoluteUrl(`/tr/${page.slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: page.cluster === "intent" ? 0.95 : page.cluster === "use" ? 0.88 : 0.86,
    });
  }
  entries.push({
    url: absoluteUrl("/tr/led-ekran-fiyatlari/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.96,
  });
  for (const c of PROJECT_CASE_STUDIES) {
    entries.push({
      url: absoluteUrl(`/tr/projelerimiz/${c.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.72,
    });
  }
  for (const path of [
    "/hizmetler/",
    "/bolgeler/",
    "/projelerimiz/",
    "/galeri/",
    "/sss/",
    "/nxtionstar/",
    "/about/aras-bozkurt/",
    "/rehber/piksel-araligi-secimi/",
    "/rehber/led-tabela-mi-led-ekran-mi/",
    "/rehber/kiralik-mi-satin-alma/",
    "/rehber/gob-vs-smd/",
  ]) {
    entries.push({
      url: absoluteUrl(`/tr${path}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }
  // Blog kept as secondary trust content — not the commercial SEO cluster.
  entries.push({
    url: absoluteUrl("/tr/blog/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.45,
  });
  for (const p of BLOG_POSTS) {
    entries.push({
      url: absoluteUrl(`/tr/blog/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }
  for (const region of SERVICE_REGIONS) {
    entries.push({
      url: absoluteUrl(`/tr/bolgeler/${region.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: region.isHq ? 0.9 : 0.75,
    });
  }

  // Machine-readable AI / GEO discovery surfaces
  for (const path of [
    "/ai-shopping.json",
    "/catalog.json",
    "/entity.json",
    "/entity-profiles.json",
    "/llms.txt",
    "/llms-full.txt",
    "/.well-known/ard.json",
    "/feeds/merchant-priced-panels.tsv",
  ]) {
    entries.push({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.55,
    });
  }

  return entries;
}
