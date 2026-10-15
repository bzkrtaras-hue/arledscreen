import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { SiteSearch } from "@/components/search/SiteSearch";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export function generateMetadata(): Metadata {
  return {
    ...buildPageMetadata({
      locale: "tr" as Locale,
      hreflangLocales: ["tr"],
      path: "/ara/",
      title: "Sitede ara | ARLEDSCREEN",
      description: "ARLEDSCREEN sitesinde ürün, rehber, proje ve fiyat sayfalarında kelimeyle arama.",
    }),
    robots: { index: false, follow: true },
  };
}

export default function SearchPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Sitede ara</h1>
      <p className="mt-3 text-ink-muted">ARLEDSCREEN sitesinde ürün, rehber, proje ve fiyat sayfalarında kelimeyle arama.</p>
      <div className="mt-6">
        <SiteSearch locale="tr" />
      </div>
    </section>
  );
}
