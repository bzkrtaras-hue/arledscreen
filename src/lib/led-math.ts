export type CabinetMode = "500x500" | "500x1000";

export type PitchOption =
  | 1.25
  | 1.5
  | 1.8
  | 2.5
  | 3.9
  | 4.8
  | 6
  | 10;

export const PITCH_OPTIONS: readonly PitchOption[] = [
  1.25, 1.5, 1.8, 2.5, 3.9, 4.8, 6, 10,
] as const;

export interface CabinetDimsMm {
  widthMm: number;
  heightMm: number;
}

export function cabinetDimensions(mode: CabinetMode): CabinetDimsMm {
  if (mode === "500x500") {
    return { widthMm: 500, heightMm: 500 };
  }
  return { widthMm: 500, heightMm: 1000 };
}

/** Resolution in pixels for a wall of given size and pitch. */
export function calculateResolution(
  widthM: number,
  heightM: number,
  pitchMm: number,
): { widthPx: number; heightPx: number } {
  const pitchM = pitchMm / 1000;
  return {
    widthPx: Math.round(widthM / pitchM),
    heightPx: Math.round(heightM / pitchM),
  };
}

export function calculateAspectRatio(widthM: number, heightM: number): string {
  if (heightM <= 0) return "—";
  const gcd = (a: number, b: number): number =>
    b < 0.0001 ? a : gcd(b, a % b);
  const w = Math.round(widthM * 100);
  const h = Math.round(heightM * 100);
  const d = gcd(w, h) || 1;
  return `${Math.round(w / d)}:${Math.round(h / d)}`;
}

/**
 * Optimal viewing distance rule of thumb:
 * pitch_mm * 1000 * factor → meters (factor defaults to 0.001 → pitch_mm meters,
 * commonly ~1m per mm of pitch; we use a tunable factor for B2B guidance).
 */
export function calculateOptimalViewingDistance(
  pitchMm: number,
  factor = 1,
): number {
  return Number((pitchMm * factor).toFixed(2));
}

export function calculateCabinetCount(
  widthM: number,
  heightM: number,
  mode: CabinetMode,
): { columns: number; rows: number; total: number } {
  const { widthMm, heightMm } = cabinetDimensions(mode);
  const columns = Math.ceil((widthM * 1000) / widthMm);
  const rows = Math.ceil((heightM * 1000) / heightMm);
  return { columns, rows, total: columns * rows };
}

export interface WallMetrics {
  widthPx: number;
  heightPx: number;
  aspectRatio: string;
  viewingDistanceM: number;
  cabinets: { columns: number; rows: number; total: number };
  areaM2: number;
}

export function calculateWallMetrics(
  widthM: number,
  heightM: number,
  pitchMm: number,
  mode: CabinetMode,
): WallMetrics {
  const resolution = calculateResolution(widthM, heightM, pitchMm);
  return {
    ...resolution,
    aspectRatio: calculateAspectRatio(widthM, heightM),
    viewingDistanceM: calculateOptimalViewingDistance(pitchMm),
    cabinets: calculateCabinetCount(widthM, heightM, mode),
    areaM2: Number((widthM * heightM).toFixed(2)),
  };
}

export type Environment = "indoor" | "outdoor";

export interface PowerEstimate {
  areaM2: number;
  maxKw: number;
  avgKw: number;
  breakerAmps3Phase: number;
  signalNote: string;
  rstNote: string;
}

/** Rough power density: indoor ~0.45 kW/m² peak, outdoor ~0.75 kW/m² peak. */
export function estimatePowerInfrastructure(
  areaM2: number,
  environment: Environment,
): PowerEstimate {
  const peakDensity = environment === "outdoor" ? 0.75 : 0.45;
  const avgFactor = 0.35;
  const maxKw = Number((areaM2 * peakDensity).toFixed(2));
  const avgKw = Number((maxKw * avgFactor).toFixed(2));
  // 3-phase 400V: I = P / (√3 * V * pf), pf≈0.9
  const breakerAmps3Phase = Math.ceil(
    (maxKw * 1000) / (Math.sqrt(3) * 400 * 0.9),
  );
  return {
    areaM2,
    maxKw,
    avgKw,
    breakerAmps3Phase,
    signalNote:
      environment === "outdoor"
        ? "Prefer multimode/single-mode fiber beyond 80 m; CAT6A up to ~70 m with shielded runs."
        : "CAT6/CAT6A for runs ≤70 m; fiber recommended for backbone / multi-receiver topologies.",
    rstNote:
      "Balance R-S-T phases across power cabinets; isolate LED load from AV control UPS where possible.",
  };
}
