/**
 * ARLEDSCREEN — Melis (Google Gemini 2.5 Flash / 2.0 Flash Canlı Destek Motoru)
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
- Karakterin: Son derece kibar, saygılı, kurumsal, zeki, çözüm odaklı ve güven veren bir iş kadınısın.
- Genel Sorular & Sohbet: Kullanıcı "2 kere 2", "nasılsın", "günaydın", "naber", "merhaba" gibi şeyler sordugunda doğal ve zeki bir şekilde cevap verir; ardından konuyu nezaketle LED ekran ihtiyaçlarına bağlarsın.

MÜHENDİSLİK STANDARTLARIMIZ:
1. 20 m² EŞİK KURALI:
   - 20 m² altı (vitrin, mağaza içi, kafe): Huidu Wi-Fi/Bulut kartları önerilir.
   - 20 m² ve üstü (bina cephesi, totem): Tartışmasız NovaStar video işlemci kurulur.
2. PİKSEL & İZLEME MESAFESİ:
   - 1 mm piksel aralığı ≈ 1 metre minimum izleme mesafesi.
   - P1.86 GOB / P2.5: Mağaza içi ve vitrinler için idealdir.
   - Dış Mekân: Minimum 6.000 - 8.000 nit parlaklık, IP65 koruma.
3. FİYAT & GARANTİ:
   - İç mekân ortalama 600 - 1.200 USD/m², dış mekân 700 - 1.400 USD/m².
   - 2 Yıl Tam Garanti + 5 Yıl Ücretsiz Yerinde Teknik Servis.
   - Net teklif için İstanbul içi ücretsiz yerinde keşif ve WhatsApp yönlendirmesi yap (+90 530 507 88 34).`;

// Google'in aktif ve güncel modelleri
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash"
];

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const userMessage = data.message || "";
    const conversationHistory = data.history || [];

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ reply: "Lütfen bir soru veya ölçü yazın efendim." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.GEMINI_API_KEY || "";

    if (!apiKey) {
      return new Response(JSON.stringify({
        reply: "Merhabalar! Ben Melis. Ölçülerinizi doğrudan WhatsApp hattımıza (+90 530 507 88 34) iletebilirsiniz; teknik ekibimizle birlikte resmi teklifinizi hemen hazırlayalım."
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

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

    let botReply = "";

    for (const model of GEMINI_MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            botReply = candidateText;
            break;
          }
        }
      } catch (err) {}
    }

    if (!botReply) {
      botReply = "Talebinizi aldım efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis sunuyoruz. Ölçülerinizi WhatsApp üzerinden (+90 530 507 88 34) paylaşabilir misiniz?";
    }

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
