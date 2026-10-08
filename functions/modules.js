/**
 * Exact-path invent alias for /modules.
 *
 * out/modules/ is a product-image asset directory, so an extensionless modules
 * file cannot be written there and Cloudflare Pages _redirects 200 rewrites
 * lose to the directory 404. Serve modules.json via this Function; /modules/*
 * assets stay on the unlimited static path (not listed in _routes.json include).
 */
export async function onRequest(context) {
  const assetUrl = new URL("/modules.json", context.request.url);
  const res = await context.env.ASSETS.fetch(assetUrl);
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "modules.json missing", status: res.status }), {
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
