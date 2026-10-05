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
        disallow: ["/tr/basin/", "/tr/basin"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
        disallow: ["/tr/basin/", "/tr/basin"],
      })),
    ],
    host: "https://arledscreen.com",
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
