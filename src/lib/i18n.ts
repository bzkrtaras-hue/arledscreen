import { SITE_URL } from "@/lib/site";
export const locales = ["en", "tr", "ar", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  ar: "العربية",
  ru: "Русский",
};

export interface Dictionary {
  nav: {
    home: string;
    products: string;
    about: string;
    projects: string;
    references: string;
    configurator: string;
    priceCalculator: string;
    quote: string;
  };
  brand: {
    slogan: string;
  };
  hero: {
    badge: string;
    headline: string;
    subcopy: string;
    ctaConfigure: string;
    ctaQuote: string;
    stats: [{ value: string; label: string }, { value: string; label: string }, { value: string; label: string }];
  };
  sections: {
    modules: { eyebrow: string; title: string; description: string };
    configurator: { eyebrow: string; title: string; description: string };
    power: { eyebrow: string; title: string; description: string };
    products: { eyebrow: string; title: string; description: string };
    projects: { eyebrow: string; title: string; description: string };
    references: { eyebrow: string; title: string; description: string };
    faq: { eyebrow: string; title: string };
    aiCompat: { eyebrow: string; title: string; description: string; points: string[] };
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    body: string;
    cta: string;
    stats: [
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
    ];
  };
  references: {
    cardHint: string;
  };
  projects: {
    completedBadge: string;
    shots: {
      hospital: string;
      outdoor: string;
      event: string;
      indoor: string;
      dooh: string;
      finePitch: string;
      library: string;
      modular: string;
      facade: string;
      totemIndoor: string;
      totemOutdoor: string;
      cabinet: string;
      booth: string;
      installWiring: string;
      installScaffold: string;
      indoorLion: string;
      outdoorMapping: string;
      digitalPodium: string;
      loungeFootball: string;
      billboardArled: string;
      panelsWarehouse: string;
      serviceAssembly: string;
      factoryAssembly: string;
      frameWorkshop: string;
      ledPosterTotems: string;
      indoorStageWall: string;
      curvedLedDisplay: string;
      mobileLedTruck: string;
      mobileLedStage: string;
      automotiveLedEyes: string;
    };
  };
  configurator: {
    eyebrow: string;
    title: string;
    cabinetMode: string;
    cabinet500: string;
    cabinet1000: string;
    width: string;
    height: string;
    pitch: string;
    metrics: {
      resolution: string;
      aspect: string;
      viewing: string;
      cabinets: string;
      area: string;
    };
  };
  power: {
    title: string;
    description: string;
    environment: string;
    indoor: string;
    outdoor: string;
    area: string;
    areaHint: string;
    results: {
      max: string;
      avg: string;
      breaker: string;
      phase: string;
      network: string;
    };
    rstNote: string;
    signalIndoor: string;
    signalOutdoor: string;
  };
  products: {
    tabs: {
      all: string;
      cob: string;
      indoor: string;
      outdoor: string;
      rental: string;
      flexible: string;
    };
    downloadPdf: string;
    addToQuote: string;
    quickView: string;
    close: string;
    empty: string;
    specLabels: {
      pitch: string;
      technology: string;
      brightness: string;
      refresh: string;
      ip: string;
      weight: string;
      maintenance: string;
      viewingAngle: string;
      cabinet: string;
      lifespan: string;
    };
  };
  quote: {
    title: string;
    description: string;
    eyebrow: string;
    steps: { contact: string; project: string; details: string };
    fields: {
      name: string;
      email: string;
      company: string;
      phone: string;
      country: string;
      projectType: string;
      environment: string;
      width: string;
      height: string;
      pitch: string;
      timeline: string;
      budget: string;
      notes: string;
    };
    projectTypes: {
      controlRoom: string;
      stadium: string;
      retail: string;
      stage: string;
      broadcast: string;
      corporate: string;
      other: string;
    };
    environments: {
      indoor: string;
      outdoor: string;
      mixed: string;
    };
    timelines: {
      asap: string;
      m1to3: string;
      m3to6: string;
      m6plus: string;
    };
    budgets: {
      under50k: string;
      k50to150: string;
      k150to500: string;
      k500plus: string;
      tbd: string;
    };
    back: string;
    continue: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    rights: string;
    productLine: string;
    engineering: string;
  };
  common: {
    language: string;
    learnMore: string;
  };
  page: {
    configurator: { eyebrow: string; title: string; description: string };
    products: {
      eyebrow: string;
      title: string;
      description: string;
      moduleModelsHeading: string;
      moduleModelsLead: string;
    };
    quote: { eyebrow: string; title: string; description: string };
    hesaplayici: {
      eyebrow: string;
      title: string;
      description: string;
      liveNote: string;
    };
  };
}

