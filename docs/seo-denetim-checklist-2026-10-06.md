# SEO denetim checklist — 2026-10-06

Kaynak: canlı `https://arledscreen.com` + Lighthouse (Chrome headless).  
Search Console hesabı bu ortamda yok → GSC satırı **sahip doğrulaması**.

| Kontrol | Öncelik | Durum | Kanıt / yapılacak |
|---|---|---|---|
| Google indeksleme | Kritik | **Sahip** | Canlı sayfalar `index, follow`; `robots.txt` Allow; sitemap 164 URL. GSC’de Coverage / URL Inspection ile ana, ürün, rehber URL’lerini kontrol edin. |
| Canonical + yönlendirmeler | Yüksek | **Geçti** | `http→https`, `www→apex`, `/→/tr/` zinciri 200 `https://arledscreen.com/tr/`. Canonical örnek: `https://arledscreen.com/tr/`. |
| Sitemap + robots.txt | Yüksek | **Geçti** | `Host: arledscreen.com`, `Sitemap: …/sitemap.xml`, Disallow yok. Hub URL’ler sitemap’te (tr home, products, rehber, fiyat, quote, about, projeler). |
| Mobil performans | Yüksek | **Ölçüldü** | Lighthouse mobil home: Perf **89**, SEO **100**, A11y **97**. LCP ~3.5s. Model sayfası Perf **91**. PSI API kota (429). |
| Yapılandırılmış veri | Yüksek | **Geçti** | Organization (global); BreadcrumbList (ürün/rehber/proje/teklif); Product+Offer (ürün/model). postbuild `audit-schema-gsc` GREEN. |
| Görsel SEO | Orta | **İyileştirildi** | Alt metinler dolu. Video poster JPG→WebP (~%30–40 küçültme). Kalan: 960px webp’lerin mobilde srcset ile küçültülmesi (Lighthouse ~685 KiB fırsat). |
| İç bağlantılar | Yüksek | **Geçti** | Rehber→ürün+teklif; ürün→projeler+teklif; projeler/case→teklif+ürün. |

## Sahip aksiyonu (GSC)
1. Search Console → URL Inspection: `/tr/`, `/tr/products/…`, `/tr/rehber/…`
2. Sitemaps → `https://arledscreen.com/sitemap.xml` gönderilmiş mi kontrol
3. Page indexing raporunda “Excluded” / soft-404 yok mu bakın

## Artefactlar
- `/opt/cursor/artifacts/seo-audit/lighthouse-home-mobile.report.html`
- `/opt/cursor/artifacts/seo-audit/lighthouse-home-mobile.report.json`
- `/opt/cursor/artifacts/seo-audit/lighthouse-model-mobile`
