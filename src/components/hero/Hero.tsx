import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — HQ Drive field clips + readable glass stack.
 * No ARLEDSCREEN wordmark; H1 is LED EKRAN TEKNOLOJİ MERKEZİ.
 * Lead clip: 4K lounge fine-pitch field video from Drive folder.
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "lounge-fine-pitch-fox",
    labelTr: "Lounge LED",
    labelEn: "Lounge LED",
  },
  {
    slug: "immersive-ceiling-led-tunnel",
    labelTr: "İmmersif tavan",
    labelEn: "Immersive ceiling",
  },
  {
    slug: "event-lounge-led-wall",
    labelTr: "Etkinlik lounge",
    labelEn: "Event lounge",
  },
  {
    slug: "sphere-led-showroom",
    labelTr: "Küresel LED",
    labelEn: "Sphere LED",
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
      headline={tr ? "LED EKRAN TEKNOLOJİ MERKEZİ" : "LED DISPLAY TECHNOLOGY CENTER"}
      subcopy={
        tr
          ? "Projenin ilk keşif aşamasından tasarım, üretim, montaj ve satış sonrası teknik destek süreçlerine kadar tüm operasyonu uçtan uca yönetiyoruz. İstanbul merkezli üretim tesisimizde yüksek kalite standartlarında hazırlanan LED ekran sistemleri, Türkiye’nin 81 ilindeki yaygın bayi ve servis ağımız aracılığıyla sahada profesyonellikle hayata geçirilmektedir."
          : "We manage the full operation end to end — from the first survey through design, production, installation and after-sales technical support. LED display systems built to high quality standards at our Istanbul facility are delivered on site across Turkey’s 81 provinces through our dealer and service network."
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
