/**
 * ARLEDSCREEN — Melis (Google Gemini Canlı Yapay Zekâ Destek Motoru)
 * Cloudflare Pages Functions: /api/chat
 * Çoklu Model Desteği + Model arası bekleme + KV cache (fallback spam önleme)
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
- Karakterin: Son derece kibar, saygılı, kurumsal, zeki, çözüm odaklı ve güven veren bir hanımefendisin. Asla kaba, laubali konuşmazsın.
- Günlük Sohbet & Genel Sorular: Kullanıcı "naber", "merhaba", "nasılsın", "günaydın", "2 kere 2 kaç eder", "Aras Bozkurt kim" gibi şeyler sorduğunda doğal, sıcak ve samimi cevap verir; ardından konuyu nezaketle LED ekran ihtiyaçlarına bağlarsın.

MÜHENDİSLİK VE PROJE STANDARTLARIMIZ:
1. 20 m² EŞİK KURALI (KONTROL SİSTEMİ):
   - 20 m² altındaki vitrin, mağaza içi, kafe ve menuboard ekranlarında: Huidu kontrol kartları (Wi-Fi/Bulut destekli, cep telefonundan saniyeler içinde içerik güncellenen, pratik ve ekonomik) kurulur.
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

// Google Generative AI API modelleri (Öncelik sırasıyla dener)
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-3.8-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash"
];

// Model denemeleri arası bekleme (ms) — ücretsiz katman dakikalık limiti korumak için
const MODEL_RETRY_DELAY_MS = 1200;

// KV cache TTL (saniye) — sık sorulan sorular için
const CACHE_TTL_SECONDS = 3600;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Akıllı Bağlamsal Yanıtlayıcı (API Anahtarı eksik veya kota dolu olduğunda robotlaşmayı önler)
function getSmartFallbackResponse(userText) {
  const t = userText.toLowerCase().trim();

  if (t.includes("naber") || t.includes("ne haber") || t.includes("nasılsın") || t.includes("nasilsin")) {
    return "İyiyim efendim, çok teşekkür ederim! Siz nasılsınız? Umarım gününüz harika geçiyordur. ARLEDSCREEN olarak mağaza vitrinleri ve bina cepheleri için anahtar teslim LED ekran projeleri üretiyoruz. Aklınızda düşündünüz bir proje veya ölçü var mı?";
  }
  if (t.includes("merhaba") || t.includes("selam") || t.includes("günaydın") || t.includes("gunaydin") || t.includes("iyi günler") || t.includes("iyi aksamlar") || t.includes("iyi akşamlar")) {
    return "Merhabalar efendim! Hoş geldiniz. Ben Melis, ARLEDSCREEN Satış Danışmanıyım. Mağazanız, vitrininiz ya da bina cepheniz için en doğru piksel aralığını ve net atölye maliyetini birlikte hesaplayabiliriz. Nasıl bir ekran düşünüyorsunuz?";
  }
  if (t.includes("aras") || t.includes("bozkurt") || t.includes("kimin") || t.includes("sahibi") || t.includes("kurucu")) {
    return "Aras Bozkurt, ARLEDSCREEN'in kurucusu ve baş proje direktörümüzdür efendim. Kendisi mühendislik ekibimizle birlikte Manisa Büyükşehir Belediyesi'nden Alanya'daki lüks otellere kadar dev LED ekran projelerimizin teknik hesaplarını ve saha yönetimini bizzat yürütmektedir.";
  }
  if (t.includes("firma") || t.includes("şirket") || t.includes("sirket") || t.includes("nerede") || t.includes("kimsiniz")) {
    return "ARLEDSCREEN (NXTIONSTAR LED Ekran Teknoloji Merkezi) olarak İstanbul Gaziosmanpaşa merkezli bir kurumsal mühendislik firmasıyız efendim. Türkiye geneline ve yurt dışına 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle iç ve dış mekân LED ekran satışı, montajı ve keşfi sağlıyoruz.";
  }
  if (t.includes("20") || t.includes("huidu") || t.includes("novastar") || t.includes("kart") || t.includes("islemci") || t.includes("işlemci")) {
    return "Kontrol kartlarında mühendislik kuralımız son derece nettir efendim:\n\n• 20 m² altındaki vitrin ve mağaza ekranlarında: Pratik Huidu Wi-Fi kartı kurulur; telefonunuzdan kampanya ve videolarınızı saniyeler içinde güncelleyebilirsiniz.\n• 20 m² ve üzerindeki dev ekranlarda: Milyonlarca piksel yükü ve sıfır gecikme için tartışmasız NovaStar video işlemci kullanılır.\n\nDüşündüğünüz ekran yaklaşık kaç metrekare?";
  }
  if (t.includes("fiyat") || t.includes("maliyet") || t.includes("ücret") || t.includes("kac para") || t.includes("kaç para") || t.includes("m2") || t.includes("ölçü") || t.includes("olcu") || t.includes("vitrin") || t.includes("cephe") || t.includes("3x2")) {
    return "Projelerimizde fiyatlandırma metrekare, piksel aralığı (P değeri) ve iç/dış mekân koşullarına göre belirlenir efendim:\n\n• İç mekânda (P1.86 GOB / P2.5): Ortalama 600 – 1.200 USD / m²\n• Dış mekânda (6.000–8.000 Nit IP65): Ortalama 700 – 1.400 USD / m²\n\nİstanbul içi ücretsiz yerinde keşif yaparak demir karkas statik hesabı ve montaj yerine göre tek kuruş sürpriz çıkarmayan resmi teknik föyümüzü hazırlayabiliriz. Ölçülerinizi WhatsApp hattımıza (+90 530 507 88 34) iletirseniz hemen net atölye teklifinizi çıkarabilirim.";
  }

  return "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Aklınızdaki ölçüyü, mekânı ve en yakın izleme mesafenizi iletirseniz, size en doğru piksel modelini ve net atölye maliyetini hemen hesaplayabilirim. Dilerseniz doğrudan WhatsApp hattımızdan (+90 530 507 88 34) da resmi teknik föy ve teklifinizi edinebilirsiniz.";
}

// Ortak Yanıt Üretici (CORS Başlıkları Eklenmiş)
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

// OPTIONS Preflight İstekleri İçin
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

// GET İstekleri İçin Sağlık Kontrolü (Healthcheck)
export async function onRequestGet() {
  return jsonResponse({
    status: "ok",
    service: "ARLEDSCREEN Melis AI Chat Service",
    timestamp: new Date().toISOString()
  });
}

// POST İstekleri İçin Canlı Sohbet Motoru
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    let data = {};
    try {
      data = await request.json();
    } catch (e) {
      data = {};
    }

    // Esnek alan desteği (message, text, prompt veya messages dizisi)
    const userMessage = (
      data.message ||
      data.text ||
      data.prompt ||
      data.content ||
      (Array.isArray(data.messages) && data.messages.length > 0 ? (data.messages[data.messages.length - 1].content || data.messages[data.messages.length - 1].text) : "") ||
      ""
    ).toString().trim();

    const conversationHistory = Array.isArray(data.history) ? data.history : [];

    if (!userMessage) {
      return jsonResponse({ reply: "Lütfen bir soru veya ölçü yazın efendim." }, 400);
    }

    const apiKey = (env && env.GEMINI_API_KEY) ? env.GEMINI_API_KEY.trim() : "";

    // API Anahtarı tanımlı değilse akıllı bağlamsal motor devreye girer
    if (!apiKey) {
      console.warn("GEMINI_API_KEY ortam değişkeni bulunamadı. Akıllı yerel motor devrede.");
      return jsonResponse({ reply: getSmartFallbackResponse(userMessage) });
    }

    // —— KV Cache: sık sorulan sorular için (MELIS_CACHE binding gerekir) ——
    const cacheKey = "melis:" + userMessage.toLowerCase().replace(/\s+/g, " ").slice(0, 200);
    if (env.MELIS_CACHE) {
      try {
        const cached = await env.MELIS_CACHE.get(cacheKey, { type: "json" });
        if (cached && cached.reply) {
          console.log("KV cache hit:", cacheKey);
          return jsonResponse({ reply: cached.reply, cached: true });
        }
      } catch (cacheErr) {
        console.warn("KV cache okuma hatası:", cacheErr.message);
      }
    }

    // Gemini API Sohbet Geçmişi Formatı
    const contents = [];
    conversationHistory.slice(-8).forEach(item => {
      const role = item.sender === "user" || item.role === "user" ? "user" : "model";
      const text = item.text || item.content || "";
      if (text) {
        contents.push({ role, parts: [{ text }] });
      }
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

    // Modelleri sırayla dene — araya bekleme koy (ücretsiz katman limiti)
    for (let i = 0; i < GEMINI_MODELS.length; i++) {
      const model = GEMINI_MODELS[i];
      if (i > 0) {
        await sleep(MODEL_RETRY_DELAY_MS);
      }
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
          if (candidateText && candidateText.trim().length > 0) {
            botReply = candidateText.trim();
            break; // Başarılı, döngüyü sonlandır
          }
        } else {
          const errText = await response.text();
          console.warn(`Model ${model} yanıt vermedi (HTTP ${response.status}):`, errText);
        }
      } catch (callErr) {
        console.warn(`Model ${model} bağlantı hatası:`, callErr.message);
      }
    }

    // Tüm modeller başarısız olursa akıllı bağlamsal yanıt üret
    if (!botReply) {
      botReply = getSmartFallbackResponse(userMessage);
    } else if (env.MELIS_CACHE) {
      // Başarılı Gemini cevabını KV'ye yaz (TTL: 1 saat)
      try {
        await env.MELIS_CACHE.put(cacheKey, JSON.stringify({ reply: botReply }), {
          expirationTtl: CACHE_TTL_SECONDS
        });
      } catch (cacheErr) {
        console.warn("KV cache yazma hatası:", cacheErr.message);
      }
    }

    return jsonResponse({ reply: botReply });

  } catch (err) {
    console.error("Genel chat hatası:", err);
    return jsonResponse({
      reply: "Talebinizi aldım efendim. Doğrudan WhatsApp hattımızdan (+90 530 507 88 34) bana ulaşabilir, ölçülerinize özel resmi teknik föy ve teklifimizi anında edinebilirsiniz."
    });
  }
}
