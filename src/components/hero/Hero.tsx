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
    labelTr: "Küre LED",
    labelEn: "Sphere LED",
  },
  {
    slug: "club-curved-led-ribbon",
    labelTr: "Kulüp kavisli",
    labelEn: "Club curved",
  },
];

export function Hero({ locale }: HeroProps) {
  const tr = locale === "tr";

  const clips: HeroClip[] = HERO_SCENES.flatMap((scene) => {
    const video = getVideo(scene.slug);
    if (!video) return [];
    return [
      {
        src: video.src,
        poster: video.poster,
        width: video.width,
        height: video.height,
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
          ? "Keşif, tasarım, tedarik, montaj ve satış sonrası teknik desteği Gaziosmanpaşa merkezinden yürütüyoruz. Hizmet Türkiye genelinde planlanır. Net fiyat, keşif sonrası yazılı teklifle belirlenir."
          : "Survey, design, supply, installation and after-sales support run from our Gaziosmanpaşa centre. Service is planned across Turkey. The final price is set in a written quote after the survey."
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
