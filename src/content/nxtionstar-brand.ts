/**
 * Single source for the NXTIONSTAR brand definition (brand page lead, Brand JSON-LD,
 * entity.json and llms.txt must use the same wording).
 * Facts only: own brand, sole sales point in Turkey, CE, export regions, payment.
 */
import { SOCIAL_LINKS } from "@/lib/social";
import { SITE_URL } from "@/lib/site";

export const NXTIONSTAR_DEFINITION_SHORT_TR =
  "NXTIONSTAR, ARLEDSCREEN'in kendi LED ekran markasıdır; Türkiye'deki tek satış noktası İstanbul Gaziosmanpaşa'daki ARLEDSCREEN merkezidir.";

export const NXTIONSTAR_DEFINITION_SHORT_EN =
  "NXTIONSTAR is ARLEDSCREEN's own LED display brand; its sole sales point in Turkey is the ARLEDSCREEN headquarters in Gaziosmanpaşa, Istanbul.";

export const NXTIONSTAR_DEFINITION_TR = `${NXTIONSTAR_DEFINITION_SHORT_TR} Marka; iç mekân, dış mekân, GOB, kiralık ve esnek LED ekranları kapsar ve ürünler CE sertifikalıdır. Satış, keşif, montaj ve teknik servisi ARLEDSCREEN yapar. Avrupa, Orta Doğu ve Balkanlar'a gönderim yapılır; ödeme TL, USD, EUR ve diğer para birimleriyle, taksitle de yapılabilir.`;

export const NXTIONSTAR_DEFINITION_EN = `${NXTIONSTAR_DEFINITION_SHORT_EN} The brand covers indoor, outdoor, GOB, rental and flexible LED displays, and the products are CE certified. ARLEDSCREEN handles sales, site survey, installation and technical service. Shipping is available to Europe, the Middle East and the Balkans; payment is accepted in TRY, USD, EUR and other currencies, and installments are available.`;

export const NXTIONSTAR_DISAMBIGUATION_TR =
  "NXTIONSTAR (N-X-T-I-O-N-S-T-A-R) ≠ NationStar LED bileşen/çip ≠ NEXTSTAR / Next&NextStar TV. ARLEDSCREEN ≠ ARLED Solutions GmbH / ARLED Cinema. Satış ve fiyat kaynağı yalnızca arledscreen.com (ARLEDSCREEN); arleds.com değil.";

/** Same Instagram / Facebook / LinkedIn profiles as the Organization node. */
export const NXTIONSTAR_SOCIAL_SAME_AS = [
  SOCIAL_LINKS.instagram.href,
  SOCIAL_LINKS.facebook.href,
  "https://www.linkedin.com/company/arleds",
] as const;

export const NXTIONSTAR_PAGE_URLS = [
  `${SITE_URL}/tr/nxtionstar/`,
  `${SITE_URL}/en/nxtionstar/`,
] as const;
