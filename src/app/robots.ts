import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Explicit Allow for search + answer-engine + (optionally) training crawlers.
 * Policy: AI alışveriş / GEO — ajanların entity.json + catalog.json okuması için açık.
 * Do not Disallow training bots here; brand wants citation AND correct entity ingestion.
 */
export const AI_SEARCH_BOTS = [
  "bingbot",
  "BingPreview",
  "Googlebot",
  "GoogleOther",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "DuckDuckBot",
  "Amzn-SearchBot",
  "Applebot",
  "YandexBot",
  "Yandex",
  "FacebookBot",
  "meta-externalagent",
] as const;

/** Training / foundation-model crawlers — also Allowed for entity discovery. */
export const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
] as const;

export const AI_BOTS = [...AI_SEARCH_BOTS, ...AI_TRAINING_BOTS] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
      })),
    ],
    // Bing Host directive prefers bare hostname (no scheme).
    host: "arledscreen.com",
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
