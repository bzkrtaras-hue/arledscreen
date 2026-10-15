/**
 * Melis — deterministic guards (pure functions, no I/O). Imported by chat.js and by the unit tests (qa/melis/guards.test.mjs).
 * File name starts with "_" so Cloudflare Pages does not route it.
 */

// ---- Text normalisation ------------------------------------------------------
// Turkish-safe folding: "İnsan mısın" / "INSAN MISIN" / "insan misin" -> "insan misin" (İ, I and ı become plain "i"; ç ğ ş ö ü â are folded) so one pattern covers every spelling.
export function normTr(s) {
  return String(s || "").replace(/[İIı]/g, "i").toLowerCase().normalize("NFC").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ü/g, "u").replace(/â/g, "a");
}

// ---- Identity ---------------------------------------------------------------
// "Are you a bot / human / AI?" (patterns are written on the normalised text: only plain "i", no diacritic-only variants needed except ç/ğ/ş/ü/ö/â).
const IDENTITY_Q = new RegExp([
  "bot\\s*mu(?:sun|sunuz)?(?![\\p{L}])",
  "robot\\s*mu(?:sun|sunuz)?(?![\\p{L}])",
  "insan\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  "(?:ger[cç]ek|canli)\\s*(?:bir\\s*)?(?:insan|kisi|biri)",
  "yapay\\s*zek[aâ]\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  "(?<![\\p{L}])ai\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  "are you (?:a |an )?(?:real |live )?(?:bot|robot|human|person|ai|real|chatbot|machine)",
  "is this (?:a |an )?(?:bot|human|real person|ai|robot)",
  "am i (?:talking|speaking|chatting) (?:to|with) (?:a |an )?(?:bot|human|real|person|robot|machine|ai)",
].join("|"), "iu");
export function isIdentityQ(text) {
  return IDENTITY_Q.test(normTr(text));
}

// "Introduce yourself / who am I talking to / what is your name" -> fixed answer without any mention of AI.
const INTRO_Q = new RegExp([
  "kendin(?:i|izi)\\s*tanit",
  "(?:biraz\\s*)?kendin(?:den|izden)\\s*bahset",
  "kimle\\s*(?:konusuyorum|gorusuyorum|yaziyorum)",
  "(?:^|[^\\p{L}])(?:sen|siz)\\s*kim(?:sin|siniz)(?![\\p{L}])",
  "(?:^|[^\\p{L}])kim(?:sin|siniz)(?![\\p{L}])",
  "ad(?:in|iniz)\\s*(?:ne|nedir)(?![\\p{L}])",
  "isim(?:in|iniz)\\s*(?:ne|nedir)(?![\\p{L}])",
  "(?:ne|nedir)\\s*ad(?:in|iniz)",
  "tanisalim",
  "introduce yourself",
  "who are you",
  "what(?:'s|\\u2019s| is) your name",
  "who am i (?:talking|speaking|chatting) (?:to|with)",
  "who(?:'s|\\u2019s| is) this",
  "tell me about yourself",
].join("|"), "iu");
const INTRO_BLOCK = /(?:fiyat|price|cost|\bm\s*[²2]\b|metre|ölçü|olcu|kontrol|garanti|warranty|kirala|rental|teklif|quote)|\d\s*[x×]\s*\d/i;
export function isIntroQ(text) {
  const t = String(text || "");
  if (t.length > 90 || INTRO_BLOCK.test(t)) return false;
  return INTRO_Q.test(normTr(t));
}
export const INTRO_TR = "Ben Melis, ARLEDSCREEN satış danışmanıyım. LED ekran seçimi, ölçü ve teklif konularında size yardımcı olabilirim. Ekranı iç mekâna mı, dış mekâna mı düşünüyorsunuz?";
export const INTRO_EN = "I'm Melis, ARLEDSCREEN's sales consultant. I can help you with LED screen selection, size and quotes. Will the screen be indoor or outdoor?";
// Approved honest answer to a direct "bot / human?" question (approved wording, unchanged).
export const IDENTITY_TR = "Bakış açınıza göre değişir, nasıl bakarsanız öyle görürsünüz 😊 Ben yapay zekâ destekli ARLEDSCREEN satış danışmanıyım. İsterseniz ekibimizle WhatsApp'tan da görüştüreyim.";
export const IDENTITY_EN = "It depends on how you look at it 😊 I'm an AI-supported ARLEDSCREEN sales consultant. If you like, I can also connect you with our team on WhatsApp.";

