/**
 * Regenerate public/entity.json from the same facts as src/lib/entity.ts + social.ts.
 * Keeps machine-readable identity in sync for AI shopping / GEO.
 *
 * Run: node scripts/sync-entity-json.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arledscreen.com";

const social = fs.readFileSync(path.join(root, "src/lib/social.ts"), "utf8");
const entitySrc = fs.readFileSync(path.join(root, "src/lib/entity.ts"), "utf8");

const str = (re) => {
  const m = social.match(re) || entitySrc.match(re);
  if (!m) throw new Error(`sync-entity: missing ${re}`);
  return m[1];
};

const CONTACT_EMAIL = str(/export const CONTACT_EMAIL = "([^"]+)"/);
const CONTACT_PHONE_E164 = str(/export const CONTACT_PHONE_E164 = "([^"]+)"/);
const CONTACT_PHONE_DISPLAY = str(/export const CONTACT_PHONE_DISPLAY = "([^"]+)"/);

const street = str(/streetAddress:\s*"([^"]+)"/);
const postal = str(/postalCode:\s*"([^"]+)"/);
const locality = str(/addressLocality:\s*"([^"]+)"/);
const region = str(/addressRegion:\s*"([^"]+)"/);
const country = str(/addressCountry:\s*"([^"]+)"/);
const lat = Number(str(/latitude:\s*([\d.]+)/));
const lng = Number(str(/longitude:\s*([\d.]+)/));
const mapUrl = str(/BUSINESS_MAP_URL = "([^"]+)"/);

const instagramHref = str(/instagram:\s*\{[\s\S]*?href:\s*"([^"]+)"/);
const facebookHref = str(/facebook:\s*\{[\s\S]*?href:\s*"([^"]+)"/);

const sameBlock = social.match(/export const ORGANIZATION_SAME_AS = \[([\s\S]*?)\] as const/);
const ORGANIZATION_SAME_AS = sameBlock
  ? sameBlock[1]
      .split("\n")
      .filter((line) => !line.trim().startsWith("//"))
      .flatMap((line) => {
        const urls = [...line.matchAll(/"([^"]+)"/g)].map((m) => m[1]).filter((u) => u.startsWith("http"));
        if (/SOCIAL_LINKS\.instagram\.href/.test(line)) urls.push(instagramHref);
        if (/SOCIAL_LINKS\.facebook\.href/.test(line)) urls.push(facebookHref);
        return urls;
      })
  : [];

const cite = (name) => {
  const m = entitySrc.match(new RegExp(`export const ${name} =\\s*"([\\s\\S]*?)";`));
  if (!m) throw new Error(`sync-entity: missing ${name}`);
  return m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
};

const ENTITY_CITE_ONE_LINER = cite("ENTITY_CITE_ONE_LINER");
const ENTITY_CITE_SHORT = cite("ENTITY_CITE_SHORT");
const ENTITY_CITE_MEDIUM = cite("ENTITY_CITE_MEDIUM");
const ENTITY_CITE_SHORT_EN = cite("ENTITY_CITE_SHORT_EN");

const DISAMBIG =
  "İstanbul Gaziosmanpaşa merkezli Türk LED ekran firması. Almanya ARLED Solutions GmbH / ARLED Cinema ile aynı firma değildir. NXTIONSTAR, Next&NextStar (NEXTSTAR) TV veya NationStar LED bileşen ile karıştırılmamalıdır.";

const hours = [...social.matchAll(/"Pazartesi[^"]+"|"Cumartesi[^"]+"/g)].map((m) => m[0].slice(1, -1));
const openingHours =
  hours.length >= 2
    ? hours.slice(0, 2)
    : ["Pazartesi – Cuma: 09:00 – 18:00", "Cumartesi: 10:00 – 15:00"];

const faqs = [
  {
    question: "ARLEDSCREEN kimdir?",
    answer: ENTITY_CITE_MEDIUM,
  },
  {
    question: "ARLEDSCREEN nerede?",
    answer: `Merkez: ${street}, ${postal} ${locality} / ${region}, Türkiye. Telefon / WhatsApp: ${CONTACT_PHONE_DISPLAY}.`,
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
    question: "LED ekran panel fiyatları nereden alınır?",
    answer: `Yayımlanmış 2026 panel (modül) USD listesi ${SITE}/catalog.json ve ${SITE}/tr/led-ekran-fiyatlari/ sayfasındadır. KDV ve nakliye hariçtir; nihai tutar keşif ve yazılı teklifle kesinleşir. Hesaplayıcı: ${SITE}/tr/hesaplayici/`,
  },
  {
    question: "AI / alışveriş ajanları ARLEDSCREEN ürünlerini nasıl okur?",
    answer: `Tek fetch index: ${SITE}/ai-shopping.json · Kimlik: ${SITE}/entity.json · Point C pack: ${SITE}/entity-profiles.json · Panel kataloğu: ${SITE}/catalog.json · Ajan keşif: ${SITE}/.well-known/ard.json · Kısa özet: ${SITE}/llms.txt. Fiyatı yayımlanmayan gruplar (şeffaf, esnek, poster, kiralık) teklifle netleşir.`,
  },
];

if (ORGANIZATION_SAME_AS.some((u) => /arleds\.com/i.test(u))) {
  throw new Error("sync-entity: arleds.com must not be in sameAs until 301 works");
}

const doc = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "ARLEDSCREEN",
  alternateName: ["ARLED SCREEN", "AR-LED", "AR-LED Ekran Teknoloji Merkezi"],
  url: SITE,
  description: ENTITY_CITE_MEDIUM,
  disambiguatingDescription: DISAMBIG,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_E164,
  address: {
    "@type": "PostalAddress",
    streetAddress: street,
    postalCode: postal,
    addressLocality: locality,
    addressRegion: region,
    addressCountry: country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: lat,
    longitude: lng,
  },
  hasMap: mapUrl,
  openingHours,
  sameAs: ORGANIZATION_SAME_AS,
  brand: {
    "@type": "Brand",
    name: "NXTIONSTAR",
    url: `${SITE}/tr/nxtionstar/`,
  },
  founder: {
    "@type": "Person",
    name: "Aras Bozkurt",
    url: `${SITE}/tr/about/aras-bozkurt/`,
    sameAs: ["https://www.linkedin.com/in/bozkurtaras"],
  },
  citationPage: `${SITE}/tr/about/`,
  llmsTxt: `${SITE}/llms.txt`,
  entityJson: `${SITE}/entity.json`,
  entityProfilesJson: `${SITE}/entity-profiles.json`,
  catalogJson: `${SITE}/catalog.json`,
  ardJson: `${SITE}/.well-known/ard.json`,
  aiShoppingJson: `${SITE}/ai-shopping.json`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "NXTIONSTAR yayımlanmış panel USD (2026)",
    url: `${SITE}/catalog.json`,
    numberOfItems: 12,
  },
  citeOneLiner: ENTITY_CITE_ONE_LINER,
  citeShort: ENTITY_CITE_SHORT,
  citeMedium: ENTITY_CITE_MEDIUM,
  citeShortEn: ENTITY_CITE_SHORT_EN,
  faqs,
};

const out = path.join(root, "public/entity.json");
fs.writeFileSync(out, `${JSON.stringify(doc, null, 2)}\n`);
console.log(`sync-entity: wrote ${path.relative(root, out)} (sameAs=${ORGANIZATION_SAME_AS.length})`);

/** Point C paste packs — owner forms (GBP/LinkedIn/IG/FB/directories). Not Organization schema. */
const profiles = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "ARLEDSCREEN entity profile paste packs (Point C)",
  description:
    "Third-party profile paste packs derived from the same cite facts as entity.json. Owner-operated Point C; do not invent ratings or prices.",
  url: `${SITE}/entity-profiles.json`,
  creator: { "@id": `${SITE}/#organization` },
  isBasedOn: `${SITE}/entity.json`,
  license: "https://arledscreen.com/tr/about/",
  dateModified: new Date().toISOString().slice(0, 10),
  packs: {
    gbpDescription: ENTITY_CITE_MEDIUM,
    linkedinAbout: `${ENTITY_CITE_MEDIUM}\n\nWeb: ${SITE}/tr/\nDoğrulama: ${SITE}/entity.json\nTelefon: ${CONTACT_PHONE_DISPLAY}`,
    instagramBio: "İstanbul LED ekran · NXTIONSTAR · Satış + montaj + servis\narledscreen.com/tr/",
    facebookAbout: ENTITY_CITE_MEDIUM,
    directoryShort: ENTITY_CITE_ONE_LINER,
    directoryLong: `${ENTITY_CITE_MEDIUM}\n\nAdres: ${street}, ${postal} ${locality} / ${region}\nTelefon: ${CONTACT_PHONE_DISPLAY}\nE-posta: ${CONTACT_EMAIL}\nWeb: ${SITE}/tr/\nDoğrulama: ${SITE}/entity.json`,
    youtubeAbout: `${ENTITY_CITE_SHORT}\n\nSite: ${SITE}/tr/\nEntity: ${SITE}/entity.json`,
  },
    canonicalUrls: {
    entityJson: `${SITE}/entity.json`,
    catalogJson: `${SITE}/catalog.json`,
    ardJson: `${SITE}/.well-known/ard.json`,
    aiShoppingJson: `${SITE}/ai-shopping.json`,
    llmsTxt: `${SITE}/llms.txt`,
    about: `${SITE}/tr/about/`,
    fiyat: `${SITE}/tr/led-ekran-fiyatlari/`,
    playbook: "docs/offsite-entity-playbook.md (repo)",
  },
};

const profilesOut = path.join(root, "public/entity-profiles.json");
fs.writeFileSync(profilesOut, `${JSON.stringify(profiles, null, 2)}\n`);
console.log(`sync-entity: wrote ${path.relative(root, profilesOut)} (Point C packs)`);
