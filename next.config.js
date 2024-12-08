/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pub-e2e5ced9a5c24c6ab16bc0192dbf1c7c.r2.dev'],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig 