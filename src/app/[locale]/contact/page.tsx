import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { ShortQuoteForm } from "@/components/quote/ShortQuoteForm";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/social";

/**
 * /en/contact/ — same short quote form as TR (no meta refresh; canonical stays /en/quote/).
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
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span data-form-page hidden />
      <h1 className="font-display text-2xl font-bold text-ink">Contact ARLEDSCREEN</h1>
      <p className="mt-3 text-ink-soft">
        Share your size, location and timeline for a free site survey and a written quote. Email:{" "}
        <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
          {CONTACT_EMAIL}
        </a>{" "}
        ·{" "}
        <Link href="/en/quote/" className="font-semibold text-cyan hover:underline">
          Quote page
        </Link>
      </p>
      <div className="mt-8">
        <ShortQuoteForm locale="en" />
      </div>
    </main>
  );
}
