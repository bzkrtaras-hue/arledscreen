# ARLEDSCREEN — Off-site entity & mention playbook

Amaç: Google / Maps / ChatGPT / Gemini / Perplexity / Copilot’un ARLEDSCREEN’i
**İstanbul merkezli, doğrulanabilir bir Türk LED ekran firması** olarak ilişkilendirmesi.

Bu işlerin çoğu **sahip / PR / saha** operasyonudur. Kod deposu yalnızca atıf sayfası,
NAP tutarlılığı ve case study URL’leri sağlar.

Kanonik atıf sayfası: https://arledscreen.com/tr/basin/  
Kısa AI özeti: https://arledscreen.com/llms.txt

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

Abartısız, kopyalanabilir:

```text
ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve
teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır.
Kaynak özeti: https://arledscreen.com/tr/basin/
```

---

## 0d) 20 bağımsız kaynak takip listesi

Birinci taraf (zaten var — tek başına yetmez): site, llms.txt, basin, LinkedIn şirket, Instagram, Facebook.

| # | Kaynak tipi | Örnek / aksiyon | Durum |
|---|---|---|---|
| 1 | Google Business Profile | Dolu profil + foto + hizmetler | [ ] |
| 2 | Bing Places / Microsoft | Aynı NAP | [ ] |
| 3 | LinkedIn şirket | company/arleds — About = atıf cümlesi | [ ] |
| 4 | LinkedIn kurucu | bozkurtaras — şirket linki + proje postları | [ ] |
| 5 | Instagram | @arledscreen bio + site | [ ] |
| 6 | Facebook | arledscreenn About = NAP | [ ] |
| 7 | YouTube kanalı | About + banner; sonra `sameAs` | [ ] |
| 8 | TR LED/AV portal listesi | Inclusion + basin link | [ ] |
| 9 | Global üretici listesi (örn. LEGIDATECH tipi) | Düzeltme/ekleme talebi | [ ] |
| 10 | Yerel İstanbul işletme dizini | Gaziosmanpaşa / tabela kategorisi | [ ] |
| 11 | 2. yerel / sektör dizini | Farklı domain | [ ] |
| 12 | Haber / fuar notu | Ordu Günleri, belediye, otel — müşteri onaylı | [ ] |
| 13 | 2. haber | Farklı yayın | [ ] |
| 14 | Müşteri web referansı | “LED ekran: ARLEDSCREEN” + link | [ ] |
| 15 | 2. müşteri referansı | Farklı domain | [ ] |
| 16 | PDF datasheet host | `arledscreen.com` + 3. taraf katalogda cite | [ ] |
| 17 | Ticaret/fuar katılımcı listesi | İsim + URL | [ ] |
| 18 | ProAV / mimarlık yayını | Proje özeti | [ ] |
| 19 | Harita/ek dizin (Apple/Maps uyumu) | NAP aynı | [ ] |
| 20 | Wikidata **yalnızca** notability varsa | Zorlamayın; yoksa atlayın | [ ] opsiyonel |

Başarı ölçütü: “ARLEDSCREEN kimdir?” / “İstanbul LED ekran firmaları” sorusunda **kendi siteniz dışında ≥5–10 güvenilir URL** aynı olguyu taşır.

---

## 1) Google Business Profile (P0)

- [ ] İşletme adı: ARLEDSCREEN (GBP kurallarına uygun; keyword stuffing yok)
- [ ] Birincil kategori: LED display / Digital signage’e en yakın TR kategori
- [ ] İkincil: Tabela, görsel iletişim vb. (gerçek hizmetlerle uyumlu)
- [ ] Adres / telefon / web / saatler = yukarıdaki NAP
- [ ] WhatsApp iş bağlantısı
- [ ] Hizmetler: LED ekran satışı, montaj, kiralama, teknik servis, keşif
- [ ] Ürünler: iç/dış, GOB, esnek, kiralık (site URL’leriyle)
- [ ] 50+ gerçek foto: fabrika/atölye, montaj, proje, ekip, araç (stok yok)
- [ ] Her yeni case study sonrası 1 GBP post + foto
- [ ] Q&A: fiyat nasıl hesaplanır, keşif var mı, hangi iller (81 il iddiası yok)

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
| TR LED / AV portal | “Türkiye LED üretici/uygulayıcı listesi”ne başvuru | ARLEDSCREEN |
| Yerel işletme | Gaziosmanpaşa / İstanbul dijital tabela dizinleri | ARLEDSCREEN İstanbul |
| Ticaret / fuar | İTONU, fuar katılımcı listesi, basın bülteni | ARLEDSCREEN |
| Mimarlık / ProAV | Proje özeti gönderimi | proje adı + ARLEDSCREEN |
| LEGIDATECH vb. global listeler | Düzeltme / inclusion talebi + `/tr/basin/` linki | ARLEDSCREEN |

Başvuru e-postası:

```text
Konu: Liste güncelleme — ARLEDSCREEN (İstanbul LED ekran)

Merhaba,
Türkiye LED ekran uygulayıcı/üretici listenize ARLEDSCREEN’i eklemenizi veya
mevcut kaydı düzeltmenizi rica ederiz.

Kısa özet: https://arledscreen.com/tr/basin/
Web: https://arledscreen.com/tr/
NAP ve sosyal profiller sayfada birebir.

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
10. llms.txt + /tr/basin/ (birinci taraf; tek başına yetmez)

Başarı ölçütü: “İstanbul LED ekran firmaları” / “Türkiye LED ekran üreticileri”
sorularında **kendi siteniz dışında** en az birkaç güvenilir kaynakta isim geçmesi.

---

## 8) Yapılmayacaklar

- Sahte yorum, sahte backlink paketi, keyword stuffing GBP adı
- 81 il doorway
- “Türkiye’nin en büyüğü / en çok tercih edilen”
- Olmayan YouTube / sertifika / rating’i schema’ya yazmak
