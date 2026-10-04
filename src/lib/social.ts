/** Official ARLEDSCREEN / NXTIONSTAR Turkey contact & social links. */

export const CONTACT_EMAIL = "arled@arledscreen.com";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

export const CONTACT_PHONE_DISPLAY = "+90 530 507 88 34";
export const CONTACT_PHONE_HREF = "tel:+905305078834";

export const SOCIAL_LINKS = {
  phone: {
    id: "phone",
    label: "Telefon: +90 530 507 88 34",
    href: CONTACT_PHONE_HREF,
    external: false,
  },
  email: {
    id: "email",
    label: "E-posta: arled@arledscreen.com",
    href: CONTACT_EMAIL_HREF,
    external: false,
  },
  whatsapp: {
    id: "whatsapp",
    label: "WhatsApp: +90 530 507 88 34",
    href: "https://wa.me/905305078834",
    external: true,
  },
  instagram: {
    id: "instagram",
    label: "Instagram: @arledscreen",
    href: "https://www.instagram.com/arledscreen",
    external: true,
  },
  facebook: {
    id: "facebook",
    label: "Facebook: arledscreenn",
    href: "https://www.facebook.com/arledscreenn",
    external: true,
  },
} as const;

export type SocialLinkId = keyof typeof SOCIAL_LINKS;

export const SOCIAL_LINK_LIST = [
  SOCIAL_LINKS.phone,
  SOCIAL_LINKS.email,
  SOCIAL_LINKS.whatsapp,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.facebook,
] as const;

/** Compact header set: WhatsApp + Mail (desktop). */
export const HEADER_SOCIAL_IDS: SocialLinkId[] = ["whatsapp", "email"];

/** Full mobile menu set. */
export const MOBILE_SOCIAL_IDS: SocialLinkId[] = [
  "email",
  "whatsapp",
  "instagram",
  "facebook",
];

export const ORGANIZATION_SAME_AS = [
  SOCIAL_LINKS.instagram.href,
  SOCIAL_LINKS.facebook.href,
  "https://www.linkedin.com/company/arleds",
  // "https://arleds.com" removed 2026-10-04: no valid TLS certificate since 2024-09 and no
  // working redirect. Re-add only once it 301-redirects to https://arledscreen.com/.
] as const;


/**
 * Verified NAP (owner-confirmed 1 Oct 2026): full street, postal code, geo, hours.
 * Keep identical strings in footer, JSON-LD, llms.txt and Google Business Profile.
 */
export const BUSINESS_ADDRESS = {
  streetAddress: "Merkez Mah. Tuna Sok. No:15-17 Kat 1",
  postalCode: "34245",
  addressLocality: "Gaziosmanpaşa",
  addressRegion: "İstanbul",
  addressCountry: "TR",
} as const;

/** E.164 phone for structured data. */
export const CONTACT_PHONE_E164 = "+905305078834";
export const WHATSAPP_NUMBER = "905305078834";

/** Owner-confirmed (1 Oct 2026): full address, coordinates and opening hours. */
export const BUSINESS_NAP_LINE =
  "ARLEDSCREEN · Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul";
export const BUSINESS_ADDRESS_LINES = ["Merkez Mah. Tuna Sok. No:15-17 Kat 1", "34245 Gaziosmanpaşa / İstanbul"] as const;
export const BUSINESS_GEO = { latitude: 41.0538876, longitude: 28.9121358 } as const;
export const BUSINESS_MAP_URL = "https://www.google.com/maps/search/?api=1&query=41.0538876%2C28.9121358";
export const BUSINESS_HOURS_TEXT = ["Pazartesi – Cuma: 09:00 – 18:00", "Cumartesi: 10:00 – 15:00"] as const;
export const BUSINESS_HOURS_SPEC = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "15:00" },
];
