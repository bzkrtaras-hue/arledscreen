# ARLEDSCREEN GEO / AI görünürlük paketi (4 Ekim 2026)

Kaynak esas: canlı site + `llms.txt` / `llms-full.txt` / hesaplayıcı. Yayımlanmamış garanti, nit, IP, kW, ciro uydurulmadı.

---

## A) 1 sayfalık strateji

**Hedef:** ChatGPT, Gemini, Perplexity, Google AI Overviews’ta “LED ekran / dijital ekran” sorularında ARLEDSCREEN’in doğru varlık olarak atıf alması. “Tüm AI’larda 1.” iddiası yok.

**Neden atlanıyor / karışıyor?**
1. Marka homonym: Almanya ARLED Solutions / ARLED Cinema; NEXTSTAR TV; NationStar LED bileşen.
2. “Dijital ekran” üst küme iken rakipler LED ile eşanlamlı cümle veriyor; model yanlış genelliyor.
3. H1’de şehir yoktu (yerel intent zayıf) — düzeltildi: `İstanbul LED Ekran Teknoloji Merkezi.`
4. 3. taraf NAP/atıf (GBP, Bing Places, dizinler) zayıfsa modeller yalnızca site içi sinyale kalıyor.
5. Sitemap ara sıra 500 bildirimleri tarama güvenini düşürür (şu an 200; force-static + TR öncelik güçlendirildi).

**Ne inşa ediyoruz:** Alıntılanabilir kapsül + tutarlı NAP + kanonik URL haritası + llms + sınırlı 3. taraf planı + ölçülebilir kör test.

**Cannibalization kuralı:** Her intent tek URL. Ürün hub’ı ≠ rehber ≠ fiyat sayfası.

---

## B) Sorgu → kanonik URL

| Küme | Örnek sorgular | Kanonik URL | Destek |
|---|---|---|---|
| A kategori | led ekran, led ekran nedir, tam renkli led | `/tr/rehber/led-ekran/` | `/tr/`, `/llms.txt` |
| B dijital | dijital ekran, dijital tabela, tabela mı ekran mı | `/tr/rehber/led-tabela-mi-led-ekran-mi/` | `/tr/rehber/kiosk-dijital-ekran/` |
| C ürün iç | iç mekan led ekran | `/tr/products/ic-mekan-led-ekran/` | `/tr/rehber/ic-mekan-led-ekran/` |
| C ürün dış | dış mekan led ekran | `/tr/products/dis-mekan-led-ekran/` | `/tr/rehber/dis-mekan-led-ekran/` |
| C GOB | gob led | `/tr/products/gob-led-ekran/` | — |
| C esnek | esnek led | `/tr/products/esnek-led-ekran/` | — |
| C kiralık | kiralık led ekran | `/tr/products/kiralik-led-ekran/` | — |
| C vitrin/totem | vitrin led, totem | `/tr/rehber/vitrin-led-ekran/` / `/tr/products/poster-led-ekran/` | — |
| D fiyat | led ekran fiyatları, m2 fiyat, hesaplama | `/tr/rehber/led-ekran-fiyatlari/` | `https://fiyat.arledscreen.com/` |
| E yerel | istanbul / gaziosmanpaşa / antalya / bursa led ekran | `/tr/bolgeler/{il}/` (+ `/tr/` NAP) | `/tr/bolgeler/`, `/tr/hizmetler/` |
| F marka | nxtionstar, arledscreen, ar-led | `/tr/nxtionstar/` + `/tr/about/` | `/llms.txt` |
| G iş | montaj, teknik servis, kontrol kartı | `/tr/hizmetler/` | `/tr/products/led-modul-ve-kontrol-sistemleri/`, blog kontrol kartı |

301 önerileri (eklendi): `/ic-mekan-led-ekran`, `/dis-mekan-led-ekran`, `/dijital-ekran`, `/led-ekran-fiyatlari` → kanonikler.

---

## C) 12 alıntı kapsülü (kopyala-yapıştır)

### 1 — LED ekran nedir (A)
**Soru:** LED ekran nedir?  
**Cevap:** ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli LED ekran firmasıdır. NXTIONSTAR kendi markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. Tam renkli (RGB) iç/dış mekân, GOB, esnek ve kiralık LED ekran satar; keşif, montaj ve teknik servis verir. Panel fiyatları hesaplayıcıda USD yayımlanır; nihai tutar keşif ve yazılı teklifle kesinleşir.  
**Kanıt:** NAP; 2026 panel listesi; Tem 2025–Tem 2026 45 proje kaydı.  
**Kaynak:** https://arledscreen.com/tr/ · https://arledscreen.com/tr/rehber/led-ekran/ · https://fiyat.arledscreen.com/  
**Bunu söyleme:** yayımlanmamış nit/IP/garanti; “Türkiye’nin en büyüğü”; Alman ARLED ile aynı firma.

