import { preload } from "react-dom";
import { quoteWhatsappHref } from "@/lib/whatsapp";

/**
 * TR homepage hero — "sessiz premium" (Melis taslağı, ONERI #2).
 * One full-bleed real installation still, no video, one CTA.
 * Photo: Alanya White City Resort Hotel (ref-22, published case study);
 * the screen shows ARLEDSCREEN's own logo, no third-party broadcast content.
 * H1 + lead stay in server HTML (AI crawlers often skip JS).
 */
const BASE = "/opt/hero/alanya-otel-led-ekran";
const WIDTHS = [480, 960, 1153];
const set = (ext: string) => WIDTHS.map((w) => `${BASE}-${w}.${ext} ${w}w`).join(", ");

export function QuietHero() {
  preload(`${BASE}-960.avif`, {
    as: "image",
    type: "image/avif",
    imageSrcSet: set("avif"),
    imageSizes: "100vw",
    fetchPriority: "high",
  });
  return (
    <section
      aria-labelledby="home-h1"
      className="relative flex min-h-[calc(88vh-5rem)] items-end overflow-hidden bg-[#0B1B33] text-[#F2F5FA] [min-height:calc(88svh-5rem)] md:min-h-[88vh] md:[min-height:88svh]"
    >
      <picture>
        <source type="image/avif" srcSet={set("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={set("webp")} sizes="100vw" />
        <img
          src={`${BASE}-960.webp`}
          width={1153}
          height={651}
          alt="Alanya'da bir otel lobisinde ARLEDSCREEN logosu yayınlayan iç mekân LED ekran"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%] md:object-[70%_45%]"
        />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,27,51,.97)_0%,rgba(11,27,51,.82)_38%,rgba(11,27,51,.25)_70%,rgba(11,27,51,.1)_100%)] md:bg-[linear-gradient(to_right,rgba(11,27,51,.95)_0%,rgba(11,27,51,.75)_40%,rgba(11,27,51,.1)_75%),linear-gradient(to_top,rgba(11,27,51,.9)_0%,rgba(11,27,51,0)_45%)]"
      />
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] pt-40 md:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CC0F5] md:text-sm [text-shadow:0_1px_8px_rgba(11,27,51,.6)]">
          LED Ekran Teknoloji Merkezi
        </p>
        <h1 id="home-h1" className="mt-3 max-w-[14ch] font-display text-white text-[clamp(2.25rem,5.2vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Mekânınıza yakışan LED ekran.
        </h1>
        <p id="home-lead" className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-[#C9D3E3] md:text-base">
          Keşiften montaja ve kurulum sonrası teknik servise kadar süreci aynı ekip yürütür. Merkezimiz İstanbul
          Gaziosmanpaşa’dır; satış, montaj ve servis Türkiye genelindedir.
        </p>
        <a
          href={quoteWhatsappHref("tr")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-[52px] min-w-11 items-center justify-center rounded-sm bg-[#1E5BB8] px-7 text-[1.05rem] font-semibold text-white transition-colors hover:bg-[#2A6BD0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
        >
          Teklif alın
        </a>
      </div>
    </section>
  );
}
