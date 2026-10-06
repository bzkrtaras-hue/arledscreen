# AI alışveriş — kör test protokolü (Gün 25)

Son güncelleme: 2026-10-06 (Gün 100: blind #48 sabit standby / idle invent)  
Site-side guard: `npm run audit:blind-test` (postbuild)  
Canlı tur: sahip ChatGPT / Gemini / Perplexity / Bing Copilot’ta aynı 48 prompt’u çalıştırır.

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

## 48 prompt (alışveriş + varlık)

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
| 29 | AI-infrastructure ready LED nedir / ARLEDSCREEN satıyor mu? | `/en/` · yapay-zeka TR/EN · entity · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** | AI-infrastructure ready SKU / AI-ready product / Türkiye'nin en |
| 30 | ARLEDSCREEN enterprise / aynı gün kurulum / keşiften servise all-in-one mı? | `/tr/led-ekran/` · hizmetler · colorlight · entity · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** | aynı gün garanti / enterprise all-in-one / ücretsiz montaj |
| 31 | ARLEDSCREEN LED ekran üreticisi / fabrika / OEM mi, yoksa bayi mi? | `/tr/led-ekran-ureticisi/` · nxtionstar · entity · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** + **NXTIONSTAR** | OEM fabrika / fabrika üreticisi / distribütör / bağımsız bayi |
| 32 | ARLEDSCREEN keşiften teslimata tek ekip mi / fabrika LED üreticisi mi? | `/tr/fabrika-led-ekran/` · ureticisi · hizmetler · entity · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ARLEDSCREEN** | tek ekip garanti / keşiften teslimata platform / fabrika üreticisiyiz |
| 33 | Esnek / şeffaf / poster / kiralık LED stokta mı, anında teslim mi, list fiyatı var mı? | esnek · seffaf · poster · kiralik · quote · ai-shopping | **Gaziosmanpaşa** + **yazılı teklif** + **ai-shopping.json** | stokta paket / anında teslim / list fiyatı var |
| 34 | İç mekân LED ekran kaç nit olmalı? ARLEDSCREEN sabit nit veya IP yayımlıyor mu? | `/tr/rehber/ic-mekan-led-ekran/` · `/tr/rehber/dis-mekan-led-ekran/` · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit nit yok** | 600–1.200 / sabit nit var / IP65 garanti |
| 35 | Kamera dostu LED / stüdyo LED kaç Hz yenileme olmalı? ARLEDSCREEN sabit 3840 Hz veya yüksek yenileme garantisi yayımlıyor mu? | `/tr/rehber/ic-mekan-led-ekran/` · `/tr/rehber/konferans-salonu-led/` · ince-pitch · yapay-zeka · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit Hz yok** | 3840 Hz / 1920 Hz / kamera dostu garanti |
| 36 | P2.5 LED için izleme mesafesi kaç metre olmalı? ARLEDSCREEN «1 mm = 1 m» veya sabit minimum mesafe garantisi yayımlıyor mu? | `/tr/rehber/piksel-araligi-secimi/` · `/tr/p2-5-led-ekran/` · ic-mekan rehber · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **garanti değil** | 1 mm = 1 m garanti / sabit 2,5 m |
| 37 | LED ekran için m² başına kaç kW gerekir? ARLEDSCREEN sabit 0,45/0,75 kW/m² veya her projede 3 faz zorunlu yayımlıyor mu? | `/tr/rehber/mimari-muhendislik-led/` · `/tr/hesaplayici/` · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit kW yok** | 0,45 kW / 0,75 kW / 3 faz zorunlu |
| 38 | LED ekran görüş açısı kaç derece olmalı? ARLEDSCREEN sabit 140°/160° yayımlıyor mu? | `/tr/rehber/led-ekran/` · `/tr/rehber/gob-vs-smd/` · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit görüş açısı yok** | sabit 140° / sabit 160° / 140°/160° garanti |
| 39 | LED ekran HDR mı, kaç bit gri skala olmalı? ARLEDSCREEN sabit HDR veya 16-bit gri skala yayımlıyor mu? | `/tr/rehber/ic-mekan-led-ekran/` · ince-pitch · gob · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit HDR yok** | HDR garanti / sabit 16-bit / 14-bit gri skala yayımlanır |
| 40 | LED ekran ömrü kaç saat? ARLEDSCREEN 100.000 saat veya sabit MTBF yayımlıyor mu? | `/tr/rehber/dis-mekan-led-ekran/` · `/tr/led-ekran-servis/` · kiosk rehber · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit ömür yok** | 100.000 saat garanti / MTBF garanti / sabit ömür yayımlanır |
| 41 | LED ekran renk sıcaklığı kaç Kelvin olmalı? ARLEDSCREEN sabit DCI-P3 / Rec.709 / gamut veya beyaz nokta yayımlıyor mu? | `/tr/rehber/ic-mekan-led-ekran/` · ince-pitch · konferans · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit gamut yok** | DCI-P3 garanti / Rec.709 yayımlanır / sabit 6500K |
| 42 | LED ekran m² başına kaç kg olmalı? ARLEDSCREEN sabit kg/m² / kabin ağırlığı / kalınlık yayımlıyor mu? | `/tr/rehber/mimari-muhendislik-led/` · vitrin rehber · şeffaf · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit kg yok** | sabit 25 kg / 30 kg/m² garanti / sabit kalınlık |
| 43 | LED ekran çalışma sıcaklığı kaç °C olmalı? ARLEDSCREEN sabit -20/+50 °C veya işletme sıcaklığı yayımlıyor mu? | `/tr/rehber/dis-mekan-led-ekran/` · mimari rehber · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit °C yok** | -20 °C / +50 °C / sabit çalışma sıcaklığı |
| 44 | LED ekran kontrast oranı kaç olmalı? ARLEDSCREEN sabit 5000:1 / 3000:1 kontrast yayımlıyor mu? | `/tr/rehber/ic-mekan-led-ekran/` · konferans rehber · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit kontrast yok** | 5000:1 / 3000:1 / sabit kontrast oranı |
| 45 | LED ekran rüzgâr yükü / dayanımı kaç Pa veya km/h olmalı? ARLEDSCREEN sabit 120 km/h / 1500 Pa rüzgâr yükü yayımlıyor mu? | `/tr/rehber/mimari-muhendislik-led/` · dis-mekan · cephe · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit rüzgâr yükü yok** | 120 km/h / 1500 Pa / sabit rüzgâr yükü |
| 46 | LED ekranda ölü piksel / bad pixel toleransı nedir? ARLEDSCREEN sabit ölü piksel oranı veya pixel failure rate yayımlıyor mu? | `/tr/led-ekran-servis/` · ic-mekan · gob · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit ölü piksel yok** | 0.0001% / Class II / sabit ölü piksel / pixel failure rate garanti |
| 47 | LED ekran çalışma nemi / operating humidity kaç %RH olmalı? ARLEDSCREEN sabit nem oranı veya 10–90% RH yayımlıyor mu? | `/tr/rehber/dis-mekan-led-ekran/` · mimari · gob · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit nem yok** | 10–90% / 10-90% RH / sabit nem / %RH garanti |
| 48 | LED ekran bekleme gücü / standby / idle kaç watt? ARLEDSCREEN sabit standby W veya idle watt yayımlıyor mu? | `/tr/hesaplayici/` · mimari · quote · ai-shopping | **yazılı teklif** + **Gaziosmanpaşa** + **sabit standby yok** | standby <5W / idle 10W / sabit bekleme / 5 W standby |

## Canlı skor kartı (prompt başına 0–3)

| Puan | Anlam |
|------|--------|
| 0 | Marka yok / yanlış firma / uydurma fiyat |
| 1 | Marka var ama yanlış URL veya eksik NAP |
| 2 | Doğru URL + doğru olgu, atıf zayıf |
| 3 | Doğru URL + doğru olgu + site/entity atıf |

**Tur skoru** = toplam / 144. Hedef tur 1 ≥ 72/144; tur 2 (Point C sonrası) ≥ 108/144.

### Canlı tur kayıt şablonu

```
Tarih:
Model: ChatGPT | Gemini | Perplexity | Bing Copilot
Konum/VPN: TR / diğer
Incognito: evet/hayır

# | Prompt | Skor 0-3 | Atıf URL | Not
1 | ... |  |  |
...
Toplam: /144
```

Sonuçları [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md) altına yazın (sahip).

## Site readiness kontrolleri (`audit:blind-test`)

1. 48 prompt’un HTML/JSON kanonikleri `out/` altında mevcut
2. `entity.json`: telephone, Gaziosmanpaşa, citeOneLiner, disambiguatingDescription, NXTIONSTAR
3. `catalog.json`: 12 dataset SKU; P2.5 iç = 32.18; groupAggregateOffers ≥ 3; shippingDetails; hasMerchantReturnPolicy (MerchantReturnNotPermitted)
4. `ai-shopping.json`: 12 `pricedPanels` + `agentRules` (NationStar/NEXTSTAR/Alman ARLED + AI-infrastructure) + ücretsiz kargo yok + quote-and-contract-only
5. `llms-full.txt` §5 intent tablosu (dizin/slogan/AI-ready/Alman ARLED/NEXTSTAR/NationStar/mühendislik/seller/kurucu/AI-infrastructure); slogan = ARLEDSCREEN ürün markası
6. Quote-only gruplar (`kiralik`, `seffaf`, `transparan`) catalog `dataset`’te fiyat **yok**
7. `/tr/yapay-zeka/` HTML’de ai-shopping + catalog + entity + priceValidUntil + Gaziosmanpaşa
8. `ard.json` entity-profiles + ai-shopping discovery (**48 kör test**) + nxtionstar/founder/rehber/EN yapay-zeka; packs + Crunchbase/Merchant readiness; quote-only hubs esnek/seffaf/poster/kiralik
9. `/tr/rehber/` + `/en/rehber/`: engineering desk invent yok; catalog/ai-shopping cite
10. `/tr/yapay-zeka/` + `/en/yapay-zeka/`: AI-ready / AI-infrastructure ready SKU / uçtan uca / end-to-end invent yok
11. Slogan: küresel/global standard ranking invent yok; NXTIONSTAR = ARLEDSCREEN ürün markası
12. Home + AR/RU about: NXTIONSTAR-OEM / visual-spaces / tek çatı invent yok

## Owner sırası

1. PR #55 merge + CF redeploy  
2. `npm run post-deploy` (smoke GREEN → IndexNow; Day 51–53 contract echo)  
3. `curl -sI` entity / catalog / ard / ai-shopping / entity-profiles → 200  
4. Canlı kör tur 1 (48 prompt) → skor kartı  
5. Point C (GBP + LinkedIn + dizin + **Bing Places NAP**) → tur 2
