/**
 * ARLEDSCREEN — Melis canlı destek (/api/chat, Cloudflare Pages Functions)
 * Motor: Google Gemini (generativelanguage.googleapis.com, generateContent).
 * Anahtar yalnızca ortam değişkeninden okunur (GEMINI_API_KEY); kaynakta anahtar yok.
 * Sınırlar: IP başına 20/saat ve 60/gün, girdi en fazla 1000 karakter, son 8 tur,
 * küresel ~1500 Gemini çağrısı/gün (aşılırsa kural tabanlı yanıt), maxOutputTokens 800.
 */

const MAX_INPUT = 1000;
const MAX_TURNS = 8;
const PER_IP_HOUR = 20;
const PER_IP_DAY = 60;
const GLOBAL_DAY = 1500;
const MAX_OUTPUT_TOKENS = 800;
const WARRANTY_TR = "2 yıl garanti, 5 yıl ücretsiz teknik servis";
const WARRANTY_EN = "2-year warranty, 5 years of free technical service";
const WARRANTY_AR = "ضمان لمدة سنتين، و5 سنوات من الخدمة الفنية المجانية";
const WA = "+90 530 507 88 34";
const RENTAL_PER_M2 = 100;

// Ürün verisi (src/content/models.ts + src/content/prices.ts ile aynı). Fiyat: USD / modül, KDV ve nakliye hariç.
const PRODUCTS = [
  { m: "P1.25 GOB", use: "ic", pitch: 1.25, mm: [320, 160], usd: 95.88 },
  { m: "P1.53 GOB", use: "ic", pitch: 1.53, mm: [320, 160], usd: 62.08 },
  { m: "P1.86 GOB", use: "ic", pitch: 1.86, mm: [320, 160], usd: 49.08 },
  { m: "P2.5", use: "ic", pitch: 2.5, mm: [320, 160], usd: 32.18 },
  { m: "P3.07", use: "ic", pitch: 3.07, mm: [320, 160], usd: 30.88 },
  { m: "P4", use: "ic", pitch: 4, mm: [320, 160], usd: 26.98 },
  { m: "P2.5", use: "dis", pitch: 2.5, mm: [320, 160], usd: 63.7 },
  { m: "P2.9", use: "dis", pitch: 2.97, mm: [250, 250], usd: 53.3 },
  { m: "P3.07", use: "dis", pitch: 3.076, mm: [320, 160], usd: 44.2 },
  { m: "P4", use: "dis", pitch: 4, mm: [320, 160], usd: 33.8 },
  { m: "P4 önden servis", use: "dis", pitch: 4, mm: [320, 160], usd: 36.4 },
  { m: "P5", use: "dis", pitch: 5, mm: [320, 160], usd: 29.9 },
  { m: "P8", use: "dis", pitch: 8, mm: [256, 128], usd: null },
  { m: "P1.86 esnek", use: "ic", pitch: 1.86, mm: [320, 160], usd: null },
  { m: "P2.5 esnek", use: "ic", pitch: 2.5, mm: [320, 160], usd: null },
];
const perM2 = (p) => (p.usd == null ? null : Math.round(p.usd * (1e6 / (p.mm[0] * p.mm[1]))));
const PRODUCT_TABLE = PRODUCTS.map((p) => {
  const m2 = perM2(p);
  return `- ${p.m} (${p.use === "ic" ? "iç mekân" : "dış mekân"}): piksel aralığı ${p.pitch} mm, modül ${p.mm[0]} × ${p.mm[1]} mm, önerilen en yakın izleme mesafesi ≈ ${Math.max(1, Math.round(p.pitch))} m, ` +
    (p.usd == null ? "fiyat yazılı teklifle" : `${p.usd.toFixed(2)} USD/modül (≈ ${m2} USD/m² modül bedeli CNC kabin; Rental kabin ≈ ${m2 + RENTAL_PER_M2} USD/m²)`);
}).join("\n");

