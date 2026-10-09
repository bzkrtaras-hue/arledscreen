/** EN texts: LED display installation guides (faithful to the TR pages; see install-guides.ts). */
import type { InstallGuide, InstallGuideSlug } from "@/content/install-guides";
import { HUIDU_SOURCES, NOVASTAR_SOURCES } from "@/content/install-guide-sources";

const HUB: InstallGuide = {
  slug: "led-ekran-kurulumu",
  title: "LED Display Installation Step by Step | ARLEDSCREEN",
  description:
    "LED display installation step by step: mounting, power and data cabling, synchronous vs asynchronous control, first power-on, loading the scan file and management apps.",
  keywords: [
    "LED display installation",
    "LED screen setup",
    "how to install an LED screen",
    "receiving card configuration",
    "LED control card",
    "Huidu",
    "NovaStar",
    "ARLEDSCREEN",
  ],
  h1: "LED display installation, step by step",
  intro:
    "Installing an LED display has two parts: the physical mounting and cabling, and then setting up the control system from a computer or phone. This guide walks through the order in plain language, from hanging the screen to the first image and from loading the scan file to the management apps that send content. Detailed steps for Huidu and NovaStar are on separate pages.",
  image: {
    src: "/projects/install-wiring.jpg",
    alt: "LED wall with its back open during installation: cabinets, power supplies, receiving cards and network cables",
    fit: "cover",
  },
  quickSteps: [
    { name: "Preparation", text: "Confirm the size, the load-bearing wall or frame, the power line and service access." },
    { name: "Mounting", text: "Level the frame and fit cabinets or modules without gaps and on the same plane." },
    { name: "Power cabling", text: "Have a licensed electrician connect the power supplies to an earthed, properly fused line." },
    { name: "Data cabling", text: "Daisy-chain the network cables from the controller to the receiving cards in the planned order." },
    { name: "First power-on", text: "Power up and connect your computer or phone to the controller by cable or Wi-Fi." },
    { name: "Scan file", text: "Load the receiving-card configuration (scan) file for your module, test it and save it permanently to the cards." },
    { name: "Screen connection", text: "Define the receiving-card order in the software and check that the image sits correctly across the screen." },
    { name: "Content and settings", text: "Send content with the management app, set brightness, schedules and time, and back up the configuration." },
  ],
  sections: [
    {
      h2: "Before installation: location, power and access",
      paragraphs: [
        "Most of the installation is planned before the screen arrives. The wall or steel frame must carry the screen's weight safely; outdoors, wind and rain must be considered too.",
        "Decide early whether the screen will be serviced from the back or the front. Rear-service screens need working space behind them; front-service modules make installs close to a wall easier.",
      ],
      bullets: [
        "Screen size and pixel pitch should match the viewing distance.",
        "Prepare an earthed, fused power line rated for the screen's total load.",
        "Know where content will come from (computer, media player, USB stick, phone).",
        "Plan ventilation so that heat can escape from enclosed housings.",
      ],
    },
    {
      h2: "Physical mounting",
      paragraphs: [
        "The supporting frame or wall profiles are levelled first. Cabinets or modules are fitted from the bottom up, with no gaps or height steps between them. Even a small step shows up as a line or shadow when the screen is on.",
        "Modules usually carry an arrow or label on the back showing the data direction. All modules must face the same way; a module fitted the wrong way round shows a scrambled image.",
      ],
    },
    {
      h2: "Power and data cabling",
      paragraphs: [
        "Each cabinet or module group has a power supply and a receiving card. Power supplies connect to the mains and modules connect to the power supplies. The electrical connection must be made by a licensed electrician, with earthing and a line fuse.",
        "On the data side, the network cable from the controller (or sending card) goes into the first receiving card, then on to the next, forming a chain. Sketching where this chain starts and which way it runs makes the software's “screen connection” step much easier. The flat data cables between the receiving card and the modules must also be fitted the right way round.",
      ],
    },
    {
      h2: "Control system: synchronous or asynchronous?",
      paragraphs: [
        "In a synchronous system the screen shows the image of the connected computer or video source in real time. When the source switches off, the image goes too. It suits stages, conference halls and live broadcasts.",
        "In an asynchronous system the content is loaded into the controller's memory in advance, and the controller plays it on its own schedule even when the computer is off. It is common for shops, façades, signs and menu screens. Some devices support both modes and can switch between them.",
        "ARLEDSCREEN projects use Huidu, NovaStar and Colorlight control systems. The setup logic is the same for all three; what changes is the software name and its menus.",
      ],
    },
    {
      h2: "First power-on and the scan file",
      paragraphs: [
        "When power is first applied it is normal to see scrambled lines, a split image or wrong colours, because the receiving card does not yet know the module. Once the settings file that tells the receiving card how to drive the module is loaded, the image comes right.",
        "In the field this is usually called the “scan file”. It holds the module's pixel count, scan type, driver chip and data direction. On NovaStar systems it is the receiving-card configuration file (.rcfgx or .rcfg). On Huidu systems it is loaded in the receiving-card parameters of the hardware settings, either by choosing a ready module file or by running the step-by-step “smart setting”.",
        "After loading, use the test patterns (solid colours, grid, grey levels) to check that every module lights correctly. Sending the settings is not enough; they must be saved to the cards so they survive a power cut. Ask the company that supplied the screen for the correct file and keep a copy.",
      ],
    },
    {
      h2: "Screen connection: card order",
      paragraphs: [
        "The scan file makes each module work correctly on its own. The position of each cabinet on the screen is set in the software's screen connection: the number of receiving-card columns and rows and the order the cable runs. If this step is wrong, each cabinet looks fine on its own but pieces of the image swap places.",
      ],
    },
    {
      h2: "Management apps: desktop and mobile",
      paragraphs: [
        "Once the screen is configured, day-to-day use needs a content management app. These apps prepare video, images, text and clocks, send them to the screen and schedule playback. Brightness, scheduled blanking and time sync are set here too.",
        "For Huidu, HDPlayer is used on the desktop and the LedArt app on the phone. For NovaStar, NovaLCT handles screen configuration, ViPlex Express (Windows) and ViPlex Handy (Android and iOS) handle content, and the VNNOX cloud platform handles remote management. Detailed steps are in the two guides below.",
      ],
    },
    {
      h2: "After installation",
      paragraphs: [
        "Before handover, set brightness for the environment, plan a lower level for night and sync the device clock. Back up the configuration files and programmes, and change the management passwords from their factory values. Remember that a replacement module must run with the same scan file as the original.",
      ],
    },
  ],
  mistakes: [
    "Fitting modules in different directions: the data arrows must all point the same way.",
    "Loading the scan file of a similar-looking module: the file must match your model and driver chip.",
    "Sending the settings but not saving them: the screen reverts after a power cut.",
    "Connecting to an unearthed line or one that cannot carry the screen's load.",
    "Leaving the computer's display resolution below the LED screen's (synchronous systems show a cropped image).",
    "Leaving the factory-default Wi-Fi and management passwords unchanged.",
  ],
  faqs: [
    {
      question: "How long does LED display installation take?",
      answer:
        "It depends on the size, the mounting method and whether the frame is ready. Once mounting and cabling are done and the correct scan file is at hand, the software setup is usually short; without a file, the smart-setting steps can take longer.",
    },
    {
      question: "What is a scan file and where do I get it?",
      answer:
        "It is the settings file that tells the receiving card how to drive the module, and it is module-specific. Ask the company that supplied the screen or module. Without a file, the smart-setting wizard in Huidu and NovaStar software can build one step by step while you watch the module.",
    },
    {
      question: "Do I need a computer to manage the screen?",
      answer:
        "On asynchronous systems everyday content changes can be made from a phone app (LedArt for Huidu, ViPlex Handy for NovaStar). The initial scan file and screen connection setup usually needs a Windows computer.",
    },
    {
      question: "What is the difference between synchronous and asynchronous screens?",
      answer:
        "A synchronous screen shows the connected source in real time and goes blank when the source is off. An asynchronous screen keeps content in its own memory and plays it on a schedule, independently of a computer.",
    },
  ],
  sources: [HUIDU_SOURCES.en[0], HUIDU_SOURCES.en[2], ...NOVASTAR_SOURCES.en.slice(0, 3)],
  links: [
    { href: "/en/rehber/huidu-led-ekran-kurulumu/", label: "Huidu LED display setup and management" },
    { href: "/en/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar LED display setup and management" },
    { href: "/en/products/led-modul-ve-kontrol-sistemleri/", label: "LED modules and control systems" },
    { href: "/en/products/colorlight-kontrolculer/", label: "Colorlight controllers" },
    { href: "/en/led-ekran-montaj/", label: "LED display installation service" },
    { href: "/en/led-ekran-servis/", label: "LED display technical service" },
  ],
  cta: {
    title: "Need help with installation?",
    body:
      "ARLEDSCREEN helps with mounting, scan-file loading, software setup and technical service. Share your screen size and controller model and we will get back to you.",
  },
  cardLabel: "LED display installation",
  cardTeaser: "Mounting, cabling, scan file and management apps: the installation order step by step.",
};

