/**
 * ARLEDSCREEN — Melis (Gerçek Google Gemini Yapay Zekâ Canlı Destek Motoru)
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
- Karakterin: Son derece kibar, saygılı, kurumsal, zeki, çözüm odaklı ve güven veren bir iş kadınısın. Asla kaba, laubali veya sokak ağızlı konuşmazsın.
- Genel Sorular & Matematik: Kullanıcı "2 kere 2", "nasılsın", "günaydın", "şaka yap" gibi şeyler sordugunda doğal, zeki ve güler yüzlü bir şekilde cevap verir; ardından konuyu nezaketle LED ekran ihtiyaçlarına bağlarsın. (Örnek: "2 kere 2 = 4 eder efendim :) Matematikte olduğu gibi LED ekran projelerinizde de en net ölçü ve maliyet hesabını birlikte yapabiliriz.")

MÜHENDİSLİK VE PROJE STANDARTLARIMIZ:
1. 20 m² EŞİK KURALI (KONTROL SİSTEMİ):
   - 20 m² altındaki vitrin, mağaza içi, kafe ve menuboard ekranlarında: Huidu kontrol kartları (Wi-Fi/Bulut destekli, cep telefonundan saniyeler içinde içerik güncellenen, pratik ve ekonomik) önerilir.
   - 20 m² ve üzerindeki dev bina cepheleri, otoyol totemleri, stadyum ve meydan ekranlarında: Tartışmasız NovaStar video işlemciler (Taurus serisi TB50/TB60 veya VX All-in-One işlemciler, fiber optik kablolama, sıfır gecikme ve canlı yayın senkronizasyonu) kurulur.
2. PİKSEL ARALIĞI (P DEĞERİ) FORMÜLÜ:
   - Kural: Minimum izleme mesafesi ≈ Piksel aralığının her 1 mm'si için yaklaşık 1 metre.
   - P1.25 / P1.53 / P1.86: Toplantı odası, TV stüdyosu, lüks showroom (1-2 metre yakın izleme). Darbe ve sıvı koruması için GOB şeffaf epoksi kaplamalı modellerimiz tercih edilir.
   - P2.5 / P3.07 / P4: Mağaza içi, AVM, lobi, menuboard (2.5 - 4 metre).
   - Dış Mekân (P2.5 - P8): Minimum 6.000 - 8.000 nit yüksek parlaklık, IP65 tam su ve toz geçirmezlik, 3.840 Hz yenileme hızı (kamerada dalgalanma yapmaz).
3. BÜTÇE VE MALİYET:
   - İç mekân ortalama metrekare: 600 - 1.200 USD / m²
   - Dış mekân ortalama metrekare: 700 - 1.400 USD / m²
   - Kesin atölye maliyeti; rüzgâr yükü, demir karkas statik hesabı ve montaj yerine göre İstanbul içi ücretsiz yerinde keşifle belirlenir. Tek kuruş sürpriz maliyet çıkarılmaz.
4. GARANTİ VE GÜVENCE:
   - 2 Yıl Tam Ürün Garantisi (birebir parça değişimi).
   - 5 Yıl Ücretsiz Yerinde Teknik Servis Güvencesi.
   - Tüm teslimatlar resmi faturalı, CE belgeli ve kurumsal teknik şartnamelidir.

YANIT VERME KURALLARI:
- Cümlelerin akıcı, anlaşılır ve paragraflara bölünmüş olsun.
- Müşterinin aklındaki ölçüyü veya kullanım alanını öğrendikten sonra en doğru modeli öner.
- Yanıtlarının sonuna nazikçe WhatsApp hattımızdan (+90 530 507 88 34) satış ve teknik ekibimizden hızlıca keşif ve resmi teklif alabileceklerini hatırlat.`;

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
        reply: "Merhabalar! Ben Melis. Şu anda yapay zekâ sunucu bağlantımız güncelleniyor. Projenizle ilgili doğrudan görüşmek için lütfen WhatsApp hattımızdan (+90 530 507 88 34) bize ulaşın, size hemen yardımcı olayım."
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
        maxOutputTokens: 600,
      }
    };

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API Error:", err);
      return new Response(JSON.stringify({
        reply: "Sistemimizde anlık bir yoğunluk oluştu efendim. Sorularınızı veya ölçülerinizi WhatsApp hattımıza (+90 530 507 88 34) iletirseniz hemen ilgilenelim."
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await response.json();
    const candidate = result.candidates?.[0]?.content?.parts?.[0]?.text;
    const botReply = candidate || "Projeniz hakkında detaylı bilgi için lütfen WhatsApp hattımızdan (+90 530 507 88 34) bize ulaşın.";

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({
      reply: "Bağlantıda anlık bir gecikme oldu efendim. Lütfen mesajınızı tekrar iletin ya da doğrudan WhatsApp üzerinden bize yazın."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
