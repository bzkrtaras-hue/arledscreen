# ARLEDSCREEN · CHANGE_LOG

En yeni kayıt üstte. Numara: ARL-YYYYMMDD-XXX.

## ARL-20261008-001 — Melis P0 + SEO paket (önizleme)

- **Durum:** PREVIEW (production’a alınmadı; günün GEO yayınları ayrı PR’da)
- **Kaynak:** Drive `ARLEDSCREEN_CURSOR_PROMPT` + `ARLEDSCREEN_CURSOR_PAKET.zip` (v5)
- **P0:** `/fiyat-hesap/` çift backtick JS hatası — Melis `index.html` (md5 `19ebe84c…`) kopyalandı; inline script `node --check` OK
- **1:** `public/chat-widget.js` Melis (md5 `e270891f…`) kopyalandı
- **2:** `sitemap.ts` — owner-next / geo-next / point-c / tur1a / geo-status / owner-p0 çıkarıldı (noindex iç araçlar)
- **3:** `#website` artık `rel=describedby` (sayfa canonical’ı tek); `_headers` aynı; görünen metinden `ai-shopping.json` / `geo-baseline` / `quote-only` / invent alias temizlendi (SSS, fiyat, ürünler, yapay-zeka, PDP); `çiip` → `çip`
- **4:** Panel tablosu SSR (`PanelPriceTable`); `/fiyat-listesi` → `/tr/led-ekran-fiyatlari/`; ürünler hub’dan fiyat sayfalarına iç link
- **5:** `/tr/led-ekran-fiyatlari/` title/meta/H1/SSS — “LED ekran fiyatları”, “Türkiye’de LED ekran firmaları”, “LED ekran satın alırken hangi firmalar”
- **6:** `/tr/nxtionstar/` title `NXTIONSTAR LED Ekran | ARLEDSCREEN`; NationStar çip uyarısı lead’de; Brand `sameAs` (arledscreen + IG/FB)
- **Arayüz:** değişmedi (yalnızca metin/SEO/veri + Melis dosya kopyası)
- **Production:** bu kayıtta yok — önce önizleme PR; canlıya alma günde ≤1 (Arledscreen onayı)
