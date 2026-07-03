import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Read the Peak Browser privacy policy, including how local-first data, private profiles, optional AI keys, iCloud sync, and analytics are handled.",
  path: "/privacy",
});

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
