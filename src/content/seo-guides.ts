import { SEO_GUIDE_I18N } from "@/content/seo-guides-i18n";
import type { Locale } from "@/lib/i18n";

export const SEO_GUIDE_SLUGS = [
  "led-ekran",
  "dijital-ekran",
  "ekran-cesitleri",
  "lcd-ekran",
  "dis-mekan-led-ekran",
  "ic-mekan-led-ekran",
  "mimari-muhendislik-led",
  "konferans-salonu-led",
  "vitrin-led-ekran",
  "poster-led-ekran",
  "menuboard-dijital-menu",
  "kiosk-ekran",
  "kiosk-dijital-ekran",
  "cnc-led-kasa",
  "cami-led-ekran",
  "led-ekran-ariza-belirtileri",
  "led-ekran-ihracat",
  "eczane-led-ekran",
  "dugun-salonu-led",
  "hastane-dijital-ekran",
  "okul-led-ekran",
] as const;

export type SeoGuideSlug = (typeof SEO_GUIDE_SLUGS)[number];

export function isSeoGuideSlug(value: string): value is SeoGuideSlug {
  return (SEO_GUIDE_SLUGS as readonly string[]).includes(value);
}

export interface SeoGuideSection {
  h2: string;
  body: string;
}

export interface SeoGuideFaq {
  question: string;
  answer: string;
}

export interface SeoGuide {
  slug: SeoGuideSlug;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: SeoGuideSection[];
  faqs: SeoGuideFaq[];
  relatedSlugs: SeoGuideSlug[];
  cta: { title: string; body: string };
  /** Short card label for hub / related links */
  cardLabel: string;
  cardTeaser: string;
}

type GuideLocale = "tr" | "en";

