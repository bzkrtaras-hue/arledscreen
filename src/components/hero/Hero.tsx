import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — landscape-first field clips so desktop shows the LED wall.
 * Lead: Eskişehir Sinan Polat Sigorta vitrin.
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
          ? "Projenin ilk keşif aşamasından tasarım, üretim, montaj ve satış sonrası teknik destek süreçlerine kadar tüm operasyonu uçtan uca yönetiyoruz. Merkezimiz İstanbul Gaziosmanpaşa’dadır; kurulum taleplerini Türkiye geneli alıyoruz."
          : "We manage the full operation end to end — from the first survey through design, production, installation and after-sales technical support. Our headquarters is in Gaziosmanpaşa, Istanbul; we take installation requests across Turkey."
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
