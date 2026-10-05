/**
 * Hakkımızda / About page copy — verified corporate narrative.
 * Turkish is source of truth from the client brief.
 */

export type AboutProcessStep = { title: string; body: string };
export type AboutProductLine = { title: string; body: string };
export type AboutValue = { principle: string; practice: string };

export interface AboutContent {
  eyebrow: string;
  h1: string;
  lead: string;
  intro: string[];
  process: {
    title: string;
    lead: string;
    steps: AboutProcessStep[];
  };
  products: {
    title: string;
    lead: string;
    lines: AboutProductLine[];
  };
  network: {
    title: string;
    body: string;
  };
  values: {
    title: string;
    rows: AboutValue[];
  };
  missionVision: {
    title: string;
    missionLabel: string;
    mission: string;
    visionLabel: string;
    vision: string;
  };
}

export const ABOUT_TR: AboutContent = {
  eyebrow: "Kurum",
  h1: "ARLEDSCREEN & NXTIONSTAR",
  lead: "ARLEDSCREEN, LED ekran çözümlerini NXTIONSTAR kalitesi ve güvencesiyle sunar.",
  intro: [
    "Görsel teknoloji sistemleri alanında faaliyet gösteren firmamız; Bozkurt Global aile şirketleri bünyesinde, müşteri memnuniyeti ve yüksek mühendislik standartlarını merkeze alarak hizmet vermektedir. İstanbul merkezli üretim tesisimizde geliştirdiğimiz yüksek performanslı LED ekran çözümlerini, keşif aşamasından satış sonrası teknik servis süreçlerine kadar uçtan uca yönetmekteyiz.",
  ],
  process: {
    title: "Uçtan Uca Proje Yönetimi ve Saha Uzmanlığı",
    lead:
      "Proje süreçlerimizi yalnızca bir ürün tedariki olarak değil, sahada şekillenen mühendislik çözümleri olarak ele alıyoruz. Projelendirme aşamasında uyguladığımız standart adımlar:",
    steps: [
      {
        title: "Detaylı Saha Keşfi",
        body: "Montaj yapılacak alanın mimari yapısı, görünürlük açıları ve ortam ışığı analiz edilir.",
      },
      {
        title: "Teknik Altyapı Planlaması",
        body: "Elektrik altyapı gereksinimleri, taşıyıcı karkas sistemlerinin güvenlik hesabı ve güç tüketim parametreleri belirlenir.",
      },
      {
        title: "Özel Üretim ve Montaj",
        body: "Projeye uygun piksel aralığı (Pixel Pitch) ve kabin ölçülerinde üretilen ekranlar, uzman teknik ekiplerimizce kurulur.",
      },
      {
        title: "Devreye Alma ve Servis",
        body: "Kontrol sistemleri entegre edilerek test süreçleri tamamlanır; satış sonrası kesintisiz teknik destek sağlanır.",
      },
    ],
  },
  products: {
    title: "Geniş Ürün ve Uygulama Yelpazesi",
    lead:
      "İç mekan (Indoor) ve dış mekan (Outdoor) mimari gereksinimlere yanıt veren geniş ürün gamımız; yüksek parlaklık (Nit), düşük güç tüketimi ve uzun kullanım ömrü esasına göre tasarlanmıştır:",
    lines: [
      {
        title: "Bina Cephesi ve Totem Ekranlar",
        body: "Zorlu çevre şartlarına dayanıklı IP koruma sınıfları, yüksek yenileme hızı ve direkt güneş ışığında dahi net görünürlük sunan dış mekan çözümleri.",
      },
      {
        title: "Salon ve Etkinlik Ekranları",
        body: "Kongre, toplantı, balo ve sahne uygulamaları için yüksek renk derinliğine sahip, pürüzsüz görüntü aktaran iç mekan panelleri.",
      },
      {
        title: "Vitrin ve Poster Menuboard Sistemleri",
        body: "Mağaza, restoran ve ticari alanlarda dinamik içerik yönetimine imkan tanıyan, şık ve dikkat çekici görsel mecralar.",
      },
    ],
  },
  network: {
    title: "Türkiye Genelinde Güçlü Hizmet Ağı",
    body: "İstanbul’daki üretim merkezimizden çıkan tüm ürünler, Türkiye’nin 81 iline yayılmış olan yetkili bayi ve teknik servis ağımız aracılığıyla güvenle hayata geçirilmektedir. Güçlü lojistik ve saha organizasyonumuz sayesinde, Türkiye’nin her noktasında aynı kalite ve hızda servis garantisi sunuyoruz.",
  },
  values: {
    title: "Kurumsal Değerlerimiz",
    rows: [
      {
        principle: "Üretim Standartları",
        practice:
          "NXTIONSTAR markası altında endüstriyel bileşenler ve yüksek kaliteli kontrol kartları ile üretim.",
      },
      {
        principle: "Güvenilirlik ve Şeffaflık",
        practice:
          "Ürün teknik detaylarının, güç tüketim verilerinin ve garanti koşullarının eksiksiz beyanı.",
      },
      {
        principle: "Süreklilik ve Yedek Parça",
        practice:
          "Kurulum sonrası hızlı müdahale, periyodik bakım ve uzun vadeli yedek parça tedarik garantisi.",
      },
      {
        principle: "Çözüm Odaklılık",
        practice:
          "Standardın ötesinde, mekâna ve projeye özel terzi usulü konfigürasyon seçeneği.",
      },
    ],
  },
  missionVision: {
    title: "Misyon ve Vizyon",
    missionLabel: "Misyonumuz",
    mission:
      "Müşterilerimize, görsel iletişim ihtiyaçlarında en yüksek performanslı ve dayanıklı LED ekran teknolojilerini; keşiften montaja, yazılımdan teknik servise kadar eksiksiz ve güvenilir bir kurumsal hizmet anlayışıyla sunmaktır.",
    visionLabel: "Vizyonumuz",
    vision:
      "Türkiye genelindeki güçlü konumumuzu pekiştirirken, NXTIONSTAR markasını uluslararası pazarda da LED teknolojilerinin öncü ve güven duyulan markalarından biri haline getirmektir.",
  },
};