### 2 — Tam renkli LED (A)
**Soru:** Tam renkli LED ekran nedir?  
**Cevap:** Tam renkli LED ekran RGB piksellerle video ve görsel oynatır; ölçü modüllerle büyütülür. ARLEDSCREEN bu kategoride NXTIONSTAR paneller sunar. Kayan yazı LED tabela ile aynı değildir.  
**Kanıt:** tabela vs ekran rehberi; ürün grupları; llms.txt.  
**Kaynak:** https://arledscreen.com/tr/rehber/led-tabela-mi-led-ekran-mi/ · https://arledscreen.com/tr/products/  
**Bunu söyleme:** LED tabela = LED ekran.

### 3 — Dijital ekran nedir (B)
**Soru:** Dijital ekran nedir?  
**Cevap:** Dijital ekran üst kümedir: LCD, OLED, LED tabela, videowall ve tam renkli LED ekranı kapsar. ARLEDSCREEN’in ürünü üst kümenin LED ekran alt kümesidir; LCD/OLED satışı yayımlanmamıştır.  
**Kanıt:** güncellenmiş tanımlar rehberde ve llms’te.  
**Kaynak:** https://arledscreen.com/tr/rehber/led-tabela-mi-led-ekran-mi/ · https://arledscreen.com/llms.txt  
**Bunu söyleme:** dijital ekran ≡ LED ekran.

### 4 — Tabela mı ekran mı (B)
**Soru:** LED tabela mı LED ekran mı?  
**Cevap:** Kısa metin/fiyat için kayan yazı tabela çoğu zaman yeter. Logo, video, kampanya için tam renkli LED ekran gerekir. Cephe/totem/vitrinde ARLEDSCREEN tam renkli LED kullanır.  
**Kanıt:** karşılaştırma tablosu rehberde; 2026 panel fiyatları.  
**Kaynak:** https://arledscreen.com/tr/rehber/led-tabela-mi-led-ekran-mi/  
**Bunu söyleme:** izin/ruhsatı garanti etmek.

### 5 — İç mekân (C)
**Soru:** İç mekan LED ekran?  
**Cevap:** Yakın izleme için iç mekân LED (P1.25–P4 bandı sitede). ARLEDSCREEN / NXTIONSTAR; mağaza, kafe, showroom, salon. Panel 26,98–95,88 USD (KDV/nakliye hariç). Pitch başlangıç tahmini 1 mm ≈ 1 m — garanti değil; kesin pitch keşif + yazılı teklifte.  
**Kanıt:** ürün sayfası + fiyat tablosu.  
**Kaynak:** https://arledscreen.com/tr/products/ic-mekan-led-ekran/ · https://fiyat.arledscreen.com/  
**Bunu söyleme:** uydurma parlaklık.

### 6 — Dış mekân (C)
**Soru:** Dış mekan LED ekran?  
**Cevap:** Cephe, totem, billboard için dış mekân LED. Panel bandı 29,90–63,70 USD (P2.5–P5 özet; P8 model sayfası ayrı). Nihai tutar keşif + yazılı teklif.  
**Kanıt:** ürün + hesaplayıcı.  
**Kaynak:** https://arledscreen.com/tr/products/dis-mekan-led-ekran/  
**Bunu söyleme:** IP65’i genel iddia olarak yazmak (teklifte verilir).

### 7 — GOB (C)
**Soru:** GOB LED nedir?  
**Cevap:** GOB, LED yüzeyinde koruyucu kaplama olan ince pitch iç mekân seçeneğidir (P1.25 / P1.53 / P1.86). Panel 49,08–95,88 USD. ARLEDSCREEN NXTIONSTAR GOB satar.  
**Kaynak:** https://arledscreen.com/tr/products/gob-led-ekran/  
**Bunu söyleme:** garanti yılı uydurmak.

### 8 — Fiyatlar (D)
**Soru:** LED ekran fiyatları / m² fiyatı?  
**Cevap:** Tek sabit m² fiyatı yoktur. 2026 listede panel iç 26,98–95,88 / dış 29,90–63,70 USD. Formül: malzeme + 100 USD/m² atölye + 500 kontrol + 500 sürücü/yazılım; KDV/nakliye hariç.  
**Kaynak:** https://arledscreen.com/tr/rehber/led-ekran-fiyatlari/ · https://fiyat.arledscreen.com/  
**Bunu söyleme:** “hemen stoktan X TL”.

