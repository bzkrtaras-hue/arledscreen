/**
 * ARLEDSCREEN — teklif formu bildirimi (/api/lead, Cloudflare Pages Functions).
 * Form gönderiminde talebi arled@arledscreen.com adresine e-posta olarak iletir.
 * Servis: Cloudflare Email Service — Workers "send_email" binding (cloudflare:email EmailMessage).
 * DİKKAT: arledscreen.com MX kayıtları Google Workspace (aspmx.l.google.com). Email Routing'i
 * açmak MX'i değiştirir — YAPMAYIN. Yalnızca gönderim (Email Service / sending) etkinleştirilmeli;
 * bu SPF/DKIM DNS kayıtları ekler, MX'e dokunmaz.
 * Gereken yapılandırma (repoda sır yok):
 *   - Cloudflare → arledscreen.com → Email Service: gönderim için alan adını doğrula (SPF/DKIM).
 *   - Pages projesi → Settings → Bindings → "Send email": ad = LEAD_EMAIL
 *     (isteğe bağlı destination_address = arled@arledscreen.com).
 *   - Ortam değişkeni LEAD_FROM = ör. form@arledscreen.com.
 * Binding yoksa 202 + note:"email_not_configured" döner; istemci WhatsApp/e-postayı yine açar.
 */
const TO = "arled@arledscreen.com";
const MAX = 2000;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const clean = (v, n) => String(v ?? "").replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ").trim().slice(0, n);
const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));

export async function onRequestPost({ request, env }) {
  let d = {};
  try { d = await request.json(); } catch { d = {}; }
  if (d.website) return json({ ok: true }); // honeypot
  const message = clean(d.message, MAX);
  if (message.length < 10) return json({ ok: false, error: "empty" }, 400);
  const locale = clean(d.locale, 5) || "tr";
  const via = clean(d.via, 10);

  // Gizlilik: IP adresi okunmaz, loglanmaz, saklanmaz.
  const from = (env && env.LEAD_FROM) || "";
  if (!env || !env.LEAD_EMAIL || !from) return json({ ok: false, note: "email_not_configured" }, 202);

  try {
    const { EmailMessage } = await import("cloudflare:email");
    const subject = `Web teklif formu (${locale.toUpperCase()}, ${via || "form"}) — ${clean(d.name, 80)}`;
    const raw = [
      `From: ARLEDSCREEN Web <${from}>`,
      `To: ${TO}`,
      `Subject: =?UTF-8?B?${b64(subject)}?=`,
      `Message-ID: <${crypto.randomUUID()}@arledscreen.com>`,
      `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      b64(`${message}\n\n— arledscreen.com/${locale}/quote/ · ${new Date().toISOString()}`).replace(/.{76}/g, "$&\r\n"),
    ].join("\r\n");
    await env.LEAD_EMAIL.send(new EmailMessage(from, TO, raw));
    return json({ ok: true });
  } catch (e) {
    console.log("lead email error", String(e && e.message));
    return json({ ok: false, note: "send_failed" }, 502);
  }
}
