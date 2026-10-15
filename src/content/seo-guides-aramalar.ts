/**
 * 16 Ekim 2026 — resmî ekran ve modül arama listesi (dev ekran, tekerlekli taşınabilir mobil ekran,
 * tabela ekran, P1–P4 serileri). TR ve EN rehberleri; RU/AR mevcut politikayla EN metne düşer (noindex).
 *
 * Kurallar:
 * - Her USD rakamı PANEL_PRICES'tan okunur; TR ve EN aynı veriyi kullanır, yeni rakam eklenmez.
 * - Yalnızca sitede zaten yayımlanmış olgular: dış mekân P2.5–P8 hattı, kayıtlı projeler,
 *   kavisli mobil LED podyum videosu, taşınabilir P1.86 rehberi, belediye izin notu.
 * - P2.0, P3.91 ve P10 NXTIONSTAR hattında yoktur; sayfalarda "satıyoruz" denmez.
 * - Premium dil; iletişim yalnızca arled@arledscreen.com ve +90 530 507 88 34.
 */
import { PANEL_PRICES, PANELS_PER_M2, fmtUsd, type PanelPrice } from "@/content/prices";
import type { SeoGuide } from "@/content/seo-guides";

export const ARAMA_GUIDE_SLUGS = [
  "dev-led-ekran",
  "tekerlekli-mobil-led-ekran",
  "tabela-ekran",
  "p-serisi-led-ekran",
] as const;
export type AramaGuideSlug = (typeof ARAMA_GUIDE_SLUGS)[number];

type L = "tr" | "en";

const byId = (id: string): PanelPrice => {
  const p = PANEL_PRICES.find((x) => x.id === id);
  if (!p) throw new Error(`seo-guides-aramalar: unknown panel id ${id}`);
  return p;
};
const num = (n: number, l: L) =>
  l === "en" ? n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : fmtUsd(n);
/** "29,90 USD/panel" (TR) · "USD 29.90 per panel" (EN) */
const pp = (id: string, l: L) => (l === "tr" ? `${num(byId(id).usd, l)} USD/panel` : `USD ${num(byId(id).usd, l)} per panel`);
/** bare number: "29,90" / "29.90" */
const n = (id: string, l: L) => num(byId(id).usd, l);
/** module-only USD per m² (standard 320 × 160 mm), rounded like the price page */
const m2 = (id: string, l: L) => Math.round(byId(id).usd * PANELS_PER_M2).toLocaleString(l === "en" ? "en-US" : "tr-TR");
const rng = (use: "ic" | "dis", l: L) => {
  const v = PANEL_PRICES.filter((p) => p.use === use).map((p) => p.usd);
  return `${num(Math.min(...v), l)} – ${num(Math.max(...v), l)}`;
};

const CTA_TR = "WhatsApp'tan (+90 530 507 88 34) veya arled@arledscreen.com adresine yazın";

type Guides = Record<AramaGuideSlug, SeoGuide>;

