import type { ProductGroup } from "@/content/categories";
import { getProductGroup, PRODUCT_GROUPS } from "@/content/categories";

/** EN overlay fields for product group landings under `/en/products/<slug>/`. */
export type ProductGroupEn = Pick<
  ProductGroup,
  "slug" | "name" | "h1" | "lead" | "title" | "description" | "short" | "tag" | "imageAlt"
> & {
  intro: string[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
  /** When true, group has no published panel USD — quote-only. */
  quoteOnly?: boolean;
};

const EN: Record<string, Omit<ProductGroupEn, "slug">> = {
  "ic-mekan-led-ekran": {
    name: "Indoor LED display",
    h1: "Indoor LED display",
    lead: "Sharp, seamless image at close viewing distance",
    title: "Indoor LED Display Models | ARLEDSCREEN",
    description:
      "Indoor LED for stores, cafés, showrooms and meeting halls: pitch selection, survey, install and service. NXTIONSTAR by ARLEDSCREEN — Istanbul.",
    short: "Indoor LED walls for close viewing",
    tag: "Indoor",
    imageAlt: "Indoor LED display wall installation",
    intro: [
      "Indoor LED is chosen for viewing distance, content type and ambient light — not a single fixed m² price.",
      "Published NXTIONSTAR indoor panel USD (including GOB options) is on our price list. Final amount is confirmed after survey in a written quote. No free shipping.",
    ],
    highlights: [
      "Pitch matched to closest critical viewer",
      "Panel USD published for planning; install quote after survey",
      "Huidu / NovaStar / Colorlight control planned with the wall",
    ],
    faqs: [
      {
        question: "Where are indoor panel USD prices?",
        answer:
          "Indoor and GOB panel prices are on our price list at /en/led-ekran-fiyatlari/. VAT and freight excluded; no free shipping.",
      },
    ],
  },
  "dis-mekan-led-ekran": {
    name: "Outdoor LED display",
    h1: "Outdoor LED display",
    lead: "Façade, totem and billboard LED for daylight viewing",
    title: "Outdoor LED Display Models | ARLEDSCREEN",
    description:
      "Outdoor LED for façades, totems and billboards: pitch, structure and install survey. NXTIONSTAR by ARLEDSCREEN — Gaziosmanpaşa, Istanbul.",
    short: "Outdoor LED for façades and totems",
    tag: "Outdoor",
    imageAlt: "Outdoor LED façade installation",
    intro: [
      "Outdoor LED needs brightness, weather protection and structure design alongside pitch.",
      "Published outdoor panel USD is on our price list; structure, shipping and VAT are quote lines. No free shipping.",
    ],
    highlights: [
      "Outdoor-rated planning after site survey",
      "Published panel USD for P2.5–P5 band",
      "Install + calibration in the same quote when requested",
    ],
    faqs: [
      {
        question: "Are outdoor panels on the price list?",
        answer:
          "Yes — outdoor panels such as P2.5–P5 are on our price list. Structure and install are not in that list; they appear in the written quote.",
      },
    ],
  },
  "gob-led-ekran": {
    name: "GOB LED display",
    h1: "GOB LED display",
    lead: "Protective GOB surface for close indoor viewing",
    title: "GOB LED Display | P1.25–P1.86 Panel Prices | ARLEDSCREEN",
    description:
      "GOB (Glue on Board) LED for close indoor viewing. Published P1.25–P1.86 panel USD on our price list. ARLEDSCREEN / NXTIONSTAR — Istanbul.",
    short: "GOB fine-pitch indoor LED",
    tag: "GOB",
    imageAlt: "GOB LED module surface",
    intro: [
      "GOB adds a protective resin layer over the diodes — useful for lobbies, control rooms and close-view retail.",
      "Example: P1.25 GOB 95.88 USD per panel, prices valid until 31 Dec 2026. Full list: /en/led-ekran-fiyatlari/.",
    ],
    highlights: [
      "Published GOB panel USD (P1.25, P1.53, P1.86)",
      "Indoor close-view use cases",
      "Survey before final pitch and size",
    ],
    faqs: [
      {
        question: "What is the P1.25 GOB panel USD?",
        answer:
          "95.88 USD per panel on our price list (excl. VAT/shipping; no free shipping). Price page: /en/led-ekran-fiyatlari/.",
      },
    ],
  },
  "kiralik-led-ekran": {
    name: "Rental LED display",
    h1: "Rental LED display",
    lead: "Stage, fair and event cabinets — USD 50 per m² per day",
    title: "Rental LED Display | Stage & Events | ARLEDSCREEN",
    description:
      "Rental LED for stage, fair and events. USD 50 per m² per day. ARLEDSCREEN install and strike support — Istanbul.",
    short: "Rental LED for events",
    tag: "Rental",
    imageAlt: "LED screen on a concert stage with the audience",
    quoteOnly: true,
    intro: [
      "Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
      "For ownership planning, use published purchase panel USD on /en/led-ekran-fiyatlari/.",
    ],
    highlights: ["Quote by days and m²", "Install + strike plan", "Purchase option on our price list"],
    faqs: [
      {
        question: "Is rental on the price list?",
        answer:
          "Our price list covers purchase panels. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
      },
    ],
  },
  "esnek-led-ekran": {
    name: "Flexible LED display",
    h1: "Flexible LED display",
    lead: "Curved and custom-form LED surfaces — priced by written quote",
    title: "Flexible LED Display | Curves & Custom Forms | ARLEDSCREEN",
    description:
      "Flexible LED for curved and custom surfaces. Priced by written quote. NXTIONSTAR / ARLEDSCREEN — Istanbul survey and install.",
    short: "Flexible / curved LED",
    tag: "Flexible",
    imageAlt: "Flexible LED module bent into a curve",
    quoteOnly: true,
    intro: [
      "Flexible modules suit curves and irregular forms. There is no fixed published USD list for this group — written quote after survey.",
    ],
    highlights: ["Custom form planning", "Survey required", "Priced by written quote — not on the price list"],
    faqs: [
      {
        question: "Why is flexible LED priced by written quote?",
        answer:
          "Curve radius, cabinet mix and install labour vary too much for a fixed panel list. Use /en/quote/ after sharing drawings or photos.",
      },
    ],
  },
  "seffaf-led-ekran": {
    name: "Transparent LED display",
    h1: "Transparent LED display",
    lead: "Window and glass-line LED with see-through area — priced by written quote",
    title: "Transparent LED Display | Window / Glass | ARLEDSCREEN",
    description:
      "Transparent LED for shop windows and glass lines. Priced by written quote. ARLEDSCREEN survey and install — Istanbul.",
    short: "Transparent window LED",
    tag: "Transparent",
    imageAlt: "Transparent LED on glass",
    quoteOnly: true,
    intro: [
      "Transparent / see-through LED keeps daylight and window merchandising visible. Pricing is project-specific (priced by written quote).",
    ],
    highlights: ["Glass-line applications", "Transparency vs pitch trade-off", "Priced by written quote"],
    faqs: [
      {
        question: "Is transparent LED in the published 12-panel price list?",
        answer:
          "No. Transparent LED is priced by written quote. The 12 listed panel models are indoor/outdoor/GOB purchase modules.",
      },
    ],
  },
  "transparan-led-ekran": {
    name: "Transparent mesh LED",
    h1: "Transparent mesh LED display",
    lead: "Mesh / media-façade LED for building exteriors — priced by written quote",
    title: "Transparent Mesh LED | Media Façade | ARLEDSCREEN",
    description:
      "Mesh / transparent façade LED for buildings. Priced by written quote after survey. ARLEDSCREEN — Istanbul.",
    short: "Mesh façade LED",
    tag: "Mesh",
    imageAlt: "Transparent mesh LED façade",
    quoteOnly: true,
    intro: [
      "Mesh LED balances media impact with wind load and transparency. Scope and price are written after survey — not on our price list.",
    ],
    highlights: ["Façade media use", "Engineering after survey", "Priced by written quote"],
    faqs: [
      {
        question: "Mesh vs window transparent LED?",
        answer:
          "Window transparent units suit retail glass; mesh suits large façades. We confirm the right system after site photos and goals.",
      },
    ],
  },
  "ince-pitch-led-ekran": {
    name: "Fine-pitch LED display",
    h1: "Fine-pitch LED display",
    lead: "Close-view fine pitch including GOB options",
    title: "Fine-Pitch LED Display | Close Viewing | ARLEDSCREEN",
    description:
      "Fine-pitch indoor LED for close viewing. GOB panel prices (USD) are on our price list. ARLEDSCREEN / NXTIONSTAR — Istanbul.",
    short: "Fine-pitch indoor LED",
    tag: "Fine pitch",
    imageAlt: "Fine-pitch LED module",
    intro: [
      "Fine pitch is for short viewing distances (control rooms, lobbies, premium retail).",
      "Published GOB panel USD (e.g. P1.25) is on our price list; some ultra-fine options remain datasheet + quote.",
    ],
    highlights: ["Close-view planning", "GOB prices published", "Survey for final pitch"],
    faqs: [
      {
        question: "Which fine-pitch prices are published?",
        answer:
          "GOB P1.25 / P1.53 / P1.86 panel USD are on our price list. Other fine-pitch models are priced by written quote — ask via /en/quote/.",
      },
    ],
  },
  "dijital-ekran": {
    name: "Digital display",
    h1: "Digital displays: LED and LCD options",
    lead: "Screens whose content changes in software; LED or LCD as needed",
    title: "Digital Displays: Sale & Installation | ARLEDSCREEN",
    description:
      "Digital displays for stores, lobbies, cafés and offices: LCD/TV-type screens, touch kiosks, menu boards and LED. Sale, installation, repair and written quote. Istanbul.",
    short: "LCD/TV-type screens, kiosks, menu boards and LED from one team",
    tag: "Digital",
    imageAlt: "LED wall and two freestanding digital screens in a library hall",
    quoteOnly: true,
    intro: [
      "A digital display is any screen whose content you change in software instead of reprinting. LCD/TV-type panels, touch kiosks, menu boards, freestanding totems and modular LED walls all belong here.",
      "The right type depends on where the screen goes, how far away people stand and how big it needs to be. For one screen viewed up close, a fixed-size LCD is often enough; for a large, bezel-free or sunlit surface, LED leads. We sell, install and service both.",
    ],
    highlights: [
      "LED and LCD from the same team",
      "Indoor LCD most often 43 to 85 inch",
      "2-year warranty + 5 years of free technical service",
      "Priced by written quote; we also repair LCD, kiosk and menu-board screens",
    ],
    faqs: [
      {
        question: "Is a digital display the same as an LED display?",
        answer: "No. LED is one type of digital display; LCD/TV-type panels, kiosks and menu boards are digital displays too. We choose with you based on size, viewing distance and ambient light.",
      },
      {
        question: "Do you repair digital displays?",
        answer: "Yes. Besides LED, we diagnose and repair LCD, kiosk and menu-board screens.",
      },
      {
        question: "Are prices published?",
        answer: "No. This group is priced by written quote once type, size, quantity and mounting are clear. Published prices on our site cover NXTIONSTAR LED panels only.",
      },
    ],
  },
  menuboard: {
    name: "Menu board",
    h1: "Menu boards: digital menu screens",
    lead: "Replace printed menus with a screen you update in minutes",
    title: "Menu Board Screens: Sale & Installation | ARLEDSCREEN",
    description:
      "Menu boards for cafés and restaurants: LED menu walls above the counter, LCD/TV-type menu screens and freestanding portrait menus. Sale, installation, repair and written quote.",
    short: "LED menu walls, LCD menu screens and freestanding portrait menus",
    tag: "Menu board",
    imageAlt: "Indoor LED screen installed in a café-restaurant",
    quoteOnly: true,
    intro: [
      "A menu board shows your menu, prices and promotions above the counter or at the entrance. When a price or product changes, you update it in minutes without reprinting.",
      "We build them two ways. LCD/TV-type screens come in fixed sizes and are placed side by side, usually 43 to 55 inch behind the counter. An LED menu wall is built from modules to fit the wall and gives one bezel-free surface that reads from a distance. At the entrance, 49, 55 or 65-inch portrait units or a poster LED are common.",
    ],
    highlights: [
      "LED or LCD, chosen on site",
      "Landscape above the counter or freestanding portrait",
      "2-year warranty + 5 years of free technical service",
      "Priced by written quote; we also repair menu-board screens",
    ],
    faqs: [
      {
        question: "LED or LCD for a menu board?",
        answer: "Side-by-side LCD screens are practical but leave bezels between them. For one seamless surface that reads well in a bright room, an LED menu wall fits better. We decide on site based on the space.",
      },
      {
        question: "Who updates the menu?",
        answer: "You do. At handover we set up the software, screen settings and the upload method (USB, Wi-Fi or local network) and give a short training.",
      },
      {
        question: "Are prices published?",
        answer: "No. Menu boards are priced by written quote based on size, type and mounting.",
      },
    ],
  },
  kiosk: {
    name: "Kiosk",
    h1: "Kiosks: touch information and self-service points",
    lead: "A screen people touch to get information or complete a task",
    title: "Touch Kiosks: Sale & Installation | ARLEDSCREEN",
    description:
      "Touch kiosks in 49, 55 and 65 inch, Android or Windows, for wayfinding, information, ordering and catalogues. Sale, installation, repair and written quote. Istanbul.",
    short: "49, 55 and 65-inch touch kiosks, Android or Windows",
    tag: "Kiosk",
    imageAlt: "Two 49-inch touch digital kiosks on floor stands",
    quoteOnly: true,
    intro: [
      "A kiosk is a standalone point where people touch the screen or scan a QR code to get information or complete a task. Totems and posters mostly broadcast one way; a kiosk is interactive.",
      "The freestanding touch kiosks we supply come in 49, 55 and 65 inch and run Android or Windows. They play video, images and sound, and content changes via USB, HDMI, LAN or Wi-Fi. These units are for indoor spaces; outdoor kiosk requests are assessed per project.",
    ],
    highlights: [
      "49, 55 and 65-inch touch screen",
      "Android or Windows",
      "USB, HDMI, LAN and Wi-Fi",
      "2-year warranty + 5 years of free technical service",
    ],
    faqs: [
      {
        question: "What sizes are available?",
        answer: "We supply freestanding touch kiosks in 49, 55 and 65 inch and help you choose by viewing distance and space.",
      },
      {
        question: "Can a kiosk be used outdoors?",
        answer: "The units we supply are for indoor use. Outdoor use needs a sealed enclosure, high brightness and climate control; we assess such requests per project.",
      },
      {
        question: "Do you repair kiosks?",
        answer: "Yes. We diagnose and repair kiosk, LCD and menu-board screens. Pricing for this group is by written quote.",
      },
    ],
  },
  "lcd-ekran": {
    name: "LCD display",
    h1: "LCD display: touch kiosks and freestanding screens",
    lead: "Single-panel, fixed-size screens for close viewing",
    title: "LCD Displays: Kiosks & Floor Screens | ARLEDSCREEN",
    description:
      "49, 55 and 65-inch touch LCD kiosks, Android or Windows. Content via USB, HDMI, LAN and Wi-Fi. Sale, installation and written quote from ARLEDSCREEN, Istanbul.",
    short: "Touch kiosks and freestanding LCD screens, 49 to 65 inch",
    tag: "LCD",
    imageAlt: "55-inch portrait LCD digital screen on a floor stand",
    quoteOnly: true,
    intro: [
      "An LCD is a single panel made in a fixed factory size. Unlike modular LED, it is used at the size it ships in, which makes it a practical choice for one screen viewed up close.",
      "For freestanding touch kiosks we supply 49, 55 and 65-inch sizes, running Android or Windows. They play video, images and sound and can show online content when connected. Model and size are confirmed in a written quote; LCD is not on our published LED panel price list.",
    ],
    highlights: [
      "49, 55 and 65-inch touch kiosks",
      "Android or Windows",
      "USB, HDMI, LAN and Wi-Fi",
      "Priced by written quote; installation by our team",
    ],
    faqs: [
      {
        question: "What sizes do the LCD kiosks come in?",
        answer: "We supply freestanding touch kiosks in 49, 55 and 65 inches. We help you choose by viewing distance and the space available.",
      },
      {
        question: "Android or Windows?",
        answer: "Both play video, images and sound. If your software needs a specific operating system, we pick accordingly; otherwise describe your use case and we will recommend one with the quote.",
      },
      {
        question: "Are LCD prices published?",
        answer: "No. LCD screens are priced by written quote once size, operating system and quantity are clear. Published prices on our site cover NXTIONSTAR LED panels only.",
      },
    ],
  },
  "poster-led-ekran": {
    name: "Poster / totem LED",
    h1: "Poster and totem LED display",
    lead: "Freestanding poster and totem LED — priced by written quote",
    title: "Poster / Totem LED Display | ARLEDSCREEN",
    description:
      "Poster and totem LED units for indoor/outdoor wayfinding and promo. Priced by written quote. ARLEDSCREEN — Istanbul.",
    short: "Poster / totem LED",
    tag: "Poster",
    imageAlt: "Totem LED display",
    quoteOnly: true,
    intro: [
      "Poster/totem units are sized per location and content loop. Pricing is by written quote — not part of the published 12-panel price list.",
    ],
    highlights: ["Indoor/outdoor options", "Single or double face", "Quote after site photos"],
    faqs: [
      {
        question: "Are totems on the price list?",
        answer: "No. Our price list covers LED module purchases. Totem/poster systems are priced by written quote.",
      },
    ],
  },
  "led-modul-ve-kontrol-sistemleri": {
    name: "LED modules & control systems",
    h1: "LED modules and control systems",
    lead: "Modules, spares and Huidu / NovaStar / Colorlight control",
    title: "LED Modules & Controllers | ARLEDSCREEN",
    description:
      "LED modules, spares and control systems (Huidu, NovaStar, Colorlight). Compatibility check after label photos. ARLEDSCREEN — Istanbul.",
    short: "Modules and controllers",
    tag: "Modules · Control",
    imageAlt: "LED module types: indoor, flexible and outdoor models",
    quoteOnly: true,
    intro: [
      "Spare modules and controllers are matched to existing walls from label photos and measurements.",
      "Control cards are priced by written quote; purchase panel USD for new walls stays on our price list.",
    ],
    highlights: ["Compatibility from labels/photos", "Huidu / NovaStar / Colorlight", "Spares priced by written quote"],
    faqs: [
      {
        question: "Can you match my existing wall?",
        answer:
          "Share the rear module label, size and a photo. We confirm compatible options before quoting.",
      },
    ],
  },
  "huidu-kontrol-kartlari": {
    name: "Huidu control cards",
    h1: "Huidu LED control cards",
    lead: "Asynchronous Huidu controllers — quote after load and inputs",
    title: "Huidu Control Cards | ARLEDSCREEN",
    description: "Huidu asynchronous LED controllers. Quote after pixel load and input needs. ARLEDSCREEN — Istanbul.",
    short: "Huidu controllers",
    tag: "Huidu",
    imageAlt: "Huidu LED control card",
    quoteOnly: true,
    intro: ["Huidu is often chosen for async signage and Wi‑Fi content updates. Scope is priced by written quote."],
    highlights: ["Async signage", "Quote after load calc", "Install/config support available"],
    faqs: [
      {
        question: "Are controllers on the price list?",
        answer: "No. Our price list is NXTIONSTAR panel USD. Controllers are priced by written quote.",
      },
    ],
  },
  "novastar-kontrolculer": {
    name: "NovaStar controllers",
    h1: "NovaStar LED controllers",
    lead: "NovaStar sync / high-load control — quote after design",
    title: "NovaStar Controllers | ARLEDSCREEN",
    description: "NovaStar LED controllers for higher pixel loads and sync stages. Priced by written quote. ARLEDSCREEN — Istanbul.",
    short: "NovaStar controllers",
    tag: "NovaStar",
    imageAlt: "NovaStar LED controller",
    quoteOnly: true,
    intro: ["NovaStar suits higher loads and sync/stage work. Controllers are priced by written quote."],
    highlights: ["High pixel load", "Sync / stage use", "Priced by written quote"],
    faqs: [
      {
        question: "NovaStar vs Huidu?",
        answer:
          "Huidu is common for async signage; NovaStar for higher loads and sync. We confirm after source type and wall size.",
      },
    ],
  },
  "colorlight-kontrolculer": {
    name: "Colorlight controllers",
    h1: "Colorlight LED controllers",
    lead: "Colorlight control systems — quote after design",
    title: "Colorlight Controllers | ARLEDSCREEN",
    description: "Colorlight LED controllers. Quote after pixel load and inputs. ARLEDSCREEN — Istanbul.",
    short: "Colorlight controllers",
    tag: "Colorlight",
    imageAlt: "Colorlight LED controller",
    quoteOnly: true,
    intro: ["Colorlight is one of the control lines we supply and configure. Pricing is by written quote."],
    highlights: ["Project-based config", "Priced by written quote", "Install support available"],
    faqs: [
      {
        question: "Are Colorlight prices published as panel USD?",
        answer: "No. Panel USD is NXTIONSTAR modules on our price list. Controllers are priced by written quote.",
      },
    ],
  },
};

export function getProductGroupEn(slug: string): ProductGroupEn | undefined {
  const tr = getProductGroup(slug);
  const en = EN[slug];
  if (!tr || !en) return undefined;
  return { slug, ...en };
}

/** All product group slugs that have EN landings. */
export const PRODUCT_GROUP_EN_SLUGS = PRODUCT_GROUPS.map((g) => g.slug).filter((s) => Boolean(EN[s]));
