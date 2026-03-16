import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
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
  robots: { index: true, follow: true },
  metadataBase: new URL("https://aisecurity-gastro.vercel.app"),
  title: "Restaurant KI-Sicherheit | Quantum Scanner für Gastronomie",
  description:
    "Kostenloser KI-Sicherheits-Scan für die Gastronomie: Fake-Bewertungen, KI-Phishing und digitale Schwachstellen für Restaurants erkennen.",
  openGraph: {
    title: "Restaurant KI-Sicherheit | Quantum Scanner für Gastronomie",
    description:
      "Kostenloser KI-Sicherheits-Scan für die Gastronomie: Fake-Bewertungen, KI-Phishing und digitale Schwachstellen.",
    url: "https://aisecurity-gastro.vercel.app",
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
        <JsonLdSchema />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
