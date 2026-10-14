/* AR-LED Gemini 4 Argon Canlı Danışman — key-free widget.
 * The API key lives server-side in the GEMINI_API_KEY env var.
 * This file only talks to same-origin /api/gemini. */
(function () {
  if (document.getElementById("arled-widget-container")) return;

  var PHONE = "+90 530 507 88 34";
  var WHATSAPP = "905305078834";

  var root = document.createElement("div");
  root.id = "arled-widget-container";
  root.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:999999;font-family:sans-serif;";

  root.innerHTML = '<div id="arled-chat-trigger" style="width:60px;height:60px;border-radius:50%;background:#0284c7;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(2,132,199,0.5);border:2px solid #38bdf8;"><svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg></div><div id="arled-chat-window" style="position:fixed;bottom:96px;right:24px;width:380px;max-width:calc(100vw - 32px);height:560px;background:#0f172a;border:1px solid #334155;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,0.6);display:none;flex-direction:column;overflow:hidden;z-index:999999;"><div style="background:#1e293b;padding:14px 16px;border-bottom:1px solid #334155;display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:38px;height:38px;background:#0284c7;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">AR</div><div><div style="color:#fff;font-weight:600;font-size:14px;">AR-LED Danışmanı</div><div style="color:#38bdf8;font-size:11px;">Gemini 4 Argon · Gaziosmanpaşa</div></div></div><button id="arled-close" style="background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer;">&times;</button></div><div id="arledChatBody" style="flex:1;padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;background:#0f172a;"><div style="background:#1e293b;color:#e2e8f0;padding:12px 14px;border-radius:12px;font-size:13.5px;line-height:1.5;max-width:90%;">Merhaba! Mekan ölçünüze ve izleme mesafenize göre en uygun LED ekran piksel aralığını (P1.86, P2.5, dış mekan) birlikte belirleyelim.</div></div><div style="padding:12px;background:#1e293b;border-top:1px solid #334155;display:flex;gap:8px;"><input type="text" id="arledUserInput" placeholder="Ölçü veya soru yazın..." style="flex:1;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px;color:#fff;outline:none;"><button id="arled-send" style="background:#0284c7;border:none;border-radius:8px;width:40px;height:40px;cursor:pointer;color:#fff;">➔</button></div></div>';

  document.body.appendChild(root);

  var win = document.getElementById("arled-chat-window");
  var body = document.getElementById("arledChatBody");
  var input = document.getElementById("arledUserInput");
  var sending = false;

  function toggle() {
    win.style.display = win.style.display === "flex" ? "none" : "flex";
    if (win.style.display === "flex") input.focus();
  }

  function addMsg(html, self) {
    var d = document.createElement("div");
    d.style.cssText = self
      ? "background:#0284c7;color:#fff;padding:10px 14px;border-radius:12px;align-self:flex-end;max-width:85%;font-size:13.5px;"
      : "background:#1e293b;color:#e2e8f0;padding:12px 14px;border-radius:12px;max-width:85%;font-size:13.5px;";
    d.innerHTML = html;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """);
  }

  function send() {
    var text = input.value.trim();
    if (!text || sending) return;
    sending = true;
    input.value = "";
    addMsg(escapeHtml(text), true);
    var bot = addMsg("<em>Gemini 4 Argon hesaplıyor...</em>", false);
    fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          if (!r.ok) throw new Error(data.error || "HTTP " + r.status);
          return data;
        });
      })
      .then(function (data) {
        var reply = (data.reply || "Yanıt alınamadı.").replace(/\n/g, "<br>");
        var wa = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Web danışmanından yazdım: " + text);
        bot.innerHTML = reply + '<br><a style="display:inline-block;background:#16a34a;color:#fff;padding:8px 12px;border-radius:6px;text-decoration:none;margin-top:8px;font-weight:600;" href="' + wa + '" target="_blank" rel="noreferrer">📲 WhatsApp\'tan Teklif Al</a>';
      })
      .catch(function () {
        bot.innerHTML = 'Bağlantı hatası. Doğrudan arayabilirsiniz: <a style="color:#38bdf8;" href="tel:' + PHONE + '">' + PHONE + '</a>';
      })
      .then(function () {
        sending = false;
        body.scrollTop = body.scrollHeight;
      });
  }

  document.getElementById("arled-chat-trigger").addEventListener("click", toggle);
  document.getElementById("arled-close").addEventListener("click", toggle);
  document.getElementById("arled-send").addEventListener("click", send);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") send();
  });
})();