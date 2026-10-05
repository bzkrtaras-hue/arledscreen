# FAQ + LinkCloud gaps (Gün 28)

Son güncelleme: 2026-10-05  
Guards: `audit:faq` · `audit:shopping-links`

## Bulgu

Ürün grubu sayfalarında FAQ vardı ama **catalog.json / led-ekran-fiyatlari** fiyat kaynağı
hiçbir cevapta geçmiyordu (priced gruplarda `quickPrice` bile URL vermiyordu; quote-only’de hiç yoktu).

## Düzeltme

| Yüzey | Değişiklik |
|-------|------------|
| `products/[slug]` | `shoppingSourceFaq` + güçlendirilmiş `priceAnswer` (catalog/fiyat/hesaplayıcı URL) |
| SSS UI | `groupFaqs` = source + quickPrice + grup FAQs |
| Link strip | `ShoppingLinkCloud` (hesaplayıcı + entity + GOB vs SMD) |
| `audit:faq` | 13 ürün grubu da price-hint zorunlu |
| `audit:shopping-links` | hesaplayıcı + entity zorunlu; tüm product dirs + led-tabela rehberi |

## Doğrulama

```bash
npm run build
# audit-faq: … + N product groups
# audit-shopping-links: fiyat+catalog+quote+hesaplayici+entity
```
