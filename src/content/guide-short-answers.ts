/**
 * GEO paket 3 — answer-first "Kısa cevap / Short answer" texts for the rehber guides,
 * the about page and /tr|en/led-ekran-satisi.
 *
 * Rules (do not relax):
 * - Only facts that are already published on the same page (guide lead/sections/FAQ) or
 *   in the owner-approved lists (PANEL_PRICES, delivery, payment). Nothing is invented.
 * - Every USD figure is read from PANEL_PRICES, so TR, EN and the price pages stay identical.
 * - Rental price (50 USD/m²/day) lives on the rental pages, not here.
 * - Premium wording only; no discount language.
 * The visible block itself is the ShortAnswer component from GEO paket 2 (same design).
 */
import { PANEL_PRICES, PANELS_PER_M2, fmtUsd, type PanelPrice } from "@/content/prices";
import type { SeoGuideSlug } from "@/content/seo-guides";
import type { InstallGuideSlug } from "@/content/install-guides";

type L = "tr" | "en";

const byId = (id: string): PanelPrice => {
  const p = PANEL_PRICES.find((x) => x.id === id);
  if (!p) throw new Error(`guide-short-answers: unknown panel id ${id}`);
  return p;
};
const num = (n: number, l: L) =>
  l === "en"
    ? n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : fmtUsd(n);
/** "30,88 USD/panel" (TR) or "USD 30.88 per panel" (EN). */
const pp = (id: string, l: L) => (l === "tr" ? `${num(byId(id).usd, l)} USD/panel` : `USD ${num(byId(id).usd, l)} per panel`);
/** Module-only cost per m² for a standard 320 × 160 mm panel, rounded like the price page. */
const m2 = (id: string, l: L) => Math.round(byId(id).usd * PANELS_PER_M2).toLocaleString(l === "en" ? "en-US" : "tr-TR");
const rng = (use: "ic" | "dis", l: L) => {
  const v = PANEL_PRICES.filter((p) => p.use === use).map((p) => p.usd);
  return `${num(Math.min(...v), l)} – ${num(Math.max(...v), l)}`;
};

const DELIVERY_TR = "Teslim süresi 3–21 gün hazırlık + 1–14 gün nakliyedir.";
const DELIVERY_EN = "Lead time is 3–21 days preparation + 1–14 days shipping.";

type Pair = (l: L) => string;
const t = (tr: string, en: string): Pair => (l) => (l === "tr" ? tr : en);

