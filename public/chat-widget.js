/*!
 * ARLEDSCREEN Melis — satış danışmanı, yapay zekâ destekli (Gemini) — v2
 * Tek dosya. /api/chat üzerinden Gemini; otomatik ses yok; XSS güvenli markdown.
 * <script src="/chat-widget.js" data-locale="tr" defer></script>
 * data-locale | data-avatar | data-delay | data-pages (bkz. önceki sürüm)
 * API: window.openCanliDestek(), window.closeCanliDestek(); [data-open-canli-destek]
 */
(function () {
  "use strict";
  if (window.__arledCanliDestek) return;
  window.__arledCanliDestek = true;

  var EXCLUDED = /\/(hesaplayici|fiyat-hesap)(\/|$)/;
  if (EXCLUDED.test(location.pathname)) return;

  var me = document.currentScript || document.querySelector('script[src*="chat-widget"]');
  var ds = (me && me.dataset) || {};
  var LANG = ds.locale === "en" ? "en" : "tr";
  var AVATAR = ds.avatar || "/brand/canli-destek-avatar.webp";
  var DELAY = ds.delay != null && ds.delay !== "" && isFinite(+ds.delay) ? +ds.delay : 3500;
  var KEY = "arled-cd-dismissed";
  var WA = "https://wa.me/905305078834";
  function normPath(p) { return (p || "/").replace(/\/+$/, "") || "/"; }
  var BOOT_PATH = normPath(location.pathname);
  var PAGES = null;
  if (ds.pages && ds.pages !== "*") { try { PAGES = new RegExp(ds.pages); } catch (e) { PAGES = null; } }
  function allowedHere() {
    var p = location.pathname;
    if (EXCLUDED.test(p)) return false;
    if (ds.pages === "*") return true;
    if (PAGES) return PAGES.test(p);
    var n = normPath(p);
    return n === BOOT_PATH || n === "/" || n === "/tr" || n === "/en";
  }

  var T = {
    tr: {
      name: "Melis",
      role: "Satış danışmanı",
      online: "Çevrimiçi",
      teaser: "Merhaba, ben Melis, ARLEDSCREEN satış danışmanıyım. Size uygun LED ekranı birlikte bulalım mı?",
      teaserShort: "Merhaba, ben Melis. LED ekran için yardımcı olayım mı?",
      note: "",
      open: "Melis ile sohbeti aç", close: "Sohbeti kapat", closeTeaser: "Mesajı kapat",
      dialog: "Melis • ARLEDSCREEN satış danışmanı",
      welcome: "Merhaba, ben Melis, ARLEDSCREEN satış danışmanıyım. LED ekran, fiyat ve ürünler konusunda yardımcı olurum. Kesin teklif için sizi WhatsApp’tan ekibimizle görüştürürüm. Adınızı öğrenebilir miyim?",
      placeholder: "Mesajınızı yazın…",
      send: "Gönder",
      sending: "Melis yazıyor…",
      err: "Şu an yanıt veremiyorum, mesajınız iletilemedi. Tekrar deneyebilir veya ekibimize WhatsApp’tan ya da arled@arledscreen.com adresinden ulaşabilirsiniz.",
      errRate: "Kısa sürede çok fazla mesaj gönderildi. Biraz sonra tekrar deneyin veya ekibimize WhatsApp’tan yazın.",
      attach: "Fotoğraf ekle",
      imgNote: "Yüklediğiniz görsel yalnızca cevap için kullanılır ve saklanmaz.",
      imgMsg: "Fotoğraf gönderdim.",
      imgBig: "Görsel 10 MB’dan büyük. Daha küçük bir JPG veya PNG seçin.",
      imgType: "Yalnızca JPG veya PNG görsel yükleyebilirsiniz.",
      imgFail: "Görsel işlenemedi. Başka bir JPG veya PNG deneyin.",
      imgRate: "Bugün için görsel yükleme sınırına ulaşıldı. Ölçüleri yazabilir veya ekibimize WhatsApp’tan fotoğraf gönderebilirsiniz.",
      imgRemove: "Görseli kaldır",
      wa: "WhatsApp’ta yazın",
      disclose: "Yapay zekâ destekli • İnsan değil",
      minimize: "Sohbeti küçült",
      typing: "Melis yazıyor"
    },
    en: {
      name: "Melis",
      role: "Sales consultant",
      online: "Online",
      teaser: "Hi, I’m Melis, ARLEDSCREEN’s sales consultant. Shall we find the right LED screen together?",
      teaserShort: "Hi, I’m Melis. Need help with an LED screen?",
      note: "",
      open: "Open chat with Melis", close: "Close chat", closeTeaser: "Dismiss message",
      dialog: "Melis • ARLEDSCREEN sales consultant",
      welcome: "Hi, I’m Melis, ARLEDSCREEN’s sales consultant. I can help with LED screens, prices and products, and for a firm quote I’ll connect you with our team on WhatsApp. May I ask your name?",
      placeholder: "Type your message…",
      send: "Send",
      sending: "Melis is typing…",
      err: "I can’t reply right now and your message was not delivered. Please try again, or reach our team on WhatsApp or at arled@arledscreen.com.",
      errRate: "Too many messages in a short time. Please try again shortly or write to our team on WhatsApp.",
      attach: "Add a photo",
      imgNote: "The photo you upload is used only to answer and is not stored.",
      imgMsg: "I sent a photo.",
      imgBig: "The image is larger than 10 MB. Please choose a smaller JPG or PNG.",
      imgType: "Only JPG or PNG images can be uploaded.",
      imgFail: "The image could not be processed. Please try another JPG or PNG.",
      imgRate: "The daily photo limit has been reached. You can type the dimensions or send the photo to our team on WhatsApp.",
      imgRemove: "Remove photo",
      wa: "Chat on WhatsApp",
      disclose: "AI-powered • Not a human",
      minimize: "Minimise chat",
      typing: "Melis is typing"
    }
  }[LANG];

  var mqReduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var mqMobile = window.matchMedia ? window.matchMedia("(max-width: 767px)") : null;
  function reduced() { return !!(mqReduce && mqReduce.matches); }
  function mobile() { return !!(mqMobile && mqMobile.matches); }
  function dismissed() { try { return window.sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
  function dismiss() { try { window.sessionStorage.setItem(KEY, "1"); } catch (e) { /* */ } }

  var CSS = [
    ".acd-root[hidden]{display:none!important}",
    ".acd-root{--acd-b:calc(20px + env(safe-area-inset-bottom, 0px));--acd-r:calc(20px + env(safe-area-inset-right, 0px));--acd-navy:#0f2440;--acd-navy2:#1b3754;--acd-blue:#1e5bb8;--acd-ink:#0f172a;--acd-green:#22c55e;font-family:inherit;line-height:1.45;-webkit-font-smoothing:antialiased}",
    ".acd-root *,.acd-root *::before,.acd-root *::after{box-sizing:border-box}",
    ":where(.acd-root) button,:where(.acd-root) textarea{font:inherit;margin:0;border:0;background:none;color:inherit;-webkit-tap-highlight-color:transparent}",
    ":where(.acd-root) button{cursor:pointer}",
    ".acd-root [hidden]{display:none!important}",
    ".acd-root :focus-visible{outline:3px solid rgba(30,91,184,.55);outline-offset:3px}",
    ".acd-launcher{position:fixed;right:var(--acd-r);bottom:var(--acd-b);z-index:55;width:64px;height:64px;padding:0;border-radius:50%;background:#fff;box-shadow:0 0 0 3px #fff,0 12px 28px -8px rgba(15,36,64,.55),0 4px 10px rgba(15,36,64,.18);transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s,opacity .25s;animation:acd-pop .5s .2s cubic-bezier(.34,1.56,.64,1) both}",
    ".acd-launcher img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}",
    ".acd-ring{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(30,91,184,.45);animation:acd-ring 2s ease-out infinite;pointer-events:none}",
    ".acd-dot{position:absolute;right:1px;bottom:1px;width:16px;height:16px;border-radius:50%;background:var(--acd-green);border:3px solid #fff;animation:acd-dot 2.6s 1s ease-out infinite}",
    ".acd-badge{position:absolute;top:-2px;left:-2px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#e11d48;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;box-shadow:0 0 0 2px #fff}",
    ".acd-x-ico{display:none;position:absolute;inset:0;place-items:center;background:var(--acd-navy);color:#fff;border-radius:50%}",
    ".acd-root.acd-open .acd-x-ico{display:grid}",
    ".acd-root.acd-open .acd-launcher img,.acd-root.acd-open .acd-ring,.acd-root.acd-open .acd-dot,.acd-root.acd-open .acd-badge{display:none}",
    ".acd-root.acd-attn .acd-ring{animation-duration:1.2s}",
    ".acd-teaser{position:fixed;right:var(--acd-r);bottom:calc(var(--acd-b) + 78px);z-index:55;width:min(312px,calc(100vw - 32px));display:flex;align-items:flex-start;border-radius:18px 18px 6px 18px;background:#fff;color:var(--acd-ink);box-shadow:0 0 0 1px rgba(15,36,64,.08),0 22px 44px -18px rgba(15,36,64,.5),0 6px 14px -6px rgba(15,36,64,.18);transform-origin:100% 100%;animation:acd-teaser .5s cubic-bezier(.34,1.56,.64,1) both}",
    ".acd-teaser::after{content:\"\";position:absolute;right:22px;bottom:-7px;width:14px;height:14px;background:#fff;transform:rotate(45deg);border-radius:0 0 4px 0;box-shadow:3px 3px 6px -3px rgba(15,36,64,.18)}",
    ".acd-teaser-body{flex:1;display:flex;gap:10px;align-items:flex-start;padding:12px 4px 12px 12px;text-align:left;border-radius:18px 0 0 18px;cursor:pointer;background:transparent}",
    ".acd-teaser-body img{width:42px;height:42px;border-radius:50%;object-fit:cover;flex:none;box-shadow:0 0 0 2px #e8eef6}",
    ".acd-t-name{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--acd-navy)}",
    ".acd-t-name i{width:8px;height:8px;border-radius:50%;background:var(--acd-green);display:inline-block}",
    ".acd-t-name small{font-weight:500;color:#64748b}",
    ".acd-t-msg{display:block;margin-top:4px;font-size:13.5px;line-height:1.4;color:#334155}",
    ".acd-t-note{display:block;margin-top:4px;font-size:12px;color:#5b6573}",
    ".acd-typing{display:inline-flex;gap:4px;padding:8px 0 4px}",
    ".acd-typing span{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:acd-typing 1.1s ease-in-out infinite}",
    ".acd-typing span:nth-child(2){animation-delay:.15s}.acd-typing span:nth-child(3){animation-delay:.3s}",
    ".acd-msg-in{animation:acd-fade .35s ease-out both}",
    ".acd-teaser-x{flex:none;width:44px;height:44px;display:grid;place-items:center;border-radius:0 18px 0 12px;color:#64748b;transition:color .2s,background-color .2s}",
    ".acd-teaser-x:hover{color:var(--acd-ink);background:#f1f5f9}",
    ".acd-panel{position:fixed;right:var(--acd-r);bottom:calc(var(--acd-b) + 78px);z-index:56;width:400px;height:min(640px,calc(100vh - 140px));height:min(640px,calc(100dvh - 140px));overflow:hidden;border-radius:22px;background:#fff;box-shadow:0 0 0 1px rgba(15,36,64,.1),0 32px 64px -24px rgba(15,36,64,.6),0 10px 24px -10px rgba(15,36,64,.25);transform-origin:100% 100%;animation:acd-panel .38s cubic-bezier(.22,1,.36,1) both;display:flex;flex-direction:column}",
    ".acd-grab{display:none}",
    ".acd-head{flex:none;display:flex;align-items:center;gap:10px;padding:12px 52px 12px 14px;background:linear-gradient(160deg,#0f2440,#1b3754);color:#fff}",
    ".acd-head img{width:44px;height:44px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px rgba(255,255,255,.85)}",
    ".acd-head-txt{min-width:0}",
    ".acd-head-name{font-size:15px;font-weight:700;line-height:1.2}",
    ".acd-head-role{font-size:12px;opacity:.88;margin-top:2px}",
    ".acd-head-online{display:inline-flex;align-items:center;gap:5px;font-size:11px;opacity:.8;margin-top:3px}",
    ".acd-head-online i{width:7px;height:7px;border-radius:50%;background:var(--acd-green)}",
    ".acd-close{position:absolute;top:8px;right:10px;z-index:2;width:44px;height:44px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.22);transition:background-color .2s,transform .2s}",
    ".acd-close:hover{background:rgba(255,255,255,.22)}",
    ".acd-close:active{transform:scale(.94)}",
    ".acd-msgs{flex:1 1 auto;min-height:0;overflow:auto;padding:14px 12px;background:#f4f7fb;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch}",
    ".acd-bubble{max-width:88%;padding:10px 12px;border-radius:14px;font-size:14px;line-height:1.45;word-wrap:break-word;overflow-wrap:anywhere}",
    ".acd-bubble.bot{align-self:flex-start;background:#fff;color:var(--acd-ink);border:1px solid #e2e8f0;border-bottom-left-radius:4px}",
    ".acd-bubble.user{align-self:flex-end;background:var(--acd-blue);color:#fff;border-bottom-right-radius:4px}",
    ".acd-wa{display:inline-block;margin:-2px 0 6px 4px;padding:6px 12px;border-radius:16px;background:#25d366;color:#fff;font-size:13px;font-weight:600;text-decoration:none}",
    ".acd-bubble.acd-err{background:#fff7ed;border-color:#fdba74}",
    ".acd-bubble strong{font-weight:700}",
    ".acd-bubble .acd-ltr{white-space:nowrap;unicode-bidi:isolate!important;direction:ltr!important;display:inline-block}",
    ".acd-bubble a{color:inherit;text-decoration:underline;text-underline-offset:2px}",
    ".acd-bubble.bot a{color:var(--acd-blue)}",
    ".acd-bubble ul{margin:6px 0 0;padding-left:18px}",
    ".acd-bubble li{margin:2px 0}",
    ".acd-bubble p{margin:0 0 6px}.acd-bubble p:last-child{margin:0}",
    ".acd-wait{align-self:flex-start;display:inline-flex;gap:4px;padding:10px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:14px}",
    ".acd-wait span{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:acd-typing 1.1s ease-in-out infinite}",
    ".acd-wait span:nth-child(2){animation-delay:.15s}.acd-wait span:nth-child(3){animation-delay:.3s}",
    ".acd-foot{flex:none;border-top:1px solid #e2e8f0;background:#fff;padding:8px 10px 10px}",
    ".acd-form{display:flex;gap:8px;align-items:flex-end}",
    ".acd-input{flex:1;min-height:42px;max-height:110px;resize:none;padding:10px 12px;border-radius:12px;border:1px solid #cbd5e1;background:#fff;color:var(--acd-ink);line-height:1.35}",
    ".acd-input:focus{outline:none;border-color:var(--acd-blue);box-shadow:0 0 0 3px rgba(30,91,184,.18)}",
    ".acd-send{flex:none;height:42px;padding:0 14px;border-radius:12px;background:var(--acd-navy);color:#fff;font-weight:600;font-size:13px}",
    ".acd-send:disabled{opacity:.5;cursor:not-allowed}",
    ".acd-attach{flex:none;width:42px;height:42px;display:grid;place-items:center;border-radius:12px;border:1px solid #cbd5e1;background:#fff;color:var(--acd-navy)}",
    ".acd-attach:hover{background:#f1f5f9}.acd-attach:disabled{opacity:.5;cursor:not-allowed}",
    ".acd-chip{display:flex;align-items:center;gap:8px;margin:0 0 8px;padding:6px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;font-size:12px;color:#334155}",
    ".acd-chip img{width:44px;height:44px;border-radius:8px;object-fit:cover;flex:none}",
    ".acd-chip span{flex:1;min-width:0}",
    ".acd-chip button{flex:none;width:32px;height:32px;display:grid;place-items:center;border-radius:50%;color:#64748b}",
    ".acd-chip button:hover{background:#e2e8f0}",
    ".acd-bubble img.acd-photo{display:block;max-width:100%;max-height:180px;border-radius:10px;margin-bottom:6px}",
    ".acd-wa{display:flex;justify-content:center;margin-top:6px}",
    ".acd-wa a{font-size:12px;color:#15803d;text-decoration:none;font-weight:600}",
    ".acd-wa a:hover{text-decoration:underline}",
    ".acd-disclose{text-align:center;font-size:11px;color:#64748b;margin-top:4px}",
    "@media (max-width:767px){",
    "  .acd-launcher{width:58px;height:58px}",
    "  .acd-teaser{right:calc(var(--acd-r) + 68px);bottom:var(--acd-b);width:auto;max-width:min(260px,calc(100vw - 100px));min-height:58px;align-items:center;border-radius:20px 20px 6px 20px;transform-origin:100% 80%;animation-name:acd-teaser-m}",
    "  .acd-teaser::after{right:-5px;bottom:12px;width:12px;height:12px;border-radius:0 4px 0 0;box-shadow:3px -3px 6px -3px rgba(15,36,64,.14)}",
    "  .acd-teaser-body{gap:0;padding:8px 0 8px 13px;border-radius:20px 0 0 20px}",
    "  .acd-teaser-body img,.acd-t-name small,.acd-t-note{display:none}",
    "  .acd-t-name{font-size:12px;gap:5px}",
    "  .acd-t-msg{margin-top:1px;font-size:13px;line-height:1.32;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
    "  .acd-teaser-x{width:38px;height:44px;align-self:flex-start;border-radius:0 20px 0 12px}",
    "  .acd-panel{left:0;right:0;bottom:var(--acd-kb,0px);width:auto;height:var(--acd-sh,min(62dvh,560px));max-height:560px;border-radius:24px 24px 0 0;padding-bottom:env(safe-area-inset-bottom,0px);box-shadow:0 0 0 1px rgba(15,42,79,.06),0 -22px 48px -18px rgba(11,27,51,.42),0 -4px 14px -6px rgba(11,27,51,.16);transform-origin:50% 100%;animation:acd-sheet .34s cubic-bezier(.22,1,.36,1) backwards;transition:transform .26s cubic-bezier(.22,1,.36,1)}",
    "  .acd-root.acd-kb .acd-panel{padding-bottom:0}",
    "  .acd-panel.acd-dragging{transition:none;animation:none}",
    "  .acd-panel.acd-out{transform:translateY(105%)!important;transition:transform .2s cubic-bezier(.4,0,1,1)}",
    "  .acd-grab{display:flex;flex:none;justify-content:center;height:24px;background:#0b1b33;touch-action:none;cursor:grab}",
    "  .acd-handle{width:112px;height:24px;display:grid;place-items:center;touch-action:none}",
    "  .acd-handle::before{content:\"\";width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.42)}",
    "  .acd-close{top:32px}",
    "  .acd-root.acd-open .acd-launcher,.acd-root.acd-open .acd-teaser{display:none}",
    "  .acd-teaser.acd-measure{visibility:hidden;animation:none}",
    "}",
    "@keyframes acd-pop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:none}}",
    "@keyframes acd-teaser{from{opacity:0;transform:translateY(14px) scale(.9)}to{opacity:1;transform:none}}",
    "@keyframes acd-panel{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:none}}",
    "@keyframes acd-sheet{from{transform:translateY(100%)}to{transform:none}}",
    "@keyframes acd-teaser-m{from{opacity:0;transform:translateX(10px) scale(.92)}to{opacity:1;transform:none}}",
    "@keyframes acd-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}",
    "@keyframes acd-typing{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1}}",
    "@keyframes acd-dot{0%{box-shadow:0 0 0 0 rgba(34,197,94,.55)}70%,100%{box-shadow:0 0 0 7px rgba(34,197,94,0)}}",
    "@keyframes acd-ring{0%{transform:scale(.95);opacity:.9}100%{transform:scale(1.35);opacity:0}}",
    "@media (prefers-reduced-motion:reduce){.acd-root *,.acd-root *::before,.acd-root *::after{animation:none!important;transition:none!important}}"
  ].join("\n");

  var SVG_X = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var SVG_X_SM = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function avatarImg(size) {
    return el("img", "", { src: AVATAR, alt: T.name, width: String(size), height: String(size), decoding: "async" });
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  /* Escape first, then apply a small safe markdown subset. Regexes are NOT double-escaped. */
  function formatMarkdown(raw) {
    var s = esc(raw);
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function (_, t, u) {
      if (!/^https?:\/\//i.test(u)) return t;
      return '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + t + "</a>";
    });
    s = s.replace(/(^|[\s(])(https?:\/\/[^\s<]*[^\s<.,;:!?)])/g, function (_, pre, u) {
      return pre + '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + u + "</a>";
    });
    /* Keep phone numbers left-to-right inside Arabic (RTL) text. */
    s = s.replace(/(^|[^\w\/=])(\+\d[\d ]{8,}\d)/g, '$1<span class="acd-ltr" dir="ltr">\u2066$2\u2069</span>');
    s = s.replace(/(^|\n)((?:[-*] .+(?:\n|$))+)/g, function (_, pre, block) {
      var items = block.trim().split(/\n/).map(function (line) {
        return "<li>" + line.replace(/^[-*] /, "") + "</li>";
      }).join("");
      return pre + "<ul>" + items + "</ul>";
    });
    s = s.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>").replace(/<br><ul>/g, "<ul>").replace(/<\/ul><br>/g, "</ul>");
    return "<p>" + s + "</p>";
  }

  var root, launcher, badge, teaser, teaserMsg, panel, closeBtn, grab, handle, head, msgsEl, form, input, sendBtn, lastFocus = null;
  var isOpen = false, teaserTimer = 0, autoTimer = 0, drag = null, lastTap = 0, spaceWait = null, busy = false;
  var chatHist = []; /* {role,text} for /api/chat */
  var pendingImg = null; /* {b64, url, mime} downscaled photo waiting to be sent (client memory only) */
  var attachBtn, fileInput, chipEl;

  function build() {
    var style = el("style", "", { id: "acd-style" });
    style.textContent = CSS;
    document.head.appendChild(style);

    root = el("div", "acd-root", { "data-acd": "" });

    teaser = el("div", "acd-teaser");
    teaser.hidden = true;
    var tb = el("button", "acd-teaser-body", { type: "button", "aria-label": T.open });
    tb.appendChild(avatarImg(42));
    var tt = el("span", "");
    var nm = el("span", "acd-t-name");
    nm.appendChild(el("i", "", { "aria-hidden": "true" }));
    nm.appendChild(document.createTextNode(T.name));
    var on = el("small", "");
    on.textContent = "• " + T.online;
    nm.appendChild(on);
    teaserMsg = el("span", "acd-t-msg", { "aria-live": "polite" });
    tt.appendChild(nm);
    tt.appendChild(teaserMsg);
    tb.appendChild(tt);
    var tx = el("button", "acd-teaser-x", { type: "button", "aria-label": T.closeTeaser });
    tx.innerHTML = SVG_X_SM;
    teaser.appendChild(tb);
    teaser.appendChild(tx);

    launcher = el("button", "acd-launcher", { type: "button", "aria-label": T.open, "aria-expanded": "false", "aria-controls": "acd-panel", "aria-haspopup": "dialog" });
    launcher.appendChild(avatarImg(64));
    launcher.appendChild(el("span", "acd-ring", { "aria-hidden": "true" }));
    launcher.appendChild(el("span", "acd-dot", { "aria-hidden": "true" }));
    badge = el("span", "acd-badge", { "aria-hidden": "true" });
    badge.textContent = "1";
    badge.hidden = true;
    launcher.appendChild(badge);
    var xi = el("span", "acd-x-ico", { "aria-hidden": "true" });
    xi.innerHTML = SVG_X;
    launcher.appendChild(xi);

    panel = el("div", "acd-panel", { id: "acd-panel", role: "dialog", "aria-label": T.dialog });
    panel.hidden = true;
    closeBtn = el("button", "acd-close", { type: "button", "aria-label": T.close });
    closeBtn.innerHTML = SVG_X;
    grab = el("div", "acd-grab");
    handle = el("button", "acd-handle", { type: "button", "aria-label": T.minimize });
    grab.appendChild(handle);

    head = el("div", "acd-head");
    head.appendChild(avatarImg(44));
    var ht = el("div", "acd-head-txt");
    var hn = el("div", "acd-head-name"); hn.textContent = T.name;
    var hr = el("div", "acd-head-role"); hr.textContent = T.role;
    var ho = el("div", "acd-head-online");
    ho.appendChild(el("i", "", { "aria-hidden": "true" }));
    ho.appendChild(document.createTextNode(T.online + " · " + T.disclose));
    ht.appendChild(hn); ht.appendChild(hr); ht.appendChild(ho);
    head.appendChild(ht);

    msgsEl = el("div", "acd-msgs", { "aria-live": "polite" });
    addBubble("bot", T.welcome, true);

    var foot = el("div", "acd-foot");
    form = el("form", "acd-form");
    input = el("textarea", "acd-input", { dir: "auto", rows: "1", maxlength: "800", placeholder: T.placeholder, "aria-label": T.placeholder });
    sendBtn = el("button", "acd-send", { type: "submit" });
    sendBtn.textContent = T.send;
    attachBtn = el("button", "acd-attach", { type: "button", "aria-label": T.attach, title: T.attach });
    attachBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.4 11.1 12.2 20.3a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5"/></svg>';
    fileInput = el("input", "", { type: "file", accept: "image/jpeg,image/png", hidden: "", "aria-hidden": "true", tabindex: "-1" });
    chipEl = el("div", "acd-chip");
    chipEl.hidden = true;
    form.appendChild(attachBtn);
    form.appendChild(input);
    form.appendChild(sendBtn);
    var waRow = el("div", "acd-wa");
    var waA = el("a", "", { href: WA, target: "_blank", rel: "noopener noreferrer" });
    waA.textContent = T.wa;
    waRow.appendChild(waA);
    var disc = el("div", "acd-disclose");
    disc.textContent = T.disclose;
    foot.appendChild(chipEl);
    foot.appendChild(form);
    foot.appendChild(fileInput);
    foot.appendChild(waRow);
    foot.appendChild(disc);

    panel.appendChild(grab);
    panel.appendChild(closeBtn);
    panel.appendChild(head);
    panel.appendChild(msgsEl);
    panel.appendChild(foot);

    root.appendChild(teaser);
    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);

    launcher.addEventListener("click", function () { if (isOpen) close(); else open(); });
    tb.addEventListener("click", function () { open(); });
    tx.addEventListener("click", function () { hideTeaser(); dismiss(); launcher.focus(); });
    closeBtn.addEventListener("click", function () { close(); });
    grab.addEventListener("click", function () { if (Date.now() - lastTap < 700) return; minimize(); });
    grab.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      try { grab.setPointerCapture(e.pointerId); } catch (x) { /* */ }
      dragStart(e.screenY, true);
    });
    grab.addEventListener("pointermove", function (e) { if (drag) dragMove(e.screenY); });
    grab.addEventListener("pointerup", function () { dragEnd(); });
    grab.addEventListener("pointercancel", function () { dragEnd(true); });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", function (e) {
      var t = e.target && e.target.closest ? e.target.closest("[data-open-canli-destek]") : null;
      if (t && !root.hidden) { e.preventDefault(); open(); }
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); send(); });
    attachBtn.addEventListener("click", function () { if (!busy) fileInput.click(); });
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      fileInput.value = "";
      if (f) pickImage(f);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
    input.addEventListener("input", function () {
      input.style.height = "auto";
      input.style.height = Math.min(110, input.scrollHeight) + "px";
    });
    window.addEventListener("resize", place);
    if (mqMobile && mqMobile.addEventListener) mqMobile.addEventListener("change", function () { sheetSync(); place(); });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", sheetSync);
      window.visualViewport.addEventListener("scroll", sheetSync);
    }
    window.addEventListener("resize", sheetSync);
    place();
    var bar = document.querySelector(".mobile-cta-bar");
    if (bar && "ResizeObserver" in window) new ResizeObserver(place).observe(bar);
    if ("MutationObserver" in window) {
      new MutationObserver(function () { place(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    }
  }

  function addBubble(role, text, asHtmlWelcome) {
    var b = el("div", "acd-bubble " + (role === "user" ? "user" : "bot"), { dir: "auto" });
    if (role === "user") b.textContent = text;
    else b.innerHTML = asHtmlWelcome ? esc(text) : formatMarkdown(text);
    msgsEl.appendChild(b);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return b;
  }
  function setBusy(on) {
    busy = on;
    sendBtn.disabled = on;
    input.disabled = on;
    if (attachBtn) attachBtn.disabled = on;
  }
  /* ---- Photo upload: type/size check, client-side downscale (long edge <= 2560 px, JPEG <= ~3 MB), nothing is stored ---- */
  var IMG_RAW_MAX = 10 * 1024 * 1024, IMG_OUT_MAX = 3000000, IMG_EDGE = 2560;
  function clearPending() {
    pendingImg = null;
    chipEl.hidden = true;
    chipEl.textContent = "";
  }
  function showChip() {
    chipEl.textContent = "";
    var im = el("img", "", { alt: "", src: pendingImg.url });
    var tx = el("span", ""); tx.textContent = T.imgNote;
    var rm = el("button", "", { type: "button", "aria-label": T.imgRemove, title: T.imgRemove });
    rm.innerHTML = SVG_X_SM;
    rm.addEventListener("click", function () { clearPending(); });
    chipEl.appendChild(im); chipEl.appendChild(tx); chipEl.appendChild(rm);
    chipEl.hidden = false;
  }
  function loadBitmap(file) {
    if (window.createImageBitmap) {
      return createImageBitmap(file, { imageOrientation: "from-image" }).catch(function () { return createImageBitmap(file); });
    }
    return new Promise(function (ok, no) {
      var fr = new FileReader();
      fr.onload = function () { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { no(new Error("img")); }; i.src = String(fr.result); };
      fr.onerror = function () { no(new Error("img")); };
      fr.readAsDataURL(file);
    });
  }
  function downscale(file) {
    return loadBitmap(file).then(function (bmp) {
      var w0 = bmp.width, h0 = bmp.height;
      if (!w0 || !h0) throw new Error("img");
      var k = Math.min(1, IMG_EDGE / Math.max(w0, h0));
      var th = document.createElement("canvas"), tk = Math.min(1, 160 / Math.max(w0, h0));
      th.width = Math.max(1, Math.round(w0 * tk)); th.height = Math.max(1, Math.round(h0 * tk));
      var tg = th.getContext("2d"); tg.fillStyle = "#fff"; tg.fillRect(0, 0, th.width, th.height); tg.drawImage(bmp, 0, 0, th.width, th.height);
      var thumb = th.toDataURL("image/jpeg", 0.7); /* small preview as data: URL (CSP img-src allows data:, not blob:) */
      var tries = [[1, 0.92], [1, 0.85], [1, 0.78], [0.85, 0.82], [0.7, 0.8], [0.55, 0.78]];
      function enc(i) {
        var t = tries[i], c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(w0 * k * t[0])); c.height = Math.max(1, Math.round(h0 * k * t[0]));
        var g = c.getContext("2d");
        g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); /* PNG transparency → white; re-encoding also drops EXIF/GPS */
        g.drawImage(bmp, 0, 0, c.width, c.height);
        return new Promise(function (ok, no) {
          c.toBlob(function (b) { b ? ok(b) : no(new Error("img")); }, "image/jpeg", t[1]);
        }).then(function (b) {
          if (b.size <= IMG_OUT_MAX || i === tries.length - 1) { if (bmp.close) bmp.close(); return { blob: b, thumb: thumb }; }
          return enc(i + 1);
        });
      }
      return enc(0);
    });
  }
  function toB64(blob) {
    return new Promise(function (ok, no) {
      var r = new FileReader();
      r.onload = function () { ok(String(r.result).split(",")[1] || ""); };
      r.onerror = function () { no(new Error("img")); };
      r.readAsDataURL(blob);
    });
  }
  function pickImage(f) {
    if (f.type !== "image/jpeg" && f.type !== "image/png") { failBubble(T.imgType); return; }
    if (f.size > IMG_RAW_MAX) { failBubble(T.imgBig); return; }
    attachBtn.disabled = true;
    downscale(f).then(function (res) {
      if (res.blob.size > IMG_OUT_MAX * 1.4) throw new Error("img");
      return toB64(res.blob).then(function (b64) {
        clearPending();
        pendingImg = { b64: b64, url: res.thumb, mime: "image/jpeg" };
        showChip();
      });
    }).catch(function () { failBubble(T.imgFail); }).then(function () { attachBtn.disabled = false; });
  }

  var MAX_HIST = 12; /* same as MAX_TURNS in functions/api/chat.js */
  function failBubble(msg) {
    var b = el("div", "acd-bubble bot acd-err", { dir: "auto", role: "alert" });
    b.innerHTML = formatMarkdown(msg + " [" + T.wa + "](" + WA + ")");
    msgsEl.appendChild(b);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
  /* Typing delay grows with the reply length (about 12 ms per character, 0.7–4 s), minus the time the request already took. */
  function typingDelay(reply, elapsed) {
    if (reduced()) return 0;
    var want = Math.max(700, Math.min(4000, 300 + reply.length * 12));
    return Math.max(0, want - elapsed);
  }
  function send() {
    if (busy) return;
    var text = (input.value || "").trim().slice(0, 800);
    var photo = pendingImg;
    if (!text && !photo) return;
    if (!text) text = T.imgMsg;
    input.value = "";
    input.style.height = "auto";
    var ub = addBubble("user", text);
    if (photo) {
      var ph = el("img", "acd-photo", { alt: "", src: photo.url });
      ub.insertBefore(ph, ub.firstChild);
      clearPending(); /* thumbnail stays in the bubble; the photo is held only in this page's memory */
    }
    chatHist.push({ role: "user", text: text });
    if (chatHist.length > MAX_HIST) chatHist = chatHist.slice(-MAX_HIST);
    setBusy(true);
    var t0 = Date.now();
    var wait = el("div", "acd-wait", { "aria-label": T.sending, role: "status" });
    wait.appendChild(el("span")); wait.appendChild(el("span")); wait.appendChild(el("span"));
    msgsEl.appendChild(wait);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    var ctl = window.AbortController ? new AbortController() : null;
    var tmo = setTimeout(function () { if (ctl) ctl.abort(); }, photo ? 70000 : 40000);
    /* Request:  POST /api/chat  {messages:[{role:"user"|"assistant", text}], image?:{mime,data}}   Response: {reply} (or {reply, fallback:true} on server-side failure) */
    fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(photo ? { messages: chatHist, image: { mime: photo.mime, data: photo.b64 } } : { messages: chatHist }),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, status: r.status, d: d || {} }; });
    }).then(function (res) {
      clearTimeout(tmo);
      var reply = res.ok && typeof res.d.reply === "string" ? res.d.reply.trim() : "";
      if (!reply) { var e = new Error(res.d && res.d.error === "image_rate" ? "imgrate" : res.status === 429 ? "rate" : res.status === 413 ? "imgbig" : res.status === 415 ? "imgtype" : "empty"); throw e; }
      if (res.d.fallback) throw new Error("fallback"); /* server could not get an AI answer: show an honest error, never a canned "answer" */
      return new Promise(function (ok) { setTimeout(function () { ok({ text: reply, wa: res.d.wa === true }); }, typingDelay(reply, Date.now() - t0)); });
    }).then(function (r) {
      var reply = r.text;
      wait.remove();
      chatHist.push({ role: "assistant", text: reply });
      if (chatHist.length > MAX_HIST) chatHist = chatHist.slice(-MAX_HIST);
      addBubble("bot", reply);
      if (r.wa) { var a = el("a", "acd-wa", { href: WA, target: "_blank", rel: "noopener noreferrer" }); a.textContent = T.wa; msgsEl.appendChild(a); msgsEl.scrollTop = msgsEl.scrollHeight; }
    }).catch(function (e) {
      clearTimeout(tmo);
      if (wait.parentNode) wait.remove();
      /* the failed question is dropped from the history so the next try starts clean; the text is put back into the box */
      if (chatHist.length && chatHist[chatHist.length - 1].role === "user") chatHist.pop();
      if (!input.value && text !== T.imgMsg) input.value = text;
      if (photo && !pendingImg && !(e && e.message === "imgrate")) { pendingImg = photo; showChip(); } /* keep the photo for a retry */
      var m = e && e.message;
      failBubble(m === "rate" ? T.errRate : m === "imgrate" ? T.imgRate : m === "imgbig" ? T.imgBig : m === "imgtype" ? T.imgType : T.err);
    }).then(function () {
      setBusy(false);
      if (isOpen && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
        try { input.focus({ preventScroll: true }); } catch (e) { /* */ }
      }
    });
  }

  function place() {
    var bar = document.querySelector(".mobile-cta-bar");
    var h = 0;
    if (bar) {
      var cs = window.getComputedStyle(bar);
      if (cs.display !== "none" && cs.visibility !== "hidden" && cs.position === "fixed") h = bar.getBoundingClientRect().height;
    }
    root.style.setProperty("--acd-b", h > 0 ? Math.round(h + 12) + "px" : "calc(20px + env(safe-area-inset-bottom, 0px))");
    if (!launcher || root.hidden) return;
    var sel = 'nav[aria-label="Hızlı iletişim"],nav[aria-label="Quick contact"],[data-floating-social],[class*="whatsapp-float"],[class*="float-whatsapp"],[class*="floating-social"]';
    var nodes = document.querySelectorAll(sel);
    for (var pass = 0; pass < 3; pass++) {
      var lr = launcher.getBoundingClientRect(), moved = false;
      if (!lr.width) return;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n === bar || root.contains(n)) continue;
        var ncs = window.getComputedStyle(n);
        if (ncs.position !== "fixed" || ncs.display === "none" || ncs.visibility === "hidden") continue;
        var r = n.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (r.left < lr.right + 8 && r.right > lr.left - 8 && r.top < lr.bottom + 8 && r.bottom > lr.top - 8) {
          root.style.setProperty("--acd-b", Math.round(window.innerHeight - r.top + 12) + "px");
          moved = true;
        }
      }
      if (!moved) break;
    }
  }

  function sheetSync() {
    if (!root) return;
    if (!isOpen || !mobile()) {
      root.style.removeProperty("--acd-kb");
      root.style.removeProperty("--acd-sh");
      root.classList.remove("acd-kb");
      return;
    }
    var lh = window.innerHeight, vv = window.visualViewport, vh = lh, kb = 0;
    if (vv) {
      vh = vv.height;
      kb = Math.max(0, Math.round(lh - vv.height - vv.offsetTop));
      if (kb < 80) kb = 0;
    }
    var base = Math.min(Math.round(lh * 0.62), 560);
    var hgt = kb ? Math.max(220, Math.min(base, Math.round(vh) - 12)) : base;
    root.style.setProperty("--acd-kb", kb + "px");
    root.style.setProperty("--acd-sh", hgt + "px");
    root.classList.toggle("acd-kb", kb > 0);
  }

  function dragStart(y, fromGrab) {
    if (!isOpen || !mobile()) return;
    drag = { y0: y, dy: 0, t0: Date.now(), moved: false, grab: !!fromGrab };
    panel.classList.add("acd-dragging");
  }
  function dragMove(y) {
    if (!drag) return;
    var dy = Math.max(0, y - drag.y0);
    if (dy > 6) drag.moved = true;
    drag.dy = dy;
    panel.style.transform = dy ? "translateY(" + dy + "px)" : "";
  }
  function dragEnd(cancel) {
    if (!drag) return;
    var d = drag;
    drag = null;
    panel.classList.remove("acd-dragging");
    var v = d.dy / Math.max(1, Date.now() - d.t0);
    if (!cancel && (d.dy > 90 || (d.dy > 30 && v > 0.5))) { lastTap = Date.now(); minimize(); }
    else if (!cancel && d.grab && !d.moved) { lastTap = Date.now(); panel.style.transform = ""; minimize(); }
    else { if (d.moved) lastTap = Date.now(); panel.style.transform = ""; }
  }
  function minimize() {
    if (!isOpen) return;
    if (mobile() && !reduced()) {
      panel.classList.add("acd-out");
      setTimeout(function () { panel.classList.remove("acd-out"); close(); }, 200);
    } else close();
  }

  function onKey(e) {
    if (e.key === "Escape" && isOpen) { e.preventDefault(); close(); }
  }

  function teaserFits() {
    teaserMsg.textContent = T.teaserShort;
    teaserMsg.className = "acd-t-msg";
    teaser.classList.add("acd-measure");
    teaser.hidden = false;
    var r = teaser.getBoundingClientRect();
    teaser.hidden = true;
    teaser.classList.remove("acd-measure");
    var els = document.querySelectorAll('a[href],button,input,select,textarea,[role="button"]');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (root.contains(e) || (e.closest && e.closest('header,.mobile-cta-bar,[aria-hidden="true"]'))) continue;
      var q = e.getBoundingClientRect();
      if (!q.width || !q.height) continue;
      var ix = Math.min(r.right, q.right) - Math.max(r.left, q.left), iy = Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top);
      if (ix > 0 && iy > 0 && (ix * iy) / (q.width * q.height) > 0.2) return false;
    }
    return true;
  }
  function waitForSpace() {
    if (spaceWait) return;
    var t = 0;
    spaceWait = function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (dismissed() || isOpen || !root || root.hidden || !teaser.hidden) return;
        if (teaserFits()) { window.removeEventListener("scroll", spaceWait); spaceWait = null; showTeaser(); }
      }, 220);
    };
    window.addEventListener("scroll", spaceWait, { passive: true });
  }
  function showTeaser() {
    if (isOpen || dismissed() || !root || root.hidden) return;
    if (mobile() && !teaserFits()) {
      badge.hidden = false;
      root.classList.add("acd-attn");
      waitForSpace();
      return;
    }
    teaser.hidden = false;
    badge.hidden = false;
    root.classList.add("acd-attn");
    clearTimeout(autoTimer);
    if (mobile()) autoTimer = setTimeout(autoHideTeaser, 8000);
    if (reduced()) { setTeaserText(); return; }
    teaserMsg.textContent = "";
    var typing = el("span", "acd-typing", { role: "img", "aria-label": T.typing });
    typing.appendChild(el("span")); typing.appendChild(el("span")); typing.appendChild(el("span"));
    teaserMsg.appendChild(typing);
    setTimeout(setTeaserText, 900);
  }
  function setTeaserText() {
    teaserMsg.textContent = mobile() ? T.teaserShort : T.teaser;
    teaserMsg.className = "acd-t-msg acd-msg-in";
    if (T.note) {
      var n = el("span", "acd-t-note");
      n.textContent = T.note;
      teaserMsg.appendChild(n);
    }
  }
  function autoHideTeaser() {
    if (!teaser || teaser.hidden || isOpen) return;
    teaser.hidden = true;
    root.classList.remove("acd-attn");
    dismiss();
  }
  function hideTeaser() {
    clearTimeout(teaserTimer);
    clearTimeout(autoTimer);
    if (spaceWait) { window.removeEventListener("scroll", spaceWait); spaceWait = null; }
    if (!teaser) return;
    teaser.hidden = true;
    badge.hidden = true;
    root.classList.remove("acd-attn");
  }

  function open() {
    if (!root) return;
    hideTeaser();
    if (isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement;
    panel.hidden = false;
    root.classList.add("acd-open");
    launcher.setAttribute("aria-expanded", "true");
    launcher.setAttribute("aria-label", T.close);
    panel.style.transform = "";
    sheetSync();
    if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
      try { input.focus({ preventScroll: true }); return; } catch (e) { /* */ }
    }
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    dismiss();
    panel.hidden = true;
    root.classList.remove("acd-open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-label", T.open);
    panel.style.transform = "";
    sheetSync();
    var back = lastFocus && lastFocus !== document.body && document.contains(lastFocus) ? lastFocus : launcher;
    try { back.focus({ preventScroll: true }); } catch (e) { launcher.focus(); }
  }

  function onRoute() {
    if (!root) return;
    var ok = allowedHere();
    if (ok === !root.hidden) return;
    if (!ok) {
      if (isOpen) {
        isOpen = false;
        panel.hidden = true;
        root.classList.remove("acd-open");
        launcher.setAttribute("aria-expanded", "false");
        launcher.setAttribute("aria-label", T.open);
        panel.style.transform = "";
        sheetSync();
      }
      hideTeaser();
      root.hidden = true;
    } else {
      root.hidden = false;
      place();
    }
  }
  function watchRoutes() {
    ["pushState", "replaceState"].forEach(function (m) {
      var orig = history[m];
      if (typeof orig !== "function") return;
      history[m] = function () {
        var r = orig.apply(this, arguments);
        setTimeout(onRoute, 0);
        return r;
      };
    });
    window.addEventListener("popstate", function () { setTimeout(onRoute, 0); });
  }

  window.openCanliDestek = function () {
    if (!root) init();
    if (root.hidden) return;
    open();
  };
  window.closeCanliDestek = function () { close(); };

  var started = false;
  function init() {
    if (started) return;
    started = true;
    build();
    watchRoutes();
    if (!dismissed()) {
      var run = function () { teaserTimer = setTimeout(showTeaser, DELAY); };
      if (document.readyState === "complete") run();
      else window.addEventListener("load", run, { once: true });
    }
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init, { once: true });
})();
