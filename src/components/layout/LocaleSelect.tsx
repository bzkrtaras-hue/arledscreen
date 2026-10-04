"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localeLabels, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSelect({
  locale,
  className,
  id,
  size = "sm",
}: {
  locale: Locale;
  className?: string;
  id: string;
  size?: "sm" | "md";
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const dict = getDictionary(locale);

  // Turkish-only routes (generateStaticParams returns only { locale: "tr" }).
  const TR_ONLY = [
    /^\/tr\/hizmetler\//,
    /^\/tr\/bolgeler\//,
    /^\/tr\/projelerimiz\//,
    /^\/tr\/products\/[^/]+\//,
    /^\/tr\/sss\//,
    /^\/tr\/nxtionstar\//,
    /^\/tr\/gizlilik\//,
    /^\/tr\/blog\//,
    /^\/tr\/rehber\/(led-ekran-fiyatlari|piksel-araligi-secimi|led-tabela-mi-led-ekran-mi|kiralik-mi-satin-alma)\//,
  ];
  const switchLocaleHref = (next: Locale) => {
    const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
    if (next !== "tr" && TR_ONLY.some((re) => re.test(p))) {
      // Product pages fall back to the locale catalog, rehber articles to the guide index, others to home.
      if (/^\/tr\/products\//.test(p)) return `/${next}/products/`;
      if (/^\/tr\/rehber\//.test(p)) return `/${next}/rehber/`;
      return `/${next}/`;
    }
    const segments = p.split("/");
    if (segments.length >= 2) {
      segments[1] = next;
      return segments.join("/") || `/${next}/`;
    }
    return `/${next}/`;
  };

  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {dict.common.language}
      </label>
      <select
        id={id}
        className={cn(
          "glass-select rounded-full text-ink-soft",
          size === "sm" ? "min-h-9 px-3.5 text-base md:text-sm" : "min-h-11 w-full px-3 text-base",
        )}
        value={locale}
        onChange={(e) => {
          window.location.href = switchLocaleHref(e.target.value as Locale);
        }}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeLabels[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
