import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/security-scanner',
  assetPrefix: '/security-scanner',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/security-scanner',
  },
};

export default nextConfig;
