import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push(/^(?!.*\\\.m?js$).*\\\.node$/);
    }
    return config;
  },
};

export default nextConfig;
