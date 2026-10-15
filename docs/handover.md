# ARLEDSCREEN devir belgesi (depo kopyası)

Ana devir belgesi Google Docs'ta tutulur (Ali'nin el koyma notu, "Buradan devam et" tablosu). Bu dosya, depoya giden işlerin tarihli notlarını yanında taşır. Her iş sonunda bir not eklenir.

## Devir notları

### 15 Ekim 2026 (gece) — GEO paket 3 (PR: `seo/geo-paket3`)

- **Ne yapıldı:**
  - `sitemap.xml` artık hreflang (`xhtml:link`) içeriyor: 272 adresin 199'unda tr/en (+ ar yalnız onaylı 7 sayfada: hakkımızda ve 6 rehber) ve x-default (= /tr/ karşılığı). Yalnız sitemap'te listeli, indekslenebilir, kendi canonical'ı olan ikizler eklenir; tek dilli sayfalara alternatif eklenmez. Yeni doğrulayıcı `scripts/validate-sitemap-hreflang.mjs` build'e (`postbuild`) bağlandı: alternatifler `out/` içinde var mı, noindex mi, self-canonical mı, karşılıklı mı, sayfanın kendi hreflang'ı ile çelişiyor mu.
  - P2.5 iç mekân ürün sayfasının (`/tr/products/ic-mekan-led-ekran/p2-5/`) gerçek bir EN ikizi yok (EN adresi noindex, canonical grup sayfası); bu yüzden alternatif eklenmedi. `/ar/` ana sayfası noindex ve sitemap'te yok; sitemap'e girmedi (indekslenme kararı sahibinde).
  - "Kısa cevap" + "Son güncelleme" bloğu (GEO paket 2'deki `ShortAnswer`, tasarım aynı): `/tr|en/led-ekran-satisi/`, `/tr|en/about/`, 24 rehber (TR + EN; ihracat rehberi paket 2'den), 3 kurulum rehberi (TR + EN), EN karşılıkları olan 3 ticari rehber (piksel aralığı, GOB-SMD, LED tabela). TR markdown rehberlerinde zaten "Kısa cevap" ve tarih vardı. Metinler `src/content/guide-short-answers.ts` içinde; yalnız sayfada yayımlanmış olgular ve `PANEL_PRICES` fiyatları. Kiralık rehberi ve kiralık sayfası kapsam dışı (kiralık fiyat kararı bekliyor); ana sayfa, H1 ve başlıklar değişmedi.
  - Rehber TechArticle JSON-LD: `datePublished` (git geçmişinden ilk commit tarihi, `scripts/generate-guide-dates.mjs` ile üretilen `src/content/guide-dates.ts`), `dateModified` (görünen "Son güncelleme" tarihi; bloğu olmayan sayfada rehber içeriğinin son commit tarihi), `author` Organization (ARLEDSCREEN, `/#organization`). Person eklenmedi: Aras Bozkurt yalnız kurucu olarak doğrulanmış, rehberlerin yazarı olarak değil.
- **Dokunulmayanlar:** ana sayfa, tasarım/CSS, kiralık sayfa, `public/.well-known/ard.json`, fiyatlar, Melis dosyaları.
- **Not:** `npm run build` yan etki olarak `public/.well-known/ard.json` dosyasını yeniden yazıyor; bu PR'a dahil edilmedi (başka ajanın alanı).
- **Production:** yok. Önizleme dalı: `geo-paket3-preview`. Yayın onayı Ali / Aras.
- **Geri alma:** PR'ın squash commit'i `git revert` ile geri alınır; sitemap değişikliği tek başına geri alınacaksa `src/app/sitemap.ts` ve `package.json` içindeki doğrulayıcı satırı geri alınır.

### 15 Ekim 2026 (akşam) — GEO paket 2 yayınlandı + robots.txt 404 nedeni

- **Yayın:** PR #111 squash ile main'e alındı (`172e55ec`). Canlı yayın GitHub Actions "Deploy Cloudflare Pages" iş akışıyla `deploy/pr111-video-hero` dalından yapıldı (run 38788599943, deployment `2377fde2`). Bu dal = canlıdaki video hero (`tr-video-hero-restore`, `e83cea9c`) + main (PR #111). Ana sayfa canlıdakiyle aynı kaldı; main'deki #106 "QuietHero" ana sayfası yayına çıkmadı.
- **robots.txt / `/api/geo` / `/brand` / `/modules` 404 nedeni:** Depodaki iş akışı ve `functions/` klasörü sağlam. 15 Ekim ~20:50'de `tr-video-hero-restore` dalı, GitHub iş akışı dışında yayınlandı (büyük olasılıkla elle `wrangler pages deploy`; kayıt yok) ve `functions/` + `_routes.json` pakete girmedi; Pages Functions düştüğü için bu yollar statik 404 verdi. Yukarıdaki iş akışı yayını Functions'ı geri getirdi; dört yol da 200.
- **Kural:** Yayın yalnız `deploy-cloudflare-pages.yml` ile yapılır. Elle `wrangler pages deploy` kullanılacaksa komut `functions/` klasörünün bulunduğu depo kökünden çalıştırılmalı.
- **Açık karar (Aras / Ali):** main'deki #106 ana sayfası (QuietHero) ile canlıdaki video hero birbirinden farklı. `tr-video-hero-restore` için PR açılıp main'e alınmadıkça main'den yapılacak her yayın ana sayfayı değiştirir. PR #106 başlığı "birleştirmeyin" diyordu ama birleşmiş durumda.
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
