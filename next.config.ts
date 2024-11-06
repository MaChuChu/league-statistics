import type { NextConfig } from "next";

/* Conditional statement so build can work in production and locally. */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  basePath: isProd ? '/league-statistics' : '',
  assetPrefix: '/league-statistics',
  publicRuntimeConfig: {
    basePath: '/league-statistics',
  },
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
