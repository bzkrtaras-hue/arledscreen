/**
 * LED ekran malzemeleri (ARL-20261009-006): kontrol kartı, NovaStar, video işlemci,
 * adaptör, kasa, matrix, aksesuar ve ek panel varyantları.
 *
 * - Panel dışı fiyatlar: sahip fiyat listesinden birebir (materials-data.ts, USD, KDV hariç).
 * - Panel fiyatları: yalnızca prices.ts (PANEL_PRICES = site fiyatı; DERIVED_PANEL_PRICES =
 *   ortalama oran). materials-data.ts panel satırlarında fiyat tutmaz, id ile referans verir.
 * - Üçüncü taraf marka adları (Huidu, NovaStar) yalnızca satılan ürünün adıdır;
 *   resmi temsilcilik/bayilik iddiası yazılmaz, logo kullanılmaz.
 * - Gerçek ürün fotoğrafı olmayan kalemlerde görsel gösterilmez (sahte görsel yok).
 */
import { DERIVED_PANEL_PRICES, PANEL_PRICES, PRICE_VALID_UNTIL, localBusinessRef } from "@/content/prices";
import { MATERIAL_SECTIONS } from "@/content/materials-data";
import { SITE_URL } from "@/lib/site";

export const MATERIALS_BASE = "/tr/malzemeler/";
export const MATERIALS_PRICE_NOTE =
  "Fiyatlar USD, KDV hariçtir; kura göre değişebilir. Nihai tutar yazılı teklifle kesinleşir.";
export const MATERIALS_LIST_DATE = "9 Ekim 2026";

export interface MaterialItem {
  id: string;
  name: string;
  spec: string;
  /** List price (USD, KDV hariç). For CNC tables: single-sided. */
  usd?: number;
  /** CNC tables: double-sided price. */
  usd2?: number;
  /** Panel variant priced at the same-pitch site price (PANEL_PRICES id). */
  panelPriceId?: string;
  /** Panel variant priced by average ratio (DERIVED_PANEL_PRICES id). */
  derivedPriceId?: string;
  brand?: string;
  /** Existing product page that already describes this item. */
  modelHref?: string;
}

export interface MaterialSection {
  title: string;
  cols: string[];
  kind: "default" | "cnc" | "panel";
  items: MaterialItem[];
}

