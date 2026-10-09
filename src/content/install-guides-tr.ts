/** TR metinleri: LED ekran kurulum rehberleri (bkz. install-guides.ts). */
import type { InstallGuide, InstallGuideSlug } from "@/content/install-guides";
import { HUIDU_SOURCES, NOVASTAR_SOURCES } from "@/content/install-guide-sources";

const HUB: InstallGuide = {
  slug: "led-ekran-kurulumu",
  title: "LED Ekran Kurulumu Adım Adım: Montaj ve Ayar | ARLEDSCREEN",
  description:
    "LED ekran kurulumu adım adım: montaj, güç ve veri kablolaması, senkron ve asenkron kontrol, ilk çalıştırma, tarama dosyası yükleme ve yönetim programları.",
  keywords: [
    "LED ekran kurulumu",
    "LED ekran montajı",
    "LED ekran nasıl kurulur",
    "tarama dosyası",
    "alıcı kart ayarı",
    "kontrol kartı",
    "Huidu",
    "NovaStar",
    "ARLEDSCREEN",
  ],
  h1: "LED ekran kurulumu adım adım",
  intro:
    "Bir LED ekranın kurulumu iki bölümden oluşur: önce fiziksel montaj ve kablolama yapılır, ardından kontrol sistemi bilgisayardan ya da telefondan ayarlanır. Bu rehberde ekranın duvara asılmasından ilk görüntünün gelmesine, tarama dosyasının yüklenmesinden içerik gönderen yönetim programlarına kadar sırayı sade bir dille anlattık. Huidu ve NovaStar için ayrıntılı adımlar ayrı sayfalarda.",
  image: {
    src: "/projects/install-wiring.jpg",
    alt: "Montaj sırasında arkası açık LED ekran: kabinler, güç kaynakları, alıcı kartlar ve ağ kabloları",
    fit: "cover",
  },
  quickSteps: [
    { name: "Hazırlık", text: "Ölçüyü, taşıyıcı duvarı veya konstrüksiyonu, elektrik hattını ve servis erişimini netleştirin." },
    { name: "Montaj", text: "Konstrüksiyonu terazisinde kurun, kabinleri veya modülleri boşluksuz ve aynı hizada yerleştirin." },
    { name: "Güç kablolaması", text: "Güç kaynaklarını yetkili bir elektrikçiye, topraklı ve uygun sigortalı bir hatta bağlatın." },
    { name: "Veri kablolaması", text: "Kontrol kartından alıcı kartlara giden ağ kablolarını planladığınız sırayla zincirleyin." },
    { name: "İlk çalıştırma", text: "Enerjiyi verin; bilgisayarı veya telefonu kontrol kartına kablo ya da Wi-Fi ile bağlayın." },
    { name: "Tarama dosyası", text: "Modülünüze ait alıcı kart yapılandırma (tarama) dosyasını yükleyin, test edin ve karta kalıcı olarak kaydedin." },
    { name: "Ekran bağlantısı", text: "Alıcı kartların sırasını yazılımda tanımlayın, görüntünün bütün ekranda doğru yerleştiğini kontrol edin." },
    { name: "İçerik ve ayarlar", text: "Yönetim programıyla içerik gönderin; parlaklık, zamanlama ve saat ayarlarını yapın, yapılandırmanın yedeğini alın." },
  ],
  sections: [
    {
      h2: "Kurulumdan önce: yer, elektrik ve erişim",
      paragraphs: [
        "Kurulumun büyük kısmı ekran gelmeden önce planlanır. Ekranın asılacağı duvar ya da çelik konstrüksiyon ekranın ağırlığını güvenle taşıyabilmeli; dış mekânda rüzgâr ve yağmur da hesaba katılmalıdır.",
        "Servis için ekrana arkadan mı yoksa önden mi ulaşılacağına baştan karar verin. Arkadan servis edilen ekranlarda arkada çalışma boşluğu gerekir; önden servis edilen modüller ise duvara yakın kurulumlarda işi kolaylaştırır.",
      ],
      bullets: [
        "Ekran ölçüsü ve piksel aralığı izleme mesafesine göre seçilmiş olmalı.",
        "Ekranın toplam gücüne uygun, topraklı ve sigortalı bir elektrik hattı hazırlanmalı.",
        "İçeriğin nereden geleceği (bilgisayar, medya oynatıcı, USB bellek, telefon) belli olmalı.",
        "Kapalı kasalarda ısının dışarı atılabilmesi için havalandırma düşünülmeli.",
      ],
    },
    {
      h2: "Fiziksel montaj",
      paragraphs: [
        "Önce taşıyıcı konstrüksiyon ya da duvar profilleri terazisinde kurulur. Kabinler veya modüller alttan başlanarak yerleştirilir; aralarında boşluk ve kot farkı kalmamasına dikkat edilir. Küçük bir kot farkı bile ekran açıldığında çizgi veya gölge olarak görünür.",
        "Modüllerin arkasında genellikle veri akış yönünü gösteren bir ok veya etiket bulunur. Bütün modüllerin aynı yöne bakması gerekir; ters takılan bir modül ekran açıldığında karışık görüntü verir.",
      ],
    },
    {
      h2: "Güç ve veri kablolaması",
      paragraphs: [
        "Her kabinde veya modül grubunda bir güç kaynağı (adaptör) ve bir alıcı kart bulunur. Güç kaynakları şebekeye, modüller güç kaynaklarına bağlanır. Elektrik bağlantısını mutlaka yetkili bir elektrikçi yapmalı; topraklama ve hat sigortası atlanmamalıdır.",
        "Veri tarafında kontrol kartından (veya gönderici karttan) çıkan ağ kablosu ilk alıcı karta girer, oradan bir sonrakine geçer ve zincir böyle devam eder. Bu zincirin hangi kabinden başlayıp hangi yöne ilerlediğini bir kâğıda çizmek, yazılımdaki “ekran bağlantısı” adımını çok kolaylaştırır. Alıcı kart ile modüller arasındaki yassı veri kabloları da yönüne dikkat edilerek takılır.",
      ],
    },
    {
      h2: "Kontrol sistemi: senkron mu, asenkron mu?",
      paragraphs: [
        "Senkron sistemde ekran, bağlı olduğu bilgisayarın veya video kaynağının görüntüsünü anlık olarak gösterir. Kaynak kapanınca ekranda görüntü de kesilir. Sahne, konferans salonu ve canlı yayın gibi kullanımlarda tercih edilir.",
        "Asenkron sistemde içerik önceden kontrol kartının hafızasına yüklenir ve kart, bilgisayar kapalıyken de kendi programına göre oynatır. Mağaza, cephe, tabela ve menü ekranlarında yaygındır. Bazı cihazlar iki modu da destekler ve ihtiyaca göre birinden diğerine geçilebilir.",
        "ARLEDSCREEN projelerinde Huidu, NovaStar ve Colorlight kontrol sistemleri kullanılır. Üçünde de kurulum mantığı aynıdır, değişen yazılımın adı ve menüleridir.",
      ],
    },
    {
      h2: "İlk çalıştırma ve tarama dosyası",
      paragraphs: [
        "Enerji ilk verildiğinde ekranda karışık çizgiler, bölünmüş görüntü ya da yanlış renkler görmek normaldir. Bunun sebebi alıcı kartın henüz modülü tanımamasıdır. Alıcı karta modülün nasıl sürüleceğini anlatan ayar dosyası yüklendiğinde görüntü düzelir.",
        "Sahada buna çoğunlukla “tarama dosyası” denir. Dosyada modülün piksel sayısı, tarama tipi, sürücü çipi ve veri yönü gibi bilgiler bulunur. NovaStar sistemlerinde bu dosya alıcı kart yapılandırma dosyasıdır (.rcfgx veya .rcfg uzantılı). Huidu sistemlerinde ise donanım ayarlarındaki alıcı kart parametrelerinden, hazır modül dosyası seçilerek ya da adım adım “akıllı ayar” yapılarak yüklenir.",
        "Dosyayı yükledikten sonra test ekranlarıyla (tek renk, ızgara, gri tonlar) bütün modüllerin doğru yandığını kontrol edin. Ayarı yalnızca göndermek yetmez; elektrik kesildiğinde kaybolmaması için karta kalıcı olarak kaydedilmesi gerekir. Doğru dosyayı ekranı aldığınız firmadan isteyin ve bir kopyasını saklayın.",
      ],
    },
    {
      h2: "Ekran bağlantısı: kartların sırası",
      paragraphs: [
        "Tarama dosyası her modülün kendi içinde doğru çalışmasını sağlar. Kabinlerin ekran üzerindeki yerini ise yazılımdaki ekran bağlantısı (bağlantı ayarı) belirler: kaç sütun ve kaç satır alıcı kart olduğu ve kablonun hangi sırayla dolaştığı burada girilir. Bu adım yanlış olursa her kabin tek başına düzgün görünür ama görüntü parçalar hâlinde yer değiştirir.",
      ],
    },
    {
      h2: "Yönetim programları: masaüstü ve mobil",
      paragraphs: [
        "Ekran ayarlandıktan sonra günlük kullanım için içerik yönetim programı gerekir. Bu programlarla video, resim, yazı ve saat gibi içerikler hazırlanır, ekrana gönderilir ve yayın saatleri planlanır. Parlaklık, ekranın belirli saatlerde kararması ve saat eşitleme de buradan yapılır.",
        "Huidu tarafında masaüstünde HDPlayer, telefonda LedArt uygulaması kullanılır. NovaStar tarafında ekran ayarı için NovaLCT, içerik için ViPlex Express (Windows) ve ViPlex Handy (Android ve iOS) kullanılır; uzaktan yönetim için VNNOX bulut platformu vardır. Ayrıntılı adımlar aşağıdaki iki rehberde.",
      ],
    },
    {
      h2: "Kurulumdan sonra",
      paragraphs: [
        "Ekranı teslim almadan önce parlaklığı ortama göre ayarlayın, gece için daha düşük bir seviye planlayın ve cihaz saatini doğru saate eşitleyin. Yapılandırma dosyalarının ve programların yedeğini alın, yönetim şifrelerini fabrika değerlerinden değiştirin. Bir modül arızalandığında yerine takılan yeni modülün de aynı tarama dosyasıyla çalışması gerektiğini unutmayın.",
      ],
    },
  ],
  mistakes: [
    "Modülleri farklı yönlerde takmak: veri akış okları her modülde aynı yöne bakmalı.",
    "Benzer görünen başka bir modülün tarama dosyasını yüklemek: dosya, modelinize ve sürücü çipine uygun olmalı.",
    "Ayarı karta gönderip kaydetmeyi unutmak: elektrik kesilince ekran eski hâline döner.",
    "Elektriği topraklamasız veya ekranın gücüne yetmeyen bir hatta bağlamak.",
    "Bilgisayarın ekran çözünürlüğünü LED ekranın çözünürlüğünden düşük bırakmak (senkron sistemlerde görüntü eksik kalır).",
    "Fabrika varsayılanı Wi-Fi ve yönetim şifrelerini değiştirmeden bırakmak.",
  ],
  faqs: [
    {
      question: "LED ekran kurulumu ne kadar sürer?",
      answer:
        "Ekranın ölçüsüne, montaj şekline ve konstrüksiyonun hazır olup olmamasına göre değişir. Montaj ve kablolama tamamlandıktan sonra doğru tarama dosyası elinizdeyse yazılım ayarı genellikle kısa sürer; dosya yoksa akıllı ayar adımları zaman alabilir.",
    },
    {
      question: "Tarama dosyası nedir, nereden bulunur?",
      answer:
        "Alıcı karta modülün nasıl sürüleceğini anlatan ayar dosyasıdır ve modüle özeldir. Ekranı veya modülü aldığınız firmadan isteyin. Dosya yoksa Huidu ve NovaStar yazılımlarındaki akıllı ayar sihirbazı ile modüle bakarak adım adım oluşturulabilir.",
    },
    {
      question: "Ekranı yönetmek için bilgisayar şart mı?",
      answer:
        "Asenkron sistemlerde günlük içerik değişikliği telefon uygulamasıyla da yapılabilir (Huidu için LedArt, NovaStar için ViPlex Handy). İlk kurulumdaki tarama dosyası ve ekran bağlantısı ayarları için çoğunlukla Windows bilgisayar gerekir.",
    },
    {
      question: "Senkron ekranla asenkron ekran arasındaki fark nedir?",
      answer:
        "Senkron ekran bağlı kaynağın görüntüsünü anlık gösterir, kaynak kapanınca görüntü de gider. Asenkron ekran içeriği kendi hafızasında tutar ve zamanlanmış programa göre bilgisayardan bağımsız oynatır.",
    },
    {
      question: "LED ekran tavana asılabilir mi?",
      answer:
        "Evet. İç mekânda LED ekran uygun taşıyıcı ve askı sistemiyle tavana asılabilir. Tavanın ve askı noktalarının ekran ağırlığını taşıyıp taşımadığı keşifte kontrol edilir; askı detayı teklifte yazılı olarak belirtilir.",
    },
    {
      question: "Kurulum için iskele veya vinç gerekir mi?",
      answer:
        "Montaj yüksekliğine ve ekran ölçüsüne bağlıdır. Alçak iç mekân duvarlarında genellikle merdiven ve platform yeterlidir; yüksek cephe ve direk montajlarında iskele, sepetli platform veya vinç gerekir. İhtiyaç keşifte belirlenir ve teklifte ayrıca gösterilir.",
    },
    {
      question: "LED ekran montajı için ne kadar yer gerekir?",
      answer:
        "Ekran ölçüsü 320 × 160 mm modül katlarına göre planlanır. Önden servisli sistemler duvara yakın monte edilebilir; arkadan servisli sistemlerde bakım için ekranın arkasında erişim boşluğu bırakılır. Gerekli derinlik ve boşluk keşifte ölçülür.",
    },
    {
      question: "LED ekran için elektrik altyapısı nasıl olmalı?",
      answer:
        "Ekran topraklı ve ekranın gücüne uygun sigortalı bir hatta bağlanmalıdır. Büyük ekranlarda yükü dengelemek için üç faz (R-S-T) dağıtım önerilir. Tepe ve ortalama güç ekran alanına göre hesaplanır ve teklifte yazılı olarak belirtilir.",
    },
    {
      question: "Mevcut tabelanın yerine LED ekran takılır mı?",
      answer:
        "Evet. Mevcut taşıyıcı sağlamsa ve ölçü uygunsa LED ekran aynı yere takılabilir. Taşıyıcının ekran ağırlığına ve dış mekânda rüzgâr yüküne uygunluğu keşifte kontrol edilir; gerekirse konstrüksiyon güçlendirilir.",
    },
    {
      question: "Dış mekân LED ekran için belediye izni gerekir mi?",
      answer:
        "Dış mekân reklam ekranları için ilgili belediyeden izin gerekebilir. Başvuru ekran sahibi tarafından belediyenin ilgili birimine yapılır; ekranın ölçüsü, konumu ve montaj bilgisi istenebilir. Bu teknik bilgiler teklifimizde yer alır.",
    },
  ],
  sources: [HUIDU_SOURCES.tr[0], HUIDU_SOURCES.tr[2], ...NOVASTAR_SOURCES.tr.slice(0, 3)],
  links: [
    { href: "/tr/rehber/huidu-led-ekran-kurulumu/", label: "Huidu ile LED ekran kurulumu ve yönetimi" },
    { href: "/tr/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar ile LED ekran kurulumu ve yönetimi" },
    { href: "/tr/products/led-modul-ve-kontrol-sistemleri/", label: "LED modül ve kontrol sistemleri" },
    { href: "/tr/products/colorlight-kontrolculer/", label: "Colorlight kontrolcüler" },
    { href: "/tr/led-ekran-montaj/", label: "LED ekran montaj hizmeti" },
    { href: "/tr/led-ekran-servis/", label: "LED ekran teknik servis" },
  ],
  cta: {
    title: "Kurulumda destek ister misiniz?",
    body:
      "ARLEDSCREEN montaj, tarama dosyası yükleme, yazılım kurulumu ve teknik servis konusunda yardımcı olur. Ekranınızın ölçüsünü ve kontrol kartı modelini paylaşın, size dönüş yapalım.",
  },
  cardLabel: "LED ekran kurulumu",
  cardTeaser: "Montaj, kablolama, tarama dosyası ve yönetim programları: kurulum sırası adım adım.",
};

