# robots.txt — Bing / AI bot Allow + Host (Gün 24)

> **Canlı not (2026-10-06):** Custom domain ara sıra CDN HIT ile eski `Host: https://arledscreen.com` döndürebilir. Function/origin bare `Host: arledscreen.com`. Purge veya TTL.

Son güncelleme: 2026-10-05  
Guard: `npm run audit:robots` (postbuild)

## Politika

AI alışveriş / GEO: **Allow** hem answer-engine hem training crawler’lara.
Amaç: ChatGPT / Gemini / Perplexity / Bing Copilot / Amazon search ajanlarının
`entity.json` + `catalog.json` + ürün URL’lerini okuyabilmesi.

| Satır | Değer |
|-------|--------|
| `User-agent: *` | `Allow: /` |
| Bing | `bingbot`, `BingPreview` → Allow |
| Google | `Googlebot`, `GoogleOther`, `Google-Extended` → Allow |
| OpenAI | `OAI-SearchBot`, `ChatGPT-User`, `GPTBot` → Allow |
| Anthropic | `Claude-SearchBot`, `Claude-User`, `ClaudeBot` → Allow |
| Perplexity | `PerplexityBot`, `Perplexity-User` → Allow |
| Amazon | `Amzn-SearchBot`, `Amazonbot` → Allow |
| Apple | `Applebot`, `Applebot-Extended` → Allow |
| Yandex (TR GEO) | `YandexBot`, `Yandex` → Allow |
| DuckDuckGo | `DuckAssistBot`, `DuckDuckBot` → Allow |
| **Host** | `arledscreen.com` (şemasız — Bing Host) |
| **Sitemap** | `https://arledscreen.com/sitemap.xml` |

Kaynak: `src/app/robots.ts` (`AI_SEARCH_BOTS` + `AI_TRAINING_BOTS`).

## Doğrulama

```bash
npm run build
node scripts/audit-robots.mjs
curl -s https://arledscreen.com/robots.txt | head -80
```

Canlıda Host satırı eski `https://arledscreen.com` olabilir → **PR #55 merge + CF redeploy** sonrası bare hostname.