export interface MaterialCategory {
  slug: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  short: string;
  intro: string[];
  whatsapp: string;
  faqs: { question: string; answer: string }[];
}

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    slug: "kontrol-kartlari",
    name: "LED kontrol kartları",
    h1: "LED ekran kontrol kartları ve fiyatları",
    title: "LED Kontrol Kartı Fiyatları: TF ve Huidu | ARLEDSCREEN",
    description:
      "TF ve Huidu LED kontrol kartı fiyat listesi: tek renk, RGB, Wi‑Fi, USB ve ethernet kartlar, alıcı kartlar, sensör ve HUB. USD, KDV hariç; kurulum ARLEDSCREEN.",
    short: "TF, Huidu tek renk ve RGB kartlar, alıcı kart, sensör ve HUB.",
    intro: [
      "Kontrol kartı, bilgisayar ya da telefonda hazırlanan içeriği LED modüllere ileten karttır. Kayan yazı ve tek renk tabelalarda TF ve Huidu tek renk kartlar, tam renkli ekranlarda Huidu RGB kartlar kullanılır.",
      "Kart seçimi ekranın toplam piksel sayısına, modül bağlantı tipine ve içeriğin nasıl güncelleneceğine (USB, Wi‑Fi, ağ) göre yapılır. Kararsız kaldığınızda ekran ölçüsü ve modül bilgisini WhatsApp'tan iletmeniz yeterli.",
    ],
    whatsapp: "Merhaba, LED kontrol kartı (model / ekran ölçüsü) için fiyat ve stok bilgisi almak istiyorum:",
    faqs: [
      {
        question: "Hangi kontrol kartını seçmeliyim?",
        answer:
          "Tek renk kayan yazıda port sayısı ve piksel kapasitesi ekran ölçüsüne yeten TF veya Huidu tek renk kart seçilir. Tam renkli ekranda ekranın toplam pikseli Huidu RGB kartın kapasitesini geçmemelidir; büyük ekranlarda alıcı kart eklenir.",
      },
      {
        question: "Fiyatlara kurulum dahil mi?",
        answer:
          "Hayır. Tablodaki fiyatlar ürün fiyatıdır; USD, KDV hariçtir ve kura göre değişebilir. Kurulum ve yazılım yapılandırması istenirse teklife ayrıca eklenir.",
      },
    ],
  },
  {
    slug: "novastar-alici-gonderici",
    name: "NovaStar alıcı ve gönderici",
    h1: "NovaStar alıcı kart, gönderici ve medya oynatıcı fiyatları",
    title: "NovaStar Alıcı Kart ve Gönderici Fiyatları | ARLEDSCREEN",
    description:
      "NovaStar alıcı kart (DH7508-S, DH7512-S, NV3210), Taurus TB medya oynatıcı, TU, MSD ve MCTRL gönderici fiyatları. USD, KDV hariç; yapılandırma ARLEDSCREEN.",
    short: "DH alıcı kartlar, TB/TU medya oynatıcılar, MSD ve MCTRL göndericiler.",
    intro: [
      "NovaStar sisteminde gönderici (MSD kart, MCTRL kutu ya da TB/TU medya oynatıcı) görüntüyü ethernet ile alıcı kartlara dağıtır; her alıcı kart belirli sayıda modülü sürer.",
      "Canlı yayın gerekiyorsa MSD / MCTRL ya da canlı yayın destekli TB modelleri, depolu oynatma gerekiyorsa TB / TU serisi seçilir. Kapasiteler tablodaki piksel değerlerine göre karşılaştırılır.",
    ],
    whatsapp: "Merhaba, NovaStar alıcı / gönderici (model ve ekran çözünürlüğü) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Kaç alıcı karta ihtiyacım var?",
        answer:
          "Alıcı kart sayısı ekran çözünürlüğü ve kartın sürebildiği piksel alanına göre hesaplanır. Ekran ölçüsü ve modül tipi iletildiğinde kart sayısını birlikte netleştiriyoruz.",
      },
      {
        question: "TB serisi ile MCTRL arasındaki fark nedir?",
        answer:
          "TB serisi içerik depolayıp oynatabilen medya oynatıcılardır; MCTRL ve MSD ise bilgisayardan gelen görüntüyü alıcı kartlara gönderen göndericilerdir. Tablodaki özellik sütunu her modelin piksel kapasitesini gösterir.",
      },
    ],
  },
  {
    slug: "video-islemci",
    name: "Video işlemciler",
    h1: "LED ekran video işlemci fiyatları",
    title: "LED Ekran Video İşlemci Fiyatları | ARLEDSCREEN",
    description:
      "NovaStar VX400, VX600, VX1000, VX16S, VX2000 ve Huidu HD-VP serisi video işlemci fiyatları: kapasite ve maksimum çözünürlük. USD, KDV hariç.",
    short: "NovaStar VX ve Huidu HD-VP serisi; kapasite ve çözünürlük.",
    intro: [
      "Video işlemci, bilgisayar, kamera ya da yayın cihazından gelen sinyali ekran çözünürlüğüne ölçekler ve göndericiye iletir. Sahne, toplantı ve canlı yayın ekranlarında kullanılır.",
      "Seçim; ekranın toplam pikseli, en ve boy sınırı ile gereken giriş tiplerine göre yapılır. Tablodaki kapasite ve maksimum genişlik / yükseklik değerleri ilk karşılaştırma için yeterlidir.",
    ],
    whatsapp: "Merhaba, LED ekran video işlemci (ekran çözünürlüğü ve giriş kaynakları) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Video işlemci her ekranda gerekli mi?",
        answer:
          "Hayır. Depolu yayın yapan ekranlarda medya oynatıcı yeterlidir. Canlı kaynak, ölçekleme ya da çoklu giriş gereken sahne ve toplantı ekranlarında video işlemci eklenir.",
      },
    ],
  },
  {
    slug: "trafo-adaptor",
    name: "Trafo ve adaptörler",
    h1: "LED ekran trafo (5V adaptör) ve DC-DC dönüştürücü fiyatları",
    title: "LED Ekran Trafo ve 5V Adaptör Fiyatları | ARLEDSCREEN",
    description:
      "LED ekran için 5V 10A, 40A slim, 60A fanlı adaptör ve 9–35 V DC-DC dönüştürücü fiyatları. USD, KDV hariç; doğru güç hesabı için bize yazın.",
    short: "5V 10A / 40A / 60A adaptörler ve DC-DC dönüştürücüler.",
    intro: [
      "LED modüller 5 V ile çalışır; adaptör sayısı modüllerin toplam akım çekişine göre belirlenir. Araç ve akü sistemlerinde DC-DC dönüştürücü kullanılır.",
      "Güç hesabında modül sayısı, parlaklık ve içerik tipi birlikte değerlendirilir. Emin olmadığınızda modül modelini ve adedini WhatsApp'tan iletin.",
    ],
    whatsapp: "Merhaba, LED ekran trafo / adaptör (modül tipi ve adet) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Bir 5V 40A adaptör kaç modülü besler?",
        answer:
          "Modülün akım çekişine ve parlaklık ayarına bağlıdır. Modül etiketindeki akım değeri ile birlikte hesaplıyor ve güvenli pay bırakarak adaptör sayısını öneriyoruz.",
      },
    ],
  },
  {
    slug: "cnc-kasa",
    name: "CNC kasalar",
    h1: "LED ekran CNC kasa fiyatları (tek ve çift yüzlü)",
    title: "LED Ekran CNC Kasa Fiyatları: Tek ve Çift Yüz | ARLEDSCREEN",
    description:
      "16, 32, 48, 64, 80 ve 96 serisi LED ekran CNC kasa fiyatları; tek ve çift yüzlü seçenekler ve slim kasalar. USD, KDV hariç; ölçüye göre kasa ARLEDSCREEN.",
    short: "Slim ve 16–96 serisi CNC kasalar; tek ve çift yüzlü fiyatlar.",
    intro: [
      "CNC kasa, LED tabela ve ekran modüllerinin taşındığı metal gövdedir. Seri numarası kasanın yüksekliğini (cm), ikinci ölçü genişliğini gösterir; çift yüzlü kasalar iki yönden okunan tabelalar içindir.",
      "Modül ölçüsü (ör. 16 × 32 cm) kasa iç ölçüsüyle uyumlu olmalıdır. Tabloda olmayan ölçüler için teklif isteyebilirsiniz.",
    ],
    whatsapp: "Merhaba, LED ekran CNC kasa (ölçü ve tek / çift yüz) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Tek yüzlü ve çift yüzlü kasa farkı nedir?",
        answer:
          "Tek yüzlü kasa duvara ya da cepheye monte edilen tabelalar içindir; çift yüzlü kasa iki yönden görülen bayrak ve dik tabelalar içindir. Tablodaki iki fiyat sütunu bu iki seçeneği gösterir.",
      },
    ],
  },
  {
    slug: "ithal-rental-kasa",
    name: "İthal ve rental kasalar",
    h1: "İthal LED poster, rental kasa ve flight case fiyatları",
    title: "LED Rental Kasa ve Flight Case Fiyatları | ARLEDSCREEN",
    description:
      "Die-casting dış mekân rental kasa, mıknatıslı iç mekân tava kasa, ithal LED poster kasası, flight case ve asma aparatı fiyatları. USD, KDV hariç.",
    short: "Rental ve tava kasalar, ithal poster, flight case, asma aparatı.",
    intro: [
      "Rental kasalar sahne ve etkinlik ekranlarında hızlı kurulum ve söküm için tasarlanmıştır; tava kasalar iç mekânda önden müdahaleli, mıknatıslı montaj sağlar.",
      "Kasa ölçüsü panel ölçüsüyle uyumlu seçilmelidir (ör. 50 × 50 ve 100 × 50 cm kasalar 25 × 25 cm panellerle). Flight case taşıma ve depolama içindir.",
    ],
    whatsapp: "Merhaba, LED rental kasa / flight case (ölçü ve adet) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Rental kasa hangi panellerle uyumlu?",
        answer:
          "Tablodaki özellik sütununda uyumlu panel ölçüsü yazar (ör. 25 × 25 cm paneller). Farklı bir panel kullanıyorsanız modül ölçüsünü iletin, uyumu kontrol edelim.",
      },
    ],
  },
  {
    slug: "esnek-matrix",
    name: "Esnek LED matrix",
    h1: "Esnek LED matrix panel fiyatları",
    title: "Esnek LED Matrix Panel Fiyatları | ARLEDSCREEN",
    description:
      "Telefon uygulamasıyla yönetilen esnek LED matrix paneller: 37,4 × 9,2, 34,8 × 10,2 ve 59,5 × 12 cm. Android ve iOS uyumlu; USD, KDV hariç.",
    short: "Android / iOS uyumlu, kolay kurulumlu esnek matrix paneller.",
    intro: [
      "Esnek LED matrix paneller araç camı, vitrin ve küçük tanıtım alanlarında yazı ve basit animasyon göstermek için kullanılır; içerik telefon uygulamasıyla değiştirilir.",
    ],
    whatsapp: "Merhaba, esnek LED matrix panel (ölçü ve adet) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Esnek matrix panel tam renkli LED ekran mıdır?",
        answer:
          "Hayır. Bu paneller kısa yazı ve basit animasyon içindir; video oynatan tam renkli LED ekran için iç ve dış mekân panel sayfalarımıza bakabilirsiniz.",
      },
    ],
  },
  {
    slug: "kablo-aksesuar",
    name: "Kablo ve aksesuarlar",
    h1: "LED ekran kablo, aksesuar ve montaj malzemesi fiyatları",
    title: "LED Ekran Kablo ve Aksesuar Fiyatları | ARLEDSCREEN",
    description:
      "Flat data kablosu, CAT6 ve USB uzatma, power ve RJ45 jack setleri, fan, panel sökücü, poster ayağı, vida ve klips fiyatları. USD, KDV hariç.",
    short: "Data ve güç kabloları, jack setleri, fan, sökücü, ayak ve vida.",
    intro: [
      "LED ekran kurulumu ve bakımında kullanılan kablo, konnektör, jack seti, fan ve montaj malzemeleri bu sayfadadır. Uzunluk ve pin sayısı modül bağlantısına göre seçilir.",
    ],
    whatsapp: "Merhaba, LED ekran kablo / aksesuar (ürün ve adet) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "16 pin ve 26 pin flat kablo farkı nedir?",
        answer:
          "Pin sayısı modülün data girişine göre seçilir; tek renk modüllerde genellikle 16 pin kullanılır. Modül arkasındaki konnektörü kontrol ederek doğru kabloyu seçebilirsiniz.",
      },
    ],
  },
  {
    slug: "led-paneller",
    name: "LED panel varyantları",
    h1: "LED panel varyantları: tek renk P10, GOB, esnek ve kesik paneller",
    title: "Tek Renk P10 ve LED Panel Varyant Fiyatları | ARLEDSCREEN",
    description:
      "Tek renk P10 (DIP / SMD), P10 ve P3.91 dış mekân, P8, P2.5 GOB, P1.86, esnek ve 45° kesik LED panel fiyatları. USD, panel başına, KDV hariç.",
    short: "Tek renk P10, P8, P3.91, GOB, esnek ve 45° kesik paneller.",
    intro: [
      "Bu sayfa, yayımlanmış 12 panel listemizin dışında kalan panel varyantlarını gösterir. Aynı piksel aralığında site fiyatı olan varyantlar o fiyatla listelenir; diğerleri aynı ortam (iç / dış mekân) için ortalama oranla fiyatlandırılmıştır.",
      "12 panel fiyatının tamamı ve m² örnekleri LED ekran fiyatları sayfasındadır. Tek renk P10 paneller kayan yazı ve tabela içindir.",
    ],
    whatsapp: "Merhaba, LED panel (pitch / tek renk / adet) için fiyat almak istiyorum:",
    faqs: [
      {
        question: "Bu panel fiyatları nasıl belirlendi?",
        answer:
          "Aynı piksel aralığı ve ortamda yayımlanmış site fiyatı olan panellerde o fiyat kullanılır. Site fiyatı olmayan panellerde, aynı ortamdaki yayımlanmış panellerin ortalama fiyat oranı uygulanmıştır. Fiyatlar panel başına USD, KDV ve nakliye hariçtir.",
      },
      {
        question: "Tek renk P10 panel ile tam renkli LED ekran aynı mı?",
        answer:
          "Hayır. Tek renk P10 paneller kayan yazı ve metin tabelaları içindir; video ve görsel için tam renkli (RGB) panel kullanılır.",
      },
    ],
  },
];

