/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["ik.imagekit.io"],
  },
  socials: {
    domains: ["twitter.com"],
  },
};

module.exports = nextConfig;
