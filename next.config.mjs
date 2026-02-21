/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // This ensures your CSS/JS paths include /Nexus-final/
  basePath: '/Nexus-final', 
  images: {
    unoptimized: true,
  },
  // Helps with GitHub Pages routing
  trailingSlash: true, 
};

export default nextConfig;
