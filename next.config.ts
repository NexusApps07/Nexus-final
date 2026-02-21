import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force the static export (Creates the 'out' folder)
  output: 'export',

  // 2. Multi-tenant Branding: Uses environment variable with a safe fallback
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/Nexus-final',

  // 3. GitHub Pages doesn't support Next.js Image Optimization
  images: {
    unoptimized: true,
  },

  // 4. Ensures that sub-pages like /dashboard/ load correctly on static hosts
  trailingSlash: true,
};

export default nextConfig;
