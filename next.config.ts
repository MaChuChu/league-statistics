import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        port: '',
        pathname: '/cdn/img/champion/loading/**', // Define the path for images
      },
    ],
    domains: ['ddragon.leagueoflegends.com'], // Allow images from this domain
  },
};

export default nextConfig;