export const ABOUT_EN: AboutContent = {
  eyebrow: "Company",
  h1: "ARLEDSCREEN & NXTIONSTAR",
  lead: "ARLEDSCREEN delivers LED display solutions with NXTIONSTAR quality and assurance.",
  intro: [
    "Operating in visual technology systems as part of the Bozkurt Global family of companies, we centre customer satisfaction and high engineering standards. High-performance LED display solutions developed at our Istanbul facility are managed end to end — from survey through after-sales technical service.",
  ],
  process: {
    title: "End-to-end project management and field expertise",
    lead:
      "We treat projects as engineering solutions shaped on site — not mere product supply. Standard steps in our project workflow:",
    steps: [
      {
        title: "Detailed site survey",
        body: "Architecture, viewing angles and ambient light at the install location are analysed.",
      },
      {
        title: "Technical infrastructure planning",
        body: "Electrical requirements, structural frame safety calculations and power parameters are defined.",
      },
      {
        title: "Custom production and installation",
        body: "Screens produced at the project’s pixel pitch and cabinet sizes are installed by our specialist teams.",
      },
      {
        title: "Commissioning and service",
        body: "Control systems are integrated and tested; continuous after-sales technical support follows.",
      },
    ],
  },
  products: {
    title: "Broad product and application range",
    lead:
      "Our lineup for indoor and outdoor architectural needs is designed around high brightness (nits), efficient power use and long service life:",
    lines: [
      {
        title: "Façade and totem displays",
        body: "Outdoor solutions with IP protection for harsh conditions, high refresh rates and clear visibility in direct sunlight.",
      },
      {
        title: "Hall and event screens",
        body: "Indoor panels with high colour depth and smooth imagery for congress, meeting, ballroom and stage use.",
      },
      {
        title: "Storefront and poster / menuboard systems",
        body: "Elegant, attention-getting media for shops, restaurants and commercial spaces with dynamic content control.",
      },
    ],
  },
  network: {
    title: "Nationwide service network across Turkey",
    body: "Products from our Istanbul production centre are delivered through authorised dealers and technical service partners in all 81 provinces. Strong logistics and field organisation keep quality and response speed consistent everywhere.",
  },
  values: {
    title: "Corporate values",
    rows: [
      {
        principle: "Production standards",
        practice:
          "Manufacturing under the NXTIONSTAR brand with industrial components and high-quality control cards.",
      },
      {
        principle: "Reliability and transparency",
        practice:
          "Complete disclosure of technical details, power-consumption data and warranty terms.",
      },
      {
        principle: "Continuity and spare parts",
        practice:
          "Rapid post-install response, periodic maintenance and long-term spare-parts supply.",
      },
      {
        principle: "Solution focus",
        practice:
          "Beyond standard SKUs — tailor-made configuration for the space and project.",
      },
    ],
  },
  missionVision: {
    title: "Mission and vision",
    missionLabel: "Mission",
    mission:
      "To provide customers with the highest-performing, durable LED display technologies for visual communication — with a complete, reliable corporate service model from survey to installation, software and technical support.",
    visionLabel: "Vision",
    vision:
      "To strengthen our position across Turkey while making NXTIONSTAR one of the leading, trusted LED technology brands in international markets.",
  },
};

export function getAboutContent(locale: string): AboutContent {
  return locale === "tr" ? ABOUT_TR : ABOUT_EN;
}
