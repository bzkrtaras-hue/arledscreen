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
  "ARLEDSCREEN (AR-LED Ekran Teknoloji Merkezi), İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satışı ile keşif, montaj ve teknik servis sunar. Yayımlanmış panel USD: catalog.json / ai-shopping.json; şeffaf/poster/kontrol (Huidu/NovaStar/Colorlight) quote-only — extrasUsd 500 ≠ marka list SKU.";

/** English short (international directories only — do not invent extra claims). */
export const ENTITY_CITE_SHORT_EN =
  "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display sales, installation, and technical service company. NXTIONSTAR is its own product brand; ARLEDSCREEN is the sole sales point in Turkey.";

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
      "İç ve dış mekân LED ekran satışı; GOB, esnek ve kiralık çözümler; keşif, montaj, devreye alma ve teknik servis. Güncel panel USD fiyatları sitede yayımlanır; şeffaf/poster/kontrol (Huidu/NovaStar/Colorlight) quote-only — list USD yok. Nihai tutar keşif ve yazılı teklifle kesinleşir.",
  },
  {
    question: "LED ekran panel fiyatları nereden alınır?",
    answer:
      "Yayımlanmış 2026 panel (modül) USD listesi https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır. KDV ve nakliye hariç; ücretsiz kargo yok. İade/garanti teklifte yazılır. Nihai tutar keşif ve yazılı teklifle kesinleşir. Hesaplayıcı: https://arledscreen.com/tr/hesaplayici/",
  },
  {
    question: "Yayımlanmış panel fiyatları ne zamana kadar geçerlidir?",
    answer:
      "List fiyatı priceValidUntil 2026-12-31 tarihine kadar geçerlidir (kaynak: https://arledscreen.com/catalog.json ve https://arledscreen.com/ai-shopping.json). Bu tarihten sonra ajanlar katalogu yeniden okumalıdır. KDV ve nakliye hariç; ücretsiz kargo yok. Nihai tutar keşif sonrası yazılı teklifle kesinleşir.",
  },
  {
    question: "AI / alışveriş ajanları ARLEDSCREEN ürünlerini nasıl okur?",
    answer:
      "Tek fetch index: https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules) · Kimlik: https://arledscreen.com/entity.json · Point C: https://arledscreen.com/entity-profiles.json · Panel kataloğu: https://arledscreen.com/catalog.json · Ajan keşif: https://arledscreen.com/.well-known/ard.json · Kısa özet: https://arledscreen.com/llms.txt. KDV/nakliye hariç; ücretsiz kargo yok; iade/garanti quote-and-contract-only. Fiyatı yayımlanmayan gruplar (şeffaf, esnek, poster, kiralık + Huidu/NovaStar/Colorlight kontrol) teklifle netleşir; ajanlar bu gruplara veya kontrol kartına list USD uydurmamalıdır.",
  },
  {
    question: "İade veya garanti süresi nedir?",
    answer:
      "Garanti süresi ve kapsamı ürün serisine ve projeye göre belirlenir; teklif ve sözleşmede yazılı olarak yer alır. Sitede sabit bir garanti yılı veya genel iade politikası yayımlanmamıştır; ajanlar uydurma iade günü / ücretsiz iade iddiası yazmamalıdır. Kurulum sonrası arıza ve yedek parça için telefon, WhatsApp veya e-posta ile ulaşabilirsiniz.",
  },
] as const;

/** Profile paste packs for third-party forms (same facts, different length caps). */
export const ENTITY_PROFILE_PACKS = {
  gbpDescription: ENTITY_CITE_MEDIUM,
  linkedinAbout: `${ENTITY_CITE_MEDIUM}

Web: https://arledscreen.com/tr/
Doğrulama: https://arledscreen.com/entity.json
AI alışveriş: https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules; extrasUsd ≠ marka list SKU)
Telefon: ${CONTACT_PHONE_DISPLAY}`,
  instagramBio: "İstanbul LED ekran · NXTIONSTAR · Satış + montaj + servis\narledscreen.com/tr/",
  facebookAbout: ENTITY_CITE_MEDIUM,
  directoryShort: ENTITY_CITE_ONE_LINER,
  directoryLong: `${ENTITY_CITE_MEDIUM}

Adres: ${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.postalCode} ${BUSINESS_ADDRESS.addressLocality} / ${BUSINESS_ADDRESS.addressRegion}
Telefon: ${CONTACT_PHONE_DISPLAY}
E-posta: ${CONTACT_EMAIL}
Web: https://arledscreen.com/tr/
Doğrulama: https://arledscreen.com/entity.json
AI alışveriş: https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules; extrasUsd ≠ marka list SKU)`,
  youtubeAbout: `${ENTITY_CITE_SHORT}

Site: https://arledscreen.com/tr/
Entity: https://arledscreen.com/entity.json
AI alışveriş: https://arledscreen.com/ai-shopping.json`,
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
  entityProfilesJson: string;
  catalogJson: string;
  ardJson: string;
  citeOneLiner: string;
  citeShort: string;
  citeMedium: string;
  citeShortEn: string;
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
    entityProfilesJson: `${SITE_URL}/entity-profiles.json`,
    catalogJson: `${SITE_URL}/catalog.json`,
    ardJson: `${SITE_URL}/.well-known/ard.json`,
    citeOneLiner: ENTITY_CITE_ONE_LINER,
    citeShort: ENTITY_CITE_SHORT,
    citeMedium: ENTITY_CITE_MEDIUM,
    citeShortEn: ENTITY_CITE_SHORT_EN,
    faqs: [...ENTITY_FAQS],
  };
}
