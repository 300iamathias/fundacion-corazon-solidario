import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-b70c543b-726b-4dd5-9a9b-d0a180298ab6.space-z.ai',
  ],
};

export default nextConfig;
