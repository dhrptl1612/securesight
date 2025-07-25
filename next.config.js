/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // If you're using external image sources, add them here
    remotePatterns: [],
  },
};

module.exports = nextConfig;