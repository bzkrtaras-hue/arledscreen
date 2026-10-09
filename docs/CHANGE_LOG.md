# ARLEDSCREEN · CHANGE_LOG

En yeni kayıt üstte. Numara: ARL-YYYYMMDD-XXX.

## ARL-20261009-002 — Deploy smoke: SIGPIPE yanlış hata düzeltmesi

- **Sorun:** `deploy-cloudflare-pages.yml` smoke adımında `echo "$sm" | grep -q …` + `set -o pipefail` → grep erken çıkınca echo SIGPIPE alıyor, sağlıklı yayında “FAIL” görünüyordu
- **Çözüm:** tüm `echo "$x" | grep -q` kalıpları here-string (`grep -q '…' <<<"$x"`); JSON ilk bayt kontrolü `test "$(head -c 1 …)" = "{"`
- **Kapsam:** yalnızca CI/workflow; site, arayüz, içerik değişmedi. Deploy ve IndexNow çalıştırılmadı

## ARL-20261009-001 — PR #62 tamamlama: Melis doğru dosya + owner-gate kaldırma (gizlilik)

- **Durum:** PR #62 dalında; merge + tek production deploy sahibinin onayını bekliyor
- **P0:** `/fiyat-hesap/` Melis `index.html` doğru sürüm (md5 `14972407dea358a02667f080aab27d33`) kopyalandı; inline script’ler `node --check` OK; `chat-widget.js` paketle aynı
- **Gizlilik:** owner-next.\*, owner-p0.json, geo-next.\*, geo-status.json, point-c\*.{txt,json,csv}, point-c-progress.json, tur1a.\*, feeds/point-c.csv vb. artık build edilmiyor (canlıda 404 hedefi); `public/` kopyaları repodan silindi, `.gitignore`’a eklendi; `out/` içinde kişisel gmail adresi yok
- **Keşif dosyaları:** llms.txt, llms-full.txt, ai.txt, humans.txt, .well-known/security.txt, sitemap, robots, `_headers` Link, agents/ard/entity JSON — owner referansı 0; owner-gate HowTo `potentialAction` JSON-LD kaldırıldı; IndexNow owner URL göndermiyor (göndermeye kalkarsa script durur)
- **Kaynak düzeltmesi:** `src/lib/ai-discovery.ts`, `entity.ts`, `prices.ts`, `robots.ts`, `functions/robots.txt.js`, `postbuild-ai.mjs`; kalan zenginleştirme çıktıları `scripts/strip-owner-gate.mjs` ile temizlenir
- **Koruma:** `scripts/validate-no-owner-gate.mjs` (postbuild + CI) owner dosyası/URL’si veya gmail adresi geri gelirse build’i düşürür; MailerLite CSP girdileri de kontrol edilir
- **CI:** `geo-prod-ci.yml` sitemap’te `point-c.txt` zorunluluğu kaldırıldı; owner smoke adımı “Discovery artefact smoke” oldu; `local-invent-smoke` owner-only kontrolleri SKIP
- **Metin:** `/tr/products/` “fiyat listesi” linki → `/tr/led-ekran-fiyatlari/`; slogan “NXTIONSTAR — görsel gücün küresel standardı.” geri getirildi (i18n + Organization/Brand JSON-LD; #60’ta değişmişti)
- **Arayüz:** değişmedi (header/nav/CSS canlıyla aynı; yalnızca font hash farkı). MailerLite formu (CatDAx) ve CSP dokunulmadı; MX/e-posta ayarlarına dokunulmadı
- **Production:** henüz yok — tek deploy `deploy-cloudflare-pages.yml` (workflow_dispatch) ile, onay sonrası

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
