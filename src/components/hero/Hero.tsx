import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — HQ Drive field clips first (sphere landscape + flex module),
 * then a storefront landscape. Soft rotate ~6.5s.
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "sphere-led-showroom",
    labelTr: "Küresel LED",
    labelEn: "Sphere LED",
  },
  {
    slug: "flexible-module-bend-demo",
    labelTr: "Esnek modül",
    labelEn: "Flexible module",
  },
  {
    slug: "eskisehir-sigorta-led-ekran-vitrin",
    labelTr: "Vitrin",
    labelEn: "Storefront",
  },
] as const;

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
      eyebrow={
        tr
          ? "NXTIONSTAR · ARLEDSCREEN’in kendi markası"
          : "NXTIONSTAR · ARLEDSCREEN’s own brand"
      }
      headline={
        tr
          ? "İç ve dış mekân LED ekran sistemleri."
          : "Indoor and outdoor LED display systems."
      }
      subcopy={
        tr
          ? "NXTIONSTAR panellerini Türkiye’de ARLEDSCREEN satar, keşfeder ve monte eder. Cephe, vitrin, totem ve salon ölçüleri sahada netleşir; servis Gaziosmanpaşa ofisinden yürür."
          : "ARLEDSCREEN sells, surveys and installs NXTIONSTAR panels in Turkey. Façade, storefront, totem and hall sizes are confirmed on site; service is run from Gaziosmanpaşa."
      }
      quoteHref={`/${locale}/quote/`}
      quoteLabel={tr ? "Yazılı teklif alın" : "Request a written quote"}
      secondaryHref={`/${locale}/products/`}
      secondaryLabel={tr ? "Ürün serilerini inceleyin" : "Browse product lines"}
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
