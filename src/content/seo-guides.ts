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
            "Yeşilpınar'daki (Eyüpsultan, İstanbul) Aslantürk Ercan Et şubesinde menuboard projesini tamamladık; uygulama Instagram hesabımızda (instagram.com/arledscreen) paylaşıldı. Kafe ve restoran kayıtlarımız arasında ayrıca Beylikdüzü Yaşam Cafe (İstanbul), Prestij Cafe (Osmanbey, İstanbul), Orta Şekerli Kentpark Cafe (Yozgat, 384 × 128 cm, P1.86), Ouka Kafe (Aksaray) ve Babil Cafe (Niğde) LED ekran kurulumları bulunur. Bu kafe kayıtları LED ekran kurulumlarıdır; her biri menuboard projesi değildir.",
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
            "LCD ekranlar için sitede sabit fiyat veya teknik değer yayımlamıyoruz; model, ölçü ve adet netleştikten sonra yazılı teklif hazırlıyoruz. Sitede yayımlanan fiyatlar yalnızca NXTIONSTAR LED paneller içindir ve LED ekran fiyatları sayfasında yer alır.",
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
      title: "Okul & Konferans Salonu LED Ekran — ARLEDSCREEN",
      description:
        "Okul konferans salonu ve konferans salonları için LED ekran: izleme mesafesi, ses/AV entegrasyonu, ince pitch. NXTIONSTAR — ARLEDSCREEN B2B keşif ve kurulum.",
      keywords: [
        "okul konferans salonu",
        "konferans salonları",
        "konferans LED ekran",
        "salon video duvar",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "Okul ve konferans salonu LED ekran",
      intro:
        "Konferans salonları ve okul konferans salonu projelerinde sahne arkası LED veya yan kanatlar sunum, yayın ve etkinlik için tek yüzey olur. ARLEDSCREEN / NXTIONSTAR kurulumu ses, ışık ve kontrol odasıyla uyumlu planlanır.",
      sections: [
        {
          h2: "Salon geometrisi ve izleme mesafesi",
          body:
            "İlk sıra ile sahne arası mesafe pitch’i belirler. Okul amfisi ile otel konferans salonu farklı oturma yoğunluğuna sahiptir; metin ağırlıklı sunumda daha ince pitch, video ağırlıklı etkinlikte biraz daha geniş pitch kabul edilebilir. ARLEDSCREEN keşfinde oturma planı ve kritik okuma mesafesi not edilir.",
        },
        {
          h2: "AV entegrasyonu: ses, kamera, kontrol",
          body:
            "HDMI / SDI matris, kablosuz sunum, kamera kaydı ve salona ait kontrol paneli LED alıcıyla aynı topolojide düşünülmelidir. Yüksek yenileme, kamera çekiminde flicker riskini düşürür. Gerekirse yedek kaynak girişi teklife eklenir.",
        },
        {
          h2: "Okul ve kurumsal kullanım farkları",
          body:
            "Okul konferans salonunda bütçe ve dayanıklılık; kurumsal salonda marka rengi ve ince pitch öncelik olabilir. Her iki senaryoda da kolay içerik geçişi (PC / laptop / medya oynatıcı) ve basit operatör paneli önemlidir. YZ destekli otomatik içerik zamanlama istenirse CMS hattı baştan tanımlanır.",
        },
        {
          h2: "Montaj, akustik ve sahne güvenliği",
          body:
            "Asma LED’lerde statik onay ve güvenlik teli; yerden yükselen sahne duvarında ankraj detayı şarttır. Akustik panellerle çakışma ve fan gürültüsü kontrol edilir. Kurulum sonrası renk kalibrasyonu ve operatör eğitimi ARLEDSCREEN teslimatına dahildir.",
        },
      ],
      faqs: [
        {
          question: "Konferans salonu için minimum çözünürlük nedir?",
          answer:
            "Sunum metninin son sıradan okunabilirliği esas alınır. Pitch × fiziksel boyut = piksel çözünürlük; keşifte örnek slayt okuma testi yapılabilir.",
        },
        {
          question: "Projeksiyon yerine LED neden tercih edilir?",
          answer:
            "Yüksek ambient ışıkta okunabilirlik, tutarlı parlaklık ve geniş açı. Karartma zorunluluğu azalır; etkinlik ve yayın senaryoları kolaylaşır.",
        },
        {
          question: "Okul projelerinde süreç nasıl işler?",
          answer:
            "Ölçü / keşif → teknik teklif → onay → montaj → eğitim. İhale dokümanına pitch, nit ve IP (iç mekân) maddeleri net yazılmalıdır.",
        },
      ],
      relatedSlugs: [
        "ic-mekan-led-ekran",
        "led-ekran",
        "mimari-muhendislik-led",
      ],
      cta: {
        title: "Salon LED projenizi boyutlandıralım",
        body:
          "Salon ölçüleri ve oturma planını paylaşın; pitch ve AV entegrasyon özeti ile dönüş yapalım.",
      },
      cardLabel: "Konferans salonu",
      cardTeaser: "Okul ve konferans salonları için LED / AV entegrasyon.",
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
            "We do not publish fixed prices or specifications for LCD displays; a written quote follows once model, size and quantity are clear. Prices published on the site are for NXTIONSTAR LED panels only.",
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
      title: "School & Conference Hall LED Displays — ARLEDSCREEN",
      description:
        "LED for school auditoriums and conference halls: viewing distance, AV integration, fine pitch. NXTIONSTAR — ARLEDSCREEN B2B survey and install.",
      keywords: [
        "conference hall LED",
        "auditorium LED",
        "school hall display",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "School & conference hall LED displays",
      intro:
        "Conference halls and school auditoriums use stage LED or side wings as one surface for presentation, broadcast and events. ARLEDSCREEN / NXTIONSTAR installs align with audio, lighting and the control room.",
      sections: [
        {
          h2: "Hall geometry and viewing distance",
          body:
            "Front-row distance drives pitch. School amphitheatres and hotel ballrooms differ in density; text-heavy decks need finer pitch than video-led events. Survey captures seating plans and critical reading distance.",
        },
        {
          h2: "AV integration",
          body:
            "HDMI/SDI matrices, wireless presenters, cameras and hall control panels must share one topology with LED receivers. High refresh reduces flicker on camera. Spare inputs can be quoted.",
        },
        {
          h2: "School vs corporate priorities",
          body:
            "Schools often prioritise durability and budget; corporate halls may prioritise brand colour and finer pitch. Both need simple source switching and operator panels. AI/CMS scheduling is defined early when required.",
        },
        {
          h2: "Mounting, acoustics and safety",
          body:
            "Flown LED needs structural sign-off and safety bonds; stage walls need anchorage detail. Acoustic clashes and fan noise are checked. Colour calibration and operator training close delivery.",
        },
      ],
      faqs: [
        {
          question: "Minimum resolution for conference halls?",
          answer:
            "Driven by slide readability from the back row. Pitch × physical size yields pixel count; we can run a sample-slide readability check on survey.",
        },
        {
          question: "Why LED instead of projection?",
          answer:
            "Readable under ambient light, consistent brightness and wide angles — less need to blackout the room.",
        },
        {
          question: "How do school projects run?",
          answer:
            "Measure/survey → technical quote → approval → install → training. Tender docs should state pitch, nits and indoor IP clearly.",
        },
      ],
      relatedSlugs: [
        "ic-mekan-led-ekran",
        "led-ekran",
        "mimari-muhendislik-led",
      ],
      cta: {
        title: "Size your hall LED project",
        body:
          "Share hall dimensions and seating — we reply with pitch and AV integration outline.",
      },
      cardLabel: "Conference halls",
      cardTeaser: "School and conference hall LED / AV integration.",
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
