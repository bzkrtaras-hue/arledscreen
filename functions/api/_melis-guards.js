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
const IDENTITY_TR_PATTERNS = [
  "bot\\s*mu(?:sun|sunuz)?(?![\\p{L}])",
  "robot\\s*mu(?:sun|sunuz)?(?![\\p{L}])",
  "insan\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  "(?:ger[cç]ek|canli)\\s*(?:bir\\s*)?(?:insan|kisi|biri)",
  "yapay\\s*zek[aâ]\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  "(?<![\\p{L}])ai\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  // "dijital asistan / temsilci / danışman mısın" (the answer is the same honest bot/human answer; the model never has to repeat the forbidden phrase)
  "dijital\\s*(?:asistan|temsilci|danisman|calisan|insan)\\w*\\s*mi(?:sin|siniz)?(?![\\p{L}])",
  "(?<![\\p{L}])(?:asistan|temsilci)\\s*mi(?:sin|siniz)(?![\\p{L}])",
  "(?:sen|siz)\\s*dijital\\s*(?:asistan|temsilci|danisman)",
];
const IDENTITY_EN_PATTERNS = [
  "are you (?:a |an )?(?:real |live )?(?:bot|robot|human|person|ai|real|chatbot|machine)",
  "is this (?:a |an )?(?:bot|human|real person|ai|robot)",
  "are you (?:a |an )?(?:digital|virtual|automated) (?:assistant|representative|agent|advisor|consultant|person|human)",
  "(?:is|are) (?:this|you) (?:a |an )?(?:digital|virtual) (?:assistant|representative|agent)",
  "(?:^|[^\\p{L}])digital (?:assistant|representative|agent)\\s*\\?",
  "am i (?:talking|speaking|chatting) (?:to|with) (?:a |an )?(?:bot|human|real|person|robot|machine|ai)",
];
const IDENTITY_TR_RE = new RegExp(IDENTITY_TR_PATTERNS.join("|"), "iu"), IDENTITY_EN_RE = new RegExp(IDENTITY_EN_PATTERNS.join("|"), "iu");
export function isIdentityQ(text) {
  const t = normTr(text);
  return IDENTITY_TR_RE.test(t) || IDENTITY_EN_RE.test(t);
}
// Language of an identity / introduction question: English only when an English pattern matched, otherwise Turkish (short Turkish questions such as "Sen kimsin?" have no marker words).
export function identityLang(text) {
  const t = normTr(text);
  return IDENTITY_EN_RE.test(t) || INTRO_EN_RE.test(t) ? "en" : "tr";
}