const HUIDU: InstallGuide = {
  slug: "huidu-led-ekran-kurulumu",
  title: "Huidu LED Display Setup: HDPlayer & LedArt | ARLEDSCREEN",
  description:
    "Setting up a Huidu-controlled LED display: connecting HDPlayer, scan file and smart setting, sending content, the LedArt mobile app, brightness and scheduling.",
  keywords: [
    "Huidu setup",
    "HDPlayer",
    "HDPlayer guide",
    "LedArt",
    "Huidu smart setting",
    "HDSet",
    "Huidu control card",
    "ARLEDSCREEN",
  ],
  h1: "Huidu LED display setup and management",
  intro:
    "When setting up a Huidu-controlled LED display you work with two programs: HDPlayer on the computer and LedArt on the phone. Drawing on Huidu's official manuals, this guide explains in simple steps how to connect the card, load the scan file, prepare and send content, and set brightness, time and schedules.",
  image: {
    src: "/control/huidu-async-hero.png",
    alt: "Huidu LED receiving card",
    fit: "contain",
  },
  quickSteps: [
    { name: "Install the software", text: "Download HDPlayer from Huidu's official download page and install it on a Windows computer." },
    { name: "Connect to the card", text: "Connect by network cable, through the same router, or via the card's own Wi-Fi network." },
    { name: "Open hardware settings", text: "Open Hardware settings from the Settings menu; the program asks for a password." },
    { name: "Load the scan file", text: "In the receiving-card parameters choose the file for your module, or complete the smart setting step by step." },
    { name: "Define the connection", text: "With several receiving cards, enter the card order in connection settings and save." },
    { name: "Create the screen", text: "In screen parameters read the resolution from the card or enter width and height." },
    { name: "Send content", text: "Add video, image, text or clock areas to a programme and send it by cable, Wi-Fi or USB stick." },
    { name: "Finish the settings", text: "Set brightness, time and scheduled on/off, and change the default passwords." },
  ],
  sections: [
    {
      h2: "What do the Huidu programs do?",
      paragraphs: [
        "Huidu's official download page lists programs by card type. Which one you need depends on whether your card is full-colour or single/dual-colour.",
      ],
      bullets: [
        "HDPlayer (Windows): content editing, sending and card management for full-colour asynchronous cards. The hardware settings (scan file) section is also inside it.",
        "HDSet (Windows): screen configuration software for synchronous and asynchronous full-colour systems. HDPlayer's hardware settings open this interface.",
        "HD2020 (Windows): software for single- and dual-colour text cards.",
        "LedArt (Android and iOS): app for finding cards, editing and sending programmes from a phone. Huidu's download page states it supports single/dual-colour and full-colour series.",
      ],
    },
    {
      h2: "Connecting the computer to the card",
      paragraphs: [
        "Huidu cards connect in three ways: a network cable straight to the computer, both on the same router, or, if the card has a Wi-Fi module, by joining the card's own wireless network. A direct cable needs no network settings; shortly after the card's network lights come on, the card name and ID appear in HDPlayer's status area.",
        "Through a router, one computer can manage several cards on the same network. If the card is on a different subnet, give it a static IP and add it with manual card search in the Control menu. When setting a static IP, pick an address on the same subnet as the computer that no other device uses.",
      ],
    },
    {
      h2: "Loading the scan file (hardware settings)",
      paragraphs: [
        "In HDPlayer go to Settings → Hardware settings. The program asks for a password; the manual gives the factory default as 168 (888 on some versions). You can change it in Settings → System settings.",
        "The window has three parts: sending-card parameters, connection settings and receiving-card parameters. Small single-card screens without a receiving card only show the receiving-card parameters.",
        "In the receiving-card parameters, pick the matching file from the module list or load the file supplied by the company you bought the screen from. If there is no suitable file, the “smart setting” wizard builds the settings with you by watching the module:",
      ],
      steps: [
        "Choose the colour type, single-module width, driver chip and decoding type; tick the box if the module scans more than 16 lines.",
        "In the colour channel step, check which colour lights on the module for each state shown and select the same colour.",
        "Enter how many rows one RGB group lights and the scan type by counting the lit rows on the module.",
        "In the point-mapping step, follow the blinking dot on the top-left module and click its match in the table, in order.",
        "Save when the table is complete; if the image is right, send the settings to the card.",
      ],
    },
    {
      h2: "Card order and screen parameters",
      paragraphs: [
        "On screens with several receiving cards, the card layout is entered under connection settings. Seen from the front, the first card the sending cable enters is number 1, and the numbering follows the cable path.",
        "For content, if “use hardware settings” is ticked under Settings → Screen parameters, the resolution is read from the card. If unticked, you can enter the device model, width and height manually. Connected cards appear automatically in the device list.",
      ],
    },
    {
      h2: "Preparing and sending content",
      paragraphs: [
        "In HDPlayer you add a programme under a screen, then add video, image, text, document, clock and timer areas to the programme. Programme properties set play duration, playback at specific times and background, so a breakfast menu in the morning and a promotion in the afternoon can rotate automatically.",
        "Finished content is sent directly over cable or Wi-Fi. The same content can be sent in one go to several screens with the same card model and size using cluster sending. Without a network connection, a USB stick works too:",
      ],
      steps: [
        "Plug the stick into the computer and open Control → Export to USB in HDPlayer.",
        "Choose programme update to copy the programme to the card, or direct play to play it from the stick.",
        "Plug the stick into the card; when copying finishes you can remove it and the screen plays the new programme.",
        "If the device lock is on, enter the lock password on the export screen.",
      ],
    },
    {
      h2: "Brightness, time and scheduling",
      paragraphs: [
        "Brightness can be set manually, by time periods, or automatically if an external light sensor is fitted. High brightness by day and low at night is easier on the eyes and saves energy.",
        "The card clock can be synced with the computer in one click or set manually; scheduled programmes depend on it. Scheduled on/off blanks the screen at set times; per the manual it only cuts the video signal and the screen stays powered. Scheduled restarts can be set to prevent freezes on long-running screens.",
        "The screen test section (grey levels, colours, grid, dots) makes dim or faulty LEDs easy to spot; the same test can be started with the TEST button on the card. Do not cut power to the card during a firmware update.",
      ],
    },
    {
      h2: "Managing from a phone: LedArt",
      paragraphs: [
        "Install LedArt by searching “LedArt” on Google Play or the App Store. Turn off mobile data, Bluetooth and any VPN, then join the card's Wi-Fi network in the phone settings. If the phone asks whether to switch away from a network without internet, choose to stay; otherwise the card will not appear.",
        "The card shows as online under Device. Under Programme create a new screen, select the card, enter width, height and colour type, add content and send. If the image is wrong, choose a module file in the app's hardware settings; if that does not work, run the smart setting.",
        "The manual gives the card's factory-default Wi-Fi password as 88888888; change it in Wi-Fi settings after installation. AP mode (the card's own network) suits a single card; Station mode (cards joined to a shared router) suits several. If the password is lost, the S1 button on the card restores the factory password; as this can also affect screen settings, contact technical support first.",
      ],
    },
  ],
  mistakes: [
    "Changing network settings when the card is not found: check the cable lights first, and turn off mobile data and VPN on the phone.",
    "Choosing a static IP on a different subnet from the computer, or one already in use.",
    "Mistaking scheduled off for a power cut: the screen goes dark but stays powered.",
    "Leaving the programme resolution different from the screen's real resolution.",
    "Not changing the factory-default Wi-Fi and hardware-settings passwords.",
    "Cutting power to the card during a firmware update.",
  ],
  faqs: [
    {
      question: "What is the HDPlayer hardware settings password?",
      answer:
        "Huidu's manual gives the factory default as 168 (888 on some versions). We recommend changing it in Settings → System settings to prevent unauthorised changes.",
    },
    {
      question: "HDPlayer cannot find the card. What should I do?",
      answer:
        "Check that the network cable and the card's network lights are on and that the computer's network connection is normal. If the card is on another subnet, add it by entering its IP address with manual card search in the Control menu.",
    },
    {
      question: "Can I manage a Huidu screen from my phone?",
      answer:
        "Yes. The LedArt app is available for Android and iOS. Join the card's Wi-Fi or the same router as the card to send content and make basic settings.",
    },
    {
      question: "What if my module's scan file is not in the list?",
      answer:
        "The smart-setting wizard identifies the module with you: you pick colour channels, row counts and dot order by watching the screen. When finished the settings are saved and sent to the card.",
    },
  ],
  sources: HUIDU_SOURCES.en,
  links: [
    { href: "/en/rehber/led-ekran-kurulumu/", label: "LED display installation step by step" },
    { href: "/en/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar LED display setup" },
    { href: "/en/products/huidu-kontrol-kartlari/", label: "Huidu control cards" },
    { href: "/en/products/led-modul-ve-kontrol-sistemleri/", label: "LED modules and control systems" },
    { href: "/en/led-ekran-servis/", label: "LED display technical service" },
  ],
  cta: {
    title: "Help with Huidu setup",
    body:
      "If you are stuck on the scan file, HDPlayer or LedArt, the ARLEDSCREEN technical team can help. Send us the card model and screen size and we will get back to you.",
  },
  cardLabel: "Huidu setup",
  cardTeaser: "Connecting, scan file, sending content and scheduling with HDPlayer and LedArt.",
};

