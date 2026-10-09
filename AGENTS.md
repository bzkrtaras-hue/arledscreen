# ARLEDSCREEN depo kuralları (tüm Cursor ajanları için)

Yönetim: Arledscreen (Grok Bot) ekibin genel müdürüdür. Aras Bey'in talimatları ve Arledscreen'in kararları bu dosyanın önündedir.

## 1. Arayüz
- Sitenin arayüzü onaylıdır. Renk, yerleşim, tipografi ve ana sayfa tasarımı Aras Bey onaylamadan DEĞİŞMEZ.
- Marka renkleri: #1E5BB8, #0B1B33, #32373C.

## 2. Marka dili
- NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir.
- "Distribütör" kelimesi kullanılmaz. Tedarikçi ya da üretici sitesi adı (ör. yiyistar) sitede geçmez.
- Slogan: "NXTIONSTAR — görsel gücün küresel standardı."
- Türkçe yazım ve karakterler (ç, ğ, ı, İ, ö, ş, ü) eksiksiz ve doğru olmalı.

## 3. Müşterinin gördüğü metin
- Görünen metinde dosya adı, JSON, kod, değişken adı ya da yapay zekâ ajanlarına yönelik not OLMAZ (ör. ai-shopping.json, pricedPanels, geo-baseline, quote-only, alias).
- Bu bilgiler yalnızca llms.txt, /*.json dosyaları ve JSON-LD içinde durur.
- Fiyat notu sade Türkçe: "Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir."
- owner-next gibi iç araç sayfaları noindex olur, menüde ve site haritasında yer almaz.
- Her sayfada tek bir rel="canonical" bulunur ve sayfanın kendi adresini gösterir.

## 4. Canlı destek: Melis
- Canlı destek danışmanının adı Melis. Karşılama: "Merhaba, ben Melis".
- Müşteriye "dijital asistan" ya da "dijital temsilci" denmez; Melis sıcak, doğal, canlı bir satış danışmanı gibi konuşur. "Ben bir insanım" iddiasında bulunmaz; doğrudan sorulursa WhatsApp'tan ekibe bağlamayı önerir.
- Dosyalar: public/chat-widget.js ve public/fiyat-hesap/index.html. Bu dosyalardaki Melis metinleri, sesli okuma ve sesli sohbet geri ALINMAZ. Fiyatlar ve görünüm bu dosyalarda değiştirilmez.

## 5. Korunacaklar
- Alt kısımdaki MailerLite bülten formu (CatDAx) ve CSP'deki *.mailerlite.com, *.mlcdn.com izinleri olduğu gibi kalır.
- MX ve e-posta DNS kayıtlarına dokunulmaz.

## 6. Yayın
- Her küçük değişiklikte production'a yayın yapılmaz. Denemeler önizleme dalında yapılır; production yayını günde en fazla bir kez, değişiklikler toplanarak yapılır.
- Arledscreen her production yayınını canlıda denetler; site bozulursa son sağlam sürüme geri döner.
