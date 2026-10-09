# ARLEDSCREEN · CHANGE_LOG

En yeni kayıt üstte. Numara: ARL-YYYYMMDD-XXX.

## ARL-20261009-015 — LCD "teknik değer yayımlanmaz" çelişkisi giderildi (llms + LCD rehberi)

- **Sorun:** llms.txt, llms-full.txt ve LCD rehberi (TR / EN / RU / AR) "LCD için teknik değer yayımlanmaz" diyordu. Oysa yeni /tr/products/lcd-ekran/ ve /tr/products/kiosk/ sayfaları 49 / 55 / 65 inç, Android veya Windows ve USB / HDMI / LAN / Wi‑Fi bilgilerini veriyor.
- **Yeni ifade:** fiyat yalnızca yazılı teklifle. Teknik bilgi olarak yalnızca bu iki sayfadakiler geçerli; başka değer (parlaklık, çözünürlük vb.) uydurulmaz, seçilen modelle teklifte paylaşılır.
- **Dosyalar:**
  - `public/llms.txt` (AI kuralı satırı)
  - `public/llms-full.txt` ("ARLEDSCREEN LCD ekran satıyor mu?" yanıtı)
  - `src/content/seo-guides.ts`: LCD rehberinin "Fiyat ve teklif" / "Price and quote" bölümü, TR + EN
  - `src/content/seo-guides-i18n.ts`: RU + AR karşılıkları
  - llms dosyaları statik; jeneratörleri yok
- **Production:** Aras Bey / Ali onayı → squash merge → manual deploy

## ARL-20261009-014 — Ürün sırası kesinleştirildi: "Popüler ürünler" (İç, Dış, Dijital, Menüboard, Kiosk, LCD) önce

