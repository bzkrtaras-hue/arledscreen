/**
 * ARLEDSCREEN — Melis (Kurumsal Müşteri & Satış Danışmanı)
 * Google Gemini 1.5 Flash Destekli Canlı Asistan
 */
(function() {
  if (document.getElementById('melis-widget-container')) return;

  const AVATAR_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='bgGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%231E5BB8'/><stop offset='100%' stop-color='%230A192F'/></linearGradient><linearGradient id='hairGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%233E2723'/><stop offset='100%' stop-color='%231A0C08'/></linearGradient></defs><circle cx='50' cy='50' r='50' fill='url(%23bgGrad)'/><path d='M25 88 C25 68 40 64 50 64 C60 64 75 68 75 88 Z' fill='%2338BDF8'/><path d='M35 92 C35 76 43 71 50 71 C57 71 65 76 65 92 Z' fill='%23FFFFFF'/><path d='M32 38 C32 20 68 20 68 38 C68 54 62 60 50 60 C38 60 32 54 32 38 Z' fill='url(%23hairGrad)'/><circle cx='50' cy='43' r='16' fill='%23FDDEC0'/><path d='M36 34 C36 24 64 24 64 34 C64 30 58 26 50 26 C42 26 36 30 36 34 Z' fill='%23271406'/><circle cx='45' cy='42' r='2' fill='%231E293B'/><circle cx='55' cy='42' r='2' fill='%231E293B'/><path d='M47 48 Q50 51 53 48' stroke='%23E11D48' stroke-width='1.8' stroke-linecap='round' fill='none'/><path d='M65 42 C67 42 68 44 68 47 L65 52 L61 50 Z' fill='%2394A3B8'/><path d='M66 45 C66 48 57 56 50 56' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' fill='none'/><circle cx='50' cy='56' r='2' fill='%2338BDF8'/></svg>";
  const MEMORY_KEY = 'arled_melis_chat_memory_v1';

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(MEMORY_KEY)) || []; } catch(e) { return []; }
  }
  function saveHistory(hist) {
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(hist)); } catch(e) {}
  }

  function playIPhoneNotificationSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const tones = [
        { freq: 1046.50, start: 0.00, dur: 0.22 },
        { freq: 1318.51, start: 0.10, dur: 0.24 },
        { freq: 2093.00, start: 0.22, dur: 0.55 }
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
    let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
    }
    #melis-notification-bubble {
      position: absolute; bottom: 78px; right: 0; width: 320px; max-width: calc(100vw - 40px);
      background: rgba(15, 23, 42, 0.96); backdrop-filter: blur(16px);
      border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 16px; padding: 12px 14px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65); display: flex; gap: 12px; cursor: pointer;
      transform: translateY(20px) scale(0.95); opacity: 0; pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #melis-notification-bubble.show { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }
    .melis-bubble-avatar { width: 46px; height: 46px; border-radius: 50%; border: 2px solid #38BDF8; background: #1E293B; }
    .melis-bubble-content { flex: 1; min-width: 0; }
    .melis-bubble-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
    .melis-bubble-title { font-size: 13.5px; font-weight: 700; color: #F8FAFC; }
    .melis-bubble-time { font-size: 11px; color: #94A3B8; }
    .melis-bubble-text { font-size: 12.5px; color: #CBD5E1; line-height: 1.45; }
    .melis-bubble-close { position: absolute; top: 6px; right: 8px; background: transparent; border: none; color: #64748B; font-size: 18px; cursor: pointer; }
    #melis-chat-trigger {
      width: 68px; height: 68px; border-radius: 50%;
      background: linear-gradient(135deg, #1E5BB8 0%, #0A192F 100%);
      box-shadow: 0 10px 32px rgba(30, 91, 184, 0.65); display: flex; align-items: center; justify-content: center;
      cursor: pointer; border: 2.5px solid #38BDF8; position: relative;
    }
    .melis-trigger-avatar { width: 58px; height: 58px; border-radius: 50%; }
    .melis-online-ping { position: absolute; top: 2px; right: 2px; width: 16px; height: 16px; background: #10B981; border: 2.5px solid #0F172A; border-radius: 50%; }
    .melis-unread-counter { position: absolute; top: -3px; left: -3px; background: #EF4444; color: #FFF; font-size: 11px; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #0F172A; }
    #melis-chat-window {
      position: fixed; bottom: max(96px, calc(env(safe-area-inset-bottom, 20px) + 76px)); right: max(20px, env(safe-area-inset-right, 20px));
      width: 415px; max-width: calc(100vw - 32px); height: 640px; max-height: calc(100vh - 120px);
      background: #0F172A; border: 1px solid #334155; border-radius: 22px; box-shadow: 0 24px 70px rgba(0, 0, 0, 0.85);
      display: none; flex-direction: column; overflow: hidden; z-index: 99999999;
    }
    @media (max-width: 600px) {
      #melis-chat-window { bottom: 0 !important; right: 0 !important; left: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; }
    }
    .melis-chat-header { background: #1E293B; padding: 14px 18px; border-bottom: 1px solid #334155; display: flex; align-items: center; justify-content: space-between; }
    .melis-header-info { display: flex; align-items: center; gap: 12px; }
    .melis-header-avatar { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #38BDF8; }
    .melis-name { font-size: 15.5px; font-weight: 700; color: #F8FAFC; }
    .melis-role { font-size: 11px; color: #94A3B8; }
    .melis-status-badge { font-size: 10.5px; color: #10B981; font-weight: 600; }
    .melis-header-btns { display: flex; align-items: center; gap: 8px; }
    .melis-btn-icon { background: transparent; border: none; color: #94A3B8; cursor: pointer; font-size: 18px; padding: 6px; }
    .melis-chat-body { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #080D1A; }
    .melis-msg { max-width: 88%; padding: 13px 16px; border-radius: 16px; font-size: 13.5px; line-height: 1.6; word-break: break-word; }
    .melis-bot-msg { background: #1E293B; color: #E2E8F0; border-bottom-left-radius: 4px; border: 1px solid #334155; align-self: flex-start; }
    .melis-user-msg { background: #1E5BB8; color: #FFFFFF; border-bottom-right-radius: 4px; align-self: flex-end; }
    .melis-typing-wrap { display: flex; align-items: center; gap: 4px; padding: 10px 14px; background: #1E293B; border-radius: 12px; border: 1px solid #334155; }
    .melis-typing-dot { width: 6px; height: 6px; background: #94A3B8; border-radius: 50%; animation: melisBnc 1.4s infinite ease-in-out both; }
    @keyframes melisBnc { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
    .melis-chips-container { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
    .melis-chip { background: #111A2E; color: #38BDF8; border: 1px solid #1E2E4A; border-radius: 10px; padding: 10px 13px; font-size: 12.5px; text-align: left; cursor: pointer; }
    .melis-action-card { margin-top: 8px; padding: 10px 12px; background: #0F172A; border-radius: 10px; border: 1px solid #22324E; }
    .melis-cta-whatsapp { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #16A34A; color: #FFFFFF !important; text-decoration: none; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; }
    .melis-chat-footer { padding: 12px 14px; background: #1E293B; border-top: 1px solid #334155; display: flex; gap: 8px; align-items: center; }
    .melis-input { flex: 1; background: #080D1A; border: 1px solid #334155; border-radius: 10px; padding: 12px 14px; color: #F8FAFC; font-size: 16px !important; outline: none; }
    .melis-send-btn { background: #1E5BB8; border: none; border-radius: 10px; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .melis-send-btn svg { width: 19px; height: 19px; fill: #FFFFFF; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'melis-widget-container';
  container.innerHTML = `
    <div id="melis-notification-bubble" onclick="melisOpenAndReadNotification()">
      <img class="melis-bubble-avatar" src="${AVATAR_SVG}" alt="Melis">
      <div class="melis-bubble-content">
        <div class="melis-bubble-header">
          <span class="melis-bubble-title">Melis (ARLEDSCREEN)</span>
          <span class="melis-bubble-time">Şimdi</span>
        </div>
        <div class="melis-bubble-text">👋 Merhabalar! Projeniz için en doğru LED ekran modelini ve maliyetini birlikte hesaplayalım mı?</div>
      </div>
      <button class="melis-bubble-close" onclick="melisDismissBubble(event)">&times;</button>
    </div>
    <div id="melis-chat-trigger" onclick="melisToggleChat()">
      <img class="melis-trigger-avatar" src="${AVATAR_SVG}" alt="Melis">
      <div class="melis-online-ping"></div>
      <div id="melisUnreadBadge" class="melis-unread-counter">1</div>
    </div>
    <div id="melis-chat-window">
      <div class="melis-chat-header">
        <div class="melis-header-info">
          <img class="melis-header-avatar" src="${AVATAR_SVG}" alt="Melis">
          <div>
            <div class="melis-name">Melis</div>
            <div class="melis-role">Kıdemli Müşteri &amp; Satış Danışmanı</div>
            <div class="melis-status-badge">● Çevrim İçi · Gaziosmanpaşa Merkez</div>
          </div>
        </div>
        <div class="melis-header-btns">
          <button class="melis-btn-icon" title="Hafızayı Temizle" onclick="melisClearMemory()">🗑️</button>
          <button class="melis-btn-icon" onclick="melisToggleChat()">&times;</button>
        </div>
      </div>
      <div class="melis-chat-body" id="melisChatBody"></div>
      <div class="melis-chat-footer">
        <input type="text" id="melisUserInput" class="melis-input" placeholder="Melis'e bir soru veya ölçü yazın..." onkeypress="melisHandleKey(event)">
        <button class="melis-send-btn" onclick="melisSendMessage()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  function renderHistory() {
    const chatBody = document.getElementById('melisChatBody');
    if (!chatBody) return;
    chatBody.innerHTML = '';
    const hist = getHistory();
    if (hist.length > 0) {
      hist.forEach(m => {
        const div = document.createElement('div');
        div.className = m.sender === 'user' ? 'melis-msg melis-user-msg' : 'melis-msg melis-bot-msg';
        div.innerHTML = m.html;
        chatBody.appendChild(div);
      });
    } else {
      const welcome = document.createElement('div');
      welcome.className = 'melis-msg melis-bot-msg';
      welcome.innerHTML = `
        Merhabalar! Ben <strong>Melis</strong>, ARLEDSCREEN Müşteri ve Satış Danışmanıyım.
        <br><br>
        Mağazanız, vitrininiz ya da bina cepheniz için aklınızdaki her türlü soruyu bana sorabilirsiniz. Size en doğru piksel aralığını (P değeri), kontrol altyapısını ve atölye maliyetini anında hesaplayabilirim.
        <div class="melis-chips-container">
          <button class="melis-chip" onclick="melisSendPredefined('Mağaza vitrinim için 3x2 metre ekran maliyeti ve piksel önerisi alabilir miyim?')">🏬 Vitrin Ekranı Ölçü &amp; Fiyat Hesabı</button>
          <button class="melis-chip" onclick="melisSendPredefined('Dış mekân bina cephesi projemiz var, teknik keşif ve NovaStar kontrol kartı için bilgi alabilir miyim?')">🏢 Bina Cephesi &amp; NovaStar Kontrol Sistemi</button>
          <button class="melis-chip" onclick="melisSendPredefined('20 metrekare altı ve üstü ekranlarda kontrol kartı seçim kuralınız nedir?')">⚡ 20 m² Huidu vs NovaStar Kuralı Nedir?</button>
        </div>
      `;
      chatBody.appendChild(welcome);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  renderHistory();

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
    if (bubble) { bubble.classList.remove('show'); bubble.classList.add('dismissed'); }
  };

  window.melisToggleChat = function() {
    const win = document.getElementById('melis-chat-window');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    if (win.style.display === 'flex') {
      const badge = document.getElementById('melisUnreadBadge');
      if (badge) badge.style.display = 'none';
      const bubble = document.getElementById('melis-notification-bubble');
      if (bubble) bubble.classList.remove('show');
      document.getElementById('melisUserInput').focus();
      document.getElementById('melisChatBody').scrollTop = document.getElementById('melisChatBody').scrollHeight;
    }
  };

  window.melisClearMemory = function() {
    if (confirm('Sohbet geçmişini sıfırlamak istiyor musunuz?')) {
      localStorage.removeItem(MEMORY_KEY);
      renderHistory();
    }
  };

  window.melisHandleKey = function(e) { if (e.key === 'Enter') melisSendMessage(); };
  window.melisSendPredefined = function(text) {
    document.getElementById('melisUserInput').value = text;
    melisSendMessage();
  };

  window.melisSendMessage = async function() {
    const input = document.getElementById('melisUserInput');
    const userText = input.value.trim();
    if (!userText) return;

    const chatBody = document.getElementById('melisChatBody');
    const hist = getHistory();

    const userDiv = document.createElement('div');
    userDiv.className = 'melis-msg melis-user-msg';
    userDiv.textContent = userText;
    chatBody.appendChild(userDiv);
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    hist.push({ sender: 'user', text: userText, html: formatMarkdown(userText) });
    saveHistory(hist);

    const typingDiv = document.createElement('div');
    typingDiv.className = 'melis-typing-wrap';
    typingDiv.id = 'melisTypingIndicator';
    typingDiv.innerHTML = '<span class="melis-typing-dot"></span><span class="melis-typing-dot"></span><span class="melis-typing-dot"></span>';
    chatBody.appendChild(typingDiv);
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

    const indicator = document.getElementById('melisTypingIndicator');
    if (indicator) indicator.remove();

    let formattedHtml = formatMarkdown(replyText);
    formattedHtml += `
      <div class="melis-action-card">
        <a class="melis-cta-whatsapp" href="https://wa.me/905305078834?text=${encodeURIComponent('Merhabalar Melis Hanım, arledscreen.com canlı destekten ulaşıyorum: ' + userText)}" target="_blank">
          📲 WhatsApp ile Teklif Al (+90 530 507 88 34)
        </a>
      </div>
    `;

    const botDiv = document.createElement('div');
    botDiv.className = 'melis-msg melis-bot-msg';
    botDiv.innerHTML = formattedHtml;
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    hist.push({ sender: 'bot', text: replyText, html: formattedHtml });
    saveHistory(hist);
  };
})();
