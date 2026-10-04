import type { Metadata } from "next";
import Link from "next/link";
import { getArticle, ARTICLE_SLUGS } from "@/lib/markdown";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { ARTICLE_LINKS } from "@/content/article-links";


export function articleMetadata(slug: (typeof ARTICLE_SLUGS)[number]): Metadata {
  const a = getArticle(slug);
  return buildTrOnlyMetadata({ path: `/rehber/${slug}/`, title: `${a.title} | ARLEDSCREEN`, description: a.description });
}

export function ArticlePage({ slug }: { slug: (typeof ARTICLE_SLUGS)[number] }) {
  const a = getArticle(slug);
  const url = absoluteUrl(`/tr/rehber/${slug}/`);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: a.h1,
    name: a.title,
    description: a.description,
    inLanguage: "tr-TR",
    url,
    mainEntityOfPage: url,
    datePublished: a.lastReviewed,
    dateModified: a.lastReviewed,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: absoluteUrl("/og/arledscreen-og.jpg"),
  };
  const others = ARTICLE_LINKS.filter((l) => !l.href.includes(`/${slug}/`));
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Rehber", item: absoluteUrl("/tr/rehber/") },
          { name: a.h1, item: url },
        ]}
      />
      {a.faqs.length ? <FaqJsonLd faqs={a.faqs} /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Sayfa yolu" className="text-[13px] text-ink-muted">
            <Link href="/tr/" className="hover:text-cyan">Ana Sayfa</Link> /{" "}
            <Link href="/tr/rehber/" className="hover:text-cyan">Rehber</Link>
          </nav>
          <h1 className="mt-3 text-balance font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">{a.h1}</h1>
          <p className="mt-2 text-[13px] text-ink-muted">
            Son güncelleme: <time dateTime={a.lastReviewed}>{new Date(a.lastReviewed).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</time> · ARLEDSCREEN
          </p>
          <div className="mt-6 text-[15.5px]" dangerouslySetInnerHTML={{ __html: a.html }} />
          <div className="mt-10 rounded-card bg-band p-6">
            <p className="font-display text-lg font-bold text-ink">Projeniz için yazılı teklif alın</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">Ölçü, konum ve kullanım amacını paylaşın; keşif sonrası malzeme listesiyle birlikte teklif hazırlayalım.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/tr/quote/" className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600">Teklif isteyin</Link>
              <Link href="/tr/hesaplayici/" className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink-soft hover:text-cyan">Fiyatı hesaplayın</Link>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Diğer rehberler</p>
            <ul className="mt-2 space-y-1.5">
              {others.map((o) => (
                <li key={o.href}><Link href={o.href} className="font-semibold text-cyan hover:underline">{o.label}</Link></li>
              ))}
              <li><Link href="/tr/sss/" className="font-semibold text-cyan hover:underline">Sık sorulan sorular</Link></li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
