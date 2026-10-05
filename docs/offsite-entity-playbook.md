# ARLEDSCREEN — Off-site entity & mention playbook

Amaç: Google / Maps / ChatGPT / Gemini / Perplexity / Copilot’un ARLEDSCREEN’i
**İstanbul merkezli, doğrulanabilir bir Türk LED ekran firması** olarak ilişkilendirmesi.

Bu işlerin çoğu **sahip / PR / saha** operasyonudur. Kod deposu NAP tutarlılığı,
`entity.json`, bu playbook ve case study URL’leri sağlar. Yapıştırma metinleri **sitede
yayımlanmaz** — yalnızca burada.

| Kaynak | URL |
|---|---|
| Makinece entity (NAP + cite) | https://arledscreen.com/entity.json |
| Point C paste packs | https://arledscreen.com/entity-profiles.json |
| Merge-gün checklist | [`point-c-merge-day.md`](./point-c-merge-day.md) |
| Kısa AI özeti | https://arledscreen.com/llms.txt |
| Hakkımızda | https://arledscreen.com/tr/about/ |

### P0 — Canlı entity / catalog yayın (doğrulama 2026-10-05)

| URL | Canlı | Not |
|-----|-------|-----|
| `/llms.txt` | 200 | OK |
| `/entity.json` | **404** (Next soft-404 HTML) | Repo’da var; prod artifact eksik → **PR #55 merge + CF Pages redeploy** |
| `/catalog.json` | **404** | AI alışveriş branch’inde; merge sonrası |
| `/.well-known/ard.json` | **404** | Aynı |
| Ana sayfa Organization `sameAs` | IG + FB + LinkedIn | `arleds.com` yok (doğru; 301 yokken eklenmez) |
| Canlı `disambiguatingDescription` | Eski/kısmi | Repo’da Almanya ARLED Solutions + NEXTSTAR/NationStar tam; redeploy ile güncellenir |

Build: `npm run entity` + `npm run audit:entity` (postbuild).

### Point C durum panosu (2026-10-05 — site hazır / sahip bekliyor)

| Katman | Durum | Kanıt / blok |
|--------|-------|--------------|
| A — Birinci taraf kimlik | **Kod hazır** | `entity.json`, `llms.txt`, About cite, NAP footer |
| B — Makinece alışveriş | **Kod hazır, canlı değil** | `catalog.json` + `ard.json` + Offer audit → **PR #55 merge** |
| C — Bağımsız atıf | **Sahip** | GBP + dizin + LinkedIn/IG/FB pack (§0d tracker) |
| Spam koruması | **OK** | 81 il kapısı yok; AggregateRating yok; quote-only Offer yok |

**Bu hafta sahip sırası (blokaj sırasına göre):**
1. PR #55 merge + Cloudflare Pages redeploy → entity/catalog/ard **200** doğrula
2. `arleds.com` → `arledscreen.com/tr/` 301
3. GBP doldur (§1 pack birebir) + IG/FB/LinkedIn About
4. 2 sektör/yerel dizin başvurusu (§4 e-posta)
5. İlk müşteri mention veya yerel haber denemesi

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

Abartısız, kopyalanabilir (`entity.json` ile birebir):

```text
ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve
teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır.
Kaynak: https://arledscreen.com/entity.json
```

Daha uzun varyantlar: bu dosyada §1 GBP, §3 LinkedIn/Instagram pack’leri.

---

## 0d) 20 bağımsız kaynak takip listesi

Birinci taraf (kod hazır — tek başına Point C sayılmaz): site, `entity.json`, `llms.txt`, `catalog.json`, `ard.json`.
Canlı 200 için **PR #55 merge + CF redeploy** gerekir (2026-10-05’te entity/catalog/ard soft-404).

| # | Kaynak tipi | Aksiyon | Site hazır | Sahip durum | Canlı URL |
|---|---|---|---|---|---|
| 1 | Google Business Profile | Açıklama = orta cite; web = arledscreen.com/tr/ | Pack §1 | [ ] | |
| 2 | Bing Places / Microsoft | Aynı NAP | Pack §0 | [ ] | |
| 3 | LinkedIn şirket | company/arleds — About = linkedin pack | Pack §3 | [ ] profil var | https://www.linkedin.com/company/arleds |
| 4 | LinkedIn kurucu | bozkurtaras — şirket linki + proje postları | Case study citeOneLiner | [ ] profil var | https://www.linkedin.com/in/bozkurtaras |
| 5 | Instagram | @arledscreen bio pack | Pack §3 + sameAs | [ ] | https://www.instagram.com/arledscreen |
| 6 | Facebook | arledscreenn About = orta cite + NAP | Pack §3 + sameAs | [ ] | https://www.facebook.com/arledscreenn |
| 7 | YouTube kanalı | About + banner; sonra schema `sameAs` | Pack youtubeAbout | [ ] kanal yok | |
| 8 | TR işletme / sektör dizini #1 | Kısa + uzun dizin pack + entity.json | §4 e-posta | [ ] | |
| 9 | TR işletme / sektör dizini #2 | Farklı domain | §4 e-posta | [ ] | |
| 10 | Yerel İstanbul / Gaziosmanpaşa dizini | Tabela / LED kategori | §4 | [ ] | |
| 11 | Global üretici/uygulayıcı listesi | Inclusion + entity.json | §4 | [ ] | |
| 12 | Haber / fuar notu #1 | Müşteri onaylı; tek cümle + link | §5 cümle | [ ] | |
| 13 | Haber #2 | Farklı yayın | §5 | [ ] | |
| 14 | Müşteri web referansı #1 | “LED ekran: ARLEDSCREEN” + link | §6 mail | [ ] | |
| 15 | Müşteri referansı #2 | Farklı domain | §6 | [ ] | |
| 16 | PDF datasheet / 3. taraf katalog cite | Gerçek föy; site + dış cite | [ ] föy yok | [ ] | |
| 17 | Ticaret/fuar katılımcı listesi | İsim + URL | §4 | [ ] | |
| 18 | ProAV / mimarlık / yerel basın | Proje özeti | §5 | [ ] | |
| 19 | Apple Maps / ek harita dizini | NAP aynı | Pack §0 | [ ] | |
| 20 | Wikidata **yalnızca** notability varsa | Zorlamayın | — | [ ] opsiyonel | |

