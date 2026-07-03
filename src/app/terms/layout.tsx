import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Read the Peak Browser terms of service for the native Apple browser workspace, including usage, subscriptions, AI providers, and user content.",
  path: "/terms",
});

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
