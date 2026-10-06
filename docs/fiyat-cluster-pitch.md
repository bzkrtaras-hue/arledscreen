# Fiyat cluster pitch + hesaplayıcı (Gün 32)

Son güncelleme: 2026-10-05

## Ne değişti

| Yüzey | Değişiklik |
|-------|------------|
| Pitch landings (`p*-led-ekran`) | `PANEL_PRICES`’tan pitch’e özel USD cümlesi (intro + FAQ); catalog.json kaynak; agent FAQ |
| `/tr/hesaplayici/` | FAQPage + ShoppingLinkCloud + merchant TSV; catalog/entity cite |
| Audits | shopping-links + faq + blind-test hesaplayıcı/P2.5 USD |

## Kural

Yalnızca `PANEL_PRICES` / `catalog.json` değerleri. Uydurma TL paket yok. Quote-only pitch yok (pitch sayfaları priced paneller).

## Doğrulama

```bash
npm run build
# P2.5 sayfasında 32,18 + catalog.json
# hesaplayici FAQPage + merchant-priced-panels.tsv
```
