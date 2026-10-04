import { references } from "@/content/references";
import { displayCompany, getReferenceStats } from "@/content/trust";

/**
 * Service-area (iller) landings for local SEO.
 * Only provinces that appear in the owner reference sheet — no invented cities
 * or “81 il” claims. Content is derived from published project locations.
 */

export interface ServiceRegion {
  slug: string;
  name: string;
  /** Nominative + locative helpers for copy */
  locative: string;
  isHq: boolean;
  /** Free-text locations from references (districts / cities within the province) */
  locations: string[];
  /** Anonymised / public project labels for on-page proof */
  projectLabels: string[];
  projectCount: number;
  title: string;
  description: string;
  h1: string;
  intro: string;
}

const PROVINCE_META: Record<
  string,
  { slug: string; locative: string; isHq?: boolean }
> = {
  İstanbul: { slug: "istanbul", locative: "İstanbul'da", isHq: true },
  Antalya: { slug: "antalya", locative: "Antalya'da" },
  Bursa: { slug: "bursa", locative: "Bursa'da" },
  İzmir: { slug: "izmir", locative: "İzmir'de" },
  Eskişehir: { slug: "eskisehir", locative: "Eskişehir'de" },
  Manisa: { slug: "manisa", locative: "Manisa'da" },
  Aksaray: { slug: "aksaray", locative: "Aksaray'da" },
  Van: { slug: "van", locative: "Van'da" },
  Yozgat: { slug: "yozgat", locative: "Yozgat'ta" },
  Giresun: { slug: "giresun", locative: "Giresun'da" },
  Yalova: { slug: "yalova", locative: "Yalova'da" },
  Niğde: { slug: "nigde", locative: "Niğde'de" },
  Edirne: { slug: "edirne", locative: "Edirne'de" },
};

const LOCATION_TO_PROVINCE: Record<string, string> = {
  Giresun: "Giresun",
  Aksaray: "Aksaray",
  Manisa: "Manisa",
  "Kadıköy / İstanbul": "İstanbul",
  Niğde: "Niğde",
  "Beylikdüzü / İstanbul": "İstanbul",
  "Merter / İstanbul": "İstanbul",
  "Yeşilpınar / İstanbul": "İstanbul",
  Alanya: "Antalya",
  Yalova: "Yalova",
  "Atatürk Havalimanı": "İstanbul",
  Bursa: "Bursa",
  Keşan: "Edirne",
  "Osmanbey / İstanbul": "İstanbul",
  "Dikili / İzmir": "İzmir",
  Yozgat: "Yozgat",
  Van: "Van",
  İstanbul: "İstanbul",
  Eskişehir: "Eskişehir",
};

function buildRegions(): ServiceRegion[] {
  const byProvince = new Map<
    string,
    { locations: Set<string>; labels: string[] }
  >();

  for (const ref of references) {
    if (!ref.location) continue;
    const province = LOCATION_TO_PROVINCE[ref.location];
    if (!province || !PROVINCE_META[province]) continue;
    let bucket = byProvince.get(province);
    if (!bucket) {
      bucket = { locations: new Set(), labels: [] };
      byProvince.set(province, bucket);
    }
    bucket.locations.add(ref.location);
    const label = displayCompany(ref);
    if (label && !bucket.labels.includes(label)) bucket.labels.push(label);
  }

  const regions: ServiceRegion[] = [];
  for (const [province, meta] of Object.entries(PROVINCE_META)) {
    const bucket = byProvince.get(province);
    if (!bucket || bucket.locations.size === 0) continue;
    const locations = [...bucket.locations].sort((a, b) => a.localeCompare(b, "tr"));
    const projectCount = references.filter(
      (r) => r.location && LOCATION_TO_PROVINCE[r.location] === province,
    ).length;
    const hqNote = meta.isHq
      ? " Merkez ofisimiz Gaziosmanpaşa'dadır (Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245)."
      : " Merkezimiz İstanbul Gaziosmanpaşa'dadır; proje keşfi ve montajı bu ile de yürütülür.";

    regions.push({
      slug: meta.slug,
      name: province,
      locative: meta.locative,
      isHq: Boolean(meta.isHq),
      locations,
      projectLabels: bucket.labels.slice(0, 8),
      projectCount,
      title: `${province} LED Ekran Satış, Montaj ve Servis | ARLEDSCREEN`,
      description: `${province} LED ekran: NXTIONSTAR paneller, keşif, montaj ve teknik servis. ARLEDSCREEN — İstanbul merkezli, kayıtlı proje referanslarıyla.`,
      h1: `${province} LED ekran satış, montaj ve teknik servis`,
      intro: `${meta.locative} iç ve dış mekân LED ekran satışı, keşif, montaj, devreye alma ve teknik servis sunuyoruz.${hqNote} Tem 2025 – Tem 2026 proje kayıtlarında bu il için ${projectCount} kayıtlı uygulama yer alır. Nihai fiyat keşif ve yazılı teklifle kesinleşir.`,
    });
  }

  // HQ / commercial priority first, then alphabetical
  const priority = ["istanbul", "antalya", "bursa", "izmir", "eskisehir"];
  return regions.sort((a, b) => {
    const ai = priority.indexOf(a.slug);
    const bi = priority.indexOf(b.slug);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return a.name.localeCompare(b.name, "tr");
  });
}

export const SERVICE_REGIONS: ServiceRegion[] = buildRegions();

export function getServiceRegion(slug: string): ServiceRegion | undefined {
  return SERVICE_REGIONS.find((r) => r.slug === slug);
}

export function serviceRegionPath(slug: string): string {
  return `/tr/bolgeler/${slug}/`;
}

export function serviceRegionsHubSummary() {
  const stats = getReferenceStats();
  return {
    provinceCount: stats.provinceCount,
    provinces: stats.provinces,
    countries: stats.countries,
    totalProjects: stats.total,
  };
}
