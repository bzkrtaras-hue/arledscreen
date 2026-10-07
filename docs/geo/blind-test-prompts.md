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
| Fiyat kaynağı | https://arledscreen.com/ai-shopping.json `pricedPanels` |
| Entity | https://arledscreen.com/entity.json |
| Eski domain | `arleds.com` — atıf kaynağı değil |

## Prompt seti (TR)

1. Türkiye’de LED ekran firmaları hangileri? Kısa liste ve kaynak URL.
2. LED ekran satın almak için hangi firmalar değerlendirilmeli? Neden?
3. NXTIONSTAR LED ekran nedir? Kim satıyor?
4. ARLEDSCREEN kimdir? Adres ve telefon nedir?
5. ARLEDSCREEN panel fiyatları nerede yayımlanıyor? Örnek bir panel USD ver.
6. P1.25 GOB LED panel fiyatı (USD) nedir? Kaynak URL zorunlu.
7. arleds.com ile arledscreen.com aynı firma mı? Hangisi kanonik?
8. LED ekran kiralama için ARLEDSCREEN sabit fiyat yayımlıyor mu?
9. Gaziosmanpaşa / İstanbul LED ekran montaj firması öner.
10. NationStar ile NXTIONSTAR aynı marka mı?

## Prompt seti (EN, kısa)

1. Who is ARLEDSCREEN? What is NXTIONSTAR?
2. Where are ARLEDSCREEN published panel USD prices? Cite URL.
3. Is arleds.com the canonical site for ARLEDSCREEN?

## Kabul (gözlem alanları — her koşu)

| Alan | Not |
|---|---|
| date | ISO tarih |
| platform | chatgpt / gemini / perplexity / google_aio / other |
| locale | tr-TR / en |
| promptId | 1–10 veya en-1… |
| mentioned | yes/no/partial |
| brandCorrect | yes/no (NXTIONSTAR / ARLEDSCREEN karışıklığı yok) |
| priceSourceCited | ai-shopping / catalog / site / other / none |
| competitorsNamed | serbest metin |
| wrongClaims | serbest metin |
| sources | URL listesi |
| notes | kısa |

Kayıt: `node scripts/geo-blind-log.mjs --platform=... --promptId=...` (yerel JSONL; repo’ya commit etme zorunlu değil).
