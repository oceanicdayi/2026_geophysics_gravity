/** Course constants for the 1967 International Gravity Formula and slab corrections. */

export const EQUATOR_MGAL = 978_031.85;
export const G_SI = 6.6743e-11;
export const FAC_PER_METRE = 0.308;
export const BOUGUER_FACTOR = 0.0419;
export const CRUST_DENSITY = 2.67;
export const SEAWATER_DENSITY = 1.03;

function square(value: number): number {
  return value * value;
}

export function theoreticalGravity(phiDeg: number): number {
  const phi = (phiDeg * Math.PI) / 180;
  const s2 = square(Math.sin(phi));
  const s4 = square(s2);
  return EQUATOR_MGAL * (1 + 0.005278895 * s2 + 0.000023462 * s4);
}

/** Free-air correction in mGal. Positive; it is added to a high station. */
export function freeAirCorrection(heightMetres: number): number {
  return heightMetres * FAC_PER_METRE;
}

/** Land Bouguer slab in mGal. Density is g/cm³, height is metres. */
export function bouguerCorrection(heightMetres: number, densityGcm3: number): number {
  return BOUGUER_FACTOR * densityGcm3 * heightMetres;
}

/**
 * Marine Bouguer term 0.0419 (ρw − ρc) hw.
 * Negative for ordinary seawater, because water is lighter than the crustal slab.
 */
export function seaBouguer(
  waterDepthMetres: number,
  rhoWater = SEAWATER_DENSITY,
  rhoCrust = CRUST_DENSITY,
): number {
  return BOUGUER_FACTOR * (rhoWater - rhoCrust) * waterDepthMetres;
}

/** Vertical attraction of a buried sphere, in mGal. Positive density contrast pulls downward. */
export function sphereAnomalyMgal(
  horizontalMetres: number,
  depthMetres: number,
  radiusMetres: number,
  deltaRhoKgM3: number,
): number {
  if (depthMetres <= 0 || radiusMetres <= 0) return 0;
  const volume = (4 / 3) * Math.PI * radiusMetres * radiusMetres * radiusMetres;
  const mass = volume * deltaRhoKgM3;
  const r2 = square(horizontalMetres) + square(depthMetres);
  const gz = (G_SI * mass * depthMetres) / (r2 * Math.sqrt(r2));
  return gz * 1e5;
}

export function lessonTraverseMgal(xMetres: number): number {
  return (
    sphereAnomalyMgal(xMetres - 280, 220, 140, 1800) +
    sphereAnomalyMgal(xMetres - 730, 180, 110, -2300)
  );
}

export function profileTerrain(xKm: number): number {
  return (
    30 +
    610 * Math.exp(-square((xKm - 33) / 9)) +
    230 * Math.exp(-square((xKm - 55) / 12))
  );
}

export const PROFILE_ORE_X_KM = 76;

export function profileBuried(xKm: number): number {
  const dx = (xKm - PROFILE_ORE_X_KM) * 1000;
  return sphereAnomalyMgal(dx, 1800, 1500, 400);
}

export function profileFreeAir(xKm: number, rhoTrue = CRUST_DENSITY): number {
  return bouguerCorrection(profileTerrain(xKm), rhoTrue) + profileBuried(xKm);
}

export function profileBouguer(
  xKm: number,
  rhoAssumed: number,
  rhoTrue = CRUST_DENSITY,
): number {
  return (
    bouguerCorrection(profileTerrain(xKm), rhoTrue) -
    bouguerCorrection(profileTerrain(xKm), rhoAssumed) +
    profileBuried(xKm)
  );
}

export type StationMode = "land" | "sea";

export type AnomalyParts = {
  gt: number;
  fac: number;
  bc: number;
  fa: number;
  boug: number;
};

export function anomaliesFromObservation(input: {
  gObs: number;
  phiDeg: number;
  height: number;
  density: number;
  mode: StationMode;
  waterDepth: number;
}): AnomalyParts {
  const gt = theoreticalGravity(input.phiDeg);
  const fac = freeAirCorrection(input.height);
  const fa = input.gObs - gt + fac;
  const bc =
    input.mode === "sea"
      ? seaBouguer(input.waterDepth)
      : bouguerCorrection(input.height, input.density);
  return { gt, fac, bc, fa, boug: fa - bc };
}

/** Invert a chosen Bouguer anomaly back to the g a student would have read. */
export function observationFromBouguer(input: {
  boug: number;
  phiDeg: number;
  height: number;
  density: number;
  mode: StationMode;
  waterDepth: number;
}): number {
  const gt = theoreticalGravity(input.phiDeg);
  const fac = freeAirCorrection(input.height);
  const bc =
    input.mode === "sea"
      ? seaBouguer(input.waterDepth)
      : bouguerCorrection(input.height, input.density);
  return input.boug + gt - fac + bc;
}

export function formatMgal(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: true,
  });
}

export type AnomalyKind = "high" | "low" | "quiet";

export function classifyAnomaly(bouguerMgal: number): AnomalyKind {
  if (bouguerMgal >= 2) return "high";
  if (bouguerMgal <= -2) return "low";
  return "quiet";
}

export function freeAirDominates(freeAir: number, bouguer: number): boolean {
  return Math.abs(freeAir) > Math.abs(bouguer) + 5 && Math.abs(freeAir) > 8;
}