export interface MaterialModel {
  slug: string;
  category: string;
  itemId: string;
  brand: "NovaStar" | "Huidu";
  /** Short product-type label (own words). */
  type: string;
  note: string;
}

const NS = "NovaStar" as const;
const HD = "Huidu" as const;
export const MATERIAL_MODELS: MaterialModel[] = [
  { slug: "tb10-plus", category: "novastar-alici-gonderici", itemId: "nova-novastar-tb10-plus", brand: NS, type: "medya oynatıcı (gönderici)", note: "Mağaza, vitrin ve küçük reklam ekranlarında depolu içerik yayını için giriş seviyesi Taurus modelidir." },
  { slug: "tb20-plus", category: "novastar-alici-gonderici", itemId: "nova-novastar-tb20-plus", brand: NS, type: "medya oynatıcı (gönderici)", note: "Depolu yayının yanında canlı yayın da gereken küçük ve orta ekranlar için seçilir." },
  { slug: "tb40", category: "novastar-alici-gonderici", itemId: "nova-novastar-tb40", brand: NS, type: "medya oynatıcı (gönderici)", note: "Orta ölçekli reklam ve bilgilendirme ekranlarında canlı ve depolu yayın için kullanılır." },
  { slug: "tb60", category: "novastar-alici-gonderici", itemId: "nova-novastar-tb60", brand: NS, type: "medya oynatıcı (gönderici)", note: "Daha büyük çözünürlüklü cephe ve DOOH ekranlarında tek cihazla yayın için tercih edilir." },
  { slug: "msd300", category: "novastar-alici-gonderici", itemId: "nova-novastar-msd300", brand: NS, type: "gönderici kart", note: "Gönderici karttır; bilgisayardaki görüntüyü canlı olarak alıcı kartlara aktarır." },
  { slug: "mctrl300", category: "novastar-alici-gonderici", itemId: "nova-novastar-mctrl300", brand: NS, type: "gönderici kutu (kontrolör)", note: "Bilgisayardan gelen görüntüyü alıcı kartlara gönderen harici kutudur; sabit kurulumlarda yaygındır." },
  { slug: "mctrl600", category: "novastar-alici-gonderici", itemId: "nova-novastar-mctrl600", brand: NS, type: "gönderici kutu (kontrolör)", note: "Daha büyük piksel alanını tek kutuyla sürmek gereken sabit ekranlarda kullanılır." },
  { slug: "mctrl700", category: "novastar-alici-gonderici", itemId: "nova-novastar-mctrl700", brand: NS, type: "gönderici kutu (kontrolör)", note: "Listede MCTRL600 ile aynı piksel kapasitesindedir; seçim proje ihtiyacına göre birlikte yapılır." },
  { slug: "dh7508-s", category: "novastar-alici-gonderici", itemId: "nova-novastar-dh7508-s", brand: NS, type: "alıcı kart", note: "HUB75 bağlantılı modüllerde kullanılan ekonomik alıcı karttır; her kart ekranın bir bölümünü sürer." },
  { slug: "vx400", category: "video-islemci", itemId: "vp-novastar-vx400", brand: NS, type: "video işlemci (all-in-one)", note: "Toplantı salonu ve küçük sahne ekranlarında ölçekleme ve gönderimi tek cihazda toplar." },
  { slug: "vx1000", category: "video-islemci", itemId: "vp-novastar-vx1000", brand: NS, type: "video işlemci (all-in-one)", note: "Orta ve büyük sahne, etkinlik ve kontrol odası ekranlarında birden çok kaynağı yönetmek için seçilir." },
  { slug: "vx16s", category: "video-islemci", itemId: "vp-novastar-vx16s", brand: NS, type: "video işlemci (all-in-one)", note: "Yüksek çözünürlüklü büyük ekranlarda tek cihazla geniş piksel alanı sürmek için kullanılır." },
  { slug: "hd-vp410h", category: "video-islemci", itemId: "vp-huidu-hd-vp410h", brand: HD, type: "video işlemci", note: "Huidu sistemli orta ölçekli ekranlarda canlı kaynak ölçekleme için ekonomik bir seçenektir." },
  { slug: "hd-vp620-4k", category: "video-islemci", itemId: "vp-huidu-hd-vp620-4k", brand: HD, type: "4K video işlemci", note: "4K kaynakla çalışan geniş ekranlarda ölçekleme ve gönderim için değerlendirilir." },
  { slug: "hd-w62", category: "kontrol-kartlari", itemId: "hd-huidu-hd-w62", brand: HD, type: "tek renk USB + Wi‑Fi kontrol kartı", note: "Orta boy tek renk kayan yazılarda telefondan veya USB ile içerik güncellemek için kullanılır." },
  { slug: "hd-w64a", category: "kontrol-kartlari", itemId: "hd-huidu-hd-w64a", brand: HD, type: "tek renk USB + Wi‑Fi kontrol kartı", note: "Uzun ve yüksek tek renk tabelalarda daha fazla port gerektiğinde seçilir." },
  { slug: "hd-e62", category: "kontrol-kartlari", itemId: "hd-huidu-hd-e62", brand: HD, type: "tek renk USB + ethernet kontrol kartı", note: "Tabelanın ağ kablosuyla bilgisayara bağlanacağı kurulumlar içindir." },
  { slug: "hd-c16l", category: "kontrol-kartlari", itemId: "hdrgb-huidu-hd-c16l", brand: HD, type: "RGB asenkron kontrol kartı", note: "Tam renkli tabela ve vitrin ekranlarında Wi‑Fi ile depolu yayın için kullanılır." },
  { slug: "hd-d16", category: "kontrol-kartlari", itemId: "hdrgb-huidu-hd-d16", brand: HD, type: "RGB video kontrol kartı", note: "Küçük tam renkli ekranlarda video oynatma için HUB75 bağlantılı karttır." },
  { slug: "hd-a3l", category: "kontrol-kartlari", itemId: "hdrgb-huidu-hd-a3l", brand: HD, type: "RGB asenkron oynatıcı", note: "Orta boy tam renkli ekranlarda dahili depolama ile video ve görsel yayını için seçilir." },
  { slug: "hd-h6", category: "kontrol-kartlari", itemId: "hdrgb-huidu-hd-h6", brand: HD, type: "4K RGB oynatıcı", note: "Büyük tam renkli ekranlarda 4K kaynak ve geniş depolama gerektiğinde kullanılır." },
  { slug: "hd-r716", category: "kontrol-kartlari", itemId: "hdrgb-huidu-hd-r716", brand: HD, type: "alıcı kart", note: "Huidu oynatıcıyla çalışan ekranlarda modülleri süren alıcı karttır." },
];

