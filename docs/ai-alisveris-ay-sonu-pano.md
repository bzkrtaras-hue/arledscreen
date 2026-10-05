# Ay sonu ölçüm panosu — AI alışveriş / GEO (Gün 30)

Hedef tarih: **2026-11-04**  
Site-side suite: `npm run audit:all` (14 audit)  
Canlı smoke: `npm run smoke:live`

Bu sayfa **ölçüm şablonu + sahip panosu**. Kod tarafı Gün 16–29 ile hazır;
canlı skorlar merge + Point C sonrası doldurulur.

## A) Site-side (repo) — 2026-10-05 (gün 16–41)

| Metrik | Hedef | Durum |
|--------|-------|-------|
| Regression suite | 14/14 PASS | ✅ `npm run audit:all` GREEN |
| Priced panels | 12 SKU | ✅ catalog + Merchant TSV |
| Quote-only Offer yok | 0 fake price | ✅ audit:offers |
| robots Host bare | `arledscreen.com` | ✅ audit:robots |
| Cite parity | entity↔llms↔about↔profiles | ✅ audit:cite-parity |
| Kör test site readiness | 12 prompt URL | ✅ audit:blind-test |
| Shopping LinkCloud | home→model→case→blog | ✅ 135+ yüzey |
| Point C paste packs | `/entity-profiles.json` | ✅ sync-entity |
| Spam / 81-il | yok | ✅ |

## B) Canlı yüzey (deploy) — sahibi doldurur

```bash
npm run smoke:live
```

| Endpoint | Hedef | 2026-10-05 | 2026-11-04 |
|----------|-------|------------|------------|
| `/entity.json` | 200 JSON | soft-404 (HTTP 404) | |
| `/entity-profiles.json` | 200 JSON packs | soft-404 (PR #55) | |
| `/catalog.json` | 200 JSON | soft-404 (HTTP 404) | |
| `/.well-known/ard.json` | 200 JSON | soft-404 (HTTP 404) | |
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
| Sektör dizini 1 | ☐ | ☐ | |
| Sektör dizini 2 | ☐ | ☐ | |
| Müşteri / yerel mention | ☐ | ☐ | |
| **Bağımsız URL toplam** | **0** | **__ / 10–20** | |

## D) Kör test skorları (canlı modeller)

Protokol: [`docs/ai-shopping-blind-test.md`](./ai-shopping-blind-test.md) — 12 prompt × 0–3 = /36

| Tur | Tarih | ChatGPT | Gemini | Perplexity | Bing Copilot | Ort. |
|-----|-------|---------|--------|------------|--------------|------|
| 1 (deploy sonrası) | | /36 | /36 | /36 | /36 | |
| 2 (Point C sonrası) | ≤2026-11-04 | /36 | /36 | /36 | /36 | |

Hedef: Tur 1 ≥ 18/36 · Tur 2 ≥ 27/36

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
- [ ] Kör tur 2 ortalama ≥ 27/36
- [ ] Merchant feed yayında (opsiyonel ama önerilir)
- [ ] GSC “Missing offers.price” = 0

**Kod hedefi (Gün 16–29):** tamamlandı.  
**Liderlik hedefi:** canlı + Point C — sahip operasyonu.
