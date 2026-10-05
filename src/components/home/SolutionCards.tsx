import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";

/** Application-based entry points; each links to a product filter and a learning guide. */
const SOLUTIONS = [
  {
    title: "İç mekân LED ekran",
    body: "Mağaza, showroom, lobi, restoran ve toplantı alanları için yakın izlemeye uygun ekranlar.",
    image: "/projects/applications/indoor-stage-videowall.jpg",
    alt: "İç mekân sahne LED video duvar",
    guide: "/tr/rehber/ic-mekan-led-ekran/",
  },
  {
    title: "Dış mekân LED ekran",
    body: "Cephe, reklam alanı, meydan ve tabela uygulamaları için güneş altında okunabilir sistemler.",
    image: "/projects/billboard-arled.jpg",
    alt: "Dış mekân LED billboard",
    guide: "/tr/rehber/dis-mekan-led-ekran/",
  },
  {
    title: "Toplantı ve konferans",
    body: "Sunum, video konferans ve salon uygulamalarında yakın izlemeye uygun küçük piksel aralıkları.",
    image: "/projects/neu-kutuphane.jpg",
    alt: "Üniversite salonunda LED ekran",
    guide: "/tr/rehber/konferans-salonu-led/",
  },
  {
    title: "Sahne ve etkinlik",
    body: "Konser, fuar ve lansmanlar için hızlı kurulan kabinler; kiralık veya satış seçenekleri.",
    image: "/projects/applications/mobile-led-stage-iveco.jpg",
    alt: "Mobil LED sahne uygulaması",
    guide: "/tr/rehber/led-ekran/",
  },
  {
    title: "Totem ve LED poster",
    body: "Mağaza girişleri, AVM ve lobiler için dikey, taşınabilir veya sabit dijital totemler.",
    image: "/projects/applications/led-poster-totems.jpg",
    alt: "LED poster ve dijital totem serisi",
    guide: "/tr/rehber/poster-led-ekran/",
  },
  {
    title: "Özel form ve kavisli",
    body: "Kavisli, oval veya mimariye entegre ekranlar için keşif ve yazılı teklifte boyutlandırma.",
    image: "/projects/applications/curved-led-tulips.jpg",
    alt: "Kavisli iç mekân LED duvar",
    guide: "/tr/rehber/mimari-muhendislik-led/",
  },
];

export function SolutionCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SOLUTIONS.map((s) => (
        <li key={s.title} className="group flex flex-col overflow-hidden rounded-2xl glass-card">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <OptImage
              src={s.image}
              alt={s.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4 text-sm font-semibold">
              <Link href="/tr/quote/" className="text-cyan hover:underline">
                Teklif iste →
              </Link>
              <Link href={s.guide} className="text-ink-soft hover:text-cyan">
                Rehberi oku
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
