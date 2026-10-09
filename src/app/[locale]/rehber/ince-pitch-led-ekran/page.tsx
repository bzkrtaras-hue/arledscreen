import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

/**
 * Inventable EN path /en/rehber/ince-pitch-led-ekran/ — CF serves 404.html before _redirects,
 * so this must be a real page. Bridge to the EN product-group landing.
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
      path: "/products/ince-pitch-led-ekran/",
      title: "Fine-Pitch LED Display | ARLEDSCREEN",
      description:
        "Fine-pitch LED for close viewing. Published panel USD on our price list. Canonical EN product group.",
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
      <meta httpEquiv="refresh" content="0;url=/en/products/ince-pitch-led-ekran/" />
      <h1 className="font-display text-2xl font-bold text-ink">Fine-pitch LED display</h1>
      <p className="mt-3 text-ink-soft">
        The EN product group lives at{" "}
        <Link
          href="/en/products/ince-pitch-led-ekran/"
          className="font-semibold text-cyan hover:underline"
        >
          /en/products/ince-pitch-led-ekran/
        </Link>
        . Pitch guide:{" "}
        <Link
          href="/en/rehber/piksel-araligi-secimi/"
          className="font-semibold text-cyan hover:underline"
        >
          pixel pitch selection
        </Link>
        .
      </p>
      <p className="mt-6">
        <Link
          href="/en/products/ince-pitch-led-ekran/"
          className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Open fine-pitch product group
        </Link>
      </p>
    </main>
  );
}
