import { references, type Reference } from "@/content/references";

/**
 * Trust facts derived ONLY from data present in the codebase
 * (owner-provided "Referanslar" sheet in content/references.ts) or
 * owner-confirmed business facts. No invented numbers.
 */

/** Map a free-text reference location to a Turkish province or a country. */
const LOCATION_TO_REGION: Record<string, string> = {
  Giresun: "Giresun",
  Aksaray: "Aksaray",
  Manisa: "Manisa",
  "Kadıköy / İstanbul": "İstanbul",
  Niğde: "Niğde",
  "Beylikdüzü / İstanbul": "İstanbul",
  "Merter / İstanbul": "İstanbul",
  "Yeşilpınar / İstanbul": "İstanbul",
  Alanya: "Antalya",
  "Berlin / Almanya": "Almanya",
  Yalova: "Yalova",
  "Atatürk Havalimanı": "İstanbul",
  Bursa: "Bursa",
  Keşan: "Edirne",
  "Osmanbey / İstanbul": "İstanbul",
  Azerbaycan: "Azerbaycan",
  "Dikili / İzmir": "İzmir",
  Yozgat: "Yozgat",
  Van: "Van",
  İstanbul: "İstanbul",
  Eskişehir: "Eskişehir",
};
const COUNTRIES = new Set(["Almanya", "Azerbaycan"]);

export function getReferenceStats() {
  const regions = new Set<string>();
  for (const r of references) {
    const region = LOCATION_TO_REGION[r.location];
    if (region) regions.add(region);
  }
  const countries = [...regions].filter((r) => COUNTRIES.has(r));
  const provinces = [...regions].filter((r) => !COUNTRIES.has(r));
  return {
    total: references.length,
    firstDate: references[references.length - 1]?.date ?? "",
    lastDate: references[0]?.date ?? "",
    provinceCount: provinces.length,
    provinces: provinces.sort((a, b) => a.localeCompare(b, "tr")),
    countries,
  };
}

/** Entries that name a private individual — shown anonymised for privacy (KVKK). */
const PRIVATE_PERSON_IDS = new Set(["ref-09", "ref-24", "ref-41", "ref-43"]);

/** Generic project labels in the log that should read in EN on /en/ (proper names stay). */
const COMPANY_LABEL_EN: Record<string, string> = {
  "Bireysel müşteri": "Private client",
  "Bar üstü proje": "Above-bar project",
  "Giresun Proje": "Giresun project",
  "Manisa Proje": "Manisa project",
  "Manisa (2 adet)": "Manisa (2 units)",
  "480×160 cm proje": "480×160 cm project",
  "Azerbaycan Düğün Salonu": "Wedding hall, Azerbaijan",
  Azerbaycan: "Azerbaijan",
};

/** EN label for a project/company or location string from the log (unchanged on TR). */
export function enProjectLabel(label: string, locale: "tr" | "en" = "en"): string {
  if (locale !== "en" || !label) return label;
  return COMPANY_LABEL_EN[label] ?? label;
}

export function displayCompany(ref: Reference, locale: "tr" | "en" = "tr"): string {
  if (PRIVATE_PERSON_IDS.has(ref.id)) {
    return locale === "en" ? "Private client" : "Bireysel müşteri";
  }
  if (locale === "en") return enProjectLabel(ref.company);
  return ref.company;
}

/** Parse "384×160 cm" style sizes → m² (first dimension pair only). */
export function areaFromDetail(detail: string): number | null {
  const m = detail.match(/(\d{2,4})\s*[×x]\s*(\d{2,4})\s*cm/);
  if (!m) return null;
  return (Number(m[1]) * Number(m[2])) / 10000;
}

export interface CaseStudy {
  refId: string;
  title: string;
  sector: string;
  location: string;
  date: string;
  scope: string;
  pitch?: string;
  environment?: string;
  areaM2?: number;
  image?: { src: string; alt: string };
}

function pitchOf(detail: string): string | undefined {
  const m = detail.match(/P\d+(?:\.\d+)?/);
  return m ? m[0] : undefined;
}

/**
 * Case-study cards built from the reference sheet. Sector labels are inferred
 * only from the organisation name (e.g. "Belediyesi" → Kamu / belediye).
 * Only the Ünye photo is attached because its file name matches the record.
 */
const CASE_IDS: { id: string; sector: string; environment?: string; image?: CaseStudy["image"] }[] = [
  { id: "ref-05", sector: "Kamu / belediye" },
  {
    id: "ref-26",
    sector: "Kamu / etkinlik",
    image: { src: "/projects/unye.jpg", alt: "Ünye Belediyesi Ordu Günleri LED ekran kurulumu" },
  },
  { id: "ref-27", sector: "Dış mekân", environment: "Dış mekân" },
  { id: "ref-33", sector: "Kafe / lounge" },
  { id: "ref-25", sector: "Ticari işletme" },
  { id: "ref-15", sector: "Tekstil / mağaza" },
];

export function getCaseStudies(): CaseStudy[] {
  return CASE_IDS.flatMap(({ id, sector, environment, image }) => {
    const ref = references.find((r) => r.id === id);
    if (!ref) return [];
    const env =
      environment ?? (/dış mekân/i.test(ref.detail) ? "Dış mekân" : undefined);
    const area = areaFromDetail(ref.detail);
    return [
      {
        refId: ref.id,
        title: displayCompany(ref),
        sector,
        location: ref.id === "ref-26" ? "İstanbul · Ordu Günleri" : ref.location,
        date: ref.date,
        scope: ref.detail,
        pitch: pitchOf(ref.detail),
        environment: env,
        areaM2: area ? Math.round(area * 10) / 10 : undefined,
        image,
      },
    ];
  });
}
