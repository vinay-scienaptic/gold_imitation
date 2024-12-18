import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: Helps identify potential issues
  pageExtensions: ["ts", "tsx", "js", "jsx"], // Supports TypeScript and JavaScript pages
  webpack: (config) => {
    // Customize Webpack config if necessary
    return config;
  },
};

export default nextConfig;
