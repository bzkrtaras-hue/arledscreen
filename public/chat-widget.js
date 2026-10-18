/**
 * ARLEDSCREEN — Melis Canlı Destek Arayüzü
 * Görseldeki açık tema, noktalı zemin, Melis portresi ve hızlı seçim butonları
 */
(function() {
  if (document.getElementById('melis-widget-root')) return;

  const AVATAR_URL = "/brand/canli-destek-avatar.webp";
  const MEMORY_KEY = 'arled_melis_chat_history_v2';

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(MEMORY_KEY)) || []; } catch(e) { return []; }
  }
  function saveHistory(hist) {
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(hist)); } catch(e) {}
  }

  const style = document.createElement('style');
  style.textContent = `
    #melis-widget-root {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    #melis-launcher-btn {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #0C182B;
      border: 2px solid #38BDF8;
      box-shadow: 0 10px 25px rgba(12, 24, 43, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }
    #melis-launcher-btn img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      object-fit: cover;
    }
    .melis-ping-badge {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 14px;
      height: 14px;
      background: #10B981;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
    }
    #melis-chat-frame {
      position: fixed;
      bottom: 96px;
      right: 20px;
      width: 410px;
      max-width: calc(100vw - 32px);
      height: 680px;
      max-height: calc(100dvh - 110px);
      background: #F8FAFC;
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
      border: 1px solid #E2E8F0;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 99999999;
    }
    @media (max-width: 600px) {
      #melis-chat-frame {
        bottom: 0 !important; right: 0 !important; left: 0 !important;
        width: 100vw !important; max-width: 100vw !important;
        height: 100dvh !important; max-height: 100dvh !important;
        border-radius: 0 !important;
      }
    }
    .melis-top-bar {
      background: #0C182B;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
    }
    .melis-profile-area { display: flex; align-items: center; gap: 12px; }
    .melis-avatar-wrap { position: relative; width: 44px; height: 44px; }
    .melis-avatar-wrap img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
    .melis-avatar-wrap .online-dot {
      position: absolute; bottom: 0; right: 0; width: 12px; height: 12px;
      background: #10B981; border: 2px solid #0C182B; border-radius: 50%;
    }
    .melis-title-txt { font-size: 14px; font-weight: 700; }
    .melis-subtitle-txt { font-size: 11px; color: #94A3B8; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .melis-subtitle-txt::before { content: ""; width: 7px; height: 7px; background: #10B981; border-radius: 50%; display: inline-block; }
    .melis-nav-actions { display: flex; align-items: center; gap: 10px; }
    .melis-icon-btn {
      background: rgba(255, 255, 255, 0.1); border: none; color: #FFFFFF;
      width: 38px; height: 38px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; cursor: pointer;
    }
    .melis-chat-stream {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background-color: #F8FAFC;
      background-image: radial-gradient(#CBD5E1 1.2px, transparent 1.2px);
      background-size: 18px 18px;
    }
    .melis-chat-row { display: flex; gap: 10px; max-width: 88%; }
    .melis-row-bot { align-self: flex-start; align-items: flex-start; }
    .melis-row-bot .row-avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .melis-row-user { align-self: flex-end; justify-content: flex-end; }
    .melis-bubble {
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 13.5px;
      line-height: 1.55;
    }
    .melis-bubble-bot {
      background: #FFFFFF;
      color: #1E293B;
      border-top-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid #E2E8F0;
    }
    .melis-bubble-bot .bot-label {
      display: flex; align-items: center; gap: 5px; font-size: 11px;
      font-weight: 700; color: #475569; margin-bottom: 5px;
    }
    .melis-bubble-bot .bot-label::before {
      content: ""; width: 7px; height: 7px; background: #10B981; border-radius: 50%;
    }
    .melis-bubble-user {
      background: #2563EB;
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }
    .melis-bubble-user .user-label {
      font-size: 10.5px; color: rgba(255, 255, 255, 0.8);
      font-weight: 600; text-align: right; margin-bottom: 4px;
    }
    .melis-chips-bar {
      padding: 8px 14px;
      display: flex;
      gap: 8px;
      overflow-x: auto;
      background: #FFFFFF;
      border-top: 1px solid #EEF2F6;
      scrollbar-width: none;
    }
    .melis-chips-bar::-webkit-scrollbar { display: none; }
    .melis-pill {
      white-space: nowrap;
      background: #FFFFFF;
      color: #2563EB;
      border: 1.5px solid #DBEAFE;
      border-radius: 999px;
      padding: 8px 16px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .melis-pill:hover { background: #EFF6FF; border-color: #2563EB; }
    .melis-input-dock {
      padding: 12px 14px;
      background: #FFFFFF;
      border-top: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .melis-text-input {
      flex: 1;
      border: 1.5px solid #E2E8F0;
      border-radius: 14px;
      padding: 12px 14px;
      font-size: 14px;
      color: #0F172A;
      outline: none;
    }
    .melis-text-input:focus { border-color: #2563EB; }
    .melis-mic-btn {
      width: 44px; height: 44px; border-radius: 12px;
      border: 1.5px solid #DBEAFE; background: #FFFFFF; color: #2563EB;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .melis-submit-btn {
      width: 46px; height: 46px; border-radius: 12px;
      background: #2563EB; border: none; color: #FFFFFF;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .melis-submit-btn svg { width: 20px; height: 20px; fill: #FFFFFF; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'melis-widget-root';
  container.innerHTML = `
    <div id="melis-launcher-btn" onclick="melisToggleOpen()">
      <img src="${AVATAR_URL}" alt="Melis">
      <div class="melis-ping-badge"></div>
    </div>
    <div id="melis-chat-frame">
      <div class="melis-top-bar">
        <div class="melis-profile-area">
          <div class="melis-avatar-wrap">
            <img src="${AVATAR_URL}" alt="Melis">
            <div class="online-dot"></div>
          </div>
          <div>
            <div class="melis-title-txt">Melis • Canlı Destek</div>
            <div class="melis-subtitle-txt">Çevrim içi</div>
          </div>
        </div>
        <div class="melis-nav-actions">
          <button class="melis-icon-btn" title="Ses">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </button>
          <button class="melis-icon-btn" onclick="melisToggleOpen()" title="Kapat">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <div class="melis-chat-stream" id="melisChatStream"></div>
      <div class="melis-chips-bar">
        <button class="melis-pill" onclick="melisSendQuick('İç mekân')">İç mekân</button>
        <button class="melis-pill" onclick="melisSendQuick('Dış mekân')">Dış mekân</button>
        <button class="melis-pill" onclick="melisSendQuick('Kafe / restoran')">Kafe / restoran</button>
        <button class="melis-pill" onclick="melisSendQuick('Mağaza vitrini')">Mağaza vitrini</button>
        <button class="melis-pill" onclick="melisSendQuick('200x120 cm')">200x120 cm</button>
      </div>
      <div class="melis-input-dock">
        <input type="text" id="melisInputBox" class="melis-text-input" placeholder="Örn. kafe vitrini 3x2 m iç mekân" onkeypress="melisHandleKey(event)">
        <button class="melis-mic-btn" title="Sesli Mesaj">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </button>
        <button class="melis-submit-btn" onclick="melisDoSend()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  function renderMessages() {
    const stream = document.getElementById('melisChatStream');
    stream.innerHTML = '';
    const hist = getHistory();
    if (hist.length > 0) {
      hist.forEach(item => {
        if (item.sender === 'bot') {
          stream.innerHTML += `
            <div class="melis-chat-row melis-row-bot">
              <img class="row-avatar" src="${AVATAR_URL}" alt="Melis">
              <div class="melis-bubble melis-bubble-bot">
                <div class="bot-label">Melis</div>
                ${item.text}
              </div>
            </div>`;
        } else {
          stream.innerHTML += `
            <div class="melis-chat-row melis-row-user">
              <div class="melis-bubble melis-bubble-user">
                <div class="user-label">Siz</div>
                ${item.text}
              </div>
            </div>`;
        }
      });
    } else {
      stream.innerHTML = `
        <div class="melis-chat-row melis-row-bot">
          <img class="row-avatar" src="${AVATAR_URL}" alt="Melis">
          <div class="melis-bubble melis-bubble-bot">
            <div class="bot-label">Melis</div>
            Merhaba, ben Melis.
          </div>
        </div>
        <div class="melis-chat-row melis-row-bot">
          <img class="row-avatar" src="${AVATAR_URL}" alt="Melis">
          <div class="melis-bubble melis-bubble-bot">
            <div class="bot-label">Melis</div>
            Ekranı nerede kullanmayı düşünüyorsunuz?
          </div>
        </div>`;
    }
    stream.scrollTop = stream.scrollHeight;
  }
  renderMessages();

  window.melisToggleOpen = function() {
    const frame = document.getElementById('melis-chat-frame');
    frame.style.display = (frame.style.display === 'flex') ? 'none' : 'flex';
    if (frame.style.display === 'flex') {
      document.getElementById('melisInputBox').focus();
    }
  };

  window.melisSendQuick = function(txt) {
    document.getElementById('melisInputBox').value = txt;
    melisDoSend();
  };

  window.melisHandleKey = function(e) {
    if (e.key === 'Enter') melisDoSend();
  };

  window.melisDoSend = async function() {
    const box = document.getElementById('melisInputBox');
    const val = box.value.trim();
    if (!val) return;

    const stream = document.getElementById('melisChatStream');
    const hist = getHistory();

    hist.push({ sender: 'user', text: val });
    saveHistory(hist);
    renderMessages();
    box.value = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: val, history: hist.slice(-6) })
      });
      const data = await res.json();
      hist.push({ sender: 'bot', text: data.reply });
      saveHistory(hist);
      renderMessages();
    } catch(err) {
      hist.push({
        sender: 'bot',
        text: 'Sizi çok iyi anlıyorum efendim. ARLEDSCREEN olarak 2 Yıl Tam Garanti ve 5 Yıl Ücretsiz Yerinde Teknik Servis güvencesiyle anahtar teslim projeler üretiyoruz. Aklınızdaki ölçüyü iletirseniz, size en doğru piksel modelini ve net atölye maliyetini hemen hesaplayabilirim.'
      });
      saveHistory(hist);
      renderMessages();
    }
  };
})();
