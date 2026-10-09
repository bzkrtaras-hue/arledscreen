import type { ProductCategory as SeriesCategory } from "@/types/product";
import type { ProjectTypeId } from "@/lib/whatsapp";
import { references, type Reference } from "@/content/references";
import { CONTROL_GROUPS } from "@/content/control-products";

/**
 * Product groups (category landing pages under /tr/products/<slug>/).
 *
 * Content rules: only facts that are verifiable from the company's own
 * material are stated. Pixel-pitch options are the module options listed in
 * the company's live price calculator (fiyat.arledscreen.com, 320 × 160 mm
 * modules). Prices, brightness, IP class, warranty terms and lead times are
 * deliberately NOT stated here; they are shared in writing with each quote.
 */
export interface PitchOption {
  label: string;
  note?: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

/** Optional tech / comparison visuals on the product group page */
export interface TechGalleryShot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProductGroup {
  slug: string;
  /** Menu / card label */
  name: string;
  h1: string;
  /** One-line benefit shown under the H1 */
  lead: string;
  title: string;
  description: string;
  /** Card / mega-menu teaser */
  short: string;
  tag: string;
  /** Mega-menu / index heading the group sits under */
  family: ProductFamily;
  /** Application / build types offered within the group (generic, no model claims) */
  types: string[];
  image: string;
  imageAlt: string;
  /** Optional separate image for small cards */
  cardImage?: string;
  /** Optional tech / form comparison gallery */
  techGallery?: TechGalleryShot[];
  techGalleryEyebrow?: string;
  techGalleryTitle?: string;
  techGalleryDescription?: string;
  intro: string[];
  highlights: string[];
  uses: { title: string; body: string }[];
  pitches: PitchOption[];
  seriesCategories: SeriesCategory[];
  guide: { href: string; label: string };
  projectType: ProjectTypeId;
  whatsapp: string;
  refFilter?: (r: Reference) => boolean;
  faqs: CategoryFaq[];
  /** Optional manufacturer brand for schema / chips (control systems). */
  brandName?: string;
}

/** Shared GOB / COB / SMD comparison shots for fine-pitch family pages */
const FINE_PITCH_TECH_GALLERY: TechGalleryShot[] = [
  {
    src: "/projects/modules/tech/cob-smd-gob-trio.jpg",
    alt: "COB, SMD ve GOB LED modül yüzeylerinin yan yana karşılaştırması",
    caption: "COB · SMD · GOB — üç yüzey teknolojisi",
  },
  {
    src: "/projects/modules/tech/gob-vs-cob-surface.jpg",
    alt: "GOB ve COB ince pitch LED modül yüzey dokusu karşılaştırması",
    caption: "GOB vs COB — yüzey ve doku farkı",
  },
  {
    src: "/projects/modules/tech/gob-vs-normal-smd.jpg",
    alt: "GOB kaplamalı LED modül ile standart SMD modül kesit karşılaştırması",
    caption: "GOB vs standart SMD — koruyucu katman",
  },
  {
    src: "/projects/modules/tech/gob-vs-standard-water.jpg",
    alt: "GOB LED modül üzerinde su damlası ile standart modül karşılaştırması",
    caption: "GOB — su ve darbe korumalı yüzey",
  },
  {
    src: "/projects/modules/tech/cob-vs-gob-diagram.jpg",
    alt: "COB Chip on Board ve GOB Glue on Board yapı diyagramı",
    caption: "COB (Chip on Board) vs GOB (Glue on Board)",
  },
  {
    src: "/projects/modules/tech/gob-production-process.jpg",
    alt: "GOB LED üretiminde SMD modül üzerine şeffaf tutkal kaplama süreci",
    caption: "GOB üretim adımı — Glue on Board",
  },
];

const FLEXIBLE_TECH_GALLERY: TechGalleryShot[] = [
  {
    src: "/projects/modules/tech/flexible-curve-concave-convex.jpg",
    alt: "Esnek LED ekran konkav, konveks ve silindirik kavis diyagramları ile iç mekân uygulama görseli",
    caption: "Konkav · Konveks · Silindirik kavis (ör. 611R)",
  },
  {
    src: "/projects/modules/tech/flexible-module-bend-lit.jpg",
    alt: "Bükülmüş esnek LED modül — aydınlatılmış yüzey ve esnek arka yapı",
    caption: "Esnek LED modül — bükülebilir yapı",
  },
];

export const PRODUCT_FAMILIES = [
  "Dış Mekân LED Ekranlar",
  "İç Mekân LED Ekranlar",
  "LCD ve Dijital Ekranlar",
  "Kiralık LED Ekranlar",
  "Poster ve Totem LED Ekranlar",
  "Modül ve Kontrol Sistemleri",
] as const;
export type ProductFamily = (typeof PRODUCT_FAMILIES)[number];

/**
 * Model-level technical values are not published until verified datasheets
 * are approved. While false, spec tables show the field names only.
 */
export const SPECS_VERIFIED = false;
export const SPEC_PENDING_TEXT = "Teklifle birlikte teknik föyde paylaşılır";
export const SPEC_FIELDS = [
  "Piksel aralığı",
  "Modül / kabin ölçüsü",
  "Parlaklık",
  "Yenileme hızı",
  "Koruma sınıfı",
  "Servis yönü (ön / arka)",
  "Güç tüketimi",
  "Kontrol sistemi",
  "Garanti koşulları",
] as const;

export const MODULE_SIZE_LABEL = "320 × 160 mm";

const isOutdoorRef = (r: Reference) => /dış mekân|outdoor/i.test(r.detail);
const hasPitch = (r: Reference) => /P\d/.test(r.detail);

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    slug: "ic-mekan-led-ekran",
    name: "İç Mekân LED Ekran",
    h1: "İç Mekân LED Ekran",
    lead: "Yakın izleme mesafesinde net ve dikişsiz görüntü",
    title: "İç Mekân LED Ekran Fiyatları ve Modelleri | Mağaza, Kafe, Salon | ARLEDSCREEN",
    description:
      "Mağaza, kafe, showroom ve toplantı salonları için iç mekân LED ekran: piksel aralığı seçimi, keşif, montaj ve teknik servis. NXTIONSTAR markasıyla ARLEDSCREEN.",
    short: "Mağaza, kafe, showroom ve toplantı salonları için yakın izlemeye uygun ekranlar.",
    tag: "P1.25 – P4",
    family: "İç Mekân LED Ekranlar",
    types: ["Duvar tipi video wall", "Ön servisli (front service) kurulum", "Asma / tavan bağlantılı", "Vitrin arkası uygulama"],
    image: "/projects/urun-ic-mekan.jpg",
    imageAlt: "Toplantı salonunda duvara monte iç mekân LED ekran",
    intro: [
      "İç mekânda izleyici ekrana birkaç adım uzaklıkta durur; bu yüzden doğru piksel aralığı hem görüntü netliğini hem de bütçeyi doğrudan etkiler. Piksel aralığını izleme mesafesine, ekran ölçüsüne ve içerik türüne göre birlikte belirliyoruz.",
      "Ölçünüzü modül katlarına göre planlıyor; keşif, montaj, devreye alma ve kurulum sonrası teknik servisi aynı ekiple yürütüyoruz.",
    ],
    highlights: [
      "İzleme mesafesine göre piksel aralığı önerisi",
      `${MODULE_SIZE_LABEL} modül katlarına göre ölçü planı`,
      "Keşif, montaj ve devreye alma",
      "Kurulum sonrası teknik servis",
    ],
    uses: [
      { title: "Mağaza ve vitrin", body: "Ürün tanıtımı ve kampanya içerikleri için dikkat çeken yüzeyler." },
      { title: "Kafe ve restoran", body: "Maç yayını, menü ve atmosfer içerikleri için geniş ekranlar." },
      { title: "Showroom ve lobi", body: "Marka deneyimini destekleyen büyük formatlı video duvarları." },
      { title: "Toplantı ve konferans", body: "Sunum ve video konferans için net, parlak ve dikişsiz görüntü." },
    ],
    pitches: [
      { label: "P1.25", note: "GOB seçenekli" },
      { label: "P2.5" },
      { label: "P3.07" },
      { label: "P4" },
    ],
    seriesCategories: ["fine-pitch", "indoor"],
    guide: { href: "/tr/rehber/ic-mekan-led-ekran/", label: "İç mekân LED ekran rehberi" },
    projectType: "magaza",
    whatsapp: "Merhaba, iç mekân LED ekran için bilgi ve teklif almak istiyorum. Yaklaşık ölçü ve konum:",
    refFilter: (r) => hasPitch(r) && !isOutdoorRef(r),
    faqs: [
      {
        question: "İç mekân LED ekranda hangi piksel aralığını seçmeliyim?",
        answer:
          "Seçim; izleyicinin ekrana en yakın mesafesine, ekran ölçüsüne ve içerik türüne göre yapılır. Yakın izlenen toplantı ve vitrin uygulamalarında daha küçük, salon ve geniş alanlarda daha büyük piksel aralıkları tercih edilir. Keşifte ölçüye göre öneri paylaşıyoruz.",
      },
      {
        question: "Ekran ölçüsü istediğim gibi olabilir mi?",
        answer:
          `Ekran ölçüsü ${MODULE_SIZE_LABEL} modül katlarına göre planlanır. İstediğiniz ölçüye en yakın modül düzenini ve gerçek ekran ölçüsünü teklifte yazılı olarak belirtiyoruz.`,
      },
      {
        question: "Fiyatı nasıl öğrenebilirim?",
        answer:
          "Fiyat hesaplayıcıyla ölçü ve piksel aralığına göre yaklaşık maliyeti görebilirsiniz. Kesin fiyat; keşif, montaj koşulları ve malzeme listesiyle birlikte yazılı teklifte paylaşılır.",
      },
    ],
  },
  {
    slug: "dis-mekan-led-ekran",
    name: "Dış Mekân LED Ekran",
    h1: "Dış Mekân LED Ekran",
    lead: "Gün ışığında okunur, uzaktan fark edilir",
    title: "Dış Mekân LED Ekran Fiyatları ve Modelleri | Cephe, Totem | ARLEDSCREEN",
    description:
      "Cephe, totem, billboard ve meydan uygulamaları için dış mekân LED ekran: piksel aralığı seçimi, taşıyıcı sistem, montaj ve teknik servis. ARLEDSCREEN; NXTIONSTAR alt markası.",
    short: "Cephe, totem ve billboard uygulamaları için gün ışığında okunabilen ekranlar.",
    tag: "P2.5 – P8",
    family: "Dış Mekân LED Ekranlar",
    types: ["Standart cephe ekranı", "Ön servisli (front service) ekran", "Köşe (L form) ekran", "Kavisli / oval ekran", "Totem ve pano"],
    image: "/projects/urun-dis-mekan.jpg",
    imageAlt: "Bina önünde taşıyıcı sisteme kurulu dış mekân LED ekran",
    intro: [
      "Dış mekânda ekran; güneş, yağmur ve toz koşullarında okunabilir kalmalıdır. Piksel aralığını montaj yüksekliği ve izleme mesafesiyle birlikte seçtiğimizde mesaj uzaktan okunur ve bütçe gereksiz çözünürlüğe harcanmaz.",
      "Taşıyıcı sistem, elektrik altyapısı ve sinyal bağlantısı keşifte birlikte planlanır; montaj ve devreye alma aynı ekip tarafından tamamlanır.",
    ],
    highlights: [
      "Montaj yüksekliği ve izleme mesafesine göre seçim",
      "Önden servis edilebilen modül seçeneği",
      "Taşıyıcı sistem ve altyapı planlaması",
      "Kurulum sonrası bakım ve teknik servis",
    ],
    uses: [
      { title: "Bina cephesi", body: "Uzak mesafeden okunabilen büyük formatlı reklam yüzeyleri." },
      { title: "Totem ve direk ekran", body: "İşletme girişleri ve yönlendirme noktaları için dikey ekranlar." },
      { title: "Billboard", body: "Yol kenarı ve meydanlar için reklam ekranları." },
      { title: "Kurum ve belediye", body: "Bilgilendirme, etkinlik ve duyuru ekranları." },
    ],
    pitches: [
      { label: "P2.5" },
      { label: "P2.9" },
      { label: "P3.07" },
      { label: "P4" },
      { label: "P4", note: "önden servis" },
      { label: "P5" },
      { label: "P8" },
    ],
    seriesCategories: ["outdoor"],
    guide: { href: "/tr/rehber/dis-mekan-led-ekran/", label: "Dış mekân LED ekran rehberi" },
    projectType: "dis-mekan",
    whatsapp: "Merhaba, dış mekân LED ekran (cephe / totem / reklam alanı) için bilgi ve teklif almak istiyorum. Yaklaşık ölçü ve konum:",
    refFilter: isOutdoorRef,
    faqs: [
      {
        question: "Dış mekân ekranında piksel aralığı nasıl belirlenir?",
        answer:
          "Ekranın montaj yüksekliği, izleyicinin ortalama uzaklığı ve içerik türü birlikte değerlendirilir. Uzaktan izlenen cephe ve billboard uygulamalarında daha büyük piksel aralıkları ekonomik bir seçim olabilir.",
      },
      {
        question: "Taşıyıcı sistem ve elektrik altyapısı teklife dahil mi?",
        answer:
          "Taşıyıcı sistem, elektrik ve sinyal altyapısı keşifte incelenir. Hangi kalemlerin teklife dahil olduğu malzeme listesiyle birlikte yazılı olarak belirtilir.",
      },
      {
        question: "Kurulumdan sonra bakım desteği veriyor musunuz?",
        answer:
          "Evet. Bakım, arıza ve yedek parça taleplerinizi telefon, WhatsApp veya e-posta ile iletebilirsiniz; teknik servis sürecini ekibimiz planlar.",
      },
    ],
  },
  {
    slug: "gob-led-ekran",
    name: "GOB LED Ekran",
    h1: "GOB LED Ekran",
    lead: "Koruyucu kaplamalı yüzeyle ince piksel aralığı",
    title: "GOB LED Ekran Fiyatları | Koruyucu Yüzeyli İnce Pitch | ARLEDSCREEN",
    description:
      "GOB (Glue on Board) LED ekran: LED yüzeyi koruyucu kaplamalı ince piksel aralığı seçenekleri. Toplantı odası, stüdyo ve yoğun alanlar için keşif, montaj ve servis.",
    short: "Koruyucu kaplamalı LED yüzeyiyle yakın izleme için ince piksel aralığı.",
    tag: "P1.25 · P1.53 · P1.86",
    family: "İç Mekân LED Ekranlar",
    types: ["Toplantı ve konferans", "Kontrol odası", "Yakın izleme alanları"],
    image: "/projects/modules/tech/gob-vs-standard-water.jpg",
    imageAlt: "GOB LED modül üzerinde su damlası — koruyucu kaplama yüzeyi",
    techGallery: FINE_PITCH_TECH_GALLERY,
    intro: [
      "GOB (Glue on Board) teknolojisinde LED'lerin üzeri şeffaf bir koruyucu katmanla kaplanır. Bu katman, LED yüzeyini darbe, nem ve toza karşı korumaya yardımcı olur.",
      "İnsanların ekrana yaklaşabildiği, dokunabildiği veya yoğun trafiğin olduğu alanlarda GOB seçenekleri değerlendirilir. Uygunluğu keşifte kullanım koşullarına göre birlikte netleştiriyoruz.",
    ],
    highlights: [
      "İnce piksel aralığı seçenekleri",
      "Koruyucu kaplamalı LED yüzeyi",
      "Yakın izleme mesafeleri için uygun",
      "Fiyat hesaplayıcıda seçilebilir modüller",
    ],
    uses: [
      { title: "Toplantı odası", body: "Yakın mesafeden sunum ve video konferans için net görüntü." },
      { title: "Stüdyo ve yayın", body: "Kamera çekimlerinde detaylı arka plan yüzeyleri." },
      { title: "Mağaza içi", body: "Müşterinin yaklaşabildiği vitrin ve raf arkası uygulamalar." },
      { title: "Yoğun alanlar", body: "Lobi ve geçiş alanları gibi temas riski olan noktalar." },
    ],
    pitches: [
      { label: "P1.25", note: "GOB" },
      { label: "P1.53", note: "GOB" },
      { label: "P1.86", note: "GOB" },
    ],
    seriesCategories: ["fine-pitch"],
    guide: { href: "/tr/rehber/konferans-salonu-led/", label: "Konferans salonu LED rehberi" },
    projectType: "toplanti",
    whatsapp: "Merhaba, GOB LED ekran için bilgi ve teklif almak istiyorum. Yaklaşık ölçü ve kullanım alanı:",
    refFilter: (r) => /P1\.\d/.test(r.detail),
    faqs: [
      {
        question: "GOB ile standart SMD ekran arasındaki fark nedir?",
        answer:
          "Her ikisinde de SMD LED kullanılır. GOB'da LED yüzeyi ek bir şeffaf koruyucu katmanla kaplanır; bu katman yüzeyi dış etkenlere karşı korumaya yardımcı olur.",
      },
      {
        question: "GOB ekran hangi alanlar için uygundur?",
        answer:
          "Yakın izleme gereken ve ekrana temas riskinin bulunduğu toplantı odası, mağaza içi ve geçiş alanları gibi uygulamalarda tercih edilir.",
      },
      {
        question: "GOB ekranın teknik değerlerini nereden öğrenebilirim?",
        answer:
          "Parlaklık, yenileme hızı ve kabin bilgileri seçilen modele göre değişir; bu değerler teknik föyde ve teklifle birlikte yazılı olarak paylaşılır.",
      },
    ],
  },
  {
    slug: "kiralik-led-ekran",
    name: "Kiralık LED Ekran",
    h1: "Kiralık LED Ekran",
    lead: "Konser, fuar ve lansmanlar için etkinliğe hazır sistemler",
    title: "Kiralık LED Ekran | Konser, Fuar, Lansman | ARLEDSCREEN",
    description:
      "Konser, fuar, lansman ve açık hava etkinlikleri için kiralık LED ekran: hızlı kurulan kabinler, kurulum ve söküm planlaması. Etkinlik bilgilerinizle teklif isteyin.",
    short: "Konser, fuar, lansman ve özel etkinlikler için hızlı kurulan kiralık sistemler.",
    tag: "Etkinlik · Fuar · Sahne",
    family: "Kiralık LED Ekranlar",
    types: ["Sahne arka ekranı", "Konser ve festival", "Fuar standı", "Kurumsal etkinlik"],
    image: "/projects/modules/stage-led.jpg",
    imageAlt: "Konser sahnesinde LED ekran ve izleyiciler",
    intro: [
      "Etkinlikte ekranın zamanında kurulması, gün boyu sorunsuz çalışması ve etkinlik bitince hızla sökülmesi gerekir. Kiralık projelerde bu süreci etkinlik takviminize göre planlıyoruz.",
      "İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir. Net teklif için etkinlik bilgilerinizi paylaşmanız yeterlidir.",
    ],
    highlights: [
      "Hızlı kurulan kiralama kabinleri",
      "Kurulum ve söküm planlaması",
      "İç ve dış mekân etkinlikleri",
      "Etkinliğe özel yazılı teklif",
    ],
    uses: [
      { title: "Konser ve sahne", body: "Sahne arkası ve yan ekranlar için modüler sistemler." },
      { title: "Fuar standı", body: "Stand tasarımına uyarlanan geçici video duvarları." },
      { title: "Lansman ve kurumsal", body: "Ürün tanıtımları ve kurumsal toplantılar." },
      { title: "Açık hava etkinliği", body: "Festival ve spor organizasyonları." },
    ],
    pitches: [],
    seriesCategories: ["rental"],
    guide: { href: "/tr/rehber/led-ekran/", label: "LED ekran rehberi" },
    projectType: "etkinlik",
    whatsapp: "Merhaba, etkinlik için kiralık LED ekran hakkında bilgi almak istiyorum. Tarih, lokasyon ve yaklaşık ölçü:",
    refFilter: (r) => /kiralama|sahne/i.test(r.detail),
    faqs: [
      {
        question: "Kiralık LED ekran fiyatı neye göre belirlenir?",
        answer:
          "İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir. Etkinlik tarihi, ölçü ve lokasyonu paylaştığınızda yazılı teklif hazırlıyoruz.",
      },
      {
        question: "Kurulum ve söküm teklife dahil mi?",
        answer:
          "Kurulum ve söküm planı etkinlik takvimine göre hazırlanır; teklife dahil kalemler yazılı olarak belirtilir.",
      },
      {
        question: "Açık hava etkinlikleri için kiralık ekran var mı?",
        answer:
          "Evet. Proje kayıtlarımızda dış mekân kiralama kabiniyle tamamlanan kurulumlar bulunur. Uygun sistemi etkinlik koşullarına göre öneriyoruz.",
      },
    ],
  },
  {
    slug: "esnek-led-ekran",
    name: "Esnek LED Ekran",
    h1: "Esnek (Flexible) LED Ekran",
    lead: "Kavisli, dairesel ve mimariye özel formlar",
    title: "Esnek LED Ekran | Kavisli, Silindir, Özel Form | ARLEDSCREEN",
    description:
      "Kavisli duvar, kolon kaplama ve özel form uygulamaları için esnek LED ekran. Yüzey ölçüsü ve taşıyıcı yapı keşifte planlanır; montaj ve servis ARLEDSCREEN'den.",
    short: "Kavisli yüzeyler, kolonlar ve özel formlar için bükülebilen modüller.",
    tag: "P1.86 · P2.5",
    family: "İç Mekân LED Ekranlar",
    types: ["Kolon kaplama", "Kavisli duvar", "Silindir ve dairesel form", "Özel tasarım dekor"],
    image: "/projects/modules/tech/flexible-module-bend-lit.jpg",
    cardImage: "/projects/modules/tech/flexible-module-bend-lit.jpg",
    imageAlt: "Bükülerek kavisli forma getirilmiş esnek LED modül",
    techGallery: FLEXIBLE_TECH_GALLERY,
    techGalleryEyebrow: "Esnek form",
    techGalleryTitle: "Konkav, konveks ve silindirik kavis",
    techGalleryDescription:
      "Esnek LED modüller konkav (iç bükey), konveks (dış bükey) ve silindirik yüzeylere uygulanabilir. Eğrilik yarıçapı ve taşıyıcı yapı keşifte yüzeye göre planlanır.",
    intro: [
      "Esnek LED modüller bükülerek kolonları, dairesel yüzeyleri ve dalgalı duvarları kaplayabilir; düz kabinlerle elde edilemeyen formlar mümkün hâle gelir.",
      "Konkav, konveks veya silindirik kavis seçenekleriyle showroom, lobi ve sahne tasarımlarında çerçeveden bağımsız bir yüzey oluşturulur. Her proje mekâna özeldir; ölçü ve eğrilik keşifte netleştirilir.",
    ],
    highlights: [
      "Konkav, konveks ve silindirik formlar",
      "Kolon ve silindir kaplama",
      "Mimari projelere özel ölçülendirme",
      "Keşif, taşıyıcı yapı ve montaj planı",
    ],
    uses: [
      { title: "Kolon kaplama", body: "Lobi ve geniş alanlarda kolonları dijital yüzeye dönüştürme." },
      { title: "Kavisli duvar", body: "Showroom ve karşılama alanlarında akıcı formlar." },
      { title: "Sahne tasarımı", body: "Etkinlik ve stüdyolar için yaratıcı dekorlar." },
      { title: "Mimari uygulama", body: "Mimarlık ofisleriyle birlikte projelendirilen özel formlar." },
    ],
    pitches: [
      { label: "P1.86", note: "esnek" },
      { label: "P2.5", note: "esnek" },
    ],
    seriesCategories: [],
    guide: { href: "/tr/rehber/mimari-muhendislik-led/", label: "Mimari LED mühendisliği rehberi" },
    projectType: "diger",
    whatsapp: "Merhaba, kavisli / özel form esnek LED ekran projesi hakkında bilgi almak istiyorum. Yüzey ölçüsü ve konum:",
    refFilter: (r) => /oval/i.test(r.detail),
    faqs: [
      {
        question: "Esnek LED ekran hangi yüzeylere uygulanabilir?",
        answer:
          "Kolon, kavisli duvar ve dairesel yüzeyler gibi düz olmayan alanlara uygulanabilir. Uygulanabilirlik ve eğrilik sınırları keşifte yüzeye göre değerlendirilir.",
      },
      {
        question: "Esnek ekran projesi nasıl fiyatlandırılır?",
        answer:
          "Yüzey ölçüsü, form, taşıyıcı yapı ve montaj koşulları birlikte değerlendirilerek projeye özel yazılı teklif hazırlanır.",
      },
      {
        question: "Mimari proje aşamasında destek veriyor musunuz?",
        answer:
          "Evet. Ölçü, modül düzeni ve altyapı ihtiyacını proje ekibinizle birlikte planlayabiliriz.",
      },
    ],
  },
  {
    slug: "seffaf-led-ekran",
    name: "Şeffaf LED Ekran",
    h1: "Şeffaf LED Ekran",
    lead: "Cam vitrinde arkadaki ürünü göstererek dijital içerik",
    title: "Şeffaf LED Ekran | Vitrin ve Cam Uygulamaları | ARLEDSCREEN",
    description:
      "Mağaza vitrini ve showroom camı için şeffaf LED ekran. Yüksek şeffaflıklı açık yapı; cam ölçüsü, montaj tipi ve izleme mesafesi keşifte belirlenir. Transparan (mesh) cephe LED ile karıştırılmamalıdır.",
    short: "Vitrin camında arkadaki teşhiri koruyan yüksek şeffaflıklı LED.",
    tag: "Vitrin · Showroom · Yüksek şeffaflık",
    family: "Dış Mekân LED Ekranlar",
    types: ["Vitrin arkası", "Showroom camı", "Asma (askılı) kurulum", "İç / yarı outdoor cam"],
    image: "/projects/applications/seffaf-led-vitrin.jpg",
    cardImage: "/projects/applications/seffaf-led-vitrin.jpg",
    imageAlt: "AVM mağaza vitrininde şeffaf LED ekran — pembe kalp içeriği, içerideki ürünler görünür",
    intro: [
      "Şeffaf LED ekranlarda LED’ler cam üzerinde ince bir film veya açık ızgara hâlinde dizilir; aralarında boşluk bırakıldığı için ekran çalışırken de camın arkası görülebilir. Mağaza içi gün ışığı ve ürün teşhiri büyük ölçüde korunur.",
      "Bu grup perakende vitrin ve showroom camı için planlanır. Bina cephesi ölçeğinde, dış hava koşullarına açık mesh/ızgara form faktörü için ayrı ürün grubumuz vardır: Transparan LED ekran.",
      "Ekranın ne kadar şeffaf görüneceği ile görüntü keskinliği arasında bir denge vardır. Doğru seçim cam ölçüsüne, izleyicinin uzaklığına ve ışığa göre keşifte yapılır.",
    ],
    highlights: [
      "Camın arkasındaki ürün teşhirini büyük ölçüde korur",
      "İnce ve hafif yapı, vitrin camına yakın montaj",
      "Vitrin ölçüsüne göre planlama",
      "Keşif, montaj ve teknik servis tek ekipten",
    ],
    uses: [
      { title: "Mağaza vitrini", body: "Ürün teşhirini kapatmadan kampanya ve marka içeriği gösterme." },
      { title: "Showroom", body: "Bölmeler ve iç camlarda hafif, göz yormayan içerik alanı." },
      { title: "Fuar ve sergi", body: "Stantlarda katmanlı ve derinlik hissi veren tasarımlar." },
      { title: "Perakende lobi", body: "Cam bölmelerde yönlendirme ve kampanya yayını." },
    ],
    pitches: [],
    seriesCategories: ["transparent"],
    guide: { href: "/tr/rehber/vitrin-led-ekran/", label: "Vitrin LED ekran rehberi" },
    projectType: "magaza",
    whatsapp: "Merhaba, vitrin / showroom için şeffaf LED ekran hakkında bilgi almak istiyorum. Cam ölçüsü ve konum:",
    faqs: [
      {
        question: "Şeffaf LED ile transparan LED aynı şey mi?",
        answer:
          "Hayır. Şeffaf LED bu sitede vitrin/showroom camı için yüksek şeffaflıklı açık yapıyı ifade eder. Transparan LED, cephe ölçeğinde mesh/ızgara form faktörünü ifade eder — ayrı ürün sayfasında anlatılır.",
      },
      {
        question: "Şeffaf LED ekran ne zaman tercih edilir?",
        answer:
          "Vitrin veya showroom gibi arkadaki ürünün görünür kalması gereken cam yüzeylerde tercih edilir. Tam kapalı bir görüntü yüzeyi gerekiyorsa standart LED ekran daha uygun olabilir.",
      },
      {
        question: "Gündüz vitrinde içerik okunur mu?",
        answer:
          "Okunabilirlik; cama düşen güneş ışığına, yöne ve seçilecek modele bağlıdır. Bu nedenle konum keşifte değerlendirilir ve model önerisi buna göre yapılır.",
      },
      {
        question: "Montaj cama mı yapılır?",
        answer:
          "Çoğunlukla cama yakın bir taşıyıcıya, tavana asılarak veya zemine oturan bir çerçeveyle kurulur. Yöntem, cam ve tavan yapısına göre keşifte belirlenir.",
      },
    ],
  },
  {
    slug: "transparan-led-ekran",
    name: "Transparan LED Ekran",
    h1: "Transparan (Mesh) LED Ekran",
    lead: "Cam cephe ve dış mekân için ızgara yapılı şeffaf form",
    title: "Transparan LED Ekran | Cam Cephe ve Mesh LED | ARLEDSCREEN",
    description:
      "Bina cam cephesi ve dış mekân uygulamaları için transparan (mesh/ızgara) LED ekran. Açık yapı ile arkadaki mimari görünür kalır. Vitrin odaklı şeffaf LED grubundan ayrı planlanır; keşif ve teklif ARLEDSCREEN’den.",
    short: "Cephe ölçeğinde mesh/ızgara transparan LED — mimari görünürlüğü korur.",
    tag: "Cam cephe · Mesh · Dış / yarı outdoor",
    family: "Dış Mekân LED Ekranlar",
    types: ["Cam cephe mesh", "Izgara / grid panel", "Yarı outdoor cephe", "AVM cam koridor"],
    image: "/projects/applications/transparan-led-cephe.jpg",
    imageAlt: "Cam bina cephesinde transparan mesh LED ekran — arkadaki katlar görünür",
    intro: [
      "Transparan LED ekran, LED’lerin ızgara/mesh düzeninde boşluklu yerleştirildiği açık bir form faktördür. Amaç, cephe ölçeğinde dijital içerik gösterirken mimari derinliği ve ışık geçişini tamamen kapatmamaktır.",
      "Bu grup, mağaza vitrinindeki yüksek şeffaflıklı Şeffaf LED ekrandan ayrıdır. Cephe yüksekliği, rüzgâr/yağmur maruziyeti ve izleme mesafesi keşifte netleşir; model önerisi buna göre yapılır.",
      "Parlaklık, IP sınıfı ve şeffaflık oranı sitede sabit yayımlanmaz; yazılı teklifte proje koşullarına göre belirtilir.",
    ],
    highlights: [
      "Cephe ölçeğinde açık yapı",
      "Arkada mimari / kat görünürlüğü korunabilir",
      "Cam cephe ve yarı outdoor senaryolara uygun planlama",
      "Keşif, montaj ve teknik servis tek ekipten",
    ],
    uses: [
      { title: "Cam cephe", body: "Bina cephesindeki camları dijital yüzeye dönüştürme." },
      { title: "AVM dış / ara cephe", body: "Geniş cam yüzeylerde marka ve kampanya yayını." },
      { title: "Showroom cephe", body: "Dışarıdan görünen ama içeriyi tamamen kesmeyen uygulamalar." },
      { title: "Etkinlik mimarisi", body: "Geçici veya sabit cephe katmanlı tasarımlar." },
    ],
    pitches: [],
    seriesCategories: ["transparent"],
    guide: { href: "/tr/rehber/dis-mekan-led-ekran/", label: "Dış mekân LED ekran rehberi" },
    projectType: "dis-mekan",
    whatsapp: "Merhaba, cam cephe için transparan (mesh) LED ekran hakkında bilgi almak istiyorum. Cephe ölçüsü ve konum:",
    faqs: [
      {
        question: "Transparan LED ile şeffaf LED farkı nedir?",
        answer:
          "Şeffaf LED vitrin/showroom camı için yüksek şeffaflıklı uygulamayı; transparan LED cephe ölçeğinde mesh/ızgara formu ifade eder. İkisi de ‘arkası görünen’ ailede olsa da kullanım yeri ve form faktörü farklıdır.",
      },
      {
        question: "Her dış cephe için transparan LED uygun mu?",
        answer:
          "Hayır. Yoğun güneş, rüzgâr ve uzun mesafe izleme koşullarında standart dış mekân LED veya başka bir çözüm daha uygun olabilir. Karar keşifte verilir.",
      },
      {
        question: "Şeffaflık oranı nedir?",
        answer:
          "Model ve piksel düzenine göre değişir. Sitede sabit yüzde yayımlamayız; keşif sonrası teklifte paylaşılır.",
      },
    ],
  },
  {
    slug: "ince-pitch-led-ekran",
    name: "İnce Pitch LED Ekran",
    h1: "İnce Pitch (Fine Pitch) LED Ekran",
    lead: "Yakından izlenen alanlar için yüksek piksel yoğunluğu",
    title: "İnce Pitch LED Ekran | Toplantı, Stüdyo, Kontrol Odası | ARLEDSCREEN",
    description:
      "Toplantı salonu, stüdyo ve kontrol odası gibi yakın izleme alanları için ince pitch LED ekran. SMD, COB ve GOB yüzey seçenekleri; piksel aralığı izleme mesafesine göre seçilir.",
    short: "Piksel aralığı küçük, yakın mesafeden keskin görüntü veren iç mekân ekranları.",
    tag: "P0.9 · P1.25 · GOB",
    family: "İç Mekân LED Ekranlar",
    types: ["SMD ince pitch", "COB yüzeyli seçenekler", "GOB (Glue on Board)", "Toplantı salonu duvarı", "Stüdyo arka planı"],
    image: "/projects/modules/tech/cob-smd-gob-trio.jpg",
    imageAlt: "COB, SMD ve GOB ince pitch LED modül yüzey karşılaştırması",
    techGallery: FINE_PITCH_TECH_GALLERY,
    intro: [
      "Piksel aralığı (pitch), iki LED merkezi arasındaki milimetre cinsinden mesafedir. Aralık küçüldükçe aynı alana daha çok piksel sığar ve ekran daha yakından izlendiğinde bile görüntü bütünlüğünü korur.",
      "İnce pitch ekranlarda yüzey teknolojisi de seçilir: SMD, COB (Chip on Board) veya GOB (Glue on Board). GOB'da LED yüzeyi şeffaf koruyucu katmanla kaplanır; yakın izleme ve temas riski olan alanlarda tercih edilir.",
    ],
    highlights: [
      "Yakın mesafede net ve pürüzsüz görüntü",
      "SMD, COB ve GOB yüzey seçenekleri",
      "Salon derinliğine göre piksel aralığı önerisi",
      "Keşif, montaj ve teknik servis tek ekipten",
    ],
    uses: [
      { title: "Toplantı salonu", body: "Sunum ve video konferans için tek parça ekran duvarı." },
      { title: "Stüdyo", body: "Yayın ve çekim alanlarında dekor ve arka plan." },
      { title: "Kontrol odası", body: "Kamera, harita ve veri ekranlarının birlikte izlenmesi." },
      { title: "Lobi ve karşılama", body: "Kurumsal girişlerde yakından izlenen içerik alanı." },
    ],
    pitches: [
      { label: "P0.9", note: "teknik föy ile" },
      { label: "P1.25" },
    ],
    seriesCategories: ["fine-pitch"],
    guide: { href: "/tr/rehber/konferans-salonu-led/", label: "Konferans salonu LED rehberi" },
    projectType: "toplanti",
    whatsapp: "Merhaba, toplantı / stüdyo için ince pitch LED ekran hakkında bilgi almak istiyorum. Salon ölçüsü ve izleme mesafesi:",
    refFilter: (r) => /P1\.\d|P2\.\d/.test(r.detail),
    faqs: [
      {
        question: "Hangi piksel aralığını seçmeliyim?",
        answer:
          "Fiyatı yayımlanan ince pitch / GOB paneller P1.25, P1.53 ve P1.86’dır. Pratik kural: her 1 mm P ≈ 1 m minimum mesafe. Daha ince (ör. P0.9) seçenekler teknik föy + yazılı teklifle; kesin öneriyi salon ölçüsü ve içerik türüne göre keşifte yapıyoruz.",
      },
      {
        question: "İnce pitch sayfasında fiyat var mı?",
        answer:
          "Evet — GOB P1.25 / P1.53 / P1.86 panel (modül) USD fiyatları bu grupta da yayımlanır; model sayfaları GOB LED ekran grubunda yer alır.",
      },
      {
        question: "SMD, COB ve GOB arasındaki fark nedir?",
        answer:
          "SMD'de her LED ayrı paket olarak karta lehimlenir. COB'da çipler doğrudan karta yerleştirilip ortak yüzeyle kapatılır. GOB'da SMD yüzeyi ek şeffaf tutkal katmanıyla kaplanır; darbe, nem ve toza karşı koruma artar. Uygun seçenek projeye göre önerilir.",
      },
      {
        question: "Toplantı sistemleriyle birlikte çalışır mı?",
        answer:
          "Ekran, görüntü işlemci üzerinden bilgisayar, sunum ve konferans cihazlarından sinyal alır. Bağlantı ihtiyacı keşifte mevcut sisteminize göre planlanır.",
      },
    ],
  },
  {
    slug: "lcd-ekran",
    name: "LCD Ekran",
    h1: "LCD Ekran: Dokunmatik Kiosk ve Ayaklı Ekran",
    lead: "Yakından bakılan, tek parça ve hazır ölçülü dijital ekranlar",
    title: "LCD Ekran Satışı | Kiosk ve Ayaklı Ekran | ARLEDSCREEN",
    description:
      "49, 55 ve 65 inç dokunmatik LCD kiosk; Android veya Windows tabanlı. USB, HDMI, LAN ve Wi‑Fi ile içerik. Satış, montaj ve yazılı teklif ARLEDSCREEN'den.",
    short: "Dokunmatik kiosk ve ayaklı LCD ekran; 49, 55 ve 65 inç seçenekler.",
    tag: "Kiosk · Lobi · Mağaza",
    family: "LCD ve Dijital Ekranlar",
    types: [
      "Ayaklı dokunmatik kiosk",
      "49, 55 ve 65 inç ölçüler",
      "Android tabanlı",
      "Windows tabanlı",
      "LCD menuboard ve ayaklı ekran (teklifle)",
    ],
    image: "/projects/guides/lcd-dikey-ekran-55-inc.jpg",
    cardImage: "/projects/guides/lcd-dikey-ekran-55-inc.jpg",
    imageAlt: "55 inç dikey LCD dijital ekran, ayaklı gövde",
    intro: [
      "LCD ekran, fabrikada belirlenen ölçüde gelen tek parça bir paneldir. Modülle büyütülen LED ekranın aksine kutudan çıktığı ölçüde kullanılır; bu yüzden yakından bakılan, tek bir noktaya konan ekranlarda pratik bir seçenektir.",
      "Ayaklı dokunmatik kiosk gövdelerinde 49, 55 ve 65 inç ölçüleri tedarik ediyoruz. Kiosklar Android ya da Windows tabanlı olarak seçilir; video, fotoğraf ve ses oynatır, internete bağlanarak çevrim içi içerik de gösterebilir. Menuboard ve ayaklı ekran projelerinde LCD seçeneğini LED ile birlikte değerlendiriyor, model ve ölçüyü yazılı teklifte netleştiriyoruz.",
    ],
    highlights: [
      "49, 55 ve 65 inç dokunmatik kiosk",
      "Android veya Windows işletim sistemi",
      "USB, HDMI, LAN ve Wi‑Fi bağlantısı",
      "Video, fotoğraf ve ses oynatma; içerik anında değiştirilebilir",
    ],
    uses: [
      { title: "AVM ve mağaza", body: "Kampanya, ürün tanıtımı ve mağaza içi yönlendirme." },
      { title: "Toplantı ve konferans salonu", body: "Program, salon bilgisi ve karşılama ekranı." },
      { title: "Restoran ve kafe", body: "Menü, günün önerileri ve self-servis bilgi noktası." },
      { title: "Lobi ve bekleme alanı", body: "Bilgilendirme, duyuru ve kat / birim yönlendirmesi." },
    ],
    pitches: [],
    seriesCategories: [],
    guide: { href: "/tr/rehber/lcd-ekran/", label: "LCD ekran rehberi" },
    projectType: "magaza",
    whatsapp: "Merhaba, LCD ekran / dokunmatik kiosk hakkında bilgi almak istiyorum. Ölçü (inç), adet ve kullanım alanı:",
    faqs: [
      {
        question: "LCD kiosk hangi ölçülerde var?",
        answer:
          "Ayaklı dokunmatik kiosklarda 49, 55 ve 65 inç seçeneklerini tedarik ediyoruz. Hangi ölçünün uygun olduğunu izleme mesafesi ve konulacak alana göre birlikte seçiyoruz.",
      },
      {
        question: "Android mi, Windows mu seçmeliyim?",
        answer:
          "İki sürüm de video, fotoğraf ve ses oynatır. Kullanacağınız yazılım veya uygulama belirli bir işletim sistemi istiyorsa seçimi ona göre yapıyoruz; emin değilseniz kullanım senaryonuzu yazın, teklifle birlikte önerelim.",
      },
      {
        question: "İçerik ekrana nasıl yüklenir?",
        answer:
          "Kiosklarda USB, HDMI, kablolu ağ (LAN) ve Wi‑Fi bağlantısı bulunur. Görseller ve sunumlar bu yollarla yüklenip istendiğinde anında değiştirilebilir.",
      },
      {
        question: "LCD ekran fiyatı ne kadar?",
        answer:
          "LCD ekranlar için sitede fiyat yayımlamıyoruz. Ölçü, işletim sistemi ve adet netleştikten sonra montaj dahil yazılı teklif hazırlıyoruz. Sitedeki yayımlanmış fiyatlar yalnızca NXTIONSTAR LED paneller içindir.",
      },
    ],
  },
  {
    slug: "poster-led-ekran",
    name: "Poster ve Totem LED Ekran",
    h1: "Poster ve Totem LED Ekran",
    lead: "Taşınabilir, dikey formatlı dijital tanıtım ekranları",
    title: "Poster ve Totem LED Ekran | Mağaza, Lobi, Etkinlik | ARLEDSCREEN",
    description:
      "Mağaza girişi, lobi ve etkinlik alanları için dikey poster LED ekran ve totem. Ölçü, kullanım alanı ve içerik yönetimi birlikte planlanır; teklif ve servis ARLEDSCREEN'den.",
    short: "Dikey formatlı, ayaklı veya duvara monte edilebilen tanıtım ekranları.",
    tag: "Mağaza · Lobi · Etkinlik",
    family: "Poster ve Totem LED Ekranlar",
    types: ["Ayaklı poster ekran", "Duvara montaj", "Yan yana birleştirme", "İç ve dış mekân totem", "Menuboard (kafe / restoran)"],
    image: "/projects/applications/led-poster-totems.jpg",
    cardImage: "/projects/applications/led-poster-totems.jpg",
    imageAlt: "Dikey LED poster ve totem ekranları — yan yana dört ayaklı ünite",
    intro: [
      "Poster LED ekranlar, basılı afiş ve standların dijital karşılığıdır. Dikey formatları sayesinde giriş, koridor ve kasa önü gibi dar alanlara sığar; içerik birkaç dakika içinde değiştirilebilir.",
      "Ayaklı olarak tek başına kullanılabilir veya birkaç ekran yan yana getirilerek daha geniş bir yüzey oluşturulabilir. Dış mekân totemlerde ise gövde ve sabitleme detayları konuma göre planlanır.",
    ],
    highlights: [
      "Dar alanlara uygun dikey format",
      "Basılı afiş maliyetine karşı hızlı içerik değişimi",
      "Tek başına ya da yan yana kullanım",
      "İç ve dış mekân totem seçenekleri",
    ],
    uses: [
      { title: "Mağaza girişi", body: "Kampanya ve yeni ürün duyuruları için dikkat çeken nokta." },
      { title: "AVM ve lobi", body: "Yönlendirme, duyuru ve marka içerikleri." },
      { title: "Etkinlik ve fuar", body: "Kolay taşınan, hızlı kurulan tanıtım ekranı." },
      { title: "Restoran ve kafe", body: "Menü ve günlük öneri gösterimi." },
    ],
    pitches: [],
    seriesCategories: [],
    guide: { href: "/tr/rehber/poster-led-ekran/", label: "Poster LED ekran rehberi" },
    projectType: "magaza",
    whatsapp: "Merhaba, poster / totem LED ekran hakkında bilgi almak istiyorum. Adet ve kullanım alanı:",
    refFilter: (r) => /totem|poster/i.test(r.detail),
    faqs: [
      {
        question: "Poster LED ekrana içerik nasıl yüklenir?",
        answer:
          "Modele göre USB, yerel ağ veya kablosuz bağlantıyla içerik yüklenebilir. Size uygun yöntemi teklif aşamasında birlikte belirliyoruz.",
      },
      {
        question: "Birden fazla poster ekran birleştirilebilir mi?",
        answer:
          "Birleştirmeye uygun modellerde ekranlar yan yana getirilerek tek bir görüntü yüzeyi gibi çalıştırılabilir.",
      },
      {
        question: "Dış mekânda totem kullanılabilir mi?",
        answer:
          "Evet, dış mekân için tasarlanmış totem gövdeleri kullanılır. Konum, güneş yönü ve sabitleme şekli keşifte değerlendirilir.",
      },
    ],
  },
  {
    slug: "led-modul-ve-kontrol-sistemleri",
    name: "LED Modül ve Kontrol Sistemleri",
    h1: "LED Modül, Kabin ve Kontrol Sistemleri",
    lead: "Yeni projeler ve mevcut ekranların bakımı için bileşenler",
    title: "LED Modül ve Kontrol Sistemleri | Kabin, Kart, İşlemci | ARLEDSCREEN",
    description:
      "LED modül, kabin, alıcı kart, gönderici kart, görüntü işlemci ve güç kaynağı tedariki ile mevcut ekranlara uyumlu yedek parça ve teknik servis desteği ARLEDSCREEN'den.",
    short: "Modül, kabin, alıcı / gönderici kart, görüntü işlemci ve güç kaynakları.",
    tag: "Modül · Kabin · Kontrol",
    family: "Modül ve Kontrol Sistemleri",
    types: ["İç ve dış mekân LED modül", "Kabin (alüminyum / döküm)", "Alıcı ve gönderici kart", "Görüntü işlemci", "Güç kaynağı"],
    image: "/projects/modules/smd-module-front-back.jpg",
    cardImage: "/projects/modules/module-catalog-sheet.jpg",
    imageAlt: "Ön ve arka yüzü görünen SMD LED modül",
    intro: [
      "Bir LED ekran; LED modüller, bu modülleri taşıyan kabinler, görüntüyü modüllere dağıtan kontrol kartları ve güç kaynaklarından oluşur. Görüntü işlemci ise bilgisayar veya yayın kaynağından gelen sinyali ekran çözünürlüğüne uyarlar.",
      "Kontrol tarafında Huidu, NovaStar ve Colorlight markalarını proje ihtiyacına göre seçiyoruz; her markanın kendi ürün sayfasında modeller ve teknik özellikler yer alır. Uyumluluk, ekranın etiket bilgileri ve modül ölçüsü incelenerek kontrol edilir.",
    ],
    highlights: [
      "Huidu asenkron kartlar — Wi‑Fi / USB içerik",
      "NovaStar VX, Taurus ve MCTRL kontrolcüler",
      "Colorlight X / VX işlemci ve S gönderici",
      "Kurulum, haritalama ve teknik servis",
    ],
    uses: [
      { title: "Yedek modül", body: "Arızalı veya renk farkı oluşan modüllerin değişimi." },
      { title: "Kontrol sistemi", body: "Huidu, NovaStar veya Colorlight kurulum ve yapılandırma." },
      { title: "Ekran büyütme", body: "Mevcut ekrana uyumlu modüllerle yüzey ekleme." },
      { title: "Entegratörler", body: "Kendi projesini kuran firmalara bileşen tedariki." },
    ],
    pitches: [
      { label: "Huidu", note: "Asenkron kontrol kartları" },
      { label: "NovaStar", note: "VX / Taurus / MCTRL" },
      { label: "Colorlight", note: "X / VX / S serisi" },
    ],
    seriesCategories: [],
    guide: { href: "/tr/rehber/led-ekran/", label: "LED ekran rehberi" },
    projectType: "servis",
    whatsapp: "Merhaba, LED modül / kontrol kartı hakkında bilgi almak istiyorum. Modül ölçüsü ve ekran bilgisi:",
    faqs: [
      {
        question: "Mevcut ekranıma uyumlu modül bulabilir misiniz?",
        answer:
          "Modülün arkasındaki etiket bilgisini, ölçüsünü ve fotoğrafını paylaşmanız yeterli. Uyumlu seçeneği kontrol edip size dönüyoruz.",
      },
      {
        question: "Hangi kontrol markasını seçmeliyim?",
        answer:
          "Asenkron tabela ve Wi‑Fi güncellemede sıkça Huidu; yüksek piksel yükü ve sahne/senkron işlerde NovaStar veya Colorlight öne çıkar. Keşifte kaynak tipi ve ekran ölçüsüne göre netleştiririz.",
      },
      {
        question: "Kurulum ve yapılandırma desteği veriyor musunuz?",
        answer:
          "Evet. Kontrol sistemi kurulumu, ekran haritalama ve yapılandırma teknik servis ekibimiz tarafından yapılır.",
      },
    ],
  },
  ...CONTROL_GROUPS,
];

