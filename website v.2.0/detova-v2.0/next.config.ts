import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },



  // Skip TypeScript errors during build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Skip ESLint during production build to avoid circular JSON errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
