/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["m.media-amazon.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
