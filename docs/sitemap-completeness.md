# Sitemap completeness (Gün 23)

Son güncelleme: 2026-10-05  
Guard: `npm run audit:sitemap` (postbuild)

## Kapsam

| Küme | Kaynak | Sitemap |
|------|--------|---------|
| Commercial landings | `COMMERCIAL_PAGES` | `/tr/<slug>/` |
| Product groups + models | `PRODUCT_GROUPS` + `LED_MODELS` | `/tr/products/...` |
| Case studies | `PROJECT_CASE_STUDIES` | `/tr/projelerimiz/<slug>/` |
| Decision rehber | article slugs + SEO guides | `/tr/rehber/...` |
| Fiyat hub | sabit | `/tr/led-ekran-fiyatlari/` |
| EN indexable | home, yapay-zeka, rehber(+guides) | 11 URL |
| Thin EN / AR / RU | — | **yok** |

## Gün 23 düzeltme

- Eksik: `/tr/rehber/led-ekran-fiyatlari/` (indexable article) → sitemap’e eklendi
- Toplam: **155** URL; tüm indexable TR HTML (144) sitemap’te

## Çalıştırma

```bash
npm run build   # postbuild → audit:sitemap
node scripts/audit-sitemap.mjs
```
