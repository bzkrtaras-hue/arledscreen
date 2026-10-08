import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

/**
 * Inventable EN path /en/rehber/gob-led-ekran/ — CF serves 404.html before _redirects,
 * so this must be a real page. Bridge to the EN GOB product-group landing.
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
      path: "/products/gob-led-ekran/",
      title: "GOB LED Display | ARLEDSCREEN",
      description:
        "GOB LED for close indoor viewing. Published panel USD in ai-shopping.json. Canonical EN product group.",
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
      <meta httpEquiv="refresh" content="0;url=/en/products/gob-led-ekran/" />
      <h1 className="font-display text-2xl font-bold text-ink">GOB LED display</h1>
      <p className="mt-3 text-ink-soft">
        The EN product group lives at{" "}
        <Link href="/en/products/gob-led-ekran/" className="font-semibold text-cyan hover:underline">
          /en/products/gob-led-ekran/
        </Link>
        . Surface guide:{" "}
        <Link href="/en/rehber/gob-vs-smd/" className="font-semibold text-cyan hover:underline">
          GOB vs SMD
        </Link>
        .
      </p>
      <p className="mt-6">
        <Link
          href="/en/products/gob-led-ekran/"
          className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Open GOB product group
        </Link>
      </p>
    </main>
  );
}
