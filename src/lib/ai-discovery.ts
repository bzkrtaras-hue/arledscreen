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
const MERCHANT_JSON_URL = `${SITE_URL}/merchant.json`;
const OFFER_JSON_URL = `${SITE_URL}/offer.json`;
const OFFERS_JSON_URL = `${SITE_URL}/offers.json`;
const MODULES_WELLKNOWN_URL = `${SITE_URL}/.well-known/modules.json`;
const SKU_WELLKNOWN_URL = `${SITE_URL}/.well-known/sku.json`;
const PRICING_WELLKNOWN_URL = `${SITE_URL}/.well-known/pricing.json`;
const PANELS_WELLKNOWN_URL = `${SITE_URL}/.well-known/panels.json`;
const MPN_WELLKNOWN_URL = `${SITE_URL}/.well-known/mpn.json`;
const MERCHANT_WELLKNOWN_URL = `${SITE_URL}/.well-known/merchant.json`;
const PRICES_WELLKNOWN_URL = `${SITE_URL}/.well-known/prices.json`;
const PRICE_WELLKNOWN_URL = `${SITE_URL}/.well-known/price.json`;
const OFFER_WELLKNOWN_URL = `${SITE_URL}/.well-known/offer.json`;
const OFFERS_WELLKNOWN_URL = `${SITE_URL}/.well-known/offers.json`;
const DATASET_JSON_URL = `${SITE_URL}/dataset.json`;
const FEED_JSON_URL = `${SITE_URL}/feed.json`;
const DATASET_WELLKNOWN_URL = `${SITE_URL}/.well-known/dataset.json`;
const FEED_WELLKNOWN_URL = `${SITE_URL}/.well-known/feed.json`;
const PRODUCTS_JSON_URL = `${SITE_URL}/products.json`;
const PRODUCT_JSON_URL = `${SITE_URL}/product.json`;
const PRODUCTS_WELLKNOWN_URL = `${SITE_URL}/.well-known/products.json`;
const PRODUCT_WELLKNOWN_URL = `${SITE_URL}/.well-known/product.json`;
const CATALOG_WELLKNOWN_URL = `${SITE_URL}/.well-known/catalog.json`;
const ENTITY_PROFILES_URL = `${SITE_URL}/entity-profiles.json`;
const ORGANIZATION_JSON_URL = `${SITE_URL}/organization.json`;
const BRAND_WELLKNOWN_URL = `${SITE_URL}/.well-known/brand.json`;
const ENTITY_WELLKNOWN_URL = `${SITE_URL}/.well-known/entity.json`;
const CITE_WELLKNOWN_URL = `${SITE_URL}/.well-known/cite.json`;
const FAQ_WELLKNOWN_URL = `${SITE_URL}/.well-known/faq.json`;
const FAQS_WELLKNOWN_URL = `${SITE_URL}/.well-known/faqs.json`;
const ORGANIZATION_WELLKNOWN_URL = `${SITE_URL}/.well-known/organization.json`;
const COMPANY_WELLKNOWN_URL = `${SITE_URL}/.well-known/company.json`;
const NAP_WELLKNOWN_URL = `${SITE_URL}/.well-known/nap.json`;
const ABOUT_WELLKNOWN_URL = `${SITE_URL}/.well-known/about.json`;
const GEO_BASELINE_WELLKNOWN_URL = `${SITE_URL}/.well-known/geo-baseline.json`;
const ENTITY_PROFILES_WELLKNOWN_URL = `${SITE_URL}/.well-known/entity-profiles.json`;
const AI_SHOPPING_WELLKNOWN_URL = `${SITE_URL}/.well-known/ai-shopping.json`;
const BRAND_EXTLESS_URL = `${SITE_URL}/brand`;
const MODULES_EXTLESS_URL = `${SITE_URL}/modules`;
const SKU_EXTLESS_URL = `${SITE_URL}/sku`;
const MPN_EXTLESS_URL = `${SITE_URL}/mpn`;
const MERCHANT_EXTLESS_URL = `${SITE_URL}/merchant`;
const OFFERS_EXTLESS_URL = `${SITE_URL}/offers`;
const DATASET_EXTLESS_URL = `${SITE_URL}/dataset`;
const FEED_EXTLESS_URL = `${SITE_URL}/feed`;
const PRODUCTS_EXTLESS_URL = `${SITE_URL}/products`;
const PRODUCT_EXTLESS_URL = `${SITE_URL}/product`;
const GEO_BASELINE_EXTLESS_URL = `${SITE_URL}/geo-baseline`;
const COMPANY_EXTLESS_URL = `${SITE_URL}/company`;
const NAP_EXTLESS_URL = `${SITE_URL}/nap`;
const CITE_EXTLESS_URL = `${SITE_URL}/cite`;
const FAQ_EXTLESS_URL = `${SITE_URL}/faq`;
const FAQS_EXTLESS_URL = `${SITE_URL}/faqs`;
const AI_SHOPPING_EXTLESS_URL = `${SITE_URL}/ai-shopping`;
const ENTITY_PROFILES_EXTLESS_URL = `${SITE_URL}/entity-profiles`;
const LLMS_EXTLESS_URL = `${SITE_URL}/llms`;
const LLMS_FULL_EXTLESS_URL = `${SITE_URL}/llms-full`;
const API_V1_PRICES_URL = `${SITE_URL}/api/v1/prices`;
const API_PANELS_JSON_URL = `${SITE_URL}/api/panels.json`;
const API_MERCHANT_JSON_URL = `${SITE_URL}/api/merchant.json`;
const API_MPN_URL = `${SITE_URL}/api/mpn`;
const API_ENTITY_URL = `${SITE_URL}/api/entity`;
const API_CATALOG_JSON_URL = `${SITE_URL}/api/catalog.json`;
const API_PRODUCTS_URL = `${SITE_URL}/api/products`;
const V1_PRICES_URL = `${SITE_URL}/v1/prices`;
const DATA_PRICES_JSON_URL = `${SITE_URL}/data/prices.json`;
const FEEDS_PRICES_JSON_URL = `${SITE_URL}/feeds/prices.json`;
const EN_PRICES_JSON_URL = `${SITE_URL}/en/prices.json`;
const TR_PRICES_JSON_URL = `${SITE_URL}/tr/prices.json`;
const EN_PRICING_JSON_URL = `${SITE_URL}/en/pricing.json`;
const TR_CATALOG_JSON_URL = `${SITE_URL}/tr/catalog.json`;
const EN_ENTITY_JSON_URL = `${SITE_URL}/en/entity.json`;
const TR_ENTITY_JSON_URL = `${SITE_URL}/tr/entity.json`;
const POINT_C_TXT_URL = `${SITE_URL}/point-c.txt`;
const POINT_C_EN_TXT_URL = `${SITE_URL}/point-c-en.txt`;
const POINT_C_WELLKNOWN_URL = `${SITE_URL}/.well-known/point-c.txt`;
const POINT_C_EN_WELLKNOWN_URL = `${SITE_URL}/.well-known/point-c-en.txt`;
const POINT_C_JSON_URL = `${SITE_URL}/point-c.json`;
const POINT_C_EN_JSON_URL = `${SITE_URL}/point-c-en.json`;
const POINT_C_JSON_WELLKNOWN_URL = `${SITE_URL}/.well-known/point-c.json`;
const POINT_C_CSV_URL = `${SITE_URL}/feeds/point-c.csv`;
const GEO_STATUS_JSON_URL = `${SITE_URL}/geo-status.json`;
const GEO_NEXT_TXT_URL = `${SITE_URL}/geo-next.txt`;
const OWNER_NEXT_TXT_URL = `${SITE_URL}/owner-next.txt`;
const TUR1A_JSON_URL = `${SITE_URL}/tur1a.json`;
const TUR1A_CSV_URL = `${SITE_URL}/feeds/tur1a.csv`;
const POINT_C_PROGRESS_JSON_URL = `${SITE_URL}/point-c-progress.json`;
const LLMS_URL = `${SITE_URL}/llms.txt`;
const LLMS_WELLKNOWN_URL = `${SITE_URL}/.well-known/llms.txt`;
const LLMS_FULL_URL = `${SITE_URL}/llms-full.txt`;
const LLMS_FULL_WELLKNOWN_URL = `${SITE_URL}/.well-known/llms-full.txt`;
const EN_LLMS_URL = `${SITE_URL}/en/llms.txt`;
const TR_LLMS_URL = `${SITE_URL}/tr/llms.txt`;
const EN_AI_TXT_URL = `${SITE_URL}/en/ai.txt`;
const TR_AI_TXT_URL = `${SITE_URL}/tr/ai.txt`;
const AI_TXT_URL = `${SITE_URL}/ai.txt`;
const AI_TXT_WELLKNOWN_URL = `${SITE_URL}/.well-known/ai.txt`;
const AGENTS_MD_URL = `${SITE_URL}/AGENTS.md`;
const AGENTS_JSON_ROOT_URL = `${SITE_URL}/agents.json`;
const AGENT_JSON_ROOT_URL = `${SITE_URL}/agent.json`;
const AGENT_WELLKNOWN_URL = `${SITE_URL}/.well-known/agent.json`;
const HUMANS_TXT_URL = `${SITE_URL}/humans.txt`;
const HUMANS_WELLKNOWN_URL = `${SITE_URL}/.well-known/humans.txt`;
const SECURITY_TXT_URL = `${SITE_URL}/.well-known/security.txt`;
const SECURITY_TXT_ROOT_URL = `${SITE_URL}/security.txt`;
const SECURITY_EXTLESS_URL = `${SITE_URL}/.well-known/security`;
const WEBSITE_URL = `${SITE_URL}/#website`;

