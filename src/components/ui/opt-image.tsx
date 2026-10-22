import manifest from "@/content/image-manifest.json";
import dims from "@/content/image-dims.json";
import { cn } from "@/lib/utils";

type ManifestEntry = { w: number; h: number; widths: number[] };
const MANIFEST = manifest as Record<string, ManifestEntry>;
/** Intrinsic size for images that have no WebP variants (prevents layout shift). */
const DIMS = dims as Record<string, { w: number; h: number }>;

export interface OptImageProps {
  /** Original public path, e.g. "/projects/hero.jpg" */
  src: string;
  alt: string;
  /** Responsive sizes attribute */
  sizes?: string;
  className?: string;
  /** Above-the-fold image: eager + high fetch priority */
  priority?: boolean;
  /** Fill parent (parent must be relative) */
  fill?: boolean;
}

/**
 * Static-export friendly responsive image: serves pre-generated WebP variants
 * (scripts/optimize-images.py) via srcset, with lazy loading by default and
 * intrinsic width/height to prevent layout shift.
 */
export function OptImage({
  src,
  alt,
  sizes = "100vw",
  className,
  priority = false,
  fill = false,
}: OptImageProps) {
  const entry = MANIFEST[src];
  const size = entry ?? DIMS[src];
  // Sources already under /opt/ (e.g. /opt/blog/...) must not get a second /opt prefix.
  const base = src.replace(/\.(jpe?g|png|webp)$/i, "").replace(/^\/opt(?=\/)/, "");
  const srcSet = entry
    ? entry.widths.map((w) => `/opt${base}-${w}.webp ${w}w`).join(", ")
    : undefined;
  const fallback = entry
    ? `/opt${base}-${entry.widths[Math.min(1, entry.widths.length - 1)]}.webp`
    : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={size?.w}
      height={size?.h}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
