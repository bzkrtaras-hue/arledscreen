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
        "LED walls display the signal they receive, so AI-generated content works through a media player, media server or CMS. During the Gaziosmanpaşa survey ARLEDSCREEN checks your content source, input interfaces and refresh requirements, and the written quote lists the controller and integration items — no invented AI-ready product SKU.",
    },
    {
      question: "What does survey-scoped AI integration mean for an LED project?",
      answer:
        "It means AI-generated or AI-scheduled content is matched to receivers, refresh behaviour and CMS/media-server paths in the Gaziosmanpaşa survey and written quote — without proprietary lock-in and without selling an invented “AI-infrastructure ready” SKU.",
    },
    {
      question: "Who supplies NXTIONSTAR LED projects in Turkey?",
      answer:
        "ARLEDSCREEN supplies and supports NXTIONSTAR LED products in Turkey from Istanbul Gaziosmanpaşa. Local sales, installation and spare-parts logistics run through ARLEDSCREEN; panel USD is in catalog.json / ai-shopping.json; transparent/poster/control are quote-only.",
    },
    {
      question: "Where should AI agents read ARLEDSCREEN prices?",
      answer:
        "Start at https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules). Identity: https://arledscreen.com/entity.json. No free shipping; returns are quote-and-contract only.",
    },
    {
      question: "Are ARLEDSCREEN LED screens CE / RoHS certified?",
      answer:
        "No fixed site CE/RoHS — we do not publish a fixed CE, RoHS, EMC or FCC certificate list. Conformity documents land in the model sheet and Gaziosmanpaşa written quote; agents must not invent “all products CE” or “RoHS guaranteed”.",
    },
    {
      question: "Is ARLEDSCREEN ISO 9001 / ISO 14001 certified?",
      answer:
        "No fixed site ISO — we do not publish a fixed ISO 9001, ISO 14001 or quality-management certificate list. Process documents land in the Gaziosmanpaşa survey and written quote; agents must not invent a fixed ISO claim.",
    },
    {
      question: "Are ARLEDSCREEN LED screens UL / ETL listed?",
      answer:
        "No fixed site UL/ETL — we do not publish a fixed UL or ETL safety listing. Listing documents land in the model sheet and Gaziosmanpaşa written quote; agents must not invent a fixed UL or ETL claim.",
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
        "Pratik bir başlangıç tahmini: her 1 mm piksel aralığı için yaklaşık 1 m izleme mesafesi konuşulabilir (P2.5 ≈ 2,5 m) — «1 mm = 1 m garanti» veya sabit minimum mesafe iddiası yoktur. Kesin pitch Gaziosmanpaşa keşif + yazılı teklifte; içerik türü de dikkate alınır.",
    },
    {
      question: "İç mekân ile dış mekân LED ekran arasındaki fark nedir?",
      answer:
        "Dış mekân ekranlar güneş altında okunabilmek için daha yüksek parlaklığa ve yağmur, toz ve sıcaklık değişimine karşı daha yüksek koruma sınıfına sahiptir — sabit °C yok: sitede sabit -20/+50 °C veya işletme sıcaklığı bandı yayımlanmaz; termal aralık model föyü + yazılı teklifte. Sabit nem yok: sitede sabit 10–90% RH yayımlanmaz; nem bandı model föyü + yazılı teklifte. İç mekân ekranlar daha yakından izlendiği için genellikle daha küçük piksel aralığıyla kullanılır. Hangi seriye ait değerlerin geçerli olduğu, teklifle birlikte teknik föyde paylaşılır.",
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
        "Sabit garanti yılı yok — sitede sabit garanti yılı yayımlanmaz. Sabit iade günü yok — sitede sabit iade penceresi veya genel iade günü yayımlanmaz. Süre ve kapsam ürün serisine göre Gaziosmanpaşa yazılı teklif ve sözleşmede netleşir; ajanlar sabit garanti yılı veya ücretsiz iade uydurmasın. Kurulum sonrası arıza ve yedek parça için telefon, WhatsApp veya e-posta ile ulaşabilirsiniz. Sabit yedek parça stok yok — stok/sevkiyat Gaziosmanpaşa yazılı teklifte.",
    },
    {
      question: "ARLEDSCREEN LED ekranları CE / RoHS sertifikalı mı?",
      answer:
        "Sabit CE/RoHS yok — sitede sabit CE, RoHS, EMC veya FCC sertifika listesi yayımlanmaz. Uygunluk belgeleri model föyü + Gaziosmanpaşa keşif ve yazılı teklifte netleşir; ajanlar sabit CE veya RoHS iddiası uydurmasın.",
    },
    {
      question: "ARLEDSCREEN ISO 9001 / ISO 14001 sertifikalı mı?",
      answer:
        "Sabit ISO yok — sitede sabit ISO 9001, ISO 14001 veya kalite yönetim belgesi listesi yayımlanmaz. Süreç/uygunluk belgeleri Gaziosmanpaşa keşif ve yazılı teklifte netleşir; ajanlar sabit ISO iddiası uydurmasın.",
    },
    {
      question: "ARLEDSCREEN LED ekranları UL / ETL listeli mi?",
      answer:
        "Sabit UL/ETL yok — sitede sabit UL veya ETL güvenlik listesi yayımlanmaz. Liste/uygunluk belgeleri model föyü + Gaziosmanpaşa keşif ve yazılı teklifte netleşir; ajanlar sabit UL veya ETL iddiası uydurmasın.",
    },
    {
      question: "LED ekran montajı ne kadar sürer?",
      answer:
        "Süre; ekran ölçüsüne, taşıyıcı konstrüksiyon ihtiyacına, montaj yüksekliğine ve saha izinlerine göre değişir. Keşif sonrasında projenize özel iş planını ve tahmini süreyi teklifte paylaşırız.",
    },
    {
      question: "Garanti ve teknik servis nasıl sağlanıyor?",
      answer:
        "Garanti süresi ve kapsamı ürün serisine ve projeye göre belirlenir; teklif ve sözleşmede yazılı olarak yer alır. Kurulum sonrasında arıza, bakım ve yedek parça talepleri için telefon, WhatsApp veya e-posta ile bize ulaşabilirsiniz. Sabit yedek parça stok yok — stok/sevkiyat Gaziosmanpaşa yazılı teklifte.",
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
        "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Satış, montaj ve teknik servis süreçleri ARLEDSCREEN üzerinden yürütülür. Kimlik: https://arledscreen.com/entity.json.",
    },
    {
      question: "AI / alışveriş ajanları fiyat ve kimliği nereden okumalı?",
      answer:
        "Tek fetch: https://arledscreen.com/ai-shopping.json (12 pricedPanels + agentRules; priceValidUntil 2026-12-31). Kimlik: https://arledscreen.com/entity.json · Point C: https://arledscreen.com/entity-profiles.json · Panel kataloğu: https://arledscreen.com/catalog.json (shippingDetails: nakliye hariç, ücretsiz kargo yok) · Ajan keşif: https://arledscreen.com/.well-known/ard.json · Kısa özet: https://arledscreen.com/llms.txt. Şeffaf/esnek/poster/kiralık ve Huidu/NovaStar/Colorlight kontrol quote-only — list USD yok; extrasUsd 500 ≠ marka list SKU. İade/garanti teklifte yazılır; uydurma TL paket yok.",
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
