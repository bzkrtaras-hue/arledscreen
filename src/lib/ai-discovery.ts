import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const ENTITY_JSON_URL = `${SITE_URL}/entity.json`;
const CATALOG_JSON_URL = `${SITE_URL}/catalog.json`;
const AI_SHOPPING_URL = `${SITE_URL}/ai-shopping.json`;
const ARD_URL = `${SITE_URL}/.well-known/ard.json`;
const LLMS_URL = `${SITE_URL}/llms.txt`;
const LLMS_FULL_URL = `${SITE_URL}/llms-full.txt`;

export const aiDiscoveryMetadata: Metadata = {
  alternates: {
    types: {
      "application/ld+json": [
        { url: ENTITY_JSON_URL, title: "Organization Entity" },
        { url: CATALOG_JSON_URL, title: "Product Catalog" },
        { url: AI_SHOPPING_URL, title: "AI Shopping Index" },
        { url: ARD_URL, title: "Agentic Resource Discovery" },
      ],
      "text/plain": [
        { url: LLMS_URL, title: "LLM Context (Short)" },
        { url: LLMS_FULL_URL, title: "LLM Context (Full)" },
      ],
    },
  },
};

export const aiDiscoveryLinks = [
  { rel: "alternate", type: "application/ld+json", href: ENTITY_JSON_URL, title: "Organization Entity" },
  { rel: "alternate", type: "application/ld+json", href: CATALOG_JSON_URL, title: "Product Catalog" },
  { rel: "alternate", type: "application/ld+json", href: AI_SHOPPING_URL, title: "AI Shopping Index" },
  { rel: "alternate", type: "application/ld+json", href: ARD_URL, title: "Agentic Resource Discovery" },
  { rel: "alternate", type: "text/plain", href: LLMS_URL, title: "LLM Context (Short)" },
  { rel: "alternate", type: "text/plain", href: LLMS_FULL_URL, title: "LLM Context (Full)" },
];
