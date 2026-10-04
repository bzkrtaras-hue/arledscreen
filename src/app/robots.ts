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
  "Applebot",
  "Applebot-Extended",
  "FacebookBot",
  "meta-externalagent",
];

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
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
