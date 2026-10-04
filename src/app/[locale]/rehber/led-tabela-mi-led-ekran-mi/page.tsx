import { notFound } from "next/navigation";
import { ArticlePage, articleMetadata } from "@/components/article/ArticlePage";
import { CitationCapsule } from "@/components/seo/CitationCapsule";
import { DIGITAL_VS_LED_CITATION } from "@/content/citation-capsules";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata() {
  return articleMetadata("led-tabela-mi-led-ekran-mi");
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  return (
    <>
      <CitationCapsule {...DIGITAL_VS_LED_CITATION} />
      <ArticlePage slug="led-tabela-mi-led-ekran-mi" />
    </>
  );
}
