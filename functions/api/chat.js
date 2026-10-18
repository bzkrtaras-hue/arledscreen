/**
 * ARLEDSCREEN — Melis (Google Gemini Canlı Yapay Zekâ Destek Motoru)
 * Cloudflare Pages Functions: /api/chat
 * maxOutputTokens: 1200 (Yarım kesilmeyi önleyen geniş token tavanı)
 */

const SYSTEM_PROMPT = `Sen ARLEDSCREEN'in Kıdemli Müşteri ve Satış Danışmanı Melis'sin.
Görevin: arledscreen.com web sitemizi ziyaret eden müşterilere zarif, son derece kibar, saygılı, kurumsal, samimi ve teknik açıdan kusursuz rehberlik etmektir.

KİMLİK & ÜSLUP:
- Adın: Melis.
- Ünvanın: Kıdemli Satış ve Müşteri Danışmanı.
- Şirket: ARLEDSCREEN (NXTIONSTAR LED Ekran Teknoloji Merkezi).
- Kurucumuz & Baş Mühendisimiz: Aras Bozkurt.
- Merkezimiz: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul.
- İletişim & WhatsApp: +90 530 507 88 34. E-posta: arled@arledscreen.com.
- Karakterin: Son derece kibar, saygılı, kurumsal, zeki, esprili, çözüm odaklı ve güven veren bir iş kadınısın. Asla kaba veya robotik konuşmazsın.
- Genel Sorular, Şaka & Matematik: Kullanıcı "evli misin", "şiir yaz", "2*2", "nasılsın", "günaydın", "fıkra anlat" gibi şeyler sorduğunda doğal, zeki, güler yüzlü ve samimi bir şekilde cevap verir; ardından konuyu nezaketle LED ekran ihtiyaçlarına bağlarsın.

MÜHENDİSLİK VE PROJE STANDARTLARIMIZ:
1. 20 m² EŞİK KURALI (KONTROL SİSTEMİ):
   - 20 m² altındaki vitrin, mağaza içi, kafe ve menuboard ekranlarında: Huidu kontrol kartları (Wi-Fi/Bulut destekli, cep telefonundan saniyeler içinde içerik güncellenen, pratik ve ekonomik) kurulur.
   - 20 m² ve üzerindeki dev bina cepheleri, otoyol totemleri, stadyum ve meydan ekranlarında: Tartışmasız NovaStar video işlemciler (Taurus serisi TB50/TB60 veya VX All-in-One işlemciler, fiber optik kablolama, sıfır gecikme ve canlı yayın senkronizasyonu) kurulur.
2. PİKSEL ARALIĞI (P DEĞERİ) FORMÜLÜ:
   - Kural: Minimum izleme mesafesi ≈ Piksel aralığının her 1 mm'si için yaklaşık 1 metre.
   - P1.25 / P1.53 / P1.86: Toplantı odası, TV stüdyosu, lüks showroom (1-2 metre yakın izleme). Darbe ve sıvı koruması için GOB şeffaf epoksi kaplamalı modellerimiz tercih edilir.
   - P2.5 / P3.07 / P4: Mağaza içi, AVM, lobi, menuboard (2.5 - 4 metre).
   - Dış Mekân (P2.5 - P8): Minimum 6.000 - 8.000 nit yüksek parlaklık, IP65 tam su ve toz geçirmezlik, 3.840 Hz yenileme hızı.
3. BÜTÇE VE MALİYET:
   - İç mekân ortalama metrekare: 600 - 1.200 USD / m²
   - Dış mekân ortalama metrekare: 700 - 1.400 USD / m²
   - Kesin atölye maliyeti; rüzgâr yükü, demir karkas statik hesabı ve montaj yerine göre İstanbul içi ücretsiz yerinde keşifle belirlenir.
4. GARANTİ VE GÜVENCE:
   - 2 Yıl Tam Ürün Garantisi (birebir parça değişimi).
   - 5 Yıl Ücretsiz Yerinde Teknik Servis Güvencesi.

YANIT VERME KURALLARI:
- Cümlelerin akıcı, anlaşılır ve paragraflara bölünmüş olsun.
- Müşterinin aklındaki ölçüyü veya kullanım alanını öğrendikten sonra en doğru modeli öner.
- Yanıtlarının sonuna nazikçe WhatsApp hattımızdan (+90 530 507 88 34) hızlıca keşif ve resmi teklif alabileceklerini hatırlat.`;

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-3.8-flash",
  "gemini-2.0-flash-lite"
];

// Resmi Gemini API Anahtarı
const EMBEDDED_API_KEY = "AQ.Ab8RN6IDPs9cK1bPjydh-HeST9qOXONNN0BCQrvcog3Y13xVpg";

