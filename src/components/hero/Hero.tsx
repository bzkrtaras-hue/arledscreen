import type { Locale } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo, type HeroClip } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

/**
 * Homepage hero — HQ factory stills (12MP field photos, web-sized) lead the
 * stage as sharp precursors; one native 1280 landscape video keeps motion.
 */
const FACTORY_STILLS: {
  poster: string;
  width: number;
  height: number;
  labelTr: string;
  labelEn: string;
}[] = [
  {
    poster: "/hero/fabrika-kalibrasyon-duvar.jpg",
    width: 2560,
    height: 1920,
    labelTr: "Fabrika kalibrasyon",
    labelEn: "Factory calibration",
  },
  {
    poster: "/hero/fabrika-modul-montaj.jpg",
    width: 2560,
    height: 1920,
    labelTr: "Modül montaj",
    labelEn: "Module assembly",
  },
  {
    poster: "/hero/fabrika-kirmizi-test.jpg",
    width: 1650,
    height: 2200,
    labelTr: "Kırmızı test",
    labelEn: "Red test wall",
  },
];

export function Hero({ locale }: HeroProps) {
  const tr = locale === "tr";

  const stillClips: HeroClip[] = FACTORY_STILLS.map((still) => ({
    poster: still.poster,
    width: still.width,
    height: still.height,
    label: tr ? still.labelTr : still.labelEn,
  }));

  const vitrin = getVideo("eskisehir-sigorta-led-ekran-vitrin");
  const videoClips: HeroClip[] = vitrin
    ? [
        {
          src: vitrin.src,
          poster: vitrin.poster,
          width: vitrin.width,
          height: vitrin.height,
          label: tr ? "Vitrin" : "Storefront",
        },
      ]
    : [];

  // Lead with sharp factory stills; close on the best landscape field clip.
  const clips: HeroClip[] = [...stillClips.slice(0, 2), ...videoClips];

  if (!clips.length) return null;

  return (
    <HeroVideo
      clips={clips}
      brand="ARLEDSCREEN"
      headline={
        tr
          ? "İç ve dış mekân LED ekran sistemleri."
          : "Indoor and outdoor LED display systems."
      }
      subcopy={
        tr
          ? "NXTIONSTAR panellerini Türkiye’de ARLEDSCREEN satar, keşfeder ve monte eder. Cephe, vitrin, totem ve salon ölçüleri sahada netleşir; servis Gaziosmanpaşa ofisinden yürür."
          : "ARLEDSCREEN sells, surveys and installs NXTIONSTAR panels across Turkey. Façade, storefront, totem and hall sizes are confirmed on site; service runs from Gaziosmanpaşa."
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
              scenes: "Sahne görüntüleri",
            }
          : {
              region: "ARLEDSCREEN intro",
              pause: "Pause video",
              play: "Play video",
              scenes: "Scene media",
            }
      }
      dwellMs={8000}
    />
  );
}
