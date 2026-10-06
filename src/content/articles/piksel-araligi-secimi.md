---
slug: /tr/rehber/piksel-araligi-secimi/
title: "İç Mekân LED Ekranda Piksel Aralığı Nasıl Seçilir? (P1.25 – P4 Rehberi)"
meta_description: "Piksel aralığı (P değeri) nedir, izleme mesafesine göre nasıl seçilir? P1.25–P5, catalog.json panel USD ve AI alışveriş kaynakları. ARLEDSCREEN."
h1: "İç mekân LED ekran seçerken piksel aralığı nasıl belirlenir?"
target_queries: ["piksel aralığı nedir", "LED ekran piksel aralığı seçimi", "P2.5 mi P4 mü", "iç mekan LED ekran hangi P", "LED ekran izleme mesafesi", "P1.86 LED ekran", "LED ekran çözünürlük hesaplama"]
schema: [TechArticle, FAQPage (yalnızca sayfada görünen S&C), BreadcrumbList, HowTo kullanmayın]
last_reviewed: 2026-10-05
---

# İç mekân LED ekran seçerken piksel aralığı nasıl belirlenir?

**Kısa cevap:** Piksel aralığını belirleyen ilk ölçüt **izleyicinin ekrana en yakın mesafesidir**. Pratik başlangıç tahmini (garanti değil): her 1 mm piksel aralığı için yaklaşık **1 m izleme mesafesi** konuşulabilir (P2.5 ≈ 2,5 m, P4 ≈ 4 m) — «1 mm = 1 m garanti» veya sabit minimum mesafe yoktur. Kesin pitch Gaziosmanpaşa keşif + yazılı teklifte; ardından ekran ölçüsü, içerik ve bütçe birlikte değerlendirilir. ARLEDSCREEN iç mekânda P1.25'ten P4'e kadar modüller sunar; dış mekân P2.5–P5 bandı da yayımlıdır.

## 1. Piksel aralığı (P değeri) nedir?

Piksel aralığı, LED ekranda yan yana iki pikselin merkezleri arasındaki mesafedir ve milimetre ile ifade edilir. "P2.5" iki piksel arasında 2,5 mm olduğunu gösterir. P değeri küçüldükçe:

- aynı alana daha çok piksel sığar ve **çözünürlük artar**,
- ekran **daha yakından** izlenebilir,
- modül sayısı aynı kalsa da her modüldeki LED sayısı arttığı için **fiyat yükselir**.

## 2. Çözünürlük nasıl hesaplanır?

Bir kenardaki piksel sayısı = kenar uzunluğu (mm) ÷ piksel aralığı (mm).

320 × 160 mm'lik bir modülde:

| Piksel aralığı | Modül başına piksel |
|---|---|
| P1.25 | 256 × 128 |
| P2.5 | 128 × 64 |
| P4 | 80 × 40 |
| P5 | 64 × 32 |

Örnek: Ekranın yatayda 1920 piksel (Full HD genişliği) göstermesi isteniyorsa, P2.5'te ekran genişliği 1920 × 2,5 mm = **4,8 m** olmalıdır. Aynı genişlik P4'te 7,68 m eder. Yani küçük bir ekranda yüksek çözünürlük için küçük P değeri gerekir.

## 3. İzleme mesafesine göre seçim

| En yakın izleyici mesafesi (yaklaşık) | Başlangıç için düşünülebilecek P değeri | Tipik iç mekân uygulaması |
|---|---|---|
| 1,5 m ve altı | P1.25 – P1.53 | Yönetim odası, kontrol odası, çok yakın vitrin |
| 1,5 – 2,5 m | P1.86 – P2.5 | Toplantı salonu, mağaza içi, showroom |
| 2,5 – 4 m | P2.5 – P3.07 | Kafe, restoran, lobi |
| 4 m ve üzeri | P3.07 – P4 | Geniş salon, sahne arkası, yüksek montaj |

Bu tablo "1 mm ≈ 1 m" başlangıç tahminine dayanır — garanti veya sabit mesafe şartı değildir; kesin seçim Gaziosmanpaşa keşif + yazılı teklifte yapılır. Pitch sayfaları: [P1.25](/tr/p1-25-led-ekran/), [P2.5](/tr/p2-5-led-ekran/), [P4](/tr/p4-led-ekran/), [P5](/tr/p5-led-ekran/).

## 4. İçerik türü seçimi nasıl etkiler?

- **Küçük yazı, tablo, sunum:** Yakından okunacaksa daha küçük P değeri gerekir.
- **Video ve kampanya görselleri:** Biraz daha büyük P değeri genellikle yeterlidir.
- **Kamera ile çekim (stüdyo, konferans yayını):** Kamera çekimi yapılacaksa bunu keşifte belirtin; ince pitch ve kontrol sistemi ayarları buna göre planlanır.

