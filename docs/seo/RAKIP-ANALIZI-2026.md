# ARLEDSCREEN SEO rakip analizi ve kapatılan boşluklar (4 Ekim 2026)

Kapsam: `www.arledscreen.com` → kanonik `https://arledscreen.com/tr/`. Karşılaştırma TR B2B LED ekran rakipleriyle yapıldı (Bitges, LEDORAS, Leddays, LEDAJANS, Ledcraft, Modüler LED, MS Reklam).

---

## 1) Rakip özeti

| Rakip | Güçlü yön | Zayıf / fark |
|---|---|---|
| **LEDAJANS** (İstanbul) | Yoğun blog + “fiyatları 2026” içerikleri, hreflang, JSON-LD, kiralama vurgusu | Ürün lineup / kendi marka + hesaplayıcı derinliği ARLED kadar net değil |
| **Leddays** (İstanbul üretim) | Kiralama + satış tek çatı, FAQ, Türkiye geneli mesajı | Teknik rehber / GEO / llms zayıf |
| **Bitges** (Ankara) | Showroom, teknik servis URL’si, ürün taksonomisi, FAQ + JSON-LD | Canonical/description zayıf; yerel Ankara odaklı |
| **LEDORAS** (Ankara) | Yerel NAP + montaj/servis hikâyesi | JSON-LD/hreflang yok; içerik sığ |
| **Ledcraft** | Çözüm sayfaları (AVM, mağaza, 3D), teknik blog, “sihirbaz” | Farklı konumlama (üretici/aydınlatma mirası) |
| **MS Reklam** | E-ticaret panel fiyatları (TL) | B2B keşif/montaj SEO’su değil; şema zayıf |
| **Modüler LED** | Hizmet URL’leri | Meta/şema zayıf |

**ARLEDSCREEN göreli güçleri (önceden de vardı):** TR kanonik hikâye + 301, Product/Offer JSON-LD, fiyat hesaplayıcı + fiyat rehberi, CitationCapsule + `llms.txt`, NXTIONSTAR marka ayrımı, proje referansları, FAQ yoğunluğu.

---

## 2) Tespit edilen eksikler (öncelik)

| # | Eksik | Rakip sinyali | Aksiyon (bu PR) |
|---|---|---|---|
| 1 | Yerel / şehir landing yok; yerel intent sadece ana sayfa H1 + NAP | Bitges/LEDORAS şehir vurgusu; “İstanbul/Ankara LED ekran” sorguları | `/tr/bolgeler/` hub + kayıtlı iller için il sayfaları |
| 2 | Kiralama vs satın alma karşılaştırma içeriği zayıf | Leddays / LEDAJANS rental içerik | `/tr/rehber/kiralik-mi-satin-alma/` |
| 3 | Süreç HowTo şeması yok | Rakipler FAQ + servis anlatımı | `HowToJsonLd` hizmetler sayfasında |
| 4 | Service `areaServed` yalnızca ülke | Yerel rakipler şehir adı geçiriyor | Kayıtlı iller AdministrativeArea listesi |
| 5 | Şehir tarzı bare URL 301 yok | Rakip/SEO araçları `/istanbul-led-ekran` dener | `_redirects` map |
| 6 | Footer / sitemap’te bölge keşfi yok | — | Footer + sitemap + llms |
| 7 | 3. taraf atıf (GBP, Bing, dizin) | Rakipler Maps/NAP ile görünür | Kod dışı — GEO planı F (sahip aksiyonu) |
| 8 | EN/AR/RU içerik derinliği | LEDAJANS hreflang | Bilinçli TR-first; bu PR’da genişletilmedi |

---

## 3) Bu PR’da eklenen URL’ler

- `https://arledscreen.com/tr/bolgeler/`
- `https://arledscreen.com/tr/bolgeler/{istanbul,antalya,bursa,izmir,eskisehir,...}/` (yalnız referans kaydı olan iller)
- `https://arledscreen.com/tr/rehber/kiralik-mi-satin-alma/`

İnce sayfa yasağı: 81 il spam’i yok; içerik `references.ts` konumlarından türetilir.

---

## 4) Sahip / operasyon (kod dışı)

1. Google Search Console: yeni URL’leri URL Denetimi + sitemap yenile
2. GBP / Bing Places NAP = sitedeki adres birebir
3. Rich Results: Product Offer + yeni HowTo/Service alanları
4. Chat’te paylaşılan Cloudflare token’larını iptal edin

---

## 5) Ölçüm (2–4 hafta)

- Sorgular: `istanbul led ekran`, `gaziosmanpaşa led ekran`, `antalya led ekran`, `kiralık led ekran`, `led ekran montaj`
- GSC: `/tr/bolgeler/*` gösterim/tıklama
- Dönüşüm: quote / WhatsApp / hesaplayıcı
