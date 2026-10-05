import { notFound } from "next/navigation";
import { ArticlePage, articleMetadata } from "@/components/article/ArticlePage";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata() {
  return articleMetadata("gob-vs-smd");
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  return <ArticlePage slug="gob-vs-smd" />;
}
