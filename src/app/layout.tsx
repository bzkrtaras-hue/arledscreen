import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { aiDiscoveryMetadata, aiDiscoveryLinks } from "@/lib/ai-discovery";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
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
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: aiDiscoveryMetadata.alternates,
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
        {/* AI Discovery & LLM Context Links */}
        {aiDiscoveryLinks.map((link, index) => (
          <link
            key={index}
            rel={link.rel}
            type={link.type}
            href={link.href}
            title={link.title}
          />
        ))}
        {/* Structured data: Organization + canonical */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "ARLEDSCREEN",
              url: SITE_URL,
              logo: `${SITE_URL}/apple-touch-icon.png`,
              sameAs: [
                "https://www.instagram.com/arledscreen",
                "https://www.facebook.com/arledscreenn",
                "https://www.linkedin.com/company/arleds",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-bg font-sans antialiased">
        {children}
        {/* MailerLite Universal */}
        <Script id="mailerlite-universal" strategy="lazyOnload">
          {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n)})(window, document, 'script', 'https://cdn.mailerlite.com/js/universal.js', 'ml');
          ml('account', '1021147');`}
        </Script>
      </body>
    </html>
  );
}
