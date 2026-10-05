# AI alışveriş regression suite (Gün 29)

Son güncelleme: 2026-10-05  
Komut: `npm run audit:all` (build sonrası) · postbuild zinciri aynı guard’ları çalıştırır

## Tek komut

```bash
npm run build          # üretir + postbuild audit’leri
# veya yalnızca audit (out/ varken):
npm run audit:all
```

`scripts/audit-ai-shopping-suite.mjs` 14 audit’i sırayla çalıştırır ve tablo basar:

| Audit | Gün / katman |
|-------|----------------|
| offers | P0 fiyat/Offer |
| images | P0 ürün görseli |
| shopping-links | 28 LinkCloud |
| faq | 28 FAQ price hint |
| entity | P0 sameAs |
| schema | 17 GSC schema |
| locale | 18 thin EN |
| case-images | 19 foto gap |
| product-ctas | 22 CTA sıra |
| sitemap | 23 completeness |
| robots | 24 Bing/AI Host |
| blind-test | 25 kör test site readiness |
| cite-parity | 26 entity↔llms |
| merchant-feed | 27 GMC TSV 12 SKU |

Çıkış kodu: herhangi biri FAIL → `1` (CI kırmızı).

## Owner hâlâ bloklayanlar (suite yeşil olsa bile)

1. PR #55 merge + CF redeploy → canlı entity/catalog/ard  
2. Point C üçüncü taraf atıf  
3. Canlı kör tur skor kartı  
4. Merchant Center feed yükleme