const HUIDU: InstallGuide = {
  slug: "huidu-led-ekran-kurulumu",
  title: "Huidu LED Ekran Kurulumu: HDPlayer ve LedArt | ARLEDSCREEN",
  description:
    "Huidu kontrol kartlı LED ekran kurulumu: HDPlayer ile bağlantı, tarama dosyası ve akıllı ayar, içerik gönderme, LedArt mobil uygulaması, parlaklık ve zamanlama.",
  keywords: [
    "Huidu kurulum",
    "HDPlayer",
    "HDPlayer kullanımı",
    "LedArt",
    "Huidu tarama dosyası",
    "Huidu akıllı ayar",
    "HDSet",
    "Huidu kontrol kartı",
    "ARLEDSCREEN",
  ],
  h1: "Huidu ile LED ekran kurulumu ve yönetimi",
  intro:
    "Huidu kontrol kartlı bir LED ekranı kurarken iki programla çalışırsınız: bilgisayarda HDPlayer, telefonda LedArt. Bu rehberde kartı bilgisayara bağlamayı, tarama dosyasını yüklemeyi, içerik hazırlayıp göndermeyi ve parlaklık, saat ve zamanlama ayarlarını Huidu'nun resmî kılavuzlarından yararlanarak sade adımlarla anlattık.",
  image: {
    src: "/control/huidu-async-hero.png",
    alt: "Huidu LED alıcı kartı",
    fit: "contain",
  },
  quickSteps: [
    { name: "Programı kurun", text: "HDPlayer'ı Huidu'nun resmî indirme sayfasından alıp Windows bilgisayara kurun." },
    { name: "Karta bağlanın", text: "Bilgisayarı karta ağ kablosuyla, aynı modem üzerinden ya da kartın Wi-Fi ağı üzerinden bağlayın." },
    { name: "Donanım ayarına girin", text: "Ayarlar menüsünden Donanım ayarları bölümünü açın; program şifre ister." },
    { name: "Tarama dosyasını yükleyin", text: "Alıcı kart parametrelerinde modülünüze uygun dosyayı seçin; yoksa akıllı ayarı adım adım tamamlayın." },
    { name: "Bağlantıyı tanımlayın", text: "Birden fazla alıcı kart varsa bağlantı ayarında kartların sırasını girin ve kaydedin." },
    { name: "Ekranı oluşturun", text: "Ekran parametrelerinde çözünürlüğü karttan okutun veya genişlik ve yüksekliği girin." },
    { name: "İçerik gönderin", text: "Programa video, resim, yazı veya saat alanı ekleyin; kablo, Wi-Fi ya da USB bellekle gönderin." },
    { name: "Ayarları tamamlayın", text: "Parlaklığı, saati ve zamanlı açma-kapamayı ayarlayın; varsayılan şifreleri değiştirin." },
  ],
  sections: [
    {
      h2: "Huidu yazılımları ne işe yarar?",
      paragraphs: [
        "Huidu'nun resmî indirme sayfasında kart türüne göre ayrılmış programlar bulunur. Hangi programın gerektiği, kartın tam renkli mi yoksa tek veya çift renkli mi olduğuna bağlıdır.",
      ],
      bullets: [
        "HDPlayer (Windows): tam renkli asenkron kartlar için içerik hazırlama, gönderme ve kart yönetimi programı. Donanım ayarı (tarama dosyası) bölümü de bunun içindedir.",
        "HDSet (Windows): senkron ve asenkron tam renkli sistemler için ekran ayar programı. HDPlayer'daki donanım ayarları bu arayüzü açar.",
        "HD2020 (Windows): tek ve çift renkli kayan yazı kartları için program.",
        "LedArt (Android ve iOS): telefondan kart bulma, program hazırlama ve gönderme uygulaması. Huidu'nun indirme sayfasına göre tek renkli, çift renkli ve tam renkli serileri destekler.",
      ],
    },
    {
      h2: "Bilgisayarı karta bağlamak",
      paragraphs: [
        "Huidu kartları üç yolla bağlanır: ağ kablosuyla doğrudan bilgisayara, aynı modeme (router) bağlanarak ya da kartta Wi-Fi modülü varsa kartın yaydığı kablosuz ağa katılarak. Doğrudan kablo bağlantısında ek ağ ayarı gerekmez; kartın ağ ışıkları yandıktan kısa süre sonra HDPlayer'ın alt bilgi alanında kartın adı ve kimlik numarası görünür.",
        "Modem üzerinden bağlantıda bir bilgisayar aynı ağdaki birden fazla kartı yönetebilir. Kart başka bir ağ bölümündeyse karta sabit IP verilir ve Kontrol menüsündeki manuel kart bulma ile IP adresi girilerek eklenir. Sabit IP verirken bilgisayarla aynı ağ bölümünde olan ve başka bir cihazla çakışmayan bir adres seçin.",
      ],
    },
    {
      h2: "Tarama dosyasını yüklemek (donanım ayarı)",
      paragraphs: [
        "HDPlayer'da Ayarlar → Donanım ayarları yolunu izleyin. Program şifre ister; kılavuzda fabrika varsayılanı 168 (bazı sürümlerde 888) olarak geçer. Bu şifreyi Ayarlar → Sistem ayarları bölümünden değiştirebilirsiniz.",
        "Açılan ekranda üç bölüm vardır: gönderici kart parametreleri, bağlantı ayarı ve alıcı kart parametreleri. Alıcı kartı olmayan tek kartlı küçük ekranlarda yalnızca alıcı kart parametreleri görünür.",
        "Alıcı kart parametrelerinde hazır modül listesinden modülünüze uygun dosyayı seçin veya ekranı aldığınız firmanın verdiği dosyayı yükleyin. Uygun dosya yoksa “akıllı ayar” sihirbazı modüle bakarak ayarı sizinle birlikte oluşturur:",
      ],
      steps: [
        "Renk tipini, tek modülün genişliğini, sürücü çip tipini ve kod çözme (decoding) türünü seçin; modül 16 taramadan büyükse ilgili kutuyu işaretleyin.",
        "Renk kanalı adımında sırayla sunulan durumlarda modülde hangi rengin yandığına bakın ve aynı rengi seçin.",
        "Bir RGB grubunun kaç satır yaktığını ve tarama tipini, modülde yanan satır sayısını sayarak girin.",
        "Nokta işaretleme adımında sol üst modülde yanıp sönen noktayı takip edin ve tablodaki karşılığına sırayla tıklayın.",
        "Tabloyu bitirince kaydedin; görüntü düzgünse ayarı karta gönderin.",
      ],
    },
    {
      h2: "Kart sırası ve ekran parametreleri",
      paragraphs: [
        "Birden fazla alıcı kartlı ekranlarda bağlantı ayarı bölümünde kartların dizilişi girilir. Ekrana önden bakıldığında gönderici kablonun girdiği ilk kart 1 numaradır ve sıra kablonun izlediği yolu takip eder.",
        "İçerik tarafında Ayarlar → Ekran parametreleri bölümünde “donanım ayarlarını kullan” seçiliyse ekran çözünürlüğü karttan okunur. Bu seçenek kapalıysa cihaz modelini, genişliği ve yüksekliği elle girebilirsiniz. Bağlı kartlar cihaz seçme listesinde otomatik görünür.",
      ],
    },
    {
      h2: "İçerik hazırlama ve gönderme",
      paragraphs: [
        "HDPlayer'da bir ekranın altına program, programın içine de video, resim, yazı, belge, saat ve sayaç gibi alanlar eklenir. Program özelliklerinden oynatma süresi, belirli saatlerde oynatma ve arka plan ayarlanır. Böylece örneğin sabah kahvaltı menüsü, öğleden sonra kampanya görseli kendiliğinden döner.",
        "Hazır içerik kablo ya da Wi-Fi üzerinden doğrudan gönderilir. Aynı model kart ve aynı ölçüdeki birden çok ekrana aynı içerik toplu gönderimle tek seferde yollanabilir. Ağ bağlantısı yoksa USB bellek de kullanılır:",
      ],
      steps: [
        "Belleği bilgisayara takın ve HDPlayer'da Kontrol → USB'ye aktar seçeneğini açın.",
        "Programı karta kopyalatmak için program güncelleme seçeneğini, içeriği bellekten oynatmak için doğrudan oynatma seçeneğini seçin.",
        "Belleği karta takın; kopyalama bitince belleği çıkarabilirsiniz, ekran yeni programı oynatır.",
        "Kartta cihaz kilidi açıksa aktarma ekranında kilit şifresini girmeniz gerekir.",
      ],
    },
    {
      h2: "Parlaklık, saat ve zamanlama",
      paragraphs: [
        "Parlaklık elle, saat dilimlerine göre ya da harici ışık sensörü takılıysa otomatik ayarlanabilir. Gündüz yüksek, gece düşük parlaklık hem gözü yormaz hem enerji tasarrufu sağlar.",
        "Kartın saati bilgisayarla tek tıkla eşitlenebilir veya elle girilebilir; zamanlanmış programların doğru saatte dönmesi için bu ayar önemlidir. Zamanlı açma-kapama ekranı belirlenen saatlerde karartır; kılavuza göre bu ayar yalnızca görüntü sinyalini keser, ekranın elektriği açık kalır. Uzun süre çalışan ekranlarda takılmayı önlemek için planlı yeniden başlatma da kurulabilir.",
        "Ekran testi bölümündeki gri ton, renk, ızgara ve nokta testleriyle sönük ya da arızalı LED'ler kolayca görülür; aynı testi kart üzerindeki TEST düğmesiyle de başlatabilirsiniz. Yazılım (firmware) güncellemesi sırasında karta giden elektriği kesmeyin.",
      ],
    },
    {
      h2: "Telefondan yönetim: LedArt",
      paragraphs: [
        "LedArt'ı Google Play veya App Store'da “LedArt” diye aratarak kurun. Telefonun mobil verisini, Bluetooth'unu ve varsa VPN'ini kapatın, Wi-Fi ayarlarından kartın kablosuz ağına bağlanın. Telefon “bu ağda internet yok, başka ağa geçilsin mi?” diye sorarsa bağlı kalmayı seçin; aksi hâlde kart görünmez.",
        "Cihaz sekmesinde kart çevrimiçi görünür. Program bölümünden yeni ekran oluşturup kartı seçin, ekranın genişliğini, yüksekliğini ve renk tipini girin, içeriği ekleyip gönderin. Görüntü düzgün değilse uygulamadaki donanım ayarından modül dosyası seçilir; dosya işe yaramazsa akıllı ayar yapılır.",
        "Kartın Wi-Fi şifresi kılavuzda fabrika varsayılanı olarak 88888888 geçer; kurulumdan sonra bunu Wi-Fi ayarlarından mutlaka değiştirin. Tek kart için kartın kendi ağı (AP modu), birden çok kart için kartları ortak bir modeme bağlayan istasyon (Station) modu uygundur. Şifre unutulursa kart üzerindeki S1 düğmesiyle fabrika şifresine dönülebilir; bu işlem ekran ayarlarını da etkileyebileceği için önce teknik destek alın.",
      ],
    },
  ],
  mistakes: [
    "Kartı bulamayınca ağ ayarlarıyla oynamak: önce kablo ışıklarını kontrol edin, telefonda mobil veriyi ve VPN'i kapatın.",
    "Sabit IP verirken bilgisayarla farklı ağ bölümünde ya da çakışan bir adres seçmek.",
    "Zamanlı kapamayı elektrik kesintisi sanmak: ekran kararır ama elektrik açık kalır.",
    "Programın çözünürlüğünü ekranın gerçek çözünürlüğünden farklı bırakmak.",
    "Fabrika varsayılanı Wi-Fi ve donanım ayarı şifrelerini değiştirmemek.",
    "Firmware güncellemesi sürerken kartın elektriğini kesmek.",
  ],
  faqs: [
    {
      question: "HDPlayer donanım ayarları şifresi nedir?",
      answer:
        "Huidu kılavuzunda fabrika varsayılanı 168 (bazı sürümlerde 888) olarak geçer. Yetkisiz değişiklikleri önlemek için Ayarlar → Sistem ayarları bölümünden değiştirmenizi öneririz.",
    },
    {
      question: "HDPlayer kartı bulamıyor, ne yapmalıyım?",
      answer:
        "Ağ kablosunun ve kartın ağ ışıklarının yandığını, bilgisayarın ağ bağlantısının normal olduğunu kontrol edin. Kart başka bir ağ bölümündeyse Kontrol menüsündeki manuel kart bulma ile kartın IP adresini girerek ekleyin.",
    },
    {
      question: "Huidu ekranı telefondan yönetebilir miyim?",
      answer:
        "Evet. LedArt uygulaması Android ve iOS için var. Telefonu kartın Wi-Fi ağına ya da kartla aynı modeme bağlayarak içerik gönderebilir ve temel ayarları yapabilirsiniz.",
    },
    {
      question: "Tarama dosyası listede yoksa ne olur?",
      answer:
        "Akıllı ayar sihirbazı modülü sizinle birlikte tanır: renk kanallarını, satır sayısını ve noktaların sırasını ekrana bakarak seçersiniz. Bitince ayar kaydedilir ve karta gönderilir.",
    },
  ],
  sources: HUIDU_SOURCES.tr,
  links: [
    { href: "/tr/rehber/led-ekran-kurulumu/", label: "LED ekran kurulumu adım adım" },
    { href: "/tr/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar ile LED ekran kurulumu" },
    { href: "/tr/products/huidu-kontrol-kartlari/", label: "Huidu kontrol kartları" },
    { href: "/tr/products/led-modul-ve-kontrol-sistemleri/", label: "LED modül ve kontrol sistemleri" },
    { href: "/tr/led-ekran-servis/", label: "LED ekran teknik servis" },
  ],
  cta: {
    title: "Huidu kurulumunda yardım",
    body:
      "Tarama dosyası, HDPlayer veya LedArt ayarlarında takıldıysanız ARLEDSCREEN teknik ekibi yardımcı olur. Kart modelini ve ekranın ölçüsünü yazın, size dönüş yapalım.",
  },
  cardLabel: "Huidu kurulumu",
  cardTeaser: "HDPlayer ve LedArt ile bağlantı, tarama dosyası, içerik gönderme ve zamanlama.",
};

