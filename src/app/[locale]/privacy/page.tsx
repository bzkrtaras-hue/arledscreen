import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

/**
 * Inventable /en/privacy/ (and /tr/privacy/) — CF 404.html beats _redirects.
 * Bridge to dual-locale /gizlilik/ (canonical privacy path on this site).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (raw !== "en" && raw !== "tr") return {};
  const locale = raw as Locale;
  const target = `/${locale}/gizlilik/`;
  return {
    ...buildPageMetadata({
      locale,
      path: "/gizlilik/",
      title:
        locale === "en"
          ? "Privacy | ARLEDSCREEN"
          : "Gizlilik | ARLEDSCREEN",
      description:
        locale === "en"
          ? "Privacy notice bridge. Canonical path: /en/gizlilik/."
          : "Gizlilik bilgilendirmesi köprüsü. Kanonik yol: /tr/gizlilik/.",
      hreflangLocales: [],
    }),
    robots: { index: false, follow: true },
    alternates: { canonical: target },
  };
}

export default async function PrivacyBridgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw !== "en" && raw !== "tr") notFound();
  const locale = raw as "tr" | "en";
  const target = `/${locale}/gizlilik/`;
  const en = locale === "en";
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1 className="font-display text-2xl font-bold text-ink">
        {en ? "Privacy" : "Gizlilik"}
      </h1>
      <p className="mt-3 text-ink-soft">
        {en ? "Canonical privacy notice:" : "Kanonik gizlilik sayfası:"}{" "}
        <Link href={target} className="font-semibold text-cyan hover:underline">
          {target}
        </Link>
        . {en ? "Site: arledscreen.com (not arleds.com)." : "Site: arledscreen.com (arleds.com değil)."}
      </p>
      <p className="mt-6">
        <Link
          href={target}
          className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          {en ? "Open privacy notice" : "Gizlilik sayfasını aç"}
        </Link>
      </p>
    </main>
  );
}
