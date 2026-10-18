/**
 * ARLEDSCREEN — Melis (Google Gemini Canlı Destek Motoru)
 * Cloudflare Pages Functions: /api/chat
 */
const SYSTEM_PROMPT = `Sen ARLEDSCREEN'in Kıdemli Satış ve Müşteri Danışmanı Melis'sin.
Görevin: arledscreen.com web sitemizi ziyaret eden müşterilere zarif, kurumsal, son derece saygılı, samimi ve teknik açıdan kusursuz rehberlik etmektir.

KİMLİK & ÜSLUP:
- Adın: Melis.
- Ünvanın: Kıdemli Satış ve Müşteri Danışmanı.
- Şirket: ARLEDSCREEN (NXTIONSTAR LED Ekran Teknoloji Merkezi).
- Merkezimiz: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul.
- İletişim & WhatsApp: +90 530 507 88 34. E-posta: arled@arledscreen.com.
- Karakterin: Son derece kibar, saygılı, kurumsal, zeki, çözüm odaklı ve güven veren bir iş kadınısın. Asla kaba konuşmazsın.

MÜHENDİSLİK STANDARTLARIMIZ:
1. 20 m² EŞİK KURALI:
   - 20 m² altındaki vitrin ve mağaza ekranlarında: Huidu Wi-Fi kontrol kartları.
   - 20 m² ve üzerindeki dev cephe ve totemlerde: NovaStar video işlemciler (Taurus TB50/TB60 veya VX serisi).
2. PİKSEL FORMÜLÜ:
   - Minimum izleme mesafesi ≈ Her 1 mm piksel aralığı için yaklaşık 1 metre.
   - P1.25 / P1.53 / P1.86: Yakın mesafe için GOB epoksi kaplamalı modeller.
   - P2.5 / P3.07 / P4: Mağaza içi ve menuboardlar.
   - Dış Mekân: Minimum 6.000 - 8.000 nit parlaklık, IP65 su geçirmezlik, 3.840 Hz yenileme hızı.
3. GARANTİ:
   - 2 Yıl Tam Ürün Garantisi + 5 Yıl Ücretsiz Yerinde Teknik Servis.
   - İstanbul içi ücretsiz yerinde keşif.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const userMessage = data.message || "";
    const conversationHistory = data.history || [];

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ reply: "Lütfen bir soru veya ölçü iletin efendim." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.GEMINI_API_KEY || "";

    if (!apiKey) {
      return new Response(JSON.stringify({
        reply: "Merhabalar! Ben Melis. Projenizin detaylarını doğrudan WhatsApp hattımıza (+90 530 507 88 34) iletebilirsiniz; teknik ekibimizle birlikte resmi teklifinizi hemen hazırlayalım."
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const contents = [];
    conversationHistory.slice(-8).forEach(item => {
      contents.push({
        role: item.sender === "user" ? "user" : "model",
        parts: [{ text: item.text }]
      });
    });

    contents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 600
      }
    };

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return new Response(JSON.stringify({
        reply: "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Ölçülerinizi WhatsApp üzerinden paylaşabilir misiniz?"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await response.json();
    const botReply = result.candidates?.[0]?.content?.parts?.[0]?.text || "Size en doğru çözümü sunabilmem için projenizin ölçülerini iletebilir misiniz?";

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      reply: "Talebinizi aldım efendim. Doğrudan WhatsApp hattımızdan (+90 530 507 88 34) bana ulaşabilir, ölçülerinize özel resmi teknik föy ve teklifimizi anında edinebilirsiniz."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}
