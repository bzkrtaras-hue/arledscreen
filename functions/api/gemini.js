/**
 * Gemini 4 Argon proxy for the AR-LED live advisor widget.
 *
 * The Gemini API key lives in the GEMINI_API_KEY environment variable
 * (set in Cloudflare Pages → Settings → Environment variables).
 * The browser never sees the key — it only calls this same-origin endpoint.
 *
 * POST /api/gemini  { "message": "..." }
 * GET  /api/gemini  → 405
 */

const GEMINI_URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-4-argon";

const SYSTEM_PROMPT = `Sen AR-LED Ekran Teknoloji Merkezi'nin uzman satış mühendisisin. Markamız NXTIONSTAR. Kural: 1 mm pixel pitch ≈ 1 metre minimum izleme mesafesi. P1.86 showroom/toplantı; P2.5 mağaza/lobi; P3.91 dış mekan IP65 (5500-8000 nit). 2 yıl ürün + 5 yıl teknik servis garantisi. Sonunda WhatsApp yönlendirmesi yap.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin",
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders },
  });
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const key = env.GEMINI_API_KEY;
  if (!key) {
    return json({ error: "GEMINI_API_KEY is not configured on the server" }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message) {
    return json({ error: "message is required" }, 400);
  }
  // Cheap abuse guard — widget messages are short.
  if (message.length > 2000) {
    return json({ error: "message too long" }, 400);
  }

  const upstream = await fetch(
    `${GEMINI_URL_BASE}/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT + "\nMüşteri: " + message }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 600,
        },
      }),
    }
  );

  let data;
  try {
    data = await upstream.json();
  } catch {
    return json({ error: "Upstream response was not JSON", status: upstream.status }, 502);
  }

  if (!upstream.ok) {
    return json(
      {
        error: "Gemini upstream error",
        status: upstream.status,
        detail: data?.error?.message || data,
      },
      502
    );
  }

  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Yanıt alınamadı.";
  return json({ reply });
}
