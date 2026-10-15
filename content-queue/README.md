# content-queue — günlük otomatik yayın sırası

- **Kök klasör (`content-queue/*.md`)**: ONAYLI, yayına hazır içerikler. Her gün 09:00 (İstanbul) `daily-content-queue.yml` en eski dosyayı (dosya adına göre sıralı) yayınlar.
- Dosya adı: `YYYY-MM-DD-NN-<slug>.md` (ör. `2026-10-19-01-led-ekran-enerji-tuketimi.md`).
- Biçim: `src/content/articles/*.md` ile aynı (front matter: `slug: /tr/rehber/<slug>/`, `title`, `meta_description` ≤170, `h1`, `target_queries`, `schema`, `last_reviewed`; gövdede `## N. Sık sorulan sorular` → FAQPage).
- Yayınlanınca: makale `src/content/articles/`e, slug `ARTICLE_SLUGS`a, sayfa `/tr/rehber/<slug>/`, sitemap ve iç link listesine eklenir; dosya `published-log/`a taşınır; Cloudflare Pages'e mevcut yolla deploy, IndexNow ping.
- Reddedilenler (iş durur, deploy olmaz): `⚠️` içeren, `status: draft` olan, arled@arledscreen.com dışında e-posta içeren, eksik alanlı dosyalar.
- **`drafts/`**: Kuyruk boşken Gemini'nin ürettiği tek taslak, PR olarak gelir. ASLA otomatik yayınlanmaz. Onay: ⚠️'leri doğrula/çıkar, `status: draft` satırını sil, köke taşı.
- Elle test: Actions → Daily content queue → Run workflow (`dry_run=true` varsayılan).