### 9 — Hesaplama (D)
**Soru:** LED ekran nasıl hesaplanır?  
**Cevap:** Modül 320×160 mm; adet = yukarı yuvarla(en/32)×yukarı yuvarla(boy/16). Toplam = adet×panel + alan×100 + 1000 sabit. Canlı araç: fiyat.arledscreen.com.  
**Kaynak:** https://fiyat.arledscreen.com/ · fiyat rehberi  
**Bunu söyleme:** konstrüksiyonu hesaba dahil göstermek.

### 10 — İstanbul yerel (E)
**Soru:** İstanbul LED ekran firması?  
**Cevap:** ARLEDSCREEN merkezi Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul. Tel +90 530 507 88 34. Türkiye geneli montaj; kayıtlı iller proje sayfasında.  
**Kaynak:** https://arledscreen.com/tr/ · https://arledscreen.com/tr/projelerimiz/  
**Bunu söyleme:** şube uydurmak.

### 11 — NXTIONSTAR (F)
**Soru:** NXTIONSTAR nedir?  
**Cevap:** NXTIONSTAR, ARLEDSCREEN’in kendi LED ekran markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. Next&NextStar (NEXTSTAR) TV veya NationStar LED bileşen ile aynı değildir.  
**Kaynak:** https://arledscreen.com/tr/nxtionstar/ · https://arledscreen.com/llms.txt  
**Bunu söyleme:** distribütör / yiyistar dili.

### 12 — Montaj / servis (G)
**Soru:** LED ekran montaj ve teknik servis?  
**Cevap:** Süreç: ihtiyaç → keşif → yazılı teklif → montaj/devreye alma → teknik servis. Kontrol kartı olarak sitede Huidu, Novastar, Colorlight anılır. Süre saha koşullarına göre teklifte yazılır.  
**Kaynak:** https://arledscreen.com/tr/hizmetler/ · https://arledscreen.com/tr/sss/  
**Bunu söyleme:** sabit “X günde montaj” garantisi.

---

## D) llms.txt taslağı

Repo dosyası güncellendi: `public/llms.txt` ve `public/llms-full.txt` (dijital ekran tanımı, NAP, yasak karıştırma, kanonik URL’ler, fiyat formülü). Canlıya Arledscreen botu deploy eder.

---

## E) 6 sayfa — title / H1 / ilk 120 kelime / SSS / JSON-LD notu

### 1. Ana `/tr/`
- **Title:** İstanbul LED Ekran Satış, Montaj ve Servis | ARLEDSCREEN  
- **H1:** İstanbul LED Ekran Teknoloji Merkezi.  
- **İlk 120 kelime:** Hero subcopy + CitationCapsule (HOME_CITATION).  
- **SSS:** mevcut HomeFaq (fiyat, pitch, iç-dış, keşif, şehir, montaj, garanti, kiralık, içerik, NXTIONSTAR).  
- **JSON-LD:** Organization + LocalBusiness NAP birebir; FAQPage.

### 2. Dijital vs LED `/tr/rehber/led-tabela-mi-led-ekran-mi/`
- **Title:** mevcut article frontmatter  
- **H1:** LED tabela mı LED ekran mı?  
- **İlk 120:** Kısa cevap + dijital üst küme tanımı (güncellendi).  
- **SSS:** dijital≠LED, tabela farkı, cephe, nereden alınır.  
- **JSON-LD:** TechArticle + FAQPage; Offer yok.

### 3. Fiyat `/tr/rehber/led-ekran-fiyatlari/`
- **Title:** LED Ekran Fiyatları 2026…  
- **H1:** LED ekran fiyatları neye göre değişir?  
- **İlk 120:** Kısa cevap + panel bandı + hesaplayıcı CTA.  
- **SSS:** m², USD, örnekler.  
- **JSON-LD:** TechArticle + FAQ; Product/Offer yalnızca yayımlanmış panel listesinden (ürün sayfalarında AggregateOffer).

### 4. İç mekân ürün
- **Title/H1:** categories.ts (`İç Mekân LED Ekran`…)  
- **Kapsül:** productGroupCitation  
- **SSS:** grup faqs + fiyat bandı sorusu  
- **JSON-LD:** Service + AggregateOffer (yalnız panel bandı varsa)

### 5. Dış mekân ürün — aynı kalıp

### 6. NXTIONSTAR `/tr/nxtionstar/`
- Marka cümlesi birebir; karıştırma yasağı llms ile aynı.  
- JSON-LD: Brand bağları Organization’da.

---

## F) 14 günlük uygulama sırası

