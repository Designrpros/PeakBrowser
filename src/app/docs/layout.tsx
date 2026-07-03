import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Peak Browser Documentation",
  description:
    "Read the Peak Browser documentation for setup, shortcuts, tabs, notes, Kanban tasks, AI, privacy, Peak Mesh, and native Apple app features.",
  path: "/docs",
});

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
