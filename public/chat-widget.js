/**
 * ARLEDSCREEN — Aras Bozkurt (Orijinal Portreli Baş Mühendis & Satış Direktörü)
 * Yapay zekâ sentetik yüzleri iptal edilmiş; Aras Bozkurt'un kendi karizmatik,
 * bilge ve doğal fotoğrafını birebir kullanan, iPhone bildirimli canlı temsilci.
 */
(function() {
  if (document.getElementById('aras-widget-container')) return;

  // Aras Bozkurt'un kendi orijinal fotoğrafı (sentetik filtre yok)
  const AVATAR_IMG = "data:image/jpeg;base64,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";
  const MEMORY_KEY = 'arled_aras_memory_v4';

  function getMemory() {
    try {
      return JSON.parse(localStorage.getItem(MEMORY_KEY)) || { messages: [], hasSeenNotification: false };
    } catch(e) {
      return { messages: [], hasSeenNotification: false };
    }
  }

  function saveMemory(mem) {
    try {
      localStorage.setItem(MEMORY_KEY, JSON.stringify(mem));
    } catch(e) {}
  }

  // Web Audio API ile Kristal Netliğinde iPhone Bildirim Sesi (Tri-Tone Chime)
  function playIPhoneNotificationSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

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
    } catch(e) {
      console.log('Audio fallback:', e);
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    #aras-widget-container {
      position: fixed;
      bottom: max(20px, env(safe-area-inset-bottom, 20px));
      right: max(20px, env(safe-area-inset-right, 20px));
      z-index: 99999999;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* iOS BİLDİRİM BALONU */
    #aras-notification-bubble {
      position: absolute;
      bottom: 78px;
      right: 0;
      width: 320px;
      max-width: calc(100vw - 40px);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 16px;
      padding: 12px 14px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05);
      display: flex;
      gap: 12px;
      cursor: pointer;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #aras-notification-bubble.show {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: auto;
    }
    .aras-bubble-avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 2px solid #38BDF8;
      object-fit: cover;
      object-position: center 20%;
      flex-shrink: 0;
      background: #1E293B;
    }
    .aras-bubble-content { flex: 1; min-width: 0; }
    .aras-bubble-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }
    .aras-bubble-title { font-size: 13.5px; font-weight: 700; color: #F8FAFC; }
    .aras-bubble-time { font-size: 11px; color: #94A3B8; }
    .aras-bubble-text {
      font-size: 12.5px;
      color: #CBD5E1;
      line-height: 1.45;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .aras-bubble-close {
      position: absolute;
      top: 6px;
      right: 8px;
      background: transparent;
      border: none;
      color: #64748B;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }
    .aras-bubble-close:hover { color: #FFF; }

    /* ANA TETİK BUTONU */
    #aras-chat-trigger {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1E5BB8 0%, #0A192F 100%);
      box-shadow: 0 10px 32px rgba(30, 91, 184, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2.5px solid #38BDF8;
      position: relative;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
      touch-action: manipulation;
    }
    #aras-chat-trigger:hover {
      transform: scale(1.08);
      box-shadow: 0 14px 40px rgba(30, 91, 184, 0.85);
    }
    #aras-chat-trigger:active { transform: scale(0.95); }
    .aras-trigger-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center 20%;
      background: #1E293B;
    }
    .aras-online-ping {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      background: #10B981;
      border: 2.5px solid #0F172A;
      border-radius: 50%;
      box-shadow: 0 0 10px #10B981;
    }
    .aras-unread-counter {
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
      border: 2px solid #0F172A;
      box-shadow: 0 2px 6px rgba(239, 68, 68, 0.5);
    }

    /* SOHBET PENCERESİ */
    #aras-chat-window {
      position: fixed;
      bottom: max(96px, calc(env(safe-area-inset-bottom, 20px) + 76px));
      right: max(20px, env(safe-area-inset-right, 20px));
      width: 415px;
      max-width: calc(100vw - 32px);
      height: 640px;
      max-height: calc(100vh - 120px);
      background: #0F172A;
      border: 1px solid #334155;
      border-radius: 22px;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.85);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 99999999;
      animation: arasSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      overscroll-behavior: contain;
    }
    @keyframes arasSlideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width: 600px) {
      #aras-chat-window {
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
      #aras-notification-bubble {
        right: 0 !important;
        left: 0 !important;
        width: calc(100vw - 32px) !important;
        margin: 0 auto !important;
      }
    }

    .aras-chat-header {
      background: #1E293B;
      padding: 14px 18px;
      border-bottom: 1px solid #334155;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .aras-header-info { display: flex; align-items: center; gap: 12px; }
    .aras-header-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid #38BDF8;
      object-fit: cover;
      object-position: center 20%;
      flex-shrink: 0;
      background: #1E293B;
    }
    .aras-title-block { display: flex; flex-direction: column; }
    .aras-name {
      font-size: 15.5px;
      font-weight: 700;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .aras-verified { width: 15px; height: 15px; fill: #38BDF8; }
    .aras-role { font-size: 11px; color: #94A3B8; margin-top: 1px; }
    .aras-status-badge {
      font-size: 10.5px;
      color: #10B981;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
    }
    .aras-pulse-dot {
      width: 6px;
      height: 6px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 6px #10B981;
    }
    .aras-header-btns { display: flex; align-items: center; gap: 8px; }
    .aras-btn-icon {
      background: transparent;
      border: none;
      color: #94A3B8;
      cursor: pointer;
      font-size: 18px;
      padding: 6px;
      line-height: 1;
      border-radius: 8px;
    }
    .aras-btn-icon:hover { color: #FFF; background: #334155; }

    .aras-chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #080D1A;
      scroll-behavior: smooth;
    }
    .aras-msg {
      max-width: 88%;
      padding: 13px 16px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.6;
      word-break: break-word;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
    .aras-bot-msg {
      background: #1E293B;
      color: #E2E8F0;
      border-bottom-left-radius: 4px;
      border: 1px solid #334155;
      align-self: flex-start;
    }
    .aras-user-msg {
      background: #1E5BB8;
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }

    .aras-typing-wrap {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 14px;
      background: #1E293B;
      border-radius: 12px;
      width: fit-content;
      border: 1px solid #334155;
    }
    .aras-typing-dot {
      width: 6px;
      height: 6px;
      background: #94A3B8;
      border-radius: 50%;
      animation: arasBnc 1.4s infinite ease-in-out both;
    }
    .aras-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .aras-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes arasBnc { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    .aras-chips-container { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
    .aras-chip {
      background: #111A2E;
      color: #38BDF8;
      border: 1px solid #1E2E4A;
      border-radius: 10px;
      padding: 10px 13px;
      font-size: 12.5px;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s;
      font-weight: 500;
    }
    .aras-chip:hover { background: #1E5BB8; color: #FFFFFF; border-color: #38BDF8; }

    .aras-action-card {
      margin-top: 10px;
      padding: 12px 14px;
      background: #0F172A;
      border-radius: 12px;
      border: 1px solid #22324E;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .aras-action-label { font-size: 11.5px; color: #94A3B8; font-weight: 600; }
    .aras-cta-whatsapp {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #16A34A;
      color: #FFFFFF !important;
      text-decoration: none;
      padding: 11px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.4);
      transition: transform 0.15s;
    }
    .aras-cta-whatsapp:hover { transform: translateY(-1px); }

    .aras-chat-footer {
      padding: 12px 14px;
      background: #1E293B;
      border-top: 1px solid #334155;
      display: flex;
      gap: 8px;
      align-items: center;
      padding-bottom: max(12px, env(safe-area-inset-bottom, 12px));
    }
    .aras-input {
      flex: 1;
      background: #080D1A;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px 14px;
      color: #F8FAFC;
      font-size: 16px !important;
      outline: none;
    }
    .aras-input:focus { border-color: #38BDF8; }
    .aras-send-btn {
      background: #1E5BB8;
      border: none;
      border-radius: 10px;
      width: 44px;
      height: 44px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .aras-send-btn svg { width: 19px; height: 19px; fill: #FFFFFF; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'aras-widget-container';
  container.innerHTML = `
    <!-- iOS Bildirim Balonu -->
    <div id="aras-notification-bubble" onclick="arasOpenAndReadNotification()">
      <img class="aras-bubble-avatar" src="${AVATAR_IMG}" alt="Aras Bozkurt">
      <div class="aras-bubble-content">
        <div class="aras-bubble-header">
          <span class="aras-bubble-title">Aras Bozkurt</span>
          <span class="aras-bubble-time">Şimdi</span>
        </div>
        <div class="aras-bubble-text">
          👋 Selamlar! Dükkânınıza veya cephenize en doğru LED ekranı net atölye maliyetiyle çıkaralım mı?
        </div>
      </div>
      <button class="aras-bubble-close" onclick="arasDismissBubble(event)">&times;</button>
    </div>

    <!-- Tetik Butonu (Orijinal Karizmatik Portre) -->
    <div id="aras-chat-trigger" onclick="arasToggleChat()">
      <img class="aras-trigger-avatar" src="${AVATAR_IMG}" alt="Aras Bozkurt">
      <div class="aras-online-ping"></div>
      <div id="arasUnreadBadge" class="aras-unread-counter">1</div>
    </div>

    <!-- Sohbet Penceresi -->
    <div id="aras-chat-window">
      <div class="aras-chat-header">
        <div class="aras-header-info">
          <img class="aras-header-avatar" src="${AVATAR_IMG}" alt="Aras Bozkurt">
          <div class="aras-title-block">
            <div class="aras-name">
              Aras Bozkurt
              <svg class="aras-verified" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <div class="aras-role">Proje Direktörü, Baş Mühendis & Sırdaş</div>
            <div class="aras-status-badge"><span class="aras-pulse-dot"></span> Canlı Masada · Gaziosmanpaşa Merkez</div>
          </div>
        </div>
        <div class="aras-header-btns">
          <button class="aras-btn-icon" title="Hafızayı Temizle" onclick="arasClearMemory()">🗑️</button>
          <button class="aras-btn-icon" onclick="arasToggleChat()">&times;</button>
        </div>
      </div>

      <div class="aras-chat-body" id="arasChatBody">
        <!-- Mesajlar dinamik yüklenir -->
      </div>

      <div class="aras-chat-footer">
        <input type="text" id="arasUserInput" class="aras-input" placeholder="İster ekran sor, ister dertleş, ister ölçü yaz..." onkeypress="arasHandleKey(event)">
        <button class="aras-send-btn" onclick="arasSendMessage()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  function renderHistory() {
    const chatBody = document.getElementById('arasChatBody');
    chatBody.innerHTML = '';
    const mem = getMemory();

    if (mem.messages && mem.messages.length > 0) {
      mem.messages.forEach(m => {
        const div = document.createElement('div');
        div.className = m.sender === 'user' ? 'aras-msg aras-user-msg' : 'aras-msg aras-bot-msg';
        div.innerHTML = m.html;
        chatBody.appendChild(div);
      });
    } else {
      const welcome = document.createElement('div');
      welcome.className = 'aras-msg aras-bot-msg';
      welcome.innerHTML = `
        Selamlar, ben <strong>Aras</strong>. ARLEDSCREEN'in kurucusuyum.
        <br><br>
        İster dükkânına dev ekran kuracak ol, ister piyasadaki çakallardan canın yanmış olsun, ister bir bardak çay içip dertleşmek iste; buradayım. Lafı eğip bükmem; doğruya doğru, yanlışa yanlış derim. <strong>Biz ucuz firma değiliz</strong> çünkü teknolojide ucuzluğun koca bir aldatmaca olduğunu en iyi biz biliriz.
        <br><br>
        Bugün aklında ne var, anlat dinliyorum?
        <div class="aras-chips-container">
          <button class="aras-chip" onclick="arasSendPredefined('Dükkânım için ekran bakıyorum ama piyasa kafamı çok karıştırdı, doğrusu nedir?')">🏬 Vitrin / Mağaza Ekranı & Piyasa Gerçekleri</button>
          <button class="aras-chip" onclick="arasSendPredefined('Büyük bina cephesi veya totem projemiz var, keşifle kesinleştirelim.')">🏢 Büyük Proje & Cephe Ekranı (Keşif)</button>
          <button class="aras-chip" onclick="arasSendPredefined('Ekranı boş ver Aras Bey, biraz dertleşelim esnaflık çok yordu.')">☕ Ekranı Boş Ver, Biraz Dertleşelim</button>
        </div>
      `;
      chatBody.appendChild(welcome);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  renderHistory();

  setTimeout(() => {
    const bubble = document.getElementById('aras-notification-bubble');
    if (bubble && !bubble.classList.contains('dismissed')) {
      playIPhoneNotificationSound();
      bubble.classList.add('show');
    }
  }, 2200);

  window.arasOpenAndReadNotification = function() {
    const bubble = document.getElementById('aras-notification-bubble');
    if (bubble) bubble.classList.remove('show');
    const badge = document.getElementById('arasUnreadBadge');
    if (badge) badge.style.display = 'none';
    arasToggleChat();
  };

  window.arasDismissBubble = function(e) {
    e.stopPropagation();
    const bubble = document.getElementById('aras-notification-bubble');
    if (bubble) {
      bubble.classList.remove('show');
      bubble.classList.add('dismissed');
    }
  };

  window.arasToggleChat = function() {
    const win = document.getElementById('aras-chat-window');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    if (win.style.display === 'flex') {
      const badge = document.getElementById('arasUnreadBadge');
      if (badge) badge.style.display = 'none';
      const bubble = document.getElementById('aras-notification-bubble');
      if (bubble) bubble.classList.remove('show');
      document.getElementById('arasUserInput').focus();
      document.getElementById('arasChatBody').scrollTop = document.getElementById('arasChatBody').scrollHeight;
    }
  };

  window.arasClearMemory = function() {
    if (confirm('Aras ile olan sohbet geçmişini ve hafızayı sıfırlamak istiyor musunuz?')) {
      localStorage.removeItem(MEMORY_KEY);
      renderHistory();
    }
  };

  window.arasHandleKey = function(e) {
    if (e.key === 'Enter') arasSendMessage();
  };

  window.arasSendPredefined = function(text) {
    document.getElementById('arasUserInput').value = text;
    arasSendMessage();
  };

  window.arasSendMessage = function() {
    const input = document.getElementById('arasUserInput');
    const userText = input.value.trim();
    if (!userText) return;

    const chatBody = document.getElementById('arasChatBody');
    const mem = getMemory();

    const userDiv = document.createElement('div');
    userDiv.className = 'aras-msg aras-user-msg';
    userDiv.textContent = userText;
    chatBody.appendChild(userDiv);
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    mem.messages.push({ sender: 'user', html: userText });
    saveMemory(mem);

    const typingDiv = document.createElement('div');
    typingDiv.className = 'aras-typing-wrap';
    typingDiv.id = 'arasTypingIndicator';
    typingDiv.innerHTML = '<span class="aras-typing-dot"></span><span class="aras-typing-dot"></span><span class="aras-typing-dot"></span>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById('arasTypingIndicator');
      if (indicator) indicator.remove();

      let replyHtml = '';
      const lower = userText.toLowerCase();

      // DOST & SIRDAŞ / DERTLEŞME MODU (İş dışı sohbeti asla geri çevirmez)
      if (lower.includes('dert') || lower.includes('çay') || lower.includes('kahve') || lower.includes('nasılsın') || lower.includes('yoruldum') || lower.includes('hayat') || lower.includes('halin') || lower.includes('arkadaş') || lower.includes('sohbet') || lower.includes('canım')) {
        replyHtml = `Eyvallah, başım üstüne. Ticaret dediğin gelir geçer, iki insan arasındaki samimiyet ve vefa baki kalır.<br><br>
Ben de bu piyasanın tozunu yutmuş, tırnaklarıyla sıfırdan atölye kurmuş bir adamım. Esnaflığın, ticaretin, memleketin yükünü çok iyi bilirim. İnsan bazen sadece bir bardak demli çay eşliğinde derdini dinleyecek bir sırdaş arar.<br><br>
Sen anlat, ben can kulağıyla dinliyorum. Gaziosmanpaşa'daki atölyeme yolun düştüğünde de ekranı falan boş ver; masama otur, bir çayımı iç dertleşelim.`;
      }
      // AVUKAT MODU (Hukuk, garanti, sözleşme, hak arama, ayıplı mal)
      else if (lower.includes('hukuk') || lower.includes('avukat') || lower.includes('sözleşme') || lower.includes('garanti') || lower.includes('dolandır') || lower.includes('mahkeme') || lower.includes('fatura') || lower.includes('bozuldu')) {
        replyHtml = `Bakın bu konuda en dişli avukat gibi konuşurum: <strong>Hakkınızı kimseye yedirmeyin.</strong><br><br>
6502 sayılı Tüketici Kanunu ve Ticaret Kanunu açıktır. Piyasada teneke büküp satan fasoncular 'Garanti verdik' der, 4 ay sonra şirket ünvanını değiştirip kayıplara karışır. Kanun açık: Sanayi malında teknik servis ve yedek parça bulundurma zorunluluğu vardır.<br><br>
Biz <strong>ARLEDSCREEN</strong> olarak faturalı, CE belgeli, noter onayına hazır teknik föyle iş teslim ediyoruz. <strong>2 yıl birebir parça değişimi + 5 yıl ücretsiz kapıda teknik servis</strong> sözleşmemiz yazılıdır. Hukuken de mühendislik olarak da arkamızda tek bir açık kapı bırakmayız.`;
      }
      // HÂKİM MODU (Kararsızlık, yanlış talep, adalet terazisi)
      else if (lower.includes('kararsız') || lower.includes('hangisi') || lower.includes('hakim') || lower.includes('doğrusu ne') || lower.includes('hüküm') || lower.includes('hakkaniyet')) {
        replyHtml = `Meseleye adalet terazisini koyup tarafsız bir hâkim gibi hükmü vereyim:<br><br>
Müşteri memnun olsun diye yanlışa doğru demem. Vicdanım elvermez. Eğer mesafe 1.5–2 metreyse ve siz 'ucuz olsun' diye P4 takmaya kalkarsanız bu kendi bütçenize haksızlıktır. O pikseller gözü tırmalar, müşteriyi iter.<br><br>
<strong>Hakkaniyetli karar şudur:</strong><br>
1) İç mekânda yakın izlemede tek hüküm <strong>P1.86 GOB</strong>'dur; darbe alsa da bozulmaz.<br>
2) 3 metreden uzakta <strong>P2.5</strong> adil ve ekonomik karardır.<br>
3) Dış mekânda 6.000 Nit altı takmak intihardır; 8.000 Nit NXTIONSTAR IP65 tartışmasız şarttır.<br>
Doğrusu budur, eğriye prim vermem.`;
      }
      // PSİKOLOG MODU (Korku, güvensizlik, şüphe, tedirginlik)
      else if (lower.includes('korku') || lower.includes('güven') || lower.includes('tedirgin') || lower.includes('endişe') || lower.includes('şüphe') || lower.includes('psikolog')) {
        replyHtml = `Sizi o kadar iyi anlıyorum ki... Kolay kazanılmıyor bu para. Alın teriyle biriktirdiğiniz bütçeyi bilmediğiniz bir teknolojiye bağlarken 'Acaba kandırılıyor muyum? 3 gün sonra patlar mı?' endişesi yaşamanız çok insani ve çok haklı bir psikoloji.<br><br>
Rahat olun, derin bir nefes alın. Burada size bir şey kakalamaya çalışan yok. Biz Manisa Büyükşehir Belediyesi'nden Alanya'nın 5 yıldızlı tatil köylerine kadar dev projelere imza atmış bir ekibiz. Tabelamız Gaziosmanpaşa'da sabit.<br><br>
Önce kafanızdaki tüm soru işaretlerini temizleyelim, kalbiniz mutlak mutmain olsun; gerisi zaten çözülür.`;
      }
            // KONTROL KARTI / HUIDU VS NOVASTAR (20 m2 KURALI)
      else if (lower.includes('kontrol') || lower.includes('kart') || lower.includes('huidu') || lower.includes('novastar') || lower.includes('işlemci') || lower.includes('processor')) {
        replyHtml = `Kontrol kartında kuralımız nettir, müşteriyi gereksiz masrafa sokmayız:<br><br>
• <strong>20 m²'nin altındaki ekranlarda Huidu</strong> önerir ve malzeme listesine ekleriz. Çünkü Wi-Fi ve bulut desteğiyle cep telefonundan içerik yüklemesi son derece pratiktir; kompakt ekranlarda bütçenizi şişirmez, taş gibi çalışır.<br><br>
• <strong>20 m² ve üzerindeki dev ekranlarda ise tartışmasız NovaStar</strong> takarız (Taurus veya VX All-in-One işlemci). Milyonlarca piksel yükü, canlı yayın senkronizasyonu, fiber altyapı ve sıfır gecikme için büyük projenin şakası olmaz; doğrudan NovaStar ile kilitleriz.<br><br>
Düşündüğünüz ekran yaklaşık kaç metrekare?`;
      }
      // UCUZLUK MANİFESTOSU & BÜYÜK PROJE KEŞFİ
      else if (lower.includes('ucuz') || lower.includes('pahalı') || lower.includes('fiyat') || lower.includes('m2') || lower.includes('kaça') || lower.includes('bütçe')) {
        replyHtml = `Çok açık söylüyorum: <strong>Biz ucuz bir firma değiliz; çünkü teknolojide ucuzluk en pahalı aldatmacadır.</strong><br><br>
Hurda trafoları, çakma kartları tenekeye vidalayıp ucuza satanlar 3 ay sonra modül yanınca telefonunu açmaz. Biz altın tel NationStar çip, orijinal NovaStar işlemci ve döküm alüminyum kasa kullanıyoruz. 2 yıl tam parça değişimi + 5 yıl ücretsiz teknik servis veriyoruz.<br><br>
<strong>Ortalama Bütçeniz:</strong><br>
• İç mekânda ortalama <strong>600 – 1.200 USD / m²</strong><br>
• Dış mekânda ortalama <strong>700 – 1.400 USD / m²</strong><br><br>
Fakat büyük bina cephesi veya totem projelerinde ezbere kesin rakam verilmez; rüzgâr yükü, demir karkasın statik hesabı ve elektrik panosu <strong>yerinde ücretsiz keşifle</strong> netleşir. Tek kuruş sürpriz maliyet çıkarılmaz.`;
      }
      // GENEL DOSTANE SATIŞ KAPATMA
      else {
        replyHtml = `Net konuşalım: LED ekran doğru mühendislikle kurulursa işletmenin cirosunu katlayan sessiz bir satış makinesidir. Yanlış kurulursa haftalık baş ağrısıdır.<br><br>
Ben işimin arkasındayım; sözümün de malımın da garantisi benim. Gel seni gereksiz masraftan kurtarayım, taş gibi bir mühendislikle tabelanı dikelim.<br><br>
Aklındaki ölçüyü veya mekânı bana kabaca söyle, atölye maliyetini önünüze koyayım.`;
      }

      replyHtml += `
        <div class="aras-action-card">
          <div class="aras-action-label">⚡ Aras Bozkurt ile Doğrudan İletişim:</div>
          <a class="aras-cta-whatsapp" href="https://wa.me/905305078834?text=" + encodeURIComponent('Selam Aras Bey, web sitenizden ulaşıyorum: ' + userText) + '" target="_blank">
            📲 WhatsApp\'tan Aras\'a Yaz (+90 530 507 88 34)
          </a>
        </div>
      `;

      const botDiv = document.createElement('div');
      botDiv.className = 'aras-msg aras-bot-msg';
      botDiv.innerHTML = replyHtml;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      mem.messages.push({ sender: 'bot', html: replyHtml });
      saveMemory(mem);
    }, 600);
  };
})();