/** "led-ekran-ihracat" keeps its GEO paket 2 block (short-answers.ts). */
export const GUIDE_SHORT_ANSWERS: Record<Exclude<SeoGuideSlug, "led-ekran-ihracat"> | InstallGuideSlug, Pair> = {
  "led-ekran": t(
    "LED ekran, RGB piksellerden oluşan modüllerin yan yana birleşmesiyle kurulan tam renkli dijital ekrandır; ölçüsü modül eklenerek büyür. Doğru ekran üç adımda seçilir: kullanım yeri (iç veya dış mekân), izleme mesafesine göre piksel aralığı ve montaj şekli. Panel fiyatları fiyat listemizde yayımlıdır; nihai tutar keşif sonrası yazılı teklifle kesinleşir.",
    "An LED display is a modular, high-brightness digital surface. At ARLEDSCREEN, NXTIONSTAR series are sized by indoor or outdoor use, viewing distance and content path, with survey and quote on one desk. Panel prices are published on our price list; the final amount is confirmed in a written quote after survey.",
  ),
  "dijital-ekran": t(
    "Dijital ekran, içeriği elektronik olarak değiştirilebilen görüntü yüzeylerinin genel adıdır: LCD ve OLED paneller, kayan yazı LED tabelalar, totemler, video duvarlar ve tam renkli LED ekranlar bu gruba girer. Her LED ekran bir dijital ekrandır, ama her dijital ekran LED ekran değildir. ARLEDSCREEN tam renkli LED ekranları kendi markası NXTIONSTAR ile sunar; LCD seçeneklerinde fiyat teklifle verilir.",
    "“Digital display” is the umbrella term for any screen whose content changes electronically: LCD and OLED panels, scrolling-text LED signs, digital totems, video walls and full-colour LED screens. One team at ARLEDSCREEN handles sales, site survey, installation and technical service; LCD options are priced in a written quote.",
  ),
  "ekran-cesitleri": t(
    "Ekranlar üç ana gruba ayrılır: LCD ve OLED gibi sabit ölçülü paneller, metin gösteren kayan yazı LED tabelalar ve video oynatan tam renkli LED ekranlar. Tam renkli LED ekranlar kullanım yerine ve forma göre iç mekân, dış mekân, GOB, ince pitch, esnek, şeffaf, transparan ve poster/totem olarak çeşitlenir. ARLEDSCREEN bu LED ekran çeşitlerini kendi markası NXTIONSTAR ile satar, kurar ve servis eder.",
    "Displays fall into three groups: fixed-size LCD/OLED panels, scrolling-text LED signs and full-colour LED screens that play video. Full-colour LED screens vary by location and form: indoor, outdoor, GOB, fine pitch, flexible, transparent, mesh and poster/totem. ARLEDSCREEN sells, installs and services these LED display types under its own brand NXTIONSTAR.",
  ),
  "lcd-ekran": t(
    "LCD ekran, arkadan aydınlatılan sıvı kristal bir panelle görüntü oluşturan ve fabrikada belirlenen ölçüde üretilen dijital ekrandır; TV, monitör, menuboard ve ayaklı totemlerde yaygındır. Geniş yüzey, uzaktan okunurluk veya dış mekân gerektiğinde LED öne çıkar. ARLEDSCREEN menuboard ve ayaklı ekran projelerinde LCD/TV tipi seçeneği de sunar; model, ölçü ve fiyat yazılı teklifle verilir.",
    "An LCD display forms the image with a backlit liquid-crystal panel made in a fixed factory size; it is common in TVs, monitors, menu boards and freestanding totems. Besides LED, ARLEDSCREEN offers LCD/TV-type screens for menu board and freestanding-screen projects; model, size and price are given in a written quote.",
  ),
  "dis-mekan-led-ekran": t(
    `Dış mekân LED ekran; bina cephesi, totem, billboard ve meydan gibi açık alanlarda güneşe, yağmura ve toza dayanacak şekilde kurulan ekrandır. NXTIONSTAR dış mekân serisi P2.5, P2.9, P3.07, P4, P4 önden servis, P5 ve P8 aralıklarında sunulur; yayımlanmış panel fiyatları ${rng("dis", "tr")} USD arasındadır (panel başına, KDV ve nakliye hariç).`,
    `Outdoor LED screens must survive rain, dust and sun. ARLEDSCREEN / NXTIONSTAR outdoor LED projects plan IP65 sealing, GOB protection and high nit output together. Published outdoor panel prices are USD ${rng("dis", "en")} per panel, excluding VAT and shipping.`,
  ),
  "ic-mekan-led-ekran": t(
    `İç mekân LED ekran; mağaza, kafe, otel lobisi, showroom ve toplantı salonu gibi kapalı alanlarda, izleyicinin birkaç metre mesafeden baktığı ekrandır. NXTIONSTAR iç mekân serisi P1.25, P2.5, P3.07 ve P4; GOB serisi P1.25, P1.53 ve P1.86 seçenekleriyle sunulur. Yayımlanmış panel fiyatları ${rng("ic", "tr")} USD arasındadır (panel başına, KDV ve nakliye hariç).`,
    `Indoor projects put viewers close, so fine pitch, low noise and consistent colour come first. ARLEDSCREEN / NXTIONSTAR indoor LED also plans camera-facing use and AI/CMS pipelines up front. Published indoor panel prices are USD ${rng("ic", "en")} per panel, excluding VAT and shipping.`,
  ),
  "vitrin-led-ekran": t(
    "Vitrin LED ekran, mağaza camını arkadaki ürünler görünür kalacak şekilde bir reklam yüzeyine çevirebilir. ARLEDSCREEN / NXTIONSTAR şeffaf ve ince panel seçenekleriyle perakende vitrin projelerini keşiften montaja yönetir. Şeffaf ürünlerde sabit liste fiyatı yoktur; fiyat yazılı teklifle verilir.",
    "Shopfront LED turns store glass into a media surface while optionally keeping products visible. ARLEDSCREEN / NXTIONSTAR transparent and slim panels cover retail window projects from survey to install. Transparent products have no fixed list price; they are priced in a written quote.",
  ),
  "poster-led-ekran": t(
    "Ayaklı dijital ekran, zemine oturan ve dikey formatta reklam ya da bilgilendirme gösteren ekrandır; poster LED ekran ve totem olarak iki ana tipte kurulur. Poster LED taşınabilir yapıdadır; totem iç veya dış mekânda tek ya da çift yüzlü çalışır. LED ve LCD ayaklı ekranlarda sabit liste fiyatı yayımlamıyoruz; ölçüye, ekran tipine ve adede göre yazılı teklif hazırlıyoruz.",
    "Poster LED replaces static posters with bright vertical digital surfaces. ARLEDSCREEN / NXTIONSTAR totems serve lobby, mall and outdoor wayfinding needs. Poster and totem screens have no fixed list price; we prepare a written quote by size, screen type and quantity.",
  ),
  "menuboard-dijital-menu": t(
    "Menuboard, kafe ve restoranlarda basılı menü panosunun yerini alan dijital menü ekranıdır; fiyat ve ürün görselleri birkaç dakika içinde güncellenir. ARLEDSCREEN iki seçenekle kurar: LED (kasa üstünde yatay iç mekân LED duvar ya da girişte dikey poster LED) veya LCD/TV tipi menü ekranı. Sabit bir menuboard fiyatı yayımlamıyoruz; ölçüye ve montaj şekline göre yazılı teklif hazırlıyoruz.",
    "A menu board replaces the printed menu panel with a digital screen; prices and product photos update within minutes. ARLEDSCREEN offers two options: LED (a horizontal indoor LED wall above the counter or a vertical poster LED at the entrance) or an LCD/TV-type menu screen. We do not publish a fixed menu board price; we prepare a written quote by size and installation.",
  ),
  "kiosk-ekran": t(
    "Kiosk ekran, kullanıcının dokunarak veya QR kod okutarak işlem yaptığı bağımsız bir bilgi ve self-servis noktasıdır. Tedarik ettiğimiz dokunmatik kiosklar 49, 55 ve 65 inç ölçülerindedir, Android veya Windows tabanlı seçilebilir ve iç mekân içindir. Dış mekân talepleri proje bazında değerlendirilir; fiyat yazılı teklifle verilir.",
    "A kiosk display is a standalone information and self-service point where users act by touch or QR code: wayfinding, ordering, ticketing or catalogues. ARLEDSCREEN plans enclosure, screen and software integration together; price is given in a written quote.",
  ),
  "kiosk-dijital-ekran": t(
    "Kiosk, etkileşimli bir dijital ekran noktasıdır; yönlendirme, bilet, katalog ve self-servis için kullanılır. ARLEDSCREEN projelerinde gövde, ekran teknolojisi ve yazılım entegrasyonu birlikte seçilir; NXTIONSTAR LED yüzeyler gerektiğinde totem veya duvarla kombine edilir.",
    "A kiosk is an interactive digital screen point for wayfinding, tickets, catalogues or self-service. ARLEDSCREEN selects enclosure, display technology and software integration together, combining NXTIONSTAR LED surfaces with totems or walls when needed.",
  ),
  "konferans-salonu-led": t(
    "Konferans salonunda LED ekranı iki mesafe belirler: ilk sıranın uzaklığı piksel aralığını, son sıranın uzaklığı ekran yüksekliğini. Sunum ağırlıklı salonlarda genellikle iç mekân P2.5, derin salonlarda P3.07 yeterlidir; ekran yüksekliği son sıra mesafesinin yaklaşık sekizde biri seçilir. LED ekran aydınlık salonda da net görünür ve karartma gerektirmez.",
    "Two distances decide a conference-hall LED screen: the front row sets the pixel pitch and the back row sets the screen height. For presentation-heavy halls indoor P2.5 is usually right and P3.07 suits deeper halls; screen height is about one eighth of the back-row distance. An LED screen stays sharp in a lit room with no blackout needed.",
  ),
  "okul-led-ekran": t(
    `Okulda LED ekran girişte duyuru panosu, koridorda bilgilendirme ekranı, bahçede tören ve etkinlik ekranı, konferans salonu ve amfide sunum ekranı olarak kullanılır. Öğrenciler ekrana genellikle 3 m ve daha uzaktan baktığı için iç mekânda P3.07 (${pp("p3-07-ic", "tr")}), amfide P2.5 (${pp("p2-5-ic", "tr")}), bahçe ve cephede dış mekân P4 (${pp("p4-dis", "tr")}) veya P5 (${pp("p5-dis", "tr")}) yeterlidir. Sınıf içi ve yakından izlenen küçük ekranlarda LCD veya etkileşimli ekran daha uygundur.`,
    `Schools use LED screens as entrance notice boards, corridor information screens, playground screens for ceremonies and events, and presentation screens in halls and lecture theatres. Indoors students usually look from 3 m or more, so P3.07 (${pp("p3-07-ic", "en")}) is enough; lecture theatres use P2.5 (${pp("p2-5-ic", "en")}), and playgrounds and façades use outdoor P4 (${pp("p4-dis", "en")}) or P5 (${pp("p5-dis", "en")}). Classrooms and small screens viewed up close are better served by LCD or interactive displays.`,
  ),
  "hastane-dijital-ekran": t(
    "Hastanede dijital ekran bekleme salonunda, poliklinik kapısında, giriş lobisinde, kafeterya ve koridorlarda ile bina cephesinde ve acil girişinde kullanılır. Kapı ve küçük bekleme alanlarında LCD ekran, geniş bekleme salonu, lobi ve cephede ölçüsü modülle büyütülebilen LED ekran uygundur. Mart 2026'da Lokman Hekim Hastanesi için 16 m² LED ekran projesini tamamladık.",
    "Hospitals use digital screens in waiting rooms, at clinic doors, in the entrance lobby, in cafeterias and corridors, and on the façade and emergency entrance. LCD suits doors and small waiting areas; LED, which grows by adding modules, suits large waiting halls, lobbies and façades. In March 2026 we completed a 16 m² LED screen project for Lokman Hekim Hospital.",
  ),
  "eczane-led-ekran": t(
    `Eczanede LED ekran vitrin arkasında, dış cephede, tezgâh arkasında raf üstünde ve girişte ayaklı ekran olarak kullanılır. İçeride P2.5 iç mekân (${pp("p2-5-ic", "tr")}), dış cephede dış mekân P4 (${pp("p4-dis", "tr")}) veya P5 (${pp("p5-dis", "tr")}) sık seçilir. Ekranda gösterilecek içerik, eczacılık meslek kuralları ve reklam mevzuatına uygun planlanmalıdır.`,
    `Pharmacies use LED screens behind the window, on the façade, above the shelves behind the counter and as a freestanding screen at the entrance. Indoor P2.5 (${pp("p2-5-ic", "en")}) is common inside, and outdoor P4 (${pp("p4-dis", "en")}) or P5 (${pp("p5-dis", "en")}) on the façade. Screen content must follow pharmacy professional rules and advertising regulations.`,
  ),
  "dugun-salonu-led": t(
    "Düğün salonunda LED ekran çoğunlukla sahnenin arkasına kurulur; gelin-damat girişi, fotoğraf ve video gösterisi, canlı çekim ve salon logosu bu ekranda oynar. Konuklar masalarda ekrandan genellikle 4 m ve daha uzakta oturduğu için iç mekân P3.07 veya P4 modüller yeterlidir; ekran yüksekliği en arka masanın uzaklığının yaklaşık sekizde biri seçilir.",
    "In a wedding hall the LED screen usually sits behind the stage and shows the couple's entrance, photo and video slideshows, live camera feed and the venue logo. Guests sit at tables usually 4 m or more from the screen, so indoor P3.07 or P4 modules are enough; screen height is about one eighth of the distance to the farthest table.",
  ),
  "cami-led-ekran": t(
    "Camiye LED ekran takılabilir; namaz vakitleri, hutbe metni, duyurular ve dini günler aynı ekranda gösterilebilir. En öndeki cemaatin ekrana uzaklığı piksel aralığını, en arkadaki saftın uzaklığı ekran büyüklüğünü belirler. Aynı kurallar kilise, cemevi ve diğer ibadethaneler için de geçerlidir.",
    "An LED screen can be installed in a mosque to show prayer times, the sermon text, announcements and religious days. The nearest worshipper sets the pixel pitch and the farthest row sets the screen size. The same rules apply to churches, cemevis and other places of worship.",
  ),
  "mimari-muhendislik-led": t(
    "LED yüzeyi yalnızca bir ekran değil; mimari kabuğun ve elektrik/mekanik sistemin parçasıdır. ARLEDSCREEN, mimar ve mühendislik ofisleriyle NXTIONSTAR ürünlerini statik, güç ve sinyal başlıklarında birlikte boyutlandırır.",
    "An LED surface is part of the building envelope and the electrical and mechanical systems. ARLEDSCREEN sizes NXTIONSTAR products together with architects and engineers across structure, power and signal.",
  ),
  "cnc-led-kasa": t(
    "CNC LED kasa, LED modüllerin, alıcı kartın ve güç kaynaklarının taşındığı, CNC veya lazer kesimle ölçüsünde üretilen ekran gövdesidir; sektörde kabin olarak da anılır. Kasa ölçüsü modül ölçüsünün katı olarak seçilir: 320 × 160 mm modüllü NXTIONSTAR ekranlarda gövde 32 cm ve 16 cm adımlarla büyür. Kasa tipi ve ölçüsü keşifte belirlenir; kasa fiyatı teklif üzerine verilir.",
    "A CNC LED cabinet is the display body that carries the LED modules, receiving card and power supplies, cut to size by CNC or laser. Cabinet size is a multiple of the module size: with 320 × 160 mm NXTIONSTAR modules, bodies grow in 32 cm and 16 cm steps. Cabinet type and size are chosen on survey; cabinet pricing is on quote.",
  ),
  "led-ekran-ariza-belirtileri": t(
    "LED ekran arızalarının çoğu belirtisinden tanınır: bir bölümün kararması çoğunlukla güç kaynağını veya alıcı kartı, titreme kablo ya da ayar sorununu, tek sırada çizgi veya renk bozulması modül ya da flat kabloyu işaret eder. Kesin teşhis yerinde ölçümle konur.",
    "Most LED screen faults can be recognised by their symptom: a dark area usually points to a power supply or receiving card, flicker to a cable or setting, and a line or wrong-coloured row to a module or ribbon cable. The final diagnosis is made on site by measurement.",
  ),
  "p1-86-vs-p2-5": (l) =>
    l === "tr"
      ? `İzleyici ekrana 2,5 m'den yakınsa ya da ekran kamerayla çekiliyorsa P1.86, 2,5 m ve üzeri mesafede P2.5 genellikle yeterlidir; her 1 mm piksel aralığı yaklaşık 1 m minimum izleme mesafesine karşılık gelir. Yayımlanmış listemizde P1.86 GOB ${pp("p1-86-ic-gob", l)} (≈${m2("p1-86-ic-gob", l)} USD/m² modül bedeli), iç mekân P2.5 ${pp("p2-5-ic", l)} (≈${m2("p2-5-ic", l)} USD/m²) olarak yer alır; KDV ve nakliye hariçtir.`
      : `If viewers are closer than 2.5 m or the screen will be filmed, choose P1.86; from 2.5 m and beyond P2.5 is usually enough. Roughly, each 1 mm of pixel pitch equals about 1 m of minimum viewing distance. On our published list P1.86 GOB is ${pp("p1-86-ic-gob", l)} (≈ USD ${m2("p1-86-ic-gob", l)}/m² module cost) and indoor P2.5 is ${pp("p2-5-ic", l)} (≈ USD ${m2("p2-5-ic", l)}/m²), VAT and shipping excluded.`,
  "kamera-yayin-icin-led-ekran": t(
    "Kamerayla çekilecek bir LED ekranda üç şey belirleyicidir: yüksek yenileme hızı, kamera mesafesine uygun piksel aralığı ve doğru kamera ayarları. Düşük yenileme hızı çekimde yatay çizgi ve titreme yapar; moiré piksel aralığı, odak ve kamera mesafesiyle ilgilidir. Modelin yenileme hızı yazılı teklifle birlikte teknik föyde belirtilir.",
    "Three things decide how an LED screen looks on camera: a high refresh rate, a pixel pitch suited to the camera distance and correct camera settings. A low refresh rate shows as lines and flicker; moiré depends on pitch, focus and camera distance. The model's refresh rate is listed in the datasheet sent with the written quote.",
  ),
  "led-ekran-omru-ve-bakim": t(
    "LED ekranın ömrü kullanım saatine, parlaklık ayarına, ısıya, toza, neme ve elektrik kalitesine bağlıdır. Ömrü boyunca tek tek LED veya modül arızası normaldir ve modül değişimiyle giderilir; önden bakımlı modüller duvardan sökülmeden değiştirilebilir. Garanti ve servis koşulları yazılı teklifte belirtilir.",
    "An LED screen's lifetime depends on operating hours, brightness setting, heat, dust, humidity and power quality. Single LED or module faults during the screen's life are normal and are fixed by replacing the module; front-service modules can be swapped without removing the screen from the wall. Warranty and service terms are set out in the written quote.",
  ),
  "tasinabilir-p1-86-led-ekran": (l) =>
    l === "tr"
      ? `Düğün videosu ve stüdyo çekimi için taşınabilir iç mekân ekranda P1.86 GOB, yaklaşık 2 m ve üzeri mesafede pikseli belli etmez; GOB kaplama taşıma ve kurulumda modülleri darbeye karşı korur. NXTIONSTAR P1.86 GOB modülün liste fiyatı ${pp("p1-86-ic-gob", l)} (≈${m2("p1-86-ic-gob", l)} USD/m² modül bedeli, KDV ve nakliye hariç); kasa, taşıma çantası ve kontrolcü projeye göre tekliflendirilir.`
      : `For wedding videos and studio shoots, a portable indoor P1.86 GOB screen looks seamless from about 2 m, and the GOB coating protects modules from knocks in transport and setup. The NXTIONSTAR P1.86 GOB module lists at ${pp("p1-86-ic-gob", l)} (≈ USD ${m2("p1-86-ic-gob", l)}/m² module cost, VAT and shipping excluded); cabinet, flight case and controller are quoted per project.`,
  // Arama listesi 16.10.2026 (dev ekran, tekerlekli mobil ekran, tabela ekran, P1–P4 serileri)
  "dev-led-ekran": (l) =>
    l === "tr"
      ? `Dev ekran, bina cephesi, meydan ve otel girişi gibi geniş yüzeylerde uzaktan izlenen büyük boy dış mekân LED ekrandır; modüllerle kurulduğu için ölçüsü yüzeye göre belirlenir. Uzak cephelerde P5 (${pp("p5-dis", l)}) veya P4 (${pp("p4-dis", l)}), yaya trafiğine yakın cephelerde P3.07 (${pp("p3-07-dis", l)}) değerlendirilir; fiyatlar KDV ve nakliye hariçtir. Taşıyıcı sistem, montaj ve kesin tutar keşiften sonra yazılı teklifle belirlenir.`
      : `A giant display is a large-format outdoor LED screen on a wide surface such as a building façade, square or hotel entrance, watched from far away; it is built from modules, so its size follows the surface. For distant façades P5 (${pp("p5-dis", l)}) or P4 (${pp("p4-dis", l)}) is considered, for façades close to foot traffic P3.07 (${pp("p3-07-dis", l)}); prices exclude VAT and shipping. Structure, installation and the final amount are set in a written quote after survey.`,
  "tekerlekli-mobil-led-ekran": (l) =>
    l === "tr"
      ? `Tekerlekli taşınabilir mobil ekran, gerektiğinde bir yerden başka yere götürülen LED ekrandır. ARLEDSCREEN üç biçim sunar: tekerlekli özel form LED ekran (ör. kavisli podyum veya banko), taşınabilir poster LED ve ayaklı ekran, söküp takılabilen taşınabilir modüler duvar. Taşınabilir duvarda P1.86 GOB ${pp("p1-86-ic-gob", l)} (KDV ve nakliye hariç); kabin, kasa, tekerlekli şasi ve kontrolcü yazılı teklifle verilir.`
      : `A wheeled portable mobile screen is an LED screen that is moved from place to place when needed. ARLEDSCREEN offers three forms: a wheeled custom-form LED screen (for example a curved podium or counter), portable poster LED and freestanding screens, and a portable modular wall that can be taken down and set up again. For a portable wall P1.86 GOB is ${pp("p1-86-ic-gob", l)} (VAT and shipping excluded); cabinet, case, wheeled base and controller are given in a written quote.`,
  "tabela-ekran": (l) =>
    l === "tr"
      ? `Tabela ekran, işyeri cephesinde klasik tabelanın yerini alan veya onu tamamlayan LED ekrandır. Yalnızca kısa metin ya da fiyat gösterecekseniz kayan yazı LED tabela yeterli olabilir; logo, ürün görseli ve video için tam renkli LED ekran gerekir. Dış cephede P4 (${pp("p4-dis", l)}) ve P5 (${pp("p5-dis", l)}) sık seçilir; fiyatlar KDV ve nakliye hariçtir. Dış mekân ekranlarda belediye izin koşulları geçerli olabilir.`
      : `A sign display is an LED screen that replaces or complements the classic sign on a business façade. For short text or prices only, a scrolling LED sign may be enough; for logos, product images and video you need a full-colour LED screen. On façades P4 (${pp("p4-dis", l)}) and P5 (${pp("p5-dis", l)}) are common choices; prices exclude VAT and shipping. Municipal permit rules may apply to outdoor screens.`,
  "p-serisi-led-ekran": (l) =>
    l === "tr"
      ? `P değeri iki LED pikseli arasındaki mesafeyi milimetre olarak gösterir. P1 serisi (P1.25, P1.53, P1.86 iç mekân GOB) çok yakın izleme, P2 serisi (P2.5, P2.9) ve P3 serisi (P3.07) orta mesafe, P4 serisi daha uzak izleme içindir. Yayımlanmış panel fiyatları iç mekânda ${rng("ic", l)} USD, dış mekânda ${rng("dis", l)} USD arasındadır (panel başına, KDV ve nakliye hariç). P2.0 ve P3.91 ürün hattımızda yoktur.`
      : `The P value is the distance between two LED pixels in millimetres. The P1 series (P1.25, P1.53, P1.86 indoor GOB) is for very close viewing, the P2 series (P2.5, P2.9) and P3 series (P3.07) for medium distances, the P4 series for longer viewing. Published panel prices are USD ${rng("ic", l)} indoors and USD ${rng("dis", l)} outdoors (per panel, VAT and shipping excluded). P2.0 and P3.91 are not in our line-up.`,
  "led-ekran-kurulumu": t(
    "Bir LED ekranın kurulumu iki bölümden oluşur: önce fiziksel montaj ve kablolama, ardından kontrol sisteminin bilgisayardan ya da telefondan ayarlanması. Sıra şöyledir: hazırlık, montaj, güç ve veri kablolaması, ilk çalıştırma, tarama dosyası, ekran bağlantısı, içerik ve ayarlar. Güç bağlantısını yetkili bir elektrikçi yapmalıdır.",
    "Installing an LED display has two parts: the physical mounting and cabling, and then setting up the control system from a computer or phone. The order is preparation, mounting, power and data cabling, first power-on, scan file, screen connection, then content and settings. Have a licensed electrician connect the power supplies.",
  ),
  "huidu-led-ekran-kurulumu": t(
    "Huidu kontrol kartlı bir LED ekranda iki programla çalışılır: bilgisayarda HDPlayer, telefonda LedArt. Sıra şöyledir: programı kurmak, karta bağlanmak, tarama dosyasını yüklemek, ekranı oluşturmak, içerik göndermek, parlaklık, saat ve zamanlama ayarlarını tamamlamak; varsayılan şifreler değiştirilmelidir.",
    "A Huidu-controlled LED display uses two programs: HDPlayer on the computer and LedArt on the phone. The order is to install the software, connect to the card, load the scan file, create the screen, send content, then set brightness, time and schedules; change the default passwords.",
  ),
  "novastar-led-ekran-kurulumu": t(
    "NovaStar sistemlerinde ekran ayarı NovaLCT ile, içerik hazırlama ve yayın ViPlex Express (bilgisayar) ve ViPlex Handy (telefon) ile yapılır. Sıra şöyledir: NovaLCT'yi kurmak, gönderici karta bağlanmak, alıcı kart dosyasını yüklemek, ekran bağlantısını kurmak, ayarları kalıcı kaydetmek ve içeriği yayınlamak.",
    "On NovaStar systems, NovaLCT configures the screen, while ViPlex Express (computer) and ViPlex Handy (phone) prepare and publish content. The order is to install NovaLCT, connect to the sending card, load the receiving-card file, set the screen connection, save settings permanently and publish content.",
  ),
};

