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
    "/.well-known/dataset.json",
    "/.well-known/feed.json",
    "/.well-known/products.json",
    "/.well-known/product.json",
    "/.well-known/geo-baseline.json",
    "/.well-known/entity-profiles.json",
    "/.well-known/entity.json",
    "/.well-known/cite.json",
    "/.well-known/faq.json",
    "/.well-known/faqs.json",
    "/.well-known/organization.json",
    "/.well-known/company.json",
    "/.well-known/nap.json",
    "/.well-known/about.json",
    "/.well-known/catalog.json",
    "/.well-known/security.txt",
    "/.well-known/security",
    "/.well-known/humans.txt",
    "/agents.json",
    "/agent.json",
    "/AGENTS.md",
    "/humans.txt",
    "/point-c.txt",
    "/point-c-en.txt",
    "/.well-known/point-c.txt",
    "/.well-known/point-c-en.txt",
    "/point-c.json",
    "/point-c-en.json",
    "/.well-known/point-c.json",
    "/.well-known/point-c-en.json",
    "/feeds/point-c.csv",
    "/feeds/point-c-en.csv",
    "/point-c.csv",
    "/point-c-en.csv",
    "/geo-status.json",
    "/.well-known/geo-status.json",
    "/owner-p0.json",
    "/.well-known/owner-p0.json",
    "/geo-next.txt",
    "/.well-known/geo-next.txt",
    "/owner-next.txt",
    "/.well-known/owner-next.txt",
    "/owner-next.html",
    "/geo-next.html",
    "/owner-next.json",
    "/.well-known/owner-next.json",
    "/geo-next.json",
    "/.well-known/geo-next.json",
    "/tur1a.json",
    "/.well-known/tur1a.json",
    "/feeds/tur1a.csv",
    "/tur1a.csv",
    "/point-c-progress.json",
    "/.well-known/point-c-progress.json",
    "/.well-known/AGENTS.md",
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
    "/en/entity.json",
    "/en/geo-baseline.json",
    "/en/pricing.json",
    "/en/prices.json",
    "/en/price.json",
    "/en/feed.json",
    "/en/products.json",
    "/tr/ai-shopping.json",
    "/tr/catalog.json",
    "/tr/entity.json",
    "/tr/geo-baseline.json",
    "/tr/pricing.json",
    "/tr/prices.json",
    "/tr/price.json",
    "/tr/feed.json",
    "/tr/products.json",
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
    "/feeds/prices.json",
    "/feeds/catalog.json",
    "/api/catalog",
    "/api/catalog.json",
    "/api/products",
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
    "/product",
    "/product.json",
    "/brand",
    "/modules",
    "/entity-profiles",
    "/llms-full",
    "/organization",
    "/company",
    "/cite",
    "/faq",
    "/faqs",
    "/nap",
    "/offer",
    "/offers",
    "/dataset",
    "/feed",
    // Noindex invent HTML bridges (postbuild slash bridges / locale invents)
    "/tr/teklif/",
    "/tr/teklif-al/",
    "/tr/fiyat-teklifi/",
    "/tr/contact/",
    "/tr/fiyat/",
    "/tr/fiyatlar/",
    "/tr/prices/",
    "/tr/pricing/",
    "/tr/katalog/",
    "/tr/catalog/",
    "/tr/shop/",
    "/tr/magaza/",
    "/tr/calculator/",
    "/en/calculator/",
    "/tr/faq/",
    "/tr/gallery/",
    "/tr/projects/",
    "/tr/regions/",
    "/tr/services/",
    "/tr/brand/",
    "/tr/modules/",
    "/tr/gob/",
    "/tr/indoor-led/",
    "/tr/outdoor-led/",
    "/tr/fine-pitch/",
    "/tr/price-list/",
    "/en/magaza/",
    "/katalog/",
    "/contact/",
    "/teklif/",
    "/quote/",
    "/fiyat/",
    "/nxtionstar/",
    "/galeri/",
    // EN invent HTML bridges (ARD enInventBridges)
    "/en/faq/",
    "/en/gallery/",
    "/en/projects/",
    "/en/regions/",
    "/en/services/",
    "/en/brand/",
    "/en/teklif/",
    "/en/bolgeler/istanbul/",
    "/en/products/gob-led-ekran/p1-25-gob/",
    "/en/catalog/",
    "/en/shop/",
    "/en/request-quote/",
    "/en/products/gob/",
    "/pricing/",
    "/prices/",
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
