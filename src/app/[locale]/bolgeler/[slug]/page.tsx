# arledscreen.com site denetimi (9 Ekim 2026)

Kapsam: canlı site (sitemap.xml'deki 215 URL ve sayfa içi bağlantılarla bulunan 40 URL, toplam 255 sayfa: 175 TR, 80 EN), 147 görsel ve iç kaynak, `main` @ 86294c56 kaynak kodu.
Dal: `fix/site-audit-2026-10-09`. Tasarım, yerleşim ve CSS değişmedi. Fiyat, teknik özellik ve garanti eklenmedi. Ana sayfa hero, title ve H1 alanlarına dokunulmadı.
Stage-2 PR dosyalarına (seo-guides.ts, llms*.txt, ürün dizilimi) dokunulmadı.

Önem: **Y** = yüksek, **O** = orta, **D** = düşük. "Oto" = otomatik düzeltilebilir mi? **Düzeltildi** = bu PR'da düzeltildi.

## Özet: türe göre sayılar

| Tür | Bulgu | Bu PR'da düzeltildi | Karar / ayrı iş |
|---|---|---|---|
| Kırık iç bağlantı / görsel (4xx/5xx) | 0 (sitede); site dışında 2 (handoff dokümanındaki /tr/fiyat-hesap/, dil öneki olmayan /products/ ve /rehber/) | 2 | 0 |
| Yönlendirme zinciri | 0 zincir; /blog/ adresi eski hedefe gidiyor: 1 | 1 | 0 |
| Konusu başlıkla uyuşmayan görsel / yanlış alt metin | 13 | 4 (6 sayfada değişim + 2 EN alt) | 9 |
| Eksik veya çift title / description / H1 | 1 (çift H1) | 1 | 0 |
| Müşteriye görünen iç/geliştirici metni | 12 grup (yaklaşık 100 sayfa) | 10 | 2 |
| Türkçe yazım | 4 | 4 | 0 |
| arled@ dışında e-posta / farklı telefon | 0 | – | – |
| TR ile EN arasında fiyat farkı | 0 değer farkı; 1 biçim hatası (EN'de TR sayı biçimi, ~10 sayfa) | 1 | 0 |
| Boş bölüm / EN sayfada çevrilmemiş TR metin | 4 | 1 | 3 |
| Canonical / hreflang | 0 canonical hatası; EN→TR sabit bağlantı 1 grup (~45 sayfa); 73 TR-only sayfada hreflang yok (bilgi) | 1 | 1 |
| 404 sayfasında çift robots meta | 1 | 1 | 0 |
| Eksik alt metin | 0 (kısa ve genel alt: 5, ana sayfa hero ve video) | 0 | 1 |
| **Toplam** | **~43** | **26** | **~17** |

## Ayrıntılı liste

| # | URL / dosya | Sorun | Önem | Çözüm | Oto | Durum |
|---|---|---|---|---|---|---|
| 1 | `/tr/projelerimiz/*` (21 sayfa) | Görünen geliştirici metni: "Bu kayıt için henüz eşleşen stok/proje fotoğrafı bağlı değil. Genel galeri: /tr/galeri/" | Y | Doğal cümle ve "galeri sayfamıza" bağlantısı | Evet | **Düzeltildi** |
| 2 | `/tr/projelerimiz/*` (29 sayfa) | Görünen iç not: "Bu sayfa … yayımlanmış alanlardan üretilir. Kontrol sistemi, garanti yılı … eklenmez." Ayrıca "Case study · Yayımlanmış kayıt", "kaydı … yayımlanmıştır", "Sektör etiketi", "Aşağıdaki bağlantılar aynı kullanım / ürün ailesine gider", "Panel USD listesi:", "Kayıt" etiketi | Y | Müşteriye yönelik sade metin ("Proje referansı", "Müşteri", "İlgili ürün ve sayfalar:") | Evet | **Düzeltildi** |
| 3 | `/tr/bolgeler/*` (13 sayfa) | "N yayımlanmış kayıt. Tarih, kapsam ve konum; stok görsel yok." / "bu sayfada yalnızca X kayıtları listelenir" / "proje kayıtları" | Y | "Tamamlanan projeler", "X projelerimiz", "N tamamlanan proje: tarih, kapsam ve konum." | Evet | **Düzeltildi** |
| 4 | `/tr/bolgeler/` | SSS: "Kayıdı olmayan il için kapı sayfası açılmaz" (yazım hatası ve iç terim), "türetilir … sayfa üretilmez"; JSON-LD açıklaması "81-il doorway yok" | O | Sade metin | Evet | **Düzeltildi** |
| 5 | 29 ticari sayfa (CommercialLanding) | "Şehir sayfaları, yayımlanmış proje kaydımız bulunan illerde yer alır.", "Panel USD:", "henüz eşleşen yayımlanmış satır yok" | O | Sade metin; fiyat notunun varsayılan girişi | Evet | **Düzeltildi** |
| 6 | Rehber makaleleri (ArticlePage) | "Panel USD:" | D | Varsayılan "Yayımlanmış panel fiyatları:" | Evet | **Düzeltildi** |
| 7 | `/tr/gizlilik/` | Bağlantı metni çıplak yol: "/tr/quote/" | D | "teklif formu" | Evet | **Düzeltildi** |
| 8 | EN fiyat tabloları: `/en/led-ekran-fiyatlari/`, `/en/hesaplayici/`, `/en/products/*`, `/en/led-ekran*/`, `/en/yapay-zeka/` (~10 sayfa) | EN sayfalarda TR sayı biçimi var: "95,88", "1.873" (USD/m²), "10.143,00 USD". İngilizce okuyan biri 1.873'ü yaklaşık 1,9 USD sanar. Değerler TR ile aynı. | Y | EN'de en-US biçimi: 95.88 / 1,873 / 10,143.00. TR çıktısı bayt bayt aynı. | Evet | **Düzeltildi** |
| 9 | `/tr/p1-86-led-ekran/`, `/tr/magaza-led-ekran/`, `/tr/vitrin-led-ekran/`, `/tr/konferans-salonu-led-ekran/` (+EN) | `projects/modules/indoor-wall.jpg` kamera tutan bir kişinin fotoğrafı, ekran yok. "İç mekân LED duvar", "Vitrin LED ekran" vb. olarak kullanılıyor. | Y | Sitede zaten olan uygun fotoğraflar: iç mekân sahne video duvarı, vitrin LED, toplantı salonu LED. Alt metinler TR ve EN düzeltildi. | Evet (yalnızca galeri) | **Düzeltildi** |
| 10 | `/tr/p2-5-led-ekran/`, `/tr/p3-07-led-ekran/` (+EN) | `projects/modules/outdoor-cab.jpg` bir film klaketi. "P2.5 dış mekan kabin" ve "P3 sınıfı dış mekan kabin" olarak kullanılıyor. | Y | Mevcut dış mekân LED fotoğrafları; alt metinde model iddiası yok | Evet | **Düzeltildi** |
| 11 | `/tr/products/ic-mekan-led-ekran/p4/`, fiyat tablolarındaki P4 iç mekân satırı (`models.ts:202`, `prices.ts:443`) | Aynı kameralı kişi fotoğrafı P4 iç mekân modelinin kart ve hero görseli | Y | Gerçek P4 iç mekân fotoğrafı gerekiyor. PR #76 da not etmiş; dosyalar #73/#76 ile çakışıyor. | Hayır | **Aras Bey kararı / foto** |
| 12 | `/en/products/kiralik-led-ekran/` | `stage-led.jpg` (konser kalabalığı) EN alt metni "Rental LED cabinet kit" | D | "LED screen on a concert stage with the audience" | Evet | **Düzeltildi** |
| 13 | `/en/products/led-modul-ve-kontrol-sistemleri/` | Modül katalog görseli EN alt metni "LED control and module service bench" | D | "LED module types: indoor, flexible and outdoor models" | Evet | **Düzeltildi** |
| 14 | `/tr/magaza-led-ekran/`, `/tr/p2-5-led-ekran/` | `indoor-smd.jpg`: tedarikçi tanıtım afişi (oditoryum, üstünde "INDOOR SMD P2.5 3840Hz" yazısı), "Mağaza LED ekran" olarak kullanılıyor | O | Gerçek mağaza fotoğrafı ile değiştirilmeli | Hayır | Karar / foto |
| 15 | `/tr/p1-86-led-ekran/`, ince pitch sayfaları | `fine-pitch-panel.jpg` üniversite logolu bir poster/totem ekran gösteriyor, alt metni "P1.86 ince pitch LED panel" | O | Görsel poster/totem sayfasına taşınmalı veya alt metin düzeltilmeli | Kısmen | Karar |
| 16 | Fuar ve etkinlik sayfaları | `custom-booth.jpg` oynat düğmeli bir video ekran görüntüsü, alt metni "Fuar standı LED" | O | Gerçek fuar fotoğrafı | Hayır | Karar / foto |
| 17 | `/tr/vitrin-led-ekran/` | `indoor-led-lion.jpg` telefon ekran görüntüsü (durum çubuğu görünüyor) | O | Kırpılmış veya gerçek fotoğraf | Hayır | Karar / foto |
| 18 | Esnek LED kartı / `curved-led-tulips.jpg` | Düz duvar, "bükülmüş esnek modül" olarak etiketli | O | Stage-2 PR'ı (esnek kart görseli) çözüyor | – | Stage-2 |
| 19 | `/tr/galeri/`, ürün sayfaları | `opt/projects/yiyistar-gallery/*`: dosya adında tedarikçi adı var (AGENTS.md kuralı). Tedarikçi galerisi fotoğrafları "uygulama görseli" ve "Banka ve Havalimanı LED Ekran" diye gösteriliyor. | O | Dosya adlarını nötr yapmak (ör. `gallery/`) ve fotoğrafların "bizim uygulamamız" gibi sunulup sunulamayacağına karar vermek | Kısmen | **Aras Bey kararı** |
| 20 | `urun-dis-mekan`, `outdoor-facade`, `urun-ic-mekan`, `indoor-install` | Yapay zekâ ile üretilmiş görsel gibi duruyor ama "kurulum / uygulama" diye etiketli | D | Gerçek proje fotoğrafıyla değiştirmek veya "temsili görsel" demek | Hayır | Karar |
| 21 | Ana sayfa video kartları (`videos.ts`, `Hero.tsx`) | Kısa/genel alt metinler: "Club curved", "Kulüp kavisli", "Lounge LED", "Küresel LED", "Sphere LED" | D | Açıklayıcı alt metin | Evet | Ana sayfa: bu PR'da değil |
| 22 | `/tr/projelerimiz/bireysel-musteri-led-ekran/` ve `-2/` | Çift H1 "Bireysel müşteri LED ekran projesi"; ikincisinin title'ında şehir yok | D | H1 ve title'a şehir eklendi (Aksaray / Berlin) | Evet | **Düzeltildi** |
| 23 | `/tr/projelerimiz/*` meta description | "ARLEDSCREEN yayımlanmış proje kaydı." | D | "ARLEDSCREEN LED ekran referans projesi." | Evet | **Düzeltildi** |
| 24 | `/tr/projelerimiz/*` | TR metinde nokta ondalık: "6.1 m²" | D | "6,1 m²" | Evet | **Düzeltildi** |
| 25 | Ticari sayfalar (`commercial-pages.ts`, 21 satır) | "iç mekan / dış mekan" (sitenin standardı "mekân") | D | "mekân" | Evet | **Düzeltildi** |
| 26 | `/tr/projelerimiz/`, Aksaray/Van tabloları | "128×160 cm P3 Outdoor" (TR sayfada İngilizce) | D | "128×160 cm P3 dış mekân" (EN otomatik "outdoor") | Evet | **Düzeltildi** |
| 27 | `/en/blog/` | Yazı başlıkları, özetleri ve tarihler Türkçe ("21 Aralık 2025"); çıplak yollar "/en/led-ekran-fiyatlari/" | O | EN kart başlıkları ve özetleri, İngilizce tarih, "· in Turkish" etiketi, bağlantı metinleri | Evet | **Düzeltildi** |
| 28 | ~40 EN sayfa (`commercial-pages.ts` EN, `product-groups-en.ts`, EN SSS) | Görünen metinde çıplak yollar ("Price page: /en/led-ekran-fiyatlari/") ve "quote-only" jargonu (~20 satır) | O | Bağlantılı "our price list" / "price on request" | Evet (hacimli) | Ayrı EN PR'ı (issue #66; #76 ile çakışmamak için) |
| 29 | 31 sayfa (TR SSS, `entity.ts`, `faqs.ts`, `sss.json`) | SSS cevaplarında çıplak URL ("Satış noktası: https://arledscreen.com/tr/nxtionstar/", "/tr/led-ekran-fiyatlari/ sayfasında") ve sert "Karıştırmayın." | D | Bağlantı metni. Bu metinler JSON-LD ve AI dosyalarıyla aynı olduğu için GEO açısından birlikte değişmeli. | Kısmen | Karar (GEO) |
| 30 | EN sayfalar | Ayrı EN sayfası olmasına rağmen TR'ye sabit bağlantılar: `/tr/hesaplayici/` (rehber, yapay-zeka), `/tr/projelerimiz/` (about, hizmetler, bölgeler, ticari sayfalar; ~32 sayfa), `/tr/galeri/`; "(TR)" etiketleri | O | Dile göre bağlantı (`/${locale}/…`), "(TR)" kaldırıldı | Evet | **Düzeltildi** |
| 31 | 73 TR-only sayfa (model, proje, blog, bölge) | hreflang yok. EN karşılığı olmadığı için kabul edilebilir. | D | İsteğe bağlı: kendine `tr` + `x-default` | Evet | Sonraya |
| 32 | 404 sayfası | İki robots meta: `noindex` ve kök layout'tan gelen `index, follow` | O | postbuild betiği yalnızca `noindex` bırakıyor (`scripts/postbuild-404-robots.mjs`) | Evet | **Düzeltildi** |
| 33 | `https://arledscreen.com/tr/fiyat-hesap/`, `/en/fiyat-hesap/` | 404 (devir belgesi satır 8'de bağlantı olarak duruyor; sitede iç bağlantı yok) | O | 301 → `/tr/hesaplayici/`, `/en/hesaplayici/` | Evet | **Düzeltildi** |
| 34 | `/products/`, `/rehber/` (dil öneki yok) | 404 | D | 301 → `/tr/products/`, `/tr/rehber/` | Evet | **Düzeltildi** |
| 35 | `/blog`, `/blog/` | `/tr/rehber/`'e gidiyor; `/tr/blog/` artık var | D | 301 → `/tr/blog/` (`/blog/*` eski yazılar için olduğu gibi kaldı) | Evet | **Düzeltildi** |
| 36 | Devir belgesi | Satır 8 bağlantısı `/tr/fiyat-hesap/` | D | `/fiyat-hesap/` olarak güncellenmeli (belge düzenlemesi) | – | Ali / belge |
| 37 | Footer'da 28 sayfa + `/tr/led-ekran-ureticisi/` | "LED ekran üreticisi" ifadesi (devir belgesi #11'deki açık soru) | O | Aras Bey'in cevabına göre metin | – | **Aras Bey kararı** |
| 38 | 21 proje sayfası | Proje fotoğrafı yok (boş görsel bölümü; artık galeriye yönlendiriyor) | O | Instagram'daki gerçek proje fotoğraflarının eklenmesi | – | Foto gerekli |
| 39 | `http://` (80 portu) | Kutu bilgisayardan test edilemedi (80 portunda zaman aşımı) | Bilgi | Cloudflare "Always Use HTTPS" kontrolü | – | Bilgi |
| 40 | 20+ kullanım alanı sayfası (`/tr/*-led-ekran/`, `/tr/led-ekran/` vb.) | Görünen metinde "kaydındaki / kaydı / kayıtlarımız", tablo başlığı "Kayıt" | O | "için yaptığımız / projemiz / projelerimiz", "Tamamlanan projeler", sütun "Proje" | Evet | **Düzeltildi** |
| 41 | `/tr/projelerimiz/`, `/en/projelerimiz/` | "yayımlanmış kayıtlardan üretilen sayfalar. Uydurma yorum… yoktur" geliştirici açıklaması | O | Müşteriye yönelik açıklama: konum, ölçü, piksel aralığı | Evet | **Düzeltildi** |
| 42 | `/tr/bolgeler/` + 13 il sayfası, `/tr/products/*` | "kayıtlı iller", tablo başlığı "Kayıt", "Proje kayıtları" | D | "proje tamamladığımız iller", "Proje", "Proje örnekleri / Tüm projeler" | Evet | **Düzeltildi** |
| 43 | ~12 EN sayfa (avm, billboard, led-ekran-satisi, p1-86, p3-07, p4, magaza, restoran, rehber…) | "Panel USD published…", ham `/en/led-ekran-fiyatlari/` yolu düz metin | O | EN metin geçişi ayrı PR (issue #66) | Hayır | Ayrı PR |

### Sorun bulunmayan kontroller
- 255 sayfa ve 147 kaynakta 4xx/5xx yok. 1 adımdan uzun yönlendirme zinciri yok (apex → /tr/, www → /tr/, sondaki eğik çizgi için 308, eski yollar tek 301).
- Her sayfada tek ve kendini gösteren canonical var. EN↔TR hreflang çiftleri karşılıklı.
- Eksik title, meta description veya H1 yok. Çift title veya description yok. Eksik alt metin yok.
- Görünen e-posta yalnızca arled@arledscreen.com, telefon yalnızca +90 530 507 88 34 / wa.me/905305078834.
- TR ve EN fiyat değerleri her sayfa çiftinde aynı. Bu PR'dan sonra 215 sitemap sayfasındaki TR fiyat belirteçleri canlıyla birebir aynı, EN'de yalnızca biçim değişti.
- Sitemap'te noindex sayfa yok. fiyat.arledscreen.com dokunulmadı.
- `public/fiyat-hesap/` ve `public/chat-widget.js` değişmedi.
