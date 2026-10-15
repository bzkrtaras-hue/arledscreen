# ARLEDSCREEN · Devir belgesi

Bu dosya, "Devir notları" bölümüne her işin sonunda tarihli not eklemek içindir. En yeni not üstte.
Resmî belge Google Drive'daki devir belgesidir; bu dosya depodaki PR'ların izidir.

## Devir notları

### 15 Ekim 2026 — Hata taraması (PR: fix/hata-taramasi-1015)

**Yapan:** Grok Bot (Aras Bozkurt adına). Yayın yapılmadı; yalnızca PR + önizleme.
**Önizleme (production değil):** https://hata-1015-preview.arledscreen.pages.dev

**Ne taradım:** canlı site (sitemap'teki 272 adres, hepsi 200), main'den üretilen 462 HTML sayfa (kırık iç bağlantı, eksik/yinelenen title ve H1, canonical, hreflang, görsel, JSON-LD, e-posta ve telefon, yasak kelimeler, görünür iç not), 7 indekslenebilir Arapça sayfa (#110), tarayıcı konsolu (CSP dâhil), harici bağlantılar.

**Düzeltilenler (bu PR):**
1. Arapça ve Rusça sayfalarda üst çubuktaki "Teklif" düğmesi var olmayan `/ar/contact/` ve `/ru/contact/` adreslerine gidiyordu (404 + her sayfada konsol hatası, 65 sayfa). Artık `/ar/quote/` ve `/ru/quote/`. TR/EN davranışı aynı. Arapça düğme etiketi Arapça, Rusça etiket sözlükteki "Запросить КП".
2. Arapça sayfalarda alt bilgide telefon ters görünüyordu ("34 88 507 530 90+"). Telefon artık "+90 530 507 88 34" (üst menüdeki çekmece ve /ar/quote/ dâhil). Numara ve diğer bilgiler değişmedi.
3. Arapça sayfaların alt bilgisi İngilizceydi (bülten başlığı ve açıklaması, "Contact", "View on map", "Message on WhatsApp"); Arapçaya çevrildi. Çalışma saatleri aynı (Pzt–Cum 09:00–18:00, Cmt 10:00–15:00), Arapça etiketli ve rakamlar sola doğru okunur.
4. `/en/search/` sayfasında hreflang x-default olmayan `/tr/search/` adresini gösteriyordu (404). Sayfa noindex; hreflang kaldırıldı (TR arama sayfası `/tr/ara/`).
5. "Çelik kasa daha ucuz" ifadesi EN, AR ve RU CNC kasa rehberinde "ucuz" kelimesini kullanıyordu; TR'deki gibi nötr ("daha ekonomik" / "daha az maliyetli") yapıldı.

**Dokunulmadı (bilerek):** ana sayfa (metin, meta, görsel, CSS aynı), fiyatlar, hesaplayıcı (`/fiyat-hesap/` md5 4ce8b79d02126b5fd04af2ed88b36941 aynı), Melis sohbeti, CSS (dosya özetleri aynı), MailerLite formu.

**Aras'ın kararı veya bilgisi gereken açık işler:**
- Bülten formu (MailerLite `CatDAx`) canlıda boş: form kimliği MailerLite'ta 404 dönüyor ve CSP `style-src` MailerLite stilini engelliyor. Yeni gömme kodu ve CSP izni gerekiyor.
- Kiralık fiyat: ana kodda TR/EN sayfalar "fiyat teklifle verilir" (PR #108) diyor; kural 50 USD/m²/gün. Hangisi doğru, Aras karar verecek.
- Açık PR'lar (#100, #102, #104, #105, #107) merge edilmedi; durum PR açıklamasında.
