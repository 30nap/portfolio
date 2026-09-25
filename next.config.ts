import type { NextConfig } from "next";

/**
 * Sub-path the site is served from, e.g. "/portfolio" for
 * https://30nap.github.io/portfolio. Empty for a root or custom domain.
 * Set by the GitHub Pages workflow; leave unset locally.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static site in ./out — no server required (GitHub Pages, any CDN).
  output: "export",
  basePath,
  // Every route becomes a folder with index.html, which static hosts serve reliably.
  trailingSlash: true,
  // The image optimizer needs a server; images are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
