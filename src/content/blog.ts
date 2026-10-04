/**
 * ARLEDSCREEN blog posts built from the company's own Instagram posts (@arledscreen).
 * Facts (customer names, sizes, dates) come only from the post captions; general
 * statements match information already published on the site.
 */
export interface BlogImage {
  src: string; // key in image-manifest.json (public/blog/<name>.jpg)
  alt: string;
}
export interface BlogSection {
  h2?: string;
  p: string[];
  list?: string[];
}
export interface BlogPost {
  slug: string;
  title: string; // meta title (without brand suffix)
  h1: string;
  description: string;
  date: string; // ISO date of the Instagram post
  category: "Proje" | "Ürün" | "Uygulama";
  excerpt: string;
  hero: BlogImage;
  gallery?: BlogImage[];
  sections: BlogSection[];
  related?: { href: string; label: string }[];
  /** Optional clip from src/content/videos.ts, shown after the article text. */
  videoSlug?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "256x128-cm-ic-mekan-led-ekran",
    title: "256 × 128 cm İç Mekân LED Ekranda Yüksek Çözünürlük",
    h1: "256 × 128 cm İç Mekân LED Ekranda Yüksek Çözünürlük Deneyimi",
    description:
      "ARLEDSCREEN'in 256 × 128 cm ölçüsündeki iç mekân LED ekran uygulaması: 320 × 160 mm modüllerle kurulan, televizyon yerine kullanılan geniş ve kesintisiz görüntü yüzeyi.",
    date: "2026-04-05",
    category: "Proje",
    excerpt: "Duvara monte edilen 256 × 128 cm LED ekran, klasik televizyon ölçülerinin ötesinde, çerçevesiz ve kesintisiz bir görüntü yüzeyi sunuyor.",
    hero: { src: "/blog/ic-mekan-256x128-led-ekran.jpg", alt: "Salon duvarına monte edilmiş 256 × 128 cm iç mekân LED ekran" },
    gallery: [{ src: "/blog/ic-mekan-256x128-led-ekran-2.jpg", alt: "256 × 128 cm LED ekranda yayın görüntüsü" }],
    sections: [
      {
        p: [
          "Nisan 2026'da paylaştığımız bu uygulamada, iç mekânda kullanılmak üzere 256 × 128 cm ölçüsünde bir LED ekran kurduk. Ekran, salon duvarına sabitlenerek klasik bir televizyonun yerini alacak şekilde konumlandırıldı ve günlük yayın izlemeden sunuma kadar farklı içerikler için kullanılabiliyor. Bu tür uygulamalar, ev ve ofislerde geniş ekran ihtiyacını tek ve kesintisiz bir yüzeyle karşılamak isteyenler için giderek daha çok tercih ediliyor.",
        ],
      },
      {
        h2: "Ölçü modüllerle belirlenir",
        p: [
          "LED ekranlar, tek parça bir panel yerine yan yana birleştirilen modüllerden oluşur. Projelerimizde kullandığımız standart modül ölçüsü 320 × 160 mm'dir; 256 × 128 cm'lik yüzey bu modüllerin yatayda 8, dikeyde 8 adet dizilmesiyle elde edilir. Bu yapı sayesinde ekran, duvar ölçüsüne ve izleme mesafesine göre santimetre hassasiyetinde planlanabilir.",
          "Ekranın 2:1 oranı, geniş açılı izleme ve yan yana birden fazla içerik gösterimi için de rahat bir alan bırakır. Modüller arasında çerçeve bulunmadığından görüntü bütün yüzeyde kesintisiz devam eder.",
        ],
      },
      {
        h2: "Doğru piksel aralığı izleme mesafesine bağlıdır",
        p: [
          "İç mekânda birkaç metreden izlenen ekranlarda daha küçük piksel aralıkları tercih edilir. Hangi P değerinin uygun olduğunu, ekranın konumu ve izleyicinin ekrana olan uzaklığına göre keşif sırasında birlikte belirliyoruz. Ayrıntılı karşılaştırma için piksel aralığı rehberimize göz atabilirsiniz.",
          "Kendi mekânınız için benzer bir ekran düşünüyorsanız duvar ölçüsünü ve kullanım amacını bize iletmeniz yeterlidir; modül sayısını, kontrol sistemini ve montaj detaylarını içeren yazılı teklifimizi hazırlayalım.",
        ],
      },
    ],
    related: [
      { href: "/tr/rehber/piksel-araligi-secimi/", label: "Piksel aralığı nasıl seçilir?" },
      { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran modelleri" },
    ],
  },
  {
    slug: "alanya-white-city-resort-hotel-led-ekran",
    title: "Alanya White City Resort Hotel LED Ekran Kurulumu",
    h1: "Alanya White City Resort Hotel İçin LED Ekran Kurulumu",
    description:
      "ARLEDSCREEN, 21 Aralık 2025'te Alanya'daki White City Resort Hotel'de iç mekân LED ekran kurulumunu tamamladı. Otellerde LED ekran kullanımına dair notlar.",
    date: "2025-12-21",
    category: "Proje",
    excerpt: "Alanya'daki White City Resort Hotel'de, mermer duvar yüzeyine entegre edilen geniş formatlı iç mekân LED ekranın kurulumunu tamamladık.",
    hero: { src: "/blog/alanya-otel-led-ekran.jpg", alt: "Alanya White City Resort Hotel'de mermer duvara entegre edilmiş geniş LED ekran" },
    sections: [
      {
        p: [
          "21 Aralık 2025 tarihinde Alanya'daki White City Resort Hotel için yürüttüğümüz LED ekran kurulumunu tamamladık. Ekran, otelin ortak alanında koyu renkli mermer duvar yüzeyine entegre edilerek mekânın mimarisiyle uyumlu, geniş formatlı bir görüntü alanı oluşturacak şekilde konumlandırıldı. Fotoğrafta ekranın, kurulum sonrası ilk açılışta ARLEDSCREEN logosuyla test edildiği görülüyor.",
        ],
      },
      {
        h2: "Otellerde LED ekran neden tercih ediliyor?",
        p: [
          "Oteller; karşılama alanları, toplantı salonları, restoranlar ve etkinlik alanları gibi gün boyunca farklı amaçlarla kullanılan mekânlara sahiptir. LED ekranlar bu alanlarda tek bir yüzey üzerinden karşılama mesajı, etkinlik programı, tanıtım filmi veya canlı yayın göstermeyi mümkün kılar.",
        ],
        list: [
          "Modüler yapı sayesinde duvar ölçüsüne göre özel boyutlandırma",
          "Çerçevesiz, kesintisiz ve geniş görüntü alanı",
          "İçeriğin merkezi olarak ve hızlıca güncellenebilmesi",
          "Toplantı, düğün ve organizasyonlarda sahne arkası ekran olarak kullanım",
        ],
      },
      {
        p: [
          "Doğru konumlandırılmış bir ekran, misafirin otele girdiği andan itibaren tesisin kimliğini ve hizmetlerini görsel olarak anlatır. Ekranın ölçüsü ve piksel aralığı, izleme mesafesine ve alanın aydınlatma koşullarına göre belirlenir.",
        ],
      },
      {
        h2: "Keşiften teslimata tek ekip",
        p: [
          "ARLEDSCREEN olarak otel projelerinde keşif, ölçülendirme, montaj ve devreye alma adımlarını tek ekip hâlinde yürütüyoruz. Ekranlarda NXTIONSTAR modüllerini kullanıyoruz; NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır ve Türkiye'deki tek satış noktası ARLEDSCREEN'dir.",
          "Konaklama tesisiniz için benzer bir uygulama planlıyorsanız alan ölçülerini ve kullanım senaryosunu paylaşın; size uygun ekran ölçüsünü ve modeli birlikte belirleyelim. Otel projelerinde sezon takvimini dikkate alarak montajı, tesisin işleyişini en az etkileyecek zamana planlıyoruz.",
        ],
      },
    ],
    related: [
      { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran modelleri" },
      { href: "/tr/projelerimiz/", label: "Tamamlanan projelerimiz" },
    ],
  },
  {
    slug: "unye-belediyesi-384x160-p3-led-ekran",
    title: "Ünye Belediyesi İçin 384 × 160 cm P3 Premium LED Ekran",
    h1: "Ünye Belediyesi İçin 384 × 160 cm P3 Premium LED Ekran",
    description:
      "İstanbul Atatürk Havalimanı Millet Bahçesi'ndeki Ordu Günleri'nde Ünye Belediyesi standı için 384 × 160 cm P3 premium LED ekran çalışması.",
    date: "2025-11-23",
    category: "Proje",
    excerpt: "Atatürk Havalimanı Millet Bahçesi'nde düzenlenen Ordu Günleri'nde, Ünye Belediyesi standında 384 × 160 cm P3 premium LED ekran kullanıldı.",
    hero: { src: "/blog/unye-belediyesi-led-ekran.jpg", alt: "Ordu Günleri'nde Ünye Belediyesi standındaki 384 × 160 cm LED ekran" },
    sections: [
      {
        p: [
          "Kasım 2025'te İstanbul'daki Atatürk Havalimanı Millet Bahçesi yerleşkesinde düzenlenen Ordu Günleri etkinliğinde, Ünye Belediyesi'nin standı için LED ekran çalışması gerçekleştirdik. Standda 384 × 160 cm ölçüsünde, P3 premium seri bir LED ekran kullanıldı. Fotoğrafta, ekranın stant tasarımının bir parçası olarak ziyaretçilerin rahatça görebileceği bir konuma yerleştirildiği görülüyor.",
        ],
      },
      {
        h2: "Fuar ve etkinlik alanlarında LED ekran",
        p: [
          "Kalabalık etkinlik alanlarında, yüzlerce stant arasında öne çıkmak için güçlü bir görsel unsur gerekir. Standın uzaktan fark edilmesi ve ziyaretçinin dikkatinin kısa sürede çekilmesi bu nedenle önemlidir. Geniş formatlı bir LED ekran; şehir tanıtım filmlerini, etkinlik programını ve görsel içerikleri yüksek parlaklıkla aynı anda çok sayıda ziyaretçiye ulaştırır.",
          "Bu projede kullanılan NXTIONSTAR P3 premium seri, canlı renkleri ve yüksek parlaklığıyla yakın mesafeden izlendiğinde dahi detaylı bir görüntü sunacak şekilde tercih edildi. 3 mm piksel aralığı, stant önünde birkaç metreden izleyen ziyaretçiler için netlik ile bütçe arasında dengeli bir seçimdir.",
        ],
      },
      {
        h2: "Kamu kurumları ve belediyeler için çözümler",
        p: [
          "Belediyeler ve kamu kurumları için tanıtım standı, bilgilendirme ekranı ve etkinlik alanı uygulamalarında keşif, montaj ve teknik destek hizmeti veriyoruz. Ekranlarda kullandığımız NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir.",
          "Kurumunuzun etkinlik veya tanıtım projesi için ölçü ve tarih bilgisini paylaşmanız, size uygun çözümü planlamamız için yeterlidir. Geçici etkinliklerde ekranın kurulumu ve sökümü de dahil olmak üzere süreci baştan sona planlıyoruz.",
        ],
      },
    ],
    related: [
      { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran modelleri" },
      { href: "/tr/projelerimiz/", label: "Tamamlanan projelerimiz" },
    ],
  },
  {
    slug: "kafe-ve-restoranlar-icin-led-ekran",
    title: "Kafe ve Restoranlar İçin LED Ekran Çözümleri",
    h1: "Kafe ve Restoranlar İçin LED Ekran: Maç Yayınından Kampanya Duyurusuna",
    description:
      "Kafe ve restoranlarda LED ekran kullanımı: maç yayınları, menü tanıtımları, kampanya ve günlük fırsat duyuruları için ARLEDSCREEN'in işletmelere sunduğu çözümler.",
    date: "2025-08-17",
    category: "Uygulama",
    excerpt: "Geniş bir LED ekran; maç yayınlarından menü ve kampanya duyurularına kadar kafe ve restoranlarda müşteri deneyimini doğrudan etkiliyor.",
    hero: { src: "/blog/kafe-restoran-led-ekran.jpg", alt: "Bir restoranın oturma alanında maç yayını gösteren geniş LED ekran" },
    sections: [
      {
        p: [
          "Kafe ve restoranlar, LED ekranın en hızlı karşılığını aldığı işletmelerin başında gelir. Ağustos 2025'te paylaştığımız bu uygulamada, restoranın oturma alanına yerleştirilen geniş formatlı LED ekran, maç yayınlarını tüm salondan rahatça izlenebilir hâle getiriyor. Büyük ekranda yayınlanan bir maç, müşterilerin işletmede daha uzun süre kalmasını ve aynı heyecanı birlikte yaşamasını sağlar.",
        ],
      },
      {
        h2: "Bir ekran, birçok kullanım",
        p: ["LED ekran, işletmenin gün içindeki ihtiyacına göre farklı içerikler için kullanılabilir:"],
        list: [
          "Maç ve canlı yayınlar",
          "Menü ve ürün tanıtımları",
          "Kampanya ve günlük fırsat duyuruları",
          "Marka ve sosyal medya içerikleri",
        ],
      },
      {
        h2: "Klasik tabelanın yerine dinamik görüntü",
        p: [
          "Geleneksel tabelalar yalnızca tek bir mesaj taşır. Yüksek çözünürlüklü bir LED ekran ise içeriği istediğiniz an değiştirmenize olanak tanır ve işletmenize modern bir görünüm kazandırır. Vitrine veya cepheye yerleştirilen ekranlar gün ışığında da dikkat çeker; iç mekândaki ekranlar ise müşterinin işletmede geçirdiği süreyi daha keyifli hâle getirir.",
          "Ekranın ölçüsü, oturma düzeni ve izleme mesafesine göre belirlenir. Dış mekân veya vitrin uygulamalarında koruma sınıfı ve parlaklık; iç mekânda ise piksel aralığı öne çıkan kriterlerdir.",
        ],
      },
      {
        h2: "Keşif ve teklif",
        p: [
          "ARLEDSCREEN olarak işletmenizi yerinde inceleyip uygun ekran ölçüsünü ve modeli öneriyor, montajdan içerik yönetimi kurulumuna kadar tüm süreci üstleniyoruz. Ekranlarda kullandığımız NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Mekânınızın ölçülerini ve ekranı yerleştirmeyi düşündüğünüz alanın fotoğrafını WhatsApp üzerinden paylaşabilir veya teklif formunu doldurabilirsiniz.",
        ],
      },
    ],
    related: [
      { href: "/tr/rehber/led-tabela-mi-led-ekran-mi/", label: "LED tabela mı, LED ekran mı?" },
      { href: "/tr/rehber/led-ekran-fiyatlari/", label: "LED ekran fiyatları neye göre değişir?" },
      { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran modelleri" },
    ],
  },
  {
    slug: "eskisehir-sigorta-subesi-led-ekran",
    title: "Eskişehir'de Sigorta Şubesi İçin LED Ekran Uygulaması",
    h1: "Eskişehir'de Sigorta Şubesi İçin NXTIONSTAR LED Ekran Uygulaması",
    description:
      "Sinan Polat Sigorta Eskişehir Şubesi için NXTIONSTAR LED ekran uygulaması tamamlanarak teslim edildi. Montaj sürecinden kareler ve proje notları.",
    date: "2025-08-14",
    category: "Proje",
    excerpt: "Sinan Polat Sigorta'nın Eskişehir Şubesi için gerçekleştirdiğimiz NXTIONSTAR LED ekran uygulaması tamamlanarak teslim edildi.",
    hero: { src: "/blog/eskisehir-sigorta-led-ekran.jpg", alt: "Eskişehir'deki sigorta şubesinde LED ekran modüllerinin montajı" },
    gallery: [
      { src: "/blog/eskisehir-sigorta-led-ekran-2.jpg", alt: "Şube duvarında LED ekran kabinlerinin kablolanması" },
      { src: "/blog/eskisehir-sigorta-led-ekran-3.jpg", alt: "LED ekran montajı sırasında modüllerin test edilmesi" },
    ],
    sections: [
      {
        p: [
          "Ağustos 2025'te Sinan Polat Sigorta'nın Eskişehir Şubesi için LED ekran uygulamasını tamamlayarak teslim ettik. Ekran, şubenin iç mekânında duvar yüzeyine monte edildi. Sigorta acenteleri, bankalar ve hizmet ofisleri gibi müşteriyle yüz yüze çalışan işletmelerde LED ekran; kampanyaları, hizmet başlıklarını ve kurumsal kimliği tek bir yüzeyde, dikkat çekici biçimde sunmanın etkili bir yoludur.",
        ],
      },
      {
        h2: "Montaj süreci",
        p: [
          "Ekranın konumu ve ölçüsü, keşif sırasında şubenin iç düzenine ve müşterinin ekranı göreceği noktalara göre belirlendi. Duvara monte edilen LED ekranlarda kabinler yerine yerleştirildikten sonra güç ve veri kablolaması yapılır. Modüller takıldıktan sonra ekran bölüm bölüm test edildi ve renk uyumu kontrol edilerek teslime hazır hâle getirildi. Fotoğraflar, bu şubedeki kurulum sırasında ekibimizin sahadaki çalışmasını gösteriyor. Montajın ardından ekranın kullanımı ve içerik yükleme adımları işletmeyle paylaşılarak teslim süreci tamamlanır.",
        ],
      },
      {
        h2: "NXTIONSTAR LED ekranlarda öne çıkanlar",
        p: ["Projede kullanılan NXTIONSTAR LED ekranlar, mesajın şubeye gelen müşterilere net biçimde ulaşması gözetilerek seçildi:"],
        list: [
          "Yüksek parlaklık ve canlı renkler",
          "Keskin ve detaylı görüntü",
          "Ölçüye ve konsepte göre özel tasarım",
        ],
      },
      {
        p: [
          "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Mağaza vitrininden kafe, ofis ve şube içi uygulamalara kadar işletmenizin ihtiyacına uygun çözümü keşif sonrası birlikte belirliyoruz. Şubeniz veya mağazanız için ekran ölçüsünü ve konumunu paylaşmanız, yazılı teklifimizi hazırlamamız için yeterlidir.",
        ],
      },
    ],
    related: [
      { href: "/tr/hizmetler/", label: "Keşif, montaj ve servis hizmetlerimiz" },
      { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran modelleri" },
    ],    videoSlug: "eskisehir-sigorta-led-ekran-vitrin",
  },
  {
    slug: "ic-mekan-led-ekran-ile-markanizi-gorunur-kilin",
    title: "İç Mekân LED Ekranla Markanızı İçeride de Görünür Kılın",
    h1: "İç Mekân LED Ekranla Markanızı İçeride de Görünür Kılın",
    description:
      "NXTIONSTAR iç mekân LED ekran sistemleri: mağaza, showroom, alışveriş merkezi, otel, galeri ve fuar alanları için kurulum, kalibrasyon ve içerik yönetimi.",
    date: "2025-08-03",
    category: "Ürün",
    excerpt: "Statik afişlerin yerini alan iç mekân LED ekranlar; mağaza içi kampanyalardan showroom ve fuar alanlarına kadar markanızı dijital olarak öne çıkarıyor.",
    hero: { src: "/blog/ic-mekan-led-ekran-kalibrasyon.jpg", alt: "Kurulumu tamamlanan iç mekân LED ekranda kabin yerleşiminin yazılımla ayarlanması" },
    gallery: [
      { src: "/blog/ic-mekan-led-ekran-montaj.jpg", alt: "İç mekân LED ekranın arka yüzünde kabin ve kablo bağlantıları" },
      { src: "/blog/ic-mekan-led-ekran-kabin.jpg", alt: "Duvara yerleştirilen iç mekân LED ekran kabinleri" },
    ],
    sections: [
      {
        p: [
          "NXTIONSTAR iç mekân LED ekran sistemleri; yüksek çözünürlük, zarif tasarım ve dinamik içerik yönetimi ile kapalı alanlarda markanızı dijital bir güce dönüştürür. Statik afişlerin dönemi geride kalıyor. Onların yerini alan bu ekranlar, içeride de dikkat çekmeyi, satın alma kararlarını etkilemeyi ve müşteri deneyimini geliştirmeyi mümkün kılar.",
        ],
      },
      {
        h2: "Hangi alanlarda kullanılır?",
        list: [
          "Mağaza içi kampanya ve ürün tanıtımları",
          "Kurumsal showroom'lar",
          "Alışveriş merkezleri",
          "Otel, galeri ve fuar alanları",
        ],
        p: [],
      },
      {
        h2: "Kurulum ve kalibrasyon",
        p: [
          "Fotoğraflar, bir iç mekân ekranının kurulum aşamalarını gösteriyor. Kabinler duvara yerleştirildikten sonra güç ve veri bağlantıları tamamlanıyor; ardından kontrol yazılımı üzerinden kabinlerin yerleşimi tanımlanarak ekran tek ve kesintisiz bir görüntü yüzeyi olarak çalışacak şekilde ayarlanıyor.",
          "Bu adım, görüntünün doğru sırayla ve tüm yüzeyde aynı renk dengesiyle gösterilmesi için kritik önemdedir. Kalibrasyonu doğru yapılmamış bir ekranda kabinler arasında ton farkları veya kayan görüntü bölümleri oluşabilir. Kurulumun ardından içerik yönetimi yapılandırılarak ekran işletmeye teslim ediliyor; işletme, içeriklerini bilgisayar üzerinden kolayca güncelleyebiliyor.",
        ],
      },
      {
        h2: "Ekran değil, etki tasarlıyoruz",
        p: [
          "ARLEDSCREEN olarak profesyonel kurulum, içerik desteği ve satış sonrası teknik hizmetle projenin her aşamasında yanınızdayız. Ekranlarda kullandığımız NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Mekânınıza uygun ölçü ve model için bizimle iletişime geçebilirsiniz; ekranın konumunu, izleme mesafesini ve göstermek istediğiniz içerik türünü paylaşmanız, doğru piksel aralığını belirlememiz için yeterlidir.",
        ],
      },
    ],
    related: [
      { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran modelleri" },
      { href: "/tr/rehber/piksel-araligi-secimi/", label: "Piksel aralığı nasıl seçilir?" },
    ],
  },
];

export const getBlogPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
export const blogPath = (slug: string) => `/tr/blog/${slug}/`;
/**
 * Public URL of an original blog photo (used for og:image / JSON-LD).
 * Originals live in public/opt/blog/ because the legacy "/blog/*" 301 rule in
 * _redirects would otherwise redirect /blog/<file>.jpg to /tr/rehber/.
 */
export const blogImageUrl = (src: string) => src.replace(/^\/blog\//, "/opt/blog/");
export const latestBlogPosts = (n: number) => [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
export const formatBlogDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
