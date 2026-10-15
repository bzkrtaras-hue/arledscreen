import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { aiDiscoveryMetadata, aiDiscoveryLinks } from "@/lib/ai-discovery";
import { clampMetaDescription } from "@/lib/seo";
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
  description: clampMetaDescription(
    "ARLEDSCREEN — İstanbul Gaziosmanpaşa LED ekran satış, keşif, montaj ve teknik servis. NXTIONSTAR kendi markamız.",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  themeColor: "#0B1B33",
  openGraph: {
    type: "website",
    siteName: "ARLEDSCREEN",
    locale: "tr_TR",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "ARLEDSCREEN — LED Ekran Teknoloji Merkezi" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
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
        {/* Organization / LocalBusiness / WebSite JSON-LD: OrganizationJsonLd in [locale]/layout */}
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