const SYSTEM_PROMPT = `Sen ARLEDSCREEN'in Kıdemli Satış ve Müşteri Danışmanı Melis'sin. Kibar, kurumsal, net ve premium bir dille konuşursun.
ARLEDSCREEN: İstanbul Gaziosmanpaşa (Merkez Mah. Tuna Sok. No:15-17 Kat 1). WhatsApp: ${WA}. E-posta: arled@arledscreen.com. NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Kurucu: Aras Bozkurt.

EN ÖNEMLİ KURAL: Müşterinin sorduğu soruyu doğrudan ve ilk cümlede yanıtla. Ölçü, piksel aralığı (P değeri) veya izleme mesafesi sorulursa aşağıdaki ürün verisini kullanarak somut model ve sayı ver. Genel tanıtım metniyle geçiştirme.
Yanıtı müşterinin SON mesajının dilinde ver (Türkçe, İngilizce, Arapça, Rusça, Bulgarca vb.); sayfa dili önemli değildir. En fazla 120 kelime; cümleyi asla yarıda bırakma.

ÜRÜN VERİSİ (tek kaynak):
${PRODUCT_TABLE}
Hesap kuralları: 320 × 160 mm modülde 1 m² ≈ 19,53 modül. Modül adedi = ⌈genişlik/0,32⌉ × ⌈yükseklik/0,16⌉. İzleme mesafesi kuralı: her 1 mm piksel aralığı için yaklaşık 1 m en yakın izleme mesafesi. Kabin: CNC kabin (sabit kurulum) standart fiyattır; Rental kabin (taşınabilir, sökülüp takılabilir) m² başına +${RENTAL_PER_M2} USD. Hesaplayıcı toplamına atölye işçiliği 100 USD/m², kontrol kartı (10 m²'ye kadar 1 adet 500 USD, her başlayan ek 10 m² için 1 kart) ve sürücü + yazılım 500 USD eklenir. Fiyatlar USD, KDV ve nakliye hariç; nihai tutar yazılı teklifle kesinleşir.
Kontrol sistemi: 20 m² altı genellikle Huidu, 20 m² ve üzeri genellikle NovaStar; nihai model teklifte netleşir.

GÜVENCE (yalnızca bu ifadeler): "${WARRANTY_TR}" (EN: "${WARRANTY_EN}", AR: "${WARRANTY_AR}"). Ücretsiz keşif. %100 memnuniyet garantisi ve koşulsuz iade. Başka garanti süresi, "yerinde" servis vaadi, indirim veya kampanya söyleme. "ucuz", "uygun fiyat", "ekonomik", "maliyeti düşük" kelimelerini kullanma.
Yanıtın sonunda kısaca WhatsApp hattını (${WA}) hatırlat.`;

const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.6", "gemini-2.5-flash", "gemini-2.5", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.0-flash-lite"];

