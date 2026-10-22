import { buyHref, buyLabel } from "@/lib/buy-cta";
import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — landscape-first field clips so desktop shows the LED wall.
 * Background loop (soft ~1.2 s crossfade, 6 s dwell): three field videos interleaved with seven
 * site photos. The first slide stays the lounge poster, so LCP is unchanged. Eskişehir vitrin stays
 * out (its content carries a price ad). HeroVideo rotates only when there are 2+ slides.
 * H1 carries the local query; NXTIONSTAR slogan stays in the top bar only.
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "lounge-aquarium-wall",
    labelTr: "Lounge LED",
    labelEn: "Lounge LED",
  },
  { slug: "foto-sahne-led-ekran-uygulamasi", labelTr: "Sahne LED ekran uygulaması", labelEn: "LED screen installation on a stage" },
  { slug: "foto-kamu-etkinligi-kavisli-led", labelTr: "Kamu kurumu etkinliğinde kavisli LED ekran", labelEn: "Curved LED screen at a public-institution event" },
  { slug: "foto-kulup-led-ekran", labelTr: "Kulüp sahnesinde LED ekran", labelEn: "LED display on a club stage" },
  {
    slug: "sphere-led-showroom",
    labelTr: "Küresel LED",
    labelEn: "Sphere LED",
  },
  { slug: "foto-dikey-led-ekranlar", labelTr: "Dikey LED ekranlar", labelEn: "Vertical LED screens" },
  { slug: "foto-kulup-sahne-montaj", labelTr: "Kulüp sahnesinde montaj", labelEn: "Installation on a club stage" },
  {
    slug: "club-curved-led-ribbon",
    labelTr: "Kulüp kavisli",
    labelEn: "Club curved",
  },
  { slug: "foto-meclis-salonu", labelTr: "Meclis salonu", labelEn: "Council chamber" },
  { slug: "foto-sahne-buyuk-led-ekran", labelTr: "Sahnede büyük LED ekranlar", labelEn: "Large LED screens on a stage" },
];

/** Still-only slides (no video): optimized WebP, EXIF stripped, ≤1920 px + centre-square crop for ≤767 px. */
const HERO_PHOTOS: Record<string, { poster: string; posterMobile: string; width: number; height: number }> = {
  "foto-kulup-led-ekran": {
    poster: "/videos/hero/foto-kulup-led-ekran.webp",
    posterMobile: "/videos/hero/foto-kulup-led-ekran-m.webp",
    width: 1920,
    height: 1080,
  },
  "foto-kulup-sahne-montaj": {
    poster: "/videos/hero/foto-kulup-sahne-montaj.webp",
    posterMobile: "/videos/hero/foto-kulup-sahne-montaj-m.webp",
    width: 1920,
    height: 1440,
  },
  "foto-meclis-salonu": {
    poster: "/videos/hero/foto-meclis-salonu.webp",
    posterMobile: "/videos/hero/foto-meclis-salonu-m.webp",
    width: 1920,
    height: 1080,
  },
  "foto-sahne-led-ekran-uygulamasi": {
    poster: "/videos/hero/foto-sahne-led-ekran-uygulamasi.webp",
    posterMobile: "/videos/hero/foto-sahne-led-ekran-uygulamasi-m.webp",
    width: 1920,
    height: 1080,
  },
  "foto-sahne-buyuk-led-ekran": {
    poster: "/videos/hero/foto-sahne-buyuk-led-ekran.webp",
    posterMobile: "/videos/hero/foto-sahne-buyuk-led-ekran-m.webp",
    width: 1920,
    height: 1080,
  },
  "foto-dikey-led-ekranlar": {
    poster: "/videos/hero/foto-dikey-led-ekranlar.webp",
    posterMobile: "/videos/hero/foto-dikey-led-ekranlar-m.webp",
    width: 1600,
    height: 900,
  },
  "foto-kamu-etkinligi-kavisli-led": {
    poster: "/videos/hero/foto-kamu-etkinligi-kavisli-led.webp",
    posterMobile: "/videos/hero/foto-kamu-etkinligi-kavisli-led-m.webp",
    width: 1600,
    height: 1200,
  },
};

