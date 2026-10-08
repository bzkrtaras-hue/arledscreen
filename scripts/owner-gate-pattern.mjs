/**
 * Owner-only / internal gate surfaces (Point C, owner-next, geo-next, geo-status,
 * owner-p0, tur1a). These are private owner tooling and must never ship to the
 * public site or be referenced from any public discovery file (privacy: they
 * carried a personal (gmail) mailbox, registrar contact and internal plans).
 */

/** Any reference to an owner/internal gate surface or a personal (gmail) mailbox. */
export const OWNER_GATE_RE =
  /owner-next|owner-gate|owner-p0|point-c|tur1a|geo-next|geo-status|geo:next|geo:ack|[a-z0-9._%+-]+@gmail\.com|\bPoint C\b|\bowner next\b|\bnpm run\b/i;

/** Owner "Open:" / "OpenAlt:" tab pointers (case-sensitive; not owner-*-open social handles). */
export const OWNER_OPEN_RE = /(?<![\w-])(?:Open|OpenAlt\d*)(?: \([^)]*\))?:\s*https?:\/\//;

export function mentionsOwnerGate(s) {
  return OWNER_GATE_RE.test(s) || OWNER_OPEN_RE.test(s);
}

/** Strict pattern for the final build gate (URLs, file names, personal mailbox). */
export const OWNER_GATE_STRICT_RE =
  /owner-next|owner-gate|owner-p0|point-c|tur1a|geo-next|geo-status|[a-z0-9._%+-]+@gmail\.com/i;

/** File / directory basenames that are owner gate surfaces. */
export const OWNER_GATE_FILE_RE =
  /^(owner-next|owner-p0|owner-gate|geo-next|geo-status|point-c|point-c-en|point-c-progress|tur1a)(\.[a-z0-9]+)?$/i;

/** JSON object keys that only exist to point at owner gate surfaces. */
export function isOwnerGateKey(key) {
  const k = String(key).replace(/[-_]/g, "").toLowerCase();
  return ["pointc", "ownernext", "ownergate", "ownerp0", "geonext", "geostatus", "tur1a", "ownerfriction"].some(
    (p) => k.startsWith(p),
  );
}
