# ARLEDSCREEN devir belgesi (depo kopyası)

Ana devir belgesi Google Docs'ta tutulur (Ali'nin el koyma notu, "Buradan devam et" tablosu). Bu dosya, depoya giden işlerin tarihli notlarını yanında taşır. Her iş sonunda bir not eklenir.

## Devir notları

### 16 Ekim 2026 — Güncel durum: #117, #118, yayın düzeni, Shopify, Melis #107, iade sayfası

- **#117 video hero (main `3edc1054`):** TR ana sayfadaki tam ekran video hero (`Hero`) main'e alındı; `QuietHero` + `SelectedProjects` kaldırıldı, CTA "Teklif alın". Dosya içerikleri `deploy/kiralama-1015` ile birebir aynı; ana sayfa değişmedi. Böylece main'den yayın yapmak ana sayfayı geri almıyor (#106 QuietHero sorunu kapandı).
- **#118 hesaplayıcı kontrol kartı kademesi (main `1dc2dc2b`, canlı):** kart adedi = `max(1, ceil(m² / 10))`, kontrol kartı bedeli = adet × 500 USD (10 m² dahil 1 kart; 11–20 m² 2 kart; 25 m² 3 kart; 40 m² 4 kart). Sürücü + yazılım 500 USD sabit. Kademe sabitleri `public/fiyat-hesap/index.html` ve `src/content/prices.ts` içinde; fiyat örnekleri, `llms.txt`, `llms-full.txt` ve `led-ekran-fiyatlari.md` yeniden hesaplandı. Aras'ın kararı (15 Ekim). Yayın: "Deploy Cloudflare Pages", run 38807065801, `main` @ `1dc2dc2b`, başarılı.
- **Yayın artık main'den:** canlı sürüm `main` `1dc2dc2b`. Bundan sonraki yayınlar `deploy-cloudflare-pages.yml` ile `main` üzerinden yapılır; aynı anda ikinci yayın başlatılmaz (iş akışında `cancel-in-progress` var). `deploy/geo3-1015` ve `deploy/kiralama-1015` (ayrıca `deploy/video-hero-1015`, `deploy/pr111-video-hero`) **silinmeyecek, geri alma noktası** olarak kalır; geri dönmek için iş akışı ilgili dalla çalıştırılır. Eski notlardaki "main'den yayın yapılmaz" cümlesi artık geçerli değil.
- **Shopify:** 19 ürün 15 Ekim 2026'da olduğu gibi (değişiklik yapılmadan) ACTIVE yapıldı. Mağaza: `k3kkws-wg.myshopify.com`. Ürün sayfaları arledscreen.com üzerinde yok; Shopify ürünlerinin siteye nasıl bağlanacağı **açık karar** (Aras / Ali).
- **Melis #107 (PR açık, yalnız önizleme):** canlıda değil, birleştirilmedi. Üretimde `GEMINI_API_KEY` ve `AI_GATEWAY_BASE` tanımlı değil; önizleme ortamında anahtar tanımlı. Melis kendini "ARLEDSCREEN satış danışmanıyım" diye tanıtır; metinlerde "dijital temsilci" ve "dijital asistan" geçmez (AGENTS.md yasağı, Aras'ın kararı). #107 PR gövdesindeki eski "yapay zekâ asistanı" ifadeleri düzeltme sürecinde; canlıya almadan önce önizlemede test ve Aras onayı gerekir.
- **İade sayfası:** hazırlanıyor (ayrı dalda); **canlı değil**, bu notta canlıymış gibi sayılmamalı. Bitince kendi notu eklenecek.
- **Dokunulmadı:** bu not yalnız `docs/handover.md` değiştirir; AGENTS.md ve başka dosyalar değişmedi, yayın yapılmadı.

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
