import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { OptImage } from "@/components/ui/opt-image";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { HomeFaq } from "@/components/home/HomeFaq";
import manifest from "@/content/image-manifest.json";
import { BLOG_POSTS, blogImageUrl, blogPath, formatBlogDate, getBlogPost } from "@/content/blog";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";
import { getVideo, videoObjectJsonLd } from "@/content/videos";
import { LazyVideo } from "@/components/ui/lazy-video";

const MANIFEST = manifest as Record<string, { w: number; h: number }>;

/** Shared AI-shopping FAQs for blog posts (Day 61) — no invented package prices. */
const BLOG_SHOPPING_FAQS = [
  {
    question: "Blog yazısındaki LED ekranın list fiyatı var mı?",
    answer:
      "Hayır. Blog yazılarında uydurma paket / stok fiyatı yoktur. Yayımlanmış panel USD: https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ (KDV/nakliye hariç; ücretsiz kargo yok). https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules). İade/garanti teklifte (hasMerchantReturnPolicy: MerchantReturnNotPermitted). Nihai tutar https://arledscreen.com/tr/quote/ yazılı teklifle kesinleşir.",
  },
  {
    question: "Bu yazıdaki bilgiler fiyat listesi midir?",
    answer:
      "https://arledscreen.com/ai-shopping.json · Kimlik: https://arledscreen.com/entity.json · Panel katalog: https://arledscreen.com/catalog.json · Blog hub: https://arledscreen.com/tr/blog/. Ücretsiz kargo yok; quote-and-contract-only iade. Uydurma TL paket yazılmaz.",
  },
];

export const dynamicParams = false;
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ locale: "tr", slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) return {};
  const m = MANIFEST[p.hero.src];
  return buildTrOnlyMetadata({
    path: `/blog/${p.slug}/`,
    title: `${p.title} | ARLEDSCREEN`,
    description: p.description,
    type: "article",
    image: { url: blogImageUrl(p.hero.src), width: Math.min(1200, m?.w ?? 1200), height: Math.round(((m?.h ?? 675) / (m?.w ?? 1200)) * Math.min(1200, m?.w ?? 1200)), alt: p.hero.alt },
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const p = getBlogPost(slug);
  if (locale !== "tr" || !p) notFound();
  const url = absoluteUrl(blogPath(p.slug));
  const video = p.videoSlug ? getVideo(p.videoSlug) : undefined;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: p.h1,
    name: p.title,
    description: p.description,
    inLanguage: "tr-TR",
    url,
    mainEntityOfPage: url,
    datePublished: p.date,
    dateModified: p.date,
    articleSection: p.category,
    image: [absoluteUrl(blogImageUrl(p.hero.src)), ...(p.gallery ?? []).map((g) => absoluteUrl(blogImageUrl(g.src)))],
    author: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${absoluteUrl("/tr/blog/")}#blog` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    sameAs: [
      absoluteUrl("/ai-shopping.json"),
      absoluteUrl("/catalog.json"),
      absoluteUrl("/entity.json"),
    ],
    ...(video ? { video: videoObjectJsonLd(video, url, absoluteUrl, `${SITE_URL}/#organization`) } : {}),
  };
  const others = [...BLOG_POSTS].filter((x) => x.slug !== p.slug).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const wa = whatsappHref(`Merhaba, "${p.h1}" yazınızı okudum. Benzer bir LED ekran projesi için bilgi almak istiyorum.`);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Blog", item: absoluteUrl("/tr/blog/") },
          { name: p.h1, item: url },
        ]}
      />
      <FaqJsonLd faqs={BLOG_SHOPPING_FAQS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Sayfa yolu" className="text-[13px] text-ink-muted">
            <Link href="/tr/" className="inline-flex min-h-11 items-center hover:text-cyan">Ana Sayfa</Link> /{" "}
            <Link href="/tr/blog/" className="inline-flex min-h-11 items-center hover:text-cyan">Blog</Link>
          </nav>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {p.category} · <time dateTime={p.date}>{formatBlogDate(p.date)}</time>
          </p>
          <h1 className="mt-2 text-balance font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">{p.h1}</h1>
          <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-band">
            <OptImage src={p.hero.src} alt={p.hero.alt} priority sizes="(min-width:768px) 768px, 100vw" className="h-auto w-full" />
          </figure>
          <div className="prose-seo mt-6 text-[15.5px] leading-relaxed text-ink-soft">
            {p.sections.map((s, i) => (
              <section key={i} className="mt-5">
                {s.h2 ? <h2 className="mb-2 font-display text-xl font-bold text-ink">{s.h2}</h2> : null}
                {s.p.map((t, j) => (
                  <p key={j} className="mt-3">{t}</p>
                ))}
                {s.list ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5">
                    {s.list.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          {video ? (
            <figure className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-border bg-band">
              <LazyVideo src={video.src} poster={video.poster} width={video.width} height={video.height} label={video.title} />
              <figcaption className="px-3 py-2 text-xs text-ink-muted">Video: {video.caption}</figcaption>
            </figure>
          ) : null}
          {p.gallery?.length ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g) => (
                <figure key={g.src} className="overflow-hidden rounded-2xl border border-border bg-band">
                  <OptImage src={g.src} alt={g.alt} sizes="(min-width:640px) 384px, 100vw" className="h-auto w-full" />
                  <figcaption className="px-3 py-2 text-xs text-ink-muted">{g.alt}</figcaption>
                </figure>
              ))}
            </div>
          ) : null}

          <div className="mt-10 rounded-card bg-band p-6">
            <p className="font-display text-lg font-bold text-ink">Benzer bir proje mi planlıyorsunuz?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Ölçü, konum ve kullanım amacını paylaşın; keşif sonrası malzeme listesiyle birlikte yazılı teklif hazırlayalım. Panel list fiyatı:{" "}
              <a href="/catalog.json" className="font-semibold text-cyan hover:underline">catalog.json</a>
              {" · "}
              <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">fiyat hub</Link>
              . Kimlik:{" "}
              <a href="/entity.json" className="font-semibold text-cyan hover:underline">entity.json</a>.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0F7A41] px-5 text-sm font-semibold text-white hover:bg-[#0B6435]">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan yazın
              </a>
              <Link href="/tr/quote/" className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600">Teklif isteyin</Link>
            </div>
          </div>

          <ShoppingLinkCloud
            excludeHref={`/tr/blog/${p.slug}/`}
            title="Blog yazısı · fiyat ve kimlik kaynakları"
            extra={[
              { href: "/tr/blog/", label: "Blog hub" },
              { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
              { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
            ]}
          />
          <div className="mt-8">
            <HomeFaq faqs={BLOG_SHOPPING_FAQS} />
          </div>

          {p.related?.length ? (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">İlgili sayfalar</p>
              <ul className="mt-1">
                {p.related.map((r) => (
                  <li key={r.href}><Link href={r.href} className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">{r.label}</Link></li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Blogdan diğer yazılar</p>
            <ul className="mt-1">
              {others.map((o) => (
                <li key={o.slug}><Link href={blogPath(o.slug)} className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">{o.h1}</Link></li>
              ))}
              <li><Link href="/tr/blog/" className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">Tüm blog yazıları</Link></li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