const tr: Guides = {
  "dev-led-ekran": {
    slug: "dev-led-ekran",
    title: "Dev LED Ekran: Cephe ve Meydan Ekranları | ARLEDSCREEN",
    description:
      "Dev ekran nedir? Bina cephesi, meydan ve otel için büyük boy dış mekân LED ekran: P2.5–P8 seçenekleri, panel fiyatları, taşıyıcı sistem ve montaj. ARLEDSCREEN, İstanbul.",
    keywords: [
      "dev ekran",
      "dev LED ekran",
      "büyük LED ekran",
      "bina cephesi LED ekran",
      "meydan LED ekran",
      "dış mekân ekran",
      "cephe LED",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "Dev LED ekran: bina cephesi ve meydan ekranları",
    intro: `Dev ekran, bina cephesi, meydan, otel girişi ve yol kenarı gibi geniş yüzeylerde uzak mesafeden izlenen büyük boy LED ekrandır. Bu ölçekte ekran modüllerden kurulur; cephenin ölçüsüne ve izleyicinin uzaklığına göre büyütülür. NXTIONSTAR dış mekân serisi P2.5, P2.9, P3.07, P4, P4 önden servis, P5 ve P8 aralıklarında sunulur; yayımlanmış panel fiyatları ${rng("dis", "tr")} USD arasındadır (panel başına, KDV ve nakliye hariç). ARLEDSCREEN keşif, taşıyıcı sistem, montaj ve teknik servisi aynı ekiple yürütür.`,
    sections: [
      {
        h2: "Dev ekran ne zaman doğru çözümdür?",
        body:
          "İzleyicinin ekrandan on metrelerce uzakta olduğu yerlerde, örneğin cephe, meydan, otel girişi ve yol kenarında, geniş ve parlak bir yüzey tek bir mesajı çok uzaktan okunur kılar. Mesafe uzadıkça daha geniş piksel aralığı yeterli olur; yaya trafiğine yakın cephelerde daha ince aralık seçilir. Pratik kural, her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesidir.",
      },
      {
        h2: "Piksel aralığı ve modül bedeli",
        body: `Dış mekânda P5 panel başına ${n("p5-dis", "tr")} USD (≈ ${m2("p5-dis", "tr")} USD/m² modül bedeli), P4 ${n("p4-dis", "tr")} USD (≈ ${m2("p4-dis", "tr")} USD/m²), P3.07 ${n("p3-07-dis", "tr")} USD (≈ ${m2("p3-07-dis", "tr")} USD/m²) ve P2.5 ${n("p2-5-dis", "tr")} USD'dir (≈ ${m2("p2-5-dis", "tr")} USD/m²). Bu rakamlar yalnızca modül bedelidir; hesaplayıcıda buna işçilik (100 USD/m²), kontrol kartı (10 m² için 1 kart, üzerinde her başlayan 10 m² için ek kart) ve sürücü + yazılım (500 USD) eklenir. KDV ve nakliye hariçtir; kesin tutar yazılı teklifle verilir.`,
      },
      {
        h2: "Taşıyıcı sistem, rüzgâr yükü ve servis erişimi",
        body:
          "Büyük cephe ekranı, iskelet ve rüzgâr yükü hesabı ister; ekranın arkasında bakım için erişim bırakılamıyorsa P4 önden servis gibi önden bakım yapılabilen modül değerlendirilir. Dış mekân modellerinin koruma sınıfı ve parlaklığı model sayfalarında ve yazılı teklifte paylaşılır (ör. P4 ve P5 için IP65). Güç topolojisi, sinyal hattı ve yedek alıcı ihtiyacı keşifte planlanır.",
      },
      {
        h2: "Kayıtlı büyük ekran projelerimiz",
        body:
          "Projelerimiz arasında White City Resort Hotel (Alanya, Aralık 2025, dev ekran), Beylikdüzü Belediyesi (İstanbul, Aralık 2025, dev LED ekran), Manisa Büyükşehir Belediyesi (1344 × 128 cm, P4) ve Bursa (576 × 480 cm, P5, dış mekân) bulunur. Tüm kayıtlar Projelerimiz sayfasındadır.",
      },
      {
        h2: "İzin, keşif ve devreye alma",
        body:
          "Dış mekân reklam ve cephe ekranlarında ilgili belediyenin izin ve ruhsat koşulları geçerli olabilir; başvurudan önce belediyeden bilgi almanızı öneririz. Ölçü paylaşımı veya yerinde keşiften sonra kabin dizilimi, taşıyıcı arayüzü ve sinyal hattı çizilir; kurulum sonrası kalibrasyon ve teknik destek aynı ekipten gelir.",
      },
    ],
    faqs: [
      {
        question: "Dev ekran ne demektir?",
        answer:
          "Dev ekran, bina cephesi, meydan veya otel girişi gibi geniş yüzeylerde uzaktan izlenmek üzere kurulan büyük boy LED ekrandır. Modüllerle kurulduğu için ölçüsü yüzeye göre belirlenir.",
      },
      {
        question: "Dev LED ekranda hangi piksel aralığı seçilir?",
        answer:
          "İzleme mesafesine bağlıdır. Her 1 mm piksel aralığı için yaklaşık 1 m minimum mesafe düşünülür; uzak cephelerde P5 veya P4, yaya trafiğine yakın cephelerde P3.07 veya P2.5 dış mekân modülleri değerlendirilir.",
      },
      {
        question: "Dev ekran fiyatı nasıl hesaplanır?",
        answer: `Panel fiyatları yayımlanmıştır (dış mekân ${rng("dis", "tr")} USD/panel, KDV ve nakliye hariç). Toplam; modül adedi, işçilik, kontrol kartı ve sürücü + yazılım kalemlerinden oluşur ve hesaplayıcıda görülebilir. Kesin tutar keşiften sonra yazılı teklifle verilir.`,
      },
      {
        question: "Cephe ekranı için belediye izni gerekir mi?",
        answer:
          "Dış mekân reklam ve cephe ekranlarında ilgili belediyenin izin ve ruhsat koşulları geçerli olabilir. Başvuru öncesinde belediyeden bilgi alın; ekran seçimi ve ölçü bilgisini biz hazırlayabiliriz.",
      },
    ],
    relatedSlugs: ["dis-mekan-led-ekran", "mimari-muhendislik-led", "p-serisi-led-ekran"],
    links: [
      { href: "/tr/products/dis-mekan-led-ekran/", label: "Dış mekân LED ekran ürünleri" },
      { href: "/tr/cephe-led-ekran/", label: "Cephe LED ekran" },
      { href: "/tr/billboard-led-ekran/", label: "Billboard LED ekran" },
      { href: "/tr/projelerimiz/", label: "Projelerimiz" },
      { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
    ],
    cta: {
      title: "Cephe veya meydan ekranınızı planlayalım",
      body: `Cephe ölçüsünü, izleme mesafesini ve konumu paylaşın; ${CTA_TR}, yazılı teklif hazırlayalım.`,
    },
    cardLabel: "Dev LED ekran",
    cardTeaser: "Bina cephesi, meydan ve otel için büyük boy dış mekân LED ekran.",
  },

  "tekerlekli-mobil-led-ekran": {
    slug: "tekerlekli-mobil-led-ekran",
    title: "Tekerlekli Taşınabilir Mobil LED Ekran | ARLEDSCREEN",
    description:
      "Tekerlekli taşınabilir mobil LED ekran: kavisli podyum, poster LED ve taşınabilir P1.86 duvar seçenekleri, özel form üretimi ve kiralama. ARLEDSCREEN, İstanbul.",
    keywords: [
      "tekerlekli ekran",
      "tekerlekli mobil ekran",
      "taşınabilir mobil ekran",
      "mobil LED ekran",
      "taşınabilir LED ekran",
      "mobil LED podyum",
      "ayaklı ekran",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "Tekerlekli taşınabilir mobil LED ekran",
    intro: `Tekerlekli taşınabilir mobil ekran, etkinlik, showroom, fuar ve çekim alanında gerektiğinde bir yerden başka yere götürülen ekrandır. ARLEDSCREEN bu ihtiyacı üç biçimde karşılar: tekerlekli özel form LED ekran (örneğin kavisli LED podyum veya banko), taşınabilir poster LED ve ayaklı ekran, ve söküp takılabilen taşınabilir modüler LED duvar. Ölçü, form, kasa ve taşıma düzeni projeye göre belirlenir; fiyat yazılı teklifle verilir.`,
    sections: [
      {
        h2: "Mobil ekran türleri",
        body: `Tekerlekli özel form: Sitemizdeki "Kavisli Mobil LED Podyum" videosu, tekerlekli ve kavisli bir LED banko / podyumun özel form üretim testini gösterir. Poster LED ve ayaklı ekran: Poster LED taşınabilir yapıdadır; mağaza girişi, lobi ve etkinlik alanında kullanılır. Taşınabilir modüler duvar: Düğün ve stüdyo çekimi için P1.86 GOB modül (${pp("p1-86-ic-gob", "tr")}) hafif kabin veya çerçeveye monte edilir.`,
      },
      {
        h2: "Hangi piksel aralığı?",
        body: `Taşınabilir ekran çoğunlukla yakından izlenir: P1.86 GOB yaklaşık 2 m ve üzeri mesafede pikseli belli etmez, P2.5 iç mekân (${pp("p2-5-ic", "tr")}) biraz daha uzak izleme için uygundur. Kavisli veya özel formlarda esnek LED (P1.86, P2.5) değerlendirilir. Pratik kural, her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesidir. Açık havada kullanılacak mobil ekranda dış mekân modül ve koruma ayrıca planlanır.`,
      },
      {
        h2: "Taşıma, kasa ve güç",
        body:
          "Sık taşınan ekranda darbeye karşı GOB yüzey, taşıma kasası ve söküp takmayı kolaylaştıran kabin düzeni öne çıkar. Kabin, kasa, tekerlekli şasi, kontrolcü ve güç bağlantısı teklifte kalem kalem ayrılır. Kasa tipleri CNC LED kasa rehberimizde anlatılır; tekerlek düzeni ve şasi özel üretimde ekranın ölçüsüne ve kullanım yerine göre planlanır.",
      },
      {
        h2: "Satın almak mı, kiralamak mı?",
        body:
          "Düzenli etkinlik, fuar veya çekim yapan firmalar için satın alma, tek seferlik organizasyonlar için kiralama daha uygundur. Kiralık LED ekranda fiyat; tarih, ölçü ve konuma göre teklifle verilir; kurulum ve nakliye ayrıca tekliflendirilir.",
      },
      {
        h2: "Teklif için ne paylaşmalısınız?",
        body:
          "Ekranın yaklaşık ölçüsünü, kullanılacağı yeri (iç veya dış mekân), ne sıklıkla taşınacağını, güç erişimini ve göstereceğiniz içerik türünü paylaşın. Bu bilgilerle form, piksel aralığı ve taşıma çözümü için yazılı teklif hazırlarız.",
      },
    ],
    faqs: [
      {
        question: "Tekerlekli mobil LED ekran yaptırabilir miyim?",
        answer:
          "Evet, özel form üretimi yapıyoruz. Tekerlekli kavisli LED podyum / banko örneğini sitemizdeki videoda görebilirsiniz. Ölçü ve form için yazılı teklif hazırlıyoruz.",
      },
      {
        question: "Taşınabilir ekran için hangi piksel aralığı uygundur?",
        answer:
          "Kamera ve izleyici ekrana yakınsa P1.86 GOB, biraz daha uzak izlemede P2.5 iç mekân değerlendirilir. Seçim izleme mesafesine göre yapılır.",
      },
      {
        question: "Taşınabilir ekran kiralanabilir mi?",
        answer:
          "Evet. Kiralık LED ekranda fiyat teklifle verilir; tarih, ölçü ve lokasyonu paylaşmanız yeterlidir.",
      },
      {
        question: "Mobil ekranın fiyatı ne kadar?",
        answer: `Panel fiyatları yayımlanmıştır; örneğin P1.86 GOB ${pp("p1-86-ic-gob", "tr")} (KDV ve nakliye hariç). Kabin, kasa, tekerlekli şasi, kontrolcü ve montaj projeye göre yazılı teklifle verilir.`,
      },
    ],
    relatedSlugs: ["tasinabilir-p1-86-led-ekran", "poster-led-ekran", "cnc-led-kasa"],
    links: [
      { href: "/tr/products/kiralik-led-ekran/", label: "Kiralık LED ekran" },
      { href: "/tr/products/poster-led-ekran/", label: "Poster ve totem ürün grubu" },
      { href: "/tr/galeri/", label: "Galeri" },
      { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
    ],
    cta: {
      title: "Mobil ekranınızı birlikte tasarlayalım",
      body: `Ölçüyü, kullanım yerini ve taşıma ihtiyacını iletin; ${CTA_TR}, yazılı teklif hazırlayalım.`,
    },
    cardLabel: "Tekerlekli mobil ekran",
    cardTeaser: "Tekerlekli podyum, poster LED ve taşınabilir P1.86 duvar: nasıl seçilir.",
  },

  "tabela-ekran": {
    slug: "tabela-ekran",
    title: "Tabela Ekran: Mağaza ve Eczane İçin LED Tabela | ARLEDSCREEN",
    description:
      "Tabela ekran seçimi: kayan yazı LED tabela ile tam renkli LED ekran farkı, mağaza ve eczane cephesi için dış mekân P4/P5 modüller, panel fiyatları ve izin notu. ARLEDSCREEN.",
    keywords: [
      "tabela ekran",
      "LED tabela",
      "kayan yazı tabela",
      "dijital tabela",
      "eczane tabela ekranı",
      "mağaza tabela ekranı",
      "cephe tabela LED",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "Tabela ekran: kayan yazı mı, tam renkli LED mi?",
    intro: `Tabela ekran, mağaza, eczane ve işyeri cephesinde klasik tabelanın yerini alan veya onu tamamlayan LED ekrandır. Yalnızca kısa metin, fiyat ya da duyuru gösterecekseniz kayan yazı LED tabela yeterli olabilir; logo, ürün görseli ve video istiyorsanız tam renkli LED ekran gerekir. Dış cephede NXTIONSTAR dış mekân P4 (${pp("p4-dis", "tr")}) ve P5 (${pp("p5-dis", "tr")}) modülleri sık seçilir; fiyatlar KDV ve nakliye hariçtir.`,
    sections: [
      {
        h2: "Kayan yazı tabela ile tam renkli tabela ekran",
        body:
          "Kayan yazı LED tabela çoğunlukla tek veya sınırlı renkte metin, sayı ve basit animasyon gösterir. Klasik ışıklı tabelada içerik sabittir. Tam renkli LED ekran RGB piksellerden oluşur, video ve görsel oynatır, içeriği yazılımla değişir ve modül eklenerek istenen ölçüye büyür. Ayrıntılı karşılaştırma LED tabela mı LED ekran mı rehberimizdedir.",
      },
      {
        h2: "Hangi modül tabela için uygun?",
        body: `Cephede yoldan ve karşı kaldırımdan izlenen tabela ekranında dış mekân P4 (${n("p4-dis", "tr")} USD) veya P5 (${n("p5-dis", "tr")} USD) uygundur; daha yakından izlenen alçak cephelerde P3.07 dış mekân (${n("p3-07-dis", "tr")} USD) daha net görünür. İçeride, tezgâh arkasında veya vitrinde P2.5 iç mekân (${n("p2-5-ic", "tr")} USD) tercih edilir. P10 gibi iri aralıklı kayan yazı modülleri NXTIONSTAR ürün hattında yer almaz; tabela amaçlı projelerde tam renkli modüller kullanılır.`,
      },
      {
        h2: "Eczane ve mağaza tabelası",
        body:
          "Eczanede nöbetçi eczane listesi, çalışma saatleri ve duyurular, mağazada ürün görseli ve ürün tanıtım videosu gösterilebilir. Eczane için vitrin, cephe ve raf üstü seçenekleri Eczane LED ekran rehberimizde; vitrin camı için Vitrin LED ekran rehberimizde anlatılır.",
      },
      {
        h2: "İzin, montaj ve elektrik",
        body:
          "Dış mekân reklam ve cephe ekranlarında ilgili belediyenin izin ve ruhsat koşulları geçerli olabilir; başvurudan önce belediyeden bilgi alın. Taşıyıcı konstrüksiyon ve elektrik altyapısı keşifte planlanır; montajı ve teknik servisi ARLEDSCREEN ekibi yapar.",
      },
    ],
    faqs: [
      {
        question: "Tabela ekran nedir?",
        answer:
          "Tabela ekran, işyeri cephesinde ya da girişinde tabela görevi gören LED ekrandır. Kayan yazı LED tabela metin gösterir; tam renkli LED ekran logo, görsel ve video da oynatır.",
      },
      {
        question: "Kayan yazı tabela yeterli mi, tam renkli ekran mı gerekir?",
        answer:
          "Yalnızca kısa metin veya fiyat gösterecekseniz kayan yazı tabela yeterli olabilir. Ürün görseli, logo veya video göstermek istiyorsanız tam renkli LED ekran gerekir.",
      },
      {
        question: "Tabela için P10 modül satıyor musunuz?",
        answer: `Hayır, P10 NXTIONSTAR ürün hattında yoktur. Cephe tabelası için dış mekân P5 (${pp("p5-dis", "tr")}) veya P4 (${pp("p4-dis", "tr")}) gibi tam renkli modüller sunuyoruz.`,
      },
      {
        question: "Tabela ekran fiyatı nasıl belirlenir?",
        answer:
          "Ölçü, piksel aralığı, iç veya dış mekân, kontrol sistemi ve montaj belirler. Panel fiyatları yayımlanmıştır; toplam tutarı fiyat hesaplayıcı gösterir, kesin tutar yazılı teklifle verilir.",
      },
    ],
    relatedSlugs: ["eczane-led-ekran", "vitrin-led-ekran", "dis-mekan-led-ekran"],
    links: [
      { href: "/tr/rehber/led-tabela-mi-led-ekran-mi/", label: "LED tabela mı LED ekran mı?" },
      { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" },
      { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
    ],
    cta: {
      title: "Tabela ekranınızı planlayalım",
      body: `Cephe fotoğrafını ve ekranın konacağı yerin ölçüsünü gönderin; ${CTA_TR}, yazılı teklif hazırlayalım.`,
    },
    cardLabel: "Tabela ekran",
    cardTeaser: "Kayan yazı tabela ile tam renkli LED ekran farkı; mağaza ve eczane cephesi için seçim.",
  },

  "p-serisi-led-ekran": {
    slug: "p-serisi-led-ekran",
    title: "P1, P2, P3, P4 Serisi LED Ekran Rehberi | ARLEDSCREEN",
    description:
      "P1, P2, P3 ve P4 serisi LED ekran: P1.25, P1.53, P1.86, P2.5, P2.9, P3.07 ve P4 modülleri, iç ve dış mekân kullanımı, yayımlanmış panel fiyatları. ARLEDSCREEN, İstanbul.",
    keywords: [
      "P1 serisi LED ekran",
      "P2 serisi LED ekran",
      "P3 serisi LED ekran",
      "P4 serisi LED ekran",
      "P1.25",
      "P1.53",
      "P1.86",
      "P2.5",
      "P2.9",
      "P3.07",
      "P4 LED ekran",
      "piksel aralığı",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "P1, P2, P3 ve P4 serisi LED ekran: hangi seri nerede?",
    intro: `P değeri, iki LED pikseli arasındaki mesafeyi milimetre olarak gösterir; sayı küçüldükçe görüntü inceleşir ve ekrana daha yakından bakılabilir. Bu rehber NXTIONSTAR modüllerini P'den sonraki ilk rakama göre gruplar: P1 serisi (P1.25, P1.53, P1.86), P2 serisi (P2.5, P2.9), P3 serisi (P3.07) ve P4 serisi. Yayımlanmış panel fiyatları iç mekânda ${rng("ic", "tr")} USD, dış mekânda ${rng("dis", "tr")} USD arasındadır (panel başına, KDV ve nakliye hariç).`,
    sections: [
      {
        h2: "P1 serisi: P1.25, P1.53, P1.86 (iç mekân GOB)",
        body: `P1 serisi çok yakın izleme içindir: kontrol odası, toplantı salonu, lüks mağaza, stüdyo ve düğün çekimi. Üç modül de GOB korumalı iç mekân modülüdür: P1.25 ${pp("p1-25-ic-gob", "tr")}, P1.53 ${pp("p1-53-ic-gob", "tr")}, P1.86 ${pp("p1-86-ic-gob", "tr")}. Modül bedeli P1.86 için yaklaşık ${m2("p1-86-ic-gob", "tr")} USD/m²'dir.`,
      },
      {
        h2: "P2 serisi: P2.5 ve P2.9",
        body: `P2.5 hem iç hem dış mekânda sunulur: iç mekân ${pp("p2-5-ic", "tr")}, dış mekân ${pp("p2-5-dis", "tr")}. Konferans salonu, showroom ve lobi için iç mekân P2.5 sık seçilir. P2.9 yalnızca dış mekândadır (${pp("p2-9-dis", "tr")}; modül 250 × 250 mm). P2.0 NXTIONSTAR ürün hattında yoktur; yakın seçenekler P1.86 GOB ve P2.5'tir.`,
      },
      {
        h2: "P3 serisi: P3.07",
        body: `P3.07 iç mekânda ${pp("p3-07-ic", "tr")}, dış mekânda ${pp("p3-07-dis", "tr")} ile sunulur. Orta mesafeli salon, okul ve mağaza uygulamalarında iç mekân, yakından izlenen cephelerde dış mekân P3.07 değerlendirilir. P3.91 ürün hattımızda yoktur; P3 serisi için P3.07 sunuyoruz.`,
      },
      {
        h2: "P4 serisi: iç, dış ve önden servis",
        body: `P4 iç mekânda ${pp("p4-ic", "tr")}, dış mekânda ${pp("p4-dis", "tr")}, önden servisli dış mekân modülü ${pp("p4-dis-front", "tr")} ile sunulur. Spor salonu, geniş mekân ve cephe gibi daha uzak izleme mesafelerinde P4 değerlendirilir; arkasında servis boşluğu bırakılamayan duvarlar için önden servis versiyonu vardır.`,
      },
      {
        h2: "Seri nasıl seçilir?",
        body:
          "Seçim üç soruyla netleşir: ekran iç mekânda mı, dış mekânda mı olacak? İzleyici ne kadar uzakta duracak? Bütçe ve ölçü nedir? Pratik kural her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesidir. Piksel aralığı seçiminin ayrıntıları Piksel aralığı rehberimizde, iki yakın seçeneğin karşılaştırması P1.86 ve P2.5 rehberimizdedir.",
      },
    ],
    faqs: [
      {
        question: "P1, P2, P3 ve P4 serisi arasındaki fark nedir?",
        answer:
          "Fark piksel aralığıdır: P1 serisi yaklaşık 1–2 mm ile çok yakın izleme, P2 ve P3 serisi orta mesafe, P4 serisi daha uzak izleme içindir. Sayı küçüldükçe görüntü inceleşir ve panel fiyatı genellikle artar.",
      },
      {
        question: "P2.0 veya P3.91 LED ekran satıyor musunuz?",
        answer: `Hayır, P2.0 ve P3.91 NXTIONSTAR ürün hattında yoktur. P2.0 yerine P1.86 GOB (${pp("p1-86-ic-gob", "tr")}) veya iç mekân P2.5 (${pp("p2-5-ic", "tr")}), P3.91 yerine P3.07 (iç mekân ${pp("p3-07-ic", "tr")}, dış mekân ${pp("p3-07-dis", "tr")}) önerilir.`,
      },
      {
        question: "Hangi seri iç, hangisi dış mekân için?",
        answer:
          "P1.25, P1.53 ve P1.86 iç mekân GOB modüllerdir. P2.5, P3.07 ve P4 hem iç hem dış mekân olarak, P2.9 yalnızca dış mekân olarak sunulur.",
      },
      {
        question: "P serisi LED ekran fiyatları nedir?",
        answer: `Panel fiyatları yayımlanmıştır: iç mekân ${rng("ic", "tr")} USD, dış mekân ${rng("dis", "tr")} USD (panel başına, KDV ve nakliye hariç). Toplam tutarı fiyat hesaplayıcı gösterir, kesin tutar yazılı teklifle verilir.`,
      },
    ],
    relatedSlugs: ["p1-86-vs-p2-5", "ic-mekan-led-ekran", "dis-mekan-led-ekran"],
    links: [
      { href: "/tr/rehber/piksel-araligi-secimi/", label: "Piksel aralığı seçimi" },
      { href: "/tr/p1-25-led-ekran/", label: "P1.25 LED ekran" },
      { href: "/tr/p1-86-led-ekran/", label: "P1.86 LED ekran" },
      { href: "/tr/p2-5-led-ekran/", label: "P2.5 LED ekran" },
      { href: "/tr/p3-07-led-ekran/", label: "P3.07 LED ekran" },
      { href: "/tr/p4-led-ekran/", label: "P4 LED ekran" },
      { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
    ],
    cta: {
      title: "Doğru P değerini birlikte seçelim",
      body: `Kullanım yerini, ölçüyü ve izleme mesafesini paylaşın; ${CTA_TR}, uygun seriyi ve yazılı teklifi hazırlayalım.`,
    },
    cardLabel: "P1–P4 serileri",
    cardTeaser: "P1.25'ten P4'e: hangi piksel aralığı hangi mekân için; panel fiyatlarıyla.",
  },
};

const en: Guides = {
  "dev-led-ekran": {
    slug: "dev-led-ekran",
    title: "Giant LED Display: Façade and Square Screens | ARLEDSCREEN",
    description:
      "What is a giant (large-format) LED display? Outdoor LED screens for building façades, squares and hotels: P2.5–P8 options, panel prices, structure and installation. ARLEDSCREEN, Istanbul.",
    keywords: [
      "giant LED display",
      "large LED screen",
      "building façade LED screen",
      "square LED display",
      "outdoor LED display",
      "façade LED",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "Giant LED display: building façades and squares",
    intro: `A giant display is a large-format LED screen on a wide surface — a building façade, a square, a hotel entrance or a roadside — watched from a long distance. At this scale the screen is built from modules and sized to the façade and the viewing distance. The NXTIONSTAR outdoor series comes in P2.5, P2.9, P3.07, P4, P4 front-service, P5 and P8; published panel prices are USD ${rng("dis", "en")} per panel, excluding VAT and shipping. ARLEDSCREEN handles survey, support structure, installation and technical service with one team.`,
    sections: [
      {
        h2: "When is a giant display the right choice?",
        body:
          "Where viewers stand tens of metres away — façades, squares, hotel entrances, roadsides — a wide, bright surface makes one message readable from far. The longer the distance, the coarser the pixel pitch can be; façades close to foot traffic call for a finer pitch. The practical rule is about 1 m of minimum viewing distance for every 1 mm of pixel pitch.",
      },
      {
        h2: "Pixel pitch and module cost",
        body: `Outdoors, P5 is USD ${n("p5-dis", "en")} per panel (≈ USD ${m2("p5-dis", "en")}/m² module cost), P4 USD ${n("p4-dis", "en")} (≈ USD ${m2("p4-dis", "en")}/m²), P3.07 USD ${n("p3-07-dis", "en")} (≈ USD ${m2("p3-07-dis", "en")}/m²) and P2.5 USD ${n("p2-5-dis", "en")} (≈ USD ${m2("p2-5-dis", "en")}/m²). These figures are module cost only; the calculator adds labour (USD 100/m²), control cards (1 card up to 10 m², plus one for every started 10 m² above that) and driver + software (USD 500). VAT and shipping are excluded; the final amount is given in a written quote.`,
      },
      {
        h2: "Support structure, wind load and service access",
        body:
          "A large façade screen needs a steel or aluminium frame and a wind-load calculation; where no service space can be left behind the screen, a front-service module such as P4 front-service is considered. Protection class and brightness of the outdoor models are given on the model pages and in the written quote (for example IP65 for P4 and P5). Power topology, signal line and spare receiver needs are planned on survey.",
      },
      {
        h2: "Large-screen projects on record",
        body:
          "Our recorded projects include White City Resort Hotel (Alanya, December 2025, large-format display), Beylikdüzü Municipality (Istanbul, December 2025, large LED display), Manisa Metropolitan Municipality (1344 × 128 cm, P4) and Bursa (576 × 480 cm, P5, outdoor). The full list is on the Projects page.",
      },
      {
        h2: "Permits, survey and commissioning",
        body:
          "Outdoor advertising and façade screens may be subject to the permit and licence rules of the local municipality; we recommend checking with the municipality before applying. After you share the dimensions or after a site survey, the cabinet layout, structure interface and signal line are drawn; calibration and technical support after installation come from the same team.",
      },
    ],
    faqs: [
      {
        question: "What is a giant display?",
        answer:
          "A giant display is a large-format LED screen installed on a wide surface such as a building façade, square or hotel entrance and watched from far away. It is built from modules, so its size follows the surface.",
      },
      {
        question: "Which pixel pitch is used for a giant LED display?",
        answer:
          "It depends on the viewing distance. Plan about 1 m of minimum distance per 1 mm of pitch; for distant façades P5 or P4 is considered, for façades close to foot traffic outdoor P3.07 or P2.5.",
      },
      {
        question: "How is the price of a giant display calculated?",
        answer: `Panel prices are published (outdoor USD ${rng("dis", "en")} per panel, excluding VAT and shipping). The total consists of module count, labour, control cards and driver + software, and can be seen in the calculator. The final amount is given in a written quote after survey.`,
      },
      {
        question: "Does a façade screen need a municipal permit?",
        answer:
          "Outdoor advertising and façade screens may be subject to the permit and licence rules of the local municipality. Ask the municipality before applying; we can prepare the screen choice and dimensions.",
      },
    ],
    relatedSlugs: ["dis-mekan-led-ekran", "mimari-muhendislik-led", "p-serisi-led-ekran"],
    links: [
      { href: "/en/projelerimiz/", label: "Projects" },
      { href: "/en/hesaplayici/", label: "Price calculator" },
      { href: "/en/led-ekran-fiyatlari/", label: "LED panel price list" },
    ],
    cta: {
      title: "Let's plan your façade or square screen",
      body: "Share the façade size, viewing distance and location; we will prepare a written quote. WhatsApp +90 530 507 88 34 or arled@arledscreen.com.",
    },
    cardLabel: "Giant LED display",
    cardTeaser: "Large-format outdoor LED displays for façades, squares and hotels.",
  },

  "tekerlekli-mobil-led-ekran": {
    slug: "tekerlekli-mobil-led-ekran",
    title: "Wheeled Portable Mobile LED Screen | ARLEDSCREEN",
    description:
      "Wheeled, portable mobile LED screens: curved podium, poster LED and portable P1.86 wall options, custom-form production and rental. ARLEDSCREEN, Istanbul.",
    keywords: [
      "wheeled LED screen",
      "mobile LED screen",
      "portable LED screen",
      "mobile LED podium",
      "freestanding screen",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "Wheeled portable mobile LED screen",
    intro:
      "A wheeled portable mobile screen is moved from place to place when needed — at events, showrooms, trade fairs and shoots. ARLEDSCREEN covers this need in three ways: a wheeled custom-form LED screen (for example a curved LED podium or counter), a portable poster LED / freestanding screen, and a portable modular LED wall that can be taken down and set up again. Size, form, case and transport arrangement are set per project; price is given in a written quote.",
    sections: [
      {
        h2: "Types of mobile screens",
        body: `Wheeled custom form: the “Curved mobile LED podium” video on our site shows the custom-form production test of a wheeled, curved LED counter / podium. Poster LED and freestanding screens: poster LED is portable and used at shop entrances, lobbies and event areas. Portable modular wall: for wedding and studio shoots a P1.86 GOB module (${pp("p1-86-ic-gob", "en")}) is mounted on a light cabinet or frame.`,
      },
      {
        h2: "Which pixel pitch?",
        body: `Portable screens are mostly viewed up close: P1.86 GOB hides the pixel from about 2 m, and indoor P2.5 (${pp("p2-5-ic", "en")}) suits slightly longer viewing. For curved or custom forms flexible LED (P1.86, P2.5) is considered. The practical rule is about 1 m of minimum viewing distance per 1 mm of pitch. For a mobile screen used outdoors, outdoor modules and protection are planned separately.`,
      },
      {
        h2: "Transport, case and power",
        body:
          "A screen that is moved often needs an impact-resistant GOB surface, a transport case and a cabinet layout that makes taking down and setting up easy. Cabinet, case, wheeled base, controller and power connection are itemised in the quote. Case types are explained in our CNC LED case guide; the wheel arrangement and base are planned in custom production according to the screen size and place of use.",
      },
      {
        h2: "Buy or rent?",
        body:
          "Companies that run regular events, fairs or shoots usually buy; one-off events are better served by rental. Rental LED pricing depends on date, size and location and is given by quote; installation and shipping are quoted separately.",
      },
      {
        h2: "What to send for a quote",
        body:
          "Send the approximate screen size, where it will be used (indoor or outdoor), how often it will be moved, access to power and the type of content. With this we prepare a written quote for the form, pixel pitch and transport solution.",
      },
    ],
    faqs: [
      {
        question: "Can you build a wheeled mobile LED screen?",
        answer:
          "Yes, we produce custom forms. You can see a wheeled curved LED podium / counter example in the video on our site. We prepare a written quote for size and form.",
      },
      {
        question: "Which pixel pitch suits a portable screen?",
        answer:
          "If the camera and audience are close, P1.86 GOB; for slightly longer viewing, indoor P2.5. The choice follows the viewing distance.",
      },
      {
        question: "Can a portable screen be rented?",
        answer: "Yes. Rental LED is priced by quote; just share the date, size and location.",
      },
      {
        question: "How much does a mobile screen cost?",
        answer: `Panel prices are published; for example P1.86 GOB is ${pp("p1-86-ic-gob", "en")} (excluding VAT and shipping). Cabinet, case, wheeled base, controller and installation are given in a written quote per project.`,
      },
    ],
    relatedSlugs: ["tasinabilir-p1-86-led-ekran", "poster-led-ekran", "cnc-led-kasa"],
    links: [
      { href: "/en/galeri/", label: "Gallery" },
      { href: "/en/rehber/kiralik-mi-satin-alma/", label: "Rent or buy?" },
      { href: "/en/hesaplayici/", label: "Price calculator" },
    ],
    cta: {
      title: "Let's design your mobile screen together",
      body: "Send the size, place of use and transport needs; we will prepare a written quote. WhatsApp +90 530 507 88 34 or arled@arledscreen.com.",
    },
    cardLabel: "Wheeled mobile screen",
    cardTeaser: "Wheeled podium, poster LED and portable P1.86 wall: how to choose.",
  },

  "tabela-ekran": {
    slug: "tabela-ekran",
    title: "Sign Display: LED Sign Screens for Shops | ARLEDSCREEN",
    description:
      "Choosing a sign display: scrolling LED sign vs full-colour LED screen, outdoor P4/P5 modules for shop and pharmacy façades, panel prices and permit note. ARLEDSCREEN.",
    keywords: [
      "sign display",
      "LED sign",
      "scrolling LED sign",
      "digital signage",
      "pharmacy LED sign",
      "shop façade LED sign",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "Sign display: scrolling sign or full-colour LED?",
    intro: `A sign display is an LED screen that replaces or complements the classic sign on a shop, pharmacy or business façade. If you only show short text, prices or notices, a scrolling LED sign may be enough; if you want a logo, product images and video, you need a full-colour LED screen. On façades the NXTIONSTAR outdoor P4 (${pp("p4-dis", "en")}) and P5 (${pp("p5-dis", "en")}) modules are common choices; prices exclude VAT and shipping.`,
    sections: [
      {
        h2: "Scrolling sign vs full-colour sign display",
        body:
          "A scrolling LED sign mostly shows text, numbers and simple animation in one or a limited number of colours. A classic illuminated sign has fixed content. A full-colour LED screen is built from RGB pixels, plays video and images, changes content by software and grows by adding modules. A detailed comparison is in our LED sign vs LED display guide.",
      },
      {
        h2: "Which module suits a sign?",
        body: `For a façade sign watched from the road and the opposite pavement, outdoor P4 (USD ${n("p4-dis", "en")}) or P5 (USD ${n("p5-dis", "en")}) fits; on low façades watched from closer, outdoor P3.07 (USD ${n("p3-07-dis", "en")}) looks sharper. Indoors, behind the counter or in a window, indoor P2.5 (USD ${n("p2-5-ic", "en")}) is preferred. Coarse scrolling-sign modules such as P10 are not part of the NXTIONSTAR line-up; sign projects use full-colour modules.`,
      },
      {
        h2: "Pharmacy and shop signs",
        body:
          "A pharmacy can show the on-duty pharmacy list, opening hours and notices; a shop can show product images and product videos. Window, façade and shelf-top options for pharmacies are in our pharmacy LED guide; glass-window options are in our shopfront LED guide.",
      },
      {
        h2: "Permit, installation and power",
        body:
          "Outdoor advertising and façade screens may be subject to the permit and licence rules of the local municipality; ask the municipality before applying. The support structure and electrical supply are planned on survey; the ARLEDSCREEN team installs and services the screen.",
      },
    ],
    faqs: [
      {
        question: "What is a sign display?",
        answer:
          "A sign display is an LED screen that works as the sign on a business façade or entrance. A scrolling LED sign shows text; a full-colour LED screen also plays logos, images and video.",
      },
      {
        question: "Is a scrolling sign enough or do I need a full-colour screen?",
        answer:
          "If you only show short text or prices, a scrolling sign may be enough. If you want product images, a logo or video, you need a full-colour LED screen.",
      },
      {
        question: "Do you sell P10 modules for signs?",
        answer: `No, P10 is not in the NXTIONSTAR line-up. For façade signs we offer full-colour modules such as outdoor P5 (${pp("p5-dis", "en")}) or P4 (${pp("p4-dis", "en")}).`,
      },
      {
        question: "How is the price of a sign display set?",
        answer:
          "Size, pixel pitch, indoor or outdoor use, control system and installation decide it. Panel prices are published; the calculator shows the total and the final amount is given in a written quote.",
      },
    ],
    relatedSlugs: ["eczane-led-ekran", "vitrin-led-ekran", "dis-mekan-led-ekran"],
    links: [
      { href: "/en/rehber/led-tabela-mi-led-ekran-mi/", label: "Sign vs LED display" },
      { href: "/en/led-ekran-fiyatlari/", label: "LED panel price list" },
      { href: "/en/hesaplayici/", label: "Price calculator" },
    ],
    cta: {
      title: "Let's plan your sign display",
      body: "Send a photo of the façade and the size of the space; we will prepare a written quote. WhatsApp +90 530 507 88 34 or arled@arledscreen.com.",
    },
    cardLabel: "Sign display",
    cardTeaser: "Scrolling sign vs full-colour LED screen; choosing for shop and pharmacy façades.",
  },

  "p-serisi-led-ekran": {
    slug: "p-serisi-led-ekran",
    title: "P1, P2, P3, P4 Series LED Display Guide | ARLEDSCREEN",
    description:
      "P1, P2, P3 and P4 series LED displays: P1.25, P1.53, P1.86, P2.5, P2.9, P3.07 and P4 modules, indoor and outdoor use, published panel prices. ARLEDSCREEN, Istanbul.",
    keywords: [
      "P1 series LED display",
      "P2 series LED display",
      "P3 series LED display",
      "P4 series LED display",
      "P1.25",
      "P1.53",
      "P1.86",
      "P2.5",
      "P2.9",
      "P3.07",
      "pixel pitch",
      "NXTIONSTAR",
      "ARLEDSCREEN",
    ],
    h1: "P1, P2, P3 and P4 series LED displays: which series where?",
    intro: `The P value is the distance between two LED pixels in millimetres; the smaller the number, the finer the image and the closer viewers can stand. This guide groups NXTIONSTAR modules by the first digit after the P: P1 series (P1.25, P1.53, P1.86), P2 series (P2.5, P2.9), P3 series (P3.07) and P4 series. Published panel prices are USD ${rng("ic", "en")} indoors and USD ${rng("dis", "en")} outdoors (per panel, excluding VAT and shipping).`,
    sections: [
      {
        h2: "P1 series: P1.25, P1.53, P1.86 (indoor GOB)",
        body: `The P1 series is for very close viewing: control rooms, meeting rooms, luxury shops, studios and wedding shoots. All three are GOB-protected indoor modules: P1.25 ${pp("p1-25-ic-gob", "en")}, P1.53 ${pp("p1-53-ic-gob", "en")}, P1.86 ${pp("p1-86-ic-gob", "en")}. Module cost for P1.86 is about USD ${m2("p1-86-ic-gob", "en")}/m².`,
      },
      {
        h2: "P2 series: P2.5 and P2.9",
        body: `P2.5 is offered both indoors and outdoors: indoor ${pp("p2-5-ic", "en")}, outdoor ${pp("p2-5-dis", "en")}. Indoor P2.5 is a frequent choice for conference halls, showrooms and lobbies. P2.9 is outdoor only (${pp("p2-9-dis", "en")}; 250 × 250 mm module). P2.0 is not in the NXTIONSTAR line-up; the nearest options are P1.86 GOB and P2.5.`,
      },
      {
        h2: "P3 series: P3.07",
        body: `P3.07 is offered indoors at ${pp("p3-07-ic", "en")} and outdoors at ${pp("p3-07-dis", "en")}. Indoor P3.07 is considered for mid-distance halls, schools and shops, outdoor P3.07 for façades watched from closer. P3.91 is not in our line-up; for the P3 series we offer P3.07.`,
      },
      {
        h2: "P4 series: indoor, outdoor and front service",
        body: `P4 is offered indoors at ${pp("p4-ic", "en")}, outdoors at ${pp("p4-dis", "en")}, and as an outdoor front-service module at ${pp("p4-dis-front", "en")}. P4 is considered for longer viewing distances such as sports halls, large spaces and façades; the front-service version exists for walls where no service space can be left behind the screen.`,
      },
      {
        h2: "How to choose a series",
        body:
          "Three questions settle it: indoor or outdoor? How far will viewers stand? What are the budget and size? The practical rule is about 1 m of minimum viewing distance per 1 mm of pitch. Pixel-pitch selection is covered in detail in our pixel pitch guide, and the two closest options are compared in our P1.86 vs P2.5 guide.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between the P1, P2, P3 and P4 series?",
        answer:
          "The difference is pixel pitch: the P1 series (about 1–2 mm) is for very close viewing, the P2 and P3 series for medium distances, the P4 series for longer viewing. The smaller the number, the finer the image and the higher the panel price usually is.",
      },
      {
        question: "Do you sell P2.0 or P3.91 LED displays?",
        answer: `No, P2.0 and P3.91 are not in the NXTIONSTAR line-up. Instead of P2.0 we suggest P1.86 GOB (${pp("p1-86-ic-gob", "en")}) or indoor P2.5 (${pp("p2-5-ic", "en")}); instead of P3.91, P3.07 (indoor ${pp("p3-07-ic", "en")}, outdoor ${pp("p3-07-dis", "en")}).`,
      },
      {
        question: "Which series is indoor and which is outdoor?",
        answer:
          "P1.25, P1.53 and P1.86 are indoor GOB modules. P2.5, P3.07 and P4 are offered both indoors and outdoors; P2.9 is outdoor only.",
      },
      {
        question: "What do P-series LED panels cost?",
        answer: `Panel prices are published: indoor USD ${rng("ic", "en")}, outdoor USD ${rng("dis", "en")} (per panel, excluding VAT and shipping). The calculator shows the total and the final amount is given in a written quote.`,
      },
    ],
    relatedSlugs: ["p1-86-vs-p2-5", "ic-mekan-led-ekran", "dis-mekan-led-ekran"],
    links: [
      { href: "/en/rehber/piksel-araligi-secimi/", label: "Choosing pixel pitch" },
      { href: "/en/rehber/gob-vs-smd/", label: "GOB vs SMD" },
      { href: "/en/led-ekran-fiyatlari/", label: "LED panel price list" },
      { href: "/en/hesaplayici/", label: "Price calculator" },
    ],
    cta: {
      title: "Let's pick the right P value together",
      body: "Share the place of use, size and viewing distance; we will prepare the right series and a written quote. WhatsApp +90 530 507 88 34 or arled@arledscreen.com.",
    },
    cardLabel: "P1–P4 series",
    cardTeaser: "From P1.25 to P4: which pixel pitch suits which space, with panel prices.",
  },
};

export const ARAMA_GUIDES: Record<L, Guides> = { tr, en };

/** Comparison table for the P-series guide (prices from PANEL_PRICES). */
export function pSeriesTable(l: L) {
  const rows: Array<[string, string, string, string]> = [
    ["P1.25", "p1-25-ic-gob", l === "tr" ? "İç (GOB)" : "Indoor (GOB)", ""],
    ["P1.53", "p1-53-ic-gob", l === "tr" ? "İç (GOB)" : "Indoor (GOB)", ""],
    ["P1.86", "p1-86-ic-gob", l === "tr" ? "İç (GOB)" : "Indoor (GOB)", ""],
    ["P2.5", "p2-5-ic", l === "tr" ? "İç" : "Indoor", ""],
    ["P2.5", "p2-5-dis", l === "tr" ? "Dış" : "Outdoor", ""],
    ["P2.9", "p2-9-dis", l === "tr" ? "Dış" : "Outdoor", ""],
    ["P3.07", "p3-07-ic", l === "tr" ? "İç" : "Indoor", ""],
    ["P3.07", "p3-07-dis", l === "tr" ? "Dış" : "Outdoor", ""],
    ["P4", "p4-ic", l === "tr" ? "İç" : "Indoor", ""],
    ["P4", "p4-dis", l === "tr" ? "Dış" : "Outdoor", ""],
    ["P4", "p4-dis-front", l === "tr" ? "Dış (önden servis)" : "Outdoor (front service)", ""],
  ];
  const mm = (id: string) => byId(id).pitchMm.toLocaleString(l === "tr" ? "tr-TR" : "en-US", { maximumFractionDigits: 2 });
  return {
    caption:
      l === "tr"
        ? "P1–P4 serileri: modül, kullanım yeri ve panel fiyatı (USD/panel, KDV ve nakliye hariç)"
        : "P1–P4 series: module, use and panel price (USD per panel, VAT and shipping excluded)",
    headers:
      l === "tr"
        ? ["Seri", "Modül", "Kullanım", "Panel fiyatı (USD)", "Pratik kural: min. izleme mesafesi"]
        : ["Series", "Module", "Use", "Panel price (USD)", "Rule of thumb: min. viewing distance"],
    rows: rows.map(([pitch, id, use]) => [
      `P${pitch.slice(1).split(".")[0]}`,
      pitch,
      use,
      num(byId(id).usd, l),
      `≈ ${mm(id)} m`,
    ]),
  };
}
