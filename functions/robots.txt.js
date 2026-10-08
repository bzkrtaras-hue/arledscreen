/**
 * Live robots.txt via Pages Function — Host must be bare hostname (no https://).
 * Keep in sync with src/app/robots.ts (AI bot Allows + Sitemap).
 *
 * Apex CDN: Cloudflare Page Rule cache_level=bypass for arledscreen.com/robots.txt
 * (id a34310c8cc7c12ba4d368b8c7f2cb1ed, 2026-10-06) — purge token yokken stale HIT’i kırar.
 */
const BODY = `# ARLEDSCREEN AI/GEO crawl policy — Allow entity/catalog/ai-shopping/geo-baseline/feeds
User-Agent: *
Allow: /
Allow: /ai-shopping.json
Allow: /catalog.json
Allow: /geo-baseline.json
Allow: /entity.json
Allow: /entity-profiles.json
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /ai.txt
Allow: /feeds/
Allow: /.well-known/ard.json
Allow: /.well-known/agents.json
Allow: /.well-known/agent.json
Allow: /.well-known/llms.txt
Allow: /.well-known/llms-full.txt
Allow: /.well-known/ai.txt
Allow: /.well-known/ai-shopping.json
Allow: /.well-known/prices.json
Allow: /.well-known/price.json
Allow: /.well-known/pricing.json
Allow: /.well-known/merchant.json
Allow: /.well-known/panels.json
Allow: /.well-known/modules.json
Allow: /.well-known/sku.json
Allow: /.well-known/mpn.json
Allow: /.well-known/offer.json
Allow: /.well-known/offers.json
Allow: /.well-known/dataset.json
Allow: /.well-known/feed.json
Allow: /.well-known/entity.json
Allow: /.well-known/cite.json
Allow: /.well-known/faq.json
Allow: /.well-known/faqs.json
Allow: /.well-known/organization.json
Allow: /.well-known/company.json
Allow: /.well-known/nap.json
Allow: /.well-known/about.json
Allow: /.well-known/brand.json
Allow: /.well-known/catalog.json
Allow: /.well-known/security.txt
Allow: /.well-known/security
Allow: /.well-known/humans.txt
Allow: /agents.json
Allow: /agent.json
Allow: /AGENTS.md
Allow: /humans.txt
Allow: /point-c.txt
Allow: /point-c-en.txt
Allow: /.well-known/point-c.txt
Allow: /security.txt
Allow: /catalog
Allow: /ai-shopping
Allow: /entity
Allow: /geo-baseline
Allow: /llms
Allow: /pricing.json
Allow: /prices.json
Allow: /price.json
Allow: /panels.json
Allow: /modules.json
Allow: /sku.json
Allow: /mpn.json
Allow: /merchant.json
Allow: /panels
Allow: /sku
Allow: /mpn
Allow: /merchant
Allow: /products.json
Allow: /products
Allow: /product.json
Allow: /organization.json
Allow: /company.json
Allow: /about.json
Allow: /nap.json
Allow: /brand.json
Allow: /offer.json
Allow: /offers.json
Allow: /offer
Allow: /offers
Allow: /dataset.json
Allow: /dataset
Allow: /feed
Allow: /organization
Allow: /company
Allow: /nap
Allow: /cite.json
Allow: /cite
Allow: /faq.json
Allow: /faq
Allow: /faqs.json
Allow: /faqs
Allow: /feed.json
Allow: /feeds/prices.json
Allow: /feeds/prices.rss
Allow: /feeds/catalog.json
Allow: /en/ai-shopping.json
Allow: /en/catalog.json
Allow: /en/entity.json
Allow: /en/geo-baseline.json
Allow: /en/pricing.json
Allow: /en/prices.json
Allow: /en/price.json
Allow: /en/products.json
Allow: /en/llms.txt
Allow: /tr/llms.txt
Allow: /en/llms-full.txt
Allow: /tr/llms-full.txt
Allow: /en/ai.txt
Allow: /tr/ai.txt
Allow: /en/entity-profiles.json
Allow: /tr/entity-profiles.json
Allow: /data/catalog.json
Allow: /data/prices.json
Allow: /api/catalog
Allow: /api/catalog.json
Allow: /api/products
Allow: /api/prices
Allow: /api/prices.json
Allow: /api/panels
Allow: /api/panels.json
Allow: /api/merchant
Allow: /api/merchant.json
Allow: /api/mpn
Allow: /api/mpn.json
Allow: /api/entity
Allow: /api/entity.json
Allow: /api/ai-shopping
Allow: /api/ai-shopping.json
Allow: /api/v1/prices
Allow: /v1/prices
Allow: /v1/panels
Allow: /v1/merchant
Allow: /v1/mpn
Allow: /v1/sku

User-Agent: bingbot
Allow: /

User-Agent: BingPreview
Allow: /

User-Agent: Googlebot
Allow: /

User-Agent: GoogleOther
Allow: /

User-Agent: Google-CloudVertexBot
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

User-Agent: cohere-ai
Allow: /

Host: arledscreen.com
# cache-bust-geo60-2026-10-07q-pdp-offer-sameas
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
