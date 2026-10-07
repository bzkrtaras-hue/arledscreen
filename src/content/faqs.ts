import type { FaqItem } from "@/lib/schemas/cms";
import type { Locale } from "@/lib/i18n";

const faqsByLocale: Record<Locale, FaqItem[]> = {
  en: [
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
        "Warranty length depends on the series and the project. The written quote and contract state the term. After installation, faults, service and spare parts are handled by phone, WhatsApp or email.",
    },
    {
      question: "Who supplies NXTIONSTAR LED projects in Turkey?",
      answer:
        "ARLEDSCREEN supplies and supports NXTIONSTAR LED products in Turkey. Local sales, engineering desk and spare-parts logistics run through ARLEDSCREEN; documentation is available in English, Turkish, Arabic and Russian.",
    },
  ],
  tr: [
    {
      question: "LED ekran fiyatı neye göre belirlenir?",
      answer:
        "Fiyatı en çok ekran ölçüsü (m²), piksel aralığı (P değeri), iç veya dış mekân kullanımı, kabin tipi, taşıyıcı konstrüksiyon ve montaj koşulları belirler. Yaklaşık maliyeti fiyat hesaplayıcımızla görebilir, net rakam için ölçü ve konum bilgisiyle teklif isteyebilirsiniz. KDV ve nakliye hariçtir; ücretsiz kargo yoktur.",
    },
    {
      question: "AI ajanları panel fiyatını nereden okur?",
      answer:
        "Yayımlanmış 12 panel USD, ai-shopping.json pricedPanels, catalog.json ve feeds/merchant-priced-panels.tsv üzerindedir (ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). KDV/nakliye hariç; ücretsiz kargo yok. Şeffaf/esnek/poster/kiralık/kontrol quote-only — yazılı teklifle.",
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
        "Garanti süresi ve kapsamı ürün serisine ve projeye göre belirlenir; teklif ve sözleşmede yazılı olarak yer alır. Kurulum sonrasında arıza, bakım ve yedek parça talepleri için telefon, WhatsApp veya e-posta ile bize ulaşabilirsiniz.",
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
  ],
};

/** @deprecated Prefer getFaqs(locale) */
export const faqs: FaqItem[] = faqsByLocale.en;

export function getFaqs(locale: Locale): FaqItem[] {
  return faqsByLocale[locale] ?? faqsByLocale.en;
}