/** Items already described on existing NXTIONSTAR / control model pages. */
export const EXISTING_MODEL_LINKS: Record<string, string> = {
  "hd-huidu-hd-w60": "/tr/products/huidu-kontrol-kartlari/hd-w60/",
  "vp-novastar-vx600": "/tr/products/novastar-kontrolculer/vx600/",
};

export const getMaterialCategory = (slug: string) => MATERIAL_CATEGORIES.find((c) => c.slug === slug);
export const materialSections = (slug: string): MaterialSection[] => MATERIAL_SECTIONS[slug] ?? [];
export const allMaterialItems = (): (MaterialItem & { category: string; section: string })[] =>
  MATERIAL_CATEGORIES.flatMap((c) =>
    materialSections(c.slug).flatMap((s) => s.items.map((i) => ({ ...i, category: c.slug, section: s.title }))),
  );
export const getMaterialItem = (id: string) => allMaterialItems().find((i) => i.id === id);
export const materialModelPath = (m: MaterialModel) => `${MATERIALS_BASE}${m.category}/${m.slug}/`;
export const categoryPath = (slug: string) => `${MATERIALS_BASE}${slug}/`;
export const getMaterialModel = (category: string, slug: string) =>
  MATERIAL_MODELS.find((m) => m.category === category && m.slug === slug);

