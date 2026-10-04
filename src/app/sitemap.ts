import { BLOG_POSTS } from "@/content/blog";
import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { SEO_GUIDE_SLUGS } from "@/content/seo-guides";
import { PRODUCT_GROUPS } from "@/content/categories";
import { LED_MODELS, modelPath } from "@/content/models";

export const dynamic = "force-static";

const routes: {
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

function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    // ar/ru guides mirror the English text and canonicalise to /en/ (not listed).
    const hasOwnGuides = locale === "tr" || locale === "en";
    for (const route of routes) {
      if (!hasOwnGuides && route.path === "/rehber/") continue;
      const path = withTrailingSlash(route.path);
      entries.push({
        url: absoluteUrl(`/${locale}${path === "/" ? "/" : path}`),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
    for (const slug of hasOwnGuides ? SEO_GUIDE_SLUGS : []) {
      entries.push({
        url: absoluteUrl(`/${locale}/rehber/${slug}/`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }
  // Turkish-only pages
  for (const g of PRODUCT_GROUPS) {
    entries.push({
      url: absoluteUrl(`/tr/products/${g.slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }
  for (const m of LED_MODELS) {
    entries.push({ url: absoluteUrl(modelPath(m)), lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const path of [
    "/hizmetler/",
    "/projelerimiz/",
    "/sss/",
    "/nxtionstar/",
    "/rehber/led-ekran-fiyatlari/",
    "/rehber/piksel-araligi-secimi/",
    "/rehber/led-tabela-mi-led-ekran-mi/",
    "/blog/",
    ...BLOG_POSTS.map((p) => `/blog/${p.slug}/`),
  ]) {
    entries.push({
      url: absoluteUrl(`/tr${path}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }
  return entries;
}