const NOVASTAR: InstallGuide = {
  slug: "novastar-led-ekran-kurulumu",
  title: "NovaStar LED Ekran Kurulumu: NovaLCT, ViPlex | ARLEDSCREEN",
  description:
    "NovaStar LED ekran kurulumu: NovaLCT ile alıcı kart dosyası (.rcfgx) ve ekran bağlantısı, ViPlex Express ve ViPlex Handy ile içerik, VNNOX ile uzaktan yönetim.",
  keywords: [
    "NovaStar kurulum",
    "NovaLCT",
    "NovaLCT kullanımı",
    "rcfgx",
    "ViPlex Express",
    "ViPlex Handy",
    "VNNOX",
    "NovaStar alıcı kart",
    "ARLEDSCREEN",
  ],
  h1: "NovaStar ile LED ekran kurulumu ve yönetimi",
  intro:
    "NovaStar sistemlerinde ekran ayarı ile içerik yönetimi ayrı programlarla yapılır. Ekranın modülleri tanıması ve kabinlerin doğru dizilmesi NovaLCT ile, içerik hazırlama ve yayın ise ViPlex Express (bilgisayar) ve ViPlex Handy (telefon) ile yapılır. Bu rehberde NovaStar'ın resmî kılavuzlarından yararlanarak sırayı kendi cümlelerimizle anlattık.",
  image: {
    src: "/control/novastar-mctrl660-pro.png",
    alt: "NovaStar MCTRL660 PRO gönderici kart, ön panel",
    fit: "contain",
  },
  quickSteps: [
    { name: "NovaLCT'yi kurun", text: "NovaLCT'yi NovaStar'ın resmî indirme sayfasından alıp Windows bilgisayara kurun." },
    { name: "Gönderici karta bağlanın", text: "Bilgisayarı gönderici karta USB veya ağ kablosuyla bağlayın; NovaLCT kartı kendisi bulur." },
    { name: "Giriş yapın", text: "Kullanıcı menüsünden gelişmiş senkron sistem girişini seçin ve şifreyi girin." },
    { name: "Alıcı kart dosyasını yükleyin", text: "Ekran yapılandırmasındaki alıcı kart sekmesinde .rcfgx/.rcfg dosyasını yükleyip gönderin; yoksa akıllı ayarları kullanın." },
    { name: "Ekran bağlantısını kurun", text: "Alıcı kartların sütun ve satır sayısını, kablonun izlediği sırayı girip donanıma gönderin." },
    { name: "Kalıcı kaydedin", text: "Ayarları donanıma kaydedin ve yapılandırma dosyasının yedeğini bilgisayara veya buluta alın." },
    { name: "İçeriği yayınlayın", text: "ViPlex Express veya ViPlex Handy ile oynatıcıya bağlanın, içerik hazırlayıp yayınlayın." },
    { name: "Ayarları tamamlayın", text: "Parlaklık, ekran açma-kapama planı ve saat eşitlemeyi ayarlayın; varsayılan şifreleri değiştirin." },
  ],
  sections: [
    {
      h2: "NovaStar yazılımları ne işe yarar?",
      paragraphs: [
        "NovaStar'da her işin kendi programı vardır. Hangisine ihtiyaç duyduğunuz, ekranınızın senkron mu (gönderici kart veya video işlemci) yoksa asenkron mu (multimedya oynatıcı) çalıştığına bağlıdır.",
      ],
      bullets: [
        "NovaLCT (Windows): ekran yapılandırma aracı. Gönderici ve alıcı kart ayarı, alıcı kart dosyası yükleme, ekran bağlantısı, parlaklık, kalibrasyon ve izleme bu programla yapılır. Senkron ürünlerin yanında asenkron oynatıcıların ekran ayarında da kullanılır.",
        "ViPlex Express (Windows): bilgisayardan içerik hazırlama ve yayınlama programı. Asenkron modda oynatıcıları yönetir: içerik, parlaklık, açma-kapama planı ve saat eşitleme.",
        "ViPlex Handy (Android ve iOS): telefondan yerel ağ veya internet üzerinden oynatıcı yönetimi, içerik yayınlama, parlaklık ve hızlı ekran ayarı uygulaması.",
        "VNNOX: NovaStar'ın bulut platformu. İnternete bağlı oynatıcılara uzaktan içerik yayınlamak ve ekran durumunu izlemek için kullanılır.",
      ],
    },
    {
      h2: "NovaLCT ile bağlantı ve giriş",
      paragraphs: [
        "NovaLCT'yi kurup bilgisayarı gönderici karta USB veya ağ kablosuyla bağlayın. Bağlantı doğruysa program kartı kendiliğinden bulur ve ana ekranda bağlı kart sayısını gösterir. Bütün komutlar ve ayar dosyaları bu kontrol kablosu üzerinden gider.",
        "Ayar yapmak için Kullanıcı → Gelişmiş senkron sistem kullanıcı girişi yolunu izleyin. Kılavuzda fabrika varsayılan şifresi admin olarak geçer; Kullanıcı → Şifre değiştir bölümünden değiştirmenizi öneririz.",
        "Senkron ekranlarda bilgisayarın ekran çözünürlüğü LED ekranın çözünürlüğüne eşit ya da ondan büyük olmalıdır. Aksi hâlde görüntünün bir kısmı ekrana gelmez.",
      ],
    },
    {
      h2: "Alıcı kart dosyasını yüklemek (.rcfgx / .rcfg)",
      paragraphs: [
        "Ekran yapılandırması penceresindeki Alıcı kart sekmesi, tarama dosyasının yüklendiği yerdir. Elinizde modülünüze ait .rcfgx veya .rcfg dosyası varsa dosyadan yükleyip alıcı kartlara gönderin; görüntü düzeldiyse kaydedin.",
        "NovaLCT dosyayı buluttan (VNNOX Care) da bulabilir: üreticiyi seçip modül kimliğini veya dosya adını girmeniz yeterlidir. Alıcı kartın yazılım sürümü dosyayla uyuşmuyorsa program güncelleme yapılıp yapılmayacağını sorar.",
        "Dosya yoksa Akıllı ayarlar sihirbazı kullanılır: modülün çipi, veri tipi, modül tipi, piksel sayısı ve tarama bilgileri girilir, ardından modülde gördüğünüz görüntüye göre seçenekler işaretlenir. Bitirdiğiniz ayarı .rcfgx dosyası olarak dışa aktarıp saklayabilirsiniz.",
      ],
    },
    {
      h2: "Ekran bağlantısı ve kalıcı kayıt",
      paragraphs: [
        "Ekran bağlantısı sekmesinde ekran sayısını, alıcı kartların sütun ve satır sayısını girip kablonun kabinler arasında izlediği yolu çizersiniz. Genellikle her alıcı kart bir kabini sürer. Tamamlayınca donanıma gönderin.",
        "Gönder komutu ayarı ekranda denemenizi sağlar. Elektrik kesildiğinde kaybolmaması için ayarı donanıma kaydetmeniz gerekir; NovaStar kılavuzuna göre donanıma kaydedilen ayar elektrik kesilse de korunur. Son olarak sistem yapılandırma dosyasını bilgisayara kaydedin; isterseniz alıcı kart dosyası ve ekran bağlantı dosyası (.scr) ile birlikte VNNOX Care'e de yedekleyebilirsiniz.",
        "Parlaklık NovaLCT'de elle ayarlanabilir; ışık sensörü bağlıysa ortam ışığına göre otomatik ayar da kurulabilir.",
      ],
    },
    {
      h2: "ViPlex Express ile içerik ve zamanlama (bilgisayar)",
      paragraphs: [
        "ViPlex Express, asenkron oynatıcılara (örneğin Taurus serisi) içerik göndermek için kullanılan Windows programıdır. Bilgisayar oynatıcıya ağ kablosuyla, oynatıcının kendi Wi-Fi ağıyla ya da aynı kablolu veya kablosuz ağ üzerinden bağlanır. Oynatıcının Wi-Fi ağının adı “AP” ve seri numarasının son 8 hanesinden oluşur; Wi-Fi şifresi ürün etiketinde yazılıdır.",
        "Oynatıcıya admin kullanıcısıyla giriş yapılır. Kılavuza göre fabrika varsayılan şifresi yazılım sürümüne göre değişir (eski Taurus sürümlerinde 123456, yenilerinde SN2008@+). İlk girişte Wi-Fi ve giriş şifresini değiştirin.",
        "İçerik, ViPlex'te “çözüm” (solution) olarak hazırlanır:",
      ],
      steps: [
        "Yeni çözüm oluşturun; çözünürlüğü ekranın çözünürlüğüyle aynı girin.",
        "Sayfalar ekleyin ve her sayfaya video, resim, yazı, saat veya belge pencereleri yerleştirin.",
        "Her sayfanın hangi saatlerde ve hangi günlerde oynayacağını planlayın.",
        "Kaydedin, Yayınla'ya tıklayın ve içeriğin gideceği oynatıcıları seçin.",
      ],
    },
    {
      h2: "Terminal kontrolü: parlaklık, açma-kapama ve saat",
      paragraphs: [
        "ViPlex Express'in terminal kontrolü bölümünde parlaklık elle veya zamanlanmış olarak ayarlanır, ekranın belirli saatlerde açılıp kapanması planlanır ve planlı yeniden başlatma kurulur.",
        "Saat eşitleme elle, NTP (internet saati), GPS veya RF yöntemleriyle yapılabilir. Birden fazla ekranda aynı içeriğin aynı anda oynaması isteniyorsa cihaz saatlerinin eşitlenmiş olması şarttır.",
      ],
    },
    {
      h2: "Telefondan yönetim: ViPlex Handy",
      paragraphs: [
        "ViPlex Handy, Google Play ve App Store'da bulunur. İlk açılışta yerel ağ (LAN) kontrolü ile internet kontrolü arasında seçim yapılır. Sahada oynatıcının Wi-Fi ağına bağlanıp yerel kontrolü seçmek en pratik yoldur; cihaz listede görününce admin şifresiyle bağlanılır. Uygulama zayıf şifre uyarısı verirse şifreyi değiştirin.",
        "Cihaz yönetimi ekranında zaman dilimi, ses, renk sıcaklığı, ekran açma-kapama kuralları, elle ve akıllı parlaklık, planlı yeniden başlatma ve saat eşitleme bulunur. Ekran yapılandırması açılarak ekran bağlantısı telefondan da yapılabilir; .rcfgx alıcı kart dosyası gönderme kılavuza göre yalnızca Android sürümünde vardır ve dosyanın önce telefona kaydedilmesi gerekir.",
      ],
    },
    {
      h2: "VNNOX ile uzaktan yönetim",
      paragraphs: [
        "Ekran sahada internete bağlıysa oynatıcı ViPlex Express veya ViPlex Handy üzerinden VNNOX hesabına bağlanabilir. Böylece ekranın başına gitmeden içerik yayınlanır ve VNNOX Care ile ekran durumu izlenir. Bağlama işleminden önce cihazın internete çıktığından emin olun.",
      ],
    },
  ],
  mistakes: [
    "Alıcı kart ayarını yalnızca gönderip donanıma kaydetmemek: elektrik kesilince ayar kaybolur.",
    "Bilgisayarın ekran çözünürlüğünü LED ekrandan düşük bırakmak (senkron sistem).",
    "ViPlex'te çözümün çözünürlüğünü ekrandan farklı girmek.",
    "Benzer modülün .rcfgx dosyasını denemek: dosya modelinize ve alıcı kart yazılımına uygun olmalı.",
    "Birden çok ekranda eşzamanlı oynatma beklerken saat eşitlemeyi kurmamak.",
    "Fabrika varsayılanı Wi-Fi ve admin şifrelerini değiştirmemek.",
  ],
  faqs: [
    {
      question: "NovaLCT varsayılan şifresi nedir?",
      answer:
        "NovaStar kılavuzunda gelişmiş senkron sistem girişi için fabrika varsayılanı admin olarak geçer. Kurulumdan sonra Kullanıcı → Şifre değiştir bölümünden değiştirmenizi öneririz.",
    },
    {
      question: ".rcfgx dosyası nedir?",
      answer:
        "NovaStar alıcı kartlarının yapılandırma dosyasıdır; modülün nasıl sürüleceği bilgisini taşır. NovaLCT'de alıcı kart sekmesinden yüklenir, alıcı kartlara gönderilir ve donanıma kaydedilir.",
    },
    {
      question: "ViPlex Express mi, ViPlex Handy mi kullanmalıyım?",
      answer:
        "İkisi de aynı oynatıcıları yönetir. Ayrıntılı içerik düzenleme ve çok sayıda ekran için bilgisayardaki ViPlex Express, sahada hızlı değişiklik için telefondaki ViPlex Handy daha pratiktir.",
    },
    {
      question: "NovaStar ekranı uzaktan yönetebilir miyim?",
      answer:
        "Oynatıcı internete bağlıysa evet. Cihazı ViPlex Express veya ViPlex Handy ile VNNOX hesabına bağladıktan sonra içerik uzaktan yayınlanabilir ve ekran durumu izlenebilir.",
    },
  ],
  sources: NOVASTAR_SOURCES.tr,
  links: [
    { href: "/tr/rehber/led-ekran-kurulumu/", label: "LED ekran kurulumu adım adım" },
    { href: "/tr/rehber/huidu-led-ekran-kurulumu/", label: "Huidu ile LED ekran kurulumu" },
    { href: "/tr/products/novastar-kontrolculer/", label: "NovaStar kontrolcüler" },
    { href: "/tr/products/led-modul-ve-kontrol-sistemleri/", label: "LED modül ve kontrol sistemleri" },
    { href: "/tr/led-ekran-servis/", label: "LED ekran teknik servis" },
  ],
  cta: {
    title: "NovaStar kurulumunda yardım",
    body:
      "NovaLCT ayarı, alıcı kart dosyası veya ViPlex kurulumu için ARLEDSCREEN teknik ekibine yazın. Kontrolcü modelini ve ekranın ölçüsünü paylaşın, size dönüş yapalım.",
  },
  cardLabel: "NovaStar kurulumu",
  cardTeaser: "NovaLCT ile alıcı kart dosyası, ViPlex Express ve Handy ile içerik, VNNOX ile uzaktan yönetim.",
};

export const INSTALL_GUIDES_TR: Record<InstallGuideSlug, InstallGuide> = {
  "led-ekran-kurulumu": HUB,
  "huidu-led-ekran-kurulumu": HUIDU,
  "novastar-led-ekran-kurulumu": NOVASTAR,
};
