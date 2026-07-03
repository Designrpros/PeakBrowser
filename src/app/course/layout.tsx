import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Peak Browser Course",
  description:
    "Learn how Peak Browser is built and how its native browser workspace, AI tools, tabs, notes, and productivity features fit together.",
  path: "/course",
});

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
