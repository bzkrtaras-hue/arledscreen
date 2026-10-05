# ARLEDSCREEN — Off-site entity & mention playbook

Amaç: Google / Maps / ChatGPT / Gemini / Perplexity / Copilot’un ARLEDSCREEN’i
**İstanbul merkezli, doğrulanabilir bir Türk LED ekran firması** olarak ilişkilendirmesi.

Bu işlerin çoğu **sahip / PR / saha** operasyonudur. Kod deposu yalnızca atıf sayfası,
NAP tutarlılığı, `entity.json` ve case study URL’leri sağlar.

| Kaynak | URL |
|---|---|
| Kanonik atıf sayfası | https://arledscreen.com/tr/basin/ |
| Makinece entity | https://arledscreen.com/entity.json |
| Kısa AI özeti | https://arledscreen.com/llms.txt |

---

## Gap audit (2026-10-05) — Neden C kritik?

Web’de “İstanbul LED ekran” / “ARLEDSCREEN” taramasında:

| Gözlem | Sonuç |
|---|---|
| Kendi site yoğunluğu | Yüksek (45 proje, ürün, fiyat, bölge, teknik) |
| Bağımsız üçüncü taraf | **Zayıf** — çoğunlukla LinkedIn kurucu postları + eski `arleds.com` |
| Rakip görünürlük | Freeled, Led Garaj, LedEkranistanbul vb. kendi sitelerinde entity cümlelerini tekrarlıyor |
| Domain bölünmesi | Aynı telefonla `arleds.com` hâlâ indekste → entity parçalanıyor |

Sonuç: “ARLEDSCREEN kimdir?” cevabı bugün pratikte **birinci taraf** kaynaklara kilitli.
Hedef: aynı abartısız olgunun **10–20 farklı güvenilir domain**’de doğrulanması.

---

## 0) Tek NAP bloğu (her yere aynı yapıştırın)

```text
ARLEDSCREEN
Merkez Mah. Tuna Sok. No:15-17 Kat 1
34245 Gaziosmanpaşa / İstanbul
Telefon / WhatsApp: +90 530 507 88 34
E-posta: arled@arledscreen.com
Web: https://arledscreen.com
TR: https://arledscreen.com/tr/
Basın / NAP: https://arledscreen.com/tr/basin/
entity.json: https://arledscreen.com/entity.json
Harita: https://www.google.com/maps/search/?api=1&query=41.0538876%2C28.9121358
Çalışma: Pazartesi–Cuma 09:00–18:00 · Cumartesi 10:00–15:00
```

Marka yazılışları: **ARLEDSCREEN** (birincil) · ARLED SCREEN · AR-LED Ekran Teknoloji Merkezi  
Ürün markası: **NXTIONSTAR** (ARLEDSCREEN’in kendi markası; TR tek satış noktası ARLEDSCREEN)

Karıştırma yasağı: Almanya ARLED Solutions GmbH / ARLED Cinema · Next&NextStar (NEXTSTAR) TV · NationStar

---

## 0b) Domain birleştirme (kritik entity notu)

Aynı telefon (+90 530 507 88 34) ile görünen eski/yan site **arleds.com** hâlâ indekste rakip/kafa karışıklığı yaratabilir.
Önceki karar: TLS/redirect yoksa `sameAs`’a eklenmez.

- [ ] `https://arleds.com` → `https://arledscreen.com/tr/` **301** (tüm sayfalar)
- [ ] www/http varyantları da apex’e
- [ ] GSC’de eski domain property varsa adres değişikliği / sitemap temizliği
- [ ] Bio/GBP/web alanında yalnızca `arledscreen.com`

Bu yapılmadan “ARLEDSCREEN kimdir?” cevabı iki domain arasında bölünür.

---

## 0c) Hedef atıf cümlesi (10–20 kaynakta aynı olgu)

Abartısız, kopyalanabilir (site `/tr/basin/` ve `entity.json` ile birebir):

```text
ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve
teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır.
Kaynak özeti: https://arledscreen.com/tr/basin/
```

Daha uzun varyantlar: https://arledscreen.com/tr/basin/ → “Üçüncü taraf profiller için yapıştırma metinleri”

---

## 0d) 20 bağımsız kaynak takip listesi

Birinci taraf (zaten var — tek başına yetmez): site, basin, entity.json, llms.txt.

