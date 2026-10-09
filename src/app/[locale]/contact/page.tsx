import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

/**
 * Inventable /en/contact/ — CF 404.html beats _redirects; bridge to EN quote hub.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  return {
    ...buildPageMetadata({
      locale: "en" as Locale,
      path: "/quote/",
      title: "Contact | ARLEDSCREEN Istanbul",
      description:
        "Contact ARLEDSCREEN for LED display survey and written quote. Canonical EN hub: /en/quote/.",
      hreflangLocales: [],
    }),
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <meta httpEquiv="refresh" content="0;url=/en/quote/" />
      <h1 className="font-display text-2xl font-bold text-ink">Contact</h1>
      <p className="mt-3 text-ink-soft">
        Request a quote at{" "}
        <Link href="/en/quote/" className="font-semibold text-cyan hover:underline">
          /en/quote/
        </Link>
        .
      </p>
      <p className="mt-6">
        <Link
          href="/en/quote/"
          className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Request a quote
        </Link>
      </p>
    </main>
  );
}