- **Kaynak:** Aras Bey (9 Eki 2026). #86 yayında, ama header masaüstü menüsünde ve /products sayfalarında aile gruplaması yüzünden sıra İç, GOB, Esnek, İnce Pitch, Dış… şeklinde görünüyordu.
- **Değişiklik:** ilk altı ürün yeni bir "Popüler ürünler" / "Main products" başlığı altında, sahibin sırasıyla listeleniyor: İç mekân, Dış mekân, Dijital ekran, Menüboard, Kiosk, LCD. Kalan ürünler mevcut aile başlıklarıyla devam ediyor; hiçbir ürün iki kez listelenmiyor.
  - Header masaüstü menüsü (`SiteShell` menü ailesi).
  - /tr/products/ ve /en/products/ (`groupsByFamily()`).
  - Footer ve mobil menü zaten düz sıradaydı (#86). EN header'da ve EN footer'da ürün listesi yok.
- **Şema:** "LED ekran ürün grupları" ItemList zaten bu sırada (#86); değişmedi.
- **Dokunulmadı:** ana sayfa, CSS ve yerleşim (mevcut başlık ve kart bileşenleri kullanıldı).
- **Doğrulama:** build + validatörler; ekran görüntüleri `/workspace/preview-grok/siralama2/`
- **Production:** Aras Bey / Ali onayı → squash merge → manual deploy

## ARL-20261009-013 — Ürün çeşitleri sırası + Dijital ekran / Menüboard / Kiosk / LCD ürün grupları (TR + EN)

- **Kaynak:** Aras Bey (4 ve 9 Eki 2026): ilk altı sıra İç mekân LED, Dış mekân LED, Dijital ekran, Menüboard, Kiosk, LCD ekran; diğerleri mevcut göreli sırayla. Dijital ekran / menüboard / kiosk ürün sayfaları eski sitede vardı, repoya taşınırken kaybolmuştu; LCD sayfası da toptancı bilgisiyle oluşturulacaktı.
- **Sıra (tek kaynak `src/content/categories.ts`, `GRID_LEAD_SLUGS`):** ic-mekan-led-ekran, dis-mekan-led-ekran, dijital-ekran, menuboard, kiosk, lcd-ekran, ardından diğerleri.
- **Etkilenen listeler:**
  - header Ürünler menüsü. Masaüstünde aile başlıkları korunur, aileler İç → Dış → LCD ve Dijital → Kiralık → Poster → Modül sırasında; mobil menü düz liste.
  - footer "Ürün grupları"
  - ana sayfa ürün grupları ızgarası (yeni 4 kart İç ve Dış'tan sonra, mevcut kart düzeniyle)
  - /tr ve /en/products/ aile bölümleri ve ItemList şeması
  - /nxtionstar/ grup listesi
  - ürün sayfalarındaki "Diğer ürün grupları"
  - sitemap
- **Yeni sayfalar (TR + EN, yeni aile "LCD ve Dijital Ekranlar"):** `/products/dijital-ekran/`, `/products/menuboard/`, `/products/kiosk/`, `/products/lcd-ekran/`. Her biri ürün grubu şablonunda (teklif, WhatsApp, fiyat hesapla CTA'ları, SSS ve FAQPage) ve kendi rehberine bağlı: dijital-ekran, menuboard-dijital-menu, kiosk-ekran, lcd-ekran.
- **Diğer güncellemeler:** sitemap (otomatik), tr-meta-titles, EN overlay (quoteOnly), `postbuild-ai.mjs` quoteOnly listeleri, llms.txt.
- **İçerik kaynakları (sayfada anılmaz, metinler özgün):**
  - Mevcut rehberler: /tr/rehber/dijital-ekran/, /menuboard-dijital-menu/, /kiosk-dijital-ekran/, /kiosk-ekran/, /lcd-ekran/
  - Toptancı Led Magic Light: https://www.ledmagiclight.com.tr/dijital-kiosk1 · /android-kiosklar · /windows-kiosklar · /49-inch-dokunmatik-dijital-kiosk-android (ve -windows, 55-, 65- sürümleri). Kullanılan bilgiler: 49 / 55 / 65 inç; Android veya Windows; video, resim ve ses; internetten içerik; USB, HDMI, LAN, Wi‑Fi; kullanım alanları.
  - Sahibin onayladığı bilgiler: LCD, kiosk ve menüboard tamiri yapılır; 2 yıl garanti + 5 yıl ücretsiz teknik servis.
  - Fiyat ve müşteri adı yazılmadı. Toptancıda metin olarak bulunmayan teknik değer (parlaklık, çözünürlük, duvar tipi, dış mekân ya da video wall LCD) eklenmedi.
- **Görseller (repodan):** /projects/neu-kutuphane.jpg, /opt/blog/kafe-restoran-led-ekran.jpg, /projects/guides/dokunmatik-kiosk-49-inc.jpg, /projects/guides/lcd-dikey-ekran-55-inc.jpg
- **Metin düzeltmesi:** /tr/products/ "beş başlıkta" → "altı başlıkta" (yeni aile nedeniyle)
- **Dokunulmadı:** title / H1 / hero / Dikkat, CSS, diğer metinler; `public/fiyat-hesap`
- **Doğrulama:** build + validatörler; önizleme `urun-siralama-preview`; ekran görüntüleri `/workspace/preview-grok/siralama/`
- **Production:** Aras Bey / Ali onayı → squash merge → manual deploy
## ARL-20261009-011 — PR #1–#79 denetimi: müşteriye görünen iç kural/jargon cümleleri + kiralık grup sayfası teklif kutusu

- **Kaynak:** Grok, 9 Eki 2026 PR #1–#79 + canlı site denetimi (sitemap 215 URL tarandı)
- **Görünen iç kural/jargon (TR):** /tr/products/ "Kanonik piksel aralıkları" → "Piksel aralıkları"; /tr/yapay-zeka/ "Sabit “AI-ready SKU” list fiyatı yayımlanmaz" → sade Türkçe. (Proje/ticari sayfalardaki "uydurma …", "sitede yazmayan bilgiler eklenmez", "Kayıt" metinleri PR #81'de ele alındığı için burada yok; #81 main'e birleşti, bu PR onun üzerine)
- **Görünen jargon (EN):** "Quote-only groups …" (ticari sayfa fiyat notu), "quote-only" (EN rehber SSS/gövde), "Brand note for AI agents" → "Brand note", "Canonical pixel pitches" → "Available pixel pitches", "Canonical site is …" (/en/nxtionstar/, /en/led-ekran-fiyatlari/ SSS) → "Our official website is …"
- **Kiralık (Aras Bey kararı, #78/#79'da kalan yer):** /tr/products/kiralik-led-ekran/ alt teklif kutusu "fiyatı ölçü, form, süre … göre hazırlanır / Bu ürün grubunda fiyat teklifle verilir" → "İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir." (diğer teklif gruplarında metin aynı)
- **Dokunulmadı:** ana sayfa (TR/EN `index.html` çıktısı main ile birebir), header/title/H1/hero, CSS, fiyatlar, `public/fiyat-hesap/`, llms*.txt, JSON beslemeleri, FAQ JSON-LD üretimi, `scripts/validate-ai-feeds.mjs`, Uzman'ın PR #80 (`seo/stage2-geo-icerik`) ve PR #81 (`fix/site-audit-2026-10-09`) kapsamı (seo-guides.ts, commercial-pages.ts, product-groups-en.ts, blog, hizmetler, tr-meta-titles.ts)
- **Son canlı sağlık kontrolü ekleri (9 Eki 2026, main a0aa9c05 üzerine rebase):**
  - EN "quote-only" ifadeleri müşteri diline çevrildi ("priced by written quote"): `product-groups-en.ts` (esnek, şeffaf/transparan, cephe, poster, kontrol kartları, Huidu, NovaStar, Colorlight), `seo.ts` (EN ürün/grup açıklamaları), `commercial-pages.ts` (EN servis SSS), `hesaplayici/page.tsx` HowTo adımı (TR "quote-only gruplardır" → "fiyat yazılı teklifle verilir"). Etkilenen sayfalar: /en/led-ekran/, /en/led-ekran-kiralama|montaj|satisi|servis|tamiri|ureticisi/, /en/products/ ve colorlight-kontrolculer, esnek-, huidu-kontrol-kartlari, led-modul-ve-kontrol-sistemleri, novastar-kontrolculer, poster-, seffaf-, transparan-led-ekran, /en/rehber/kiralik-mi-satin-alma/, /en/rehber/led-tabela-mi-led-ekran-mi/
  - /en/p4-led-ekran/ ve /en/p5-led-ekran/ SSS: "do not invent an installed m² rate" cümlesi kaldırıldı ("Share site photos via our quote form for a written price." / "The final choice is confirmed on survey.")
  - `public/.well-known/ard.json` agentGuidelines: "Warranty years or return days — per contract" kaldırıldı, `"warranty": "2-year warranty and 5 years of free technical service"` eklendi (iade günü yazılmadı); `quoteOnlyGroups` listesinden "Rental / kiralık" çıkarıldı, `"rental"` = günlük 50 USD/m² (#79 kararıyla uyum). ard.json statik dosya; postbuild-ai yalnızca zenginleştiriyor (ai-shopping.json üreticisinde garanti zaten 2 yıl + 5 yıl). Postbuild'in yeniden yazdığı bir merchant feed açıklaması da dosyaya yansıdı
  - Dokunulmadı: 15 TR sektör sayfasındaki "Sabit fiyat yoktur" cevabı (satın alma fiyatı; 30 HTML dosyasında aynı)
- **Doğrulama:** `npm run build` + postbuild validatörleri (validate-ai-feeds, validate-no-owner-gate) geçti. Build çıktısında görünen metinde "quote-only" 0, "invent" 0 (ham HTML'de "quote-only" 0). Görünen metni değişen sayfa: 25 (22 EN + /tr/products/, /tr/products/kiralik-led-ekran/, /tr/yapay-zeka/). TR/EN ana sayfa: script dışı HTML + JSON-LD main ile aynı, mobil 390 tam sayfa ekran görüntüsü piksel piksel aynı; CSS dosyaları ve `fiyat-hesap/` aynı. Ekran görüntüleri `/workspace/preview-grok/audit/` ve `/workspace/preview-grok/audit2/`
- **Production:** Aras Bey önizleme onayı → squash merge → manual deploy

## ARL-20261009-012 — Rehber: LED ekran kurulum rehberleri (genel + Huidu + NovaStar), TR + EN

- **Kaynak:** Aras Bey (9 Eki 2026): "LED ekran kurulumu hakkında bilgileri rehber kısmına ekle; Huidu ve Novastar'dan yararlan, kopyala-yapıştır yerine özgün ve anlaşılır cümlelerle; tarama dosyası yüklemeden mobil ve masaüstü yönetim programlarının kurulumuna kadar"
- **Yeni sayfalar (TR + EN):** `/rehber/led-ekran-kurulumu/` (genel kurulum, hub), `/rehber/huidu-led-ekran-kurulumu/` (HDPlayer, HDSet, HD2020, LedArt), `/rehber/novastar-led-ekran-kurulumu/` (NovaLCT, ViPlex Express, ViPlex Handy, VNNOX). Her sayfada: kısa adım listesi, bölümler, "Sık yapılan hatalar", SSS, ilgili sayfalar, CTA (teklif / teknik servis / montaj), "Kaynaklar" (yalnız resmî Huidu ve NovaStar sayfaları ve kılavuzları; `rel=nofollow noopener noreferrer`)
- **Şema:** TechArticle (+ citation = kaynak URL'leri), HowTo (görünen adım listesiyle aynı), FAQPage (görünen SSS ile birebir), BreadcrumbList, Speakable
- **Kod:** içerik `src/content/install-guides*.ts` + `install-guide-sources.ts`; şablon `src/app/[locale]/rehber/_install-guide.tsx` (mevcut Section / GlassPanel / Button / OptImage sınıfları, yeni CSS yok); route'lar `rehber/<slug>/page.tsx` (yalnız tr/en)
- **Listeleme:** `/rehber/` hub kartları + ItemList (sona 3 kart), blog dizini "Rehber" listesi (#80'in `blog-guide-index.ts`, başa 3 kart), `sitemap.xml` (+6 URL, toplam 235), `sitemap-lastmod`, `llms.txt` (rehber listesi + arama konusu haritası)
- **Görseller:** yalnız repoda olanlar: `/projects/install-wiring.jpg`, `/control/huidu-async-hero.png`, `/control/novastar-mctrl660-pro.png`; üretici ekran görüntüsü yok, hotlink yok
- **Dokunulmadı:** ana sayfa (TR/EN `index.html` script dışı HTML #80 tabanıyla birebir aynı; CSS hash'leri aynı), header/menü (`SEO_GUIDE_SLUGS` değişmedi, bu yüzden "Öğrenme merkezi" ve menü aynı), H1/hero, `public/fiyat-hesap`, fiyatlar
- **Bağımlılık:** #80 (`seo/stage2-geo-icerik`) üzerine kuruldu; #80 main'e birleşti (34b947d8), PR base'i artık main
- **Doğrulama:** `npm run build` + postbuild validatörleri (13/13 feed, no-owner-gate) geçti; önizleme https://kurulum-rehberi-preview.arledscreen.pages.dev (noindex)
- **Production:** Ali / Aras Bey onayı → squash merge → manual deploy

## ARL-20261009-020 — Eski sahip dosyaları (owner-p0, point-c, geo-status, owner-next, tur1a…) için 410 Gone koruması

- **Kaynak:** 9 Eki 2026 Cloudflare zone Custom Purge (09:06 TSİ) sonrası `/owner-p0.json`, `/geo-status.json`, `/point-c.txt`, `/point-c-progress.json`, `/feeds/point-c.csv`, `/.well-known/owner-next.json` (ve `point-c*.json/txt/csv`, `/.well-known/point-c*`, `geo-next.*`, `owner-next.json`, `/.well-known/geo-status.json`, `tur1a.*`) hâlâ 200 ve kişisel gmail adresi içeriyordu
- **Kök neden:** dosyalar main'de / build çıktısında yok (#62 sonrası `strip-owner-gate` + `validate-no-owner-gate`). Deployment'a özel adresler (`<id>.arledscreen.pages.dev`), `main.arledscreen.pages.dev` ve `?x=` sorgulu istekler 404 veriyor; yalnızca production host adları (`arledscreen.com`, `arledscreen.pages.dev`) `age` 22 000–97 000 sn olan eski kopyayı döndürüyor (zone'da `cf-cache-status: DYNAMIC`, pages.dev'de `HIT`). Yani bu Cloudflare Pages'in kendi statik varlık önbelleği: silinen dosyaların kopyaları yeni deployment'larla düşmüyor ve zone purge'ü bunlara erişmiyor
- **Değişiklik:** `functions/_middleware.js` sahip yollarını (kök, `/.well-known/`, `/feeds/`; tüm uzantılar) `410 Gone` + `no-store` + `noindex` ile cevaplıyor; `public/_routes.json` bu yolları Functions'a yönlendiriyor (statik varlık sunucusu ve önbelleği hiç çağrılmıyor). `/feeds/*` ve `/.well-known/*` exclude'ları kaldırıldı (Pages'te exclude include'u ezer; include'da olmayan diğer dosyalar statik kalıyor). `strip-owner-gate` `_routes.json`'a dokunmuyor; `validate-no-owner-gate` her sahip yolunun guard'a yönlendiğini ve 410 döndüğünü, normal yolların (`/tr/`, `/feeds/prices.json`, `/.well-known/ard.json`, `/geo-baseline.json`) engellenmediğini doğruluyor
- **Dokunulmadı:** ana sayfa, header, fiyat-hesap, görünen metin, `_headers`, `_redirects`
- **Production:** Ali / Aras Bey onayı → squash merge → manual deploy (Deploy Cloudflare Pages) → canlıda sahip yollarının 410 döndüğü kontrol edilir → arledscreen.com zone Custom Purge (feeds/*.csv zone önbelleğinde ayrıca HIT olabiliyor)

## ARL-20261009-010 — Kiralık "quote-only" / "sabit fiyat yok" çelişkileri giderildi (llms.txt, ana sayfa fiyat SSS, EN rehber, ard.json)

- **Kaynak:** #78 sonrası canlı denetim: /llms.txt satır 3 ve ana sayfa fiyat SSS cevabı (TR+EN, /en/sss/) kiralığı hâlâ "yazılı teklifle" grubunda sayıyordu; satır 129 ile çelişki
- **Değişiklik:** "Şeffaf / esnek / poster / kiralık / kontrol" listelerinden kiralık çıkarıldı, yerine "İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir." (EN: "Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.") eklendi — public/llms.txt, src/content/faqs.ts (yalnızca fiyat SSS cevabı, TR+EN), public/entity.json + public/ai-shopping.json makine SSS cevabı (TR+EN)
- **Ek commit (kalan çelişkiler):** EN "Rent or buy" rehberi "There is no fixed rental price." → günlük USD 50/m² cümlesi; `.well-known/ard.json` quote-only grup açıklamasından rental çıkarıldı + oran eklendi; EN kiralık grup lead'i "quote by size and days" → "USD 50 per m² per day"; /en/led-ekran-kiralama/ meta açıklaması "written quote by size and duration" → "USD 50 per m² per day; installation and shipping quoted separately". Tüm repo TR+EN tarandı; satın alma + kiralamayı birlikte anan genel "quote by size and duration" açıklamaları (EN sahne/düğün salonu) ve fiyat-hesap (Melis dosyası) bilerek bırakıldı
- **Dokunulmadı:** ana sayfada bu SSS cevabı dışında hiçbir metin/yerleşim; llms-full.txt, src/lib/ai.ts, scripts/postbuild-ai.mjs zaten doğruydu (#78)
- **Production:** Ali / Aras Bey onayı → squash merge → manual deploy

## ARL-20261009-009 — Garanti 2 yıl + 5 yıl servis, kiralık 50 USD/m²/gün (Aras Bey kararları)

- **Kaynak:** Aras Bey: 2 yıl garanti + 5 yıl ücretsiz teknik servis (1 Eki 2026, site metni için onaylı); kiralık iç/dış mekân LED 50 USD/m²/gün, kurulum ve nakliye ayrı teklif (4 Eki 2026)
- **Garanti:** "seriye/projeye göre belirlenir" ve "garanti yılı sitede sabit yayımlanmaz" yanıtları → "ARLEDSCREEN 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunar." (TR/EN ana sayfa SSS cevabı, /tr/sss/, llms.txt, llms-full.txt, ai-shopping agentGuidelines.warranty, AGENTS.md)
- **Kiralık:** "teklifle/quote-only, sabit fiyat yok" → "İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir." (/tr/led-ekran-kiralama/, /tr/products/kiralik-led-ekran/, /tr/sss/, fiyat/ürün/yapay-zeka/hesaplayıcı notları, rehberler, EN eşleri, llms*, ai-shopping agentGuidelines.rental; quoteOnlyGroups'tan "Kiralık/Rental" çıkarıldı)
- **Dokunulmadı:** ana sayfada garanti cevabı dışında hiçbir metin/yerleşim (TR/EN ana sayfa SSS fiyat cevabındaki "kiralık" ifadesi bilerek bırakıldı); header/title/H1/hero; FAQ JSON-LD üretimi; scripts/validate-ai-feeds.mjs; fiyat.arledscreen.com; CSS
- **Görünen AI/geliştirici metni:** main'de (#70 sonrası) TR sayfalarda "AI ajanları panel fiyatını nereden okur?" / "Kaynak: ai-shopping.json …" görünen metni kalmamış; build çıktısında doğrulandı, ek değişiklik gerekmedi
- **Doğrulama:** npm run build + postbuild validatörleri (13/13 feed, no-owner-gate) geçti; ana sayfa öncesi/sonrası tam sayfa ekran görüntüsü (1366 ve 390 px) piksel farkı yok (SSS kapalı)
- **Production:** Ali / Aras Bey onayı → squash merge → manual deploy

## ARL-20261009-008 — EN "P1.86 GOB GOB" model link etiketi

- **Kaynak:** Ali, canlı 390 px ekran görüntüsü (/en/p1-86-led-ekran/ "Related products")
- **Değişiklik:** `enModelLinkLabel` çipte zaten "GOB" varsa tekrar eklemiyor; yalnızca EN link metni
- **Production:** Ali → squash merge → manual deploy

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
