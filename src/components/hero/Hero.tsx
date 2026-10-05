import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — soft-rotating field videos.
 * Prefer native landscape 1280×720 first (sharpest inventory), then the
 * highest-bitrate installation portraits. No further downscale on encode;
 * browser object-cover scales without re-encoding.
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "eskisehir-sigorta-led-ekran-vitrin",
    labelTr: "Vitrin",
    labelEn: "Storefront",
  },
  {
    slug: "eskisehir-sigorta-led-ekran-ic",
    labelTr: "İç mekân",
    labelEn: "Indoor",
  },
  {
    slug: "kafe-led-ekran-uygulamasi",
    labelTr: "Lounge",
    labelEn: "Lounge",
  },
  {
    slug: "ic-mekan-led-ekran-montaji",
    labelTr: "Montaj",
    labelEn: "Install",
  },
  {
    slug: "istanbul-drama-sanat-atolyesi-dis-mekan-led",
    labelTr: "Cephe",
    labelEn: "Façade",
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
          ? "ARLEDSCREEN, LED teknolojilerindeki yüksek kalite standartlarını NXTIONSTAR güvencesiyle hayata geçirmektedir:"
          : "ARLEDSCREEN delivers LED technology quality standards with the assurance of NXTIONSTAR:"
      }
      points={
        tr
          ? [
              {
                title: "Uçtan Uca Proje Yönetimi",
                body: "Keşif, tasarım, montaj ve satış sonrası teknik servis desteği.",
              },
              {
                title: "Geniş Ürün Çözümleri",
                body: "Bina cephesi, vitrin, totem, salon ve poster menuboard uygulamaları.",
              },
              {
                title: "Yerli Üretim ve Yaygın Ağı",
                body: "İstanbul merkezli fabrikamızdan çıkan ürünler, Türkiye’nin 81 ilinde profesyonel bayi ağımızla kurulmaktadır.",
              },
            ]
          : [
              {
                title: "End-to-end project management",
                body: "Survey, design, installation and after-sales technical service.",
              },
              {
                title: "Broad product solutions",
                body: "Façade, storefront, totem, hall and poster / menuboard applications.",
              },
              {
                title: "Local production and nationwide reach",
                body: "Panels from our Istanbul factory are installed across Turkey’s 81 provinces through our professional dealer network.",
              },
            ]
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
