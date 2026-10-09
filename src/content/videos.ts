/**
 * Site videos: Drive field clips + Instagram export (@arledscreen).
 * H.264, no audio, +faststart. Captions use only verified project facts.
 */
export interface SiteVideo {
  slug: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  titleEn: string;
  caption: string;
  captionEn: string;
  /**
   * ISO 8601 date of the Instagram post. Full date only where it is known
   * (linked blog post); otherwise year-month from the caption. Never guessed.
   */
  uploadDate?: string;
}

export const PROJECT_VIDEOS: SiteVideo[] = [
  {
    slug: "lounge-fine-pitch-fox",
    src: "/videos/lounge-fine-pitch-fox.mp4",
    poster: "/videos/lounge-fine-pitch-fox.webp",
    width: 1080,
    height: 1920,
    title: "Lounge — İnce Pitch LED Duvar",
    titleEn: "Lounge — fine-pitch LED wall",
    caption: "4K saha görüntüsü: lounge oturma alanında yüksek çözünürlüklü LED duvar testi",
    captionEn: "4K field clip: high-resolution LED wall test in a lounge seating area",
  },
  {
    slug: "lounge-gob-install",
    src: "/videos/lounge-gob-install.mp4",
    poster: "/videos/lounge-gob-install.webp",
    width: 1080,
    height: 1920,
    title: "Lounge — GOB LED Montaj",
    titleEn: "Lounge — GOB LED install",
    caption: "İç mekân lounge’da GOB ince pitch LED duvar montajı ve saha kurulumu",
    captionEn: "Indoor lounge GOB fine-pitch LED wall install on site",
  },
  {
    slug: "event-lounge-led-wall",
    src: "/videos/event-lounge-led-wall.mp4",
    poster: "/videos/event-lounge-led-wall.webp",
    width: 720,
    height: 1280,
    title: "Etkinlik Lounge — LED Sahne Duvarı",
    titleEn: "Event lounge — LED stage wall",
    caption: "Karanlık lounge’da yüksek kontrast içerikli iç mekân LED duvar",
    captionEn: "Indoor LED wall with high-contrast content in a dark lounge",
  },
  {
    slug: "immersive-ceiling-led-tunnel",
    src: "/videos/immersive-ceiling-led-tunnel.mp4",
    poster: "/videos/immersive-ceiling-led-tunnel.webp",
    width: 720,
    height: 986,
    title: "İmmersif LED — Tavan ve Yan Duvar",
    titleEn: "Immersive LED — ceiling and side walls",
    caption: "Tavan ve yan yüzeyleri kaplayan immersif iç mekân LED tünel kurulumu",
    captionEn: "Immersive indoor LED tunnel covering ceiling and side surfaces",
  },
  {
    slug: "club-immersive-led-stage",
    src: "/videos/club-immersive-led-stage.mp4",
    poster: "/videos/club-immersive-led-stage.webp",
    width: 1080,
    height: 1920,
    title: "Kulüp — İmmersif LED Sahne",
    titleEn: "Club — immersive LED stage",
    caption: "Dikey LED paneller ve zemin LED ile immersif kulüp / lounge uygulaması",
    captionEn: "Immersive club / lounge install with vertical LED panels and floor LED",
  },
  {
    slug: "lounge-aquarium-wall",
    src: "/videos/lounge-aquarium-wall.mp4",
    poster: "/videos/lounge-aquarium-wall.webp",
    width: 1280,
    height: 720,
    title: "Lounge — Akvaryum İçerikli LED Duvar",
    titleEn: "Lounge — aquarium-content LED wall",
    caption: "Kafe / lounge salonunda yatay iç mekân LED duvar yayını",
    captionEn: "Horizontal indoor LED wall playback in a café / lounge hall",
  },
  {
    slug: "lounge-football-night",
    src: "/videos/lounge-football-night.mp4",
    poster: "/videos/lounge-football-night.webp",
    width: 848,
    height: 480,
    title: "Lounge — Gece Maç Yayını",
    titleEn: "Lounge — night match broadcast",
    caption: "Gece lounge ortamında canlı spor yayını yapan geniş LED ekran",
    captionEn: "Wide LED display showing a live sports broadcast in a night lounge",
  },
  {
    slug: "curved-mobile-led-podium",
    src: "/videos/curved-mobile-led-podium.mp4",
    poster: "/videos/curved-mobile-led-podium.webp",
    width: 1280,
    height: 720,
    title: "Kavisli Mobil LED Podyum",
    titleEn: "Curved mobile LED podium",
    caption: "Tekerlekli, kavisli LED banko / podyum — özel form üretim testi",
    captionEn: "Wheeled curved LED counter / podium — custom-form production test",
  },
  {
    slug: "showroom-wall-arled-branding",
    src: "/videos/showroom-wall-arled-branding.mp4",
    poster: "/videos/showroom-wall-arled-branding.webp",
    width: 848,
    height: 478,
    title: "Showroom — Marka İçerikli LED Duvar",
    titleEn: "Showroom — branded LED wall",
    caption: "İç mekân showroom duvarında ARLEDSCREEN marka animasyonu",
    captionEn: "ARLEDSCREEN brand animation on an indoor showroom LED wall",
  },
  {
    slug: "outdoor-event-led-truss",
    src: "/videos/outdoor-event-led-truss.mp4",
    poster: "/videos/outdoor-event-led-truss.webp",
    width: 1280,
    height: 720,
    title: "Açık Hava Etkinlik — LED Truss Montajı",
    titleEn: "Outdoor event — LED truss install",
    caption: "Gece etkinliğinde truss üzerine kurulan modüler dış mekân LED duvar",
    captionEn: "Modular outdoor LED wall mounted on truss at a night event",
  },
  {
    slug: "sphere-led-showroom",
    src: "/videos/sphere-led-showroom.mp4",
    poster: "/videos/sphere-led-showroom.webp",
    width: 1280,
    height: 720,
    title: "Küresel LED Ekran — Showroom",
    titleEn: "Spherical LED display — showroom",
    caption: "Asılı küresel LED ekran, yüksek çözünürlüklü içerik yayını",
    captionEn: "Suspended spherical LED display with high-resolution content",
  },
  {
    slug: "flexible-module-bend-demo",
    src: "/videos/flexible-module-bend-demo.mp4",
    poster: "/videos/flexible-module-bend-demo.webp",
    width: 1080,
    height: 1920,
    title: "Esnek LED Modül — Bükülme Demo",
    titleEn: "Flexible LED module — bend demo",
    caption: "Esnek LED modülün kavisli yüzeye uyumunu gösteren yakın plan",
    captionEn: "Close-up of a flexible LED module conforming to a curved surface",
  },
  {
    slug: "club-curved-led-ribbon",
    src: "/videos/club-curved-led-ribbon.mp4",
    poster: "/videos/club-curved-led-ribbon.webp",
    width: 848,
    height: 480,
    title: "Kulüp — Kavisli LED ve Şerit Ekran",
    titleEn: "Club — curved LED and ribbon display",
    caption: "İç mekân kavisli LED duvar ve balkon şerit ekran uygulaması",
    captionEn: "Indoor curved LED wall and balcony ribbon display",
  },
  {
    slug: "eskisehir-sigorta-led-ekran-vitrin",
    src: "/videos/eskisehir-sigorta-led-ekran-vitrin.mp4",
    poster: "/videos/eskisehir-sigorta-led-ekran-vitrin.webp",
    width: 1280,
    height: 720,
    title: "Sinan Polat Sigorta Eskişehir Şubesi",
    titleEn: "Sinan Polat Insurance Eskişehir branch",
    caption: "Vitrin arkasından görünen iç mekân LED ekran · Ağustos 2025",
    captionEn: "Indoor LED display visible through the storefront · August 2025",
    uploadDate: "2025-08-14",
  },
  {
    slug: "kafe-led-ekran-uygulamasi",
    src: "/videos/kafe-led-ekran-uygulamasi.mp4",
    poster: "/videos/kafe-led-ekran-uygulamasi.webp",
    width: 720,
    height: 1280,
    title: "Kafe ve Lounge İçin Üç Ekranlı Uygulama",
    titleEn: "Three-display install for café and lounge",
    caption: "Salonda 576 × 192 cm, girişte iki adet 256 × 128 cm LED ekran · Ağustos 2025",
    captionEn: "576 × 192 cm in the hall, two 256 × 128 cm LED displays at the entrance · August 2025",
    uploadDate: "2025-08",
  },
  {
    slug: "ic-mekan-led-ekran-montaji",
    src: "/videos/ic-mekan-led-ekran-montaji.mp4",
    poster: "/videos/ic-mekan-led-ekran-montaji.webp",
    width: 720,
    height: 1280,
    title: "İç Mekân LED Duvar: Montajdan İlk Görüntüye",
    titleEn: "Indoor LED wall: from install to first image",
    caption: "Kabin montajı, test görüntüsü ve devreye alma aşamaları",
    captionEn: "Cabinet install, test image and commissioning stages",
  },
  {
    slug: "istanbul-drama-sanat-atolyesi-dis-mekan-led",
    src: "/videos/istanbul-drama-sanat-atolyesi-dis-mekan-led.mp4",
    poster: "/videos/istanbul-drama-sanat-atolyesi-dis-mekan-led.webp",
    width: 720,
    height: 960,
    title: "İstanbul'da Cephe Uygulaması",
    titleEn: "Façade install in Istanbul",
    caption: "2 adet 128 × 160 cm dış mekân LED ekran · Ağustos 2025",
    captionEn: "Two 128 × 160 cm outdoor LED displays · August 2025",
    uploadDate: "2025-08",
  },
  {
    slug: "manisa-kulup-oval-led-ekran",
    src: "/videos/manisa-kulup-oval-led-ekran.mp4",
    poster: "/videos/manisa-kulup-oval-led-ekran.webp",
    width: 720,
    height: 1280,
    title: "Manisa'da Kulüp İçi Oval LED Ekran",
    titleEn: "Oval LED display inside a club in Manisa",
    caption: "Tavana asılı, dairesel formda iç mekân LED ekran · Temmuz 2025",
    captionEn: "Ceiling-hung circular indoor LED display · July 2025",
    uploadDate: "2025-07",
  },
  {
    slug: "eskisehir-sigorta-led-ekran-ic",
    src: "/videos/eskisehir-sigorta-led-ekran-ic.mp4",
    poster: "/videos/eskisehir-sigorta-led-ekran-ic.webp",
    width: 1280,
    height: 720,
    title: "Eskişehir Şubesi: Cepheden İç Mekâna",
    titleEn: "Eskişehir branch: from façade to indoor",
    caption: "Şube girişinden ekrana uzanan görünüm · Ağustos 2025",
    captionEn: "View from the branch entrance to the display · August 2025",
    uploadDate: "2025-08",
  },
  {
    slug: "aslanturk-yesilpinar-led-ekran",
    src: "/videos/aslanturk-yesilpinar-led-ekran.mp4",
    poster: "/videos/aslanturk-yesilpinar-led-ekran.webp",
    width: 720,
    height: 1280,
    title: "Yeşilpınar'da Restoran Cephesi",
    titleEn: "Restaurant façade in Yeşilpınar",
    caption: "Tabela hattına yerleştirilen LED ekranlar, gece görünümü · Mart 2026",
    captionEn: "LED displays set into the signage line, night view · March 2026",
    uploadDate: "2026-03",
  },
];

export const getVideo = (slug: string) => PROJECT_VIDEOS.find((v) => v.slug === slug);

/** schema.org VideoObject for a self-hosted clip shown on `pageUrl`. */
export function videoObjectJsonLd(
  v: SiteVideo,
  pageUrl: string,
  abs: (p: string) => string,
  orgId: string,
  locale: "tr" | "en" = "tr",
) {
  const title = locale === "en" ? v.titleEn : v.title;
  const caption = locale === "en" ? v.captionEn : v.caption;
  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#video-${v.slug}`,
    name: title,
    description:
      locale === "en"
        ? `${title}: ${caption}. ARLEDSCREEN install video.`
        : `${title}: ${caption}. ARLEDSCREEN kurulum videosu.`,
    thumbnailUrl: [abs(v.poster)],
    contentUrl: abs(v.src),
    encodingFormat: "video/mp4",
    width: v.width,
    height: v.height,
    inLanguage: locale === "en" ? "en" : "tr-TR",
    ...(v.uploadDate ? { uploadDate: v.uploadDate } : {}),
    publisher: { "@id": orgId },
    isFamilyFriendly: true,
  };
}
