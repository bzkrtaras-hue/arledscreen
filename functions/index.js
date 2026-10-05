/**
 * Apex `/` only (file-based route). Forces an absolute permanent redirect to
 * the Turkish canonical home. Do not serve HTML here — never 200/404 at root.
 *
 * Scoped via public/_routes.json so /tr/ and other static assets stay on the
 * unlimited static path and keep using public/_redirects for legacy URLs.
 */
const CANONICAL_TR_HOME = "https://arledscreen.com/tr/";

export async function onRequest(context) {
  const incoming = new URL(context.request.url);
  const dest = new URL(CANONICAL_TR_HOME);
  dest.search = incoming.search;
  return Response.redirect(dest.toString(), 301);
}
