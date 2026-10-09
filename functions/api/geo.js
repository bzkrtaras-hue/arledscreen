/**
 * Melis sohbet penceresi için ziyaretçi ülkesi (yalnızca ülke kodu, IP veya başka veri dönmez).
 * Cloudflare her isteğe request.cf.country / CF-IPCountry ekler; ek ücret veya üçüncü taraf yok.
 * Yalnızca /api/geo yolunda çalışır (public/_routes.json); sitenin geri kalanı statik kalır.
 */
export async function onRequest(context) {
  const req = context.request;
  if (req.method !== "GET" && req.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
  }
  const raw = (req.cf && req.cf.country) || req.headers.get("cf-ipcountry") || "";
  const country = /^[A-Z]{2}$/.test(raw) && raw !== "XX" && raw !== "T1" ? raw : "";
  return new Response(JSON.stringify({ country }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex",
    },
  });
}
