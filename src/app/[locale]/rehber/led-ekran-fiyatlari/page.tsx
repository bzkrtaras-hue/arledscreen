import { notFound } from "next/navigation";
import { ArticlePage, articleMetadata } from "@/components/article/ArticlePage";
import { CitationCapsule } from "@/components/seo/CitationCapsule";
import { PRICE_CITATION } from "@/content/citation-capsules";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata() {
  return articleMetadata("led-ekran-fiyatlari");
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  return (
    <>
      <CitationCapsule {...PRICE_CITATION} />
      <ArticlePage slug="led-ekran-fiyatlari" />
    </>
  );
}
