# Point C — merge günü kontrol listesi (Gün 69)

Hedef: PR #55 deploy olduktan **aynı gün** canlı AI yüzeyleri + bağımsız atıf başlasın.
Spam blog / 81-il yok. Kaynak: [`entity-profiles.json`](https://arledscreen.com/entity-profiles.json) · playbook: [`offsite-entity-playbook.md`](./offsite-entity-playbook.md)

**Durum (2026-10-06 kapanış — ajan tamamlayabildikleri):**
- Canlı AI JSON **GET 200**: entity / catalog / ai-shopping / ard / profiles / ai-catalog
- `robots.txt` 3×: `cf-cache-status: BYPASS` · `Host: arledscreen.com` — **Host turu KAPALI**
- `smoke:live` **20/20 PASS** · CI tip success · invent hedge = prompt/agentRules (sayfa URL 404 beklenen, kırık değil)
- PR #55 ready for review; merge sahip onayı (Point C paste merge beklemez)

**Hâlâ sahip (ajan kapatamaz):** (1) Point C paste GBP→LI→IG→FB — Drive https://docs.google.com/document/d/1JCU3RoL-ZJeOBHl73LRPrxRijDKD4FYdUscBKGOY1jc/edit · packs https://arledscreen.com/entity-profiles.json (2) Tur 1a skor kartı (uydurma skor yok)

**Kanonik site:** yalnızca `https://arledscreen.com`. `arleds.com` bizim site değil — sameAs yok, sahip 301 görevi yok. IG/FB/LI sameAs URL’leri **200**.

Pre-merge (opsiyonel, zaten yeşil olmalı):

```bash
npm run build          # postbuild audits + smoke:local
npm run verify:premerge
```

## 0) Canlı kapı (KAPALI — ajan; merge zorunlu değil)

1. AI JSON canlı **200** (üretim deploy zaten servis ediyor)
2. robots Host bare 3× BYPASS — tur kapalı
3. Point C paste **şimdi** yapılabilir — merge beklemeyin
4. Invent hedge sayfaları yok (prompt/agentRules); URL 404 beklenen

## 1) Canlı smoke (zorunlu)

```bash
npm run smoke:live
# veya hepsi birden:
npm run post-deploy
```

Hedef: **20/20 PASS**. Son ölçüm 2026-10-06: 20/20; robots Host bare (3× BYPASS).

| URL | Beklenen |
|-----|----------|
| `/ai-shopping.json` | 200 · `pricedPanels=12` · `agentRules` · extrasUsd≠list SKU · ücretsiz kargo yok · blind #13–#118 |
| `/entity.json` | 200 JSON · `citeOneLiner` · Gaziosmanpaşa · `hasOfferCatalog` + kontrol |
| `/entity-profiles.json` | 200 JSON · packs incl. `crunchbaseDraft` · `googleMerchantReadiness` · `sameAsReadiness` |
| `/catalog.json` | 200 · `dataset` · `groupAggregateOffers` · `shippingDetails` · `hasMerchantReturnPolicy` · ücretsiz kargo yok · quoteOnly+kontrol |
| `/.well-known/ard.json` | 200 · catalog + entity-profiles + ai-shopping · nxtionstar/founder/rehber · **118 kör test** · /ar/ /ru/ + TR priced models |
| `/llms.txt` / `/llms-full.txt` | cite + pricedPanels + ücretsiz kargo yok + Huidu/kontrol quote-only |
| `/feeds/merchant-priced-panels.tsv` | 12 SKU · `p2-5-ic` · shipping boş · `return_policy_label=quote_contract_only` · iade honesty |
| `/tr/about/` · `/tr/yapay-zeka/` · `/tr/led-ekran-fiyatlari/` | entity + catalog + ai-shopping |
| `/sitemap.xml` | catalog + ai-shopping + ai-catalog |
| IndexNow key `.txt` | 200 · key body |

Hızlı curl:

```bash
for u in ai-shopping.json entity.json entity-profiles.json catalog.json .well-known/ard.json .well-known/ai-catalog.json feeds/merchant-priced-panels.tsv; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://arledscreen.com/$u")
  echo "$code  /$u"
done
```

## 1b) IndexNow ping (smoke yeşil olduktan sonra)

Yalnızca kataloğdaki **değişmiş** + canlı **200** URL’ler, günde bir kez.
200/202 = bildirim kapısı; **indeks / AI anılması / P0 açılmaz**.
403/422/429 → [`indexnow-sahip-listesi.md`](./indexnow-sahip-listesi.md) + dur.

`npm run post-deploy` zaten IndexNow çalıştırır. Ayrı:

```bash
npm run indexnow -- --baseline   # ilk hash kaydı (POST yok)
npm run indexnow -- --live       # değişmiş URL’leri tek tek POST
```

Tek fetch ajan index: https://arledscreen.com/ai-shopping.json  
Dokümantasyon: [`indexnow.md`](./indexnow.md)

## 2) Point C yapıştırma (aynı NAP / cite)

## 2a) Sahip yapıştırma sırası (P0)

Canlı pack kaynağı: `npm run point-c-packs -- --live` veya https://arledscreen.com/entity-profiles.json

Canlı tek dosya yapıştırma: [`point-c-paste-bundle.md`](./point-c-paste-bundle.md) (üretim `entity-profiles.json` çekimi).  
**Drive Doc:** https://docs.google.com/document/d/1JCU3RoL-ZJeOBHl73LRPrxRijDKD4FYdUscBKGOY1jc/edit


1. **Google Business Profile** → `packs.gbpDescription` (NAP birebir)
2. **LinkedIn Company About** → `packs.linkedinAbout`
3. **Instagram bio** → `packs.instagramBio`
4. **Facebook About** → `packs.facebookAbout`
5. **Dizin short/long** → `packs.directoryShort` / `directoryLong`
6. **Bing Places** → `packs.bingPlaces` (NAP birebir; LED display / Digital signage)
7. (İsteğe) YouTube / Apple Business / Yandex — aynı cite; uydurma rating/fiyat yok
8. ~~arleds.com 301~~ — **iptal**: arleds.com bizim site değil; kanonik yalnızca arledscreen.com

Yapıştırma bitince: kör tur 1 tarihini skor kartına yaz; Tur 2’yi Point C sonrası planla.


```bash
npm run point-c-packs -- --live
# veya:
curl -sS https://arledscreen.com/entity-profiles.json | jq -r '.packs | keys[]'
```

| Kanal | Pack anahtarı | Not |
|-------|---------------|-----|
| Google Business Profile açıklama | `gbpDescription` | MEDIUM cite; kategori LED / dijital tabela |
| LinkedIn şirket About | `linkedinAbout` | Web + entity.json + ai-shopping + telefon |
| Instagram bio | `instagramBio` | Kısa; site TR |
| Facebook About | `facebookAbout` | MEDIUM cite |
| Dizin kısa | `directoryShort` | ONE_LINER |
| Dizin uzun | `directoryLong` | NAP + entity |
| YouTube About | `youtubeAbout` | SHORT + entity |
| Apple Business Connect | `appleBusinessConnect` | NAP + SHORT cite |
| Yandex Business / Maps | `yandexBusiness` | MEDIUM + NAP |
| Wikidata readiness | `wikidataReadiness` | Checklist only; no fake QID |
| Crunchbase draft | `crunchbaseDraft` | NAP + citeShort; no fake funding/headcount |
| Google Merchant readiness | `googleMerchantReadiness` | 12 SKU TSV only; shipping boş |

**Yapmayın:** uydurma rating, “Türkiye’nin en …”, sabit TL paket, ücretsiz kargo iddiası, kaydı olmayan il kapısı.

## 3) Domain birleştirme

- Kanonik web: `https://arledscreen.com` only (`arleds.com` bizim değil)
- Aynı telefonla iki domain indekste kalmasın

## 4) Kör tur 1 (deploy sonrası)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md) — **421** prompt × 0–3 = **/1263**  
**mustSay (özet):** ücretsiz kargo yok (#2–#6) · teklif + ai-shopping (#9–#10–#13–#17–#15) · 32.18 (#3) · yazılı teklif + Gaziosmanpaşa + sabit X yok (#25–#408 hedge zinciri; son: #406 Crestron Flex · #407 head apron · #408 Cisco Room Bar Pro · #409 ridge apron · #410 Neat Bar · #411 coping apron · #412 Rally Bar Huddle · #413 skirt apron · #414 Logitech Meetup · #415 counter apron · #416 Neat Frame · #417 lintel apron · #418 Rally Bar Mini · #419 window apron · #420 Neat Bar Pro · #421 door apron). Tam liste: `ai-shopping-blind-test.md`.
Skor: [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md)

Hedef tur 1 ≥ **632/1263**; Point C sonrası tur 2 ≥ **948/1263**.

## 5) Day 57–64 canlı doğrulama (özet)

- Offer `hasMerchantReturnPolicy` = MerchantReturnNotPermitted (12 SKU)
- Model FAQPage (25) + case study FAQPage (29) + blog/galeri FAQ
- FAQ honesty: ücretsiz kargo yok / quote-and-contract + kontrol quote-only (llms · hubs)
- Merchant `return_policy_label=quote_contract_only` · IndexNow kontrol product hubs
