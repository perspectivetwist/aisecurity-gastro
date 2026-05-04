import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: { other: { 'msvalidate.01': '4238BAC83D0A84184DB5C8AEF5C3CE14' } },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.ki-gastronomie.com/security-scanner"),
  title: "Restaurant KI-Sicherheit | Quantum Scanner für Gastronomie",
  description:
    "Kostenloser KI-Sicherheits-Scan für die Gastronomie: Fake-Bewertungen, KI-Phishing und digitale Schwachstellen für Restaurants erkennen.",
  openGraph: {
    title: "Restaurant KI-Sicherheit | Quantum Scanner für Gastronomie",
    description:
      "Kostenloser KI-Sicherheits-Scan für die Gastronomie: Fake-Bewertungen, KI-Phishing und digitale Schwachstellen.",
    url: "https://www.ki-gastronomie.com/security-scanner",
    siteName: "Quantum Gastro Scanner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant KI-Sicherheit | Quantum Scanner für Gastronomie",
    description: "Kostenloser KI-Sicherheits-Scan für die Gastronomie: Fake-Bewertungen, KI-Phishing, digitale Schwachstellen.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <JsonLdSchema />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Shift Drift",
              "url": "https://www.ki-gastronomie.com",
              "sameAs": [
                "https://github.com/perspectivetwist",
                "https://www.crunchbase.com/organization/ai-shift-drift"
              ]
            })
          }}
        />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
