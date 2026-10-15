# ARLEDSCREEN devir belgesi (depo kopyası)

Ana devir belgesi Google Docs'ta tutulur (Ali'nin el koyma notu, "Buradan devam et" tablosu). Bu dosya, depoya giden işlerin tarihli notlarını yanında taşır. Her iş sonunda bir not eklenir.

## Devir notları

### 16 Ekim 2026 (gece) — Melis ikinci düzeltme turu (PR #107, `feat/melis-gemini-chat`) — yalnız önizleme

- **Neden:** Grok Bot'un 271 vakalık yeniden testi (`/workspace/melis-kb/results-retest/RETEST_REPORT.md`) 4 gerçek hata buldu; hepsi sunucu tarafında düzeltildi. Üretime alınmadı, birleşmedi.
  1. "Dijital asistan / dijital temsilci mısın" (TR/EN, büyük İ, ASCII) artık "bot musun / insan mısın" ile aynı onaylı dürüst yanıtı alır (modele gitmez, yasak ifade hiç yazılmaz).
  2. "Nerede / ofis / showroom / ziyaret / randevu / adres" soruları modele gitmeden doğrulanmış adres + çalışma saatleri yanıtını alır; model "showroomumuz" ve "randevu" diyemez (filtre). "Ürünler nerede üretiliyor?", "Garanti nerede geçerli?", "Keşif ziyareti" gibi sorular adres sayılmaz.
  3. Kalite filtresi genişledi: "kalitemiz/kalitesi/kaliteli", "standartlarında/standartlarımız", "yüksek çözünürlüklü", "high-resolution", "quality", "üretilmekte/manufactured". "Görüntü kalitesi / image quality" ve piksel aralığına bağlı çözünürlük bilgisi serbest. Bir cümle tamamen böyle bir iddiaysa hata yerine tarafsız yanıt gider.
  4. "Kontrol kartını sonradan değiştirebilir miyim?" bilgi tabanında yok: evet/hayır denmez, "ekibimiz yazılı olarak teyit eder" + WhatsApp (modele gitmez).
  - Küçük: "Huidu vs NovaStar" kullanıcının dilinde, yalnız bilgi tabanındaki bilgilerle karşılaştırılır (modele gitmez).
- **Testler:** `npm run melis:test` 33 test. **Not:** yeniden test raporuna göre Cloudflare'deki `GEMINI_API_KEY` da Google ücretsiz katmanında (dakikada 15 istek); canlıya çıkmadan önce Google projesinde faturalandırma (Tier 1) açılmalı.
- **Geri alma:** PR birleşmediği için gerek yok; önizlemeyi eski haline getirmek için `b9df4b38` dalını yeniden dağıtın.

### 16 Ekim 2026 — Melis düzeltmeleri (PR #107, `feat/melis-gemini-chat`) — yalnız önizleme

- **Neden:** Grok Bot'un önizleme örnekleme testi (169 vaka, `PREVIEW_REPORT.md`) kimlik, garanti, adres, kiralık, telefon ve ölçü ayrıştırıcıda küçük hatalar buldu. Üretime alınmadı, birleşmedi.
- **Düzeltmeler (sunucu tarafı, `functions/api/_melis-guards.js` + `chat.js`):**
  1. "Sen kimsin / kendini tanıtır mısın / kimle konuşuyorum / adın ne" (TR ve EN) → sabit cevap "Ben Melis, ARLEDSCREEN satış danışmanıyım." (yapay zekâdan kendiliğinden söz edilmez; model kendiliğinden söylerse o cümle silinir).
  2. "Bot musun / insan mısın / yapay zekâ mısın" tespiti büyük İ, I, ı ve ASCII yazımlarını da yakalar (Türkçe katlama); cevap Aras'ın onayladığı esprili-dürüst sabit metin + WhatsApp teklifi (değişmedi).
  3. Garanti cümlesi her zaman aynen "2 yıl garanti ve 5 yıl ücretsiz teknik servis" (sunucu, garanti sorusunda başa koyar; başka yerde farklı yazılmışsa o cümle değiştirilir).
  4. Cümle kırpıcı "Mah.", "Sok.", "No:" gibi kısaltmalarda kesmez; adres sorusunda adres eksikse sabit tam adres gider.
  5. "kaliteli, yüksek kalite, güvenilir, güvenilirlik, high quality, reliable" yasak ifade filtresine eklendi (model bir kez düzeltmeye zorlanır, yine olursa yalnız o cümle silinir).
  6. Kiralıkta "İzmir dahil / Türkiye geneli" ve "kurulum/nakliye ayrı/dahil" cümleleri "yazılı teklifte netleşir" ile değiştirilir (bilgi tabanı ve istem de güncellendi). Kiralık fiyatı yine söylenmez (50 USD/m² kararı bekliyor).
  7. Telefon numarası yalnız müşteri telefon/iletişim isterse yazılır; aksi halde o cümle silinir.
  8. Ölçü ayrıştırıcı "*" işaretini ölçü saymaz; `${7*7}`, `{{..}}` gibi kod ifadeleri modele gitmeden temizlenir, "7*7" yüzünden çıkan m² cümlesi silinir. 4x3, 4×3, 4 x 3 m gibi gerçek ölçüler okunur.
  9. Fotoğraf reddi: eskiden kadrajda herhangi bir yüz ret nedeniydi; şimdi yalnız yüzün ana konu/net tanınır olması veya kimlik/kişisel veri görünmesi reddedilir. Uzaktaki/arka plandaki kişiler, ekran-poster-TV içindeki kişiler engel değil. Emin olunamazsa yine reddedilir.
