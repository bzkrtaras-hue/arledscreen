import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialLanding } from "@/components/commercial/CommercialLanding";
import { getCommercialPage, getLedEkranPageEn } from "@/content/commercial-pages";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type HubLocale = "tr" | "en";

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
  if (raw !== "tr" && raw !== "en") return {};
  const locale = raw as HubLocale;
  const page = locale === "tr" ? getCommercialPage("led-ekran")! : getLedEkranPageEn();
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/led-ekran/",
    title: page.title,
    description: page.description,
    hreflangLocales: ["tr", "en"],
  });
}

export default async function LedEkranHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as HubLocale;
  const page = locale === "tr" ? getCommercialPage("led-ekran") : getLedEkranPageEn();
  if (!page) notFound();
  return <CommercialLanding page={page} locale={locale} />;
}
