import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. This MUST be at the top level (NOT inside experimental)
  output: 'export',

  // 2. Use your repo name for the basePath
  basePath: '/Nexus-final',

  // 3. This MUST be at the top level
  images: {
    unoptimized: true,
  },

  // 4. Highly recommended for GitHub Pages stability
  trailingSlash: true,
};

export default nextConfig;
