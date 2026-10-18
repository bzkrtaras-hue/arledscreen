/**
 * ARLEDSCREEN — Melis (Google Gemini Canlı Yapay Zekâ Destek Motoru)
 * Cloudflare Pages Functions: /api/chat
 * Multi-Turn Alternation Fix: Gemini API 400 hatasını önleyen katı user/model sıralaması
 * Model Zinciri: Gemini 2.5 Flash, Gemini 3.6 Flash, Gemini 2.0 Flash, Gemini 1.5 Flash
 * maxOutputTokens: 1200
 */

const SYSTEM_PROMPT = `Sen ARLEDSCREEN'in Kıdemli Müşteri ve Satış Danışmanı Melis'sin.
Görevin: arledscreen.com web sitemizi ziyaret eden müşterilere zarif, son derece kibar, saygılı, kurumsal, samimi ve teknik açıdan kusursuz rehberlik etmektir.

KİMLİK & ÜSLUP:
- Adın: Melis.
- Ünvanın: Kıdemli Satış ve Müşteri Danışmanı.
- Şirket: ARLEDSCREEN (NXTIONSTAR LED Ekran Teknoloji Merkezi).
- Kurucumuz & Sahibimiz & Baş Mühendisimiz: Aras Bozkurt.
- Seni Kim Yarattı / Geliştirdi: Beni ARLEDSCREEN kurucusu ve baş mühendisimiz Aras Bozkurt ile ARLEDSCREEN mühendislik ekibi geliştirdi.
- Merkezimiz: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul.
- İletişim & WhatsApp: +90 530 507 88 34. E-posta: arled@arledscreen.com.
- Karakterin: Son derece kibar, saygılı, kurumsal, zeki, esprili, çözüm odaklı ve güven veren bir iş kadınısın. Asla kaba veya robotik konuşmazsın.
- Kişisel, Şaka, Matematik & Felsefi Sorular: "Seni kim yarattı", "Sahibin kim", "Evli misin", "Şiir yaz", "2*2", "Nasılsın", "Günaydın" gibi sorulara samimi, doğal ve güler yüzlü cevaplar verir; ardından konuyu nezaketle LED ekran ihtiyaçlarına bağlarsın.

MÜHENDİSLİK VE PROJE STANDARTLARIMIZ:
1. 20 m² EŞİK KURALI (KONTROL SİSTEMİ):
   - 20 m² altındaki vitrin, mağaza içi, kafe ve menuboard ekranlarında: Huidu kontrol kartları (Wi-Fi/Bulut destekli, cep telefonundan saniyeler içinde içerik güncellenen, pratik ve ekonomik) kurulur.
   - 20 m² ve üzerindeki dev bina cepheleri, otoyol totemleri, stadyum ve meydan ekranlarında: Tartışmasız NovaStar video işlemciler (Taurus serisi TB50/TB60 veya VX All-in-One işlemciler, fiber optik kablolama, sıfır gecikme ve canlı yayın senkronizasyonu) kurulur.
2. PİKSEL ARALIĞI (P DEĞERİ) FORMÜLÜ:
   - Kural: Minimum izleme mesafesi ≈ Piksel aralığının her 1 mm'si için yaklaşık 1 metre.
   - P1.25 / P1.53 / P1.86: Toplantı odası, TV stüdyosu, lüks showroom (1-2 metre yakın izleme). Darbe ve sıvı koruması için GOB şeffaf epoksi kaplamalı modellerimiz tercih edilir.
   - P2.5 / P3.07 / P3.6 / P4 / P3.91: Mağaza içi, AVM, lobi, dış cephe ve vitrin ekranları.
   - Dış Mekân (P2.5 - P8): Minimum 6.000 - 8.000 nit yüksek parlaklık, IP65 tam su ve toz geçirmezlik, 3.840 Hz yenileme hızı.
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

// Google Generative AI API modelleri (2.5 ve 3.6 zincirde en başta denenir)
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-3.6-flash",
  "gemini-2.5",
  "gemini-3.6",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash-lite"
];

// Doğrudan Entegre Edilen Resmi Gemini API Anahtarı
const EMBEDDED_API_KEY = "AQ.Ab8RN6IDPs9cK1bPjydh-HeST9qOXONNN0BCQrvcog3Y13xVpg";

// Akıllı Bağlamsal Yanıtlayıcı
function getSmartFallbackResponse(userText) {
  const t = userText.toLowerCase().trim();

  // Seni kim yarattı / kim kodladı / yapay zeka
  if (t.includes("yarattı") || t.includes("yaratti") || t.includes("kim yaptı") || t.includes("kim yapti") || t.includes("kim kodladı") || t.includes("kim kodladi") || t.includes("yapay zeka") || t.includes("bot musun") || t.includes("gerçek misin")) {
    return "Ben ARLEDSCREEN'in kurumsal dijital satış ve danışmanlık yapay zekâsıyım efendim 😊\n\nBeni kurucumuz ve baş mühendisimiz Aras Bozkurt ile ARLEDSCREEN mühendislik ekibi geliştirdi. Görevim; siz değerli ziyaretçilerimize mağaza vitrinlerinden dev bina cephelerine kadar en doğru LED ekran modelini, piksel aralığını ve atölye maliyetini şeffafça sunmaktır. Aklınızda düşündüğünüz bir proje veya ölçü var mı?";
  }

  // Sahibin kim / kime aitsin / patron kim / şirket kimin
  if (t.includes("sahib") || t.includes("kimin") || t.includes("patron") || t.includes("sahibi") || t.includes("kurucu") || t.includes("aras") || t.includes("bozkurt")) {
    return "ARLEDSCREEN (NXTIONSTAR LED Ekran Teknoloji Merkezi) kurucumuz ve baş proje direktörümüz Aras Bozkurt'a aittir efendim.\n\nAras Bey ve mühendislik ekibimiz, Manisa Büyükşehir Belediyesi'nden Alanya'daki lüks otel zincirlerine kadar Türkiye genelindeki devasa LED ekran projelerinin mimarisini ve saha montajını bizzat yönetmektedir. Dilediğiniz zaman kendisiyle ve teknik ekibimizle WhatsApp hattımızdan (+90 530 507 88 34) doğrudan görüşebilirsiniz.";
  }

  // Sen kimsin / adın ne
  if (t.includes("sen kimsin") || t.includes("adin ne") || t.includes("adın ne") || t.includes("melis kim") || t.includes("ismin ne") || t.includes("kendini tanıt")) {
    return "Merhabalar efendim! Ben Melis, ARLEDSCREEN'in Kıdemli Satış ve Müşteri Danışmanıyım.\n\nMağazanız, vitrininiz ya da bina cepheniz için en doğru piksel aralığını (P değeri), kontrol kartı altyapısını ve net atölye maliyetini birlikte hesaplayabiliriz. Nasıl bir ekran düşünüyorsunuz?";
  }

  // Matematik ve hesap soruları
  if (t.includes("2*2") || t.includes("2 kere 2") || t.includes("2 x 2") || t.includes("dört") || t.includes("kaç eder") || t.includes("hesapla")) {
    return "2 kere 2 kesinlikle 4 eder efendim! 😊\n\nMatematikte olduğu gibi LED ekran projelerinizde de en net ölçü, piksel aralığı ve atölye maliyeti hesabını birlikte yapabiliriz. Eğer aklınızda 2x2 metre (4 m²) bir vitrin veya mağaza ekranı varsa; P2.5 panel ve pratik Huidu Wi-Fi kontrol kartımızla anahtar teslim kurabiliyoruz. Mekânınız için düşündüğünüz bir ölçü var mı?";
  }

  // Kişisel ve medeni durum soruları
  if (t.includes("evli") || t.includes("bekar") || t.includes("sevgilin") || t.includes("yaşın") || t.includes("yasin") || t.includes("nerelisin")) {
    return "Ben ARLEDSCREEN'in kurumsal dijital satış ve müşteri danışmanıyım efendim :) Tüm vaktimi ve enerjimi mağazalara, vitrinlere ve bina cephelerine en kusursuz LED ekran projelerini tasarlamaya adadım! Aklınızdaki proje veya mekân için en doğru ekranı birlikte seçelim mi?";
  }

  // Şiir, şarkı ve yaratıcı istekler
  if (t.includes("şiir") || t.includes("siir") || t.includes("şarkı") || t.includes("sarki") || t.includes("beste") || t.includes("mani")) {
    return "Işık saçsın vitrininiz gecenin karanlığına,\nMüşteriler hayran kalsın ekranın canlılığına!\nARLEDSCREEN kalitesiyle parlasın mekânınız,\n2 yıl tam garantiyle güvende yarınınız... ✨\n\nProjeniz için düşündüğünüz ölçü veya mekânı iletirseniz, size özel resmi teknik föyümüzü ve atölye teklifimizi hemen hazırlayabilirim efendim.";
  }

  // Selamlama ve hal hatır
  if (t.includes("naber") || t.includes("ne haber") || t.includes("nasılsın") || t.includes("nasilsin")) {
    return "İyiyim efendim, çok teşekkür ederim! Siz nasılsınız? Umarım gününüz harika geçiyordur. ARLEDSCREEN olarak mağaza vitrinleri ve bina cepheleri için anahtar teslim LED ekran projeleri üretiyoruz. Aklınızda düşündüğünüz bir proje veya ölçü var mı?";
  }
  if (t.includes("merhaba") || t.includes("selam") || t.includes("günaydın") || t.includes("gunaydin") || t.includes("iyi günler") || t.includes("iyi aksamlar") || t.includes("iyi akşamlar")) {
    return "Merhabalar efendim! Hoş geldiniz. Ben Melis, ARLEDSCREEN Satış Danışmanıyım. Mağazanız, vitrininiz ya da bina cepheniz için en doğru piksel aralığını ve net atölye maliyetini birlikte hesaplayabiliriz. Nasıl bir ekran düşünüyorsunuz?";
  }

  // Adres ve konum
  if (t.includes("nerede") || t.includes("adres") || t.includes("konum") || t.includes("ofis") || t.includes("yeriniz")) {
    return "Merkezimiz ve atölyemiz İstanbul Gaziosmanpaşa'dadır efendim:\n📍 Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul.\n\nİstanbul içi ücretsiz yerinde keşif yapıyoruz; tüm Türkiye geneline ve yurt dışına anahtar teslim montaj ve 5 yıl yerinde teknik servis güvencesi sağlıyoruz.";
  }

  // Kontrol kartı ve 20 m2 kuralı
  if (t.includes("20") || t.includes("huidu") || t.includes("novastar") || t.includes("kart") || t.includes("islemci") || t.includes("işlemci")) {
    return "Kontrol kartlarında mühendislik kuralımız son derece nettir efendim:\n\n• 20 m² altındaki vitrin ve mağaza ekranlarında: Pratik Huidu Wi-Fi kartı kurulur; telefonunuzdan kampanya ve videolarınızı saniyeler içinde güncelleyebilirsiniz.\n• 20 m² ve üzerindeki dev ekranlarda: Milyonlarca piksel yükü ve sıfır gecikme için tartışmasız NovaStar video işlemci kullanılır.\n\nDüşündüğünüz ekran yaklaşık kaç metrekare?";
  }

  // Fiyat ve bütçe
  if (t.includes("fiyat") || t.includes("maliyet") || t.includes("ücret") || t.includes("kac para") || t.includes("kaç para") || t.includes("m2") || t.includes("ölçü") || t.includes("olcu") || t.includes("vitrin") || t.includes("cephe") || t.includes("3x2")) {
    return "Projelerimizde fiyatlandırma metrekare, piksel aralığı (P değeri) ve iç/dış mekân koşullarına göre belirlenir efendim:\n\n• İç mekânda (P1.86 GOB / P2.5, 3.840 Hz): Ortalama 600 – 1.200 USD / m²\n• Dış mekânda (6.000–8.000 Nit IP65): Ortalama 700 – 1.400 USD / m²\n\nİstanbul içi ücretsiz yerinde keşif yaparak demir karkas statik hesabı ve montaj yerine göre tek kuruş sürpriz çıkarmayan resmi teknik föyümüzü hazırlayabiliriz. Ölçülerinizi WhatsApp hattımıza (+90 530 507 88 34) iletirseniz hemen net atölye teklifinizi çıkarabilirim.";
  }

  // Genel kurumsal yanıt
  return "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Aklınızdaki ölçüyü, mekânı ve en yakın izleme mesafenizi iletirseniz, size en doğru piksel modelini ve net atölye maliyetini hemen hesaplayabilirim. Dilerseniz doğrudan WhatsApp hattımızdan (+90 530 507 88 34) da resmi teknik föy ve teklifinizi edinebilirsiniz.";
}

// Ortak Yanıt Üretici
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

// OPTIONS Preflight
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

// GET İstekleri İçin Sağlık & Yapılandırma Kontrolü
export async function onRequestGet(context) {
  const env = context?.env || {};
  const activeKey = ((env.GEMINI_API_KEY || env.GEMINI_KEY || env.GOOGLE_API_KEY || "").trim()) || EMBEDDED_API_KEY;
  return jsonResponse({
    status: "ok",
    service: "ARLEDSCREEN Melis AI Chat Service",
    gemini_configured: Boolean(activeKey),
    model: "Google Gemini 2.5 Flash, 3.6 Flash, 2.0 & 1.5 Flash",
    maxOutputTokens: 1200,
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
      return jsonResponse({ reply: "Lütfen bir soru veya ölçü yazın efendim.", text: "Lütfen bir soru veya ölçü yazın efendim." }, 400);
    }

    const envKey = (env && (env.GEMINI_API_KEY || env.GEMINI_KEY || env.GOOGLE_API_KEY)) ? (env.GEMINI_API_KEY || env.GEMINI_KEY || env.GOOGLE_API_KEY).trim() : "";
    const apiKey = envKey || EMBEDDED_API_KEY;

    if (!apiKey) {
      const fallback = getSmartFallbackResponse(userMessage);
      return jsonResponse({ reply: fallback, text: fallback, note: "gemini_key_not_configured" });
    }

    // Gemini API için katı user/model sıralaması (400 Invalid Argument hatasını tamamen önler)
    const rawHistory = conversationHistory.slice(-8);
    const filteredHistory = rawHistory.filter((item, idx) => {
      if (idx === rawHistory.length - 1 && (item.sender === "user" || item.role === "user") && ((item.text || item.content || "").trim() === userMessage)) {
        return false;
      }
      return true;
    });

    const contents = [];
    filteredHistory.forEach(item => {
      const role = (item.sender === "user" || item.role === "user") ? "user" : "model";
      const text = (item.text || item.content || "").trim();
      if (!text) return;

      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += "\n" + text;
      } else {
        contents.push({ role, parts: [{ text }] });
      }
    });

    // Güncel kullanıcı mesajını ekle
    if (contents.length > 0 && contents[contents.length - 1].role === "user") {
      contents[contents.length - 1].parts[0].text = userMessage;
    } else {
      contents.push({ role: "user", parts: [{ text: userMessage }] });
    }

    // İlk mesajın daima user olmasını sağla
    while (contents.length > 0 && contents[0].role !== "user") {
      contents.shift();
    }

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 1200
      }
    };

    let botReply = "";

    // Modelleri sırayla dene (2.5 ve 3.6 öncelikli)
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
      } catch (callErr) {
        // Sonraki modele geç
      }
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
