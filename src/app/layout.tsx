import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Dani — Lead Brand Identity & Broadcast Visual Designer | Creative Portfolio",
  description:
    "Official portfolio of Dani (Daniel), Lead Brand Identity & Broadcast Visual Designer. Specializing in broadcast network branding, corporate identity systems, specialty packaging, and cinematic key art based in Addis Ababa, Ethiopia.",
  keywords: [
    "Dani",
    "Graphic Designer Portfolio",
    "Abbay TV",
    "Abbay Digital",
    "Brand Identity Designer",
    "Television Broadcast Design",
    "Ethiopian Designer",
    "Liquid Glass Design System",
    "Packaging Design",
    "Addis Ababa Designer"
  ],
  authors: [{ name: "Dani" }],
  openGraph: {
    title: "Dani — Lead Brand Identity & Broadcast Visual Designer",
    description:
      "Award-winning broadcast identities, sculptural brand systems, and packaging design by Dani.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#05070a] text-white selection:bg-amber-400/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
