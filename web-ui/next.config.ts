import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ui',
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
