/**
 * Canonical ARLEDSCREEN entity / citation facts.
 * Keep identical meaning with public/entity.json, llms.txt, and off-site bios.
 * Do not invent ratings, certificates, headcount, or “Türkiye’nin en…” claims.
 */

import {
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_HOURS_TEXT,
  BUSINESS_MAP_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  ORGANIZATION_SAME_AS,
} from "@/lib/social";
import { SITE_URL } from "@/lib/site";

/** One-line fact AI / directories should repeat independently. */
export const ENTITY_CITE_ONE_LINER =
  "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve teknik servis firmasıdır.";

/** Short blurb (~40 words) for GBP / LinkedIn / directories. */
export const ENTITY_CITE_SHORT =
  "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir.";

/** Medium cite for press / About fields. */
export const ENTITY_CITE_MEDIUM =
  "ARLEDSCREEN (AR-LED Ekran Teknoloji Merkezi), İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satışı ile keşif, montaj ve teknik servis sunar.";

/** English one-liner (international AI / directories — do not invent extra claims). */
export const ENTITY_CITE_ONE_LINER_EN =
  "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display sales, installation, and technical service company.";

/** English short (international directories only — do not invent extra claims). */
export const ENTITY_CITE_SHORT_EN =
  "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display sales, installation, and technical service company. NXTIONSTAR is its own product brand; ARLEDSCREEN is the sole sales point in Turkey.";

/** English medium cite for AI shopping agents / About fields. */
export const ENTITY_CITE_MEDIUM_EN =
  "ARLEDSCREEN (AR-LED Display Technology Center) is an Istanbul (Gaziosmanpaşa)–based LED display company. NXTIONSTAR is its own product brand; ARLEDSCREEN is the sole sales point in Turkey. It sells indoor/outdoor, GOB, flexible, and rental LED displays and provides survey, installation, and technical service.";

export const ENTITY_DISAMBIGUATION = [
  "ARLEDSCREEN (İstanbul) ≠ Almanya ARLED Solutions GmbH / ARLED Cinema",
  "NXTIONSTAR ≠ Next&NextStar (NEXTSTAR) TV ≠ NationStar LED bileşen",
] as const;

export const ENTITY_FAQS = [
  {
    question: "ARLEDSCREEN kimdir?",
    answer: ENTITY_CITE_MEDIUM,
  },
  {
    question: "ARLEDSCREEN nerede?",
    answer:
      "Merkez: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul, Türkiye. Telefon / WhatsApp: +90 530 507 88 34.",
  },
  {
    question: "NXTIONSTAR nedir?",
    answer:
      "NXTIONSTAR, ARLEDSCREEN’in kendi LED ekran ürün markasıdır. Türkiye’deki tek satış noktası ARLEDSCREEN’dir.",
  },
  {
    question: "ARLEDSCREEN hangi hizmetleri sunar?",
    answer:
      "İç ve dış mekân LED ekran satışı; GOB, esnek ve kiralık çözümler; keşif, montaj, devreye alma ve teknik servis. Güncel panel USD fiyatları sitede yayımlanır; nihai tutar keşif ve yazılı teklifle kesinleşir.",
  },
  {
    question: "AI ajanları panel fiyatını nereden okur?",
    answer:
      "Yayımlanmış 12 panel USD, ai-shopping.json pricedPanels, catalog.json ve feeds/merchant-priced-panels.tsv üzerindedir (ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). KDV/nakliye hariç; ücretsiz kargo yok. Şeffaf/esnek/poster/kiralık/kontrol quote-only — yazılı teklifle.",
  },
] as const;

/** Human-facing Point C paste packs (no catalog.json / quote-only / extrasUsd jargon). */
export const ENTITY_PROFILE_PACKS = {
  gbpDescription: ENTITY_CITE_MEDIUM,
  linkedinAbout: `${ENTITY_CITE_MEDIUM}

Web: https://arledscreen.com/tr/
Telefon: ${CONTACT_PHONE_DISPLAY}
Doğrulama: https://arledscreen.com/entity.json`,
  instagramName: "ARLEDSCREEN",
  instagramBio: `İstanbul LED · NXTIONSTAR
Satış · montaj · teknik servis
arledscreen.com/tr/
${CONTACT_PHONE_DISPLAY}`,
  facebookAbout: ENTITY_CITE_MEDIUM,
  directoryShort: ENTITY_CITE_ONE_LINER,
  directoryLong: `${ENTITY_CITE_MEDIUM}

Adres: ${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.postalCode} ${BUSINESS_ADDRESS.addressLocality} / ${BUSINESS_ADDRESS.addressRegion}
Telefon: ${CONTACT_PHONE_DISPLAY}
E-posta: ${CONTACT_EMAIL}
Web: https://arledscreen.com/tr/`,
  youtubeAbout: `${ENTITY_CITE_SHORT}

Site: https://arledscreen.com/tr/
Tel: ${CONTACT_PHONE_DISPLAY}`,
} as const;

