import { BLOG_POSTS } from "@/content/blog";
import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { SEO_GUIDE_SLUGS } from "@/content/seo-guides";
import { PRODUCT_GROUPS } from "@/content/categories";
import { LED_MODELS, modelPath } from "@/content/models";
import { SERVICE_REGIONS } from "@/content/service-regions";

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
  // Stable lastmod day (UTC) reduces needless crawl churn; force-static export
  // avoids intermittent edge 500s from runtime generation.
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const entries: MetadataRoute.Sitemap = [];
  // TR first: primary market and canonical content language for GEO.
  const orderedLocales: Locale[] = ["tr", ...locales.filter((l) => l !== "tr")];
  for (const locale of orderedLocales) {
    // ar/ru guides mirror the English text and canonicalise to /en/ (not listed).
    const hasOwnGuides = locale === "tr" || locale === "en";
    for (const route of routes) {
      if (!hasOwnGuides && route.path === "/rehber/") continue;
      const path = withTrailingSlash(route.path);
      entries.push({
        url: absoluteUrl(`/${locale}${path === "/" ? "/" : path}`),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: locale === "tr" ? route.priority : Math.max(0.4, (route.priority ?? 0.5) - 0.1),
      });
    }
    for (const slug of hasOwnGuides ? SEO_GUIDE_SLUGS : []) {
      entries.push({
        url: absoluteUrl(`/${locale}/rehber/${slug}/`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: locale === "tr" ? 0.85 : 0.7,
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
    "/bolgeler/",
    "/projelerimiz/",
    "/sss/",
    "/nxtionstar/",
    "/rehber/led-ekran-fiyatlari/",
    "/rehber/piksel-araligi-secimi/",
    "/rehber/led-tabela-mi-led-ekran-mi/",
    "/rehber/kiralik-mi-satin-alma/",
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
  for (const region of SERVICE_REGIONS) {
    entries.push({
      url: absoluteUrl(`/tr/bolgeler/${region.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: region.isHq ? 0.9 : 0.75,
    });
  }
  return entries;
}