// "Introduce yourself / who am I talking to / what is your name" -> fixed answer without any mention of AI.
const INTRO_TR_RE = new RegExp([
  "kendin(?:i|izi)\\s*tanit",
  "(?:biraz\\s*)?kendin(?:den|izden)\\s*bahset",
  "kimle\\s*(?:konusuyorum|gorusuyorum|yaziyorum)",
  "(?:^|[^\\p{L}])(?:sen|siz)\\s*kim(?:sin|siniz)(?![\\p{L}])",
  "(?:^|[^\\p{L}])kim(?:sin|siniz)(?![\\p{L}])",
  "ad(?:in|iniz)\\s*(?:ne|nedir)(?![\\p{L}])",
  "isim(?:in|iniz)\\s*(?:ne|nedir)(?![\\p{L}])",
  "(?:ne|nedir)\\s*ad(?:in|iniz)",
  "tanisalim",
].join("|"), "iu");
const INTRO_EN_RE = new RegExp([
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
  const n = normTr(t);
  return INTRO_TR_RE.test(n) || INTRO_EN_RE.test(n);
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

// Rental answers must carry the words "yazılı teklif" / "written quote". Called AFTER trimming so the sentence can never be cut off:
// if it is missing, it replaces the sentence in front of the closing question (or the last sentence when there is no question).
export function ensureRentalQuote(out, lang, question) {
  if (lang !== "tr" && lang !== "en") return out;
  if (!RENTAL_RE.test(question) || /teklif|quote/i.test(out)) return out;
  const add = lang === "tr" ? "Kiralık ekran fiyatı yalnızca yazılı teklifle verilir." : "Rental prices are given only in a written quote.";
  const parts = splitSent(out);
  if (parts.length < 4) return out + " " + add;
  const qi = /[?؟]\s*$/.test(parts[parts.length - 1]) ? parts.length - 1 : parts.length;
  parts.splice(Math.max(0, qi - 1), qi === parts.length ? 1 : 1, add);
  return parts.join(" ");
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
// Unverified praise / production claims. "Image/video quality" and resolution as a technical NOUN (pixel pitch, HD-C16 640×320) stay allowed;
// "kalite…" in praise form, "yüksek çözünürlüklü <ürün>", "high-resolution <product>", "standartlarında üretilmekte" are not.
export const QUALITY_RE = new RegExp([
  "(?<![\\p{L}])(?:kaliteli|yüksek\\s+(?:görüntü\\s+)?kalite\\w*|üst\\s+düzey\\s+kalite\\w*|üstün\\s+kalite\\w*|en\\s+iyi\\s+kalite\\w*|güvenilir\\w*)(?![\\p{L}])",
  "(?<![\\p{L}])(?<!(?:görüntü|baskı|video|sinyal|içerik|resim|fotoğraf)\\s)kalite(?:mi[zn]\\w*|si\\w*|nin|ye|de|den|yi|[sl]\\w*)?(?![\\p{L}])",
  "high[\\s-]?quality|(?:top|superior|premium|best|excellent|great)[\\s-]quality|(?<![\\p{L}])(?<!(?:image|picture|video|signal|content|photo|print)\\s)quality(?![\\p{L}])|reliab\\w+|dependab\\w+|trustworthy",
  "yüksek\\s+çözünürlüklü|(?:ultra[\\s-]?)?high[\\s-]resolution|full[\\s-]?hd|ultra[\\s-]?hd",
  "standartlar(?:ımız|ı|ında|ıyla|ına)\\w*|(?:high|strict|quality|our) standards",
].join("|"), "iu");
// Production / manufacturing claims are not verified (KB rule 13: say "kendi markamız").
export const PRODUCTION_RE = /(?<![\p{L}])(?:üretil\w*|üretiyoruz|üretiriz|üretimimiz\w*|manufactur\w*|(?<!content )produced|made by us|our production)(?![\p{L}])/iu;
// A showroom or appointment is not in the knowledge base (customers can still be asked about THEIR showroom).
export const VISIT_CLAIM_RE = /(?<![\p{L}])(?:showroom(?:umuz|larımız)\w*|sergi\s+salon\w*|randevu\w*|appointment\w*|our showroom|book a visit)/iu;

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
// Where are you / address / office / showroom / visit / appointment (normalised text, so İ/I/ı and Turkish diacritics do not matter).
const ADDRESS_Q = new RegExp([
  "adres", "konum(?:unuz|uz)", "neredesiniz", "nerdesiniz", "nerede\\s+bulun", "nerede\\s+yer", "nerede\\s+oturuyor",
  "(?:ofis|showroom|sergi|magaza|merkez|firma|sirket|depo|atolye|yer)\\w*\\s*(?:nerede|neresi|nerde)",
  "(?:ofis|showroom|sergi\\s*salon|magaza)\\w*\\s*(?:var\\s*mi|mevcut)",
  "ziyaret", "randevu", "yaniniza\\s*gel", "gelebilir\\s*miyim", "gelmek\\s*istiyorum", "ugra", "yuz\\s*yuze",
  "where (?:are you|is your|is the|can i find|do i find)", "where.{0,25}located", "your (?:address|location|office|showroom)", "(?:are you|you) located", "location of",
  "office address", "(?:visit|stop by|come by|drop by|come to) (?:you|your|the|our)", "showroom", "appointment", "street address",
  "عنوان", "أين", "адрес", "где",
].join("|"), "iu");
const ADDRESS_NOT = /ekran|screen|install|kurulum|kirala|rental|kesif|survey|uret|produc|manufactur|fabrika|factory|garanti|warrant|teslim|deliver|kargo|ship|nakliye|odeme|payment|fiyat|price/i;
export function isAddressQ(text) {
  const t = String(text || "");
  if (t.length > 90) return false;
  const n = normTr(t);
  return ADDRESS_Q.test(n) && !ADDRESS_NOT.test(n);
}
export const ADDRESS_TR = `Adresimiz: ${ADDRESS}. Hafta içi 09:00–18:00, cumartesi 10:00–15:00 çalışıyoruz.`;
export const ADDRESS_EN = `Our address: ${ADDRESS}. We are open Monday–Friday 09:00–18:00 and Saturday 10:00–15:00.`;
export function addressComplete(reply) { return reply.replace(/\s*\/\s*/g, "/").includes(ADDRESS); }

// ---- Control card changed later: not in the knowledge base -> no yes/no claim ---------------------------------
const CARD_WORD = /kart|card|controller|kontrol\s*sistem|control system|huidu|novastar|nova\s?star|colorlight/i;
const CARD_CHANGE = /degistir|yukselt|upgrade|swap|replace|change|switch|takas|yenile|gec(?:ebil|ilir|ebilir)|baska\s*(?:bir\s*)?(?:kart|sistem)e/i;
const CARD_LATER = /sonradan|sonra|ileride|ilerde|later|afterwards|in the future|down the line|after (?:the )?(?:purchase|installation|install)|kurulumdan sonra|aldiktan sonra/i;
export function isCardChangeQ(text) {
  const t = String(text || "");
  if (t.length > 200) return false;
  const n = normTr(t);
  return CARD_WORD.test(n) && CARD_CHANGE.test(n) && CARD_LATER.test(n);
}
export const CARD_CHANGE_TR = "Kontrol kartının sonradan değiştirilip değiştirilemeyeceği projenize göre ekibimiz tarafından yazılı olarak teyit edilir; bu konuda kesin bir evet ya da hayır diyemem. İsterseniz ekibimizle WhatsApp'tan görüşebilirsiniz.";
export const CARD_CHANGE_EN = "Whether the control card can be changed later is confirmed in writing by our team for your project, so I can't give a firm yes or no. If you like, you can talk to our team on WhatsApp.";

// ---- Huidu vs NovaStar: knowledge-base facts only, in the customer's language -----------------------------------
export function isControlCompareQ(text) {
  const t = String(text || "");
  if (t.length > 140) return false;
  const n = normTr(t);
  if (!/huidu/.test(n) || !/nova\s?star/.test(n)) return false;
  if (/\d\s*(?:m\s*[²2]|metre|m\b|x|×)|fiyat|price|cost|ne kadar/.test(n)) return false; // a project/price question goes through the normal flow
  return /\bvs\b|versus|ile|ve\b|veya|yoksa|mi\b|mu\b|or\b|and\b|fark|difference|compare|karsilastir|hangisi|which|better|iyi/.test(n);
}
export const COMPARE_TR = "Huidu, Wi-Fi veya USB ile içerik yüklenen asenkron bir sistemdir; içeriği kendi hafızasında tutup bilgisayardan bağımsız oynatır, mağaza, cephe ve tabela işlerinde pratiktir. NovaStar ise yüksek piksel yükü, sahne ve senkron (canlı görüntü aktarımı) işler için kullanılır. Genellikle 20 m² altında Huidu, 20 m² ve üzerinde NovaStar öneriyoruz; nihai model yazılı teklifte netleşir. Ekranınız yaklaşık kaç m² olacak?";
export const COMPARE_EN = "Huidu is an asynchronous system: content is loaded over Wi-Fi or USB and stored on the card, so it plays independently of a computer, which suits stores, façades and signs. NovaStar is used for high pixel loads, stages and synchronous (live) work. We usually recommend Huidu below 20 m² and NovaStar from 20 m² upwards; the final model is confirmed in the written quote. About how many m² will your screen be?";
// Language for these deterministic answers: English only when the message has English marker words, otherwise Turkish (the site is Turkish-first).
export function compareLang(text) {
  return /\b(?:the|is|are|you|your|do|does|can|what|how|which|better|difference|between|compare|versus|or|and|than|should)\b/i.test(String(text || "")) && !/[çğıöşüÇĞİÖŞÜ]/.test(text) && !/\b(?:ve|ile|veya|yoksa|mi|mu|mı|mü|fark|hangisi)\b/i.test(text) ? "en" : "tr";
}

// ---- Safe neutral answer when every sentence of a draft was an unverified claim ----------------------------------------
export const SAFE_TR = "Bu konudaki ayrıntıları ekibimiz yazılı teklifle paylaşır. Ekranı iç mekâna mı, dış mekâna mı düşünüyorsunuz?";
export const SAFE_EN = "Our team shares the details of this in the written quote. Will the screen be indoor or outdoor?";

// Clearly English (English marker words, no Turkish letters or Turkish marker words); anything ambiguous is treated as Turkish.
export function clearlyEnglish(text) {
  const t = String(text || "");
  return /\b(?:where|your|you|are|is|can|could|do|does|would|visit|office|located|location|address|appointment|come|stop|the|our|later|change|card|control)\b/i.test(t)
    && !/[çğıöşüÇĞİÖŞÜ]/.test(t) && !/\b(?:nerede|ofis|ofisiniz|randevu|ziyaret|adres|adresiniz|var|mı|mi|mu|mü|bir|ve|ile|veya|kart|kartı|kontrol|sonradan)\b/i.test(t);
}
