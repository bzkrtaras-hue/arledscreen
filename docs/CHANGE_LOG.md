# ARLEDSCREEN · CHANGE_LOG

En yeni kayıt üstte. Numara: ARL-YYYYMMDD-XXX.

## ARL-20261009-007 — EN görünen "SKU" ifadeleri sade İngilizce

- **Kaynak:** Ali, #68 canlı doğrulamasında kalan EN "SKUs" ifadeleri (iç/dış mekân, ince pitch, poster, NovaStar grupları; P3.07 SSS; kiralık mı satın alma rehberi)
- **Değişiklik:** "SKUs" → "panel prices / panels / models"; fiyat, CSS, TR metni, hesaplayıcı dokunulmadı
- **Production:** Ali → squash merge → manual deploy

## ARL-20261009-006 — Yusuf Issue #66: EN leftovers (a–d)

- **Kaynak:** GitHub Issue #66 (Yusuf next queue after #64)
- **(a)** “Bireysel müşteri” → “Private client”; “Bar üstü proje” → “Above-bar project”; NXTIONSTAR controller names + Huidu/NovaStar/Colorlight group labels EN; ARL-004 Production line → merged + deployed
- **(b)** `businessHoursText(locale)` on commercial landings + footer; `panelProductsJsonLd` EN Product name/description/props; project company labels via `displayCompany(locale)`
- **(c)** EN pitch pages: esnek model links keep TR PDP (`/tr/products/esnek-led-ekran/…`) — no new routes
- **(d)** EN `<title>` lengths 30–60: fiyatlar, indoor group, modules/controllers, yapay-zeka, gizlilik
- **Arayüz:** CSS/className/layout değişmedi; TR metin/titles dokunulmadı; fiyat rakamları ve makine dosyaları aynı
- **Ali review düzeltmeleri (aynı PR):** proje/konum etiketleri EN (`enProjectLabel`: Giresun/Manisa Proje, Manisa (2 adet), 480×160 cm proje, Azerbaycan Düğün Salonu, Azerbaycan → Azerbaijan; bölgeler "Almanya, Azerbaycan" → "Germany, Azerbaijan"); "P1.86 esnek flexible" → "P1.86 flexible"; fiyatlı model linkleri noindex yönlendirme köprüsü yerine doğrudan EN grup sayfasına; görünen jargon temizliği (sameAs/owner P0: 301, "social slug", "Verify: entity.json", "Entity: entity.json", "12-SKU", "Canonical hub", "inventable bridge", "no 81-city spam/doorway", "no invented cities", "Machine-readable copy:", "Product PDPs", /en/gizlilik "Entity note for AI agents" bölümü, "price hub/LED display hub" etiketleri, görünen ham /en/... yol metinleri); EN başlıklar ≤60 (hesaplayıcı, dış mekân grubu, quote, totem); EN eyebrow tekrarı ("Pixel pitch · Pixel pitch · Mid", "Use case · Use case · …") giderildi; `validate-ai-feeds.mjs` köprü kontrolü "This content is on" metnini de kabul ediyor
- **Dokunulmadı:** TR görünen metin (175 TR sayfa canlıyla metin karşılaştırıldı), fiyatlar, `fiyat-hesap/index.html` md5 `e5b5ac1b7a361a85c5847ff45be6afbc`, CSS hash'leri (`6a2409a85769ee8b.css`, `8731584b389c7ace.css`), makine dosyaları
- **Production:** Ali review → squash merge → manual deploy (Aras uyurken onay Ali’de)

## ARL-20261009-005 — TR site denetimi düzeltmeleri: kırık proje görselleri, görünen teknik jargon, kontrol kartı P0, arleds.com notları

