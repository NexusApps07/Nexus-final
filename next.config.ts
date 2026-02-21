import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Required for hosting on GitHub Pages (generates 'out' folder)
  output: 'export',

  // 2. Ensures assets (CSS/Images) load correctly on sub-repo URLs
  // Make sure NEXT_PUBLIC_BASE_PATH is set to '/Nexus-final' in GitHub Secrets
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // 3. GitHub Pages doesn't support Next.js Image Optimization
  images: {
    unoptimized: true,
  },

  // 4. CRITICAL: Ensures that /dashboard works as /dashboard/index.html
  // This is often why the 'out' folder fails or links break on static hosts
  trailingSlash: true,
};

export default nextConfig;
