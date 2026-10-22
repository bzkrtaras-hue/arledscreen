import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { PRIVACY_NOTICE } from "@/content/privacy-notice";

/**
 * /en/privacy/ and /ar/privacy/ — privacy notice (KVKK Art. 10) from Selin's 2026-10-22 briefs, noindex
 * until the DOĞRULA items (HTML comments in the markup) are confirmed.
 * /tr/privacy/ stays a bridge to the canonical /tr/gizlilik/.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "tr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (raw === "en" || raw === "ar") {
    const n = PRIVACY_NOTICE[raw];
    return {
      ...buildPageMetadata({
        locale: raw as Locale,
        path: "/privacy/",
        title: n.title,
        description: n.description,
        hreflangLocales: [],
      }),
      robots: { index: false, follow: true },
    };
  }
  if (raw !== "tr") return {};
  return {
    ...buildPageMetadata({
      locale: "tr" as Locale,
      path: "/gizlilik/",
      title: "Gizlilik | ARLEDSCREEN",
      description: "Gizlilik bilgilendirmesi köprüsü. Kanonik yol: /tr/gizlilik/.",
      hreflangLocales: [],
    }),
    robots: { index: false, follow: true },
    alternates: { canonical: "/tr/gizlilik/" },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw === "en" || raw === "ar") {
    const n = PRIVACY_NOTICE[raw];
    return (
      <main
        dir={raw === "ar" ? "rtl" : "ltr"}
        lang={raw}
        className="prose-seo mx-auto max-w-3xl px-4 py-16 text-ink-soft sm:px-6 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-ink [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:ps-6"
        dangerouslySetInnerHTML={{ __html: n.html }}
      />
    );
  }
  if (raw !== "tr") notFound();
  const target = "/tr/gizlilik/";
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1 className="font-display text-2xl font-bold text-ink">Gizlilik</h1>
      <p className="mt-6">
        <Link
          href={target}
          className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Gizlilik sayfasını aç
        </Link>
      </p>
    </main>
  );
}
