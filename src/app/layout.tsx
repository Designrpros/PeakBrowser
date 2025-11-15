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
  title: "Peak Browser",
  description: "An intelligent menubar browser for macOS.",
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