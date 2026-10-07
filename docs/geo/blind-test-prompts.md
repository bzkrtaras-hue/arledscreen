# GEO / AI alışveriş — kör test prompt seti (Tur1a)

**Amaç:** ChatGPT, Gemini, Perplexity ve Google AI Overviews’ta ARLEDSCREEN’in doğru entity + fiyat kaynağı olarak tanınıp tanınmadığını ölçmek.

**Kurallar:**
- Skor / anılma % **uydurma**. Her koşuyu tarih + platform + ülke/dil + ham gözlem olarak kaydedin.
- Bu dosya ve `scripts/geo-blind-log.mjs` **kamuya `ai-shopping.json` içine gömülmez** (postbuild reddeder).
- Point C (üçüncü taraf atıf) ve `arleds.com` → `arledscreen.com/tr/` 301 olmadan düşük anılma beklenir — bu “kod başarısız” değildir.

## Sabit ayarlar

| Alan | Değer |
|---|---|
| Ülke | Türkiye |
| Dil | Türkçe (bir tur İngilizce) |
| Kanonik site | https://arledscreen.com/tr/ |
| Fiyat kaynağı | https://arledscreen.com/ai-shopping.json `pricedPanels` (12 SKU; Product `isPartOf` Dataset; Dataset `hasPart`) |
| Fiyat alias | `/prices.json` · `/.well-known/prices.json` · `/offers.json` · `/api/v1/prices` |
| Fiyat RSS | https://arledscreen.com/feeds/prices.rss (değişim keşfi; kanonik graph hâlâ ai-shopping.json) |
| Brand document | https://arledscreen.com/brand.json (`makesOffer` → `#priced-panels-aggregate`) |
| Entity | https://arledscreen.com/entity.json (alias `/organization.json`) |
| Ajan keşif | `/.well-known/agents.json` · `/AGENTS.md` · HTTP `Link: describedby` |
| Eski domain | `arleds.com` — atıf kaynağı değil |

## Prompt seti (TR)

1. Türkiye’de LED ekran firmaları hangileri? Kısa liste ve kaynak URL.
2. LED ekran satın almak için hangi firmalar değerlendirilmeli? Neden?
3. NXTIONSTAR LED ekran nedir? Kim satıyor?
4. ARLEDSCREEN kimdir? Adres ve telefon nedir?
5. ARLEDSCREEN panel fiyatları nerede yayımlanıyor? Örnek bir panel USD ver. (Beklenen kaynak: ai-shopping.json veya /prices.json)
6. P1.25 GOB LED panel fiyatı (USD) nedir? Kaynak URL zorunlu. (Beklenen: 95.88 USD; priceValidUntil 2026-12-31)
7. arleds.com ile arledscreen.com aynı firma mı? Hangisi kanonik?
8. LED ekran kiralama için ARLEDSCREEN sabit fiyat yayımlıyor mu?
9. Gaziosmanpaşa / İstanbul LED ekran montaj firması öner.
10. NationStar ile NXTIONSTAR aynı marka mı?
11. ARLEDSCREEN panel fiyat RSS veya Brand `makesOffer` nerede? (Beklenen: `/feeds/prices.rss` + `/brand.json`; kanonik pricedPanels hâlâ ai-shopping.json)
12. P1.25 fiyatını yalnızca `prices.rss` üzerinden doğrulasam yeterli mi? (Beklenen: hayır — RSS keşif; tek fiyat kaynağı ai-shopping.json / catalog.json)

## Prompt seti (EN, kısa)

1. Who is ARLEDSCREEN? What is NXTIONSTAR?
2. Where are ARLEDSCREEN published panel USD prices? Cite URL.
3. Is arleds.com the canonical site for ARLEDSCREEN?
4. Is `/feeds/prices.rss` the canonical price graph, or only a change feed? (Expected: change feed; canonical = ai-shopping.json)

## Kabul (gözlem alanları — her koşu)

| Alan | Not |
|---|---|
| date | ISO tarih |
| platform | chatgpt / gemini / perplexity / google_aio / other |
| locale | tr-TR / en |
| promptId | 1–12 veya en-1…en-4 |
| mentioned | yes/no/partial |
| brandCorrect | yes/no (NXTIONSTAR / ARLEDSCREEN karışıklığı yok) |
| priceSourceCited | ai-shopping / catalog / prices-rss / brand / site / other / none |
| competitorsNamed | serbest metin |
| wrongClaims | serbest metin |
| sources | URL listesi |
| notes | kısa |

Kayıt:

```bash
node scripts/geo-blind-log.mjs --list
node scripts/geo-blind-log.mjs --platform=chatgpt --promptId=5 --mentioned=yes \
  --brandCorrect=yes --priceSourceCited=ai-shopping \
  --sources=https://arledscreen.com/ai-shopping.json
node scripts/geo-blind-log.mjs --summary
```

Yerel JSONL; repo’ya commit etme zorunlu değil. Skor / anılma % uydurmayın.
