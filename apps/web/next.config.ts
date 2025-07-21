import type { NextConfig } from 'next';

const nextConfig = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  transpilePackages: ['react-i18next'],
};

export default nextConfig;
export const mockPages = [
    "../",
    "/images/page2.png",
    "/images/page3.png",
    "/images/page4.png",
];
