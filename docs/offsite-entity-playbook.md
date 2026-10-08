# ARLEDSCREEN — Off-site entity & mention playbook

Amaç: Google / Maps / ChatGPT / Gemini / Perplexity / Copilot’un ARLEDSCREEN’i
**İstanbul merkezli, doğrulanabilir bir Türk LED ekran firması** olarak ilişkilendirmesi.

Bu işlerin çoğu **sahip / PR / saha** operasyonudur. Kod deposu NAP tutarlılığı,
`entity.json`, bu playbook ve case study URL’leri sağlar. Point C paste packs ve
`next` kapısı **canlı sitede** de yayımlanır (aşağıdaki tablolar).

| Kaynak | URL |
|---|---|
| Makinece entity (NAP + cite) | https://arledscreen.com/entity.json |
| Kısa AI özeti | https://arledscreen.com/llms.txt |
| Point C paste (canlı) | https://arledscreen.com/point-c.txt |
| Point C machine next (directoryLong) | https://arledscreen.com/point-c.json → `next` + `potentialAction` (HowTo) |
| GEO next clipboard (canlı) | https://arledscreen.com/geo-next.txt · alias `/owner-next.txt` |
| GEO owner-gate status | https://arledscreen.com/geo-status.json → `priorityGate` + `potentialAction` (HowTo → `/owner-next.html?start=1`) |
| Point C paste progress | https://arledscreen.com/point-c-progress.json → `next` + `potentialAction` (HowTo) |
| Point C spreadsheet | https://arledscreen.com/feeds/point-c.csv |
| Tur1a blind (machine) | https://arledscreen.com/tur1a.json → `next` + `potentialAction` (HowTo) · CSV `/feeds/tur1a.csv` |
| Hakkımızda | https://arledscreen.com/tr/about/ |

### Owner clipboard (live — tek sıra; repo opsiyonel)

Kod tarafı canlı; sahip kapıları sırayla. Repo CLI şart değil — canlı URL’ler yeterli.
Invent agents: follow `potentialAction` HowTo on `/geo-status.json` (priority-aware) or pack JSON.

