import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const ENTITY_JSON_URL = `${SITE_URL}/entity.json`;
const BRAND_JSON_URL = `${SITE_URL}/brand.json`;
const CATALOG_JSON_URL = `${SITE_URL}/catalog.json`;
const AI_SHOPPING_URL = `${SITE_URL}/ai-shopping.json`;
const GEO_BASELINE_URL = `${SITE_URL}/geo-baseline.json`;
const MERCHANT_TSV_URL = `${SITE_URL}/feeds/merchant-priced-panels.tsv`;
const PRICES_RSS_URL = `${SITE_URL}/feeds/prices.rss`;
const ARD_URL = `${SITE_URL}/.well-known/ard.json`;
const AGENTS_JSON_URL = `${SITE_URL}/.well-known/agents.json`;
const PRICES_JSON_URL = `${SITE_URL}/prices.json`;
const PANELS_JSON_URL = `${SITE_URL}/panels.json`;
const MPN_JSON_URL = `${SITE_URL}/mpn.json`;
const ENTITY_PROFILES_URL = `${SITE_URL}/entity-profiles.json`;
const ORGANIZATION_JSON_URL = `${SITE_URL}/organization.json`;
const BRAND_WELLKNOWN_URL = `${SITE_URL}/.well-known/brand.json`;
const ENTITY_WELLKNOWN_URL = `${SITE_URL}/.well-known/entity.json`;
const POINT_C_TXT_URL = `${SITE_URL}/point-c.txt`;
const LLMS_URL = `${SITE_URL}/llms.txt`;
const LLMS_FULL_URL = `${SITE_URL}/llms-full.txt`;
const AI_TXT_URL = `${SITE_URL}/ai.txt`;
const AGENTS_MD_URL = `${SITE_URL}/AGENTS.md`;
const HUMANS_TXT_URL = `${SITE_URL}/humans.txt`;

export const aiDiscoveryMetadata: Metadata = {
  alternates: {
    types: {
      "application/ld+json": [
        { url: ENTITY_JSON_URL, title: "Organization Entity" },
        { url: BRAND_JSON_URL, title: "NXTIONSTAR Brand" },
        { url: BRAND_WELLKNOWN_URL, title: "NXTIONSTAR Brand invent alias" },
        { url: ENTITY_WELLKNOWN_URL, title: "Organization invent alias" },
        { url: CATALOG_JSON_URL, title: "Product Catalog" },
        { url: AI_SHOPPING_URL, title: "AI Shopping Index" },
        { url: PRICES_JSON_URL, title: "Panel Prices (alias)" },
        { url: PANELS_JSON_URL, title: "Panels pricedPanels (alias)" },
        { url: MPN_JSON_URL, title: "MPN pricedPanels (alias)" },
        { url: ORGANIZATION_JSON_URL, title: "Organization (alias)" },
        { url: ENTITY_PROFILES_URL, title: "Point C entity profiles" },
        { url: GEO_BASELINE_URL, title: "GEO Technical Baseline" },
        { url: ARD_URL, title: "Agentic Resource Discovery" },
        { url: AGENTS_JSON_URL, title: "Agent Discovery Index" },
      ],
      "application/rss+xml": [{ url: PRICES_RSS_URL, title: "Panel Price Updates RSS" }],
      "text/tab-separated-values": [
        { url: MERCHANT_TSV_URL, title: "Merchant Priced Panels TSV" },
      ],
      "text/plain": [
        { url: LLMS_URL, title: "LLM Context (Short)" },
        { url: LLMS_FULL_URL, title: "LLM Context (Full)" },
        { url: AI_TXT_URL, title: "AI Discovery Pointer" },
        { url: HUMANS_TXT_URL, title: "Humans.txt" },
        { url: POINT_C_TXT_URL, title: "Point C paste packs" },
      ],
      "text/markdown": [{ url: AGENTS_MD_URL, title: "AGENTS.md" }],
    },
  },
};

export const aiDiscoveryLinks = [
  { rel: "alternate", type: "application/ld+json", href: ENTITY_JSON_URL, title: "Organization Entity" },
  { rel: "alternate", type: "application/ld+json", href: BRAND_JSON_URL, title: "NXTIONSTAR Brand" },
  { rel: "alternate", type: "application/ld+json", href: BRAND_WELLKNOWN_URL, title: "NXTIONSTAR Brand invent alias" },
  { rel: "alternate", type: "application/ld+json", href: ENTITY_WELLKNOWN_URL, title: "Organization invent alias" },
  { rel: "alternate", type: "application/ld+json", href: CATALOG_JSON_URL, title: "Product Catalog" },
  { rel: "alternate", type: "application/ld+json", href: AI_SHOPPING_URL, title: "AI Shopping Index" },
  { rel: "alternate", type: "application/ld+json", href: PRICES_JSON_URL, title: "Panel Prices (alias)" },
  { rel: "alternate", type: "application/ld+json", href: PANELS_JSON_URL, title: "Panels pricedPanels (alias)" },
  { rel: "alternate", type: "application/ld+json", href: MPN_JSON_URL, title: "MPN pricedPanels (alias)" },
  { rel: "alternate", type: "application/ld+json", href: ORGANIZATION_JSON_URL, title: "Organization (alias)" },
  { rel: "alternate", type: "application/ld+json", href: ENTITY_PROFILES_URL, title: "Point C entity profiles" },
  { rel: "alternate", type: "application/ld+json", href: GEO_BASELINE_URL, title: "GEO Technical Baseline" },
  { rel: "alternate", type: "application/ld+json", href: ARD_URL, title: "Agentic Resource Discovery" },
  { rel: "alternate", type: "application/ld+json", href: AGENTS_JSON_URL, title: "Agent Discovery Index" },
  {
    rel: "alternate",
    type: "text/tab-separated-values",
    href: MERCHANT_TSV_URL,
    title: "Merchant Priced Panels TSV",
  },
  { rel: "alternate", type: "application/rss+xml", href: PRICES_RSS_URL, title: "Panel Price Updates RSS" },
  { rel: "alternate", type: "text/plain", href: LLMS_URL, title: "LLM Context (Short)" },
  { rel: "alternate", type: "text/plain", href: LLMS_FULL_URL, title: "LLM Context (Full)" },
  { rel: "alternate", type: "text/plain", href: AI_TXT_URL, title: "AI Discovery Pointer" },
  { rel: "alternate", type: "text/plain", href: HUMANS_TXT_URL, title: "Humans.txt" },
  { rel: "alternate", type: "text/plain", href: POINT_C_TXT_URL, title: "Point C paste packs" },
  { rel: "alternate", type: "text/markdown", href: AGENTS_MD_URL, title: "AGENTS.md" },
  // RFC 8288: machine agents that follow Link / describedby land on price + entity + brand.
  { rel: "describedby", type: "application/ld+json", href: AI_SHOPPING_URL, title: "AI Shopping pricedPanels" },
  { rel: "describedby", type: "application/ld+json", href: ENTITY_JSON_URL, title: "Organization Entity" },
  { rel: "describedby", type: "application/ld+json", href: BRAND_JSON_URL, title: "NXTIONSTAR Brand" },
];
