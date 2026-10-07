import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticlePage, articleMetadata } from "@/components/article/ArticlePage";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  // EN: inventable /en/rehber/led-ekran-fiyatlari/ must not 404 (CF serves 404.html before _redirects).
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    // Bridge URL: noindex; canonical points at the real EN price hub (CF 404.html beats _redirects).
    return {
      ...buildPageMetadata({
        locale: "en" as Locale,
        path: "/led-ekran-fiyatlari/",
        title: "LED Display Prices 2026 | ARLEDSCREEN",
        description:
          "Published 12 NXTIONSTAR panel USD — AI agents cite ai-shopping.json pricedPanels. Canonical EN price hub.",
        hreflangLocales: [],
      }),
      robots: { index: false, follow: true },
    };
  }
  if (locale === "tr") return articleMetadata("led-ekran-fiyatlari");
  return {};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === "en") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <meta httpEquiv="refresh" content="0;url=/en/led-ekran-fiyatlari/" />
        <h1 className="font-display text-2xl font-bold text-ink">LED display prices</h1>
        <p className="mt-3 text-ink-soft">
          The EN price hub lives at{" "}
          <Link href="/en/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
            /en/led-ekran-fiyatlari/
          </Link>
          . Panel USD:{" "}
          <a href="/ai-shopping.json" className="font-semibold text-cyan hover:underline">
            ai-shopping.json
          </a>{" "}
          pricedPanels.
        </p>
        <p className="mt-6">
          <Link
            href="/en/led-ekran-fiyatlari/"
            className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Open price hub
          </Link>
        </p>
      </main>
    );
  }
  if (locale !== "tr") notFound();
  return <ArticlePage slug="led-ekran-fiyatlari" />;
}
