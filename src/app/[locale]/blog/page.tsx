import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { OptImage } from "@/components/ui/opt-image";
import { BLOG_POSTS, blogPath, formatBlogDate } from "@/content/blog";
import { blogGuideLinks } from "@/content/blog-guide-index";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (raw === "en") {
    return buildPageMetadata({
      locale: "en" as Locale,
      path: "/blog/",
      title: "Blog: LED Display Projects & Notes | ARLEDSCREEN",
      description:
        "ARLEDSCREEN blog index: completed LED installs and NXTIONSTAR notes. Post bodies remain Turkish; commercial prices are on /en/led-ekran-fiyatlari/.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/blog/",
    title: "Blog: LED Ekran Projeleri ve Duyurular | ARLEDSCREEN",
    description:
      "ARLEDSCREEN blogu: tamamlanan LED ekran projeleri, kurulum süreçleri, NXTIONSTAR iç ve dış mekân ekran uygulamaları ve işletmeler için LED ekran önerileri.",
    hreflangLocales: ["tr", "en"],
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/blog/`);
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${pageUrl}#blog`,
    name: en ? "ARLEDSCREEN Blog" : "ARLEDSCREEN Blog",
    url: pageUrl,
    inLanguage: en ? "en-US" : "tr-TR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.h1,
      url: absoluteUrl(blogPath(p.slug)),
      datePublished: p.date,
      inLanguage: "tr-TR",
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: "Blog", item: pageUrl },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={
          en
            ? "LED display projects, installs and notes"
            : "LED Ekran Projeleri, Kurulumlar ve Duyurular"
        }
        description={
          en
            ? "ARLEDSCREEN blog index: completed LED projects and NXTIONSTAR notes. Post bodies remain Turkish."
            : "ARLEDSCREEN blogu: tamamlanan LED ekran projeleri, kurulum süreçleri ve NXTIONSTAR uygulamaları."
        }
        cssSelectors={["#blog-h1", "#blog-lead"]}
        mainEntity={{ "@id": `${pageUrl}#blog` }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={en ? "Breadcrumb" : "Sayfa yolu"} className="text-[13px] text-ink-muted">
            <Link href={`${base}/`} className="inline-flex min-h-11 items-center hover:text-cyan">
              {en ? "Home" : "Ana Sayfa"}
            </Link>{" "}
            / <span className="text-ink-soft">Blog</span>
          </nav>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Blog</p>
          <h1
            id="blog-h1"
            className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink"
          >
            {en
              ? "LED display projects, installs and notes"
              : "LED Ekran Projeleri, Kurulumlar ve Duyurular"}
          </h1>
          <p id="blog-lead" className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
            {en ? (
              <>
                Field notes from completed LED installs and NXTIONSTAR applications. Individual posts
                remain in Turkish. For commercial prices use{" "}
                <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                  /en/led-ekran-fiyatlari/
                </Link>{" "}
                and project records at{" "}
                <Link href="/en/projelerimiz/" className="font-semibold text-cyan hover:underline">
                  /en/projelerimiz/
                </Link>
                .
              </>
            ) : (
              <>
                Tamamladığımız LED ekran projelerinden kareler, kurulum süreçleri ve NXTIONSTAR ekranlarla
                ilgili güncel paylaşımlarımız.
              </>
            )}
          </p>
          <AiPriceSourceNote
            locale={locale}
            className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted"
          />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={blogPath(p.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:border-cyan/40 glass-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <OptImage
                      src={p.hero.src}
                      alt={p.hero.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      priority={i < 3}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">
                      {formatBlogDate(p.date)}
                      {en ? " · TR" : ""}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold text-ink group-hover:text-cyan">
                      {p.h1}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <h2
            id="rehber"
            className="mt-14 font-display text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] font-bold leading-tight text-ink"
          >
            {en ? "Guides" : "Rehber"}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogGuideLinks(locale).map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:border-cyan/40 glass-card"
                >
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-lg font-bold text-ink group-hover:text-cyan">{g.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.teaser}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