/** Link for a table row: own model page, existing product page, or none. */
export function itemHref(i: MaterialItem): string | undefined {
  const m = MATERIAL_MODELS.find((x) => x.itemId === i.id);
  if (m) return materialModelPath(m);
  return EXISTING_MODEL_LINKS[i.id] ?? i.modelHref;
}

export type PriceBasis = "liste" | "site" | "oran";
/** Unit price for a row. Panels resolve through prices.ts only. */
export function itemPrice(i: MaterialItem): { usd: number; basis: PriceBasis; ratio?: number } | undefined {
  if (i.panelPriceId) {
    const p = PANEL_PRICES.find((x) => x.id === i.panelPriceId);
    return p ? { usd: p.usd, basis: "site" } : undefined;
  }
  if (i.derivedPriceId) {
    const d = DERIVED_PANEL_PRICES.find((x) => x.id === i.derivedPriceId);
    return d ? { usd: d.usd, basis: "oran", ratio: d.ratio } : undefined;
  }
  return typeof i.usd === "number" ? { usd: i.usd, basis: "liste" } : undefined;
}

/** Price for an existing control model page (HD-W60, VX600). */
export function listPriceForModelPath(path: string): number | undefined {
  const id = Object.entries(EXISTING_MODEL_LINKS).find(([, p]) => p === path)?.[0];
  const it = id ? getMaterialItem(id) : undefined;
  return it?.usd;
}