// Sentences that mention being AI although the customer did not ask (model slip): dropped.
const AI_SELF = /(?:yapay\s*zek[aâ]|artificial intelligence|(?<![\p{L}])AI(?![\p{L}]))[^.!?\n]{0,40}(?:destekli|danışman|asistan|consultant|assistant|powered|supported|based)|(?:destekli|powered|supported)[^.!?\n]{0,25}(?:yapay\s*zek[aâ]|(?<![\p{L}])AI(?![\p{L}]))/iu;
export function aiSelfMention(sentence) { return AI_SELF.test(sentence); }

// ---- Sentence helpers ------------------------------------------------------------
export const splitSent = (line) => protectAbbr(line).split(/(?<=[.!?…؟])\s+/).filter(Boolean).map(unprotectAbbr);
// Address / title abbreviations whose dot is NOT a sentence end ("Merkez Mah. Tuna Sok. No:15-17 Kat 1").
const DOT = "\u2024"; // one-dot leader, restored after splitting
const ABBR = /(?<![\p{L}])(Mah|Mh|Sok|Sk|Cad|Cd|Blv|Bul|Apt|Sn|Tel|Dr|Prof|Av|Ltd|Şti|San|Tic|St|Rd|Ave|Mr|Mrs|Ms|No|Kat|bkz|yaklaşık|ör|örn)\.(?=\s*[\p{L}\p{N}])/gu;
function protectAbbr(t) {
  return t.replace(ABBR, (m, a) => a + DOT)
    .replace(/(?<=\b\d{1,2})\.(?=\s+[\p{Ll}])/gu, DOT) // ordinal "5. kuvveti" (lower-case continuation)
    .replace(/(?<=\bNo:?\s?\d{1,5}(?:[-–]\d{1,5})?)\.(?=\s*[\p{N}])/gu, DOT);
}
function unprotectAbbr(t) { return t.split(DOT).join("."); }