export function guideShortAnswer(slug: string, l: L): string | null {
  const f = (GUIDE_SHORT_ANSWERS as Record<string, Pair | undefined>)[slug];
  return f ? f(l) : null;
}

/** Guides rendered by the shared rehber templates that get the block (rental guide excluded). */
export const GUIDES_WITH_SHORT_ANSWER = Object.keys(GUIDE_SHORT_ANSWERS);

/** EN commercial guides (TR twins already carry a "Kısa cevap" paragraph in their markdown). */
export const EN_COMMERCIAL_GUIDE_SHORT_ANSWERS: Record<string, string> = {
  "piksel-araligi-secimi":
    "Start from the closest critical viewer: roughly 1 m of distance per 1 mm of pixel pitch (P2.5 ≈ 2.5 m). Then consider size, content type and budget. ARLEDSCREEN indoor modules span P1.25–P4; published panel prices are on our price list, and the final project price follows the survey.",
  "gob-vs-smd":
    "SMD is the common diode package; GOB (Glue on Board) adds a protective layer over the surface for close-view indoor use. P1.25, P1.53 and P1.86 GOB panel prices are published on our price list; final scope is confirmed in a written quote after survey.",
  "led-tabela-mi-led-ekran-mi":
    "“Digital screen” is the upper set: LCD, OLED, LED sign, video wall and full-colour LED. Scrolling LED signs are often text-first, while full-colour LED walls scale by modules and play video, which is ARLEDSCREEN's core offer. Panel prices are on our price list.",
};

