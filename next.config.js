/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cms.aff4.org', // Новый домен Ghost CMS
      'localhost',      // Для локальной разработки
      'static.ghost.org',
      // '89.111.169.80', // Удален старый IP, если не нужен
    ],
    // Оставляем unoptimized: false для продакшена, чтобы Vercel оптимизировал изображения
    // unoptimized: process.env.NODE_ENV === 'development', 
  },
}

module.exports = nextConfig 