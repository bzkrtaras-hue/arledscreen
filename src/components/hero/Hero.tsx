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
          ? "ARLEDSCREEN, kendi markası NXTIONSTAR ile LED ekran projelerini keşiften montaja ve teknik servise kadar yönetir. Cephe, vitrin, totem ve salon uygulamalarında çözüm sahada şekillenir; İstanbul merkezli fabrikamızdan çıkan ürünler, bayilerimiz aracılığıyla 81 ilde monte edilmektedir."
          : "ARLEDSCREEN delivers NXTIONSTAR LED display projects end to end—from survey and installation through technical service. Façade, storefront, totem and hall solutions take shape on site; products from our Istanbul factory are installed nationwide across 81 provinces through our dealer network."
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
