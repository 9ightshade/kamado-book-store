import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cloud.appwrite.io"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
