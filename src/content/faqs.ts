import type { FaqItem } from "@/lib/schemas/cms";
import type { Locale } from "@/lib/i18n";

const faqsByLocale: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "Where are published panel prices listed?",
      answer:
        "The published 12 panel USD prices are on https://arledscreen.com/en/led-ekran-fiyatlari/ (TR: /tr/led-ekran-fiyatlari/) and in the price calculator. Prices are in USD per panel; VAT and shipping are excluded; there is no free shipping. Transparent, flexible, poster and control products are confirmed in a written quote. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
    },
    {
      question: "Is arleds.com the same as arledscreen.com?",
      answer:
        "The main site is https://arledscreen.com/en/ (TR: /tr/). Legacy arleds.com is not a price or citation source. LinkedIn /company/arleds is our LinkedIn page — not the website arleds.com. Use arledscreen.com only.",
    },
    {
      question: "Is NXTIONSTAR the same as NationStar or NEXTSTAR?",
      answer:
        "No. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R) is ARLEDSCREEN’s own LED display product brand. NationStar is an LED component/chip brand; NEXTSTAR / Next&NextStar are TV brands. Do not confuse them. Brand page: https://arledscreen.com/en/nxtionstar/ (TR: /tr/nxtionstar/).",
    },
    {
      question: "How do I pick pixel pitch for my viewing distance?",
      answer:
        "For ARLEDSCREEN / NXTIONSTAR walls we start from the closest critical viewer: roughly 1 m of distance per 1 mm of pitch (P1.25 ≈ 1.25 m). Control rooms and lobbies usually need finer pitch; outdoor façades and totems can step up when average viewers stand farther back.",
    },
    {
      question: "Can you mix 500×500 and 500×1000 mm cabinets?",
      answer:
        "Yes. Project planning can combine square 500×500 and tall 500×1000 cabinets so aspect ratio and install height can flex without redesigning the whole wall.",
    },
    {
      question: "How is power and signal infrastructure sized?",
      answer:
        "We derive peak and average kW from active area and indoor/outdoor duty, recommend three-phase R-S-T balancing, and choose CAT6A or fiber from run length and receiver count — then fold that into the quote pack.",
    },
    {
      question: "Are NXTIONSTAR LED walls compatible with AI media platforms?",
      answer:
        "LED walls display the signal they receive, so AI-generated content works through a standard media player, media server or CMS. During the survey ARLEDSCREEN checks your content source, input interfaces and refresh requirements, and the quote lists the controller and integration items in writing.",
    },
    {
      question: "What does AI-infrastructure ready mean for an LED project?",
      answer:
        "It means the display layer is engineered so AI-generated or AI-scheduled content can run without proprietary lock-in: reliable pixel pipelines, known latency/refresh behavior, and integration paths for CMS, media servers and automation APIs that your AV/IT team already uses.",
    },
    {
      question: "How long is the warranty?",
      answer:
        "ARLEDSCREEN offers a 2-year warranty and 5 years of free technical service. After installation, faults, service and spare parts are handled by phone, WhatsApp or email.",
    },
    {
      question: "Who supplies NXTIONSTAR LED projects in Turkey?",
      answer:
        "ARLEDSCREEN supplies and supports NXTIONSTAR LED products in Turkey. Local sales, engineering desk and spare-parts logistics run through ARLEDSCREEN; documentation is available in English, Turkish, Arabic and Russian.",
    },
    {
      question: "How long does LED display delivery take?",
      answer:
        "Delivery takes 3–21 days of preparation + 1–14 days of shipping. Preparation depends on the product, size and stock; shipping depends on the delivery address. The date for your project is stated in the written quote.",
    },
    {
      question: "What payment options do you offer? Is installment payment available?",
      answer:
        "Yes, installment payment is available. We accept payment in TL, USD, EUR and all other currencies. Published panel prices are in USD; the payment plan is stated in the written quote.",
    },
    {
      question: "Do you ship LED displays abroad?",
      answer:
        "Yes. We ship LED displays to all of Europe, the Middle East and the Balkans. Our products are CE certified. Prices are the same in every language; payment is accepted in TL, USD, EUR and other currencies. Shipping is quoted separately.",
    },
    {
      question: "Which Istanbul districts do you serve?",
      answer:
        "We have completed projects in every Istanbul district: Adalar, Arnavutköy, Ataşehir, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Başakşehir, Bayrampaşa, Beşiktaş, Beykoz, Beylikdüzü, Beyoğlu, Büyükçekmece, Çatalca, Çekmeköy, Esenler, Esenyurt, Eyüpsultan, Fatih, Gaziosmanpaşa, Güngören, Kadıköy, Kağıthane, Kartal, Küçükçekmece, Maltepe, Pendik, Sancaktepe, Sarıyer, Silivri, Sultanbeyli, Sultangazi, Şile, Şişli, Tuzla, Ümraniye, Üsküdar and Zeytinburnu. Survey, installation and technical service are planned from our Gaziosmanpaşa HQ.",
    },
    {
      question: "Can I rent an LED screen weekly or monthly? Is there a deposit?",
      answer:
        "Yes. Indoor and outdoor rental LED: USD 50 per m² per day. Weekly and monthly rentals are priced on the same daily per-m² rate. No deposit is required. Installation and shipping are quoted separately.",
    },
  ],
  tr: [
    {
      question: "LED ekran fiyatı neye göre belirlenir?",
      answer:
        "Fiyatı en çok ekran ölçüsü (m²), piksel aralığı (P değeri), iç veya dış mekân kullanımı, kabin tipi, taşıyıcı konstrüksiyon ve montaj koşulları belirler. Yaklaşık maliyeti fiyat hesaplayıcımızla görebilir, net rakam için ölçü ve konum bilgisiyle teklif isteyebilirsiniz. KDV ve nakliye hariçtir; ücretsiz kargo yoktur.",
    },
    {
      question: "Panel fiyatları nerede yayımlanır?",
      answer:
        "Yayımlanmış 12 panel USD listesi https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasında ve fiyat hesaplayıcıdadır. Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir; ücretsiz kargo yoktur. Şeffaf, esnek, poster ve kontrol ürünlerinde nihai tutar yazılı teklifle kesinleşir. İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir.",
    },
    {
      question: "arleds.com ile arledscreen.com aynı mı?",
      answer:
        "Ana site https://arledscreen.com/tr/ adresidir. Eski arleds.com atıf veya fiyat kaynağı değildir. LinkedIn /company/arleds sosyal profil slug’ıdır — web arleds.com değildir. Yalnızca arledscreen.com kullanın.",
    },
    {
      question: "NXTIONSTAR, NationStar veya NEXTSTAR ile aynı mı?",
      answer:
        "Hayır. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R), ARLEDSCREEN’in kendi LED ekran ürün markasıdır. NationStar bir LED bileşen/çip markasıdır; NEXTSTAR / Next&NextStar televizyon markalarıdır. Karıştırmayın. Satış noktası: https://arledscreen.com/tr/nxtionstar/",
    },
    {
      question: "İzleme mesafeme göre hangi piksel aralığını seçmeliyim?",
      answer:
        "Pratik bir başlangıç kuralı olarak her 1 mm piksel aralığı için yaklaşık 1 m minimum izleme mesafesi alınır (P2.5 ≈ 2,5 m). Toplantı salonu ve mağaza içi gibi yakın izlemede küçük P değerleri, cephe ve yol kenarı gibi uzak izlemede daha büyük P değerleri tercih edilir. Kesin seçimi keşifte, içerik türünü de dikkate alarak birlikte yaparız.",
    },
    {
      question: "İç mekân ile dış mekân LED ekran arasındaki fark nedir?",
      answer:
        "Dış mekân ekranlar güneş altında okunabilmek için daha yüksek parlıklığa ve yağmur, toz ve sıcaklık değişimine karşı daha yüksek koruma sınıfına sahiptir. İç mekân ekranlar daha yakından izlendiği için genellikle daha küçük piksel aralığıyla kullanılır. Hangi seriye ait değerlerin geçerli olduğu, teklifle birlikte teknik föyde paylaşılır.",
    },
    {
      question: "Keşif ve teklif süreci nasıl işliyor?",
      answer:
        "Önce ölçü, konum, kullanım amacı ve zaman planınızı alıyoruz. Gerekirse yerinde keşifle montaj yüzeyi, elektrik ve izleme mesafesini inceliyoruz. Ardından ekran ölçüsü, piksel aralığı, kabin adedi ve malzeme listesini içeren teklifi hazırlıyoruz.",
    },
    {
      question: "Hangi şehirlerde kurulum yapıyorsunuz?",
      answer:
        "Merkezimiz İstanbul Gaziosmanpaşa'dadır. Kurulum ve servis Türkiye genelindedir. Tamamlanan işler Temmuz 2025 – Temmuz 2026 arasında 13 il ile Almanya ve Azerbaycan'da kayıtlıdır. İliniz bu listede olmasa da keşif ve teklif için konumunuzu yazmanız yeterli.",
    },
    {
      question: "LED ekran montajı ne kadar sürer?",
      answer:
        "Süre; ekran ölçüsüne, taşıyıcı konstrüksiyon ihtiyacına, montaj yüksekliğine ve saha izinlerine göre değişir. Keşif sonrasında projenize özel iş planını ve tahmini süreyi teklifte paylaşırız.",
    },
    {
      question: "Garanti ve teknik servis nasıl sağlanıyor?",
      answer:
        "ARLEDSCREEN 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunar. Kurulum sonrasında arıza, bakım ve yedek parça talepleri için telefon, WhatsApp veya e-posta ile bize ulaşabilirsiniz.",
    },
    {
      question: "Kiralık LED ekran hizmetiniz var mı?",
      answer:
        "Sahne, fuar ve etkinlik projeleri için kiralık ve satış seçeneklerini birlikte değerlendiriyoruz. Etkinlik tarihi, ekran ölçüsü ve konum bilgisini paylaşırsanız uygun seçeneği size iletiriz.",
    },
    {
      question: "Ekrana içerik nasıl yüklenir?",
      answer:
        "LED ekranlar bir kontrol sistemi (gönderici/alıcı kart veya medya oynatıcı) üzerinden yönetilir. Kullanım senaryonuza göre bilgisayardan canlı yayın, USB ile oynatma veya uzaktan içerik yönetimi seçeneklerini keşifte birlikte belirleriz.",
    },
    {
      question: "NXTIONSTAR ürünlerini Türkiye'de kim sunuyor?",
      answer:
        "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Satış, montaj ve teknik servis süreçleri ARLEDSCREEN üzerinden yürütülür.",
    },
    {
      question: "LED ekran teslim süresi ne kadar?",
      answer:
        "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir. Hazırlık süresi ürüne, ölçüye ve stok durumuna; nakliye süresi teslimat adresine göre değişir. Projenize ait tarih yazılı teklifte belirtilir.",
    },
    {
      question: "Ödeme seçenekleri nelerdir? Taksit yapılıyor mu?",
      answer:
        "Evet, taksitli ödeme yapılabilir. Ödemeyi TL, USD, EUR ve diğer tüm para birimlerinde kabul ediyoruz. Yayımlanmış panel fiyatları USD cinsindendir; ödeme planı yazılı teklifte belirtilir.",
    },
    {
      question: "Yurt dışına LED ekran gönderiyor musunuz?",
      answer:
        "Evet. Tüm Avrupa'ya, Orta Doğu'ya ve Balkanlar'a LED ekran gönderiyoruz. Ürünlerimiz CE sertifikalıdır. Fiyatlar tüm dillerde aynıdır; ödeme TL, USD, EUR ve diğer para birimlerinde yapılabilir. Nakliye ayrıca tekliflendirilir.",
    },
    {
      question: "İstanbul'un hangi ilçelerinde hizmet veriyorsunuz?",
      answer:
        "İstanbul'un tüm ilçelerinde proje yaptık: Adalar, Arnavutköy, Ataşehir, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Başakşehir, Bayrampaşa, Beşiktaş, Beykoz, Beylikdüzü, Beyoğlu, Büyükçekmece, Çatalca, Çekmeköy, Esenler, Esenyurt, Eyüpsultan, Fatih, Gaziosmanpaşa, Güngören, Kadıköy, Kağıthane, Kartal, Küçükçekmece, Maltepe, Pendik, Sancaktepe, Sarıyer, Silivri, Sultanbeyli, Sultangazi, Şile, Şişli, Tuzla, Ümraniye, Üsküdar ve Zeytinburnu. Keşif, montaj ve teknik servis Gaziosmanpaşa merkezimizden planlanır.",
    },
    {
      question: "Kiralık LED ekran haftalık ve aylık kiralanabilir mi? Depozito var mı?",
      answer:
        "Evet. İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Haftalık ve aylık kiralamalar aynı günlük m² fiyatı üzerinden hesaplanır. Depozito alınmaz. Kurulum ve nakliye ayrıca tekliflendirilir.",
    },
  ],
  ar: [
    {
      question: "كيف أختار الـ pitch لمسافة المشاهدة؟",
      answer:
        "في مشاريع ARLEDSCREEN / NXTIONSTAR نبدأ من أقرب مشاهد حرج: تقريباً 1 م لكل 1 مم pitch. غرف التحكم تحتاج pitch أدق؛ الواجهات الخارجية والـ totem قد تستخدم pitch أكبر.",
    },
    {
      question: "هل تدعمون خزائن 500×500 و500×1000؟",
      answer:
        "نعم. المُكوِّن وحزم العرض يغطيان الخزائن المربعة والطويلة لمرونة نسبة العرض إلى الارتفاع.",
    },
    {
      question: "كيف تُحسب الطاقة والإشارة؟",
      answer:
        "نحسب kW الذروة/المتوسط حسب المساحة والبيئة، نقترح توازن R-S-T ثلاثي الطور، ونختار CAT6A أو الألياف حسب طول المسار.",
    },
    {
      question: "من أين يمكن شراء NXTIONSTAR في تركيا؟",
      answer:
        "NXTIONSTAR هي العلامة التجارية الخاصة بـ ARLEDSCREEN، وARLEDSCREEN هي نقطة البيع الوحيدة لها في تركيا: المبيعات والهندسة وقطع الغيار.",
    },
    {
      question: "ما مدة تسليم شاشة LED؟",
      answer:
        "مدة التسليم: 3–21 يومًا للتجهيز + 1–14 يومًا للشحن. يعتمد التجهيز على المنتج والمقاس والمخزون، ويعتمد الشحن على عنوان التسليم. يُحدَّد تاريخ مشروعك في عرض السعر المكتوب.",
    },
    {
      question: "ما خيارات الدفع؟ هل يتوفر التقسيط؟",
      answer:
        "نعم، الدفع بالتقسيط متاح. نقبل الدفع بالليرة التركية والدولار واليورو وجميع العملات الأخرى. أسعار الألواح المنشورة بالدولار الأمريكي، وتُحدَّد خطة الدفع في عرض السعر المكتوب.",
    },
    {
      question: "هل تشحنون شاشات LED إلى خارج تركيا؟",
      answer:
        "نعم. نشحن شاشات LED إلى جميع دول أوروبا والشرق الأوسط والبلقان. منتجاتنا حاصلة على شهادة CE. الأسعار واحدة بجميع اللغات، ونقبل الدفع بالليرة التركية والدولار واليورو وعملات أخرى. يُسعَّر الشحن بشكل منفصل.",
    },
    {
      question: "في أي مناطق إسطنبول تقدمون خدماتكم؟",
      answer:
        "نفّذنا مشاريع في جميع مناطق إسطنبول: Adalar, Arnavutköy, Ataşehir, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Başakşehir, Bayrampaşa, Beşiktaş, Beykoz, Beylikdüzü, Beyoğlu, Büyükçekmece, Çatalca, Çekmeköy, Esenler, Esenyurt, Eyüpsultan, Fatih, Gaziosmanpaşa, Güngören, Kadıköy, Kağıthane, Kartal, Küçükçekmece, Maltepe, Pendik, Sancaktepe, Sarıyer, Silivri, Sultanbeyli, Sultangazi, Şile, Şişli, Tuzla, Ümraniye, Üsküdar وZeytinburnu. يُخطَّط للمعاينة والتركيب والخدمة الفنية من مقرنا في غازي عثمان باشا.",
    },
    {
      question: "هل يمكن استئجار شاشة LED أسبوعيًا أو شهريًا؟ هل يوجد تأمين؟",
      answer:
        "نعم. تأجير شاشات LED الداخلية والخارجية: 50 دولارًا أمريكيًا لكل م² يوميًا. يُحسب الإيجار الأسبوعي والشهري بالسعر اليومي نفسه لكل م². لا يُطلب أي تأمين. يُسعَّر التركيب والشحن بشكل منفصل.",
    },
  ],
  ru: [
    {
      question: "Как выбрать pixel pitch под дистанцию просмотра?",
      answer:
        "В проектах ARLEDSCREEN / NXTIONSTAR ориентируемся на ближайшего критичного зрителя: ≈1 м на 1 мм pitch. Для control room — мельче; для outdoor и totem можно крупнее.",
    },
    {
      question: "Поддерживаете кабинеты 500×500 и 500×1000?",
      answer:
        "Да. Конфигуратор и BOM охватывают квадратные и высокие кабинеты для гибкого соотношения сторон.",
    },
    {
      question: "Как рассчитывается питание и сигнал?",
      answer:
        "Считаем пиковую/среднюю мощность по площади и среде, рекомендуем баланс R-S-T и CAT6A или fiber по длине трассы.",
    },
    {
      question: "Где купить NXTIONSTAR в Турции?",
      answer:
        "NXTIONSTAR — собственный бренд ARLEDSCREEN; единственная точка продаж в Турции — ARLEDSCREEN: продажи, инжиниринг и запчасти.",
    },
    {
      question: "Каков срок поставки LED-экрана?",
      answer:
        "Срок поставки: 3–21 день подготовки + 1–14 дней доставки. Подготовка зависит от продукта, размера и наличия на складе, доставка — от адреса. Дата для вашего проекта указывается в письменном предложении.",
    },
    {
      question: "Какие способы оплаты? Возможна ли рассрочка?",
      answer:
        "Да, возможна оплата в рассрочку. Мы принимаем оплату в TL, USD, EUR и любых других валютах. Опубликованные цены панелей указаны в USD; график оплаты фиксируется в письменном предложении.",
    },
    {
      question: "Вы отправляете LED-экраны за границу?",
      answer:
        "Да. Мы поставляем LED-экраны во все страны Европы, Ближнего Востока и Балкан. Наша продукция имеет сертификат CE. Цены одинаковы на всех языках; оплата принимается в TL, USD, EUR и других валютах. Доставка рассчитывается отдельно.",
    },
    {
      question: "В каких районах Стамбула вы работаете?",
      answer:
        "Мы выполняли проекты во всех районах Стамбула: Adalar, Arnavutköy, Ataşehir, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Başakşehir, Bayrampaşa, Beşiktaş, Beykoz, Beylikdüzü, Beyoğlu, Büyükçekmece, Çatalca, Çekmeköy, Esenler, Esenyurt, Eyüpsultan, Fatih, Gaziosmanpaşa, Güngören, Kadıköy, Kağıthane, Kartal, Küçükçekmece, Maltepe, Pendik, Sancaktepe, Sarıyer, Silivri, Sultanbeyli, Sultangazi, Şile, Şişli, Tuzla, Ümraniye, Üsküdar и Zeytinburnu. Выезд, монтаж и сервис планируются из нашего офиса в Газиосманпаше.",
    },
    {
      question: "Можно ли арендовать LED-экран на неделю или месяц? Нужен ли депозит?",
      answer:
        "Да. Аренда LED-экрана для помещений и улицы: 50 USD за м² в день. Недельная и месячная аренда считается по той же дневной ставке за м². Депозит не требуется. Монтаж и доставка рассчитываются отдельно.",
    },
  ],
};

/** @deprecated Prefer getFaqs(locale) */
export const faqs: FaqItem[] = faqsByLocale.en;

export function getFaqs(locale: Locale): FaqItem[] {
  return faqsByLocale[locale] ?? faqsByLocale.en;
}
