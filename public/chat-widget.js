/**
 * ARLEDSCREEN — Melis (Google Gemini 2.0+ Destekli Canlı Destek Widget'ı)
 * UI Tasarımı: image_2.png Birebir Görsel Uyumu (Navy Header, Light Dotted Matrix Arka Plan,
 * Melis Portresi, Yatay Hap Butonlar, Mikrofon & Gönder İkonları)
 */
(function() {
  if (document.getElementById('melis-widget-container')) return;

  // Melis Portre Avatarı (Öncelikli WebP dosyası, yüklenemezse anında devreye giren Base64 yedek)
  const AVATAR_PRIMARY = '/brand/canli-destek-avatar.webp';
  const AVATAR_FALLBACK = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABkAGQDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAcIAQMFBgQC/8QAMhAAAQMEAQEGAwcFAAAAAAAAAQACAwQFBhEHEggTITFBURQikRUjMkJhcbFSYnKBof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AgpERaZEREGHENG3LpUFhyCvg76hs9VLH/UYiFKnZb42ps1ySe7XiLvLZbnD7o+Urj5KfuT+WMN4zrqGxyUUMkjiGuijjA7pvoSosUhrKeqo6g09bTTU8o8xIwt/laiNFXr5BwvFeWMA+06GKETyQGSkqo26IIG9H3VOcIw+vyLkCDEtGOfviyU/2tPihHDt9BcbjKYrbQ1FU4eZZGSPqttys16tg6rja6qnafzd2dK8F5qcG4TwSOSSlgja1oABaC+Z3r4rlYjyxxvyLZ6mjucVNS+GnwzsA8D6goRSb02DtPTex9V7zmHFbNZOQBQ4zXR1NurpWiEtdsRlx8VJ2Rdm2O2YBJeor0X3GOETOBHynw3pEV0LgDonxRfqMb6g78TXFp/cIqMIiICO/A/8AxP8ACIfIj3GkFy+xhTwx8Zd8wDvJHnrKrx2mJ5Kjmi+ib5uhgDdjy8FL3Ylymm+DuGMVMzY5o3B1O1x11j10uf2mOHssvWefb+MUPx0Vfpkzd67r0JUaSd2S6iWfhmgjlJLWdYG1HnElBTM7VOSljW7hHyD235qYeN7NDxrxJBRXSdkRo4HPme4/mPjpVg4dzuCn5+nyCuk7ukuEz43PP76agsfzRieMXqqor7nFeyGyWzZMDj4SErlY/hHDGeWeWKw0kM0TB0l0LixzPYrZ2n8IvmdYbCzHnmaWA9Yha7QlBXk+yhxllmJ19Zdb/E6gjlADKfq2HfqoIH5owObjjMzQMqJZqN7g+kle4k+//F9N15mz644mcbqquYUhYI3Td1rqaPTqXvO2HebZX8i2a2iRsnwUrfiuk76Wk+Kk/NoOLm8KPMPwIpvhx3JaR3nXr6qpqmkUcnRtrSQfHevNF6THqi1strW1Dx1hx1senoio8yiIiCIiD7LLdLjZbrBdLVVOpauA7Y9p/lTtYO1LkFHQthulhFdO0aMod09X66VfUQSRynzLlWfQGhnJoLcTs07T4u/2o3HylpYS3pOxr390RBMnHnaHyvF7fFbbhSm700I1ESdFo9trr5X2ncluVE+mtFpFse8a70nq0oERRW6vq6q4VstdWzunqZndUkjjslatvLegzzuYPJhkPT9FhFUNfqiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiDBcAizrfkEQEREBERAREQEREBERAREQYPmiIqP//Z';

  const MEMORY_KEY = 'arled_melis_chat_memory_v2';
  let isMuted = false;

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(MEMORY_KEY)) || [];
    } catch(e) {
      return [];
    }
  }

  function saveHistory(hist) {
    try {
      localStorage.setItem(MEMORY_KEY, JSON.stringify(hist));
    } catch(e) {}
  }

  // Web Audio API ile Orijinal iPhone Tri-Tone Bildirim Zili
  function playIPhoneNotificationSound() {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const tones = [
        { freq: 1046.50, start: 0.00, dur: 0.22 }, // C6
        { freq: 1318.51, start: 0.10, dur: 0.24 }, // E6
        { freq: 2093.00, start: 0.22, dur: 0.55 }  // C7
      ];

      tones.forEach(t => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(t.freq, now + t.start);
        gain.gain.setValueAtTime(0.001, now + t.start);
        gain.gain.exponentialRampToValueAtTime(0.28, now + t.start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t.start + t.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t.start);
        osc.stop(now + t.start + t.dur);
      });
    } catch(e) {}
  }

  function formatMarkdown(text) {
    if (!text) return "";
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  const style = document.createElement('style');
  style.textContent = `
    #melis-widget-container {
      position: fixed;
      bottom: max(20px, env(safe-area-inset-bottom, 20px));
      right: max(20px, env(safe-area-inset-right, 20px));
      z-index: 99999999;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* iOS BİLDİRİM BALONU */
    #melis-notification-bubble {
      position: absolute;
      bottom: 78px;
      right: 0;
      width: 320px;
      max-width: calc(100vw - 40px);
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 18px;
      padding: 13px 15px;
      box-shadow: 0 16px 36px rgba(15, 23, 42, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06);
      display: flex;
      gap: 12px;
      align-items: center;
      cursor: pointer;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #melis-notification-bubble.show {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: auto;
    }
    .melis-bubble-avatar-wrap {
      position: relative;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    .melis-bubble-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1.5px solid #2563EB;
      object-fit: cover;
      background: #0B1B3D;
    }
    .melis-bubble-online {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background: #10B981;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
    }
    .melis-bubble-content { flex: 1; min-width: 0; }
    .melis-bubble-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }
    .melis-bubble-title { font-size: 13px; font-weight: 700; color: #0F172A; }
    .melis-bubble-time { font-size: 11px; color: #94A3B8; }
    .melis-bubble-text { font-size: 12.5px; color: #475569; line-height: 1.4; }
    .melis-bubble-close {
      background: transparent;
      border: none;
      color: #94A3B8;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }

    /* TETİK BUTONU */
    #melis-chat-trigger {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      background: #0B1B3D;
      box-shadow: 0 10px 28px rgba(11, 27, 61, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2.5px solid #2563EB;
      position: relative;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
      touch-action: manipulation;
    }
    #melis-chat-trigger:hover {
      transform: scale(1.06);
      box-shadow: 0 14px 34px rgba(11, 27, 61, 0.6);
    }
    #melis-chat-trigger:active { transform: scale(0.95); }
    .melis-trigger-avatar {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      object-fit: cover;
    }
    .melis-online-dot {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 15px;
      height: 15px;
      background: #10B981;
      border: 2.5px solid #FFFFFF;
      border-radius: 50%;
    }
    .melis-unread-counter {
      position: absolute;
      top: -3px;
      left: -3px;
      background: #EF4444;
      color: #FFF;
      font-size: 11px;
      font-weight: 800;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFFFFF;
    }

    /* SOHBET PENCERESİ */
    #melis-chat-window {
      position: fixed;
      bottom: max(96px, calc(env(safe-area-inset-bottom, 20px) + 76px));
      right: max(20px, env(safe-area-inset-right, 20px));
      width: 420px;
      max-width: calc(100vw - 32px);
      height: 650px;
      max-height: calc(100vh - 120px);
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 24px;
      box-shadow: 0 24px 60px rgba(11, 27, 61, 0.25);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 99999999;
      animation: melisPop 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes melisPop {
      from { opacity: 0; transform: translateY(20px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width: 600px) {
      #melis-chat-window {
        bottom: 0 !important;
        right: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        border-radius: 0 !important;
        border: none !important;
      }
    }

    /* LACİVERT HEADER */
    .melis-header {
      background: #0B1B3D;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
    }
    .melis-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .melis-header-avatar-wrap {
      position: relative;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    .melis-header-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid #38BDF8;
      object-fit: cover;
      background: #080D1A;
    }
    .melis-header-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background: #10B981;
      border: 2px solid #0B1B3D;
      border-radius: 50%;
    }
    .melis-header-titles {
      display: flex;
      flex-direction: column;
    }
    .melis-header-name {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.2px;
    }
    .melis-header-sub {
      font-size: 12px;
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 1px;
    }
    .melis-status-indicator {
      width: 7px;
      height: 7px;
      background: #10B981;
      border-radius: 50%;
    }
    .melis-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .melis-header-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #16284F;
      border: none;
      color: #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.15s;
    }
    .melis-header-btn:hover { background: #2563EB; color: #FFF; }

    /* AÇIK RENKLİ NOKTALI MATRIX ARKA PLAN */
    .melis-body {
      flex: 1;
      padding: 18px 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background-color: #F8FAFC;
      background-image: radial-gradient(#CBD5E1 1.2px, transparent 1.2px);
      background-size: 18px 18px;
      scroll-behavior: smooth;
    }

    /* MESAJ DİZİLİMİ */
    .melis-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      max-width: 90%;
    }
    .melis-row-bot {
      align-self: flex-start;
    }
    .melis-row-user {
      align-self: flex-end;
      flex-direction: row-reverse;
      max-width: 82%;
    }

    .melis-msg-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #CBD5E1;
      object-fit: cover;
      flex-shrink: 0;
      background: #0B1B3D;
      margin-top: 2px;
    }

    .melis-bubble-bot {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 18px;
      border-top-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      padding: 12px 16px;
      color: #1E293B;
      font-size: 13.5px;
      line-height: 1.55;
      word-break: break-word;
    }
    .melis-bubble-bot-author {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 5px;
    }
    .melis-bubble-bot-author span.dot {
      width: 6px;
      height: 6px;
      background: #10B981;
      border-radius: 50%;
    }

    .melis-bubble-user {
      background: #2563EB;
      border-radius: 18px;
      border-bottom-right-radius: 4px;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
      padding: 11px 16px;
      color: #FFFFFF;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
    }
    .melis-bubble-user-author {
      font-size: 10.5px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 3px;
      text-align: right;
    }

    .melis-whatsapp-card {
      margin-top: 10px;
      padding: 8px 10px;
      background: #F0FDF4;
      border: 1px solid #BBF7D0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .melis-whatsapp-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #15803D !important;
      font-size: 12.5px;
      font-weight: 700;
      text-decoration: none;
    }
    .melis-whatsapp-link:hover { text-decoration: underline; }

    /* YAZIYOR İNDİKATÖRÜ */
    .melis-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 14px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      width: fit-content;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .melis-typing-dot {
      width: 6px;
      height: 6px;
      background: #3B82F6;
      border-radius: 50%;
      animation: melisBounce 1.4s infinite ease-in-out both;
    }
    .melis-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .melis-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes melisBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    /* YATAY KAYDIRILABİLİR HAP BUTONLAR */
    .melis-pills-bar {
      padding: 10px 14px 6px 14px;
      background: #FFFFFF;
      border-top: 1px solid #F1F5F9;
      display: flex;
      gap: 8px;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .melis-pills-bar::-webkit-scrollbar { display: none; }
    .melis-pill {
      background: #FFFFFF;
      color: #1D4ED8;
      border: 1.5px solid #3B82F6;
      border-radius: 9999px;
      padding: 7px 15px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .melis-pill:hover, .melis-pill:active {
      background: #2563EB;
      color: #FFFFFF;
    }

    /* ALT GİRİŞ ÇUBUĞU */
    .melis-footer {
      padding: 10px 14px 14px 14px;
      background: #FFFFFF;
      display: flex;
      gap: 8px;
      align-items: center;
      padding-bottom: max(14px, env(safe-area-inset-bottom, 14px));
    }
    .melis-input {
      flex: 1;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      border-radius: 16px;
      padding: 12px 16px;
      color: #0F172A;
      font-size: 16px !important;
      outline: none;
      transition: border-color 0.15s;
    }
    .melis-input:focus { border-color: #2563EB; }
    .melis-input::placeholder { color: #94A3B8; font-size: 13.5px; }

    .melis-mic-btn {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      color: #2563EB;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s;
    }
    .melis-mic-btn:hover { background: #EFF6FF; border-color: #2563EB; }
    .melis-mic-btn.listening { background: #EF4444; color: #FFF; border-color: #EF4444; }

    .melis-send-btn {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: #1D4ED8;
      border: none;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s, transform 0.1s;
    }
    .melis-send-btn:hover { background: #1E40AF; }
    .melis-send-btn:active { transform: scale(0.95); }
    .melis-send-btn svg { width: 20px; height: 20px; fill: currentColor; }
  `;
  document.head.appendChild(style);

  // Widget DOM Oluşturma
  const container = document.createElement('div');
  container.id = 'melis-widget-container';
  container.innerHTML = `
    <!-- iOS Bildirim Balonu -->
    <div id="melis-notification-bubble" onclick="melisOpenAndReadNotification()">
      <div class="melis-bubble-avatar-wrap">
        <img class="melis-bubble-avatar" src="${AVATAR_PRIMARY}" onerror="this.onerror=null;this.src='${AVATAR_FALLBACK}';" alt="Melis">
        <div class="melis-bubble-online"></div>
      </div>
      <div class="melis-bubble-content">
        <div class="melis-bubble-header">
          <span class="melis-bubble-title">Melis • Canlı Destek</span>
          <span class="melis-bubble-time">Şimdi</span>
        </div>
        <div class="melis-bubble-text">👋 Merhabalar! Projeniz için en doğru LED ekran modelini ve maliyetini birlikte hesaplayalım mı?</div>
      </div>
      <button class="melis-bubble-close" onclick="melisDismissBubble(event)">&times;</button>
    </div>

    <!-- Tetik Butonu -->
    <div id="melis-chat-trigger" onclick="melisToggleChat()">
      <img class="melis-trigger-avatar" src="${AVATAR_PRIMARY}" onerror="this.onerror=null;this.src='${AVATAR_FALLBACK}';" alt="Melis">
      <div class="melis-online-dot"></div>
      <div id="melisUnreadBadge" class="melis-unread-counter">1</div>
    </div>

    <!-- Sohbet Penceresi -->
    <div id="melis-chat-window">
      <!-- Lacivert Header -->
      <div class="melis-header">
        <div class="melis-header-left">
          <div class="melis-header-avatar-wrap">
            <img class="melis-header-avatar" src="${AVATAR_PRIMARY}" onerror="this.onerror=null;this.src='${AVATAR_FALLBACK}';" alt="Melis">
            <div class="melis-header-dot"></div>
          </div>
          <div class="melis-header-titles">
            <div class="melis-header-name">Melis • Canlı Destek</div>
            <div class="melis-header-sub">
              <span class="melis-status-indicator"></span> Çevrim içi
            </div>
          </div>
        </div>
        <div class="melis-header-actions">
          <button class="melis-header-btn" id="melisMuteBtn" title="Sesi Aç/Kapat" onclick="melisToggleMute()">🔊</button>
          <button class="melis-header-btn" title="Geçmişi Temizle" onclick="melisClearMemory()">🗑️</button>
          <button class="melis-header-btn" title="Kapat" onclick="melisToggleChat()">&times;</button>
        </div>
      </div>

      <!-- Açık Noktalı Matrix Arka Plan -->
      <div class="melis-body" id="melisChatBody"></div>

      <!-- Yatay Hap Butonlar -->
      <div class="melis-pills-bar">
        <button class="melis-pill" onclick="melisSendPill('İç mekân')">İç mekân</button>
        <button class="melis-pill" onclick="melisSendPill('Dış mekân')">Dış mekân</button>
        <button class="melis-pill" onclick="melisSendPill('Kafe / restoran')">Kafe / restoran</button>
        <button class="melis-pill" onclick="melisSendPill('Mağaza vitrini')">Mağaza vitrini</button>
        <button class="melis-pill" onclick="melisSendPill('200x120 cm')">200x120 cm</button>
        <button class="melis-pill" onclick="melisSendPill('P2.5 İç Mekân')">P2.5 İç Mekân</button>
        <button class="melis-pill" onclick="melisSendPill('3.840 Hz Tazeleme')">3.840 Hz Tazeleme</button>
        <button class="melis-pill" onclick="melisSendPill('20 m² Huidu vs NovaStar kuralınız nedir?')">NovaStar vs Huidu</button>
      </div>

      <!-- Giriş Çubuğu -->
      <div class="melis-footer">
        <input type="text" id="melisUserInput" class="melis-input" placeholder="Örn. kafe vitrini 3x2 m iç mekân" onkeypress="melisHandleKey(event)">
        <button class="melis-mic-btn" id="melisMicBtn" title="Sesle Yaz" onclick="melisToggleSpeech()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
        </button>
        <button class="melis-send-btn" onclick="melisSendMessage()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Ses Durumu
  window.melisToggleMute = function() {
    isMuted = !isMuted;
    const btn = document.getElementById('melisMuteBtn');
    if (btn) btn.textContent = isMuted ? '🔇' : '🔊';
  };

  // Sohbet Geçmişi Render
  function renderHistory() {
    const chatBody = document.getElementById('melisChatBody');
    if (!chatBody) return;
    chatBody.innerHTML = '';
    const hist = getHistory();

    if (hist.length > 0) {
      hist.forEach(m => {
        appendMessageUI(m.sender, m.text);
      });
    } else {
      appendMessageUI('bot', 'Merhaba, ben Melis.');
      appendMessageUI('bot', 'Ekranı nerede kullanmayı düşünüyorsunuz?');
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendMessageUI(sender, text) {
    const chatBody = document.getElementById('melisChatBody');
    if (!chatBody) return;

    const row = document.createElement('div');
    if (sender === 'user') {
      row.className = 'melis-row melis-row-user';
      row.innerHTML = `
        <div class="melis-bubble-user">
          <div class="melis-bubble-user-author">Siz</div>
          <div>${formatMarkdown(text)}</div>
        </div>
      `;
    } else {
      row.className = 'melis-row melis-row-bot';
      let html = `
        <img class="melis-msg-avatar" src="${AVATAR_PRIMARY}" onerror="this.onerror=null;this.src='${AVATAR_FALLBACK}';" alt="Melis">
        <div class="melis-bubble-bot">
          <div class="melis-bubble-bot-author"><span class="dot"></span> Melis</div>
          <div>${formatMarkdown(text)}</div>
      `;

      if (text.length > 80 && (text.includes('USD') || text.includes('Garanti') || text.includes('WhatsApp') || text.includes('keşif') || text.includes('m²'))) {
        html += `
          <div class="melis-whatsapp-card">
            <a class="melis-whatsapp-link" href="https://wa.me/905305078834?text=${encodeURIComponent('Merhabalar Melis Hanım, arledscreen.com canlı destekten ulaşıyorum: ' + text.slice(0, 100))}" target="_blank">
              📲 WhatsApp Teklif Hattı (+90 530 507 88 34)
            </a>
          </div>
        `;
      }

      html += `</div>`;
      row.innerHTML = html;
    }
    chatBody.appendChild(row);
  }

  renderHistory();

  // Bildirim sesi ve balonu açılışı (2.2 saniye gecikmeyle)
  setTimeout(() => {
    const bubble = document.getElementById('melis-notification-bubble');
    if (bubble && !bubble.classList.contains('dismissed')) {
      playIPhoneNotificationSound();
      bubble.classList.add('show');
    }
  }, 2200);

  window.melisOpenAndReadNotification = function() {
    const bubble = document.getElementById('melis-notification-bubble');
    if (bubble) bubble.classList.remove('show');
    const badge = document.getElementById('melisUnreadBadge');
    if (badge) badge.style.display = 'none';
    melisToggleChat();
  };

  window.melisDismissBubble = function(e) {
    e.stopPropagation();
    const bubble = document.getElementById('melis-notification-bubble');
    if (bubble) {
      bubble.classList.remove('show');
      bubble.classList.add('dismissed');
    }
  };

  window.melisToggleChat = function() {
    const win = document.getElementById('melis-chat-window');
    const isVisible = (win.style.display === 'flex');
    win.style.display = isVisible ? 'none' : 'flex';

    if (!isVisible) {
      const badge = document.getElementById('melisUnreadBadge');
      if (badge) badge.style.display = 'none';
      const bubble = document.getElementById('melis-notification-bubble');
      if (bubble) bubble.classList.remove('show');
      document.getElementById('melisUserInput').focus();
      const body = document.getElementById('melisChatBody');
      body.scrollTop = body.scrollHeight;
    }
  };

  window.melisClearMemory = function() {
    if (confirm('Sohbet geçmişini sıfırlamak istiyor musunuz?')) {
      localStorage.removeItem(MEMORY_KEY);
      renderHistory();
    }
  };

  window.melisHandleKey = function(e) {
    if (e.key === 'Enter') melisSendMessage();
  };

  window.melisSendPill = function(text) {
    document.getElementById('melisUserInput').value = text;
    melisSendMessage();
  };

  // Sesli Giriş (Web Speech API)
  let recognition = null;
  window.melisToggleSpeech = function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tarayıcınız sesle yazmayı desteklemiyor. Lütfen klavyeyi kullanın.");
      return;
    }

    const micBtn = document.getElementById('melisMicBtn');
    if (recognition) {
      recognition.stop();
      recognition = null;
      micBtn.classList.remove('listening');
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micBtn.classList.add('listening');

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('melisUserInput').value = transcript;
      melisSendMessage();
    };

    recognition.onerror = function() {
      micBtn.classList.remove('listening');
      recognition = null;
    };

    recognition.onend = function() {
      micBtn.classList.remove('listening');
      recognition = null;
    };

    recognition.start();
  };

  // Mesaj Gönderme
  window.melisSendMessage = async function() {
    const input = document.getElementById('melisUserInput');
    const userText = input.value.trim();
    if (!userText) return;

    const chatBody = document.getElementById('melisChatBody');
    const hist = getHistory();

    appendMessageUI('user', userText);
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    hist.push({ sender: 'user', text: userText });
    saveHistory(hist);

    // Yazıyor indikatörü
    const typingRow = document.createElement('div');
    typingRow.className = 'melis-row melis-row-bot';
    typingRow.id = 'melisTypingRow';
    typingRow.innerHTML = `
      <img class="melis-msg-avatar" src="${AVATAR_PRIMARY}" onerror="this.onerror=null;this.src='${AVATAR_FALLBACK}';" alt="Melis">
      <div class="melis-typing">
        <span class="melis-typing-dot"></span>
        <span class="melis-typing-dot"></span>
        <span class="melis-typing-dot"></span>
      </div>
    `;
    chatBody.appendChild(typingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    let replyText = "";
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: hist.slice(-8).map(h => ({ sender: h.sender, text: h.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        replyText = data.reply;
      } else {
        replyText = "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Mekânınızın ölçülerini iletirseniz, size en doğru piksel modelini ve net atölye maliyetini hemen çıkarabilirim.";
      }
    } catch(e) {
      replyText = "Talebinizi aldım efendim. Doğrudan WhatsApp hattımızdan (+90 530 507 88 34) bana ulaşabilir, ölçülerinize özel resmi teknik föy ve teklifimizi anında edinebilirsiniz.";
    }

    const typingEl = document.getElementById('melisTypingRow');
    if (typingEl) typingEl.remove();

    appendMessageUI('bot', replyText);
    playIPhoneNotificationSound();
    chatBody.scrollTop = chatBody.scrollHeight;

    hist.push({ sender: 'bot', text: replyText });
    saveHistory(hist);
  };
})();
