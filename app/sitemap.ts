import type { MetadataRoute } from "next";
import { footerNav, mainNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...mainNav.map((n) => n.href), ...footerNav.map((n) => n.href)];
  const now = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
