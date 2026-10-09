# Cursor için talimat (ARLEDSCREEN, 9 Ekim 2026, v5)

Depo: bzkrtaras-hue/arledscreen. Sitenin arayüzü (renkler, yerleşim, ana sayfa) DEĞİŞMEYECEK.

## 0. Kurallar (önce bunu yap)
- AGENTS.md dosyasını depo köküne ekle.
- CURSOR_EK_KURALLAR.md ve AGENTS.md kurallarına uy. Bundan sonraki her işte bu iki dosya geçerlidir.

## P0. Fiyat hesaplayıcı JS hatası (acil, ilk iş)
Canlı /fiyat-hesap/ sayfasındaki hesaplayıcı betiğinde fazladan bir backtick var: "teyit edilir.``;" (iki backtick). Bu yüzden window.open(`https://wa.me/...`) satırında sözdizimi hatası oluşuyor ve hesaplayıcı betiğinin tamamı çalışmıyor.
- Düzeltme: "teyit edilir.``;" yerine "teyit edilir.`;" (tek backtick). Bu zip'teki public/fiyat-hesap/index.html dosyasında düzeltme zaten var; 1. adımda bu dosyayı kopyalamak P0'ı da kapatır.
- Şu an Cloudflare'de "arled-hotfix-fiyat-hesap" adlı küçük bir Worker (rota: arledscreen.com/fiyat-hesap*) bu hatayı canlıda geçici olarak düzeltiyor. Depo düzeltmesi yayına girince Worker etkisiz kalır; Worker'ı Arledscreen kaldıracak. Worker'a ve rotasına dokunma.
- Yayından önce sayfadaki tüm satır içi betikleri `node --check` ile kontrol et; hepsi geçmeli.

## 1. Melis canlı destek (hazır, onaylı)
Bu zip'teki iki dosya canlıdaki güncel sürümün üzerine hazırlandı. Depodaki aynı yollara OLDUĞU GİBİ kopyalanabilir, başka dosyaya dokunma:
- public/fiyat-hesap/index.html  (md5 19ebe84c8388908e5727e585ef97b13c)
- public/chat-widget.js          (md5 e270891f4fac6e99a6872a59bbea4aad)
İçerik: canlı destek temsilcisinin adı Melis, kısa ve doğal Türkçe metinler, kullanıcının adıyla hitap, sesli okuma ve eller serbest sesli sohbet, sohbet özetini WhatsApp mesajına ekleyen "WhatsApp'tan ekibe bağlan" seçeneği, pencere kapanınca sesli dinlemenin durması. Fiyatlar ve yapı aynı.
Korunanlar (kontrol edildi): ?lang=en İngilizce modu, görsel alt metinleri, uzun meta description, mobil kırılım noktası 767px, menü kapanınca konumu yeniden ölçen MutationObserver bloğu.
Dikkat: Alt kısımdaki MailerLite formu (CatDAx) ve CSP'deki *.mailerlite.com / *.mlcdn.com izinleri olduğu gibi kalsın.
Kontrol: Yayından sonra /fiyat-hesap/ ve herhangi bir sayfadaki sohbet balonunda "Merhaba, ben Melis" görünmeli; /fiyat-hesap/?lang=en İngilizce açılmalı; hesaplayıcı sonuç vermeli; mobilde sohbet balonu alt çubuktaki Ara / WhatsApp / Teklif düğmelerinin üstünde kalmalı. Ana sayfa görünümü önceki ile aynı olmalı.

## 2. Sitemap temizliği
sitemap.xml içinden iç / sahip araçlarına ait adresleri çıkar (bunlar noindex ya da ziyaretçiye yönelik değil):
- owner-next.html, owner-next.txt, owner-next.json, .well-known/owner-next.*
- geo-next.html, geo-next.txt, geo-next.json, .well-known/geo-next.*
- point-c.*, point-c-en.*, .well-known/point-c*, feeds/point-c*.csv, point-c-progress.json, .well-known/point-c-progress.json
- owner-p0.json, .well-known/owner-p0.json
- Benzer diğer iç dosyalar (geo-status, tur1a vb. sahip / test dosyaları).
Sitemap'te yalnızca ziyaretçiye yönelik sayfalar kalsın. owner-next ve iç araç sayfaları noindex olarak kalmaya devam etsin. Sitemap'i üreten betik varsa, kalıcı olsun diye listeyi orada düzelt.

