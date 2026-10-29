import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl ?? "";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/projetos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