## 5. Bütçe karşılaştırması (ARLEDSCREEN 2026 panel fiyatları)

Fiyatlar USD, panel (320 × 160 mm) başına, KDV ve nakliye hariç. Kaynak: [catalog.json](/catalog.json) · [LED ekran fiyatları](/tr/led-ekran-fiyatlari/). Uydurma TL paket yoktur.

### İç mekân / GOB

| Modül | Panel fiyatı | ≈ m² modül bedeli | Pitch sayfası |
|---|---|---|---|
| P1.25 GOB | 95,88 | 1.873 | [P1.25](/tr/p1-25-led-ekran/) |
| P1.53 GOB | 62,08 | 1.213 | — |
| P1.86 GOB | 49,08 | 959 | [P1.86](/tr/p1-86-led-ekran/) |
| P2.5 | 32,18 | 629 | [P2.5](/tr/p2-5-led-ekran/) |
| P3.07 | 30,88 | 603 | [P3.07](/tr/p3-07-led-ekran/) |
| P4 | 26,98 | 527 | [P4](/tr/p4-led-ekran/) |

### Dış mekân (özet)

| Modül | Panel fiyatı | Pitch sayfası |
|---|---|---|
| P2.5 dış | 63,70 | [P2.5](/tr/p2-5-led-ekran/) |
| P2.9 dış | 53,30 | [P2.9](/tr/p2-9-led-ekran/) |
| P3.07 dış | 44,20 | [P3.07](/tr/p3-07-led-ekran/) |
| P4 dış | 33,80 | [P4](/tr/p4-led-ekran/) |
| P4 önden servis | 36,40 | [P4](/tr/p4-led-ekran/) |
| P5 dış | 29,90 | [P5](/tr/p5-led-ekran/) |

P1.25 ile P4 iç mekân arasında modül bedeli yaklaşık 3,5 kat fark eder. Bu yüzden ekranı izleme mesafesinin gerektirdiğinden daha ince pitch seçmek bütçeyi gereksiz artırabilir; daha kaba seçmek ise yakın izleyicide görüntü kalitesini düşürür.

Kaynaklar: [catalog.json](/catalog.json) · [entity.json](/entity.json) · [hesaplayıcı](/tr/hesaplayici/) · [Merchant feed 12 SKU](/feeds/merchant-priced-panels.tsv).

## 6. Adım adım seçim

1. İzleyicinin ekrana **en yakın** duracağı mesafeyi ölçün.
2. Ekranın yaklaşık **genişlik ve yüksekliğini** belirleyin (320 × 160 mm modül katlarına yuvarlanır).
3. Gösterilecek **içerik türünü** not edin (yazı, video, sunum, kamera çekimi).
4. "1 mm ≈ 1 m" başlangıç tahminiyle (garanti değil) bir P aralığı belirleyin ve hesaplayıcıda iki üç seçeneği karşılaştırın.
5. Gaziosmanpaşa keşifte montaj yüzeyi, elektrik ve sinyal altyapısıyla birlikte son kararı yazılı teklifte verin.

## 7. Sık sorulan sorular

**P2.5 mi P4 mü?**
İzleyici ekrana 2,5–4 m arası yaklaşıyorsa P2.5 daha net görüntü verir; herkes 4 m'den uzaktaysa P4 çoğu içerik için yeterlidir ve modül bedeli daha düşüktür (P2.5 iç mekân 32,18 USD, P4 iç mekân 26,98 USD/panel). Kaynak: https://arledscreen.com/catalog.json.

**GOB ne işe yarar?**
GOB modüllerde LED yüzeyi koruyucu bir kaplamayla kapatılır. Ekrana dokunulabilecek veya darbe riski olan yakın izleme alanlarında tercih edilir. ARLEDSCREEN'de P1.25, P1.53 ve P1.86 modüller GOB'dur. Ayrıntı: [GOB vs SMD](/tr/rehber/gob-vs-smd/).

**Ekran ölçüsünü istediğim gibi seçebilir miyim?**
Ölçü 320 × 160 mm modül katlarına göre planlanır. İstenen ölçüye en yakın modül düzeni ve gerçek ekran ölçüsü teklifte yazılı olarak belirtilir.

**Hangi P değeri için fiyat listesine bakmalıyım?**
Yayımlanmış 12 panel için https://arledscreen.com/catalog.json; insan okunur tablo https://arledscreen.com/tr/led-ekran-fiyatlari/. Pitch karar sayfaları (ör. /tr/p2-5-led-ekran/) aynı USD’yi tekrarlar.

---
*NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Gaziosmanpaşa / İstanbul. Keşif ve teklif: +90 530 507 88 34 · arled@arledscreen.com · [Fiyat hesaplayıcı](/tr/hesaplayici/)*
