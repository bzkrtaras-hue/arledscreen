import { BLOG_POSTS } from "@/content/blog";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SEO_GUIDE_SLUGS } from "@/content/seo-guides";
import { PRODUCT_GROUPS } from "@/content/categories";
import { LED_MODELS, modelPath } from "@/content/models";
import { SERVICE_REGIONS } from "@/content/service-regions";
import { COMMERCIAL_EN_SLUGS, COMMERCIAL_PAGES } from "@/content/commercial-pages";
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
    // EN lean landings for AI inventable /en/products/<slug>/ paths (models stay TR-only).
    entries.push({
      url: absoluteUrl(`/en/products/${g.slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
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
      lastModified: now,
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
    lastModified: now,
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
      lastModified: now,
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
        lastModified: now,
        changeFrequency: "weekly",
        priority: path.includes("fiyat") ? 0.92 : path.includes("sss") ? 0.88 : 0.9,
      });
    }
  }
  entries.push({
    url: absoluteUrl("/en/led-ekran/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  });
  // Remaining commercial EN hubs (intent + high-invent use/pitch) — agents previously 404'd.
  for (const slug of COMMERCIAL_EN_SLUGS) {
    entries.push({
      url: absoluteUrl(`/en/${slug}/`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.93,
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

  // Machine-readable AI / GEO discovery surfaces (+ inventable path aliases)
  for (const path of [
    "/ai-shopping.json",
    "/catalog.json",
    "/geo-baseline.json",
    "/entity.json",
    "/entity-profiles.json",
    "/llms.txt",
    "/llms-full.txt",
    "/ai.txt",
    "/.well-known/ard.json",
    "/.well-known/agents.json",
    "/.well-known/agent.json",
    "/.well-known/llms.txt",
    "/.well-known/llms-full.txt",
    "/.well-known/ai.txt",
    "/.well-known/ai-shopping.json",
    "/.well-known/prices.json",
    "/.well-known/price.json",
    "/.well-known/pricing.json",
    "/.well-known/panels.json",
    "/.well-known/mpn.json",
    "/.well-known/merchant.json",
    "/.well-known/modules.json",
    "/.well-known/sku.json",
    "/.well-known/offer.json",
    "/.well-known/offers.json",
    "/.well-known/entity.json",
    "/.well-known/catalog.json",
    "/.well-known/security.txt",
    "/.well-known/humans.txt",
    "/agents.json",
    "/agent.json",
    "/AGENTS.md",
    "/humans.txt",
    "/point-c.txt",
    "/point-c-en.txt",
    "/.well-known/point-c.txt",
    "/security.txt",
    "/feeds/merchant-priced-panels.tsv",
    "/feeds/prices.rss",
    "/catalog",
    "/ai-shopping",
    "/entity",
    "/geo-baseline",
    "/llms",
    "/pricing.json",
    "/prices.json",
    "/price.json",
    "/products.json",
    "/organization.json",
    "/company.json",
    "/about.json",
    "/nap.json",
    "/brand.json",
    "/.well-known/brand.json",
    "/cite.json",
    "/faq.json",
    "/faqs.json",
    "/offer.json",
    "/offers.json",
    "/feed.json",
    "/dataset.json",
    "/en/ai-shopping.json",
    "/en/catalog.json",
    "/en/pricing.json",
    "/en/prices.json",
    "/en/price.json",
    "/en/products.json",
    "/en/llms.txt",
    "/tr/llms.txt",
    "/en/llms-full.txt",
    "/tr/llms-full.txt",
    "/en/ai.txt",
    "/tr/ai.txt",
    "/en/entity-profiles.json",
    "/tr/entity-profiles.json",
    "/data/catalog.json",
    "/data/prices.json",
    "/api/catalog",
    "/api/prices",
    "/api/prices.json",
    "/api/panels",
    "/api/panels.json",
    "/api/mpn",
    "/api/mpn.json",
    "/api/merchant",
    "/api/merchant.json",
    "/api/entity",
    "/api/entity.json",
    "/api/ai-shopping",
    "/api/ai-shopping.json",
    "/api/v1/prices",
    "/v1/prices",
    "/v1/panels",
    "/v1/merchant",
    "/v1/mpn",
    "/v1/sku",
    "/panels.json",
    "/mpn.json",
    "/merchant.json",
    "/modules.json",
    "/sku.json",
    "/panels",
    "/mpn",
    "/merchant",
    "/sku",
    "/products",
    "/product.json",
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
