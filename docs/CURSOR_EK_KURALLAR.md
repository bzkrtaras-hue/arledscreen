# ARLEDSCREEN · Cursor Agent için ek kurallar (ChatGPT protokolünün 10–33. bölümlerine eklenir)

Bu ek, ChatGPT'nin hazırladığı protokolle birlikte geçerlidir. Çelişki olursa bu ek ve depo kökündeki AGENTS.md önceliklidir.

## A. Yetki ve onay
- Projenin yöneticisi Arledscreen'dir (Grok Bot). "Grok'a danış" geçen her yer Arledscreen demektir.
- Aras Bey'e görev, soru veya "owner gate" çıkarma. Onay gereken her işi Drive'daki APPROVAL_REQUIRED bölümüne yaz; Arledscreen karar verir.
- Yalnızca şunlar Aras Bey'in onayını gerektirir ve Arledscreen tarafından ona iletilir: mesaj, e-posta veya sosyal medya gönderisi; kampanya; para harcayan her işlem.

## B. Değişmez kurallar
- Sitenin arayüzü (tasarım, yerleşim, renkler, tipografi, menü) Aras Bey'in açık onayı olmadan değişmez. Yalnızca metin, SEO ve hata düzeltmeleri yapılır.
- Marka renkleri: #1E5BB8, #0B1B33, #32373C.
- NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; ARLEDSCREEN Türkiye'deki tek satış noktasıdır. "Distribütör" kelimesi ve yiyistar adı sitede geçmez. Slogan: "NXTIONSTAR — görsel gücün küresel standardı."
- Ziyaretçinin gördüğü metinde teknik not, dosya adı, JSON, SKU, "quote-only", "extrasUsd" gibi iç ifadeler bulunmaz. Profil metinleri (Google İşletme, LinkedIn, Instagram, Facebook, Bing) için de aynı kural geçerlidir.
- Her sayfada tek canonical; owner-next ve iç araç sayfaları noindex kalır ve sitemap'e girmez.
- CatDAx, güvenlik başlıkları (CSP) ve e-posta (MX) kayıtları korunur; arledscreen.com DNS'ine dokunulmaz.
- Canlı destek temsilcisinin adı Melis'tir. "Merhaba, ben Melis" ile karşılar; "dijital asistan" veya "dijital temsilci" demez; "bot musun?" sorusunda etiket kullanmadan ekibe WhatsApp'tan bağlamayı önerir; asla "Ben bir insanım" demez. Melis dosyaları (public/fiyat-hesap/index.html, public/chat-widget.js) New Bot'un son sürümünden alınır, üzerine yazılmaz.

## C. Yayın kuralı
- Her değişiklik önce önizleme (preview) ortamında test edilir.
- Canlıya (production) alma günde en fazla bir kez yapılır ve önizleme linki Drive'a yazıldıktan sonra yapılır.
- Canlıya almadan önce ve sonra şu adresler sorunsuz açılmalıdır (yönlendirmeler dahil son durum 200): /, /tr/, /tr/products/, /tr/quote/, /fiyat-hesap/. Mevcut yönlendirmeler (/ → /tr/, /tr/urunler/ → /tr/products/, /tr/iletisim/ → /tr/quote/) korunur. Bozulma olursa hemen bir önceki yayına geri dönülür ve CRITICAL INCIDENT kaydı açılır.
- Arledscreen canlı siteyi 2 saatte bir otomatik denetler; kayıtsız bir yayın görürse CONFLICT olarak işaretler.

## D. İletişim ve kayıt (sadeleştirilmiş)
- Cursor ile Arledscreen arasında canlı sohbet kanalı yoktur. Ortak kanal Drive'dır.
- 6 klasörlü yapı yerine iki doküman yeterlidir:
  1. "ARLEDSCREEN · CURRENT_PROJECT_STATUS" (26. bölümdeki format, en üstte güncel tarih).
  2. "ARLEDSCREEN · CHANGE_LOG" (13. bölümdeki alanlar, ARL-YYYYMMDD-XXX numaralı, en yeni en üstte).
- Mevcut görev panosu dokümanı (Google Doc 1szc0t9Go4EIlLBgHG9b62hNU2cndjzRiACnkkmJumVQ) okunur ve bozulmaz.
- Raporlar kısa tutulur; kotayı raporlamaya değil işe harca. Ekran görüntüsü yalnızca arayüzü etkileyebilecek değişikliklerde alınır.

## E. Ölçüm dürüstlüğü
- Yapay zekâ görünürlük testlerinde (Tur1a) puan yalnızca gerçekten yapılmış bir sorgunun sonucundan verilir; tahmini puan yazılmaz. Yapılamayan hücre "ÖLÇÜLMEDİ" olarak kalır.
- Statü olarak, 15. bölümdeki "IMPLEMENTED – VERIFIED" yerine 17. bölümdeki "LIVE VERIFIED" statüsü kullanılır.

## F. İlk iş
1. AGENTS.md dosyasını depo köküne ekle (Drive: "AGENTS.md (arledscreen depo kurallari)").
2. Drive'daki Melis paketini (arledscreen_cursor_melis) uygula: yalnızca iki dosyayı kopyala, başka dosyaya dokunma.
3. Görünen teknik metinleri temizle, çift canonical'ı tekilleştir, hreflang ekle, "çiip" yazımını "çip" olarak düzelt. Önizlemede test et, Drive'a yaz, sonra canlıya al.
