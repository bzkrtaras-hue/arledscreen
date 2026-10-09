/**
 * Guide hero images and the CNC kasa table (per locale).
 * Images: own repo images first; two kiosk/LCD photos are cropped, logo-free product photos
 * from our wholesaler Led Magic Light (ledmagiclight.com.tr), used with permission.
 */
import type { Locale } from "@/lib/i18n";
import type { SeoGuideSlug } from "@/content/seo-guides";

type L4 = Record<"tr" | "en" | "ru" | "ar", string>;
const pick = (v: L4, locale: Locale) => v[locale as keyof L4] ?? v.en;

const IMAGES: Record<SeoGuideSlug, { src: string; alt: L4 }> = {
  "led-ekran": {
    src: "/projects/hero.jpg",
    alt: { tr: "Gece aydınlatılmış bina cephesinde büyük LED ekran", en: "Large LED screen on a lit building façade at night", ru: "Большой LED-экран на фасаде здания ночью", ar: "شاشة LED كبيرة على واجهة مبنى مضاءة ليلًا" },
  },
  "dijital-ekran": {
    src: "/projects/neu-kutuphane.jpg",
    alt: { tr: "Kütüphane salonunda LED ekran ve iki ayaklı dijital ekran", en: "LED wall and two freestanding digital screens in a library hall", ru: "LED-экран и два напольных цифровых экрана в зале библиотеки", ar: "شاشة LED وشاشتان رقميتان أرضيتان في قاعة مكتبة" },
  },
  "ekran-cesitleri": {
    src: "/projects/modules/tech/cob-smd-gob-trio.jpg",
    alt: { tr: "COB, SMD ve GOB LED modül yüzeylerinin karşılaştırması", en: "COB, SMD and GOB LED module surfaces compared", ru: "Сравнение поверхностей LED-модулей COB, SMD и GOB", ar: "مقارنة بين أسطح وحدات LED بتقنيات COB وSMD وGOB" },
  },
  "lcd-ekran": {
    src: "/projects/guides/lcd-dikey-ekran-55-inc.jpg",
    alt: { tr: "55 inç dikey LCD dijital ekran, ayaklı gövde", en: "55-inch portrait LCD digital screen on a floor stand", ru: "Вертикальный LCD-экран 55 дюймов на напольной стойке", ar: "شاشة LCD رأسية مقاس 55 بوصة على حامل أرضي" },
  },
  "dis-mekan-led-ekran": {
    src: "/projects/modules/outdoor-facade.jpg",
    alt: { tr: "Şehirde bina cephesine monte dış mekân LED ekran", en: "Outdoor LED screen mounted on a city building façade", ru: "Уличный LED-экран на фасаде городского здания", ar: "شاشة LED خارجية مثبتة على واجهة مبنى في المدينة" },
  },
  "ic-mekan-led-ekran": {
    src: "/projects/modules/indoor-install.jpg",
    alt: { tr: "Toplantı odası duvarında iç mekân LED ekran", en: "Indoor LED screen on a meeting-room wall", ru: "LED-экран для помещений на стене переговорной", ar: "شاشة LED داخلية على جدار قاعة اجتماعات" },
  },
  "mimari-muhendislik-led": {
    src: "/projects/install-scaffold.jpg",
    alt: { tr: "İskele üzerinde LED ekran kabin montajı", en: "LED cabinet installation from scaffolding", ru: "Монтаж LED-кабинетов с лесов", ar: "تركيب خزائن LED من على السقالات" },
  },
  "konferans-salonu-led": {
    src: "/projects/hires/indoor-auditorium.jpg",
    alt: { tr: "Konferans salonu sahnesinde iç mekân LED ekran", en: "Indoor LED screen on a conference-hall stage", ru: "LED-экран на сцене конференц-зала", ar: "شاشة LED داخلية على مسرح قاعة مؤتمرات" },
  },
  "vitrin-led-ekran": {
    src: "/projects/applications/seffaf-led-vitrin.jpg",
    alt: { tr: "Mağaza vitrininde şeffaf LED ekran", en: "Transparent LED screen in a shop window", ru: "Прозрачный LED-экран в витрине магазина", ar: "شاشة LED شفافة في واجهة متجر" },
  },
  "poster-led-ekran": {
    src: "/projects/applications/led-poster-totems.jpg",
    alt: { tr: "Yan yana dört ayaklı poster LED ekran", en: "Four freestanding poster LED screens side by side", ru: "Четыре напольных постерных LED-экрана в ряд", ar: "أربع شاشات بوستر LED أرضية متجاورة" },
  },
  "menuboard-dijital-menu": {
    src: "/opt/blog/kafe-restoran-led-ekran.jpg",
    alt: { tr: "Kafe-restoranda iç mekân LED ekran uygulaması", en: "Indoor LED screen installed in a café-restaurant", ru: "LED-экран в помещении кафе-ресторана", ar: "شاشة LED داخلية في مقهى ومطعم" },
  },
  "kiosk-ekran": {
    src: "/projects/guides/dokunmatik-kiosk-49-inc.jpg",
    alt: { tr: "49 inç dokunmatik dijital kiosk, iki ayaklı gövde", en: "Two 49-inch touch digital kiosks on floor stands", ru: "Два сенсорных цифровых киоска 49 дюймов", ar: "كشكان رقميان لمسيان بمقاس 49 بوصة" },
  },
  "kiosk-dijital-ekran": {
    src: "/projects/totem-indoor.jpg",
    alt: { tr: "Bina içinde ayaklı dijital totem ekran", en: "Freestanding digital totem screen indoors", ru: "Напольный цифровой тотем в помещении", ar: "شاشة طوطم رقمية أرضية داخل مبنى" },
  },
  "cnc-led-kasa": {
    src: "/projects/modules/cabinet-500x1000.jpg",
    alt: { tr: "500 × 1000 mm LED kabin: ön yüz, arka iç yapı ve yan profil", en: "500 × 1000 mm LED cabinet: front, rear structure and side profile", ru: "LED-кабинет 500 × 1000 мм: лицевая сторона, задняя часть и профиль", ar: "خزانة LED بمقاس 500 × 1000 مم: الواجهة والهيكل الخلفي والجانب" },
  },
};

