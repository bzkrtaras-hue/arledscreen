/**
 * Case-study landings derived ONLY from published reference sheet fields.
 * No invented quotes, control systems, warranties, durations, or certificates.
 */
import { references, type Reference } from "@/content/references";
import {
  areaFromDetail,
  displayCompany,
  getCaseStudies as getFeaturedCaseCards,
} from "@/content/trust";
import { SERVICE_REGIONS } from "@/content/service-regions";

export interface ProjectCaseStudy {
  slug: string;
  refId: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  companyLabel: string;
  detail: string;
  location: string;
  provinceSlug?: string;
  provinceName?: string;
  pitch?: string;
  environment?: string;
  areaM2?: number;
  sector: string;
  images: { src: string; alt: string }[];
  relatedProductHref?: string;
  relatedProductLabel?: string;
  relatedUseHref?: string;
  relatedUseLabel?: string;
}

const PROVINCE_FROM_LOCATION: Record<string, string> = {
  Giresun: "giresun",
  Aksaray: "aksaray",
  Manisa: "manisa",
  "Kadıköy / İstanbul": "istanbul",
  Niğde: "nigde",
  "Beylikdüzü / İstanbul": "istanbul",
  "Merter / İstanbul": "istanbul",
  "Yeşilpınar / İstanbul": "istanbul",
  Alanya: "antalya",
  Yalova: "yalova",
  "Atatürk Havalimanı": "istanbul",
  Bursa: "bursa",
  Keşan: "edirne",
  "Osmanbey / İstanbul": "istanbul",
  "Dikili / İzmir": "izmir",
  Yozgat: "yozgat",
  Van: "van",
  İstanbul: "istanbul",
  Eskişehir: "eskisehir",
};

function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function pitchOf(detail: string): string | undefined {
  const m = detail.match(/P\d+(?:\.\d+)?/i);
  return m ? m[0].replace(/^p/i, "P") : undefined;
}

function environmentOf(detail: string): string | undefined {
  if (/dış mekân|dış mekan|Outdoor|outdoor/i.test(detail)) return "Dış mekân";
  if (/ev içi|iç mekân|iç mekan/i.test(detail)) return "İç mekân";
  if (/kiralama|sahne/i.test(detail)) return "Kiralık / etkinlik";
  if (/oval|esnek/i.test(detail)) return "Esnek / özel form";
  return undefined;
}

function sectorOf(company: string, detail: string): string {
  const t = `${company} ${detail}`;
  if (/Belediye/i.test(t)) return "Kamu / belediye";
  if (/Hotel|Resort|otel/i.test(t)) return "Otel";
  if (/Cafe|Kafe|cafe|kafe|Malt|Lounge|Coffee|Club/i.test(t)) return "Kafe / restoran";
  if (/Sahne|sahne|Prodüksiyon|Drama|stand|Ordu Günleri/i.test(t)) return "Sahne / etkinlik";
  if (/Sigorta|Triko|Kırtasiye|mağaza|Mobilya/i.test(t)) return "Perakende / mağaza";
  if (/Hastane|Radyoloji/i.test(t)) return "Sağlık";
  if (/dış mekân|dış mekan|Outdoor|P4|P5/i.test(t)) return "Dış mekân / cephe";
  if (/Düğün|düğün/i.test(t)) return "Düğün salonu";
  return "Ticari uygulama";
}

function productHint(detail: string, env?: string): { href: string; label: string } | undefined {
  if (/oval|esnek/i.test(detail)) return { href: "/tr/products/esnek-led-ekran/", label: "Esnek LED ekran" };
  if (/kiralama|sahne arkas/i.test(detail)) return { href: "/tr/products/kiralik-led-ekran/", label: "Kiralık LED ekran" };
  if (/P1\.25|P1\.53|P1\.86|GOB/i.test(detail)) return { href: "/tr/products/gob-led-ekran/", label: "GOB LED ekran" };
  if (env === "Dış mekân" || /dış mekân|dış mekan|Outdoor|P4|P5/i.test(detail))
    return { href: "/tr/products/dis-mekan-led-ekran/", label: "Dış mekân LED ekran" };
  return { href: "/tr/products/ic-mekan-led-ekran/", label: "İç mekân LED ekran" };
}

function usageHint(sector: string): { href: string; label: string } | undefined {
  if (sector.startsWith("Kamu")) return { href: "/tr/belediye-led-ekran/", label: "Belediye LED ekran" };
  if (sector === "Otel") return { href: "/tr/otel-led-ekran/", label: "Otel LED ekran" };
  if (sector.startsWith("Kafe")) return { href: "/tr/restoran-led-ekran/", label: "Restoran LED ekran" };
  if (sector.includes("Sahne")) return { href: "/tr/sahne-led-ekran/", label: "Sahne LED ekran" };
  if (sector.includes("mağaza") || sector.includes("Perakende")) return { href: "/tr/magaza-led-ekran/", label: "Mağaza LED ekran" };
  if (sector.includes("Düğün")) return { href: "/tr/dugun-salonu-led-ekran/", label: "Düğün salonu LED ekran" };
  if (sector.includes("Dış")) return { href: "/tr/cephe-led-ekran/", label: "Cephe LED ekran" };
  return undefined;
}

