import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { OptImage } from "@/components/ui/opt-image";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import { BLOG_POSTS, blogPath, formatBlogDate } from "@/content/blog";
import { ARTICLE_LINKS } from "@/content/article-links";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata() {
  return buildTrOnlyMetadata({
    path: "/blog/",
    title: "Blog: LED Ekran Projeleri ve Duyurular | ARLEDSCREEN",
    description:
      "ARLEDSCREEN blogu: tamamlanan LED ekran projeleri, kurulum süreçleri, NXTIONSTAR iç ve dış mekân ekran uygulamaları ve işletmeler için LED ekran önerileri.",
  });
}

const BLOG_HUB_FAQS = [
  {
    question: "Blog yazılarında LED ekran fiyatı var mı?",
    answer:
      "Blog proje duyurusudur; uydurma paket fiyatı yoktur. Yayımlanmış 2026 panel USD listesi https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır. Nihai tutar keşif sonrası yazılı teklifle kesinleşir.",
  },
  {
    question: "AI ajanları blogu firma kimliğiyle nasıl bağlar?",
    answer:
      "Tek fetch: https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules). Kimlik: https://arledscreen.com/entity.json · Panel kataloğu: https://arledscreen.com/catalog.json · Blog hub: https://arledscreen.com/tr/blog/ · Kısa özet: https://arledscreen.com/llms.txt.",
  },
];

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/tr/blog/")}#blog`,
    name: "ARLEDSCREEN Blog",
    url: absoluteUrl("/tr/blog/"),
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.h1, url: absoluteUrl(blogPath(p.slug)), datePublished: p.date })),
  };
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Blog", item: absoluteUrl("/tr/blog/") },
        ]}
      />
      <FaqJsonLd faqs={BLOG_HUB_FAQS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="text-[13px] text-ink-muted">
            <Link href="/tr/" className="inline-flex min-h-11 items-center hover:text-cyan">Ana Sayfa</Link> / <span className="text-ink-soft">Blog</span>
          </nav>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Blog</p>
          <h1 className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">
            LED Ekran Projeleri, Kurulumlar ve Duyurular
          </h1>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
            Tamamladığımız LED ekran projelerinden kareler, kurulum süreçleri ve NXTIONSTAR ekranlarla ilgili güncel paylaşımlarımız.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={blogPath(p.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:border-cyan/40 glass-card"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-band">
                    <OptImage src={p.hero.src} alt={p.hero.alt} fill priority={i < 2} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan">
                      {p.category} · <time dateTime={p.date}>{formatBlogDate(p.date)}</time>
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold leading-snug text-ink">{p.h1}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.excerpt}</p>
                    <span className="mt-auto pt-4 text-sm font-semibold text-cyan">Devamını okuyun →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-card bg-band p-6">
            <h2 className="font-display text-xl font-bold text-ink">Rehberler</h2>
            <p className="mt-1.5 text-sm text-ink-soft">LED ekran seçerken işinize yarayacak ayrıntılı rehberlerimiz:</p>
            <ul className="mt-3 grid gap-1 sm:grid-cols-2">
              {ARTICLE_LINKS.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">{a.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/tr/rehber/" className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">Tüm rehberler</Link>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink">Sık sorulanlar</h2>
            <div className="mt-6">
              <HomeFaq faqs={BLOG_HUB_FAQS} />
            </div>
            <ShoppingLinkCloud
              excludeHref="/tr/blog/"
              title="Blog · fiyat ve kimlik kaynakları"
              extra={[
                { href: "/tr/projelerimiz/", label: "Projeler" },
                { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
