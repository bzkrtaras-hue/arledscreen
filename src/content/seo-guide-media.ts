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
  "cami-led-ekran": {
    src: "/projects/hires/neu-library-1920.jpg",
    alt: { tr: "Geniş bir salonda iç mekân LED ekran ve iki ayaklı dijital ekran", en: "Indoor LED wall and two freestanding digital screens in a large hall", ru: "LED-экран и два напольных цифровых экрана в большом зале", ar: "شاشة LED داخلية وشاشتان رقميتان أرضيتان في قاعة كبيرة" },
  },
  "led-ekran-ariza-belirtileri": {
    src: "/projects/service-assembly.jpg",
    alt: { tr: "Teknisyenler LED ekranın arkasında modül ve kablo bağlantılarını kontrol ediyor", en: "Technicians checking modules and cabling on the back of an LED screen", ru: "Техники проверяют модули и кабели с тыльной стороны LED-экрана", ar: "فنيون يفحصون الوحدات والكابلات في الجهة الخلفية لشاشة LED" },
  },
  "led-ekran-ihracat": {
    src: "/projects/panels-warehouse.jpg",
    alt: { tr: "Sevkiyata hazır LED ekran kabinleri", en: "LED screen cabinets ready for shipment", ru: "LED-кабинеты, готовые к отправке", ar: "خزائن شاشات LED جاهزة للشحن" },
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

export function getGuideTable(slug: SeoGuideSlug, locale: Locale): GuideTable | undefined {
  const k = (["tr", "en", "ru", "ar"].includes(locale) ? locale : "en") as keyof L4;
  if (slug === "cami-led-ekran") {
    return { caption: CAMI_CAPTION[k], headers: CAMI_HEAD[k], rows: CAMI_ROWS.map((r) => r.map((c) => c[k])) };
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
