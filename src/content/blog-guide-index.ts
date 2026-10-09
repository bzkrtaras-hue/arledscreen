/**
 * Blog index → "Rehber" listing (index data only; blog posts in blog.ts stay untouched).
 * Teasers are written for the blog listing, not copied from the guide intros.
 */
export interface BlogGuideLink {
  href: string;
  label: string;
  teaser: string;
}

const TR: BlogGuideLink[] = [
  { href: "/tr/rehber/led-ekran-kurulumu/", label: "LED ekran kurulumu adım adım", teaser: "Ekranı duvara asmaktan ilk görüntüye: kablolama, tarama dosyası ve yönetim programlarıyla kurulumun doğru sırası." },
  { href: "/tr/rehber/huidu-led-ekran-kurulumu/", label: "Huidu ile kurulum ve yönetim", teaser: "HDPlayer'da kartı bulma, tarama dosyası, içerik gönderme; telefondan LedArt ile yönetim ve zamanlama." },
  { href: "/tr/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar ile kurulum ve yönetim", teaser: "NovaLCT'de alıcı kart dosyası ve kart sırası; ViPlex Express, ViPlex Handy ve VNNOX ile içerik yayını." },
  { href: "/tr/rehber/dijital-ekran/", label: "Dijital ekran nedir, nereden alınır?", teaser: "“Dijital ekran” denince akla gelen tüm türleri tek yerde topladık; doğru ekranı nereden ve nasıl alacağınızı da adım adım yazdık." },
  { href: "/tr/rehber/ekran-cesitleri/", label: "Ekran çeşitleri", teaser: "LCD, LED tabela, tam renkli LED, GOB, esnek, şeffaf… Ekran türlerini kullanım yerine göre karşılaştıran kısa bir harita." },
  { href: "/tr/rehber/lcd-ekran/", label: "LCD ekran", teaser: "Menü ya da duyuru için hazır ölçülü bir ekran yeter mi, yoksa LED mi gerekir? İnç seçiminden mekâna kadar LCD tarafını sade bir dille anlattık." },
  { href: "/tr/rehber/menuboard-dijital-menu/", label: "Menuboard / dijital menü ekranı", teaser: "Kafe ve restoranda menüyü dijitale taşırken LED mi LCD mi, kaç inç, kasa arkası mı ayaklı mı? Karar verirken işinize yarayacak notlar." },
  { href: "/tr/rehber/kiosk-ekran/", label: "Kiosk ekran", teaser: "Dokunmatik kiosk nerede işe yarar, hangi ölçüde seçilir, iç ve dış mekânda ne değişir? Kısa bir seçim rehberi." },
  { href: "/tr/rehber/cnc-led-kasa/", label: "CNC LED kasa", teaser: "LED ekranın görünmeyen iskeleti: sac, alüminyum ve döküm kasa arasındaki farklar ve en çok kullanılan kasa ölçüleri." },
  { href: "/tr/led-ekran-tamiri/", label: "LED ekran tamiri", teaser: "Sönen modül, renk farkı ya da kararan bir köşe mi var? Arızanın olası kaynaklarını ve tamir sürecinin nasıl işlediğini anlattık." },
  { href: "/tr/rehber/led-ekran/", label: "LED ekran nedir, nasıl seçilir?", teaser: "LED ekrana yeni başlayanlar için: nasıl çalıştığı ve doğru ekranı seçmek için sorulması gereken üç temel soru." },
  { href: "/tr/rehber/ic-mekan-led-ekran/", label: "İç mekân LED ekran", teaser: "Salon, mağaza ya da toplantı odasında yakından izlenen ekranlarda piksel aralığı nasıl seçilir, nelere dikkat edilir?" },
  { href: "/tr/rehber/dis-mekan-led-ekran/", label: "Dış mekân LED ekran", teaser: "Güneşe, yağmura ve uzaktan izlenmeye dayanması gereken cephe ve billboard ekranlarında öne çıkan noktalar." },
  { href: "/tr/rehber/poster-led-ekran/", label: "Ayaklı dijital ekran: poster LED ve totem", teaser: "Mağaza girişi ya da lobi için ayaklı ekran arıyorsanız poster LED ve totem seçeneklerini yan yana koyduk." },
];

const EN: BlogGuideLink[] = [
  { href: "/en/rehber/led-ekran-kurulumu/", label: "LED display installation step by step", teaser: "From hanging the screen to the first image: the right order for cabling, the scan file and management apps." },
  { href: "/en/rehber/huidu-led-ekran-kurulumu/", label: "Huidu setup and management", teaser: "Finding the card in HDPlayer, the scan file, sending content; managing and scheduling from a phone with LedArt." },
  { href: "/en/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar setup and management", teaser: "Receiving-card file and card order in NovaLCT; publishing content with ViPlex Express, ViPlex Handy and VNNOX." },
  { href: "/en/rehber/dijital-ekran/", label: "What is a digital display?", teaser: "Every kind of screen people mean by “digital display”, in one place — plus a step-by-step note on where and how to buy one." },
  { href: "/en/rehber/ekran-cesitleri/", label: "Types of displays", teaser: "LCD, LED signs, full-colour LED, GOB, flexible, transparent… a short map comparing display types by where they are used." },
  { href: "/en/rehber/lcd-ekran/", label: "LCD displays", teaser: "Is a fixed-size screen enough for a menu or notice, or do you need LED? The LCD side explained simply, from inch size to location." },
  { href: "/en/rehber/menuboard-dijital-menu/", label: "Digital menu boards", teaser: "Moving a café or restaurant menu to screens: LED or LCD, what size, counter wall or freestanding? Notes to help you decide." },
  { href: "/en/rehber/kiosk-ekran/", label: "Kiosk displays", teaser: "Where a touch kiosk helps, which size to pick and what changes indoors vs outdoors — a short selection guide." },
  { href: "/en/rehber/cnc-led-kasa/", label: "CNC LED cabinets", teaser: "The hidden frame of an LED screen: steel, aluminium and die-cast cabinets compared, with the most common sizes." },
  { href: "/en/led-ekran-tamiri/", label: "LED display repair", teaser: "A dead module, colour mismatch or a dark corner? Likely causes and how the repair process works." },
  { href: "/en/rehber/led-ekran/", label: "What is an LED display?", teaser: "For newcomers: how LED screens work and the three questions to ask when choosing one." },
  { href: "/en/rehber/ic-mekan-led-ekran/", label: "Indoor LED displays", teaser: "How to pick pixel pitch for screens viewed up close in living rooms, shops and meeting rooms." },
  { href: "/en/rehber/dis-mekan-led-ekran/", label: "Outdoor LED displays", teaser: "What matters for façade and billboard screens that face sun, rain and long viewing distances." },
  { href: "/en/rehber/poster-led-ekran/", label: "Freestanding displays: poster LED and totems", teaser: "Looking for a freestanding screen for an entrance or lobby? Poster LED and totem options side by side." },
];

export const blogGuideLinks = (locale: "tr" | "en"): BlogGuideLink[] => (locale === "en" ? EN : TR);