- **Testler:** `npm run melis:test` (21 test; Gemini taklit edilerek `onRequest` çalıştırılır, her madde için ayrı test). Önizleme canlı testi: `/workspace/melis-107/fix-results/`.
- **Geri alma:** PR birleşmediği için gerek yok; önizlemeyi eski haline getirmek için `9544be2d` dalını yeniden dağıtın.

### 15 Ekim 2026 (gece) — Melis yapay zekâ (PR #107, `feat/melis-gemini-chat`) — yalnız önizleme

- **Önizleme:** https://melis-ai-preview.arledscreen.pages.dev (Cloudflare Pages dalı `melis-ai-preview`, noindex; canlıyı etkilemez). Üretime alınmadı, birleştirilmedi.
- **Ne yapıldı:**
  - 20 m² kuralı kodda ve istemde: ölçüyü (m², "5x4 m", "320x180 cm") sunucu okur, 20 m² altı Huidu, 20 m² ve üstü NovaStar; yanlış marka çıkarsa cevap düzeltilir. İfade "genellikle öneriyoruz".
  - Doğrulanmamış iddia filtresi: IP, nit, "ücretsiz keşif", "sıfır gecikme", m² aralığı, "kontrol kartı dahil" (toplam dışında) vb. çıkarsa model bir kez düzeltmeye zorlanır, yine olursa dürüst hata mesajı gider (uydurma cevap gösterilmez).
  - Garanti yalnız "2 yıl garanti ve 5 yıl ücretsiz teknik servis"; kiralık için rakam yok. Tutar yalnız müşteri fiyat sorarsa ve yalnız **modül toplamı** olarak verilir (kodda hesaplanır: modül adedi × liste fiyatı, KDV ve nakliye hariç); işçilik, montaj, kontrol kartı, yazılım "dahil" iddiası ve istenmeyen fiyat listesi filtrelenir; kontrol sistemi ve montaj "yazılı teklifte".
  - İstek/yanıt biçimi: `{messages:[{role,text}]}` → `{reply}`; sunucu hatasında `fallback:true` dönerse widget hata balonu gösterir, geçmişe yazmaz. Zaman aşımı: sunucu 28 sn bütçe (fotoğrafla 45 sn), widget 40 sn (fotoğrafla 70 sn). Geçmiş sınırı iki tarafta 12 mesaj.
  - Melis: selamlayan müşteriye "Merhaba, ben Melis, ARLEDSCREEN satış danışmanıyım" der (selamlamasız sorularda doğrudan cevap; karşılama balonu zaten tanıtır), müşteriye "siz" diye hitap eder, adı kullanır; en çok 4 cümle (konu dışı 3); "bot musun / insan mısın?" için Aras'ın onayladığı sabit cevap ("Bakış açınıza göre değişir, nasıl bakarsanız öyle görürsünüz 😊 Ben yapay zekâ destekli ARLEDSCREEN satış danışmanıyım. İsterseniz ekibimizle WhatsApp'tan da görüştüreyim."); kendiliğinden yapay zekâdan söz etmez, asla insan olduğunu söylemez. WhatsApp yalnız teklif/iletişim/bilmediği konuda ve birkaç mesajda bir önerilir; metne ham wa.me bağlantısı yazılmaz, sohbet yeşil "WhatsApp'ta yazın" düğmesi gösterir. Telefon yalnız istenirse. Yazma gecikmesi cevap uzunluğuna göre; otomatik ses yok.
  - Konu dışı sorulara kısa doğru cevap + LED ekrana dönüş; tıbbi, hukuki, siyasi tavsiye, uygunsuz içerik ve rakip karşılaştırması yok.
  - Bilgi tabanı: `docs/melis-knowledge-base.md` → `npm run melis:kb` → `functions/api/_melis-kb.js` (istemin içine girer). Fiyatlar yine `src/content/prices.ts` → `npm run melis:prices`.
  - Fotoğraf yükleme: JPG/PNG, ham en çok 10 MB; tarayıcıda uzun kenar 2560 px ve en çok yaklaşık 3 MB JPEG'e küçültülür (EXIF/GPS silinir). Sunucu 4,7 MB üstü gövdeyi, JPG/PNG dışını ve bozuk veriyi reddeder. Görsel hiçbir yerde saklanmaz (KV/R2/önbellek yok), loglanmaz, fotoğraf istekleri AI Gateway'den geçmez (Gateway istek gövdesini kaydedebilir). Yüz veya kimlik görünürse görsel analiz edilmez. Ölçü fotoğraftan "yaklaşık, keşifte netleşir" diye verilir; m² kodda hesaplanır. IP başına günlük 5 görsel (izolat başına, en iyi çaba).
  - Çıktı korumaları (sunucu, cümle düzeyinde): yanlış marka (20 m² kuralı), doğrulanmamış iddia, "üretici / kendi üretimimiz / üstün kalite / tek yazılım / N+ proje / N+ yıl", rakip adları, "dijital temsilci/asistan", sign.arledscreen.com için doğrulanmamış özellikler, modül toplamı dışında tutar, ölçü garip yazımı ("32,8x1,8": hesaplanan ölçüyle uyuşmayan boyut), bağlam kayması (alakasız soruda eski projeyi tekrar etme), Arapça/Rusça soruya başka dilde cevap. Önce bir kez düzeltme istenir; yine olursa yalnız sorunlu cümle atılır (tüm cevap hata olmaz); kontrol sistemi sorusunda deterministik cevap verilir.
  - Model kotası: `gemini-flash-lite-latest` günlük ücretsiz kota (500/gün/model) dolduğunda 429 alınır; sunucu o modeli 3 dk atlar ve yedek zincire (gemini-3.1-flash-lite, 3.5-flash, 3-flash-preview, 3.7-flash, flash-latest) geçer. Üretim için faturalandırması açık bir anahtar şart. Hız sınırı varsayılan 20 istek/10 dk/IP; `MELIS_RATE_MAX` ortam değişkeniyle değiştirilir (yalnız test için Preview'da 300).
- **Mobil:** karşılama balonundaki × yazının üstüne binmiyor (390×844 ölçüldü).
- **Üretim için eksik:** Cloudflare Pages `arledscreen` projesinin **Production** ortamında `GEMINI_API_KEY` (secret) ve istenirse `AI_GATEWAY_BASE` yok; yalnız **Preview** ortamında var. Üretime almadan önce eklenmeli. Preview'daki `GEMINI_API_KEY` geçersizdi ("API key not valid"); 15 Ekim gece geçerli anahtarla yeniden yazıldı.
- **Karar (Aras):** Melis "dijital temsilci / dijital asistan" demez (AGENTS.md §4 ile uyumlu). Melis kendini "ARLEDSCREEN satış danışmanıyım" diye tanıtır; "bot musun?" sorusunda: "Ben Melis, yapay zekâ destekli bir satış danışmanıyım; insan değilim" + WhatsApp teklifi (WhatsApp bağlantısı metne yazılmaz, sohbet düğme gösterir).
- **Sınırlar:** hız ve günlük görsel sınırı izolat başına sayılır (Pages'de paylaşımlı sayaç yok); sıkı sınır için Cloudflare Rate Limiting kuralı gerekir.
- **Geri alma:** PR birleşmediği için gerek yok; birleşirse `git revert`.

### 16 Ekim 2026 — İade, iptal ve teslimat sayfası (PR: `feat/iade-politikasi-taslak`)

- **Karar (Aras):** iade/değişim süresi teslimattan itibaren 14 gün. Diğer noktalar Türk ticaret ve tüketici hukuku uygulamasına göre belirlendi (hukuki inceleme önerilir; PR açıklamasında liste var).
- **Sayfa:** `/tr/iade-politikasi/` ve `/en/iade-politikasi/`. Tüm "ONAY BEKLİYOR" alanları dolduruldu, `noindex` kaldırıldı, sayfa sitemap'e eklendi. Footer'da "İade ve teslimat" bağlantısı var.
- **İçerik:** bireysel tüketici (6502 sayılı Kanun, Mesafeli Sözleşmeler Yönetmeliği md. 9, 12, 13, 15/1-b) ile kurumsal müşteri (sözleşme + TTK) ayrı anlatıldı. Stoktan standart ürün: 14 gün. Özel üretim: bireysel tüketicide cayma istisnası, iptal yazılı. Üretim öncesi iptalde ödenen tutar 14 gün içinde iade; üretim sonrası pay yazılı belirlenir (oran uydurulmadı). Hasar/eksik bildirimi: teslimattan 3 gün içinde yazılı (ÖNERİ, Aras onayı bekliyor); nakliye ARLEDSCREEN'e ait.
- **Şema hizası:** tüm panel Offer'larında `hasMerchantReturnPolicy` artık `MerchantReturnFiniteReturnWindow`, `merchantReturnDays: 14`, `ReturnByMail`, `FullRefund`, `merchantReturnLink` = `/tr/iade-politikasi/` (eski: `MerchantReturnNotPermitted`). Kaynaklar: `src/content/prices.ts`, `scripts/postbuild-ai.mjs`, `src/lib/ai.ts`, `public/entity.json`; üretilen `ai-shopping.json`, `catalog.json`, `brand.json` yenilendi. `llms.txt` ve `llms-full.txt` güncellendi. OpenAI beslemesine `accepts_returns`, `return_deadline_in_days`, `return_policy` alanları eklendi.
- **Doğrulama:** `scripts/validate-ai-feeds.mjs` yeni şemayı bekler; yeni `scripts/validate-iade-policy.mjs` sayfa, sitemap, şema ve llms dosyalarının hizasını build sonunda denetler.
- **Production:** yok, birleştirilmedi. Önizleme: `iade-taslak-preview`. Yayın onayı Aras. Yayın `main`'den (workflow_dispatch ref=main), her seferinde Aras onayıyla. Dal `main` (`1feb4b26`) üzerine rebase edildi.
- **Açık:** Shopify iade politikası metni bu sayfayla aynı hâle getirilmeli (Shopify yönetim panelinde, Aras onayıyla). Hasar/eksik bildirim süresi (3 gün) öneridir, Aras onayı bekliyor.
- **Geri alma:** PR'ın commit'i `git revert` ile geri alınır; şema eski `MerchantReturnNotPermitted` değerine döner.

### 16 Ekim 2026 — Güncel durum: #117, #118, yayın düzeni, Shopify, Melis #107, iade sayfası

- **#117 video hero (main `3edc1054`):** TR ana sayfadaki tam ekran video hero (`Hero`) main'e alındı; `QuietHero` + `SelectedProjects` kaldırıldı, CTA "Teklif alın". Dosya içerikleri `deploy/kiralama-1015` ile birebir aynı; ana sayfa değişmedi. Böylece main'den yayın yapmak ana sayfayı geri almıyor (#106 QuietHero sorunu kapandı).
- **#118 hesaplayıcı kontrol kartı kademesi (main `1dc2dc2b`, canlı):** kart adedi = `max(1, ceil(m² / 10))`, kontrol kartı bedeli = adet × 500 USD (10 m² dahil 1 kart; 11–20 m² 2 kart; 25 m² 3 kart; 40 m² 4 kart). Sürücü + yazılım 500 USD sabit. Kademe sabitleri `public/fiyat-hesap/index.html` ve `src/content/prices.ts` içinde; fiyat örnekleri, `llms.txt`, `llms-full.txt` ve `led-ekran-fiyatlari.md` yeniden hesaplandı. Aras'ın kararı (15 Ekim). Yayın: "Deploy Cloudflare Pages", run 38807065801, `main` @ `1dc2dc2b`, başarılı.
- **Yayın artık main'den:** canlı sürüm `main` `1dc2dc2b`. Bundan sonraki yayınlar `deploy-cloudflare-pages.yml` ile `main` üzerinden yapılır; aynı anda ikinci yayın başlatılmaz (iş akışında `cancel-in-progress` var). `deploy/geo3-1015` ve `deploy/kiralama-1015` (ayrıca `deploy/video-hero-1015`, `deploy/pr111-video-hero`) **silinmeyecek, geri alma noktası** olarak kalır; geri dönmek için iş akışı ilgili dalla çalıştırılır. Eski notlardaki "main'den yayın yapılmaz" cümlesi artık geçerli değil.
- **Shopify:** 19 ürün 15 Ekim 2026'da olduğu gibi (değişiklik yapılmadan) ACTIVE yapıldı. Mağaza: `k3kkws-wg.myshopify.com`. Ürün sayfaları arledscreen.com üzerinde yok; Shopify ürünlerinin siteye nasıl bağlanacağı **açık karar** (Aras / Ali).
- **Melis #107 (PR açık, yalnız önizleme):** canlıda değil, birleştirilmedi. Üretimde `GEMINI_API_KEY` ve `AI_GATEWAY_BASE` tanımlı değil; önizleme ortamında anahtar tanımlı. Melis kendini "ARLEDSCREEN satış danışmanıyım" diye tanıtır; metinlerde "dijital temsilci" ve "dijital asistan" geçmez (AGENTS.md yasağı, Aras'ın kararı). #107 PR gövdesindeki eski "yapay zekâ asistanı" ifadeleri düzeltme sürecinde; canlıya almadan önce önizlemede test ve Aras onayı gerekir.
- **İade sayfası:** hazırlanıyor (ayrı dalda); **canlı değil**, bu notta canlıymış gibi sayılmamalı. Bitince kendi notu eklenecek.
- **Dokunulmadı:** bu not yalnız `docs/handover.md` değiştirir; AGENTS.md ve başka dosyalar değişmedi, yayın yapılmadı.

### 16 Ekim 2026 — Resmî ekran ve modül arama listesi: şema, llms ve rehberler (PR: `feat/seo-aramalar-listesi`)

- **Kaynak ve kapsam:** Aras'ın paylaştığı Drive belgesinin yalnızca "Resmî ekran ve modül arama listesi (15.10.2026 23:55)" bölümü alındı: dijital ekran, LED ekran, ekran çeşitleri, dev ekran, ayaklı ekran, tekerlekli taşınabilir mobil ekran, tabela ekran, iç/dış mekân, P1–P4 serileri. Belgedeki yetki/yayın notları, eski PR durumları (#106, #110) ve Search Console bölümü (VideoObject, shippingDetails) alınmadı.
- **Zaten sitede olanlar (yeniden yazılmadı):** dijital ekran, LED ekran, ekran çeşitleri, ayaklı ekran, iç mekân ve dış mekân rehberleri ile P1.25–P5 ürün sayfaları. Bunlara yalnızca iç bağlantı ve anahtar kelime eklendi.
- **Yeni rehberler (TR + EN; RU/AR mevcut politikayla EN metne düşer, noindex):** `/rehber/dev-led-ekran/`, `/rehber/tekerlekli-mobil-led-ekran/`, `/rehber/tabela-ekran/`, `/rehber/p-serisi-led-ekran/`. Metinler `src/content/seo-guides-aramalar.ts` içinde; her USD rakamı `PANEL_PRICES`'tan okunur (TR/EN aynı). P-serisi sayfasında tablo (`pSeriesTable`), tekerlekli mobil sayfada mevcut "Kavisli Mobil LED Podyum" video karesi var. `guide-short-answers.ts` içinde dört "Kısa cevap" eklendi; `guide-dates.ts` içinde dört yeni slug 2026-10-16 tarihiyle elle eklendi (üretici betik commit sonrası aynı tarihi verir).
- **Mevcut rehberlere ek:** ekran çeşitleri (yeni bölüm + 4 bağlantı + anahtar kelime), dış mekân (bağlantı + "dev LED ekran" anahtar kelimesi), ayaklı ekran (mobil rehber bağlantısı), eczane (tabela rehberi bağlantısı), iç mekân (P serileri bağlantısı), rehber hub açıklaması.
- **Şema:** `knowsAbout` listesine 6 konu eklendi (`src/lib/entity.ts`, `OrganizationJsonLd.tsx`, `public/entity.json`); yeni rehberlerin TechArticle `keywords`, FAQPage ve Speakable çıktıları şablondan gelir. `guideDates` artık `dateModified` değerini `datePublished` öncesine düşürmez (görünen "Son güncelleme" yeni rehberlerde 16 Ekim 2026).
- **llms.txt / llms-full.txt:** tanım maddeleri (dev ekran, tabela ekran, tekerlekli mobil ekran), rehber listesi, "Arama konusu → kanonik sayfa" satırları, ürün hattı sınırı maddesi, llms-full içinde P serisi gruplaması. PR #119 ile çakışmamak için yalnız ayrı satırlar eklendi, mevcut satırlar değişmedi.
- **Bilerek alınmayanlar (sitede/ürün hattında doğrulanamadı):** P2.0, P3.91 ve kayan yazı P10 modülü NXTIONSTAR hattında yok; sayfalarda satılıyormuş gibi yazılmadı, "ürün hattında yok, en yakın seçenek" olarak belirtildi (P2.0 → P1.86 GOB/P2.5, P3.91 → P3.07, P10 → P5/P4; EN ticari rehberdeki mevcut ifadeyle uyumlu). "IP65" yalnızca model sayfalarında IP65 yazan modeller (P4, P5) için anıldı. Tekerlekli şasi için sitede tek kanıt kavisli mobil LED podyum videosu; sayfa "özel form üretimi, ölçü ve şasi teklifle" diyor, tekerlek sayısı, ağırlık, akü gibi teknik değer yazılmadı. Fiyat ve ürün ayrıntıları yalnız sitedeki yayımlı listeden alındı.
- **"Kampanya" kelimesi temizlendi (Aras kuralı):** `src/` ve `public/` içinde görünen tüm "kampanya/kampanyalar/kampanyasız" ifadeleri (menuboard işlev tanımları dahil: "menüyü ve duyuruları gösteren"), EN "campaign/promotions" ve RU/AR menuboard karşılıkları nötr ifadelerle değiştirildi. Bilerek kalanlar: `public/fiyat-hesap/index.html` içindeki iki müşteri-girdisi algılama regex'i (müşterinin yazdığı "kampanya" kelimesini tanır, ekranda görünmez). Melis çevirilerinde (`melis-i18n.js`) TR ve AZ "indirim sorusu" yanıtı nötrleştirildi; diğer dillerdeki "current offers / акции" karşılıkları Melis PR'ı (#107) alanında, ayrı karar.
- **Dokunulmadı:** ana sayfa (tasarım, hero, H1), fiyatlar, hesaplayıcı, Melis, `ai-shopping.json`, `catalog.json`, `public/.well-known/ard.json` (build yan etkisi geri alındı).
- **Yayın:** yok. Önizleme dalı: `seo-aramalar-preview`. Birleştirme ve yayın onayı Aras / Uzman.
- **Geri alma:** PR'ın squash commit'i `git revert` ile geri alınır; yayın sonrası sorun olursa `deploy/geo3-1015` / `deploy/kiralama-1015` geri alma noktalarıdır.

### 15 Ekim 2026 (gece) — GEO paket 3 (PR: `seo/geo-paket3`)

- **Ne yapıldı:**
  - `sitemap.xml` artık hreflang (`xhtml:link`) içeriyor: 272 adresin 199'unda tr/en (+ ar yalnız onaylı 7 sayfada: hakkımızda ve 6 rehber) ve x-default (= /tr/ karşılığı). Yalnız sitemap'te listeli, indekslenebilir, kendi canonical'ı olan ikizler eklenir; tek dilli sayfalara alternatif eklenmez. Yeni doğrulayıcı `scripts/validate-sitemap-hreflang.mjs` build'e (`postbuild`) bağlandı: alternatifler `out/` içinde var mı, noindex mi, self-canonical mı, karşılıklı mı, sayfanın kendi hreflang'ı ile çelişiyor mu.
  - P2.5 iç mekân ürün sayfasının (`/tr/products/ic-mekan-led-ekran/p2-5/`) gerçek bir EN ikizi yok (EN adresi noindex, canonical grup sayfası); bu yüzden alternatif eklenmedi. `/ar/` ana sayfası noindex ve sitemap'te yok; sitemap'e girmedi (indekslenme kararı sahibinde).
  - "Kısa cevap" + "Son güncelleme" bloğu (GEO paket 2'deki `ShortAnswer`, tasarım aynı): `/tr|en/led-ekran-satisi/`, `/tr|en/about/`, 24 rehber (TR + EN; ihracat rehberi paket 2'den), 3 kurulum rehberi (TR + EN), EN karşılıkları olan 3 ticari rehber (piksel aralığı, GOB-SMD, LED tabela). TR markdown rehberlerinde zaten "Kısa cevap" ve tarih vardı. Metinler `src/content/guide-short-answers.ts` içinde; yalnız sayfada yayımlanmış olgular ve `PANEL_PRICES` fiyatları. Kiralık rehberi ve kiralık sayfası kapsam dışı (kiralık fiyat kararı bekliyor); ana sayfa, H1 ve başlıklar değişmedi.
  - Rehber TechArticle JSON-LD: `datePublished` (git geçmişinden ilk commit tarihi, `scripts/generate-guide-dates.mjs` ile üretilen `src/content/guide-dates.ts`), `dateModified` (görünen "Son güncelleme" tarihi; bloğu olmayan sayfada rehber içeriğinin son commit tarihi), `author` Organization (ARLEDSCREEN, `/#organization`). Person eklenmedi: Aras Bozkurt yalnız kurucu olarak doğrulanmış, rehberlerin yazarı olarak değil.
- **Dokunulmayanlar:** ana sayfa, tasarım/CSS, kiralık sayfa, `public/.well-known/ard.json`, fiyatlar, Melis dosyaları.
- **Not:** `npm run build` yan etki olarak `public/.well-known/ard.json` dosyasını yeniden yazıyor; bu PR'a dahil edilmedi (başka ajanın alanı).
- **Production (16 Ekim 2026 gece, Aras onayı "Olur"):** canlıya GitHub Actions "Deploy Cloudflare Pages" iş akışıyla `deploy/geo3-1015` dalından çıkıldı (run 38797048150, commit `aa46e9b7` = `deploy/kiralama-1015` [canlı video hero + #114 Kapsam tablosu] + bu PR). O gün `main`'in ana sayfası #106 QuietHero olduğu için `main`'den yayın yapılmıyordu; **16 Ekim'de #117 ile video hero main'e girdi, yayınlar artık `main`'den yapılır** (bkz. yukarıdaki "Yayın artık main'den" notu). Doğrulama: /tr/ ve /en/ ile kiralama sayfaları yayın öncesiyle DOM olarak aynı, #114 Kapsam tablosu yerinde, sitemap 272 adres / 618 hreflang bağlantısı, robots.txt ve /api/geo 200.
- **Geri alma:** önceki canlı sürüm `deploy/kiralama-1015` (`0cf6cdee`, run 38794259568); `gh workflow run deploy-cloudflare-pages.yml --ref deploy/kiralama-1015` ile yeniden yayınlanır.
- **Geri alma:** PR'ın squash commit'i `git revert` ile geri alınır; sitemap değişikliği tek başına geri alınacaksa `src/app/sitemap.ts` ve `package.json` içindeki doğrulayıcı satırı geri alınır.

### 15 Ekim 2026 (gece) — PR #113, #100 ve #105 yayınlandı

- **Birleştirilenler (squash, main):** #113 `8453a0a2` (AR/RU üst "teklif" bağlantısı, AR alt bilgi, /en/search/ hreflang, "ucuz" ifadesi), #100 `d2da71eb` (işletme bilgisi tutarlılığı, "üretici" ifadesi), #105 `e2de17a9` (EN başlık uzunlukları, /en/sartlar/, EN Offer açıklamaları). Her biri birleştirmeden önce güncel main ile birleştirilip yerelde `npm run build` (exit 0) ve CI (`build-validate`) ile doğrulandı. #102, #104 ve #107 birleştirilmedi.
- **Yayın:** GitHub Actions "Deploy Cloudflare Pages", `deploy/video-hero-1015` dalı (= `deploy/pr111-video-hero` + main `e2de17a9`), run 38793855808. Ana sayfa değişmedi: TR ve EN ana sayfanın görünür HTML'i yayın öncesi ve sonrası aynı (yalnız chunk karmaları farklı).
- **O anda canlı olan (16 Ekim 00:04'te değişti, güncel durum için üstteki notlara bakın):** run 38794259568, `deploy/kiralama-1015` (= `deploy/video-hero-1015` + #114 kiralama kapsam tablosu). #113, #100, #105 ve #114 bu sürümde. Canlıda doğrulandı (kiralık sayfalarında kapsam tablosu var, ana sayfa video hero).
- **Not:** Aynı anda main'den başlatılan bir yayın (run 38793697619) QuietHero ana sayfasını canlıya alacağı için deploy adımında iptal edildi; canlıya bir şey çıkmadı.
- **Geri alma noktası:** #114 hariç önceki sürüm = run 38793855808 (`deploy/video-hero-1015`). Bu üçlüden önceki canlı sürüm = run 38788599943 (`deploy/pr111-video-hero`, `ce61c3ff`). Geri dönmek için iş akışını ilgili dalla çalıştırın.
- **O günkü durum (artık geçerli değil):** main'den yayın yapılırsa ana sayfa QuietHero olurdu. #117 (`3edc1054`) video hero'yu main'e aldı; yayın artık main'den yapılır, `deploy/kiralama-1015` yayın dalı olarak kullanılmaz, yalnız geri alma noktası olarak kalır.

### 15 Ekim 2026 — Hata taraması (PR: fix/hata-taramasi-1015)

**Yapan:** Grok Bot (Aras Bozkurt adına). Yayın yapılmadı; yalnızca PR + önizleme.
**Önizleme (production değil):** https://hata-1015-preview.arledscreen.pages.dev

**Ne taradım:** canlı site (sitemap'teki 272 adres, hepsi 200), main'den üretilen 462 HTML sayfa (kırık iç bağlantı, eksik/yinelenen title ve H1, canonical, hreflang, görsel, JSON-LD, e-posta ve telefon, yasak kelimeler, görünür iç not), 7 indekslenebilir Arapça sayfa (#110), tarayıcı konsolu (CSP dâhil), harici bağlantılar.

**Düzeltilenler (bu PR):**
1. Arapça ve Rusça sayfalarda üst çubuktaki "Teklif" düğmesi var olmayan `/ar/contact/` ve `/ru/contact/` adreslerine gidiyordu (404 + her sayfada konsol hatası, 65 sayfa). Artık `/ar/quote/` ve `/ru/quote/`. TR/EN davranışı aynı. Arapça düğme etiketi Arapça, Rusça etiket sözlükteki "Запросить КП".
2. Arapça sayfalarda alt bilgide telefon ters görünüyordu ("34 88 507 530 90+"). Telefon artık "+90 530 507 88 34" (üst menüdeki çekmece ve /ar/quote/ dâhil). Numara ve diğer bilgiler değişmedi.
3. Arapça sayfaların alt bilgisi İngilizceydi (bülten başlığı ve açıklaması, "Contact", "View on map", "Message on WhatsApp"); Arapçaya çevrildi. Çalışma saatleri aynı (Pzt–Cum 09:00–18:00, Cmt 10:00–15:00), Arapça etiketli ve rakamlar sola doğru okunur.
4. `/en/search/` sayfasında hreflang x-default olmayan `/tr/search/` adresini gösteriyordu (404). Sayfa noindex; hreflang kaldırıldı (TR arama sayfası `/tr/ara/`).
5. "Çelik kasa daha ucuz" ifadesi EN, AR ve RU CNC kasa rehberinde "ucuz" kelimesini kullanıyordu; TR'deki gibi nötr ("daha ekonomik" / "daha az maliyetli") yapıldı.

**Dokunulmadı (bilerek):** ana sayfa (metin, meta, görsel, CSS aynı), fiyatlar, hesaplayıcı (`/fiyat-hesap/` md5 4ce8b79d02126b5fd04af2ed88b36941 aynı), Melis sohbeti, CSS (dosya özetleri aynı), MailerLite formu.

**Aras'ın kararı veya bilgisi gereken açık işler:**
- Bülten formu (MailerLite `CatDAx`) canlıda boş: form kimliği MailerLite'ta 404 dönüyor ve CSP `style-src` MailerLite stilini engelliyor. Yeni gömme kodu ve CSP izni gerekiyor.
- Kiralık fiyat: ana kodda TR/EN sayfalar "fiyat teklifle verilir" (PR #108) diyor; kural 50 USD/m²/gün. Hangisi doğru, Aras karar verecek.
- Açık PR'lar (#100, #102, #104, #105, #107) merge edilmedi; durum PR açıklamasında.

### 15 Ekim 2026 (akşam) — GEO paket 2 yayınlandı + robots.txt 404 nedeni

- **Yayın:** PR #111 squash ile main'e alındı (`172e55ec`). Canlı yayın GitHub Actions "Deploy Cloudflare Pages" iş akışıyla `deploy/pr111-video-hero` dalından yapıldı (run 38788599943, deployment `2377fde2`). Bu dal = canlıdaki video hero (`tr-video-hero-restore`, `e83cea9c`) + main (PR #111). Ana sayfa canlıdakiyle aynı kaldı; main'deki #106 "QuietHero" ana sayfası yayına çıkmadı.
- **robots.txt / `/api/geo` / `/brand` / `/modules` 404 nedeni:** Depodaki iş akışı ve `functions/` klasörü sağlam. 15 Ekim ~20:50'de `tr-video-hero-restore` dalı, GitHub iş akışı dışında yayınlandı (büyük olasılıkla elle `wrangler pages deploy`; kayıt yok) ve `functions/` + `_routes.json` pakete girmedi; Pages Functions düştüğü için bu yollar statik 404 verdi. Yukarıdaki iş akışı yayını Functions'ı geri getirdi; dört yol da 200.
- **Kural:** Yayın yalnız `deploy-cloudflare-pages.yml` ile yapılır. Elle `wrangler pages deploy` kullanılacaksa komut `functions/` klasörünün bulunduğu depo kökünden çalıştırılmalı.
- **Açık karar (16 Ekim'de #117 ile çözüldü, video hero main'de):** main'deki #106 ana sayfası (QuietHero) ile canlıdaki video hero birbirinden farklı. `tr-video-hero-restore` için PR açılıp main'e alınmadıkça main'den yapılacak her yayın ana sayfayı değiştirir. PR #106 başlığı "birleştirmeyin" diyordu ama birleşmiş durumda.
- **Geri alma noktası:** önceki canlı sürüm = `tr-video-hero-restore` `e83cea9c` (Functions'sız elle yayın). Aynı içeriğe dönmek için iş akışını bu dalla çalıştırın.

### 15 Ekim 2026 — GEO paket 2 (PR: `seo/geo-paket2-v2`)

- **Ne yapıldı:**
  - Beş ticari sayfada (LED ekran fiyatları, iç mekân, dış mekân, GOB, kiralık; TR + EN) en üstte "Kısa cevap / Short answer" bloğu ve görünür "Son güncelleme / Last updated" tarihi.
  - Fiyat sayfasına karşılaştırma tablosu (iç mekân, GOB, dış mekân, kiralık); kiralık sayfasına "Kiralık mı, satın alma mı?" tablosu.
  - Yurt dışı rehberine (`/tr/rehber/led-ekran-ihracat/`, `/en/rehber/led-ekran-ihracat/`) kısa cevap ve "bir bakışta" tablosu (yalnız onaylı olgular).
  - Bu sayfaların WebPage JSON-LD'sine `dateModified`; kısa cevap bloğu speakable seçicilerine eklendi.
  - OpenAI ürün beslemesi için `public/feeds/openai-products.jsonl` + `scripts/generate-openai-feed.mjs` (12 panel, `merchant-priced-panels.tsv`'den birebir türetilir; GTIN ve MPN uydurulmadı).
- **Dokunulmayanlar:** ana sayfa, tasarım, CSS, başlık ve H1; Melis dosyaları; fiyatlar; yeni dil açılmadı.
- **Fiyat ve kiralık:** panel fiyatları `PANEL_PRICES` listesinden türer, TR ve EN aynıdır. Kiralık fiyat, #108'den beri yalnız yazılı teklifle verilir; yeni bloklar buna uyar (günlük 50 USD/m² ve "depozito yok" ifadeleri bu PR'da yazılmadı; sahip onayı gerekir).
- **Sonraki adım (kod dışı):** PR #102 birleştikten sonra `node scripts/generate-openai-feed.mjs` çalıştırılıp jsonl yenilenmeli (görsel yolları değişiyor). OpenAI ürün beslemesi şu an yalnız onaylı ortaklara açık; başvuru sahip kararı.
- **Production:** yok. Önizleme dalı: `geo-paket2-preview`. Yayın onayı Ali / Aras.
- **Geri alma:** yayın sonrası sorun olursa PR'ın squash commit'i `git revert` ile geri alınır.
