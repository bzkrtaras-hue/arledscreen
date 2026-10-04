import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { blogPath, formatBlogDate, latestBlogPosts } from "@/content/blog";

/** "Blogdan": the 3 latest blog posts on the TR homepage. */
export function BlogTeaser() {
  const posts = latestBlogPosts(3);
  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={blogPath(p.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:border-cyan/40 glass-card"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-band">
                <OptImage src={p.hero.src} alt={p.hero.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <time dateTime={p.date} className="text-xs font-semibold uppercase tracking-wide text-cyan">{formatBlogDate(p.date)}</time>
                <span className="mt-2 font-display text-base font-bold leading-snug text-ink">{p.h1}</span>
                <span className="mt-auto pt-3 text-sm font-semibold text-cyan">Okuyun →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/tr/blog/" className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">Tüm blog yazıları →</Link>
      </p>
    </div>
  );
}