/** Known photo matches — only attach when filename/project identity is clear. */
const IMAGE_BY_REF: Record<string, { src: string; alt: string }[]> = {
  "ref-26": [
    { src: "/projects/unye.jpg", alt: "Ünye Belediyesi Ordu Günleri LED ekran kurulumu" },
    { src: "/blog/unye-belediyesi-led-ekran.jpg", alt: "Ordu Günleri standında 384×160 cm LED ekran" },
  ],
  "ref-22": [{ src: "/blog/alanya-otel-led-ekran.jpg", alt: "Alanya White City Resort Hotel LED ekran" }],
  "ref-39": [
    { src: "/blog/eskisehir-sigorta-led-ekran.jpg", alt: "Eskişehir sigorta şubesi LED ekran montajı" },
    { src: "/blog/eskisehir-sigorta-led-ekran-2.jpg", alt: "Eskişehir şube LED kabin kablolaması" },
  ],
  "ref-14": [{ src: "/projects/kafe.jpg", alt: "Kafe / yaşam alanı LED ekran uygulaması" }],
  "ref-05": [{ src: "/projects/modules/outdoor-facade.jpg", alt: "Geniş dış mekân / belediye ölçeği LED yüzey" }],
  "ref-27": [{ src: "/projects/billboard-arled.jpg", alt: "Büyük yüzey dış mekân LED ekran" }],
  "ref-44": [{ src: "/projects/modules/tech/flexible-curve-concave-convex.jpg", alt: "Esnek / oval LED ekran formu" }],
};

function isPublishable(ref: Reference): boolean {
  if (!ref.location) return false;
  // Skip ultra-thin foreign/generic rows without size or pitch
  const hasMeasure = /\d+\s*[×x]\s*\d+|P\d|m²|m2|oval|kiralama/i.test(ref.detail);
  const hasNamedOrg = /Belediye|Cafe|Kafe|Hotel|Resort|Sigorta|Triko|Studio|Club|Prodüksiyon|Drama|Radyoloji|Kırtasiye|Golet|Malt|Lounge/i.test(
    ref.company,
  );
  return hasMeasure || hasNamedOrg;
}

function buildSlug(ref: Reference, used: Set<string>): string {
  const base = slugify(`${displayCompany(ref)}-led-ekran`) || slugify(ref.id);
  let slug = base;
  let i = 2;
  while (used.has(slug)) {
    slug = `${base}-${i++}`;
  }
  used.add(slug);
  return slug;
}

function buildCase(ref: Reference, slug: string): ProjectCaseStudy {
  const label = displayCompany(ref);
  const pitch = pitchOf(ref.detail);
  const environment = environmentOf(ref.detail);
  const area = areaFromDetail(ref.detail);
  const sector = sectorOf(ref.company, ref.detail);
  const provinceSlug = PROVINCE_FROM_LOCATION[ref.location];
  const province = provinceSlug ? SERVICE_REGIONS.find((r) => r.slug === provinceSlug) : undefined;
  const product = productHint(ref.detail, environment);
  const use = usageHint(sector);
  const h1 = `${label} LED ekran projesi`;
  return {
    slug,
    refId: ref.id,
    title: label,
    h1,
    metaTitle: `${label} LED Ekran Projesi${province ? ` | ${province.name}` : ""} | ARLEDSCREEN`,
    metaDescription: `${label}: ${ref.detail}${ref.location ? `, ${ref.location}` : ""}. Tarih ${ref.date}. ARLEDSCREEN yayımlanmış proje kaydı.`,
    date: ref.date,
    companyLabel: label,
    detail: ref.detail,
    location: ref.location,
    provinceSlug: province?.slug,
    provinceName: province?.name,
    pitch,
    environment,
    areaM2: area ? Math.round(area * 10) / 10 : undefined,
    sector,
    images: IMAGE_BY_REF[ref.id] ?? [],
    relatedProductHref: product?.href,
    relatedProductLabel: product?.label,
    relatedUseHref: use?.href,
    relatedUseLabel: use?.label,
  };
}

function buildAll(): ProjectCaseStudy[] {
  const used = new Set<string>();
  const out: ProjectCaseStudy[] = [];
  for (const ref of references) {
    if (!isPublishable(ref)) continue;
    out.push(buildCase(ref, buildSlug(ref, used)));
  }
  return out;
}

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = buildAll();

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return PROJECT_CASE_STUDIES.find((c) => c.slug === slug);
}

export function projectCasePath(slug: string): string {
  return `/tr/projelerimiz/${slug}/`;
}

/** Featured cards on home still come from trust.ts; expose for links. */
export { getFeaturedCaseCards };
