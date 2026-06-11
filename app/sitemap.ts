import type { MetadataRoute } from "next";
import { footerNav, mainNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Flatten nav dropdowns so grouped pages (e.g. Villas/Annex under Rooms)
  // stay in the sitemap.
  const navPaths = mainNav.flatMap((n) => [n.href, ...(n.children ?? []).map((c) => c.href)]);
  const paths = [...new Set(["/", ...navPaths, ...footerNav.map((n) => n.href)])];
  const now = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