## 3. SEO düzeltmeleri (Arledscreen onaylı)
- Ana sayfada iki rel="canonical" var. `<link rel="canonical" href="https://arledscreen.com/#website" ...>` satırı kaldırılmalı; yalnızca sayfanın kendi adresi kalmalı.
- TR ve EN sayfalar arasında hreflang bağlantısı yok; eklenmeli (tr, en, x-default).
- Müşterinin gördüğü metinlerde teknik notlar var ("ai-shopping.json `pricedPanels`", "geo-baseline.json", "quote-only", "Inventable alias'lar", SSS'deki "AI ajanları panel fiyatını nereden okur?"). Bunlar llms.txt, JSON dosyaları ve JSON-LD içinde kalsın; görünen metin sade Türkçe olsun, örn. "Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir." SSS'deki "çiip" yazım hatası "çip" olmalı.
- Yayınları biriktir; günde en fazla bir production yayını yap.

## Adım 4. Görünen panel fiyatları (statik HTML)
ChatGPT panel fiyatlarımızı görmedi; Bing üzerinden okuyor. Google fiyatları /fiyat-listesi üzerinden görüyor. Tablo yalnızca çalışma anında JSON'dan yüklenirse bu fark kapanmaz.
Sabit kurallar (bu adımda da geçerli):
- Arayüz ve tasarım değişmez. Yalnızca mevcut bileşenler ve yerleşimler kullanılır.
- Yalnızca metin, SEO ve veri değişikliği yapılır.
- Production yayını günde en fazla bir kezdir; önce önizleme.
- Görünen metinde "distribütör" ve "yiyistar" geçmez.
- Slogan korunur: "NXTIONSTAR — görsel gücün küresel standardı."
- Görünen metinde teknik veya iç not olmaz.

Yapılacak:
- Veride ve JSON'da duran panel fiyat tablosunu (modeller ve USD panel fiyatları; yeni fiyat uydurma) /fiyat-listesi ve /tr/led-ekran-fiyatlari/ sayfalarının statik çıktısında düz HTML metin ya da tablo olarak da yaz. Yalnızca çalışma anında JSON'dan yüklemek yetmez.
- Her iki sayfa sitemap.xml içinde olsun. Her sayfada tek canonical kalsın; canonical sayfanın kendi adresi olsun.
- /tr/products/ sayfasından her iki sayfaya iç bağlantı ver.
- Fiyat notu sade kalsın: "Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir."

## Adım 5. Genel sorgular (yalnızca mevcut sayfalarda metin)
Google'da ilk 10'da değiliz: "LED ekran fiyatları", "Türkiye'de LED ekran firmaları", "LED ekran satın alırken hangi firmalar".
Sabit kurallar (bu adımda da geçerli):
- Arayüz ve tasarım değişmez. Yalnızca mevcut bileşenler ve yerleşimler kullanılır.
- Yalnızca metin, SEO ve veri değişikliği yapılır.
- Production yayını günde en fazla bir kezdir; önce önizleme.
- Görünen metinde "distribütör" ve "yiyistar" geçmez.
- Slogan korunur: "NXTIONSTAR — görsel gücün küresel standardı."
- Görünen metinde teknik veya iç not olmaz.

Yapılacak:
- Yeni sayfa açma, yeni yerleşim kurma. Mevcut /tr/led-ekran-fiyatlari/ ve mevcut rehber sayfalarında title, meta description, H1 ve H2 metnini bu üç ifade etrafında güçlendir.
- Sayfa zaten FAQPage şeması kullanıyorsa SSS bloğunu da aynı ifadelerle güçlendir. Şema yoksa yeni bir yerleşim kurma; mevcut metin kalıbının içinde kal.
- m² başı fiyat aralığını TL ve USD olarak yaz. Aralıkları yalnızca kendi fiyat verimizden hesapla; sayı uydurma.
- Yalnızca metin. Yeni layout yok.

## Adım 6. NXTIONSTAR varlığı
Google "NXTIONSTAR" yazımını "NationStar" olarak düzeltiyor. /tr/nxtionstar/ sayfası "NXTIONSTAR LED ekran nedir kim satıyor" sorgusunda 8. sırada.
Sabit kurallar (bu adımda da geçerli):
- Arayüz ve tasarım değişmez. Yalnızca mevcut bileşenler ve yerleşimler kullanılır.
- Yalnızca metin, SEO ve veri değişikliği yapılır.
- Production yayını günde en fazla bir kezdir; önce önizleme.
- Görünen metinde "distribütör" ve "yiyistar" geçmez.
- Slogan korunur: "NXTIONSTAR — görsel gücün küresel standardı."
- Görünen metinde teknik veya iç not olmaz.

Yapılacak:
- /tr/nxtionstar/ sayfasında, metnin ilk ekranında şu kısa görünür paragraf olsun (aynen): "NXTIONSTAR, ARLEDSCREEN'in kendi LED ekran markasıdır; NationStar (çip üreticisi) ile bağlantısı yoktur. Türkiye'deki tek satış noktası ARLEDSCREEN'dir."
- Organization / Brand JSON-LD ekle: marka NXTIONSTAR, sahibi ARLEDSCREEN. sameAs yalnızca arledscreen.com adresleri, https://instagram.com/arledscreen ve https://facebook.com/arledscreenn. arleds.com ekleme.
- Sayfa title'ı şu olsun: "NXTIONSTAR LED Ekran | ARLEDSCREEN".
- Yeni yerleşim yok. Mevcut sayfanın metin ve şema alanlarında kal.

Adım 4, 5 ve 6 ayrı yayın değildir. 1, 2 ve 3 ile birlikte toplanır: önce önizleme, sonra günün tek production yayını.

## Adım 7. Çok dilli site (komşu ülke dilleri)
Aras Bey 9 Ekim 2026'da karar verdi: siteye Bulgarca, Yunanca ve komşu ülke dilleri eklenecek.

### Faz 1 (LTR, yayına alınabilir)
- Diller: Bulgarca `bg`, Yunanca `el`, Gürcüce `ka`, Azerbaycan Türkçesi `az`.
- Yönlendirme, sitede `/tr/` ve `/en/` için kullanılan kalıbın aynısıdır: `/bg/`, `/el/`, `/ka/`, `/az/`.
- Her dilde şimdilik yalnızca şu sayfalar; bunun dışına çıkma: ana sayfa, ürünler/products, fiyat listesi ve LED ekran fiyatları, NXTIONSTAR, teklif/quote, hakkımızda/about, iletişim.
- Kaynak: TR metinlerinden çevir.
- Marka adları aynen kalır: ARLEDSCREEN ve NXTIONSTAR.
- Slogan sadık bir çeviriyle verilir. TR sayfalarda özgün slogan durur: "NXTIONSTAR — görsel gücün küresel standardı."
- Fiyatlar TR ile aynıdır: USD, panel başı, KDV ve nakliye hariç.
- Görünen metinde "distribütör" ve "yiyistar" geçmez.
- Görünen metinde teknik not olmaz.
- Her sayfada kendi canonical'ı bulunur. Her dil sürümünde tam karşılıklı hreflang seti vardır: tr, en, bg, el, ka, az ve `x-default`. `x-default` `/tr/` adresini gösterir. Her sayfa sitemap.xml içine hreflang alternates ile girer.
- Çeviriler ana dil incelemesi için işaretlenir. `TRANSLATION_REVIEW.md` dosyasında sayfalar ve diller listelenir. Aynı dosyada şunu da yaz: önizlemeden sonra çevrilmiş metinleri New Bot inceleyecek. Sitenin kendisinde buna dair hiçbir şey yazılmaz.

### Dil seçici
- Mevcut TR/EN dil seçicisi aynı bileşen ve aynı stillerle genişletilir.
- İzin verilen tek değişiklik ek seçeneklerdir. Açılır menü yalnızca mevcut bileşen zaten destekliyorsa kullanılır.
- Masaüstü ve mobilde, 767px kırılımı dahil, başka hiçbir arayüz veya tasarım değişikliği yapılmaz.

### Faz 2 (RTL, ayrı onay)
- Diller: Arapça `ar`, Farsça `fa`.
- Bu adımda production'a alınmaz.
- Yalnızca önizleme dalında, `dir="rtl"` ile hazırlanır.
- Production yayını öncesinde Arledscreen masaüstü ve mobil ekran görüntülerini kontrol eder; yerleşimin bozulmadığı doğrulanmadan canlıya alınmaz.

### Melis
- Widget arayüzü değişmez.
- Melis veya hesaplayıcı sohbeti için yeni dil algılama ekleme.
- bg, el ve ka sayfalarında Melis mevcut İngilizce (EN) modunu kullanır.
- az sayfalarında Melis mevcut Türkçe (TR) modunu kullanır.
- Melis için yeni çeviri yazılmaz.
- Widget veya kodda, mevcut modu seçmenin ötesinde değişiklik yapılmaz.

### Kurallar
- Yalnızca metin, SEO ve veri. Arayüz değişmez. Önce önizleme. Production yayını günde en fazla bir kez. Yayından sonra kilit adresler doğrulanır: /, /tr/, /tr/products/, /tr/quote/, /fiyat-hesap/ ve o gün eklenen dilin ana adresi.
- Faz 1 birkaç günlük yayına bölünebilir: her yayında bir dil.
