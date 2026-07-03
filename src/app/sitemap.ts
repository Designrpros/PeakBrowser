import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

const routes = [
  { path: "/", priority: 1 },
  { path: "/download", priority: 0.9 },
  { path: "/docs", priority: 0.8 },
  { path: "/demo", priority: 0.7 },
  { path: "/course", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-03");

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
