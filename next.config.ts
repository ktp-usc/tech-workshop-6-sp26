import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pngimg.com",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