| # | Kaynak tipi | Aksiyon (yapıştırma metni basin’de) | Durum | Canlı URL |
|---|---|---|---|---|
| 1 | Google Business Profile | Açıklama = orta cite; web = arledscreen.com/tr/ | [ ] | |
| 2 | Bing Places / Microsoft | Aynı NAP | [ ] | |
| 3 | LinkedIn şirket | company/arleds — About = linkedinAbout pack | [ ] | https://www.linkedin.com/company/arleds |
| 4 | LinkedIn kurucu | bozkurtaras — şirket linki + proje postları | [ ] | https://www.linkedin.com/in/bozkurtaras |
| 5 | Instagram | @arledscreen bio pack | [ ] | https://www.instagram.com/arledscreen |
| 6 | Facebook | arledscreenn About = orta cite + NAP | [ ] | https://www.facebook.com/arledscreenn |
| 7 | YouTube kanalı | About + banner; sonra schema `sameAs` | [ ] | |
| 8 | TR işletme / sektör dizini #1 | Kısa + uzun dizin pack + basin link | [ ] | |
| 9 | TR işletme / sektör dizini #2 | Farklı domain | [ ] | |
| 10 | Yerel İstanbul / Gaziosmanpaşa dizini | Tabela / LED kategori | [ ] | |
| 11 | Global üretici/uygulayıcı listesi | Inclusion + basin | [ ] | |
| 12 | Haber / fuar notu #1 | Müşteri onaylı; tek cümle + link | [ ] | |
| 13 | Haber #2 | Farklı yayın | [ ] | |
| 14 | Müşteri web referansı #1 | “LED ekran: ARLEDSCREEN” + link | [ ] | |
| 15 | Müşteri referansı #2 | Farklı domain | [ ] | |
| 16 | PDF datasheet / 3. taraf katalog cite | Gerçek föy; site + dış cite | [ ] | |
| 17 | Ticaret/fuar katılımcı listesi | İsim + URL | [ ] | |
| 18 | ProAV / mimarlık / yerel basın | Proje özeti | [ ] | |
| 19 | Apple Maps / ek harita dizini | NAP aynı | [ ] | |
| 20 | Wikidata **yalnızca** notability varsa | Zorlamayın | [ ] opsiyonel | |

**Başarı ölçütü:** “ARLEDSCREEN kimdir?” sorusunda **kendi siteniz dışında ≥5–10 güvenilir URL** aynı olguyu taşır; ideal 10–20.

---

## 0e) İlk 14 gün — sahip aksiyon sırası (P0)

Kod tarafı hazır (`/tr/basin/`, `entity.json`, playbook). Sıra operasyonda:

| Gün | İş | Neden |
|---|---|---|
| 1 | `arleds.com` → `arledscreen.com/tr/` 301 | Entity bölünmesini kes |
| 1–2 | GBP oluştur/doldur: kategori, NAP, saat, WhatsApp, web, orta cite | Maps + yerel AI |
| 2 | LinkedIn şirket About + kurucu Featured’a basin link | Sosyal entity |
| 2 | Instagram bio + Facebook About aynı pack | Tutarlılık |
| 3–5 | GBP’ye 20+ gerçek foto (fabrika/montaj/proje) | Güven sinyali |
| 3–7 | 2 sektör/yerel dizin başvurusu (aşağıdaki e-posta) | İlk bağımsız domain’ler |
| 7–14 | 1 müşteri sitesi mention + 1 yerel haber/fuar denemesi | Gerçek 3. taraf |
| Sürekli | Teslim sonrası etik Google yorum daveti | Yorum = bağımsız kanıt |

Spam dizin satın almayın. Her kayda **aynı NAP + tek cümle + basin URL** koyun.

---

## 1) Google Business Profile (P0)

- [ ] İşletme adı: ARLEDSCREEN (GBP kurallarına uygun; keyword stuffing yok)
- [ ] Birincil kategori: LED display / Digital signage’e en yakın TR kategori
- [ ] İkincil: Tabela, görsel iletişim vb. (gerçek hizmetlerle uyumlu)
- [ ] Adres / telefon / web / saatler = yukarıdaki NAP
- [ ] Web: `https://arledscreen.com/tr/` (arleds.com değil)
- [ ] Açıklama: basin “Kısa” veya “Orta” pack (birebir)
- [ ] WhatsApp iş bağlantısı
- [ ] Hizmetler: LED ekran satışı, montaj, kiralama, teknik servis, keşif
- [ ] Ürünler: iç/dış, GOB, esnek, kiralık (site URL’leriyle)
- [ ] 50+ gerçek foto: fabrika/atölye, montaj, proje, ekip, araç (stok yok)
- [ ] Her yeni case study sonrası 1 GBP post + foto
- [ ] Q&A: fiyat nasıl hesaplanır, keşif var mı, hangi iller (81 il iddiası yok)

### GBP açıklama (yapıştır)

```text
ARLEDSCREEN (AR-LED Ekran Teknoloji Merkezi), İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satışı ile keşif, montaj ve teknik servis sunar.

https://arledscreen.com/tr/
```

---

## 2) Müşteri yorumları (etik)

Montaj tesliminden 3–7 gün sonra WhatsApp:

```text
Merhaba {isim}, {şehir} LED ekran kurulumumuz tamamlandı.
Deneyiminizi Google’da kısa bir yorumla paylaşmak ister misiniz?
{GBP_REVIEW_LINK}

İsterseniz şunlardan bahsedebilirsiniz: süreç nasıldı, ekip, ekranın kullanımı.
Anahtar kelime yazmanıza gerek yok — kendi cümleleriniz yeterli.
```

