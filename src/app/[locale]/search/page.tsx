import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { SiteSearch } from "@/components/search/SiteSearch";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export function generateMetadata(): Metadata {
  return {
    ...buildPageMetadata({
      locale: "en" as Locale,
      // No hreflang: there is no /tr/search/ (the TR search page is /tr/ara/), so an x-default to /tr/search/ was a 404.
      hreflangLocales: [],
      path: "/search/",
      title: "Search the site | ARLEDSCREEN",
      description: "Search ARLEDSCREEN products, guides, projects and price pages by keyword.",
    }),
    robots: { index: false, follow: true },
  };
}

export default function SearchPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Search the site</h1>
      <p className="mt-3 text-ink-muted">Search ARLEDSCREEN products, guides, projects and price pages by keyword.</p>
      <div className="mt-6">
        <SiteSearch locale="en" />
      </div>
    </section>
  );
}
