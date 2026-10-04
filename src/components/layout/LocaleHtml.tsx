"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { getLocaleDirection } from "@/lib/i18n";

export function LocaleHtml({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
  }, [locale]);
  return null;
}
