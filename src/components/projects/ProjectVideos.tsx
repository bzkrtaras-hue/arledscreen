import { LazyVideo } from "@/components/ui/lazy-video";
import { PROJECT_VIDEOS } from "@/content/videos";

/** "Videolar" gallery: only the first clip autoplays (muted, in view); the rest play on tap. */
export function ProjectVideos({ locale = "tr" }: { locale?: "tr" | "en" }) {
  const en = locale === "en";
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {PROJECT_VIDEOS.map((v, i) => {
        const title = en ? v.titleEn : v.title;
        const caption = en ? v.captionEn : v.caption;
        return (
          <li key={v.slug} className="mb-4 break-inside-avoid">
            <figure className="overflow-hidden rounded-2xl border border-border bg-white">
              <LazyVideo
                src={v.src}
                poster={v.poster}
                width={v.width}
                height={v.height}
                label={title}
                autoPlayInView={i === 0}
              />
              <figcaption className="px-4 py-3">
                <p className="font-display text-sm font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{caption}</p>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
