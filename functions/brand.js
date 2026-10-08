/**
 * Exact-path invent alias for /brand.
 *
 * out/brand/ is a static asset directory, so an extensionless brand file cannot
 * be written there and Cloudflare Pages _redirects 200 rewrites lose to the
 * directory 404. Serve brand.json via this Function; /brand/* assets stay on
 * the unlimited static path (not listed in _routes.json include).
 */
export async function onRequest(context) {
  const assetUrl = new URL("/brand.json", context.request.url);
  const res = await context.env.ASSETS.fetch(assetUrl);
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "brand.json missing", status: res.status }), {
      status: 502,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
  const headers = new Headers(res.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "public, max-age=3600");
  headers.set("access-control-allow-origin", "*");
  headers.set("cross-origin-resource-policy", "cross-origin");
  return new Response(res.body, { status: 200, headers });
}
