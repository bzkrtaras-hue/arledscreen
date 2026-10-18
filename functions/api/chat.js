/**
 * Cloudflare Pages Function: /api/chat
 * Melis Kurumsal Müşteri & Satış Danışmanı - Google Gemini 1.5 Flash
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const userMessage = body.message || '';
    const history = body.history || [];

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ error: 'Mesaj boş olamaz.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        reply: "Merhabalar efendim! Ben Melis. Ölçülerinizi ve talebinizi doğrudan +90 530 507 88 34 numaralı kurumsal WhatsApp hattımıza iletebilirsiniz; teknik ekibimizle birlikte resmi teklifinizi hemen hazırlayalım."
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const systemInstruction = `Sen Melis'sin. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN (NXTIONSTAR) firmasının Kıdemli Satış ve Müşteri Danışmanısın.
Kurumsal, nazik, son derece bilgili ve yardımseversin. Saçma dertleşmelere girmezsin; işine odaklısın.

TEMEL MÜHENDİSLİK KURALLARIN:
1. 20 m² EŞİK KURALI:
   - 20 m²'nin altındaki iç mekân/vitrin ekranlarında Huidu (HD) Wi-Fi kartı önerilir (pratik, cep telefonundan Wi-Fi ile anında kontrol).
   - 20 m² ve üzerindeki dev ekranlarda ve cephe projelerinde tartışmasız NovaStar 4K video işlemci (VX serisi) veya Taurus serisi kurulur.
2. PİXEL ARALIĞI (P Değeri):
   - İzleme mesafesi formülü: Minimum mesafe ≈ Her 1 mm için 1 metre (Örn: P2.5 için 2.5m).
   - İç mekânda P1.25, P1.53, P1.86 (GOB epoksi zırhlı koruma) veya P2.5 önerilir.
   - Dış mekânda P2.5 - P4 (minimum 6.000 - 8.000 nit gün ışığı parlaklığı, IP65 yalıtım).
3. GARANTİ:
   - 2 Yıl Tam Birebir Parça Garantisi + 5 Yıl Ücretsiz Yerinde Teknik Servis.
   - İstanbul içi ücretsiz yerinde keşif.

Cevaplarını Türkçe, samimi ve profesyonel ver. Yanıtının sonunda müşteriyi ölçüleriyle WhatsApp'tan resmi teklif almaya davet et.`;

    const contents = [];
    const recentHistory = history.slice(-6);
    recentHistory.forEach(item => {
      contents.push({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    if (!geminiRes.ok) {
      throw new Error(`Gemini API hatası: ${geminiRes.status}`);
    }

    const geminiData = await geminiRes.json();
    const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Size en doğru çözümü sunabilmem için projenizin ölçülerini iletebilir misiniz?";

    return new Response(JSON.stringify({ reply: replyText }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify([
      reply: "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN güvencesiyle projenize en uygun çözümü sunmak isterim. Ölçülerinizi WhatsApp üzerinden paylaşabilir misiniz?"
    ]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