/** Invent-alias pricedPanels surfaces (parity with public/_headers Link invent set). */
const inventAliasLdJson = [
  { url: MERCHANT_JSON_URL, title: "Merchant pricedPanels alias" },
  { url: OFFER_JSON_URL, title: "Offer pricedPanels alias" },
  { url: OFFERS_JSON_URL, title: "Offers pricedPanels alias" },
  { url: MODULES_WELLKNOWN_URL, title: "Modules pricedPanels invent alias" },
  { url: SKU_WELLKNOWN_URL, title: "SKU pricedPanels invent alias" },
  { url: PRICING_WELLKNOWN_URL, title: "Pricing pricedPanels invent alias" },
  { url: PANELS_WELLKNOWN_URL, title: "Panels pricedPanels invent alias" },
  { url: MPN_WELLKNOWN_URL, title: "MPN pricedPanels invent alias" },
  { url: MERCHANT_WELLKNOWN_URL, title: "Merchant pricedPanels invent alias" },
  { url: PRICES_WELLKNOWN_URL, title: "Prices pricedPanels invent alias" },
  { url: PRICE_WELLKNOWN_URL, title: "Price pricedPanels invent alias" },
  { url: OFFER_WELLKNOWN_URL, title: "Offer well-known pricedPanels invent alias" },
  { url: OFFERS_WELLKNOWN_URL, title: "Offers well-known pricedPanels invent alias" },
  { url: DATASET_JSON_URL, title: "Dataset pricedPanels invent alias" },
  { url: FEED_JSON_URL, title: "Feed pricedPanels invent alias" },
  { url: DATASET_WELLKNOWN_URL, title: "Dataset well-known pricedPanels invent alias" },
  { url: FEED_WELLKNOWN_URL, title: "Feed well-known pricedPanels invent alias" },
  { url: PRODUCTS_JSON_URL, title: "Products catalog invent alias" },
  { url: PRODUCT_JSON_URL, title: "Product catalog invent alias" },
  { url: PRODUCTS_WELLKNOWN_URL, title: "Products well-known catalog invent alias" },
  { url: PRODUCT_WELLKNOWN_URL, title: "Product well-known catalog invent alias" },
  { url: CATALOG_WELLKNOWN_URL, title: "Catalog well-known invent alias" },
  { url: GEO_BASELINE_WELLKNOWN_URL, title: "GEO baseline well-known invent alias" },
  { url: ENTITY_PROFILES_WELLKNOWN_URL, title: "Point C entity-profiles well-known invent alias" },
  { url: AI_SHOPPING_WELLKNOWN_URL, title: "AI Shopping well-known invent alias" },
  { url: BRAND_EXTLESS_URL, title: "Brand extensionless invent alias" },
  { url: MODULES_EXTLESS_URL, title: "Modules extensionless invent alias" },
  { url: SKU_EXTLESS_URL, title: "SKU extensionless invent alias" },
  { url: MPN_EXTLESS_URL, title: "MPN extensionless invent alias" },
  { url: MERCHANT_EXTLESS_URL, title: "Merchant extensionless invent alias" },
  { url: OFFERS_EXTLESS_URL, title: "Offers extensionless invent alias" },
  { url: DATASET_EXTLESS_URL, title: "Dataset extensionless invent alias" },
  { url: FEED_EXTLESS_URL, title: "Feed extensionless invent alias" },
  { url: PRODUCTS_EXTLESS_URL, title: "Products extensionless invent alias" },
  { url: PRODUCT_EXTLESS_URL, title: "Product extensionless invent alias" },
  { url: GEO_BASELINE_EXTLESS_URL, title: "GEO baseline extensionless invent alias" },
  { url: COMPANY_EXTLESS_URL, title: "Company extensionless invent alias" },
  { url: NAP_EXTLESS_URL, title: "NAP extensionless invent alias" },
  { url: CITE_EXTLESS_URL, title: "Cite extensionless invent alias" },
  { url: FAQ_EXTLESS_URL, title: "FAQ extensionless invent alias" },
  { url: FAQS_EXTLESS_URL, title: "FAQs extensionless invent alias" },
  { url: AI_SHOPPING_EXTLESS_URL, title: "AI Shopping extensionless invent alias" },
  { url: ENTITY_PROFILES_EXTLESS_URL, title: "Point C entity-profiles extensionless invent alias" },
  { url: API_V1_PRICES_URL, title: "API v1 prices invent alias" },
  { url: API_PANELS_JSON_URL, title: "API panels.json invent alias" },
  { url: API_MERCHANT_JSON_URL, title: "API merchant.json invent alias" },
  { url: API_MPN_URL, title: "API mpn invent alias" },
  { url: API_ENTITY_URL, title: "API entity invent alias" },
  { url: API_CATALOG_JSON_URL, title: "API catalog.json invent alias" },
  { url: API_PRODUCTS_URL, title: "API products invent alias" },
  { url: V1_PRICES_URL, title: "v1 prices invent alias" },
  { url: DATA_PRICES_JSON_URL, title: "data/prices.json invent alias" },
  { url: FEEDS_PRICES_JSON_URL, title: "feeds/prices.json invent alias" },
  { url: EN_PRICES_JSON_URL, title: "EN prices.json invent alias" },
  { url: TR_PRICES_JSON_URL, title: "TR prices.json invent alias" },
  { url: EN_PRICING_JSON_URL, title: "EN pricing.json invent alias" },
  { url: TR_CATALOG_JSON_URL, title: "TR catalog.json invent alias" },
  { url: EN_ENTITY_JSON_URL, title: "EN entity.json invent alias" },
  { url: TR_ENTITY_JSON_URL, title: "TR entity.json invent alias" },
  { url: AGENT_JSON_ROOT_URL, title: "Agent Discovery Index (agent.json invent alias)" },
] as const;