// Server-side length cap: at most `max` sentences. Lists are left alone; a closing question is kept.
export function trimSentences(t, max = 4) {
  if (/^\s*[-*] /m.test(t)) return t;
  const parts = protectAbbr(t).split(/(?<=[.!?…؟])\s+(?=[\p{Lu}\p{N}*"“(])/u).filter(Boolean).map(unprotectAbbr);
  if (parts.length <= max) return t;
  const last = parts[parts.length - 1];
  const kept = /[?؟]\s*$/.test(last) ? parts.slice(0, max - 1).concat(last) : parts.slice(0, max);
  return kept.join(" ");
}
// Drop the sentences for which pred is true (paragraphs are kept); null if nothing is left.
export function dropSentences(text, pred) {
  const out = text.split("\n").map((line) => splitSent(line).filter((x) => !pred(x)).join(" ")).filter((l) => l.trim());
  return out.length ? out.join("\n\n") : null;
}
// Replace the FIRST sentence for which pred is true by `rep`, drop the other matching sentences.
export function replaceSentences(text, pred, rep) {
  let done = false;
  const out = text.split("\n").map((line) => splitSent(line).map((x) => {
    if (!pred(x)) return x;
    if (done) return null;
    done = true; return rep;
  }).filter((x) => x != null).join(" ")).filter((l) => l.trim());
  return { text: out.join("\n\n"), changed: done };
}

// ---- Warranty --------------------------------------------------------------------
export const WARRANTY_TR = "ARLEDSCREEN 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunar.";
export const WARRANTY_EN = "ARLEDSCREEN offers a 2-year warranty and 5 years of free technical service.";
export const WARRANTY_TR_CORE = "2 yıl garanti ve 5 yıl ücretsiz teknik servis";
const WARRANTY_Q = /garanti|warrant|guarante|ücretsiz\s*servis|free\s*service/i;
export function isWarrantyQ(text) { return WARRANTY_Q.test(text); }
// A sentence that states warranty / free-service periods in some other wording.
const WARRANTY_SENT = /(?:garanti|warrant|guarantee|ücretsiz\s+(?:teknik\s+)?servis|free\s+(?:technical\s+)?service|teknik\s+servis)/i;
const YEARS = /\d+\s*(?:-|\s)?\s*(?:yıl|yil|sene|year|yr)/i;
const EXACT_TR = /2 yıl garanti ve 5 yıl ücretsiz teknik servis/;
const EXACT_EN = /2-year warranty and 5 years of free technical service/;
export function enforceWarranty(text, lang, question) {
  if (lang !== "tr" && lang !== "en") return text;
  const exact = lang === "tr" ? EXACT_TR : EXACT_EN, canon = lang === "tr" ? WARRANTY_TR : WARRANTY_EN;
  const isQ = isWarrantyQ(question);
  // Sentences that state warranty/service years (or any years while the topic is warranty) are replaced by the approved sentence.
  const stated = (x) => !exact.test(x) && WARRANTY_SENT.test(x) && YEARS.test(x);
  const otherYears = (x) => isQ && !exact.test(x) && YEARS.test(x);
  let r = replaceSentences(text, (x) => stated(x) || otherYears(x), canon);
  let out = r.text || text;
  if (isQ) { const rest = dropSentences(out, (x) => exact.test(x)); out = canon + (rest ? " " + rest : ""); }
  // never twice: keep the first approved sentence only
  let seen = false;
  const dedup = out.split("\n").map((line) => splitSent(line).filter((x) => { if (!exact.test(x)) return true; if (!seen) { seen = true; return true; } return false; }).join(" ")).filter((l) => l.trim());
  out = dedup.length ? dedup.join("\n\n") : out;
  return out;
}

// ---- Rental -------------------------------------------------------------------------
export const RENTAL_RE = /kiral|rental|(?<![\p{L}])hire(?![\p{L}])|\brent\b/iu;
// Unconfirmed rental claims: service area ("İzmir dahil Türkiye geneli") and installation/transport "included / separate".
const RENTAL_AREA = /(?:türkiye\s+gene|tüm\s+türkiye|türkiye(?:'|’)?\s*nin\s+her|izmir|i̇zmir|ankara|bursa|antalya|nationwide|across turkey|throughout turkey|all over turkey|whole of turkey)/iu;
const RENTAL_INST = /(?:kurulum|montaj|söküm|nakliye|taşıma|transport|installation|shipping|delivery|setup|set-up)[^.!?\n]{0,60}(?:ayr[ıi]|ayrıca|dahil|hariç|ücret|bedel|hesaplan|separate|included|extra|additional|on top|charged|fee)/iu;
const RENTAL_INST2 = /(?:ayr[ıi]|ayrıca|dahil|hariç|separately|included|extra)[^.!?\n]{0,60}(?:kurulum|montaj|nakliye|transport|installation|shipping)/iu;
export const RENTAL_TR = "Kapsam, kurulum ve nakliye detayları yazılı teklifte netleşir.";
export const RENTAL_EN = "Coverage, installation and transport details are clarified in the written quote.";
export function enforceRental(text, lang, question) {
  if (lang !== "tr" && lang !== "en") return text;
  const q = RENTAL_RE.test(question);
  const bad = (x) => (q || RENTAL_RE.test(x)) && (RENTAL_AREA.test(x) || RENTAL_INST.test(x) || RENTAL_INST2.test(x));
  const rep = lang === "tr" ? RENTAL_TR : RENTAL_EN;
  const r = replaceSentences(text, bad, rep);
  return r.changed ? r.text : text;
}

// ---- Phone number only on request ------------------------------------------------
export const PHONE_RE = /(?:\+?\s*90[\s-]*)?\(?0?\s*530[\s)-]*507[\s-]*88[\s-]*34/;
const PHONE_ASK = /telefon|numara|\btel\b|arayın|arayabilir|arayayım|aramak|ararım|ulaş|iletişim|irtibat|whatsapp|call|phone|contact|reach|get in touch|number|human|\binsan\b|gerçek\s*biri|yetkili|temsilci|هاتف|رقم|اتصال|телефон|номер|связ/i;
export function phoneAsked(question) { return PHONE_ASK.test(question); }
export function enforcePhone(text, question) {
  if (!PHONE_RE.test(text) || phoneAsked(question)) return text;
  const g = new RegExp(PHONE_RE.source, "g");
  const kept = dropSentences(text, (x) => PHONE_RE.test(x));
  return kept || text.replace(g, "").replace(/\s{2,}/g, " ").trim();
}

// ---- Forbidden wording (quality / reliability praise is not verified) ---------------
export const QUALITY_RE = /(?<![\p{L}])(?:kaliteli|yüksek\s+(?:görüntü\s+)?kalite\w*|üst\s+düzey\s+kalite\w*|üstün\s+kalite\w*|en\s+iyi\s+kalite\w*|güvenilir\w*|high[\s-]?quality|(?:top|superior|premium|best)[\s-]quality|reliab\w+|dependab\w+|trustworthy)(?![\p{L}])/iu;

// ---- Size expressions (customer text only) -------------------------------------------
// Template / code expressions such as ${7*7}, {{7*7}} or <%= 7*7 %> are not part of a question: they are removed before the model sees the text.
export function sanitizeUserText(t) {
  return String(t || "").replace(/\$\{[^}]*\}|\{\{[^}]*\}\}|<%[^%]*%>|#\{[^}]*\}/g, " ").replace(/[ \t]{2,}/g, " ").trim();
}
// Products of "N*M" expressions in the customer text (these are NOT sizes; the model must not turn them into an area).
export function starProducts(t) {
  const out = [];
  for (const m of String(t || "").matchAll(/(\d{1,4}(?:[.,]\d{1,2})?)\s*\*\s*(\d{1,4}(?:[.,]\d{1,2})?)/g)) {
    const p = Number(m[1].replace(",", ".")) * Number(m[2].replace(",", "."));
    out.push(Math.round(p * 100) / 100);
  }
  return out;
}
export function repeatsStarProduct(sentence, products) {
  return products.some((p) => new RegExp("(?<![\\d.,])" + String(p).replace(".", "[.,]") + "(?:[.,]0+)?\\s*(?:m\\s*[²2]|m\\^2|metrekare|sqm|square)", "i").test(sentence));
}

// ---- Address ---------------------------------------------------------------------------
export const ADDRESS = "Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul";
const ADDRESS_Q = /adres|neredesiniz|nerede\s+bulun|nerdesiniz|konum|where (?:are you|is your|is the|can i find)|your (?:address|location)|located|location of|office address|عنوان|أين|адрес|где/i;
export function isAddressQ(text) { return String(text || "").length <= 90 && ADDRESS_Q.test(text) && !/ekran|screen|install|kurulum|kirala|rental/i.test(text); }
export const ADDRESS_TR = `Adresimiz: ${ADDRESS}. Hafta içi 09:00–18:00, cumartesi 10:00–15:00 çalışıyoruz.`;
export const ADDRESS_EN = `Our address: ${ADDRESS}. We are open Monday–Friday 09:00–18:00 and Saturday 10:00–15:00.`;
export function addressComplete(reply) { return /Tuna\s+Sok\.?\s+No:\s?15-17/.test(reply) && /Gaziosmanpa/i.test(reply); }
