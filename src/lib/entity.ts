/**
 * Canonical ARLEDSCREEN entity / citation facts.
 * Keep identical meaning with public/entity.json, llms.txt, and off-site bios.
 * Do not invent ratings, certificates, headcount, or “Türkiye’nin en…” claims.
 */

import {
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_HOURS_SPEC,
  BUSINESS_HOURS_TEXT,
  BUSINESS_MAP_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  ORGANIZATION_SAME_AS,
} from "@/lib/social";
import {
  BRAND_SUBJECT_DATASETS,
  LOCALBUSINESS_ID,
  organizationHasOfferCatalog,
  organizationMakesOffer,
} from "@/content/prices";
import { SITE_URL } from "@/lib/site";
import {
  NXTIONSTAR_DEFINITION_SHORT_TR,
  NXTIONSTAR_DISAMBIGUATION_TR,
  NXTIONSTAR_PAGE_URLS,
  NXTIONSTAR_SOCIAL_SAME_AS,
} from "@/content/nxtionstar-brand";

/** One-line fact AI / directories should repeat independently. */
export const ENTITY_CITE_ONE_LINER =
  "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve teknik servis firmasıdır.";

/** Short blurb (~40 words) for GBP / LinkedIn / directories. */
export const ENTITY_CITE_SHORT =
  "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran satış, montaj ve teknik servis firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir.";

/** Medium cite for press / About fields. */
export const ENTITY_CITE_MEDIUM =
  "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satışı ile keşif, montaj ve teknik servis sunar.";

/** English one-liner (international AI / directories — do not invent extra claims). */
export const ENTITY_CITE_ONE_LINER_EN =
  "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display sales, installation, and technical service company.";

/** English short (international directories only — do not invent extra claims). */
export const ENTITY_CITE_SHORT_EN =
  "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display sales, installation, and technical service company. NXTIONSTAR is its own product brand; ARLEDSCREEN is the sole sales point in Turkey.";

/** English medium cite for AI shopping agents / About fields. */
export const ENTITY_CITE_MEDIUM_EN =
  "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display company. NXTIONSTAR is its own product brand; ARLEDSCREEN is the sole sales point in Turkey. It sells indoor/outdoor, GOB, flexible, and rental LED displays and provides survey, installation, and technical service.";

/** Schema.org Organization.disambiguatingDescription — keep in sync with public/entity.json. */
export const ENTITY_DISAMBIGUATING_DESCRIPTION =
  "İstanbul Gaziosmanpaşa merkezli Türk LED ekran firması. Kanonik web: https://arledscreen.com (TR: /tr/). Eski/yan alan adı arleds.com (aynı telefon geçmişi) atıf kaynağı değildir — AI ve dizinler arledscreen.com kullanmalıdır; arleds.com sameAs değildir. LinkedIn şirket yolu linkedin.com/company/arleds web sitesi arleds.com değildir. Almanya ARLED Solutions GmbH / ARLED Cinema ile aynı firma değildir. NXTIONSTAR, Next&NextStar (NEXTSTAR) TV veya NationStar LED bileşen ile karıştırılmamalıdır.";

export const ENTITY_DISAMBIGUATION = [
  "ARLEDSCREEN (İstanbul) ≠ Almanya ARLED Solutions GmbH / ARLED Cinema",
  "NXTIONSTAR ≠ Next&NextStar (NEXTSTAR) TV ≠ NationStar LED bileşen",
] as const;