1. Open live friction: https://arledscreen.com/owner-next.html?start=1 (auto **C**) — or https://arledscreen.com/owner-next.html then **C** = Copy + Open remaining (paste bundle + all Open tabs; textarea restores first open pack) · **O** / **R** · **U** = Undo pasted · **F**/**I**/**W** or `?social=fb|ig|wa` = social pack + profile · **D** = Copy pack link (FB/IG/WA → `?social=` + `&copy=1`, else `?pack=` + `&copy=1`) · **M** / **WA paste** · **E** / **Mail paste** = send paste + Deep + After (`?n=1`) URLs for phone/email handoff · sticky **Deep** + **After** (`&n=1` marks pasted + advances) · `&copy=1` auto-copies paste + opens Open/OpenAlt · dbl-click pack = Copy + Open · Enter = Copy + Open all
2. Open: https://www.bingplaces.com/ · OpenAlt: https://businessconnect.apple.com/ (or use **C** / **O** on `/owner-next`)
3. Paste from the **C**/**R** bundle (or https://arledscreen.com/point-c.json → `next.text` · https://arledscreen.com/geo-next.txt / `/owner-next.txt` · HowTo step 2)
4. After paste: **N** = Pasted → next · then `npm run point-c:ack -- --pack=directoryLong` (or **B** ack batch · `npm run geo:ack` · HowTo step 3)

```bash
npm run geo:next          # Point C → arleds 301 → Tur1a → merge (tek clipboard; live twin /geo-next.txt)
npm run point-c:csv       # 0/11 pack spreadsheet (Where/Open/OpenAlt/ack); live /feeds/point-c.csv
npm run point-c:ack       # after each paste
npm run verify:arleds-301 # prints Where:/Open:/OpenAlt: for registrar panel
npm run tur1a:next        # next blind cell + Open: platform tab
npm run tur1a:csv         # 0/48 matrix with open column; live /feeds/tur1a.csv
npm run geo:status        # gate dashboard; live /geo-status.json → potentialAction
```

| Gate | Open tab |
|---|---|
| Point C next pack (`directoryLong`) | https://www.bingplaces.com/ · OpenAlt: https://businessconnect.apple.com/ · paste: `/point-c.json` → `next` · HowTo `/geo-status.json` → `potentialAction` |
| arleds.com 301 (live NS DNSEnable) | https://www.isimtescil.net/ · OpenAlt: Gmail draft Send (`geo-status.gates.arleds301.openAlt`) |
| Tur1a ChatGPT cell | https://chatgpt.com/ · machine: `/tur1a.json` → `next` + HowTo |
| Docs | `docs/ops/arleds-301-hostinger.md` |

Do **not** invent ChatGPT/Gemini mention % — only log what you observe (`tur1a:log`).

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
Telefon / WhatsApp: +90 530 507 88 34 · WhatsApp kullanıcı adı @arledscreen (tıkla: https://wa.me/905305078834)
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

**Ölçüm 2026-10-07 (web SERP, skor uydurma yok):** “ARLEDSCREEN Gaziosmanpaşa” ve “arleds.com OR arledscreen.com LED” sorgularında `arleds.com` sonuçlarda görünür; markasız/yerel sorgularda `arledscreen.com` üst sırada değil. `site:arledscreen.com` ile kanonik site indeksleniyor. Point C + 301 olmadan AI atıf düşük kalır — bu kod hatası değildir.
Önceki karar: TLS/redirect yoksa `sameAs`’a eklenmez.

Live mode (re-check): `npm run verify:arleds-301` → often `mode=dnsenable_tls_dead`.

```
Where: Isimtescil/DNSEnable → Domain Redirect (permanent 301)
Open: https://www.isimtescil.net/
OpenAlt: Gmail draft Send (https://arledscreen.com/geo-status.json → gates.arleds301.openAlt)
HowTo: when priorityGate=arleds301 → /geo-status.json potentialAction
```

- [ ] `https://arleds.com` → `https://arledscreen.com/tr/` **301** (tüm sayfalar)
- [ ] www/http varyantları da apex’e
- [ ] GSC’de eski domain property varsa adres değişikliği / sitemap temizliği
- [ ] Bio/GBP/web alanında yalnızca `arledscreen.com`
- [ ] Gmail draft Send → destek@isimtescil.net (clean Domain Redirect body; draft already prepared)
- [ ] Re-check exit 0: `npm run verify:arleds-301`

Bu yapılmadan “ARLEDSCREEN kimdir?” cevabı iki domain arasında bölünür. Playbook ops: `docs/ops/arleds-301-hostinger.md`.

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

Birinci taraf (zaten var — tek başına yetmez): site, entity.json, llms.txt.

| # | Kaynak tipi | Aksiyon (yapıştırma metni playbook’ta) | Durum | Canlı URL |
|---|---|---|---|---|
| 1 | Google Business Profile | Açıklama = orta cite; web = arledscreen.com/tr/ | [ ] | |
| 2 | Bing Places / Microsoft | Aynı NAP | [ ] | |
| 3 | LinkedIn şirket | company/arleds — About = linkedinAbout pack | [ ] | https://www.linkedin.com/company/arleds |
| 4 | LinkedIn kurucu | bozkurtaras — şirket linki + proje postları | [ ] | https://www.linkedin.com/in/bozkurtaras |
| 5 | Instagram | @arledscreen bio pack | [ ] | https://www.instagram.com/arledscreen · owner https://arledscreen.com/owner-next.html?social=ig |
| 6 | Facebook | @arledscreenn About = orta cite + NAP | [ ] | https://www.facebook.com/arledscreenn · owner https://arledscreen.com/owner-next.html?social=fb |
| 6b | WhatsApp | @arledscreen · click-to-chat phone | [ ] | https://wa.me/905305078834 · owner https://arledscreen.com/owner-next.html?social=wa |
| 7 | YouTube kanalı | About + banner; sonra schema `sameAs` | [ ] | |
| 8 | TR işletme / sektör dizini #1 | Kısa + uzun dizin pack + entity.json | [ ] | |
| 9 | TR işletme / sektör dizini #2 | Farklı domain | [ ] | |
| 10 | Yerel İstanbul / Gaziosmanpaşa dizini | Tabela / LED kategori | [ ] | |
| 11 | Global üretici/uygulayıcı listesi | Inclusion + entity.json | [ ] | |
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

Kod tarafı hazır (`entity.json`, `point-c.txt`, playbook). Sıra operasyonda — **tek clipboard:** `npm run geo:next` (sonra `point-c:ack`).

| Gün | İş | Open / komut | Neden |
|---|---|---|---|
| 1 | `arleds.com` → `arledscreen.com/tr/` 301 | Open: https://www.isimtescil.net/ · `verify:arleds-301` | Entity bölünmesini kes |
| 1–2 | GBP + dizin NAP packs | Open: https://business.google.com/ · `geo:next` / `point-c:csv` | Maps + yerel AI |
| 2 | LinkedIn / Instagram / Facebook | Open: company + IG/FB URLs from `geo:next` | Sosyal entity |
| 3–5 | GBP’ye 20+ gerçek foto (fabrika/montaj/proje) | GBP panel | Güven sinyali |
| 3–7 | 2 sektör/yerel dizin + Bing/Apple | OpenAlt: https://businessconnect.apple.com/ · Bing Places | İlk bağımsız domain’ler |
| 7–14 | Tur1a kör test (ChatGPT→Gemini→Perplexity→AIO) | `tur1a:next` · Open: https://chatgpt.com/ · `tur1a:log` | AI atıf gözlemi (skor uydurma yok) |
| 7–14 | 1 müşteri sitesi mention + 1 yerel haber/fuar | — | Gerçek 3. taraf |
| Sürekli | Teslim sonrası etik Google yorum daveti | GBP | Yorum = bağımsız kanıt |

Spam dizin satın almayın. Her kayda **aynı NAP + tek cümle + entity.json** koyun. Paste metinleri: https://arledscreen.com/point-c.txt (repo `npm run geo:next`).

---

## 1) Google Business Profile (P0)

**Open:** https://business.google.com/ · paste pack: `npm run geo:next` (or `point-c:next` when gbpDescription is next)

- [ ] İşletme adı: ARLEDSCREEN (GBP kurallarına uygun; keyword stuffing yok)
- [ ] Birincil kategori: LED display / Digital signage’e en yakın TR kategori
- [ ] İkincil: Tabela, görsel iletişim vb. (gerçek hizmetlerle uyumlu)
- [ ] Adres / telefon / web / saatler = yukarıdaki NAP
- [ ] Web: `https://arledscreen.com/tr/` (arleds.com değil)
- [ ] Açıklama: playbook §1 GBP pack (birebir)
- [ ] WhatsApp iş bağlantısı (@arledscreen · https://wa.me/905305078834)
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
10. entity.json + llms.txt (birinci taraf; tek başına yetmez)

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