const guides: Record<GuideLocale, Record<SeoGuideSlug, SeoGuide>> = {
  tr: {
    "led-ekran": {
      slug: "led-ekran",
      title: "LED Ekran Nedir, Nasıl Seçilir? | ARLEDSCREEN",
      description:
        "LED ekran nedir, dijital ekran projelerinde pitch, parlaklık ve kabin nasıl seçilir? ARLEDSCREEN / NXTIONSTAR ile İstanbul Gaziosmanpaşa’dan B2B keşif, teklif ve mühendislik kurulumu.",
      keywords: [
        "LED ekran",
        "dijital ekran",
        "LED duvar",
        "NXTIONSTAR",
        "ARLEDSCREEN",
        "LED ekran Türkiye",
        "LED ekran nedir",
        "LED ekran İstanbul",
      ],
      h1: "LED ekran nedir, nasıl seçilir?",
      intro:
        "LED ekran, RGB piksellerden oluşan modüllerin yan yana birleşmesiyle kurulan, video ve görsel oynatan tam renkli dijital ekrandır; ölçüsü modül eklenerek büyütülür. Doğru LED ekran üç adımda seçilir: kullanım yeri (iç veya dış mekân), izleme mesafesine göre piksel aralığı ve montaj şekli. ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli olarak kendi markası NXTIONSTAR LED ekranların satışını, keşfini, montajını ve teknik servisini yapar.",
      sections: [
        {
          h2: "Dijital ekran ile LED ekran farkı",
          body:
            "Her dijital ekran LED ekran değildir. LCD / OLED paneller sabit çözünürlük ve sınırlı boyut sunar; kayan yazı LED tabela çoğunlukla metin amaçlıdır. Tam renkli LED ekran ise kabin veya modülleri yan yana ekleyerek geniş yüzey kurmanıza izin verir. Güneş altında okunabilirlik, geniş açı ve kesintisiz video duvar ihtiyacı varsa LED tercih edilir. ARLEDSCREEN projelerinde önce kullanım senaryosu (cephe, lobi, sahne, vitrin) netleşir; ardından piksel aralığı seçilir. Seriye ait parlaklık ve koruma sınıfı değerleri yazılı teklifte paylaşılır.",
        },
        {
          h2: "Pitch ve montaj — seçim sırası",
          body:
            "Kritik izleme mesafesi piksel aralığını belirler: pratik kural her 1 mm P değeri ≈ 1 m minimum mesafe (P2.5 ≈ 2,5 m). Yakın izlemede küçük P, uzak cephede daha büyük P tercih edilir. Kabin/modül düzeni ve servis erişimi keşifte netleşir. Model bazında parlaklık, koruma sınıfı ve güç değerleri sitede genel iddia olarak yazılmaz; yazılı teklif ve teknik föyde paylaşılır.",
        },
        {
          h2: "B2B süreç: keşif, teklif, montaj",
          body:
            "Kurumsal LED ekran projesi yalnızca panel listesinden alınmaz. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN saha veya ölçü paylaşımı ister; elektrik, sinyal, montaj tipi ve takvim özetlenir. Panel fiyatları hesaplayıcıda yayımlıdır; nihai tutar keşif ve yazılı teklifle kesinleşir.",
        },
        {
          h2: "Hangi projeler için hangi gruplar?",
          body:
            "Yakın izleme ve salon için iç mekân / GOB; cephe ve billboard için dış mekân; vitrin için şeffaf veya ince pitch; etkinlik için kiralık; kavisli yüzey için esnek LED. Poster / totem ayrı form faktörüdür. Detay için ürün grupları ve fiyat hesaplayıcıyı birlikte kullanın.",
        },
      ],
      faqs: [
        {
          question: "LED ekran fiyatı nasıl hesaplanır?",
          answer:
            "Metrekare, pitch, kabin tipi, IP sınıfı, kontrol kartı ve montaj kapsamı fiyatı belirler. Online hesaplayıcı yaklaşık malzeme bandı verir; kesin B2B teklif keşif sonrası yazılır.",
        },
        {
          question: "Dijital ekran mı LED duvar mı seçmeliyim?",
          answer:
            "Tek panel / küçük vitrin için LCD yeterli olabilir. Geniş, parlak, kesintisiz yüzey veya dış mekân okunabilirlik gerekiyorsa LED ekran doğru yoldur. ARLEDSCREEN her iki senaryoyu da mühendislik açısından ayırır.",
        },
        {
          question: "Türkiye’de NXTIONSTAR LED ekran kimden alınır?",
          answer:
            "NXTIONSTAR ürünleri ve kurulum mühendisliği ARLEDSCREEN üzerinden yürür: keşif, montaj, kalibrasyon ve teknik destek İstanbul Gaziosmanpaşa masasında toplanır.",
        },
        {
          question: "İstanbul'da LED ekran nereden alınır?",
          answer:
            "ARLEDSCREEN'in merkezi Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul'dadır. Telefon ve WhatsApp: +90 530 507 88 34, e-posta: arled@arledscreen.com. Satış, montaj ve servis Türkiye genelinde yapılır.",
        },
      ],
      relatedSlugs: [
        "ekran-cesitleri",
        "dis-mekan-led-ekran",
        "ic-mekan-led-ekran",
      ],
      cta: {
        title: "LED ekran projenizi boyutlandıralım",
        body:
          "Ölçü, ortam ve kullanım amacını paylaşın; mühendislik masası pitch, güç ve malzeme özetiyle dönüş yapsın.",
      },
      cardLabel: "LED ekran",
      cardTeaser: "Dijital ekran seçimi, pitch ve B2B süreç — ana rehber.",
    },

    "dijital-ekran": {
      slug: "dijital-ekran",
      title: "Dijital Ekran Nedir, Nereden Alınır? | ARLEDSCREEN",
      description:
        "Dijital ekran nedir, LED ekrandan farkı ne, İstanbul'da nereden alınır? ARLEDSCREEN, Gaziosmanpaşa'da LED ve LCD dijital ekran satışı ve montajı yapar.",
      keywords: [
        "dijital ekran",
        "dijital ekran nereden alınır",
        "dijital ekran İstanbul",
        "dijital reklam ekranı",
        "LED dijital ekran",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Dijital ekran nedir, nereden alınır?",
      intro:
        "Dijital ekran, içeriği elektronik olarak değiştirilebilen görüntü yüzeylerinin genel adıdır: LCD ve OLED paneller, kayan yazı LED tabelalar, dijital totemler, video duvarlar ve tam renkli LED ekranlar bu gruba girer. İstanbul'da LED veya LCD dijital ekran için ARLEDSCREEN'e Gaziosmanpaşa'daki merkezimizden veya +90 530 507 88 34 numarasından ulaşabilirsiniz. Satış, keşif, montaj ve teknik servisi aynı ekip yürütür.",
      sections: [
        {
          h2: "Dijital ekran ile LED ekran aynı şey mi?",
          body:
            "Hayır. Her LED ekran bir dijital ekrandır, ama her dijital ekran LED ekran değildir. LCD ve OLED paneller fabrikada belirlenen ölçüde üretilir; kayan yazı LED tabela çoğunlukla metin ve rakam gösterir. Tam renkli LED ekran ise RGB piksellerden oluşan modüllerin yan yana birleşmesiyle kurulur. Video, fotoğraf ve animasyon oynatır; ölçüsü modül eklenerek büyütülür. ARLEDSCREEN tam renkli LED ekranları kendi markası NXTIONSTAR ile sunar; menuboard ve ayaklı ekran projelerinde LCD/TV tipi ekran seçeneği de vardır. LCD seçeneklerinde fiyat ve teknik bilgi teklifle verilir.",
        },
        {
          h2: "Dijital ekran nerelerde kullanılır?",
          body:
            "En yaygın kullanım alanları mağaza vitrini ve cephesi, AVM ve otel lobisi, kafe ve restoran, belediye duyuru alanları, konferans salonu, sahne ve fuardır. Dikey reklam için poster LED ve totem, menü göstermek için menuboard, etkileşim gereken noktalarda kiosk tercih edilir. Geniş, parlak ve çerçevesiz bir yüzey gerekiyorsa LED ekran öne çıkar.",
        },
        {
          h2: "İç mekân ve dış mekân dijital ekran farkı",
          body:
            "İç mekânda izleyici ekrana yakındır, bu yüzden daha küçük piksel aralığı seçilir. NXTIONSTAR iç mekân serisi P1.25, P2.5, P3.07 ve P4; GOB serisi P1.25, P1.53 ve P1.86 seçenekleriyle sunulur. Dış mekânda ekran güneşe, yağmura ve toza dayanmalıdır; dış mekân serisi P2.5, P2.9, P3.07, P4, P4 önden servis, P5 ve P8 aralıklarını kapsar. Parlaklık ve koruma sınıfı değerleri, seçilen modelin teknik föyüyle yazılı teklifte paylaşılır.",
        },
        {
          h2: "Dijital ekran fiyatı nasıl belirlenir?",
          body:
            "Fiyatı ekran ölçüsü, piksel aralığı, iç veya dış mekân kullanımı, kontrol sistemi ve montaj koşulları belirler. Yayımlanmış 12 NXTIONSTAR panelin USD fiyatı LED ekran fiyatları sayfamızda ve fiyat hesaplayıcıda yer alır. Örneğin P2.5 iç mekân panel 32,18 USD, P2.5 dış mekân panel 63,70 USD'dir (panel başına, 320 × 160 mm modül, KDV ve nakliye hariç). Nihai tutar keşiften sonra yazılı teklifle kesinleşir.",
        },
        {
          h2: "İstanbul'da dijital ekran satın alma süreci",
          body:
            "ARLEDSCREEN'in merkezi Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul adresindedir. Süreç, ölçü ve kullanım amacını paylaşmanızla başlar; ardından keşif, piksel aralığı seçimi, yazılı teklif, montaj, devreye alma ve teknik servis gelir. Satış, montaj ve servis Türkiye genelinde yapılır; Temmuz 2025 – Temmuz 2026 arasında 13 ilde, ayrıca Almanya ve Azerbaycan'da proje kaydımız bulunur.",
        },
        {
          h2: "Ekran boyutuna ve mekâna göre dijital ekran seçenekleri",
          body:
            "Hazır LCD/TV tipi ticari ekranlar fabrika ölçülerinde gelir; iç mekân kullanımında en sık 43 ile 85 inç arası boylar tercih edilir. 49, 55 ve 65 inç dokunmatik kiosk gövdeleri de bu gruptadır. Bu ölçülerin üstünde ya da özel en-boy oranında bir yüzey gerekiyorsa modül eklenerek büyüyen LED ekran devreye girer. İç mekânda standart parlaklık yeterlidir. Güneş alan vitrin camının arkasında daha parlak vitrin sınıfı, açık havada ise kapalı kasalı ve soğutmalı dış mekân sınıfı gerekir. LCD seçeneklerinde ölçü, model ve fiyat yazılı teklifte netleşir.",
        },
      ],
      faqs: [
        {
          question: "Dijital ekran nereden alınır?",
          answer:
            "LED veya LCD dijital ekran için ARLEDSCREEN'e İstanbul Gaziosmanpaşa'daki merkezimizden, +90 530 507 88 34 telefon ve WhatsApp hattından veya arled@arledscreen.com adresinden ulaşabilirsiniz. Keşif ve yazılı tekliften sonra montaj ve servis aynı ekipten yürür.",
        },
        {
          question: "Dijital ekran ile LED tabela arasındaki fark nedir?",
          answer:
            "Kayan yazı LED tabela çoğunlukla tek veya sınırlı renkte metin gösterir. Tam renkli LED ekran ise video, fotoğraf ve animasyon oynatır. İkisi de dijital ekrandır ama aynı şey değildir.",
        },
        {
          question: "Dijital reklam ekranı için hangi piksel aralığı seçilmeli?",
          answer:
            "Pratik kural, her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesidir; örneğin P2.5 için yaklaşık 2,5 m. Yakından izlenen iç mekânda küçük, uzaktan izlenen cephede büyük piksel aralığı seçilir.",
        },
        {
          question: "Dijital ekranın içeriği nasıl değiştirilir?",
          answer:
            "Kontrol sistemine göre USB, Wi‑Fi, yerel ağ veya bilgisayar üzerinden içerik yüklenir. ARLEDSCREEN; Huidu, NovaStar ve Colorlight kontrol sistemlerini kurar ve yapılandırır.",
        },
      ],
      relatedSlugs: ["ekran-cesitleri", "lcd-ekran", "menuboard-dijital-menu"],
      cta: {
        title: "Dijital ekran projenizi planlayalım",
        body:
          "Ölçüyü, kullanım yerini ve içerik türünü paylaşın; piksel aralığı ve yaklaşık maliyet özetiyle dönüş yapalım.",
      },
      cardLabel: "Dijital ekran",
      cardTeaser: "Dijital ekran nedir, LED ekrandan farkı ve İstanbul'da satın alma süreci.",
    },
    "ekran-cesitleri": {
      slug: "ekran-cesitleri",
      title: "Ekran Çeşitleri: LED, LCD, Totem, Menuboard | ARLEDSCREEN",
      description:
        "Ekran çeşitleri nelerdir? LCD, LED tabela ve tam renkli LED ekran; iç/dış mekân, GOB, esnek, şeffaf, poster/totem, menuboard ve kiosk farkları tek sayfada.",
      keywords: [
        "ekran çeşitleri",
        "LED ekran çeşitleri",
        "dijital ekran çeşitleri",
        "ekran türleri",
        "iç mekân ekran",
        "dış mekân ekran",
        "ARLEDSCREEN",
      ],
      h1: "Ekran çeşitleri nelerdir?",
      intro:
        "Ekranlar üç ana gruba ayrılır: LCD ve OLED gibi sabit ölçülü paneller, metin gösteren kayan yazı LED tabelalar ve video oynatan tam renkli LED ekranlar. Tam renkli LED ekranlar da kullanım yerine ve forma göre iç mekân, dış mekân, GOB, ince pitch, esnek, şeffaf, transparan, kiralık ve poster/totem olarak çeşitlenir. ARLEDSCREEN bu LED ekran çeşitlerini kendi markası NXTIONSTAR ile satar, kurar ve servis eder; menuboard ve ayaklı ekranda LCD/TV tipi seçenek de sunar.",
      sections: [
        {
          h2: "Teknolojiye göre ekran çeşitleri",
          body:
            "LCD ve OLED: Fabrikada belirlenen ölçüde üretilen panellerdir; TV, monitör ve küçük dijital tabelalarda kullanılır. Kayan yazı LED tabela: Çoğunlukla tek veya sınırlı renkte metin, fiyat ve duyuru gösterir. Tam renkli LED ekran: RGB piksellerden oluşan modüllerle kurulur, video oynatır ve modül eklenerek istenen ölçüye büyütülür. LED modül yüzeyinde SMD, GOB ve COB gibi farklı teknolojiler bulunur; GOB, SMD yüzeyin üzerine koruyucu şeffaf tutkal katmanı eklenmiş hâlidir.",
        },
        {
          h2: "Kullanım yerine göre: iç mekân ve dış mekân ekran",
          body:
            "İç mekân LED ekran mağaza, kafe, showroom, lobi ve toplantı salonunda, izleyicinin birkaç metre uzakta durduğu alanlarda kullanılır; NXTIONSTAR iç mekân serisi P1.25, P2.5, P3.07 ve P4 seçenekleriyle sunulur. Dış mekân LED ekran cephe, totem, billboard ve meydan gibi açık alanlar içindir; güneşe, yağmura ve toza dayanacak şekilde seçilir ve P2.5, P2.9, P3.07, P4, P4 önden servis, P5 ve P8 aralıklarında sunulur.",
        },
        {
          h2: "Yüzey ve forma göre LED ekran çeşitleri",
          body:
            "GOB LED ekran (P1.25, P1.53, P1.86) darbeye ve neme karşı korumalı bir yüzey sunar. İnce pitch LED ekran (P0.9, P1.25) toplantı odası, stüdyo ve kontrol odası gibi çok yakın izleme alanlarına uygundur. Esnek LED ekran (P1.86, P2.5) kolon, kavisli duvar ve silindir gibi formlara uyum sağlar. Şeffaf LED ekran vitrin camında arkadaki ürünü göstermeye devam eder; transparan (mesh) LED ekran ise cam cephe ölçeğinde kullanılır. Kiralık LED ekran konser, fuar ve lansman gibi geçici etkinlikler içindir.",
        },
        {
          h2: "Dikey ve etkileşimli ekranlar: poster, totem, menuboard, kiosk",
          body:
            "Poster LED ekran ve totem, dar alanlara sığan dikey formatlı ekranlardır; ayaklı olarak tek başına ya da yan yana birleştirilerek kullanılır. Menuboard, kafe ve restoranlarda menüyü ve kampanyaları gösteren dijital menü ekranıdır. Kiosk ise dokunmatik veya QR etkileşimli bir bilgi ve self-servis noktasıdır; dokunmatik yüzey çoğunlukla paneldir, LED yan yüzey veya arka duvar olarak eklenir. ARLEDSCREEN menuboard ve ayaklı ekranı hem LED hem LCD/TV tipi olarak sunar; LCD seçeneklerinde fiyat teklifle verilir.",
        },
        {
          h2: "Hangi ekran çeşidini seçmeliyim?",
          body:
            "Seçim üç soruyla netleşir: Ekran iç mekânda mı, dış mekânda mı olacak? İzleyici ekrana ne kadar uzakta duracak? Ekranda metin mi, video mu gösterilecek? Pratik kural, her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesidir. Ölçü, piksel aralığı ve montaj şekli ARLEDSCREEN keşfinde birlikte belirlenir; yayımlanmış panel fiyatları fiyat listemizde yer alır.",
        },
      ],
      faqs: [
        {
          question: "LED ekran mı, LCD ekran mı daha uygun?",
          answer:
            "Küçük ve sabit ölçülü bir ekran yeterliyse LCD uygun olabilir. Geniş, çerçevesiz ve parlak bir yüzey ya da dış mekânda okunabilirlik gerekiyorsa tam renkli LED ekran tercih edilir. Menuboard ve ayaklı ekranda iki seçeneği de sunuyoruz; LCD seçeneklerinin fiyatı teklifle verilir.",
        },
        {
          question: "Dış mekân için hangi ekran çeşidi kullanılır?",
          answer:
            "Güneşe, yağmura ve toza dayanıklı dış mekân LED ekran kullanılır. NXTIONSTAR dış mekân serisi P2.5'ten P8'e kadar piksel aralıklarında sunulur; koruma sınıfı ve parlaklık değerleri yazılı teklifte paylaşılır.",
        },
        {
          question: "GOB LED ekran nedir?",
          answer:
            "GOB (Glue on Board), LED modül yüzeyine koruyucu şeffaf bir katman eklenmiş ekrandır. Darbeye ve neme karşı ek koruma sağlar; lobi, mağaza ve dokunma riski olan alanlarda tercih edilir.",
        },
        {
          question: "Totem, poster ve kiosk arasındaki fark nedir?",
          answer:
            "Poster LED ve totem dikey formatlı, çoğunlukla tek yönlü yayın yapan ekranlardır. Kiosk ise dokunmatik veya QR etkileşimi olan bir bilgi ve işlem noktasıdır.",
        },
      ],
      relatedSlugs: ["dijital-ekran", "lcd-ekran", "kiosk-ekran"],
      cta: {
        title: "Size uygun ekran çeşidini birlikte seçelim",
        body:
          "Kullanım yerini, ölçüyü ve izleme mesafesini paylaşın; uygun ekran tipi ve piksel aralığı önerisiyle dönüş yapalım.",
      },
      cardLabel: "Ekran çeşitleri",
      cardTeaser: "LCD, LED tabela, tam renkli LED ve form faktörlerine göre ekran çeşitleri.",
    },
    "menuboard-dijital-menu": {
      slug: "menuboard-dijital-menu",
      title: "Menuboard: Dijital Menü Ekranı, LED ve LCD | ARLEDSCREEN",
      description:
        "Menuboard nedir, nasıl seçilir? Kafe ve restoranlar için LED ve LCD dijital menü ekranı: seçim, içerik ve montaj. ARLEDSCREEN, İstanbul.",
      keywords: [
        "menuboard",
        "menuboard ekran",
        "menü board",
        "dijital menü ekranı",
        "dijital menuboard",
        "LED menuboard",
        "LCD menuboard",
        "kafe menü ekranı",
        "ARLEDSCREEN",
      ],
      h1: "Menuboard: kafe ve restoranlar için dijital menü ekranı",
      intro:
        "Menuboard, kafe ve restoranlarda basılı menü panosunun yerini alan dijital menü ekranıdır; fiyat, ürün görseli ve kampanyalar birkaç dakika içinde güncellenir. ARLEDSCREEN menuboard'u iki seçenekle kurar: LED (kasa üstünde yatay bir iç mekân LED duvar ya da girişte dikey bir poster LED) veya LCD/TV tipi menü ekranı. Keşif, montaj ve içerik yükleme kurulumu İstanbul Gaziosmanpaşa'daki ekibimiz tarafından yapılır.",
      sections: [
        {
          h2: "LED menuboard mı, LCD (TV) menuboard mı?",
          body:
            "İki seçeneği de sunuyoruz. LCD/TV tipi menuboard sabit ölçülü ekranlarla kurulur; birkaç ekran yan yana konduğunda aralarında çerçeve kalır. LED menuboard ise modüllerden kurulur, kasa üstündeki duvarın ölçüsüne göre büyütülür ve tek parça, çerçevesiz bir menü yüzeyi verir; menünün uzaktan ve aydınlık bir ortamda okunması gerekiyorsa LED öne çıkar. Seçim, keşifte alan ölçüsüne ve menü içeriğine göre yapılır. LCD seçeneklerinde fiyat ve teknik bilgi teklifle verilir.",
        },
        {
          h2: "LED menuboard için piksel aralığı",
          body:
            "Menü çoğunlukla kasa önünden, birkaç metre mesafeden okunur. Her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesi kuralına göre P2.5 yaklaşık 2,5 m'den, P1.86 yaklaşık 1,9 m'den rahat okunur. NXTIONSTAR iç mekân serisinde P1.25, P2.5, P3.07 ve P4; GOB serisinde P1.25, P1.53 ve P1.86 seçenekleri vardır. Kesin seçim, kasa önündeki gerçek mesafe ölçülerek yapılır.",
        },
        {
          h2: "Menü içeriği nasıl güncellenir?",
          body:
            "LED menuboard'da içerik, kontrol kartı üzerinden USB, Wi‑Fi veya yerel ağ ile yüklenir. Huidu kontrol kartlarında program bilgisayarda ya da telefonda HDPlayer veya LedArt ile hazırlanıp ekrana gönderilir; zamanlanmış kampanya yayını planlanabilir. Kurulumda yazılım, ekran haritası ve uzaktan erişim ayarları birlikte teslim edilir.",
        },
        {
          h2: "Montaj ve yerleşim",
          body:
            "Kasa üstü menuboard duvara monte edilir veya tavana asılır; dikey poster LED ise ayaklı olarak girişte ya da kasa yanında durur. Elektrik hattı, sinyal kablosu ve servis erişimi keşifte planlanır; montaj ve devreye alma aynı ekip tarafından tamamlanır.",
        },
        {
          h2: "Menuboard ve kafe-restoran projelerimiz",
          body:
            "Yeşilpınar'daki (Eyüpsultan, İstanbul) Aslantürk Ercan Et şubesinde menuboard projesini tamamladık; uygulama Instagram hesabımızda (instagram.com/arledscreen) paylaşıldı. Kafe ve restoran projelerimiz arasında ayrıca Beylikdüzü Yaşam Cafe (İstanbul), Prestij Cafe (Osmanbey, İstanbul), Orta Şekerli Kentpark Cafe (Yozgat, 384 × 128 cm, P1.86), Ouka Kafe (Aksaray) ve Babil Cafe (Niğde) LED ekran kurulumları bulunur. Bu kafe projeleri LED ekran kurulumlarıdır; her biri menuboard projesi değildir.",
        },
        {
          h2: "Menuboard boyutları: iç mekân ve dış mekân",
          body:
            "İç mekânda kasa arkası menüler çoğunlukla 43–55 inç LCD ekranların yan yana dizilmesiyle kurulur; tek parça ve çerçevesiz geniş bir menü yüzeyi istenirse ölçüye göre LED ekran üretilir. Restoran girişinde ayaklı menü için 49, 55 veya 65 inç dikey gövdeler ya da poster LED ekran kullanılır. Güneş alan vitrinde yüksek parlaklıklı ekran gerekir. Dış mekân menüsünde (pencere servisi, arabaya servis, bahçe) ya kapalı kasalı dış mekân LCD ya da dış mekân LED ekran seçilir. LED seçeneklerinde panel fiyatları yayımlıdır; LCD menuboard fiyatı yazılı teklifle verilir.",
        },
      ],
      faqs: [
        {
          question: "Menuboard için kaç inç ekran gerekir?",
          answer:
            "Kasa arkası menülerde genellikle 43–55 inç ekranlar yan yana kullanılır; ayaklı menülerde 49, 55 veya 65 inç dikey gövdeler yaygındır. Daha geniş ve tek parça bir yüzey için ölçüye göre LED ekran üretilir. Dış mekân menüsü kapalı kasalı LCD ya da dış mekân LED ister.",
        },
        {
          question: "Menuboard nedir?",
          answer:
            "Kafe, restoran ve fast-food noktalarında menüyü, fiyatları ve kampanyaları gösteren dijital menü ekranıdır. Basılı panonun aksine içerik yazılımla hızlıca değiştirilir.",
        },
        {
          question: "Menuboard fiyatı ne kadar?",
          answer:
            "Sabit bir menuboard fiyatı yayımlamıyoruz; ölçüye, piksel aralığına ve montaj şekline göre yazılı teklif hazırlıyoruz. LED duvar tipi menuboard'da yayımlanmış iç mekân panel fiyatları geçerlidir: P2.5 iç mekân 32,18 USD, P1.86 GOB 49,08 USD (panel başına, 320 × 160 mm, KDV ve nakliye hariç). Poster ve totem tipi LED menuboard ile LCD/TV tipi menuboard teklifle fiyatlanır.",
        },
        {
          question: "Menuboard'a içerik nasıl yüklenir?",
          answer:
            "LED menuboard'da modele göre USB, Wi‑Fi veya yerel ağ ile yüklenir. Kurulumda yazılım ve ekran ayarları birlikte teslim edilir.",
        },
        {
          question: "Menuboard yatay mı, dikey mi olmalı?",
          answer:
            "Kasa üstündeki geniş menüler için yatay LED duvar, giriş ve dar alanlar için dikey poster LED uygundur. Yerleşim, keşifte alan ölçüsüne göre seçilir.",
        },
      ],
      relatedSlugs: ["poster-led-ekran", "ic-mekan-led-ekran", "dijital-ekran"],
      cta: {
        title: "Menuboard projenizi planlayalım",
        body:
          "Kasa alanının ölçüsünü ve menü içeriğinizi paylaşın; ölçü, piksel aralığı ve yerleşim önerisiyle dönüş yapalım.",
      },
      cardLabel: "Menuboard",
      cardTeaser: "Kafe ve restoranlar için LED ve LCD dijital menü ekranı.",
    },
    "lcd-ekran": {
      slug: "lcd-ekran",
      title: "LCD Ekran Nedir? LED Farkı, Menuboard, Totem | ARLEDSCREEN",
      description:
        "LCD ekran nedir, LED ekrandan farkı ne? Menuboard, ayaklı totem ve kiosk için LCD ekran seçenekleri; fiyat teklifle. ARLEDSCREEN, İstanbul Gaziosmanpaşa.",
      keywords: [
        "LCD ekran",
        "LCD ekran nedir",
        "LCD menuboard",
        "ayaklı LCD ekran",
        "LCD mi LED mi",
        "ARLEDSCREEN",
      ],
      h1: "LCD ekran nedir, ne zaman tercih edilir?",
      intro:
        "LCD ekran, arkadan aydınlatılan sıvı kristal bir panelle görüntü oluşturan ve fabrikada belirlenen ölçüde üretilen dijital ekrandır; TV, monitör, menuboard ve ayaklı totemlerde yaygın olarak kullanılır. ARLEDSCREEN, menuboard ve ayaklı ekran projelerinde LED'in yanı sıra LCD/TV tipi ekran seçeneği de sunar. LCD seçeneklerinde model, ölçü ve fiyat bilgisi yazılı teklifle verilir.",
      sections: [
        {
          h2: "LCD ekran ile LED ekran arasındaki fark",
          body:
            "LCD ekran tek parça bir paneldir; ölçüsü üretimde belirlenir ve birden fazla panel yan yana konduğunda aralarında çerçeve kalır. Tam renkli LED ekran ise modüllerden kurulur; ölçüsü modül eklenerek büyütülür ve çerçevesiz, tek parça bir yüzey verir. Küçük ve yakından bakılan yüzeylerde LCD pratik bir seçenektir; geniş yüzey, uzaktan okunurluk veya dış mekân gerektiğinde LED öne çıkar.",
        },
        {
          h2: "LCD ekran nerelerde kullanılır?",
          body:
            "Kafe ve restoranlarda menuboard, mağaza girişinde ve lobide ayaklı totem, bilgi ve self-servis noktalarında kiosk, ofis ve bekleme alanlarında bilgilendirme ekranı LCD'nin en yaygın kullanım alanlarıdır.",
        },
        {
          h2: "LCD menuboard ve ayaklı LCD ekran",
          body:
            "ARLEDSCREEN, menuboard ve ayaklı ekran projelerinde LCD/TV tipi seçeneği LED ile birlikte değerlendirir. Keşifte kasa üstündeki veya girişteki alan, izleme mesafesi ve içerik türü not edilir; ardından LCD ya da LED için yazılı teklif hazırlanır. Montaj ve devreye almayı aynı ekip yapar.",
        },
        {
          h2: "Fiyat ve teklif",
          body:
            "LCD ekranlar için sitede fiyat yayımlamıyoruz; model, ölçü ve adet netleştikten sonra yazılı teklif hazırlıyoruz. Yayımladığımız teknik bilgiler LCD ekran ve kiosk ürün sayfalarındakilerle sınırlıdır: dokunmatik kiosk 49, 55 ve 65 inç, Android veya Windows, USB, HDMI, LAN ve Wi‑Fi bağlantısı. Diğer değerler seçilen modelle birlikte teklifte paylaşılır. Sitede yayımlanan fiyatlar yalnızca NXTIONSTAR LED paneller içindir ve LED ekran fiyatları sayfasında yer alır.",
        },
        {
          h2: "İnç ölçüsüne ve mekâna göre LCD ekran",
          body:
            "LCD ekran inç ölçüsüyle seçilir. İç mekân ticari ekranlarda yaygın aralık 43–85 inçtir; tekli menü, bilgilendirme ve yönlendirme için 43–55 inç, uzaktan okunacak duvar ekranları için 65–85 inç sık kullanılır. Ayaklı dokunmatik kiosk gövdelerinde tedarik ettiğimiz ölçüler 49, 55 ve 65 inçtir; Android veya Windows tabanlı olabilir. İç mekân LCD standart parlaklıktadır. Cam arkası vitrin için yüksek parlaklıklı, açık hava için ise sızdırmaz kasalı ve iklimlendirmeli dış mekân sınıfı ayrı ürünlerdir; dış mekânda geniş ve parlak yüzey gerektiğinde çoğu projede LED ekran daha uygun olur. LCD için fiyat ve model bilgisi yalnızca yazılı teklifle verilir.",
        },
      ],
      faqs: [
        {
          question: "LCD ekran hangi inç ölçülerinde bulunur?",
          answer:
            "İç mekân ticari LCD ekranlarda yaygın aralık 43–85 inçtir. Dokunmatik kiosk gövdelerinde 49, 55 ve 65 inç seçeneklerini tedarik ediyoruz. Dış mekân LCD ayrı bir sınıftır; ölçü, model ve fiyat yazılı teklifte belirlenir.",
        },
        {
          question: "LCD ekran mı, LED ekran mı almalıyım?",
          answer:
            "Tek ve küçük bir ekran yeterliyse LCD uygun olabilir. Geniş, çerçevesiz ve parlak bir yüzey ya da dış mekânda okunabilirlik gerekiyorsa LED tercih edilir. ARLEDSCREEN iki seçeneği de sunar; seçim keşifte yapılır.",
        },
        {
          question: "LCD menuboard ve ayaklı LCD ekran satıyor musunuz?",
          answer:
            "Evet. Menuboard ve ayaklı ekran projelerinde LED'in yanı sıra LCD/TV tipi ekran seçeneği sunuyoruz. Fiyat yazılı teklifle verilir.",
        },
        {
          question: "LCD ekran fiyatı ne kadar?",
          answer:
            "LCD ekranlar için sabit liste fiyatı yayımlamıyoruz; model, ölçü ve adede göre yazılı teklif hazırlıyoruz.",
        },
        {
          question: "LCD ekran için nasıl teklif alırım?",
          answer:
            "İstanbul Gaziosmanpaşa'daki merkezimizden, +90 530 507 88 34 telefon ve WhatsApp hattından veya arled@arledscreen.com adresinden kullanım yerini, ölçüyü ve adedi paylaşarak teklif isteyebilirsiniz.",
        },
      ],
      relatedSlugs: ["menuboard-dijital-menu", "poster-led-ekran", "ekran-cesitleri"],
      cta: {
        title: "LCD veya LED: doğru ekranı birlikte seçelim",
        body:
          "Kullanım yerini, ölçüyü ve adedi paylaşın; LCD ve LED seçenekleri için yazılı teklifle dönüş yapalım.",
      },
      cardLabel: "LCD ekran",
      cardTeaser: "LCD ekran nedir, LED'den farkı ve LCD menuboard / ayaklı ekran seçenekleri.",
    },
    "kiosk-ekran": {
      slug: "kiosk-ekran",
      title: "Kiosk Ekran Nedir? Dokunmatik Kiosk Seçimi | ARLEDSCREEN",
      description:
        "Kiosk ekran nedir, nerelerde kullanılır, nasıl seçilir? Dokunmatik bilgi ve self-servis kiosk, LCD ve LED seçenekleri, kurulum. ARLEDSCREEN, İstanbul.",
      keywords: [
        "kiosk ekran",
        "kiosk ekran nedir",
        "dokunmatik kiosk",
        "self-servis kiosk",
        "kiosk fiyatı",
        "ARLEDSCREEN",
      ],
      h1: "Kiosk ekran nedir, nasıl seçilir?",
      intro:
        "Kiosk ekran, kullanıcının dokunarak veya QR kod okutarak işlem yaptığı bağımsız bir bilgi ve self-servis noktasıdır; yönlendirme, sipariş, bilet ve katalog gibi işlerde kullanılır. Dokunmatik yüzey çoğunlukla bir paneldir; LED ise yan yüzey ya da arkadaki marka duvarı olarak eklenebilir. ARLEDSCREEN kiosk projelerinde gövde, ekran ve yazılım entegrasyonunu birlikte planlar; fiyat yazılı teklifle verilir.",
      sections: [
        {
          h2: "Kiosk ekran nerelerde kullanılır?",
          body:
            "AVM ve kampüslerde yönlendirme, restoranlarda self-servis sipariş, otellerde bilgi noktası, mağazalarda ürün kataloğu ve bilet ya da sıra alma noktaları kiosk ekranın yaygın kullanım alanlarıdır.",
        },
        {
          h2: "Kiosk, totem ve menuboard farkı",
          body:
            "Kiosk etkileşimlidir: kullanıcı ekrana dokunur veya QR kod okutur. Totem ve poster ekran çoğunlukla tek yönlü reklam ve bilgilendirme yapar. Menuboard ise kasa önünde menüyü ve kampanyaları gösterir. Karma alanlarda kiosk ile poster LED yan yana planlanabilir.",
        },
        {
          h2: "Kiosk ekran seçerken nelere bakılır?",
          body:
            "Önce kullanıcı akışı ve işlem tipi netleşir. Ardından ekran teknolojisi, gövde, kilit ve sabitleme, kablo gizleme ile yazıcı, kart okuyucu ve POS gibi çevre birimleri seçilir. Dış mekân kioskunda IP korumalı gövde ve iklimlendirme gerekir; değerler seçilen modelin teknik föyüyle yazılı teklifte paylaşılır.",
        },
        {
          h2: "Kurulum ve operasyon",
          body:
            "Zemin ankrajı, engelli erişim yüksekliği ve kuyruk mesafesi mimariyle uyumlu olmalıdır. Çok şubeli kurulumlarda tip gövde ve merkezi içerik yönetimi tanımlanır. ARLEDSCREEN teslimatında montaj, ağ bağlantısı ve operatör eğitimi birlikte yürür. Mühendislik ayrıntıları kiosk dijital ekran rehberimizde yer alır.",
        },
        {
          h2: "Kiosk ekran boyutları ve iç/dış mekân",
          body:
            "Tedarik ettiğimiz dokunmatik dijital kiosklar 49, 55 ve 65 inç ölçülerindedir; her ölçü Android veya Windows tabanlı olarak seçilebilir ve USB, HDMI, LAN ile Wi-Fi bağlantısıyla içerik güncellenir. Bu gövdeler alışveriş merkezi, mağaza, restoran, otel lobisi ve toplantı alanı gibi kapalı mekânlar içindir. Açık havada kullanılacak kiosk için sızdırmaz kasa, yüksek parlaklık ve iklimlendirme gerekir; böyle bir talep proje bazında ayrıca değerlendirilir. Fiyat ve stok durumu yazılı teklifle bildirilir.",
        },
      ],
      faqs: [
        {
          question: "Kiosk ekran kaç inç olur?",
          answer:
            "Tedarik ettiğimiz dokunmatik kiosklar 49, 55 ve 65 inçtir; Android veya Windows tabanlı seçilebilir. Bunlar iç mekân içindir; dış mekân kiosk talepleri proje bazında değerlendirilir ve fiyat yazılı teklifle verilir.",
        },
        {
          question: "Kiosk ekran nedir?",
          answer:
            "Kullanıcının dokunarak veya QR kod okutarak bilgi aldığı ya da işlem yaptığı bağımsız ekran noktasıdır. Yönlendirme, sipariş, bilet ve katalog için kullanılır.",
        },
        {
          question: "Kiosk ekran fiyatı ne kadar?",
          answer:
            "Kiosk ekranlar için sabit liste fiyatı yayımlamıyoruz. Ekran tipi, gövde, çevre birimleri, yazılım ve adede göre yazılı teklif hazırlıyoruz.",
        },
        {
          question: "Kiosk ekran LCD mi, LED mi olur?",
          answer:
            "Dokunmatik yüzey çoğunlukla paneldir; LED ise yan yüzey veya arka video duvar olarak eklenir. İhtiyaç keşifte kullanım senaryosuna göre belirlenir.",
        },
        {
          question: "Dış mekânda kiosk kullanılabilir mi?",
          answer:
            "Evet; IP korumalı gövde ve iklimlendirme ile. Keşifte güneş, yağmur ve vandalizm riski değerlendirilir.",
        },
      ],
      relatedSlugs: ["kiosk-dijital-ekran", "lcd-ekran", "menuboard-dijital-menu"],
      cta: {
        title: "Kiosk ekran projenizi planlayalım",
        body:
          "Kullanım senaryosunu, adedi ve yazılım ihtiyacını paylaşın; gövde ve ekran önerisiyle yazılı teklif hazırlayalım.",
      },
      cardLabel: "Kiosk ekran",
      cardTeaser: "Kiosk ekran nedir, nerelerde kullanılır ve nasıl seçilir.",
    },
    "cnc-led-kasa": {
      slug: "cnc-led-kasa",
      title: "CNC LED Kasa: Tipleri, Ölçüleri, Malzeme | ARLEDSCREEN",
      description:
        "CNC LED ekran kasası nedir? Sac, alüminyum ve döküm kasa tipleri, 96×96 cm ve 640×480 mm gibi standart ölçüler, iç/dış mekân farkı. Fiyat teklif üzerine.",
      keywords: [
        "CNC LED kasa",
        "LED ekran kasası",
        "LED kabin ölçüleri",
        "96x96 LED kasa",
        "alüminyum LED kabin",
        "ARLEDSCREEN",
      ],
      h1: "CNC LED kasa nedir? Tipleri ve ölçüleri",
      intro:
        "CNC LED kasa, LED modüllerin, alıcı kartın ve güç kaynaklarının taşındığı, CNC veya lazer kesimle ölçüsünde üretilen ekran gövdesidir; sektörde kabin olarak da anılır. Kasa ölçüsü modül ölçüsünün katı olarak seçilir: 320 × 160 mm modülle çalışan NXTIONSTAR ekranlarda gövde 32 cm ve 16 cm adımlarla büyür. ARLEDSCREEN kasa tipini ve ölçüsünü keşifte ekran yüzeyine, iç veya dış mekâna ve servis yönüne göre belirler; kasa fiyatı teklif üzerine verilir.",
      sections: [
        {
          h2: "Malzemeye göre LED kasa tipleri",
          body:
            "Sac kasa (DKP sac): CNC veya lazerle kesilip bükülen, fırın boyalı çelik gövdedir. Maliyeti düşük, ağırlığı daha fazladır; sabit kurulumlarda ve P2.5–P10 aralığındaki ekranlarda yaygındır. Alüminyum kasa: levha veya profilden işlenir; sacdan hafiftir, paslanmaz ve dış mekân için fan kapaklı türleri bulunur. Döküm (die-cast) alüminyum ve magnezyum alaşım kabin: kalıpta dökülüp CNC ile son işlemden geçer; ölçü hassasiyeti yüksektir, kabinler boşluksuz birleşir. İnce pitch iç mekân ekranlarda ve kiralık sistemlerde tercih edilir.",
        },
        {
          h2: "Standart LED kasa ölçüleri",
          body:
            "Sac CNC kasada piyasanın en yaygın gövdesi 96 × 96 cm'dir ve 3 × 6 düzende 18 adet 32 × 16 cm modül alır. Küçük ekran ve tabelalarda 64 × 48 cm (6 modül), 64 × 64 cm ve 96 × 48 cm; bant tipi ekranlarda 16 cm yüksekliğinde uzun gövdeler kullanılır. Bu seri 32 × 16 cm adımla 256 × 128 cm'ye kadar uzanır. Döküm kabinlerde ölçü milimetreyle verilir: ince pitch iç mekânda 640 × 480, 640 × 640 ve 320 × 480 mm; kiralık ve sahne sistemlerinde 500 × 500 ve 500 × 1000 mm; dış mekânda 960 × 960 mm. Poster LED ekranlar için 64 × 192 cm gibi dikey kasalar ayrı bir gruptur.",
        },
        {
          h2: "İç mekân ve dış mekân kasa farkı",
          body:
            "İç mekân kasalar daha incedir ve çoğunlukla önden servis edilir: modüller mıknatısla tutulur, vakumlu aparatla sökülür; böylece ekran duvara boşluksuz monte edilebilir. Dış mekân kasalar yağmur ve toza karşı contalı, kapaklı ve havalandırmalı yapılır; arkadan servis yaygındır ve güneş alan cephede fanla ısı tahliyesi planlanır. Direk ve köşe gibi iki yönden görülen noktalar için çift yüzlü kasa üretilir.",
        },
        {
          h2: "Kasa seçimi nasıl yapılır?",
          body:
            "Önce ekranın toplam ölçüsü ve piksel aralığı belirlenir; ardından bu yüzeyi en az ek parçayla bölen kasa ölçüsü seçilir. Servis yönü (ön veya arka), duvar önündeki boşluk, taşıyıcı çeliğin yükü, sabit ya da kiralık kullanım ve tek ya da çift yüz kararı seçimi netleştirir. ARLEDSCREEN bu seçimi keşifte yapar; kasa, modül, kontrol sistemi ve montaj tek teklifte yer alır.",
        },
        {
          h2: "LED kasa fiyatı",
          body:
            "Kasa fiyatı malzemeye, ölçüye, adede, servis yönüne ve conta-boya gibi ayrıntılara göre değişir. Kasa için sitede liste fiyatı yayımlamıyoruz; fiyat teklif üzerine verilir. LED panel fiyatları ise LED ekran fiyatları sayfamızda yayımlıdır.",
        },
      ],
      faqs: [
        {
          question: "En yaygın LED kasa ölçüsü nedir?",
          answer:
            "Sac CNC kasada en yaygın gövde 96 × 96 cm'dir ve 32 × 16 cm modülden 18 adet alır. İnce pitch iç mekânda 640 × 480 mm, kiralık sistemlerde 500 × 500 ve 500 × 1000 mm döküm kabinler yaygındır.",
        },
        {
          question: "Sac kasa mı, alüminyum kasa mı?",
          answer:
            "Sac kasa daha ekonomik ama daha ağırdır ve sabit kurulumlarda yeterlidir. Alüminyum ve döküm kabinler daha hafif, paslanmaya dayanıklı ve ölçüce daha hassastır; ince pitch, kiralık ve hafiflik gereken cephe işlerinde öne çıkar.",
        },
        {
          question: "LED kasa fiyatı ne kadar?",
          answer:
            "Kasa için sabit liste fiyatı yayımlamıyoruz; malzeme, ölçü ve adede göre teklif üzerine fiyat veriyoruz.",
        },
      ],
      relatedSlugs: ["dis-mekan-led-ekran", "ic-mekan-led-ekran", "poster-led-ekran"],
      cta: {
        title: "LED kasa ölçünüzü birlikte belirleyelim",
        body:
          "Ekran ölçüsünü, piksel aralığını ve montaj yerini paylaşın; kasa tipini önerip teklifimizi hazırlayalım.",
      },
      cardLabel: "CNC LED kasa",
      cardTeaser: "LED ekran kasası tipleri, standart ölçüler ve iç/dış mekân farkı.",
    },
    "dis-mekan-led-ekran": {
      slug: "dis-mekan-led-ekran",
      title: "Dış Mekân LED Ekran Rehberi: Cephe, Totem | ARLEDSCREEN",
      description:
        "Dış mekân LED ekran ve dış mekân ekranlar: IP65 koruma, yüksek nit, cephe / DOOH mühendisliği. NXTIONSTAR dış mekân modülleri — ARLEDSCREEN keşif ve montaj, İstanbul.",
      keywords: [
        "dış mekân LED ekran",
        "dış mekân ekranlar",
        "dış mekan ekran",
        "dış mekan LED ekran",
        "IP65 LED",
        "DOOH LED",
        "cephe LED",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Dış mekân LED ekran: cephe, totem ve billboard",
      intro:
        "Dış mekân LED ekran; bina cephesi, totem, billboard ve meydan gibi açık alanlarda güneşe, yağmura ve toza dayanacak şekilde kurulan reklam ve bilgilendirme ekranıdır. NXTIONSTAR dış mekân serisi P2.5, P2.9, P3.07, P4, P4 önden servis, P5 ve P8 aralıklarında sunulur. Yayımlanmış panel fiyatları 29,90 – 63,70 USD arasındadır (panel başına, KDV ve nakliye hariç). ARLEDSCREEN taşıyıcı sistemi, elektrik ve sinyal altyapısını keşifte planlar; montaj ve servisi aynı ekip yapar.",
      sections: [
        {
          h2: "Dış mekân ekranlarda IP65 ve GOB neden kritik?",
          body:
            "IP65, toz ve su jeti etkisine karşı kabin sızdırmazlığını ifade eder. Cephe ve yol kenarı DOOH kurulumlarında sızdırmaz conta, drenaj ve doğru montaj açısı olmadan uzun ömür beklenmez. GOB (glue on board) yüzey zırhı darbeye ve neme karşı ek koruma sağlar — NXTIONSTAR dış mekân serilerinde bu katman ürün seçiminde açıkça konuşulur.",
        },
        {
          h2: "Parlaklık, pitch ve izleme mesafesi",
          body:
            "Dış mekân NXTIONSTAR aralıkları: P2.5, P2.9, P3.07, P4, P4 önden servis, P5 ve P8. Uzak billboard’da daha büyük P, yakın yaya trafiğinde daha ince P tercih edilir. Parlaklık ve koruma sınıfı modele göre yazılı teklifte paylaşılır; sitede genel nit/IP iddiası yoktur. ARLEDSCREEN keşfinde ortalama izleme mesafesi, güneş yönü ve gece/gündüz içerik profili not edilir.",
        },
        {
          h2: "Cephe, stadyum koridoru ve belediye DOOH",
          body:
            "Bina cephesi iskelet ve rüzgâr yükü hesabı ister; stadyum / arena koridorunda titreşim ve servis erişimi öne çıkar; belediye dijital tabelasında içerik takvimi ve enerji hattı kritiktir. Her senaryoda güç topolojisi (tek / üç faz) ve yedek alıcı ihtiyacı teklife yazılır.",
        },
        {
          h2: "Keşiften montaja ARLEDSCREEN süreci",
          body:
            "Ölçü paylaşımı veya yerinde keşif sonrası kabin dizilimi, çelik konstrüksiyon arayüzü, sinyal hattı (CAT6A / fiber) ve bakım erişimi çizilir. Yapay zekâ veya CMS ile zamanlanan DOOH içeriği varsa alıcı / gönderici uyumu da paketlenir. Kurulum sonrası kalibrasyon ve teknik destek aynı masadan yürür.",
        },
      ],
      faqs: [
        {
          question: "Dış mekân LED ekran kaç nit olmalı?",
          answer:
            "Ortam ışığına ve ekranın güneş alma yönüne bağlıdır; güneşe dönük cephede gölgeli alana göre daha yüksek parlaklık gerekir. Keşifte yön ve ortam ışığı not edilir; seçilen modelin parlaklık değeri teknik föyle yazılı teklifte paylaşılır.",
        },
        {
          question: "IP65 olmadan dışarı kurulur mu?",
          answer:
            "Kapalı sundurma veya yarı açık alanlar için ara çözümler konuşulabilir; açık cephe ve yağmura açık DOOH için IP65 (veya eşdeğer sızdırmazlık) zorunlu kabul edilir.",
        },
        {
          question: "Dış mekân ekran bakım aralığı nedir?",
          answer:
            "Ortam kirliliği ve çalışma saatine göre değişir. ARLEDSCREEN teklifinde periyodik temizlik, fan/PSU kontrolü ve yazılım güncelleme maddeleri opsiyonel olarak eklenir.",
        },
        {
          question: "Dış mekân LED ekran projelerinizden örnek var mı?",
          answer:
            "Manisa Büyükşehir Belediyesi (1344 × 128 cm, P4), Bursa (576 × 480 cm, P5, dış mekân) ve Beylikdüzü Yaşam Cafe (640 × 128 cm, dış mekân) kayıtlı projelerimiz arasındadır. Tüm liste Projelerimiz sayfasındadır.",
        },
      ],
      relatedSlugs: ["led-ekran", "vitrin-led-ekran", "poster-led-ekran"],
      cta: {
        title: "Dış mekân LED projenizi planlayalım",
        body:
          "Cephe ölçüsü, güneş yönü ve kullanım amacını iletin; IP65 / nit / pitch özeti ile dönüş yapalım.",
      },
      cardLabel: "Dış mekân LED",
      cardTeaser: "IP65 cephe, DOOH ve yüksek nit dış mekân ekranlar.",
    },
    "ic-mekan-led-ekran": {
      slug: "ic-mekan-led-ekran",
      title: "İç Mekân LED Ekran Rehberi: Seçim ve Kullanım | ARLEDSCREEN",
      description:
        "İç mekân LED ekran ve iç mekân ekran seçimi: ince pitch, kamera dostu yenileme, lobi / stüdyo / konferans. NXTIONSTAR iç mekân modülleri — ARLEDSCREEN mühendisliği, İstanbul.",
      keywords: [
        "iç mekân LED ekran",
        "iç mekân ekran",
        "iç mekan ekran",
        "iç mekan LED ekran",
        "ince pitch LED",
        "stüdyo LED",
        "lobi video duvar",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "İç mekân LED ekran: nasıl seçilir, nerede kullanılır?",
      intro:
        "İç mekân LED ekran; mağaza, kafe, otel lobisi, showroom ve toplantı salonu gibi kapalı alanlarda, izleyicinin birkaç metre mesafeden baktığı ekrandır. Bu yüzden ince piksel aralığı ve tutarlı renk önceliklidir. NXTIONSTAR iç mekân serisi P1.25, P2.5, P3.07 ve P4; GOB serisi P1.25, P1.53 ve P1.86 seçenekleriyle sunulur. Yayımlanmış panel fiyatları 26,98 – 95,88 USD arasındadır (panel başına, KDV ve nakliye hariç). ARLEDSCREEN keşif, montaj ve teknik servisi İstanbul Gaziosmanpaşa'dan yürütür.",
      sections: [
        {
          h2: "İç mekân ekranda pitch ve izleme mesafesi",
          body:
            "İç mekân NXTIONSTAR aralıkları: P1.25, P2.5, P3.07 ve P4 (P1.25 GOB seçenekli). Lobi ve showroom’da daha ince P; uzak koridorlarda P3.07–P4 tercih edilebilir. İnce pitch grubunda ayrıca P0.9 / P1.25 yayımlanır. Kabaca her 1 mm pitch için ~1 m kritik mesafe kuralı başlangıç noktasıdır — ARLEDSCREEN keşfinde gerçek oturma / ayakta izleme mesafesi ölçülür.",
        },
        {
          h2: "Kamera dostu yenileme ve renk",
          body:
            "Yayın, kurumsal etkinlik kaydı veya sosyal medya çekiminde tarama çizgisi ve flicker istenmez. Yüksek yenileme oranı, kalibre beyaz nokta ve tutarlı gamut stüdyo / sahne iç mekân LED’inde şarttır. Bu değerler keşifte seçilen NXTIONSTAR modelinin teknik föyüyle teyit edilir.",
        },
        {
          h2: "Lobi, perakende ve kurumsal salon",
          body:
            "Otel / ofis lobisinde marka videosu ve yönlendirme; perakende duvarında ürün vitrini; yönetim katında dashboard ve toplantı içeriği. Parlaklık iç mekânda aşırı yüksek tutulmaz — göz konforu ve ambient ışık dengelenir. Ses / AV entegrasyonu gerekirse sinyal şeması teklife eklenir.",
        },
        {
          h2: "YZ uyumlu iç mekân LED",
          body:
            "Yapay zekâ ile üretilen veya otomatik seçilen içerik lobide veya salonda kesintisiz akmalıdır. Bu nedenle teklifte yenileme davranışı, alıcı kartı yolu ve CMS / medya sunucusu uyumu yazılı olarak belirtilir.",
        },
      ],
      faqs: [
        {
          question: "İç mekân LED mi LCD video duvar mı?",
          answer:
            "Çerçevesiz geniş yüzey, yüksek parlaklık ve esnek boyut için LED öne çıkar. Küçük sabit panel ihtiyacında LCD hâlâ uygundur. Keşifte yüzey alanı ve içerik tipi ayırır.",
        },
        {
          question: "İç mekân ekran kaç nit olmalı?",
          answer:
            "Parlaklık ortam ışığına göre seçilir: karanlık salonda aşırı parlaklık göz yorar, güneş alan atriumda veya vitrin arkasında daha yüksek parlaklık gerekir. Seçilen modelin parlaklık değeri teknik föyle birlikte yazılı teklifte paylaşılır.",
        },
        {
          question: "Servis ön mü arka mı?",
          answer:
            "Duvar boşluğu ve erişim yolu belirler. İnce arkalıklı lobi duvarlarında ön servis tercih edilir; teknik oda arkası olan kurulumlarda arka servis daha hızlıdır.",
        },
        {
          question: "İç mekân LED ekran fiyatı ne kadar?",
          answer:
            "Yayımlanmış iç mekân ve GOB panel fiyatları 26,98 USD (P4) ile 95,88 USD (P1.25 GOB) arasındadır; fiyatlar panel başına, 320 × 160 mm modül içindir ve KDV ile nakliye hariçtir. Toplam tutar ölçü, kontrol sistemi ve montaja göre yazılı teklifle kesinleşir.",
        },
      ],
      relatedSlugs: [
        "led-ekran",
        "konferans-salonu-led",
        "mimari-muhendislik-led",
      ],
      cta: {
        title: "İç mekân LED duvarınızı boyutlandıralım",
        body:
          "Salon / lobi ölçüsü ve izleme mesafesini paylaşın; ince pitch ve güç özeti ile dönüş yapalım.",
      },
      cardLabel: "İç mekân LED",
      cardTeaser: "İnce pitch lobi, stüdyo ve kurumsal iç mekân ekran.",
    },
    "mimari-muhendislik-led": {
      slug: "mimari-muhendislik-led",
      title: "Mimari ve Mühendislik LED Entegrasyonu — ARLEDSCREEN",
      description:
        "Mimari ve mühendislik ekipleri için LED ekran entegrasyonu: statik yük, iskelet, güç, ısı ve sinyal. NXTIONSTAR + ARLEDSCREEN keşif paketi — İstanbul Gaziosmanpaşa.",
      keywords: [
        "mimari LED",
        "mühendislik LED",
        "LED entegrasyon",
        "cephe mühendisliği",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Mimari ve mühendislik LED entegrasyonu",
      intro:
        "LED yüzeyi yalnızca bir ekran değil; mimari kabuğun ve elektrik / mekanik sistemin parçasıdır. ARLEDSCREEN, mimar ve mühendislik ofisleriyle NXTIONSTAR ürünlerini statik, güç ve sinyal disiplininde birlikte boyutlandırır.",
      sections: [
        {
          h2: "Erken fazda LED kararları",
          body:
            "Konsept ve uygulama projesinde pitch / kabin kararı geç bırakılırsa iskelet ve kablo şaftı yetmez. ARLEDSCREEN keşif notunda yüzey alanı, izleme açıları, bakım platformu ve yangın / kaçış güzergâhı ile çakışmalar işaretlenir. Mimari render’a gerçek kabin modülü oturtulabilir.",
        },
        {
          h2: "Statik yük, iskelet ve cephe detayı",
          body:
            "Dış mekân LED’de rüzgâr ve ölü yük hesabı; iç mekânda asma tavan / duvar taşıyıcı kapasitesi kritiktir. Çelik veya alüminyum iskelet arayüzü üretici kabin montaj noktalarına göre çizilir. Su yalıtımı, termal genleşme ve servis paneli boşlukları detay projeye işlenir.",
        },
        {
          h2: "Güç, ısı ve sinyal mühendisliği",
          body:
            "Peak güç, eşzamanlılık faktörü ve üç faz dengesi elektrik projesine verilir. Kabin arkasında havalandırma veya aktif soğutma gerekebilir. Uzun hatlarda fiber; kısa hatlarda CAT6A; yedek gönderici / alıcı topolojisi kritik mekânlarda önerilir. YZ / medya sunucu hattı varsa port ve gecikme bütçesi eklenir.",
        },
        {
          h2: "Disiplinler arası teslim paketi",
          body:
            "ARLEDSCREEN teklifi yalnızca ürün listesi değil; ön BOM, güç özeti, sinyal şeması ve montaj notudur. Şantiye koordinasyonunda ana yüklenici, elektrik ve AV ekipleriyle tek muhatap olunur — Gaziosmanpaşa merkezli mühendislik masası.",
        },
      ],
      faqs: [
        {
          question: "Mimari ofis ne zaman ARLEDSCREEN’i çağırmalı?",
          answer:
            "İdeal olarak uygulama projesi öncesi veya ihale paketi hazırlanırken. Geç çağrı iskelet revizyonu ve ek maliyet doğurur.",
        },
        {
          question: "LED ağırlığı projeye nasıl verilir?",
          answer:
            "Kabin + iskelet + kablo tahmini kg/m² olarak paylaşılır; statik mühendis bu değeri taşıyıcı hesaba işler. Kesin rakam ürün ve montaj tipine bağlıdır.",
        },
        {
          question: "Şeffaf vitrin LED mimariye uyumlu mu?",
          answer:
            "Evet — vitrin şeffaflığı ve gündüz/gece görünürlük dengesi mimari konseptle birlikte seçilir. Ayrı rehberde vitrin LED detayı var.",
        },
      ],
      relatedSlugs: [
        "dis-mekan-led-ekran",
        "ic-mekan-led-ekran",
        "vitrin-led-ekran",
      ],
      cta: {
        title: "Mimari LED entegrasyonunu birlikte çizelim",
        body:
          "Proje dosyası veya ölçü setini paylaşın; iskelet, güç ve sinyal özeti ile dönüş yapalım.",
      },
      cardLabel: "Mimari & mühendislik",
      cardTeaser: "İskelet, güç, ısı ve sinyal — disiplinler arası LED.",
    },
    "konferans-salonu-led": {
      slug: "konferans-salonu-led",
      title: "Konferans Salonu LED Ekran: Ölçü, Piksel Aralığı ve Fiyat | ARLEDSCREEN",
      description:
        "Konferans salonu ve amfi için LED ekran: salon derinliğine göre ekran ölçüsü, ilk sıraya göre piksel aralığı, örnek ölçü ve modül bedeli tablosu, AV bağlantıları. NXTIONSTAR — ARLEDSCREEN, İstanbul.",
      keywords: ["konferans salonu LED ekran", "konferans salonları", "okul konferans salonu", "amfi LED ekran", "toplantı salonu LED ekran", "salon video duvar", "NXTIONSTAR", "ARLEDSCREEN"],
      h1: "Konferans salonu LED ekran nasıl seçilir?",
      intro:
        "Konferans salonunda LED ekranı iki mesafe belirler: ilk sıranın ekrana uzaklığı piksel aralığını, son sıranın uzaklığı ekran yüksekliğini. Sunum ve yazı ağırlıklı salonlarda genellikle iç mekân P2.5, derin salonlarda P3.07 yeterlidir; ekran yüksekliği son sıra mesafesinin yaklaşık sekizde biri seçilir. LED ekran projeksiyona göre aydınlık salonda da net görünür ve karartma gerektirmez. ARLEDSCREEN, kendi markası NXTIONSTAR ekranların keşfini, montajını ve teknik servisini İstanbul Gaziosmanpaşa merkezinden yapar.",
      sections: [
        {
          h2: "Piksel aralığı: ilk sıraya göre",
          body:
            "Yaklaşık 1 mm piksel aralığı için 1 m mesafe kuralı kullanılır. İlk sıra 2,5 m uzaktaysa P2.5, 3 m ve üzerindeyse P3.07 yeterlidir. Yönetim kurulu odası gibi 1,5–2 m'den izlenen salonlarda P1.53 veya P1.86 GOB tercih edilir. Yayımlanmış panel fiyatları (USD, panel başına, KDV ve nakliye hariç): P1.53 GOB 62,08, P1.86 GOB 49,08, P2.5 iç mekân 32,18, P3.07 iç mekân 30,88.",
        },
        {
          h2: "Ekran ölçüsü: son sıraya göre",
          body:
            "Sunum yazılarının son sıradan okunması için ekran yüksekliği, son sıra mesafesinin yaklaşık sekizde biri seçilir. Ölçü 320 × 160 mm modül katlarına göre planlanır; 16:9 oranına en yakın modül düzeni seçilir ki bilgisayar görüntüsü kenarlarda boşluk bırakmadan dolsun. Tablodaki örnekler bu kurala göre hazırlanmıştır.",
        },
        {
          h2: "Projeksiyon yerine LED",
          body:
            "LED ekran aydınlık salonda da yüksek kontrast verir, perde ve karartma gerekmez, görüntü kenardan kenara eşit parlaklıktadır. Modül eklenerek büyütülebilir ve arızalı modül tek başına değiştirilir.",
        },
        {
          h2: "Ses, kamera ve kontrol bağlantıları",
          body:
            "Laptop, kablosuz sunum cihazı, medya oynatıcı ve kamera kaydı ekranla aynı bağlantı planında düşünülür. Kamera ile yayın yapılacaksa bunu keşifte belirtin; kontrol sistemi ve tazeleme ayarları buna göre planlanır. Sahne arkası duvar, asma sistem veya yerden yükselen konstrüksiyon seçeneklerinin taşıma ve güvenlik detayı teklifte yazılır.",
        },
        {
          h2: "Okul ve kurumsal salonlar",
          body:
            "Okul konferans salonu ve amfilerde dayanıklılık ve kolay kullanım, kurumsal salonlarda ince piksel aralığı ve marka renkleri öne çıkar. Okul ekranlarının tamamı için ayrı okul rehberimize bakabilirsiniz. Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Ürünlerimiz CE sertifikalıdır. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir.",
        },
      ],
      faqs: [
        {
          question: "Konferans salonu için hangi piksel aralığı gerekir?",
          answer:
            "İlk sıra 2,5 m uzaktaysa P2.5 (32,18 USD/panel), 3 m ve üzerindeyse P3.07 (30,88 USD/panel) iç mekân yeterlidir. 1,5–2 m'den izlenen toplantı odalarında P1.53 veya P1.86 GOB önerilir.",
        },
        {
          question: "Konferans salonu LED ekran ne kadar büyük olmalı?",
          answer:
            "Ekran yüksekliği son sıra mesafesinin yaklaşık sekizde biri seçilir. Son sıra 15 m uzaktaysa yaklaşık 3,52 × 1,92 m (132 modül) bir ekran uygundur; P2.5 iç mekân modül bedeli 132 × 32,18 = 4.247,76 USD'dir (yalnızca modül, KDV ve nakliye hariç).",
        },
        {
          question: "Projeksiyon yerine LED neden tercih edilir?",
          answer:
            "LED aydınlık salonda da net görünür, karartma ve perde gerektirmez, parlaklığı yüzey boyunca eşittir ve modül modül onarılabilir.",
        },
        {
          question: "Konferans salonu LED ekran fiyatı neye göre değişir?",
          answer:
            "Ekran ölçüsü, piksel aralığı, montaj şekli (duvar, asma, konstrüksiyon) ve kontrol sistemi fiyatı belirler. Panel fiyatları yayımlanmıştır; kesin tutar keşif sonrası yazılı teklifle verilir. Taksitli ödeme yapılabilir.",
        },
        {
          question: "Teslim ve kurulum ne kadar sürer?",
          answer:
            "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. İstanbul'un tüm ilçelerinde proje yaptık; montaj tarihi keşifte planlanır.",
        },
      ],
      relatedSlugs: ["okul-led-ekran", "ic-mekan-led-ekran", "dugun-salonu-led"],
      cta: {
        title: "Salonunuz için ekranı boyutlandıralım",
        body:
          "Salon planını, ilk ve son sıra mesafesini ve sahne duvarının fotoğrafını gönderin; ölçü, piksel aralığı ve bütçe önerisi hazırlayalım.",
      },
      cardLabel: "Konferans salonu LED ekran",
      cardTeaser: "Salon derinliğine göre ekran ölçüsü, ilk sıraya göre piksel aralığı ve örnek modül bedelleri.",
    },
    "vitrin-led-ekran": {
      slug: "vitrin-led-ekran",
      title: "Vitrin LED Ekran | Şeffaf & Perakende — ARLEDSCREEN",
      description:
        "Vitrin LED ekran: şeffaf panel, perakende vitrin ve mağaza cephesi. NXTIONSTAR şeffaf / ince pitch çözümler — ARLEDSCREEN keşif, İstanbul.",
      keywords: [
        "vitrin LED ekran",
        "şeffaf LED",
        "perakende LED",
        "mağaza vitrin ekran",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Vitrin LED ekran çözümleri",
      intro:
        "Vitrin LED ekran, mağaza camını reklam yüzeyine çevirirken içeriğin görünürlüğünü koruyabilir. ARLEDSCREEN / NXTIONSTAR şeffaf ve ince panel seçenekleriyle perakende vitrin projelerini keşiften montaja yönetir.",
      sections: [
        {
          h2: "Şeffaf LED vs opak vitrin duvarı",
          body:
            "Şeffaf LED cam arkasında ürünü göstermeye devam eder; opak LED ise tam video duvar etkisi verir. Marka hikâyesi ve ürün teşhiri dengesi konsept aşamasında seçilir. Şeffaflık oranı (%) ve pitch birlikte değerlendirilir — ince pitch daha ‘ekran’, yüksek şeffaflık daha ‘cam’ hissi verir. Bina cephesi ölçeğinde mesh form için ayrı ürün grubu: transparan LED ekran.",
        },
        {
          h2: "Gündüz okunabilirlik ve gece dimming",
          body:
            "Cadde vitrininde güneş yansıması nit ihtiyacını artırır; gece aşırı parlaklık yayalar için rahatsız edici olabilir. Otomatik sensör veya zamanlı dimming planlanır. ARLEDSCREEN keşfinde cephe yönü ve ambient ışık not edilir.",
        },
        {
          h2: "Montaj: cam önü, cam arkası, asma",
          body:
            "Cam arkası montajda derinlik ve servis erişimi; cam önünde güvenlik ve yaya mesafesi kritiktir. Kablo gizleme ve güç panosu mağaza operasyonunu bozmayacak şekilde yerleştirilir. Yangın ve kaçış güzergâhı ile çakışma kontrol edilir.",
        },
        {
          h2: "İçerik ve YZ / CMS hattı",
          body:
            "Vitrin içeriği sık değişir: kampanya, stok, AI ile üretilen görseller. Medya oynatıcı veya CMS / AI motoru ile alıcı uyumu teklifte yazılır.",
        },
      ],
      faqs: [
        {
          question: "Vitrin LED ekran camı keser mi?",
          answer:
            "Çoğu kurulum mevcut vitrine ek panel veya arkaya montajdır. Cam değişimi gerekirse mimari / cephe ekibiyle birlikte planlanır.",
        },
        {
          question: "Şeffaf LED her ürüne uyar mı?",
          answer:
            "Yoğun metin veya küçük punto içerikte opak ince pitch daha okunaklı olabilir. Ürün teşhiri öncelikliyse şeffaf avantajlıdır.",
        },
        {
          question: "Perakende zincirinde standart paket var mı?",
          answer:
            "Evet — tekrarlayan mağaza ölçüleri için tip proje ve merkezi CMS senkronu tasarlanabilir. Teklifte şube adedi ölçeklenir.",
        },
      ],
      relatedSlugs: [
        "poster-led-ekran",
        "ic-mekan-led-ekran",
        "menuboard-dijital-menu",
      ],
      cta: {
        title: "Vitrin LED projenizi planlayalım",
        body:
          "Vitrin ölçüleri ve şeffaflık hedefini paylaşın; panel ve içerik hattı özeti ile dönüş yapalım.",
      },
      cardLabel: "Vitrin LED",
      cardTeaser: "Şeffaf ve perakende vitrin LED ekran çözümleri.",
    },
    "poster-led-ekran": {
      slug: "poster-led-ekran",
      title: "Ayaklı Dijital Ekran: Poster LED ve Totem | ARLEDSCREEN",
      description:
        "Ayaklı dijital ekran: poster LED, totem ve LCD seçenekleri. Mağaza girişi, AVM, otel ve dış mekân için dikey ekran. ARLEDSCREEN keşif ve montaj.",
      keywords: [
        "ayaklı ekran",
        "ayaklı dijital ekran",
        "dijital totem",
        "ayaklı reklam ekranı",
        "poster LED ekran",
        "LED totem",
        "dijital poster",
        "dikey LED",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Ayaklı dijital ekran: poster LED ve totem",
      intro:
        "Ayaklı dijital ekran, zemine oturan ve dikey formatta reklam ya da bilgilendirme gösteren ekrandır; poster LED ekran ve totem olarak iki ana tipte kurulur. Poster LED taşınabilir yapıdadır, mağaza girişi, lobi ve etkinlik alanı için uygundur. Totem ise iç veya dış mekânda, tek ya da çift yüzlü çalışır. LED'in yanı sıra LCD/TV tipi ayaklı ekran seçeneği de sunuyoruz. ARLEDSCREEN ayaklı ekranları ölçüye, ortama ve içerik formatına göre planlar; LED ve LCD seçeneklerinde fiyat yazılı teklifle verilir.",
      sections: [
        {
          h2: "Poster LED ile duvar LED farkı",
          body:
            "Poster / totem bağımsız ayaklı veya duvara asılı dikey bir ünitedir; video duvar ise geniş yatay yüzeydir. Dar alan, yönlendirme ve tek mesajlı kampanyada poster LED öne çıkar. Pitch, izleme mesafesine göre seçilir — yakından okunan lobi posterinde ince pitch tercih edilir.",
        },
        {
          h2: "İç mekân totem vs dış mekân totem",
          body:
            "İç mekânda daha düşük nit ve ince gövde; dış mekânda IP65, yüksek nit ve sağlam kaide gerekir. AVM koridorunda güvenlik ve engelli erişim mesafeleri; cephe önünde ankraj ve rüzgâr yükü hesaplanır.",
        },
        {
          h2: "İçerik boyutu ve dikey format",
          body:
            "9:16 veya özel dikey çözünürlük içerik üretimini etkiler. CMS’te dikey şablon ve otomatik ölçekleme planlanmalıdır. AI ile üretilen görsellerde dikey kırpma kuralları önceden tanımlanır.",
        },
        {
          h2: "Güç, network ve operasyon",
          body:
            "Tekil totemlerde PoE veya yerel priz; çoklu parkta merkezi network ve uzaktan izleme avantajlıdır. ARLEDSCREEN teklifinde kaide, ekran, oynatıcı ve montaj kalemleri ayrılır — B2B netliği için.",
        },
      ],
      faqs: [
        {
          question: "Poster LED ekran boyutu nasıl seçilir?",
          answer:
            "Koridor genişliği, izleme mesafesi ve mesaj uzunluğu belirler. Tipik dikey totem yükseklikleri mekân tipine göre keşifte netleşir.",
        },
        {
          question: "Totem ile kiosk aynı şey mi?",
          answer:
            "Hayır. Totem / poster çoğunlukla tek yönlü bilgilendirme; kiosk dokunmatik etkileşim ve işlem içerir. Ayrı rehberde kiosk detayı var.",
        },
        {
          question: "Dış mekân poster LED gerekir mi IP65?",
          answer:
            "Açık alan ve yağmura maruz kurulumlarda evet. Sundurma altı yarı açık alanlarda ara koruma konuşulabilir.",
        },
        {
          question: "Ayaklı dijital ekran fiyatı ne kadar?",
          answer:
            "LED poster, totem ve LCD ayaklı ekranlarda sabit liste fiyatı yayımlamıyoruz. Ölçüye, ekran tipine (LED veya LCD), iç veya dış mekân kullanımına, tek ya da çift yüz seçimine ve adede göre yazılı teklif hazırlıyoruz.",
        },
      ],
      relatedSlugs: [
        "menuboard-dijital-menu",
        "kiosk-dijital-ekran",
        "dis-mekan-led-ekran",
      ],
      cta: {
        title: "Poster / totem LED projenizi boyutlandıralım",
        body:
          "Adet, ortam (iç / dış) ve içerik formatını paylaşın; teknik özet ile dönüş yapalım.",
      },
      cardLabel: "Ayaklı ekran & totem",
      cardTeaser: "Ayaklı dijital ekran: poster LED, totem ve LCD seçenekleri.",
    },
    "kiosk-dijital-ekran": {
      slug: "kiosk-dijital-ekran",
      title: "Kiosk Dijital Ekran | Dokunmatik & Bilgi Noktası — ARLEDSCREEN",
      description:
        "Kiosk dijital ekran: dokunmatik bilgi noktası, yönlendirme ve self-servis. LED / panel seçimi, gövde ve yazılım entegrasyonu — ARLEDSCREEN / NXTIONSTAR.",
      keywords: [
        "kiosk",
        "dijital kiosk",
        "dokunmatik ekran",
        "bilgi kiosku",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Kiosk dijital ekran çözümleri",
      intro:
        "Kiosk, etkileşimli dijital ekran noktasıdır: yönlendirme, bilet, katalog veya self-servis. ARLEDSCREEN projelerinde gövde, ekran teknolojisi ve yazılım entegrasyonu birlikte seçilir — NXTIONSTAR LED yüzeyler gerektiğinde totem / duvar ile kombine edilir.",
      sections: [
        {
          h2: "Kiosk vs totem vs video duvar",
          body:
            "Kiosk dokunmatik veya kart / QR etkileşimi ister; totem çoğunlukla tek yönlü yayındır; video duvar geniş izleyiciye hitap eder. Karışık lobilerde kiosk + poster LED yan yana planlanabilir. ARLEDSCREEN keşfinde kullanıcı akışı ve işlem tipi önce netleşir.",
        },
        {
          h2: "Ekran teknolojisi seçimi",
          body:
            "Yakın mesafe dokunmatik için yüksek çözünürlüklü panel sık tercih edilir; arkadaki marka duvarı veya yan kanat için LED kullanılabilir. Dış mekân kioskunda yüksek nit, anti-glare ve IP koruması şarttır. Fan, toz filtresi ve kilitli gövde operasyonel ömür için kritiktir.",
        },
        {
          h2: "Yazılım, ödeme ve güvenlik",
          body:
            "Mevcut self-servis / CMS / AI asistan yazılımınız varsa API ve çevre birimleri (yazıcı, okuyucu, POS) teklife işlenir. Fiziksel güvenlik: kilit, sabitleme ankrajı, kablo gizleme. KVKK / log gereksinimleri yazılım tarafında netleştirilir.",
        },
        {
          h2: "Kurulum ve saha operasyonu",
          body:
            "Zemin ankrajı, engelli erişim yüksekliği ve kuyruk mesafesi mimariyle uyumlu olmalıdır. Çoklu şube / kampüs dağıtımında tip gövde ve merkezi izleme tanımlanır. ARLEDSCREEN teslimatında montaj, ağ bağlantısı ve operatör eğitimi paketlenir.",
        },
      ],
      faqs: [
        {
          question: "Kiosk mutlaka LED ekranlı mı olur?",
          answer:
            "Hayır. Dokunmatik yüzey çoğunlukla paneldir; LED yan yüzey veya arka video duvar olarak eklenir. İhtiyaç senaryoya göre ayrılır.",
        },
        {
          question: "Dış mekân kiosk mümkün mü?",
          answer:
            "Evet — IP korumalı gövde, yüksek nit ve iklimlendirme ile. Keşifte güneş, yağmur ve vandalizm riski değerlendirilir.",
        },
        {
          question: "Tek mi yoksa ağlı kiosk mu?",
          answer:
            "Tekil lobi noktası offline çalışabilir; zincir / kampüste merkezi içerik ve izleme için network şarttır. Teklifte her iki model de sunulabilir.",
        },
      ],
      relatedSlugs: [
        "kiosk-ekran",
        "poster-led-ekran",
        "ekran-cesitleri",
      ],
      cta: {
        title: "Kiosk projenizi birlikte tanımlayalım",
        body:
          "Kullanım senaryosu, adet ve yazılım ihtiyacını paylaşın; gövde + ekran özeti ile dönüş yapalım.",
      },
      cardLabel: "Kiosk",
      cardTeaser: "Dokunmatik bilgi ve self-servis kiosk dijital ekran.",
    },
    "cami-led-ekran": {
      slug: "cami-led-ekran",
      title: "Cami ve İbadethane LED Ekran: Ölçü, Fiyat, Vakit Ekranı | ARLEDSCREEN",
      description:
        "Cami, kilise ve diğer ibadethaneler için LED ekran: cemaat mesafesine göre ölçü ve piksel aralığı, namaz vakti ve hutbe gösterimi, yayımlanmış panel fiyatları. ARLEDSCREEN, İstanbul.",
      keywords: ["cami LED ekran", "camiye LED ekran", "namaz vakti ekranı", "ezan vakti ekranı", "cami dijital ekran", "ibadethane LED ekran", "kilise LED ekran", "NXTIONSTAR"],
      h1: "Cami ve ibadethaneler için LED ekran nasıl seçilir?",
      intro:
        "Camiye LED ekran takılabilir; namaz vakitleri, hutbe metni, duyurular ve dini günler aynı ekranda gösterilebilir. Doğru ekran iki ölçüye göre seçilir: en öndeki cemaatin ekrana uzaklığı piksel aralığını, en arkadaki saftın uzaklığı ekran büyüklüğünü belirler. Aynı kurallar kilise, cemevi ve diğer ibadethaneler için de geçerlidir. ARLEDSCREEN, kendi markası NXTIONSTAR LED ekranların keşfini, montajını ve teknik servisini İstanbul Gaziosmanpaşa merkezinden yapar.",
      sections: [
        {
          h2: "Camiye LED ekran mı, LCD ekran mı?",
          body:
            "Küçük bir mescitte yalnızca vakit çizelgesi gösterilecekse tek bir LCD ekran yeterli olabilir. Geniş bir harimde cemaatin büyük bölümü ekranı uzaktan izleyeceği için ölçüsü modül eklenerek büyütülebilen LED ekran daha uygundur. LED ekran 320 × 160 mm modüllerin yan yana birleşmesiyle kurulur; ölçü mihrap yanındaki ya da kadınlar mahfilindeki duvara göre planlanır.",
        },
        {
          h2: "Ekran büyüklüğü nasıl belirlenir?",
          body:
            "Genel bir kural olarak ekran yüksekliği, en arkadaki izleyicinin ekrana uzaklığının yaklaşık sekizde biri kadar seçilir; böylece vakit ve hutbe yazıları arka saflardan okunur. Örneğin en arka saf 12 m uzaktaysa yaklaşık 1,44 m yüksekliğinde (9 modül) bir ekran başlangıç için uygundur. Tablodaki örnekler bu kurala göre hazırlanmıştır; kesin ölçü keşifte duvar ve saf düzenine göre verilir.",
        },
        {
          h2: "Piksel aralığı nasıl seçilir?",
          body:
            "Piksel aralığı en öndeki cemaatin mesafesine göre seçilir: yaklaşık 1 mm piksel aralığı için 1 m mesafe (P3.07 ≈ 3 m). Cami içinde ön saflar çoğunlukla 3–4 m'den uzakta olduğu için iç mekân P3.07 veya P4 modüller yeterlidir. Ekran cemaate çok yakın monte edilecekse P2.5 tercih edilir. Avlu ve dış cephe ekranlarında dış mekân P4 veya P5 modüller kullanılır.",
        },
        {
          h2: "Namaz vakitleri ve hutbe nasıl gösterilir?",
          body:
            "LED ekran kendisine gelen görüntüyü gösterir. Vakit çizelgesi, hutbe metni, duyurular ve ayet-hadis görselleri bir medya oynatıcı ya da asenkron kontrol kartı (Huidu, NovaStar) ile zamanlanmış içerik olarak oynatılabilir; bilgisayar kapalıyken de program devam eder. Kullanılacak içerik kaynağı ve kontrol sistemi keşifte netleşir ve teklifte yazılı olarak belirtilir.",
        },
        {
          h2: "Fiyat ve ödeme",
          body:
            "Yayımlanmış panel fiyatları USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir: P2.5 iç mekân 32,18 USD, P3.07 iç mekân 30,88 USD, P4 iç mekân 26,98 USD, dış mekânda P4 33,80 USD ve P5 29,90 USD. Tablodaki tutarlar yalnızca modül bedelidir; kontrol kartı, kabin veya taşıyıcı, işçilik ve yazılım ayrıca eklenir. Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Dernek veya bağışla alınacak ekranlarda ödeme planı yazılı teklifte belirtilir.",
        },
      ],
      faqs: [
        {
          question: "Camiye LED ekran takılır mı?",
          answer:
            "Evet. Cami içinde mihrap yanına, kadınlar mahfiline veya avluya LED ekran monte edilebilir. Duvarın taşıma durumu, elektrik hattı ve kablo güzergâhı keşifte kontrol edilir.",
        },
        {
          question: "Cami için kaç m² LED ekran gerekir?",
          answer:
            "En arka saf 12 m uzaktaysa yaklaşık 2,56 × 1,44 m (72 modül, ≈ 3,7 m²) bir ekran başlangıç için uygundur; P3.07 iç mekân modül bedeli 72 × 30,88 = 2.223,36 USD'dir (KDV ve nakliye hariç, yalnızca modül). Mahalle mescitlerinde daha küçük ölçüler yeterli olabilir.",
        },
        {
          question: "Cami LED ekran fiyatı ne kadar?",
          answer:
            "Fiyat ekran ölçüsüne, piksel aralığına ve montaj koşuluna göre değişir. Panel fiyatları yayımlanmıştır (ör. P3.07 iç mekân 30,88 USD/panel); kesin tutar keşif sonrası yazılı teklifle verilir. Taksitli ödeme yapılabilir.",
        },
        {
          question: "Kilise veya cemevi için hangi ekran uygundur?",
          answer:
            "Aynı kurallar geçerlidir: piksel aralığı en öndeki izleyicinin, ekran büyüklüğü en arkadaki izleyicinin mesafesine göre seçilir. Geniş salonlarda LED, küçük alanlarda LCD ekran tercih edilebilir.",
        },
        {
          question: "Teslim süresi ne kadar?",
          answer:
            "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. Projenize ait tarih yazılı teklifte belirtilir.",
        },
      ],
      relatedSlugs: ["ic-mekan-led-ekran", "konferans-salonu-led", "lcd-ekran"],
      cta: {
        title: "Camiye uygun ekranı birlikte planlayalım",
        body:
          "Harimin ölçüsünü, en ön ve en arka saf mesafesini ve ekranın konacağı duvarın fotoğrafını gönderin; ölçü, piksel aralığı ve bütçe önerisi hazırlayalım.",
      },
      cardLabel: "Cami ve ibadethane LED ekran",
      cardTeaser: "Cemaat mesafesine göre ekran ölçüsü, piksel aralığı ve namaz vakti gösterimi.",
    },
    "led-ekran-ariza-belirtileri": {
      slug: "led-ekran-ariza-belirtileri",
      title: "LED Ekran Arıza Belirtileri ve Nedenleri | ARLEDSCREEN",
      description:
        "LED ekran karardı, titriyor, çizgi var ya da hiç açılmıyor mu? Arıza belirtileri, olası nedenleri ve ilk kontroller. LED, LCD, kiosk ve menuboard tamiri: ARLEDSCREEN, İstanbul.",
      keywords: ["LED ekran arıza", "LED ekran arıza belirtileri", "LED ekran titriyor", "LED ekran çizgi", "LED ekran açılmıyor", "LED ekran tamiri", "LCD ekran tamiri", "kiosk tamiri"],
      h1: "LED ekran arıza belirtileri: neden olur, ne yapılır?",
      intro:
        "LED ekran arızalarının çoğu belirtisinden tanınır: bir bölümün kararması çoğunlukla güç kaynağı veya alıcı kartı, titreme kablo ya da ayar sorununu, tek sırada çizgi veya renk bozulması modül ya da flat kabloyu işaret eder. Aşağıdaki tablo en sık belirtileri, olası nedenlerini ve sizin yapabileceğiniz ilk kontrolleri gösterir. Kesin teşhis yerinde ölçümle konur; ARLEDSCREEN LED ekranların yanı sıra LCD reklam ekranı, kiosk ve menuboard tamiri de yapar.",
      sections: [
        {
          h2: "Ekranın bir bölümü karardı",
          body:
            "Kabin büyüklüğünde dikdörtgen bir alan kararmışsa sebep genellikle o kabinin güç kaynağı veya alıcı kartıdır. Kararma bir kabinden sonraki tüm kabinlere yayılıyorsa veri kablosu zinciri kopmuş olabilir. Tek bir modül sönmüşse modülün kendisi ya da flat kablosu arızalıdır.",
        },
        {
          h2: "Titreme, çizgi ve renk bozulması",
          body:
            "Titreme çoğunlukla gevşek veri veya güç kablosundan, zayıflayan güç kaynağından ya da alıcı kart ayarlarından kaynaklanır; kamerada görülen titreme düşük tazeleme hızıyla ilgilidir. Yatay veya dikey çizgi ve tek sırada renk bozulması (ör. bir sıranın sürekli kırmızı yanması) genellikle modülün sürücü entegresi, flat kablo ya da alıcı kart portundan kaynaklanır.",
        },
        {
          h2: "Ekran hiç açılmıyor",
          body:
            "Önce sigortayı, enerji hattını ve görüntü kaynağını (bilgisayar, medya oynatıcı) kontrol edin. Senkron ekranlarda bilgisayar kapalıysa ekran da görüntü vermez. Bunlar sağlamsa gönderici kart, güç kaynakları veya yazılım ayarı kontrol edilmelidir.",
        },
        {
          h2: "Nem, yıldırım ve aşırı gerilim",
          body:
            "Dış mekânda conta yıpranırsa nem girer; modüllerde oksitlenme ve bölgesel sönme görülür. Yıldırım ve elektrik dalgalanması çoğunlukla güç kaynaklarına, alıcı kartlara ve bağlantılara zarar verir. Bu durumlarda ekranı yeniden açmadan önce teknik kontrol yaptırmak ek hasarı önler.",
        },
        {
          h2: "LCD, kiosk ve menuboard arızaları",
          body:
            "LCD reklam ekranlarında, dokunmatik kiosklarda ve dijital menuboardlarda en sık görülen belirtiler görüntü gelmemesi, dokunmatiğin tepki vermemesi, güç kartı arızası ve bağlantı sorunlarıdır. Marka ve model bilgisini, arızanın fotoğrafı veya videosuyla birlikte gönderin; uzaktan ön teşhis yapıp keşfi planlayalım.",
        },
      ],
      faqs: [
        {
          question: "LED ekranın bir kısmı siyah kaldı; ne yapmalıyım?",
          answer:
            "Ekranı kapatıp açmak kalıcı çözüm değildir. Kararan alanın fotoğrafını çekin ve +90 530 507 88 34 WhatsApp hattına gönderin. Kabin büyüklüğündeki kararmalar çoğunlukla güç kaynağı veya alıcı karttan kaynaklanır ve parça değişimiyle giderilir.",
        },
        {
          question: "LED ekran tamiri ne kadar tutar?",
          answer:
            "Tamir için sabit fiyat yayımlamıyoruz; arızanın kaynağı ve değişecek parça her işte farklıdır. Fiyat ön teşhis ve keşif sonrası yazılı teklifle verilir.",
        },
        {
          question: "LED ekran bakımı ne sıklıkla yapılmalı?",
          answer:
            "Kullanım koşuluna göre değişir. Dış mekân ekranlarda conta, kablo ve bağlantıların düzenli kontrolü nem kaynaklı arızaları azaltır. Bakım kapsamı ve sıklığı yazılı teklifte belirtilir; ARLEDSCREEN 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunar.",
        },
        {
          question: "Kayan yazı tabela ve dijital ekran tamiri yapıyor musunuz?",
          answer:
            "Evet. LED ekran, LCD reklam ekranı, kiosk ve menuboard tamiri yapıyoruz. Kayan yazı tabelalar için marka ve kontrol kartı bilgisini paylaşın; servis ve yedek parça uygunluğunu değerlendirip iletelim.",
        },
      ],
      relatedSlugs: ["led-ekran", "ic-mekan-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Arızayı birlikte teşhis edelim",
        body:
          "Belirtinin fotoğrafını veya kısa videosunu WhatsApp'tan gönderin; uzaktan ön teşhis yapıp keşif ve tamir teklifini hazırlayalım.",
      },
      cardLabel: "LED ekran arıza belirtileri",
      cardTeaser: "Kararma, titreme, çizgi ve açılmama: olası nedenler ve ilk kontroller.",
    },
    "led-ekran-ihracat": {
      slug: "led-ekran-ihracat",
      title: "Yurt Dışına LED Ekran Satışı ve İhracat | Avrupa, Orta Doğu, Balkanlar | ARLEDSCREEN",
      description:
        "ARLEDSCREEN, NXTIONSTAR LED ekranları tüm Avrupa'ya, Orta Doğu'ya ve Balkanlar'a gönderir. CE sertifikalı ürünler, USD panel fiyatları, TL, USD, EUR ve diğer para birimlerinde ödeme.",
      keywords: ["LED ekran ihracat", "yurt dışı LED ekran", "Türkiye'den LED ekran", "LED ekran Avrupa", "LED ekran Orta Doğu", "LED ekran Balkanlar", "CE sertifikalı LED ekran", "NXTIONSTAR"],
      h1: "Yurt dışına LED ekran: Avrupa, Orta Doğu ve Balkanlar",
      intro:
        "ARLEDSCREEN, kendi markası NXTIONSTAR LED ekranları İstanbul'dan tüm Avrupa'ya, Orta Doğu'ya ve Balkanlar'a gönderir. Ürünlerimiz CE sertifikalıdır. Yayımlanmış panel fiyatları USD cinsindendir ve tüm dillerde aynıdır; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz.",
      sections: [
        {
          h2: "Hangi ülkelere gönderiyoruz?",
          body:
            "Tüm Avrupa ülkelerine, Orta Doğu'ya ve Balkanlar'a (ör. Bulgaristan, Yunanistan, Romanya, Sırbistan, Bosna-Hersek, Kuzey Makedonya, Arnavutluk, Kosova) LED ekran gönderiyoruz. Varış adresi ve teslim koşulları yazılı teklifte belirtilir.",
        },
        {
          h2: "Fiyat ve ödeme",
          body:
            "Panel fiyatları USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir; örneğin P2.5 iç mekân 32,18 USD, P2.5 dış mekân 63,70 USD. Fiyatlar tüm dillerde aynıdır. Ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz; taksitli ödeme de yapılabilir. Nakliye ayrıca tekliflendirilir.",
        },
        {
          h2: "Sertifika",
          body:
            "NXTIONSTAR ürünleri CE sertifikalıdır. Modele ait teknik föy yazılı teklifle birlikte paylaşılır.",
        },
        {
          h2: "Teslim süresi",
          body:
            "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. Hazırlık süresi ürüne, ölçüye ve stok durumuna; nakliye süresi varış adresine göre değişir. Kesin tarih yazılı teklifte belirtilir.",
        },
        {
          h2: "Teklif için gerekenler",
          body:
            "Ülke ve şehir, ekran ölçüsü, iç veya dış mekân kullanımı, izleme mesafesi ve montaj yeri fotoğrafı yeterlidir. Kurulum ve teknik destek kapsamı teklifte yazılı olarak belirtilir.",
        },
      ],
      faqs: [
        {
          question: "Türkiye'den yurt dışına LED ekran gönderiyor musunuz?",
          answer:
            "Evet. Tüm Avrupa'ya, Orta Doğu'ya ve Balkanlar'a LED ekran gönderiyoruz. Nakliye ayrıca tekliflendirilir.",
        },
        {
          question: "Ürünleriniz CE sertifikalı mı?",
          answer:
            "Evet, ürünlerimiz CE sertifikalıdır.",
        },
        {
          question: "Hangi para birimlerinde ödeme kabul ediyorsunuz?",
          answer:
            "TL, USD, EUR ve diğer tüm para birimlerinde ödeme kabul ediyoruz. Yayımlanmış panel fiyatları USD cinsindendir; taksitli ödeme de yapılabilir.",
        },
        {
          question: "Yurt dışı fiyatları farklı mı?",
          answer:
            "Hayır. Panel fiyatları tüm dillerde ve ülkelerde aynıdır; KDV ve nakliye hariçtir. Nakliye bedeli varış adresine göre teklifte belirtilir.",
        },
      ],
      relatedSlugs: ["led-ekran", "dis-mekan-led-ekran", "ic-mekan-led-ekran"],
      cta: {
        title: "Yurt dışı teklifinizi hazırlayalım",
        body:
          "Ülke, şehir, ekran ölçüsü ve kullanım yerini paylaşın; panel listesi, nakliye ve ödeme planıyla yazılı teklif gönderelim.",
      },
      cardLabel: "Yurt dışına LED ekran (ihracat)",
      cardTeaser: "Avrupa, Orta Doğu ve Balkanlar'a gönderim, CE sertifika, ödeme ve teslim süresi.",
    },
    "eczane-led-ekran": {
      slug: "eczane-led-ekran",
      title: "Eczane LED Ekran: Vitrin, Tabela ve Raf Üstü Ekran Seçimi | ARLEDSCREEN",
      description:
        "Eczane için LED ekran: vitrin arkası, dış cephe, raf üstü ve ayaklı ekran seçenekleri; mesafeye göre piksel aralığı ve yayımlanmış panel fiyatları. İçerik kuralları için not. ARLEDSCREEN, İstanbul.",
      keywords: ["eczane LED ekran", "eczane dijital ekran", "eczane vitrin ekranı", "eczane tabela LED", "nöbetçi eczane ekranı", "eczane raf üstü ekran", "NXTIONSTAR"],
      h1: "Eczane LED ekran nasıl seçilir?",
      intro:
        "Eczanede LED ekran dört yerde kullanılır: vitrin arkasında, dış cephede, tezgâh arkasında raf üstünde ve girişte ayaklı ekran olarak. Yoldan izlenen cephe ve vitrin ekranlarında parlaklık, içeriden yakından izlenen raf üstü ekranlarda ince piksel aralığı öne çıkar. İçeride P2.5 iç mekân (32,18 USD/panel), dış cephede P4 (33,80 USD/panel) veya P5 (29,90 USD/panel) dış mekân modüller sık seçilir. Ekranda gösterilecek içerik, eczacılık meslek kuralları ve reklam mevzuatına uygun planlanmalıdır.",
      sections: [
        {
          h2: "Vitrin arkası ekran",
          body:
            "Güneş alan vitrinde standart iç mekân ekran soluk görünür; vitrin için yüksek parlaklıklı ekran veya camı kapatmayan şeffaf LED seçilir. Bu ürünlerin fiyatı vitrin ölçüsüne göre yazılı teklifle verilir. Gölgede kalan vitrinlerde iç mekân P2.5 veya P3.07 yeterli olabilir; bunu keşifte birlikte ölçeriz.",
        },
        {
          h2: "Dış cephe ve tabela ekranı",
          body:
            "Cephede yoldan ve karşı kaldırımdan izlenen ekranlarda dış mekân P4 (33,80 USD/panel) veya P5 (29,90 USD/panel) modüller uygundur; daha yakından izlenen alçak cephelerde P3.07 dış mekân (44,20 USD/panel) daha net görünür. Fiyatlar panel başına, KDV ve nakliye hariçtir.",
        },
        {
          h2: "Raf üstü ve tezgâh arkası",
          body:
            "Müşteri tezgâhtan 1,5–3 m uzakta durduğu için iç mekân P2.5 veya ince P1.86 GOB (49,08 USD/panel) seçilir. Uzun ve dar raf üstü şeritler 320 × 160 mm modüllerle istenen ölçüye yakın kurulur.",
        },
        {
          h2: "İçerik: dikkat edilmesi gerekenler",
          body:
            "Ekranda nöbetçi eczane listesi, çalışma saatleri, sağlık duyuruları ve kampanyasız bilgilendirme içerikleri gösterilebilir. İlaç tanıtımı ve eczane reklamına ilişkin mevzuat ve meslek kuralları içeriği sınırlayabilir; içeriği hazırlamadan önce bağlı olduğunuz eczacı odasının güncel kurallarını kontrol edin.",
        },
        {
          h2: "Ödeme, teslim ve servis",
          body:
            "Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Ürünlerimiz CE sertifikalıdır. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. İstanbul'un tüm ilçelerinde proje yaptık; arıza durumunda tamir ve teknik servis veriyoruz.",
        },
      ],
      faqs: [
        {
          question: "Eczane için hangi LED ekran uygun?",
          answer:
            "İçeride raf üstü ve tezgâh arkası için P2.5 iç mekân (32,18 USD/panel), dış cephe için P4 (33,80 USD/panel) veya P5 (29,90 USD/panel) dış mekân modül sık seçilir. Güneş alan vitrinde yüksek parlaklıklı vitrin ekranı veya şeffaf LED gerekir; bunların fiyatı teklifle verilir.",
        },
        {
          question: "Eczane ekranında nöbetçi eczane gösterilebilir mi?",
          answer:
            "Evet. Nöbetçi eczane listesi, çalışma saatleri ve duyurular zamanlanmış içerik olarak gösterilebilir. İçerik kaynağı keşifte netleşir.",
        },
        {
          question: "Eczanede ekrana reklam koyabilir miyim?",
          answer:
            "İlaç tanıtımı ve eczane reklamına ilişkin mevzuat ve meslek kuralları içeriği sınırlar. Ekrana koyacağınız içerik için bağlı olduğunuz eczacı odasının güncel kurallarını kontrol edin.",
        },
        {
          question: "Eczane LED ekran fiyatı ne kadar?",
          answer:
            "Panel fiyatları yayımlanmıştır; örneğin 1,28 × 0,64 m'lik raf üstü P2.5 ekran 16 modüldür ve modül bedeli 16 × 32,18 = 514,88 USD'dir (yalnızca modül, KDV ve nakliye hariç). Kesin tutar keşif sonrası yazılı teklifle verilir; taksitli ödeme yapılabilir.",
        },
      ],
      relatedSlugs: ["vitrin-led-ekran", "poster-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Eczaneniz için ekranı planlayalım",
        body:
          "Vitrin ve cephe fotoğrafını, ekranın konacağı yerin ölçüsünü ve müşterinin ekrana uzaklığını gönderin; size uygun ekranı ve bütçeyi hazırlayalım.",
      },
      cardLabel: "Eczane LED ekran",
      cardTeaser: "Vitrin, cephe, raf üstü ve ayaklı ekran: piksel aralığı, fiyat ve içerik notları.",
    },
    "dugun-salonu-led": {
      slug: "dugun-salonu-led",
      title: "Düğün Salonu LED Ekran: Ölçü, Fiyat, Satın Alma ve Kiralama | ARLEDSCREEN",
      description:
        "Düğün ve davet salonu için LED ekran: salon derinliğine göre sahne ekranı ölçüsü, P3.07 / P4 seçimi, örnek modül bedeli ve günlük 50 USD/m² kiralama karşılaştırması. ARLEDSCREEN, İstanbul.",
      keywords: ["düğün salonu LED ekran", "düğün salonu sahne ekranı", "davet salonu LED ekran", "düğün LED ekran fiyatı", "kiralık düğün LED ekran", "NXTIONSTAR"],
      h1: "Düğün salonu LED ekran: ölçü, fiyat ve kiralama",
      intro:
        "Düğün salonunda LED ekran çoğunlukla sahnenin arkasına kurulur; gelin-damat girişi, fotoğraf ve video gösterisi, canlı çekim ve salon logosu bu ekranda oynar. Konuklar masalarda ekrandan genellikle 4 m ve daha uzakta oturduğu için iç mekân P3.07 veya P4 modüller yeterlidir. Ekran yüksekliği salonun en arka masasının uzaklığının yaklaşık sekizde biri seçilir. Salon sahibi için satın alma, tek seferlik organizasyon için günlük 50 USD/m² kiralama uygundur.",
      sections: [
        {
          h2: "Piksel aralığı",
          body:
            "Video ve fotoğraf ağırlıklı içerikte yaklaşık 1 mm piksel aralığı için 1 m kuralı yeterlidir. Ön masalar 3 m civarındaysa P3.07 (30,88 USD/panel), 4 m ve üzerindeyse P4 (26,98 USD/panel) iç mekân modül seçilir. Sahneye çok yakın dans pistinden izlenecek yan ekranlarda P2.5 (32,18 USD/panel) daha net görüntü verir.",
        },
        {
          h2: "Ekran ölçüsü",
          body:
            "Ekran yüksekliği en arka masanın uzaklığının yaklaşık sekizde biri seçilir ve 320 × 160 mm modül katlarına yuvarlanır. Sahne arkası duvarı tam kaplamak yerine 16:9'a yakın bir ekran, video içeriği kenarlarda boşluk bırakmadan gösterir. Tablodaki örnekler bu kurala göre hazırlanmıştır.",
        },
        {
          h2: "Satın alma mı, kiralama mı?",
          body:
            "Her hafta organizasyon yapan salonlar için satın alma, tek düğün veya nişan için kiralama daha mantıklıdır. İç ve dış mekân kiralık LED ekran günlük 50 USD/m²'dir; haftalık ve aylık kiralamalar aynı günlük m² fiyatı üzerinden hesaplanır, depozito alınmaz. Kurulum ve nakliye ayrıca tekliflendirilir.",
        },
        {
          h2: "İçerik ve kontrol",
          body:
            "Ekrana laptop, medya oynatıcı veya kamera görüntüsü bağlanır. Asenkron kontrol kartı (Huidu, NovaStar) ile salon logosu ve tanıtım videoları bilgisayar kapalıyken de zamanlanmış olarak oynar. Canlı çekim yapılacaksa bunu keşifte belirtin.",
        },
        {
          h2: "Ödeme, teslim ve servis",
          body:
            "Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Ürünlerimiz CE sertifikalıdır. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. İstanbul'un tüm ilçelerinde proje yaptık; arıza durumunda tamir ve teknik servis de veriyoruz.",
        },
      ],
      faqs: [
        {
          question: "Düğün salonu için kaç m² LED ekran gerekir?",
          answer:
            "En arka masa 25 m uzaktaysa yaklaşık 5,44 × 3,04 m (323 modül, ≈ 16,5 m²) bir sahne ekranı uygundur. Daha küçük salonlarda 3,52 × 1,92 m (≈ 6,8 m²) yeterli olabilir.",
        },
        {
          question: "Düğün salonu LED ekran fiyatı ne kadar?",
          answer:
            "Yayımlanmış panel fiyatlarıyla 323 modüllük P4 iç mekân ekranın modül bedeli 323 × 26,98 = 8.714,54 USD'dir (yalnızca modül; kontrol, kabin, işçilik, KDV ve nakliye hariç). Kesin tutar keşif sonrası yazılı teklifle verilir; taksitli ödeme yapılabilir.",
        },
        {
          question: "Düğün için LED ekran kiralanır mı?",
          answer:
            "Evet. Kiralık LED ekran günlük 50 USD/m²'dir; örneğin 16,5 m² ekran bir günlüğüne yaklaşık 827 USD'dir. Kurulum ve nakliye ayrıca tekliflendirilir, depozito alınmaz.",
        },
        {
          question: "Düğün salonu ekranında hangi piksel aralığı seçilmeli?",
          answer:
            "Konuklar 3–4 m ve daha uzaktaysa P3.07 veya P4 iç mekân yeterlidir. Dans pistine bakan yakın yan ekranlarda P2.5 daha net görüntü verir.",
        },
        {
          question: "Teslim süresi ne kadar?",
          answer:
            "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. Sezon öncesi kurulum için keşfi erken planlamanızı öneririz.",
        },
      ],
      relatedSlugs: ["konferans-salonu-led", "ic-mekan-led-ekran", "led-ekran"],
      cta: {
        title: "Salonunuz için ekranı planlayalım",
        body:
          "Salon ölçüsünü, sahne duvarının fotoğrafını ve en ön ve en arka masa mesafesini gönderin; satın alma ve kiralama seçenekleriyle teklif hazırlayalım.",
      },
      cardLabel: "Düğün salonu LED ekran",
      cardTeaser: "Sahne ekranı ölçüsü, P3.07/P4 seçimi, satın alma ve günlük 50 USD/m² kiralama.",
    },
    "hastane-dijital-ekran": {
      slug: "hastane-dijital-ekran",
      title: "Hastane Dijital Ekranları: Sıra Sistemi, Yönlendirme, Bekleme Salonu | ARLEDSCREEN",
      description:
        "Hastane içi dijital ekranlar: bekleme salonu ve sıra sistemi ekranı, poliklinik kapı ekranı, yönlendirme totemleri, giriş ve cephe LED ekranı. LED mi LCD mi, mesafeye göre seçim. ARLEDSCREEN, İstanbul.",
      keywords: ["hastane dijital ekran", "hastane LED ekran", "sıra sistemi ekranı", "hastane bekleme salonu ekranı", "hastane yönlendirme ekranı", "poliklinik ekranı", "sağlık kuruluşu dijital ekran"],
      h1: "Hastane içi dijital ekranlar: LED mi, LCD mi?",
      intro:
        "Hastanede dijital ekran beş yerde kullanılır: bekleme salonunda sıra numarası ve bilgilendirme, poliklinik kapısında doktor ve sıra bilgisi, giriş lobisinde yönlendirme, kafeterya ve koridorlarda duyuru, bina cephesinde ve acil girişinde dış mekân ekran. Kapı ve küçük bekleme alanlarında LCD ekran, geniş bekleme salonu, lobi ve cephede ölçüsü modülle büyütülebilen LED ekran uygundur. Mart 2026'da Lokman Hekim Hastanesi için 16 m² LED ekran projesini tamamladık.",
      sections: [
        {
          h2: "Bekleme salonu ve sıra sistemi",
          body:
            "Sıra numarası ekranı, hastanenin kullandığı sıra yazılımının görüntüsünü gösterir; LED veya LCD ekran bu görüntüyü bir bilgisayar ya da medya oynatıcı üzerinden alır. Küçük bekleme alanlarında tek LCD yeterlidir; 6 m'den uzaktan okunacak geniş salonlarda iç mekân P2.5 (32,18 USD/panel) veya P3.07 (30,88 USD/panel) LED ekran daha büyük ve okunur bir yüzey sağlar. Kullanılan sıra yazılımı ve bağlantısı keşifte netleşir.",
        },
        {
          h2: "Poliklinik kapısı ve oda ekranları",
          body:
            "Kapı yanındaki doktor adı, oda numarası ve sıradaki hasta bilgisi küçük ölçülü LCD ekranlarla gösterilir. Bu ekranların ölçüsü ve fiyatı yazılı teklifle verilir.",
        },
        {
          h2: "Giriş lobisi ve yönlendirme",
          body:
            "Girişte kat planı, bölüm yönlendirmesi ve duyurular için ayaklı poster LED veya totem ekran kullanılır; dokunmatik kiosk ile hasta kendi bölümünü arayabilir. Bu ürünlerin fiyatı teklifle verilir.",
        },
        {
          h2: "Cephe ve acil girişi",
          body:
            "Bina cephesi ve acil girişi üzerindeki ekranlarda dış mekân P4 (33,80 USD/panel) veya P5 (29,90 USD/panel) modüller kullanılır. Gece parlaklığı çevreyi rahatsız etmeyecek şekilde ayarlanabilir.",
        },
        {
          h2: "Ödeme, teslim ve servis",
          body:
            "Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Ürünlerimiz CE sertifikalıdır. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. LED ekranların yanı sıra LCD ekran ve kiosk tamiri de yapıyoruz; İstanbul'un tüm ilçelerinde proje yaptık.",
        },
      ],
      faqs: [
        {
          question: "Hastane bekleme salonu için LED mi LCD mi?",
          answer:
            "Küçük bekleme alanlarında LCD yeterlidir. Uzaktan okunacak geniş salonlarda ve lobilerde iç mekân P2.5 (32,18 USD/panel) veya P3.07 (30,88 USD/panel) LED ekran daha büyük ve okunur bir yüzey sağlar.",
        },
        {
          question: "Sıra sistemi ekranı nasıl çalışır?",
          answer:
            "Ekran, hastanenin kullandığı sıra yazılımının görüntüsünü bilgisayar veya medya oynatıcı üzerinden gösterir. Kullanılan yazılım ve bağlantı şekli keşifte netleşir.",
        },
        {
          question: "Hastane yönlendirme ekranı olarak ne kullanılır?",
          answer:
            "Lobide ayaklı poster LED, totem veya dokunmatik kiosk kullanılır. Fiyatları teklifle verilir.",
        },
        {
          question: "Hastanede daha önce proje yaptınız mı?",
          answer:
            "Evet. Mart 2026'da Lokman Hekim Hastanesi için 16 m² LED ekran, Temmuz 2025'te Van'da Umut Radyoloji için yüksek çözünürlüklü LED ekran projesini tamamladık.",
        },
        {
          question: "Arıza durumunda servis veriyor musunuz?",
          answer:
            "Evet. LED ekranların yanı sıra LCD ekran, kiosk ve menuboard tamiri de yapıyoruz. ARLEDSCREEN 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunar.",
        },
      ],
      relatedSlugs: ["lcd-ekran", "kiosk-ekran", "poster-led-ekran"],
      cta: {
        title: "Hastaneniz için ekran planını çıkaralım",
        body:
          "Bekleme salonu, lobi ve cephe fotoğraflarını ve kullandığınız sıra yazılımını paylaşın; her alan için LED veya LCD önerisi ve bütçe hazırlayalım.",
      },
      cardLabel: "Hastane dijital ekranları",
      cardTeaser: "Sıra sistemi, bekleme salonu, yönlendirme ve cephe: LED mi LCD mi?",
    },
    "okul-led-ekran": {
      slug: "okul-led-ekran",
      title: "Okullar İçin LED Ekran: İlkokul, Ortaokul, Lise ve Üniversite | ARLEDSCREEN",
      description:
        "Okul LED ekranı: ilkokul ve ortaokulda giriş, koridor ve bahçe ekranı; lise ve üniversitede amfi, konferans salonu, kampüs ve spor salonu. Mesafeye göre piksel aralığı ve panel fiyatları. ARLEDSCREEN.",
      keywords: ["okul LED ekran", "okul dijital ekran", "ilkokul LED ekran", "ortaokul dijital pano", "üniversite LED ekran", "kampüs LED ekran", "okul bahçesi LED ekran", "amfi LED ekran"],
      h1: "Okullar için LED ekran: ilkokuldan üniversiteye",
      intro:
        "Okulda LED ekran en çok girişte duyuru panosu, koridorda bilgilendirme ekranı, bahçede tören ve etkinlik ekranı, konferans salonu ve amfide sunum ekranı olarak kullanılır. İç mekânda öğrenciler ekrana genellikle 3 m ve daha uzaktan baktığı için P3.07 (30,88 USD/panel), amfide P2.5 (32,18 USD/panel), bahçe ve cephede P4 (33,80 USD/panel) veya P5 (29,90 USD/panel) dış mekân modüller yeterlidir. Sınıf içi ve yakın izlenen küçük ekranlarda LCD veya etkileşimli ekran daha uygundur.",
      sections: [
        {
          h2: "İlkokul ve ortaokul",
          body:
            "Giriş holünde duyuru, ders programı, nöbetçi öğretmen ve etkinlik takvimi için iç mekân P3.07 LED veya ayaklı poster LED kullanılır. Öğrencilerin dokunabileceği alçak montajlarda yüzeyi koruyan GOB modüller (P1.86 GOB 49,08 USD/panel) veya ekranı erişilemeyecek yüksekliğe monte etmek tercih edilir. Bahçede tören ve bayram programları için dış mekân P4 veya P5 ekran uygundur.",
        },
        {
          h2: "Lise",
          body:
            "Konferans salonunda mezuniyet, tiyatro ve seminerler için sahne arkası LED ekran, kantin ve koridorlarda duyuru ekranları kullanılır. Konferans salonunda ekran yüksekliği son sıra mesafesinin yaklaşık sekizde biri seçilir; ayrıntılar konferans salonu rehberimizde.",
        },
        {
          h2: "Üniversite",
          body:
            "Amfilerde ilk sıra 2,5–3 m uzakta olduğu için P2.5 veya P3.07 iç mekân seçilir. Kampüs girişi, fakülte cephesi ve meydan ekranlarında dış mekân P4 veya P5 modüller kullanılır. Kütüphane ve öğrenci merkezlerinde ayaklı dijital ekranlar yönlendirme ve duyuru için uygundur.",
        },
        {
          h2: "Spor salonu",
          body:
            "Skor ve duyuru ekranı izleyicilerden genellikle 6 m ve daha uzakta olduğu için iç mekân P4 (26,98 USD/panel) yeterlidir. Top darbesine karşı koruma detayı keşifte planlanır.",
        },
        {
          h2: "Ödeme, teslim ve servis",
          body:
            "Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Ürünlerimiz CE sertifikalıdır. Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. İstanbul'un tüm ilçelerinde proje yaptık; arıza durumunda tamir ve teknik servis veriyoruz.",
        },
      ],
      faqs: [
        {
          question: "Okul için hangi LED ekran uygun?",
          answer:
            "Giriş ve koridor için iç mekân P3.07 (30,88 USD/panel), amfi ve konferans salonu için P2.5 (32,18 USD/panel), bahçe ve cephe için dış mekân P4 (33,80 USD/panel) veya P5 (29,90 USD/panel) sık seçilir. Fiyatlar panel başına, KDV ve nakliye hariçtir.",
        },
        {
          question: "Okul giriş duyuru ekranı ne kadar?",
          answer:
            "Örneğin 1,92 × 0,96 m'lik iç mekân P3.07 ekran 36 modüldür; modül bedeli 36 × 30,88 = 1.111,68 USD'dir (yalnızca modül; kontrol, kabin, işçilik, KDV ve nakliye hariç). Kesin tutar keşif sonrası yazılı teklifle verilir.",
        },
        {
          question: "Okul bahçesine LED ekran konur mu?",
          answer:
            "Evet. Bahçe ve tören alanı için dış mekân P4 veya P5 modüller kullanılır. Direk veya duvar montajının taşıma ve rüzgâr yükü keşifte kontrol edilir.",
        },
        {
          question: "Sınıfta LED mi LCD mi kullanılmalı?",
          answer:
            "Sınıf içinde öğrenciler ekrana yakın oturduğu için LCD veya etkileşimli ekran daha uygundur. LED ekran daha çok giriş, koridor, bahçe, amfi ve konferans salonunda tercih edilir.",
        },
        {
          question: "Okullar için ödeme seçenekleri neler?",
          answer:
            "Taksitli ödeme yapılabilir; ödemeyi TL, USD, EUR ve diğer para birimlerinde kabul ediyoruz. Ödeme planı yazılı teklifte belirtilir.",
        },
      ],
      relatedSlugs: ["konferans-salonu-led", "poster-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Okulunuz için ekran planını çıkaralım",
        body:
          "Giriş, koridor, bahçe ve salon fotoğraflarını ve ekranların izleneceği mesafeleri gönderin; her alan için ekran ve bütçe önerisi hazırlayalım.",
      },
      cardLabel: "Okullar için LED ekran",
      cardTeaser: "İlkokul, ortaokul, lise ve üniversite: giriş, koridor, bahçe, amfi ve spor salonu ekranları.",
    },
  },
  en: {
    "led-ekran": {
      slug: "led-ekran",
      title: "LED Display Guide | Digital Screen Selection — ARLEDSCREEN",
      description:
        "What is an LED display and how do you choose pitch, brightness and cabinets? ARLEDSCREEN / NXTIONSTAR B2B survey, quote and install from Istanbul.",
      keywords: [
        "LED display",
        "digital screen",
        "LED wall",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "LED display & digital screen guide",
      intro:
        "An LED display is a modular, high-brightness digital surface. At ARLEDSCREEN, NXTIONSTAR series are sized by indoor/outdoor use, viewing distance and content path — survey to quote on one desk.",
      sections: [
        {
          h2: "LED wall vs classic digital signage",
          body:
            "LCD signage is fixed-size; LED cabinets tile into large seamless walls. Choose LED when you need outdoor readability, wide viewing angles or a continuous video surface. We start from the use case, then lock pitch and IP rating.",
        },
        {
          h2: "Pitch, brightness and cabinets",
          body:
            "Critical viewing distance drives pitch. Indoor walls often sit at 600–1,200 nits; outdoor façades need far higher. Cabinet geometry (e.g. 500×500 / 500×1000) follows structure and service access.",
        },
        {
          h2: "B2B process: survey, quote, install",
          body:
            "Enterprise LED is not a price-list buy. Our Gaziosmanpaşa engineering desk captures power, signal topology and schedule. AI / media-server content adds an integration line — the ARLEDSCREEN AI-ready standard.",
        },
        {
          h2: "Which series for which project?",
          body:
            "Fine-pitch indoor for lobbies and control rooms; IP65 outdoor for façades; transparent panels for retail; rental cabinets for events. Poster/totem and kiosk form factors are sized separately.",
        },
      ],
      faqs: [
        {
          question: "How is LED display pricing calculated?",
          answer:
            "Area, pitch, cabinet type, IP rating, controllers and install scope. The online calculator gives a materials band; firm B2B quotes follow survey.",
        },
        {
          question: "Digital screen or LED wall?",
          answer:
            "Small fixed panels can stay LCD. Wide, bright, seamless or outdoor-readable surfaces point to LED. We separate the two in engineering terms.",
        },
        {
          question: "Who supplies NXTIONSTAR LED in Turkey?",
          answer:
            "Products and install engineering run through ARLEDSCREEN: survey, install, calibration and support from Istanbul.",
        },
      ],
      relatedSlugs: [
        "dis-mekan-led-ekran",
        "ic-mekan-led-ekran",
        "konferans-salonu-led",
      ],
      cta: {
        title: "Size your LED display project",
        body:
          "Share dimensions, environment and use case — engineering replies with pitch, power and materials outline.",
      },
      cardLabel: "LED display",
      cardTeaser: "Digital screen selection, pitch and B2B process.",
    },

    "dijital-ekran": {
      slug: "dijital-ekran",
      title: "What Is a Digital Display & Where to Buy | ARLEDSCREEN",
      description:
        "What is a digital display, how does it differ from an LED screen, and where to buy one in Istanbul? ARLEDSCREEN sells and installs LED and LCD displays.",
      keywords: ["digital display", "digital signage Istanbul", "LED digital display", "NXTIONSTAR", "ARLEDSCREEN"],
      h1: "What is a digital display and where can you buy one?",
      intro:
        "“Digital display” is the umbrella term for any screen whose content changes electronically: LCD and OLED panels, scrolling-text LED signs, digital totems, video walls and full-colour LED screens. For LED or LCD digital displays in Istanbul, contact ARLEDSCREEN at our Gaziosmanpaşa office or on +90 530 507 88 34. One team handles sales, site survey, installation and technical service.",
      sections: [
        {
          h2: "Is a digital display the same as an LED screen?",
          body:
            "No. Every LED screen is a digital display, but not every digital display is an LED screen. LCD/OLED panels come in fixed factory sizes; scrolling LED signs mostly show text and numbers. A full-colour LED screen is built from RGB modules, plays video and grows by adding modules. ARLEDSCREEN sells full-colour LED under its own brand NXTIONSTAR; menu board and freestanding (totem) projects can also use LCD/TV-type screens, priced on quote.",
        },
        {
          h2: "Indoor vs outdoor",
          body:
            "Indoor viewers stand close, so finer pitch is used: NXTIONSTAR indoor P1.25, P2.5, P3.07, P4; GOB P1.25, P1.53, P1.86. Outdoor screens must handle sun, rain and dust: P2.5, P2.9, P3.07, P4, P4 front-service, P5 and P8. Brightness and protection class are shared with the model datasheet in the written quote.",
        },
        {
          h2: "How is the price set?",
          body:
            "Size, pixel pitch, indoor/outdoor use, control system and installation conditions set the price. Published USD prices for 12 NXTIONSTAR panels are on our price list and calculator — e.g. P2.5 indoor 32.18 USD and P2.5 outdoor 63.70 USD per panel (320 × 160 mm module, VAT and shipping excluded). The final amount is confirmed in a written quote after survey.",
        },
        {
          h2: "Digital display options by size and location",
          body:
            "Ready-made LCD/TV-type commercial displays come in factory sizes; indoors, 43 to 85 inches is the most common range. 49, 55 and 65-inch touch kiosk bodies fall into this group too. Above these sizes, or for a custom aspect ratio, a modular LED screen that grows by adding modules is used. Standard brightness is enough indoors. Behind a sunlit shop window a brighter window class is needed, and outdoors a sealed, cooled outdoor class. For LCD options, size, model and price are confirmed in a written quote.",
        },
      ],
      faqs: [
        {
          question: "Where can I buy a digital display in Istanbul?",
          answer:
            "Contact ARLEDSCREEN in Gaziosmanpaşa, Istanbul: +90 530 507 88 34 (phone/WhatsApp) or arled@arledscreen.com. After survey and written quote, the same team installs and services the screen.",
        },
        {
          question: "Which pixel pitch for an advertising display?",
          answer:
            "Rule of thumb: about 1 m minimum viewing distance per 1 mm of pitch (P2.5 ≈ 2.5 m). Close indoor viewing needs finer pitch; distant façades can use larger pitch.",
        },
      ],
      relatedSlugs: ["ekran-cesitleri", "led-ekran", "menuboard-dijital-menu"],
      cta: {
        title: "Plan your digital display",
        body: "Share size, location and content type — we reply with a pitch and budget outline.",
      },
      cardLabel: "Digital display",
      cardTeaser: "What a digital display is, how it differs from LED, and buying in Istanbul.",
    },
    "ekran-cesitleri": {
      slug: "ekran-cesitleri",
      title: "Types of Displays: LED, LCD, Totem, Menu Board | ARLEDSCREEN",
      description:
        "Types of displays: LCD, LED signs and full-colour LED; indoor/outdoor, GOB, flexible, transparent, poster/totem, menu board and kiosk compared.",
      keywords: ["types of displays", "LED display types", "digital signage types", "indoor display", "outdoor display", "ARLEDSCREEN"],
      h1: "What types of displays are there?",
      intro:
        "Displays fall into three groups: fixed-size LCD/OLED panels, scrolling-text LED signs and full-colour LED screens that play video. Full-colour LED screens vary by location and form: indoor, outdoor, GOB, fine pitch, flexible, transparent, mesh, rental and poster/totem. ARLEDSCREEN sells, installs and services these LED display types under its own brand NXTIONSTAR, and also offers LCD/TV-type menu boards and freestanding screens (price on quote).",
      sections: [
        {
          h2: "By technology",
          body:
            "LCD/OLED: fixed factory sizes for TVs, monitors and small signage. Scrolling LED sign: mostly single- or limited-colour text, prices and notices. Full-colour LED: built from RGB modules, plays video, scales by adding modules. Module surfaces include SMD, GOB and COB; GOB adds a protective clear glue layer over SMD.",
        },
        {
          h2: "By location and form",
          body:
            "Indoor (P1.25, P2.5, P3.07, P4) for shops, cafés, lobbies and meeting rooms; outdoor (P2.5, P2.9, P3.07, P4, P4 front-service, P5, P8) for façades, totems and billboards. GOB (P1.25, P1.53, P1.86) protects against impact and moisture; fine pitch (P0.9, P1.25) suits very close viewing; flexible (P1.86, P2.5) wraps columns and curves; transparent LED keeps shop windows see-through; mesh LED covers glass façades.",
        },
        {
          h2: "Vertical and interactive: poster, totem, menu board, kiosk",
          body:
            "Poster LED and totems are vertical, freestanding or side-by-side units. A menu board shows menus and promotions in cafés and restaurants. A kiosk adds touch or QR interaction; the touch surface is usually a panel, with LED as a side surface or backdrop.",
        },
      ],
      faqs: [
        {
          question: "LED or LCD?",
          answer:
            "LCD can suit a small fixed-size screen. For a large, bezel-free, bright surface or outdoor readability, full-colour LED is preferred. For menu boards and freestanding screens we offer both; LCD is priced on quote.",
        },
        {
          question: "What is a GOB LED display?",
          answer:
            "GOB (Glue on Board) adds a protective clear layer over the LED module surface for extra impact and moisture protection.",
        },
      ],
      relatedSlugs: ["dijital-ekran", "ic-mekan-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Pick the right display type with us",
        body: "Share location, size and viewing distance — we reply with a display type and pitch recommendation.",
      },
      cardLabel: "Display types",
      cardTeaser: "LCD, LED signs, full-colour LED and form factors compared.",
    },
    "menuboard-dijital-menu": {
      slug: "menuboard-dijital-menu",
      title: "Digital Menu Board, LED & LCD, for Cafés | ARLEDSCREEN",
      description:
        "What is a menu board and how to choose a digital menu display? LED and LCD menu boards for cafés and restaurants: choice, content and installation.",
      keywords: ["menu board", "digital menu board", "LED menu board", "café menu display", "ARLEDSCREEN"],
      h1: "Digital menu boards for cafés and restaurants",
      intro:
        "A menu board replaces the printed menu panel with a digital screen; prices, product photos and promotions update within minutes. ARLEDSCREEN offers two options: LED (a horizontal indoor LED wall above the counter or a vertical poster LED at the entrance) or an LCD/TV-type menu screen. One menu board reference is the Aslantürk Ercan Et branch in Yeşilpınar (Eyüpsultan, Istanbul), shared on our Instagram (instagram.com/arledscreen). Survey, installation and content setup are handled by our Istanbul Gaziosmanpaşa team.",
      sections: [
        {
          h2: "Pixel pitch for LED menu boards",
          body:
            "Using the ~1 m per 1 mm rule, P2.5 reads comfortably from about 2.5 m and P1.86 from about 1.9 m. NXTIONSTAR indoor offers P1.25, P2.5, P3.07, P4; GOB offers P1.25, P1.53, P1.86. The final choice follows the measured distance at the counter.",
        },
        {
          h2: "Updating content",
          body:
            "Content loads via the control card over USB, Wi‑Fi or local network. With Huidu cards, programmes are prepared in HDPlayer or LedArt and scheduled campaigns can be planned.",
        },
        {
          h2: "Menu board sizes: indoor and outdoor",
          body:
            "Behind the counter, menus are usually built from 43–55-inch LCD displays placed side by side; for a single, bezel-free menu surface an LED screen is built to size. For a freestanding menu at the entrance, 49, 55 or 65-inch portrait bodies or a poster LED screen are used. A sunlit window needs a high-brightness display. For outdoor menus (walk-up window, drive-thru, garden) either a sealed outdoor LCD or an outdoor LED screen is chosen. LED panel prices are published; LCD menu board prices are given in a written quote.",
        },
      ],
      faqs: [
        {
          question: "What size screen does a menu board need?",
          answer:
            "Counter menus usually use 43–55-inch screens side by side; freestanding menus commonly use 49, 55 or 65-inch portrait bodies. For a wider single surface an LED screen is built to size. Outdoor menus need a sealed LCD or an outdoor LED screen.",
        },
        {
          question: "How much does a menu board cost?",
          answer:
            "We do not publish a fixed menu board price; a written quote follows size, pitch and mounting. For LED-wall menu boards the published indoor panel prices apply: P2.5 indoor 32.18 USD, P1.86 GOB 49.08 USD (per panel, 320 × 160 mm, VAT and shipping excluded). Poster/totem LED and LCD/TV-type menu boards are quoted.",
        },
        {
          question: "Horizontal or vertical?",
          answer:
            "Wide over-counter menus suit a horizontal LED wall; entrances and narrow spaces suit a vertical poster LED. Layout is chosen on survey.",
        },
      ],
      relatedSlugs: ["poster-led-ekran", "ic-mekan-led-ekran", "dijital-ekran"],
      cta: {
        title: "Plan your menu board",
        body: "Share the counter area size and menu content — we reply with size, pitch and layout.",
      },
      cardLabel: "Menu board",
      cardTeaser: "LED and LCD digital menu displays for cafés and restaurants.",
    },
    "lcd-ekran": {
      slug: "lcd-ekran",
      title: "LCD Displays vs LED, Menu Boards & Totems | ARLEDSCREEN",
      description:
        "What is an LCD display and how does it differ from LED? LCD options for menu boards, freestanding totems and kiosks; price on quote. ARLEDSCREEN, Istanbul.",
      keywords: ["LCD display", "LCD vs LED", "LCD menu board", "LCD totem", "ARLEDSCREEN"],
      h1: "What is an LCD display and when should you choose it?",
      intro:
        "An LCD display forms the image with a backlit liquid-crystal panel made in a fixed factory size; it is common in TVs, monitors, menu boards and freestanding totems. Besides LED, ARLEDSCREEN offers LCD/TV-type screens for menu board and freestanding-screen projects. Model, size and price for LCD options are given in a written quote.",
      sections: [
        {
          h2: "LCD vs LED",
          body:
            "An LCD is a single panel with a fixed size; side-by-side panels leave bezels. A full-colour LED screen is built from modules, grows by adding modules and gives one seamless surface. LCD suits small, close-viewed surfaces; LED wins for large surfaces, long-distance readability or outdoor use.",
        },
        {
          h2: "Price and quote",
          body:
            "We do not publish prices for LCD displays; a written quote follows once model, size and quantity are clear. The technical details we publish are limited to those on our LCD and kiosk product pages: touch kiosks in 49, 55 and 65 inch, Android or Windows, with USB, HDMI, LAN and Wi-Fi. Other values are shared with the chosen model in the quote. Prices published on the site are for NXTIONSTAR LED panels only.",
        },
        {
          h2: "LCD displays by inch size and location",
          body:
            "LCD displays are chosen by diagonal size. For indoor commercial displays the common range is 43–85 inches: 43–55 inches for single menus, information and wayfinding, 65–85 inches for wall screens read from a distance. The freestanding touch kiosk bodies we supply come in 49, 55 and 65 inches, Android or Windows based. Indoor LCDs use standard brightness. High-brightness window displays and sealed, climate-controlled outdoor displays are separate product classes; where a large, bright outdoor surface is needed, an LED screen is usually the better fit. LCD prices and models are given only in a written quote.",
        },
      ],
      faqs: [
        {
          question: "What sizes do LCD displays come in?",
          answer:
            "For indoor commercial LCDs the common range is 43–85 inches. For touch kiosk bodies we supply 49, 55 and 65 inches. Outdoor LCD is a separate class; size, model and price are set in a written quote.",
        },
        {
          question: "LCD or LED?",
          answer:
            "LCD can suit a single small screen. For a large, bezel-free, bright surface or outdoor readability, LED is preferred. ARLEDSCREEN offers both; the choice is made on survey.",
        },
        {
          question: "How much does an LCD display cost?",
          answer:
            "We do not publish a fixed LCD price list; we prepare a written quote by model, size and quantity.",
        },
      ],
      relatedSlugs: ["menuboard-dijital-menu", "poster-led-ekran", "ekran-cesitleri"],
      cta: {
        title: "LCD or LED: choose with us",
        body: "Share location, size and quantity — we reply with a written quote for LCD and LED options.",
      },
      cardLabel: "LCD display",
      cardTeaser: "LCD vs LED, and LCD menu board / freestanding options.",
    },
    "kiosk-ekran": {
      slug: "kiosk-ekran",
      title: "What Is a Kiosk Display? Touch Kiosks | ARLEDSCREEN",
      description:
        "What is a kiosk display, where is it used and how to choose one? Touch information and self-service kiosks, LCD and LED options, installation. ARLEDSCREEN.",
      keywords: ["kiosk display", "touch kiosk", "self-service kiosk", "ARLEDSCREEN"],
      h1: "What is a kiosk display and how do you choose one?",
      intro:
        "A kiosk display is a standalone information and self-service point where users act by touch or QR code — wayfinding, ordering, ticketing or catalogues. The touch surface is usually a panel; LED can be added as a side surface or brand wall behind it. ARLEDSCREEN plans enclosure, screen and software integration together; price is given in a written quote.",
      sections: [
        {
          h2: "Kiosk vs totem vs menu board",
          body:
            "A kiosk is interactive; totems and posters mostly broadcast one-way; a menu board shows the menu at the counter. Mixed areas can combine a kiosk with poster LED.",
        },
        {
          h2: "What to check when choosing",
          body:
            "First the user flow and transaction type; then screen technology, enclosure, locking and anchoring, cable concealment and peripherals such as printer, card reader and POS. Outdoor kiosks need IP-rated enclosures and climate control; values come with the chosen model's datasheet in the written quote.",
        },
        {
          h2: "Kiosk display sizes and indoor/outdoor use",
          body:
            "The touch digital kiosks we supply come in 49, 55 and 65 inches; each size is available Android or Windows based, and content is updated over USB, HDMI, LAN or Wi-Fi. These bodies are for indoor spaces such as shopping centres, shops, restaurants, hotel lobbies and meeting areas. An outdoor kiosk needs a sealed enclosure, high brightness and climate control; such requests are assessed per project. Price and stock are confirmed in a written quote.",
        },
      ],
      faqs: [
        {
          question: "What sizes do kiosk displays come in?",
          answer:
            "The touch kiosks we supply are 49, 55 and 65 inches, Android or Windows based. They are for indoor use; outdoor kiosk requests are assessed per project and priced in a written quote.",
        },
        {
          question: "How much does a kiosk display cost?",
          answer:
            "We do not publish a fixed kiosk price list. A written quote follows screen type, enclosure, peripherals, software and quantity.",
        },
        {
          question: "LCD or LED for a kiosk?",
          answer:
            "The touch surface is usually a panel; LED is added as a side surface or backdrop video wall. Needs are set on survey.",
        },
      ],
      relatedSlugs: ["kiosk-dijital-ekran", "lcd-ekran", "menuboard-dijital-menu"],
      cta: {
        title: "Plan your kiosk display",
        body: "Share use case, quantity and software needs — we reply with an enclosure and screen proposal in a written quote.",
      },
      cardLabel: "Kiosk display",
      cardTeaser: "What a kiosk display is, where it is used and how to choose one.",
    },
    "cnc-led-kasa": {
      slug: "cnc-led-kasa",
      title: "CNC LED Cabinets: Types, Sizes, Materials | ARLEDSCREEN",
      description:
        "What is a CNC LED cabinet? Steel, aluminium and die-cast types, standard sizes such as 96×96 cm and 640×480 mm, indoor vs outdoor. Priced on quote.",
      keywords: [
        "CNC LED cabinet",
        "LED display cabinet",
        "LED cabinet sizes",
        "960x960 LED cabinet",
        "aluminium LED cabinet",
        "ARLEDSCREEN",
      ],
      h1: "What is a CNC LED cabinet? Types and sizes",
      intro:
        "A CNC LED cabinet is the display body that carries the LED modules, receiving card and power supplies, cut to size by CNC or laser. Cabinet size is a multiple of the module size: with 320 × 160 mm NXTIONSTAR modules, bodies grow in 32 cm and 16 cm steps. ARLEDSCREEN chooses cabinet type and size on survey based on the screen surface, indoor or outdoor use and service side; cabinet pricing is on quote.",
      sections: [
        {
          h2: "LED cabinet types by material",
          body:
            "Steel (cold-rolled sheet) cabinet: CNC or laser cut, bent and oven-painted. Low cost but heavier; common in fixed installations and P2.5–P10 screens. Aluminium cabinet: machined from sheet or profile; lighter than steel, rust-free, with fan-door versions for outdoor use. Die-cast aluminium and magnesium-alloy cabinets: cast in a mould and finished by CNC; tight tolerances and gap-free joins. Preferred for indoor fine-pitch screens and rental systems.",
        },
        {
          h2: "Standard LED cabinet sizes",
          body:
            "For steel CNC cabinets the most common body on the market is 96 × 96 cm, holding 18 modules of 32 × 16 cm in a 3 × 6 layout. Small screens and signs use 64 × 48 cm (6 modules), 64 × 64 cm and 96 × 48 cm; strip-type screens use long bodies 16 cm high. The series runs in 32 × 16 cm steps up to 256 × 128 cm. Die-cast sizes are given in millimetres: 640 × 480, 640 × 640 and 320 × 480 mm for indoor fine pitch; 500 × 500 and 500 × 1000 mm for rental and stage systems; 960 × 960 mm outdoors. Portrait cabinets such as 64 × 192 cm for poster LED screens are a separate group.",
        },
        {
          h2: "Indoor vs outdoor cabinets",
          body:
            "Indoor cabinets are thinner and mostly front-serviced: modules are held by magnets and removed with a vacuum tool, so the screen can sit flush on a wall. Outdoor cabinets are gasketed, covered and ventilated against rain and dust; rear service is common, and fan cooling is planned on sunlit façades. Double-sided cabinets are built for poles and corners seen from two directions.",
        },
        {
          h2: "How to choose a cabinet",
          body:
            "First set the total screen size and pixel pitch, then pick the cabinet size that divides that surface with the fewest filler parts. Service side (front or rear), space in front of the wall, steel structure load, fixed or rental use and single or double face settle the choice. ARLEDSCREEN makes this choice on survey; cabinet, modules, control system and installation are in one quote.",
        },
        {
          h2: "LED cabinet price",
          body:
            "Cabinet price depends on material, size, quantity, service side and details such as gaskets and paint. We do not publish list prices for cabinets; pricing is on quote. LED panel prices are published on our LED display price page.",
        },
      ],
      faqs: [
        {
          question: "What is the most common LED cabinet size?",
          answer:
            "For steel CNC cabinets, 96 × 96 cm is the most common body and holds 18 modules of 32 × 16 cm. For indoor fine pitch, 640 × 480 mm die-cast cabinets are common; rental systems use 500 × 500 and 500 × 1000 mm.",
        },
        {
          question: "Steel or aluminium cabinet?",
          answer:
            "Steel is cheaper but heavier and is fine for fixed installations. Aluminium and die-cast cabinets are lighter, rust-resistant and more precise; they suit fine pitch, rental and weight-sensitive façades.",
        },
        {
          question: "How much does an LED cabinet cost?",
          answer:
            "We do not publish fixed list prices for cabinets; we price on quote based on material, size and quantity.",
        },
      ],
      relatedSlugs: ["dis-mekan-led-ekran", "ic-mekan-led-ekran", "poster-led-ekran"],
      cta: {
        title: "Let's size your LED cabinets",
        body: "Share screen size, pixel pitch and mounting location; we'll propose a cabinet type and send a quote.",
      },
      cardLabel: "CNC LED cabinet",
      cardTeaser: "LED display cabinet types, standard sizes and indoor vs outdoor.",
    },
    "dis-mekan-led-ekran": {
      slug: "dis-mekan-led-ekran",
      title: "Outdoor LED Display | IP65 Façade & DOOH — ARLEDSCREEN",
      description:
        "Outdoor LED displays: IP65 sealing, high nits, façade / DOOH engineering. NXTIONSTAR outdoor series — ARLEDSCREEN survey and install, Istanbul.",
      keywords: [
        "outdoor LED display",
        "IP65 LED",
        "DOOH LED",
        "façade LED",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Outdoor LED display solutions",
      intro:
        "Outdoor screens must survive rain, dust and sun. ARLEDSCREEN / NXTIONSTAR outdoor LED projects plan IP65 sealing, GOB protection and high nit output together.",
      sections: [
        {
          h2: "Why IP65 and GOB matter outdoors",
          body:
            "IP65 addresses dust and water-jet sealing. Façade and roadside DOOH also need drainage and correct mounting angles. GOB (glue-on-board) surface armour adds impact and moisture protection; whether it is needed is discussed openly when the NXTIONSTAR outdoor module is selected.",
        },
        {
          h2: "Brightness, pitch and viewing distance",
          body:
            "Outdoor NXTIONSTAR pitches: P2.5, P2.9, P3.07, P4, P4 front-service, P5 and P8. Distant billboards use coarser P; pedestrian-close walls use finer P. Brightness and IP class are stated in the written quote — the site does not publish blanket nit/IP claims. Survey notes sun path and day/night content.",
        },
        {
          h2: "Façade, stadium and municipal DOOH",
          body:
            "Building façades need wind load and structure; arenas need vibration and service access; municipal signage needs content calendar and power. Power topology and spare receivers go into the quote.",
        },
        {
          h2: "ARLEDSCREEN outdoor delivery",
          body:
            "After measurement or site survey we define cabinet layout, steel interface, CAT6A/fiber runs and maintenance access. CMS/AI-scheduled DOOH content includes sender/receiver fit. Calibration and support stay on the same desk.",
        },
      ],
      faqs: [
        {
          question: "How many nits for outdoor LED?",
          answer:
            "It depends on ambient light and sun orientation; a sun-facing façade needs more brightness than a shaded site. The chosen model's brightness is shared with its datasheet in the written quote.",
        },
        {
          question: "Can we install outdoors without IP65?",
          answer:
            "Semi-covered spaces may allow intermediate options; open façades and rain-exposed DOOH require IP65-class sealing.",
        },
        {
          question: "What about outdoor maintenance?",
          answer:
            "Interval depends on pollution and duty cycle. Quotes can include cleaning, PSU checks and software updates.",
        },
      ],
      relatedSlugs: ["led-ekran", "vitrin-led-ekran", "poster-led-ekran"],
      cta: {
        title: "Plan your outdoor LED project",
        body:
          "Send façade size, sun orientation and use case — we reply with IP65 / nit / pitch outline.",
      },
      cardLabel: "Outdoor LED",
      cardTeaser: "IP65 façades, DOOH and high-nit outdoor screens.",
    },
    "ic-mekan-led-ekran": {
      slug: "ic-mekan-led-ekran",
      title: "Indoor LED Display | Lobby, Studio, Hall — ARLEDSCREEN",
      description:
        "Indoor LED displays: fine pitch, camera-friendly refresh, lobby / studio / conference. NXTIONSTAR indoor series — ARLEDSCREEN engineering, Istanbul.",
      keywords: [
        "indoor LED display",
        "fine pitch LED",
        "studio LED",
        "lobby video wall",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Indoor LED display solutions",
      intro:
        "Indoor projects put viewers close — so fine pitch, low noise and consistent colour come first. ARLEDSCREEN / NXTIONSTAR indoor LED also plans camera-facing use and AI/CMS pipelines up front.",
      sections: [
        {
          h2: "Pitch and viewing distance indoors",
          body:
            "Indoor NXTIONSTAR pitches: P1.25, P2.5, P3.07 and P4 (P1.25 available with GOB). Fine-pitch group also publishes P0.9 and P1.25. Lobbies often use finer P; longer corridors may step to P3.07–P4. We measure real standing/seated distance rather than rules of thumb alone.",
        },
        {
          h2: "Camera-friendly refresh and colour",
          body:
            "Broadcast and event capture hate scan lines and flicker. High refresh, calibrated white point and stable gamut are required for studio indoor LED; they are confirmed against the datasheet of the selected NXTIONSTAR model during the survey.",
        },
        {
          h2: "Lobby, retail and corporate halls",
          body:
            "Brand loops, product walls and executive dashboards each need balanced brightness for eye comfort. AV integration is added to the signal diagram when required.",
        },
        {
          h2: "AI-ready indoor LED",
          body:
            "AI-generated or automated content must run without dropouts. The ARLEDSCREEN standard means known refresh behaviour, documented receivers and CMS/media-server fit without proprietary lock-in.",
        },
      ],
      faqs: [
        {
          question: "Indoor LED or LCD video wall?",
          answer:
            "LED wins for frameless large surfaces and flexible size. Small fixed panels can stay LCD. Area and content type decide.",
        },
        {
          question: "How many nits indoors?",
          answer:
            "Brightness follows ambient light: too bright tires eyes in a dark hall; sunlit atriums or window backdrops need more. The chosen model's brightness is shared with its datasheet in the written quote.",
        },
        {
          question: "Front or rear service?",
          answer:
            "Wall depth and access decide. Thin lobby walls favour front service; tech rooms behind the wall favour rear service.",
        },
      ],
      relatedSlugs: [
        "led-ekran",
        "konferans-salonu-led",
        "mimari-muhendislik-led",
      ],
      cta: {
        title: "Size your indoor LED wall",
        body:
          "Share hall/lobby dimensions and viewing distance — we reply with fine-pitch and power outline.",
      },
      cardLabel: "Indoor LED",
      cardTeaser: "Fine-pitch lobby, studio and corporate indoor screens.",
    },
    "mimari-muhendislik-led": {
      slug: "mimari-muhendislik-led",
      title: "Architectural & Engineering LED Integration — ARLEDSCREEN",
      description:
        "LED integration for architecture and engineering teams: structural load, framing, power, heat and signal. NXTIONSTAR + ARLEDSCREEN survey pack — Istanbul.",
      keywords: [
        "architectural LED",
        "LED engineering",
        "façade engineering",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Architectural & engineering LED integration",
      intro:
        "An LED surface is part of the building envelope and MEP systems. ARLEDSCREEN sizes NXTIONSTAR products with architects and engineers across structure, power and signal.",
      sections: [
        {
          h2: "Early-phase LED decisions",
          body:
            "Late pitch/cabinet choices break cable shafts and framing. Survey notes mark area, viewing angles, maintenance platforms and fire-escape conflicts. Real cabinet modules can sit in architectural renders.",
        },
        {
          h2: "Structural load and façade detail",
          body:
            "Outdoor LED needs wind and dead-load calcs; indoor walls need substrate capacity. Steel/aluminium interfaces follow cabinet mount points. Waterproofing, thermal movement and service voids go into detail drawings.",
        },
        {
          h2: "Power, heat and signal",
          body:
            "Peak power and three-phase balance feed the electrical design. Rear ventilation may be required. Fiber for long runs, CAT6A for short; critical spaces get spare sender/receiver topology. AI/media ports and latency budgets are added when needed.",
        },
        {
          h2: "Cross-discipline delivery pack",
          body:
            "Quotes include preliminary BOM, power outline, signal diagram and install notes — one desk coordinating GC, electrical and AV from Gaziosmanpaşa.",
        },
      ],
      faqs: [
        {
          question: "When should architects call ARLEDSCREEN?",
          answer:
            "Ideally before detailed design or tender packs. Late calls force framing revisions and cost.",
        },
        {
          question: "How is LED weight provided?",
          answer:
            "As estimated kg/m² for cabinet + frame + cabling; structural engineers fold it into load calcs. Final numbers depend on product and mount.",
        },
        {
          question: "Are transparent retail LEDs architecture-friendly?",
          answer:
            "Yes — transparency vs daytime readability is chosen with the concept. See the shopfront guide for detail.",
        },
      ],
      relatedSlugs: [
        "dis-mekan-led-ekran",
        "ic-mekan-led-ekran",
        "vitrin-led-ekran",
      ],
      cta: {
        title: "Draw LED into your architectural pack",
        body:
          "Share drawings or dimensions — we reply with framing, power and signal outline.",
      },
      cardLabel: "Architecture & engineering",
      cardTeaser: "Framing, power, heat and signal — cross-discipline LED.",
    },
    "konferans-salonu-led": {
      slug: "konferans-salonu-led",
      title: "Conference Hall LED Screen: Size, Pixel Pitch and Price | ARLEDSCREEN",
      description:
        "LED screens for conference halls and auditoriums: screen size by hall depth, pixel pitch by the front row, example size and module cost table, AV connections. NXTIONSTAR — ARLEDSCREEN, Istanbul.",
      keywords: ["conference hall LED screen", "auditorium LED screen", "school conference hall", "meeting room LED wall", "LED video wall", "NXTIONSTAR", "ARLEDSCREEN"],
      h1: "How to choose an LED screen for a conference hall",
      intro:
        "Two distances decide a conference-hall LED screen: the front row sets the pixel pitch and the back row sets the screen height. For presentation-heavy halls, indoor P2.5 is usually right, and P3.07 suits deeper halls; screen height is about one eighth of the back-row distance. Unlike a projector, an LED screen stays sharp in a lit room with no blackout needed. ARLEDSCREEN surveys, installs and services its own NXTIONSTAR screens from its Gaziosmanpaşa, Istanbul HQ.",
      sections: [
        {
          h2: "Pixel pitch: set by the front row",
          body:
            "Use roughly 1 m of distance per 1 mm of pitch. If the front row is 2.5 m away, P2.5 works; from 3 m, P3.07 is enough. Boardrooms viewed from 1.5–2 m need P1.53 or P1.86 GOB. Published panel prices (USD per panel, VAT and shipping excluded): P1.53 GOB 62.08, P1.86 GOB 49.08, indoor P2.5 32.18, indoor P3.07 30.88.",
        },
        {
          h2: "Screen size: set by the back row",
          body:
            "For slide text to be readable from the back, choose a screen height of about one eighth of the back-row distance. Sizes are planned in 320 × 160 mm modules, with the layout closest to 16:9 so a laptop image fills the screen. The table examples follow this rule.",
        },
        {
          h2: "LED instead of a projector",
          body:
            "LED keeps high contrast in a lit room, needs no screen or blackout, and is evenly bright edge to edge. It grows by adding modules, and a faulty module is replaced on its own.",
        },
        {
          h2: "Sound, camera and control",
          body:
            "Laptop, wireless presentation, media player and camera recording are planned in one signal layout with the screen. If you will film or stream, say so at the survey so control and refresh settings are planned for it. Load and safety details for a wall, hanging or floor-standing frame are written into the quote.",
        },
        {
          h2: "Schools and corporate halls",
          body:
            "School halls and lecture theatres prioritise durability and easy use; corporate halls prioritise fine pitch and brand colours. See our separate school guide for every screen in a school. Installment payment is available, and we accept TL, USD, EUR and other currencies. Our products are CE certified. Delivery takes 3–21 days of preparation + 1–14 days of shipping.",
        },
      ],
      faqs: [
        {
          question: "Which pixel pitch does a conference hall need?",
          answer:
            "If the front row is 2.5 m away, indoor P2.5 (USD 32.18 per panel); from 3 m, indoor P3.07 (USD 30.88 per panel). Meeting rooms viewed from 1.5–2 m need P1.53 or P1.86 GOB.",
        },
        {
          question: "How big should a conference-hall LED screen be?",
          answer:
            "Screen height is about one eighth of the back-row distance. With the back row at 15 m, about 3.52 × 1.92 m (132 modules) fits; indoor P2.5 module cost is 132 × 32.18 = USD 4,247.76 (module only, VAT and shipping excluded).",
        },
        {
          question: "Why choose LED over a projector?",
          answer:
            "LED stays sharp in a lit room, needs no blackout or screen, is evenly bright and can be repaired module by module.",
        },
        {
          question: "What drives the price?",
          answer:
            "Screen size, pitch, mounting (wall, hanging, frame) and control system. Panel prices are published; the final amount is given in a written quote after survey. Installment payment is available.",
        },
        {
          question: "How long do delivery and installation take?",
          answer:
            "Delivery takes 3–21 days of preparation + 1–14 days of shipping. We have completed projects in every Istanbul district; the installation date is planned at the survey.",
        },
      ],
      relatedSlugs: ["okul-led-ekran", "ic-mekan-led-ekran", "dugun-salonu-led"],
      cta: {
        title: "Let's size the screen for your hall",
        body:
          "Send the hall plan, front and back row distances and a photo of the stage wall; we will suggest size, pitch and budget.",
      },
      cardLabel: "Conference hall LED screen",
      cardTeaser: "Screen size by hall depth, pitch by the front row, example module costs.",
    },
    "vitrin-led-ekran": {
      slug: "vitrin-led-ekran",
      title: "Shopfront LED Display | Transparent & Retail — ARLEDSCREEN",
      description:
        "Shopfront LED: transparent panels, retail windows and store façades. NXTIONSTAR transparent / fine-pitch options — ARLEDSCREEN survey, Istanbul.",
      keywords: [
        "shopfront LED",
        "transparent LED",
        "retail LED",
        "window display LED",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Shopfront LED display solutions",
      intro:
        "Shopfront LED turns store glass into a media surface while optionally keeping products visible. ARLEDSCREEN / NXTIONSTAR transparent and slim panels cover retail window projects from survey to install.",
      sections: [
        {
          h2: "Transparent LED vs opaque window wall",
          body:
            "Transparent LED keeps product visibility; opaque LED is a full video wall. Transparency % and pitch trade ‘glass feel’ vs ‘screen feel’. Concept stage chooses the balance.",
        },
        {
          h2: "Daytime readability and night dimming",
          body:
            "Street glare raises nit needs; night brightness must not blind pedestrians. Sensor or scheduled dimming is planned from survey orientation notes.",
        },
        {
          h2: "Mounting: behind glass, in front, hung",
          body:
            "Behind-glass depth and service access matter; in-front mounts need pedestrian clearance. Cable concealment and power boards must not disrupt store ops or egress.",
        },
        {
          h2: "Content and AI/CMS pipelines",
          body:
            "Campaign creative changes often. Media players or CMS/AI engines are matched to receivers in the quote — the same ARLEDSCREEN AI-ready standard used elsewhere.",
        },
      ],
      faqs: [
        {
          question: "Does shopfront LED require cutting the glass?",
          answer:
            "Most installs add panels or mount behind existing glass. Glass replacement is coordinated with façade teams only when needed.",
        },
        {
          question: "Is transparent LED right for every product?",
          answer:
            "Dense small text may read better on opaque fine pitch. Product showcase favours transparent.",
        },
        {
          question: "Can retail chains standardise a package?",
          answer:
            "Yes — repeating store sizes get a type design and central CMS sync, scaled by branch count.",
        },
      ],
      relatedSlugs: [
        "poster-led-ekran",
        "ic-mekan-led-ekran",
        "kiosk-dijital-ekran",
      ],
      cta: {
        title: "Plan your shopfront LED",
        body:
          "Share window sizes and transparency goals — we reply with panel and content-path outline.",
      },
      cardLabel: "Shopfront LED",
      cardTeaser: "Transparent and retail shopfront LED displays.",
    },
    "poster-led-ekran": {
      slug: "poster-led-ekran",
      title: "Poster LED & Totem | Vertical Signage — ARLEDSCREEN",
      description:
        "Poster LED displays and digital totems: vertical format for lobby, mall and outdoor. NXTIONSTAR totem solutions — ARLEDSCREEN engineering and install.",
      keywords: [
        "poster LED",
        "LED totem",
        "digital poster",
        "vertical LED",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Poster LED display & totem solutions",
      intro:
        "Poster LED replaces static posters with bright vertical digital surfaces. ARLEDSCREEN / NXTIONSTAR totems serve lobby, mall and outdoor wayfinding needs.",
      sections: [
        {
          h2: "Poster LED vs wall LED",
          body:
            "Posters/totems are freestanding or wall-hung vertical units; video walls are wide horizontal canvases. Narrow spaces and single-message campaigns favour poster LED with pitch matched to reading distance.",
        },
        {
          h2: "Indoor vs outdoor totems",
          body:
            "Indoor units use lower nits and slim housings; outdoor units need IP65, high nits and solid bases. Mall corridors respect accessibility clearances; outdoor sites need anchorage and wind calcs.",
        },
        {
          h2: "Vertical content format",
          body:
            "9:16 or custom vertical resolutions affect creative production. CMS templates and AI crop rules should be defined up front.",
        },
        {
          h2: "Power, network and operations",
          body:
            "Single totems may use local power; multi-site parks benefit from central networking and remote monitoring. Quotes separate base, screen, player and install lines.",
        },
      ],
      faqs: [
        {
          question: "How do we size poster LED?",
          answer:
            "Corridor width, viewing distance and message length decide. Typical vertical heights are locked on survey by venue type.",
        },
        {
          question: "Is a totem the same as a kiosk?",
          answer:
            "No. Totems/posters are mostly one-way; kiosks add touch and transactions. See the kiosk guide.",
        },
        {
          question: "Does outdoor poster LED need IP65?",
          answer:
            "Yes for open rain-exposed sites. Semi-covered areas may allow intermediate protection.",
        },
      ],
      relatedSlugs: [
        "kiosk-dijital-ekran",
        "vitrin-led-ekran",
        "dis-mekan-led-ekran",
      ],
      cta: {
        title: "Size your poster / totem LED",
        body:
          "Share quantity, indoor/outdoor use and content format — we reply with a technical outline.",
      },
      cardLabel: "Poster & totem",
      cardTeaser: "Vertical poster LED and digital totem solutions.",
    },
    "kiosk-dijital-ekran": {
      slug: "kiosk-dijital-ekran",
      title: "Digital Kiosk Displays | Touch & Info Points — ARLEDSCREEN",
      description:
        "Digital kiosks: touch wayfinding, directories and self-service. Panel/LED choice, enclosure and software integration — ARLEDSCREEN / NXTIONSTAR.",
      keywords: [
        "digital kiosk",
        "touchscreen kiosk",
        "info kiosk",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Digital kiosk display solutions",
      intro:
        "A kiosk is an interactive digital screen point for wayfinding, tickets, catalogues or self-service. ARLEDSCREEN selects enclosure, display tech and software integration together — combining NXTIONSTAR LED surfaces with totems/walls when needed.",
      sections: [
        {
          h2: "Kiosk vs totem vs video wall",
          body:
            "Kiosks need touch or card/QR interaction; totems are mostly one-way; video walls address crowds. Mixed lobbies often place kiosk + poster LED side by side after mapping user flow.",
        },
        {
          h2: "Choosing display technology",
          body:
            "Close-range touch often uses high-resolution panels; brand walls beside the kiosk may be LED. Outdoor kiosks need high nits, anti-glare and IP-rated housings with filtration and locks.",
        },
        {
          h2: "Software, payments and security",
          body:
            "Existing self-service/CMS/AI stacks define APIs and peripherals (printers, readers, POS). Physical security covers locks, anchors and cable concealment; privacy/logging rules sit on the software side.",
        },
        {
          h2: "Install and field operations",
          body:
            "Floor anchors, accessible height and queue distance must match architecture. Multi-site rollouts use a type enclosure and central monitoring. Delivery includes install, networking and operator training.",
        },
      ],
      faqs: [
        {
          question: "Must a kiosk use an LED screen?",
          answer:
            "No. Touch surfaces are often panels; LED may be a side surface or backdrop wall. Needs drive the split.",
        },
        {
          question: "Are outdoor kiosks possible?",
          answer:
            "Yes — with IP-rated enclosures, high nits and climate control. Survey covers sun, rain and vandalism risk.",
        },
        {
          question: "Standalone or networked kiosks?",
          answer:
            "Single lobby units can run offline; chains/campuses need networking for content and monitoring. Both models can be quoted.",
        },
      ],
      relatedSlugs: [
        "poster-led-ekran",
        "vitrin-led-ekran",
        "led-ekran",
      ],
      cta: {
        title: "Define your kiosk project",
        body:
          "Share use case, quantity and software needs — we reply with enclosure + display outline.",
      },
      cardLabel: "Kiosk",
      cardTeaser: "Touch info and self-service digital kiosk displays.",
    },
    "cami-led-ekran": {
      slug: "cami-led-ekran",
      title: "LED Screens for Mosques and Places of Worship: Size, Price, Prayer Times | ARLEDSCREEN",
      description:
        "LED screens for mosques, churches and other places of worship: size and pixel pitch by congregation distance, prayer-time and sermon display, published panel prices. ARLEDSCREEN, Istanbul.",
      keywords: ["mosque LED screen", "LED screen for mosque", "prayer time display", "church LED screen", "place of worship LED screen", "NXTIONSTAR"],
      h1: "How to choose an LED screen for a mosque or place of worship",
      intro:
        "An LED screen can be installed in a mosque to show prayer times, the sermon text, announcements and religious days. Two distances decide the right screen: the nearest worshipper sets the pixel pitch, and the farthest row sets the screen size. The same rules apply to churches, cemevis and other places of worship. ARLEDSCREEN surveys, installs and services its own NXTIONSTAR LED screens from its Gaziosmanpaşa, Istanbul HQ.",
      sections: [
        {
          h2: "LED or LCD for a mosque?",
          body:
            "If a small masjid only needs a prayer-time chart, a single LCD screen may be enough. In a large prayer hall most worshippers watch from a distance, so an LED screen, which grows by adding modules, is the better fit. LED screens are built from 320 × 160 mm modules; the size is planned around the wall beside the mihrab or in the women's gallery.",
        },
        {
          h2: "How big should the screen be?",
          body:
            "As a general rule, choose a screen height of about one eighth of the distance to the farthest viewer, so prayer times and sermon text stay readable from the back rows. For example, if the last row is 12 m away, a screen about 1.44 m high (9 modules) is a good starting point. The examples in the table follow this rule; the final size is set at the survey.",
        },
        {
          h2: "How is pixel pitch chosen?",
          body:
            "Pitch follows the nearest viewer: roughly 1 m of distance per 1 mm of pitch (P3.07 ≈ 3 m). Inside a mosque the front rows are usually more than 3–4 m away, so indoor P3.07 or P4 modules are enough. If the screen sits very close to worshippers, P2.5 is preferred. Courtyard and façade screens use outdoor P4 or P5 modules.",
        },
        {
          h2: "How are prayer times and the sermon shown?",
          body:
            "An LED screen displays the signal it receives. Prayer times, the sermon text, announcements and verse images can be played as scheduled content from a media player or an asynchronous control card (Huidu, NovaStar), so the programme keeps running with the PC off. The content source and control system are agreed at the survey and written into the quote.",
        },
        {
          h2: "Price and payment",
          body:
            "Published panel prices are in USD per panel, VAT and shipping excluded: indoor P2.5 32.18, indoor P3.07 30.88, indoor P4 26.98, outdoor P4 33.80 and outdoor P5 29.90. Amounts in the table are module cost only; control card, cabinet or frame, labour and software are added separately. Installment payment is available, and we accept TL, USD, EUR and other currencies. For screens funded by an association or donations, the payment plan is stated in the written quote.",
        },
      ],
      faqs: [
        {
          question: "Can an LED screen be installed in a mosque?",
          answer:
            "Yes. An LED screen can be mounted beside the mihrab, in the women's gallery or in the courtyard. Wall load, power line and cable route are checked at the survey.",
        },
        {
          question: "How big should an LED screen be for a mosque?",
          answer:
            "If the last row is 12 m away, about 2.56 × 1.44 m (72 modules, ≈ 3.7 m²) is a good start; indoor P3.07 module cost is 72 × 30.88 = USD 2,223.36 (module only, VAT and shipping excluded). Small neighbourhood mosques may need less.",
        },
        {
          question: "How much does a mosque LED screen cost?",
          answer:
            "It depends on size, pitch and mounting. Panel prices are published (e.g. indoor P3.07 USD 30.88 per panel); the final amount is given in a written quote after survey. Installment payment is available.",
        },
        {
          question: "Which screen suits a church?",
          answer:
            "The same rules apply: pitch follows the nearest viewer, size follows the farthest. Large halls suit LED; small rooms can use LCD.",
        },
        {
          question: "What is the delivery time?",
          answer:
            "Delivery takes 3–21 days of preparation + 1–14 days of shipping. The date for your project is stated in the written quote.",
        },
      ],
      relatedSlugs: ["ic-mekan-led-ekran", "konferans-salonu-led", "lcd-ekran"],
      cta: {
        title: "Let's plan the right screen for your mosque",
        body:
          "Send the hall size, the distance to the front and back rows and a photo of the wall; we will suggest size, pitch and budget.",
      },
      cardLabel: "Mosque and place-of-worship LED screens",
      cardTeaser: "Screen size and pitch by congregation distance, plus prayer-time display.",
    },
    "led-ekran-ariza-belirtileri": {
      slug: "led-ekran-ariza-belirtileri",
      title: "LED Screen Fault Symptoms and Causes | ARLEDSCREEN",
      description:
        "LED screen partly black, flickering, showing lines or not turning on? Fault symptoms, likely causes and first checks. LED, LCD, kiosk and menu board repair: ARLEDSCREEN, Istanbul.",
      keywords: ["LED screen fault", "LED screen flickering", "LED screen lines", "LED screen not turning on", "part of LED screen black", "LED screen repair", "LCD repair", "kiosk repair"],
      h1: "LED screen fault symptoms: causes and what to do",
      intro:
        "Most LED screen faults can be recognised by their symptom: a dark area usually points to a power supply or receiving card, flicker to a cable or setting, and a line or wrong-coloured row to a module or ribbon cable. The table below lists the most common symptoms, likely causes and the first checks you can do yourself. The final diagnosis is made on site by measurement; besides LED screens, ARLEDSCREEN also repairs LCD advertising displays, kiosks and menu boards.",
      sections: [
        {
          h2: "Part of the screen is black",
          body:
            "If a cabinet-sized rectangle is dark, the cause is usually that cabinet's power supply or receiving card. If every cabinet after one point is dark, the data cable chain may be broken. If a single module is out, the module or its ribbon cable has failed.",
        },
        {
          h2: "Flicker, lines and wrong colours",
          body:
            "Flicker usually comes from a loose data or power cable, a weakening power supply or receiving card settings; flicker seen only on camera is linked to a low refresh rate. Horizontal or vertical lines and a single row in the wrong colour (for example a row stuck red) usually come from the module driver IC, a ribbon cable or a receiving card port.",
        },
        {
          h2: "The screen will not turn on",
          body:
            "First check the breaker, the power line and the video source (PC or media player). On synchronous screens, the screen shows nothing when the PC is off. If these are fine, the sending card, power supplies or software settings need checking.",
        },
        {
          h2: "Moisture, lightning and surges",
          body:
            "Outdoors, worn gaskets let moisture in, causing oxidised modules and dark patches. Lightning and power surges mostly damage power supplies, receiving cards and connections. Have the screen checked before switching it on again to avoid further damage.",
        },
        {
          h2: "LCD, kiosk and menu board faults",
          body:
            "On LCD advertising displays, touch kiosks and digital menu boards the most common symptoms are no picture, an unresponsive touch screen, power board failures and connection problems. Send the brand and model with a photo or video of the fault; we will make a remote pre-diagnosis and plan the survey.",
        },
      ],
      faqs: [
        {
          question: "Part of my LED screen is black. What should I do?",
          answer:
            "Restarting is not a lasting fix. Take a photo of the dark area and send it to +90 530 507 88 34 on WhatsApp. Cabinet-sized dark areas usually come from a power supply or receiving card and are fixed by replacing the part.",
        },
        {
          question: "How much does LED screen repair cost?",
          answer:
            "We do not publish fixed repair prices; the cause and parts differ on every job. The price is given in a written quote after pre-diagnosis and survey.",
        },
        {
          question: "How often should an LED screen be maintained?",
          answer:
            "It depends on use. On outdoor screens, regular checks of gaskets, cables and connections reduce moisture faults. Maintenance scope and frequency are stated in the written quote; ARLEDSCREEN offers a 2-year warranty and 5 years of free technical service.",
        },
        {
          question: "Do you repair scrolling text signs and digital screens?",
          answer:
            "Yes. We repair LED screens, LCD advertising displays, kiosks and menu boards. For scrolling text signs, share the brand and control card and we will assess service and spare-part fit.",
        },
      ],
      relatedSlugs: ["led-ekran", "ic-mekan-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Let's diagnose the fault together",
        body:
          "Send a photo or short video of the symptom on WhatsApp; we will make a remote pre-diagnosis and prepare the survey and repair quote.",
      },
      cardLabel: "LED screen fault symptoms",
      cardTeaser: "Dark areas, flicker, lines and no power: likely causes and first checks.",
    },
    "led-ekran-ihracat": {
      slug: "led-ekran-ihracat",
      title: "LED Screens Shipped Abroad: Europe, Middle East, Balkans | ARLEDSCREEN",
      description:
        "ARLEDSCREEN ships NXTIONSTAR LED screens to all of Europe, the Middle East and the Balkans. CE-certified products, USD panel prices, payment in TL, USD, EUR and other currencies.",
      keywords: ["LED screen export", "LED screen from Turkey", "LED screen supplier Europe", "LED screen Middle East", "LED screen Balkans", "CE certified LED screen", "NXTIONSTAR"],
      h1: "LED screens shipped abroad: Europe, the Middle East and the Balkans",
      intro:
        "ARLEDSCREEN ships its own NXTIONSTAR LED screens from Istanbul to all of Europe, the Middle East and the Balkans. Our products are CE certified. Published panel prices are in USD and are the same in every language; we accept payment in TL, USD, EUR and other currencies.",
      sections: [
        {
          h2: "Where do we ship?",
          body:
            "We ship LED screens to every European country, the Middle East and the Balkans (for example Bulgaria, Greece, Romania, Serbia, Bosnia and Herzegovina, North Macedonia, Albania and Kosovo). The destination and delivery terms are stated in the written quote.",
        },
        {
          h2: "Price and payment",
          body:
            "Panel prices are in USD per panel, VAT and shipping excluded; for example indoor P2.5 USD 32.18 and outdoor P2.5 USD 63.70. Prices are the same in every language. We accept payment in TL, USD, EUR and other currencies; installment payment is also available. Shipping is quoted separately.",
        },
        {
          h2: "Certification",
          body:
            "NXTIONSTAR products are CE certified. The model data sheet is shared with the written quote.",
        },
        {
          h2: "Delivery time",
          body:
            "Delivery takes 3–21 days of preparation + 1–14 days of shipping. Preparation depends on the product, size and stock; shipping depends on the destination. The exact date is stated in the written quote.",
        },
        {
          h2: "What we need for a quote",
          body:
            "Country and city, screen size, indoor or outdoor use, viewing distance and a photo of the mounting location. Installation and technical support scope is written into the quote.",
        },
      ],
      faqs: [
        {
          question: "Do you ship LED screens from Turkey abroad?",
          answer:
            "Yes. We ship LED screens to all of Europe, the Middle East and the Balkans. Shipping is quoted separately.",
        },
        {
          question: "Are your products CE certified?",
          answer:
            "Yes, our products are CE certified.",
        },
        {
          question: "Which currencies do you accept?",
          answer:
            "We accept payment in TL, USD, EUR and all other currencies. Published panel prices are in USD; installment payment is also available.",
        },
        {
          question: "Are export prices different?",
          answer:
            "No. Panel prices are the same in every language and country; VAT and shipping are excluded. Shipping cost depends on the destination and is stated in the quote.",
        },
      ],
      relatedSlugs: ["led-ekran", "dis-mekan-led-ekran", "ic-mekan-led-ekran"],
      cta: {
        title: "Let's prepare your export quote",
        body:
          "Share country, city, screen size and use; we will send a written quote with the panel list, shipping and payment plan.",
      },
      cardLabel: "LED screens abroad (export)",
      cardTeaser: "Shipping to Europe, the Middle East and the Balkans; CE, payment and delivery time.",
    },
    "eczane-led-ekran": {
      slug: "eczane-led-ekran",
      title: "Pharmacy LED Screens: Window, Façade and Shelf-Top Displays | ARLEDSCREEN",
      description:
        "LED screens for pharmacies: window, façade, shelf-top and freestanding options; pixel pitch by viewing distance and published panel prices. Note on content rules. ARLEDSCREEN, Istanbul.",
      keywords: ["pharmacy LED screen", "pharmacy digital display", "pharmacy window screen", "pharmacy sign LED", "on-duty pharmacy screen", "NXTIONSTAR"],
      h1: "How to choose an LED screen for a pharmacy",
      intro:
        "Pharmacies use LED screens in four places: behind the window, on the façade, above the shelves behind the counter and as a freestanding screen at the entrance. Façade and window screens seen from the street need brightness; shelf-top screens seen up close need finer pitch. Indoor P2.5 (USD 32.18 per panel) is common inside, and outdoor P4 (USD 33.80) or P5 (USD 29.90) on the façade. Screen content must follow pharmacy professional rules and advertising regulations.",
      sections: [
        {
          h2: "Window screens",
          body:
            "In a sunny window a standard indoor screen looks washed out; windows need a high-brightness window screen or transparent LED that keeps the glass clear. These are priced by written quote for the window size. Shaded windows may work with indoor P2.5 or P3.07; we measure this together at the survey.",
        },
        {
          h2: "Façade and sign screens",
          body:
            "For façade screens seen from the road and the opposite pavement, outdoor P4 (USD 33.80 per panel) or P5 (USD 29.90 per panel) fit; low façades viewed closer look sharper with outdoor P3.07 (USD 44.20 per panel). Prices are per panel, VAT and shipping excluded.",
        },
        {
          h2: "Shelf-top and behind the counter",
          body:
            "Customers stand 1.5–3 m from the counter, so indoor P2.5 or fine-pitch P1.86 GOB (USD 49.08 per panel) is chosen. Long, narrow shelf-top strips are built close to the required size from 320 × 160 mm modules.",
        },
        {
          h2: "Content: what to watch",
          body:
            "The screen can show the on-duty pharmacy list, opening hours, health notices and non-promotional information. Regulations and professional rules on medicine promotion and pharmacy advertising may limit content; check the current rules of your pharmacists' chamber before preparing content.",
        },
        {
          h2: "Payment, delivery and service",
          body:
            "Installment payment is available, and we accept TL, USD, EUR and other currencies. Our products are CE certified. Delivery takes 3–21 days of preparation + 1–14 days of shipping. We have completed projects in every Istanbul district, and we provide repair and technical service.",
        },
      ],
      faqs: [
        {
          question: "Which LED screen suits a pharmacy?",
          answer:
            "Indoor P2.5 (USD 32.18 per panel) for shelf-top and behind-counter screens, and outdoor P4 (USD 33.80) or P5 (USD 29.90) for the façade. Sunny windows need a high-brightness window screen or transparent LED, priced by quote.",
        },
        {
          question: "Can the screen show the on-duty pharmacy?",
          answer:
            "Yes. The on-duty pharmacy list, opening hours and notices can be shown as scheduled content. The content source is agreed at the survey.",
        },
        {
          question: "Can I show advertising on a pharmacy screen?",
          answer:
            "Regulations and professional rules on medicine promotion and pharmacy advertising limit content. Check the current rules of your pharmacists' chamber for what you plan to show.",
        },
        {
          question: "How much does a pharmacy LED screen cost?",
          answer:
            "Panel prices are published; for example a 1.28 × 0.64 m indoor P2.5 shelf-top screen uses 16 modules, a module cost of 16 × 32.18 = USD 514.88 (module only, VAT and shipping excluded). The final amount is given in a written quote after survey; installment payment is available.",
        },
      ],
      relatedSlugs: ["vitrin-led-ekran", "poster-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Let's plan the screen for your pharmacy",
        body:
          "Send photos of the window and façade, the size of the mounting area and the customer viewing distance; we will prepare the right screen and budget.",
      },
      cardLabel: "Pharmacy LED screens",
      cardTeaser: "Window, façade, shelf-top and freestanding screens: pitch, price and content notes.",
    },
    "dugun-salonu-led": {
      slug: "dugun-salonu-led",
      title: "Wedding Hall LED Screen: Size, Price, Buy or Rent | ARLEDSCREEN",
      description:
        "LED screens for wedding and event halls: stage screen size by hall depth, P3.07 / P4 choice, example module cost and comparison with USD 50 per m² per day rental. ARLEDSCREEN, Istanbul.",
      keywords: ["wedding hall LED screen", "wedding stage LED wall", "event hall LED screen", "wedding LED screen price", "rent LED screen wedding", "NXTIONSTAR"],
      h1: "Wedding hall LED screens: size, price and rental",
      intro:
        "In a wedding hall the LED screen usually sits behind the stage and shows the couple's entrance, photo and video slideshows, live camera feed and the venue logo. Guests sit at tables usually 4 m or more from the screen, so indoor P3.07 or P4 modules are enough. Screen height is about one eighth of the distance to the farthest table. Venue owners usually buy; one-off events can rent at USD 50 per m² per day.",
      sections: [
        {
          h2: "Pixel pitch",
          body:
            "For video and photo content, use roughly 1 m of distance per 1 mm of pitch. With front tables around 3 m away choose indoor P3.07 (USD 30.88 per panel); from 4 m, indoor P4 (USD 26.98 per panel). Side screens watched from the dance floor look sharper with P2.5 (USD 32.18 per panel).",
        },
        {
          h2: "Screen size",
          body:
            "Choose a screen height of about one eighth of the distance to the farthest table, rounded to 320 × 160 mm modules. A screen close to 16:9 shows video without empty edges, rather than covering the whole stage wall. The table examples follow this rule.",
        },
        {
          h2: "Buy or rent?",
          body:
            "Halls that host events every week are better off buying; a single wedding or engagement is better rented. Indoor and outdoor rental LED is USD 50 per m² per day; weekly and monthly rentals use the same daily per-m² rate, and no deposit is required. Installation and shipping are quoted separately.",
        },
        {
          h2: "Content and control",
          body:
            "A laptop, media player or camera feed connects to the screen. With an asynchronous control card (Huidu, NovaStar), the venue logo and promo videos play on schedule even with the PC off. Mention live filming at the survey.",
        },
        {
          h2: "Payment, delivery and service",
          body:
            "Installment payment is available, and we accept TL, USD, EUR and other currencies. Our products are CE certified. Delivery takes 3–21 days of preparation + 1–14 days of shipping. We have completed projects in every Istanbul district, and we also provide repair and technical service.",
        },
      ],
      faqs: [
        {
          question: "How many m² of LED screen does a wedding hall need?",
          answer:
            "With the farthest table 25 m away, a stage screen of about 5.44 × 3.04 m (323 modules, ≈ 16.5 m²) fits. Smaller halls may need about 3.52 × 1.92 m (≈ 6.8 m²).",
        },
        {
          question: "How much does a wedding hall LED screen cost?",
          answer:
            "At published panel prices, a 323-module indoor P4 screen has a module cost of 323 × 26.98 = USD 8,714.54 (module only; control, cabinets, labour, VAT and shipping excluded). The final amount is given in a written quote after survey; installment payment is available.",
        },
        {
          question: "Can I rent an LED screen for a wedding?",
          answer:
            "Yes. Rental LED is USD 50 per m² per day, so a 16.5 m² screen is about USD 827 for one day. Installation and shipping are quoted separately; no deposit is required.",
        },
        {
          question: "Which pixel pitch suits a wedding hall?",
          answer:
            "With guests 3–4 m or farther away, indoor P3.07 or P4 is enough. Close side screens facing the dance floor look sharper with P2.5.",
        },
        {
          question: "What is the delivery time?",
          answer:
            "Delivery takes 3–21 days of preparation + 1–14 days of shipping. Plan the survey early if you want the screen before the season.",
        },
      ],
      relatedSlugs: ["konferans-salonu-led", "ic-mekan-led-ekran", "led-ekran"],
      cta: {
        title: "Let's plan the screen for your hall",
        body:
          "Send the hall size, a photo of the stage wall and the nearest and farthest table distances; we will quote purchase and rental options.",
      },
      cardLabel: "Wedding hall LED screen",
      cardTeaser: "Stage screen size, P3.07/P4 choice, buying vs USD 50 per m² per day rental.",
    },
    "hastane-dijital-ekran": {
      slug: "hastane-dijital-ekran",
      title: "Hospital Digital Screens: Queue Systems, Wayfinding, Waiting Rooms | ARLEDSCREEN",
      description:
        "Digital screens inside hospitals: waiting-room and queue screens, clinic door screens, wayfinding totems, entrance and façade LED. LED or LCD, chosen by viewing distance. ARLEDSCREEN, Istanbul.",
      keywords: ["hospital digital signage", "hospital LED screen", "queue management display", "waiting room screen", "hospital wayfinding screen", "clinic display"],
      h1: "Digital screens inside hospitals: LED or LCD?",
      intro:
        "Hospitals use digital screens in five places: queue numbers and information in waiting rooms, doctor and queue details at clinic doors, wayfinding in the entrance lobby, notices in cafeterias and corridors, and outdoor screens on the façade and emergency entrance. LCD suits doors and small waiting areas; LED, which grows by adding modules, suits large waiting halls, lobbies and façades. In March 2026 we completed a 16 m² LED screen project for Lokman Hekim Hospital.",
      sections: [
        {
          h2: "Waiting rooms and queue systems",
          body:
            "A queue screen shows the output of the hospital's queue software; an LED or LCD screen receives it from a PC or media player. A single LCD is enough for small waiting areas; large halls read from more than 6 m benefit from indoor P2.5 (USD 32.18 per panel) or P3.07 (USD 30.88 per panel) LED for a bigger, readable surface. The queue software and connection are agreed at the survey.",
        },
        {
          h2: "Clinic doors and room screens",
          body:
            "Doctor name, room number and next patient are shown on small LCD screens beside the door. Their size and price are given in a written quote.",
        },
        {
          h2: "Entrance lobby and wayfinding",
          body:
            "Freestanding poster LED or totem screens show floor plans, department directions and notices; a touch kiosk lets patients search for their department. These are priced by quote.",
        },
        {
          h2: "Façade and emergency entrance",
          body:
            "Façade and emergency-entrance screens use outdoor P4 (USD 33.80 per panel) or P5 (USD 29.90 per panel) modules. Night brightness can be set so it does not disturb the surroundings.",
        },
        {
          h2: "Payment, delivery and service",
          body:
            "Installment payment is available, and we accept TL, USD, EUR and other currencies. Our products are CE certified. Delivery takes 3–21 days of preparation + 1–14 days of shipping. Besides LED screens we also repair LCD screens and kiosks, and we have completed projects in every Istanbul district.",
        },
      ],
      faqs: [
        {
          question: "LED or LCD for a hospital waiting room?",
          answer:
            "LCD is enough for small waiting areas. Large halls and lobbies read from a distance benefit from indoor P2.5 (USD 32.18 per panel) or P3.07 (USD 30.88 per panel) LED.",
        },
        {
          question: "How does a queue screen work?",
          answer:
            "The screen shows the hospital's queue software output via a PC or media player. The software and connection are agreed at the survey.",
        },
        {
          question: "What is used for hospital wayfinding?",
          answer:
            "Freestanding poster LED, totems or touch kiosks in the lobby. They are priced by quote.",
        },
        {
          question: "Have you done hospital projects?",
          answer:
            "Yes. In March 2026 we completed a 16 m² LED screen for Lokman Hekim Hospital, and in July 2025 a high-resolution LED screen for Umut Radyoloji in Van.",
        },
        {
          question: "Do you provide service if something fails?",
          answer:
            "Yes. Besides LED screens we repair LCD screens, kiosks and menu boards. ARLEDSCREEN offers a 2-year warranty and 5 years of free technical service.",
        },
      ],
      relatedSlugs: ["lcd-ekran", "kiosk-ekran", "poster-led-ekran"],
      cta: {
        title: "Let's plan screens for your hospital",
        body:
          "Share photos of the waiting rooms, lobby and façade and the queue software you use; we will suggest LED or LCD and a budget for each area.",
      },
      cardLabel: "Hospital digital screens",
      cardTeaser: "Queue systems, waiting rooms, wayfinding and façades: LED or LCD?",
    },
    "okul-led-ekran": {
      slug: "okul-led-ekran",
      title: "LED Screens for Schools: Primary, Secondary and University | ARLEDSCREEN",
      description:
        "School LED screens: entrance, corridor and playground screens for primary and secondary schools; lecture theatres, conference halls, campus and sports halls for high schools and universities. Pitch by distance and panel prices. ARLEDSCREEN.",
      keywords: ["school LED screen", "school digital signage", "primary school LED screen", "university LED screen", "campus LED screen", "playground LED screen", "lecture theatre LED screen"],
      h1: "LED screens for schools: from primary school to university",
      intro:
        "Schools mostly use LED screens as entrance notice boards, corridor information screens, playground screens for ceremonies and events, and presentation screens in halls and lecture theatres. Indoors students usually look from 3 m or more, so P3.07 (USD 30.88 per panel) is enough; lecture theatres use P2.5 (USD 32.18 per panel), and playgrounds and façades use outdoor P4 (USD 33.80) or P5 (USD 29.90). Classrooms and small screens viewed up close are better served by LCD or interactive displays.",
      sections: [
        {
          h2: "Primary and lower secondary schools",
          body:
            "Entrance halls show notices, timetables, duty teachers and event calendars on indoor P3.07 LED or freestanding poster LED. For low mounts students can touch, protective GOB modules (P1.86 GOB USD 49.08 per panel) or mounting out of reach are preferred. Playground ceremony screens use outdoor P4 or P5.",
        },
        {
          h2: "High schools",
          body:
            "Conference halls use a stage LED screen for graduations, plays and seminars, and canteens and corridors use notice screens. Screen height in a hall is about one eighth of the back-row distance; see our conference hall guide for details.",
        },
        {
          h2: "Universities",
          body:
            "Lecture theatres have the front row 2.5–3 m away, so indoor P2.5 or P3.07 is chosen. Campus entrances, faculty façades and squares use outdoor P4 or P5. Freestanding digital screens suit libraries and student centres for wayfinding and notices.",
        },
        {
          h2: "Sports halls",
          body:
            "Score and notice screens are usually 6 m or more from spectators, so indoor P4 (USD 26.98 per panel) is enough. Protection against ball impact is planned at the survey.",
        },
        {
          h2: "Payment, delivery and service",
          body:
            "Installment payment is available, and we accept TL, USD, EUR and other currencies. Our products are CE certified. Delivery takes 3–21 days of preparation + 1–14 days of shipping. We have completed projects in every Istanbul district, and we provide repair and technical service.",
        },
      ],
      faqs: [
        {
          question: "Which LED screen suits a school?",
          answer:
            "Indoor P3.07 (USD 30.88 per panel) for entrances and corridors, P2.5 (USD 32.18) for lecture theatres and halls, and outdoor P4 (USD 33.80) or P5 (USD 29.90) for playgrounds and façades. Prices are per panel, VAT and shipping excluded.",
        },
        {
          question: "How much is a school entrance notice screen?",
          answer:
            "For example a 1.92 × 0.96 m indoor P3.07 screen uses 36 modules, a module cost of 36 × 30.88 = USD 1,111.68 (module only; control, cabinets, labour, VAT and shipping excluded). The final amount is given in a written quote after survey.",
        },
        {
          question: "Can an LED screen go in the school playground?",
          answer:
            "Yes. Outdoor P4 or P5 modules are used. Pole or wall mounting is checked for load and wind at the survey.",
        },
        {
          question: "LED or LCD in the classroom?",
          answer:
            "Students sit close in a classroom, so LCD or interactive displays fit better. LED is mainly used at entrances, corridors, playgrounds, lecture theatres and halls.",
        },
        {
          question: "What payment options do schools have?",
          answer:
            "Installment payment is available, and we accept TL, USD, EUR and other currencies. The payment plan is stated in the written quote.",
        },
      ],
      relatedSlugs: ["konferans-salonu-led", "poster-led-ekran", "dis-mekan-led-ekran"],
      cta: {
        title: "Let's plan screens for your school",
        body:
          "Send photos of the entrance, corridors, playground and hall and the viewing distances; we will suggest a screen and budget for each area.",
      },
      cardLabel: "LED screens for schools",
      cardTeaser: "Primary, secondary, high school and university: entrance, corridor, playground, lecture theatre and sports hall screens.",
    },
  },
};

/** Remove accidental empty fields if any FAQ was mistyped during authoring */
function normalizeGuide(guide: SeoGuide): SeoGuide {
  return {
    ...guide,
    faqs: guide.faqs.map(({ question, answer }) => ({ question, answer })),
  };
}

export function getSeoGuide(locale: Locale, slug: SeoGuideSlug): SeoGuide {
  const lang: GuideLocale = locale === "tr" ? "tr" : "en";
  const base = guides[lang][slug];
  // ru/ar: translated text where available (canonical/noindex policy unchanged).
  const extra = locale === "ru" || locale === "ar" ? SEO_GUIDE_I18N[locale][slug] : undefined;
  return normalizeGuide(extra ? { ...base, ...extra } : base);
}

export function listSeoGuides(locale: Locale): SeoGuide[] {
  return SEO_GUIDE_SLUGS.map((slug) => getSeoGuide(locale, slug));
}

export const SEO_GUIDE_HUB = {
  tr: {
    title: "LED Ekran Çözüm Rehberi — ARLEDSCREEN",
    description:
      "LED, LCD ve dijital ekran, ekran çeşitleri, iç/dış mekân, vitrin, ayaklı ekran, menuboard ve kiosk ekran rehberleri. ARLEDSCREEN, İstanbul.",
    h1: "LED ekran çözüm rehberi — ARLEDSCREEN",
    intro:
      "NXTIONSTAR LED ürünleri ve ARLEDSCREEN mühendislik ekibi için konu bazlı rehberler: LED ekran, LCD ekran ve dijital ekran nedir, ekran çeşitleri, iç ve dış mekân seçimi, mimari entegrasyon, konferans salonu, vitrin, ayaklı ekran (poster/totem), menuboard ve kiosk ekran. Her sayfa keşif ve teklif odaklıdır.",
    eyebrow: "Rehber",
    relatedLabel: "İlgili rehberler",
    allGuidesLabel: "Tüm rehberler",
  },
  en: {
    title: "LED Display Solution Guides — ARLEDSCREEN",
    description:
      "Guides on LED displays, outdoor / indoor, conference halls, shopfronts, posters and kiosks. NXTIONSTAR products, Istanbul engineering — ARLEDSCREEN.",
    h1: "LED display solution guides — ARLEDSCREEN",
    intro:
      "Topic guides for NXTIONSTAR products and the ARLEDSCREEN engineering desk: pitch selection, IP65 outdoor, fine-pitch indoor, architectural integration, conference halls, shopfronts, poster/totem and kiosks. Each page is survey- and quote-oriented — not pasted catalogue copy.",
    eyebrow: "Guides",
    relatedLabel: "Related guides",
    allGuidesLabel: "All guides",
  },
} as const;

export function getSeoGuideHub(locale: Locale) {
  return locale === "tr" ? SEO_GUIDE_HUB.tr : SEO_GUIDE_HUB.en;
}
