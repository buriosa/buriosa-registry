import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@registry": path.resolve(__dirname, "../../src/components/registry"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@registry": "../../src/components/registry",
    },
  },
};

export default nextConfig;