const en: Dictionary = {
  nav: {
    home: "Home",
    products: "Products",
    about: "About",
    projects: "Projects",
    references: "References",
    configurator: "Configurator",
    priceCalculator: "Calculator",
    quote: "Request Quote",
  },
  brand: {
    slogan: "NXTIONSTAR — ARLEDSCREEN's own LED display brand.",
  },
  hero: {
    badge: "NXTIONSTAR — our own LED brand · Istanbul / Gaziosmanpaşa",
    headline: "LED Display Technology Center.",
    subcopy:
      "Fine-pitch, outdoor LED, totems and digital signage. NXTIONSTAR products with end-to-end compatibility for AI, media servers and control software — engineered by ARLEDSCREEN.",
    ctaConfigure: "Price List / Calculator",
    ctaQuote: "Request Enterprise Quote",
    stats: [
      { value: "NXTIONSTAR", label: "Our own brand" },
      { value: "Istanbul", label: "Gaziosmanpaşa HQ" },
      { value: "Turnkey", label: "Survey · install · service" },
    ],
  },
  sections: {
    modules: {
      eyebrow: "Platform modules",
      title: "Everything you need — without the clutter",
      description:
        "Explore products, calculator, configurator and project references. Each tool lives on its own page; here we show what it does.",
    },
    configurator: {
      eyebrow: "Engineering desk",
      title: "Size the wall before the site survey",
      description:
        "Dial width, height, pitch and cabinet mode. Resolution, viewing distance and cabinet counts update instantly.",
    },
    power: {
      eyebrow: "Power topology",
      title: "Infrastructure that keeps the wall online",
      description:
        "Translate area and environment into peak/average kW, breaker guidance, and CAT6 vs fiber notes.",
    },
    products: {
      eyebrow: "Series catalog",
      title: "A taste of the LED catalog",
      description:
        "Three featured NXTIONSTAR modules — open the products page for the full GOB, indoor, outdoor and flexible lineup.",
    },
    projects: {
      eyebrow: "Field installs",
      title: "Completed LED projects",
      description:
        "Real deployments — hospitals, outdoor façades, events and fine-pitch interiors — photographed on site.",
    },
    references: {
      eyebrow: "Projects",
      title: "Recently completed projects",
      description:
        "Company, scope, city and date from recent ARLEDSCREEN / NXTIONSTAR field installs.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Answers enterprise buyers ask first",
    },
    aiCompat: {
      eyebrow: "AI infrastructure",
      title: "LED walls built for artificial-intelligence workflows",
      description:
        "NXTIONSTAR displays are specified by ARLEDSCREEN for full compatibility with AI content engines, media servers and control software — so generated, scheduled and automated visuals stay reliable on the wall.",
      points: [
        "Documented signal paths for CMS, media servers and automation APIs",
        "High refresh and stable pixel pipelines for AI-driven or camera-facing content",
        "Engineering desk that sizes pitch, power and receivers around your AI stack",
      ],
    },
  },
  about: {
    eyebrow: "Company",
    title: "ARLEDSCREEN — LED engineering in Turkey",
    description:
      "ARLEDSCREEN delivers LED systems in Turkey. We specify and support B2B LED walls for control rooms, retail, outdoor façades and digital signage. NXTIONSTAR is our product sub-brand.",
    body:
      "From fine-pitch command centers to IP65 outdoor LED and totem installs, our desk pairs product choice with viewing distance, power topology and a clear BOM. We serve integrators, agencies and facility owners who need field-ready engineering — not showroom theatre.",
    cta: "Read more about us",
    stats: [
      { value: "NXTIONSTAR", label: "Our own brand" },
      { value: "Istanbul", label: "Gaziosmanpaşa HQ" },
      { value: "Turnkey", label: "Survey · install · service" },
    ],
  },
  references: {
    cardHint: "ARLEDSCREEN field reference",
  },
  projects: {
    completedBadge: "Completed install",
    shots: {
      hospital: "Hospital lobby — information LED wall",
      outdoor: "Municipal outdoor LED façade install",
      event: "Event stage — LED backdrop wall",
      indoor: "Hospitality venue — indoor LED display",
      dooh: "Outdoor DOOH LED billboard",
      finePitch: "Fine-pitch indoor LED canvas",
      library: "University library — LED stage wall",
      modular: "Modular LED wall system",
      facade: "Completed outdoor LED façade",
      totemIndoor: "Indoor digital totem display",
      totemOutdoor: "Outdoor digital totem kiosk",
      cabinet: "500×1000 mm LED cabinet — pre-install",
      booth: "Custom curved LED housing",
      installWiring: "LED wall — power & signal wiring",
      installScaffold: "Indoor LED wall — scaffold install",
      indoorLion: "Indoor LED screen — content playback",
      outdoorMapping: "Outdoor LED — calibration mapping",
      digitalPodium: "Digital lectern with LED front panel",
      loungeFootball: "Sports lounge — indoor LED wall",
      billboardArled: "Outdoor ARLEDSCREEN LED billboard",
      panelsWarehouse: "Warehouse — LED panels stacked for dispatch",
      serviceAssembly: "Indoor LED wall — on-site module assembly",
      factoryAssembly: "Factory — LED structure assembly",
      frameWorkshop: "Workshop — custom LED steel frame",
      ledPosterTotems: "LED poster / digital totem series — synchronized vertical displays",
      indoorStageWall: "Indoor stage — panoramic LED video wall",
      curvedLedDisplay: "Curved indoor LED wall — creative install",
      mobileLedTruck: "Mobile LED advertising truck — outdoor DOOH",
      mobileLedStage: "Mobile LED stage truck — event production",
      automotiveLedEyes: "Custom automotive LED — creative application",
    },
  },
  configurator: {
    eyebrow: "Real-time engineering",
    title: "LED Wall Configurator",
    cabinetMode: "Cabinet mode",
    cabinet500: "500×500 mm",
    cabinet1000: "500×1000 mm",
    width: "Width (m)",
    height: "Height (m)",
    pitch: "Pixel pitch",
    metrics: {
      resolution: "Resolution",
      aspect: "Aspect ratio",
      viewing: "Optimal viewing",
      cabinets: "Cabinets",
      area: "Area",
    },
  },
  power: {
    title: "Power & Signal Calculator",
    description:
      "Estimate peak/average draw, 3-phase breaker sizing, and CAT6 vs fiber guidance for enterprise installs.",
    environment: "Environment",
    indoor: "Indoor",
    outdoor: "Outdoor",
    area: "Display area (m²)",
    areaHint: "Width × height of the active LED surface",
    results: {
      max: "Max power",
      avg: "Avg power",
      breaker: "Breaker (3φ)",
      phase: "R-S-T balancing",
      network: "CAT6 / Fiber",
    },
    rstNote:
      "Balance R-S-T phases across power cabinets; isolate LED load from AV control UPS where possible.",
    signalIndoor:
      "CAT6/CAT6A for runs ≤70 m; fiber recommended for backbone / multi-receiver topologies.",
    signalOutdoor:
      "Prefer multimode/single-mode fiber beyond 80 m; CAT6A up to ~70 m with shielded runs.",
  },
  products: {
    tabs: {
      all: "All models",
      cob: "Fine-pitch GOB",
      indoor: "Indoor",
      outdoor: "Outdoor",
      rental: "Rental",
      flexible: "Flexible",
    },
    downloadPdf: "Download PDF",
    addToQuote: "Add to Quote",
    quickView: "Quick View Specs",
    close: "Close",
    empty: "No products in this series.",
    specLabels: {
      pitch: "Pixel pitch",
      technology: "Technology",
      brightness: "Brightness",
      refresh: "Refresh",
      ip: "IP rating",
      weight: "Weight",
      maintenance: "Maintenance",
      viewingAngle: "Viewing angle",
      cabinet: "Cabinet",
      lifespan: "Lifespan",
    },
  },
  quote: {
    title: "Request a project quote",
    description:
      "Three steps — contact, project geometry, and timeline. Our engineering team responds with a preliminary BOM.",
    eyebrow: "Enterprise desk",
    steps: {
      contact: "Contact",
      project: "Project",
      details: "Details",
    },
    fields: {
      name: "Contact name",
      email: "Work email",
      company: "Company",
      phone: "Phone",
      country: "Country",
      projectType: "Project type",
      environment: "Environment",
      width: "Width (m)",
      height: "Height (m)",
      pitch: "Pitch preference",
      timeline: "Timeline",
      budget: "Budget band",
      notes: "Notes",
    },
    projectTypes: {
      controlRoom: "Control room",
      stadium: "Stadium",
      retail: "Retail",
      stage: "Stage / events",
      broadcast: "Broadcast",
      corporate: "Corporate",
      other: "Other",
    },
    environments: {
      indoor: "Indoor",
      outdoor: "Outdoor",
      mixed: "Mixed",
    },
    timelines: {
      asap: "ASAP",
      m1to3: "1–3 months",
      m3to6: "3–6 months",
      m6plus: "6+ months",
    },
    budgets: {
      under50k: "Under $50k",
      k50to150: "$50k–$150k",
      k150to500: "$150k–$500k",
      k500plus: "$500k+",
      tbd: "TBD",
    },
    back: "Back",
    continue: "Continue",
    submit: "Submit quote request",
    sending: "Sending…",
    successTitle: "Quote request received",
    successBody:
      "Our enterprise desk will respond within one business day with a preliminary BOM and power topology outline.",
    backHome: "Back to home",
  },
  footer: {
    tagline: "NXTIONSTAR LED displays · engineered and delivered by ARLEDSCREEN.",
    rights: "All rights reserved.",
    productLine: "Platform",
    engineering: "Survey, installation and technical service",
  },
  common: {
    language: "Language",
    learnMore: "Learn more",
  },
  page: {
    configurator: {
      eyebrow: "Configurator",
      title: "Design your LED wall",
      description:
        "Interactive sizing for pitch, cabinets, resolution and viewing distance — plus power infrastructure estimates.",
    },
    products: {
      eyebrow: "Catalog",
      title: "NXTIONSTAR product series",
      description:
        "Explore NXTIONSTAR GOB, indoor, outdoor and flexible LED modules from P1.25 to P8 for B2B installations.",
      moduleModelsHeading: "Module & cabinet models",
      moduleModelsLead:
        "Each card below shows a real NXTIONSTAR module with its pixel pitch and use. The datasheet and price are shared with your quote.",
    },
    quote: {
      eyebrow: "Enterprise desk",
      title: "Request a project quote",
      description:
        "Three steps — contact, project geometry, and timeline. Our engineering team responds with a preliminary BOM.",
    },
    hesaplayici: {
      eyebrow: "Live catalog tool",
      title: "Price list / materials calculator",
      description:
        "Official ARLEDSCREEN cost and materials calculator — screen size, module type, module count and approximate cost.",
      liveNote: "Embedded live from",
    },
  },
};

