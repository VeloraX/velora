/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["ik.imagekit.io", "velora.site"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_NOTION_API_KEY: process.env.NEXT_NOTION_API_KEY,
    NEXT_NOTION_DATABASE_ID: process.env.NEXT_NOTION_DATABASE_ID,
  },
};

module.exports = nextConfig;
