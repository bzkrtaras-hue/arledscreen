import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article/ArticlePage";
import { CommercialGuideEnLanding } from "@/components/article/CommercialGuideEnLanding";
import {
  getCommercialGuideEn,
  isCommercialGuideEnSlug,
  type CommercialGuideEnSlug,
} from "@/content/commercial-guides-en";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { ARTICLE_SLUGS, getArticle } from "@/lib/markdown";

type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

export function commercialGuideStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export function commercialGuideMetadata(
  slug: CommercialGuideEnSlug & ArticleSlug,
  rawLocale: string,
): Metadata {
  if (rawLocale === "en") {
    const guide = getCommercialGuideEn(slug);
    if (!guide) return {};
    return buildPageMetadata({
      locale: "en" as Locale,
      path: `/rehber/${slug}/`,
      title: guide.title,
      description: guide.description,
      hreflangLocales: ["tr", "en"],
    });
  }
  if (rawLocale === "tr") {
    const a = getArticle(slug);
    return buildPageMetadata({
      locale: "tr" as Locale,
      path: `/rehber/${slug}/`,
      title: `${a.title} | ARLEDSCREEN`,
      description: a.description,
      hreflangLocales: ["tr", "en"],
    });
  }
  return {};
}

export async function CommercialGuidePage({
  slug,
  params,
}: {
  slug: CommercialGuideEnSlug & ArticleSlug;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === "en") {
    if (!isCommercialGuideEnSlug(slug)) notFound();
    const guide = getCommercialGuideEn(slug);
    if (!guide) notFound();
    return <CommercialGuideEnLanding guide={guide} />;
  }
  if (locale !== "tr") notFound();
  return <ArticlePage slug={slug} />;
}
