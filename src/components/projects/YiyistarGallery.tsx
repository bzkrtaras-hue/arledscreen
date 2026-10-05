import { OptImage } from "@/components/ui/opt-image";
import { YIYISTAR_GALLERY } from "@/content/yiyistar-gallery";

/**
 * Wholesaler gallery mirror (YIYISTAR / yiyistar.com Galeri):
 * same section headings, local image copies.
 */
export function YiyistarGallery() {
  return (
    <div className="space-y-12 md:space-y-14">
      {YIYISTAR_GALLERY.map((section) => (
        <div key={section.slug} id={`galeri-${section.slug}`}>
          <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
            {section.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{section.titleEn}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.images.map((src) => (
              <li key={src}>
                <figure className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
                  <OptImage
                    src={src}
                    alt={`${section.title} — YIYISTAR galeri`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
