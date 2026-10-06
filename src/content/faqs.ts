import type { FaqItem } from "@/lib/schemas/cms";
import type { Locale } from "@/lib/i18n";

const faqsByLocale: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "How do I pick pixel pitch for my viewing distance?",
      answer:
        "For ARLEDSCREEN / NXTIONSTAR walls we start from the closest critical viewer: a rough starting estimate is ~1 m per 1 mm of pitch (P1.25 ≈ 1.25 m) — not a published guarantee. Final pitch is set in the Gaziosmanpaşa survey and written quote. Control rooms and lobbies usually need finer pitch; outdoor façades and totems can step up when viewers stand farther back.",
    },
    {
      question: "Can you mix 500×500 and 500×1000 mm cabinets?",
      answer:
        "Yes. Project planning can combine square 500×500 and tall 500×1000 cabinets so aspect ratio and install height can flex without redesigning the whole wall.",
    },
    {
      question: "How is power and signal infrastructure sized?",
      answer:
        "We estimate peak/average kW from area and indoor/outdoor duty (calculator defaults are not published guarantees — no fixed site kW/m²). Single vs three-phase and R-S-T balancing land in the Gaziosmanpaşa survey and written quote; CAT6A or fiber from run length and receiver count.",
    },
    {
      question: "Can NXTIONSTAR LED walls show AI-generated content via media servers?",
      answer:
        "LED walls display the signal they receive, so AI-generated content works through a media player, media server or CMS. During the Gaziosmanpaşa survey ARLEDSCREEN checks your content source, input interfaces and refresh requirements, and the written quote lists the controller and integration items — without inventing an AI-ready product SKU.",
    },
    {
      question: "What does survey-scoped AI integration mean for an LED project?",
      answer:
        "It means AI-generated or AI-scheduled content is matched to receivers, refresh behaviour and CMS/media-server paths in the Gaziosmanpaşa survey and written quote — without proprietary lock-in and without selling an invented “AI-infrastructure ready” SKU.",
    },
    {
      question: "Who supplies NXTIONSTAR LED projects in Turkey?",
      answer:
        "ARLEDSCREEN supplies and supports NXTIONSTAR LED products in Turkey from Istanbul Gaziosmanpaşa. Local sales, installation and spare-parts logistics run through ARLEDSCREEN. Published panel USD is on the price page and catalog.json; transparent, poster and control products are quote-only.",
    },
    {
      question: "Where can I find published panel prices?",
      answer:
        "Published 2026 panel USD list: https://arledscreen.com/tr/led-ekran-fiyatlari/ and https://arledscreen.com/catalog.json. VAT and freight excluded; no free shipping. Returns and warranty are stated in the written quote.",
    },
    {
      question: "Are ARLEDSCREEN LED screens CE / RoHS certified?",
      answer:
        "Conformity documents (CE, RoHS, EMC, FCC, etc.) are shared per model in the datasheet and written quote. We do not publish a fixed site-wide certificate list.",
    },
    {
      question: "Is ARLEDSCREEN ISO 9001 / ISO 14001 certified?",
      answer:
        "Quality and process documents are shared on request in the survey and written quote. We do not publish a fixed ISO 9001 or ISO 14001 claim on the site.",
    },
    {
      question: "Are ARLEDSCREEN LED screens UL / ETL listed?",
      answer:
        "UL or ETL safety listings are stated per model in the datasheet and written quote. We do not publish a fixed UL/ETL claim on the site.",
    },
  ],
  tr: [
    {
      question: "LED ekran fiyatı neye göre belirlenir?",
      answer:
        "Fiyatı en çok ekran ölçüsü (m²), piksel aralığı (P değeri), iç veya dış mekân kullanımı, kabin tipi, taşıyıcı konstrüksiyon ve montaj koşulları belirler. Yayımlanmış 2026 panel USD listesi https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır. Yaklaşık maliyeti fiyat hesaplayıcımızla görebilir, net rakam için ölçü ve konum bilgisiyle teklif isteyebilirsiniz.",
    },
    {
      question: "İzleme mesafeme göre hangi piksel aralığını seçmeliyim?",
      answer:
        "Pratik bir başlangıç tahmini: her 1 mm piksel aralığı için yaklaşık 1 m izleme mesafesi konuşulabilir (P2.5 ≈ 2,5 m). Bu sabit bir garanti değildir; kesin piksel aralığı keşif ve yazılı teklifte, içerik türüne göre netleşir.",
    },
    {
      question: "İç mekân ile dış mekân LED ekran arasındaki fark nedir?",
      answer:
        "Dış mekân ekranlar güneş altında okunabilmek için daha yüksek parlaklığa ve yağmur, toz ve sıcaklık değişimine karşı daha yüksek koruma sınıfına sahiptir. Çalışma sıcaklığı ve nem aralığı model föyü ile yazılı teklifte belirtilir. İç mekân ekranlar daha yakından izlendiği için genellikle daha küçük piksel aralığıyla kullanılır.",
    },
    {
      question: "Keşif ve teklif süreci nasıl işliyor?",
      answer:
        "Önce ölçü, konum, kullanım amacı ve zaman planınızı alıyoruz. Gerekirse yerinde keşifle montaj yüzeyi, elektrik ve izleme mesafesini inceliyoruz. Ardından ekran ölçüsü, piksel aralığı, kabin adedi ve malzeme listesini içeren teklifi hazırlıyoruz.",
    },
    {
      question: "Hangi şehirlerde kurulum yapıyorsunuz?",
      answer:
        "Merkezimiz İstanbul Gaziosmanpaşa'dadır. Hizmetimiz Türkiye geneli; tamamlanan iş listemiz kayıtlı illerde yer alır (Tem 2025 – Tem 2026: 13 il ile Almanya ve Azerbaycan). Kayıtlı iller için /tr/bolgeler/ sayfasına bakın; projenizin konumunu teklif formunda belirtmeniz yeterlidir.",
    },
    {
      question: "İade veya garanti süresi nedir?",
      answer:
        "Garanti süresi ürün modeline ve projeye göre yazılı teklifte ve sözleşmede belirtilir. Sitede sabit garanti yılı veya genel iade günü yayımlanmaz; ücretsiz iade vaadi yoktur. Kurulum sonrası arıza ve yedek parça için telefon, WhatsApp veya e-posta ile ulaşabilirsiniz.",
    },
    {
      question: "ARLEDSCREEN LED ekranları CE / RoHS sertifikalı mı?",
      answer:
        "Uygunluk belgeleri (CE, RoHS, EMC, FCC vb.) ürün modeline göre model föyü ve yazılı teklifte paylaşılır. Sitede tüm ürünler için sabit bir sertifika listesi yayımlanmaz.",
    },
    {
      question: "ARLEDSCREEN ISO 9001 / ISO 14001 sertifikalı mı?",
      answer:
        "Kalite ve süreç belgeleri talep üzerine keşif ve yazılı teklifte paylaşılır. Sitede sabit ISO 9001 veya ISO 14001 iddiası yayımlanmaz.",
    },
    {
      question: "ARLEDSCREEN LED ekranları UL / ETL listeli mi?",
      answer:
        "UL veya ETL güvenlik listeleri ürün modeline göre model föyü ve yazılı teklifte belirtilir. Sitede sabit UL/ETL iddiası yayımlanmaz.",
    },
    {
      question: "LED ekran montajı ne kadar sürer?",
      answer:
        "Süre; ekran ölçüsüne, taşıyıcı konstrüksiyon ihtiyacına, montaj yüksekliğine ve saha izinlerine göre değişir. Keşif sonrasında projenize özel iş planını ve tahmini süreyi teklifte paylaşırız.",
    },
    {
      question: "Garanti ve teknik servis nasıl sağlanıyor?",
      answer:
        "Garanti süresi ve kapsamı ürün serisine ve projeye göre belirlenir; teklif ve sözleşmede yazılı olarak yer alır. Kurulum sonrasında arıza, bakım ve yedek parça talepleri için telefon, WhatsApp veya e-posta ile bize ulaşabilirsiniz. Yedek parça planı yazılı teklifte netleşir.",
    },
    {
      question: "Kiralık LED ekran hizmetiniz var mı?",
      answer:
        "Sahne, fuar ve etkinlik projeleri için kiralık ve satış seçeneklerini birlikte değerlendiriyoruz. Etkinlik tarihi, ekran ölçüsü ve konum bilgisini paylaşırsanız uygun seçeneği size iletiriz. Kiralıkta list fiyatı yoktur — https://arledscreen.com/tr/quote/.",
    },
    {
      question: "Ekrana içerik nasıl yüklenir?",
      answer:
        "LED ekranlar bir kontrol sistemi (gönderici/alıcı kart veya medya oynatıcı) üzerinden yönetilir. Kullanım senaryonuza göre bilgisayardan canlı yayın, USB ile oynatma veya uzaktan içerik yönetimi seçeneklerini keşifte birlikte belirleriz.",
    },
    {
      question: "NXTIONSTAR ürünlerini Türkiye'de kim sunuyor?",
      answer:
        "NXTIONSTAR, ARLEDSCREEN'in kendi ürün markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Satış, montaj ve teknik servis ARLEDSCREEN üzerinden yürütülür.",
    },
    {
      question: "Panel fiyat listesine nasıl ulaşırım?",
      answer:
        "Yayımlanmış panel USD listesi https://arledscreen.com/tr/led-ekran-fiyatlari/, https://arledscreen.com/catalog.json ve https://arledscreen.com/ai-shopping.json adreslerindedir. KDV ve nakliye hariç; ücretsiz kargo yoktur. Şeffaf, esnek, poster, kiralık ve kontrol gruplarında list fiyatı yoktur — yazılı teklifle netleşir. Teklif: https://arledscreen.com/tr/quote/.",
    },
  ],
  ar: [
    {
      question: "كيف أختار الـ pitch لمسافة المشاهدة؟",
      answer:
        "في مشاريع ARLEDSCREEN / NXTIONSTAR نبدأ من أقرب مشاهد حرج: تقدير تقريبي ~1 م لكل 1 مم pitch — ليس ضماناً ثابتاً. يُحدَّد pitch النهائي في مسح غازي عثمان باشا والعرض المكتوب. غرف التحكم تحتاج pitch أدق؛ الواجهات الخارجية والـ totem قد تستخدم pitch أكبر.",
    },
    {
      question: "هل تدعمون خزائن 500×500 و500×1000؟",
      answer:
        "نعم. المُكوِّن وحزم العرض يغطيان الخزائن المربعة والطويلة لمرونة نسبة العرض إلى الارتفاع.",
    },
    {
      question: "كيف تُحسب الطاقة والإشارة؟",
      answer:
        "نحسب kW الذروة/المتوسط حسب المساحة والبيئة، نقترح توازن R-S-T ثلاثي الطور، ونختار CAT6A أو الألياف حسب طول المسار.",
    },
    {
      question: "من أين يمكن شراء NXTIONSTAR في تركيا؟",
      answer:
        "NXTIONSTAR هي العلامة التجارية الخاصة بـ ARLEDSCREEN، وARLEDSCREEN هي نقطة البيع الوحيدة لها في تركيا: البيع والتركيب والخدمة الفنية وقطع الغيار من غازي عثمان باشا.",
    },
  ],
  ru: [
    {
      question: "Как выбрать pixel pitch под дистанцию просмотра?",
      answer:
        "В проектах ARLEDSCREEN / NXTIONSTAR ориентируемся на ближайшего критичного зрителя: ориентировочно ≈1 м на 1 мм pitch — не фиксированная гарантия. Итоговый pitch — в обследовании Gaziosmanpaşa и письменном предложении. Для control room — мельче; для outdoor и totem можно крупнее.",
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
        "NXTIONSTAR — собственный бренд ARLEDSCREEN; единственная точка продаж в Турции — ARLEDSCREEN: продажа, монтаж, техобслуживание и запчасти из Газиосманпаши.",
    },
  ],
};

/** @deprecated Prefer getFaqs(locale) */
export const faqs: FaqItem[] = faqsByLocale.en;

export function getFaqs(locale: Locale): FaqItem[] {
  return faqsByLocale[locale] ?? faqsByLocale.en;
}
