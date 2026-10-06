---
slug: /tr/rehber/gob-vs-smd/
title: "GOB vs SMD LED Ekran: Farklar, Kullanım, Fiyat ve Seçim Rehberi"
meta_description: "GOB ve standart SMD LED ekran farkı, yayımlanmış 2026 GOB panel USD fiyatları, catalog.json ve seçim rehberi. ARLEDSCREEN — uydurma TL paket yok."
h1: "GOB vs SMD LED ekran: hangisi ne zaman?"
target_queries: ["GOB LED ekran", "SMD LED ekran", "GOB vs SMD", "GOB LED nedir", "GOB LED fiyat", "koruyucu kaplamalı LED"]
schema: [TechArticle, FAQPage, BreadcrumbList]
last_reviewed: 2026-10-05
---

# GOB vs SMD LED ekran: hangisi ne zaman?

**Kısa cevap:** **SMD**, LED diyotların PCB üzerine yüzey montajıyla yerleştirildiği yaygın üretim yöntemidir. **GOB** (Glue on Board), SMD modülün üzerine şeffaf koruyucu bir kaplama uygulanmış varyanttır; yüzey darbeye ve toza daha dayanıklı hale gelir, yakın izlemede noktasal diyot hasarı riski azalır. ARLEDSCREEN her iki yaklaşımı da projelendirir; seçim izleme mesafesi, kullanım yeri ve bakım ihtiyacına göre yazılı teklifle netleşir. Görüş açısı (yatay/dikey) model föyündedir — sabit 140°/160° yayımlanmaz (sabit görüş açısı yok); Gaziosmanpaşa keşif + yazılı teklif.

Bu sayfada abartılı “en dayanıklı / en net” iddiaları yoktur. Amaç: karar için doğru soruları sormak ve yayımlanmış fiyat kaynağına bağlamak.

## 1. SMD nedir?

SMD (Surface Mount Device) LED ekranda her piksel, PCB’ye monte edilmiş kırmızı-yeşil-mavi diyot paketlerinden oluşur. İç mekân ince pitch’ten dış mekân panellere kadar çoğu LED ekranın temel üretim yoludur.

- Tipik kullanım: mağaza, salon, cephe, totem, kiralık sahne
- Avantaj: geniş pitch yelpazesi, yaygın yedek parça ve kontrol ekosistemi
- Dikkat: açık diyot yüzeyi yakın temas ve tozda daha hassas olabilir

Ürün grubu örnekleri: [İç mekân](/tr/products/ic-mekan-led-ekran/), [Dış mekân](/tr/products/dis-mekan-led-ekran/).

## 2. GOB nedir?

GOB, SMD diyotların üzerine uygulanan şeffaf koruyucu kaplamadır. Amaç görüntüyü “farklı bir piksel teknolojisi” yapmak değil; yüzey bütünlüğünü artırmaktır.

- Tipik kullanım: yakın izleme, vitrin, lobi, yoğun yaya trafiği, dokunma/temas riski olan alanlar
- Avantaj: diyotların doğrudan açığa çıkmaması; temizlik ve yüzey dayanımı açısından pratik
- Dikkat: kaplama kalınlığı ve üretim kalitesi modele göre değişir; her ince pitch “GOB” değildir

Ürün grubu: [GOB LED ekran](/tr/products/gob-led-ekran/). İnce pitch modeller için ayrıca [ince pitch](/tr/products/ince-pitch-led-ekran/) sayfasına bakın.

## 3. Ne zaman GOB, ne zaman standart SMD?

| Durum | Tercih yönü |
|---|---|
| İzleyici ekrana çok yakın (vitrin, lobi, showroom) | GOB veya ince pitch GOB adayı |
| Mesafe uzak, dış cephe / billboard | Standart dış mekân SMD panel |
| Sahne / kiralık, sık kur-sök | Kiralık kabin serisi (SMD tabanlı rental) |
| Bütçe ve pitch öncelikli genel mağaza | Standart iç mekân SMD |

Kesin seçim için ölçü, izleme mesafesi ve ortam gerekir. [Piksel aralığı seçimi](/tr/rehber/piksel-araligi-secimi/) rehberi mesafeyi netleştirir; [fiyat hesaplayıcı](/tr/hesaplayici/) panel USD bandını gösterir.

## 4. Yayımlanmış GOB panel fiyatları (2026)

Yalnızca `PANEL_PRICES` / [catalog.json](/catalog.json) kaynağındaki GOB paneller (320 × 160 mm modül, USD, KDV ve nakliye hariç). Uydurma TL paket yoktur.

| Model | Pitch | Panel USD | Ürün sayfası |
|---|---|---|---|
| P1.25 GOB | P1.25 | 95,88 | [p1-25-gob](/tr/products/gob-led-ekran/p1-25-gob/) |
| P1.53 GOB | P1.53 | 62,08 | [p1-53-gob](/tr/products/gob-led-ekran/p1-53-gob/) |
| P1.86 GOB | P1.86 | 49,08 | [p1-86-gob](/tr/products/gob-led-ekran/p1-86-gob/) |

Standart (kaplamasız) iç/dış SMD panel bandı ve m² örnekleri: [LED ekran fiyatları](/tr/led-ekran-fiyatlari/). Ölçünüze göre yaklaşık toplam: [hesaplayıcı](/tr/hesaplayici/). Nihai tutar keşif sonrası [yazılı teklifle](/tr/quote/) kesinleşir.

Kaynaklar: [catalog.json](/catalog.json) · [entity.json](/entity.json) · [fiyat hub](/tr/led-ekran-fiyatlari/).

## 5. Karıştırılmaması gerekenler

- **GOB ≠ COB.** COB farklı bir chip-on-board mimarisidir. Sitede GOB ürün grubu ayrı listelenir; COB’u GOB ile eşitlemeyiz.
- **GOB ≠ “her ince pitch”.** P1.25 gibi ince modeller GOB olabilir veya olmayabilir — model sayfasındaki tanımı esas alın.
- **Kaplama, sihirli IP65 değildir.** Dış mekân dayanımı panelin IP / kabin tasarımına bağlıdır; GOB tek başına dış cephe garantisi değildir.

## 6. Sık sorulan sorular

**GOB LED ekran SMD’den daha mı net?**
Netlik öncelikle pitch ve izleme mesafesine bağlıdır. GOB görüntüyü “büyütmez”; yüzeyi korur. Aynı pitch’te fark, koruma ve yüzey hissidir.

**GOB bakımda avantaj sağlar mı?**
Yüzey temizliğinde ve diyotlara doğrudan temas riskinde pratik avantaj sağlar. Modül değişimi yine modele göre planlanır.

**GOB panel fiyatı ne kadar?**
Yayımlanmış 2026 listesinde iç mekân GOB paneller P1.86 için 49,08 USD, P1.53 için 62,08 USD, P1.25 için 95,88 USD’dir (modül başı, KDV/nakliye hariç). Kaynak: https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/. Nihai tutar ölçü ve montajla yazılı teklifte netleşir.

**Hangi ürün grubundan başlamalıyım?**
Yakın izleme / koruma ihtiyacı varsa [GOB](/tr/products/gob-led-ekran/), genel iç/dış mekân için [iç](/tr/products/ic-mekan-led-ekran/) veya [dış](/tr/products/dis-mekan-led-ekran/) mekân. Belirsizse [teklif](/tr/quote/) veya WhatsApp ile ölçü paylaşın.
