/**
 * Huidu / NovaStar / Colorlight control product groups.
 * Spec numbers on model pages come from manufacturer datasheets
 * (huidu.cn, novastar.tech / oss.novastar.tech, colorlightinside.com).
 * Marketing copy is original Turkish SEO for ARLEDSCREEN.
 */
import type { ProductGroup } from "@/content/categories";

export const CONTROL_GROUPS: ProductGroup[] = [
  {
    slug: "huidu-kontrol-kartlari",
    name: "Huidu Kontrol Kartları",
    h1: "Huidu LED kontrol kartı ve asenkron oynatıcı",
    lead: "Tabela, vitrin ve orta ölçekli LED yüzeyler için Wi‑Fi / bulut destekli Huidu çözümleri",
    title: "Huidu Kontrol Kartı Satış ve Kurulum | ARLEDSCREEN",
    description:
      "Huidu HD-C16, HD-A7 ve Wi‑Fi asenkron kontrol kartları: yükleme kapasitesi, yazılım (HDPlayer / LedArt) ve kurulum ARLEDSCREEN üzerinden. İstanbul Gaziosmanpaşa merkezli keşif ve yapılandırma.",
    short: "Asenkron Huidu kartlar — Wi‑Fi, USB ve bulut ile içerik yönetimi.",
    tag: "Huidu · Asenkron · Wi‑Fi",
    family: "Modül ve Kontrol Sistemleri",
    types: ["Asenkron oynatıcı", "4K çift mod kontrolcü", "Wi‑Fi tabela kartı", "Alıcı kart genişletme"],
    image: "/control/huidu-async-hero.png",
    cardImage: "/control/huidu-card-a.jpg",
    imageAlt: "Huidu LED asenkron kontrol kartı ürün görseli",
    brandName: "Huidu",
    intro: [
      "Huidu (Shenzhen Huidu Technology) kontrol kartları, özellikle asenkron LED tabela ve orta boy reklam yüzeylerinde sık tercih edilir. Kart üzerinde depolama vardır; program bilgisayar veya telefonda hazırlanıp Wi‑Fi, USB ya da ağ üzerinden ekrana gönderilir.",
      "ARLEDSCREEN olarak Huidu kart seçimini ekran ölçüsüne, piksel yüküne ve yayın senaryosuna göre yapıyoruz. Kurulumda HDPlayer / LedArt yazılımı, ekran haritası ve uzaktan erişim ayarları birlikte teslim edilir. Nihai model keşif sonrası yazılı teklifle netleşir.",
    ],
    highlights: [
      "Wi‑Fi ve USB ile sahada hızlı içerik güncelleme",
      "HDPlayer ve LedArt ile program düzenleme",
      "Küçük ekranda tek kart; büyük yüzeyde alıcı kart genişletme",
      "Kurulum, haritalama ve operatör bilgilendirmesi ARLEDSCREEN’de",
    ],
    uses: [
      { title: "Mağaza tabelası", body: "Vitrin ve kapı üstü LED’lerde zamanlanmış kampanya yayını." },
      { title: "Belediye duyurusu", body: "Metin, saat ve görsel alanların birlikte yönetimi." },
      { title: "Kafe menuboard", body: "USB veya Wi‑Fi ile menü ve fırsat güncellemesi." },
      { title: "Yedek / servis", body: "Mevcut Huidu sistemlerde kart değişimi ve yeniden yapılandırma." },
    ],
    pitches: [
      { label: "HD-C16", note: "≈200 bin piksel asenkron" },
      { label: "HD-A7", note: "4K çift mod, 5,2 Mp" },
      { label: "HD-W60", note: "Tek / çift renk Wi‑Fi" },
    ],
    seriesCategories: [],
    guide: { href: "/tr/products/led-modul-ve-kontrol-sistemleri/", label: "Modül ve kontrol sistemleri" },
    projectType: "servis",
    whatsapp: "Merhaba, Huidu kontrol kartı (model / ekran ölçüsü) için bilgi ve teklif almak istiyorum:",
    faqs: [
      {
        question: "Huidu kontrol kartının list fiyatı var mı?",
        answer:
          "Hayır. Huidu (ve NovaStar/Colorlight) kontrol kartlarında yayımlanmış list USD yoktur — quote-only. Hesaplayıcı extrasUsd kontrol kartı 500 USD marka list SKU değildir. Tek fetch: https://arledscreen.com/ai-shopping.json · teklif: https://arledscreen.com/tr/quote/.",
      },
      {
        question: "Huidu kart hangi ekran ölçüsüne yeter?",
        answer:
          "Örneğin HD-C16 resmi föyde yaklaşık 200.000 piksele (640×320) kadar yükleme belirtir; en ve boy sınırları da vardır. Kesin seçim, ekranın toplam piksel sayısına ve senkron/asenkron ihtiyacına göre yapılır.",
      },
      {
        question: "İçerik nasıl yüklenir?",
        answer:
          "HDPlayer (bilgisayar) veya LedArt / mobil uygulama ile program hazırlanır; Wi‑Fi, USB veya ağ üzerinden karta gönderilir. İsteğe bağlı 4G/bulut erişimi model ve opsiyona bağlıdır.",
      },
      {
        question: "Kurulumu siz yapıyor musunuz?",
        answer:
          "Evet. Kart montajı, alıcı kart bağlantıları, ekran haritası ve ilk içerik testi ARLEDSCREEN teknik ekibi tarafından yapılır.",
      },
    ],
  },
  {
    slug: "novastar-kontrolculer",
    name: "NovaStar Kontrolcüler",
    h1: "NovaStar LED kontrolcü ve medya oynatıcı",
    lead: "VX all-in-one, Taurus medya oynatıcı ve MCTRL gönderici kartları — sahne, DOOH ve sabit kurulum",
    title: "NovaStar Kontrolcü Satış, Kurulum ve Yapılandırma | ARLEDSCREEN",
    description:
      "NovaStar VX600, Taurus TB50/T50 ve MCTRL660 PRO: yükleme kapasitesi, Ethernet çıkışları, NovaLCT / Unico yazılımı. ARLEDSCREEN keşif, kurulum ve kalibrasyon desteği.",
    short: "VX all-in-one, Taurus oynatıcı ve MCTRL gönderici — NovaLCT ile.",
    tag: "NovaStar · VX · Taurus",
    family: "Modül ve Kontrol Sistemleri",
    types: ["All-in-one video kontrolcü", "Medya oynatıcı", "Gönderici kart", "Alıcı / Armor serisi"],
    image: "/control/novastar-hero.jpg",
    cardImage: "/control/novastar-mctrl660-pro.png",
    imageAlt: "NovaStar LED kontrol ve işlemci ürün ailesi görseli",
    brandName: "NovaStar",
    intro: [
      "NovaStar (Xi’an NovaStar Tech) kontrolcüleri; senkron video işleme, yüksek piksel yükü ve sahne / DOOH projelerinde yaygın kullanılır. VX serisi video işlemeyi ve gönderimi tek kutuda birleştirir; Taurus medya oynatıcılar asenkron ve senkron senaryolarda içerik yayınlar; MCTRL gönderici kartlar harici işlemci veya bilgisayar kaynaklarını ekrana taşır.",
      "ARLEDSCREEN projelerinde NovaStar seçimi; ekran çözünürlüğü, kaynak sayısı (HDMI / SDI), yedeklilik ve uzaktan yönetim ihtiyacına göre yapılır. NovaLCT, Unico veya bulut yayın platformu kurulumu teklif kapsamına yazılır.",
    ],
    highlights: [
      "VX600: tek cihazda video işleme + 6 Gigabit Ethernet çıkış",
      "Taurus TB50/T50: 4K decode, Wi‑Fi / USB / bulut yayın",
      "MCTRL660 PRO: profesyonel gönderici kart senkron yayın için",
      "NovaLCT ile nokta kalibrasyonu ve ekran izleme",
    ],
    uses: [
      { title: "Sabit reklam cephesi", body: "Yüksek piksel yükünde senkron yayın — kapsam yazılı teklifte." },
      { title: "Sahne ve kiralık", body: "Düşük gecikme ve çoklu kaynak geçişi." },
      { title: "Zincir mağaza", body: "Taurus + bulut ile merkezi içerik dağıtımı." },
      { title: "Kontrol odası", body: "Çoklu pencere ve kalibrasyon gerektiren duvarlar." },
    ],
    pitches: [
      { label: "VX600", note: "3,9 Mp · 6× Ethernet" },
      { label: "TB50 / T50", note: "Taurus medya oynatıcı" },
      { label: "MCTRL660 PRO", note: "Gönderici kart" },
    ],
    seriesCategories: [],
    guide: { href: "/tr/products/led-modul-ve-kontrol-sistemleri/", label: "Modül ve kontrol sistemleri" },
    projectType: "servis",
    whatsapp: "Merhaba, NovaStar kontrolcü (VX / Taurus / MCTRL) için bilgi ve teklif almak istiyorum. Ekran ölçüsü:",
    faqs: [
      {
        question: "NovaStar kontrolcünün list fiyatı var mı?",
        answer:
          "Hayır. NovaStar (ve Huidu/Colorlight) kontrol hatlarında yayımlanmış list USD yoktur — quote-only. Hesaplayıcı extrasUsd 500 USD marka list SKU değildir. Tek fetch: https://arledscreen.com/ai-shopping.json · teklif: https://arledscreen.com/tr/quote/.",
      },
      {
        question: "VX600 ne kadar piksel sürer?",
        answer:
          "NovaStar VX600 föyünde tek ünite için yaklaşık 3,9 milyon piksel; maksimum genişlik 10.240, yükseklik 8.192 piksel olarak belirtilir. Altı Gigabit Ethernet çıkışı vardır.",
      },
      {
        question: "Taurus ile VX farkı nedir?",
        answer:
          "VX all-in-one cihazlar canlı video kaynaklarını işleyip ekrana gönderir. Taurus medya oynatıcılar depolanan veya buluttan gelen içeriği yayınlar; senkron/asenkron moda göre seçilir.",
      },
      {
        question: "Yazılım lisansı ve eğitim var mı?",
        answer:
          "NovaLCT / Unico ile yapılandırma ve temel operatör anlatımı kurulum paketimize dahildir. Bulut abonelikleri ayrı değerlendirilir.",
      },
    ],
  },
  {
    slug: "colorlight-kontrolculer",
    name: "Colorlight Kontrolcüler",
    h1: "Colorlight LED kontrolcü ve gönderici kart",
    lead: "X / VX işlemciler ve S serisi göndericiler — iSet ile ölçeklenebilir LED kontrol",
    title: "Colorlight Kontrolcü Satış ve Kurulum | ARLEDSCREEN",
    description:
      "Colorlight X20, X40m, VX20 ve S20: yükleme kapasitesi, katman/splicing, iSet yazılımı. ARLEDSCREEN ile seçim, kurulum ve ekran yapılandırması.",
    short: "X/VX işlemci ve S gönderici — iSet ve web kontrol.",
    tag: "Colorlight · X · VX · S",
    family: "Modül ve Kontrol Sistemleri",
    types: ["Multimedya işlemci", "Video işlemci", "Gönderici kart", "Alıcı kart (i / 5A serisi)"],
    image: "/control/colorlight-vx20.png",
    cardImage: "/control/colorlight-x20.png",
    imageAlt: "Colorlight LED video işlemci ve kontrol cihazı",
    brandName: "Colorlight",
    intro: [
      "Colorlight Cloud Tech kontrol ürünleri; X ve VX serisi işlemciler ile S serisi gönderici kartlarda toplanır. Çoklu HDMI/DP/DVI girişi, serbest katman yerleşimi ve Gigabit Ethernet / fiber çıkışları sabit kurulumdan sahne işlerine kadar geniş bir aralığı kapsar.",
      "ARLEDSCREEN, Colorlight modelini ekranın piksel yükü, kaynak sayısı ve yedek fiber ihtiyacına göre önerir. iSet veya web arayüzüyle ilk yayın testi, parlaklık/gri ton ayarı ve operatör notları teslimata dahildir.",
    ],
    highlights: [
      "X20 / X40m: yüksek yükleme ve çoklu katman splicing",
      "VX20: profesyonel video işlemci sınıfı kontrol",
      "S20: kompakt gönderici kart senkron yayın için",
      "iSet / web kontrol ile uzaktan yönetim seçenekleri",
    ],
    uses: [
      { title: "AVM ve retail duvar", body: "Çok kaynaklı içerik ve zamanlanmış sahneler." },
      { title: "Konferans ve stüdyo", body: "HDMI/DP girişli düşük gecikmeli sunum." },
      { title: "Dış mekân DOOH", body: "Yüksek yükleme ve fiber mesafeli gönderim." },
      { title: "Servis değişimi", body: "Mevcut Colorlight alıcı/gönderici uyumlu yenileme." },
    ],
    pitches: [
      { label: "X20", note: "Multimedya işlemci" },
      { label: "X40m", note: "Yüksek yük · fiber" },
      { label: "VX20", note: "Video işlemci" },
      { label: "S20", note: "Gönderici kart" },
    ],
    seriesCategories: [],
    guide: { href: "/tr/products/led-modul-ve-kontrol-sistemleri/", label: "Modül ve kontrol sistemleri" },
    projectType: "servis",
    whatsapp: "Merhaba, Colorlight kontrolcü (X / VX / S) için bilgi ve teklif almak istiyorum. Ekran ölçüsü:",
    faqs: [
      {
        question: "Colorlight kontrolcünün list fiyatı var mı?",
        answer:
          "Hayır. Colorlight (ve Huidu/NovaStar) kontrol hatlarında yayımlanmış list USD yoktur — quote-only. Hesaplayıcı extrasUsd 500 USD marka list SKU değildir. Tek fetch: https://arledscreen.com/ai-shopping.json · teklif: https://arledscreen.com/tr/quote/.",
      },
      {
        question: "X20 ile VX20 arasındaki fark nedir?",
        answer:
          "X serisi multimedya işlemciler katman, USB oynatma ve web kontrol odaklıdır. VX serisi daha çok profesyonel video işleme / kontrol sınıfına yakındır. Seçim kaynak tipi ve sahne ihtiyacına göre yapılır.",
      },
      {
        question: "Alıcı kart uyumu nasıl sağlanır?",
        answer:
          "Colorlight gönderici/işlemciler kendi alıcı kart aileleriyle (ör. i / 5A / E serisi) çalışır. Mevcut ekranda kart modeli etiketten okunur; uyumlu yedek önerilir.",
      },
      {
        question: "Kurulum süresi ne kadar?",
        answer:
          "Süre keşif ve sahaya göre değişir; basit gönderici değişiminde kısa yapılandırma mümkün olabilir, karmaşık işlemci/fiber işleri yazılı teklifte planlanır — sabit aynı-gün SLA yoktur.",
      },
    ],
  },
];