// Dil algılama: yalnızca kullanıcının SON mesajına bakar (sayfa dili veya Türkçe varsayılanı değil).
// Önce yazı sistemi (Arapça / Kiril), sonra Latin dillerde sözcük puanı. Belirsizse "en".
const TR_WORDS = /\b(ve|bir|için|icin|kaç|kac|ne|nedir|mi|mı|mu|mü|ekran|metre|fiyat|fiyatı|mesafe|merhaba|teklif|kaça|nasıl|nasil|istiyorum|var|mı)\b/gi;
const EN_WORDS = /\b(the|what|which|how|much|is|are|for|price|prices|screen|display|distance|size|cost|quote|need|want|hello|hi|do|you|i|my|meter|meters|wall|panel)\b/gi;
const BG_HINT = /[ъщ]|\b(какво|колко|цена(та)?|екран|искам|здравейте|може|ли|за|на|е)\b/gi;
const RU_HINT = /[ыэё]|\b(сколько|стоит|экран|цена|здравствуйте|хочу|можно|мне|это|какой)\b/gi;
function lang(t) {
  const s = String(t || "");
  if (/[\u0600-\u06FF]/.test(s)) return "ar";
  if (/[\u0400-\u04FF]/.test(s)) {
    const bg = (s.match(BG_HINT) || []).length, ru = (s.match(RU_HINT) || []).length;
    return bg > ru ? "bg" : "ru";
  }
  if (/[çğışÇĞİŞ]/.test(s)) return "tr";
  const tr = (s.match(TR_WORDS) || []).length, en = (s.match(EN_WORDS) || []).length;
  if (tr > en) return "tr";
  if (en > 0) return "en";
  return /[öüÖÜ]/.test(s) ? "tr" : "en";
}
const LANG_NAME = { tr: "Turkish", en: "English", ar: "Arabic", ru: "Russian", bg: "Bulgarian" };
// Boş istek gibi metin olmayan durumlar için: body.lang → Accept-Language → en.
function reqLang(data, request) {
  const l = String((data && (data.lang || data.locale)) || "").slice(0, 2).toLowerCase();
  if (LANG_NAME[l]) return l;
  const al = (request.headers.get("Accept-Language") || "").toLowerCase().match(/[a-z]{2}/g) || [];
  return al.find((x) => LANG_NAME[x]) || "en";
}
const EMPTY_MSG = {
  tr: "Lütfen bir soru veya ölçü yazın.",
  en: "Please type a question or the screen size.",
  ar: "يرجى كتابة سؤالك أو مقاس الشاشة.",
  ru: "Пожалуйста, напишите вопрос или размер экрана.",
  bg: "Моля, напишете въпрос или размера на екрана.",
};
const LONG_MSG = {
  tr: "Mesajınız en fazla 1000 karakter olabilir.",
  en: "Your message can be up to 1000 characters.",
  ar: "يمكن أن تصل رسالتك إلى 1000 حرف كحد أقصى.",
  ru: "Сообщение может содержать не более 1000 символов.",
  bg: "Съобщението може да бъде до 1000 знака.",
};
function langRule(L) {
  const name = LANG_NAME[L] || "English";
  return `\n\nLANGUAGE RULE (highest priority): The customer's latest message is in ${name}. Reply ONLY in ${name}, regardless of the page language, earlier turns or the Turkish wording of these instructions. Do not mix in Turkish words${L === "tr" ? "" : ` (e.g. say "free site survey" instead of "ücretsiz keşif"/"keşif", "written quote" instead of "teklif")`}. Keep model names, numbers, USD and the WhatsApp number as they are.`;
}

function parseNums(t) {
  const s = t.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/,/g, ".");
  const dims = /(\d+(?:\.\d+)?)\s*(?:x|×|\*|by|في|على)\s*(\d+(?:\.\d+)?)/i.exec(s);
  const dist = /(\d+(?:\.\d+)?)\s*(?:m\b|metre|meter|mt|متر|م\b)/i.exec(s.replace(dims ? dims[0] : "", ""));
  let w = dims ? +dims[1] : null, h = dims ? +dims[2] : null;
  if (w && h && w > 30 && h > 30) { w /= 100; h /= 100; } // cm
  return { w, h, d: dist ? +dist[1] : null, outdoor: /dış|dis mekan|cephe|outdoor|facade|خارج/i.test(s) };
}

function pick(d, outdoor) {
  const list = PRODUCTS.filter((p) => p.usd != null && p.use === (outdoor ? "dis" : "ic"));
  const want = d ? Math.min(d, 8) : outdoor ? 4 : 2.5;
  return list.reduce((a, b) => (Math.abs(b.pitch - want) < Math.abs(a.pitch - want) && b.pitch <= Math.max(want, list[0].pitch) ? b : a), list[0]);
}