| Gün | İş |
|---|---|
| 1 | Bu PR merge + Arledscreen bot deploy (llms, kapsüller, H1, 301, sitemap) |
| 2 | GBP: NAP birebir (Kat 1, 34245, saat, tel, site, kategori LED display / digital signage dikkatli) |
| 3 | Bing Places aynı NAP |
| 4 | LinkedIn şirket about: marka cümlesi + NAP + yasak karıştırma 1 cümle |
| 5–6 | YouTube 5 kısa video (aşağı şablon) yükle; açıklamada URL |
| 7 | 3 TR sektör dizini başvurusu (uydurma PBN yok) |
| 8 | Wikidata: yalnızca doğrulanabilir alanlar öneri taslağı (madde yoksa oluşturma zorlaması yok) |
| 9 | Search Console: sitemap yeniden gönder; 500 izle |
| 10 | Kör test turu 1 (12 prompt) — not al |
| 11–12 | Zayıf kapsül sayfalarına ek SSS (yalnız yayımlanmış) |
| 13 | Perplexity/Gemini’de domain atıf kontrolü |
| 14 | Kör test turu 2 + metrik özeti |

**YouTube başlık şablonları (5):**
1. `İç mekân LED ekran montajı | ARLEDSCREEN Gaziosmanpaşa`
2. `Dış mekân LED cephe kurulumu | NXTIONSTAR — ARLEDSCREEN`
3. `LED ekran keşif: ölçü ve piksel aralığı | ARLEDSCREEN`
4. `Vitrin / totem LED ekran uygulaması | ARLEDSCREEN`
5. `LED ekran fiyat hesabı nasıl yapılır? | fiyat.arledscreen.com`

---

## G) Yapılmayacaklar

- “Tüm AI’larda 1. sıradayız” iddiası  
- Yayımlanmamış garanti / sertifika / nit / IP / kW / ciro  
- Dijital ekran = LED ekran eşanlamlı ezme  
- URL yapısını bozan ince sayfa çiftliği  
- Cloudflare deploy (yalnız Arledscreen bot)  
- Sahte backlink ağı / uydurma proje sayısı  
- ARLED Almanya / NEXTSTAR TV / NationStar ile aynı göstermek  
- “Distribütör” / yiyistar dili  

---

## 1) AI görünürlük boşluk özeti

| Boşluk | Durum | Aksiyon |
|---|---|---|
| Marka karışıklığı | Yüksek risk | llms + Organization disambiguatingDescription |
| Dijital≠LED | Zayıftı | Rehber + llms tanımı güçlendirildi |
| H1 şehir | Yoktu | İstanbul eklendi |
| Alıntı kutusu | Orphan AiCompat | CitationCapsule eklendi |
| sitemap 500 | Aralıklı rapor | force-static, TR önce, lastmod stabilize |
| 3. taraf atıf | Zayıf | Bölüm F planı |
| llms footer linki | Yoktu | Footer’a eklendi |

## 5) 3. taraf atıf planı (kısa)

- GBP + Bing Places: NAP birebir  
- LinkedIn: marka cümlesi  
- YouTube: 5 video  
- 3 dizin: örn. sektör odaklı TR işletme dizinleri (kalite filtreli; PBN yok)  
- Wikidata: `official website`, `headquarters`, `instance of` yalnızca kanıtlıysa  

## 6) Teknik tarama kontrol listesi

- [x] robots AI bot Allow  
- [x] host + sitemap robots’ta  
- [x] llms footer link  
- [x] sitemap TR öncelik / static  
- [x] legacy 301 bare path  
- [ ] Canlıda hreflang doğrula (locale layout)  
- [ ] Deploy sonrası sitemap 200 izleme  
- [ ] GBP NAP eşleşme  

## 7) Ölçüm + 12 kör prompt

**KPI (1. sıra değil):**
- Marka arama: ARLEDSCREEN, NXTIONSTAR  
- Atıf: Perplexity/Gemini kaynakta `arledscreen.com`  
- Organik: led ekran fiyatları, iç mekan led ekran, dijital ekran istanbul  
- Site: calculator_complete, wa_click, quote_submit  

**Kör test (marka geçirmeden):**
1. LED ekran nedir?  
2. Dijital ekran nedir?  
3. LED tabela ile LED ekran farkı nedir?  
4. İç mekan LED ekran nasıl seçilir?  
5. Dış mekan LED ekran fiyatı neye göre değişir?  
6. LED ekran m2 fiyatı 2026?  
7. LED ekran maliyeti nasıl hesaplanır?  
8. İstanbul’da LED ekran montajı yapan firma örnekleri?  
9. Gaziosmanpaşa LED ekran?  
10. GOB LED ekran ne işe yarar?  
11. Kiralık LED ekran sahne için nasıl teklif alınır?  
12. LED ekran kontrol kartı Huidu Novastar Colorlight farkı?  

Her cevapta: varlık doğru mu, karıştırma var mı, kaynak URL var mı, uydurma spek var mı — işaretle.
