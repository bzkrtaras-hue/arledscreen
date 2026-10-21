/**
 * Lead analytics. Fires GA4 (gtag) / Meta Pixel (fbq) events ONLY if those
 * globals already exist on the page. No IDs or tags are installed here.
 */
type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;
type Fbq = (cmd: "track" | "trackCustom", name: string, params?: Record<string, unknown>) => void;

function send(gaEvent: string, fbEvent: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
  try {
    if (typeof w.gtag === "function") w.gtag("event", gaEvent, params);
  } catch {}
  try {
    if (typeof w.fbq === "function") w.fbq("track", fbEvent, params);
  } catch {}
}

/** WhatsApp link click (wa.me / api.whatsapp.com). */
export function trackWhatsappClick(locale: string, href: string) {
  send("whatsapp_click", "Contact", { method: "whatsapp", locale, link_url: href.split("?")[0] });
}

/** Contact/quote form submit (opens WhatsApp or the mail client). */
export function trackLead(method: "whatsapp" | "email", locale: string) {
  send("generate_lead", "Lead", { method, locale, form: "short_quote" });
}
