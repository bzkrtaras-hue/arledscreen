import { buyHref, buyLabel } from "@/lib/buy-cta";
import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — landscape-first field clips so desktop shows the LED wall.
 * Background loop (soft ~1.2 s crossfade, 6 s dwell): mall scaffolding video (opens the loop),
 * lounge and sphere videos, then four approved site photos. Club video stays out (alcohol and
 * prices on screen). Eskişehir vitrin stays
 * out (its content carries a price ad). HeroVideo rotates only when there are 2+ slides.
 * H1 carries the local query; NXTIONSTAR slogan stays in the top bar only.
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "avm-iskele-dev-led-ekran",
    labelTr: "Bir AVM'de iskele üzerinde kurulumu süren dev iç mekân LED ekran",
    labelEn: "Giant indoor LED screen being installed on scaffolding in a shopping mall",
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
    slug: "foto-toplanti-salonu",
    labelTr: "Resmî bir toplantı salonunda sahneyi saran geniş iç mekân LED ekran",
    labelEn: "Wide indoor LED screen wrapping the stage in a formal meeting hall",
  },
  {
    slug: "foto-dikey-ekranlar",
    labelTr: "Karanlık sahnede yan yana duran beş dikey LED ekran",
    labelEn: "Five vertical LED screens side by side on a dark stage",
  },
  {
    slug: "foto-sahne-logo",
    labelTr: "Bir sahnede logo gösteren iç mekân LED ekranlar",
    labelEn: "Indoor LED screens showing a logo on a stage",
  },
  {
    slug: "foto-sahne-arkasi",
    labelTr: "Kurulum sırasında test görüntüsü gösteren sahne LED ekranları",
    labelEn: "Stage LED screens showing a test pattern during installation",
  },
];

/** Still-only slides (no video): Aras-approved photos. Desktop 1440×810 (16:9), ≤767 px 780×975 (4:5) crop. */
const HERO_PHOTOS: Record<string, { poster: string; posterMobile: string; width: number; height: number }> = {
  "foto-toplanti-salonu": {
    poster: "/videos/hero/hero-toplanti-salonu-1440.webp",
    posterMobile: "/videos/hero/hero-toplanti-salonu-390.webp",
    width: 1440,
    height: 810,
  },
  "foto-sahne-logo": {
    poster: "/videos/hero/hero-sahne-logo-1440.webp",
    posterMobile: "/videos/hero/hero-sahne-logo-390.webp",
    width: 1440,
    height: 810,
  },
  "foto-dikey-ekranlar": {
    poster: "/videos/hero/hero-dikey-ekranlar-1440.webp",
    posterMobile: "/videos/hero/hero-dikey-ekranlar-390.webp",
    width: 1440,
    height: 810,
  },
  "foto-sahne-arkasi": {
    poster: "/videos/hero/hero-sahne-arkasi-1440.webp",
    posterMobile: "/videos/hero/hero-sahne-arkasi-390.webp",
    width: 1440,
    height: 810,
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
  // Mall scaffolding clip (12.75 s, 1280×720 24p source): H.264 CRF 23 slow, audio removed,
  // faststart. ≤767px gets a native-density centre 576×720 (4:5) crop like the photo slides.
  "avm-iskele-dev-led-ekran": {
    src: "/videos/hero/avm-iskele-dev-led-ekran.mp4",
    srcMobile: "/videos/hero/avm-iskele-dev-led-ekran-m.mp4",
    poster: "/videos/hero/avm-iskele-dev-led-ekran.webp",
    posterMobile: "/videos/hero/avm-iskele-dev-led-ekran-m.webp",
    width: 1280,
    height: 720,
  },
};

export function Hero({ locale }: HeroProps) {
  const tr = locale === "tr";

  const clips: HeroClip[] = HERO_SCENES.flatMap((scene) => {
    const photo = HERO_PHOTOS[scene.slug];
    if (photo) {
      return [{ ...photo, label: tr ? scene.labelTr : scene.labelEn }];
    }
    const media = HERO_MEDIA[scene.slug];
    // Hero-only clips (no gallery entry) carry their own src and size in HERO_MEDIA.
    const video =
      getVideo(scene.slug) ??
      (media?.src && media.width && media.height
        ? { src: media.src, poster: media.poster, width: media.width, height: media.height }
        : undefined);
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
