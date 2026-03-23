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
            {
                protocol: 'https',
                hostname: 'www.pngkit.com',
            },
            {
                protocol: 'https',
                hostname: 'toppng.com',
            }
        ],
    },
};

export default nextConfig;