/**
 * Hero-only media (same scenes as the gallery clips, lighter delivery):
 * - Desktop/mobile video: same frames as before. Sphere and club are now
 *   stream copies of the original Drive camera files (first generation,
 *   no re-encode, audio removed) instead of second-generation re-encodes.
 * - Posters: the same still as before, recompressed to WebP <80 KB, plus a
 *   centre-square crop for ≤767px (matches object-cover centre framing).
 */
const HERO_MEDIA: Record<
  string,
  {
    src?: string;
    srcMobile?: string;
    poster: string;
    posterMobile: string;
    width?: number;
    height?: number;
  }
> = {
  "lounge-aquarium-wall": {
    poster: "/videos/hero/lounge-aquarium-wall.webp",
    posterMobile: "/videos/hero/lounge-aquarium-wall-m.webp",
  },
  "sphere-led-showroom": {
    src: "/videos/hero/sphere-led-showroom.mp4",
    poster: "/videos/hero/sphere-led-showroom.webp",
    posterMobile: "/videos/hero/sphere-led-showroom-m.webp",
  },
  // Club slot: Drive IMG_3366.MOV 0–10 s (1920×1080, HLG → SDR BT.709 tone-mapped),
  // H.264 CRF 23 slow. ≤767px gets a native-density centre 1080×1080 crop.
  "club-curved-led-ribbon": {
    src: "/videos/hero/club-led-kabin-1080.mp4",
    srcMobile: "/videos/hero/club-led-kabin-1080-m.mp4",
    poster: "/videos/hero/club-led-kabin-1080.webp",
    posterMobile: "/videos/hero/club-led-kabin-1080-m.webp",
    width: 1920,
    height: 1080,
  },
};

export function Hero({ locale }: HeroProps) {
  const tr = locale === "tr";

  const clips: HeroClip[] = HERO_SCENES.flatMap((scene) => {
    const photo = HERO_PHOTOS[scene.slug];
    if (photo) {
      return [{ ...photo, label: tr ? scene.labelTr : scene.labelEn }];
    }
    const video = getVideo(scene.slug);
    if (!video) return [];
    return [
      {
        src: HERO_MEDIA[scene.slug]?.src ?? video.src,
        poster: HERO_MEDIA[scene.slug]?.poster ?? video.poster,
        posterMobile: HERO_MEDIA[scene.slug]?.posterMobile,
        srcMobile: HERO_MEDIA[scene.slug]?.srcMobile,
        width: HERO_MEDIA[scene.slug]?.width ?? video.width,
        height: HERO_MEDIA[scene.slug]?.height ?? video.height,
        label: tr ? scene.labelTr : scene.labelEn,
      },
    ];
  });

  if (!clips.length) return null;

  return (
    <HeroVideo
      clips={clips}
      brand="ARLEDSCREEN"
      headline={
        tr
          ? "LED Ekran Teknoloji Merkezi"
          : "LED Display Technology Center"
      }
      subcopy={
        tr
          ? "Keşiften montaja ve kurulum sonrası teknik servise kadar süreci aynı ekip yürütür. Merkezimiz İstanbul Gaziosmanpaşa’dır; satış, montaj ve servis Türkiye genelindedir. Şehir sayfalarında yalnızca kayıtlı projeler yer alır."
          : "Survey, supply, installation and after-sales service are run by the same team. Headquarters is in Gaziosmanpaşa, Istanbul; sales, installation and service cover Turkey. City pages list only recorded projects."
      }
      quoteHref={buyHref(locale)}
      quoteLabel={buyLabel(locale)}
      secondaryHref={`/${locale}/hesaplayici/`}
      secondaryLabel={tr ? "Fiyat hesapla" : "Price calculator"}
      labels={
        tr
          ? {
              region: "ARLEDSCREEN giriş",
              pause: "Videoyu duraklat",
              play: "Videoyu oynat",
              scenes: "Sahne videoları",
            }
          : {
              region: "ARLEDSCREEN intro",
              pause: "Pause video",
              play: "Play video",
              scenes: "Scene videos",
            }
      }
      dwellMs={6000}
      showSceneDots={false}
    />
  );
}