- [ ] Review link’i GBP’den alın; müşteriye keyword dayatmayın
- [ ] Her yoruma 24–48 saatte insan yanıtı
- [ ] Sahte / satın alınmış yorum yok
- [ ] Schema’ya AggregateRating eklemeyin (yeterli, doğrulanmış set yoksa)

---

## 3) LinkedIn / Instagram / YouTube

### LinkedIn şirket About (yapıştır)

```text
ARLEDSCREEN (AR-LED Ekran Teknoloji Merkezi), İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satışı ile keşif, montaj ve teknik servis sunar.

Web: https://arledscreen.com/tr/
Basın / NAP: https://arledscreen.com/tr/basin/
Telefon: +90 530 507 88 34
```

### Instagram bio (yapıştır)

```text
İstanbul LED ekran · NXTIONSTAR · Satış + montaj + servis
arledscreen.com/tr/
```

Her major proje için aynı paket:

1. Case study URL (`/tr/projelerimiz/...`)
2. LinkedIn şirket + kurucu post (ölçü, şehir, tarih — abartı yok)
3. Instagram carousel / Reel
4. YouTube Short + uzun montaj (transcript ile); kanal açılınca `sameAs` + `/tr/basin/` güncelle
5. GBP post

Şablon cümle:

```text
{Şehir} — {müşteri/etiket}: {ölçü} {pitch?} LED ekran.
Keşif + montaj: ARLEDSCREEN.
Detay: {case-study-url}
```

---

## 4) Sektör portalları / üretici listeleri / dizinler

Hedef tip (spam directory satın almayın):

| Tip | Örnek aksiyon | Anchor |
|---|---|---|
| TR LED / AV / işletme portalı | Listeye başvuru + basin | ARLEDSCREEN |
| Yerel işletme | Gaziosmanpaşa / İstanbul dijital tabela | ARLEDSCREEN İstanbul |
| Ticaret / fuar | Katılımcı listesi, basın bülteni | ARLEDSCREEN |
| Mimarlık / ProAV | Proje özeti gönderimi | proje adı + ARLEDSCREEN |
| Global LED listeleri | Düzeltme / inclusion + basin | ARLEDSCREEN |

Başvuru e-postası:

```text
Konu: Liste güncelleme — ARLEDSCREEN (İstanbul LED ekran)

Merhaba,
Türkiye LED ekran uygulayıcı/üretici listenize ARLEDSCREEN’i eklemenizi veya
mevcut kaydı düzeltmenizi rica ederiz.

Kısa özet:
ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve
teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır.

Doğrulama: https://arledscreen.com/tr/basin/
Makinece: https://arledscreen.com/entity.json
Web: https://arledscreen.com/tr/
Telefon: +90 530 507 88 34
NAP ve sosyal profiller basin sayfasında birebir.

Teşekkürler
Aras Bozkurt
+90 530 507 88 34
```

---

## 5) Haber / proje PR

- [ ] Belediye / otel / AVM projelerinde müşteri onayıyla kısa haber
- [ ] Yerel İstanbul / Gaziosmanpaşa basını
- [ ] Fuar / Ordu Günleri tipi etkinlik sonrası 1 haber + case study linki
- [ ] PDF teknik föy (gerçek datasheet) → `public/docs/` + ürün sayfasından link

Haber için önerilen cümle (müşteri onayıyla):

```text
LED ekran uygulaması ARLEDSCREEN (İstanbul Gaziosmanpaşa) tarafından gerçekleştirildi.
https://arledscreen.com/tr/basin/
```

---

## 6) Müşteri sitesi referansları

Teslim mailine ek:

```text
İsterseniz web sitenize kısa bir referans satırı ekleyebilirsiniz:
“LED ekran uygulaması: ARLEDSCREEN — https://arledscreen.com”
```

- [ ] Zorlamayın; onaylı müşterilerde sorun
- [ ] Karşılıklı link şeması / PBN yok

---

## 7) AI / GEO için “10–20 bağımsız kaynak” hedefi

Aynı cümlenin çeşitleri (abartısız) şuralarda görünsün:

1. GBP  
2. LinkedIn şirket  
3. Instagram bio  
4. Facebook  
5. YouTube About (kanal açılınca)  
6. 3–5 sektör/dizin kaydı  
7. 2–3 haber / fuar  
8. 2+ müşteri sitesi mention  
9. Bing Places (varsa)  
10. basin + entity.json + llms.txt (birinci taraf; tek başına yetmez)

Kontrol soruları (ayda bir, tarayıcı/incognito + Perplexity/ChatGPT):

- “ARLEDSCREEN kimdir?”
- “İstanbul Gaziosmanpaşa LED ekran firması”
- “NXTIONSTAR LED ekran Türkiye”

Beklenen: kendi site dışında en az birkaç URL aynı NAP/olguyu taşır.

---

## 8) Yapılmayacaklar

- Sahte yorum, sahte backlink paketi, keyword stuffing GBP adı
- 81 il doorway
- “Türkiye’nin en büyüğü / en çok tercih edilen”
- Olmayan YouTube / sertifika / rating’i schema’ya yazmak
- arleds.com’u `sameAs`’a eklemek (301 olmadan)
