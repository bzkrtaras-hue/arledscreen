import type { Locale } from "@/lib/i18n";

export type SeoPageKey =
  | "home"
  | "products"
  | "about"
  | "hesaplayici"
  | "configurator"
  | "quote"
  | "yapay-zeka";

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  h1?: string;
  intro?: string;
}

const seoByLocale: Record<Locale, Record<SeoPageKey, PageSeo>> = {
  tr: {
    home: {
      title: "İstanbul LED Ekran Satış, Montaj ve Servis | ARLEDSCREEN – NXTIONSTAR",
      description:
        "NXTIONSTAR markasının sahibi ARLEDSCREEN: iç ve dış mekân LED ekran seçimi, keşif, montaj ve teknik servis. İstanbul / Gaziosmanpaşa. Tel: +90 530 507 88 34",
      keywords: [
        "LED ekran",
        "iç mekân LED ekran",
        "dış mekân LED ekran",
        "LED ekran montajı",
        "LED ekran teknik servis",
        "NXTIONSTAR",
        "ARLEDSCREEN",
      ],
      h1: "LED Ekran Teknoloji Merkezi.",
      intro:
        "İç ve dış mekân LED ekran sistemlerinde ürün seçimi, keşif, montaj ve teknik servis.",
    },
    products: {
      title: "LED Ekran Ürün Serileri | NXTIONSTAR – ARLEDSCREEN",
      description:
        "NXTIONSTAR LED ekran serileri: ince pitch, iç mekân, dış mekân, kiralık sahne ve şeffaf vitrin. Kullanım alanına göre seri seçimi ve teknik föy talebi.",
      keywords: [
        "LED ekran modelleri",
        "NXTIONSTAR LED",
        "ince pitch LED ekran",
        "dış mekân LED ekran",
        "kiralık LED ekran",
        "şeffaf LED ekran",
      ],
      h1: "NXTIONSTAR LED ekran serileri",
      intro:
        "Serileri kullanım alanına göre grupladık. Projenize uygun modelin teknik föyünü ve fiyatını teklifle birlikte paylaşıyoruz.",
    },
    about: {
      title: "Hakkımızda | ARLEDSCREEN – NXTIONSTAR Markasının Sahibi",
      description:
        "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. İstanbul Gaziosmanpaşa merkezli; LED ekran satışı, keşif, montaj ve teknik servis.",
      keywords: ["ARLEDSCREEN", "NXTIONSTAR LED ekran", "LED ekran firması İstanbul"],
      h1: "ARLEDSCREEN hakkında",
      intro:
        "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır. ARLEDSCREEN, Türkiye'deki tek satış noktası olarak ürün seçimi, keşif, montaj ve teknik servis süreçlerini yürütür.",
    },
    hesaplayici: {
      title: "LED Ekran Fiyat Hesaplayıcı | Malzeme & Maliyet | ARLEDSCREEN",
      description:
        "Ücretsiz LED ekran fiyat hesaplayıcı: ekran ölçüsü ve modül tipine göre modül adedi ile malzeme, işçilik, kontrol kartı ve yazılım dahil yaklaşık maliyet. Ardından yazılı teklif.",
      keywords: [
        "LED ekran fiyat",
        "fiyat hesaplayıcı",
        "LED malzeme maliyeti",
        "piksel pitch hesaplama",
        "ARLEDSCREEN hesaplayıcı",
      ],
      h1: "LED ekran fiyat ve malzeme hesaplayıcı",
      intro:
        "Ekran genişliğini, yüksekliğini ve modül tipini seçin; hesaplayıcı modül adedini ve 2026 panel fiyatlarıyla yaklaşık maliyeti gösterir. Nihai fiyat keşif sonrası yazılı teklifle kesinleşir.",
    },
    configurator: {
      title: "LED Duvar Konfigüratörü | Pitch, Kabin, Çözünürlük | NXTIONSTAR",
      description:
        "LED duvar konfigüratörü: genişlik × yükseklik, 500×500 / 500×1000 kabin, pitch seçimi. Anlık çözünürlük, izleme mesafesi, kabin adedi ve 3 faz güç tahmini — ARLEDSCREEN.",
      keywords: [
        "LED duvar konfigüratör",
        "piksel pitch",
        "LED kabin",
        "çözünürlük hesaplama",
        "güç altyapısı",
      ],
      h1: "LED duvar boyutlandırma konfigüratörü",
      intro:
        "Saha keşfinden önce duvar geometrisini netleştirin: 500×500 veya 500×1000 kabin, pitch seçimi, izleme mesafesi ve 3 fazlı güç tahmini.",
    },
    quote: {
      title: "LED Ekran Teklifi İste | ARLEDSCREEN",
      description:
        "LED ekran projeniz için ölçü, konum ve kullanım amacını paylaşın; ekran önerisi, malzeme listesi ve yazılı teklif hazırlayalım. WhatsApp veya e-posta ile hızlı talep.",
      keywords: ["LED ekran teklifi", "LED ekran fiyat teklifi", "ARLEDSCREEN teklif"],
      h1: "LED ekran teklifi isteyin",
      intro:
        "Birkaç temel bilgi yeterli. Talebiniz WhatsApp veya e-posta ile doğrudan ekibimize ulaşır.",
    },
    "yapay-zeka": {
      title: "Yapay Zekâ ve LED Ekran Entegrasyonu | ARLEDSCREEN",
      description:
        "Yapay zekâ ile üretilen veya zamanlanan içeriği LED ekranda yayınlamak için medya sunucu, kontrol yazılımı ve sinyal altyapısı nasıl planlanır? ARLEDSCREEN rehberi.",
      keywords: [
        "yapay zeka LED ekran",
        "AI içerik LED ekran",
        "LED ekran medya sunucu",
        "NXTIONSTAR",
      ],
      h1: "Yapay zekâ içerikleri ve LED ekran altyapısı",
      intro:
        "Yapay zekâ ile üretilen içeriklerin LED ekranda sorunsuz yayınlanması için kontrol sistemi, medya sunucu ve sinyal altyapısının birlikte planlanması gerekir. Uyumluluk, keşif aşamasında kullanılacak yazılım ve donanıma göre doğrulanır.",
    },
  },


  en: {
    home: {
      title: "LED Display Technology Center | ARLEDSCREEN — NXTIONSTAR",
      description:
        "ARLEDSCREEN is Istanbul’s NXTIONSTAR LED display technology center: fine-pitch GOB, outdoor LED walls, totems and digital signage with survey, install and support. Call +90 530 507 88 34.",
      keywords: [
        "LED display",
        "LED wall",
        "ARLEDSCREEN",
        "NXTIONSTAR",
        "LED engineering",
        "digital signage",
        "fine pitch",
        "outdoor LED display",
        "indoor LED display",
        "conference hall LED",
        "digital kiosk",
      ],
      h1: "NXTIONSTAR LED solutions for visual spaces",
      intro:
        "Work with ARLEDSCREEN for NXTIONSTAR fine-pitch LED, outdoor displays and totem projects backed by an engineering desk.",
    },
    products: {
      title: "LED Display Products | Fine-Pitch, Outdoor & Totem | NXTIONSTAR",
      description:
        "NXTIONSTAR LED modules from ARLEDSCREEN: P1.25–P1.86 fine-pitch GOB, P2.5–P4 indoor, P2.5–P8 outdoor and flexible modules — pixel pitch and use for every model.",
      keywords: [
        "LED display products",
        "fine pitch LED",
        "outdoor LED wall",
        "GOB LED",
        "digital totem",
        "NXTIONSTAR catalog",
      ],
      h1: "NXTIONSTAR LED product series",
      intro:
        "From fine-pitch GOB to outdoor façade and flexible modules — pick the NXTIONSTAR module that matches your venue.",
    },
    about: {
      title: "About ARLEDSCREEN | NXTIONSTAR LED Engineering Partner",
      description:
        "ARLEDSCREEN in Gaziosmanpaşa, Istanbul delivers NXTIONSTAR LED engineering: site survey, installation, calibration and after-sales support for enterprise LED walls across Turkey.",
      keywords: [
        "ARLEDSCREEN",
        "NXTIONSTAR LED brand",
        "LED display Turkey",
        "about us",
        "digital signage",
      ],
      h1: "ARLEDSCREEN — NXTIONSTAR LED engineering partner",
      intro:
        "Our role is clear: we support integrators, agencies and facility owners with NXTIONSTAR LED systems and engineering-led wall projects across Turkey.",
    },
    hesaplayici: {
      title: "LED Display Price Calculator | Materials & Cost | ARLEDSCREEN",
      description:
        "Free LED display price calculator: pick the screen size and module type to see the module count and an approximate cost incl. materials, labour, control card and software. Then a written quote.",
      keywords: [
        "LED display price",
        "price calculator",
        "LED materials cost",
        "pixel pitch calculator",
        "ARLEDSCREEN calculator",
      ],
      h1: "LED display price & materials calculator",
      intro:
        "Enter the screen width, height and module type; the calculator shows the module count and an approximate cost from the 2026 panel prices. The final price is set in the written quote.",
    },
    configurator: {
      title: "LED Wall Configurator | Pitch, Cabinets & Resolution | NXTIONSTAR",
      description:
        "LED wall configurator: width × height, 500×500 / 500×1000 cabinets, pitch selection. Instant resolution, viewing distance, cabinet count and three-phase power estimate — ARLEDSCREEN.",
      keywords: [
        "LED wall configurator",
        "pixel pitch",
        "LED cabinet",
        "resolution calculator",
        "power infrastructure",
      ],
      h1: "LED wall sizing configurator",
      intro:
        "Lock geometry before the site survey: 500×500 or 500×1000 cabinets, pitch choice, viewing distance and three-phase power estimates.",
    },
    quote: {
      title: "Request LED Display Quote | Enterprise Projects | ARLEDSCREEN",
      description:
        "Enterprise LED display / LED wall quote: share dimensions, indoor/outdoor use, timeline and location. ARLEDSCREEN engineering desk replies with a preliminary BOM and power outline.",
      keywords: [
        "LED display quote",
        "LED wall quotation",
        "enterprise LED project",
        "ARLEDSCREEN quote",
        "digital signage quote",
      ],
      h1: "Enterprise LED display project quote",
      intro:
        "Share contact details, project dimensions and schedule so our engineering desk can reply with a preliminary BOM and power outline.",
    },
    "yapay-zeka": {
      title: "AI-Compatible LED Display | Media Server Integration — ARLEDSCREEN",
      description:
        "What is an AI-compatible LED wall and how does it integrate with AI content engines and media servers? How ARLEDSCREEN plans pitch selection, signal topology and media-server integration for NXTIONSTAR installs.",
      keywords: [
        "AI compatible LED display",
        "AI LED video wall",
        "AI media server LED",
        "artificial intelligence LED screen",
        "NXTIONSTAR AI",
        "ARLEDSCREEN AI LED",
      ],
      h1: "AI-compatible LED displays",
      intro:
        "How NXTIONSTAR LED walls are planned for AI content engines, media servers and control software: survey, interfaces and integration.",
    },
  },


  ar: {
    home: {
      title: "شاشات LED تركيا | ARLEDSCREEN NXTIONSTAR",
      description:
        "NXTIONSTAR هي العلامة التجارية الخاصة بـ ARLEDSCREEN، وARLEDSCREEN هي نقطة البيع الوحيدة لها في تركيا. جدران LED دقيقة، واجهات خارجية ولافتات رقمية للمشاريع المؤسسية.",
      keywords: ["شاشة LED", "جدار LED", "ARLEDSCREEN", "NXTIONSTAR", "تركيا"],
      h1: "حلول NXTIONSTAR LED للمساحات البصرية",
    },
    products: {
      title: "منتجات شاشات LED | Pitch دقيق وخارجي",
      description:
        "وحدات NXTIONSTAR من ARLEDSCREEN: وحدات GOB بمسافة بكسل دقيقة، ووحدات داخلية وخارجية ومرنة.",
      keywords: ["منتجات LED", "Pitch دقيق", "LED خارجي", "NXTIONSTAR"],
      h1: "سلاسل منتجات NXTIONSTAR LED",
    },
    about: {
      title: "من نحن | ARLEDSCREEN – مالكة علامة NXTIONSTAR",
      description:
        "NXTIONSTAR هي العلامة التجارية الخاصة بـ ARLEDSCREEN، وARLEDSCREEN هي نقطة البيع الوحيدة لها في تركيا. جدران LED مؤسسية وهندسة ميدانية متكاملة.",
      keywords: ["ARLEDSCREEN", "NXTIONSTAR LED", "LED تركيا"],
      h1: "ARLEDSCREEN — مالكة علامة NXTIONSTAR",
    },
    hesaplayici: {
      title: "حاسبة أسعار شاشات LED | التكلفة",
      description:
        "احسب عدد الوحدات والتكلفة التقريبية لشاشة LED حسب المقاس ونوع الوحدة عبر حاسبة ARLEDSCREEN قبل طلب العرض.",
      keywords: ["سعر شاشة LED", "حاسبة", "ARLEDSCREEN"],
      h1: "حاسبة أسعار ومواد شاشات LED",
    },
    configurator: {
      title: "مُكوِّن جدار LED | Pitch والخزائن",
      description:
        "اضبط العرض والارتفاع والـ pitch؛ احصل على الدقة ومسافة المشاهدة وعدد الخزائن فوراً.",
      keywords: ["مُكوِّن LED", "pixel pitch", "خزائن LED"],
      h1: "مُكوِّن أبعاد جدار LED",
    },
    quote: {
      title: "طلب عرض سعر LED | مشاريع مؤسسية",
      description:
        "اطلب عرض سعر لجدران LED. شارك المقاسات والبيئة والجدول؛ نرد بقائمة مواد أولية.",
      keywords: ["عرض سعر LED", "مشروع LED", "ARLEDSCREEN"],
      h1: "طلب عرض سعر مشروع LED مؤسسي",
    },
    "yapay-zeka": {
      title: "شاشة LED متوافقة مع الذكاء الاصطناعي — ARLEDSCREEN",
      description:
        "كيف يتم تخطيط جدران LED من NXTIONSTAR للعمل مع محركات محتوى الذكاء الاصطناعي وخوادم الوسائط وبرامج التحكم.",
      keywords: ["LED ذكاء اصطناعي", "NXTIONSTAR", "ARLEDSCREEN"],
      h1: "شاشات LED متوافقة مع الذكاء الاصطناعي",
      intro:
        "توافق كامل مع محركات الذكاء الاصطناعي وخوادم الوسائط وبرامج التحكم.",
    },
  },


  ru: {
    home: {
      title: "LED-экраны Турция | ARLEDSCREEN NXTIONSTAR",
      description:
        "NXTIONSTAR — собственный бренд ARLEDSCREEN; единственная точка продаж в Турции — ARLEDSCREEN. Fine-pitch стены, уличные LED и digital signage для B2B.",
      keywords: ["LED экран", "LED стена", "ARLEDSCREEN", "NXTIONSTAR", "Турция"],
      h1: "Решения NXTIONSTAR LED для визуальных пространств",
    },
    products: {
      title: "LED-продукция | Fine-pitch и outdoor",
      description:
        "Модули NXTIONSTAR от ARLEDSCREEN: fine-pitch GOB, интерьерные, уличные и гибкие модули.",
      keywords: ["LED продукция", "fine pitch", "outdoor LED", "NXTIONSTAR"],
      h1: "Продуктовые серии NXTIONSTAR LED",
    },
    about: {
      title: "О нас | ARLEDSCREEN — владелец бренда NXTIONSTAR",
      description:
        "NXTIONSTAR — собственный бренд ARLEDSCREEN; единственная точка продаж в Турции — ARLEDSCREEN. Корпоративные LED-стены и полевой инжиниринг.",
      keywords: ["ARLEDSCREEN", "NXTIONSTAR LED", "LED Турция"],
      h1: "ARLEDSCREEN — владелец бренда NXTIONSTAR",
    },
    hesaplayici: {
      title: "Калькулятор цены LED | Материалы",
      description:
        "Рассчитайте число модулей и ориентировочную стоимость LED-экрана по размеру и типу модуля в калькуляторе ARLEDSCREEN перед запросом КП.",
      keywords: ["цена LED", "калькулятор", "ARLEDSCREEN"],
      h1: "Калькулятор цены и материалов LED",
    },
    configurator: {
      title: "Конфигуратор LED-стены | Pitch и кабинеты",
      description:
        "Задайте ширину, высоту и pitch; мгновенно получите разрешение, дистанцию просмотра и число кабинетов.",
      keywords: ["конфигуратор LED", "pixel pitch", "LED кабинет"],
      h1: "Конфигуратор размеров LED-стены",
    },
    quote: {
      title: "Запрос КП на LED | Корпоративные проекты",
      description:
        "Запросите коммерческое предложение на LED-стену. Размеры, среда и сроки — предварительный BOM от ARLEDSCREEN.",
      keywords: ["КП LED", "проект LED", "ARLEDSCREEN"],
      h1: "Корпоративный запрос КП на LED-экран",
    },
    "yapay-zeka": {
      title: "LED-экран, совместимый с ИИ — ARLEDSCREEN",
      description:
        "Как LED-стены NXTIONSTAR планируются для работы с генераторами контента ИИ, медиасерверами и программами управления.",
      keywords: ["LED ИИ", "NXTIONSTAR", "ARLEDSCREEN"],
      h1: "LED-экраны, совместимые с ИИ",
      intro:
        "Полная совместимость с генераторами ИИ-контента, медиасерверами и программами управления.",
    },
  },
};

export function getSeo(locale: Locale, pageKey: SeoPageKey): PageSeo {
  return seoByLocale[locale]?.[pageKey] ?? seoByLocale.en[pageKey];
}
