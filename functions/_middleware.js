/**
 * Owner-gate privacy guard (ARL-20261009-020).
 *
 * Old deployments (PR #60 era) shipped private owner tooling files
 * (owner-p0.json, geo-status.json, point-c*.txt/json/csv, owner-next*, geo-next*,
 * tur1a*) that carried the owner's personal mailbox. They are no longer in the
 * build (scripts/strip-owner-gate.mjs + validate-no-owner-gate.mjs), but the
 * Cloudflare Pages edge kept serving stale cached copies of those deleted assets
 * on the production hostnames (arledscreen.com, arledscreen.pages.dev) even
 * after new deployments and a zone Custom Purge.
 *
 * public/_routes.json routes exactly these paths to Functions, so the static
 * asset server (and its cache) is never consulted for them: they always answer
 * 410 Gone, uncached. Every other Function route falls through untouched.
 */
export const OWNER_GATE_PATH_RE =
  /^\/(?:\.well-known\/|feeds\/)?(?:owner-next|owner-p0|owner-gate|geo-next|geo-status|point-c|point-c-en|point-c-progress|tur1a)(?:\.[a-z0-9]+)?\/?$/i;

export function ownerGateGone() {
  return new Response("410 Gone\n", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "cdn-cache-control": "no-store",
      "cloudflare-cdn-cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);
  if (OWNER_GATE_PATH_RE.test(pathname)) return ownerGateGone();
  return context.next();
}