const tr: Dictionary = {
  nav: {
    home: "Ana sayfa",
    products: "Ürünler",
    about: "Hakkımızda",
    projects: "Projeler",
    references: "Referanslar",
    configurator: "Konfigüratör",
    priceCalculator: "Hesaplayıcı",
    quote: "Teklif al",
  },
  brand: {
    slogan: "NXTIONSTAR — ARLEDSCREEN'in kendi LED ekran markası",
  },
  hero: {
    badge: "NXTIONSTAR · ARLEDSCREEN’in kendi markası",
    headline: "İç ve dış mekân LED ekran sistemleri.",
    subcopy:
      "NXTIONSTAR panellerini Türkiye’de ARLEDSCREEN satar, keşfeder ve monte eder. Cephe, vitrin, totem ve salon ölçüleri sahada netleşir; servis Gaziosmanpaşa ofisinden yürür.",
    ctaConfigure: "Ürün serilerini inceleyin",
    ctaQuote: "Yazılı teklif alın",
    stats: [
      { value: "NXTIONSTAR", label: "Kendi markamız" },
      { value: "İstanbul", label: "Gaziosmanpaşa merkez" },
      { value: "Anahtar teslim", label: "Keşif · montaj · servis" },
    ],
  },
  sections: {
    modules: {
      eyebrow: "Platform modülleri",
      title: "Projeyi netleştiren araçlar",
      description:
        "NXTIONSTAR ürünleri, fiyat hesaplayıcı, ekran konfigüratörü ve saha referansları. Her araç kendi sayfasında; burada işlevlerini özetliyoruz.",
    },
    configurator: {
      eyebrow: "Mühendislik masası",
      title: "Saha keşfinden önce ekranı boyutlandırın",
      description:
        "Genişlik, yükseklik, pitch ve kabin modunu ayarlayın. Çözünürlük, izleme mesafesi ve kabin adedi anında güncellenir.",
    },
    power: {
      eyebrow: "Güç topolojisi",
      title: "Ekranı güvenle çalıştıran altyapı",
      description:
        "Alan ve ortamı tepe/ortalama kW, kesici önerisi ve CAT6 / fiber notlarına dönüştürün.",
    },
    products: {
      eyebrow: "Seri kataloğu",
      title: "Öne çıkan LED ekran serileri",
      description:
        "GOB, iç mekân ve dış mekân NXTIONSTAR modüllerinden örnekler — tüm modeller için ürünler sayfasına geçin.",
    },
    projects: {
      eyebrow: "Saha kurulumları",
      title: "Yakın süreçte tamamlanan LED ekran projelerimiz",
      description:
        "Hastane bilgilendirme ekranlarından dış mekân LED cepheye, totem ve ince pitch iç mekâna — Türkiye’de ARLEDSCREEN / NXTIONSTAR saha fotoğrafları.",
    },
    references: {
      eyebrow: "Referanslar",
      title: "Yakın Süreçte Tamamlanan Projeler",
      description:
        "Firma, kapsam, konum ve tarih bilgisiyle ARLEDSCREEN saha kurulum kayıtları.",
    },
    faq: {
      eyebrow: "SSS",
      title: "LED ekran projelerinde sık sorulan sorular",
    },
    aiCompat: {
      eyebrow: "Yapay zekâ altyapısı",
      title: "Yapay zekâ uygulamaları için tasarlanmış LED duvarlar",
      description:
        "NXTIONSTAR ekranlar, yapay zekâ ile üretilen veya zamanlanan içeriği oynatan medya sunucuları ve kontrol yazılımlarıyla birlikte çalışacak şekilde projelendirilir. Uyumluluk, keşif aşamasında kullanılacak yazılım ve donanıma göre doğrulanır.",
      points: [
        "CMS, medya sunucu ve otomasyon API’leri için dokümante sinyal yolları",
        "YZ destekli veya kamera önü içerik için yüksek yenileme ve kararlı piksel hattı",
        "Pitch, güç ve alıcı mimarisini sizin YZ yığınınıza göre boyutlandıran mühendislik masası",
      ],
    },
  },
  about: {
    eyebrow: "Kurum",
    title: "LED ekran teknoloji merkezi — ARLEDSCREEN",
    description:
      "ARLEDSCREEN, NXTIONSTAR LED ekran teknolojisini kurumsal projelerde ürün, keşif, montaj ve teknik destekle tek çatı altında yürütür.",
    body:
      "Toplantı salonlarından dış mekân cephelere, totem ve sahne kurulumlarına kadar ürün seçimini izleme mesafesi, güç planı ve net malzeme listesiyle birlikte ele alıyoruz. Amacımız, sahada sorunsuz çalışan ve bakımı planlanmış LED ekran sistemleri kurmak.",
    cta: "Hakkımızda daha fazla",
    stats: [
      { value: "NXTIONSTAR", label: "Kendi markamız" },
      { value: "İstanbul", label: "Gaziosmanpaşa merkez" },
      { value: "Anahtar teslim", label: "Keşif · montaj · servis" },
    ],
  },
  references: {
    cardHint: "ARLEDSCREEN saha referansı",
  },
  projects: {
    completedBadge: "Tamamlanan kurulum",
    shots: {
      hospital: "Hastane lobisi — bilgilendirme LED duvarı",
      outdoor: "Belediye — dış mekân LED cephe kurulumu",
      event: "Etkinlik sahnesi — LED fon duvarı",
      indoor: "Ağırlama mekânı — iç mekân LED ekran",
      dooh: "Dış mekân DOOH LED billboard",
      finePitch: "İnce pitch iç mekân LED yüzey",
      library: "Üniversite kütüphanesi — LED sahne duvarı",
      modular: "Modüler LED duvar sistemi",
      facade: "Tamamlanmış dış mekân LED cephe",
      totemIndoor: "İç mekân dijital totem ekran",
      totemOutdoor: "Dış mekân dijital totem kiosk",
      cabinet: "500×1000 mm LED kabin — montaj öncesi",
      booth: "Özel kavisli LED gövde",
      installWiring: "LED duvar — güç ve sinyal kablolaması",
      installScaffold: "İç mekân LED duvar — iskele montajı",
      indoorLion: "İç mekân LED ekran — içerik yayını",
      outdoorMapping: "Dış mekân LED — kalibrasyon haritası",
      digitalPodium: "LED ön panelli dijital kürsü",
      loungeFootball: "Spor lounge — iç mekân LED duvar",
      billboardArled: "Dış mekân ARLEDSCREEN LED billboard",
      panelsWarehouse: "Depo — sevk öncesi istiflenmiş LED paneller",
      serviceAssembly: "İç mekân LED duvar — sahada modül montajı",
      factoryAssembly: "Fabrika — LED gövde ve konstrüksiyon montajı",
      frameWorkshop: "Atölye — özel LED çelik karkas üretimi",
      ledPosterTotems: "LED poster / dijital totem serisi — senkron dikey ekranlar",
      indoorStageWall: "İç mekân sahne — panoramik LED video duvar",
      curvedLedDisplay: "Kavisli iç mekân LED duvar — yaratıcı kurulum",
      mobileLedTruck: "Mobil LED reklam kamyonu — dış mekân DOOH",
      mobileLedStage: "Mobil LED sahne kamyonu — etkinlik üretimi",
      automotiveLedEyes: "Özel otomotiv LED — yaratıcı uygulama",
    },
  },
  configurator: {
    eyebrow: "Gerçek zamanlı mühendislik",
    title: "LED Duvar Konfigüratörü",
    cabinetMode: "Kabin modu",
    cabinet500: "500×500 mm",
    cabinet1000: "500×1000 mm",
    width: "Genişlik (m)",
    height: "Yükseklik (m)",
    pitch: "Piksel pitch",
    metrics: {
      resolution: "Çözünürlük",
      aspect: "En-boy oranı",
      viewing: "Optimum izleme",
      cabinets: "Kabinler",
      area: "Alan",
    },
  },
  power: {
    title: "Güç & Sinyal Hesaplayıcı",
    description:
      "Kurumsal kurulumlar için tepe ve ortalama güç çekişini, 3 fazlı kesici boyutunu ve CAT6 / fiber rehberini tahmin edin.",
    environment: "Ortam",
    indoor: "İç mekân",
    outdoor: "Dış mekân",
    area: "Ekran alanı (m²)",
    areaHint: "Aktif LED yüzeyinin genişliği × yüksekliği",
    results: {
      max: "Maks. güç",
      avg: "Ort. güç",
      breaker: "Kesici (3φ)",
      phase: "R-S-T dengeleme",
      network: "CAT6 / Fiber",
    },
    rstNote:
      "Güç kabinlerinde R-S-T fazlarını dengeleyin; mümkünse LED yükünü AV kontrol UPS’inden ayırın.",
    signalIndoor:
      "≤70 m hatlarda CAT6/CAT6A; omurga / çoklu alıcı topolojilerinde fiber önerilir.",
    signalOutdoor:
      "80 m üzeri için multimode/single-mode fiber tercih edin; korumalı hatlarda CAT6A ~70 m’ye kadar.",
  },
  products: {
    tabs: {
      all: "Tüm modeller",
      cob: "GOB / ince pitch",
      indoor: "İç mekân",
      outdoor: "Dış mekân",
      rental: "Kiralık / sahne",
      flexible: "Esnek",
    },
    downloadPdf: "PDF İndir",
    addToQuote: "Teklife Ekle",
    quickView: "Hızlı Bakış",
    close: "Kapat",
    empty: "Bu seride ürün bulunmuyor.",
    specLabels: {
      pitch: "Piksel pitch",
      technology: "Teknoloji",
      brightness: "Parlaklık",
      refresh: "Yenileme",
      ip: "IP koruma",
      weight: "Ağırlık",
      maintenance: "Bakım",
      viewingAngle: "İzleme açısı",
      cabinet: "Kabin",
      lifespan: "Ömür",
    },
  },
  quote: {
    title: "Proje teklifi talep edin",
    description:
      "Üç adım: iletişim, proje ölçüleri ve zaman çizelgesi. Mühendislik ekibimiz ön malzeme listesi ile yanıtlar.",
    eyebrow: "Kurumsal masa",
    steps: {
      contact: "İletişim",
      project: "Proje",
      details: "Detaylar",
    },
    fields: {
      name: "Yetkili adı",
      email: "İş e-postası",
      company: "Şirket",
      phone: "Telefon",
      country: "Ülke",
      projectType: "Proje tipi",
      environment: "Ortam",
      width: "Genişlik (m)",
      height: "Yükseklik (m)",
      pitch: "Pitch tercihi",
      timeline: "Zaman çizelgesi",
      budget: "Bütçe aralığı",
      notes: "Notlar",
    },
    projectTypes: {
      controlRoom: "Kontrol odası",
      stadium: "Stadyum",
      retail: "Perakende",
      stage: "Sahne / etkinlik",
      broadcast: "Yayın",
      corporate: "Kurumsal",
      other: "Diğer",
    },
    environments: {
      indoor: "İç mekân",
      outdoor: "Dış mekân",
      mixed: "Karma",
    },
    timelines: {
      asap: "En kısa sürede",
      m1to3: "1–3 ay",
      m3to6: "3–6 ay",
      m6plus: "6+ ay",
    },
    budgets: {
      under50k: "50 bin $ altı",
      k50to150: "50–150 bin $",
      k150to500: "150–500 bin $",
      k500plus: "500 bin $+",
      tbd: "Belirlenecek",
    },
    back: "Geri",
    continue: "Devam",
    submit: "Teklif talebini gönder",
    sending: "Gönderiliyor…",
    successTitle: "Teklif talebiniz alındı",
    successBody:
      "Kurumsal masamız bir iş günü içinde ön malzeme listesi ve güç özeti ile dönüş yapacaktır.",
    backHome: "Ana sayfaya dön",
  },
  footer: {
    tagline: "NXTIONSTAR, ARLEDSCREEN’in kendi markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. İç ve dış mekân LED ekran satışı, montajı ve teknik servisi.",
    rights: "Tüm hakları saklıdır.",
    productLine: "Platform",
    engineering: "Telefon, WhatsApp ve e-posta ile proje desteği",
  },
  common: {
    language: "Dil",
    learnMore: "Daha fazla",
  },
  page: {
    configurator: {
      eyebrow: "Konfigüratör",
      title: "LED ekranınızı boyutlandırın",
      description:
        "Pitch, kabin, çözünürlük ve izleme mesafesi için etkileşimli boyutlandırma — güç altyapısı tahminleriyle birlikte.",
    },
    products: {
      eyebrow: "Katalog",
      title: "NXTIONSTAR ürün serileri",
      description:
        "Kurumsal kurulumlar için ince pitch, iç mekân, dış mekân, kiralama ve şeffaf LED sistemlerini keşfedin.",
      moduleModelsHeading: "Modül / kabin modelleri",
      moduleModelsLead:
        "Aşağıdaki görsel, modül seçeneklerine genel bir bakış sunar. Parlaklık, kabin ölçüsü ve koruma sınıfı gibi model bazlı değerler teklifle birlikte yazılı olarak iletilir.",
    },
    quote: {
      eyebrow: "Kurumsal masa",
      title: "Proje teklifi talep edin",
      description:
        "Üç adım: iletişim, proje ölçüleri ve zaman çizelgesi. Mühendislik ekibimiz ön malzeme listesi ile yanıtlar.",
    },
    hesaplayici: {
      eyebrow: "Canlı katalog aracı",
      title: "Fiyat Listesi / Hesaplayıcı",
      description:
        "Resmi ARLEDSCREEN malzeme ve maliyet hesaplayıcısı — ekran ölçüsü, modül tipi, modül adedi ve yaklaşık maliyet.",
      liveNote: "Canlı gömülü kaynak:",
    },
  },
};

