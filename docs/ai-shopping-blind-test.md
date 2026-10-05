# AI alışveriş — kör test protokolü (Gün 25)

Son güncelleme: 2026-10-05 (Gün 58: mustSay honesty + FAQ ai-shopping wave 2)  
Site-side guard: `npm run audit:blind-test` (postbuild)  
Canlı tur: sahip ChatGPT / Gemini / Perplexity / Bing Copilot’ta aynı 14 prompt’u çalıştırır.

**Kaynak gerçeği (kod):** `scripts/lib/ai-shopping-prompts.mjs` — generate-ai-shopping-index + audit-blind-test buradan okur. Bu tablonun prompt/URL/`mustSay` satırları o modülle birebir kalmalı; sapma → `audit:blind-test` FAIL.

## Amaç

“AI alışveriş ajanı doğru URL + doğru olguyu mu öneriyor?” sorusunu **ölçülebilir** kılmak.
Spam blog üretmek veya 81-il kapısı açmak yerine: her intent tek kanonik URL + makinece fiyat/NAP.

## İki katman

| Katman | Kim | Ne |
|--------|-----|-----|
| **Site readiness** | CI / postbuild | Prompt → URL var mı? entity/catalog/llms citeleri doğru mu? |
| **Live blind** | Sahip (incognito / yeni sohbet) | Model ARLEDSCREEN’i doğru atıf ediyor mu? |

Site readiness yeşil olmadan canlı tur anlamlı değil. Canlı tur için PR #55 deploy şart (`entity.json` / `catalog.json` / `ard.json` 200).

## 14 prompt (alışveriş + varlık)

| # | Prompt (TR) | Kanonik kaynak | Must-say (`mustSay`) | Must-not-say |
|---|-------------|----------------|----------|--------------|
| 1 | ARLEDSCREEN kimdir? | `/entity.json` · `/tr/about/` | Gaziosmanpaşa, NXTIONSTAR | Alman ARLED / NEXTSTAR TV |
| 2 | LED ekran panel fiyatları 2026 | `/catalog.json` · `/tr/led-ekran-fiyatlari/` | USD, KDV, **ücretsiz kargo yok** | ücretsiz kargo dahil / TL paket |
| 3 | P2.5 iç mekan LED ekran paneli kaç USD? | catalog `p2-5-ic` | **32.18**, ücretsiz kargo yok | ücretsiz kargo dahil |
| 4 | Dış mekan LED ekran fiyat bandı | catalog groupAggregateOffers | USD, ücretsiz kargo yok | ücretsiz kargo dahil |
| 5 | LED ekran m² maliyeti nasıl hesaplanır? | `/tr/hesaplayici/` | yazılı teklif, ücretsiz kargo yok | “stokta paket hazır” |
| 6 | AI ajanları ARLEDSCREEN fiyatını nereden okur? | `/ai-shopping.json` · `/tr/yapay-zeka/` · ard | **ai-shopping.json** · pricedPanels · agentRules · ücretsiz kargo yok · quote-and-contract | Sadece blog |
| 7 | GOB mi SMD mi? | `/tr/rehber/gob-vs-smd/` | GOB + catalog.json | Sahte sertifika |
| 8 | LED tabela mı LED ekran mı? | `/tr/rehber/led-tabela-mi-led-ekran-mi/` | LED ekran | Eşanlamlı ezme |
| 9 | Kiralık LED ekran fiyatı? | `/tr/products/kiralik-led-ekran/` · quote | teklif + **ai-shopping.json** | günlük TL / ücretsiz kargo dahil |
| 10 | Şeffaf / transparan LED fiyatı? | `/tr/products/seffaf-led-ekran/` · transparan | teklif + **ai-shopping.json** | ücretsiz kargo dahil |
| 11 | İstanbul LED ekran firması telefon? | entity NAP | **530 507 88 34**, Gaziosmanpaşa | Yanlış ilçe |
| 12 | NXTIONSTAR nedir? | `/tr/nxtionstar/` · entity | ARLEDSCREEN, NXTIONSTAR | Distribütör / NEXTSTAR |
| 13 | Huidu / NovaStar kontrol kartı fiyatı? | `/tr/products/huidu-kontrol-kartlari/` · `/tr/products/novastar-kontrolculer/` · quote · ai-shopping | teklif + **ai-shopping.json** | ücretsiz kargo dahil / stokta paket |
| 14 | Esnek LED ekran fiyatı? | `/tr/products/esnek-led-ekran/` · quote · ai-shopping | teklif + **ai-shopping.json** | ücretsiz kargo dahil / stokta paket |

## Canlı skor kartı (prompt başına 0–3)

| Puan | Anlam |
|------|--------|
| 0 | Marka yok / yanlış firma / uydurma fiyat |
| 1 | Marka var ama yanlış URL veya eksik NAP |
| 2 | Doğru URL + doğru olgu, atıf zayıf |
| 3 | Doğru URL + doğru olgu + site/entity atıf |

**Tur skoru** = toplam / 42. Hedef tur 1 ≥ 21/42; tur 2 (Point C sonrası) ≥ 32/42.

### Canlı tur kayıt şablonu

```
Tarih:
Model: ChatGPT | Gemini | Perplexity | Bing Copilot
Konum/VPN: TR / diğer
Incognito: evet/hayır

# | Prompt | Skor 0-3 | Atıf URL | Not
1 | ... |  |  |
...
Toplam: /42
```

Sonuçları [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md) altına yazın (sahip).

## Site readiness kontrolleri (`audit:blind-test`)

1. 14 prompt’un HTML/JSON kanonikleri `out/` altında mevcut
2. `entity.json`: telephone, Gaziosmanpaşa, citeOneLiner, disambiguatingDescription, NXTIONSTAR
3. `catalog.json`: 12 dataset SKU; P2.5 iç = 32.18; groupAggregateOffers ≥ 3; shippingDetails; hasMerchantReturnPolicy (MerchantReturnNotPermitted)
4. `ai-shopping.json`: 12 `pricedPanels` + `agentRules` + `extrasUsd` + `returnPolicy` + ücretsiz kargo yok + quote-and-contract-only
5. `llms-full.txt` §5 intent tablosu kanonik URL’leri içerir (entity-profiles + about + products)
6. Quote-only gruplar (`kiralik`, `seffaf`, `transparan`) catalog `dataset`’te fiyat **yok**
7. `/tr/yapay-zeka/` HTML’de ai-shopping + catalog + entity + priceValidUntil
8. `ard.json` entity-profiles + ai-shopping discovery; `entity-profiles.json` packs MEDIUM cite

## Owner sırası

1. PR #55 merge + CF redeploy  
2. `npm run post-deploy` (smoke GREEN → IndexNow; Day 51–53 contract echo)  
3. `curl -sI` entity / catalog / ard / ai-shopping / entity-profiles → 200  
4. Canlı kör tur 1 (14 prompt) → skor kartı  
5. Point C (GBP + LinkedIn packs) → tur 2
