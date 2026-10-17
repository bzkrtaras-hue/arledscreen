/**
 * Cloudflare Pages Function: /api/chat
 * Melis — ARLEDSCREEN Kıdemli Satış ve Müşteri Danışmanı (Gemini)
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const userMessage = body.message || "";
    const history = body.history || [];

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ reply: "Lütfen bir soru veya ölçü yazın efendim." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        reply: "Merhabalar! Ben Melis. Şu anda sunucu bağlantımız güncelleniyor. Projeniz için lütfen WhatsApp hattımızdan (+90 530 507 88 34) bize ulaşın."
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const SYSTEM_PROMPT = `Sen ARLEDSCREEN'in Kıdemli Satış ve Müşteri Danışmanı Melis'sin.
Merkez: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul.
WhatsApp: +90 530 507 88 34 · E-posta: arled@arledscreen.com

KURALLAR:
- Kibarlı, kurumsal, kısa ve net cevap ver.
- 20 m² altı iç mekân/vitrin: Huidu kontrol kartı öner.
- 20 m² ve üzeri cephe/dev ekran: NovaStar (Taurus veya VX) öner.
- Piksel aralığı: yaklaşık 1 mm = 1 m minimum izleme mesafesi.
- Fiyatlar panel başına USD, KDV ve nakliye hariç. Ücretsiz kargo yoktur. Nihai tutar keşif + yazılı teklifle kesinleşir.
- Garanti ve servis sürelerini kesin söyleme; "yazılı teklifte belirtilir" de.
- Cevabın sonunda nazikçe WhatsApp'tan keşif/teklif alabileceklerini hatırlat.`;

    const contents = [];
    (history.slice(-8) || []).forEach(item => {
      contents.push({
        role: item.sender === "user" ? "user" : "model",
        parts: [{ text: item.text }]
      });
    });
    contents.push({ role: "user", parts: [{ text: userMessage }] });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.65, maxOutputTokens: 600 }
      })
    });

    if (!geminiRes.ok) {
      return new Response(JSON.stringify({
        reply: "Anlık bir yoğunluk oluştu. Lütfen WhatsApp'tan (+90 530 507 88 34) yazın."
      }), { headers: { "Content-Type": "application/json" } });
    }

    const geminiData = await geminiRes.json();
    const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
      || "Projeniz için WhatsApp'tan (+90 530 507 88 34) yazabilirsiniz.";

    return new Response(JSON.stringify({ reply: replyText }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      reply: "Bağlantıda gecikme oldu. Lütfen WhatsApp üzerinden (+90 530 507 88 34) yazın."
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