// Keep a stable, family-ordered base list.
PRODUCT_GROUPS.sort(
  (a, b) => PRODUCT_FAMILIES.indexOf(a.family) - PRODUCT_FAMILIES.indexOf(b.family),
);

/**
 * Owner order for product types (Aras Bey, 9 Eki 2026): İç mekân, Dış mekân, Dijital ekran,
 * Menüboard, Kiosk, LCD ekran; everything else keeps its previous relative order.
 * Slugs without a product group (today: dijital ekran, menüboard, kiosk, which are guides) are
 * skipped. Used by menus, footer, grids, ItemList and sitemap.
 */
const GRID_LEAD_SLUGS = [
  "ic-mekan-led-ekran",
  "dis-mekan-led-ekran",
  "dijital-ekran",
  "menuboard",
  "kiosk",
  "lcd-ekran",
];
{
  const lead = (g: ProductGroup) => {
    const i = GRID_LEAD_SLUGS.indexOf(g.slug);
    return i === -1 ? GRID_LEAD_SLUGS.length : i;
  };
  PRODUCT_GROUPS.sort((a, b) => lead(a) - lead(b));
}

/** Category grids (home + products hub): same owner order as PRODUCT_GROUPS. */
export const PRODUCT_GROUPS_GRID: ProductGroup[] = [...PRODUCT_GROUPS];
const GRID_FAMILY_ORDER: ProductFamily[] = [
  "İç Mekân LED Ekranlar",
  ...PRODUCT_FAMILIES.filter((f) => f !== "İç Mekân LED Ekranlar"),
];

export function groupsByFamily(): { family: ProductFamily; groups: ProductGroup[] }[] {
  return GRID_FAMILY_ORDER.map((family) => ({
    family,
    groups: PRODUCT_GROUPS.filter((g) => g.family === family),
  })).filter((f) => f.groups.length);
}

export function getProductGroup(slug: string): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((g) => g.slug === slug);
}

export const productGroupPath = (
  g: Pick<ProductGroup, "slug">,
  locale: "tr" | "en" = "tr",
) => `/${locale}/products/${g.slug}/`;

export function relatedReferences(g: ProductGroup, limit = 4): Reference[] {
  if (!g.refFilter) return [];
  return references.filter(g.refFilter).slice(0, limit);
}
