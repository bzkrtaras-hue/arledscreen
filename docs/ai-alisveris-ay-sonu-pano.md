# Ay sonu ölçüm panosu — AI alışveriş / GEO (Gün 30)

Hedef tarih: **2026-11-04**  
Site-side suite: `npm run audit:all` (17 audit)  
Canlı smoke: `npm run smoke:live`  
IndexNow / post-deploy: `npm run post-deploy`

Bu sayfa **ölçüm şablonu + sahip panosu**. Kod tarafı Gün 16–69 ile hazır;
canlı skorlar merge + Point C sonrası doldurulur.

## A) Site-side (repo) — 2026-10-05 (gün 16–55)

| Metrik | Hedef | Durum |
|--------|-------|-------|
| Regression suite | 17/17 PASS | ✅ `npm run audit:all` GREEN |
| Priced panels | 12 SKU | ✅ catalog + Merchant TSV |
| Quote-only Offer yok | 0 fake price | ✅ audit:offers |
| Merchant shipping | free-ship yok (`:::0` yasak) | ✅ audit:merchant-feed |
| robots Host bare | `arledscreen.com` | ✅ audit:robots |
| Cite parity | entity↔llms↔about↔profiles | ✅ audit:cite-parity |
| Kör test site readiness | 423 prompt URL | ✅ audit:blind-test |
| AI headers (CORS/ctype) | 9 path | ✅ audit:ai-headers |
| IndexNow key | public hex.txt | ✅ audit:indexnow |
| AI shopping index | `/ai-shopping.json` + 12 pricedPanels + extrasUsd | ✅ audit:ai-shopping |
| Offer shippingDetails | nakliye hariç (TR) | ✅ model + catalog |
| Return/garanti honesty | teklif-only FAQ + agentRules | ✅ entity + ai-shopping |
| Shopping LinkCloud | home→model→case→blog→seo-guide | ✅ 143+ yüzey |
| Org → catalog JSON-LD | hasOfferCatalog | ✅ OrganizationJsonLd + entity.json |
| Offer ↔ catalog join | sku=priceId + isPartOf | ✅ model/group/pitch |
| Sitemap AI artefacts | 8 machine URL | ✅ + ai-shopping.json |
| Point C paste packs | `/entity-profiles.json` | ✅ sync-entity |
| Spam / 81-il | yok | ✅ |

## B) Canlı yüzey (deploy) — sahibi doldurur

```bash
npm run smoke:live
```

| Endpoint | Hedef | 2026-10-05 | 2026-11-04 |
|----------|-------|------------|------------|
| `/entity.json` | 200 JSON | soft-404 until PR #55 merge (Day 89 tip ready) (HTTP 404) | |
| `/entity-profiles.json` | 200 JSON packs | soft-404 until PR #55 merge (Day 89 tip ready) (PR #55) | |
| `/catalog.json` | 200 JSON | soft-404 until PR #55 merge (Day 89 tip ready) (HTTP 404) | |
| `/.well-known/ard.json` | 200 JSON | soft-404 until PR #55 merge (Day 89 tip ready) (HTTP 404) | |
| `/llms.txt` | 200 + cite | 200 ama cite bölümü eski (PR #55 sonrası) | |
| `/robots.txt` Host | bare hostname | eski Host/şema (PR #55 sonrası) | |
| `/feeds/merchant-priced-panels.tsv` | 12 SKU | HTTP 404 | |
| `/tr/yapay-zeka/` | entity+catalog link | eski HTML (PR #55 sonrası) | |
| `/tr/about/` | entity+catalog link | eski HTML (PR #55 sonrası) | |
| `/sitemap.xml` | 200 | ✅ PASS | |

**Blok:** PR #55 merge + Cloudflare Pages redeploy.

## C) Point C — bağımsız atıf sayacı

Playbook: [`docs/offsite-entity-playbook.md`](./offsite-entity-playbook.md)

| Kaynak | 2026-10-05 | 2026-11-04 | Not |
|--------|------------|------------|-----|
| Google Business Profile | ☐ | ☐ | NAP birebir |
| LinkedIn şirket About | ☐ | ☐ | citeMedium pack |
| Instagram bio | ☐ | ☐ | |
| Facebook About | ☐ | ☐ | |
| Bing Places | ☐ | ☐ | |
| Apple Business Connect | ☐ | ☐ | |
| Yandex Business | ☐ | ☐ | |
| Sektör dizini 1 | ☐ | ☐ | |
| Sektör dizini 2 | ☐ | ☐ | |
| Müşteri / yerel mention | ☐ | ☐ | |
| **Bağımsız URL toplam** | **0** | **__ / 10–20** | |

## D) Kör test skorları (canlı modeller)

Protokol: [`docs/ai-shopping-blind-test.md`](./ai-shopping-blind-test.md) — 423 prompt × 0–3 = /1269  
Skor kartı (sahip doldurur): [`docs/ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md)

| Tur | Tarih | ChatGPT | Gemini | Perplexity | Bing Copilot | Ort. |
|-----|-------|---------|--------|------------|--------------|------|
| 1 (deploy sonrası) | | /1269 | /216 | /1269 | /216 | |
| 2 (Point C sonrası) | ≤2026-11-04 | /1269 | /216 | /1269 | /216 | |

Hedef: Tur 1 ≥ 635/1269 · Tur 2 ≥ 952/1269

## E) Merchant / Shopping

| Adım | Durum |
|------|-------|
| TSV dry-run repo | ✅ `/feeds/merchant-priced-panels.tsv` |
| Canlı TSV 200 | ☐ (deploy) |
| Merchant Center 12 SKU | ☐ sahip |
| Quote-only feed’de yok | ✅ audit |

## F) Ay sonu karar (2026-11-04)

- [ ] `smoke:live` GREEN
- [ ] Point C ≥ 5 bağımsız URL aynı cite
- [ ] Kör tur 2 ortalama ≥ 952/1269
- [ ] Merchant feed yayında (opsiyonel ama önerilir)
- [ ] GSC “Missing offers.price” = 0

**Kod hedefi (Gün 16–69):** tamamlandı.  
**Liderlik hedefi:** canlı + Point C — sahip operasyonu.
