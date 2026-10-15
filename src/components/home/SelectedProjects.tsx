import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { PROJECT_CASE_STUDIES, projectCasePath } from "@/content/case-studies";

/**
 * "Seçilmiş projeler" (Melis taslağı, ONERI #6). Only published ARLEDSCREEN
 * case studies whose photo is tied to the record in IMAGE_BY_REF.
 * Generic illustration photos (kütüphane, totem, kablolama) are excluded
 * because they are not linked to a recorded ARLEDSCREEN project.
 * No figures, sizes or warranty claims on the cards.
 */
const PICKS: { refId: string; img: string; kind: string }[] = [
  { refId: "ref-26", img: "/projects/unye.jpg", kind: "Kamu / etkinlik" },
  { refId: "ref-27", img: "/projects/billboard-arled.jpg", kind: "Dış mekân" },
  { refId: "ref-38", img: "/videos/istanbul-drama-sanat-atolyesi-dis-mekan-led.jpg", kind: "Dış mekân" },
];

export function SelectedProjects() {
  const items = PICKS.flatMap(({ refId, img, kind }) => {
    const c = PROJECT_CASE_STUDIES.find((x) => x.refId === refId);
    const image = c?.images.find((i) => i.src === img);
    return c && image ? [{ c, image, kind }] : [];
  });
  if (!items.length) return null;
  return (
    <section aria-labelledby="secilmis-projeler" className="bg-[#0B1B33] text-[#F2F5FA]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:py-24">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 md:mb-10">
          <h2 id="secilmis-projeler" className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-semibold tracking-[-0.01em] text-white">
            Seçilmiş projeler
          </h2>
          <Link href="/tr/projelerimiz/" className="inline-flex min-h-11 items-center font-semibold text-[#9CC0F5] hover:underline">
            Tüm projeler →
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3">
          {items.map(({ c, image, kind }) => (
            <li key={c.slug} className="min-w-0">
              <Link
                href={projectCasePath(c.slug)}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-[#13284A]">
                  <OptImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </span>
                <span className="mt-4 block text-[1.1rem] font-semibold leading-snug">{c.companyLabel}</span>
                <span className="mt-1 block text-sm text-[#A9B6CC]">
                  {kind} · {c.location}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
