/*!
 * ARLEDSCREEN · Melis çok dilli katman (yalnızca sohbet).
 * Sohbet motoru Türkçe çalışmaya devam eder; bu dosya
 *  - Melis'in Türkçe cümlelerini ziyaretçinin diline çevirir (giden),
 *  - ziyaretçinin yabancı dildeki anahtar kelimelerini motorun anladığı Türkçe karşılıklara ekler (gelen),
 *  - yazılan mesajın dilini tahmin eder (ziyaretçi başka dilde yazarsa Melis o dile geçer).
 * Dil "tr" iken hiçbir şey değişmez (birebir eski davranış). Fiyatlar motorun kendisinden gelir; burada fiyat yok.
 */
(function () {
  "use strict";
  var SUP = ["tr", "en", "de", "fr", "es", "it", "ru", "uk", "bg", "ro", "el", "ar", "az", "ka"];
  var LOC = { tr: "tr-TR", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT", ru: "ru-RU", uk: "uk-UA", bg: "bg-BG", ro: "ro-RO", el: "el-GR", ar: "ar-SA", az: "az-AZ", ka: "ka-GE" };
  var NUMLOC = { ar: "en-US", az: "az-Latn-AZ", ka: "ka-GE" };
  function norm(l) {
    l = String(l || "").toLowerCase().split(/[-_]/)[0];
    return SUP.indexOf(l) >= 0 ? l : null;
  }

  /* ---------- Ürün ve yer adları ---------- */
  var ENV = {
    en: ["Indoor", "Outdoor"], de: ["Innen", "Außen"], fr: ["Intérieur", "Extérieur"], es: ["Interior", "Exterior"],
    it: ["Interno", "Esterno"], ru: ["модель для помещений", "уличная модель"], uk: ["модель для приміщень", "вулична модель"], bg: ["модел за закрито", "модел за открито"],
    ro: ["Interior", "Exterior"], el: ["μοντέλο εσωτερικού χώρου", "μοντέλο εξωτερικού χώρου"], ar: ["طراز داخلي", "طراز خارجي"], az: ["Qapalı məkan", "Açıq məkan"], ka: ["შიდა მოდელი", "გარე მოდელი"]
  };
  var ENVW = {
    en: ["indoor", "outdoor"], de: ["Innenbereich", "Außenbereich"], fr: ["intérieur", "extérieur"], es: ["interior", "exterior"],
    it: ["interno", "esterno"], ru: ["в помещении", "на улице"], uk: ["у приміщенні", "на вулиці"], bg: ["на закрито", "на открито"],
    ro: ["interior", "exterior"], el: ["εσωτερικός χώρος", "εξωτερικός χώρος"], ar: ["داخلي", "خارجي"], az: ["qapalı məkan", "açıq məkan"], ka: ["შიდა სივრცე", "გარე სივრცე"]
  };
  var SPECIAL = {
    "kiralık led ekran": { en: "Rental LED screen", de: "LED-Wand zur Miete", fr: "Écran LED en location", es: "Pantalla LED de alquiler", it: "Schermo LED a noleggio", ru: "Светодиодный экран в аренду", uk: "Світлодіодний екран в оренду", bg: "LED екран под наем", ro: "Ecran LED de închiriat", el: "Οθόνη LED προς ενοικίαση", ar: "شاشة LED للإيجار", az: "İcarəyə LED ekran", ka: "LED ეკრანი ქირით" },
    "kiralık esnek ekran": { en: "Rental flexible screen", de: "Flexible LED-Wand zur Miete", fr: "Écran flexible en location", es: "Pantalla flexible de alquiler", it: "Schermo flessibile a noleggio", ru: "Гибкий экран в аренду", uk: "Гнучкий екран в оренду", bg: "Гъвкав екран под наем", ro: "Ecran flexibil de închiriat", el: "Εύκαμπτη οθόνη προς ενοικίαση", ar: "شاشة مرنة للإيجار", az: "İcarəyə elastik ekran", ka: "მოქნილი ეკრანი ქირით" },
    "esnek led ekran": { en: "Flexible LED screen", de: "Flexible LED-Wand", fr: "Écran LED flexible", es: "Pantalla LED flexible", it: "Schermo LED flessibile", ru: "Гибкий светодиодный экран", uk: "Гнучкий світлодіодний екран", bg: "Гъвкав LED екран", ro: "Ecran LED flexibil", el: "Εύκαμπτη οθόνη LED", ar: "شاشة LED مرنة", az: "Elastik LED ekran", ka: "მოქნილი LED ეკრანი" }
  };
  function lowerTr(s) { return String(s).replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase(); }
  function prod(name, lang) {
    var s = String(name).trim();
    var m = /^(iç|İç|dış|Dış) mekân (P[\d.]+)$/.exec(s);
    if (m) return ENV[lang][/^d/i.test(m[1]) ? 1 : 0] + " " + m[2];
    var sp = SPECIAL[lowerTr(s)];
    if (sp && sp[lang]) return sp[lang];
    return s;
  }

  /* Yer adları: Türkçe gösterim → [en, de, fr, es, it, ru, uk, bg, ro, el, ar, az, ka] */
  var PL_ORDER = ["en", "de", "fr", "es", "it", "ru", "uk", "bg", "ro", "el", "ar", "az", "ka"];
  var PL = {
    "kafe": ["cafe", "Café", "café", "cafetería", "bar", "кафе", "кафе", "кафене", "cafenea", "καφετέρια", "مقهى", "kafe", "კაფე"],
    "restoran": ["restaurant", "Restaurant", "restaurant", "restaurante", "ristorante", "ресторан", "ресторан", "ресторант", "restaurant", "εστιατόριο", "مطعم", "restoran", "რესტორანი"],
    "vitrin": ["storefront", "Schaufenster", "vitrine", "escaparate", "vetrina", "витрина", "вітрина", "витрина", "vitrină", "βιτρίνα", "واجهة عرض", "vitrin", "ვიტრინა"],
    "mağaza": ["store", "Geschäft", "magasin", "tienda", "negozio", "магазин", "магазин", "магазин", "magazin", "κατάστημα", "متجر", "mağaza", "მაღაზია"],
    "dükkân": ["shop", "Laden", "boutique", "tienda", "negozio", "магазин", "магазин", "магазин", "magazin", "κατάστημα", "محل", "dükan", "მაღაზია"],
    "ofis": ["office", "Büro", "bureau", "oficina", "ufficio", "офис", "офіс", "офис", "birou", "γραφείο", "مكتب", "ofis", "ოფისი"],
    "otel": ["hotel", "Hotel", "hôtel", "hotel", "hotel", "отель", "готель", "хотел", "hotel", "ξενοδοχείο", "فندق", "otel", "სასტუმრო"],
    "otel lobisi": ["hotel lobby", "Hotellobby", "hall d'hôtel", "vestíbulo de hotel", "hall dell'hotel", "лобби отеля", "лобі готелю", "лоби на хотел", "holul hotelului", "λόμπι ξενοδοχείου", "ردهة فندق", "otel lobbisi", "სასტუმროს ლობი"],
    "lobi": ["lobby", "Lobby", "hall", "vestíbulo", "hall", "лобби", "лобі", "лоби", "hol", "λόμπι", "ردهة", "lobbi", "ლობი"],
    "AVM": ["shopping mall", "Einkaufszentrum", "centre commercial", "centro comercial", "centro commerciale", "торговый центр", "торговий центр", "търговски център", "mall", "εμπορικό κέντρο", "مركز تسوق", "ticarət mərkəzi", "სავაჭრო ცენტრი"],
    "okul": ["school", "Schule", "école", "colegio", "scuola", "школа", "школа", "училище", "școală", "σχολείο", "مدرسة", "məktəb", "სკოლა"],
    "üniversite": ["university", "Universität", "université", "universidad", "università", "университет", "університет", "университет", "universitate", "πανεπιστήμιο", "جامعة", "universitet", "უნივერსიტეტი"],
    "cami": ["mosque", "Moschee", "mosquée", "mezquita", "moschea", "мечеть", "мечеть", "джамия", "moschee", "τζαμί", "مسجد", "məscid", "მეჩეთი"],
    "fabrika": ["factory", "Fabrik", "usine", "fábrica", "fabbrica", "завод", "завод", "фабрика", "fabrică", "εργοστάσιο", "مصنع", "fabrik", "ქარხანა"],
    "depo": ["warehouse", "Lager", "entrepôt", "almacén", "magazzino", "склад", "склад", "склад", "depozit", "αποθήκη", "مستودع", "anbar", "საწყობი"],
    "sahne": ["stage", "Bühne", "scène", "escenario", "palco", "сцена", "сцена", "сцена", "scenă", "σκηνή", "مسرح", "səhnə", "სცენა"],
    "konferans": ["conference", "Konferenz", "conférence", "conferencia", "conferenza", "конференция", "конференція", "конференция", "conferință", "συνέδριο", "مؤتمر", "konfrans", "კონფერენცია"],
    "tiyatro": ["theatre", "Theater", "théâtre", "teatro", "teatro", "театр", "театр", "театър", "teatru", "θέατρο", "مسرح", "teatr", "თეატრი"],
    "salon": ["hall", "Saal", "salle", "salón", "sala", "зал", "зал", "зала", "sală", "αίθουσα", "قاعة", "zal", "დარბაზი"],
    "belediye": ["municipality", "Gemeinde", "mairie", "ayuntamiento", "comune", "муниципалитет", "міська рада", "община", "primărie", "δήμος", "بلدية", "bələdiyyə", "მერია"],
    "meydan": ["square", "Platz", "place", "plaza", "piazza", "площадь", "площа", "площад", "piață", "πλατεία", "ساحة", "meydan", "მოედანი"],
    "stadyum": ["stadium", "Stadion", "stade", "estadio", "stadio", "стадион", "стадіон", "стадион", "stadion", "γήπεδο", "ملعب", "stadion", "სტადიონი"],
    "otopark": ["car park", "Parkplatz", "parking", "aparcamiento", "parcheggio", "парковка", "парковка", "паркинг", "parcare", "πάρκινγκ", "موقف سيارات", "dayanacaq", "ავტოსადგომი"],
    "akaryakıt": ["fuel station", "Tankstelle", "station-service", "gasolinera", "distributore", "АЗС", "АЗС", "бензиностанция", "benzinărie", "πρατήριο καυσίμων", "محطة وقود", "yanacaqdoldurma məntəqəsi", "ბენზინგასამართი სადგური"],
    "tabela": ["sign", "Werbeschild", "enseigne", "letrero", "insegna", "вывеска", "вивіска", "табела", "reclamă", "πινακίδα", "لافتة", "lövhə", "აბრა"],
    "totem": ["totem sign", "Pylon", "totem", "tótem", "totem", "стела", "стела", "тотем", "totem", "πυλώνας", "لوحة عمودية", "totem", "ტოტემი"],
    "cadde": ["street", "Straße", "rue", "calle", "strada", "улица", "вулиця", "улица", "stradă", "δρόμος", "شارع", "küçə", "ქუჩა"],
    "bahçe": ["garden", "Garten", "jardin", "jardín", "giardino", "сад", "сад", "градина", "grădină", "κήπος", "حديقة", "bağ", "ბაღი"],
    "bina cephesi": ["building façade", "Gebäudefassade", "façade d'immeuble", "fachada de edificio", "facciata dell'edificio", "фасад здания", "фасад будівлі", "фасада на сграда", "fațada clădirii", "πρόσοψη κτιρίου", "واجهة مبنى", "bina fasadı", "შენობის ფასადი"],
    "cephe": ["façade", "Fassade", "façade", "fachada", "facciata", "фасад", "фасад", "фасада", "fațadă", "πρόσοψη", "واجهة", "fasad", "ფასადი"],
    "düğün": ["wedding", "Hochzeit", "mariage", "boda", "matrimonio", "свадьба", "весілля", "сватба", "nuntă", "γάμος", "حفل زفاف", "toy", "ქორწილი"],
    "fuar": ["trade fair", "Messe", "salon professionnel", "feria", "fiera", "выставка", "виставка", "изложение", "târg", "έκθεση", "معرض", "sərgi", "გამოფენა"],
    "konser": ["concert", "Konzert", "concert", "concierto", "concerto", "концерт", "концерт", "концерт", "concert", "συναυλία", "حفلة موسيقية", "konsert", "კონცერტი"],
    "festival": ["festival", "Festival", "festival", "festival", "festival", "фестиваль", "фестиваль", "фестивал", "festival", "φεστιβάλ", "مهرجان", "festival", "ფესტივალი"],
    "etkinlik": ["event", "Veranstaltung", "événement", "evento", "evento", "мероприятие", "захід", "събитие", "eveniment", "εκδήλωση", "فعالية", "tədbir", "ღონისძიება"],
    "eczane": ["pharmacy", "Apotheke", "pharmacie", "farmacia", "farmacia", "аптека", "аптека", "аптека", "farmacie", "φαρμακείο", "صيدلية", "aptek", "აფთიაქი"],
    "market": ["supermarket", "Supermarkt", "supermarché", "supermercado", "supermercato", "супермаркет", "супермаркет", "супермаркет", "supermarket", "σούπερ μάρκετ", "سوبرماركت", "market", "სუპერმარკეტი"]
  };
  var PL_ALIAS = { "camekân": "vitrin", "büro": "ofis", "alışveriş merkezi": "AVM", "stat": "stadyum", "sokak": "cadde", "nikâh": "düğün", "organizasyon": "etkinlik", "kafe/restoran": "kafe", "atölye": "fabrika", "üretim": "fabrika", "benzinlik": "akaryakıt" };
  var VIT = { en: "{x} window", de: "Schaufenster ({x})", fr: "vitrine ({x})", es: "escaparate ({x})", it: "vetrina ({x})", ru: "витрина ({x})", uk: "вітрина ({x})", bg: "витрина ({x})", ro: "vitrină ({x})", el: "βιτρίνα ({x})", ar: "واجهة عرض ({x})", az: "vitrin ({x})", ka: "ვიტრინა ({x})" };
  function place(p, lang) {
    var key = String(p || "").trim();
    var k = PL[key] ? key : (PL[lowerTr(key)] ? lowerTr(key) : (PL_ALIAS[key] || PL_ALIAS[lowerTr(key)]));
    var idx = PL_ORDER.indexOf(lang);
    if (k && PL[k] && idx >= 0) return PL[k][idx];
    var v = /^(.+) vitrini$/i.exec(key);
    if (v) return (VIT[lang] || "{x}").replace("{x}", place(v[1], lang));
    return key;
  }

  /* ---------- Melis cümleleri (Türkçe cümle kimliği → dil) ---------- */
  var S = {};
  S.en = {
    hi_melis: "Hi, I'm Melis.", ask_place: "Where are you planning to use the screen?", ask_touch: "Will people touch the screen in the window?",
    ask_dist_facade: "From how many metres will people look at the façade?", ask_dist: "Roughly how many metres away will people watch the screen?",
    ask_size: "What width and height should the screen be?", ask_unit: "Is that in metres or centimetres?", ex_size: "For example 3x2 m.",
    sorry: "Sorry, I didn't quite get that.", visit_price: "The price is confirmed after a site visit.", wa_ask: "Shall we request a quote on WhatsApp?",
    wa_ask_final: "Shall we request the final quote on WhatsApp?", change_q: "Would you like to change the size or the location?", change_ok: "You can also change the size or the location.",
    welcome: "Welcome!", vat_ship: "VAT and shipping are not included in the price.", labor_incl: "Workshop labour is included.", ship_no: "Shipping is not included in the price.",
    ship_team: "Our team will tell you the shipping cost on WhatsApp.", estimate: "This price is an estimate, not a binding offer.", final_after_visit: "The final amount is confirmed after a site visit.",
    visit_wa: "For a site visit, write to our team on WhatsApp.", d_delivery: "Our team will confirm the delivery time.", d_warranty: "Our team will share the warranty terms.",
    d_payment: "Our team will share the payment options.", d_install: "Our team will confirm the installation time.", d_discount: "Our team will share current offers.",
    panel_varies: "The panel price depends on the model.", panel_size: "One panel is 32 × 16 cm.", incl: "The price includes panels, labour, control card and software.",
    excl: "VAT and shipping excluded.", no_list: "This product has no list price.", amount_after: "The amount is confirmed after a site visit.",
    tell_size: "Tell me the size and I'll calculate the estimate here.", no_call: "I can't book a call.", wa_back: "Write to our team on WhatsApp and they'll get back to you: {1}.",
    email: "Email: {1}.", no_appt: "I can't book a call from here.", brand1: "Our modules are NXTIONSTAR branded.", brand2: "NXTIONSTAR is ARLEDSCREEN's own brand.",
    models_in: "Indoor: {1}.", models_out: "Outdoor: {1}.", models_any: "We have different models for indoor and outdoor use.",
    pitch1: "The P value is the distance between pixels.", pitch2: "The smaller it is, the sharper the image looks up close.",
    yw: "You're welcome.", yw_n: "You're welcome, {1}.", hello: "Hello, welcome!", hello_n: "Hello {1}, welcome!", nice: "Nice to meet you, {1}.",
    who1: "I'm Melis, from ARLEDSCREEN.", who2: "You can write our team on WhatsApp: {1}.", stuck: "I got stuck for a moment. Could you send that again?",
    wa_open: "Opening WhatsApp, your chat summary is ready in the message.", mic_denied: "Microphone permission was not given.", type_on: "You can keep typing.",
    voice_on: "Spoken replies are on.", no_voice: "Your browser does not support voice input.",
    rec: "My recommendation: {prod}.", rec_place: "My recommendation for your {place}: {prod}.", est_excl: "Estimated price {m}, excluding VAT and shipping.",
    price_for: "The estimated price for {prod} is {m}.", panel_price: "{prod}: {m} per panel.", bd1: "Materials {m1}, labour {m2}.", bd2: "Control card {m1}, driver and software {m2}.",
    miss: "P{p} ({env}) is not in our range.", near: "Closest models: {list}.", and: " and ",
    acks: { "Harika": "Great", "Anladım": "Got it", "Teşekkürler": "Thanks", "Tamam": "Okay" },
    items: { dist: "{n} m viewing distance", touchY: "people will touch it", touchN: "no touching", eco: "economical" }
  };
  S.de = {
    hi_melis: "Hallo, ich bin Melis.", ask_place: "Wo möchten Sie den Bildschirm einsetzen?", ask_touch: "Wird der Bildschirm im Schaufenster berührt?",
    ask_dist_facade: "Aus wie vielen Metern wird auf die Fassade geschaut?", ask_dist: "Aus etwa wie vielen Metern wird auf den Bildschirm geschaut?",
    ask_size: "Wie breit und wie hoch soll der Bildschirm sein?", ask_unit: "Sind das Meter oder Zentimeter?", ex_size: "Zum Beispiel 3x2 m.",
    sorry: "Entschuldigung, das habe ich nicht ganz verstanden.", visit_price: "Der Preis steht nach einer Besichtigung vor Ort fest.", wa_ask: "Sollen wir ein Angebot über WhatsApp anfragen?",
    wa_ask_final: "Sollen wir das verbindliche Angebot über WhatsApp anfragen?", change_q: "Möchten Sie die Größe oder den Einsatzort ändern?", change_ok: "Sie können auch die Größe oder den Einsatzort ändern.",
    welcome: "Willkommen!", vat_ship: "MwSt. und Versand sind im Preis nicht enthalten.", labor_incl: "Die Werkstattarbeit ist enthalten.", ship_no: "Der Versand ist im Preis nicht enthalten.",
    ship_team: "Die Versandkosten nennt Ihnen unser Team auf WhatsApp.", estimate: "Dieser Preis ist eine Schätzung und nicht verbindlich.", final_after_visit: "Der endgültige Betrag steht nach der Besichtigung fest.",
    visit_wa: "Für eine Besichtigung schreiben Sie unserem Team auf WhatsApp.", d_delivery: "Die Lieferzeit klärt unser Team.", d_warranty: "Die Garantiebedingungen teilt Ihnen unser Team mit.",
    d_payment: "Die Zahlungsmöglichkeiten teilt Ihnen unser Team mit.", d_install: "Die Montagedauer klärt unser Team.", d_discount: "Aktuelle Angebote teilt Ihnen unser Team mit.",
    panel_varies: "Der Panelpreis hängt vom Modell ab.", panel_size: "Ein Panel misst 32 × 16 cm.", incl: "Im Preis sind Panels, Arbeit, Steuerkarte und Software enthalten.",
    excl: "Ohne MwSt. und Versand.", no_list: "Für dieses Produkt gibt es keinen Listenpreis.", amount_after: "Der Betrag steht nach der Besichtigung fest.",
    tell_size: "Nennen Sie mir die Größe, dann berechne ich hier den geschätzten Betrag.", no_call: "Einen Anruftermin kann ich nicht vergeben.", wa_back: "Schreiben Sie unserem Team auf WhatsApp, es meldet sich bei Ihnen: {1}.",
    email: "E-Mail: {1}.", no_appt: "Anruftermine werden hier nicht vergeben.", brand1: "Unsere Module tragen die Marke NXTIONSTAR.", brand2: "NXTIONSTAR ist die eigene Marke von ARLEDSCREEN.",
    models_in: "Innenbereich: {1}.", models_out: "Außenbereich: {1}.", models_any: "Wir haben verschiedene Modelle für innen und außen.",
    pitch1: "Der P-Wert ist der Abstand zwischen den Pixeln.", pitch2: "Je kleiner er ist, desto schärfer wirkt das Bild aus der Nähe.",
    yw: "Gern geschehen.", yw_n: "Gern geschehen, {1}.", hello: "Hallo, willkommen!", hello_n: "Hallo {1}, willkommen!", nice: "Schön, Sie kennenzulernen, {1}.",
    who1: "Ich bin Melis von ARLEDSCREEN.", who2: "Sie können unserem Team auf WhatsApp schreiben: {1}.", stuck: "Da hat etwas gehakt. Können Sie das bitte noch einmal schreiben?",
    wa_open: "Ich öffne WhatsApp, Ihre Chat-Zusammenfassung steht schon in der Nachricht.", mic_denied: "Der Mikrofonzugriff wurde nicht erlaubt.", type_on: "Schreiben Sie gern einfach weiter.",
    voice_on: "Sprachausgabe ist eingeschaltet.", no_voice: "Ihr Browser unterstützt keine Spracheingabe.",
    rec: "Meine Empfehlung: {prod}.", rec_place: "Meine Empfehlung für Ihren Einsatzort ({place}): {prod}.", est_excl: "Geschätzter Preis {m}, ohne MwSt. und Versand.",
    price_for: "Der geschätzte Preis für {prod} beträgt {m}.", panel_price: "{prod}: {m} pro Panel.", bd1: "Material {m1}, Arbeit {m2}.", bd2: "Steuerkarte {m1}, Treiber und Software {m2}.",
    miss: "P{p} ({env}) haben wir nicht im Sortiment.", near: "Die nächsten Modelle: {list}.", and: " und ",
    acks: { "Harika": "Prima", "Anladım": "Verstanden", "Teşekkürler": "Danke", "Tamam": "In Ordnung" },
    items: { dist: "{n} m Betrachtungsabstand", touchY: "wird berührt", touchN: "wird nicht berührt", eco: "preisgünstig" }
  };
  S.fr = {
    hi_melis: "Bonjour, je suis Melis.", ask_place: "Où souhaitez-vous utiliser l'écran ?", ask_touch: "L'écran en vitrine sera-t-il touché ?",
    ask_dist_facade: "À combien de mètres regardera-t-on la façade ?", ask_dist: "À environ combien de mètres regardera-t-on l'écran ?",
    ask_size: "Quelle largeur et quelle hauteur pour l'écran ?", ask_unit: "C'est en mètres ou en centimètres ?", ex_size: "Par exemple 3x2 m.",
    sorry: "Désolée, je n'ai pas bien compris.", visit_price: "Le prix est confirmé après une visite sur place.", wa_ask: "On demande un devis sur WhatsApp ?",
    wa_ask_final: "On demande le devis définitif sur WhatsApp ?", change_q: "Voulez-vous changer la taille ou l'emplacement ?", change_ok: "Vous pouvez aussi changer la taille ou l'emplacement.",
    welcome: "Bienvenue !", vat_ship: "La TVA et la livraison ne sont pas incluses dans le prix.", labor_incl: "La main-d'œuvre en atelier est incluse.", ship_no: "La livraison n'est pas incluse dans le prix.",
    ship_team: "Notre équipe vous indique le coût de livraison sur WhatsApp.", estimate: "Ce prix est une estimation, il n'engage pas.", final_after_visit: "Le montant définitif est confirmé après la visite sur place.",
    visit_wa: "Pour une visite sur place, écrivez à notre équipe sur WhatsApp.", d_delivery: "Notre équipe confirme le délai de livraison.", d_warranty: "Notre équipe vous communique les conditions de garantie.",
    d_payment: "Notre équipe vous communique les modes de paiement.", d_install: "Notre équipe confirme la durée d'installation.", d_discount: "Notre équipe vous communique les offres en cours.",
    panel_varies: "Le prix du panneau dépend du modèle.", panel_size: "Un panneau mesure 32 × 16 cm.", incl: "Le prix comprend les panneaux, la main-d'œuvre, la carte de contrôle et le logiciel.",
    excl: "Hors TVA et livraison.", no_list: "Ce produit n'a pas de prix catalogue.", amount_after: "Le montant est confirmé après la visite sur place.",
    tell_size: "Indiquez-moi la taille et je calcule l'estimation ici.", no_call: "Je ne peux pas fixer d'appel.", wa_back: "Écrivez à notre équipe sur WhatsApp, elle vous recontactera : {1}.",
    email: "E-mail : {1}.", no_appt: "Les rendez-vous téléphoniques ne se prennent pas ici.", brand1: "Nos modules sont de marque NXTIONSTAR.", brand2: "NXTIONSTAR est la marque propre d'ARLEDSCREEN.",
    models_in: "Intérieur : {1}.", models_out: "Extérieur : {1}.", models_any: "Nous avons des modèles différents pour l'intérieur et l'extérieur.",
    pitch1: "La valeur P est la distance entre les pixels.", pitch2: "Plus elle est petite, plus l'image est nette de près.",
    yw: "Avec plaisir.", yw_n: "Avec plaisir, {1}.", hello: "Bonjour, bienvenue !", hello_n: "Bonjour {1}, bienvenue !", nice: "Enchantée, {1}.",
    who1: "Je suis Melis, d'ARLEDSCREEN.", who2: "Vous pouvez écrire à notre équipe sur WhatsApp : {1}.", stuck: "J'ai eu un petit souci. Pouvez-vous renvoyer votre message ?",
    wa_open: "J'ouvre WhatsApp, le résumé de notre échange est prêt dans le message.", mic_denied: "L'accès au micro n'a pas été autorisé.", type_on: "Continuons par écrit si vous voulez.",
    voice_on: "Réponses vocales activées.", no_voice: "Votre navigateur ne prend pas en charge la saisie vocale.",
    rec: "Ma recommandation : {prod}.", rec_place: "Pour votre lieu ({place}), ma recommandation : {prod}.", est_excl: "Prix estimé {m}, hors TVA et livraison.",
    price_for: "Le prix estimé pour {prod} est de {m}.", panel_price: "{prod} : {m} par panneau.", bd1: "Matériel {m1}, main-d'œuvre {m2}.", bd2: "Carte de contrôle {m1}, pilote et logiciel {m2}.",
    miss: "Le P{p} ({env}) n'est pas dans notre gamme.", near: "Modèles les plus proches : {list}.", and: " et ",
    acks: { "Harika": "Parfait", "Anladım": "Compris", "Teşekkürler": "Merci", "Tamam": "D'accord" },
    items: { dist: "{n} m de distance de vue", touchY: "sera touché", touchN: "ne sera pas touché", eco: "économique" }
  };
  S.es = {
    hi_melis: "Hola, soy Melis.", ask_place: "¿Dónde piensa usar la pantalla?", ask_touch: "¿La gente tocará la pantalla del escaparate?",
    ask_dist_facade: "¿Desde cuántos metros se verá la fachada?", ask_dist: "¿Desde unos cuántos metros se verá la pantalla?",
    ask_size: "¿Qué ancho y alto debe tener la pantalla?", ask_unit: "¿Son metros o centímetros?", ex_size: "Por ejemplo 3x2 m.",
    sorry: "Perdone, no lo he entendido bien.", visit_price: "El precio se confirma tras una visita técnica.", wa_ask: "¿Pedimos un presupuesto por WhatsApp?",
    wa_ask_final: "¿Pedimos el presupuesto definitivo por WhatsApp?", change_q: "¿Quiere cambiar la medida o el lugar?", change_ok: "También puede cambiar la medida o el lugar.",
    welcome: "¡Bienvenido!", vat_ship: "El IVA y el envío no están incluidos en el precio.", labor_incl: "La mano de obra de taller está incluida.", ship_no: "El envío no está incluido en el precio.",
    ship_team: "Nuestro equipo le dirá el coste del envío por WhatsApp.", estimate: "Este precio es una estimación, no es vinculante.", final_after_visit: "El importe definitivo se confirma tras la visita técnica.",
    visit_wa: "Para una visita técnica, escriba a nuestro equipo por WhatsApp.", d_delivery: "Nuestro equipo confirma el plazo de entrega.", d_warranty: "Nuestro equipo le indica las condiciones de garantía.",
    d_payment: "Nuestro equipo le indica las formas de pago.", d_install: "Nuestro equipo confirma el tiempo de montaje.", d_discount: "Nuestro equipo le informa de las ofertas actuales.",
    panel_varies: "El precio del panel depende del modelo.", panel_size: "Un panel mide 32 × 16 cm.", incl: "El precio incluye paneles, mano de obra, tarjeta de control y software.",
    excl: "Sin IVA ni envío.", no_list: "Este producto no tiene precio de lista.", amount_after: "El importe se confirma tras la visita técnica.",
    tell_size: "Dígame la medida y le calculo aquí el importe estimado.", no_call: "No puedo agendar llamadas.", wa_back: "Escriba a nuestro equipo por WhatsApp y le responderán: {1}.",
    email: "Correo: {1}.", no_appt: "Desde aquí no se agendan llamadas.", brand1: "Nuestros módulos son de la marca NXTIONSTAR.", brand2: "NXTIONSTAR es la marca propia de ARLEDSCREEN.",
    models_in: "Interior: {1}.", models_out: "Exterior: {1}.", models_any: "Tenemos modelos distintos para interior y exterior.",
    pitch1: "El valor P es la distancia entre píxeles.", pitch2: "Cuanto más pequeño, más nítida se ve la imagen de cerca.",
    yw: "De nada.", yw_n: "De nada, {1}.", hello: "¡Hola, bienvenido!", hello_n: "¡Hola {1}, bienvenido!", nice: "Encantada, {1}.",
    who1: "Soy Melis, de ARLEDSCREEN.", who2: "Puede escribir a nuestro equipo por WhatsApp: {1}.", stuck: "Me he trabado un momento. ¿Puede escribirlo otra vez?",
    wa_open: "Abro WhatsApp, el resumen de la conversación ya está en el mensaje.", mic_denied: "No se ha dado permiso al micrófono.", type_on: "Si quiere, seguimos por escrito.",
    voice_on: "Respuestas por voz activadas.", no_voice: "Su navegador no admite entrada por voz.",
    rec: "Mi recomendación: {prod}.", rec_place: "Para su lugar ({place}), mi recomendación: {prod}.", est_excl: "Precio estimado {m}, sin IVA ni envío.",
    price_for: "El precio estimado de {prod} es {m}.", panel_price: "{prod}: {m} por panel.", bd1: "Material {m1}, mano de obra {m2}.", bd2: "Tarjeta de control {m1}, controlador y software {m2}.",
    miss: "El P{p} ({env}) no está en nuestra gama.", near: "Modelos más cercanos: {list}.", and: " y ",
    acks: { "Harika": "Genial", "Anladım": "Entendido", "Teşekkürler": "Gracias", "Tamam": "De acuerdo" },
    items: { dist: "{n} m de distancia de visión", touchY: "se tocará", touchN: "no se tocará", eco: "económico" }
  };
  S.it = {
    hi_melis: "Ciao, sono Melis.", ask_place: "Dove pensa di usare lo schermo?", ask_touch: "Lo schermo in vetrina verrà toccato?",
    ask_dist_facade: "Da quanti metri si guarderà la facciata?", ask_dist: "Da circa quanti metri si guarderà lo schermo?",
    ask_size: "Quanto deve essere largo e alto lo schermo?", ask_unit: "Sono metri o centimetri?", ex_size: "Per esempio 3x2 m.",
    sorry: "Mi scusi, non ho capito bene.", visit_price: "Il prezzo si conferma dopo un sopralluogo.", wa_ask: "Chiediamo un preventivo su WhatsApp?",
    wa_ask_final: "Chiediamo il preventivo definitivo su WhatsApp?", change_q: "Vuole cambiare la misura o il luogo?", change_ok: "Può anche cambiare la misura o il luogo.",
    welcome: "Benvenuto!", vat_ship: "IVA e spedizione non sono incluse nel prezzo.", labor_incl: "La manodopera in laboratorio è inclusa.", ship_no: "La spedizione non è inclusa nel prezzo.",
    ship_team: "Il costo di spedizione glielo indica il nostro team su WhatsApp.", estimate: "Questo prezzo è una stima, non è vincolante.", final_after_visit: "L'importo definitivo si conferma dopo il sopralluogo.",
    visit_wa: "Per un sopralluogo scriva al nostro team su WhatsApp.", d_delivery: "I tempi di consegna li conferma il nostro team.", d_warranty: "Le condizioni di garanzia gliele comunica il nostro team.",
    d_payment: "Le modalità di pagamento gliele comunica il nostro team.", d_install: "I tempi di montaggio li conferma il nostro team.", d_discount: "Le offerte attuali gliele comunica il nostro team.",
    panel_varies: "Il prezzo del pannello dipende dal modello.", panel_size: "Un pannello misura 32 × 16 cm.", incl: "Il prezzo comprende pannelli, manodopera, scheda di controllo e software.",
    excl: "IVA e spedizione escluse.", no_list: "Questo prodotto non ha un prezzo di listino.", amount_after: "L'importo si conferma dopo il sopralluogo.",
    tell_size: "Mi dica la misura e le calcolo qui l'importo stimato.", no_call: "Non posso fissare chiamate.", wa_back: "Scriva al nostro team su WhatsApp e la ricontatteranno: {1}.",
    email: "E-mail: {1}.", no_appt: "Da qui non si fissano appuntamenti telefonici.", brand1: "I nostri moduli sono a marchio NXTIONSTAR.", brand2: "NXTIONSTAR è il marchio proprio di ARLEDSCREEN.",
    models_in: "Interno: {1}.", models_out: "Esterno: {1}.", models_any: "Abbiamo modelli diversi per interno ed esterno.",
    pitch1: "Il valore P è la distanza tra i pixel.", pitch2: "Più è piccolo, più l'immagine è nitida da vicino.",
    yw: "Prego.", yw_n: "Prego, {1}.", hello: "Ciao, benvenuto!", hello_n: "Ciao {1}, benvenuto!", nice: "Piacere, {1}.",
    who1: "Sono Melis, di ARLEDSCREEN.", who2: "Può scrivere al nostro team su WhatsApp: {1}.", stuck: "Mi sono bloccata un attimo. Può riscriverlo?",
    wa_open: "Apro WhatsApp, il riepilogo della chat è già nel messaggio.", mic_denied: "Il permesso per il microfono non è stato concesso.", type_on: "Se vuole, continuiamo per iscritto.",
    voice_on: "Risposte vocali attivate.", no_voice: "Il suo browser non supporta l'input vocale.",
    rec: "Il mio consiglio: {prod}.", rec_place: "Per il suo locale ({place}), il mio consiglio: {prod}.", est_excl: "Prezzo stimato {m}, IVA e spedizione escluse.",
    price_for: "Il prezzo stimato per {prod} è {m}.", panel_price: "{prod}: {m} a pannello.", bd1: "Materiale {m1}, manodopera {m2}.", bd2: "Scheda di controllo {m1}, driver e software {m2}.",
    miss: "Il P{p} ({env}) non è nella nostra gamma.", near: "Modelli più vicini: {list}.", and: " e ",
    acks: { "Harika": "Ottimo", "Anladım": "Capito", "Teşekkürler": "Grazie", "Tamam": "Va bene" },
    items: { dist: "{n} m di distanza di visione", touchY: "verrà toccato", touchN: "non verrà toccato", eco: "economico" }
  };
  S.ru = {
    hi_melis: "Здравствуйте, я Мелис.", ask_place: "Где вы планируете использовать экран?", ask_touch: "Будут ли касаться экрана в витрине?",
    ask_dist_facade: "С какого расстояния в метрах будут смотреть на фасад?", ask_dist: "Примерно с какого расстояния в метрах будут смотреть на экран?",
    ask_size: "Какой ширины и высоты должен быть экран?", ask_unit: "Это метры или сантиметры?", ex_size: "Например, 3x2 м.",
    sorry: "Извините, я не совсем поняла.", visit_price: "Цена уточняется после выезда на объект.", wa_ask: "Запросим предложение в WhatsApp?",
    wa_ask_final: "Запросим точное предложение в WhatsApp?", change_q: "Хотите изменить размер или место?", change_ok: "Можно также изменить размер или место.",
    welcome: "Добро пожаловать!", vat_ship: "НДС и доставка в цену не входят.", labor_incl: "Работа мастерской включена.", ship_no: "Доставка в цену не входит.",
    ship_team: "Стоимость доставки наша команда сообщит в WhatsApp.", estimate: "Это ориентировочная цена, она не является офертой.", final_after_visit: "Точная сумма определяется после выезда на объект.",
    visit_wa: "Чтобы договориться о выезде на объект, напишите нашей команде в WhatsApp.", d_delivery: "Срок доставки уточнит наша команда.", d_warranty: "Условия гарантии сообщит наша команда.",
    d_payment: "Варианты оплаты сообщит наша команда.", d_install: "Срок монтажа уточнит наша команда.", d_discount: "Об актуальных акциях расскажет наша команда.",
    panel_varies: "Цена панели зависит от модели.", panel_size: "Одна панель — 32 × 16 см.", incl: "В цену входят панели, работа, управляющая карта и ПО.",
    excl: "Без НДС и доставки.", no_list: "У этого товара нет прайсовой цены.", amount_after: "Сумма уточняется после выезда на объект.",
    tell_size: "Напишите размер, и я рассчитаю здесь ориентировочную сумму.", no_call: "Я не могу назначить звонок.", wa_back: "Напишите нашей команде в WhatsApp, и с вами свяжутся: {1}.",
    email: "Эл. почта: {1}.", no_appt: "Здесь звонки не назначаются.", brand1: "Наши модули выпускаются под маркой NXTIONSTAR.", brand2: "NXTIONSTAR — собственная марка ARLEDSCREEN.",
    models_in: "Для помещений: {1}.", models_out: "Уличные: {1}.", models_any: "У нас есть разные модели для помещений и для улицы.",
    pitch1: "Значение P — это расстояние между пикселями.", pitch2: "Чем оно меньше, тем чётче изображение вблизи.",
    yw: "Пожалуйста.", yw_n: "Пожалуйста, {1}.", hello: "Здравствуйте, добро пожаловать!", hello_n: "Здравствуйте, {1}, добро пожаловать!", nice: "Приятно познакомиться, {1}.",
    who1: "Я Мелис из ARLEDSCREEN.", who2: "Вы можете написать нашей команде в WhatsApp: {1}.", stuck: "Что-то пошло не так. Напишите, пожалуйста, ещё раз.",
    wa_open: "Открываю WhatsApp, краткое содержание чата уже в сообщении.", mic_denied: "Доступ к микрофону не разрешён.", type_on: "Можем продолжить в переписке.",
    voice_on: "Голосовые ответы включены.", no_voice: "Ваш браузер не поддерживает голосовой ввод.",
    rec: "Моя рекомендация: {prod}.", rec_place: "Моя рекомендация для вашего объекта ({place}): {prod}.", est_excl: "Ориентировочная цена {m}, без НДС и доставки.",
    price_for: "Ориентировочная цена ({prod}): {m}.", panel_price: "{prod}: {m} за панель.", bd1: "Материалы {m1}, работа {m2}.", bd2: "Управляющая карта {m1}, драйвер и ПО {m2}.",
    miss: "P{p} ({env}) нет в нашем ассортименте.", near: "Ближайшие модели: {list}.", and: " и ",
    acks: { "Harika": "Отлично", "Anladım": "Поняла", "Teşekkürler": "Спасибо", "Tamam": "Хорошо" },
    items: { dist: "расстояние просмотра {n} м", touchY: "будут касаться", touchN: "касаться не будут", eco: "экономичный вариант" }
  };
  S.uk = {
    hi_melis: "Вітаю, я Меліс.", ask_place: "Де ви плануєте використовувати екран?", ask_touch: "Чи будуть торкатися екрана у вітрині?",
    ask_dist_facade: "З якої відстані в метрах дивитимуться на фасад?", ask_dist: "Приблизно з якої відстані в метрах дивитимуться на екран?",
    ask_size: "Якої ширини та висоти має бути екран?", ask_unit: "Це метри чи сантиметри?", ex_size: "Наприклад, 3x2 м.",
    sorry: "Вибачте, я не зовсім зрозуміла.", visit_price: "Ціна уточнюється після виїзду на об'єкт.", wa_ask: "Запитаємо пропозицію у WhatsApp?",
    wa_ask_final: "Запитаємо точну пропозицію у WhatsApp?", change_q: "Бажаєте змінити розмір або місце?", change_ok: "Можна також змінити розмір або місце.",
    welcome: "Ласкаво просимо!", vat_ship: "ПДВ і доставка до ціни не входять.", labor_incl: "Роботу майстерні включено.", ship_no: "Доставка до ціни не входить.",
    ship_team: "Вартість доставки наша команда повідомить у WhatsApp.", estimate: "Це орієнтовна ціна, вона не є офертою.", final_after_visit: "Точна сума визначається після виїзду на об'єкт.",
    visit_wa: "Щоб домовитися про виїзд на об'єкт, напишіть нашій команді у WhatsApp.", d_delivery: "Термін доставки уточнить наша команда.", d_warranty: "Умови гарантії повідомить наша команда.",
    d_payment: "Варіанти оплати повідомить наша команда.", d_install: "Термін монтажу уточнить наша команда.", d_discount: "Про актуальні акції розповість наша команда.",
    panel_varies: "Ціна панелі залежить від моделі.", panel_size: "Одна панель — 32 × 16 см.", incl: "У ціну входять панелі, робота, керуюча карта та ПЗ.",
    excl: "Без ПДВ і доставки.", no_list: "Для цього товару немає прайсової ціни.", amount_after: "Сума уточнюється після виїзду на об'єкт.",
    tell_size: "Напишіть розмір, і я розрахую тут орієнтовну суму.", no_call: "Я не можу призначити дзвінок.", wa_back: "Напишіть нашій команді у WhatsApp, і з вами зв'яжуться: {1}.",
    email: "Ел. пошта: {1}.", no_appt: "Тут дзвінки не призначаються.", brand1: "Наші модулі випускаються під маркою NXTIONSTAR.", brand2: "NXTIONSTAR — власна марка ARLEDSCREEN.",
    models_in: "Для приміщень: {1}.", models_out: "Вуличні: {1}.", models_any: "У нас є різні моделі для приміщень і для вулиці.",
    pitch1: "Значення P — це відстань між пікселями.", pitch2: "Що воно менше, то чіткіше зображення зблизька.",
    yw: "Будь ласка.", yw_n: "Будь ласка, {1}.", hello: "Вітаю, ласкаво просимо!", hello_n: "Вітаю, {1}, ласкаво просимо!", nice: "Приємно познайомитися, {1}.",
    who1: "Я Меліс з ARLEDSCREEN.", who2: "Ви можете написати нашій команді у WhatsApp: {1}.", stuck: "Щось пішло не так. Напишіть, будь ласка, ще раз.",
    wa_open: "Відкриваю WhatsApp, короткий зміст чату вже в повідомленні.", mic_denied: "Доступ до мікрофона не дозволено.", type_on: "Можемо продовжити листуванням.",
    voice_on: "Голосові відповіді увімкнено.", no_voice: "Ваш браузер не підтримує голосове введення.",
    rec: "Моя рекомендація: {prod}.", rec_place: "Моя рекомендація для вашого об'єкта ({place}): {prod}.", est_excl: "Орієнтовна ціна {m}, без ПДВ і доставки.",
    price_for: "Орієнтовна ціна ({prod}): {m}.", panel_price: "{prod}: {m} за панель.", bd1: "Матеріали {m1}, робота {m2}.", bd2: "Керуюча карта {m1}, драйвер і ПЗ {m2}.",
    miss: "P{p} ({env}) немає в нашому асортименті.", near: "Найближчі моделі: {list}.", and: " і ",
    acks: { "Harika": "Чудово", "Anladım": "Зрозуміла", "Teşekkürler": "Дякую", "Tamam": "Добре" },
    items: { dist: "відстань перегляду {n} м", touchY: "торкатимуться", touchN: "торкатися не будуть", eco: "економний варіант" }
  };
  S.bg = {
    hi_melis: "Здравейте, аз съм Мелис.", ask_place: "Къде смятате да използвате екрана?", ask_touch: "Ще докосват ли екрана във витрината?",
    ask_dist_facade: "От колко метра ще се гледа фасадата?", ask_dist: "От приблизително колко метра ще се гледа екранът?",
    ask_size: "Каква ширина и височина да бъде екранът?", ask_unit: "Това в метри ли е, или в сантиметри?", ex_size: "Например 3x2 м.",
    sorry: "Извинете, не разбрах съвсем.", visit_price: "Цената се уточнява след оглед на място.", wa_ask: "Да поискаме ли оферта в WhatsApp?",
    wa_ask_final: "Да поискаме ли окончателна оферта в WhatsApp?", change_q: "Искате ли да промените размера или мястото?", change_ok: "Можете да промените и размера или мястото.",
    welcome: "Добре дошли!", vat_ship: "ДДС и доставката не са включени в цената.", labor_incl: "Работата в работилницата е включена.", ship_no: "Доставката не е включена в цената.",
    ship_team: "Цената на доставката ще ви каже нашият екип в WhatsApp.", estimate: "Тази цена е ориентировъчна и не е обвързваща.", final_after_visit: "Окончателната сума се уточнява след огледа на място.",
    visit_wa: "За оглед на място пишете на нашия екип в WhatsApp.", d_delivery: "Срока за доставка ще уточни нашият екип.", d_warranty: "Гаранционните условия ще ви съобщи нашият екип.",
    d_payment: "Начините на плащане ще ви съобщи нашият екип.", d_install: "Срока за монтаж ще уточни нашият екип.", d_discount: "За текущите промоции ще ви каже нашият екип.",
    panel_varies: "Цената на панела зависи от модела.", panel_size: "Един панел е 32 × 16 см.", incl: "В цената са включени панели, труд, контролна карта и софтуер.",
    excl: "Без ДДС и доставка.", no_list: "Този продукт няма каталожна цена.", amount_after: "Сумата се уточнява след огледа на място.",
    tell_size: "Напишете размера и ще изчисля ориентировъчната сума тук.", no_call: "Не мога да насроча обаждане.", wa_back: "Пишете на нашия екип в WhatsApp и ще се свържат с вас: {1}.",
    email: "Имейл: {1}.", no_appt: "Оттук не се насрочват обаждания.", brand1: "Нашите модули са с марка NXTIONSTAR.", brand2: "NXTIONSTAR е собствената марка на ARLEDSCREEN.",
    models_in: "За закрито: {1}.", models_out: "За открито: {1}.", models_any: "Имаме различни модели за закрито и за открито.",
    pitch1: "Стойността P е разстоянието между пикселите.", pitch2: "Колкото е по-малка, толкова по-ясен е образът отблизо.",
    yw: "Моля.", yw_n: "Моля, {1}.", hello: "Здравейте, добре дошли!", hello_n: "Здравейте, {1}, добре дошли!", nice: "Приятно ми е, {1}.",
    who1: "Аз съм Мелис от ARLEDSCREEN.", who2: "Можете да пишете на нашия екип в WhatsApp: {1}.", stuck: "Нещо се обърка. Може ли да го напишете отново?",
    wa_open: "Отварям WhatsApp, резюмето на разговора вече е в съобщението.", mic_denied: "Достъпът до микрофона не е разрешен.", type_on: "Можем да продължим писмено.",
    voice_on: "Гласовите отговори са включени.", no_voice: "Браузърът ви не поддържа гласово въвеждане.",
    rec: "Моята препоръка: {prod}.", rec_place: "Моята препоръка за вашия обект ({place}): {prod}.", est_excl: "Ориентировъчна цена {m}, без ДДС и доставка.",
    price_for: "Ориентировъчната цена за {prod} е {m}.", panel_price: "{prod}: {m} на панел.", bd1: "Материали {m1}, труд {m2}.", bd2: "Контролна карта {m1}, драйвер и софтуер {m2}.",
    miss: "P{p} ({env}) не е в нашата гама.", near: "Най-близки модели: {list}.", and: " и ",
    acks: { "Harika": "Чудесно", "Anladım": "Разбрах", "Teşekkürler": "Благодаря", "Tamam": "Добре" },
    items: { dist: "разстояние за гледане {n} м", touchY: "ще се докосва", touchN: "няма да се докосва", eco: "икономичен вариант" }
  };
  S.ro = {
    hi_melis: "Bună, sunt Melis.", ask_place: "Unde intenționați să folosiți ecranul?", ask_touch: "Ecranul din vitrină va fi atins?",
    ask_dist_facade: "De la câți metri se va privi fațada?", ask_dist: "De la aproximativ câți metri se va privi ecranul?",
    ask_size: "Ce lățime și înălțime să aibă ecranul?", ask_unit: "Sunt metri sau centimetri?", ex_size: "De exemplu 3x2 m.",
    sorry: "Scuze, nu am înțeles prea bine.", visit_price: "Prețul se stabilește după o vizită la fața locului.", wa_ask: "Cerem o ofertă pe WhatsApp?",
    wa_ask_final: "Cerem oferta finală pe WhatsApp?", change_q: "Doriți să schimbați dimensiunea sau locul?", change_ok: "Puteți schimba și dimensiunea sau locul.",
    welcome: "Bine ați venit!", vat_ship: "TVA-ul și transportul nu sunt incluse în preț.", labor_incl: "Manopera din atelier este inclusă.", ship_no: "Transportul nu este inclus în preț.",
    ship_team: "Costul transportului vi-l spune echipa noastră pe WhatsApp.", estimate: "Acest preț este estimativ, nu este o ofertă fermă.", final_after_visit: "Suma finală se stabilește după vizita la fața locului.",
    visit_wa: "Pentru o vizită la fața locului, scrieți echipei noastre pe WhatsApp.", d_delivery: "Termenul de livrare îl confirmă echipa noastră.", d_warranty: "Condițiile de garanție vi le comunică echipa noastră.",
    d_payment: "Modalitățile de plată vi le comunică echipa noastră.", d_install: "Durata montajului o confirmă echipa noastră.", d_discount: "Ofertele curente vi le comunică echipa noastră.",
    panel_varies: "Prețul panoului depinde de model.", panel_size: "Un panou are 32 × 16 cm.", incl: "Prețul include panourile, manopera, placa de control și software-ul.",
    excl: "Fără TVA și transport.", no_list: "Acest produs nu are preț de listă.", amount_after: "Suma se stabilește după vizita la fața locului.",
    tell_size: "Scrieți-mi dimensiunea și calculez aici suma estimativă.", no_call: "Nu pot programa un apel.", wa_back: "Scrieți echipei noastre pe WhatsApp și vă vor contacta: {1}.",
    email: "E-mail: {1}.", no_appt: "De aici nu se programează apeluri.", brand1: "Modulele noastre poartă marca NXTIONSTAR.", brand2: "NXTIONSTAR este marca proprie ARLEDSCREEN.",
    models_in: "Interior: {1}.", models_out: "Exterior: {1}.", models_any: "Avem modele diferite pentru interior și exterior.",
    pitch1: "Valoarea P este distanța dintre pixeli.", pitch2: "Cu cât e mai mică, cu atât imaginea e mai clară de aproape.",
    yw: "Cu plăcere.", yw_n: "Cu plăcere, {1}.", hello: "Bună, bine ați venit!", hello_n: "Bună, {1}, bine ați venit!", nice: "Încântată, {1}.",
    who1: "Sunt Melis, de la ARLEDSCREEN.", who2: "Puteți scrie echipei noastre pe WhatsApp: {1}.", stuck: "M-am blocat o clipă. Puteți scrie din nou?",
    wa_open: "Deschid WhatsApp, rezumatul conversației este deja în mesaj.", mic_denied: "Accesul la microfon nu a fost permis.", type_on: "Dacă doriți, continuăm în scris.",
    voice_on: "Răspunsurile vocale sunt pornite.", no_voice: "Browserul dvs. nu acceptă introducerea vocală.",
    rec: "Recomandarea mea: {prod}.", rec_place: "Pentru locația dvs. ({place}), recomandarea mea: {prod}.", est_excl: "Preț estimativ {m}, fără TVA și transport.",
    price_for: "Prețul estimativ pentru {prod} este {m}.", panel_price: "{prod}: {m} pe panou.", bd1: "Materiale {m1}, manoperă {m2}.", bd2: "Placă de control {m1}, driver și software {m2}.",
    miss: "P{p} ({env}) nu este în gama noastră.", near: "Cele mai apropiate modele: {list}.", and: " și ",
    acks: { "Harika": "Perfect", "Anladım": "Am înțeles", "Teşekkürler": "Mulțumesc", "Tamam": "Bine" },
    items: { dist: "distanță de vizionare {n} m", touchY: "va fi atins", touchN: "nu va fi atins", eco: "economic" }
  };
  S.el = {
    hi_melis: "Γεια σας, είμαι η Μελίς.", ask_place: "Πού σκοπεύετε να χρησιμοποιήσετε την οθόνη;", ask_touch: "Θα αγγίζουν την οθόνη στη βιτρίνα;",
    ask_dist_facade: "Από πόσα μέτρα θα βλέπουν την πρόσοψη;", ask_dist: "Από περίπου πόσα μέτρα θα βλέπουν την οθόνη;",
    ask_size: "Τι πλάτος και ύψος να έχει η οθόνη;", ask_unit: "Είναι μέτρα ή εκατοστά;", ex_size: "Για παράδειγμα 3x2 m.",
    sorry: "Συγγνώμη, δεν κατάλαβα καλά.", visit_price: "Η τιμή οριστικοποιείται μετά από αυτοψία.", wa_ask: "Να ζητήσουμε προσφορά στο WhatsApp;",
    wa_ask_final: "Να ζητήσουμε την τελική προσφορά στο WhatsApp;", change_q: "Θέλετε να αλλάξετε το μέγεθος ή τον χώρο;", change_ok: "Μπορείτε επίσης να αλλάξετε το μέγεθος ή τον χώρο.",
    welcome: "Καλώς ορίσατε!", vat_ship: "Ο ΦΠΑ και η μεταφορά δεν περιλαμβάνονται στην τιμή.", labor_incl: "Η εργασία στο εργαστήριο περιλαμβάνεται.", ship_no: "Η μεταφορά δεν περιλαμβάνεται στην τιμή.",
    ship_team: "Το κόστος μεταφοράς θα σας το πει η ομάδα μας στο WhatsApp.", estimate: "Αυτή η τιμή είναι εκτίμηση και δεν είναι δεσμευτική.", final_after_visit: "Το τελικό ποσό οριστικοποιείται μετά την αυτοψία.",
    visit_wa: "Για αυτοψία, γράψτε στην ομάδα μας στο WhatsApp.", d_delivery: "Τον χρόνο παράδοσης τον επιβεβαιώνει η ομάδα μας.", d_warranty: "Τους όρους εγγύησης θα σας τους πει η ομάδα μας.",
    d_payment: "Τους τρόπους πληρωμής θα σας τους πει η ομάδα μας.", d_install: "Τον χρόνο εγκατάστασης τον επιβεβαιώνει η ομάδα μας.", d_discount: "Τις τρέχουσες προσφορές θα σας τις πει η ομάδα μας.",
    panel_varies: "Η τιμή του πάνελ εξαρτάται από το μοντέλο.", panel_size: "Ένα πάνελ είναι 32 × 16 cm.", incl: "Η τιμή περιλαμβάνει πάνελ, εργασία, κάρτα ελέγχου και λογισμικό.",
    excl: "Χωρίς ΦΠΑ και μεταφορά.", no_list: "Αυτό το προϊόν δεν έχει τιμή καταλόγου.", amount_after: "Το ποσό οριστικοποιείται μετά την αυτοψία.",
    tell_size: "Γράψτε μου το μέγεθος και θα υπολογίσω εδώ το εκτιμώμενο ποσό.", no_call: "Δεν μπορώ να κλείσω κλήση.", wa_back: "Γράψτε στην ομάδα μας στο WhatsApp και θα επικοινωνήσουν μαζί σας: {1}.",
    email: "Email: {1}.", no_appt: "Από εδώ δεν κλείνονται τηλεφωνικά ραντεβού.", brand1: "Τα modules μας φέρουν το σήμα NXTIONSTAR.", brand2: "Η NXTIONSTAR είναι η δική μάρκα της ARLEDSCREEN.",
    models_in: "Εσωτερικού χώρου: {1}.", models_out: "Εξωτερικού χώρου: {1}.", models_any: "Έχουμε διαφορετικά μοντέλα για εσωτερικό και εξωτερικό χώρο.",
    pitch1: "Η τιμή P είναι η απόσταση μεταξύ των pixel.", pitch2: "Όσο μικρότερη είναι, τόσο πιο καθαρή φαίνεται η εικόνα από κοντά.",
    yw: "Παρακαλώ.", yw_n: "Παρακαλώ, {1}.", hello: "Γεια σας, καλώς ορίσατε!", hello_n: "Γεια σας {1}, καλώς ορίσατε!", nice: "Χάρηκα, {1}.",
    who1: "Είμαι η Μελίς από την ARLEDSCREEN.", who2: "Μπορείτε να γράψετε στην ομάδα μας στο WhatsApp: {1}.", stuck: "Κόλλησα για λίγο. Μπορείτε να το ξαναγράψετε;",
    wa_open: "Ανοίγω το WhatsApp, η περίληψη της συνομιλίας είναι ήδη στο μήνυμα.", mic_denied: "Δεν δόθηκε άδεια για το μικρόφωνο.", type_on: "Αν θέλετε, συνεχίζουμε γραπτά.",
    voice_on: "Οι φωνητικές απαντήσεις ενεργοποιήθηκαν.", no_voice: "Το πρόγραμμα περιήγησής σας δεν υποστηρίζει φωνητική εισαγωγή.",
    rec: "Η πρότασή μου: {prod}.", rec_place: "Για τον χώρο σας ({place}), η πρότασή μου: {prod}.", est_excl: "Εκτιμώμενη τιμή {m}, χωρίς ΦΠΑ και μεταφορά.",
    price_for: "Η εκτιμώμενη τιμή για {prod} είναι {m}.", panel_price: "{prod}: {m} ανά πάνελ.", bd1: "Υλικά {m1}, εργασία {m2}.", bd2: "Κάρτα ελέγχου {m1}, οδηγός και λογισμικό {m2}.",
    miss: "Το P{p} ({env}) δεν υπάρχει στη γκάμα μας.", near: "Πλησιέστερα μοντέλα: {list}.", and: " και ",
    acks: { "Harika": "Τέλεια", "Anladım": "Κατάλαβα", "Teşekkürler": "Ευχαριστώ", "Tamam": "Εντάξει" },
    items: { dist: "απόσταση θέασης {n} m", touchY: "θα την αγγίζουν", touchN: "δεν θα την αγγίζουν", eco: "οικονομική λύση" }
  };
  S.ar = {
    hi_melis: "مرحبًا، أنا مليس.", ask_place: "أين تخطط لاستخدام الشاشة؟", ask_touch: "هل سيلمس الناس الشاشة في الواجهة؟",
    ask_dist_facade: "من كم مترًا سيُنظر إلى الواجهة؟", ask_dist: "من حوالي كم مترًا سيُنظر إلى الشاشة؟",
    ask_size: "ما العرض والارتفاع المطلوبان للشاشة؟", ask_unit: "هل القياس بالمتر أم بالسنتيمتر؟", ex_size: "مثلًا 3x2 m.",
    sorry: "عذرًا، لم أفهم جيدًا.", visit_price: "يتحدد السعر بعد المعاينة في الموقع.", wa_ask: "هل نطلب عرض سعر عبر واتساب؟",
    wa_ask_final: "هل نطلب عرض السعر النهائي عبر واتساب؟", change_q: "هل تريد تغيير المقاس أو المكان؟", change_ok: "يمكنك أيضًا تغيير المقاس أو المكان.",
    welcome: "أهلًا وسهلًا!", vat_ship: "ضريبة القيمة المضافة والشحن غير مشمولين في السعر.", labor_incl: "أعمال الورشة مشمولة.", ship_no: "الشحن غير مشمول في السعر.",
    ship_team: "سيخبرك فريقنا بتكلفة الشحن عبر واتساب.", estimate: "هذا السعر تقديري وغير ملزم.", final_after_visit: "يتحدد المبلغ النهائي بعد المعاينة في الموقع.",
    visit_wa: "لطلب معاينة في الموقع، راسل فريقنا عبر واتساب.", d_delivery: "يحدد فريقنا مدة التسليم.", d_warranty: "يشاركك فريقنا شروط الضمان.",
    d_payment: "يشاركك فريقنا طرق الدفع.", d_install: "يحدد فريقنا مدة التركيب.", d_discount: "يشاركك فريقنا العروض الحالية.",
    panel_varies: "سعر اللوح يختلف حسب الطراز.", panel_size: "مقاس اللوح الواحد 32 × 16 cm.", incl: "يشمل السعر الألواح والعمل وبطاقة التحكم والبرنامج.",
    excl: "غير شامل الضريبة والشحن.", no_list: "لا يوجد سعر قائمة لهذا المنتج.", amount_after: "يتحدد المبلغ بعد المعاينة في الموقع.",
    tell_size: "اكتب لي المقاس وسأحسب لك المبلغ التقديري هنا.", no_call: "لا أستطيع تحديد موعد مكالمة.", wa_back: "راسل فريقنا عبر واتساب وسيتواصلون معك: {1}.",
    email: "البريد الإلكتروني: {1}.", no_appt: "لا يتم تحديد مواعيد المكالمات من هنا.", brand1: "وحداتنا تحمل علامة NXTIONSTAR.", brand2: "NXTIONSTAR هي العلامة الخاصة بـ ARLEDSCREEN.",
    models_in: "داخلي: {1}.", models_out: "خارجي: {1}.", models_any: "لدينا طرازات مختلفة للأماكن الداخلية والخارجية.",
    pitch1: "قيمة P هي المسافة بين البكسلات.", pitch2: "كلما صغرت، بدت الصورة أوضح من قريب.",
    yw: "على الرحب والسعة.", yw_n: "على الرحب والسعة، {1}.", hello: "مرحبًا، أهلًا وسهلًا!", hello_n: "مرحبًا {1}، أهلًا وسهلًا!", nice: "تشرفت بمعرفتك، {1}.",
    who1: "أنا مليس من ARLEDSCREEN.", who2: "يمكنك مراسلة فريقنا عبر واتساب: {1}.", stuck: "حدث خلل بسيط. هل يمكنك كتابة رسالتك مرة أخرى؟",
    wa_open: "أفتح واتساب الآن، ملخص المحادثة جاهز في الرسالة.", mic_denied: "لم يتم منح إذن الميكروفون.", type_on: "يمكننا المتابعة بالكتابة.",
    voice_on: "تم تشغيل الردود الصوتية.", no_voice: "متصفحك لا يدعم الإدخال الصوتي.",
    rec: "توصيتي: {prod}.", rec_place: "توصيتي لمكانك ({place}): {prod}.", est_excl: "السعر التقديري {m}، غير شامل الضريبة والشحن.",
    price_for: "السعر التقديري ({prod}): {m}.", panel_price: "{prod}: {m} للوح الواحد.", bd1: "المواد {m1}، العمل {m2}.", bd2: "بطاقة التحكم {m1}، المشغل والبرنامج {m2}.",
    miss: "الطراز P{p} ({env}) غير متوفر لدينا.", near: "أقرب الطرازات: {list}.", and: " و",
    acks: { "Harika": "رائع", "Anladım": "فهمت", "Teşekkürler": "شكرًا", "Tamam": "حسنًا" },
    items: { dist: "مسافة مشاهدة {n} m", touchY: "سيتم لمسها", touchN: "لن يتم لمسها", eco: "خيار اقتصادي" }
  };
  S.az = {
    hi_melis: "Salam, mən Melisəm.", ask_place: "Ekranı harada istifadə etmək istəyirsiniz?", ask_touch: "Vitrindəki ekrana əl dəyəcək?",
    ask_dist_facade: "Fasada neçə metrdən baxılacaq?", ask_dist: "Ekrana təxminən neçə metrdən baxılacaq?",
    ask_size: "Ekranın eni və hündürlüyü nə qədər olsun?", ask_unit: "Ölçü metrdir, yoxsa santimetr?", ex_size: "Məsələn, 3x2 m.",
    sorry: "Bağışlayın, yaxşı başa düşmədim.", visit_price: "Qiymət yerində baxışdan sonra dəqiqləşir.", wa_ask: "WhatsApp-dan təklif istəyək?",
    wa_ask_final: "Dəqiq təklifi WhatsApp-dan istəyək?", change_q: "Ölçünü və ya yeri dəyişmək istəyirsiniz?", change_ok: "Ölçünü və ya yeri də dəyişə bilərsiniz.",
    welcome: "Xoş gəlmisiniz!", vat_ship: "ƏDV və daşınma qiymətə daxil deyil.", labor_incl: "Emalatxana işi daxildir.", ship_no: "Daşınma qiymətə daxil deyil.",
    ship_team: "Daşınma xərcini komandamız WhatsApp-da deyəcək.", estimate: "Bu qiymət təxminidir, öhdəlik yaratmır.", final_after_visit: "Dəqiq məbləğ yerində baxışdan sonra bəlli olur.",
    visit_wa: "Yerində baxış üçün komandamıza WhatsApp-dan yaza bilərsiniz.", d_delivery: "Çatdırılma müddətini komandamız dəqiqləşdirir.", d_warranty: "Zəmanət şərtlərini komandamız bildirir.",
    d_payment: "Ödəniş variantlarını komandamız bildirir.", d_install: "Quraşdırma müddətini komandamız dəqiqləşdirir.", d_discount: "Aktual kampaniyaları komandamız bildirir.",
    panel_varies: "Panelin qiyməti modeldən asılıdır.", panel_size: "Bir panel 32 × 16 sm-dir.", incl: "Qiymətə panel, iş, idarəetmə kartı və proqram təminatı daxildir.",
    excl: "ƏDV və daşınma xaricdir.", no_list: "Bu məhsulun siyahı qiyməti yoxdur.", amount_after: "Məbləğ yerində baxışdan sonra dəqiqləşir.",
    tell_size: "Ölçünü yazın, təxmini məbləği burada hesablayıb deyim.", no_call: "Zəng vaxtı təyin edə bilmirəm.", wa_back: "Komandamıza WhatsApp-dan yazsanız, sizinlə əlaqə saxlanılacaq: {1}.",
    email: "E-poçt: {1}.", no_appt: "Buradan zəng görüşü təyin edilmir.", brand1: "Modullarımız NXTIONSTAR markalıdır.", brand2: "NXTIONSTAR ARLEDSCREEN-in öz markasıdır.",
    models_in: "Qapalı məkan: {1}.", models_out: "Açıq məkan: {1}.", models_any: "Qapalı və açıq məkan üçün fərqli modellərimiz var.",
    pitch1: "P dəyəri piksellər arasındakı məsafədir.", pitch2: "Nə qədər kiçik olsa, yaxından bir o qədər aydın görünür.",
    yw: "Buyurun.", yw_n: "Buyurun, {1}.", hello: "Salam, xoş gəlmisiniz!", hello_n: "Salam {1}, xoş gəlmisiniz!", nice: "Tanış olmağıma şadam, {1}.",
    who1: "Mən Melis, ARLEDSCREEN-dən.", who2: "Komandamıza WhatsApp-dan yaza bilərsiniz: {1}.", stuck: "Bir anlıq ilişdim, yenidən yazarsınız?",
    wa_open: "WhatsApp-ı açıram, söhbətin xülasəsi mesajda hazırdır.", mic_denied: "Mikrofona icazə verilmədi.", type_on: "İstəsəniz yazaraq davam edək.",
    voice_on: "Səsli cavab açıldı.", no_voice: "Brauzeriniz səsli daxiletməni dəstəkləmir.",
    rec: "Tövsiyəm: {prod}.", rec_place: "{place} üçün tövsiyəm: {prod}.", est_excl: "Təxmini qiymət {m}, ƏDV və daşınma xaric.",
    price_for: "{prod} üçün təxmini qiymət {m}.", panel_price: "{prod}: panel başına {m}.", bd1: "Material {m1}, iş {m2}.", bd2: "İdarəetmə kartı {m1}, drayver və proqram {m2}.",
    miss: "P{p} ({env}) siyahımızda yoxdur.", near: "Ən yaxın modellər: {list}.", and: " və ",
    acks: { "Harika": "Əla", "Anladım": "Başa düşdüm", "Teşekkürler": "Təşəkkürlər", "Tamam": "Oldu" },
    items: { dist: "{n} m baxış məsafəsi", touchY: "əl dəyəcək", touchN: "əl dəyməyəcək", eco: "qənaətcil" }
  };
  S.ka = {
    hi_melis: "გამარჯობა, მე მელისი ვარ.", ask_place: "სად აპირებთ ეკრანის გამოყენებას?", ask_touch: "ვიტრინაში ეკრანს ხელს შეახებენ?",
    ask_dist_facade: "რამდენი მეტრიდან უყურებენ ფასადს?", ask_dist: "დაახლოებით რამდენი მეტრიდან უყურებენ ეკრანს?",
    ask_size: "რა სიგანისა და სიმაღლის უნდა იყოს ეკრანი?", ask_unit: "ეს მეტრებშია თუ სანტიმეტრებში?", ex_size: "მაგალითად, 3x2 m.",
    sorry: "ბოდიში, კარგად ვერ გავიგე.", visit_price: "ფასი ადგილზე დათვალიერების შემდეგ დაზუსტდება.", wa_ask: "მოვითხოვოთ შეთავაზება WhatsApp-ით?",
    wa_ask_final: "მოვითხოვოთ საბოლოო შეთავაზება WhatsApp-ით?", change_q: "გსურთ ზომის ან ადგილის შეცვლა?", change_ok: "შეგიძლიათ ზომის ან ადგილის შეცვლაც.",
    welcome: "კეთილი იყოს თქვენი მობრძანება!", vat_ship: "დღგ და მიწოდება ფასში არ შედის.", labor_incl: "სახელოსნოს სამუშაო შედის.", ship_no: "მიწოდება ფასში არ შედის.",
    ship_team: "მიწოდების ღირებულებას ჩვენი გუნდი WhatsApp-ით გეტყვით.", estimate: "ეს ფასი სავარაუდოა და არ არის სავალდებულო.", final_after_visit: "საბოლოო თანხა ადგილზე დათვალიერების შემდეგ დაზუსტდება.",
    visit_wa: "ადგილზე დათვალიერებისთვის მისწერეთ ჩვენს გუნდს WhatsApp-ით.", d_delivery: "მიწოდების ვადას ჩვენი გუნდი დააზუსტებს.", d_warranty: "გარანტიის პირობებს ჩვენი გუნდი გაგიზიარებთ.",
    d_payment: "გადახდის ვარიანტებს ჩვენი გუნდი გაგიზიარებთ.", d_install: "მონტაჟის ვადას ჩვენი გუნდი დააზუსტებს.", d_discount: "მიმდინარე აქციებს ჩვენი გუნდი გაგიზიარებთ.",
    panel_varies: "პანელის ფასი მოდელზეა დამოკიდებული.", panel_size: "ერთი პანელი 32 × 16 cm-ია.", incl: "ფასში შედის პანელები, სამუშაო, მართვის ბარათი და პროგრამა.",
    excl: "დღგ-ისა და მიწოდების გარეშე.", no_list: "ამ პროდუქტს საკატალოგო ფასი არ აქვს.", amount_after: "თანხა ადგილზე დათვალიერების შემდეგ დაზუსტდება.",
    tell_size: "მომწერეთ ზომა და აქვე გამოვთვლი სავარაუდო თანხას.", no_call: "ზარის დანიშვნა არ შემიძლია.", wa_back: "მისწერეთ ჩვენს გუნდს WhatsApp-ით და დაგიკავშირდებიან: {1}.",
    email: "ელფოსტა: {1}.", no_appt: "აქედან ზარები არ ინიშნება.", brand1: "ჩვენი მოდულები NXTIONSTAR-ის ბრენდისაა.", brand2: "NXTIONSTAR ARLEDSCREEN-ის საკუთარი ბრენდია.",
    models_in: "შიდა: {1}.", models_out: "გარე: {1}.", models_any: "შიდა და გარე სივრცისთვის სხვადასხვა მოდელი გვაქვს.",
    pitch1: "P მნიშვნელობა პიქსელებს შორის მანძილია.", pitch2: "რაც უფრო მცირეა, მით უფრო მკაფიოა გამოსახულება ახლოდან.",
    yw: "არაფრის.", yw_n: "არაფრის, {1}.", hello: "გამარჯობა, კეთილი იყოს თქვენი მობრძანება!", hello_n: "გამარჯობა, {1}, კეთილი იყოს თქვენი მობრძანება!", nice: "სასიამოვნოა, {1}.",
    who1: "მე ვარ მელისი, ARLEDSCREEN-დან.", who2: "შეგიძლიათ მისწეროთ ჩვენს გუნდს WhatsApp-ით: {1}.", stuck: "წამით შევფერხდი. შეგიძლიათ თავიდან მომწეროთ?",
    wa_open: "ვხსნი WhatsApp-ს, საუბრის მოკლე შინაარსი უკვე შეტყობინებაშია.", mic_denied: "მიკროფონზე წვდომა არ დაიშვა.", type_on: "თუ გსურთ, წერილობით გავაგრძელოთ.",
    voice_on: "ხმოვანი პასუხები ჩართულია.", no_voice: "თქვენი ბრაუზერი ხმოვან შეყვანას არ უჭერს მხარს.",
    rec: "ჩემი რეკომენდაცია: {prod}.", rec_place: "თქვენი ობიექტისთვის ({place}) ჩემი რეკომენდაცია: {prod}.", est_excl: "სავარაუდო ფასი {m}, დღგ-ისა და მიწოდების გარეშე.",
    price_for: "სავარაუდო ფასი ({prod}): {m}.", panel_price: "{prod}: {m} თითო პანელზე.", bd1: "მასალა {m1}, სამუშაო {m2}.", bd2: "მართვის ბარათი {m1}, დრაივერი და პროგრამა {m2}.",
    miss: "P{p} ({env}) ჩვენს ასორტიმენტში არ არის.", near: "უახლოესი მოდელები: {list}.", and: " და ",
    acks: { "Harika": "მშვენიერია", "Anladım": "გასაგებია", "Teşekkürler": "გმადლობთ", "Tamam": "კარგი" },
    items: { dist: "{n} m ხედვის მანძილი", touchY: "ხელს შეახებენ", touchN: "ხელს არ შეახებენ", eco: "ეკონომიური" }
  };

  var FIXED = [
    ["hi_melis", /^Merhaba, ben Melis\.$/], ["ask_place", /^Ekranı nerede kullanmayı düşünüyorsunuz\?$/], ["ask_touch", /^Vitrinde ekrana el değer mi\?$/],
    ["ask_dist_facade", /^Cepheye kaç metreden bakılacak\?$/], ["ask_dist", /^Ekrana yaklaşık kaç metreden bakılacak\?$/], ["ask_size", /^Ekranın eni ve boyu ne kadar olsun\?$/],
    ["ask_unit", /^Ölçü metre mi, santimetre mi\?$/], ["ex_size", /^Örneğin 3x2 m\.$/], ["sorry", /^Kusura bakmayın, anlayamadım\.$/],
    ["visit_price", /^Fiyatı keşiften sonra netleşir\.$/], ["wa_ask", /^WhatsApp'tan teklif isteyelim mi\?$/], ["wa_ask_final", /^Kesin teklifi WhatsApp'tan isteyelim mi\?$/],
    ["change_q", /^Ölçüyü ya da yeri değiştirmek ister misiniz\?$/], ["change_ok", /^Ölçüyü ya da yeri de değiştirebilirsiniz\.$/], ["welcome", /^Hoş geldiniz!$/],
    ["vat_ship", /^KDV ve nakliye fiyata dahil değil\.$/], ["labor_incl", /^Atölye işçiliği dahil\.$/], ["ship_no", /^Nakliye fiyata dahil değil\.$/],
    ["ship_team", /^Ücretini ekibimiz WhatsApp'tan söyler\.$/], ["estimate", /^Bu fiyat tahminidir, bağlayıcı değildir\.$/], ["final_after_visit", /^Kesin tutar keşiften sonra netleşir\.$/],
    ["visit_wa", /^Keşif için ekibimize WhatsApp'tan yazabilirsiniz\.$/], ["d_delivery", /^Teslimat süresini ekibimiz netleştirir\.$/], ["d_warranty", /^Garanti koşullarını ekibimiz paylaşır\.$/],
    ["d_payment", /^Ödeme seçeneklerini ekibimiz paylaşır\.$/], ["d_install", /^Montaj süresini ekibimiz netleştirir\.$/], ["d_discount", /^Kampanyaları ekibimiz paylaşır\.$/],
    ["panel_varies", /^Panel fiyatı modele göre değişir\.$/], ["panel_size", /^Bir panel 32 × 16 cm\.$/], ["incl", /^Fiyata panel, işçilik, kontrol kartı ve yazılım dahil\.$/],
    ["excl", /^KDV ve nakliye hariç\.$/], ["no_list", /^Bu ürünün liste fiyatı yok\.$/], ["amount_after", /^Tutar keşiften sonra netleşir\.$/],
    ["tell_size", /^Ölçüyü yazın, tahmini tutarı burada hesaplayıp söyleyeyim\.$/], ["no_call", /^Arama saati veremem\.$/], ["wa_back", /^Ekibimize WhatsApp'tan yazarsanız size dönüş yapılır: (.+)\.$/],
    ["email", /^E-posta: (.+)\.$/], ["no_appt", /^Arama randevusu buradan verilmez\.$/], ["brand1", /^Modüllerimiz NXTIONSTAR markalı\.$/],
    ["brand2", /^NXTIONSTAR, ARLEDSCREEN'in kendi markası\.$/], ["models_any", /^İç ve dış mekân için farklı modellerimiz var\.$/],
    ["pitch1", /^P değeri, pikseller arası mesafedir\.$/], ["pitch2", /^Küçüldükçe yakından daha net görünür\.$/], ["yw", /^Rica ederim\.$/], ["yw_n", /^Rica ederim, (.+)\.$/],
    ["hello", /^Merhaba, hoş geldiniz!$/], ["hello_n", /^Merhaba (.+), hoş geldiniz!$/], ["nice", /^Memnun oldum, (.+)\.$/], ["who1", /^Ben Melis, ARLEDSCREEN'den\.$/],
    ["who2", /^Ekibimize WhatsApp'tan yazabilirsiniz: (.+)\.$/], ["stuck", /^Bir an takıldım, tekrar yazar mısınız\?$/], ["wa_open", /^WhatsApp'ı açıyorum, sohbet özetiniz mesajda hazır\.$/],
    ["mic_denied", /^Mikrofon izni verilmedi\.$/], ["type_on", /^İsterseniz yazarak devam edelim\.$/], ["voice_on", /^Sesli yanıt açıldı\.$/],
    ["no_voice", /^Tarayıcınız sesli girişi desteklemiyor\.$/]
  ];
  /* Mevcut İngilizce (L) metinleri → Türkçe kaynak (dil sonradan değişirse de doğru çevrilsin) */
  var EN_SRC = {
    "I'm Melis, from ARLEDSCREEN.": "Ben Melis, ARLEDSCREEN'den.",
    "Shall we request the final quote on WhatsApp?": "Kesin teklifi WhatsApp'tan isteyelim mi?",
    "Tell me the size and I'll calculate the estimate here.": "Ölçüyü yazın, tahmini tutarı burada hesaplayıp söyleyeyim.",
    "I can't book a call.": "Arama saati veremem.", "I can't book a call from here.": "Arama randevusu buradan verilmez.",
    "I got stuck for a moment. Could you send that again?": "Bir an takıldım, tekrar yazar mısınız?",
    "Opening WhatsApp, your chat summary is ready in the message.": "WhatsApp'ı açıyorum, sohbet özetiniz mesajda hazır.",
    "Microphone permission was not given. You can keep typing.": "Mikrofon izni verilmedi. İsterseniz yazarak devam edelim.",
    "Your browser does not support voice input.": "Tarayıcınız sesli girişi desteklemiyor.",
    "Request quote on WhatsApp": "WhatsApp'tan teklif iste", "See detailed breakdown": "Detaylı dökümü gör", "Keep it economical": "Ekonomik olsun",
    "Contact our team on WhatsApp": "WhatsApp'tan ekibe bağlan", "Melis is typing": "Melis yazıyor", "You": "Siz",
    "Listening… tap to stop": "Dinliyorum… Durdurmak için dokunun", "End voice chat": "Sesli sohbeti bitir", "Reply by voice": "Sesle yanıt ver",
    "Listening…": "Dinliyorum…", "Voice chat on; tap to end": "Sesli sohbet açık; bitirmek için dokunun"
  };

  /* ---------- Arayüz (çipler, etiketler, başlık) ---------- */
  var UI_KEYS = {
    "Melis yazıyor": "typing", "Siz": "you", "Sesli yanıtı kapat": "voiceOff", "Sesli yanıtı aç": "voiceOnBtn", "Sesli yanıt açık": "voiceIsOn", "Sesli yanıt kapalı": "voiceIsOff",
    "Dinliyorum… Durdurmak için dokunun": "listenStop", "Sesli sohbeti bitir": "endVoice", "Sesle yanıt ver": "replyVoice", "Dinliyorum…": "listening",
    "Sesli sohbet açık; bitirmek için dokunun": "voiceChatOn", "İç mekân": "indoor", "Dış mekân": "outdoor", "Kafe / restoran": "cafe", "Mağaza vitrini": "shopwin",
    "Otel lobisi": "lobby", "Bina cephesi": "facade", "Evet": "yes", "Hayır": "no", "WhatsApp'tan ekibe bağlan": "team", "WhatsApp'tan teklif iste": "waQuote",
    "Detaylı dökümü gör": "breakdown", "Ekonomik olsun": "eco", "Melis • Canlı Destek": "title", "Çevrim içi": "online", "Örn. kafe vitrini 3x2 m iç mekân": "placeholder",
    "Yanıtınız": "reply", "Gönder": "send", "Hızlı yanıtlar": "quick", "Öneri sohbeti": "chat", "Melis, Canlı Destek": "avatar"
  };
  var UI_ORDER = ["typing", "you", "voiceOff", "voiceOnBtn", "voiceIsOn", "voiceIsOff", "listenStop", "endVoice", "replyVoice", "listening", "voiceChatOn", "indoor", "outdoor", "cafe", "shopwin", "lobby", "facade", "yes", "no", "team", "waQuote", "breakdown", "eco", "title", "online", "placeholder", "reply", "send", "quick", "chat", "avatar"];
  var UI_ROWS = {
    en: ["Melis is typing", "You", "Turn off spoken replies", "Enable spoken replies", "Spoken replies on", "Spoken replies off", "Listening… tap to stop", "End voice chat", "Reply by voice", "Listening…", "Voice chat on; tap to end", "Indoor", "Outdoor", "Cafe / restaurant", "Shop window", "Hotel lobby", "Building façade", "Yes", "No", "Contact our team on WhatsApp", "Request quote on WhatsApp", "See detailed breakdown", "Keep it economical", "Melis • Live Support", "Online", "e.g. cafe storefront 3x2 m indoor", "Your reply", "Send", "Quick replies", "Recommendation chat", "Melis, Live Support"],
    de: ["Melis schreibt", "Sie", "Sprachausgabe ausschalten", "Sprachausgabe einschalten", "Sprachausgabe an", "Sprachausgabe aus", "Ich höre zu… zum Beenden tippen", "Sprachchat beenden", "Per Sprache antworten", "Ich höre zu…", "Sprachchat an; zum Beenden tippen", "Innenbereich", "Außenbereich", "Café / Restaurant", "Schaufenster", "Hotellobby", "Gebäudefassade", "Ja", "Nein", "Team auf WhatsApp kontaktieren", "Angebot per WhatsApp anfragen", "Detaillierte Aufstellung", "Lieber günstig", "Melis • Live-Support", "Online", "z. B. Café-Schaufenster 3x2 m innen", "Ihre Antwort", "Senden", "Schnellantworten", "Beratungs-Chat", "Melis, Live-Support"],
    fr: ["Melis écrit", "Vous", "Désactiver les réponses vocales", "Activer les réponses vocales", "Réponses vocales activées", "Réponses vocales désactivées", "J'écoute… touchez pour arrêter", "Terminer la conversation vocale", "Répondre à la voix", "J'écoute…", "Conversation vocale active ; touchez pour terminer", "Intérieur", "Extérieur", "Café / restaurant", "Vitrine de magasin", "Hall d'hôtel", "Façade d'immeuble", "Oui", "Non", "Contacter l'équipe sur WhatsApp", "Demander un devis sur WhatsApp", "Voir le détail", "Plutôt économique", "Melis • Assistance en direct", "En ligne", "ex. vitrine de café 3x2 m intérieur", "Votre réponse", "Envoyer", "Réponses rapides", "Chat de conseil", "Melis, assistance en direct"],
    es: ["Melis está escribiendo", "Usted", "Desactivar respuestas por voz", "Activar respuestas por voz", "Respuestas por voz activadas", "Respuestas por voz desactivadas", "Escuchando… toque para parar", "Terminar chat de voz", "Responder por voz", "Escuchando…", "Chat de voz activo; toque para terminar", "Interior", "Exterior", "Cafetería / restaurante", "Escaparate", "Vestíbulo de hotel", "Fachada de edificio", "Sí", "No", "Contactar al equipo por WhatsApp", "Pedir presupuesto por WhatsApp", "Ver desglose", "Mejor económico", "Melis • Atención en directo", "En línea", "p. ej. escaparate de cafetería 3x2 m interior", "Su respuesta", "Enviar", "Respuestas rápidas", "Chat de asesoramiento", "Melis, atención en directo"],
    it: ["Melis sta scrivendo", "Lei", "Disattiva risposte vocali", "Attiva risposte vocali", "Risposte vocali attive", "Risposte vocali disattivate", "In ascolto… tocca per fermare", "Termina chat vocale", "Rispondi a voce", "In ascolto…", "Chat vocale attiva; tocca per terminare", "Interno", "Esterno", "Bar / ristorante", "Vetrina", "Hall dell'hotel", "Facciata dell'edificio", "Sì", "No", "Contatta il team su WhatsApp", "Chiedi preventivo su WhatsApp", "Vedi dettaglio", "Meglio economico", "Melis • Assistenza live", "Online", "es. vetrina del bar 3x2 m interno", "La sua risposta", "Invia", "Risposte rapide", "Chat di consulenza", "Melis, assistenza live"],
    ru: ["Мелис печатает", "Вы", "Выключить голосовые ответы", "Включить голосовые ответы", "Голосовые ответы включены", "Голосовые ответы выключены", "Слушаю… нажмите, чтобы остановить", "Завершить голосовой чат", "Ответить голосом", "Слушаю…", "Голосовой чат включён; нажмите, чтобы завершить", "Для помещений", "Уличный", "Кафе / ресторан", "Витрина магазина", "Лобби отеля", "Фасад здания", "Да", "Нет", "Написать команде в WhatsApp", "Запросить предложение в WhatsApp", "Подробный расчёт", "Подешевле", "Мелис • Онлайн-поддержка", "В сети", "напр. витрина кафе 3x2 м в помещении", "Ваш ответ", "Отправить", "Быстрые ответы", "Чат-консультация", "Мелис, онлайн-поддержка"],
    uk: ["Меліс друкує", "Ви", "Вимкнути голосові відповіді", "Увімкнути голосові відповіді", "Голосові відповіді увімкнено", "Голосові відповіді вимкнено", "Слухаю… торкніться, щоб зупинити", "Завершити голосовий чат", "Відповісти голосом", "Слухаю…", "Голосовий чат увімкнено; торкніться, щоб завершити", "Для приміщень", "Вуличний", "Кафе / ресторан", "Вітрина магазину", "Лобі готелю", "Фасад будівлі", "Так", "Ні", "Написати команді у WhatsApp", "Запитати пропозицію у WhatsApp", "Детальний розрахунок", "Дешевше", "Меліс • Онлайн-підтримка", "Онлайн", "напр. вітрина кафе 3x2 м у приміщенні", "Ваша відповідь", "Надіслати", "Швидкі відповіді", "Чат-консультація", "Меліс, онлайн-підтримка"],
    bg: ["Мелис пише", "Вие", "Изключване на гласовите отговори", "Включване на гласовите отговори", "Гласовите отговори са включени", "Гласовите отговори са изключени", "Слушам… докоснете, за да спрете", "Край на гласовия чат", "Отговор с глас", "Слушам…", "Гласовият чат е включен; докоснете за край", "За закрито", "За открито", "Кафене / ресторант", "Витрина на магазин", "Лоби на хотел", "Фасада на сграда", "Да", "Не", "Пишете на екипа в WhatsApp", "Поискайте оферта в WhatsApp", "Подробна разбивка", "По-икономично", "Мелис • Онлайн поддръжка", "На линия", "напр. витрина на кафене 3x2 м на закрито", "Вашият отговор", "Изпрати", "Бързи отговори", "Чат за консултация", "Мелис, онлайн поддръжка"],
    ro: ["Melis scrie", "Dvs.", "Opriți răspunsurile vocale", "Porniți răspunsurile vocale", "Răspunsuri vocale pornite", "Răspunsuri vocale oprite", "Ascult… atingeți pentru a opri", "Încheiați chatul vocal", "Răspundeți vocal", "Ascult…", "Chat vocal pornit; atingeți pentru a încheia", "Interior", "Exterior", "Cafenea / restaurant", "Vitrină de magazin", "Holul hotelului", "Fațada clădirii", "Da", "Nu", "Scrieți echipei pe WhatsApp", "Cereți ofertă pe WhatsApp", "Vedeți detaliile", "Mai economic", "Melis • Asistență live", "Online", "ex. vitrina cafenelei 3x2 m interior", "Răspunsul dvs.", "Trimite", "Răspunsuri rapide", "Chat de consultanță", "Melis, asistență live"],
    el: ["Η Μελίς γράφει", "Εσείς", "Απενεργοποίηση φωνητικών απαντήσεων", "Ενεργοποίηση φωνητικών απαντήσεων", "Φωνητικές απαντήσεις ενεργές", "Φωνητικές απαντήσεις ανενεργές", "Ακούω… πατήστε για διακοπή", "Τέλος φωνητικής συνομιλίας", "Απάντηση με φωνή", "Ακούω…", "Φωνητική συνομιλία ενεργή· πατήστε για τέλος", "Εσωτερικός χώρος", "Εξωτερικός χώρος", "Καφετέρια / εστιατόριο", "Βιτρίνα καταστήματος", "Λόμπι ξενοδοχείου", "Πρόσοψη κτιρίου", "Ναι", "Όχι", "Επικοινωνία με την ομάδα στο WhatsApp", "Ζητήστε προσφορά στο WhatsApp", "Δείτε την ανάλυση", "Πιο οικονομικό", "Μελίς • Ζωντανή υποστήριξη", "Σε σύνδεση", "π.χ. βιτρίνα καφετέριας 3x2 m εσωτερικός χώρος", "Η απάντησή σας", "Αποστολή", "Γρήγορες απαντήσεις", "Συνομιλία συμβουλών", "Μελίς, ζωντανή υποστήριξη"],
    ar: ["مليس تكتب", "أنت", "إيقاف الردود الصوتية", "تشغيل الردود الصوتية", "الردود الصوتية مفعلة", "الردود الصوتية متوقفة", "أستمع… اضغط للإيقاف", "إنهاء المحادثة الصوتية", "الرد بالصوت", "أستمع…", "المحادثة الصوتية مفعلة؛ اضغط للإنهاء", "داخلي", "خارجي", "مقهى / مطعم", "واجهة متجر", "ردهة فندق", "واجهة مبنى", "نعم", "لا", "تواصل مع الفريق عبر واتساب", "اطلب عرض سعر عبر واتساب", "عرض التفاصيل", "خيار اقتصادي", "مليس • دعم مباشر", "متصلة", "مثلًا واجهة مقهى 3x2 m داخلي", "ردك", "إرسال", "ردود سريعة", "محادثة استشارية", "مليس، دعم مباشر"],
    az: ["Melis yazır", "Siz", "Səsli cavabı bağla", "Səsli cavabı aç", "Səsli cavab açıqdır", "Səsli cavab bağlıdır", "Dinləyirəm… dayandırmaq üçün toxunun", "Səsli söhbəti bitir", "Səslə cavab ver", "Dinləyirəm…", "Səsli söhbət açıqdır; bitirmək üçün toxunun", "Qapalı məkan", "Açıq məkan", "Kafe / restoran", "Mağaza vitrini", "Otel lobbisi", "Bina fasadı", "Bəli", "Xeyr", "WhatsApp-dan komandaya yazın", "WhatsApp-dan təklif istə", "Ətraflı hesablamaya bax", "Qənaətcil olsun", "Melis • Canlı dəstək", "Onlayn", "məs. kafe vitrini 3x2 m qapalı məkan", "Cavabınız", "Göndər", "Sürətli cavablar", "Məsləhət söhbəti", "Melis, canlı dəstək"],
    ka: ["მელისი წერს", "თქვენ", "ხმოვანი პასუხების გამორთვა", "ხმოვანი პასუხების ჩართვა", "ხმოვანი პასუხები ჩართულია", "ხმოვანი პასუხები გამორთულია", "გისმენთ… შეეხეთ შესაჩერებლად", "ხმოვანი ჩატის დასრულება", "ხმით პასუხი", "გისმენთ…", "ხმოვანი ჩატი ჩართულია; შეეხეთ დასასრულებლად", "შიდა სივრცე", "გარე სივრცე", "კაფე / რესტორანი", "მაღაზიის ვიტრინა", "სასტუმროს ლობი", "შენობის ფასადი", "დიახ", "არა", "მისწერეთ გუნდს WhatsApp-ით", "შეთავაზების მოთხოვნა WhatsApp-ით", "დეტალური გაანგარიშება", "უფრო ეკონომიური", "მელისი • ონლაინ მხარდაჭერა", "ონლაინ", "მაგ. კაფეს ვიტრინა 3x2 m შიდა", "თქვენი პასუხი", "გაგზავნა", "სწრაფი პასუხები", "საკონსულტაციო ჩატი", "მელისი, ონლაინ მხარდაჭერა"]
  };
  var UI = {};
  Object.keys(UI_ROWS).forEach(function (lg) {
    UI[lg] = {};
    UI_ORDER.forEach(function (k, i) { UI[lg][k] = UI_ROWS[lg][i]; });
  });

  /* ---------- Para ve sayı (değer aynı kalır, yalnızca yazım biçimi) ---------- */
  function fmtNum(n, lang, dec) {
    var loc = NUMLOC[lang] || LOC[lang] || "en-US";
    var o = dec ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 };
    try { return n.toLocaleString(loc, o); } catch (e) { return n.toLocaleString("en-US", o); }
  }
  function money(s, lang) {
    var m = /^([\d.]+,\d{2}) USD$/.exec(String(s).trim());
    if (!m) return s;
    return fmtNum(Number(m[1].replace(/\./g, "").replace(",", ".")), lang, true) + " USD";
  }
  function anyNum(s, lang) {
    var t = String(s);
    var n = /,/.test(t) || /^\d{1,3}(?:\.\d{3})+$/.test(t) ? Number(t.replace(/\./g, "").replace(",", ".")) : Number(t);
    return isFinite(n) ? fmtNum(n, lang, false) : t;
  }
  function fill(tpl, c) {
    return String(tpl).replace(/\{(\w+)\}/g, function (_, k) { return c[k] != null ? c[k] : ""; });
  }
  function withName(lang, name, s) {
    if (!name) return s;
    var rest = (lang === "ar" || lang === "ka" || /^[A-Z]{2}|^P\d/.test(s)) ? s : s.charAt(0).toLocaleLowerCase(LOC[lang]) + s.slice(1);
    return name + comma(lang) + rest;
  }
  function item(it, lang) {
    var L = S[lang], x = String(it).trim(), m;
    if (/^iç mekân$/i.test(x)) return ENVW[lang][0];
    if (/^dış mekân$/i.test(x)) return ENVW[lang][1];
    if ((m = /^([\d.,]+) m izleme mesafesi$/.exec(x))) return fill(L.items.dist, { n: anyNum(m[1], lang) });
    if ((m = /^([\d.,]+) × ([\d.,]+) cm$/.exec(x))) return anyNum(m[1], lang) + " × " + anyNum(m[2], lang) + " cm";
    if (x === "el değecek") return L.items.touchY;
    if (x === "el değmeyecek") return L.items.touchN;
    if (x === "ekonomik") return L.items.eco;
    return place(x, lang);
  }
  function comma(lang) { return lang === "ar" ? "، " : ", "; }
  function joinList(arr, lang) {
    if (arr.length < 2) return arr.join("");
    return arr.slice(0, -1).join(comma(lang)) + S[lang].and + arr[arr.length - 1];
  }

  function sentence(s, lang) {
    var L = S[lang], m, i;
    if (EN_SRC[s]) s = EN_SRC[s];
    for (i = 0; i < FIXED.length; i++) {
      m = FIXED[i][1].exec(s);
      if (m) return fill(L[FIXED[i][0]], { 1: m[1] });
    }
    if ((m = /^WhatsApp: (.+)\.$/.exec(s))) return "WhatsApp: " + m[1] + ".";
    if ((m = /^İç mekân: (.+)\.$/.exec(s))) return fill(L.models_in, { 1: m[1] });
    if ((m = /^Dış mekân: (.+)\.$/.exec(s))) return fill(L.models_out, { 1: m[1] });
    if ((m = /^(?:([^,]+), )?(?:(.+?) için|[Ss]ize) önerim ((?:[^.]|\.\d)+)\.$/.exec(s))) {
      var pl = m[2] ? place(m[2], lang) : "";
      return withName(lang, m[1], fill(pl ? L.rec_place : L.rec, { place: pl, prod: prod(m[3], lang) }));
    }
    if ((m = /^Tahmini fiyat (.+ USD), KDV ve nakliye hariç\.$/.exec(s))) return fill(L.est_excl, { m: money(m[1], lang) });
    if ((m = /^(?:([^,]+), )?(.+?) için tahmini fiyat (.+ USD)\.$/.exec(s))) return withName(lang, m[1], fill(L.price_for, { prod: prod(m[2], lang), m: money(m[3], lang) }));
    if ((m = /^(.+?) panel başı (.+ USD)\.$/.exec(s))) return fill(L.panel_price, { prod: prod(m[1], lang), m: money(m[2], lang) });
    if ((m = /^Malzeme (.+ USD), işçilik (.+ USD)\.$/.exec(s))) return fill(L.bd1, { m1: money(m[1], lang), m2: money(m[2], lang) });
    if ((m = /^Kontrol kartı (.+ USD), sürücü ve yazılım (.+ USD)\.$/.exec(s))) return fill(L.bd2, { m1: money(m[1], lang), m2: money(m[2], lang) });
    if ((m = /^P([\d.]+) (dış|iç) mekân için listemizde yok\.$/.exec(s))) return fill(L.miss, { p: m[1], env: ENVW[lang][m[2] === "dış" ? 1 : 0] });
    if ((m = /^En yakın modeller: (.+)\.$/.exec(s))) return fill(L.near, { list: joinList(m[1].split(" ve ").map(function (p) { return prod(p, lang); }), lang) });
    if ((m = /^(Harika|Anladım|Teşekkürler|Tamam)(?: ([^,]+))?, (.+)\.$/.exec(s))) {
      var items = m[3].split(/, | ve /).filter(Boolean).map(function (x) { return item(x, lang); });
      return L.acks[m[1]] + (m[2] ? " " + m[2] : "") + comma(lang) + joinList(items, lang) + ".";
    }
    return null;
  }

  /* Bir Melis mesajını (bir ya da birkaç cümle) çevirir. Bilinmeyen cümle olduğu gibi kalır. */
  function translate(text, lang) {
    lang = norm(lang) || "tr";
    if (lang === "tr" || text == null) return text;
    var s = String(text);
    if (EN_SRC[s]) s = EN_SRC[s];
    if (UI_KEYS[s]) return UI[lang][UI_KEYS[s]];
    /* Önce cümle cümle; bir cümle tanınmazsa mesajın tamamını tek kalıp olarak dene. */
    var miss = false;
    var out = s.split(/(?<=[.!?])\s+/).map(function (p) {
      var r = sentence(p, lang);
      if (r == null) { miss = true; return p; }
      return r;
    }).join(" ");
    if (!miss) return out;
    var whole = sentence(s, lang);
    if (whole != null) return whole;
    translate.misses.push(s);
    return out;
  }
  translate.misses = [];
  function chip(label, lang) {
    lang = norm(lang) || "tr";
    if (lang === "tr") return label;
    var s = EN_SRC[label] || label, m;
    if (UI_KEYS[s]) return UI[lang][UI_KEYS[s]];
    if ((m = /^(\d+) metre$/.exec(s))) return m[1] + " m";
    if (/^(iç|İç|dış|Dış) mekân P[\d.]+$/.test(s)) return prod(s, lang);
    if (/^[\d.,]+ ?x ?[\d.,]+ ?(cm|m)$/i.test(s)) return s;
    return translate(s, lang);
  }

  /* ---------- WhatsApp özeti ---------- */
  var WA = {
    en: ["Name", "Location", "Setting", "Size", "Recommended product", "Estimated price", "excl. VAT and shipping", "I was talking with Melis on the site and I'd like to continue."],
    de: ["Name", "Einsatzort", "Umgebung", "Größe", "Empfohlenes Produkt", "Geschätzter Preis", "ohne MwSt. und Versand", "Ich habe auf der Website mit Melis geschrieben und möchte gern weitermachen."],
    fr: ["Nom", "Lieu", "Environnement", "Taille", "Produit recommandé", "Prix estimé", "hors TVA et livraison", "J'ai échangé avec Melis sur le site et je souhaite continuer."],
    es: ["Nombre", "Lugar", "Entorno", "Medida", "Producto recomendado", "Precio estimado", "sin IVA ni envío", "He hablado con Melis en la web y me gustaría continuar."],
    it: ["Nome", "Luogo", "Ambiente", "Misura", "Prodotto consigliato", "Prezzo stimato", "IVA e spedizione escluse", "Ho parlato con Melis sul sito e vorrei continuare."],
    ru: ["Имя", "Место", "Условия", "Размер", "Рекомендованный товар", "Ориентировочная цена", "без НДС и доставки", "Я переписывался(-ась) с Мелис на сайте и хочу продолжить."],
    uk: ["Ім'я", "Місце", "Умови", "Розмір", "Рекомендований товар", "Орієнтовна ціна", "без ПДВ і доставки", "Я листувався(-лася) з Меліс на сайті й хочу продовжити."],
    bg: ["Име", "Място", "Среда", "Размер", "Препоръчан продукт", "Ориентировъчна цена", "без ДДС и доставка", "Писах си с Мелис в сайта и искам да продължим."],
    ro: ["Nume", "Loc", "Mediu", "Dimensiune", "Produs recomandat", "Preț estimativ", "fără TVA și transport", "Am vorbit cu Melis pe site și aș dori să continuăm."],
    el: ["Όνομα", "Χώρος", "Περιβάλλον", "Μέγεθος", "Προτεινόμενο προϊόν", "Εκτιμώμενη τιμή", "χωρίς ΦΠΑ και μεταφορά", "Μίλησα με τη Μελίς στον ιστότοπο και θα ήθελα να συνεχίσουμε."],
    ar: ["الاسم", "المكان", "البيئة", "المقاس", "المنتج المقترح", "السعر التقديري", "غير شامل الضريبة والشحن", "تحدثت مع مليس على الموقع وأود المتابعة."],
    az: ["Ad", "İstifadə yeri", "Mühit", "Ölçü", "Tövsiyə olunan məhsul", "Təxmini qiymət", "ƏDV və daşınma xaric", "Saytda Melis ilə danışdım, davam etmək istəyirəm."],
    ka: ["სახელი", "ადგილი", "გარემო", "ზომა", "რეკომენდებული პროდუქტი", "სავარაუდო ფასი", "დღგ-ისა და მიწოდების გარეშე", "საიტზე მელისს ვესაუბრე და გაგრძელება მსურს."]
  };
  /* d: { name, place, env ("ic"|"dis"), w, h, product, total } ; total yalnızca motorun hesapladığı sayı */
  function waSummary(d, lang) {
    lang = norm(lang) || "en";
    if (lang === "tr") lang = "en";
    var W = WA[lang], lines = [];
    if (d.name) lines.push(W[0] + ": " + d.name);
    if (d.place) lines.push(W[1] + ": " + place(d.place, lang));
    if (d.env) lines.push(W[2] + ": " + ENVW[lang][d.env === "dis" ? 1 : 0]);
    if (d.w != null && d.h != null) lines.push(W[3] + ": " + fmtNum(d.w, lang) + " × " + fmtNum(d.h, lang) + " cm");
    if (d.product) lines.push(W[4] + ": " + prod(d.product, lang));
    if (d.total != null) lines.push(W[5] + ": " + fmtNum(d.total, lang, true) + " USD (" + W[6] + ")");
    lines.push(W[7]);
    return lines.join("\n");
  }

  /* ---------- Gelen mesaj: yabancı kelime → motorun anladığı Türkçe anahtar ---------- */
  /* Kelime başı sınırı her alfabede çalışsın diye \b yerine \p{L} kullanılır; "!" ile biten öğe tam kelimedir. */
  function kw(list, token) {
    var alts = list.split("|").map(function (w) { return /!$/.test(w) ? w.slice(0, -1) + "(?!\\p{L})" : w; });
    return [new RegExp("(?<!\\p{L})(?:" + alts.join("|") + ")", "iu"), token];
  }
  var KW = [
    kw("indoor|inside|interior|innen|drinnen|intérieur|interieur|dentro|interno|interna|interni|binnen|în interior|в помещени|внутр|у приміщен|внутрішн|на закрито|вътр|داخل|εσωτερικ|daxili|qapalı|შიდა", "ic mekan"),
    kw("outdoor|outside|exterior|außen|aussen|draußen|extérieur|exterieur|fuera|esterno|esterna|buiten|în exterior|уличн|на улиц|наружн|вуличн|на вулиц|на открито|навън|отвън|външ|خارج|εξωτερικ|xarici|açıq|გარე", "dis mekan"),
    kw("caf|coffee|restaurant|ristorante|bar!|кафе|ресторан|مقه|مطعم|καφ|εστιατ|kafe|restoran|კაფე|რესტორან", "kafe"),
    kw("storefront|shop window|shopwindow|schaufenster|vitrine|escaparate|vetrina|vitrin|витрин|вітрин|واجهة عرض|واجهة متجر|واجهة محل|βιτρ|ვიტრინ", "vitrin"),
    kw("shop!|store!|geschäft|laden|magasin|boutique|tienda|negozio|magazin|магазин|متجر|محل|κατάστημα|mağaza|მაღაზი", "magaza"),
    kw("office|büro|bureau|oficina|ufficio|birou|офис|офіс|مكتب|γραφε|ofis|ოფის", "ofis"),
    kw("hotel|hôtel|отел|готел|хотел|فندق|ξενοδοχ|otel|სასტუმრო", "otel"),
    kw("lobby|hall d'h|vestíbulo|лобби|лобі|лоби|ردهة|λόμπι|λομπι|lobbi|ლობი", "lobi"),
    kw("mall!|shopping cent|einkaufszentrum|centre commercial|centro comercial|centro commerciale|торгов|тц!|търговски център|مركز تسوق|εμπορικό κέντρο|ticarət mərkəzi|სავაჭრო ცენტრ", "avm"),
    kw("school|schule|école|escuela|colegio|scuola|școal|школ|училищ|مدرس|σχολε|məktəb|სკოლ", "okul"),
    kw("mosque|moschee|mosquée|mezquita|moschea|мечет|джамия|مسجد|τζαμ|məscid|მეჩეთ", "cami"),
    kw("factory|fabrik|usine|fábrica|fabbrica|fabric|завод|фабрик|مصنع|εργοστ|ქარხან", "fabrika"),
    kw("warehouse|lager!|entrepôt|almacén|magazzino|depozit|склад|مستودع|αποθήκ|anbar|საწყობ", "depo"),
    kw("stage!|bühne|scène|escenario|palco|scen|сцен|مسرح|σκην|səhnə|სცენ", "sahne"),
    kw("conferen|konferenz|conférence|conferinț|конференц|مؤتمر|συνέδρι|konfrans|კონფერენც", "konferans"),
    kw("theatre|theater|théâtre|teatro|teatru|театр|театър|θέατρ|teatr|თეატრ", "tiyatro"),
    kw("municipal|gemeinde|mairie|ayuntamiento|comune!|primări|муниципал|община|міська рада|بلدية|δήμο|bələdiyyə|მერია", "belediye"),
    kw("stadium|stadion|stade|estadio|stadio|стадион|стадіон|ملعب|γήπεδ|სტადიონ", "stadyum"),
    kw("parking|car park|parkplatz|aparcamiento|parcheggio|parcare|парков|паркинг|موقف سيارات|πάρκινγκ|dayanacaq|ავტოსადგომ", "otopark"),
    kw("gas station|petrol station|fuel station|tankstelle|station-service|gasolinera|distributore|benzinări|азс!|бензиностанц|محطة وقود|πρατήριο|yanacaq|ბენზინგასამართ", "akaryakit"),
    kw("billboard|sign!|signage|werbeschild|schild|enseigne|letrero|insegna|reclam|вывеск|вивіск|табел|لافتة|πινακίδ|lövhə|აბრა", "tabela"),
    kw("totem|pylon|стел|тотем|πυλών|ტოტემ", "totem"),
    kw("facade|façade|fassade|fachada|facciata|fațad|фасад|واجهة مبنى|πρόσοψ|fasad|ფასად", "cephe"),
    kw("street|straße|strasse|rue!|calle!|strada|улиц|вулиц|شارع|δρόμο|küçə|ქუჩ", "cadde"),
    kw("garden|garten|jardin|jardín|giardino|grădin|сад!|градин|حديقة|κήπ|bağ!|ბაღ", "bahce"),
    kw("wedding|hochzeit|mariage|boda!|matrimonio|nunt|свадьб|весілл|сватб|زفاف|γάμο|toy!|ქორწილ", "dugun"),
    kw("trade fair|exhibition|expo!|messe|salon professionnel|feria!|fiera!|târg|выставк|виставк|изложени|معرض|έκθεσ|sərgi|გამოფენ", "fuar"),
    kw("concert|konzert|concierto|concerto|концерт|حفلة موسيقية|συναυλ|konsert|კონცერტ", "konser"),
    kw("festival|фестивал|مهرجان|φεστιβάλ|ფესტივალ", "festival"),
    kw("event|veranstaltung|événement|evento|eveniment|мероприят|захід|събити|فعالية|εκδήλωσ|tədbir|ღონისძიებ", "etkinlik"),
    kw("pharmacy|apotheke|pharmacie|farmacia|farmacie|аптек|صيدلية|φαρμακε|aptek|აფთიაქ", "eczane"),
    kw("supermarket|supermarkt|supermarché|supermercado|supermercato|супермаркет|سوبرماركت|σούπερ μάρκετ|სუპერმარკეტ", "market"),
    kw("rent|hire!|miete|location!|alquil|noleggi|închiri|аренд|оренд|под наем|наем|إيجار|ενοικ|icarə|ქირ", "kiralik"),
    kw("buy!|purchase|kaufen|acheter|comprar|comprare|cumpăr|купить|купити|купя|شراء|αγορά|almaq|ყიდვ", "satin"),
    kw("curved|flexible|bendable|cylind|gebogen|flexibel|courbé|curvo|curva!|flessibil|curbat|flexibil|изогнут|гибк|вигнут|гнучк|извит|гъвкав|منحن|مرن|καμπύλ|εύκαμπτ|əyri|elastik|მოქნილ|მრუდ", "kavisli"),
    kw("cheap|economical|budget|low cost|affordable|günstig|billig|preiswert|pas cher|économique|barato|económic|economic|дешев|эконом|бюджет|евтин|икономич|економ|رخيص|اقتصادي|φθην|οικονομικ|ucuz|qənaətcil|იაფ|ეკონომიურ", "ekonomik"),
    kw("touch|berühr|anfass|toucher|touché|tocar|toccare|tocc|ating|касат|касаю|трога|дотор|торка|докосв|докосн|لمس|αγγίζ|αγγιζ|toxun|əl dəy|შეხებ|ეხებ", "dokun"),
    kw("close up|up close|nearby|near!|nah!|de près|cerca!|vicino|aproape|вблизи|близко|зблизька|близо|قريب|κοντά|yaxın|ახლოს", "yakin"),
    kw("far away|from afar|far!|weit!|de loin|lejos|lontano|departe|издалека|далеко|здалеку|отдалеч|بعيد|μακριά|uzaq|შორს", "uzak"),
    kw("price|cost|how much|preis|kosten|kostet|koste!|wie viel|wieviel|prix|combien|coût|precio|cuánto|cuanto|prezzo|quanto|preț|pret!|cât cost|цен|стоимост|сколько|скільки|вартіст|колко|струва|سعر|كم!|τιμή|τιμη|πόσο|qiymət|neçəyə|ფას|რა ღირს", "fiyat"),
    kw("quote|offer!|angebot|devis|presupuesto|preventivo|ofert|предложени|пропозиці|оферт|عرض سعر|προσφορ|təklif|შეთავაზებ", "teklif"),
    kw("contact|phone|telephone|e-mail|email|kontakt|telefon|téléphone|contacto|contatto|телефон|контакт|почт|имейл|اتصال|هاتف|بريد|τηλέφων|επικοιν|əlaqə|ტელეფონ|კონტაქტ|ელფოსტ", "iletisim"),
    kw("deliver|liefer|livraison|entrega|consegna|livrare|доставк|تسليم|παράδοσ|çatdırıl|მიწოდებ", "teslim"),
    kw("warrant|guarantee|garantie|garantía|garanzia|garanți|гаранти|ضمان|εγγύησ|zəmanət|გარანტი", "garanti"),
    kw("payment|instalment|installment|credit card|zahlung|ratenzahl|paiement|pago!|pagamento|plat|оплат|рассрочк|плащане|دفع|تقسيط|πληρωμ|δόσεις|ödəniş|გადახდ", "odeme"),
    kw("installation|mounting|montage|montaje|montaggio|montaj|монтаж|установк|تركيب|εγκατάστασ|quraşdır|მონტაჟ", "montaj"),
    kw("discount|rabatt|remise|descuento|sconto|reducere|скидк|знижк|отстъпк|خصم|έκπτωσ|endirim|ფასდაკლებ", "indirim"),
    kw("vat!|tax!|mwst|mehrwertsteuer|tva!|iva!|ндс|пдв|ддс|ضريبة|φπα|ədv|დღგ", "kdv"),
    kw("shipping|freight|versand|envío|spedizione|شحن|μεταφορ|daşınma", "nakliye"),
    kw("binding|final price|verbindlich|définitif|vinculante|vincolante|окончательн|обвързващ|نهائي|δεσμευτικ|dəqiq qiymət|საბოლოო", "kesin fiyat"),
    kw("site visit|survey|besichtigung|visite sur place|visita técnica|sopralluogo|vizită|выезд|замер|огляд|оглед|معاينة|αυτοψ|yerində baxış|დათვალიერებ", "kesif"),
    kw("breakdown|included|what's in|aufstellung|enthalten|détail|inclus|desglose|incluid|dettaglio|detali|подробн|включен|разбивк|تفاصيل|يشمل|ανάλυσ|περιλαμβ|daxildir|დეტალ", "dokum"),
    kw("models|products|which model|modelle|produkte|modèles|produits|modelos|productos|modelli|prodotti|modele|produse|модел|товар|продукт|طراز|منتجات|μοντέλα|προϊόντα|modellər|məhsul|მოდელ|პროდუქტ", "modeller"),
    kw("pixel|pitch!|пиксел|піксел|بكسل|πίξελ|piksel|პიქსელ", "piksel"),
    kw("thank|danke|merci|gracias|grazie|mulțumesc|multumesc|спасиб|дякую|благодар|شكر|ευχαριστ|təşəkkür|sağ ol|მადლობ", "tesekkur"),
    kw("call me|callback|call back|ruf mich|rufen sie mich|rappel|llámame|richiamami|sunați-mă|перезвон|передзвон|обадете ми се|اتصل بي|τηλεφωνήστε μου|zəng edin|დამირეკ", "beni ara"),
    kw("brand|marke|marque|marca|marchio|бренд|марк|علامة|μάρκα|marka|ბრენდ", "marka"),
    kw("calculat|berechn|calculer|calcular|calcolare|calcula|рассчита|розрахува|изчисли|احسب|υπολόγισ|hesabla|გამოთვალ", "hesapla"),
    kw("bot!|robot|chatbot|chat bot|ai!|artificial intelligence|ki!|künstliche intelligenz|ia!|intelligence artificielle|inteligencia artificial|intelligenza artificiale|inteligență artificială|бот!|робот|искусствен|штучн|изкуствен|روبوت|بوت|ذكاء اصطناعي|ρομπότ|τεχνητή|süni intellekt|ბოტ|რობოტ|human!|real person|mensch!|humain|humano|umano|om real|человек|людин|човек|إنسان|άνθρωπ|insan|ადამიან", "bot")
  ];
  var YES = /^(yes|yeah|yep|sure|of course|ok|okay|ja|jawohl|gerne|oui|bien sûr|sí|si|claro|certo|certamente|da|sigur|да|так|звісно|конечно|نعم|أجل|ναι|bəli|hə|კი|დიახ)[.!\s]*$/iu;
  var NO = /^(no|nope|nein|non|não|nu|нет|ні|не|لا|όχι|xeyr|yox|არა)[.!\s]*$/iu;
  var GREET = /^(hello|hi|hey|good (morning|afternoon|evening)|hallo|guten (tag|morgen|abend)|servus|bonjour|bonsoir|salut|hola|buenos días|buenas|ciao|buongiorno|salve|bună( ziua)?|привет|здравствуй\p{L}*|добр\p{L}* (день|утро|вечер)|вітаю|привіт|здравей\p{L}*|добър ден|مرحب\p{L}*|السلام عليكم|أهلا|γει[αά]( σου| σας)?|καλημέρα|salam|გამარჯობა)(?=[\s,.!]|$)/iu;
  var NAME = [
    /(?:^|[\s,.!])(?:[Mm]y name is|I am|I'm|[Cc]all me)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Ii]ch heiße|[Ii]ch heisse|[Mm]ein Name ist)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Jj]e m'appelle|[Mm]on nom est)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Mm]e llamo|[Mm]i nombre es)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Mm]i chiamo|[Ii]l mio nome è)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Mm]ă numesc|[Nn]umele meu este)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Мм]еня зовут|[Мм]ене звати|[Кк]азвам се|[Ии]мето ми е)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:اسمي)\s+(\p{L}{2,20})/u,
    /(?:^|[\s,.!])(?:[Μμ]ε λένε|[Οο]νομάζομαι)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:[Mm]ənim adım)\s+(\p{Lu}[\p{L}'-]{1,19})/u,
    /(?:^|[\s,.!])(?:მე მქვია|ჩემი სახელია)\s+(\p{L}{2,20})/u
  ];
  var L_ = "(?<!\\p{L})";
  var E_ = "(?!\\p{L})";
  var RX = {
    cm: new RegExp("(\\d)\\s*(?:centim\\p{L}*|zentim\\p{L}*|centím\\p{L}*|сантим\\p{L}*|см" + E_ + "|سم|سنتيمتر\\p{L}*|εκατοστ\\p{L}*|εκ\\.?" + E_ + "|sm" + E_ + "|სანტიმეტრ\\p{L}*|სმ)", "giu"),
    mm: new RegExp("(\\d)\\s*(?:millim\\p{L}*|миллим\\p{L}*|мм" + E_ + ")", "giu"),
    m: new RegExp("(\\d)\\s*(?:meters?|metres?|mètres?|metros?|metri|metro|metr\\p{L}*|метр\\p{L}*|м" + E_ + "|متر\\p{L}*|أمتار|μέτρ\\p{L}*|μ" + E_ + "|م" + E_ + "|მეტრ\\p{L}*|მ" + E_ + ")(?![a-z])", "giu"),
    by: new RegExp("(\\d(?:[.,]\\d+)?)\\s*(?:by|mal|sur|por|per|pe|на|επί|في|х|Х|×)\\s*(\\d)", "giu"),
    from: new RegExp(L_ + "(?:from|aus|von|à|desde|da|di|de la|de|с|со|з|от|من|από)\\s+(\\d+(?:[.,]\\d+)?)\\s*m(?![a-z])", "giu"),
    dist: new RegExp(L_ + "(?:viewing distance|distance|abstand|entfernung|distancia|distanza|distanță|расстояни\\p{L}*|відстан\\p{L}*|разстояни\\p{L}*|المسافة|απόσταση|məsafə|მანძილ\\p{L}*)\\s*[:=]?\\s*(?=\\d)", "giu"),
    width: new RegExp(L_ + "(?:width|breite|largeur|ancho|larghezza|lățime|ширина|العرض|πλάτος|სიგანე)\\s*[:=]?\\s*(?=\\d)", "giu"),
    height: new RegExp(L_ + "(?:height|höhe|hauteur|alto|altura|altezza|înălțime|высота|висота|височина|الارتفاع|ύψος|hündürlük|სიმაღლე)\\s*[:=]?\\s*(?=\\d)", "giu")
  };
  function inbound(text, lang) {
    var raw = String(text || "");
    var t = raw.replace(/[\u0660-\u0669]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[\u06F0-\u06F9]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); });
    if (YES.test(t.trim())) return "evet";
    if (NO.test(t.trim())) return "hayir";
    var nameHit = "";
    for (var n = 0; n < NAME.length && !nameHit; n++) {
      var nm = NAME[n].exec(t);
      if (nm) nameHit = nm[1];
    }
    t = t.replace(RX.cm, "$1 cm").replace(RX.mm, "$1 mm").replace(RX.m, "$1 m").replace(RX.by, "$1x$2");
    t = t.replace(RX.from, " $1 m'den").replace(RX.dist, "mesafe ").replace(RX.width, "en ").replace(RX.height, "boy ");
    /* Yabancı metinde tek başına "dis"/"ic" Türkçe iç/dış sanılmasın */
    if (lang !== "tr" && lang !== "az") t = t.replace(/(^|[^a-z])(dis|ic)(?=[^a-z]|$)/gi, "$1_");
    var extra = [];
    for (var i = 0; i < KW.length; i++) if (KW[i][0].test(raw) && extra.indexOf(KW[i][1]) < 0) extra.push(KW[i][1]);
    if (GREET.test(raw.trim())) t = "merhaba " + t;
    if (nameHit) t += " \uE000" + nameHit + "\uE000";
    if (extra.length) t += " . " + extra.join(" ");
    return t;
  }

  /* ---------- Yazılan mesajın dili (ziyaretçi başka dilde yazarsa Melis o dile geçer) ---------- */
  var SW = {
    tr: ["ve", "bir", "için", "icin", "ile", "ne", "kaç", "kac", "merhaba", "ekran", "fiyat", "fiyatı", "istiyorum", "lazım", "teşekkür", "tesekkur", "mı", "mi", "mu", "mü", "var", "yok", "evet", "hayır", "hayir", "nedir", "olarak", "bu", "şu", "nasıl", "nasil", "kadar", "metre", "dükkan", "dukkan", "mekan", "mekân", "selam", "iç", "dış", "ic", "dis"],
    az: ["və", "mən", "üçün", "ilə", "neçə", "salam", "qiymət", "qiyməti", "istəyirəm", "təşəkkür", "bəli", "xeyr", "necə", "lazımdır", "nədir", "harada"],
    en: ["the", "and", "is", "are", "you", "i", "my", "for", "with", "how", "much", "what", "want", "need", "screen", "price", "hello", "hi", "we", "our", "it", "of", "to", "please", "can", "do", "have", "would", "like", "display", "cost", "thanks", "about", "your", "this", "that", "where", "which", "indoor", "outdoor", "shop", "store", "wall"],
    de: ["der", "die", "das", "und", "ist", "ich", "wir", "mit", "für", "wie", "viel", "was", "ein", "eine", "einen", "nicht", "bitte", "hallo", "kostet", "kosten", "bildschirm", "möchte", "brauche", "haben", "sie", "danke", "wand", "preis", "guten", "tag", "innen", "außen"],
    fr: ["le", "la", "les", "et", "est", "je", "nous", "pour", "avec", "combien", "un", "une", "des", "pas", "bonjour", "écran", "prix", "voudrais", "merci", "vous", "du", "oui", "coûte", "besoin", "quel", "quelle"],
    es: ["el", "los", "las", "y", "es", "yo", "para", "con", "cuánto", "cuanto", "una", "por", "hola", "pantalla", "precio", "quiero", "necesito", "gracias", "usted", "qué", "cuesta", "sí", "buenos", "días"],
    it: ["il", "lo", "gli", "è", "io", "per", "con", "quanto", "una", "ciao", "schermo", "prezzo", "vorrei", "grazie", "sono", "che", "costa", "buongiorno", "salve", "serve"],
    ro: ["și", "si", "este", "eu", "pentru", "cu", "cât", "cat", "bună", "buna", "ecran", "preț", "pret", "vreau", "mulțumesc", "multumesc", "sunt", "ce", "în", "costă", "aveți", "ziua", "nevoie"]
  };
  var BG_WORDS = new RegExp(L_ + "(?:здравей\\p{L}*|колко|искам|струва|благодаря|съм|какво|търся|може ли|сте|трябва|екран)" + E_, "iu");
  function detect(text, current) {
    var t = String(text || "");
    var letters = t.replace(/[^\p{L}]/gu, "");
    if (letters.length < 3) return null;
    var count = function (re) { var m = t.match(re); return m ? m.length : 0; };
    var Ln = letters.length;
    if (count(/[\u10A0-\u10FF]/g) / Ln > 0.5) return "ka";
    if (count(/[\u0370-\u03FF\u1F00-\u1FFF]/g) / Ln > 0.5) return "el";
    if (count(/[\u0600-\u06FF]/g) / Ln > 0.5) return /[پچژگ]/.test(t) ? null : "ar";
    if (count(/[\u0400-\u04FF]/g) / Ln > 0.5) {
      if (/[іїєґ]/i.test(t)) return "uk";
      if (/[ыэё]/i.test(t)) return "ru";
      if (/ъ/i.test(t) || BG_WORDS.test(t)) return "bg";
      if (current === "bg" || current === "ru" || current === "uk") return current;
      return "ru";
    }
    if (/ə/i.test(t)) return "az";
    if (/[ığ]/.test(t) || /İ/.test(t)) return "tr";
    var words = t.toLowerCase().split(/[^\p{L}']+/u).filter(Boolean);
    var best = null, bestN = 0, second = 0;
    Object.keys(SW).forEach(function (lg) {
      var set = SW[lg], n = 0, seen = {};
      words.forEach(function (w) { if (!seen[w] && set.indexOf(w) >= 0) { n++; seen[w] = 1; } });
      if (lg === "tr" && /[şçöü]/.test(t) && !/[äß]/.test(t)) n += 1;
      if (lg === "de" && /[äöüß]/.test(t)) n += 1;
      if (lg === "fr" && /[àâçèéêëîïôœùû]/.test(t)) n += 1;
      if (lg === "es" && /[ñ¿¡áíóú]/.test(t)) n += 1;
      if (lg === "ro" && /[ăâîșț]/.test(t)) n += 1;
      if (n > bestN) { second = bestN; bestN = n; best = lg; } else if (n > second) second = n;
    });
    if (bestN >= 2 && bestN > second) return best;
    return null;
  }

  /* ---------- Ses (Türkçe dışı dillerde sade okunuş) ---------- */
  function speakable(text) {
    var t = String(text || "");
    t = t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, "");
    t = t.replace(/\+90\s*(\d{3})\s*(\d{3})\s*(\d{2})\s*(\d{2})/g, "+90, $1, $2, $3, $4");
    t = t.replace(/\s×\s/g, " x ").replace(/ARLEDSCREEN/g, "AR LED Screen");
    return t.replace(/\s{2,}/g, " ").trim();
  }

  window.ARLED_MELIS_I18N = {
    supported: SUP.slice(),
    norm: norm,
    locale: function (l) { return LOC[norm(l) || "en"]; },
    dir: function (l) { return norm(l) === "ar" ? "rtl" : "ltr"; },
    translate: translate, chip: chip, ui: function (s, l) { return chip(s, l); },
    inbound: inbound, detect: detect, waSummary: waSummary, speakable: speakable, place: place, prod: prod
  };
})();
