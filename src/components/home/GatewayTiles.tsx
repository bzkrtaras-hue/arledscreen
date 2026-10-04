import Link from "next/link";
import { Plus } from "lucide-react";
import { OptImage } from "@/components/ui/opt-image";
import { FadeIn } from "@/components/motion/FadeIn";

/** Four photo tiles under the hero: blue overlay, pill title, short text, micro-CTA. */
export function GatewayTiles() {
  const tiles = [
    {
      title: "ÜRÜNLER",
      text: "İç ve dış mekân, GOB, kiralık ve esnek LED ekran grupları.",
      cta: "Ürünleri inceleyin",
      href: "/tr/products/",
      img: "/projects/modules/smd-macro-matrix.jpg",
      alt: "LED modül yüzeyinin yakından görünümü",
    },
    {
      title: "PROJELER",
      text: "Yakın süreçte tamamladığımız projelerden bir seçki.",
      cta: "Projeleri görün",
      href: "/tr/projelerimiz/",
      img: "/projects/unye.jpg",
      alt: "Ünye Belediyesi etkinlik alanındaki LED ekran kurulumu",
    },
    {
      title: "SERVİS",
      text: "Keşif, montaj, devreye alma ve kurulum sonrası teknik servis.",
      cta: "Hizmetler",
      href: "/tr/hizmetler/",
      img: "/projects/install-wiring.jpg",
      alt: "LED ekran kabinlerinin arka yüzündeki kablolama",
    },
    {
      title: "FİYAT",
      text: "Ölçü ve piksel aralığına göre yaklaşık maliyeti hemen görün.",
      cta: "Fiyatı hesaplayın",
      href: "/tr/hesaplayici/",
      img: "/projects/panels-warehouse.jpg",
      alt: "Depoda istiflenmiş LED ekran kabinleri",
    },
  ];

  return (
    <section aria-labelledby="hizli-erisim" className="bg-white pb-12 pt-10 md:pb-16 md:pt-14">
      <h2 id="hizli-erisim" className="sr-only">
        Ürünler, projeler, servis ve fiyat hesaplama
      </h2>
      <ul className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-5 lg:px-8">
        {tiles.map((t, i) => (
          <FadeIn as="li" key={t.title} delay={i * 0.15} amount={0.3}>
            <Link
              href={t.href}
              className="group relative flex h-[260px] flex-col items-center overflow-hidden rounded-card px-5 pt-10 text-center shadow-tile sm:h-[280px]"
            >
              <OptImage
                src={t.img}
                alt={t.alt}
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 48vw, 92vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-cyan-700/70 transition duration-500 group-hover:bg-cyan-700/80" aria-hidden />
              <span className="relative rounded-full bg-pill px-7 py-2.5 font-display text-xl font-extrabold tracking-[0.06em] text-ink shadow-pill transition duration-500 group-hover:-translate-y-1 sm:text-[22px]">
                {t.title}
              </span>
              <span className="relative mt-4 max-w-[260px] text-sm leading-relaxed text-white">{t.text}</span>
              <span className="relative mt-auto mb-7 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-cyan-700 shadow-pill transition group-hover:bg-cyan-50">
                {t.cta}
                <Plus className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
