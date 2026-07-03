// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from '@/lib/registry';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // <-- Import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
<<<<<<< HEAD
  metadataBase: new URL("https://peakbrowser.vercel.app"),
  title: "Peak Browser — Press a shortcut. Peak appears.",
  description:
    "A native Apple browser workspace for quick lookups, saved context, private profiles, optional AI, whiteboards, and nearby collaboration. Local-first, private, and on the App Store.",
  openGraph: {
    title: "Peak Browser — Press a shortcut. Peak appears.",
    description:
      "A native Apple browser workspace for people who don't just browse. Search, save, plan, draw, ask AI, and collaborate nearby from one calm command surface.",
    images: ["/peak-logo.png"],
  },
=======
  title: "Peak Browser",
  description: "An intelligent menubar browser for macOS.",
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics /> {/* <-- Add component here */}
        <StyledComponentsRegistry>
          <NavBar />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}