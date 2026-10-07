import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialLanding } from "@/components/commercial/CommercialLanding";
import {
  COMMERCIAL_SLUGS,
  getCommercialPage,
  getCommercialPageEn,
  isCommercialEnSlug,
} from "@/content/commercial-pages";
import { buildPageMetadata, buildTrOnlyMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  // led-ekran has a dedicated TR+EN route at [locale]/led-ekran/
  const params: { locale: string; slug: string }[] = [];
  for (const slug of COMMERCIAL_SLUGS) {
    if (slug === "led-ekran") continue;
    params.push({ locale: "tr", slug });
    if (isCommercialEnSlug(slug)) {
      params.push({ locale: "en", slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (raw !== "tr" && raw !== "en") return {};
  const locale = raw as "tr" | "en";
  const page =
    locale === "en" ? getCommercialPageEn(slug) : getCommercialPage(slug);
  if (!page) return {};
  if (locale === "en" || isCommercialEnSlug(slug)) {
    return buildPageMetadata({
      locale: locale as Locale,
      path: `/${page.slug}/`,
      title: page.title,
      description: page.description,
      hreflangLocales: ["tr", "en"],
    });
  }
  return buildTrOnlyMetadata({
    path: `/${page.slug}`,
    title: page.title,
    description: page.description,
  });
}

export default async function CommercialSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  if (locale === "en" && !isCommercialEnSlug(slug)) notFound();
  const page =
    locale === "en" ? getCommercialPageEn(slug) : getCommercialPage(slug);
  if (!page) notFound();
  return <CommercialLanding page={page} locale={locale} />;
}
