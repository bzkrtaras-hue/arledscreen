import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const ENTITY_JSON_URL = `${SITE_URL}/entity.json`;
const ENTITY_PROFILES_URL = `${SITE_URL}/entity-profiles.json`;
const CATALOG_JSON_URL = `${SITE_URL}/catalog.json`;
const AI_SHOPPING_URL = `${SITE_URL}/ai-shopping.json`;
const ARD_URL = `${SITE_URL}/.well-known/ard.json`;
const MERCHANT_FEED_URL = `${SITE_URL}/feeds/merchant-priced-panels.tsv`;
const LLMS_URL = `${SITE_URL}/llms.txt`;
const LLMS_FULL_URL = `${SITE_URL}/llms-full.txt`;

export const aiDiscoveryMetadata: Metadata = {
  alternates: {
    types: {
      "application/ld+json": [
        { url: ENTITY_JSON_URL, title: "ARLEDSCREEN entity" },
        { url: ENTITY_PROFILES_URL, title: "Point C profile paste packs" },
        { url: CATALOG_JSON_URL, title: "NXTIONSTAR panel catalog" },
        { url: AI_SHOPPING_URL, title: "AI alışveriş discovery index" },
        { url: ARD_URL, title: "Agentic Resource Discovery" },
      ],
      "text/plain": [
        { url: LLMS_URL, title: "llms.txt" },
        { url: LLMS_FULL_URL, title: "llms-full.txt" },
      ],
      "text/tab-separated-values": [
        { url: MERCHANT_FEED_URL, title: "Merchant priced panels (12 SKU)" },
      ],
    },
  },
  other: {
    ard: ARD_URL,
  },
};

export const aiDiscoveryLinks = [
  { rel: "ard", type: "application/ld+json", href: ARD_URL, title: "Agentic Resource Discovery" },
  { rel: "alternate", type: "application/ld+json", href: ENTITY_JSON_URL, title: "ARLEDSCREEN entity" },
  { rel: "alternate", type: "application/ld+json", href: ENTITY_PROFILES_URL, title: "Point C profile paste packs" },
  { rel: "alternate", type: "application/ld+json", href: CATALOG_JSON_URL, title: "NXTIONSTAR panel catalog" },
  { rel: "alternate", type: "application/ld+json", href: AI_SHOPPING_URL, title: "AI alışveriş discovery index" },
  {
    rel: "alternate",
    type: "text/tab-separated-values",
    href: MERCHANT_FEED_URL,
    title: "Merchant priced panels (12 SKU)",
  },
  { rel: "alternate", type: "text/plain", href: LLMS_URL, title: "llms.txt" },
  { rel: "alternate", type: "text/plain", href: LLMS_FULL_URL, title: "llms-full.txt" },
];
