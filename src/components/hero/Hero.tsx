import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — pack B copy (katalog) + soft-rotating field videos:
 * B vitrin · C cafe/restaurant · D lounge
 */
const HERO_SCENES: { slug: string; labelTr: string; labelEn: string }[] = [
  {
    slug: "eskisehir-sigorta-led-ekran-vitrin",
    labelTr: "Vitrin",
    labelEn: "Storefront",
  },
  {
    slug: "aslanturk-yesilpinar-led-ekran",
    labelTr: "Kafe / restoran",
    labelEn: "Cafe / restaurant",
  },
  {
    slug: "kafe-led-ekran-uygulamasi",
    labelTr: "Lounge",
    labelEn: "Lounge",
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
          ? "ARLEDSCREEN, LED teknolojilerindeki yüksek kalite standartlarını NXTIONSTAR güvencesiyle hayata geçirmektedir:"
          : "ARLEDSCREEN brings high LED quality standards to life under the NXTIONSTAR guarantee:"
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
                title: "End-to-end project delivery",
                body: "Survey, design, installation and after-sales technical service.",
              },
              {
                title: "Broad product solutions",
                body: "Building façades, storefronts, totems, halls and poster menuboards.",
              },
              {
                title: "Local production and national reach",
                body: "Products from our Istanbul factory are installed across Turkey’s 81 provinces through our professional dealer network.",
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
      dwellMs={8000}
    />
  );
}
