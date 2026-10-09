import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — landscape-first field clips so desktop shows the LED wall.
 * Lead: Eskişehir Sinan Polat Sigorta vitrin.
 * H1 carries the local query; NXTIONSTAR slogan stays in the top bar only.
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "eskisehir-sigorta-led-ekran-vitrin",
    labelTr: "Eskişehir vitrin",
    labelEn: "Eskişehir storefront",
  },
  {
    slug: "lounge-aquarium-wall",
    labelTr: "Lounge LED",
    labelEn: "Lounge LED",
  },
  {
    slug: "sphere-led-showroom",
    labelTr: "Küresel LED",
    labelEn: "Sphere LED",
  },
  {
    slug: "club-curved-led-ribbon",
    labelTr: "Kulüp kavisli",
    labelEn: "Club curved",
  },
];

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
  "eskisehir-sigorta-led-ekran-vitrin": {
    poster: "/videos/hero/eskisehir-sigorta-led-ekran-vitrin.webp",
    posterMobile: "/videos/hero/eskisehir-sigorta-led-ekran-vitrin-m.webp",
  },
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
      quoteHref={`/${locale}/quote/`}
      quoteLabel={tr ? "Teklif Al" : "Get a quote"}
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
      dwellMs={6500}
    />
  );
}
