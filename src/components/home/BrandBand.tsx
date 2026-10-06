import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { OptImage } from "@/components/ui/opt-image";
import { FadeIn } from "@/components/motion/FadeIn";

/** Rounded brand band: NXTIONSTAR × ARLEDSCREEN, slogan and a single CTA. */
export function BrandBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  return (
    <section className="bg-white py-12 md:py-16">
      <FadeIn dir="none" duration={0.9} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2rem] md:rounded-hero">
          <OptImage
            src="/projects/outdoor-led-mapping.jpg"
            alt={tr ? "Dış mekân LED ekran kalibrasyon haritası" : "Outdoor LED calibration mapping"}
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-10 scale-110 object-cover blur-[2px]"
          />
          <div className="absolute inset-0 -z-10 bg-cyan-700/80" aria-hidden />
          <div className="flex flex-col items-center px-6 py-11 text-center md:py-14">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <span className="flex h-12 items-center rounded-2xl bg-white px-3 shadow-pill sm:h-16 sm:px-5">
                <Image
                  src="/brand/nxtionstar-wordmark-header-478.webp"
                  alt="NXTIONSTAR"
                  width={478}
                  height={137}
                  className="h-6 w-auto sm:h-8"
                  unoptimized
                />
              </span>
              <span className="text-xl font-light text-white/70 sm:text-2xl" aria-hidden>
                ×
              </span>
              <span className="flex h-12 items-center rounded-2xl bg-white px-3 shadow-pill sm:h-16 sm:px-5">
                <Image
                  src="/brand/arledscreen-logo-header-514.webp"
                  alt="ARLEDSCREEN"
                  width={514}
                  height={160}
                  className="h-8 w-auto sm:h-11"
                  unoptimized
                />
              </span>
            </div>
            <p className="mx-auto mt-7 max-w-[720px] text-[15px] leading-7 text-white/90 md:text-base">
              {tr
                ? "NXTIONSTAR LED ekranların Türkiye'deki satış, kurulum ve servis süreçleri ARLEDSCREEN üzerinden yürütülür. Seri ve model seçimini projenizin ihtiyacına göre birlikte yapıyoruz."
                : "Sales, installation and service of NXTIONSTAR LED displays in Turkey are handled by ARLEDSCREEN."}
            </p>
            <Link
              href={`/${locale}/products/`}
              className="btn-soft mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 text-[15px] text-cyan-700 shadow-pill hover:bg-cyan-50"
            >
              {tr ? "Ürün serilerini inceleyin" : "View product series"}
              <Plus className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
