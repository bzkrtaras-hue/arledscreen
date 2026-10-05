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
  caption: string;
  /**
   * ISO 8601 date of the Instagram post. Full date only where it is known
   * (linked blog post); otherwise year-month from the caption. Never guessed.
   */
  uploadDate?: string;
}

export const PROJECT_VIDEOS: SiteVideo[] = [
  {
    slug: "sphere-led-showroom",
    src: "/videos/sphere-led-showroom.mp4",
    poster: "/videos/sphere-led-showroom.jpg",
    width: 1280,
    height: 720,
    title: "Küresel LED Ekran — Showroom",
    caption: "Asılı küresel LED ekran, yüksek çözünürlüklü içerik yayını",
  },
  {
    slug: "flexible-module-bend-demo",
    src: "/videos/flexible-module-bend-demo.mp4",
    poster: "/videos/flexible-module-bend-demo.jpg",
    width: 1080,
    height: 1920,
    title: "Esnek LED Modül — Bükülme Demo",
    caption: "Esnek LED modülün kavisli yüzeye uyumunu gösteren yakın plan",
  },
  {
    slug: "club-curved-led-ribbon",
    src: "/videos/club-curved-led-ribbon.mp4",
    poster: "/videos/club-curved-led-ribbon.jpg",
    width: 848,
    height: 480,
    title: "Kulüp — Kavisli LED ve Şerit Ekran",
    caption: "İç mekân kavisli LED duvar ve balkon şerit ekran uygulaması",
  },
  {
    slug: "eskisehir-sigorta-led-ekran-vitrin",
    src: "/videos/eskisehir-sigorta-led-ekran-vitrin.mp4",
    poster: "/videos/eskisehir-sigorta-led-ekran-vitrin.jpg",
    width: 1280,
    height: 720,
    title: "Sinan Polat Sigorta Eskişehir Şubesi",
    caption: "Vitrin arkasından görünen iç mekân LED ekran · Ağustos 2025",
    uploadDate: "2025-08-14",
  },
  {
    slug: "kafe-led-ekran-uygulamasi",
    src: "/videos/kafe-led-ekran-uygulamasi.mp4",
    poster: "/videos/kafe-led-ekran-uygulamasi.jpg",
    width: 720,
    height: 1280,
    title: "Kafe ve Lounge İçin Üç Ekranlı Uygulama",
    caption: "Salonda 576 × 192 cm, girişte iki adet 256 × 128 cm LED ekran · Ağustos 2025",
    uploadDate: "2025-08",
  },
  {
    slug: "ic-mekan-led-ekran-montaji",
    src: "/videos/ic-mekan-led-ekran-montaji.mp4",
    poster: "/videos/ic-mekan-led-ekran-montaji.jpg",
    width: 720,
    height: 1280,
    title: "İç Mekân LED Duvar: Montajdan İlk Görüntüye",
    caption: "Kabin montajı, test görüntüsü ve devreye alma aşamaları",
  },
  {
    slug: "istanbul-drama-sanat-atolyesi-dis-mekan-led",
    src: "/videos/istanbul-drama-sanat-atolyesi-dis-mekan-led.mp4",
    poster: "/videos/istanbul-drama-sanat-atolyesi-dis-mekan-led.jpg",
    width: 720,
    height: 960,
    title: "İstanbul'da Cephe Uygulaması",
    caption: "2 adet 128 × 160 cm dış mekân LED ekran · Ağustos 2025",
    uploadDate: "2025-08",
  },
  {
    slug: "manisa-kulup-oval-led-ekran",
    src: "/videos/manisa-kulup-oval-led-ekran.mp4",
    poster: "/videos/manisa-kulup-oval-led-ekran.jpg",
    width: 720,
    height: 1280,
    title: "Manisa'da Kulüp İçi Oval LED Ekran",
    caption: "Tavana asılı, dairesel formda iç mekân LED ekran · Temmuz 2025",
    uploadDate: "2025-07",
  },
  {
    slug: "eskisehir-sigorta-led-ekran-ic",
    src: "/videos/eskisehir-sigorta-led-ekran-ic.mp4",
    poster: "/videos/eskisehir-sigorta-led-ekran-ic.jpg",
    width: 1280,
    height: 720,
    title: "Eskişehir Şubesi: Cepheden İç Mekâna",
    caption: "Şube girişinden ekrana uzanan görünüm · Ağustos 2025",
    uploadDate: "2025-08",
  },
  {
    slug: "aslanturk-yesilpinar-led-ekran",
    src: "/videos/aslanturk-yesilpinar-led-ekran.mp4",
    poster: "/videos/aslanturk-yesilpinar-led-ekran.jpg",
    width: 720,
    height: 1280,
    title: "Yeşilpınar'da Restoran Cephesi",
    caption: "Tabela hattına yerleştirilen LED ekranlar, gece görünümü · Mart 2026",
    uploadDate: "2026-03",
  },
];

export const getVideo = (slug: string) => PROJECT_VIDEOS.find((v) => v.slug === slug);

/** schema.org VideoObject for a self-hosted clip shown on `pageUrl`. */
export function videoObjectJsonLd(v: SiteVideo, pageUrl: string, abs: (p: string) => string, orgId: string) {
  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#video-${v.slug}`,
    name: v.title,
    description: `${v.title}: ${v.caption}. ARLEDSCREEN kurulum videosu.`,
    thumbnailUrl: [abs(v.poster)],
    contentUrl: abs(v.src),
    encodingFormat: "video/mp4",
    width: v.width,
    height: v.height,
    inLanguage: "tr-TR",
    ...(v.uploadDate ? { uploadDate: v.uploadDate } : {}),
    publisher: { "@id": orgId },
    isFamilyFriendly: true,
  };
}