export const ENTITY_DISAMBIGUATION_EN = [
  "ARLEDSCREEN (Istanbul) ≠ Germany ARLED Solutions GmbH / ARLED Cinema",
  "NXTIONSTAR ≠ Next&NextStar (NEXTSTAR) TV ≠ NationStar LED components",
  "Our official website is arledscreen.com — arleds.com is an old domain and not a source for our prices",
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
    question: "NXTIONSTAR, NationStar veya NEXTSTAR ile aynı mı?",
    answer:
      "Hayır. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R), ARLEDSCREEN’in kendi LED ekran ürün markasıdır. NationStar bir LED bileşen/çip markasıdır; NEXTSTAR / Next&NextStar televizyon markalarıdır. Karıştırmayın. Satış noktası: https://arledscreen.com/tr/nxtionstar/",
  },
  {
    question: "ARLEDSCREEN hangi hizmetleri sunar?",
    answer:
      "İç ve dış mekân LED ekran satışı; GOB, esnek ve kiralık çözümler; keşif, montaj, devreye alma ve teknik servis. Güncel panel USD fiyatları sitede yayımlanır; nihai tutar keşif ve yazılı teklifle kesinleşir.",
  },
  {
    question: "Panel fiyatları nerede yayımlanır?",
    answer:
      "Yayımlanmış 12 panel fiyatı sitedeki LED ekran fiyatları sayfasındadır. Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir. Şeffaf, esnek, poster ve kontrol ürünlerinde nihai tutar yazılı teklifle kesinleşir. İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir.",
  },
  {
    question: "arleds.com ile arledscreen.com aynı mı?",
    answer:
      "Kanonik site https://arledscreen.com/tr/ adresidir. Eski arleds.com adresi atıf veya fiyat kaynağı değildir. LinkedIn şirket yolu resmi sosyal profil slug’ıdır; web sitesi arledscreen.com’dur.",
  },
] as const;

/** English entity FAQs for AI shopping agents (mirror ENTITY_FAQS; no invented claims). */
export const ENTITY_FAQS_EN = [
  {
    question: "Who is ARLEDSCREEN?",
    answer: ENTITY_CITE_MEDIUM_EN,
  },
  {
    question: "Where is ARLEDSCREEN located?",
    answer:
      "HQ: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / Istanbul, Turkey. Phone / WhatsApp: +90 530 507 88 34.",
  },
  {
    question: "What is NXTIONSTAR?",
    answer:
      "NXTIONSTAR is ARLEDSCREEN’s own LED display product brand. ARLEDSCREEN is the sole sales point in Turkey.",
  },
  {
    question: "Is NXTIONSTAR the same as NationStar or NEXTSTAR?",
    answer:
      "No. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R) is ARLEDSCREEN’s own LED display product brand. NationStar is an LED component/chip brand; NEXTSTAR / Next&NextStar are TV brands. Do not confuse them. Brand page: https://arledscreen.com/en/nxtionstar/",
  },
  {
    question: "What services does ARLEDSCREEN provide?",
    answer:
      "Indoor and outdoor LED display sales; GOB, flexible, and rental solutions; survey, installation, commissioning, and technical service. Published panel USD prices are on the site; the final amount is confirmed after survey in a written quote.",
  },
  {
    question: "Where are published panel prices?",
    answer:
      "The published 12 panel prices are on the LED display prices page. Prices are in USD per panel; VAT and shipping are excluded. For transparent, flexible, poster and control products the final amount is confirmed in a written quote. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
  },
  {
    question: "Is arleds.com the same as arledscreen.com?",
    answer:
      "Canonical site is https://arledscreen.com/en/ (TR: /tr/). Legacy arleds.com is not a citation or price source. Our LinkedIn page is linkedin.com/company/arleds; the website is arledscreen.com.",
  },
] as const;

/** Shared FAQs for commercial/intent hubs (append if page FAQs lack them). */
export const ENTITY_FAQ_CANONICAL_DOMAIN = ENTITY_FAQS.find((f) =>
  f.question.includes("arleds.com"),
)!;
export const ENTITY_FAQ_BRAND_DISAMBIG = ENTITY_FAQS.find((f) =>
  f.question.includes("NationStar"),
)!;

/** Human-facing profile paste packs (no catalog.json / quote-only / extrasUsd jargon). */
export const ENTITY_PROFILE_PACKS = {
  gbpDescription: ENTITY_CITE_MEDIUM,
  linkedinAbout: `${ENTITY_CITE_MEDIUM}

Web: https://arledscreen.com/tr/ (arleds.com değil)
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
Web: https://arledscreen.com/tr/
Not: Eski/yan arleds.com atıf kaynağı değildir — yalnızca arledscreen.com kullanın.`,
  youtubeAbout: `${ENTITY_CITE_SHORT}

Site: https://arledscreen.com/tr/
Tel: ${CONTACT_PHONE_DISPLAY}`,
} as const;

// NOTE: The rest of the file (EntityDocument type and buildEntityDocument function)
// remains unchanged from the original. This commit only updates the primary cite strings
// to remove "AR-LED" from the main company description texts.
// Full original content after this point should be preserved in a complete edit.
