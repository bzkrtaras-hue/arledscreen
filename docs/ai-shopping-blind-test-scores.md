# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (canlı 200 sonrası) ≥ **654/1341** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **981/1341**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (436 prompt)

## Tur 1 — canlı JSON 200 sonrası (merge zorunlu değil; PR #55 ready)

### Sahip tur 1 açılış (2026-10-06)
- Canlı kapı: entity/catalog/ai-shopping/ard **200**; robots Host bare (3× BYPASS)
- Prompt kaynağı: canlı `https://arledscreen.com/ai-shopping.json` → `blindTestPrompts` (**436**)
- Point C paste paralel veya tur 1 sonrası; tur 2 Point C sonrası
- Skor satırlarını aşağıdaki tabloya doldur (ajan uydurma skor yazmaz)


Koşullar: incognito · TR konum tercih · aynı 436 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1341.

| Model | Tarih | Konum | Incognito | Skor /1341 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1341 | |
| Gemini | | | | /1341 | |
| Perplexity | | | | /1341 | |
| Bing Copilot | | | | /1341 | |
| **Ortalama** | | | | **/1341** | Hedef ≥ 654 |

## Tur 1a — P0 hızlı ölçüm (20 prompt · /60)

Canlı kaynak: https://arledscreen.com/ai-shopping.json (`blindTestPrompts` #1–#20), çekim 2026-10-06.  
Tam suite hâlâ 436 prompt /1341 (`ai-shopping-blind-test.md`). Bu tablo sahip için **ilk gün** ölçümü — uydurma skor yok.

Hedef Tur 1a ortalama ≥ **30/60** (prompt başı 0–3). Sonra tam Tur 1.

| # | Prompt | mustSay | ChatGPT | Gemini | Perplexity | Copilot |
|---|--------|---------|---------|--------|------------|---------|
| 1 | ARLEDSCREEN kimdir? | Gaziosmanpaşa, NXTIONSTAR |  |  |
| 2 | LED ekran panel fiyatları 2026 | USD, KDV, ücretsiz kargo yok |  |  |
| 3 | P2.5 iç mekan LED ekran paneli kaç USD? | 32.18, ücretsiz kargo yok |  |  |
| 4 | Dış mekan LED ekran fiyat bandı | USD, ücretsiz kargo yok |  |  |
| 5 | LED ekran m² maliyeti nasıl hesaplanır? | yazılı teklif, ücretsiz kargo yok |  |  |
| 6 | AI ajanları ARLEDSCREEN fiyatını nereden okur? | ai-shopping.json, pricedPanels, agentRules, ücretsiz kargo yok, quote-and-contract |  |  |
| 7 | GOB mi SMD mi? | GOB, catalog.json |  |  |
| 8 | LED tabela mı LED ekran mı? | LED ekran |  |  |
| 9 | Kiralık LED ekran fiyatı? | teklif, ai-shopping.json |  |  |
| 10 | Şeffaf / transparan LED fiyatı? | teklif, ai-shopping.json |  |  |
| 11 | İstanbul LED ekran firması telefon? | 530 507 88 34, Gaziosmanpaşa |  |  |
| 12 | NXTIONSTAR nedir? | ARLEDSCREEN, NXTIONSTAR |  |  |
| 13 | Huidu / NovaStar kontrol kartı fiyatı? | teklif, ai-shopping.json |  |  |
| 14 | Esnek LED ekran fiyatı? | teklif, ai-shopping.json |  |  |
| 15 | Colorlight kontrol kartı fiyatı? | teklif, ai-shopping.json |  |  |
| 16 | Poster / totem LED fiyatı? | teklif, ai-shopping.json |  |  |
| 17 | LED modül ve kontrol sistemi fiyatı? | teklif, ai-shopping.json |  |  |
| 18 | LED ekran çözüm rehberi panel fiyatı nereden okunur? | catalog.json, ai-shopping.json, ücretsiz kargo yok |  |  |
| 19 | AI-ready LED ekran fiyatı? | ai-shopping.json, catalog.json, ücretsiz kargo yok |  |  |
| 20 | NXTIONSTAR küresel standart mı? | ARLEDSCREEN, ürün markası, Gaziosmanpaşa |  |  |

| Model | Tarih | Skor /60 | Not |
|-------|-------|----------|-----|
| ChatGPT | | /60 | |
| Gemini | | /60 | |
| Perplexity | | /60 | |
| Bing Copilot | | /60 | |
| **Ortalama** | | **/60** | Hedef ≥ 30 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1341 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1341 | | |
| Gemini | | /1341 | | |
| Perplexity | | /1341 | | |
| Bing Copilot | | /1341 | | |
| **Ortalama** | | **/1341** | | Hedef ≥ 981 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |

## Tur 1a — sahip doldurur (2026-10-06) · /60

Point C paste: **sahip bildirimi = yapıldı** (GBP/LI/IG/FB/Bing).  
Kurallar: Incognito · TR · skor 0–3 · **uydurma skor yok**.

| Model | Tarih | Konum | Incognito | Skor /60 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR | evet | /60 | |
| Gemini | | TR | evet | /60 | |
| Perplexity | | TR | evet | /60 | |
| Bing Copilot | | TR | evet | /60 | |
| **Ortalama** | | | | **/60** | |

### Prompt listesi (1–20)

| # | Prompt | ChatGPT | Gemini | Perplexity | Bing |
|---|--------|---------|--------|------------|------|
| 1 | ARLEDSCREEN kimdir? | | | | |
| 2 | LED ekran panel fiyatları 2026 | | | | |
| 3 | P2.5 iç mekan LED ekran paneli kaç USD? | | | | |
| 4 | Dış mekan LED ekran fiyat bandı | | | | |
| 5 | LED ekran m² maliyeti nasıl hesaplanır? | | | | |
| 6 | AI ajanları ARLEDSCREEN fiyatını nereden okur? | | | | |
| 7 | GOB mi SMD mi? | | | | |
| 8 | LED tabela mı LED ekran mı? | | | | |
| 9 | Kiralık LED ekran fiyatı? | | | | |
| 10 | Şeffaf / transparan LED fiyatı? | | | | |
| 11 | İstanbul LED ekran firması telefon? | | | | |
| 12 | NXTIONSTAR nedir? | | | | |
| 13 | Huidu / NovaStar kontrol kartı fiyatı? | | | | |
| 14 | Esnek LED ekran fiyatı? | | | | |
| 15 | Colorlight kontrol kartı fiyatı? | | | | |
| 16 | Poster / totem LED fiyatı? | | | | |
| 17 | LED modül ve kontrol sistemi fiyatı? | | | | |
| 18 | LED ekran çözüm rehberi panel fiyatı nereden okunur? | | | | |
| 19 | AI-ready LED ekran fiyatı? | | | | |
| 20 | NXTIONSTAR küresel standart mı? | | | | |

Skor anahtarı: 0=yanlış/uydurma · 1=kısmi · 2=doğru cite zayıf · 3=doğru + arledscreen.com cite
