import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://proposalkit.pages.dev";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/for/freelancers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for/contractors`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for/designers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for/consultants`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for/agencies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