**Başarı ölçütü:** “ARLEDSCREEN kimdir?” sorusunda **kendi siteniz dışında ≥5–10 güvenilir URL** aynı olguyu taşır; ideal 10–20.

**Sayaç (2026-10-05):** bağımsız tamamlanan = **0** · profil URL’si var ama About pack henüz doğrulanmadı = 3 (LI şirket, LI kurucu, IG/FB) · birinci taraf canlı = llms.txt only.

---

## 0e) İlk 14 gün — sahip aksiyon sırası (P0)

Kod tarafı hazır (`entity.json`, catalog, ard, playbook, case study cite). Sıra operasyonda:

| Gün | İş | Neden | Blok |
|---|---|---|---|
| 0 | **PR #55 merge + CF Pages redeploy**; `entity.json` / `catalog.json` / `ard.json` **200** doğrula | Ajanlar kimlik+fiyat okuyabilsin | Deploy |
| 1 | `arleds.com` → `arledscreen.com/tr/` 301 | Entity bölünmesini kes | DNS/hosting |
| 1–2 | GBP oluştur/doldur: kategori, NAP, saat, WhatsApp, web, orta cite | Maps + yerel AI | Sahip |
| 2 | LinkedIn şirket About + kurucu Featured’a entity.json | Sosyal entity | Sahip |
| 2 | Instagram bio + Facebook About aynı pack | Tutarlılık | Sahip |
| 3–5 | GBP’ye 20+ gerçek foto (fabrika/montaj/proje) | Güven sinyali | Sahip |
| 3–7 | 2 sektör/yerel dizin başvurusu (aşağıdaki e-posta) | İlk bağımsız domain’ler | Sahip |
| 7–14 | 1 müşteri sitesi mention + 1 yerel haber/fuar denemesi | Gerçek 3. taraf | Sahip |
| Sürekli | Teslim sonrası etik Google yorum daveti | Yorum = bağımsız kanıt | Sahip |

Spam dizin satın almayın. Her kayda **aynı NAP + tek cümle + entity.json** koyun.

---

## 1) Google Business Profile (P0)

- [ ] İşletme adı: ARLEDSCREEN (GBP kurallarına uygun; keyword stuffing yok)
- [ ] Birincil kategori: LED display / Digital signage’e en yakın TR kategori
- [ ] İkincil: Tabela, görsel iletişim vb. (gerçek hizmetlerle uyumlu)
- [ ] Adres / telefon / web / saatler = yukarıdaki NAP
- [ ] Web: `https://arledscreen.com/tr/` (arleds.com değil)
- [ ] Açıklama: playbook §1 GBP pack (birebir)
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
Doğrulama: https://arledscreen.com/entity.json
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
Doğrulama: https://arledscreen.com/entity.json
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
4. YouTube Short + uzun montaj (transcript ile); kanal açılınca `sameAs` güncelle
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
| TR LED / AV / işletme portalı | Listeye başvuru + entity.json | ARLEDSCREEN |
| Yerel işletme | Gaziosmanpaşa / İstanbul dijital tabela | ARLEDSCREEN İstanbul |
| Ticaret / fuar | Katılımcı listesi, basın bülteni | ARLEDSCREEN |
| Mimarlık / ProAV | Proje özeti gönderimi | proje adı + ARLEDSCREEN |
| Global LED listeleri | Düzeltme / inclusion + entity.json | ARLEDSCREEN |

Başvuru e-postası:

```text
Konu: Liste güncelleme — ARLEDSCREEN (İstanbul LED ekran)

Merhaba,
Türkiye LED ekran uygulayıcı/üretici listenize ARLEDSCREEN’i eklemenizi veya
mevcut kaydı düzeltmenizi rica ederiz.

Kısa özet:
ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve
teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır.

Doğrulama: https://arledscreen.com/entity.json
Web: https://arledscreen.com/tr/
Telefon: +90 530 507 88 34
NAP bu playbook §0 bloğu ile birebir.

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
https://arledscreen.com/entity.json
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
10. entity.json + catalog.json + llms.txt + ard.json (birinci taraf; tek başına yetmez)

Kontrol soruları (ayda bir, tarayıcı/incognito + Perplexity/ChatGPT):

- “ARLEDSCREEN kimdir?”
- “İstanbul Gaziosmanpaşa LED ekran firması”
- “NXTIONSTAR LED ekran Türkiye”
- “LED ekran panel fiyatı USD ARLEDSCREEN” → beklenen: catalog.json / led-ekran-fiyatlari

Beklenen: kendi site dışında en az birkaç URL aynı NAP/olguyu taşır; fiyat sorusunda uydurma TL paket yok.

---

## 8) Yapılmayacaklar

- Sahte yorum, sahte backlink paketi, keyword stuffing GBP adı
- 81 il doorway
- “Türkiye’nin en büyüğü / en çok tercih edilen”
- Olmayan YouTube / sertifika / rating’i schema’ya yazmak
- arleds.com’u `sameAs`’a eklemek (301 olmadan)