const inventAliasTextPlain = [
  { url: SECURITY_TXT_ROOT_URL, title: "security.txt root invent alias" },
  { url: SECURITY_EXTLESS_URL, title: "security.txt extensionless well-known invent alias" },
  { url: EN_LLMS_URL, title: "LLM Context EN invent alias" },
  { url: TR_LLMS_URL, title: "LLM Context TR invent alias" },
  { url: EN_AI_TXT_URL, title: "AI Discovery Pointer EN invent alias" },
  { url: TR_AI_TXT_URL, title: "AI Discovery Pointer TR invent alias" },
  { url: LLMS_EXTLESS_URL, title: "LLM Context extensionless invent alias" },
  { url: LLMS_FULL_EXTLESS_URL, title: "LLM Context Full extensionless invent alias" },
] as const;

export const aiDiscoveryMetadata: Metadata = {
  alternates: {
    types: {
      "application/ld+json": [
        { url: ENTITY_JSON_URL, title: "Organization Entity" },
        { url: BRAND_JSON_URL, title: "NXTIONSTAR Brand" },
        { url: BRAND_WELLKNOWN_URL, title: "NXTIONSTAR Brand invent alias" },
        { url: ENTITY_WELLKNOWN_URL, title: "Organization invent alias" },
        { url: CITE_WELLKNOWN_URL, title: "Organization cite invent alias" },
        { url: FAQ_WELLKNOWN_URL, title: "Organization FAQ invent alias" },
        { url: FAQS_WELLKNOWN_URL, title: "Organization FAQs invent alias" },
        { url: ORGANIZATION_WELLKNOWN_URL, title: "Organization well-known invent alias" },
        { url: COMPANY_WELLKNOWN_URL, title: "Organization company invent alias" },
        { url: NAP_WELLKNOWN_URL, title: "Organization NAP invent alias" },
        { url: ABOUT_WELLKNOWN_URL, title: "Organization about invent alias" },
        { url: CATALOG_JSON_URL, title: "Product Catalog" },
        { url: AI_SHOPPING_URL, title: "AI Shopping Index" },
        { url: PRICES_JSON_URL, title: "Panel Prices (alias)" },
        { url: PANELS_JSON_URL, title: "Panels pricedPanels (alias)" },
        { url: MPN_JSON_URL, title: "MPN pricedPanels (alias)" },
        ...inventAliasLdJson,
        { url: ORGANIZATION_JSON_URL, title: "Organization (alias)" },
        { url: ENTITY_PROFILES_URL, title: "Point C entity profiles" },
        { url: GEO_BASELINE_URL, title: "GEO Technical Baseline" },
        { url: ARD_URL, title: "Agentic Resource Discovery" },
        { url: AGENTS_JSON_URL, title: "Agent Discovery Index" },
        { url: AGENTS_JSON_ROOT_URL, title: "Agent Discovery Index (root invent alias)" },
        { url: AGENT_WELLKNOWN_URL, title: "Agent Discovery Index (agent invent alias)" },
        { url: POINT_C_JSON_URL, title: "Point C paste packs JSON (potentialAction HowTo)" },
        { url: GEO_STATUS_JSON_URL, title: "GEO owner-gate status (potentialAction HowTo)" },
        { url: TUR1A_JSON_URL, title: "Tur1a blind coverage (potentialAction HowTo)" },
        { url: POINT_C_PROGRESS_JSON_URL, title: "Point C paste progress (potentialAction HowTo)" },
      ],
      "application/rss+xml": [{ url: PRICES_RSS_URL, title: "Panel Price Updates RSS" }],
      "text/tab-separated-values": [
        { url: MERCHANT_TSV_URL, title: "Merchant Priced Panels TSV" },
      ],
      "text/plain": [
        { url: LLMS_URL, title: "LLM Context (Short)" },
        { url: LLMS_WELLKNOWN_URL, title: "LLM Context (well-known invent alias)" },
        { url: LLMS_FULL_URL, title: "LLM Context (Full)" },
        { url: LLMS_FULL_WELLKNOWN_URL, title: "LLM Context Full (well-known invent alias)" },
        ...inventAliasTextPlain,
        { url: AI_TXT_URL, title: "AI Discovery Pointer" },
        { url: AI_TXT_WELLKNOWN_URL, title: "AI Discovery Pointer (well-known invent alias)" },
        { url: HUMANS_TXT_URL, title: "Humans.txt" },
        { url: HUMANS_WELLKNOWN_URL, title: "humans.txt well-known invent alias" },
        { url: SECURITY_TXT_URL, title: "security.txt (RFC 9116)" },
        { url: POINT_C_TXT_URL, title: "Point C paste packs" },
        { url: POINT_C_EN_TXT_URL, title: "Point C paste packs (EN)" },
        { url: POINT_C_WELLKNOWN_URL, title: "Point C paste packs (well-known invent alias)" },
        { url: POINT_C_EN_WELLKNOWN_URL, title: "Point C paste packs EN (well-known invent alias)" },
        { url: GEO_NEXT_TXT_URL, title: "GEO next clipboard (directoryLong Bing/Apple)" },
        { url: OWNER_NEXT_TXT_URL, title: "GEO next clipboard invent alias (owner-next)" },
      ],
      "text/csv": [
        { url: POINT_C_CSV_URL, title: "Point C spreadsheet CSV" },
        { url: TUR1A_CSV_URL, title: "Tur1a blind coverage CSV" },
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
  { rel: "alternate", type: "application/ld+json", href: CITE_WELLKNOWN_URL, title: "Organization cite invent alias" },
  { rel: "alternate", type: "application/ld+json", href: FAQ_WELLKNOWN_URL, title: "Organization FAQ invent alias" },
  { rel: "alternate", type: "application/ld+json", href: FAQS_WELLKNOWN_URL, title: "Organization FAQs invent alias" },
  { rel: "alternate", type: "application/ld+json", href: ORGANIZATION_WELLKNOWN_URL, title: "Organization well-known invent alias" },
  { rel: "alternate", type: "application/ld+json", href: COMPANY_WELLKNOWN_URL, title: "Organization company invent alias" },
  { rel: "alternate", type: "application/ld+json", href: NAP_WELLKNOWN_URL, title: "Organization NAP invent alias" },
  { rel: "alternate", type: "application/ld+json", href: ABOUT_WELLKNOWN_URL, title: "Organization about invent alias" },
  { rel: "alternate", type: "application/ld+json", href: CATALOG_JSON_URL, title: "Product Catalog" },
  { rel: "alternate", type: "application/ld+json", href: AI_SHOPPING_URL, title: "AI Shopping Index" },
  { rel: "alternate", type: "application/ld+json", href: PRICES_JSON_URL, title: "Panel Prices (alias)" },
  { rel: "alternate", type: "application/ld+json", href: PANELS_JSON_URL, title: "Panels pricedPanels (alias)" },
  { rel: "alternate", type: "application/ld+json", href: MPN_JSON_URL, title: "MPN pricedPanels (alias)" },
  ...inventAliasLdJson.map((e) => ({
    rel: "alternate" as const,
    type: "application/ld+json" as const,
    href: e.url,
    title: e.title,
  })),
  { rel: "alternate", type: "application/ld+json", href: ORGANIZATION_JSON_URL, title: "Organization (alias)" },
  { rel: "alternate", type: "application/ld+json", href: ENTITY_PROFILES_URL, title: "Point C entity profiles" },
  { rel: "alternate", type: "application/ld+json", href: GEO_BASELINE_URL, title: "GEO Technical Baseline" },
  { rel: "alternate", type: "application/ld+json", href: ARD_URL, title: "Agentic Resource Discovery" },
  { rel: "alternate", type: "application/ld+json", href: AGENTS_JSON_URL, title: "Agent Discovery Index" },
  { rel: "alternate", type: "application/ld+json", href: AGENTS_JSON_ROOT_URL, title: "Agent Discovery Index (root invent alias)" },
  { rel: "alternate", type: "application/ld+json", href: AGENT_WELLKNOWN_URL, title: "Agent Discovery Index (agent invent alias)" },
  {
    rel: "alternate",
    type: "text/tab-separated-values",
    href: MERCHANT_TSV_URL,
    title: "Merchant Priced Panels TSV",
  },
  { rel: "alternate", type: "application/rss+xml", href: PRICES_RSS_URL, title: "Panel Price Updates RSS" },
  { rel: "alternate", type: "text/plain", href: LLMS_URL, title: "LLM Context (Short)" },
  { rel: "alternate", type: "text/plain", href: LLMS_WELLKNOWN_URL, title: "LLM Context (well-known invent alias)" },
  { rel: "alternate", type: "text/plain", href: LLMS_FULL_URL, title: "LLM Context (Full)" },
  { rel: "alternate", type: "text/plain", href: LLMS_FULL_WELLKNOWN_URL, title: "LLM Context Full (well-known invent alias)" },
  ...inventAliasTextPlain.map((e) => ({
    rel: "alternate" as const,
    type: "text/plain" as const,
    href: e.url,
    title: e.title,
  })),
  { rel: "alternate", type: "text/plain", href: AI_TXT_URL, title: "AI Discovery Pointer" },
  { rel: "alternate", type: "text/plain", href: AI_TXT_WELLKNOWN_URL, title: "AI Discovery Pointer (well-known invent alias)" },
  { rel: "alternate", type: "text/plain", href: HUMANS_TXT_URL, title: "Humans.txt" },
  { rel: "alternate", type: "text/plain", href: HUMANS_WELLKNOWN_URL, title: "humans.txt well-known invent alias" },
  { rel: "alternate", type: "text/plain", href: SECURITY_TXT_URL, title: "security.txt (RFC 9116)" },
  { rel: "alternate", type: "text/plain", href: POINT_C_TXT_URL, title: "Point C paste packs" },
  { rel: "alternate", type: "text/plain", href: POINT_C_EN_TXT_URL, title: "Point C paste packs (EN)" },
  { rel: "alternate", type: "text/plain", href: POINT_C_WELLKNOWN_URL, title: "Point C paste packs (well-known invent alias)" },
  { rel: "alternate", type: "text/plain", href: POINT_C_EN_WELLKNOWN_URL, title: "Point C paste packs EN (well-known invent alias)" },
  {
    rel: "alternate",
    type: "application/ld+json",
    href: POINT_C_JSON_URL,
    title: "Point C paste packs JSON (potentialAction HowTo)",
  },
  {
    rel: "alternate",
    type: "application/ld+json",
    href: POINT_C_EN_JSON_URL,
    title: "Point C paste packs JSON (EN)",
  },
  {
    rel: "alternate",
    type: "application/ld+json",
    href: POINT_C_JSON_WELLKNOWN_URL,
    title: "Point C JSON well-known invent alias",
  },
  {
    rel: "alternate",
    type: "text/csv",
    href: POINT_C_CSV_URL,
    title: "Point C spreadsheet CSV",
  },
  {
    rel: "alternate",
    type: "application/ld+json",
    href: GEO_STATUS_JSON_URL,
    title: "GEO owner-gate status (potentialAction HowTo)",
  },
  {
    rel: "alternate",
    type: "text/plain",
    href: GEO_NEXT_TXT_URL,
    title: "GEO next clipboard (HowTo footer)",
  },
  {
    rel: "alternate",
    type: "application/ld+json",
    href: TUR1A_JSON_URL,
    title: "Tur1a blind coverage (potentialAction HowTo)",
  },
  {
    rel: "alternate",
    type: "text/plain",
    href: OWNER_NEXT_TXT_URL,
    title: "GEO next clipboard invent alias (owner-next)",
  },
  {
    rel: "alternate",
    type: "text/csv",
    href: TUR1A_CSV_URL,
    title: "Tur1a blind coverage CSV",
  },
  {
    rel: "alternate",
    type: "application/ld+json",
    href: POINT_C_PROGRESS_JSON_URL,
    title: "Point C paste progress (potentialAction HowTo)",
  },
  { rel: "alternate", type: "text/markdown", href: AGENTS_MD_URL, title: "AGENTS.md" },
  // RFC 8288: machine agents that follow Link / describedby land on price + entity + brand.
  { rel: "describedby", type: "application/ld+json", href: AI_SHOPPING_URL, title: "AI Shopping pricedPanels" },
  { rel: "describedby", type: "application/ld+json", href: ENTITY_JSON_URL, title: "Organization Entity" },
  { rel: "describedby", type: "application/ld+json", href: BRAND_JSON_URL, title: "NXTIONSTAR Brand" },
  // Discovery only — not rel=canonical (page HTML already has one page-URL canonical; Melis SEO).
  { rel: "describedby", href: WEBSITE_URL, title: "ARLEDSCREEN WebSite #website" },
];
