import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during the build since we validate using our own ESLint config
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Handle Node.js native modules on server
    if (isServer) {
      config.externals.push(/^(?!.*\.m?js$).*\.node$/);
    }
    
    // Browser fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        http: false,
        https: false,
        zlib: false,
        path: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
