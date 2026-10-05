# AI alışveriş — kör test protokolü (Gün 25)

Son güncelleme: 2026-10-05  
Site-side guard: `npm run audit:blind-test` (postbuild)  
Canlı tur: sahip ChatGPT / Gemini / Perplexity / Bing Copilot’ta aynı 12 prompt’u çalıştırır.

## Amaç

“AI alışveriş ajanı doğru URL + doğru olguyu mu öneriyor?” sorusunu **ölçülebilir** kılmak.
Spam blog üretmek veya 81-il kapısı açmak yerine: her intent tek kanonik URL + makinece fiyat/NAP.

## İki katman

| Katman | Kim | Ne |
|--------|-----|-----|
| **Site readiness** | CI / postbuild | Prompt → URL var mı? entity/catalog/llms citeleri doğru mu? |
| **Live blind** | Sahip (incognito / yeni sohbet) | Model ARLEDSCREEN’i doğru atıf ediyor mu? |

Site readiness yeşil olmadan canlı tur anlamlı değil. Canlı tur için PR #55 deploy şart (`entity.json` / `catalog.json` / `ard.json` 200).

## 12 prompt (alışveriş + varlık)

| # | Prompt (TR) | Kanonik kaynak | Must-say | Must-not-say |
|---|-------------|----------------|----------|--------------|
| 1 | ARLEDSCREEN kimdir? | `/entity.json` · `/tr/about/` | Gaziosmanpaşa, NXTIONSTAR markası | Alman ARLED / NEXTSTAR TV |
| 2 | LED ekran panel fiyatları 2026 | `/catalog.json` · `/tr/led-ekran-fiyatlari/` | USD panel, KDV hariç, 12 panel | Uydurma TL paket |
| 3 | P2.5 iç mekan LED ekran paneli kaç USD? | catalog `p2-5-ic` | **32,18 USD** | Sabit m² TL |
| 4 | Dış mekan LED ekran fiyat bandı | catalog groupAggregateOffers | low–high USD | Quote-only’ye fiyat uydurma |
| 5 | LED ekran m² maliyeti nasıl hesaplanır? | `/tr/hesaplayici/` | formül + yazılı teklif | “stokta paket hazır” |
| 6 | AI ajanları ARLEDSCREEN fiyatını nereden okur? | `/tr/yapay-zeka/` · ard.json | catalog + entity + ard | Sadece blog |
| 7 | GOB mi SMD mi? | `/tr/rehber/gob-vs-smd/` | karar kriterleri + GOB USD tablo | Sahte sertifika |
| 8 | LED tabela mı LED ekran mı? | `/tr/rehber/led-tabela-mi-led-ekran-mi/` | dijital ≠ LED | Eşanlamlı ezme |
| 9 | Kiralık LED ekran fiyatı? | `/tr/products/kiralik-led-ekran/` · quote | list yok → teklif | Sahte günlük TL |
| 10 | Şeffaf / transparan LED fiyatı? | seffaf + transparan ürün | list yok → teklif | Merchant’a ekleme |
| 11 | İstanbul LED ekran firması telefon? | entity NAP | **+90 530 507 88 34** | Yanlış ilçe |
| 12 | NXTIONSTAR nedir? | `/tr/nxtionstar/` · entity | ARLEDSCREEN markası, TR tek satış | Distribütör / yiyistar |

## Canlı skor kartı (prompt başına 0–3)

| Puan | Anlam |
|------|--------|
| 0 | Marka yok / yanlış firma / uydurma fiyat |
| 1 | Marka var ama yanlış URL veya eksik NAP |
| 2 | Doğru URL + doğru olgu, atıf zayıf |
| 3 | Doğru URL + doğru olgu + site/entity atıf |

**Tur skoru** = toplam / 36. Hedef tur 1 ≥ 18/36; tur 2 (Point C sonrası) ≥ 27/36.

### Canlı tur kayıt şablonu

```
Tarih:
Model: ChatGPT | Gemini | Perplexity | Bing Copilot
Konum/VPN: TR / diğer
Incognito: evet/hayır

# | Prompt | Skor 0-3 | Atıf URL | Not
1 | ... |  |  |
...
Toplam: /36
```

Sonuçları `docs/ai-shopping-blind-test-scores.md` altına ekle (sahip).

## Site readiness kontrolleri (`audit:blind-test`)

1. 12 prompt’un HTML/JSON kanonikleri `out/` altında mevcut
2. `entity.json`: telephone, Gaziosmanpaşa, citeOneLiner, disambiguatingDescription, NXTIONSTAR
3. `catalog.json`: 12 dataset SKU; P2.5 iç = 32.18; groupAggregateOffers ≥ 3
4. `llms-full.txt` §5 intent tablosu kanonik URL’leri içerir
5. Quote-only gruplar (`kiralik`, `seffaf`, `transparan`) catalog `dataset`’te fiyat **yok**
6. `/tr/yapay-zeka/` HTML’de catalog.json + entity.json geçiyor

## Owner sırası

1. PR #55 merge + CF redeploy  
2. `curl -sI` entity / catalog / ard → 200  
3. Canlı kör tur 1 (12 prompt) skor kartına yaz  
4. Point C (GBP + LinkedIn) → tur 2