const ar: Dictionary = {
  ...en,
  nav: {
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    projects: "المشاريع",
    references: "المراجع",
    configurator: "المُكوِّن",
    priceCalculator: "الحاسبة",
    quote: "طلب عرض سعر",
  },
  brand: {
    slogan: "NXTIONSTAR — العلامة التجارية الخاصة بـ ARLEDSCREEN لشاشات LED.",
  },
  sections: {
    ...en.sections,
    modules: {
      eyebrow: "وحدات المنصة",
      title: "كل ما تحتاجه — بدون تشويش",
      description:
        "استكشف المنتجات والحاسبة والمُكوِّن ومراجع المشاريع. كل أداة في صفحتها؛ هنا نوضح وظيفتها.",
    },
    products: {
      ...en.sections.products,
      title: "لمحة من كتالوج LED",
      description:
        "ثلاث سلاسل مميزة — افتح صفحة المنتجات للكتالوج الكامل.",
    },
    references: {
      eyebrow: "المشاريع",
      title: "مشاريع مكتملة مؤخراً",
      description:
        "الشركة والنطاق والمدينة والتاريخ من تركيبات ARLEDSCREEN / NXTIONSTAR الأخيرة.",
    },
  },
  references: {
    cardHint: "مرجع ميداني من ARLEDSCREEN",
  },
  about: {
    eyebrow: "الشركة",
    title: "هندسة المساحات البصرية للمؤسسات",
    description:
      "تصمم NXTIONSTAR وتنشر جدران LED للشركات لغرف التحكم والبث والتجزئة والأماكن الغامرة.",
    body:
      "من مراكز القيادة fine-pitch COB إلى الواجهات الخارجية IP65، يجمع مكتب المشاريع بين اختيار المنتج وطوبولوجيا الطاقة ومسافة المشاهدة ووضوح قائمة المواد.",
    cta: "المزيد عنا",
    stats: [
      { value: "NXTIONSTAR", label: "علامتنا الخاصة" },
      { value: "إسطنبول", label: "المقر: غازي عثمان باشا" },
      { value: "تسليم متكامل", label: "معاينة · تركيب · صيانة" },
    ],
  },
  hero: {
    badge: "NXTIONSTAR · منصة LED للشركات",
    headline: "هندسة مستقبل المساحات البصرية.",
    subcopy:
      "جدران LED للمؤسسات مصممة لغرف التحكم والبث والتجزئة والأماكن الغامرة. دقة في الـ pitch وموثوقية صناعية وانتشار عالمي.",
    ctaConfigure: "تكوين جدار LED",
    ctaQuote: "طلب عرض مؤسسي",
    stats: [
      { value: "NXTIONSTAR", label: "علامتنا الخاصة" },
      { value: "إسطنبول", label: "المقر: غازي عثمان باشا" },
      { value: "تسليم متكامل", label: "معاينة · تركيب · صيانة" },
    ],
  },
  footer: {
    tagline: "أنظمة شاشات LED للشركات للبيئات البصرية الحرجة.",
    rights: "جميع الحقوق محفوظة.",
    productLine: "المنصة",
    engineering: "المعاينة والتركيب والخدمة الفنية",
  },
  common: {
    language: "اللغة",
    learnMore: "اعرف المزيد",
  },
  page: {
    ...en.page,
    products: {
      ...en.page.products,
      moduleModelsHeading: "نماذج الوحدات والخزائن",
      moduleModelsLead:
        "كل بطاقة تعرض وحدة NXTIONSTAR حقيقية مع مسافة البكسل (pitch) ومجال الاستخدام؛ تُرسل ورقة البيانات والسعر مع عرض السعر.",
    },
  },
};

