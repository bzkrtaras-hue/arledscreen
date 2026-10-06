/**
 * Live robots.txt via Pages Function — Host must be bare hostname (no https://).
 * Keep in sync with src/app/robots.ts (AI bot Allows + Sitemap).
 *
 * Apex CDN: Cloudflare Page Rule cache_level=bypass for arledscreen.com/robots.txt
 * (id a34310c8cc7c12ba4d368b8c7f2cb1ed, 2026-10-06) — purge token yokken stale HIT’i kırar.
 */
const BODY = `# ARLEDSCREEN AI/GEO crawl policy — Allow entity.json + catalog.json
User-Agent: *
Allow: /

User-Agent: bingbot
Allow: /

User-Agent: BingPreview
Allow: /

User-Agent: Googlebot
Allow: /

User-Agent: GoogleOther
Allow: /

User-Agent: OAI-SearchBot
Allow: /

User-Agent: ChatGPT-User
Allow: /

User-Agent: Claude-SearchBot
Allow: /

User-Agent: Claude-User
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: Perplexity-User
Allow: /

User-Agent: DuckAssistBot
Allow: /

User-Agent: DuckDuckBot
Allow: /

User-Agent: Amzn-SearchBot
Allow: /

User-Agent: Applebot
Allow: /

User-Agent: YandexBot
Allow: /

User-Agent: Yandex
Allow: /

User-Agent: FacebookBot
Allow: /

User-Agent: meta-externalagent
Allow: /

User-Agent: GPTBot
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: Applebot-Extended
Allow: /

User-Agent: Amazonbot
Allow: /

User-Agent: Bytespider
Allow: /

User-Agent: CCBot
Allow: /

Host: arledscreen.com
# cache-bust-geo60-2026-10-06h
Sitemap: https://arledscreen.com/sitemap.xml
`;

export async function onRequest() {
  return new Response(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, must-revalidate",
      "CDN-Cache-Control": "no-store",
      "Cloudflare-CDN-Cache-Control": "no-store",
      "Surrogate-Control": "no-store",
      "Pragma": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
