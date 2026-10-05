# AI alışveriş regression suite (Gün 29 → güncellendi Gün 48)

Son güncelleme: 2026-10-05  
Komut: `npm run audit:all` (build sonrası) · postbuild zinciri aynı guard’ları çalıştırır

## Tek komut

```bash
npm run build          # üretir + postbuild audit’leri
# veya yalnızca audit (out/ varken):
npm run audit:all
```

`scripts/audit-ai-shopping-suite.mjs` 17 audit’i sırayla çalıştırır ve tablo basar:

| Audit | Gün / katman |
|-------|----------------|
| offers | P0+47 fiyat/Offer + catalog sku/@id join + pitch AggregateOffer |
| images | P0 ürün görseli |
| shopping-links | 28→48 LinkCloud (**143+**; + ai-shopping.json) |
| faq | 28→45 FAQ price hint (home/hub/founder/blog/seo-guides…) |
| entity | P0 sameAs + entity-profiles + Org/entity hasOfferCatalog |
| schema | 17 GSC schema |
| locale | 18 thin EN |
| case-images | 19 foto gap |
| product-ctas | 22 CTA sıra |
| sitemap | 23+48 completeness (+ ai-shopping) |
| robots | 24 Bing/AI Host |
| blind-test | 25+47 kör test + GOB/P2.5 + ai-shopping intent |
| cite-parity | 26+47 entity↔llms↔profiles + PANEL USD in llms-full |
| merchant-feed | 27 GMC TSV 12 SKU |
| ai-headers | 44+48 CORS + Content-Type + CORP (+ ai-shopping) |
| indexnow | 46 IndexNow key out/ |
| ai-shopping | 48 tek-fetch discovery index |

Çıkış kodu: herhangi biri FAIL → `1` (CI kırmızı).

## Canlı ölçüm

```bash
npm run smoke:live          # 14 endpoint (+ ai-shopping + IndexNow key)
npm run point-c-packs       # local paste packs
npm run point-c-packs -- --live   # deploy sonrası
npm run post-deploy         # smoke GREEN → IndexNow live
```

Merge-gün checklist: [`point-c-merge-day.md`](./point-c-merge-day.md) · IndexNow: [`indexnow.md`](./indexnow.md)

## Owner hâlâ bloklayanlar (suite yeşil olsa bile)

1. PR #55 merge + CF redeploy → canlı entity/catalog/ard/entity-profiles/ai-shopping  
2. Point C üçüncü taraf atıf (`entity-profiles.json` packs)  
3. Canlı kör tur skor kartı  
4. Merchant Center feed yükleme