const SALES_TR = (l: L) =>
  `LED ekran satışı; kullanım amacına, izleme mesafesine ve montaj yüzeyine göre doğru piksel aralığının ve panel tipinin seçilmesidir. ARLEDSCREEN, kendi markası NXTIONSTAR'ın iç mekân, dış mekân, GOB ve esnek serilerini Huidu, NovaStar veya Colorlight kontrol hattıyla aynı teklifte sunar. Yayımlanmış panel fiyatları iç mekânda ${rng("ic", l)} USD, dış mekânda ${rng("dis", l)} USD arasındadır (panel başına, KDV ve nakliye hariç); nihai tutar keşif sonrası yazılı teklifle kesinleşir. ${DELIVERY_TR}`;
const SALES_EN = (l: L) =>
  `LED display sales is choosing the right pixel pitch and panel type for the use case, viewing distance and install surface. ARLEDSCREEN offers its own NXTIONSTAR indoor, outdoor, GOB and flexible series with Huidu, NovaStar or Colorlight control planned in the same quote. Published panel prices are USD ${rng("ic", l)} indoor and USD ${rng("dis", l)} outdoor per panel, excluding VAT and shipping; the final amount is confirmed in a written quote after survey. ${DELIVERY_EN}`;

/** Commercial landing + about page short answers (TR + EN). */
export function pageShortAnswer(key: "satis" | "about", l: L): string {
  if (key === "satis") return l === "tr" ? SALES_TR(l) : SALES_EN(l);
  return l === "tr"
    ? "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Firma LED ekran satışı ile keşif, montaj ve teknik servis sunar; kurucu Aras Bozkurt'tur. İletişim: +90 530 507 88 34, arled@arledscreen.com."
    : "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa)–based LED display company. NXTIONSTAR is its own product brand, and ARLEDSCREEN is the sole sales point in Turkey. The company sells LED displays and provides survey, installation and technical service; the founder is Aras Bozkurt. Contact: +90 530 507 88 34, arled@arledscreen.com.";
}
