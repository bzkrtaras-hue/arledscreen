# Cite parity — entity ↔ llms ↔ about (Gün 26)

Son güncelleme: 2026-10-05  
Guard: `npm run audit:cite-parity` (postbuild)

## Kural

Tek kaynak: `src/lib/entity.ts` → `ENTITY_CITE_ONE_LINER` / `SHORT` / `MEDIUM` / `SHORT_EN`.

| Yüzey | Beklenti |
|-------|----------|
| `public/entity.json` | `cite*` alanları birebir |
| `llms.txt` / `llms-full.txt` | Üç cite cümlesi verbatim + NAP + disambiguation |
| `/tr/about/` · `/tr/about/aras-bozkurt/` | `citeMedium` HTML’de |
| `seo.ts` about | `ENTITY_CITE_SHORT` + `ENTITY_CITE_MEDIUM` import |
| `/tr/yapay-zeka/` | entity.json + catalog.json + llms.txt linkleri |

Apostrof / tire farkı (ASCII `'` vs U+2019 `’`) **fail** sayılır — ajanlar farklı metin görür.

## Doğrulama

```bash
npm run build
node scripts/audit-cite-parity.mjs
```
