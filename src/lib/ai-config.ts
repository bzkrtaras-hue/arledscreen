/**
 * AI Discovery & Semantic Indexing Configuration
 * 
 * This file centralizes all AI-ready resource URLs and configuration
 * for semantic search engines, LLM assistants, and shopping agents.
 * 
 * Production URLs (no trailing slash):
 * - Catalog: https://arledscreen.com/catalog.json
 * - AI Shopping Index: https://arledscreen.com/ai-shopping.json
 * - Entity (Organization): https://arledscreen.com/entity.json
 * - ARD (Discovery): https://arledscreen.com/.well-known/ard.json
 * - LLM Context (short): https://arledscreen.com/llms.txt
 * - LLM Context (full): https://arledscreen.com/llms-full.txt
 * - Price Feed (TSV): https://arledscreen.com/feeds/merchant-priced-panels.tsv
 */

export const AI_DISCOVERY_CONFIG = {
  siteUrl: "https://arledscreen.com",
  feeds: {
    catalog: "https://arledscreen.com/catalog.json",
    aiShopping: "https://arledscreen.com/ai-shopping.json",
    entity: "https://arledscreen.com/entity.json",
    ard: "https://arledscreen.com/.well-known/ard.json",
    llmsShort: "https://arledscreen.com/llms.txt",
    llmsFull: "https://arledscreen.com/llms-full.txt",
    priceFeed: "https://arledscreen.com/feeds/merchant-priced-panels.tsv",
  },
  priceValidUntil: "2026-12-31",
  currency: "USD",
  products: 12,
  keyPages: {
    priceHub: "https://arledscreen.com/tr/led-ekran-fiyatlari/",
    quote: "https://arledscreen.com/tr/quote/",
    calculator: "https://arledscreen.com/tr/hesaplayici/",
    about: "https://arledscreen.com/tr/about/",
  },
  contact: {
    email: "arled@arledscreen.com",
    phone: "+905305078834",
    address: "Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul, Türkiye",
  },
};

export type AIDiscoveryConfig = typeof AI_DISCOVERY_CONFIG;
