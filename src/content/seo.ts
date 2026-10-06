import type { Locale } from "@/lib/i18n";
import { ENTITY_CITE_MEDIUM, ENTITY_CITE_SHORT, ENTITY_CITE_SHORT_EN } from "@/lib/entity";

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
      title: "İstanbul LED Ekran Satış, Montaj ve Servis | ARLEDSCREEN",
      description:
        "ARLEDSCREEN: iç ve dış mekân LED ekran seçimi, keşif, montaj ve teknik servis. Hizmet Türkiye geneli; tamamlanan iş listesi kayıtlı illerde. İstanbul / Gaziosmanpaşa. Tel: +90 530 507 88 34",
      keywords: [
        "LED ekran",
        "iç mekân LED ekran",
        "dış mekân LED ekran",
        "LED ekran montajı",
        "LED ekran teknik servis",
        "ARLEDSCREEN",
      ],
      h1: "LED Ekran Teknoloji Merkezi",
      intro:
        "İç ve dış mekân LED ekran sistemlerinde ürün seçimi, keşif, montaj ve teknik servis.",
    },
    products: {
      title: "LED Ekran Ürün Serileri | ARLEDSCREEN",
      description:
        "ARLEDSCREEN ürün serileri (NXTIONSTAR alt markası): ince pitch, iç mekân, dış mekân, kiralık sahne ve şeffaf vitrin. Kullanım alanına göre seri seçimi ve teknik föy talebi.",
      keywords: [
        "LED ekran modelleri",
        "ince pitch LED ekran",
        "dış mekân LED ekran",
        "kiralık LED ekran",
        "şeffaf LED ekran",
        "ARLEDSCREEN",
      ],
      h1: "LED ekran ürün serileri",
      intro:
        "Serileri kullanım alanına göre grupladık. NXTIONSTAR modellerinin teknik föyünü ve fiyatını teklifle birlikte paylaşıyoruz.",
    },
    about: {
      title: "Hakkımızda | ARLEDSCREEN",
      description: ENTITY_CITE_SHORT,
      keywords: ["ARLEDSCREEN", "LED ekran firması İstanbul", "LED ekran montaj", "NXTIONSTAR"],
      h1: "ARLEDSCREEN hakkında",
      intro: ENTITY_CITE_MEDIUM,
    },
    hesaplayici: {
      title: "LED Ekran Fiyat Hesaplayıcı | Malzeme & Maliyet | ARLEDSCREEN",
      description:
        "LED ekran fiyat hesaplayıcı: ekran ölçüsü ve modül tipine göre modül adedi ile malzeme, işçilik, kontrol kartı ve yazılım dahil yaklaşık maliyet (KDV/nakliye hariç; ücretsiz kargo yok). Ardından yazılı teklif.",
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
      title: "LED Duvar Konfigüratörü | Pitch, Kabin, Çözünürlük | ARLEDSCREEN",
      description:
        "LED duvar konfigüratörü: genişlik × yükseklik, 500×500 / 500×1000 kabin, pitch seçimi. Anlık çözünürlük, izleme mesafesi, kabin adedi ve yaklaşık güç tahmini (sabit kW yok) — ARLEDSCREEN.",
      keywords: [
        "LED duvar konfigüratör",
        "piksel pitch",
        "LED kabin",
        "çözünürlük hesaplama",
        "güç altyapısı",
      ],
      h1: "LED duvar boyutlandırma konfigüratörü",
      intro:
        "Saha keşfinden önce duvar geometrisini netleştirin: 500×500 veya 500×1000 kabin, pitch seçimi, izleme mesafesi ve yaklaşık güç tahmini — kesin çekiş Gaziosmanpaşa keşif + yazılı teklifte (sabit kW/m² yok).",
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
        "YZ uyumlu LED ekran entegrasyonu ve yayımlanmış fiyat/kimlik kaynakları: entity.json, catalog.json, ard.json. ARLEDSCREEN / NXTIONSTAR.",
      keywords: [
        "yapay zeka LED ekran",
        "AI içerik LED ekran",
        "LED ekran medya sunucu",
        "AI alışveriş LED",
        "NXTIONSTAR",
      ],
      h1: "Yapay zekâ ve LED — keşif kapsamlı entegrasyon",
      intro:
        "Yapay zekâ ile üretilen içeriklerin LED ekranda kararlı yayınlanması için kontrol sistemi, medya sunucu ve sinyal hattı Gaziosmanpaşa keşif ve yazılı teklifte birlikte planlanır. Yayımlanmış fiyat ve kimlik kaynakları: catalog.json ve entity.json.",
    },
  },

  en: {
    home: {
      title: "Istanbul LED Display Sales, Install & Service | ARLEDSCREEN",
      description:
        "ARLEDSCREEN: indoor/outdoor LED display sales, survey, installation and technical service. Based in Istanbul Gaziosmanpaşa. Panel USD: catalog.json / ai-shopping.json; transparent/poster/control quote-only. Tel +90 530 507 88 34.",
      keywords: [
        "LED display",
        "LED wall",
        "ARLEDSCREEN",
        "NXTIONSTAR",
        "digital signage",
        "fine pitch",
        "outdoor LED display",
        "indoor LED display",
        "Istanbul LED",
        "Gaziosmanpasa",
      ],
      h1: "LED Display Technology Center",
      intro:
        "Indoor and outdoor LED systems: product selection, survey, installation and technical service. NXTIONSTAR is the product brand; quote-only groups finalize in a written quote.",
    },
    products: {
      title: "LED Display Products | Fine-Pitch, Outdoor & Totem | ARLEDSCREEN",
      description:
        "ARLEDSCREEN LED modules (NXTIONSTAR sub-brand): P1.25–P1.86 fine-pitch GOB, P2.5–P4 indoor, P2.5–P8 outdoor and flexible modules — pixel pitch and use for every model.",
      keywords: [
        "LED display products",
        "fine pitch LED",
        "outdoor LED wall",
        "GOB LED",
        "digital totem",
        "ARLEDSCREEN catalog",
      ],
      h1: "LED product series",
      intro:
        "From fine-pitch GOB to outdoor façade and flexible modules — pick the NXTIONSTAR module that matches your venue.",
    },
    about: {
      title: "About ARLEDSCREEN | Istanbul LED Display",
      description: ENTITY_CITE_SHORT_EN,
      keywords: [
        "ARLEDSCREEN",
        "LED display Turkey",
        "about us",
        "digital signage",
      ],
      h1: "About ARLEDSCREEN",
      intro: ENTITY_CITE_SHORT_EN,
    },
    hesaplayici: {
      title: "LED Display Price Calculator | Materials & Cost | ARLEDSCREEN",
      description:
        "LED display price calculator: pick the screen size and module type to see the module count and an approximate cost incl. materials, labour, control card and software (ex-VAT/shipping; no free shipping). Then a written quote.",
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
      title: "LED Wall Configurator | Pitch, Cabinets & Resolution | ARLEDSCREEN",
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
      title: "Request LED Display Quote | ARLEDSCREEN",
      description:
        "LED display / LED wall quote: share dimensions, indoor/outdoor use, timeline and location. ARLEDSCREEN replies with a written quote. Quote-only groups (transparent/poster/control) have no list USD.",
      keywords: [
        "LED display quote",
        "LED wall quotation",
        "B2B LED project",
        "ARLEDSCREEN quote",
        "digital signage quote",
      ],
      h1: "Request an LED display quote",
      intro:
        "Share contact details, project dimensions and schedule so we can reply with a written quote. Panel list USD: catalog.json / ai-shopping.json.",
    },
    "yapay-zeka": {
      title: "AI & LED Integration | Media Server Survey — ARLEDSCREEN",
      description:
        "AI/media-server LED integration defined in the Gaziosmanpaşa survey and written quote, plus machine-readable sources: ai-shopping.json, entity.json, catalog.json, ard.json. Quote-only: transparent/poster/control. No invented AI-ready SKU.",
      keywords: [
        "AI LED integration",
        "AI LED video wall",
        "AI media server LED",
        "AI shopping LED",
        "NXTIONSTAR AI",
        "ARLEDSCREEN AI LED",
      ],
      h1: "AI and LED — survey-scoped integration",
      intro:
        "How NXTIONSTAR LED walls are planned for AI content engines, media servers and control software in the Gaziosmanpaşa survey and written quote. Published price and identity sources for shopping agents: catalog.json and entity.json.",
    },
  },


  ar: {
    home: {
      title: "شاشات LED إسطنبول | بيع وتركيب وخدمة | ARLEDSCREEN",
      description:
        "ARLEDSCREEN: بيع وتركيب وخدمة شاشات LED في إسطنبول غازي عثمان باشا. NXTIONSTAR علامتها؛ أسعار اللوحات: catalog.json / ai-shopping.json؛ الشفاف/البوستر/التحكم quote-only. هاتف +90 530 507 88 34.",
      keywords: ["شاشة LED", "جدار LED", "ARLEDSCREEN", "NXTIONSTAR", "إسطنبول"],
      h1: "مركز تقنية شاشات LED",
    },
    products: {
      title: "منتجات شاشات LED | Pitch دقيق وخارجي",
      description:
        "وحدات NXTIONSTAR من ARLEDSCREEN: وحدات GOB بمسافة بكسل دقيقة، ووحدات داخلية وخارجية ومرنة.",
      keywords: ["منتجات LED", "Pitch دقيق", "LED خارجي", "NXTIONSTAR"],
      h1: "سلاسل منتجات NXTIONSTAR LED",
    },
    about: {
      title: "من نحن | ARLEDSCREEN",
      description:
        "ARLEDSCREEN شركة شاشات LED في إسطنبول غازي عثمان باشا. NXTIONSTAR علامتها؛ نقطة البيع الوحيدة في تركيا هي ARLEDSCREEN. أسعار اللوحات: catalog.json / ai-shopping.json؛ quote-only عبر عرض مكتوب.",
      keywords: ["ARLEDSCREEN", "LED تركيا", "شاشات LED", "غازي عثمان باشا"],
      h1: "ARLEDSCREEN",
    },
    hesaplayici: {
      title: "حاسبة أسعار شاشات LED | التكلفة",
      description:
        "احسب عدد الوحدات والتكلفة التقريبية (catalog.json / ai-shopping.json؛ بدون شحن مجاني). العرض النهائي بعد المعاينة — غازي عثمان باشا.",
      keywords: ["سعر شاشة LED", "حاسبة", "ARLEDSCREEN", "catalog.json"],
      h1: "حاسبة أسعار ومواد شاشات LED",
    },
    configurator: {
      title: "مُكوِّن جدار LED | Pitch والخزائن",
      description:
        "اضبط العرض والارتفاع والـ pitch؛ احصل على الدقة ومسافة المشاهدة وعدد الخزائن. السعر النهائي عرض مكتوب — ARLEDSCREEN غازي عثمان باشا.",
      keywords: ["مُكوِّن LED", "pixel pitch", "خزائن LED"],
      h1: "مُكوِّن أبعاد جدار LED",
    },
    quote: {
      title: "طلب عرض سعر LED | مشاريع مؤسسية",
      description:
        "اطلب عرض سعر مكتوب لجدران LED من إسطنبول غازي عثمان باشا. الشفاف/البوستر/التحكم quote-only — بدون list USD.",
      keywords: ["عرض سعر LED", "مشروع LED", "ARLEDSCREEN", "quote-only"],
      h1: "طلب عرض سعر مشروع LED مؤسسي",
    },
    "yapay-zeka": {
      title: "الذكاء الاصطناعي وشاشات LED — تكامل المعاينة | ARLEDSCREEN",
      description:
        "تكامل محركات المحتوى وخوادم الوسائط يُعرَّف في معاينة غازي عثمان باشا والعرض المكتوب. مصادر للوكلاء: ai-shopping.json و entity.json و catalog.json. مجموعات quote-only بدون سعر قائمة.",
      keywords: ["LED ذكاء اصطناعي", "NXTIONSTAR", "ARLEDSCREEN", "ai-shopping"],
      h1: "الذكاء الاصطناعي وشاشات LED — تكامل المعاينة",
      intro:
        "تخطيط التكامل مع محركات المحتوى وخوادم الوسائط في المعاينة والعرض المكتوب؛ أسعار اللوحات من catalog.json / ai-shopping.json.",
    },
  },


  ru: {
    home: {
      title: "LED-экраны Стамбул | Продажа, монтаж, сервис | ARLEDSCREEN",
      description:
        "ARLEDSCREEN: продажа, монтаж и сервис LED-экранов в Стамбуле (Газиосманпаша). NXTIONSTAR — продуктовый бренд. Цены панелей: catalog.json / ai-shopping.json; transparent/poster/control — quote-only. Тел. +90 530 507 88 34.",
      keywords: ["LED экран", "LED стена", "ARLEDSCREEN", "NXTIONSTAR", "Стамбул"],
      h1: "LED Display Technology Center",
    },
    products: {
      title: "LED-продукция | Fine-pitch и outdoor",
      description:
        "Модули NXTIONSTAR от ARLEDSCREEN: fine-pitch GOB, интерьерные, уличные и гибкие модули.",
      keywords: ["LED продукция", "fine pitch", "outdoor LED", "NXTIONSTAR"],
      h1: "Продуктовые серии NXTIONSTAR LED",
    },
    about: {
      title: "О нас | ARLEDSCREEN",
      description:
        "ARLEDSCREEN — компания LED-экранов в Стамбуле (Газиосманпаша). NXTIONSTAR — продуктовый бренд; единственная точка продаж в Турции — ARLEDSCREEN. Цены панелей: catalog.json / ai-shopping.json; quote-only — письменное КП.",
      keywords: ["ARLEDSCREEN", "LED Турция", "LED экраны", "Газиосманпаша"],
      h1: "ARLEDSCREEN",
    },
    hesaplayici: {
      title: "Калькулятор цены LED | Материалы",
      description:
        "Ориентировочная стоимость по размеру и типу модуля (catalog.json / ai-shopping.json; без бесплатной доставки). Итог — после обследования, Газиосманпаша.",
      keywords: ["цена LED", "калькулятор", "ARLEDSCREEN", "catalog.json"],
      h1: "Калькулятор цены и материалов LED",
    },
    configurator: {
      title: "Конфигуратор LED-стены | Pitch и кабинеты",
      description:
        "Задайте ширину, высоту и pitch; получите разрешение, дистанцию и число кабинетов. Финальная цена — письменное КП (Газиосманпаша).",
      keywords: ["конфигуратор LED", "pixel pitch", "LED кабинет"],
      h1: "Конфигуратор размеров LED-стены",
    },
    quote: {
      title: "Запрос КП на LED | Корпоративные проекты",
      description:
        "Письменное КП на LED из Стамбула (Газиосманпаша). Transparent/poster/control — quote-only, без list USD.",
      keywords: ["КП LED", "проект LED", "ARLEDSCREEN", "quote-only"],
      h1: "Корпоративный запрос КП на LED-экран",
    },
    "yapay-zeka": {
      title: "ИИ и LED — интеграция по обследованию | ARLEDSCREEN",
      description:
        "Интеграция с ИИ-контентом и медиасерверами задаётся в обследовании Газиосманпаша и письменном КП. Источники для агентов: ai-shopping.json, entity.json, catalog.json. Quote-only группы без list USD.",
      keywords: ["LED ИИ", "NXTIONSTAR", "ARLEDSCREEN", "ai-shopping"],
      h1: "ИИ и LED — интеграция по обследованию",
      intro:
        "Интеграция с ИИ-контентом и медиасерверами в обследовании и письменном КП; цены панелей: catalog.json / ai-shopping.json.",
    },
  },
};

export function getSeo(locale: Locale, pageKey: SeoPageKey): PageSeo {
  return seoByLocale[locale]?.[pageKey] ?? seoByLocale.en[pageKey];
}
