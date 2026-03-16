import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
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
  robots: { index: false, follow: false },
  metadataBase: new URL("https://quantum-scanner.vercel.app"),
  title: "Quantum – KI-Sicherheits-Scanner für KMUs",
  description:
    "Ist deine Website eine Einladung für KI-Angriffe? Quantum scannt 25+ Sicherheits-Signale und zeigt dein Risiko in 30 Sekunden.",
  openGraph: {
    title: "Quantum – Wie exponiert ist deine Website?",
    description:
      "Kostenloser KI-Sicherheits-Scan. 5 Dimensionen, 25+ Checks, Ergebnis in 30 Sek.",
    url: "https://quantum-scanner.vercel.app",
    siteName: "Quantum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum – KI-Sicherheits-Scanner",
    description: "Kostenloser Quantum Score für deine Website.",
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
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