const ru: Dictionary = {
  ...en,
  nav: {
    home: "Главная",
    products: "Продукты",
    about: "О нас",
    projects: "Проекты",
    references: "Референсы",
    configurator: "Конфигуратор",
    priceCalculator: "Калькулятор",
    quote: "Запросить КП",
  },
  brand: {
    slogan: "NXTIONSTAR — собственный LED-бренд ARLEDSCREEN.",
  },
  sections: {
    ...en.sections,
    modules: {
      eyebrow: "Модули платформы",
      title: "Всё нужное — без лишнего",
      description:
        "Продукты, калькулятор, конфигуратор и проекты. Каждый инструмент на своей странице; здесь — кратко о назначении.",
    },
    products: {
      ...en.sections.products,
      title: "Вкус LED-каталога",
      description:
        "Три избранные линейки — полный каталог на странице продуктов.",
    },
    references: {
      eyebrow: "Проекты",
      title: "Недавно завершённые проекты",
      description:
        "Компания, объём, город и дата — недавние полевые установки ARLEDSCREEN / NXTIONSTAR.",
    },
  },
  references: {
    cardHint: "Полевой референс ARLEDSCREEN",
  },
  about: {
    eyebrow: "Компания",
    title: "Инженерия визуальных пространств для бизнеса",
    description:
      "NXTIONSTAR проектирует и внедряет B2B LED-стены для диспетчерских, вещания, ритейла и иммерсивных площадок.",
    body:
      "От fine-pitch COB командных центров до IP65 фасадов — проектный стол совмещает выбор продукта с топологией питания, дистанцией просмотра и прозрачным BOM.",
    cta: "Подробнее о нас",
    stats: [
      { value: "NXTIONSTAR", label: "Наш собственный бренд" },
      { value: "Стамбул", label: "Офис: Газиосманпаша" },
      { value: "Под ключ", label: "Обследование · монтаж · сервис" },
    ],
  },
  hero: {
    badge: "NXTIONSTAR · B2B LED-платформа",
    headline: "Проектируем будущее визуальных пространств.",
    subcopy:
      "Корпоративные LED-стены для диспетчерских, вещания, ритейла и иммерсивных площадок. Точный питч, промышленная надёжность, глобальное внедрение.",
    ctaConfigure: "Сконфигурировать LED-стену",
    ctaQuote: "Запросить корпоративное КП",
    stats: [
      { value: "NXTIONSTAR", label: "Наш собственный бренд" },
      { value: "Стамбул", label: "Офис: Газиосманпаша" },
      { value: "Под ключ", label: "Обследование · монтаж · сервис" },
    ],
  },
  footer: {
    tagline: "B2B LED-системы для критически важных визуальных сред.",
    rights: "Все права защищены.",
    productLine: "Платформа",
    engineering: "Обследование, монтаж и техническое обслуживание",
  },
  common: {
    language: "Язык",
    learnMore: "Подробнее",
  },
  page: {
    ...en.page,
    products: {
      ...en.page.products,
      moduleModelsHeading: "Модели модулей и кабинетов",
      moduleModelsLead:
        "Каждая карточка — реальный модуль NXTIONSTAR с шагом пикселя и областью применения; техпаспорт и цена — вместе с коммерческим предложением.",
    },
  },
};

const dictionary: Record<Locale, Dictionary> = { en, tr, ar, ru };


export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale] ?? dictionary.en;
}

export function buildAlternates(
  path: string,
  baseUrl = SITE_URL,
): Record<string, string> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  let clean = normalized === "/" ? "/" : normalized;
  if (clean !== "/" && !clean.endsWith("/")) clean = `${clean}/`;
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      clean === "/" ? `${baseUrl}/${locale}/` : `${baseUrl}/${locale}${clean}`,
    ]),
  );
}