// Kural tabanlı yanıt: Gemini yoksa, kota dolduysa veya hata olursa.
function fallback(text) {
  const L = lang(text);
  const { w, h, d, outdoor } = parseNums(text);
  const p = pick(d, outdoor);
  const m2 = perM2(p);
  let mods = "";
  if (w && h) {
    const n = Math.ceil(w / (p.mm[0] / 1000)) * Math.ceil(h / (p.mm[1] / 1000));
    mods = L === "ar" ? ` لمقاس ${w} × ${h} م تحتاج تقريباً ${n} وحدة.` : L === "en" ? ` For ${w} × ${h} m you need about ${n} modules.` : ` ${w} × ${h} m için yaklaşık ${n} modül gerekir.`;
  }
  const dTxt = d ?? Math.max(1, Math.round(p.pitch));
  if (L === "ar")
    return `لمسافة مشاهدة ${dTxt} م نوصي بـ NXTIONSTAR ${p.m} (${outdoor ? "خارجي" : "داخلي"})، بدقة ${p.pitch} مم وسعر ${p.usd.toFixed(2)} دولار للوحدة (≈ ${m2} دولار/م² للوحدات).${mods} القاعدة: كل 1 مم من دقة البكسل ≈ 1 م أقرب مسافة مشاهدة. ${WARRANTY_AR}. للعرض المكتوب: واتساب ${WA}.`;
  if (L !== "tr")
    return `For a viewing distance of about ${dTxt} m we recommend NXTIONSTAR ${p.m} (${outdoor ? "outdoor" : "indoor"}): ${p.pitch} mm pitch, ${p.usd.toFixed(2)} USD per module (≈ ${m2} USD/m² module cost, CNC cabinet; Rental cabinet +${RENTAL_PER_M2} USD/m²).${mods} Rule of thumb: each 1 mm of pitch ≈ 1 m minimum viewing distance. ${WARRANTY_EN}. For a written quote: WhatsApp ${WA}.`;
  return `Yaklaşık ${dTxt} m izleme mesafesi için NXTIONSTAR ${p.m} (${outdoor ? "dış mekân" : "iç mekân"}) öneriyoruz: ${String(p.pitch).replace(".", ",")} mm piksel aralığı, modül başına ${p.usd.toFixed(2).replace(".", ",")} USD (≈ ${m2} USD/m² modül bedeli, CNC kabin; Rental kabin +${RENTAL_PER_M2} USD/m²).${mods} Kural: her 1 mm piksel aralığı ≈ 1 m en yakın izleme mesafesi. ${WARRANTY_TR}; ücretsiz keşif. Yazılı teklif için WhatsApp: ${WA}.`;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestOptions() {
  return jsonResponse(null, 204);
}

export async function onRequestGet(context) {
  const env = context?.env || {};
  return jsonResponse({
    status: "ok",
    service: "ARLEDSCREEN Melis AI Chat Service",
    engine: "google-gemini",
    gemini_configured: Boolean((env.GEMINI_API_KEY || "").trim()),
    models: GEMINI_MODELS,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    limits: { perIpHour: PER_IP_HOUR, perIpDay: PER_IP_DAY, inputChars: MAX_INPUT, turns: MAX_TURNS, globalDay: GLOBAL_DAY },
  });
}

async function bump(kv, key, ttl) {
  if (!kv) return 0;
  try {
    const n = (parseInt((await kv.get(key)) || "0", 10) || 0) + 1;
    await kv.put(key, String(n), { expirationTtl: ttl });
    return n;
  } catch {
    return 0;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    let data = {};
    try { data = await request.json(); } catch { data = {}; }
    const raw = (
      data.message || data.text || data.prompt || data.content ||
      (Array.isArray(data.messages) && data.messages.length ? data.messages[data.messages.length - 1].content || data.messages[data.messages.length - 1].text : "") || ""
    ).toString().trim();
    if (!raw) { const msg = EMPTY_MSG[reqLang(data, request)]; return jsonResponse({ reply: msg, text: msg }, 400); }
    const L = lang(raw);
    if (raw.length > MAX_INPUT) {
      const msg = LONG_MSG[L] || LONG_MSG.en;
      return jsonResponse({ reply: msg, text: msg }, 413);
    }

    const kv = env && env.MELIS_CACHE;
    const ip = request.headers.get("CF-Connecting-IP") || "0";
    const now = Date.now();
    const hour = Math.floor(now / 3600000), day = Math.floor(now / 86400000);
    const [h, d] = await Promise.all([bump(kv, `rl:h:${ip}:${hour}`, 3700), bump(kv, `rl:d:${ip}:${day}`, 90000)]);
    if (h > PER_IP_HOUR || d > PER_IP_DAY) {
      const msg = L === "ar" ? `تم بلوغ حد الرسائل. تواصل معنا عبر واتساب ${WA}.` : L !== "tr" ? `Message limit reached. Please reach us on WhatsApp ${WA}.` : `Mesaj sınırına ulaşıldı. WhatsApp hattımızdan bize ulaşabilirsiniz: ${WA}.`;
      return jsonResponse({ reply: msg, text: msg, note: "rate_limited" }, 429);
    }

    const apiKey = ((env && env.GEMINI_API_KEY) || "").trim();
    if (!apiKey) { const fb = fallback(raw); return jsonResponse({ reply: fb, text: fb, note: "gemini_key_not_configured" }); }
    const g = await bump(kv, `rl:g:${day}`, 90000);
    if (g > GLOBAL_DAY) { const fb = fallback(raw); return jsonResponse({ reply: fb, text: fb, note: "global_cap" }); }

    const hist = (Array.isArray(data.history) ? data.history : []).slice(-MAX_TURNS);
    const contents = [];
    hist.forEach((item, idx) => {
      const role = item.sender === "user" || item.role === "user" ? "user" : "model";
      const text = String(item.text || item.content || "").trim().slice(0, MAX_INPUT * 2);
      if (!text) return;
      if (idx === hist.length - 1 && role === "user" && text === raw) return;
      if (contents.length && contents[contents.length - 1].role === role) contents[contents.length - 1].parts[0].text += "\n" + text;
      else contents.push({ role, parts: [{ text }] });
    });
    if (contents.length && contents[contents.length - 1].role === "user") contents[contents.length - 1].parts[0].text = raw;
    else contents.push({ role: "user", parts: [{ text: raw }] });
    while (contents.length && contents[0].role !== "user") contents.shift();

    let reply = "";
    const pn = parseNums(raw);
    let facts = "";
    if (pn.w && pn.h) {
      const cols = Math.ceil(pn.w / 0.32 - 1e-9), rows = Math.ceil(pn.h / 0.16 - 1e-9), area = Math.round(pn.w * pn.h * 100) / 100;
      facts = `\nKOD TARAFINDAN HESAPLANDI (bu sayıları kullan, yeniden hesaplama): ${pn.w} × ${pn.h} m = ${area} m²; 320 × 160 mm modülle ${cols} × ${rows} = ${cols * rows} modül, gerçek ölçü ${(cols * 0.32).toFixed(2)} × ${(rows * 0.16).toFixed(2)} m. Rental kabin farkı ${Math.round(area * RENTAL_PER_M2)} USD.`;
    }
    const call = async (model, thinkingConfig) => {
      const generationConfig = { temperature: 0.5, maxOutputTokens: MAX_OUTPUT_TOKENS };
      if (thinkingConfig) generationConfig.thinkingConfig = thinkingConfig;
      return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT + facts + langRule(L) }] }, contents, generationConfig }),
      });
    };
    for (const model of GEMINI_MODELS) {
      try {
        // Düşünme tokenları maxOutputTokens bütçesini tüketip yanıtı (özellikle Arapça) kesiyordu: düşünmeyi en aza indir.
        const tc = model.startsWith("gemini-3") ? { thinkingLevel: "minimal" } : model.startsWith("gemini-2.5") ? { thinkingBudget: 0 } : null;
        let res = await call(model, tc);
        if (res.status === 400 && tc) res = await call(model, model.startsWith("gemini-3") ? { thinkingLevel: "low" } : null);
        if (!res.ok) { console.log("gemini", model, res.status); continue; }
        const out = await res.json();
        const c = out.candidates?.[0];
        const u = out.usageMetadata || {};
        console.log("gemini ok", model, c?.finishReason, u.candidatesTokenCount, u.thoughtsTokenCount);
        const text = (c?.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || "").join("").trim();
        if (text) { reply = text; if (c.finishReason === "MAX_TOKENS") reply = reply.replace(/[^.!?。؟\n]*$/, "").trim() || text; break; }
      } catch (e) { console.log("gemini", model, "error"); }
    }
    if (!reply) reply = fallback(raw);
    return jsonResponse({ reply, text: reply });
  } catch (err) {
    const msg = `Talebinizi aldım. / We received your request. WhatsApp: ${WA}.`;
    return jsonResponse({ reply: msg, text: msg });
  }
}
