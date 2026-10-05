# Merchant / AI alışveriş — yalnızca priced paneller

Son güncelleme: 2026-10-05  
Kaynak: `PANEL_PRICES` → `catalog.json` → model sayfası Product JSON-LD  
Guard: `npm run audit:offers` (postbuild)

## Kural (asla bozma)

| Durum | Merchant / Offer |
|-------|------------------|
| `priceId` var (12 panel) | `offers.price` + `priceCurrency=USD` + `image` zorunlu |
| Quote-only (P8, esnek, şeffaf, transparan, poster, kiralık, kontrol) | **Offer yok** — GSC “Missing field offers.price” hatası üretir |
| Uydurma TL paket / stok fiyatı | Yok |

Google Merchant Center veya Shopping deneyleri **yalnızca** aşağıdaki 12 SKU ile sınırlı tutulur.

## Merchant-ready SKU listesi (2026)

| SKU | Ürün URL | Panel USD | Görsel |
|-----|----------|-----------|--------|
| p1-25-ic-gob | /tr/products/gob-led-ekran/p1-25-gob/ | 95.88 | model image |
| p1-53-ic-gob | /tr/products/gob-led-ekran/p1-53-gob/ | 62.08 | model image |
| p1-86-ic-gob | /tr/products/gob-led-ekran/p1-86-gob/ | 49.08 | model image |
| p2-5-ic | /tr/products/ic-mekan-led-ekran/p2-5/ | 32.18 | model image |
| p3-07-ic | /tr/products/ic-mekan-led-ekran/p3-07/ | 30.88 | model image |
| p4-ic | /tr/products/ic-mekan-led-ekran/p4/ | 26.98 | model image |
| p2-5-dis | /tr/products/dis-mekan-led-ekran/p2-5/ | 63.70 | model image |
| p2-9-dis | /tr/products/dis-mekan-led-ekran/p2-9/ | 53.30 | model image |
| p3-07-dis | /tr/products/dis-mekan-led-ekran/p3-07/ | 44.20 | model image |
| p4-dis | /tr/products/dis-mekan-led-ekran/p4/ | 33.80 | model image |
| p4-dis-front | /tr/products/dis-mekan-led-ekran/p4-on-servis/ | 36.40 | model image |
| p5-dis | /tr/products/dis-mekan-led-ekran/p5/ | 29.90 | model image |

Makinece: https://arledscreen.com/catalog.json (PR #55 deploy sonrası)

## Quote-only — Merchant’a ekleme

- P8 dış mekân, esnek P1.86/P2.5
- Şeffaf / transparan / poster-totem / kiralık ürün grupları
- Huidu / NovaStar / Colorlight kontrol modelleri (10)

Bu sayfalarda Product schema vardır; **offers yoktur**. Teklif: `/tr/quote/`.

## Site tarafı checklist (kod — yeşil)

- [x] Priced model Product: `offers.price` + USD + `priceSpecification`
- [x] Quote-only model Product: `offers` yok + quote `potentialAction`
- [x] `catalog.json` ↔ `PANEL_PRICES` parity
- [x] Fiyat hub + hesaplayıcı parity
- [x] `catalog.json` ürünlerinde absolute `image` (generate-ai-catalog)
- [x] `catalog.json` `groupAggregateOffers` — all / iç / dış / GOB AggregateOffer bantları (quote-only yok)
- [x] postbuild `audit:offers`
- [x] Merchant dry-run TSV (yalnız 12 SKU) — `public/feeds/merchant-priced-panels.tsv` + `audit:merchant-feed`

## Sahip checklist (Merchant Center)

1. [ ] PR #55 merge + CF redeploy; `catalog.json` ve 12 model URL **200**
2. [ ] Merchant Center’da yalnızca 12 priced SKU (yukarıdaki tablo)
3. [ ] Feed URL: `https://arledscreen.com/feeds/merchant-priced-panels.tsv` (veya dosyayı yükle)
4. [ ] Feed / URL inspection: her SKU’da price + currency + image
5. [ ] Quote-only URL’leri feed’e **ekleme**
6. [ ] Fiyat değişince `PANEL_PRICES` → build → catalog + TSV; Merchant’ı senkron tut
7. [ ] GSC → Enhancements → Merchant listings: “Missing offers.price” = 0

## Doğrulama komutları

```bash
npm run catalog && npm run merchant-feed
npm run build   # postbuild audit:offers + audit:merchant-feed dahil
# manuel: out/feeds/merchant-priced-panels.tsv — 12 satır, quote-only yok
```

## Notlar

- Fiyat panel (modül) başına USD; KDV/nakliye hariç.
- m² maliyeti ≈ panel × 19,53 + işçilik/kontrol/yazılım (hesaplayıcı).
- Nihai proje tutarı yazılı teklifle kesinleşir — Merchant’da “from” iddiası yok.
- TSV `shipping=TR:::0 USD` ve `tax=TR:0:n` yer tutucu; Merchant hesabında gerçek kargo/KDV ayarı sahibi kontrol eder.
