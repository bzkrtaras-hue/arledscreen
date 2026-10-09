/*!
 * ARLEDSCREEN "Canlı Destek" sohbet balonu — v1
 * Tek dosya, harici istek yok (yalnızca aynı kökenden avatar + /fiyat-hesap/?mode=chat iframe'i).
 * CSP: satır içi olay işleyicisi yok; stil <style> etiketiyle eklenir (style-src 'unsafe-inline' yeterli).
 * Kullanım: <script src="/chat-widget.js" data-locale="tr" defer></script>
 *   data-locale  : "tr" (varsayılan) | "en" | desteklenen diğer diller
 * Dil (Melis ziyaretçinin dilinde karşılar): 1) sayfa dili TR değilse o dil; 2) ziyaretçinin ülkesi
 *   (/api/geo, Cloudflare CF-IPCountry; oturum başına bir istek) → o ülkenin resmî dili; 3) tarayıcı dili
 *   (navigator.languages); 4) bilinmeyen/desteklenmeyen → İngilizce, TR → Türkçe. Sohbet penceresine ?lang= ile geçer;
 *   ziyaretçi başka dilde yazarsa Melis o dile geçer (fiyat-hesap/melis-i18n.js). Test: sayfa adresine ?melis_cc=BG.
 *   data-src     : sohbet adresi (varsayılan "/fiyat-hesap/?mode=chat")
 *   data-avatar  : avatar yolu (varsayılan "/brand/canli-destek-avatar.webp")
 *   data-delay   : karşılama balonu gecikmesi, ms (varsayılan 3500)
 *   data-pages   : Next.js istemci içi geçişlerde balonun görüneceği yollar (RegExp). Varsayılan: yüklendiği sayfa
 *                  + /tr/ ve /en/ ana sayfaları. "*" = her sayfa. /hesaplayici ve /fiyat-hesap her zaman hariç.
 * API: window.openCanliDestek(), window.closeCanliDestek(); ya da herhangi bir öğeye data-open-canli-destek.
 */
