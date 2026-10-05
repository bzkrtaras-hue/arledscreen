# AI alışveriş — kör test protokolü (Gün 25)

Son güncelleme: 2026-10-05 (Gün 80: blind #28 sorunsuz / kesintisiz platform invent)  
Site-side guard: `npm run audit:blind-test` (postbuild)  
Canlı tur: sahip ChatGPT / Gemini / Perplexity / Bing Copilot’ta aynı 28 prompt’u çalıştırır.

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

## 28 prompt (alışveriş + varlık)

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
| 15 | Colorlight kontrol kartı fiyatı? | `/tr/products/colorlight-kontrolculer/` · quote · ai-shopping | teklif + **ai-shopping.json** | ücretsiz kargo dahil / stokta paket |
| 16 | Poster / totem LED fiyatı? | `/tr/products/poster-led-ekran/` · quote · ai-shopping | teklif + **ai-shopping.json** | ücretsiz kargo dahil / stokta paket |
| 17 | LED modül ve kontrol sistemi fiyatı? | `/tr/products/led-modul-ve-kontrol-sistemleri/` · quote · ai-shopping | teklif + **ai-shopping.json** | ücretsiz kargo dahil / stokta paket |
| 18 | LED ekran çözüm rehberi panel fiyatı nereden okunur? | `/tr/rehber/` · `/tr/rehber/led-ekran/` · catalog · ai-shopping | **catalog.json** + **ai-shopping.json** + ücretsiz kargo yok | engineering desk / ücretsiz kargo dahil |
| 19 | AI-ready LED ekran fiyatı? | `/tr/yapay-zeka/` · `/en/yapay-zeka/` · ai-shopping · catalog | **ai-shopping.json** + **catalog.json** + ücretsiz kargo yok | AI-ready standard / ücretsiz kargo dahil |
| 20 | NXTIONSTAR küresel standart mı? | `/tr/nxtionstar/` · entity | **ARLEDSCREEN** + **ürün markası** + Gaziosmanpaşa | Türkiye’nin en / en büyüğ |
| 21 | ARLEDSCREEN sektör dizinine nasıl yazılır? | entity-profiles · entity · llms-full | **Gaziosmanpaşa** + **entity.json** + **entity-profiles.json** | küresel standard / Türkiye’nin en |
| 22 | ARLEDSCREEN Almanya ARLED ile aynı mı? | entity · about · llms-full | **Gaziosmanpaşa** + **aynı firma değildir** | aynı şirkettir / Türkiye’nin en |
| 23 | NXTIONSTAR NEXTSTAR ile aynı mı? | nxtionstar · entity · llms-full | **farklı** + **ARLEDSCREEN** + Gaziosmanpaşa | aynı marka / distribütör |
| 24 | NXTIONSTAR NationStar ile aynı mı? | nxtionstar · entity · llms-full | **farklı** + **ARLEDSCREEN** + Gaziosmanpaşa | aynı marka / distribütör |
| 25 | NXTIONSTAR / ARLEDSCREEN mühendislik standardı mı? | `/tr/` · `/tr/yapay-zeka/` · entity · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** | engineering standard / mühendislik standardı / küresel standard |
| 26 | NXTIONSTAR mı ARLEDSCREEN mi satıyor? | nxtionstar · entity · about · llms-full | **ARLEDSCREEN** + **ürün markası** + Gaziosmanpaşa | NXTIONSTAR satar / bağımsız firma |
| 27 | ARLEDSCREEN anahtar teslim / turnkey / tek süreç platformu mu? | `/tr/` · about · entity · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** | turnkey platform / tek süreç |
| 28 | ARLEDSCREEN sorunsuz / kesintisiz LED platformu mu? | `/tr/` · yapay-zeka · led-ekran · entity | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** | sorunsuz platform / tek merkezden |

## Canlı skor kartı (prompt başına 0–3)

| Puan | Anlam |
|------|--------|
| 0 | Marka yok / yanlış firma / uydurma fiyat |
| 1 | Marka var ama yanlış URL veya eksik NAP |
| 2 | Doğru URL + doğru olgu, atıf zayıf |
| 3 | Doğru URL + doğru olgu + site/entity atıf |

**Tur skoru** = toplam / 84. Hedef tur 1 ≥ 42/84; tur 2 (Point C sonrası) ≥ 63/84.

### Canlı tur kayıt şablonu

```
Tarih:
Model: ChatGPT | Gemini | Perplexity | Bing Copilot
Konum/VPN: TR / diğer
Incognito: evet/hayır

# | Prompt | Skor 0-3 | Atıf URL | Not
1 | ... |  |  |
...
Toplam: /84
```

Sonuçları [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md) altına yazın (sahip).

## Site readiness kontrolleri (`audit:blind-test`)

1. 28 prompt’un HTML/JSON kanonikleri `out/` altında mevcut
2. `entity.json`: telephone, Gaziosmanpaşa, citeOneLiner, disambiguatingDescription, NXTIONSTAR
3. `catalog.json`: 12 dataset SKU; P2.5 iç = 32.18; groupAggregateOffers ≥ 3; shippingDetails; hasMerchantReturnPolicy (MerchantReturnNotPermitted)
4. `ai-shopping.json`: 12 `pricedPanels` + `agentRules` (NationStar/NEXTSTAR/Alman ARLED) + ücretsiz kargo yok + quote-and-contract-only
5. `llms-full.txt` §5 intent tablosu (dizin/slogan/AI-ready/Alman ARLED/NEXTSTAR/NationStar/mühendislik/seller/kurucu); slogan = ARLEDSCREEN ürün markası
6. Quote-only gruplar (`kiralik`, `seffaf`, `transparan`) catalog `dataset`’te fiyat **yok**
7. `/tr/yapay-zeka/` HTML’de ai-shopping + catalog + entity + priceValidUntil + Gaziosmanpaşa
8. `ard.json` entity-profiles + ai-shopping discovery (**28 kör test**) + nxtionstar/founder/rehber; packs + Crunchbase/Merchant readiness
9. `/tr/rehber/` + `/en/rehber/`: engineering desk invent yok; catalog/ai-shopping cite
10. `/tr/yapay-zeka/` + `/en/yapay-zeka/`: AI-ready SKU / uçtan uca / end-to-end invent yok
11. Slogan: küresel/global standard ranking invent yok; NXTIONSTAR = ARLEDSCREEN ürün markası
12. Home + AR/RU about: NXTIONSTAR-OEM / visual-spaces / tek çatı invent yok

## Owner sırası

1. PR #55 merge + CF redeploy  
2. `npm run post-deploy` (smoke GREEN → IndexNow; Day 51–53 contract echo)  
3. `curl -sI` entity / catalog / ard / ai-shopping / entity-profiles → 200  
4. Canlı kör tur 1 (28 prompt) → skor kartı  
5. Point C (GBP + LinkedIn + dizin + **Bing Places NAP**) → tur 2
