# ARLEDSCREEN devir belgesi (depo kopyası)

Ana devir belgesi Google Docs'ta tutulur (Ali'nin el koyma notu, "Buradan devam et" tablosu). Bu dosya, depoya giden işlerin tarihli notlarını yanında taşır. Her iş sonunda bir not eklenir.

## Devir notları

### 16 Ekim 2026 — Mobil menü okunabilirliği (dal `feat/menu-liquid-glass`)

- **İstek (Aras):** mobil hamburger menüsündeki seçenek yazıları daha belirgin olsun, düğmeler sitedeki `liquid-glass-btn` diliyle uyumlu olsun.
- **Kök neden:** çekmecedeki düğmeler zaten `liquid-glass-btn` kullanıyordu, ama düğmenin parlama katmanı (`::before`, z-index 0) etiketin ÖNÜNDE kalıyordu. Etiket çıplak metin düğümü olduğu için (`.liquid-glass-btn > *` kuralı metin düğümüne uygulanmaz) metnin sol yarısı beyazla yıkanıp soluk gri görünüyordu. Alt menü yazısı ayrıca küçük (15 px) ve gri (`#3d4650`) idi.
- **Değişiklik (yalnız `src/app/globals.css` + `Header.tsx` alt menü bağlantısı):** çekmece içinde parlama katmanı etiketin arkasına alındı (`#mobile-nav .liquid-glass-btn::before { z-index: -1 }`); ana seçenekler 17 px / 700 / `#0b1b33`, alt seçenekler 16 px / 600 / `#0b1b33`, alt seçenek yüksekliği 46 px (ana 48 px); cam zemin biraz daha opak ve kenar çizgisi belirgin; hover/etkin durumda `#164a96`. Geçerli sayfadaki alt seçenek `aria-current="page"` + `is-active` alır. Çekmecedeki mavi "Fiyat hesapla" / "Teklif alın" düğmelerinin zemini beyaz yazı AA (>= 4.5:1) olacak kadar koyulaştırıldı.
- **Dokunulmayanlar:** bağlantılar, sıra, çeviriler, masaüstü üst menü (`.liquid-glass-btn--nav` ve `--shell` kuralları değişmedi), ana sayfa/hero/H1, `/tr/quote/` bağlantısı.
- **Önizleme (production değil):** `menu-glass-preview` dalı, Cloudflare Pages önizleme adresi. Birleştirilmedi, yayınlanmadı.

### 16 Ekim 2026 — Mağaza sayfası (`/tr/magaza/`, `/en/magaza/`) (PR #122, dal `magaza-section`)

- **Ne yapıldı:** Aras'ın talimatıyla Shopify mağazasındaki (`k3kkws-wg.myshopify.com`) 19 ürün sitede görünür oldu: 12 NXTIONSTAR LED modülü + 7 referans ekran sistemi (2/4/6/8 m² iç mekân P2.5; 12/24/50 m² dış mekân P4). Sayfa TR + EN; Hizmetler sayfasında "Mağaza" kartı ve bölümü, alt menüde (TR "Mağaza", EN "Shop") ve TR mobil çekmecede bağlantı var. TR masaüstü üst çubuğuna eklenmedi: 1360 px'te sığmıyor ("LED ekran" ve "Hakkımızda" taşıyor). EN üst menüde "Shop" var. Ana sayfa, hero ve H1 değişmedi.
- **Veri kaynağı:** Modül adı, USD fiyat, görsel ve ürün bağlantısı `PANEL_PRICES` / `LED_MODELS`'ten gelir (`src/content/magaza.ts`), yani `ai-shopping.json`, `catalog.json` ve `/products.json` ile aynı sayılar (12 fiyat birebir doğrulandı). Shopify TL fiyatları sitede gösterilmez.
- **Referans sistemler:** Sitede yayımlanmış USD fiyatı yok → "Keşif sonrası yazılı teklifle". Fiyat uydurulmadı; Shopify'daki TL "referans sistem bedeli" ancak Aras karar verirse gösterilir. Bu 7 ürünün fotoğrafı yok; sade bir kart kullanıldı.
- **Görseller:** Gerçek modül fotoğrafı olan 10 SKU'da sitedeki aynı dosya. P3.07 iç mekân (`indoor-smd-surface.jpg`: "P2.5" yazan salon görseli) ve P4 iç mekân (`indoor-wall.jpg`: kameraman stok fotoğrafı) ürün fotoğrafı olmadığı için sade kart kullanıldı. Aynı dosyalar ürün sayfalarında ve Shopify'da duruyor; düzeltme #102'de (ayrı iş).
- **Yapılandırılmış veri:** Sayfada yeni Product/Offer JSON-LD üretilmedi (aynı SKU'lar model sayfalarında ve `ai-shopping.json`'da zaten tanımlı; çift düğüm çakışması olmasın diye). BreadcrumbList + ItemList var (modül adresleri mevcut model sayfaları; EN'de EN ürün grubu sayfası). Ürün başına ayrı `/magaza/<slug>/` sayfası açılmadı: 12 modülün model sayfası zaten var, 7 sistemin yayımlanmış fiyatı olmadığı için Product şeması yazılamaz. Stok bilgisi mevcut besleme kararıyla aynı kalır (InStock + 3–21 gün hazırlık); yeni bir karar verilmedi.
- **Eski köprüler:** `/tr/magaza/` ve `/en/magaza/` daha önce `/products/` adresine giden noindex "invent" köprüleriydi. Gerçek sayfa olduğu için `tr/en-invent-bridges.ts` içinden çıkarıldı, `validate-ai-feeds.mjs`'teki `en/magaza → /en/products/` köprü denetimi kaldırıldı. Sitemap'e (`sitemap.xml`) tr + en ve hreflang eklendi (274 adres, 624 hreflang bağlantısı, validatör geçti). `sitemap-ai.xml`'de bu iki adres hâlâ listede (zararsız yinelenme).
- **Dokunulmayanlar:** `public/.well-known/ard.json` (build yan etkisi, commit'e alınmadı), fiyatlar, Melis, hesaplayıcı, Shopify (yalnız okundu).
- **Çakışma notu:** #119 (iade), #120 ve #121 `main`'e birleşti; bu dal `main` (`2eea9547`) ile birleştirilerek çakışmalar (handover, Footer, sitemap, validate-ai-feeds) iki tarafın içeriği korunarak çözüldü. #102 `models.ts`/`prices.ts` değiştiriyor; Mağaza bu verileri okuduğu için görsel düzeltmesi otomatik yansır (ve `NEUTRAL_IMAGE_IDS` listesi güncellenebilir).
- **Önizleme (production değil):** https://magaza-preview.arledscreen.pages.dev

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
