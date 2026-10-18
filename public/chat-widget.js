/**
 * ARLEDSCREEN — Melis (Kıdemli Satış Danışmanı)
 * Beyaz tema, gerçek fotoğraf avatarı, mavi butonlar
 */
(function() {
  if (document.getElementById('melis-widget-container')) return;

  const AVATAR = "/brand/canli-destek-avatar.webp";
  const MEMORY_KEY = 'arled_melis_chat_memory_v2';

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(MEMORY_KEY)) || []; } catch(e) { return []; }
  }
  function saveHistory(hist) {
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(hist)); } catch(e) {}
  }

  function formatMarkdown(text) {
    if (!text) return "";
    let html = text.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
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
    #melis-chat-trigger {
      width: 64px; height: 64px; border-radius: 50%;
      background: #1E5BB8;
      box-shadow: 0 8px 24px rgba(30, 91, 184, 0.4);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; border: 3px solid #FFFFFF; position: relative;
    }
    .melis-trigger-avatar { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; }
    .melis-online-ping { position: absolute; top: 2px; right: 2px; width: 14px; height: 14px; background: #10B981; border: 2px solid #FFFFFF; border-radius: 50%; }
    #melis-chat-window {
      position: fixed; bottom: max(96px, calc(env(safe-area-inset-bottom, 20px) + 76px)); right: max(20px, env(safe-area-inset-right, 20px));
      width: 400px; max-width: calc(100vw - 32px); height: 620px; max-height: calc(100vh - 120px);
      background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      display: none; flex-direction: column; overflow: hidden; z-index: 99999999;
    }
    @media (max-width: 600px) {
      #melis-chat-window { bottom: 0 !important; right: 0 !important; left: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; }
    }
    .melis-chat-header { background: #FFFFFF; padding: 14px 16px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
    .melis-header-info { display: flex; align-items: center; gap: 10px; }
    .melis-header-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
    .melis-name { font-size: 15px; font-weight: 700; color: #0F172A; }
    .melis-role { font-size: 12px; color: #64748B; }
    .melis-status-badge { font-size: 11px; color: #10B981; font-weight: 600; }
    .melis-header-btns { display: flex; align-items: center; gap: 6px; }
    .melis-btn-icon { background: transparent; border: none; color: #64748B; cursor: pointer; font-size: 18px; padding: 6px; }
    .melis-chat-body { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #F8FAFC; }
    .melis-msg { max-width: 86%; padding: 12px 14px; border-radius: 14px; font-size: 14px; line-height: 1.55; word-break: break-word; }
    .melis-bot-msg { background: #FFFFFF; color: #0F172A; border-bottom-left-radius: 4px; border: 1px solid #E2E8F0; align-self: flex-start; }
    .melis-user-msg { background: #1E5BB8; color: #FFFFFF; border-bottom-right-radius: 4px; align-self: flex-end; }
    .melis-typing-wrap { display: flex; align-items: center; gap: 4px; padding: 10px 12px; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; }
    .melis-typing-dot { width: 6px; height: 6px; background: #94A3B8; border-radius: 50%; animation: melisBnc 1.4s infinite ease-in-out both; }
    @keyframes melisBnc { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
    .melis-chips-container { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .melis-chip { background: #FFFFFF; color: #1E5BB8; border: 1px solid #CBD5E1; border-radius: 20px; padding: 8px 14px; font-size: 13px; cursor: pointer; }
    .melis-chip:hover { background: #EFF6FF; }
    .melis-action-card { margin-top: 8px; }
    .melis-cta-whatsapp { display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: #1E5BB8; color: #FFFFFF !important; text-decoration: none; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; }
    .melis-chat-footer { padding: 12px 14px; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; gap: 8px; align-items: center; }
    .melis-input { flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; color: #0F172A; font-size: 16px !important; outline: none; }
    .melis-send-btn { background: #1E5BB8; border: none; border-radius: 10px; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .melis-send-btn svg { width: 18px; height: 18px; fill: #FFFFFF; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'melis-widget-container';
  container.innerHTML = `
    <div id="melis-chat-trigger" onclick="melisToggleChat()">
      <img class="melis-trigger-avatar" src="${AVATAR}" alt="Melis">
      <div class="melis-online-ping"></div>
    </div>
    <div id="melis-chat-window">
      <div class="melis-chat-header">
        <div class="melis-header-info">
          <img class="melis-header-avatar" src="${AVATAR}" alt="Melis">
          <div>
            <div class="melis-name">Melis • Canlı Destek</div>
            <div class="melis-role">Kıdemli Satış Danışmanı</div>
            <div class="melis-status-badge">● Çevrim İçi</div>
          </div>
        </div>
        <div class="melis-header-btns">
          <button class="melis-btn-icon" title="Hafızayı Temizle" onclick="melisClearMemory()">🗑️</button>
          <button class="melis-btn-icon" onclick="melisToggleChat()">&times;</button>
        </div>
      </div>
      <div class="melis-chat-body" id="melisChatBody"></div>
      <div class="melis-chat-footer">
        <input type="text" id="melisUserInput" class="melis-input" placeholder="Örn. kafe vitrini 3x2 m iç mekân" onkeypress="melisHandleKey(event)">
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
        Merhabalar! Ben <strong>Melis</strong>, ARLEDSCREEN Kıdemli Satış Danışmanıyım.
        <br><br>
        Mağazanız, vitrininiz ya da bina cepheniz için aklınızdaki her türlü soruyu bana sorabilirsiniz. Size en doğru piksel aralığını (P değeri), kontrol altyapısını ve atölye maliyetini anında hesaplayabilirim.
        <div class="melis-chips-container">
          <button class="melis-chip" onclick="melisSendPredefined('İç mekân')">İç mekân</button>
          <button class="melis-chip" onclick="melisSendPredefined('Dış mekân')">Dış mekân</button>
          <button class="melis-chip" onclick="melisSendPredefined('Kafe / restoran')">Kafe / restoran</button>
          <button class="melis-chip" onclick="melisSendPredefined('Mağaza vitrini')">Mağaza vitrini</button>
          <button class="melis-chip" onclick="melisSendPredefined('200x120 cm')">200x120 cm</button>
        </div>
      `;
      chatBody.appendChild(welcome);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  renderHistory();

  window.melisToggleChat = function() {
    const win = document.getElementById('melis-chat-window');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    if (win.style.display === 'flex') {
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
