import { LazyVideo } from "@/components/ui/lazy-video";
import { PROJECT_VIDEOS } from "@/content/videos";

/** "Videolar" gallery: only the first clip autoplays (muted, in view); the rest play on tap. */
export function ProjectVideos() {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {PROJECT_VIDEOS.map((v, i) => (
        <li key={v.slug} className="mb-4 break-inside-avoid">
          <figure className="overflow-hidden rounded-2xl border border-border bg-white">
            <LazyVideo src={v.src} poster={v.poster} width={v.width} height={v.height} label={v.title} autoPlayInView={i === 0} />
            <figcaption className="px-4 py-3">
              <p className="font-display text-sm font-semibold text-ink">{v.title}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{v.caption}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
