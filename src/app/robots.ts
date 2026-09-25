import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// Required for `output: "export"`: render once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
