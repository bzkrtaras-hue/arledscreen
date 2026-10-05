import { references, type Reference } from "@/content/references";
import { displayCompany, getReferenceStats } from "@/content/trust";

/**
 * Service-area (iller) landings for local SEO.
 * Only provinces that appear in the owner reference sheet — no invented cities
 * or “81 il” claims. Content is derived from published project locations.
 */

export interface RegionProject {
  date: string;
  label: string;
  detail: string;
  location: string;
}

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
  /** Published projects for this province only (date, size/P, district) */
  projects: RegionProject[];
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

function refsForProvince(province: string): Reference[] {
  return references.filter(
    (r) => r.location && LOCATION_TO_PROVINCE[r.location] === province,
  );
}

function buildIntro(province: string, meta: { locative: string; isHq?: boolean }, projects: RegionProject[]): string {
  const count = projects.length;
  const sample = projects
    .slice(0, 3)
    .map((p) => {
      const bits = [p.date, p.location, p.detail].filter(Boolean);
      return bits.join(" · ");
    })
    .join("; ");

  if (meta.isHq) {
    return `${meta.locative} LED ekran satışı, keşif, montaj ve teknik servis Gaziosmanpaşa merkez ofisten yürütülür (Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245). Tem 2025 – Tem 2026 kayıtlarında bu il için ${count} yayımlanmış uygulama vardır${sample ? `: ${sample}` : ""}. Nihai fiyat keşif ve yazılı teklifle kesinleşir.`;
  }

  return `${meta.locative} yayımlanmış ${count} proje kaydı vardır${sample ? ` (${sample})` : ""}. Keşif ve montaj İstanbul Gaziosmanpaşa merkezden planlanır; bu sayfada yalnızca ${province} kayıtları listelenir. Nihai fiyat keşif ve yazılı teklifle kesinleşir.`;
}

function buildRegions(): ServiceRegion[] {
  const regions: ServiceRegion[] = [];
  for (const [province, meta] of Object.entries(PROVINCE_META)) {
    const refs = refsForProvince(province);
    if (!refs.length) continue;

    const locations = [...new Set(refs.map((r) => r.location))].sort((a, b) =>
      a.localeCompare(b, "tr"),
    );
    const projects: RegionProject[] = refs.map((r) => ({
      date: r.date,
      label: displayCompany(r),
      detail: r.detail,
      location: r.location,
    }));
    const labels = [...new Set(projects.map((p) => p.label))];

    regions.push({
      slug: meta.slug,
      name: province,
      locative: meta.locative,
      isHq: Boolean(meta.isHq),
      locations,
      projectLabels: labels.slice(0, 12),
      projects,
      projectCount: projects.length,
      title: `${province} LED Ekran Satış, Montaj ve Servis | ARLEDSCREEN`,
      description: `${province} LED ekran: keşif, montaj ve teknik servis. Kayıtlı konumlar: ${locations.join(", ")}. ARLEDSCREEN — İstanbul Gaziosmanpaşa merkezli.`,
      h1: `${province} LED ekran satış, montaj ve teknik servis`,
      intro: buildIntro(province, meta, projects),
    });
  }

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
