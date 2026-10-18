(function() {
  if (document.getElementById('melis-widget-container')) return;

  // 1. Gerçek Melis Fotoğrafı (SVG İptal Edildi)
  const AVATAR_IMG = "/brand/canli-destek-avatar.webp";
  const MEMORY_KEY = 'arled_melis_chat_memory_v1';

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(MEMORY_KEY)) || []; } catch(e) { return []; }
  }
  function saveHistory(hist) {
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(hist)); } catch(e) {} }

  function formatMarkdown(text) {
    if (!text) return "";
    let html = text.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  // 2. Görseldeki Orijinal Açık Tema Stilleri
  const style = document.createElement('style);
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
      background: #0E1E38; box-shadow: 0 10px 25px rgba(14, 30, 56, 0.4);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; border: 2px solid #38BDF8; position: relative;
    }
    .melis-trigger-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
    .melis-online-dot { position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background: #22C55E; border: 2.5px solid #FFFFFF; border-radius: 50%; }
    
    #melis-chat-window {
      position: fixed; bottom: max(92px, calc(env(safe-area-inset-bottom, 20px) + 72px)); right: max(20px, env(safe-area-inset-right, 20px));
      width: 410px; max-width: calc(100vw - 32px); height: 620px; max-height: calc(100vh - 120px);
      background: #F4F7FB; border: 1px solid #DCE3EC; border-radius: 24px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
      display: none; flex-direction: column; overflow: hidden; z-index: 99999999;
    }
    @media (max-width: 600px) {
      #melis-chat-window { bottom: 0 !important; right: 0 !important; left: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; }
    }
    
    /* Lacivert Üst Başlık */
    .melis-chat-header {
      background: #0D1B2A; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; color: #FFFFFF;
    }
    .melis-header-info { display: flex; align-items: center; gap: 12px; }
    .melis-header-avatar { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #38BDF8; object-fit: cover; }
    .melis-brand-title { font-size: 10px; letter-spacing: 1px; color: #94A3B8; text-transform: uppercase; font-weight: 700; }
    .melis-name { font-size: 15px; font-weight: 700; color: #FFFFFF; display: flex; align-items: center; gap: 6px; }
    .melis-status { font-size: 11px; color: #4ADE80; display: flex; align-items: center; gap: 4px; }
    .melis-header-close { background: transparent; border: none; color: #94A3B8; font-size: 22px; cursor: pointer; padding: 4px; }
    
    /* Açık Renk Noktalı Gövde */
    .melis-chat-body {
      flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;
      background-color: #F8FAFC;
      background-image: radial-gradient(#CBD5E1 1px, transparent 1px);
      background-size: 14px 14px;
    }
    
    .melis-msg-row { display: flex; gap: 8px; align-items: flex-start; }
    .melis-msg-row.user { justify-content: flex-end; }
    .melis-msg-avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    
    .melis-msg { max-width: 82%; padding: 12px 16px; border-radius: 18px; font-size: 13.5px; line-height: 1.55; }
    .melis-bot-msg { background: #FFFFFF; color: #1E293B; border: 1px solid #E2E8F0; border-top-left-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
    .melis-user-msg { background: #2563EB; color: #FFFFFF; border-top-right-radius: 4px; }
    
    /* Yatay Buton Etiketleri (Hızlı Seçim) */
    .melis-pills-row {
      display: flex; gap: 6px; overflow-x: auto; padding: 8px 14px; background: #FFFFFF; border-top: 1px solid #E2E8F0;
    }
    .melis-pills-row::-webkit-scrollbar { display: none; }
    .melis-pill {
      white-space: nowrap; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 999px;
      padding: 6px 12px; font-size: 12px; font-weight: 500; color: #334155; cursor: pointer;
    }
    .melis-pill:hover { background: #E2E8F0; }
    
    /* Alt Giriş Çubuğu */
    .melis-chat-footer {
      padding: 10px 14px; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; gap: 8px; align-items: center;
    }
    .melis-input {
      flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px 14px;
      font-size: 14px; outline: none; color: #1E293B;
    }
    .melis-send-btn {
      background: #2563EB; border: none; border-radius: 12px; width: 44px; height: 44px;
      cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .melis-send-btn svg { width: 18px; height: 18px; fill: #FFFFFF; }
  `;
  document.head.appendChild(style);

  // 3. HTML Yapısı
  const container = document.createElement('div);
  container.id = 'melis-widget-container';
  container.innerHTML = `
    <div id="melis-chat-trigger" onclick="melisToggleChat()">
      <img class="melis-trigger-avatar" src="${AVATAR_IMG}" alt="Melis">
      <div class="melis-online-dot"></div>
    </div>
    
    <div id="melis-chat-window">
      <div class="melis-chat-header">
        <div class="melis-header-info">
          <img class="melis-header-avatar" src="${AVATAR_IMG}" alt="Melis">
          <div>
            <div class="melis-brand-title">ARLEDSCREEN</div>
            <div class="melis-name">Melis • Canlı Destek</div>
            <div class="melis-status">● Çevrim içi</div>
          </div>
        </div>
        <button class="melis-header-close" onclick="melisToggleChat()">&times;</button>
      </div>
      
      <div class="melis-chat-body" id="melisChatBody"></div>
      
      <div class="melis-pills-row">
        <button class="melis-pill" onclick="melisSendQuick('İç mekân')">İç mekân</button>
        <button class="melis-pill" onclick="melisSendQuick('Dış mekân')">Dış mekân</button>
        <button class="melis-pill" onclick="melisSendQuick('Kafe / restoran')">Kafe / restoran</button>
        <button class="melis-pill" onclick="melisSendQuick('Mağaza vitrini')">Mağaza vitrini</button>
        <button class="melis-pill" onclick="melisSendQuick('3x2 m vitrin hesabı')">3x2 m vitrin</button>
      </div>

      <div class="melis-chat-footer">
        <input type="text" id="melisUserInput" class="melis-input" placeholder="Örn. kafe vitrini 3x2 m iç mekân" onkeypress="if(event.key==='Enter') melisSendMessage()">
        <button class="melis-send-btn" onclick="melisSendMessage()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // 4. Sohbet & API Mantığı (Tamamen Korundu)
  function renderHistory() {
    const chatBody = document.getElementById('melisChatBody);
    if (!chatBody) return;
    chatBody.innerHTML = '';
    const hist = getHistory();
    if (hist.length > 0) {
      hist.forEach(m => appendMessage(m.sender, m.text));
    } else {
      appendMessage('bot', "Merhabalar! Ben **Melis**, ARLEDSCREEN Müşteri ve Satış Danışmanıyım. Türkiye geneline ve yurt dışına 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle iç ve dış mekân LED ekran satışı, montajı ve keşfi sağlıyoruz.");
    }
  }

  function appendMessage(sender, text) {
    const chatBody = document.getElementById('melisChatBody);
    const row = document.createElement('div);
    row.className = sender === 'user' ? 'melis-msg-row user' : 'melis-msg-row';

    if (sender === 'bot') {
      row.innerHTML = `
        <img class="melis-msg-avatar" src="${AVATAR_IMG}" alt="Melis">
        <div class="melis-msg melis-bot-msg">${formatMarkdown(text)}</div>
      `;
    } else {
      row.innerHTML = `<div class="melis-msg melis-user-msg">${formatMarkdown(text)}</div>`;
    }
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  window.melisToggleChat = function() {
    const win = document.getElementById('melis-chat-window);
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    if (win.style.display === 'flex') {
      document.getElementById('melisUserInput').focus();
    }
  };

  window.melisSendQuick = function(val) {
    document.getElementById('melisUserInput').value = val;
    melisSendMessage();
  };

  window.melisSendMessage = async function() {
    const input = document.getElementById('melisUserInput);
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage('user', userText);
    input.value = '';

    const hist = getHistory();
    hist.push({ sender: 'user', text: userText });
    saveHistory(hist);

    let replyText = "";
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: hist.slice(-8) })
      });
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply;
      } else {
        replyText = "Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Aklınızdaki ölçüyü, mekânı ve en yakın izleme mesafenizi iletirseniz, size en doğru piksel modelini ve net atölye maliyetini hemen hesaplayabilirim.";
      }
    } catch(e) {
      replyText = "Talebinizi aldım efendim. Doğrudan WhatsApp hattımızdan (+90 530 507 88 34) bana ulaşabilir, ölçülerinize özel resmi teknik föy ve teklifimizi anında edinebilirsiniz.";
    }

    appendMessage('bot', replyText);
    hist.push({ sender: 'bot', text: replyText });
    saveHistory(hist);
  };

  renderHistory();
})();