import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f005.backblazeb2.com",
        port: "",
        pathname: "/file/ace-luffy-sabo/**",
      },
    ],
  },
};

export default nextConfig;