const NOVASTAR: InstallGuide = {
  slug: "novastar-led-ekran-kurulumu",
  title: "NovaStar LED Display Setup: NovaLCT & ViPlex | ARLEDSCREEN",
  description:
    "NovaStar LED display setup: receiving-card file (.rcfgx) and screen connection in NovaLCT, content with ViPlex Express and ViPlex Handy, remote management with VNNOX.",
  keywords: [
    "NovaStar setup",
    "NovaLCT",
    "NovaLCT guide",
    "rcfgx",
    "ViPlex Express",
    "ViPlex Handy",
    "VNNOX",
    "NovaStar receiving card",
    "ARLEDSCREEN",
  ],
  h1: "NovaStar LED display setup and management",
  intro:
    "On NovaStar systems, screen configuration and content management use separate programs. NovaLCT makes the screen recognise its modules and puts the cabinets in the right order; ViPlex Express (computer) and ViPlex Handy (phone) prepare and publish content. Drawing on NovaStar's official manuals, this guide explains the order in our own words.",
  image: {
    src: "/control/novastar-mctrl660-pro.png",
    alt: "NovaStar MCTRL660 PRO sending card, front panel",
    fit: "contain",
  },
  quickSteps: [
    { name: "Install NovaLCT", text: "Download NovaLCT from NovaStar's official download page and install it on a Windows computer." },
    { name: "Connect to the sending card", text: "Connect the computer to the sending card by USB or network cable; NovaLCT finds it automatically." },
    { name: "Log in", text: "Choose the advanced synchronous system login from the User menu and enter the password." },
    { name: "Load the receiving-card file", text: "In Screen Configuration, Receiving Card tab, load and send the .rcfgx/.rcfg file; otherwise use Smart Settings." },
    { name: "Set the screen connection", text: "Enter the receiving-card columns and rows and the cable order, then send to hardware." },
    { name: "Save permanently", text: "Save the settings to hardware and back up the configuration file to the computer or cloud." },
    { name: "Publish content", text: "Connect to the player with ViPlex Express or ViPlex Handy, prepare content and publish it." },
    { name: "Finish the settings", text: "Set brightness, screen on/off schedule and time sync; change the default passwords." },
  ],
  sections: [
    {
      h2: "What do the NovaStar programs do?",
      paragraphs: [
        "NovaStar has a program for each job. Which ones you need depends on whether your screen runs synchronously (sending card or video processor) or asynchronously (multimedia player).",
      ],
      bullets: [
        "NovaLCT (Windows): the screen configuration tool. Sending- and receiving-card settings, receiving-card file loading, screen connection, brightness, calibration and monitoring. Used for synchronous products and for the screen settings of asynchronous players.",
        "ViPlex Express (Windows): content editing and publishing from a computer. In async mode it manages players: content, brightness, on/off schedules and time sync.",
        "ViPlex Handy (Android and iOS): phone app for player management over LAN or the internet, content publishing, brightness and quick screen configuration.",
        "VNNOX: NovaStar's cloud platform, used to publish content to internet-connected players remotely and monitor screen status.",
      ],
    },
    {
      h2: "Connecting and logging in to NovaLCT",
      paragraphs: [
        "Install NovaLCT and connect the computer to the sending card by USB or network cable. If the connection is right, the program finds the card on its own and shows the number of connected cards on the main screen. All commands and configuration files travel over this control cable.",
        "To change settings go to User → Advanced Synchronous System User Login. The manual gives the factory-default password as admin; we recommend changing it under User → Change Password.",
        "On synchronous screens the computer's display resolution must be equal to or larger than the LED screen's resolution, or part of the image will not reach the screen.",
      ],
    },
    {
      h2: "Loading the receiving-card file (.rcfgx / .rcfg)",
      paragraphs: [
        "The Receiving Card tab in the Screen Configuration window is where the scan file is loaded. If you have the .rcfgx or .rcfg file for your module, load it from file and send it to the receiving cards; if the image is correct, save.",
        "NovaLCT can also find the file in the cloud (VNNOX Care): select the manufacturer and enter the module ID or file name. If the receiving-card firmware does not match the file, the program asks whether to upgrade.",
        "Without a file, use the Smart Settings wizard: enter the module chip, data type, module type, pixel count and scan details, then tick options based on what you see on the module. You can export the finished settings as an .rcfgx file and keep it.",
      ],
    },
    {
      h2: "Screen connection and saving permanently",
      paragraphs: [
        "In the Screen Connection tab enter the number of screens and the receiving-card columns and rows, and draw the path the cable takes between cabinets. Usually each receiving card drives one cabinet. Then send it to hardware.",
        "Send lets you try the settings on the screen. To keep them after a power cut you must save them to hardware; per NovaStar's manual, settings saved to hardware are kept even when power is lost. Finally save the system configuration file to the computer; you can also back up the receiving-card file and screen connection file (.scr) to VNNOX Care.",
        "Brightness can be set manually in NovaLCT; with a light sensor connected, automatic adjustment to ambient light can be configured.",
      ],
    },
    {
      h2: "Content and scheduling with ViPlex Express (computer)",
      paragraphs: [
        "ViPlex Express is the Windows program for sending content to asynchronous players (for example the Taurus series). The computer connects to the player by network cable, through the player's own Wi-Fi network, or over the same wired or wireless LAN. The player's Wi-Fi name is “AP” plus the last 8 digits of its serial number; the Wi-Fi password is printed on the product label.",
        "You log in to the player as the admin user. Per the manual, the factory-default password depends on the firmware version (123456 on older Taurus versions, SN2008@+ on newer ones). Change the Wi-Fi and login passwords at first login.",
        "Content is built in ViPlex as a “solution”:",
      ],
      steps: [
        "Create a new solution and set its resolution to match the screen.",
        "Add pages and place video, image, text, clock or document windows on each page.",
        "Schedule the hours and days each page plays.",
        "Save, click Publish and select the players that should receive it.",
      ],
    },
    {
      h2: "Terminal control: brightness, on/off and time",
      paragraphs: [
        "In ViPlex Express terminal control you set brightness manually or on a schedule, plan when the screen turns on and off, and set scheduled restarts.",
        "Time sync can be manual, NTP (internet time), GPS or RF. If the same content should play at the same moment on several screens, the device clocks must be synced.",
      ],
    },
    {
      h2: "Managing from a phone: ViPlex Handy",
      paragraphs: [
        "ViPlex Handy is available on Google Play and the App Store. On first launch you choose between LAN control and internet control. On site, joining the player's Wi-Fi and choosing local control is the most practical route; when the device appears in the list, connect with the admin password. If the app warns about a weak password, change it.",
        "The device management screen covers time zone, volume, colour temperature, screen on/off rules, manual and smart brightness, scheduled restart and time sync. With screen configuration enabled, the screen connection can also be set from the phone; per the manual, sending an .rcfgx receiving-card file is only available in the Android version and the file must first be stored on the phone.",
      ],
    },
    {
      h2: "Remote management with VNNOX",
      paragraphs: [
        "If the screen is connected to the internet, the player can be bound to a VNNOX account via ViPlex Express or ViPlex Handy. Content can then be published without visiting the screen, and VNNOX Care shows screen status. Make sure the device has internet access before binding.",
      ],
    },
  ],
  mistakes: [
    "Sending receiving-card settings but not saving them to hardware: they are lost after a power cut.",
    "Leaving the computer's display resolution below the LED screen's (synchronous system).",
    "Setting a ViPlex solution resolution different from the screen.",
    "Trying the .rcfgx file of a similar module: it must match your model and receiving-card firmware.",
    "Expecting synchronised playback on several screens without setting up time sync.",
    "Leaving the factory-default Wi-Fi and admin passwords unchanged.",
  ],
  faqs: [
    {
      question: "What is the NovaLCT default password?",
      answer:
        "NovaStar's manual gives the factory default for the advanced synchronous system login as admin. We recommend changing it under User → Change Password after installation.",
    },
    {
      question: "What is an .rcfgx file?",
      answer:
        "It is the configuration file for NovaStar receiving cards and holds how the module should be driven. In NovaLCT it is loaded on the Receiving Card tab, sent to the receiving cards and saved to hardware.",
    },
    {
      question: "Should I use ViPlex Express or ViPlex Handy?",
      answer:
        "Both manage the same players. ViPlex Express on a computer is better for detailed editing and many screens; ViPlex Handy on a phone is handier for quick changes on site.",
    },
    {
      question: "Can I manage a NovaStar screen remotely?",
      answer:
        "Yes, if the player is online. After binding the device to a VNNOX account with ViPlex Express or ViPlex Handy, content can be published remotely and screen status monitored.",
    },
  ],
  sources: NOVASTAR_SOURCES.en,
  links: [
    { href: "/en/rehber/led-ekran-kurulumu/", label: "LED display installation step by step" },
    { href: "/en/rehber/huidu-led-ekran-kurulumu/", label: "Huidu LED display setup" },
    { href: "/en/products/novastar-kontrolculer/", label: "NovaStar controllers" },
    { href: "/en/products/led-modul-ve-kontrol-sistemleri/", label: "LED modules and control systems" },
    { href: "/en/led-ekran-servis/", label: "LED display technical service" },
  ],
  cta: {
    title: "Help with NovaStar setup",
    body:
      "For NovaLCT configuration, receiving-card files or ViPlex setup, contact the ARLEDSCREEN technical team. Share the controller model and screen size and we will get back to you.",
  },
  cardLabel: "NovaStar setup",
  cardTeaser: "Receiving-card file in NovaLCT, content with ViPlex Express and Handy, remote management with VNNOX.",
};

export const INSTALL_GUIDES_EN: Record<InstallGuideSlug, InstallGuide> = {
  "led-ekran-kurulumu": HUB,
  "huidu-led-ekran-kurulumu": HUIDU,
  "novastar-led-ekran-kurulumu": NOVASTAR,
};
