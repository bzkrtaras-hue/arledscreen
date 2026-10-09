/**
 * LED ekran kurulum rehberleri (TR + EN): genel kurulum (hub), Huidu ve NovaStar.
 * Metinler Huidu ve NovaStar'ın resmî kılavuzlarından yararlanılarak özgün olarak yazıldı;
 * cümle/görsel kopyalanmadı. Kaynaklar her sayfanın sonunda "Kaynaklar" başlığında listelenir.
 * Model özelliği, sürüm numarası ve ARLEDSCREEN'e ait yeni bir iddia içermez.
 * Rehber hub'ında (/rehber/) listelenir; ana sayfa "Öğrenme merkezi" ve header menüsü
 * SEO_GUIDE_SLUGS'tan beslendiği için bu sayfalar orada görünmez (ana sayfa değişmez).
 */
import type { Locale } from "@/lib/i18n";
import { INSTALL_GUIDES_TR } from "@/content/install-guides-tr";
import { INSTALL_GUIDES_EN } from "@/content/install-guides-en";

export const INSTALL_GUIDE_SLUGS = [
  "led-ekran-kurulumu",
  "huidu-led-ekran-kurulumu",
  "novastar-led-ekran-kurulumu",
] as const;

export type InstallGuideSlug = (typeof INSTALL_GUIDE_SLUGS)[number];

export function isInstallGuideSlug(value: string): value is InstallGuideSlug {
  return (INSTALL_GUIDE_SLUGS as readonly string[]).includes(value);
}

export interface InstallGuideSection {
  h2: string;
  paragraphs: string[];
  /** Numbered steps (ordered list) */
  steps?: string[];
  /** Bullet points (unordered list) */
  bullets?: string[];
}

export interface InstallGuideLink {
  href: string;
  label: string;
}

export interface InstallGuide {
  slug: InstallGuideSlug;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  image: { src: string; alt: string; fit: "cover" | "contain" };
  /** Visible short step list; also used for HowTo JSON-LD (same text). */
  quickSteps: { name: string; text: string }[];
  sections: InstallGuideSection[];
  mistakes: string[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
  links: InstallGuideLink[];
  cta: { title: string; body: string };
  cardLabel: string;
  cardTeaser: string;
}

export function getInstallGuide(locale: Locale, slug: InstallGuideSlug): InstallGuide {
  return (locale === "tr" ? INSTALL_GUIDES_TR : INSTALL_GUIDES_EN)[slug];
}

export function listInstallGuides(locale: Locale): InstallGuide[] {
  return INSTALL_GUIDE_SLUGS.map((slug) => getInstallGuide(locale, slug));
}

export const INSTALL_GUIDE_LABELS = {
  tr: {
    quickSteps: "Kısaca kurulum sırası",
    mistakes: "Sık yapılan hatalar",
    faq: "Sık sorulan sorular",
    related: "İlgili sayfalar",
    sources: "Kaynaklar",
    sourcesNote:
      "Bu rehber, üreticilerin resmî kılavuz ve indirme sayfalarından yararlanılarak kendi cümlelerimizle hazırlandı. Menü adları ve şifreler yazılım veya cihaz sürümüne göre değişebilir; cihazınızın kılavuzunu esas alın.",
    service: "Teknik servis",
    install: "Montaj hizmeti",
  },
  en: {
    quickSteps: "Setup order at a glance",
    mistakes: "Common mistakes",
    faq: "Frequently asked questions",
    related: "Related pages",
    sources: "Sources",
    sourcesNote:
      "This guide was written in our own words using the manufacturers' official manuals and download pages. Menu names and passwords can vary by software or device version; follow your device's manual.",
    service: "Technical service",
    install: "Installation service",
  },
} as const;