export function categoryPriceRange(slug: string): { min: number; max: number; count: number } {
  const prices = materialSections(slug).flatMap((s) =>
    s.items.flatMap((i) => [itemPrice(i)?.usd, i.usd2].filter((x): x is number => typeof x === "number")),
  );
  return { min: Math.min(...prices), max: Math.max(...prices), count: prices.length };
}

/** Honest list-price Offer (no free shipping, no stock claim, VAT excluded). */
export function materialOffer(url: string, usd: number, opts: { sku: string; unit?: string; name?: string; brand?: string; description?: string }) {
  return {
    "@type": "Offer" as const,
    "@id": `${url}#offer-${opts.sku}`,
    sku: opts.sku,
    url,
    price: usd.toFixed(2),
    priceCurrency: "USD",
    priceValidUntil: PRICE_VALID_UNTIL,
    itemCondition: "https://schema.org/NewCondition",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: usd.toFixed(2),
      priceCurrency: "USD",
      valueAddedTaxIncluded: false,
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "C62", unitText: opts.unit ?? "adet" },
    },
    description: `${MATERIALS_PRICE_NOTE} Ücretsiz kargo yok.`,
    seller: { "@id": `${SITE_URL}/#organization` },
    availableAtOrFrom: localBusinessRef(),
    ...(opts.name
      ? {
          itemOffered: {
            "@type": "Product" as const,
            name: opts.name,
            sku: opts.sku,
            ...(opts.description ? { description: opts.description } : {}),
            ...(opts.brand ? { brand: { "@type": "Brand" as const, name: opts.brand } } : {}),
          },
        }
      : {}),
  };
}

export const MATERIAL_TOTALS = () => {
  const items = allMaterialItems();
  const pricePoints = items.reduce((n, i) => n + (itemPrice(i) ? 1 : 0) + (typeof i.usd2 === "number" ? 1 : 0), 0);
  return { items: items.length, pricePoints, categories: MATERIAL_CATEGORIES.length, models: MATERIAL_MODELS.length };
};
