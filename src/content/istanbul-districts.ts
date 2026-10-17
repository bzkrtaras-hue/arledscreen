/**
 * Istanbul district landings for local GEO.
 * Only districts that appear in published references — no invented pages.
 */

export interface DistrictProject {
  date: string;
  label: string;
  detail: string;
}

export interface IstanbulDistrict {
  slug: string;
  name: string;
  locative: string;
  projects: DistrictProject[];
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export const ISTANBUL_DISTRICTS: IstanbulDistrict[] = [
  {
    slug: "kadikoy",
    name: "Kadıköy",
    locative: "Kadıköy'de",
    projects: [
      { date: "May 2026", label: "Matiz Sahne", detail: "256×128 cm dış mekân" },
    ],
    title: "Kadıköy LED Ekran Satış, Montaj ve Kiralama | ARLEDSCREEN",
    description:
      "Kadıköy LED ekran: sahne, kafe ve etkinlik kurulumları. Matiz Sahne projesi. Gaziosmanpaşa merkezden keşif ve montaj.",
    h1: "Kadıköy LED ekran satış, montaj ve teknik servis",
    intro:
      "Kadıköy'de tamamladığımız proje: Matiz Sahne (May 2026, 256×128 cm dış mekân). Sahne, kafe ve etkinlik LED ekranları için keşif ve montaj Gaziosmanpaşa merkez ofisten planlanır. Nihai fiyat keşif ve yazılı teklifle kesinleşir.",
  },
  {
    slug: "beylikduzu",
    name: "Beylikdüzü",
    locative: "Beylikdüzü'nde",
    projects: [
      { date: "Şub 2026", label: "Beylikdüzü Yaşam Cafe", detail: "640×128 cm dış mekân" },
      { date: "Ara 2025", label: "Beylikdüzü Belediyesi", detail: "Dev LED ekran" },
    ],
    title: "Beylikdüzü LED Ekran Montaj ve Servis | ARLEDSCREEN",
    description:
      "Beylikdüzü LED ekran: Yaşam Cafe ve Belediye projeleri. İç/dış mekân kurulum ve teknik servis.",
    h1: "Beylikdüzü LED ekran satış, montaj ve teknik servis",
    intro:
      "Beylikdüzü'nde tamamladığımız projeler: Yaşam Cafe (Şub 2026, 640×128 cm dış mekân) ve Beylikdüzü Belediyesi (Ara 2025, dev LED ekran). Keşif ve montaj Gaziosmanpaşa merkezden koordine edilir.",
  },
  {
    slug: "merter",
    name: "Merter",
    locative: "Merter'de",
    projects: [
      { date: "Şub 2026", label: "Gnd Triko", detail: "128×192 cm P2.5 Premium" },
    ],
    title: "Merter LED Ekran (Mağaza / Vitrin) | ARLEDSCREEN",
    description:
      "Merter LED ekran: Gnd Triko vitrin projesi. Perakende ve ofis kurulumları için keşif.",
    h1: "Merter LED ekran satış ve montaj",
    intro:
      "Merter'de tamamladığımız proje: Gnd Triko (Şub 2026, 128×192 cm P2.5 Premium). Mağaza ve vitrin LED ekranları için keşif talebi alıyoruz.",
  },
  {
    slug: "osmanbey",
    name: "Osmanbey",
    locative: "Osmanbey'de",
    projects: [
      { date: "Kas 2025", label: "Prestij Cafe", detail: "96×192 cm P3 Premium" },
    ],
    title: "Osmanbey LED Ekran (Kafe / Perakende) | ARLEDSCREEN",
    description:
      "Osmanbey LED ekran: Prestij Cafe projesi. Kafe ve mağaza kurulumları.",
    h1: "Osmanbey LED ekran satış ve montaj",
    intro:
      "Osmanbey'de tamamladığımız proje: Prestij Cafe (Kas 2025, 96×192 cm P3 Premium). Kafe ve perakende LED ekranları için keşif ve montaj planlanır.",
  },
  {
    slug: "yesilpinar",
    name: "Yeşilpınar",
    locative: "Yeşilpınar'da",
    projects: [
      { date: "Oca 2026", label: "Ercan Et / Aslantürk", detail: "Yeşilpınar şube" },
    ],
    title: "Yeşilpınar LED Ekran | ARLEDSCREEN",
    description: "Yeşilpınar LED ekran: Ercan Et şube projesi. Gaziosmanpaşa merkezden hizmet.",
    h1: "Yeşilpınar LED ekran satış ve montaj",
    intro:
      "Yeşilpınar'da tamamladığımız proje: Ercan Et / Aslantürk (Oca 2026). Keşif ve montaj Gaziosmanpaşa merkez ofisten yürütülür.",
  },
];

export function getIstanbulDistrict(slug: string): IstanbulDistrict | undefined {
  return ISTANBUL_DISTRICTS.find((d) => d.slug === slug);
}

export function istanbulDistrictPath(slug: string): string {
  return `/tr/bolgeler/istanbul/${slug}/`;
}
