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
    src: "/projects/guides/dijital-ekran-totem.jpg",
    alt: { tr: "Mağaza içinde ayaklı dikey dijital ekran (totem)", en: "Freestanding vertical digital signage totem in a store", ru: "Напольный вертикальный цифровой тотем в магазине", ar: "شاشة لافتات رقمية عمودية أرضية (طوطم) داخل متجر" },
  },
  "ekran-cesitleri": {
    src: "/projects/guides/ekran-cesitleri-led-lcd-kiosk.jpg",
    alt: { tr: "Soldan sağa: LED ekran duvarı, LCD dijital totem ve dokunmatik kiosk", en: "Left to right: LED video wall, LCD digital totem and touch kiosk", ru: "Слева направо: LED-стена, цифровой LCD-тотем и сенсорный киоск", ar: "من اليسار إلى اليمين: جدار شاشات LED وطوطم LCD رقمي وكشك لمسي" },
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
    src: "/projects/guides/menuboard-kafe-tezgah.jpg",
    alt: { tr: "Kafe tezgâhının üstünde menü gösteren dijital ekran", en: "Digital menu board above a café counter", ru: "Цифровое меню над стойкой кафе", ar: "لوحة قائمة رقمية فوق منضدة مقهى" },
  },
  "kiosk-ekran": {
    src: "/projects/guides/dokunmatik-kiosk-49-inc.jpg",
    alt: { tr: "49 inç dokunmatik dijital kiosk, iki ayaklı gövde", en: "Two 49-inch touch digital kiosks on floor stands", ru: "Два сенсорных цифровых киоска 49 дюймов", ar: "كشكان رقميان لمسيان بمقاس 49 بوصة" },
  },
  "kiosk-dijital-ekran": {
    src: "/projects/guides/dijital-ekran-totem.jpg",
    alt: { tr: "Bina içinde ayaklı dijital totem ekran", en: "Freestanding digital totem screen indoors", ru: "Напольный цифровой тотем в помещении", ar: "شاشة طوطم رقمية أرضية داخل مبنى" },
  },
  "cnc-led-kasa": {
    src: "/projects/modules/cabinet-500x1000.jpg",
    alt: { tr: "500 × 1000 mm LED kabin: ön yüz, arka iç yapı ve yan profil", en: "500 × 1000 mm LED cabinet: front, rear structure and side profile", ru: "LED-кабинет 500 × 1000 мм: лицевая сторона, задняя часть и профиль", ar: "خزانة LED بمقاس 500 × 1000 مم: الواجهة والهيكل الخلفي والجانب" },
  },
  "cami-led-ekran": {
    src: "/projects/modules/indoor-install.jpg",
    alt: { tr: "Duvara monte iç mekân LED ekran", en: "Wall-mounted indoor LED screen", ru: "Настенный LED-экран для помещений", ar: "شاشة LED داخلية مثبتة على الجدار" },
  },
  "led-ekran-ariza-belirtileri": {
    src: "/projects/service-assembly.jpg",
    alt: { tr: "Teknisyenler LED ekranın arkasında modül ve kablo bağlantılarını kontrol ediyor", en: "Technicians checking modules and cabling on the back of an LED screen", ru: "Техники проверяют модули и кабели с тыльной стороны LED-экрана", ar: "فنيون يفحصون الوحدات والكابلات في الجهة الخلفية لشاشة LED" },
  },
  "led-ekran-ihracat": {
    src: "/projects/panels-warehouse.jpg",
    alt: { tr: "Sevkiyata hazır LED ekran kabinleri", en: "LED screen cabinets ready for shipment", ru: "LED-кабинеты, готовые к отправке", ar: "خزائن شاشات LED جاهزة للشحن" },
  },
  "eczane-led-ekran": {
    src: "/projects/guides/eczane-nobetci-led.jpg",
    alt: { tr: "Nöbetçi eczane yazısı gösteren LED ekran, teslim öncesi test", en: "LED screen showing a duty-pharmacy sign during pre-delivery testing", ru: "LED-экран с надписью «дежурная аптека» на тесте перед отгрузкой", ar: "شاشة LED تعرض لافتة صيدلية مناوبة أثناء الاختبار قبل التسليم" },
  },
  "dugun-salonu-led": {
    src: "/opt/blog/alanya-otel-led-ekran.jpg",
    alt: { tr: "Otel salonunda duvara monte iç mekân LED ekran", en: "Wall-mounted indoor LED screen in a hotel hall", ru: "Настенный LED-экран в зале отеля", ar: "شاشة LED داخلية على جدار قاعة فندق" },
  },
  "hastane-dijital-ekran": {
    src: "/projects/hastane.jpg",
    alt: { tr: "Hastane acil girişi üzerinde LED ekran", en: "LED screen above a hospital emergency entrance", ru: "LED-экран над входом в приёмное отделение больницы", ar: "شاشة LED فوق مدخل طوارئ مستشفى" },
  },
  "okul-led-ekran": {
    src: "/opt/blog/alanya-otel-led-ekran.jpg",
    alt: { tr: "Salon duvarına monte geniş iç mekân LED ekran", en: "Wide wall-mounted indoor LED screen in a hall", ru: "Широкий настенный LED-экран в зале", ar: "شاشة LED داخلية عريضة مثبتة على جدار قاعة" },
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

// Mosque sizing examples: height ≈ farthest viewer / 8, 320 × 160 mm modules, published panel USD.
const CAMI_HEAD: Record<"tr" | "en" | "ru" | "ar", string[]> = {
  tr: ["En arka saf", "Örnek ekran ölçüsü", "Modül", "Önerilen P", "Modül bedeli (USD)"],
  en: ["Farthest row", "Example screen size", "Modules", "Suggested pitch", "Module cost (USD)"],
  ru: ["Последний ряд", "Пример размера", "Модули", "Шаг", "Модули (USD)"],
  ar: ["أبعد صف", "مقاس الشاشة المقترح", "الوحدات", "مسافة البكسل", "تكلفة الوحدات (دولار)"],
};
const CAMI_CAPTION: L4 = {
  tr: "Cami için örnek ekran ölçüleri (yalnızca modül bedeli; KDV ve nakliye hariç)",
  en: "Example mosque screen sizes (module cost only; VAT and shipping excluded)",
  ru: "Примеры размеров экрана для мечети (только модули; без НДС и доставки)",
  ar: "أمثلة على مقاسات شاشات المساجد (تكلفة الوحدات فقط؛ دون الضريبة والشحن)",
};
const CAMI_ROWS: L4[][] = [
  [{ tr: "≈ 6 m", en: "≈ 6 m", ru: "≈ 6 м", ar: "≈ 6 م" }, { tr: "1,60 × 0,96 m", en: "1.60 × 0.96 m", ru: "1,60 × 0,96 м", ar: "1.60 × 0.96 م" }, { tr: "30", en: "30", ru: "30", ar: "30" }, { tr: "P3.07 iç", en: "P3.07 indoor", ru: "P3.07 помещ.", ar: "P3.07 داخلي" }, { tr: "926,40", en: "926.40", ru: "926,40", ar: "926.40" }],
  [{ tr: "≈ 12 m", en: "≈ 12 m", ru: "≈ 12 м", ar: "≈ 12 م" }, { tr: "2,56 × 1,44 m", en: "2.56 × 1.44 m", ru: "2,56 × 1,44 м", ar: "2.56 × 1.44 م" }, { tr: "72", en: "72", ru: "72", ar: "72" }, { tr: "P3.07 iç", en: "P3.07 indoor", ru: "P3.07 помещ.", ar: "P3.07 داخلي" }, { tr: "2.223,36", en: "2,223.36", ru: "2 223,36", ar: "2,223.36" }],
  [{ tr: "≈ 20 m", en: "≈ 20 m", ru: "≈ 20 м", ar: "≈ 20 م" }, { tr: "4,16 × 2,40 m", en: "4.16 × 2.40 m", ru: "4,16 × 2,40 м", ar: "4.16 × 2.40 م" }, { tr: "195", en: "195", ru: "195", ar: "195" }, { tr: "P4 iç", en: "P4 indoor", ru: "P4 помещ.", ar: "P4 داخلي" }, { tr: "5.261,10", en: "5,261.10", ru: "5 261,10", ar: "5,261.10" }],
];

const ARIZA_HEAD: Record<"tr" | "en" | "ru" | "ar", string[]> = {
  tr: ["Belirti", "Olası neden", "İlk kontrol", "Kim yapar"],
  en: ["Symptom", "Likely cause", "First check", "Who"],
  ru: ["Признак", "Вероятная причина", "Первая проверка", "Кто"],
  ar: ["العَرَض", "السبب المحتمل", "الفحص الأول", "من يقوم به"],
};
const ARIZA_CAPTION: L4 = {
  tr: "LED ekran arıza belirtileri ve olası nedenleri",
  en: "LED screen fault symptoms and likely causes",
  ru: "Признаки неисправности LED-экрана и вероятные причины",
  ar: "أعراض أعطال شاشات LED وأسبابها المحتملة",
};
const YOU: L4 = { tr: "Siz", en: "You", ru: "Вы", ar: "أنت" };
const TECH: L4 = { tr: "Teknik servis", en: "Technician", ru: "Сервис", ar: "الفني" };
const ARIZA_ROWS: L4[][] = [
  [{ tr: "Kabin büyüklüğünde kararma", en: "Cabinet-sized dark area", ru: "Тёмная зона размером с кабинет", ar: "منطقة مظلمة بحجم خزانة" }, { tr: "Güç kaynağı veya alıcı kart", en: "Power supply or receiving card", ru: "Блок питания или принимающая карта", ar: "مزود الطاقة أو بطاقة الاستقبال" }, { tr: "Fotoğraf çekip gönderin", en: "Send a photo", ru: "Пришлите фото", ar: "أرسل صورة" }, TECH],
  [{ tr: "Bir noktadan sonrası tamamen karanlık", en: "Everything after one point is dark", ru: "Всё после определённой точки тёмное", ar: "كل ما بعد نقطة معينة مظلم" }, { tr: "Veri kablosu zinciri", en: "Data cable chain", ru: "Цепочка кабеля данных", ar: "سلسلة كابل البيانات" }, { tr: "Kablo bağlantıları", en: "Cable connections", ru: "Соединения кабелей", ar: "توصيلات الكابلات" }, TECH],
  [{ tr: "Tek modül sönük", en: "Single module out", ru: "Не работает один модуль", ar: "وحدة واحدة مطفأة" }, { tr: "Modül veya flat kablo", en: "Module or ribbon cable", ru: "Модуль или шлейф", ar: "الوحدة أو الكابل الشريطي" }, { tr: "Fotoğraf çekip gönderin", en: "Send a photo", ru: "Пришлите фото", ar: "أرسل صورة" }, TECH],
  [{ tr: "Titreme", en: "Flicker", ru: "Мерцание", ar: "ارتعاش" }, { tr: "Gevşek kablo, güç kaynağı, kart ayarı", en: "Loose cable, power supply, card settings", ru: "Кабель, блок питания, настройки карты", ar: "كابل مرتخٍ أو مزود طاقة أو إعدادات البطاقة" }, { tr: "Video çekip gönderin", en: "Send a video", ru: "Пришлите видео", ar: "أرسل فيديو" }, TECH],
  [{ tr: "Yatay/dikey çizgi, tek sıra kırmızı", en: "Line or a row stuck red", ru: "Полоса или красный ряд", ar: "خط أو صف أحمر" }, { tr: "Sürücü entegresi, flat kablo, kart portu", en: "Driver IC, ribbon cable, card port", ru: "Драйвер, шлейф, порт карты", ar: "دائرة التشغيل أو الكابل الشريطي أو منفذ البطاقة" }, { tr: "Fotoğraf çekip gönderin", en: "Send a photo", ru: "Пришлите фото", ar: "أرسل صورة" }, TECH],
  [{ tr: "Ekran hiç açılmıyor", en: "Screen will not turn on", ru: "Экран не включается", ar: "الشاشة لا تعمل" }, { tr: "Sigorta, enerji, kaynak, gönderici kart", en: "Breaker, power, source, sending card", ru: "Автомат, питание, источник, карта", ar: "القاطع أو الكهرباء أو المصدر أو بطاقة الإرسال" }, { tr: "Sigorta ve görüntü kaynağı", en: "Breaker and video source", ru: "Автомат и источник видео", ar: "القاطع ومصدر الفيديو" }, YOU],
];

type T4 = Record<"tr" | "en" | "ru" | "ar", string>;
const t = (tr: string, en: string, ru: string, ar: string): T4 => ({ tr, en, ru, ar });
const Q4: T4 = { tr: "teklif üzerine", en: "on quote", ru: "по запросу", ar: "بعرض خاص" };

const SIZE_HEAD: Record<"tr" | "en" | "ru" | "ar", string[]> = {
  tr: ["En arka sıra / masa", "Örnek ekran ölçüsü", "Modül", "Önerilen P", "Modül bedeli (USD)"],
  en: ["Farthest row / table", "Example screen size", "Modules", "Suggested pitch", "Module cost (USD)"],
  ru: ["Дальний ряд / стол", "Пример размера", "Модули", "Шаг", "Модули (USD)"],
  ar: ["أبعد صف / طاولة", "مقاس الشاشة المقترح", "الوحدات", "مسافة البكسل", "تكلفة الوحدات (دولار)"],
};
const KONF_ROWS: T4[][] = [
  [t("≈ 8 m", "≈ 8 m", "≈ 8 м", "≈ 8 م"), t("1,92 × 1,12 m", "1.92 × 1.12 m", "1,92 × 1,12 м", "1.92 × 1.12 م"), t("42", "42", "42", "42"), t("P2.5 iç", "P2.5 indoor", "P2.5 помещ.", "P2.5 داخلي"), t("1.351,56", "1,351.56", "1 351,56", "1,351.56")],
  [t("≈ 15 m", "≈ 15 m", "≈ 15 м", "≈ 15 م"), t("3,52 × 1,92 m", "3.52 × 1.92 m", "3,52 × 1,92 м", "3.52 × 1.92 م"), t("132", "132", "132", "132"), t("P2.5 iç", "P2.5 indoor", "P2.5 помещ.", "P2.5 داخلي"), t("4.247,76", "4,247.76", "4 247,76", "4,247.76")],
  [t("≈ 25 m", "≈ 25 m", "≈ 25 м", "≈ 25 م"), t("5,44 × 3,04 m", "5.44 × 3.04 m", "5,44 × 3,04 м", "5.44 × 3.04 م"), t("323", "323", "323", "323"), t("P3.07 iç", "P3.07 indoor", "P3.07 помещ.", "P3.07 داخلي"), t("9.974,24", "9,974.24", "9 974,24", "9,974.24")],
];
const KONF_CAPTION = t(
  "Konferans salonu için örnek ekran ölçüleri (yalnızca modül bedeli; KDV ve nakliye hariç)",
  "Example conference-hall screen sizes (module cost only; VAT and shipping excluded)",
  "Примеры размеров экрана для конференц-зала (только модули; без НДС и доставки)",
  "أمثلة على مقاسات شاشات قاعات المؤتمرات (تكلفة الوحدات فقط؛ دون الضريبة والشحن)",
);
const DUGUN_HEAD: Record<"tr" | "en" | "ru" | "ar", string[]> = {
  tr: ["En arka masa", "Örnek ekran ölçüsü", "Modül", "Satın alma: P ve modül bedeli (USD)", "Kiralık (USD/gün)"],
  en: ["Farthest table", "Example screen size", "Modules", "Purchase: pitch and module cost (USD)", "Rental (USD/day)"],
  ru: ["Дальний стол", "Пример размера", "Модули", "Покупка: шаг и модули (USD)", "Аренда (USD/день)"],
  ar: ["أبعد طاولة", "مقاس الشاشة المقترح", "الوحدات", "الشراء: المسافة وتكلفة الوحدات (دولار)", "الإيجار (دولار/يوم)"],
};
const DUGUN_ROWS: T4[][] = [
  [t("≈ 15 m", "≈ 15 m", "≈ 15 м", "≈ 15 م"), t("3,52 × 1,92 m", "3.52 × 1.92 m", "3,52 × 1,92 м", "3.52 × 1.92 م"), t("132", "132", "132", "132"), t("P3.07 iç · 4.076,16", "P3.07 indoor · 4,076.16", "P3.07 · 4 076,16", "P3.07 داخلي · 4,076.16"), t("337,92", "337.92", "337,92", "337.92")],
  [t("≈ 25 m", "≈ 25 m", "≈ 25 м", "≈ 25 م"), t("5,44 × 3,04 m", "5.44 × 3.04 m", "5,44 × 3,04 м", "5.44 × 3.04 م"), t("323", "323", "323", "323"), t("P4 iç · 8.714,54", "P4 indoor · 8,714.54", "P4 · 8 714,54", "P4 داخلي · 8,714.54"), t("826,88", "826.88", "826,88", "826.88")],
  [t("≈ 35 m", "≈ 35 m", "≈ 35 м", "≈ 35 م"), t("7,68 × 4,48 m", "7.68 × 4.48 m", "7,68 × 4,48 м", "7.68 × 4.48 م"), t("672", "672", "672", "672"), t("P4 iç · 18.130,56", "P4 indoor · 18,130.56", "P4 · 18 130,56", "P4 داخلي · 18,130.56"), t("1.720,32", "1,720.32", "1 720,32", "1,720.32")],
];
const DUGUN_CAPTION = t(
  "Düğün salonu için örnek ekran ölçüleri: satın alma (yalnızca modül bedeli) ve günlük 50 USD/m² kiralama; KDV ve nakliye hariç",
  "Example wedding-hall screen sizes: purchase (module cost only) and rental at USD 50 per m² per day; VAT and shipping excluded",
  "Примеры для свадебного зала: покупка (только модули) и аренда 50 USD за м² в день; без НДС и доставки",
  "أمثلة لقاعات الأفراح: الشراء (تكلفة الوحدات فقط) والإيجار بـ 50 دولارًا لكل م² يوميًا؛ دون الضريبة والشحن",
);
const AREA_HEAD: Record<"tr" | "en" | "ru" | "ar", string[]> = {
  tr: ["Alan", "Önerilen ekran", "İzleme mesafesi", "Fiyat (USD/panel)"],
  en: ["Area", "Suggested screen", "Viewing distance", "Price (USD/panel)"],
  ru: ["Зона", "Рекомендуемый экран", "Дистанция", "Цена (USD/панель)"],
  ar: ["المكان", "الشاشة المقترحة", "مسافة المشاهدة", "السعر (دولار/لوح)"],
};
const ECZANE_ROWS: T4[][] = [
  [t("Raf üstü / tezgâh arkası", "Shelf-top / behind counter", "Над полками / за прилавком", "فوق الرفوف / خلف المنضدة"), t("İç mekân P2.5 veya P1.86 GOB", "Indoor P2.5 or P1.86 GOB", "P2.5 или P1.86 GOB", "P2.5 داخلي أو P1.86 GOB"), t("1,5–3 m", "1.5–3 m", "1,5–3 м", "1.5–3 م"), t("32,18 / 49,08", "32.18 / 49.08", "32,18 / 49,08", "32.18 / 49.08")],
  [t("Güneş alan vitrin", "Sunny window", "Солнечная витрина", "واجهة زجاجية مشمسة"), t("Vitrin tipi ekran veya şeffaf LED", "Window screen or transparent LED", "Витринный или прозрачный LED", "شاشة واجهة أو LED شفافة"), t("Yoldan", "From the street", "С улицы", "من الشارع"), Q4],
  [t("Giriş", "Entrance", "Вход", "المدخل"), t("Ayaklı poster LED", "Freestanding poster LED", "Напольный постерный LED", "بوستر LED أرضي"), t("2–5 m", "2–5 m", "2–5 м", "2–5 م"), Q4],
  [t("Dış cephe", "Façade", "Фасад", "الواجهة الخارجية"), t("Dış mekân P4 / P5 / P3.07", "Outdoor P4 / P5 / P3.07", "Уличный P4 / P5 / P3.07", "P4 / P5 / P3.07 خارجي"), t("4 m ve üzeri", "4 m and more", "от 4 м", "4 م فأكثر"), t("33,80 / 29,90 / 44,20", "33.80 / 29.90 / 44.20", "33,80 / 29,90 / 44,20", "33.80 / 29.90 / 44.20")],
];
const HASTANE_ROWS: T4[][] = [
  [t("Küçük bekleme alanı", "Small waiting area", "Малая зона ожидания", "منطقة انتظار صغيرة"), t("LCD ekran", "LCD screen", "LCD-экран", "شاشة LCD"), t("2–5 m", "2–5 m", "2–5 м", "2–5 م"), Q4],
  [t("Geniş bekleme salonu (sıra ekranı)", "Large waiting hall (queue screen)", "Большой зал ожидания (очередь)", "قاعة انتظار كبيرة (شاشة الدور)"), t("İç mekân P2.5 / P3.07 LED", "Indoor P2.5 / P3.07 LED", "LED P2.5 / P3.07", "LED داخلي P2.5 / P3.07"), t("6 m ve üzeri", "6 m and more", "от 6 м", "6 م فأكثر"), t("32,18 / 30,88", "32.18 / 30.88", "32,18 / 30,88", "32.18 / 30.88")],
  [t("Poliklinik kapısı", "Clinic door", "Дверь кабинета", "باب العيادة"), t("Küçük LCD ekran", "Small LCD screen", "Небольшой LCD", "شاشة LCD صغيرة"), t("1–3 m", "1–3 m", "1–3 м", "1–3 م"), Q4],
  [t("Lobi ve yönlendirme", "Lobby and wayfinding", "Холл и навигация", "البهو والإرشاد"), t("Poster LED, totem veya kiosk", "Poster LED, totem or kiosk", "Постерный LED, тотем, киоск", "بوستر LED أو طوطم أو كشك"), t("1–5 m", "1–5 m", "1–5 м", "1–5 م"), Q4],
  [t("Cephe ve acil girişi", "Façade and emergency entrance", "Фасад и приёмное", "الواجهة ومدخل الطوارئ"), t("Dış mekân P4 / P5", "Outdoor P4 / P5", "Уличный P4 / P5", "P4 / P5 خارجي"), t("8 m ve üzeri", "8 m and more", "от 8 м", "8 م فأكثر"), t("33,80 / 29,90", "33.80 / 29.90", "33,80 / 29,90", "33.80 / 29.90")],
];
const OKUL_ROWS: T4[][] = [
  [t("Sınıf", "Classroom", "Класс", "الفصل"), t("LCD veya etkileşimli ekran", "LCD or interactive display", "LCD или интерактивная панель", "LCD أو شاشة تفاعلية"), t("1–6 m", "1–6 m", "1–6 м", "1–6 م"), Q4],
  [t("Giriş ve koridor", "Entrance and corridor", "Вход и коридор", "المدخل والممر"), t("İç mekân P3.07 veya poster LED", "Indoor P3.07 or poster LED", "P3.07 или постерный LED", "P3.07 داخلي أو بوستر LED"), t("3 m ve üzeri", "3 m and more", "от 3 м", "3 م فأكثر"), t("30,88", "30.88", "30,88", "30.88")],
  [t("Amfi ve konferans salonu", "Lecture theatre and hall", "Аудитория и зал", "المدرج والقاعة"), t("İç mekân P2.5 / P3.07", "Indoor P2.5 / P3.07", "P2.5 / P3.07", "P2.5 / P3.07 داخلي"), t("2,5 m ve üzeri", "2.5 m and more", "от 2,5 м", "2.5 م فأكثر"), t("32,18 / 30,88", "32.18 / 30.88", "32,18 / 30,88", "32.18 / 30.88")],
  [t("Spor salonu", "Sports hall", "Спортзал", "الصالة الرياضية"), t("İç mekân P4", "Indoor P4", "P4 для помещений", "P4 داخلي"), t("6 m ve üzeri", "6 m and more", "от 6 м", "6 م فأكثر"), t("26,98", "26.98", "26,98", "26.98")],
  [t("Bahçe, kampüs, cephe", "Playground, campus, façade", "Двор, кампус, фасад", "الساحة والحرم والواجهة"), t("Dış mekân P4 / P5", "Outdoor P4 / P5", "Уличный P4 / P5", "P4 / P5 خارجي"), t("5 m ve üzeri", "5 m and more", "от 5 м", "5 م فأكثر"), t("33,80 / 29,90", "33.80 / 29.90", "33,80 / 29,90", "33.80 / 29.90")],
];
const AREA_CAPTION: Record<string, T4> = {
  "eczane-led-ekran": t("Eczanede ekran seçimi (fiyatlar panel başına, KDV ve nakliye hariç)", "Pharmacy screen choice (prices per panel, VAT and shipping excluded)", "Выбор экрана для аптеки (цены за панель, без НДС и доставки)", "اختيار شاشة الصيدلية (الأسعار لكل لوح دون الضريبة والشحن)"),
  "hastane-dijital-ekran": t("Hastanede alanlara göre ekran seçimi (fiyatlar panel başına, KDV ve nakliye hariç)", "Hospital screens by area (prices per panel, VAT and shipping excluded)", "Экраны в больнице по зонам (цены за панель, без НДС и доставки)", "شاشات المستشفى حسب المكان (الأسعار لكل لوح دون الضريبة والشحن)"),
  "okul-led-ekran": t("Okulda alanlara göre ekran seçimi (fiyatlar panel başına, KDV ve nakliye hariç)", "School screens by area (prices per panel, VAT and shipping excluded)", "Экраны в школе по зонам (цены за панель, без НДС и доставки)", "شاشات المدرسة حسب المكان (الأسعار لكل لوح دون الضريبة والشحن)"),
};
const AREA_ROWS: Record<string, T4[][]> = {
  "eczane-led-ekran": ECZANE_ROWS,
  "hastane-dijital-ekran": HASTANE_ROWS,
  "okul-led-ekran": OKUL_ROWS,
};

export function getGuideTable(slug: SeoGuideSlug, locale: Locale): GuideTable | undefined {
  const k = (["tr", "en", "ru", "ar"].includes(locale) ? locale : "en") as keyof L4;
  if (slug === "cami-led-ekran") {
    return { caption: CAMI_CAPTION[k], headers: CAMI_HEAD[k], rows: CAMI_ROWS.map((r) => r.map((c) => c[k])) };
  }
  if (slug === "konferans-salonu-led") {
    return { caption: KONF_CAPTION[k], headers: SIZE_HEAD[k], rows: KONF_ROWS.map((r) => r.map((c) => c[k])) };
  }
  if (slug === "dugun-salonu-led") {
    return { caption: DUGUN_CAPTION[k], headers: DUGUN_HEAD[k], rows: DUGUN_ROWS.map((r) => r.map((c) => c[k])) };
  }
  if (AREA_ROWS[slug]) {
    return { caption: AREA_CAPTION[slug][k], headers: AREA_HEAD[k], rows: AREA_ROWS[slug].map((r) => r.map((c) => c[k])) };
  }
  if (slug === "led-ekran-ariza-belirtileri") {
    return { caption: ARIZA_CAPTION[k], headers: ARIZA_HEAD[k], rows: ARIZA_ROWS.map((r) => r.map((c) => c[k])) };
  }
  if (slug !== "cnc-led-kasa") return undefined;
  return {
    caption: CAPTION[k],
    headers: HEAD[k],
    rows: ROWS.map(([t, m, size, use]) => [t[k], m[k], size, use[k], Q[k]]),
  };
}
