import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "Googlebot",
  "bingbot",
  "DuckAssistBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Applebot",
  "Applebot-Extended",
  "FacebookBot",
  "meta-externalagent",
];

const DISCOVERY_ALLOW = [
  "/",
  "/ai-shopping.json",
  "/catalog.json",
  "/geo-baseline.json",
  "/entity.json",
  "/entity-profiles.json",
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/feeds/",
  "/.well-known/ard.json",
  "/.well-known/agents.json",
  "/.well-known/llms.txt",
  "/.well-known/security.txt",
  "/.well-known/humans.txt",
  "/agents.json",
  "/humans.txt",
  "/catalog",
  "/ai-shopping",
  "/entity",
  "/geo-baseline",
  "/llms",
  "/pricing.json",
  "/products.json",
  "/en/ai-shopping.json",
  "/en/catalog.json",
  "/en/entity.json",
  "/en/geo-baseline.json",
  "/en/pricing.json",
  "/en/products.json",
  "/en/llms.txt",
  "/data/catalog.json",
  "/data/prices.json",
  "/api/catalog",
  "/api/products",
  "/api/prices",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [...DISCOVERY_ALLOW],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: [...DISCOVERY_ALLOW],
      })),
    ],
    // Bing Host directive prefers bare hostname (no scheme).
    host: "arledscreen.com",
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