(function () {
  "use strict";
  if (window.__arledCanliDestek) return;
  window.__arledCanliDestek = true;

  /* Hesaplayıcı sayfasında gösterme (sohbet zaten sayfada). */
  var EXCLUDED = /\/(hesaplayici|fiyat-hesap)(\/|$)/;
  if (EXCLUDED.test(location.pathname)) return;

  var me = document.currentScript || document.querySelector('script[src*="chat-widget"]');
  var ds = (me && me.dataset) || {};
  var SUP = ["tr", "en", "de", "fr", "es", "it", "ru", "uk", "bg", "ro", "el", "ar", "az", "ka"];
  function norm(l) { l = String(l || "").toLowerCase().split(/[-_]/)[0]; return SUP.indexOf(l) >= 0 ? l : null; }
  /* Ülke → resmî dil(ler). Listede olmayan ülke: tarayıcı dili, o da yoksa İngilizce. */
  var CC = {
    TR: "tr", AZ: "az", GE: "ka", BG: "bg", GR: "el", CY: "el,tr", RO: "ro", MD: "ro", UA: "uk", RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
    DE: "de", AT: "de", LI: "de", CH: "de,fr,it", LU: "fr,de", BE: "fr,de", FR: "fr", MC: "fr", IT: "it", SM: "it", VA: "it",
    ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
    SA: "ar", AE: "ar", EG: "ar", QA: "ar", KW: "ar", BH: "ar", OM: "ar", JO: "ar", LB: "ar", SY: "ar", IQ: "ar", YE: "ar", LY: "ar", TN: "ar", DZ: "ar", MA: "ar", SD: "ar", PS: "ar", MR: "ar",
    US: "en", GB: "en", IE: "en", AU: "en", NZ: "en", CA: "en,fr", MT: "en", SG: "en", ZA: "en", NG: "en", GH: "en", KE: "en"
  };
  var NAV = [];
  try { NAV = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]).map(function (l) { return String(l).toLowerCase(); }); } catch (e) { NAV = []; }
  function fromNav(only) {
    for (var i = 0; i < NAV.length; i++) { var n = norm(NAV[i]); if (n && (!only || only.indexOf(n) >= 0)) return n; }
    return null;
  }
  function fromCountry(cc) {
    var list = CC[String(cc || "").toUpperCase()];
    if (!list) return null;
    list = list.split(",");
    return fromNav(list) || list[0];
  }
  var CC_KEY = "arled-cd-cc";
  function storedCountry() {
    try {
      var q = /[?&]melis_cc=([a-z]{2})(?:&|$)/i.exec(location.search);   /* önizleme/test: ülke benzetimi */
      if (q) { window.sessionStorage.setItem(CC_KEY, q[1].toUpperCase()); return q[1].toUpperCase(); }
      return window.sessionStorage.getItem(CC_KEY) || "";
    } catch (e) { return ""; }
  }
  var PAGE = norm(ds.locale || document.documentElement.getAttribute("lang") || "tr") || "en";
  var PAGE_FIXED = PAGE !== "tr";
  function pickLang(cc) {
    if (PAGE_FIXED) return PAGE;
    return fromCountry(cc) || fromNav() || (String(cc).toUpperCase() === "TR" ? "tr" : (cc || NAV.length ? "en" : "tr"));
  }
  var LANG = pickLang(storedCountry());
  var SRC = ds.src || "/fiyat-hesap/?mode=chat";
  var AVATAR = ds.avatar || "/brand/canli-destek-avatar.webp";
  var DELAY = ds.delay != null && ds.delay !== "" && isFinite(+ds.delay) ? +ds.delay : 3500;
  var KEY = "arled-cd-dismissed";
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

  var STR = {
    tr: {
      name: "Melis", online: "Canlı Destek • Çevrim içi",
      teaser: "Merhaba, ben Melis. Size uygun LED ekranı ve fiyatı birlikte bulalım mı?",
      teaserShort: "Merhaba, ben Melis. Uygun ekranı birlikte bulalım mı?",
      note: "",
      open: "Melis ile sohbeti aç", close: "Sohbeti kapat", closeTeaser: "Mesajı kapat",
      dialog: "Melis • Canlı Destek", frame: "Melis: LED ekran önerisi ve tahmini fiyat", loading: "Bağlanıyor…",
      typing: "Melis yazıyor", minimize: "Sohbeti küçült"
    },
    en: {
      name: "Melis", online: "Live Support • Online",
      teaser: "Hi, I'm Melis. Shall we find the right LED screen and an estimated price together?",
      teaserShort: "Hi, I'm Melis. Shall we find the right screen together?",
      note: "",
      open: "Open chat with Melis", close: "Close chat", closeTeaser: "Dismiss message",
      dialog: "Melis • Live Support", frame: "Melis: LED screen recommendation and estimated price", loading: "Connecting…",
      typing: "Melis is typing", minimize: "Minimise chat"
    },
    de: { name: "Melis", online: "Live-Support • Online", teaser: "Hallo, ich bin Melis. Sollen wir gemeinsam die passende LED-Wand und einen Richtpreis finden?", teaserShort: "Hallo, ich bin Melis. Finden wir gemeinsam den passenden Bildschirm?", note: "", open: "Chat mit Melis öffnen", close: "Chat schließen", closeTeaser: "Nachricht schließen", dialog: "Melis • Live-Support", frame: "Melis: LED-Empfehlung und Richtpreis", loading: "Verbinden…", typing: "Melis schreibt", minimize: "Chat minimieren" },
    fr: { name: "Melis", online: "Assistance • En ligne", teaser: "Bonjour, je suis Melis. On cherche ensemble l'écran LED qu'il vous faut et un prix estimé ?", teaserShort: "Bonjour, je suis Melis. On trouve ensemble le bon écran ?", note: "", open: "Ouvrir le chat avec Melis", close: "Fermer le chat", closeTeaser: "Fermer le message", dialog: "Melis • Assistance en direct", frame: "Melis : conseil écran LED et prix estimé", loading: "Connexion…", typing: "Melis écrit", minimize: "Réduire le chat" },
    es: { name: "Melis", online: "Atención • En línea", teaser: "Hola, soy Melis. ¿Buscamos juntos la pantalla LED adecuada y un precio estimado?", teaserShort: "Hola, soy Melis. ¿Buscamos juntos la pantalla adecuada?", note: "", open: "Abrir chat con Melis", close: "Cerrar chat", closeTeaser: "Cerrar mensaje", dialog: "Melis • Atención en directo", frame: "Melis: recomendación de pantalla LED y precio estimado", loading: "Conectando…", typing: "Melis está escribiendo", minimize: "Minimizar chat" },
    it: { name: "Melis", online: "Assistenza • Online", teaser: "Ciao, sono Melis. Troviamo insieme lo schermo LED giusto e un prezzo stimato?", teaserShort: "Ciao, sono Melis. Troviamo insieme lo schermo giusto?", note: "", open: "Apri la chat con Melis", close: "Chiudi la chat", closeTeaser: "Chiudi il messaggio", dialog: "Melis • Assistenza live", frame: "Melis: consiglio schermo LED e prezzo stimato", loading: "Connessione…", typing: "Melis sta scrivendo", minimize: "Riduci la chat" },
    ru: { name: "Мелис", online: "Поддержка • В сети", teaser: "Здравствуйте, я Мелис. Подберём вместе подходящий светодиодный экран и ориентировочную цену?", teaserShort: "Здравствуйте, я Мелис. Подберём экран вместе?", note: "", open: "Открыть чат с Мелис", close: "Закрыть чат", closeTeaser: "Закрыть сообщение", dialog: "Мелис • Онлайн-поддержка", frame: "Мелис: подбор LED-экрана и ориентировочная цена", loading: "Подключение…", typing: "Мелис печатает", minimize: "Свернуть чат" },
    uk: { name: "Меліс", online: "Підтримка • Онлайн", teaser: "Вітаю, я Меліс. Підберемо разом відповідний світлодіодний екран і орієнтовну ціну?", teaserShort: "Вітаю, я Меліс. Підберемо екран разом?", note: "", open: "Відкрити чат з Меліс", close: "Закрити чат", closeTeaser: "Закрити повідомлення", dialog: "Меліс • Онлайн-підтримка", frame: "Меліс: підбір LED-екрана та орієнтовна ціна", loading: "З'єднання…", typing: "Меліс друкує", minimize: "Згорнути чат" },
    bg: { name: "Мелис", online: "Поддръжка • На линия", teaser: "Здравейте, аз съм Мелис. Да намерим ли заедно подходящия LED екран и ориентировъчна цена?", teaserShort: "Здравейте, аз съм Мелис. Да изберем ли екрана заедно?", note: "", open: "Отворете чата с Мелис", close: "Затваряне на чата", closeTeaser: "Затваряне на съобщението", dialog: "Мелис • Онлайн поддръжка", frame: "Мелис: препоръка за LED екран и ориентировъчна цена", loading: "Свързване…", typing: "Мелис пише", minimize: "Смаляване на чата" },
    ro: { name: "Melis", online: "Asistență • Online", teaser: "Bună, sunt Melis. Găsim împreună ecranul LED potrivit și un preț estimativ?", teaserShort: "Bună, sunt Melis. Alegem împreună ecranul potrivit?", note: "", open: "Deschideți chatul cu Melis", close: "Închideți chatul", closeTeaser: "Închideți mesajul", dialog: "Melis • Asistență live", frame: "Melis: recomandare ecran LED și preț estimativ", loading: "Se conectează…", typing: "Melis scrie", minimize: "Minimizați chatul" },
    el: { name: "Μελίς", online: "Υποστήριξη • Σε σύνδεση", teaser: "Γεια σας, είμαι η Μελίς. Να βρούμε μαζί την κατάλληλη οθόνη LED και μια εκτιμώμενη τιμή;", teaserShort: "Γεια σας, είμαι η Μελίς. Να βρούμε μαζί την οθόνη;", note: "", open: "Άνοιγμα συνομιλίας με τη Μελίς", close: "Κλείσιμο συνομιλίας", closeTeaser: "Κλείσιμο μηνύματος", dialog: "Μελίς • Ζωντανή υποστήριξη", frame: "Μελίς: πρόταση οθόνης LED και εκτιμώμενη τιμή", loading: "Σύνδεση…", typing: "Η Μελίς γράφει", minimize: "Ελαχιστοποίηση συνομιλίας" },
    ar: { name: "مليس", online: "الدعم • متصلة", teaser: "مرحبًا، أنا مليس. هل نختار معًا شاشة LED المناسبة وسعرًا تقديريًا؟", teaserShort: "مرحبًا، أنا مليس. هل نختار الشاشة المناسبة معًا؟", note: "", open: "افتح المحادثة مع مليس", close: "أغلق المحادثة", closeTeaser: "أغلق الرسالة", dialog: "مليس • دعم مباشر", frame: "مليس: اقتراح شاشة LED وسعر تقديري", loading: "جارٍ الاتصال…", typing: "مليس تكتب", minimize: "تصغير المحادثة" },
    az: { name: "Melis", online: "Canlı dəstək • Onlayn", teaser: "Salam, mən Melisəm. Sizə uyğun LED ekranı və qiyməti birlikdə tapaq?", teaserShort: "Salam, mən Melisəm. Uyğun ekranı birlikdə tapaq?", note: "", open: "Melis ilə söhbəti aç", close: "Söhbəti bağla", closeTeaser: "Mesajı bağla", dialog: "Melis • Canlı dəstək", frame: "Melis: LED ekran tövsiyəsi və təxmini qiymət", loading: "Qoşulur…", typing: "Melis yazır", minimize: "Söhbəti kiçilt" },
    ka: { name: "მელისი", online: "მხარდაჭერა • ონლაინ", teaser: "გამარჯობა, მე მელისი ვარ. ერთად შევარჩიოთ შესაფერისი LED ეკრანი და სავარაუდო ფასი?", teaserShort: "გამარჯობა, მე მელისი ვარ. ეკრანი ერთად შევარჩიოთ?", note: "", open: "ჩატის გახსნა მელისთან", close: "ჩატის დახურვა", closeTeaser: "შეტყობინების დახურვა", dialog: "მელისი • ონლაინ მხარდაჭერა", frame: "მელისი: LED ეკრანის რეკომენდაცია და სავარაუდო ფასი", loading: "დაკავშირება…", typing: "მელისი წერს", minimize: "ჩატის ჩაკეცვა" }
  };
  var T = STR[LANG] || STR.en;

  var mqReduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  /* Match MobileCtaBar (md:hidden = <768px) so launcher clears Ara / WhatsApp / Teklif. */
  var mqMobile = window.matchMedia ? window.matchMedia("(max-width: 767px)") : null;
  function reduced() { return !!(mqReduce && mqReduce.matches); }
  function mobile() { return !!(mqMobile && mqMobile.matches); }
  function dismissed() { try { return window.sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
  function dismiss() { try { window.sessionStorage.setItem(KEY, "1"); } catch (e) { /* özel mod */ } }

  var CSS = [
    ".acd-root[hidden]{display:none!important}",
    ".acd-root{--acd-b:calc(20px + env(safe-area-inset-bottom, 0px));--acd-r:calc(20px + env(safe-area-inset-right, 0px));--acd-navy:#0f2440;--acd-navy2:#1b3754;--acd-blue:#1e5bb8;--acd-ink:#0f172a;--acd-green:#22c55e;font-family:inherit;line-height:1.45;-webkit-font-smoothing:antialiased}",
    ".acd-root *,.acd-root *::before,.acd-root *::after{box-sizing:border-box}",
    ":where(.acd-root) button{font:inherit;margin:0;border:0;background:none;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}",
    ".acd-root [hidden]{display:none!important}",
    ".acd-root :focus-visible{outline:3px solid rgba(30,91,184,.55);outline-offset:3px}",
    /* Launcher */
    ".acd-launcher{position:fixed;right:var(--acd-r);bottom:var(--acd-b);z-index:55;width:64px;height:64px;padding:0;border-radius:50%;background:#fff;box-shadow:0 0 0 3px #fff,0 12px 28px -8px rgba(15,36,64,.55),0 4px 10px rgba(15,36,64,.18);transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s,opacity .25s;animation:acd-pop .5s .2s cubic-bezier(.34,1.56,.64,1) both}",
    ".acd-launcher:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 0 0 3px #fff,0 16px 32px -8px rgba(15,36,64,.6),0 4px 10px rgba(15,36,64,.2)}",
    ".acd-launcher:active{transform:scale(.95)}",
    ".acd-launcher img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;transition:opacity .2s,transform .25s}",
    ".acd-dot{position:absolute;right:1px;bottom:1px;width:16px;height:16px;border-radius:50%;background:var(--acd-green);border:3px solid #fff;animation:acd-dot 2.6s 1s ease-out infinite}",
    ".acd-badge{position:absolute;top:-3px;right:-3px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#e11d48;color:#fff;font-size:11px;font-weight:700;line-height:20px;text-align:center;box-shadow:0 0 0 2px #fff;animation:acd-pop .35s cubic-bezier(.34,1.56,.64,1) both}",
    ".acd-ring{position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(34,197,94,.55);opacity:0;pointer-events:none}",
    ".acd-root.acd-attn .acd-ring{animation:acd-ring 1.8s ease-out 3}",
    ".acd-x-ico{position:absolute;inset:0;display:grid;place-items:center;border-radius:50%;background:var(--acd-navy);color:#fff;opacity:0;transform:rotate(-60deg) scale(.6);transition:opacity .2s,transform .25s cubic-bezier(.34,1.56,.64,1)}",
    ".acd-root.acd-open .acd-x-ico{opacity:1;transform:none}",
    ".acd-root.acd-open .acd-dot,.acd-root.acd-open .acd-badge{opacity:0}",
    /* Teaser */
    ".acd-teaser{position:fixed;right:var(--acd-r);bottom:calc(var(--acd-b) + 78px);z-index:55;width:min(312px,calc(100vw - 32px));display:flex;align-items:flex-start;border-radius:18px 18px 6px 18px;background:#fff;color:var(--acd-ink);box-shadow:0 0 0 1px rgba(15,36,64,.08),0 22px 44px -18px rgba(15,36,64,.5),0 6px 14px -6px rgba(15,36,64,.18);transform-origin:100% 100%;animation:acd-teaser .5s cubic-bezier(.34,1.56,.64,1) both}",
    ".acd-teaser::after{content:\"\";position:absolute;right:22px;bottom:-7px;width:14px;height:14px;background:#fff;transform:rotate(45deg);border-radius:0 0 4px 0;box-shadow:3px 3px 6px -3px rgba(15,36,64,.18)}",
    ".acd-teaser-body{flex:1 1 auto;display:flex;align-items:flex-start;gap:11px;min-width:0;padding:14px 4px 14px 14px;text-align:left;border-radius:18px 0 0 18px}",
    ".acd-teaser-body img{flex:none;width:42px;height:42px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff,0 2px 8px rgba(15,36,64,.25)}",
    ".acd-t-name{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--acd-navy2)}",
    ".acd-t-name i{width:8px;height:8px;border-radius:50%;background:var(--acd-green);box-shadow:0 0 0 3px rgba(34,197,94,.18)}",
    ".acd-t-name small{font-size:11.5px;font-weight:500;color:#5b6573}",
    ".acd-t-msg{display:block;margin-top:3px;font-size:14px;line-height:1.45;color:#1f2937}",
    ".acd-t-note{display:block;margin-top:4px;font-size:12px;color:#5b6573}",
    ".acd-typing{display:inline-flex;gap:4px;padding:8px 0 4px}",
    ".acd-typing span{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:acd-typing 1.1s ease-in-out infinite}",
    ".acd-typing span:nth-child(2){animation-delay:.15s}.acd-typing span:nth-child(3){animation-delay:.3s}",
    ".acd-msg-in{animation:acd-fade .35s ease-out both}",
    ".acd-teaser-x{flex:none;width:44px;height:44px;display:grid;place-items:center;border-radius:0 18px 0 12px;color:#64748b;transition:color .2s,background-color .2s}",
    ".acd-teaser-x:hover{color:var(--acd-ink);background:#f1f5f9}",
    /* Panel */
    ".acd-panel{position:fixed;right:var(--acd-r);bottom:calc(var(--acd-b) + 78px);z-index:56;width:400px;height:min(640px,calc(100vh - 140px));height:min(640px,calc(100dvh - 140px));overflow:hidden;border-radius:22px;background:var(--acd-navy);box-shadow:0 0 0 1px rgba(15,36,64,.1),0 32px 64px -24px rgba(15,36,64,.6),0 10px 24px -10px rgba(15,36,64,.25);transform-origin:100% 100%;animation:acd-panel .38s cubic-bezier(.22,1,.36,1) both;display:flex;flex-direction:column}",
    ".acd-frame{display:block;flex:1 1 auto;min-height:0;width:100%;height:100%;border:0;background:#fff}",
    ".acd-grab{display:none}",
    ".acd-close{position:absolute;top:8px;right:10px;z-index:2;width:44px;height:44px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.22);transition:background-color .2s,transform .2s}",
    ".acd-close:hover{background:rgba(255,255,255,.22)}",
    ".acd-close:active{transform:scale(.94)}",
    ".acd-loading{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:linear-gradient(160deg,#0f2440,#1b3754);color:#d6e4f5;font-size:14px;font-weight:500;transition:opacity .3s}",
    ".acd-loading img{width:72px;height:72px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px rgba(255,255,255,.9);animation:acd-breathe 1.6s ease-in-out infinite}",
    ".acd-loading.acd-done{opacity:0;pointer-events:none}",
    "@media (max-width:767px){",
    "  .acd-launcher{width:58px;height:58px}",
    /* Mobil karşılama: başlatıcının yanında küçük balon; hero düğmelerini ve alt çubuğu örtmez. */
    "  .acd-teaser{right:calc(var(--acd-r) + 68px);bottom:var(--acd-b);width:auto;max-width:min(260px,calc(100vw - 100px));min-height:58px;align-items:center;border-radius:20px 20px 6px 20px;transform-origin:100% 80%;animation-name:acd-teaser-m}",
    "  .acd-teaser::after{right:-5px;bottom:12px;width:12px;height:12px;border-radius:0 4px 0 0;box-shadow:3px -3px 6px -3px rgba(15,36,64,.14)}",
    "  .acd-teaser-body{gap:0;padding:8px 0 8px 13px;border-radius:20px 0 0 20px}",
    "  .acd-teaser-body img,.acd-t-name small,.acd-t-note{display:none}",
    "  .acd-t-name{font-size:12px;gap:5px}",
    "  .acd-t-msg{margin-top:1px;font-size:13px;line-height:1.32;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
    "  .acd-teaser-x{width:38px;height:44px;align-self:flex-start;border-radius:0 20px 0 12px}",
    /* Mobil alt sayfa: ana sayfa üstte görünür kalır; kaydırma kilidi ve karartma yok. */
    "  .acd-panel{left:0;right:0;bottom:var(--acd-kb,0px);width:auto;height:var(--acd-sh,min(62dvh,560px));max-height:560px;border-radius:24px 24px 0 0;background:#fff;padding-bottom:env(safe-area-inset-bottom,0px);box-shadow:0 0 0 1px rgba(15,42,79,.06),0 -22px 48px -18px rgba(11,27,51,.42),0 -4px 14px -6px rgba(11,27,51,.16);transform-origin:50% 100%;animation:acd-sheet .34s cubic-bezier(.22,1,.36,1) backwards;transition:transform .26s cubic-bezier(.22,1,.36,1)}",
    "  .acd-root.acd-kb .acd-panel{padding-bottom:0}",
    "  .acd-panel.acd-dragging{transition:none;animation:none}",
    "  .acd-panel.acd-out{transform:translateY(105%)!important;transition:transform .2s cubic-bezier(.4,0,1,1)}",
    "  .acd-grab{display:flex;flex:none;justify-content:center;height:24px;background:#0b1b33;touch-action:none;cursor:grab}",
    "  .acd-handle{width:112px;height:24px;display:grid;place-items:center;touch-action:none}",
    "  .acd-handle::before{content:\"\";width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.42);transition:background-color .2s,width .2s}",
    "  .acd-handle:hover::before,.acd-handle:focus-visible::before{background:rgba(255,255,255,.7);width:48px}",
    "  .acd-root .acd-handle:focus-visible{outline-offset:-3px}",
    "  .acd-close{top:32px}",
    "  .acd-loading{top:24px}",
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
    "@keyframes acd-breathe{50%{transform:scale(1.05)}}",
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
    // Bing Webmaster flags empty alt on 64×64 launcher / 72×72 loading avatars.
    var i = el("img", "", {
      src: AVATAR,
      alt: T.name,
      width: String(size),
      height: String(size),
      decoding: "async",
    });
    return i;
  }

  var root, launcher, badge, teaser, teaserMsg, panel, closeBtn, grab, handle, frame, loading, lastFocus = null;
  var refs = {};
  /* Ülke bilgisi geldikten sonra dil değişirse metinleri yenile (görünüm aynı). */
  function relabel() {
    if (!root) return;
    root.setAttribute("lang", LANG);
    if (refs.tb) refs.tb.setAttribute("aria-label", T.open);
    if (refs.name) refs.name.textContent = T.name;
    if (refs.online) refs.online.textContent = "• " + T.online;
    if (refs.tx) refs.tx.setAttribute("aria-label", T.closeTeaser);
    if (refs.loading) refs.loading.textContent = T.loading;
    launcher.setAttribute("aria-label", isOpen ? T.close : T.open);
    panel.setAttribute("aria-label", T.dialog);
    closeBtn.setAttribute("aria-label", T.close);
    handle.setAttribute("aria-label", T.minimize);
    var imgs = root.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) imgs[i].alt = T.name;
    if (teaserMsg) teaserMsg.dir = LANG === "ar" ? "rtl" : "";
    if (teaser && !teaser.hidden && teaserMsg && !teaserMsg.querySelector(".acd-typing")) setTeaserText();
  }
  function setLang(l) {
    l = norm(l) || "en";
    if (l === LANG) return;
    LANG = l;
    T = STR[LANG] || STR.en;
    relabel();
  }
  /* Ziyaretçinin ülkesi: Cloudflare (CF-IPCountry) → /api/geo. Oturum başına bir kez; hata olursa tarayıcı dili kalır. */
  function geo() {
    if (PAGE_FIXED || storedCountry() || !window.fetch) return;
    var ctl = "AbortController" in window ? new AbortController() : null;
    var to = setTimeout(function () { if (ctl) ctl.abort(); }, 2500);
    fetch("/api/geo", { credentials: "omit", cache: "no-store", signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        clearTimeout(to);
        var cc = j && /^[A-Z]{2}$/.test(j.country || "") ? j.country : "";
        if (!cc) return;
        try { window.sessionStorage.setItem(CC_KEY, cc); } catch (e) { /* özel mod */ }
        setLang(pickLang(cc));
      })
      .catch(function () { clearTimeout(to); });
  }
  var isOpen = false, teaserTimer = 0, autoTimer = 0, drag = null, lastTap = 0, spaceWait = null;

  function build() {
    var style = el("style", "", { id: "acd-style" });
    style.textContent = CSS;
    document.head.appendChild(style);

    root = el("div", "acd-root", { "data-acd": "" });

    teaser = el("div", "acd-teaser");
    teaser.hidden = true;
    var tb = el("button", "acd-teaser-body", { type: "button", "aria-label": T.open });
    refs.tb = tb;
    tb.appendChild(avatarImg(42));
    var tt = el("span", "");
    var nm = el("span", "acd-t-name");
    nm.appendChild(el("i", "", { "aria-hidden": "true" }));
    refs.name = document.createTextNode(T.name);
    nm.appendChild(refs.name);
    var on = el("small", "");
    on.textContent = "• " + T.online;
    refs.online = on;
    nm.appendChild(on);
    teaserMsg = el("span", "acd-t-msg", { "aria-live": "polite" });
    tt.appendChild(nm);
    tt.appendChild(teaserMsg);
    tb.appendChild(tt);
    var tx = el("button", "acd-teaser-x", { type: "button", "aria-label": T.closeTeaser });
    refs.tx = tx;
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
    loading = el("div", "acd-loading", { "aria-hidden": "true" });
    loading.appendChild(avatarImg(72));
    var lt = el("span", "");
    lt.textContent = T.loading;
    refs.loading = lt;
    loading.appendChild(lt);
    grab = el("div", "acd-grab");
    handle = el("button", "acd-handle", { type: "button", "aria-label": T.minimize });
    grab.appendChild(handle);
    panel.appendChild(grab);
    panel.appendChild(closeBtn);
    panel.appendChild(loading);

    root.appendChild(teaser);
    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);

    launcher.addEventListener("click", function () { if (isOpen) close(); else open(); });
    tb.addEventListener("click", function () { open(); });
    tx.addEventListener("click", function () { hideTeaser(); dismiss(); launcher.focus(); });
    closeBtn.addEventListener("click", function () { close(); });
    /* Tutamaca dokunma (veya Enter/Boşluk) küçültür; işaretçi yakalandığı için tıklama şeritte dinlenir. */
    grab.addEventListener("click", function () {
      if (Date.now() - lastTap < 700) return; /* dokunma zaten işlendi */
      minimize();
    });
    /* Tutamaçtan aşağı kaydırınca küçült. */
    grab.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      try { grab.setPointerCapture(e.pointerId); } catch (x) { /* yok say */ }
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
    window.addEventListener("resize", place);
    if (mqMobile && mqMobile.addEventListener) mqMobile.addEventListener("change", function () { sheetSync(); place(); });
    /* iOS/Android klavyesi: görünür alan küçülünce alt sayfayı klavyenin üstüne taşı. */
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", sheetSync);
      window.visualViewport.addEventListener("scroll", sheetSync);
    }
    window.addEventListener("resize", sheetSync);
    place();
    /* Mobil hızlı iletişim çubuğu sonradan gelebilir: boyutunu izle. */
    var bar = document.querySelector(".mobile-cta-bar");
    if (bar && "ResizeObserver" in window) new ResizeObserver(place).observe(bar);
    /* Menü/drawer kapanınca CTA tekrar görünür — --acd-b'yi yeniden ölç. */
    if ("MutationObserver" in window) {
      new MutationObserver(function () { place(); }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }

  /* Alt hızlı iletişim çubuğu görünürse balonu onun üstüne taşı. */
  function place() {
    var bar = document.querySelector(".mobile-cta-bar");
    var h = 0;
    if (bar) {
      var cs = window.getComputedStyle(bar);
      if (cs.display !== "none" && cs.visibility !== "hidden" && cs.position === "fixed") h = bar.getBoundingClientRect().height;
    }
    root.style.setProperty("--acd-b", h > 0 ? Math.round(h + 12) + "px" : "calc(20px + env(safe-area-inset-bottom, 0px))");
    /* Sağ kenardaki yüzen WhatsApp/Instagram vb. düğmelerle çakışma varsa başlatıcıyı onların üstüne al. */
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

  /* Mobil alt sayfa yüksekliği: görünür alanın ~%62'si (en çok 560px); klavye açıkken klavyenin üstünde. */
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
      if (kb < 80) kb = 0; /* adres çubuğu oynamaları klavye değildir */
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
    else if (!cancel && d.grab && !d.moved) { lastTap = Date.now(); panel.style.transform = ""; minimize(); } /* tutamaca dokunma */
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

  /* Mobil: balon sayfadaki bir düğmeyi/bağlantıyı örtecekse göstermeyi ertele (rozet görünür kalır), kaydırınca yeniden dene. */
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
      if (ix > 0 && iy > 0 && (ix * iy) / (q.width * q.height) > 0.2) return false; /* büyük kartın küçük bir köşesi sorun değil */
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
    typing.appendChild(el("span"));
    typing.appendChild(el("span"));
    typing.appendChild(el("span"));
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
  /* Mobil: ~8 sn sonra yalnızca başlatıcı + rozet kalır (bu ziyarette tekrar açılmaz). */
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

  function ensureFrame() {
    if (frame) return;
    frame = el("iframe", "acd-frame", { title: T.frame, allow: "microphone; clipboard-write", referrerpolicy: "same-origin" });
    frame.addEventListener("load", function () {
      loading.classList.add("acd-done");
      try {
        /* Aynı köken: Esc ile kapat; masaüstünde yazma alanına odaklan. */
        var fd = frame.contentWindow.document;
        fd.addEventListener("keydown", onKey);
        var head = fd.querySelector(".chat-head");
        if (head) {
          head.addEventListener("touchstart", function (e) { if (e.touches.length === 1 && !(e.target.closest && e.target.closest("button"))) dragStart(e.touches[0].screenY); }, { passive: true });
          head.addEventListener("touchmove", function (e) { if (drag && e.touches.length === 1) dragMove(e.touches[0].screenY); }, { passive: true });
          head.addEventListener("touchend", function () { dragEnd(); }, { passive: true });
          head.addEventListener("touchcancel", function () { dragEnd(true); }, { passive: true });
        }
        if (isOpen && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
          var input = frame.contentWindow.document.getElementById("ar-text");
          if (input) input.focus({ preventScroll: true });
        }
      } catch (e) { /* farklı köken: yok say */ }
    });
    frame.src = LANG === "tr" ? SRC : SRC + (SRC.indexOf("?") >= 0 ? "&" : "?") + "lang=" + LANG; /* yalnızca ilk açılışta yüklenir (tembel yükleme) */
    panel.appendChild(frame);
  }

  function open() {
    if (!root) return;
    hideTeaser();
    if (isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement;
    ensureFrame();
    panel.hidden = false;
    root.classList.add("acd-open");
    launcher.setAttribute("aria-expanded", "true");
    launcher.setAttribute("aria-label", T.close);
    panel.style.transform = "";
    sheetSync();
    if (loading.classList.contains("acd-done")) {
      try {
        if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
          var input = frame.contentWindow.document.getElementById("ar-text");
          if (input) { input.focus({ preventScroll: true }); return; }
        }
      } catch (e) { /* yok say */ }
    }
    closeBtn.focus({ preventScroll: true });
  }

  /* Pencere kapanınca sohbetteki sesli dinleme/konuşma da durur (aynı köken iframe). */
  function notifyFrameClosed() {
    try { if (frame && frame.contentWindow) frame.contentWindow.dispatchEvent(new Event("arled-chat-close")); } catch (e) { /* yok say */ }
  }

  function close() {
    if (!isOpen) return;
    notifyFrameClosed();
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

  /* Next.js istemci içi sayfa geçişleri: izin verilmeyen sayfada balonu gizle (tam yükleme gerekmez). */
  function onRoute() {
    if (!root) return;
    var ok = allowedHere();
    if (ok === !root.hidden) return;
    if (!ok) {
      if (isOpen) {
        notifyFrameClosed();
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
    if (LANG !== "tr") relabel();
    geo();
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
