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
| 35 | 2026-10-05 | Founder + yapay-zeka ShoppingLinkCloud / FAQ | ✅ |
| 36 | 2026-10-05 | SSS + hizmetler catalog FAQ + LinkCloud | ✅ |
| 37 | 2026-10-05 | Home + bölgeler hub/iller ShoppingLinkCloud | ✅ |
| 38 | 2026-10-05 | Rehber hub + projeler + galeri shopping FAQs | ✅ |
| 39 | 2026-10-05 | Case study + blog ShoppingLinkCloud / FAQ | ✅ |
| 40 | 2026-10-05 | Model pages LinkCloud + entity-profiles.json Point C | ✅ |
| 41 | 2026-10-05 | llms-full/smoke/footer Point C discovery | ✅ |
| 42 | 2026-10-05 | entity-profiles CORS + merge-day Point C checklist | ✅ |
| 43 | 2026-10-05 | Deploy artifact guard + blind-test skor kartı | ✅ |
| 44 | 2026-10-05 | AI headers parity (CORS+Content-Type) + `audit:ai-headers` | ✅ |

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

## Gün 35 notları

- `/tr/about/aras-bozkurt/`: kurucu FAQPage + ShoppingLinkCloud (E-E-A-T ↔ entity/catalog)
- `/tr/yapay-zeka/`: ShoppingLinkCloud + hesaplayıcı/merchant agent linkleri
- FAQ + shopping-link audits: founder + yapay-zeka

## Gün 36 notları

- `/tr/sss/`: fiyat cevaplarına catalog.json + AI ajan FAQ + ShoppingLinkCloud
- `/tr/hizmetler/`: panel vs teklif FAQ + ShoppingLinkCloud
- FAQ + shopping-link audits: sss + hizmetler

## Gün 37 notları

- TR ana sayfa: home FAQ catalog/entity cites + ShoppingLinkCloud
- `/tr/bolgeler/`: fiyat FAQ + LinkCloud; il sayfalarına ShoppingLinkCloud
- FAQ audit: home + bölgeler hub price-hint; shopping-links: home + tüm bölgeler

## Gün 38 notları

- `/tr/rehber/`: hub FAQPage + ShoppingLinkCloud (list vs teklif)
- `/tr/projelerimiz/`: proje fiyat/kimlik FAQ + LinkCloud (81-il yok hatırlatması)
- `/tr/galeri/`: ShoppingLinkCloud
- FAQ + shopping-link audits: rehber hub + projeler + galeri

## Gün 39 notları

- Case study şablonu: ShoppingLinkCloud (uydurma paket yok → catalog/fiyat)
- `/tr/blog/`: FAQPage + LinkCloud; her blog yazısına ShoppingLinkCloud + catalog/entity cites
- shopping-links audit: tüm case + blog sayfaları

## Gün 40 notları

- Ürün model sayfaları: ShoppingLinkCloud (25 model)
- `/entity-profiles.json`: Point C yapıştırma pack’leri (GBP/LinkedIn/IG/FB) — sync-entity üretir
- ARD + llms.txt discovery; `_routes.json` exclude
- shopping-links: model sayfaları da

## Gün 41 notları

- `llms-full.txt` §5: entity-profiles + about + products hub intent satırları
- Root layout `<link rel=alternate>` + footer: entity-profiles.json
- `entity.json` → `entityProfilesJson` self-link; cite-parity pack MEDIUM
- `smoke:live`: entity-profiles + about kontrolleri (12 check)
- Ay sonu panosu: Point C packs + LinkCloud metrikleri

## Gün 42 notları

- `_headers`: `/entity-profiles.json` CORS + CORP cross-origin (ajan fetch)
- Ürün grubu `shoppingSourceFaq`: entity-profiles cite
- [`docs/point-c-merge-day.md`](./point-c-merge-day.md): merge → smoke → yapıştırma → kör tur
- `npm run point-c-packs` (+ `--live`); regression suite docs güncellendi

## Gün 43 notları

- postbuild: AI static artefact + `_routes` exclude + entity-profiles CORS guard (FAIL on missing)
- [`docs/ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md): tur 1/2 skor kartı
- `audit:blind-test`: llms-full intent (profiles/about/products) + profiles pack checks
- Master checklist: entity-profiles + merge owner items

## Owner P0 (her gün hatırlatma)

1. PR #55 merge + Cloudflare Pages redeploy → canlı `/entity.json` `/catalog.json` `/.well-known/ard.json` `/entity-profiles.json`
2. Point C: [`point-c-merge-day.md`](./point-c-merge-day.md) + `entity-profiles.json` packs
3. `arleds.com` → `arledscreen.com/tr/` 301
4. `npm run smoke:live` yeşile → [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md) tur 1

## Gün 44 notları

- `_headers`: entity/catalog/llms Content-Type charset parity (ajan parse)
- `audit:ai-headers`: 8 AI path CORS + CORP + Content-Type (postbuild + `audit:all` → 15)
- `smoke:live`: HTTP 200 iken CORS/Content-Type HEADERS kontrolü
