import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getContent, hasCaseStudyContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const caseStudies = getContent().projects.filter((project) => hasCaseStudyContent(project.caseStudy));

  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/resume`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
