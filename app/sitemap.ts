import type { MetadataRoute } from "next";

import { getPortfolioSlugs } from "@/lib/portfolio";
import { getSiteUrl, showLabsNav } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const portfolio = await getPortfolioSlugs();
  const staticRoutes = ["", "/cv", "/portfolio"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const portfolioRoutes = portfolio.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    lastModified: new Date(),
  }));

  const labs = showLabsNav()
    ? [
        {
          url: `${base}/labs`,
          lastModified: new Date(),
        },
      ]
    : [];

  return [...staticRoutes, ...portfolioRoutes, ...labs];
}
