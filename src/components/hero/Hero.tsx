import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import manifest from "@/content/image-manifest.json";
import { optSrc, optSrcSet } from "@/lib/opt";
import { HeroSlider, type HeroSlide } from "@/components/hero/HeroSlider";

interface HeroProps {
  locale: Locale;
}

type ManifestEntry = { w: number; h: number; widths: number[] };
const MANIFEST = manifest as Record<string, ManifestEntry>;

const SLIDES_TR = [
  {
    src: "/projects/lounge-football.jpg",
    alt: "Bir lounge mekânında maç yayını yapılan iç mekân LED ekran",
    caption: "Kafe, restoran ve lounge uygulamaları",
    href: "/tr/products/ic-mekan-led-ekran/",
    linkLabel: "İç mekân ekranlar",
  },
  {
    src: "/projects/hero.jpg",
    alt: "Gece görünümünde bina cephesinde LED ekran görseli",
    caption: "Cephe, totem ve billboard uygulamaları",
    href: "/tr/products/dis-mekan-led-ekran/",
    linkLabel: "Dış mekân ekranlar",
  },
  {
    src: "/projects/modules/indoor-install.jpg",
    alt: "Toplantı salonunda duvara monte iç mekân LED ekran",
    caption: "Toplantı ve konferans salonları",
    href: "/tr/rehber/konferans-salonu-led/",
    linkLabel: "Rehberi okuyun",
  },
  {
    src: "/projects/service-assembly.jpg",
    alt: "Teknik ekip iç mekân LED duvarda modül montajı yapıyor",
    caption: "Keşif, montaj ve teknik servis",
    href: "/tr/hizmetler/",
    linkLabel: "Hizmetler",
  },
];

const SLIDES_EN = [
  { src: "/projects/lounge-football.jpg", alt: "Indoor LED screen showing a football match in a lounge", caption: "Cafés, restaurants and lounges", linkLabel: "Products" },
  { src: "/projects/hero.jpg", alt: "LED screen visual on a building façade at night", caption: "Façades, totems and billboards", linkLabel: "Products" },
  { src: "/projects/modules/indoor-install.jpg", alt: "Wall-mounted indoor LED screen in a meeting room", caption: "Meeting and conference rooms", linkLabel: "Guides" },
  { src: "/projects/service-assembly.jpg", alt: "Technicians assembling modules on an indoor LED wall", caption: "Survey, installation and service", linkLabel: "About us" },
];

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";

  const base = tr
    ? SLIDES_TR
    : SLIDES_EN.map((s, i) => ({
        ...s,
        href: [`/${locale}/products/`, `/${locale}/products/`, `/${locale}/rehber/`, `/${locale}/about/`][i],
      }));

  const slides: HeroSlide[] = base.map((s) => {
    const e = MANIFEST[s.src];
    return {
      ...s,
      src: optSrc(s.src, 960),
      srcSet: optSrcSet(s.src),
      width: e?.w ?? 1600,
      height: e?.h ?? 900,
    };
  });

  return (
    <HeroSlider
      slides={slides}
      slogan={dict.brand.slogan}
      headline={dict.hero.headline}
      subcopy={dict.hero.subcopy}
      quoteHref={`/${locale}/quote/`}
      quoteLabel={dict.hero.ctaQuote}
      calcHref={"/tr/hesaplayici/"}
      calcLabel={dict.hero.ctaConfigure}
      labels={
        tr
          ? { region: "Öne çıkanlar", prev: "Önceki görsel", next: "Sonraki görsel", goTo: "Görsel", pause: "Durdur" }
          : { region: "Highlights", prev: "Previous slide", next: "Next slide", goTo: "Slide", pause: "Pause" }
      }
    />
  );
}
