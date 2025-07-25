/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript:{
    ignoreBuildErrors:true
  },
  images: {
    domains: [], // If you're using external image sources, add them here
    remotePatterns: [],
  },
};

module.exports = nextConfig;