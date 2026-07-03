import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Download Peak Browser",
  description:
    "Download Peak Browser from the App Store for a native Apple browser workspace with private profiles, notes, tasks, AI, whiteboards, and nearby collaboration.",
  path: "/download",
});

export default function DownloadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
