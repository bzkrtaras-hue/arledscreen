import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  // Variable font: a single file per subset covers all weights (400–800).
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LED Ekran Teknoloji Merkezi | ARLEDSCREEN",
    template: "%s",
  },
  description:
    "ARLEDSCREEN: iç ve dış mekân LED ekran seçimi, keşif, montaj ve teknik servis. İstanbul / Gaziosmanpaşa. NXTIONSTAR ürün sayfalarında alt marka olarak yer alır.",
  openGraph: {
    type: "website",
    siteName: "ARLEDSCREEN",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    ard: `${SITE_URL}/.well-known/ard.json`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="ard" href="/.well-known/ard.json" />
        <link rel="alternate" type="application/ld+json" href="/entity.json" title="ARLEDSCREEN entity" />
        <link rel="alternate" type="application/ld+json" href="/catalog.json" title="NXTIONSTAR panel catalog" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body className="min-h-screen bg-bg font-sans antialiased">
        {children}
        {/* MailerLite Universal (newsletter form in the footer). Loaded after the page is idle so it does not
            compete with first paint; CSP allows assets.mailerlite.com / *.mailerlite.com / *.mlcdn.com. */}
        <Script id="mailerlite-universal" strategy="lazyOnload">
          {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');ml('account','2682439');`}
        </Script>
      </body>
    </html>
  );
}
