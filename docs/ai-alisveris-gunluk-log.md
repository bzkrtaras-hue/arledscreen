# AI alışveriş / GEO — 30 günlük çalışma günlüğü

Hedef: arledscreen.com’u AI alışveriş ajanları için makinece okunabilir lider konumda tutmak.
Spam blog / 81-il doorway yok. Point C = sahibi işletecek üçüncü taraf atıflar.

| Gün | Tarih | İş | Durum |
|-----|-------|-----|-------|
| 16 | 2026-10-05 | CWV mobile smoke + MailerLite heading | ✅ |
| 17 | 2026-10-05 | GSC invalid-schema regression (`audit:schema`) | ✅ |
| 18 | 2026-10-05 | Thin EN noindex + `audit:locale` | ✅ |
| 19 | 2026-10-05 | Case-study photo gaps (`audit:case-images`) | ✅ |
| 20 | 2026-10-05 | GOB vs SMD + ShoppingLinkCloud | ✅ |
| 21 | 2026-10-05 | `groupAggregateOffers` in catalog.json | ✅ |
| 22 | 2026-10-05 | ProductCtaRow + `audit:product-ctas` | ✅ |
| 23 | 2026-10-05 | Sitemap completeness (`audit:sitemap`) | ✅ |
| 24 | 2026-10-05 | Bing/AI bot Allow + Host (`audit:robots`) | ✅ |
| 25 | 2026-10-05 | Kör test protokolü + `audit:blind-test` | ✅ |
| 26 | 2026-10-05 | llms/entity cite parity (`audit:cite-parity`) | ✅ |
| 27 | 2026-10-05 | Merchant feed dry-run 12 SKU (`audit:merchant-feed`) | ✅ |
| 28 | 2026-10-05 | FAQ + LinkCloud gaps (ürün grupları catalog hint) | ✅ |
| 29 | 2026-10-05 | Regression suite tek komut (`audit:all`) | ✅ |
| 30 | 2026-10-05 | Ay sonu pano + `smoke:live` (ölçüm 2026-11-04) | ✅ |
| 31 | 2026-10-05 | Fiyat hub AI sources + Merchant ARD + `_routes` exclude | ✅ |
| 32 | 2026-10-05 | Pitch USD FAQs + hesaplayici shopping FAQ/LinkCloud | ✅ |
| 33 | 2026-10-05 | İzleme/kiralama rehber + quote FAQ (list vs teklif) | ✅ |
| 34 | 2026-10-05 | About/NXTIONSTAR/products hub identity FAQs + LinkCloud | ✅ |

## Gün 24–28 özeti

- 24 robots Allow + Host · 25 kör test · 26 cite parity · 27 Merchant TSV · 28 FAQ/LinkCloud catalog hint

## Gün 29 notları

- `npm run audit:all` → 14 audit PASS/FAIL tablosu
- [`docs/ai-shopping-regression-suite.md`](./ai-shopping-regression-suite.md)

## Gün 30 notları

- [`docs/ai-alisveris-ay-sonu-pano.md`](./ai-alisveris-ay-sonu-pano.md) — site/canlı/Point C/kör test/Merchant ölçüm şablonu
- `npm run smoke:live` — 2026-10-05: **1/10 PASS** (sitemap); entity/catalog/ard/feed 404 → PR #55 merge şart
- Kod günleri 16–30 iskeleti tamam; **liderlik skoru** merge + Point C + 2026-11-04 kör tur 2 ile kapanır

## Gün 31 notları

- Fiyat hub FAQ + ShoppingLinkCloud: catalog / entity / merchant TSV
- `ard.json` + `ai-catalog.json`: Merchant feed discovery entry
- `_routes.json` exclude: entity/catalog/feeds/well-known/llms (Functions’ın static AI dosyalarına dokunmaması)
- `_headers` CORS for merchant TSV; layout `<link rel=alternate>` merchant feed

## Gün 32 notları

- Pitch cluster (P1.25–P5): yayımlanmış PANEL_PRICES USD cümlesi + catalog FAQ + agent source
- Hesaplayıcı: FAQPage + ShoppingLinkCloud + merchant TSV; `audit:faq` / blind-test kapladı

## Gün 33 notları

- `piksel-araligi-secimi`: dış mekân USD tablosu + catalog/entity/merchant + pitch linkleri
- `kiralik-mi-satin-alma`: AI alışveriş list vs teklif tablosu (quote-only kuralı)
- `/tr/quote/`: FAQPage + ShoppingLinkCloud (ajanlar quote’a fiyat uydurmasın)

## Gün 34 notları

- `/tr/about/`: ENTITY_FAQS FAQPage + entity/catalog linkleri + ShoppingLinkCloud + HomeFaq
- `/tr/nxtionstar/`: panel fiyat FAQ + ShoppingLinkCloud (catalog/merchant)
- `/tr/products/`: hub FAQPage (list vs quote-only) + ShoppingLinkCloud

## Owner P0 (her gün hatırlatma)

1. PR #55 merge + Cloudflare Pages redeploy → canlı `/entity.json` `/catalog.json` `/.well-known/ard.json`
2. Point C: GBP + LinkedIn/IG/FB About = playbook pack
3. `arleds.com` → `arledscreen.com/tr/` 301
4. `npm run smoke:live` yeşile dönünce kör tur 1 skor kartı
