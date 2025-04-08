/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ghost.org', '89.111.169.80', 'static.ghost.org'], // Add your Ghost domain here
  },
}

module.exports = nextConfig 