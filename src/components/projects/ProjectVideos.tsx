import { LazyVideo } from "@/components/ui/lazy-video";
import { PROJECT_VIDEOS } from "@/content/videos";

/** "Videolar" gallery: landscape first; first clip autoplays (muted, in view). */
export function ProjectVideos() {
  const clips = [...PROJECT_VIDEOS].sort((a, b) => {
    const aLand = a.width >= a.height ? 0 : 1;
    const bLand = b.width >= b.height ? 0 : 1;
    return aLand - bLand;
  });

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {clips.map((v, i) => (
        <li key={v.slug}>
          <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <LazyVideo
              src={v.src}
              poster={v.poster}
              width={v.width}
              height={v.height}
              label={v.title}
              autoPlayInView={i === 0}
            />
            <figcaption className="px-3.5 py-3 sm:px-4">
              <p className="font-display text-sm font-semibold leading-snug text-ink">{v.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-muted">{v.caption}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