export type EntityDocument = {
  "@context": "https://schema.org";
  "@type": "Organization";
  "@id": string;
  name: string;
  alternateName: string[];
  url: string;
  description: string;
  disambiguatingDescription: string;
  email: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  hasMap: string;
  openingHours: string[];
  sameAs: string[];
  brand: { "@type": "Brand"; name: string; url: string };
  founder: { "@type": "Person"; name: string; url?: string; sameAs?: string[] };
  citationPage: string;
  llmsTxt: string;
  entityJson: string;
  aiShopping: string;
  catalogJson: string;
  merchantFeed: string;
  subjectOf: Array<{
    "@type": "Dataset";
    "@id": string;
    name: string;
    url: string;
  }>;
  citeOneLiner: string;
  citeShort: string;
  citeMedium: string;
  citeOneLinerEn: string;
  citeShortEn: string;
  citeMediumEn: string;
  faqs: ReadonlyArray<{ question: string; answer: string }>;
};

export function buildEntityDocument(): EntityDocument {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ARLEDSCREEN",
    alternateName: ["ARLED SCREEN", "AR-LED", "AR-LED Ekran Teknoloji Merkezi"],
    url: SITE_URL,
    description: ENTITY_CITE_MEDIUM,
    disambiguatingDescription:
      "İstanbul Gaziosmanpaşa merkezli Türk LED ekran firması. Almanya ARLED Solutions GmbH / ARLED Cinema ile aynı firma değildir. NXTIONSTAR, Next&NextStar (NEXTSTAR) TV veya NationStar LED bileşen ile karıştırılmamalıdır.",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.streetAddress,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressLocality: BUSINESS_ADDRESS.addressLocality,
      addressRegion: BUSINESS_ADDRESS.addressRegion,
      addressCountry: BUSINESS_ADDRESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: BUSINESS_MAP_URL,
    openingHours: [...BUSINESS_HOURS_TEXT],
    sameAs: [...ORGANIZATION_SAME_AS],
    brand: {
      "@type": "Brand",
      name: "NXTIONSTAR",
      url: `${SITE_URL}/tr/nxtionstar/`,
    },
    founder: {
      "@type": "Person",
      name: "Aras Bozkurt",
      url: `${SITE_URL}/tr/about/aras-bozkurt/`,
      sameAs: ["https://www.linkedin.com/in/bozkurtaras"],
    },
    citationPage: `${SITE_URL}/tr/about/`,
    llmsTxt: `${SITE_URL}/llms.txt`,
    entityJson: `${SITE_URL}/entity.json`,
    aiShopping: `${SITE_URL}/ai-shopping.json`,
    catalogJson: `${SITE_URL}/catalog.json`,
    merchantFeed: `${SITE_URL}/feeds/merchant-priced-panels.tsv`,
    subjectOf: [
      {
        "@type": "Dataset",
        "@id": `${SITE_URL}/ai-shopping.json`,
        name: "ARLEDSCREEN AI alışveriş / GEO discovery index",
        url: `${SITE_URL}/ai-shopping.json`,
      },
      {
        "@type": "Dataset",
        "@id": `${SITE_URL}/catalog.json`,
        name: "ARLEDSCREEN priced panel catalog",
        url: `${SITE_URL}/catalog.json`,
      },
      {
        "@type": "Dataset",
        "@id": `${SITE_URL}/feeds/merchant-priced-panels.tsv`,
        name: "ARLEDSCREEN merchant priced panels TSV",
        url: `${SITE_URL}/feeds/merchant-priced-panels.tsv`,
      },
    ],
    citeOneLiner: ENTITY_CITE_ONE_LINER,
    citeShort: ENTITY_CITE_SHORT,
    citeMedium: ENTITY_CITE_MEDIUM,
    citeOneLinerEn: ENTITY_CITE_ONE_LINER_EN,
    citeShortEn: ENTITY_CITE_SHORT_EN,
    citeMediumEn: ENTITY_CITE_MEDIUM_EN,
    faqs: [...ENTITY_FAQS],
  };
}