export function getGuideImage(slug: SeoGuideSlug, locale: Locale): { src: string; alt: string } | undefined {
  const img = IMAGES[slug];
  return img ? { src: img.src, alt: pick(img.alt, locale) } : undefined;
}

export interface GuideTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

const Q: L4 = { tr: "teklif üzerine", en: "on quote", ru: "по запросу", ar: "بعرض خاص" };
const IO: L4 = { tr: "İç / Dış", en: "Indoor / outdoor", ru: "Помещение / улица", ar: "داخلي / خارجي" };
const IN: L4 = { tr: "İç", en: "Indoor", ru: "Помещение", ar: "داخلي" };
const OUT: L4 = { tr: "Dış", en: "Outdoor", ru: "Улица", ar: "خارجي" };

type Row = [L4, L4, string, L4];
const ROWS: Row[] = [
  [{ tr: "Sac CNC kasa (standart)", en: "Steel CNC cabinet (standard)", ru: "Стальной CNC-кабинет (стандарт)", ar: "خزانة صلب CNC (قياسية)" }, { tr: "DKP sac, fırın boyalı", en: "Cold-rolled steel, oven-painted", ru: "Холоднокатаная сталь, окраска", ar: "صلب مدرفل على البارد، مطلي بالفرن" }, "960 × 960", IO],
  [{ tr: "Sac CNC kasa (küçük ekran / tabela)", en: "Steel CNC cabinet (small screen / sign)", ru: "Стальной CNC-кабинет (малый экран / вывеска)", ar: "خزانة صلب CNC (شاشة صغيرة / لافتة)" }, { tr: "DKP sac", en: "Cold-rolled steel", ru: "Холоднокатаная сталь", ar: "صلب مدرفل على البارد" }, "640 × 480 · 640 × 640 · 960 × 480", IO],
  [{ tr: "Bant (yazı) tipi sac kasa", en: "Strip-type steel cabinet", ru: "Стальной кабинет-лента", ar: "خزانة صلب شريطية" }, { tr: "DKP sac", en: "Cold-rolled steel", ru: "Холоднокатаная сталь", ar: "صلب مدرفل على البارد" }, "960 × 160 … 2560 × 160", IO],
  [{ tr: "Büyük sac CNC kasa (32 × 16 cm adımlı seri)", en: "Large steel CNC cabinet (32 × 16 cm step series)", ru: "Большой стальной CNC-кабинет (шаг 32 × 16 см)", ar: "خزانة صلب CNC كبيرة (سلسلة بخطوة 32 × 16 سم)" }, { tr: "DKP sac", en: "Cold-rolled steel", ru: "Холоднокатаная сталь", ar: "صلب مدرفل على البارد" }, "1280 × 960 … 2560 × 1280", IO],
  [{ tr: "Alüminyum kabin, fan kapaklı", en: "Aluminium cabinet with fan door", ru: "Алюминиевый кабинет с вентилируемой крышкой", ar: "خزانة ألومنيوم بغطاء مروحة" }, { tr: "Alüminyum", en: "Aluminium", ru: "Алюминий", ar: "ألومنيوم" }, "960 × 960", OUT],
  [{ tr: "Döküm kabin (ince pitch)", en: "Die-cast cabinet (fine pitch)", ru: "Литой кабинет (мелкий шаг)", ar: "خزانة مصبوبة (مسافة دقيقة)" }, { tr: "Döküm alüminyum", en: "Die-cast aluminium", ru: "Литой алюминий", ar: "ألومنيوم مصبوب" }, "640 × 480 · 640 × 640 · 320 × 480", IN],
  [{ tr: "Döküm kiralık kabin", en: "Die-cast rental cabinet", ru: "Литой арендный кабинет", ar: "خزانة إيجار مصبوبة" }, { tr: "Döküm alüminyum", en: "Die-cast aluminium", ru: "Литой алюминий", ar: "ألومنيوم مصبوب" }, "500 × 500 · 500 × 1000", IO],
  [{ tr: "Döküm kabin (dış mekân)", en: "Die-cast cabinet (outdoor)", ru: "Литой кабинет (улица)", ar: "خزانة مصبوبة (خارجية)" }, { tr: "Magnezyum alaşım döküm", en: "Die-cast magnesium alloy", ru: "Литой магниевый сплав", ar: "سبيكة مغنيسيوم مصبوبة" }, "960 × 960", OUT],
  [{ tr: "Poster kasası (dikey)", en: "Poster cabinet (portrait)", ru: "Постерный кабинет (вертикальный)", ar: "خزانة بوستر (رأسية)" }, { tr: "Sac, mıknatıslı modül yuvası", en: "Steel, magnetic module seats", ru: "Сталь, магнитное крепление модулей", ar: "صلب بمقاعد وحدات مغناطيسية" }, "640 × 1920 · 640/960 × 1600–1920", IN],
];

const HEAD: Record<"tr" | "en" | "ru" | "ar", string[]> = {
  tr: ["Kasa tipi", "Malzeme", "Ölçü (mm)", "Kullanım", "Fiyat"],
  en: ["Cabinet type", "Material", "Size (mm)", "Use", "Price"],
  ru: ["Тип кабинета", "Материал", "Размер (мм)", "Применение", "Цена"],
  ar: ["نوع الخزانة", "المادة", "المقاس (مم)", "الاستخدام", "السعر"],
};
const CAPTION: L4 = {
  tr: "LED ekran kasa tipleri ve standart ölçüler",
  en: "LED display cabinet types and standard sizes",
  ru: "Типы LED-кабинетов и стандартные размеры",
  ar: "أنواع خزائن شاشات LED ومقاساتها القياسية",
};

export function getGuideTable(slug: SeoGuideSlug, locale: Locale): GuideTable | undefined {
  if (slug !== "cnc-led-kasa") return undefined;
  const k = (["tr", "en", "ru", "ar"].includes(locale) ? locale : "en") as keyof L4;
  return {
    caption: CAPTION[k],
    headers: HEAD[k],
    rows: ROWS.map(([t, m, size, use]) => [t[k], m[k], size, use[k], Q[k]]),
  };
}
