# ARLEDSCREEN devir belgesi (depo kopyası)

Ana devir belgesi Google Docs'ta tutulur (Ali'nin el koyma notu, "Buradan devam et" tablosu). Bu dosya, depoya giden işlerin tarihli notlarını yanında taşır. Her iş sonunda bir not eklenir.

## Devir notları

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
