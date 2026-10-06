# Locale / canonical audit (Gün 18)

Son güncelleme: 2026-10-05  
Guard: `npm run audit:locale` (postbuild)

## Politika

| Locale | Index | Canonical | Sitemap |
|--------|-------|-----------|---------|
| **TR** (tam site) | index | self `/tr/...` | evet |
| **EN** home, yapay-zeka, rehber(+guides) | index | self `/en/...` + hreflang tr↔en | evet (11 URL) |
| **EN** thin: products, about, hesaplayici, quote | **noindex** | → `/tr/...` | hayır |
| **AR / RU** tüm sayfalar | **noindex** (layout) | rehber→EN; thin→TR; yapay-zeka→EN | hayır |

Thin shell tanımı: TR-gated UI / paneller / entity cite yok; dil çifti uydurma.

Kaynak liste: `THIN_LOCALE_PATHS` in `src/lib/seo.ts` + `buildThinLocaleMetadata()`.

## Doğrulama

```bash
npm run build   # postbuild runs audit:locale
# or
node scripts/audit-locale-canonical.mjs
```

Beklenen: `tr_canonical=144 thin_en_noindex=4 indexable_en=11`
