import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Peak Browser Web Demo",
  description:
    "Try the Peak Browser web demo and explore the browser workspace interface before downloading the native Apple app.",
  path: "/demo",
});

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
