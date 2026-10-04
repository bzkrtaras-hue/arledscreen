import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getVideo } from "@/content/videos";
import { HeroVideo } from "@/components/hero/HeroVideo";

interface HeroProps {
  locale: Locale;
}

const HERO_VIDEO_SLUG = "eskisehir-sigorta-led-ekran-vitrin";

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  const video = getVideo(HERO_VIDEO_SLUG);

  if (!video) return null;

  return (
    <HeroVideo
      src={video.src}
      poster={video.poster}
      width={video.width}
      height={video.height}
      videoLabel={
        tr
          ? "ARLEDSCREEN LED ekran kurulumu, Eskişehir vitrin uygulaması"
          : "ARLEDSCREEN LED display installation, storefront application"
      }
      lockupPrimary="ARLEDSCREEN"
      lockupSecondary="NXTIONSTAR"
      headline={dict.hero.headline}
      subcopy={dict.hero.subcopy}
      quoteHref={`/${locale}/quote/`}
      quoteLabel={dict.hero.ctaQuote}
      calcHref="/tr/hesaplayici/"
      calcLabel={dict.hero.ctaConfigure}
      labels={
        tr
          ? { region: "ARLEDSCREEN giriş", pause: "Videoyu duraklat", play: "Videoyu oynat" }
          : { region: "ARLEDSCREEN intro", pause: "Pause video", play: "Play video" }
      }
    />
  );
}
