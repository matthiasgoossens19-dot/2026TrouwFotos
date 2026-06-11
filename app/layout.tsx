import type { Metadata } from "next";
import { Dancing_Script, Lato } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-script", weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Anneleen & Matthias — 20.06.2026",
  description: "Deel jouw foto's van onze trouwdag",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`min-h-screen ${dancingScript.variable} ${lato.variable}`}>{children}</body>
    </html>
  );
}