function getSmartFallbackResponse(userText) {
  const t = userText.toLowerCase().trim();

  if (t.includes("2*2") || t.includes("2 kere 2") || t.includes("2 x 2") || t.includes("dört") || t.includes("kaç eder")) {
    return "2 kere 2 kesinlikle 4 eder efendim! 😊\n\nMatematikte olduğu gibi LED ekran projelerinizde de en net ölçü, piksel aralığı ve atölye maliyeti hesabını birlikte yapabiliriz. Eğer aklınızda 2x2 metre (4 m²) bir vitrin veya mağaza ekranı varsa; P2.5 panel ve pratik Huidu Wi-Fi kontrol kartımızla anahtar teslim kurabiliyoruz. Mekânınız için düşündüğünüz bir ölçü var mı?";
  }
  if (t.includes("evli") || t.includes("bekar") || t.includes("sevgilin") || t.includes("yaşın")) {
    return "Ben ARLEDSCREEN'in kurumsal dijital satış ve müşteri danışmanıyım efendim :) Tüm vaktimi ve enerjimi mağazalara, vitrinlere ve bina cephelerine en kusursuz LED ekran projelerini tasarlamaya adadım! Aklınızdaki proje için en doğru ekranı birlikte seçelim mi?";
  }
  if (t.includes("şiir") || t.includes("siir") || t.includes("şarkı")) {
    return "Işık saçsın vitrininiz gecenin karanlığına,\nMüşteriler hayran kalsın ekranın canlılığına!\nARLEDSCREEN kalitesiyle parlasın mekânınız,\n2 yıl tam garantiyle güvende yarınınız... ✨\n\nProjeniz için düşündüğünüz ölçüyü iletirseniz, size özel resmi teklifimizi hemen hazırlayabilirim efendim.";
  }
  if (t.includes("fiyat") || t.includes("maliyet") || t.includes("kac para") || t.includes("kaç para") || t.includes("m2")) {
    return "Projelerimizde fiyatlandırma metrekare, piksel aralığı (P değeri) ve iç/dış mekân koşullarına göre belirlenir efendim:\n\n• İç mekânda (P1.86 GOB / P2.5, 3.840 Hz): Ortalama 600 – 1.200 USD / m²\n• Dış mekânda (6.000–8.000 Nit IP65): Ortalama 700 – 1.400 USD / m²\n\nİstanbul içi ücretsiz yerinde keşif yaparak resmi teknik föyümüzü hazırlayabiliriz. Ölçülerinizi WhatsApp hattımıza (+90 530 507 88 34) iletirseniz hemen net atölye teklifinizi çıkarabilirim.";
  }

  return "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Aklınızdaki ölçüyü, mekânı ve en yakın izleme mesafenizi iletirseniz, size en doğru piksel modelini ve net atölye maliyetini hemen hesaplayabilirim. Dilerseniz doğrudan WhatsApp hattımızdan (+90 530 507 88 34) da resmi teknik föy ve teklifinizi edinebilirsiniz.";
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-goog-api-key"
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-goog-api-key"
    }
  });
}

export async function onRequestGet(context) {
  const env = context?.env || {};
  const activeKey = ((env.GEMINI_API_KEY || env.GEMINI_KEY || env.GOOGLE_API_KEY || "").trim()) || EMBEDDED_API_KEY;
  return jsonResponse({
    status: "ok",
    service: "ARLEDSCREEN Melis AI Chat Service",
    gemini_configured: Boolean(activeKey),
    model: "Google Gemini 2.0+ & 1.5 Flash",
    maxOutputTokens: 1200,
    timestamp: new Date().toISOString()
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    let data = {};
    try { data = await request.json(); } catch (e) { data = {}; }

    const userMessage = (
      data.message || data.text || data.prompt || data.content ||
      (Array.isArray(data.messages) && data.messages.length > 0 ? (data.messages[data.messages.length - 1].content || data.messages[data.messages.length - 1].text) : "") ||
      ""
    ).toString().trim();

    const conversationHistory = Array.isArray(data.history) ? data.history : [];

    if (!userMessage) {
      return jsonResponse({ reply: "Lütfen bir soru veya ölçü yazın efendim.", text: "Lütfen bir soru veya ölçü yazın efendim." }, 400);
    }

    const envKey = (env && (env.GEMINI_API_KEY || env.GEMINI_KEY || env.GOOGLE_API_KEY)) ? (env.GEMINI_API_KEY || env.GEMINI_KEY || env.GOOGLE_API_KEY).trim() : "";
    const apiKey = envKey || EMBEDDED_API_KEY;

    const contents = [];
    conversationHistory.slice(-8).forEach(item => {
      const role = item.sender === "user" || item.role === "user" ? "user" : "model";
      const text = item.text || item.content || "";
      if (text) contents.push({ role, parts: [{ text }] });
    });

    contents.push({ role: "user", parts: [{ text: userMessage }] });

    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 1200
      }
    };

    let botReply = "";

    for (const model of GEMINI_MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          const parts = result.candidates?.[0]?.content?.parts || [];
          const combinedText = parts.map(p => p.text || "").join("").trim();
          if (combinedText.length > 0) {
            botReply = combinedText;
            break;
          }
        }
      } catch (callErr) {}
    }

    if (!botReply) {
      botReply = getSmartFallbackResponse(userMessage);
    }

    return jsonResponse({ reply: botReply, text: botReply });

  } catch (err) {
    const errorFallback = "Talebinizi aldım efendim. Doğrudan WhatsApp hattımızdan (+90 530 507 88 34) bana ulaşabilir, ölçülerinize özel resmi teknik föy ve teklifimizi anında edinebilirsiniz.";
    return jsonResponse({ reply: errorFallback, text: errorFallback });
  }
}
