import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialLanding } from "@/components/commercial/CommercialLanding";
import {
  COMMERCIAL_SLUGS,
  getCommercialPage,
} from "@/content/commercial-pages";
import { buildTrOnlyMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  // led-ekran has a dedicated TR+EN route at [locale]/led-ekran/
  return COMMERCIAL_SLUGS.filter((slug) => slug !== "led-ekran").map((slug) => ({
    locale: "tr",
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "tr") return {};
  const page = getCommercialPage(slug);
  if (!page) return {};
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
  const { locale, slug } = await params;
  if (locale !== "tr") notFound();
  const page = getCommercialPage(slug);
  if (!page) notFound();
  return <CommercialLanding page={page} />;
}