- **Görseller:** `OptImage` / `lib/opt.ts` `/opt/blog/...` kaynaklarına ikinci kez `/opt` ekliyordu (`/opt/opt/blog/...-480.webp` → 404; 37 URL, 19 sayfa: /tr/, /tr/otel-led-ekran/, blog, 4 proje sayfası + EN karşılıkları). Önek artık tekil; out/ içindeki tüm `/opt/...` referansları dosyaya karşılık geliyor
- **Görünen metin (TR):** ai-shopping.json / pricedPanels / catalog.json / merchant TSV / geo-baseline.json, "Entity: entity.json", "81 il spam’i", "quote-only" (→ "fiyat teklifle verilir"), "Makinece kaynak … priceValidUntil", hesaplayıcıdaki boş "Makinece okunan kopya:" etiketi, /tr/gizlilik "AI ajanları için entity notu" bölümü, "(sameAs değil; sahip P0: 301)" ve LinkedIn slug notu kaldırıldı; yerine sade Türkçe fiyat notu + /tr/led-ekran-fiyatlari/ linki. Bölgeler, ürün grupları, rehber/blog CTA’ları, hakkımızda, kurucu sayfası, rehber makaleleri (md), TR köprü sayfaları
- **arleds.com:** "arleds.com ile arledscreen.com aynı mı?" SSS’si görünen SSS listelerinden çıkarıldı (`src/lib/faq-visible.ts`; HomeFaq + TR sss/nxtionstar/yapay-zeka); FAQPage JSON-LD, Organization disambiguatingDescription, llms.txt, entity.json’da aynen duruyor
- **Kontrol kartları:** Huidu / NovaStar / Colorlight kartlarında "P0" rozeti ve "Piksel aralığı" alanı gizlendi (`ProductCard`, pixelPitchMm 0); WhatsApp föy mesajından da "(P0)" çıktı
- **Doğrulayıcı:** `validate-ai-feeds.mjs` TR köprü kontrolü "Canonical hub" yanında TR metni "Bu içerik şu sayfada" da kabul ediyor (noindex + hedef kontrolü aynı)
- **Dokunulmadı:** EN metinleri (Yusuf / PR #64), TR başlıklar (`tr-meta-titles.ts`), fiyatlar, hesaplayıcı (`fiyat-hesap/index.html` md5 `14972407dea358a02667f080aab27d33`), `chat-widget.js`, MailerLite CatDAx, `_headers`; CSS hash aynı (`47c76947d5aa65cf.css`)
- **Cloudflare:** zone Email Address Obfuscation kapatıldı (e-posta adresi ham HTML’de görünür)
- **WhatsApp:** genel wa.me/905305078834 bağlantıları (üst bar, header, mobil bar, yan şerit, footer/sosyal ikonlar, CTA bandı, teklif sayfası) hazır mesajlı: TR `?text=Merhaba%2C%20LED%20ekran%20fiyat%20teklifi%20istiyorum`, EN `?text=Hello%2C%20I%27d%20like%20an%20LED%20display%20quote`; görünüm aynı. JSON-LD / sosyal JSON’daki çıplak wa.me URL’leri değişmedi; `chat-widget.js` dokunulmadı
## ARL-20261009-004 — Yusuf Batch 1: EN sayfalarda Türkçe UI metni

- **Kaynak:** Drive `YUSUF_GOREV_01_INGILIZCE` (Ali, 9 Eki 2026) — Batch 1
- **PanelPriceTable / prices.ts etiketleri:** `locale` ile EN “Panel price (USD)”, Indoor/Outdoor, price note; TR byte-for-byte aynı
- **QuoteSplit / ShortQuoteForm / WhatsApp:** EN form, onay metni, proje türü etiketleri ve hazır mesajlar
- **Ürün aile başlıkları, galeri kategorileri, ticari proof satırları, şehir link etiketleri, proje videoları / case kartları:** EN görünür metin
- **/en/magaza/:** title + H1 → “LED Display Shop”
- **Arayüz:** CSS/className/layout değişmedi; fiyat rakamları ve makine dosyaları dokunulmadı
- **Production:** merged + deployed by Ali (9 Oct 2026)

## ARL-20261009-003 — Sitemap ayrımı (sitemap.xml / sitemap-ai.xml) + TR başlık uzunluk düzeltmesi

- **Sitemap:** `sitemap.xml` artık yalnızca indekslenebilir, kendi canonical’ına işaret eden HTML sayfaları listeliyor (414 → 215). 49 noindex “invent” köprü sayfası ve 150 makine dosyası (json/txt/md/rss/tsv/uzantısız alias) yeni `sitemap-ai.xml`’e taşındı (199 URL); `robots.txt` (Function + public + robots.ts) iki sitemap’i de gösteriyor. Liste: `src/content/sitemap-ai-paths.ts`, route: `src/app/sitemap-ai.xml/route.ts`
- **lastmod:** her URL için sayfanın route + içerik dosyalarının son git commit tarihi (`src/lib/sitemap-lastmod.ts`, `src/lib/git-lastmod.ts`); git geçmişi yoksa/shallow ise build tarihi. CI ve deploy checkout `fetch-depth: 0`
- **Doğrulayıcı:** `validate-ai-feeds.mjs` invent alias / ARD köprü kontrolleri `sitemap-ai.xml` üzerinden; yeni: sitemap.xml’deki her URL HTML, noindex değil ve self-canonical olmalı; robots sitemap-ai.xml’i göstermeli; owner/internal URL yasağı iki sitemap için de geçerli. `geo-prod-ci.yml` + deploy guard/smoke buna göre güncellendi. IndexNow listesine `sitemap-ai.xml` eklendi
- **TR başlıklar:** 69 TR sayfanın `<title>`/og:title’ı 30–60 karaktere çekildi (anahtar kelime başta, ARLEDSCREEN sonda); `/tr/bolgeler/istanbul/` artık ana sayfadan farklı başlıkta. Tek kaynak: `src/content/tr-meta-titles.ts` (lib/seo.ts builder’larında uygulanır). Aynı canonical’a giden noindex TR köprüleri de hedef sayfanın başlığını alır
- **Dokunulmadı:** EN başlıklar, hreflang, H1/gövde metni, fiyatlar, slug’lar, `fiyat-hesap/index.html` (md5 `14972407dea358a02667f080aab27d33`), `chat-widget.js`, `_headers`, MailerLite CatDAx. CSS hash aynı (`47c76947d5aa65cf.css`) — arayüz değişmedi

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
