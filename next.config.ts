import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force Next.js to generate the 'out' folder for GitHub Pages
  output: 'export', 

  // 2. Multi-tenant Branding: Reads the repo name or custom path from your GitHub variables
  // If NEXT_PUBLIC_BASE_PATH is not set, it defaults to the repo name
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/Nexus-final',

  // 3. Static Export requirement: GitHub Pages doesn't have a server to optimize images
  images: {
    unoptimized: true,
  },

  // 4. Clean URLs: Ensures /dashboard works correctly on static hosting
  trailingSlash: true,

  // 5. Optional: Suppress the telemetry message in build logs
  telemetry: {
    disabled: true,
  }
};

export default nextConfig;
