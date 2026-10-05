/**
 * Canonical NXTIONSTAR / ARLEDSCREEN product lineup (locked 2026-10-04).
 * All public copy (llms, categories tags, guides) must match this list.
 * Do not invent pitches, warranty years, or “81 cities” claims.
 */
export const CANONICAL_LINEUP = {
  outdoor: {
    label: "Dış mekân LED ekran",
    pitches: ["P2.5", "P2.9", "P3.07", "P4", "P4 önden servis", "P5", "P8"] as const,
    href: "/tr/products/dis-mekan-led-ekran/",
  },
  indoor: {
    label: "İç mekân LED ekran",
    pitches: ["P1.25", "P2.5", "P3.07", "P4"] as const,
    href: "/tr/products/ic-mekan-led-ekran/",
    note: "P1.25 iç mekân seçeneği GOB yüzeyli model olarak da sunulur.",
  },
  gob: {
    label: "GOB LED ekran",
    pitches: ["P1.25", "P1.53", "P1.86"] as const,
    href: "/tr/products/gob-led-ekran/",
  },
  finePitch: {
    label: "İnce pitch LED ekran",
    pitches: ["P0.9", "P1.25"] as const,
    href: "/tr/products/ince-pitch-led-ekran/",
    note: "P0.9 teknik föy talep üzerine; panel fiyatı hesaplayıcıda yayımlanmamış olabilir.",
  },
  flexible: {
    label: "Esnek LED ekran",
    pitches: ["P1.86", "P2.5"] as const,
    href: "/tr/products/esnek-led-ekran/",
  },
  otherGroups: [
    { label: "Şeffaf LED ekran", href: "/tr/products/seffaf-led-ekran/" },
    { label: "Kiralık LED ekran", href: "/tr/products/kiralik-led-ekran/" },
    { label: "Poster / totem LED ekran", href: "/tr/products/poster-led-ekran/" },
    { label: "Menuboard (kafe / restoran dikey içerik)", href: "/tr/rehber/vitrin-led-ekran/" },
    { label: "Kiosk dijital ekran", href: "/tr/rehber/kiosk-dijital-ekran/" },
    { label: "Dijital ekran (üst küme tanımı)", href: "/tr/rehber/led-tabela-mi-led-ekran-mi/" },
    { label: "LED modül ve kontrol sistemleri", href: "/tr/products/led-modul-ve-kontrol-sistemleri/" },
    { label: "Huidu kontrol kartları", href: "/tr/products/huidu-kontrol-kartlari/" },
    { label: "NovaStar kontrolcüler", href: "/tr/products/novastar-kontrolculer/" },
    { label: "Colorlight kontrolcüler", href: "/tr/products/colorlight-kontrolculer/" },
  ] as const,
} as const;

/** Project-record geography — never claim “81 cities”. */
export const SERVICE_GEOGRAPHY =
  "Merkez İstanbul Gaziosmanpaşa'dadır. Tem 2025 – Tem 2026 proje kayıtlarında 13 il ile Almanya ve Azerbaycan yer alır; Türkiye geneli proje yürütülür.";

export function lineupMarkdownTable(): string {
  const rows = [
    ["Dış mekân", CANONICAL_LINEUP.outdoor.pitches.join(", "), CANONICAL_LINEUP.outdoor.href],
    ["İç mekân", CANONICAL_LINEUP.indoor.pitches.join(", "), CANONICAL_LINEUP.indoor.href],
    ["GOB", CANONICAL_LINEUP.gob.pitches.join(", "), CANONICAL_LINEUP.gob.href],
    ["İnce pitch", CANONICAL_LINEUP.finePitch.pitches.join(", "), CANONICAL_LINEUP.finePitch.href],
    ["Esnek", CANONICAL_LINEUP.flexible.pitches.join(", "), CANONICAL_LINEUP.flexible.href],
  ];
  const head = "| Grup | Piksel aralıkları | Sayfa |\n| --- | --- | --- |";
  const body = rows
    .map(([g, p, h]) => `| ${g} | ${p} | [${g}](https://arledscreen.com${h}) |`)
    .join("\n");
  return `${head}\n${body}`;
}
