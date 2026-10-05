# AI alışveriş regression suite (Gün 29 → güncellendi Gün 45)

Son güncelleme: 2026-10-05  
Komut: `npm run audit:all` (build sonrası) · postbuild zinciri aynı guard’ları çalıştırır

## Tek komut

```bash
npm run build          # üretir + postbuild audit’leri
# veya yalnızca audit (out/ varken):
npm run audit:all
```

`scripts/audit-ai-shopping-suite.mjs` 15 audit’i sırayla çalıştırır ve tablo basar:

| Audit | Gün / katman |
|-------|----------------|
| offers | P0 fiyat/Offer |
| images | P0 ürün görseli |
| shopping-links | 28→45 LinkCloud (**143+ yüzey**; SEO-guide cluster dahil) |
| faq | 28→45 FAQ price hint (home/hub/founder/blog/seo-guides…) |
| entity | P0 sameAs + entity-profiles packs + Org hasOfferCatalog |
| schema | 17 GSC schema |
| locale | 18 thin EN |
| case-images | 19 foto gap |
| product-ctas | 22 CTA sıra |
| sitemap | 23 completeness |
| robots | 24 Bing/AI Host |
| blind-test | 25 kör test + entity-profiles ARD |
| cite-parity | 26 entity↔llms↔profiles |
| merchant-feed | 27 GMC TSV 12 SKU |
| ai-headers | 44 CORS + Content-Type + CORP |

Çıkış kodu: herhangi biri FAIL → `1` (CI kırmızı).

## Canlı ölçüm

```bash
npm run smoke:live          # 12 endpoint
npm run point-c-packs       # local paste packs
npm run point-c-packs -- --live   # deploy sonrası
```

Merge-gün checklist: [`point-c-merge-day.md`](./point-c-merge-day.md)

## Owner hâlâ bloklayanlar (suite yeşil olsa bile)

1. PR #55 merge + CF redeploy → canlı entity/catalog/ard/entity-profiles  
2. Point C üçüncü taraf atıf (`entity-profiles.json` packs)  
3. Canlı kör tur skor kartı  
4. Merchant Center feed yükleme
